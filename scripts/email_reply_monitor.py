"""
email_reply_monitor.py — Gmail IMAP Monitor for Outreach Replies & Bounces
Scanne la boite Gmail pour detecter :
- Bounces (mailer-daemon, postmaster) -> update status="bounced" + note type erreur
- Reponses positives depuis domaines contactes -> alerte Telegram
- Met a jour outreach_contacts.json automatiquement

Run: python scripts/email_reply_monitor.py
Schedule: ajouter dans run_weekly_intelligence.bat (avant email_sender.py)
"""
import imaplib
import email
import json
import re
import sys
import io
import datetime
from email.header import decode_header
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
CONTACTS_FILE = DATA_DIR / "outreach_contacts.json"
STATE_FILE = DATA_DIR / "email_monitor_state.json"

GMAIL_ADDRESS = None
GMAIL_APP_PASSWORD = None

try:
    env_path = SCRIPT_DIR / ".env"
    if env_path.exists():
        for line in env_path.read_text(encoding='utf-8').splitlines():
            if line.startswith('GMAIL_ADDRESS='):
                GMAIL_ADDRESS = line.split('=', 1)[1].strip()
            elif line.startswith('GMAIL_APP_PASSWORD='):
                GMAIL_APP_PASSWORD = line.split('=', 1)[1].strip().replace(' ', '')
except Exception as e:
    print(f"[WARN] .env read error: {e}")

# Bounce patterns : (smtp_code_pattern, status_label, description)
BOUNCE_PATTERNS = [
    (r'550 5\.1\.[12]|user unknown|address.*not found|no such user', 'bounced', 'Adresse inexistante (550)'),
    (r'554 5\.4\.14|hop count exceeded|mail loop', 'server_bounce', 'Mail loop serveur (554 5.4.14)'),
    (r'550 5\.4\.1|relay.*denied|not authorized', 'bounced', 'Relay refuse (550 5.4.1)'),
    (r'421|452|connection.*timed out', 'retry', 'Erreur temporaire serveur (retry)'),
    (r'550 5\.7\.|spam|blacklist|blocked', 'bounced_spam', 'Bloque comme spam (550 5.7.x)'),
    (r'mailbox full|over quota', 'bounced', 'Boite pleine'),
]

BOUNCE_SENDERS = [
    'mailer-daemon', 'postmaster', 'mail delivery subsystem',
    'delivery status notification', 'undeliverable', 'mail delivery failed',
    'auto-submitted', 'failed delivery'
]

# Expéditeurs à ignorer complètement (newsletters, notifications système)
IGNORED_SENDERS = [
    'noreply@vercel.com', 'notifications@vercel.com', 'vercel.com',
    'noreply@github.com', 'notifications@github.com',
    'noreply@', 'no-reply@', 'donotreply@',
]

def decode_str(s):
    if not s:
        return ''
    parts = decode_header(s)
    result = []
    for part, enc in parts:
        if isinstance(part, bytes):
            result.append(part.decode(enc or 'utf-8', errors='replace'))
        else:
            result.append(str(part))
    return ' '.join(result)

def load_state():
    if STATE_FILE.exists():
        with open(STATE_FILE, encoding='utf-8') as f:
            return json.load(f)
    return {'last_uid': 0, 'processed_uids': []}

def save_state(state):
    with open(STATE_FILE, 'w', encoding='utf-8') as f:
        json.dump(state, f, indent=2)

def load_contacts():
    with open(CONTACTS_FILE, encoding='utf-8') as f:
        return json.load(f)

