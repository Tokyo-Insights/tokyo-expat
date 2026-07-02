# -*- coding: utf-8 -*-
"""
gmail_morning_cleaner.py -- Nettoyage matinal AUTO de la boite Gmail (routine matin).
Met a la corbeille UNIQUEMENT des expediteurs de bruit NON-AMBIGUS (newsletters/promos/notifs).
Ne touche JAMAIS: clients, affilies reels, leads Calendly, banque, securite, Reddit, transactionnel.
Rapport Telegram de ce qui a ete jete (transparence). Recuperable 30j dans la corbeille Gmail.

Run:
  python scripts/gmail_morning_cleaner.py --dry-run   # liste sans jeter
  python scripts/gmail_morning_cleaner.py             # jette + rapport Telegram
"""
import imaplib, email, sys, io
from email.header import decode_header
from pathlib import Path
import requests

sys.path.insert(0, str(Path(__file__).parent))
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

from config import GMAIL_ADDRESS, GMAIL_APP_PASSWORD, TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

# Regles de BRUIT: (expediteur_substr, sujet_substr). sujet vide = tout de cet expediteur.
# Conservateur = uniquement du marketing/notif non-ambigu. En cas de doute -> NE PAS ajouter.
NOISE = [
    ('qwoted.com', ''),                          # plateforme suspendue, tjs du bruit
    ('substack.com', ''),
    ('welcome@t.brevo.com', ''),                 # onboarding Brevo (pas les emails clients)
    ('newsletter@formspree.io', ''),
    ('newsletters-noreply@linkedin.com', ''),
    ('microsoftadvertising.com', ''),
    ('hello@e.italki.com', ''),                  # promo italki (pas l'affiliation)
    ('workspace-noreply@google.com', ''),
    ('maccount@microsoft.com', ''),              # onboarding Clarity
    ('news@part.getyourguide.com', ''),          # newsletter GYG (pas les stats/paiements)
    ('do-not-reply@notification.getyourguide.com', 'statistic'),
    ('hello@safetywing.com', ''),                # webinaires SW (PAS info@ = contrats)
    ('noreply@medium.com', ''),
    ('info@meetup.com', ''),
]

def dec(s):
    if not s: return ''
    return ' '.join((p.decode(e or 'utf-8', 'replace') if isinstance(p, bytes) else str(p))
                    for p, e in decode_header(s))

def send_telegram(msg):
    try:
        requests.post(f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
                      json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML"},
                      timeout=10, verify=False)
    except Exception:
        pass

def main():
    dry = '--dry-run' in sys.argv
    m = imaplib.IMAP4_SSL('imap.gmail.com'); m.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD); m.select('INBOX')
    _, d = m.uid('SEARCH', None, 'ALL')
    uids = d[0].split()
    trashed = []
    for uid in uids:
        _, md = m.uid('FETCH', uid, '(BODY.PEEK[HEADER.FIELDS (FROM SUBJECT)])')
        if not md or not md[0]:
            continue
        msg = email.message_from_bytes(md[0][1])
        frm, subj = dec(msg.get('From', '')).lower(), dec(msg.get('Subject', ''))
        if any(f in frm and (s == '' or s in subj.lower()) for f, s in NOISE):
            if not dry:
                if m.uid('COPY', uid, '[Gmail]/Trash')[0] == 'OK':
                    m.uid('STORE', uid, '+FLAGS', '\\Deleted')
            trashed.append(f"{dec(msg.get('From',''))[:34]} | {subj[:44]}")
    if not dry:
        m.expunge()
    m.logout()

    prefix = "[DRY-RUN] " if dry else ""
    print(f"{prefix}{len(trashed)} email(s) de bruit {'a jeter' if dry else 'mis a la corbeille'}:")
    for t in trashed:
        print("  🗑️ " + t)
    if trashed and not dry:
        send_telegram(f"🧹 <b>NETTOYAGE MATIN GMAIL</b>\n{len(trashed)} emails de bruit -> corbeille (recuperable 30j).")

if __name__ == "__main__":
    main()
