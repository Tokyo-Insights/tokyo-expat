"""
backlink_followup_watcher.py - Relances automatiques de l'outreach backlinks.

Lit outreach_contacts.json. Pour chaque contact au statut 'emailed' avec un email reel :
  1. Detecte une reponse (Gmail IMAP, FROM le contact depuis la date d'envoi)
     -> marque 'responded', alerte, et NE RELANCE PLUS (jamais relancer qui a repondu).
  2. Sinon, a J+FOLLOWUP_DELAY_DAYS sans reponse -> cree UN draft de relance dans Gmail
     (HTML accente, threade comme reponse, depuis contact@tokyo-expat.com) + alerte Telegram.
     Flag followup_prepared = 1 seule fois (doctrine = 1 relance, pas de harcelement).
  3. Apres la relance, si toujours rien apres DROP_AFTER_DAYS -> marque 'declined' (lache).

A lancer quotidiennement (run_daily_watch.bat / Startup).
  python scripts/backlink_followup_watcher.py            # execute (cree drafts + alertes)
  python scripts/backlink_followup_watcher.py --dry-run  # simule, n'ecrit / n'envoie rien
"""
import json
import imaplib
import email
import email.utils
import sys
import io
import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime as dt, timezone, date
from pathlib import Path
import requests
import urllib3

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

try:
    from config import GMAIL_ADDRESS, GMAIL_APP_PASSWORD
except ImportError:
    print("[ERROR] GMAIL_ADDRESS / GMAIL_APP_PASSWORD manquants dans config.py / scripts/.env")
    sys.exit(1)

SCRIPT_DIR = Path(__file__).parent
CONTACTS_FILE = SCRIPT_DIR / "data" / "outreach_contacts.json"
FROM = "Tokyo Expat <contact@tokyo-expat.com>"

FOLLOWUP_DELAY_DAYS = 6    # relancer 6 jours apres l'envoi initial sans reponse
DROP_AFTER_DAYS = 14       # apres la relance, lacher si tjs rien apres ~2 semaines

FR_HINTS = ('.fr', 'ccifj', 'ambafrance', 'airfrance', 'totalenergies', 'bnpparibas',
            'renault', 'edf', 'thales', 'francais', 'france', 'journaldujapon', 'projetjapon')


def is_fr(contact: dict) -> bool:
    blob = (contact.get('domain', '') + contact.get('name', '') + contact.get('email', '')).lower()
    return any(h in blob for h in FR_HINTS)


def followup_bodies(contact: dict):
    """Relance courte et polie. Accents complets en plain ET html (regle d'ecriture)."""
    if is_fr(contact):
        plain = (
            "Bonjour,\n\n"
            "Je me permets de revenir vers vous au sujet de mon message ci-dessous : une ressource "
            "gratuite et bilingue sur le logement à Tokyo, potentiellement utile à votre audience. "
            "Je sais que les boîtes mail débordent.\n\n"
            "Si ce n'est pas le bon moment ou le bon format, aucun souci. Je reste disponible si je peux aider.\n\n"
            "Bien à vous,\nAlessandro\nTokyo Expat, tokyo-expat.com"
        )
        html = (
            "<html><body style=\"font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a1a1a;line-height:1.6;\">"
            "<p>Bonjour,</p>"
            "<p>Je me permets de revenir vers vous au sujet de mon message ci-dessous&nbsp;: une ressource "
            "gratuite et bilingue sur le logement à Tokyo, potentiellement utile à votre audience. "
            "Je sais que les boîtes mail débordent.</p>"
            "<p>Si ce n&rsquo;est pas le bon moment ou le bon format, aucun souci. Je reste disponible si je peux aider.</p>"
            "<p>Bien à vous,<br>Alessandro<br>Tokyo Expat, tokyo-expat.com</p>"
            "</body></html>"
        )
    else:
        plain = (
            "Hi,\n\n"
            "Just following up on my note below about a free, bilingual housing resource for your "
            "audience moving to Tokyo. I know inboxes get busy.\n\n"
            "If it is not the right fit or timing, no problem at all. Happy to share more detail if useful.\n\n"
            "Best,\nAlessandro\nTokyo Expat, tokyo-expat.com"
        )
        html = (
            "<html><body style=\"font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a1a1a;line-height:1.6;\">"
            "<p>Hi,</p>"
            "<p>Just following up on my note below about a free, bilingual housing resource for your "
            "audience moving to Tokyo. I know inboxes get busy.</p>"
            "<p>If it is not the right fit or timing, no problem at all. Happy to share more detail if useful.</p>"
            "<p>Best,<br>Alessandro<br>Tokyo Expat, tokyo-expat.com</p>"
            "</body></html>"
        )
    return plain, html


def has_reply(m: imaplib.IMAP4_SSL, from_email: str, since_imap: str) -> bool:
    try:
        m.select('INBOX', readonly=True)
        _, d = m.search(None, f'(FROM "{from_email}" SINCE "{since_imap}")')
        return bool(d and d[0] and d[0].split())
    except Exception:
        return False


def find_original(m: imaplib.IMAP4_SSL, to_email: str):
    """Recupere Message-ID + Subject du dernier mail envoye a ce contact (pour threader la relance)."""
    for box in ['"[Gmail]/All Mail"', 'INBOX']:
        try:
            m.select(box, readonly=True)
            _, d = m.search(None, f'(TO "{to_email}")')
            if d and d[0] and d[0].split():
                uid = d[0].split()[-1]
                _, md = m.fetch(uid, '(BODY.PEEK[HEADER.FIELDS (MESSAGE-ID SUBJECT)])')
                hdr = md[0][1].decode('utf-8', 'replace')
                mid = subj = ''
                for ln in hdr.splitlines():
                    if ln.lower().startswith('message-id:'):
                        mid = ln.split(':', 1)[1].strip()
                    elif ln.lower().startswith('subject:'):
                        subj = ln.split(':', 1)[1].strip()
                if mid or subj:
                    return mid, subj
        except Exception:
            pass
    return '', ''


