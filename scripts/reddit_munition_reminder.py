# -*- coding: utf-8 -*-
"""
reddit_munition_reminder.py -- Semi-automatisation des posts Reddit (zero charge mentale).

Reddit interdit le post 100% auto -> on automatise TOUT SAUF le clic humain:
  1. Pioche la prochaine munition 'ready' dans outreach/reddit_queue.json
  2. Quand le delai est ecoule, RAPPELLE via Telegram le package pret (titre + commentaire OC
     + chemin image + sub + meilleur creneau US), a copier-coller.
  3. DETECTE AUTO que c'est poste en LISANT LE FLUX RSS du compte (le post existe ou il
     n'existe pas) -> marque la munition postee avec son heure et son URL, avance la file,
     et se TAIT pendant l'intervalle.
  4. Re-rappelle gentiment 1x/jour tant que non detecte. Une munition non postee reste EN
     ATTENTE indefiniment: le script ne suppose JAMAIS qu'un post est parti.

⚠️ INCIDENT DU 08/09/2026 -- pourquoi la detection est passee par le RSS.
Avant, la detection reposait sur l'email AutoMod "Original Content" + une hypothese
`ASSUME_POSTED_AFTER = 2 jours` ("pas de preuve apres 2j -> on suppose poste"). Deux
defauts qui se sont combines:
  (a) l'email AutoMod du post du 07/08 est arrive le 08/08, APRES le rappel de la munition
      suivante -> il a ete credite a `layout-gap`, qui n'avait jamais ete postee;
  (b) ensuite, tous les 7 jours, une munition etait piochee puis marquee "postee" au bout
      de 2 jours sans preuve.
Resultat: 4 munitions (layout-gap, price-trends-ward, tokyo-price-choropleth,
center-premium-over-time) brulees sur le papier sans qu'aucun post ne parte, et un
Telegram qui annoncait un succes a chaque fois. Le canal backlink est reste mort un mois
sans que rien ne le signale. Regle tiree de la: **ne jamais marquer un fait externe comme
acquis sur la base d'un delai ecoule; le verifier, ou rester en attente.**

Cadence: changer UNE ligne -> POSTS_PER_WEEK (1 = defaut, 2 = deux/semaine).
Lance a chaque allumage PC (run_daily_watch.bat). Idempotent (max 1 rappel/jour).

  python scripts/reddit_munition_reminder.py            # run normal
  python scripts/reddit_munition_reminder.py --force     # force le rappel (test)
"""
import sys, io, json, re, time
import html as htmllib
import datetime as dt
from pathlib import Path
import requests

sys.path.insert(0, str(Path(__file__).parent))
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

# ===== CADENCE (change juste cette ligne pour 2/semaine) =====
POSTS_PER_WEEK = 1
# =============================================================

INTERVAL = dt.timedelta(days=7.0 / POSTS_PER_WEEK)
REDDIT_USER = "Salty-Technician4002"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
# Au bout de ce delai sans post visible, on ALERTE (on ne suppose plus rien: la munition
# reste en attente jusqu'a ce qu'un post apparaisse vraiment dans le flux).
STALE_AFTER = dt.timedelta(days=3)
STALE_COOLDOWN = dt.timedelta(days=3)
# Alerte PROACTIVE "stock bas": prevenir de creer des munitions AVANT que la file se vide.
LOW_STOCK = 2                                # alerte si <= 2 munitions pretes
LOW_STOCK_COOLDOWN = dt.timedelta(days=3)    # re-nudge tous les 3j tant que bas (pas de spam quotidien)
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

_FEED_CACHE = []   # memo d'execution: Reddit renvoie 429 si on rappelle le flux trop vite


