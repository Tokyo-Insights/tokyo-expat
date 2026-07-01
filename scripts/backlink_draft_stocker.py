# -*- coding: utf-8 -*-
"""
backlink_draft_stocker.py -- Remplit la boite Brouillons Gmail avec des emails outreach
prets a relire+envoyer (mode "Je stocke, tu cliques", choisi 2026-07-01).

Ne S'ENVOIE JAMAIS. Cree seulement des BROUILLONS pour les cibles QUALIFIEES:
  - status == 'to_contact'
  - email present + '@'
  - email_verified == True (email confirme sur page live par Claude lors de la qualif)
  - pas de concurrent (is_competitor), pas manual_required (formulaires)
  - da_est > 0, type != b2b_corporate (bounces)
Reutilise build_email() de email_sender.py (memes templates par segment).
Apres creation: status -> 'drafted' (le watcher detectera l'envoi reel via le dossier Sent
et armera la relance tout seul). 1 seul brouillon par cible (pas de doublon).

Run:
  python scripts/backlink_draft_stocker.py            # stocke les brouillons (max MAX_PER_RUN)
  python scripts/backlink_draft_stocker.py --dry-run  # liste sans creer
  python scripts/backlink_draft_stocker.py --all      # pas de limite de nombre
"""
import json, sys, io, imaplib, email.utils
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime as dt, timezone, date
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR))

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

from email_sender import build_email  # reutilise les templates par segment
try:
    from config import GMAIL_ADDRESS, GMAIL_APP_PASSWORD
except ImportError:
    print("[ERROR] GMAIL_ADDRESS / GMAIL_APP_PASSWORD manquants (config.py / .env)")
    sys.exit(1)

CONTACTS_FILE = SCRIPT_DIR / "data" / "outreach_contacts.json"
FROM = "Tokyo Expat <contact@tokyo-expat.com>"
MAX_PER_RUN = 5   # stocke jusqu'a 5 brouillons par run (Alessandro relit+envoie a son rythme)


def eligible(c: dict) -> bool:
    email_addr = (c.get('email') or '').strip()
    if c.get('status') != 'to_contact' or '@' not in email_addr:
        return False
    if c.get('manual_required'):
        return False
    if c.get('da_est', 0) <= 0 or c.get('type') == 'b2b_corporate':
        return False
    if c.get('is_competitor'):
        return False
    if c.get('draft_stocked'):
        return False
    # STRICT: on ne stocke QUE les cibles dont l'email a ete verifie sur la page live (par Claude).
    # Evite les concurrents/emails devines. Gate pose lors de la qualification.
    return c.get('email_verified') is True


def html_wrap(body: str) -> str:
    p = "font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#333;"
    inner = body.replace("\n\n", f"</p><p style='{p}'>").replace("\n", "<br>")
    return f"<html><body><p style='{p}'>{inner}</p></body></html>"


def main():
    args = sys.argv[1:]
    dry = '--dry-run' in args
    no_limit = '--all' in args
    if not CONTACTS_FILE.exists():
        print("Pas de outreach_contacts.json"); return
    contacts = json.load(open(CONTACTS_FILE, encoding='utf-8'))

    targets = [c for c in contacts if eligible(c)]
    PRIORITY = {"high": 0, "medium": 1, "low": 2}
    targets.sort(key=lambda x: (PRIORITY.get(x.get('priority', 'low'), 2), -x.get('da_est', 0)))
    if not no_limit:
        targets = targets[:MAX_PER_RUN]

    if not targets:
        print("Aucune cible eligible a stocker (aucune cible email_verified=True en attente).")
        return

    if dry:
        for c in targets:
            subj, _ = build_email(c)
            print(f"[DRY] {c['name']:32} <{c['email']}>  |  {subj}")
        print(f"\n[DRY-RUN] {len(targets)} brouillon(s) seraient stockes.")
        return

    m = imaplib.IMAP4_SSL('imap.gmail.com')
    m.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
    stocked = []
    for c in targets:
        subject, body = build_email(c)
        msg = MIMEMultipart('alternative')
        msg['From'] = FROM
        msg['To'] = f"{c['name']} <{c['email']}>"
        msg['Subject'] = subject
        msg['Date'] = email.utils.formatdate(localtime=True)
        msg['Message-ID'] = email.utils.make_msgid()
        msg.attach(MIMEText(body, 'plain', 'utf-8'))
        msg.attach(MIMEText(html_wrap(body), 'html', 'utf-8'))
        m.append('[Gmail]/Drafts', None, imaplib.Time2Internaldate(dt.now(timezone.utc)), msg.as_bytes())
        c['draft_stocked'] = date.today().isoformat()
        c['status'] = 'drafted'
        stocked.append(c['name'])
    m.logout()
    json.dump(contacts, open(CONTACTS_FILE, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
    print(f"OK: {len(stocked)} brouillon(s) stockes dans Gmail Drafts -> {', '.join(stocked)}")
    print("Alessandro: ouvrir Brouillons, relire, Envoyer. Le watcher armera la relance automatiquement.")


if __name__ == "__main__":
    main()