def save_contacts(contacts):
    with open(CONTACTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(contacts, f, indent=2, ensure_ascii=False)

def get_contact_domain(from_addr, contacts):
    """Trouve le contact correspondant a une adresse email."""
    from_addr = from_addr.lower()
    for c in contacts:
        domain = c.get('domain', '').lower()
        email_addr = c.get('email', '').lower()
        if domain and domain in from_addr:
            return c
        if email_addr and email_addr in from_addr:
            return c
    return None

def detect_bounce_type(body_text):
    """Detecte le type de bounce depuis le corps du NDR."""
    body_lower = body_text.lower()
    for pattern, status, description in BOUNCE_PATTERNS:
        if re.search(pattern, body_lower):
            return status, description
    return 'bounced', 'Bounce non classe'

def extract_recipient_from_bounce(body_text):
    """Extrait l'adresse destinataire depuis un NDR."""
    patterns = [
        r'final.recipient.*?<([^>]+)>',
        r'recipient address.*?:\s*([^\s\n]+@[^\s\n]+)',
        r'to:\s*([^\s\n]+@[^\s\n]+)',
        r'delivery.*?to\s+([^\s\n]+@[^\s\n]+)',
    ]
    for pat in patterns:
        m = re.search(pat, body_text, re.IGNORECASE)
        if m:
            return m.group(1).strip().strip('<>')
    return None

def get_email_body(msg):
    """Extrait le texte du corps de l'email."""
    body = ''
    if msg.is_multipart():
        for part in msg.walk():
            ctype = part.get_content_type()
            if ctype == 'text/plain':
                try:
                    body += part.get_payload(decode=True).decode('utf-8', errors='replace')
                except Exception:
                    pass
    else:
        try:
            body = msg.get_payload(decode=True).decode('utf-8', errors='replace')
        except Exception:
            pass
    return body

def send_telegram(msg):
    try:
        requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
            json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10, verify=False,
        )
    except Exception as e:
        print(f"[WARN] Telegram: {e}")

