"""
email_sender.py -- Envoi automatique des emails outreach via Gmail SMTP (App Password)
Lit outreach_contacts.json, envoie aux contacts "to_contact", met a jour le statut.

SETUP :
1. Google Account -> Securite -> Validation en 2 etapes -> Mots de passe des applications
2. Cree un mot de passe pour "Mail" (16 caracteres)
   !! Ce n'est PAS ton mot de passe Gmail. C'est un code separe, revocable a tout moment.
3. Dans scripts/.env :
   GMAIL_ADDRESS=info.tokyoinsights@gmail.com
   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   (espaces OK, ils sont supprimes auto)

Run: python scripts/email_sender.py              # envoie les 2 prochains contacts to_contact
     python scripts/email_sender.py --preview    # affiche les emails SANS envoyer
     python scripts/email_sender.py --domain savvytokyo.com  # envoie a ce domaine uniquement
"""

import json
import datetime
import smtplib
import sys
import io
import os
import time
import requests
import urllib3
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

_env = Path(__file__).parent / '.env'
if _env.exists():
    for line in _env.read_text(encoding='utf-8').splitlines():
        if '=' in line and not line.startswith('#'):
            k, v = line.split('=', 1)
            os.environ.setdefault(k.strip(), v.strip())

from config import TE_TOKEN, TE_CHAT_ID

GMAIL_ADDRESS = os.environ.get('GMAIL_ADDRESS', '')
GMAIL_APP_PASSWORD = os.environ.get('GMAIL_APP_PASSWORD', '').replace(' ', '')

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
CONTACTS_FILE = DATA_DIR / "outreach_contacts.json"
LOG_FILE = DATA_DIR / "email_sent_log.json"

MAX_PER_RUN = 2  # Max 2 emails par run pour eviter le spam flag Gmail


