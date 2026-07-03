# -*- coding: utf-8 -*-
"""
reddit_munition_reminder.py -- Semi-automatisation des posts Reddit (zero charge mentale).

Reddit interdit le post 100% auto -> on automatise TOUT SAUF le clic humain:
  1. Pioche la prochaine munition 'ready' dans outreach/reddit_queue.json
  2. Quand le delai est ecoule, RAPPELLE via Telegram le package pret (titre + commentaire OC
     + chemin image + sub + meilleur creneau US), a copier-coller.
  3. DETECTE AUTO que c'est poste (email AutoMod "Original Content" dans Gmail) -> marque la
     munition postee AVEC l'heure exacte, avance la file, et se TAIT pendant l'intervalle.
  4. Re-rappelle gentiment 1x/jour tant que non detecte; apres 2 jours sans preuve, suppose poste.

Cadence: changer UNE ligne -> POSTS_PER_WEEK (1 = defaut, 2 = deux/semaine).
Lance a chaque allumage PC (run_daily_watch.bat). Idempotent (max 1 rappel/jour).

  python scripts/reddit_munition_reminder.py            # run normal
  python scripts/reddit_munition_reminder.py --force     # force le rappel (test)
"""
import imaplib, email, sys, io, json
import datetime as dt
from email.utils import parsedate_to_datetime
from pathlib import Path
import requests

sys.path.insert(0, str(Path(__file__).parent))
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

from config import GMAIL_ADDRESS, GMAIL_APP_PASSWORD, TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

# ===== CADENCE (change juste cette ligne pour 2/semaine) =====
POSTS_PER_WEEK = 1
# =============================================================

INTERVAL = dt.timedelta(days=7.0 / POSTS_PER_WEEK)
ASSUME_POSTED_AFTER = dt.timedelta(days=2)   # si pas de preuve email apres 2j, on suppose poste
QUEUE = Path(__file__).parent.parent / "outreach" / "reddit_queue.json"
UTC = dt.timezone.utc

# Meilleur creneau appris de la data (post #1 = ven 9h JST = jeu 20h ET -> 34k vues, audience 60% US)
TIMING_TIP = ("Meilleur creneau (audience ~60% US): poste ~9h JST en semaine "
              "(= ~20h ET, soiree US). Ton 1er post (ven 9h JST) = 34k vues.")


def now():
    return dt.datetime.now(UTC)

def parse(s):
    return dt.datetime.fromisoformat(s.replace("Z", "+00:00")) if s else None

def iso(d):
    return d.astimezone(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")

def load():
    return json.loads(QUEUE.read_text(encoding="utf-8"))

def save(q):
    QUEUE.write_text(json.dumps(q, ensure_ascii=False, indent=2), encoding="utf-8")

def send_telegram(msg):
    try:
        requests.post(f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
                      json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML",
                            "disable_web_page_preview": True},
                      timeout=10, verify=False)
    except Exception as e:
        print(f"[WARN] telegram: {e}")

def body_text(msg):
    out = []
    for part in msg.walk():
        if part.get_content_type() in ("text/plain", "text/html"):
            try:
                out.append(part.get_payload(decode=True).decode(part.get_content_charset() or "utf-8", "replace"))
            except Exception:
                pass
    return " ".join(out)

def detect_oc_since(since_dt):
    """Retourne le datetime du + recent email AutoMod 'Original Content' apres since_dt, sinon None."""
    try:
        m = imaplib.IMAP4_SSL("imap.gmail.com")
        m.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
        m.select('"[Gmail]/All Mail"' if False else "INBOX")
        # Reddit met les notifs dans INBOX + parfois archivees; on cherche large
        typ, d = m.uid("SEARCH", None, "FROM", "redditmail.com")
        uids = d[0].split() if d and d[0] else []
        found = None
        for uid in reversed(uids[-40:]):
            _, md = m.uid("FETCH", uid, "(BODY.PEEK[])")
            if not md or not md[0]:
                continue
            msg = email.message_from_bytes(md[0][1])
            try:
                ddate = parsedate_to_datetime(msg.get("Date"))
            except Exception:
                continue
            if ddate <= since_dt:
                continue
            if "Original Content" in body_text(msg):
                if found is None or ddate > found:
                    found = ddate
        m.logout()
        return found
    except Exception as e:
        print(f"[WARN] IMAP detect: {e}")
        return None