def has_sent(m: imaplib.IMAP4_SSL, to_email: str) -> bool:
    """True si un email a REELLEMENT ete envoye a ce contact (dossier Sent, pas un simple brouillon)."""
    for box in ['"[Gmail]/Sent Mail"', 'INBOX']:
        try:
            m.select(box, readonly=True)
            typ, d = m.search(None, f'(TO "{to_email}")')
            if box.startswith('"[Gmail]/Sent') and d and d[0] and d[0].split():
                return True
        except Exception:
            pass
    return False


def send_telegram(msg: str) -> None:
    try:
        requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
            json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10, verify=False,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def main():
    dry = '--dry-run' in sys.argv
    if not CONTACTS_FILE.exists():
        print("Pas de outreach_contacts.json"); return
    contacts = json.load(open(CONTACTS_FILE, encoding='utf-8'))
    today = date.today()

    m = imaplib.IMAP4_SSL('imap.gmail.com')
    m.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)

    changed = False
    alerts = []

    for c in contacts:
        email_addr = (c.get('email') or '').strip()

        # BOUCLE FERMEE ("Je stocke, tu cliques"): un brouillon stocke qu'Alessandro a ENVOYE
        # (detecte dans le dossier Sent) passe en 'emailed' -> la relance J+6 s'arme toute seule.
        if c.get('status') == 'drafted' and '@' in email_addr:
            if has_sent(m, email_addr):
                alerts.append(f"📤 <b>{c['name']}</b> : brouillon envoyé détecté, relance armée (J+{FOLLOWUP_DELAY_DAYS}).")
                if not dry:
                    c['status'] = 'emailed'
                    c['emailed_date'] = today.isoformat()
                    c['last_contact'] = today.isoformat()
                    changed = True
            continue

        if c.get('status') != 'emailed' or '@' not in email_addr:
            continue
        # Ignorer la prospection B2B vente (DA=0, emails devines/bounces, pas des cibles backlink).
        if c.get('da_est', 0) == 0 or c.get('type') == 'b2b_corporate':
            continue
        ed = c.get('emailed_date') or c.get('last_contact')
        if not ed:
            continue
        try:
            ed_date = date.fromisoformat(ed)
        except ValueError:
            continue
        days = (today - ed_date).days
        since_imap = ed_date.strftime('%d-%b-%Y')

        # 1) Reponse recue ? -> ne plus jamais relancer
        if has_reply(m, email_addr, since_imap):
            alerts.append(f"💬 <b>{c['name']}</b> a RÉPONDU ! (vérifie Gmail, puis update statut)")
            if not dry:
                c['status'] = 'responded'
                c['last_contact'] = today.isoformat()
                c['response'] = 'reponse auto-detectee'
                changed = True
            continue

        # 2) Deja relance ? -> attendre, ou lacher apres long silence
        fp = c.get('followup_prepared')
        if fp:
            try:
                fp_date = date.fromisoformat(fp)
                if (today - fp_date).days >= DROP_AFTER_DAYS:
                    alerts.append(f"⏭️ <b>{c['name']}</b> : pas de réponse après relance, classé (lâché).")
                    if not dry:
                        c['status'] = 'declined'
                        c['response'] = 'pas de reponse apres relance'
                        changed = True
            except ValueError:
                pass
            continue

        # 3) Relance due (J+6 sans reponse) ?
        if days >= FOLLOWUP_DELAY_DAYS:
            mid, subj = find_original(m, email_addr)
            # Garde-fou : ne relancer QUE si un email a vraiment ete envoye a ce contact.
            # Sinon le statut 'emailed' est errone (jamais envoye) -> on n'invente pas un "suivi".
            if not mid and not subj:
                print(f"  [SKIP] {c['name']}: aucun email reellement envoye trouve (statut 'emailed' a verifier).")
                continue
            subject = subj if subj.lower().startswith('re:') else (('Re: ' + subj) if subj else 'Re: Tokyo Expat')
            plain, html = followup_bodies(c)
            alerts.append(f"🔁 <b>{c['name']}</b> : relance due (emailé il y a {days}j, sans réponse). Draft prêt dans Gmail.")
            if not dry:
                msg = MIMEMultipart('alternative')
                msg['From'] = FROM
                msg['To'] = f"{c['name']} <{email_addr}>"
                msg['Subject'] = subject
                msg['Date'] = email.utils.formatdate(localtime=True)
                msg['Message-ID'] = email.utils.make_msgid()
                if mid:
                    msg['In-Reply-To'] = mid
                    msg['References'] = mid
                msg.attach(MIMEText(plain, 'plain', 'utf-8'))
                msg.attach(MIMEText(html, 'html', 'utf-8'))
                m.append('[Gmail]/Drafts', None, imaplib.Time2Internaldate(dt.now(timezone.utc)), msg.as_bytes())
                c['followup_prepared'] = today.isoformat()
                changed = True

    if changed and not dry:
        json.dump(contacts, open(CONTACTS_FILE, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
    m.logout()

    prefix = "[DRY-RUN] " if dry else ""
    if alerts:
        head = f"🔗 <b>BACKLINK RELANCES</b> — {today}\n\n"
        body = "\n".join(alerts)
        print(prefix + head.replace('<b>', '').replace('</b>', '') + body.replace('<b>', '').replace('</b>', ''))
        if not dry:
            send_telegram(head + body)
    else:
        print(f"{prefix}[{today}] Aucune relance due.")


if __name__ == "__main__":
    main()
