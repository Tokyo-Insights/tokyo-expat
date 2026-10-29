# MODELE : brouillon Gmail dans un fil existant, expediteur contact@ (IMAP APPEND). Copier, changer TO / SUBJ / BODY.
# Cherche le dernier message de TO depuis SINCE et repond dedans. Verifier ensuite avec list_drafts (threadId + sender).
import sys, imaplib, email, email.utils
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime as dt, timezone
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, r'C:\Users\alegu\Desktop\tokyo-expat\scripts')
from config import GMAIL_ADDRESS, GMAIL_APP_PASSWORD

TO = 'jhilly14@aol.com'
SUBJ = 'Re: [Tokyo Expat] New message from jill hill'
BODY = [
    "Hi Jill,",
    "Thank you for taking the time to answer, it genuinely helps.",
    "One last question if you don't mind, and then I will leave you in peace: "
    "when she signed, what did you pay in total to move in, agency fee included? "
    "A rough figure is perfect.",
    "All the best to her for this year in Tokyo.",
    "Alessandro<br>Tokyo Expat",
]

m = imaplib.IMAP4_SSL('imap.gmail.com')
m.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
m.select('"[Gmail]/All Mail"', readonly=True)
typ, data = m.search(None, 'FROM', TO, 'SINCE', '27-Oct-2026')
ids = data[0].split()
assert ids, 'réponse du 27/10 introuvable'
typ, d = m.fetch(ids[-1], '(BODY.PEEK[HEADER.FIELDS (MESSAGE-ID SUBJECT REFERENCES DATE)])')
hdr = email.message_from_bytes(d[0][1])
mid = hdr['Message-ID'].strip()
print('original:', hdr['Date'], hdr['Subject'], mid)

msg = MIMEMultipart('alternative')
msg['From'] = 'Tokyo Expat <contact@tokyo-expat.com>'
msg['To'] = TO
msg['Subject'] = SUBJ
msg['In-Reply-To'] = mid
msg['References'] = ' '.join(((hdr['References'] or '') + ' ' + mid).split())
msg['Date'] = email.utils.formatdate(localtime=True)
plain = '\n\n'.join(p.replace('<br>', '\n') for p in BODY)
html = ''.join(f'<p>{p}</p>' for p in BODY)
msg.attach(MIMEText(plain, 'plain', 'utf-8'))
msg.attach(MIMEText(html, 'html', 'utf-8'))
print(m.append('"[Gmail]/Drafts"', '\\Draft', imaplib.Time2Internaldate(dt.now(timezone.utc)), msg.as_bytes()))
m.logout()
