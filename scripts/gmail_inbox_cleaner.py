#!/usr/bin/env python3
"""
gmail_inbox_cleaner.py
Analyse complete de la boite Gmail info.tokyoinsights@gmail.com :
- Liste tous les emails de l'INBOX
- Categorise : utiles (tokyo-insights/tokyo-expat) vs inutiles
- Supprime les emails inutiles (newsletters, promo, notifications auto)
- Genere des drafts si une reponse est necessaire
Run: python scripts/gmail_inbox_cleaner.py
"""

import imaplib
import email
import json
import sys
import io
import smtplib
import time
from email.header import decode_header
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from datetime import datetime

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SCRIPT_DIR = Path(__file__).parent
ENV_FILE = SCRIPT_DIR / ".env"
REPORT_FILE = SCRIPT_DIR / "data" / "inbox_analysis_report.json"

GMAIL_ADDRESS = None
GMAIL_APP_PASSWORD = None

for line in ENV_FILE.read_text(encoding='utf-8').splitlines():
    if line.startswith('GMAIL_ADDRESS='):
        GMAIL_ADDRESS = line.split('=', 1)[1].strip()
    elif line.startswith('GMAIL_APP_PASSWORD='):
        GMAIL_APP_PASSWORD = line.split('=', 1)[1].strip().replace(' ', '')

# ── Patterns UTILES (garder + analyser) ──────────────────────────────────────
USEFUL_SENDER_KEYWORDS = [
    'impact.com', 'impactradius', 'revolut', 'wise.com', 'safetywing',
    'italki', 'getyourguide', 'sakuramobile', 'arigatojapan', 'cigna',
    'partnerize', 'refersion',
    'google.com', 'search.google', 'searchconsole',
    'vercel.com',
    'brevo.com', 'sendinblue.com',
    'namecheap',
    'japantimes', 'internations',
    'expatcom', 'numbeo',
    'tokyoinsights', 'tokyo-expat', 'tokyoexpat',
]

USEFUL_SUBJECT_KEYWORDS = [
    'tokyo', 'expat', 'japan', 'affiliate', 'partner',
    'revolut', 'wise', 'safetywing', 'italki', 'getyourguide',
    'backlink', 'collaboration', 'partnership', 'resource',
    'verification', 'confirm', 'approval', 'approved', 'welcome',
    'payment', 'commission', 'payout', 'earnings',
    'analytics', 'search console', 'vercel', 'deploy',
    'sakura', 'arigato', 'cigna',
]

# ── Patterns INUTILES (supprimer) ────────────────────────────────────────────
USELESS_SENDER_KEYWORDS = [
    'linkedin', 'facebook', 'instagram', 'twitter', 'x.com',
    'amazon', 'ebay', 'aliexpress',
    'netflix', 'spotify', 'apple',
    'medium.com', 'substack.com',
    'mailchimp', 'klaviyo', 'hubspot', 'constantcontact',
    'producthunt.com',
    'quora.com', 'reddit.com',
    'zoom.us', 'webex',
    'canva.com',
    'godaddy',
    'wix.com', 'squarespace',
    'shopify',
    'fiverr', 'upwork',
    'tradingview',
    'coinbase', 'binance', 'kraken',
    'noreply@github.com', 'notifications@github.com',
    'updates@', 'newsletter@', 'marketing@', 'news@',
    'donotreply@', 'no-reply@',
]

USELESS_SUBJECT_KEYWORDS = [
    'newsletter', 'weekly digest', 'monthly digest', 'daily digest',
    'unsubscribe', 'promotional', '% off', 'sale ends',
    'black friday', 'cyber monday', 'flash sale',
    'survey', 'feedback request', 'how are we doing',
    'job alert', 'new job opportunity', 'recruiter',
    'you have a new connection', 'viewed your profile',
    'congratulations on', 'people you may know',
    'your order', 'shipped', 'delivery',
    'upgrade your plan', 'trial ending',
    'webinar', 'virtual event',
]