def main():
    if not GMAIL_ADDRESS or not GMAIL_APP_PASSWORD:
        print("[ERROR] GMAIL_ADDRESS ou GMAIL_APP_PASSWORD manquant dans .env")
        return

    print(f"\n{'='*60}")
    print(f"EMAIL REPLY MONITOR - {datetime.date.today()}")
    print(f"Compte: {GMAIL_ADDRESS}")
    print(f"{'='*60}\n")

    contacts = load_contacts()
    state = load_state()
    emailed_contacts = [c for c in contacts if c.get('status') == 'emailed']
    emailed_domains = {c.get('domain', '').lower() for c in emailed_contacts}

    print(f"Contacts en attente de reponse : {len(emailed_contacts)}")

    # Connexion IMAP
    try:
        mail = imaplib.IMAP4_SSL('imap.gmail.com', 993)
        mail.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
        print("[OK] Connexion Gmail IMAP")
    except Exception as e:
        print(f"[ERROR] Connexion IMAP echouee: {e}")
        return

    bounces_found = []
    replies_found = []
    updated_contacts = False

    try:
        mail.select('INBOX')

        # Chercher emails non lus depuis la derniere session
        since_date = (datetime.date.today() - datetime.timedelta(days=30)).strftime('%d-%b-%Y')
        _, msg_ids = mail.search(None, f'(SINCE {since_date})')
        all_ids = msg_ids[0].split() if msg_ids[0] else []
        print(f"Emails des 30 derniers jours : {len(all_ids)}")

        processed = set(str(uid) for uid in state.get('processed_uids', []))
        new_ids = [uid for uid in all_ids if uid.decode() not in processed]
        print(f"Nouveaux a analyser : {len(new_ids)}")

        for uid in new_ids:
            _, msg_data = mail.fetch(uid, '(RFC822)')
            if not msg_data or not msg_data[0]:
                continue
            raw = msg_data[0][1]
            msg = email.message_from_bytes(raw)

            from_addr = decode_str(msg.get('From', '')).lower()
            subject = decode_str(msg.get('Subject', ''))
            body = get_email_body(msg)

            # Ignorer les expediteurs systeme (Vercel, GitHub, newsletters noreply)
            if any(ign in from_addr for ign in IGNORED_SENDERS):
                processed.add(uid.decode())
                continue

            # Detection bounce (NDR)
            is_bounce = any(s in from_addr for s in BOUNCE_SENDERS)
            bounce_subj = any(kw in subject.lower() for kw in [
                'undeliverable', 'delivery', 'failed', 'bounce', 'returned', 'could not deliver'
            ])

            if is_bounce or bounce_subj:
                recipient = extract_recipient_from_bounce(body) or extract_recipient_from_bounce(subject)
                bounce_status, bounce_desc = detect_bounce_type(body)

                # Trouver le contact correspondant
                contact = None
                if recipient:
                    r_domain = recipient.split('@')[-1].lower() if '@' in recipient else ''
                    for c in contacts:
                        if c.get('domain', '').lower() == r_domain or c.get('email', '').lower() == recipient.lower():
                            contact = c
                            break

                if contact:
                    old_status = contact.get('status', '')
                    if old_status not in ('bounced', 'server_bounce', 'bounced_spam'):
                        contact['status'] = bounce_status
                        contact['notes'] = (contact.get('notes', '') + f" | BOUNCE {datetime.date.today()}: {bounce_desc}").strip(' |')
                        contact['email'] = ''
                        updated_contacts = True
                        bounces_found.append({
                            'name': contact.get('name', r_domain),
                            'email': recipient,
                            'type': bounce_desc,
                            'status': bounce_status,
                        })
                        print(f"  BOUNCE detecte: {recipient} -> {bounce_desc}")
                else:
                    print(f"  BOUNCE sans contact: {recipient or from_addr} ({bounce_desc})")
                    bounces_found.append({
                        'name': recipient or from_addr,
                        'email': recipient or '',
                        'type': bounce_desc,
                        'status': 'unknown',
                    })

            else:
                # Chercher reponses de domaines contactes
                from_domain = re.search(r'@([\w.-]+)', from_addr)
                from_domain = from_domain.group(1) if from_domain else ''

                if from_domain and any(from_domain in d or d in from_domain for d in emailed_domains):
                    contact = get_contact_domain(from_addr, contacts)
                    is_positive = not any(kw in subject.lower() for kw in [
                        'out of office', 'auto-reply', 'automatic reply', 'vacation', 'absence',
                        'newsletter', 'unsubscribe', 'marketing', 'promotion', 'update',
                        'notification', 'confirm', 'welcome', 'getting started',
                    ]) and 'noreply' not in from_addr and 'no-reply' not in from_addr
                    if is_positive:
                        if contact:
                            contact['status'] = 'replied'
                            contact['response'] = f"Reponse recue {datetime.date.today()}: {subject[:100]}"
                            updated_contacts = True
                        replies_found.append({
                            'from': from_addr,
                            'subject': subject[:100],
                            'domain': from_domain,
                        })
                        print(f"  REPONSE: {from_addr} - {subject[:80]}")

            processed.add(uid.decode())

        state['processed_uids'] = list(processed)[-500:]  # garder les 500 derniers
        save_state(state)

        if updated_contacts:
            save_contacts(contacts)
            print(f"\n[OK] outreach_contacts.json mis a jour")

    finally:
        mail.logout()

    # Rapport final
    print(f"\n{'='*60}")
    print(f"RESULTAT: {len(bounces_found)} bounces, {len(replies_found)} reponses")

    # Telegram alert
    if bounces_found or replies_found:
        lines = [f"Email Monitor - {datetime.date.today()}\n"]

        if replies_found:
            lines.append(f"REPONSES RECUES ({len(replies_found)}):")
            for r in replies_found:
                lines.append(f"  <b>{r['domain']}</b>: {r['subject']}")
            lines.append("")

        if bounces_found:
            lines.append(f"BOUNCES DETECTES ({len(bounces_found)}):")
            for b in bounces_found:
                icon = "LOOP" if 'loop' in b['type'].lower() else "ADDR"
                lines.append(f"  [{icon}] {b['name']}: {b['type']}")
            lines.append("\noutreach_contacts.json mis a jour automatiquement.")

        send_telegram('\n'.join(lines))
        print("[OK] Telegram alert envoyee")
    else:
        print("Aucun bounce ni reponse detecte.")

if __name__ == '__main__':
    main()
