#!/usr/bin/env python3
"""Fetch full content of specific emails + delete useless drafts."""
import imaplib, email, sys, io, re
from email.header import decode_header
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8','utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SCRIPT_DIR = Path(__file__).parent
GMAIL_ADDRESS = None
GMAIL_APP_PASSWORD = None
for line in (SCRIPT_DIR/".env").read_text(encoding='utf-8').splitlines():
    if line.startswith('GMAIL_ADDRESS='): GMAIL_ADDRESS = line.split('=',1)[1].strip()
    elif line.startswith('GMAIL_APP_PASSWORD='): GMAIL_APP_PASSWORD = line.split('=',1)[1].strip().replace(' ','')

def decode_str(s):
    if not s: return ''
    parts = decode_header(s)
    result = []
    for part, enc in parts:
        if isinstance(part, bytes): result.append(part.decode(enc or 'utf-8', errors='replace'))
        else: result.append(str(part))
    return ' '.join(result)

def get_body(msg):
    body = ''
    if msg.is_multipart():
        for part in msg.walk():
            ct = part.get_content_type()
            cd = str(part.get('Content-Disposition',''))
            if ct == 'text/plain' and 'attachment' not in cd:
                try:
                    charset = part.get_content_charset() or 'utf-8'
                    body = part.get_payload(decode=True).decode(charset, errors='replace')
                    break
                except: continue
        if not body:  # fallback to html
            for part in msg.walk():
                if part.get_content_type() == 'text/html':
                    try:
                        charset = part.get_content_charset() or 'utf-8'
                        body = part.get_payload(decode=True).decode(charset, errors='replace')
                        # strip html tags roughly
                        body = re.sub(r'<[^>]+>', ' ', body)
                        body = re.sub(r'\s+', ' ', body)
                        break
                    except: continue
    else:
        try:
            charset = msg.get_content_charset() or 'utf-8'
            body = msg.get_payload(decode=True).decode(charset, errors='replace')
        except: pass
    return body.strip()

mail = imaplib.IMAP4_SSL('imap.gmail.com', 993)
mail.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)

# ── 1. Fetch specific emails from INBOX ──────────────────────────────────────
mail.select('INBOX')
TARGET_UIDS = {
    'sakura_apply': b'828',
    'sakura_approved': b'847',
    'sakura_link': b'848',
    'connectively_concern1': b'836',
    'connectively_hold': b'837',
    'connectively_concern2': b'838',
    'qwoted_forbes': b'835',
    'qwoted_yahoo': b'845',
}

print("=" * 70)
for label, uid in TARGET_UIDS.items():
    try:
        _, data = mail.uid('FETCH', uid, '(RFC822)')
        msg = email.message_from_bytes(data[0][1])
        subject = decode_str(msg.get('Subject',''))
        from_addr = decode_str(msg.get('From',''))
        body = get_body(msg)
        print(f"\n### {label.upper()} ###")
        print(f"FROM   : {from_addr}")
        print(f"SUBJECT: {subject}")
        print(f"BODY   :\n{body[:3000]}")
        print("-" * 70)
    except Exception as e:
        print(f"[ERR] {label}: {e}")

# ── 2. Delete useless drafts ─────────────────────────────────────────────────
print("\n\n=== SUPPRESSION DRAFTS INUTILES ===")
mail.select('[Gmail]/Drafts')
_, data = mail.uid('SEARCH', None, 'ALL')
draft_uids = data[0].split()
print(f"{len(draft_uids)} drafts trouves")

# Patterns noreply/notifications -> inutiles
USELESS_DRAFT_PATTERNS = [
    'notifications@vercel.com', 'noreply@vercel.com',
    'noreply@heigit.org', 'notifications@stripe.com',
    'antigravity-noreply@google.com', 'cloudplatform-noreply@google.com',
    'wordpress@tokyo-insights.com', 'accounts@formspree.io',
    'contact@t.brevo.com', 'noreply@', 'no-reply@',
]

deleted = 0
kept = []
for uid in draft_uids:
    _, dmsg_data = mail.uid('FETCH', uid, '(BODY.PEEK[HEADER.FIELDS (TO SUBJECT)])')
    dmsg = email.message_from_bytes(dmsg_data[0][1])
    to_addr = decode_str(dmsg.get('To','')).lower()
    subject = decode_str(dmsg.get('Subject',''))
    is_useless = any(p in to_addr for p in USELESS_DRAFT_PATTERNS)
    if is_useless:
        mail.uid('STORE', uid, '+FLAGS', '\\Deleted')
        deleted += 1
        print(f"  SUPPRIME: {to_addr[:60]} | {subject[:50]}")
    else:
        kept.append(f"  GARDE: {to_addr[:60]} | {subject[:50]}")

mail.expunge()
print(f"\n{deleted} drafts supprimes.")
print(f"{len(kept)} drafts gardes:")
for k in kept: print(k)

mail.close()
mail.logout()
print("\nDONE.")
