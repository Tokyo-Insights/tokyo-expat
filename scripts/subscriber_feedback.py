# -*- coding: utf-8 -*-
"""
subscriber_feedback.py -- BOUCLE liste email -> feedback (prete pour le jour J).

Quand la liste email sera assez grande, on demande aux abonnes CE QU'ILS veulent savoir,
et leurs reponses se recoltent comme les commentaires Reddit -> nourrissent les articles.
Boucle: liste -> demande -> reponses (or) -> articles -> partage/conversion -> plus d'abonnes.

Modes:
  --print-email        affiche l'email de sollicitation (EN+FR), pret a envoyer
  --send               DRY-RUN par defaut: liste les abonnes qui recevraient l'email
  --send --live        envoie reellement via Brevo (a n'utiliser QUE quand la liste est fournie)
  --harvest            recolte les reponses (Re: ...) dans data/subscriber_feedback_log.jsonl

Prerequis: Brevo (scripts/.env BREVO_API_KEY), Gmail IMAP (config.py). Liste 3.
NON branche dans les routines auto: on le declenche a la main le jour J.
"""
import imaplib, email, sys, io, json, re
import html as htmllib
from email.header import decode_header
from email.utils import parsedate_to_datetime
from pathlib import Path
import requests, urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

sys.path.insert(0, str(Path(__file__).parent))
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

from config import GMAIL_ADDRESS, GMAIL_APP_PASSWORD

LIST_ID = 3
EXCLUDE = {"test@example.com", "test-debug@tokyo-insights.com", "info.tokyoinsights+drip@gmail.com"}
LOG = Path(__file__).parent / "data" / "subscriber_feedback_log.jsonl"
ENV = Path(__file__).parent / ".env"
# marqueur unique dans le sujet -> permet de recolter les reponses ("Re: ...")
SUBJECT_EN = "One quick question about your move to Tokyo"
SUBJECT_FR = "Une petite question sur votre installation a Tokyo"
MARKER = "move to Tokyo"  # present dans les 2 sujets via "Re:" (EN) -- fallback: on cherche large

EMAIL_EN = """Hi,

Quick one, and a reply really helps us.

What is the single thing you most want to understand about renting or moving to Tokyo right now? Costs, the guarantor system, furnished vs unfurnished, a specific neighbourhood, anything.

Just hit reply and tell me in one line. We turn the most common questions into free guides, so your answer directly shapes what we write next.

Thanks,
Alessandro, Tokyo Expat"""

EMAIL_FR = """Bonjour,

Une petite question, et votre reponse nous aide beaucoup.

Quelle est LA chose que vous aimeriez le plus comprendre sur la location ou l'installation a Tokyo en ce moment ? Les couts, le systeme de garant, meuble ou vide, un quartier precis, n'importe quoi.

Repondez simplement en une ligne. Nous transformons les questions les plus frequentes en guides gratuits, donc votre reponse oriente directement ce qu'on ecrit ensuite.

Merci,
Alessandro, Tokyo Expat"""


def brevo_key():
    for line in ENV.read_text(encoding="utf-8").splitlines():
        if line.startswith("BREVO_API_KEY="):
            return line.split("=", 1)[1].strip()
    return None


def dec(s):
    if not s:
        return ""
    return " ".join((p.decode(e or "utf-8", "replace") if isinstance(p, bytes) else str(p))
                    for p, e in decode_header(s))


def list_contacts(key):
    H = {"api-key": key, "accept": "application/json"}
    out, off = [], 0
    while True:
        r = requests.get(f"https://api.brevo.com/v3/contacts/lists/{LIST_ID}/contacts?limit=500&offset={off}",
                         headers=H, verify=False, timeout=30)
        if r.status_code != 200:
            break
        b = r.json().get("contacts", [])
        out += b
        if len(b) < 500:
            break
        off += 500
    return out


