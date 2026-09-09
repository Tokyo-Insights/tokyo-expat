"""
google_alerts_monitor.py -- Traite les emails Google Alerts depuis Gmail IMAP
Categorise par priorite et envoie un digest Telegram.

Priorites :
  P1 MARQUE    : "Tokyo Expat" ou "tokyo-expat.com" mentionnes -> alerte immediate
  P2 CHASSEURS : Remoters, HousingAnywhere, etc. -> digest hebdo
  P3 LOGEMENT  : Sakura House, Oak House, etc. -> digest hebdo
  P4 CONTENU   : Savvy Tokyo, Tokyo Cheapo, etc. -> digest hebdo
  P5 KEYWORDS  : mots-cles strategiques -> digest hebdo (opportunites contenu)

Run: python scripts/google_alerts_monitor.py
Schedule: run_weekly_intelligence.bat (apres email_reply_monitor.py)
"""
import imaplib
import email
import json
import re
import sys
import io
import html
import urllib.parse
import datetime
from email.header import decode_header
from pathlib import Path
from html.parser import HTMLParser

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

from config import TE_TOKEN, TE_CHAT_ID

SCRIPT_DIR = Path(__file__).parent
DATA_DIR   = SCRIPT_DIR / "data"
STATE_FILE = DATA_DIR / "alerts_monitor_state.json"

GMAIL_ADDRESS     = None
GMAIL_APP_PASSWORD = None

try:
    for line in (SCRIPT_DIR / ".env").read_text(encoding='utf-8').splitlines():
        if line.startswith('GMAIL_ADDRESS='):
            GMAIL_ADDRESS = line.split('=', 1)[1].strip()
        elif line.startswith('GMAIL_APP_PASSWORD='):
            GMAIL_APP_PASSWORD = line.split('=', 1)[1].strip().replace(' ', '')
except Exception as e:
    print(f"[WARN] .env: {e}")

GOOGLE_ALERTS_SENDER = "googlealerts-noreply@google.com"
MAX_RESULTS_PER_ALERT = 3  # max articles affiches par alerte dans le digest

# Categorie -> (priorite, label emoji, mots-cles detectes dans le sujet de l'email)
CATEGORIES = [
    ("MARQUE",    1, "P1 Marque",    ["tokyo expat", "tokyo-expat.com"]),
    ("CHASSEURS", 2, "P2 Chasseurs", ["remoters", "housinganywhere", "flatio", "relocateme",
                                      "movingto", "spotahome", "nestpick", "internations",
                                      "japan housing center", "able japan", "century21 japan",
                                      "re/max japan"]),
    ("LOGEMENT",  3, "P3 Logement",  ["sakura house", "oak house", "gaijinpot housing",
                                      "leopalace21", "plaza homes", "ken corporation",
                                      "relomate", "weekly mansion", "fontaine tokyo"]),
    ("CONTENU",   3, "P3 Contenu",   ["savvy tokyo", "tokyo cheapo", "tofugu", "gaijinpot",
                                      "time out tokyo", "japan guide", "japan insider",
                                      "expatica japan"]),
    ("RELOCATION",4, "P4 Relocation",["crown relo", "asian tigers", "santa fe relocations",
                                      "graebel", "cartus", "mobility services"]),
    ("COMMUNAUTE",4, "P4 Communaute",["francexpatjapon", "francais tokyo", "japon expat"]),
    ("KEYWORDS",  5, "P5 Opportunite",["tokyo expat housing", "find apartment tokyo",
                                       "relocating to tokyo", "expatrie tokyo logement",
                                       "share house tokyo", "furnished apartment tokyo",
                                       "japan expat housing"]),
]


def categorize(subject_lower: str):
    for cat_id, priority, label, keywords in CATEGORIES:
        for kw in keywords:
            if kw in subject_lower:
                return cat_id, priority, label
    return "AUTRE", 9, "P9 Autre"