def main():
    force = "--force" in sys.argv
    q = load()
    st = q["state"]
    munitions = q["munitions"]
    n = now()
    changed = False

    def by_id(mid):
        return next((x for x in munitions if x["id"] == mid), None)

    # -------- 1. DETECTION: est-ce que la munition en attente a ete postee ? --------
    if st.get("awaiting_id"):
        awaiting = by_id(st["awaiting_id"])
        reminded = parse(st.get("awaiting_reminded_utc")) or (n - INTERVAL)
        posted_at = detect_oc_since(reminded - dt.timedelta(minutes=5))
        if posted_at is None and (n - reminded) >= ASSUME_POSTED_AFTER:
            posted_at = n  # pas de preuve apres 2j -> on suppose poste pour ne pas harceler
            note = " (suppose, pas d'email de confirmation)"
        else:
            note = ""
        if posted_at:
            awaiting["status"] = "posted"
            awaiting["posted_utc"] = iso(posted_at)
            st["last_posted_utc"] = iso(posted_at)
            st["awaiting_id"] = None
            st["awaiting_reminded_utc"] = None
            changed = True
            save(q)
            hh = posted_at.astimezone(dt.timezone(dt.timedelta(hours=-4)))  # ET (EDT)
            send_telegram(
                f"✅ <b>Post Reddit detecte</b>{note}\nMunition <code>{awaiting['id']}</code> marquee postee "
                f"(~{hh.strftime('%a %H:%M')} ET).\nProchaine dans {INTERVAL.days}j. Repose-toi. \U0001F3F0")
            print(f"Detecte poste: {awaiting['id']} a {iso(posted_at)}{note}")
            return

    # -------- 2. RAPPEL: faut-il pousser la prochaine munition ? --------
    last_posted = parse(st.get("last_posted_utc")) or (n - INTERVAL * 2)
    due = (n - last_posted) >= INTERVAL
    today = n.date().isoformat()
    already_reminded_today = st.get("last_reminded_date") == today

    # munition en attente pas encore confirmee -> re-rappel gentil (1x/jour)
    if st.get("awaiting_id") and not already_reminded_today:
        awaiting = by_id(st["awaiting_id"])
        st["last_reminded_date"] = today
        save(q)
        send_telegram(
            f"⏰ <b>Rappel: pas encore poste</b>\nTa munition <code>{awaiting['id']}</code> attend toujours.\n\n"
            f"\U0001F4CA {awaiting['title']}\n\U0001F5BC️ {awaiting['png']}\n\U0001F3AF r/{awaiting['sub']}\n\n"
            f"\U0001F4CC Commentaire OC (1er commentaire):\n{awaiting['oc_comment']}")
        print(f"Re-rappel: {awaiting['id']}")
        return

    if (due or force) and not st.get("awaiting_id") and not already_reminded_today:
        nxt = next((x for x in munitions if x["status"] == "ready"), None)
        if not nxt:
            # file vide de munitions pretes -> alerte pour en fabriquer
            todos = [x["id"] for x in munitions if x["status"] == "todo"]
            if not already_reminded_today:
                st["last_reminded_date"] = today
                save(q)
                send_telegram(
                    "⚠️ <b>File Reddit vide</b>\nAucune munition prete a poster. "
                    f"Backlog a fabriquer: {', '.join(todos) if todos else 'aucun'}.\n"
                    "Demande a Claude de generer le prochain graphique.")
            print("Aucune munition 'ready'.")
            return
        st["awaiting_id"] = nxt["id"]
        st["awaiting_reminded_utc"] = iso(n)
        st["last_reminded_date"] = today
        save(q)
        send_telegram(
            f"\U0001F3AF <b>JOUR REDDIT</b> — munition prete\nPoste ceci quand tu as 2 min:\n\n"
            f"\U0001F4CA <b>{nxt['title']}</b>\n\U0001F5BC️ Image: <code>{nxt['png']}</code>\n\U0001F3AF Sub: r/{nxt['sub']}\n\n"
            f"\U0001F4CC <b>Commentaire OC</b> (a coller en 1er commentaire, sinon retrait auto):\n{nxt['oc_comment']}\n\n"
            f"\U0001F551 {TIMING_TIP}\n\n"
            f"Je detecte auto quand c'est poste et je me tais {INTERVAL.days}j.")
        print(f"Rappel envoye: {nxt['id']}")
        return

    print(f"Rien a faire (due={due}, awaiting={st.get('awaiting_id')}, reminded_today={already_reminded_today}).")


if __name__ == "__main__":
    main()