def send_email(key, to, lang):
    subj = SUBJECT_FR if lang == "fr" else SUBJECT_EN
    body = EMAIL_FR if lang == "fr" else EMAIL_EN
    payload = {
        "sender": {"name": "Alessandro, Tokyo Expat", "email": GMAIL_ADDRESS},
        "replyTo": {"email": GMAIL_ADDRESS},
        "to": [{"email": to}],
        "subject": subj,
        "textContent": body,
        "htmlContent": "<p>" + body.replace("\n\n", "</p><p>").replace("\n", "<br>") + "</p>",
    }
    r = requests.post("https://api.brevo.com/v3/smtp/email",
                      headers={"api-key": key, "Content-Type": "application/json"},
                      json=payload, verify=False, timeout=30)
    return r.status_code in (200, 201), r.status_code


def cmd_send(live):
    key = brevo_key()
    if not key:
        print("BREVO_API_KEY manquante."); return
    contacts = list_contacts(key)
    print(f"{'[LIVE]' if live else '[DRY-RUN]'} Liste {LIST_ID}: {len(contacts)} abonnes")
    for c in contacts:
        email_addr = c.get("email")
        if email_addr in EXCLUDE:
            continue
        lang = str((c.get("attributes") or {}).get("LANGUE", "en")).lower()
        lang = "fr" if lang == "fr" else "en"
        if live:
            ok, code = send_email(key, email_addr, lang)
            print(f"  {'SENT' if ok else 'FAIL '+str(code)}: {email_addr} ({lang})")
        else:
            print(f"  [would send] {email_addr} ({lang})")
    if not live:
        print("\n-> Pour envoyer reellement: python scripts/subscriber_feedback.py --send --live")


def body_text(msg):
    for part in msg.walk():
        if part.get_content_type() == "text/plain":
            try:
                return part.get_payload(decode=True).decode(part.get_content_charset() or "utf-8", "replace")
            except Exception:
                pass
    for part in msg.walk():
        if part.get_content_type() == "text/html":
            try:
                return htmllib.unescape(re.sub(r"<[^>]+>", " ", part.get_payload(decode=True).decode(part.get_content_charset() or "utf-8", "replace")))
            except Exception:
                pass
    return ""


def cmd_harvest():
    seen, rows = set(), []
    if LOG.exists():
        for line in LOG.read_text(encoding="utf-8").splitlines():
            if line.strip():
                r = json.loads(line); rows.append(r); seen.add(r.get("msg_id"))
    m = imaplib.IMAP4_SSL("imap.gmail.com")
    m.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
    m.select('"[Gmail]/All Mail"')
    # reponses a notre sollicitation: sujet contient le marqueur (les "Re:" le conservent)
    typ, d = m.uid("SEARCH", None, "SUBJECT", MARKER)
    uids = d[0].split() if d and d[0] else []
    new = 0
    for uid in uids:
        _, md = m.uid("FETCH", uid, "(BODY.PEEK[])")
        if not md or not md[0]:
            continue
        msg = email.message_from_bytes(md[0][1])
        frm = dec(msg.get("From", ""))
        if GMAIL_ADDRESS in frm.lower() or "noreply" in frm.lower() or "redditmail" in frm.lower():
            continue  # nos propres envois / notifs, pas des reponses
        mid = msg.get("Message-ID", f"uid-{uid.decode()}")
        if mid in seen:
            continue
        try:
            date = parsedate_to_datetime(msg.get("Date")).isoformat()
        except Exception:
            date = ""
        txt = re.sub(r"\s+", " ", body_text(msg)).strip()[:600]
        rows.append({"msg_id": mid, "date": date, "from": frm[:60], "reply": txt})
        seen.add(mid); new += 1
    m.logout()
    LOG.parent.mkdir(exist_ok=True)
    with open(LOG, "w", encoding="utf-8") as f:
        for r in sorted(rows, key=lambda x: x.get("date", "")):
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    print(f"{new} nouvelle(s) reponse(s) recoltee(s). Total: {len(rows)}. -> Claude en tire des sujets d'articles.")


def main():
    if "--print-email" in sys.argv:
        print("=== SUJET EN ===", SUBJECT_EN, "\n" + EMAIL_EN)
        print("\n=== SUJET FR ===", SUBJECT_FR, "\n" + EMAIL_FR)
    elif "--send" in sys.argv:
        cmd_send("--live" in sys.argv)
    elif "--harvest" in sys.argv:
        cmd_harvest()
    else:
        print("Usage: --print-email | --send [--live] | --harvest")


if __name__ == "__main__":
    main()