class AlertLinkParser(HTMLParser):
    """Extrait les titres + URLs d'un email Google Alerts (HTML)."""
    def __init__(self):
        super().__init__()
        self.links = []       # [(title, url)]
        self._in_h4 = False
        self._current_url = None
        self._current_title = []
        self._depth = 0

    def handle_starttag(self, tag, attrs):
        if tag == "h4":
            self._in_h4 = True
        if tag == "a" and self._in_h4:
            attrs_d = dict(attrs)
            url = attrs_d.get("href", "")
            # Google wraps URLs : extraire l'URL reelle depuis le parametre q= ou url=
            m = re.search(r'[?&](?:url|q)=([^&]+)', url)
            if m:
                import urllib.parse
                url = urllib.parse.unquote(m.group(1))
            self._current_url = url
            self._current_title = []

    def handle_endtag(self, tag):
        if tag == "h4":
            self._in_h4 = False
            if self._current_url and self._current_title:
                title = html.unescape("".join(self._current_title)).strip()
                self.links.append((title, self._current_url))
            self._current_url = None
            self._current_title = []

    def handle_data(self, data):
        if self._in_h4 and self._current_url is not None:
            self._current_title.append(data)


def parse_alert_email(msg) -> list:
    """Retourne [(title, url)] depuis un email Google Alerts."""
    body = ""
    if msg.is_multipart():
        for part in msg.walk():
            ct = part.get_content_type()
            if ct == "text/html":
                try:
                    body = part.get_payload(decode=True).decode("utf-8", errors="replace")
                    break
                except Exception:
                    pass
    else:
        try:
            body = msg.get_payload(decode=True).decode("utf-8", errors="replace")
        except Exception:
            pass

    if not body:
        return []

    # 🚨 CORRIGE 09/09/2026 — AlertLinkParser cherchait les titres dans des <h4>.
    # Google Alerts n'en emet plus: le mail du 07/09 ne contient AUCUN <h4>
    # (balises reelles: td, a, div, tr, span, table). Le parseur rendait donc une
    # liste vide meme quand l'alerte contenait des articles, et le radar concluait
    # "aucun article extrait". Deux pannes superposees: ne pas trouver les mails,
    # et ne pas savoir les lire.
    # Ce qui est stable depuis des annees, c'est l'enveloppe de redirection
    # google.com/url?...&url=<vraie url>. On s'appuie dessus.
    liens, vus = [], set()
    for m in re.finditer(r'<a[^>]+href="([^"]*google\.com/url[^"]*)"[^>]*>(.*?)</a>',
                         body, re.S | re.IGNORECASE):
        href, brut = m.group(1), m.group(2)
        titre = html.unescape(re.sub(r"<[^>]+>", "", brut)).strip()
        titre = re.sub(r"\s+", " ", titre)
        if not titre or len(titre) < 12:
            continue                       # "Voir tous les resultats", icones, etc.
        cible = re.search(r'[?&]url=([^&]+)', html.unescape(href))
        url = urllib.parse.unquote(cible.group(1)) if cible else href
        if url in vus:
            continue
        vus.add(url)
        liens.append((titre, url))

    if liens:
        return liens[:MAX_RESULTS_PER_ALERT]

    # Filet: si Google change encore de format, on retombe sur l'ancien parseur
    # plutot que de rendre le silence.
    parser = AlertLinkParser()
    parser.feed(body)
    return parser.links[:MAX_RESULTS_PER_ALERT]


def decode_subject(msg) -> str:
    raw = msg.get("Subject", "")
    parts = decode_header(raw)
    result = []
    for b, enc in parts:
        if isinstance(b, bytes):
            result.append(b.decode(enc or "utf-8", errors="replace"))
        else:
            result.append(b)
    return "".join(result)