def fetch_submitted():
    """Les posts du compte, lus dans son flux RSS. C'est la VERITE TERRAIN: un post
    existe ou il n'existe pas. Retourne [{published, title, url}] du + recent au + ancien,
    ou None si le flux n'a pas pu etre lu (429, reseau...).

    None et [] veulent dire deux choses differentes et le code appelant DOIT les
    distinguer: None = "je ne sais pas" (on ne touche a rien), [] = "aucun post".
    Le resultat est memoise: un seul appel reseau par execution.
    """
    if _FEED_CACHE:
        return _FEED_CACHE[0]

    url = f"https://www.reddit.com/user/{REDDIT_USER}/submitted.rss"
    r = None
    for attempt in range(2):
        if attempt:
            time.sleep(5)          # 429 = trop rapproche, on laisse retomber
        try:
            r = requests.get(url, headers={"User-Agent": UA}, timeout=25, verify=False)
        except Exception as e:
            print(f"[WARN] RSS: {e}")
            r = None
            continue
        if r.status_code == 200:
            break
        print(f"[WARN] RSS {url} -> HTTP {r.status_code}")
    if r is None or r.status_code != 200:
        _FEED_CACHE.append(None)
        return None

    out = []
    for entry in re.findall(r"<entry>.*?</entry>", r.text, re.S):
        pub = re.search(r"<published>(.*?)</published>", entry)
        title = re.search(r"<title>(.*?)</title>", entry, re.S)
        link = re.search(r'<link href="(.*?)"', entry)
        if not pub:
            continue
        out.append({
            "published": parse(pub.group(1)),
            "title": htmllib.unescape(title.group(1).strip()) if title else "",
            "url": htmllib.unescape(link.group(1)) if link else "",
        })
    out.sort(key=lambda e: e["published"], reverse=True)
    _FEED_CACHE.append(out)
    return out


def detect_post_since(since_dt, munition):
    """Un post de cette munition est-il VISIBLE sur le compte apres since_dt ?

    Retourne (datetime, url) si oui, None sinon, et "unknown" si le flux est illisible
    (on ne conclut pas). On exige que le post soit posterieur au rappel ET que son titre
    corresponde: sans ce second test, le post precedent encore en tete de flux pourrait
    etre credite a la munition suivante -- exactement l'erreur du 08/08/2026.
    """
    posts = fetch_submitted()
    if posts is None:
        return "unknown"
    want = norm_title(munition.get("title", ""))
    for p in posts:
        if p["published"] <= since_dt:
            continue
        if want and norm_title(p["title"]) != want:
            continue
        return p["published"], p["url"]
    return None


def norm_title(s):
    """Titre comparable: Reddit reencode les apostrophes et l'espacement."""
    return re.sub(r"[^a-z0-9]+", "", htmllib.unescape(s or "").lower())


