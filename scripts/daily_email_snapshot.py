"""
daily_email_snapshot.py -- Snapshot de la boite Gmail en fin de journee.
Enregistre le plus haut UID vu dans INBOX -> data/email_snapshot.json.
Le matin, on fetch les UID > ce snapshot = emails VRAIMENT nouveaux.
Evite de re-proposer de repondre a des mails deja traites.

Usage:
  python scripts/daily_email_snapshot.py            -> prend le snapshot (soir)
  python scripts/daily_email_snapshot.py --new      -> liste les emails depuis le dernier snapshot (matin)
"""
import imaplib, sys, io, json, email, datetime
from email.header import decode_header
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SCRIPT_DIR = Path(__file__).parent
SNAP_FILE = SCRIPT_DIR / "data" / "email_snapshot.json"
NEW_MODE = "--new" in sys.argv

ADDR = PWD = None
for line in (SCRIPT_DIR / ".env").read_text(encoding='utf-8').splitlines():
    if line.startswith('GMAIL_ADDRESS='): ADDR = line.split('=',1)[1].strip()
    elif line.startswith('GMAIL_APP_PASSWORD='): PWD = line.split('=',1)[1].strip().replace(' ','')

mail = imaplib.IMAP4_SSL('imap.gmail.com', 993)
mail.login(ADDR, PWD)
mail.select('INBOX')

_, data = mail.uid('search', None, 'ALL')
uids = [int(x) for x in data[0].split()] if data[0] else []
max_uid = max(uids) if uids else 0


def decode_subj(raw):
    if not raw: return ''
    p = decode_header(raw)[0]
    return p[0].decode(p[1] or 'utf-8', errors='replace') if isinstance(p[0], bytes) else p[0]


if NEW_MODE:
    # Lister les emails depuis le dernier snapshot
    last = 0
    if SNAP_FILE.exists():
        last = json.loads(SNAP_FILE.read_text(encoding='utf-8')).get('max_uid', 0)
    new_uids = [u for u in uids if u > last]
    print(f"=== {len(new_uids)} NOUVEAUX emails depuis snapshot (UID > {last}) ===\n")
    for u in new_uids:
        _, md = mail.uid('fetch', str(u), '(BODY.PEEK[HEADER.FIELDS (FROM SUBJECT DATE)])')
        if md and md[0]:
            msg = email.message_from_bytes(md[0][1])
            print(f"[UID {u}] {msg.get('Date','')}")
            print(f"  FROM: {msg.get('From','')}")
            print(f"  SUBJ: {decode_subj(msg.get('Subject',''))}\n")
else:
    # Prendre le snapshot
    SNAP_FILE.parent.mkdir(exist_ok=True)
    snap = {
        "snapshot_at": datetime.datetime.now().isoformat(timespec='seconds'),
        "max_uid": max_uid,
        "inbox_count": len(uids),
    }
    SNAP_FILE.write_text(json.dumps(snap, indent=2), encoding='utf-8')
    print(f"Snapshot pris: max_uid={max_uid}, inbox={len(uids)} emails, a {snap['snapshot_at']}")
    print(f"Demain matin: `python scripts/daily_email_snapshot.py --new` listera les nouveaux.")

mail.logout()