def load_state() -> dict:
    if STATE_FILE.exists():
        try:
            return json.loads(STATE_FILE.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {"processed_uids": []}


def save_state(state: dict):
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    STATE_FILE.write_text(json.dumps(state, indent=2), encoding="utf-8")


def send_telegram(text: str):
    if not TE_TOKEN or not TE_CHAT_ID:
        print("[WARN] Telegram non configure")
        return
    try:
        r = requests.post(
            f"https://api.telegram.org/bot{TE_TOKEN}/sendMessage",
            json={"chat_id": TE_CHAT_ID, "text": text,
                  "parse_mode": "HTML", "disable_web_page_preview": True},
            timeout=10, verify=False
        )
        if not r.ok:
            print(f"[WARN] Telegram: {r.status_code} {r.text[:100]}")
    except Exception as e:
        print(f"[WARN] Telegram error: {e}")


def run():
    if not GMAIL_ADDRESS or not GMAIL_APP_PASSWORD:
        print("[ERROR] GMAIL_ADDRESS ou GMAIL_APP_PASSWORD manquant dans .env")
        return

    state = load_state()
    processed = set(state.get("processed_uids", []))

    print(f"[INFO] Connexion Gmail IMAP...")
    try:
        M = imaplib.IMAP4_SSL("imap.gmail.com", 993)
        M.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
    except Exception as e:
        print(f"[ERROR] IMAP login: {e}")
        return

    # 🚨 CORRIGE 09/09/2026 — la recherche etait 'INBOX + UNSEEN'.
    # Ce radar tourne le mercredi; entre deux passages, une alerte peut etre lue,
    # archivee ou mise a la corbeille (par gmail_morning_cleaner, par un tri manuel,
    # ou par un menage de la boite). Elle devenait alors DEFINITIVEMENT invisible,
    # et le script annoncait "0 alertes Google non lues" — une phrase vraie sur un
    # monde faux. Cas constate: l'alerte du 07/09 sur les restrictions d'hebergement
    # a Tokyo (sujet directement pertinent) etait a la corbeille, jamais lue.
    # On cherche desormais dans TOUS LES MESSAGES sur une fenetre de dates, et la
    # deduplication se fait sur le Message-ID, pas sur l'etat "non lu".
    FENETRE_JOURS = 14
    depuis = (datetime.datetime.now()
              - datetime.timedelta(days=FENETRE_JOURS)).strftime("%d-%b-%Y")

    # ⚠️ Une recherche IMAP ne porte QUE sur la boite selectionnee, et
    # "[Gmail]/All Mail" EXCLUT la corbeille (verifie le 09/09: l'alerte du 07/09
    # etait introuvable partout SAUF dans "[Gmail]/Trash", ou un menage de boite
    # l'avait envoyee). Meme `X-GM-RAW ... in:anywhere` ne franchit pas cette
    # frontiere. Il faut donc parcourir les boites une par une, corbeille comprise.
    # Les UID n'etant valables que dans leur boite, on garde le couple (boite, uid).
    BOITES = ['"[Gmail]/Tous les messages"', '"[Gmail]/All Mail"',
              '"[Gmail]/Corbeille"', '"[Gmail]/Trash"', "INBOX"]
    trouves = []          # [(boite, uid_bytes)]
    boites_lues = []
    for boite in BOITES:
        try:
            if M.select(boite)[0] != "OK":
                continue
        except Exception:
            continue
        boites_lues.append(boite)
        try:
            _, d = M.search(None, f'FROM "{GOOGLE_ALERTS_SENDER}"', f'SINCE {depuis}')
        except Exception:
            continue
        for u in (d[0].split() if d and d[0] else []):
            trouves.append((boite, u))

    print(f"[INFO] Boites lues : {', '.join(boites_lues)}")
    print(f"[INFO] {len(trouves)} alerte(s) Google sur {FENETRE_JOURS} j "
          f"(lues ou non, corbeille comprise)")

    if not trouves:
        M.logout()
        print(f"[OK] Aucune alerte Google recue depuis {FENETRE_JOURS} j.")
        print("     Si c'est durable: verifier que des alertes sont bien configurees "
              "sur google.com/alerts — un radar sans source n'est pas un radar calme.")
        return

    # Grouper par categorie
    buckets = {}  # cat_id -> {"label": str, "priority": int, "items": [(query, title, url)]}

    new_uids = []
    boite_courante = None
    vus_msgid = set()
    for boite, uid in trouves:
        # Le meme message peut apparaitre dans deux boites: on dedoublonne plus bas
        # sur le Message-ID, qui lui est stable.
        uid_str = f"{boite}:{uid.decode() if isinstance(uid, bytes) else uid}"
        if uid_str in processed:
            continue
        if boite != boite_courante:
            if M.select(boite)[0] != "OK":
                continue
            boite_courante = boite

        _, msg_data = M.fetch(uid, "(RFC822)")
        if not msg_data or not msg_data[0]:
            continue

        raw = msg_data[0][1]
        msg = email.message_from_bytes(raw)

        # Un message archive ET copie ailleurs ressort deux fois: le Message-ID
        # tranche, l'UID non (il change d'une boite a l'autre).
        mid = (msg.get("Message-ID") or "").strip()
        if mid and mid in vus_msgid:
            continue
        if mid:
            vus_msgid.add(mid)

        subject = decode_subject(msg)
        subject_lower = subject.lower()

        # Le sujet est "Alerte Google : ..." en francais, "Google Alert - ..." en
        # anglais. L'ancienne expression ne connaissait que la forme anglaise.
        query = re.sub(r'^(?:google\s+alert|alerte\s+google)\s*[-:]\s*', '',
                       subject, flags=re.IGNORECASE).strip()

        cat_id, priority, label = categorize(subject_lower)
        links = parse_alert_email(msg)

        if cat_id not in buckets:
            buckets[cat_id] = {"label": label, "priority": priority, "items": []}
        for title, url in links:
            buckets[cat_id]["items"].append((query, title, url))

        new_uids.append(uid_str)
        # Marquer comme lu
        M.store(uid, '+FLAGS', '\\Seen')

    M.logout()

    if not new_uids:
        print("[OK] Aucune alerte nouvelle a traiter.")
        return

    # Trier par priorite et construire le message Telegram
    sorted_cats = sorted(buckets.values(), key=lambda x: x["priority"])

    today = datetime.date.today().isoformat()
    lines = [f"<b>Google Alerts Digest -- {today}</b>", ""]

    p1_items = []  # alertes marque = immediat

    for bucket in sorted_cats:
        label = bucket["label"]
        items = bucket["items"]
        if not items:
            continue

        lines.append(f"<b>{label}</b>")
        seen_queries = set()
        for query, title, url in items:
            if query not in seen_queries:
                lines.append(f"  [{query}]")
                seen_queries.add(query)
            t = title[:80] + "..." if len(title) > 80 else title
            lines.append(f"  - <a href='{url}'>{t}</a>")
            if label.startswith("P1"):
                p1_items.append((query, title, url))
        lines.append("")

    total_items = sum(len(b["items"]) for b in buckets.values())
    lines.append(f"Total : {total_items} mentions dans {len(buckets)} categories")

    digest = "\n".join(lines)

    # Alerte immediate si mention de notre marque
    if p1_items:
        alert_lines = ["<b>ALERTE MARQUE -- Tokyo Expat mentionne !</b>", ""]
        for query, title, url in p1_items:
            t = title[:80] + "..." if len(title) > 80 else title
            alert_lines.append(f"- <a href='{url}'>{t}</a>")
        send_telegram("\n".join(alert_lines))
        print(f"[ALERTE P1] {len(p1_items)} mention(s) de marque envoyees immediatement")

    # Digest complet
    if total_items > 0:
        send_telegram(digest)
        print(f"[OK] Digest envoye : {total_items} mentions, {len(new_uids)} alertes traitees")
    else:
        print(f"[OK] {len(new_uids)} alertes traitees, aucun article extrait")

    # Export JSON pour lecture automatique par Claude en debut de session
    digest_export = {
        "date": today,
        "total_mentions": total_items,
        "categories": {},
        "p1_brand_alerts": []
    }
    for bucket in sorted_cats:
        cat_items = [{"query": q, "title": t, "url": u} for q, t, u in bucket["items"]]
        if cat_items:
            digest_export["categories"][bucket["label"]] = cat_items
    for query, title, url in p1_items:
        digest_export["p1_brand_alerts"].append({"query": query, "title": title, "url": url})

    digest_path = DATA_DIR / "alerts_latest_digest.json"
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    digest_path.write_text(json.dumps(digest_export, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"[OK] Digest sauvegarde : {digest_path}")

    # MAJ state
    all_uids = list(processed | set(new_uids))
    state["processed_uids"] = all_uids[-500:]  # garder les 500 derniers
    state["last_run"] = datetime.datetime.now().isoformat()
    save_state(state)


if __name__ == "__main__":
    run()