def main():
    force = "--force" in sys.argv
    q = load()
    st = q["state"]
    munitions = q["munitions"]
    n = now()
    changed = False

    def by_id(mid):
        return next((x for x in munitions if x["id"] == mid), None)

    # -------- 0. ALERTE STOCK BAS (proactif) : rappeler de CREER des munitions avant la penurie --------
    ready_ids = [m["id"] for m in munitions if m["status"] == "ready"]
    if len(ready_ids) <= LOW_STOCK:
        last_low = parse(st.get("low_stock_alerted_utc"))
        if force or last_low is None or (n - last_low) >= LOW_STOCK_COOLDOWN:
            todo_ids = [m["id"] for m in munitions if m["status"] == "todo"]
            st["low_stock_alerted_utc"] = iso(n)
            save(q)
            send_telegram(
                f"\U0001F4E6 <b>Reserve de munitions Reddit BASSE</b> : {len(ready_ids)} prete(s).\n"
                f"➡️ Demande a Claude de CREER de nouvelles munitions (pour ne pas se retrouver a sec).\n"
                f"Backlog dispo : {', '.join(todo_ids) if todo_ids else 'aucun (a inventer)'}.")
            print(f"Alerte STOCK BAS envoyee ({len(ready_ids)} pretes).")

    # -------- 1. DETECTION / CONFIRMATION que la munition en attente a ete postee --------
    if st.get("awaiting_id"):
        awaiting = by_id(st["awaiting_id"])
        reminded = parse(st.get("awaiting_reminded_utc")) or (n - INTERVAL)
        post_url = ""
        if "--posted" in sys.argv:
            posted_at, note = n, " (confirme manuellement)"
        else:
            # VERITE TERRAIN: le post est-il visible sur le compte ? On ne suppose rien.
            found = detect_post_since(reminded - dt.timedelta(minutes=5), awaiting)
            if found == "unknown":
                print("Flux RSS illisible: on ne conclut rien, on reessaiera.")
                found = None
            posted_at, note = (found[0], "") if found else (None, "")
            if found:
                post_url = found[1]
        if posted_at:
            awaiting["status"] = "posted"
            awaiting["posted_utc"] = iso(posted_at)
            if post_url:
                awaiting["post_url"] = post_url
            st["last_posted_utc"] = iso(posted_at)
            st["awaiting_id"] = None
            st["awaiting_reminded_utc"] = None
            st["stale_alerted_utc"] = None
            changed = True
            save(q)
            hh = posted_at.astimezone(dt.timezone(dt.timedelta(hours=-4)))  # ET (EDT)
            send_telegram(
                f"✅ <b>Post Reddit confirme</b>{note}\nMunition <code>{awaiting['id']}</code> vue sur le compte "
                f"(~{hh.strftime('%a %H:%M')} ET).\n{post_url}\nProchaine dans {INTERVAL.days}j. Repose-toi. \U0001F3F0")
            print(f"Confirme poste: {awaiting['id']} a {iso(posted_at)} {post_url}")
            return

        # Toujours rien de visible: on ALERTE, on ne suppose pas (incident du 08/09/2026).
        if (n - reminded) >= STALE_AFTER:
            last_stale = parse(st.get("stale_alerted_utc"))
            if last_stale is None or (n - last_stale) >= STALE_COOLDOWN:
                st["stale_alerted_utc"] = iso(n)
                save(q)
                days = (n - reminded).days
                send_telegram(
                    f"⚠️ <b>Munition toujours pas postee</b>\n<code>{awaiting['id']}</code> attend depuis "
                    f"{days}j et n'apparait PAS sur le compte.\nElle reste en file: rien n'est perdu, "
                    f"mais le canal backlink est a l'arret tant qu'elle n'est pas partie.")
                print(f"Alerte stale: {awaiting['id']} ({days}j)")

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
        oc = str(nxt.get("oc_comment") or "(demande le commentaire a Claude)")
        if nxt.get("sub") == "dataisbeautiful":
            oc_line = f"\U0001F4CC <b>Commentaire OC</b> (a coller en 1er commentaire, sinon retrait auto):\n{oc}"
            detect_line = f"Je detecte auto quand c'est poste et je me tais {INTERVAL.days}j."
        else:
            oc_line = f"\U0001F4CC Premier commentaire (source, sans lien):\n{oc}"
            detect_line = (f"⚠️ Auto-detection indisponible sur r/{nxt['sub']}. Reponds a Claude 'poste' "
                           f"quand c'est fait (sinon j'assume dans {ASSUME_POSTED_AFTER.days}j).")
        send_telegram(
            f"\U0001F3AF <b>JOUR REDDIT</b> — munition prete\nPoste ceci quand tu as 2 min:\n\n"
            f"\U0001F4CA <b>{nxt['title']}</b>\n\U0001F5BC️ Image: <code>{nxt['png']}</code>\n\U0001F3AF Sub: r/{nxt['sub']}\n\n"
            f"{oc_line}\n\n"
            f"\U0001F551 {TIMING_TIP}\n\n"
            f"{detect_line}")
        print(f"Rappel envoye: {nxt['id']}")
        return

    print(f"Rien a faire (due={due}, awaiting={st.get('awaiting_id')}, reminded_today={already_reminded_today}).")


if __name__ == "__main__":
    main()