def send_telegram(msg: str):
    try:
        requests.post(
            f"https://api.telegram.org/bot{TE_TOKEN}/sendMessage",
            json={"chat_id": TE_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10, verify=VERIFY_SSL,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def load_contacts() -> list:
    if CONTACTS_FILE.exists():
        try:
            with open(CONTACTS_FILE, encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return []


def save_contacts(contacts: list):
    with open(CONTACTS_FILE, "w", encoding="utf-8") as f:
        json.dump(contacts, f, indent=2, ensure_ascii=False)


def load_log() -> list:
    if LOG_FILE.exists():
        try:
            with open(LOG_FILE, encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return []


def save_log(log: list):
    DATA_DIR.mkdir(exist_ok=True)
    with open(LOG_FILE, "w", encoding="utf-8") as f:
        json.dump(log, f, indent=2, ensure_ascii=False)


def build_email(contact: dict) -> tuple[str, str]:
    """Retourne (subject, body_texte) pour ce contact."""
    domain = contact.get("domain", "")
    name = contact.get("name", domain)
    contact_name = contact.get("contact_name", "")
    greeting = f"Hi {contact_name}" if contact_name else "Hi"
    type_ = contact.get("type", "backlink")

    if type_ == "guest_post":
        subject = "Guest post proposal — Tokyo expat housing guide"
        body = (
            f"{greeting},\n\n"
            f"I've been reading {name} for a while. "
            "Your coverage of expat life in Japan is exactly what I'm building on the English and French-speaking side.\n\n"
            "I run Tokyo Expat (tokyo-expat.com), a housing and relocation guide for foreigners moving to Tokyo. "
            "I'd love to contribute a guest article tailored to your audience.\n\n"
            "A few topics I could write:\n"
            "- The Japanese guarantor system for foreigners (with actionable solutions)\n"
            "- Share house vs apartment: which to choose first when arriving in Tokyo\n"
            "- Finding a Tokyo apartment before you land: a practical remote-search guide\n\n"
            "All original, 100% English (or bilingual EN/FR), not published elsewhere.\n\n"
            "Would you be open to a guest post? Happy to share writing samples.\n\n"
            "Best regards,\n"
            "Alessandro\n"
            "Tokyo Expat | www.tokyo-expat.com"
        )

    elif type_ == "broken_link":
        dead_url = contact.get("dead_url", "")
        our_url = contact.get("our_url", "https://www.tokyo-expat.com/en/blog/find-apartment-tokyo-foreigner")
        subject = f"Broken link on {name} -- replacement available"
        body = (
            f"{greeting},\n\n"
            f"I noticed your site links to a page that now returns a 404 error:\n"
            f"{dead_url}\n\n"
            "We've published an up-to-date guide covering the same topic:\n"
            f"{our_url}\n\n"
            "Would you consider updating the link? "
            "Happy to write a short intro paragraph tailored to your audience if that helps.\n\n"
            "Best regards,\n"
            "Alessandro\n"
            "Tokyo Expat | www.tokyo-expat.com"
        )

    else:
        subject = "Tokyo housing resource -- potential collaboration"
        body = (
            f"{greeting},\n\n"
            f"I run Tokyo Expat (tokyo-expat.com), a practical housing and relocation guide for foreigners moving to Tokyo. "
            "I build guides covering everything from share houses to furnished apartments, the guarantor system, "
            "visa requirements, and cost of living.\n\n"
            f"I noticed {name} covers Japan expat topics and thought there might be a fit. "
            "Whether that's a resource mention, a guest article, or just a conversation -- I'm open.\n\n"
            "Our most-visited guides:\n"
            "- Find apartment in Tokyo as a foreigner: tokyo-expat.com/en/blog/find-apartment-tokyo-foreigner\n"
            "- Share house Tokyo 2026: tokyo-expat.com/en/blog/share-house-tokyo-guide-2026\n"
            "- Japan Digital Nomad Visa: tokyo-expat.com/en/blog/japan-digital-nomad-visa-2026\n\n"
            "Happy to exchange if this seems like a fit.\n\n"
            "Best,\n"
            "Alessandro\n"
            "Tokyo Expat | www.tokyo-expat.com"
        )

    return subject, body


def send_email(to_address: str, subject: str, body: str) -> bool:
    """Envoie via Gmail SMTP SSL. Retourne True si succes."""
    msg = MIMEMultipart("alternative")
    msg["From"] = f"Alessandro | Tokyo Expat <{GMAIL_ADDRESS}>"
    msg["To"] = to_address
    msg["Subject"] = subject

    body_html = (
        "<html><body>"
        "<p style='font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#333;'>"
        + body.replace("\n\n", "</p><p style='font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#333;'>")
            .replace("\n", "<br>")
        + "</p></body></html>"
    )

    msg.attach(MIMEText(body, "plain", "utf-8"))
    msg.attach(MIMEText(body_html, "html", "utf-8"))

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
            smtp.sendmail(GMAIL_ADDRESS, to_address, msg.as_string())
        return True
    except smtplib.SMTPAuthenticationError:
        print("SMTP Auth erreur: verifier GMAIL_APP_PASSWORD dans .env")
        return False
    except Exception as e:
        print(f"SMTP erreur: {e}")
        return False


def main():
    args = sys.argv[1:]
    preview = "--preview" in args
    target_domain = None
    if "--domain" in args:
        idx = args.index("--domain")
        if idx + 1 < len(args):
            target_domain = args[idx + 1].lower()

    if not preview and (not GMAIL_ADDRESS or not GMAIL_APP_PASSWORD):
        msg = (
            "<b>EMAIL SENDER</b> -- Configuration requise\n\n"
            "1. Google Compte > Securite > Mots de passe des applications\n"
            "2. Cree un mot de passe pour 'Mail' (16 chars)\n"
            "   Ce n'est PAS ton mot de passe Gmail normal.\n"
            "3. Dans scripts/.env :\n"
            "   GMAIL_ADDRESS=info.tokyoinsights@gmail.com\n"
            "   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx"
        )
        send_telegram(msg)
        print("Gmail App Password manquant.")
        return

    contacts = load_contacts()
    log = load_log()
    logged_domains = {e["domain"] for e in log}

    PRIORITY = {"high": 0, "medium": 1, "low": 2}
    eligible = [
        c for c in contacts
        if c.get("status", "to_contact") == "to_contact"
        and c.get("domain", "") not in logged_domains
        and c.get("email", "")
        and (target_domain is None or target_domain in c.get("domain", "").lower())
    ]
    eligible.sort(key=lambda x: (PRIORITY.get(x.get("priority", "low"), 2), -x.get("da_est", 0)))

    to_send = eligible[:1] if target_domain else eligible[:MAX_PER_RUN]

    if not to_send:
        print("Aucun contact eligible (to_contact + email connu + pas encore envoye).")
        return

    sent_ok = []
    for contact in to_send:
        domain = contact.get("domain", "")
        email = contact.get("email", "")
        subject, body = build_email(contact)

        print(f"\n{'='*55}")
        print(f"TO      : {email}")
        print(f"SUBJECT : {subject}")
        print(f"BODY    :\n{body}")
        print(f"{'='*55}")

        if not preview:
            ok = send_email(email, subject, body)
            if ok:
                contact["status"] = "emailed"
                contact["emailed_date"] = datetime.date.today().isoformat()
                log.append({
                    "domain": domain,
                    "email": email,
                    "date": datetime.date.today().isoformat(),
                    "subject": subject,
                })
                sent_ok.append(f"{domain}")
                print(f"Envoye a {email}")
                time.sleep(30)  # Pause anti-spam entre emails
            else:
                print(f"Echec pour {email}")
        else:
            sent_ok.append(f"[PREVIEW] {domain}")

    if not preview and sent_ok:
        save_contacts(contacts)
        save_log(log)
        send_telegram(
            f"<b>OUTREACH EMAILS</b> -- {datetime.date.today()}\n"
            f"Envoyes : {', '.join(sent_ok)}\n"
            f"Reponses attendues dans 3-7 jours.\n"
            f"Mise a jour statut : <code>python scripts/outreach_tracker.py --update DOMAIN replied</code>"
        )
    elif preview:
        print(f"\n[PREVIEW] Seraient envoyes : {', '.join(sent_ok)}")


if __name__ == "__main__":
    main()