# ── Emails qui peuvent necessiter une reponse ─────────────────────────────────
REPLY_NEEDED_KEYWORDS = [
    'question', 'inquiry', 'hello', 'hi there', 'dear',
    'interested in', 'would like to', 'can you', 'could you',
    're:', 'fwd:', 'response needed', 'reply needed',
    'partnership proposal', 'collaboration proposal',
    'approved', 'rejected', 'review complete',
    'invoice', 'payment required',
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


def get_body_preview(msg, max_chars=500):
    """Extrait les 500 premiers caracteres du corps de l'email."""
    body = ''
    if msg.is_multipart():
        for part in msg.walk():
            ct = part.get_content_type()
            cd = str(part.get('Content-Disposition', ''))
            if ct == 'text/plain' and 'attachment' not in cd:
                try:
                    charset = part.get_content_charset() or 'utf-8'
                    body = part.get_payload(decode=True).decode(charset, errors='replace')
                    break
                except Exception:
                    continue
    else:
        try:
            charset = msg.get_content_charset() or 'utf-8'
            body = msg.get_payload(decode=True).decode(charset, errors='replace')
        except Exception:
            pass
    return body[:max_chars].replace('\n', ' ').replace('\r', '').strip()


def categorize_email(from_addr, subject, body_preview):
    """Retourne 'useful', 'useless', ou 'review'."""
    from_lower = from_addr.lower()
    subject_lower = subject.lower()

    # Check useless first (newsletters, promos)
    for kw in USELESS_SENDER_KEYWORDS:
        if kw in from_lower:
            return 'useless'
    for kw in USELESS_SUBJECT_KEYWORDS:
        if kw in subject_lower:
            return 'useless'

    # Check useful (business-related)
    for kw in USEFUL_SENDER_KEYWORDS:
        if kw in from_lower:
            return 'useful'
    for kw in USEFUL_SUBJECT_KEYWORDS:
        if kw in subject_lower:
            return 'useful'

    # Unknown -> review manually
    return 'review'


def needs_reply(subject, body_preview):
    subject_lower = subject.lower()
    body_lower = body_preview.lower()
    for kw in REPLY_NEEDED_KEYWORDS:
        if kw in subject_lower or kw in body_lower:
            return True
    return False


def move_to_trash_gmail(mail, uid):
    """Deplace un email vers la corbeille Gmail via IMAP."""
    try:
        result = mail.uid('COPY', uid, '[Gmail]/Trash')
        if result[0] == 'OK':
            mail.uid('STORE', uid, '+FLAGS', '\\Deleted')
            return True
    except Exception as e:
        print(f"  [WARN] Erreur suppression UID {uid}: {e}")
    return False


def create_draft(mail, to_addr, subject, body):
    """Cree un draft dans Gmail."""
    msg = MIMEMultipart('alternative')
    msg['From'] = GMAIL_ADDRESS
    msg['To'] = to_addr
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain', 'utf-8'))

    try:
        raw = msg.as_bytes()
        result = mail.append('[Gmail]/Drafts', '\\Draft', imaplib.Time2Internaldate(time.time()), raw)
        return result[0] == 'OK'
    except Exception as e:
        print(f"  [WARN] Erreur creation draft: {e}")
        return False


def main():
    print("=" * 60)
    print("GMAIL INBOX CLEANER - Tokyo Insights/Expat")
    print(f"Compte : {GMAIL_ADDRESS}")
    print("=" * 60)

    # ── Connexion IMAP ────────────────────────────────────────
    mail = imaplib.IMAP4_SSL('imap.gmail.com', 993)
    mail.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
    mail.select('INBOX')

    # Fetch ALL message UIDs
    _, data = mail.uid('SEARCH', None, 'ALL')
    uids = data[0].split()
    print(f"\n{len(uids)} emails trouves dans l'INBOX\n")

    useful = []
    useless_uids = []
    useless_list = []
    review_list = []
    reply_needed = []

    for uid in uids:
        try:
            _, msg_data = mail.uid('FETCH', uid, '(BODY.PEEK[HEADER.FIELDS (FROM SUBJECT DATE)])')
            raw = msg_data[0][1]
            msg = email.message_from_bytes(raw)

            from_addr = decode_str(msg.get('From', ''))
            subject   = decode_str(msg.get('Subject', '(no subject)'))
            date_str  = msg.get('Date', '')

            # Fetch body preview for important emails
            body_preview = ''
            category = categorize_email(from_addr, subject, body_preview)

            if category == 'useful':
                # Fetch body for useful emails
                _, full_data = mail.uid('FETCH', uid, '(RFC822)')
                full_msg = email.message_from_bytes(full_data[0][1])
                body_preview = get_body_preview(full_msg)
                category = categorize_email(from_addr, subject, body_preview)

                entry = {
                    'uid': uid.decode(),
                    'from': from_addr,
                    'subject': subject,
                    'date': date_str,
                    'body_preview': body_preview,
                    'reply_needed': needs_reply(subject, body_preview),
                }
                useful.append(entry)
                if entry['reply_needed']:
                    reply_needed.append(entry)

            elif category == 'useless':
                useless_uids.append(uid)
                useless_list.append({'from': from_addr, 'subject': subject, 'date': date_str})

            else:  # review
                review_list.append({
                    'uid': uid.decode(),
                    'from': from_addr,
                    'subject': subject,
                    'date': date_str,
                })

        except Exception as e:
            print(f"  [ERR] UID {uid}: {e}")
            continue

    # ── Rapport ───────────────────────────────────────────────
    print(f"\n{'='*60}")
    print(f"RAPPORT D'ANALYSE")
    print(f"{'='*60}")
    print(f"  Utiles     : {len(useful)}")
    print(f"  A supprimer: {len(useless_uids)}")
    print(f"  A verifier : {len(review_list)}")
    print(f"  Reponse req: {len(reply_needed)}")

    print(f"\n--- EMAILS UTILES ({len(useful)}) ---")
    for e in useful:
        flag = " [REPONSE REQUISE]" if e['reply_needed'] else ""
        print(f"  FROM : {e['from'][:60]}")
        print(f"  SUBJ : {e['subject'][:70]}{flag}")
        print(f"  DATE : {e['date']}")
        print(f"  PREVIEW: {e['body_preview'][:120]}")
        print()

    print(f"\n--- A VERIFIER MANUELLEMENT ({len(review_list)}) ---")
    for e in review_list:
        print(f"  [{e['uid']}] {e['from'][:50]} | {e['subject'][:60]}")

    print(f"\n--- EMAILS INUTILES A SUPPRIMER ({len(useless_uids)}) ---")
    for e in useless_list[:30]:
        print(f"  {e['from'][:50]} | {e['subject'][:60]}")
    if len(useless_list) > 30:
        print(f"  ... et {len(useless_list)-30} autres")

    # ── Suppression des emails inutiles ───────────────────────
    if useless_uids:
        print(f"\nSuppression de {len(useless_uids)} emails inutiles...")
        deleted = 0
        for uid in useless_uids:
            if move_to_trash_gmail(mail, uid):
                deleted += 1
        mail.expunge()
        print(f"  {deleted}/{len(useless_uids)} emails deplaces vers la corbeille.")

    # ── Drafts pour emails necessitant une reponse ────────────
    drafts_created = []
    if reply_needed:
        print(f"\n--- CREATION DE DRAFTS ({len(reply_needed)}) ---")
        for e in reply_needed:
            # Draft generique - a personnaliser
            subject_reply = f"Re: {e['subject']}"
            body = (
                f"Hi,\n\n"
                f"Thank you for reaching out.\n\n"
                f"[YOUR RESPONSE HERE]\n\n"
                f"Best regards,\n"
                f"Alessandro\n"
                f"Tokyo Expat | www.tokyo-expat.com\n"
            )
            # Extract reply-to email
            to_match = e['from']
            import re
            email_match = re.search(r'<([^>]+)>', to_match)
            to_addr = email_match.group(1) if email_match else to_match.strip()

            if create_draft(mail, to_addr, subject_reply, body):
                print(f"  Draft cree -> {to_addr} | {subject_reply[:50]}")
                drafts_created.append({'to': to_addr, 'subject': subject_reply, 'preview': e['body_preview'][:200]})
            else:
                print(f"  Draft ECHEC -> {to_addr}")

    # ── Sauvegarde du rapport ─────────────────────────────────
    report = {
        'timestamp': datetime.now().isoformat(),
        'total_in_inbox': len(uids),
        'useful': useful,
        'review': review_list,
        'deleted_count': len(useless_uids),
        'deleted_list': useless_list,
        'drafts_created': drafts_created,
    }
    REPORT_FILE.parent.mkdir(exist_ok=True)
    with open(REPORT_FILE, 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

    print(f"\nRapport sauvegarde: {REPORT_FILE}")
    print(f"\nTERMINE. {len(useless_uids)} emails supprimes, {len(drafts_created)} drafts crees.")

    mail.close()
    mail.logout()


if __name__ == '__main__':
    main()
