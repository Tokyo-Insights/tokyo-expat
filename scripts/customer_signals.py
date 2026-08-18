# -*- coding: utf-8 -*-
"""Harvester 'VOIX DU CLIENT' — mine les emails clients (+ reponses Calendly) pour filons d'or recurrents.
LECTURE SEULE de la boite (IMAP). Log -> data/customer_signals.jsonl (dedupe par Message-ID).
Agrege les themes -> signale un FILON des qu'un besoin revient chez >=2 contacts distincts.
Usage: python scripts/customer_signals.py [--days 60]
"""
import imaplib, email, io, re, json, sys, datetime as dt
from pathlib import Path
from collections import defaultdict

ROOT = Path(__file__).resolve().parent.parent
DATA = Path(__file__).resolve().parent / "data"
LOG = DATA / "customer_signals.jsonl"

# Expediteurs/domaines a IGNORER (bruit: newsletters, affilies auto, no-reply, notifs plateformes).
# NB: les vraies reservations Calendly (notifications@calendly.com) + formulaires du site BYPASSENT ce filtre.
NOISE = ["mailchimp", "featured.com", "sakuramobile", "arigatojapan", "no-reply", "noreply",
         "linkedin.com", "redditmail", "github.com", "noreply-accounts@google", "anthropic",
         "oakhouse.jp", "sakura-house.com", "tokyu-rs", "blogexpat", "manus.im", "wise.com",
         "invoice+", "statements", "teamcalendly", "send.calendly", "brevo", "sendinblue"]

THEMES = {
    "job/emploi": ["job", "work", "employ", "recruit", "salary", "no job", "without a job", "travail", "emploi"],
    "animal/pet": ["pet", " cat", " dog", "animal", "chat", "chien", "petto"],
    "garant": ["guarantor", "garant", "co-signer", "hosho"],
    "budget/prix": ["budget", "yen", "afford", "cheap", "price", "cost", "loyer", "prix", "savings", "economies"],
    "share house": ["share house", "sharehouse", "share-house", "colocation", "coliving", "co-living"],
    "famille": ["family", "kids", "child", "daughter", "son", "wife", "husband", "famille", "enfant"],
    "etudiant": ["student", "university", "eikaiwa", "school", "etudiant", "universit"],
    "sdb privee": ["own bathroom", "private bathroom", "ensuite", "salle de bain privee"],
    "visa/statut": ["visa", "working holiday", "residence card", "zairyu", "status of residence", "titre de sejour"],
    "meuble": ["furnished", "furniture", "meuble", "monthly mansion", "short-term", "short term"],
    "timeline/urgent": ["urgent", "asap", "arriving", "move-in", "moving to japan", "arrive", "airbnb"],
    "quartier": ["neighbourhood", "neighborhood", " ward", "station", "quartier", "shinjuku", "shibuya", "minato", "area"],
    "jeunes pros": ["young professional", "professionals rather than students", "jeune actif"],
}


def creds():
    a = p = None
    for line in io.open(ROOT / "scripts" / ".env", encoding="utf-8"):
        if line.startswith("GMAIL_ADDRESS="): a = line.split("=", 1)[1].strip()
        elif line.startswith("GMAIL_APP_PASSWORD="): p = line.split("=", 1)[1].strip().replace(" ", "")
    return a, p


def body_text(msg):
    b = ""
    if msg.is_multipart():
        for part in msg.walk():
            if part.get_content_type() == "text/plain":
                b = (part.get_payload(decode=True) or b"").decode("utf-8", "replace"); break
        if not b:
            for part in msg.walk():
                if part.get_content_type() == "text/html":
                    b = re.sub(r"<[^>]+>", " ", (part.get_payload(decode=True) or b"").decode("utf-8", "replace")); break
    else:
        b = (msg.get_payload(decode=True) or b"").decode("utf-8", "replace")
    return b


def clean_reply(b):
    b = re.split(r"\nOn .{0,70}wrote:|\n>\s|________|-----Original|Le .{0,40}a ecrit", b)[0]
    return re.sub(r"\n{3,}", "\n\n", b).strip()


def extract(sender, subject, b):
    low = sender.lower()
    if "calendly" in low and ("scheduled" in b.lower() or "invitee" in b.lower()):
        ans = re.search(r"help prepare for our meeting\.?\s*\*?\s*(.+?)(?:View event|Pro Tip|Get Calendly|$)", b, re.S)
        inv = re.search(r"Invitee:\s*\*?\s*([^\n*]+)", b)
        who = inv.group(1).strip() if inv else "calendly-lead"
        return who, (re.sub(r"\s+", " ", ans.group(1)).strip() if ans else "")
    if "new message from" in subject.lower() or "resend.dev" in low:
        who = re.search(r"Email:\s*([^\s]+@[^\s]+)", b)
        return (who.group(1) if who else sender), clean_reply(b)
    return sender, clean_reply(b)


def tag(text):
    t = " " + text.lower() + " "
    return sorted({k for k, kws in THEMES.items() if any(w in t for w in kws)})


def harvest(days=60):
    a, p = creds()
    m = imaplib.IMAP4_SSL("imap.gmail.com", 993); m.login(a, p); m.select("INBOX")
    since = (dt.date.today() - dt.timedelta(days=days)).strftime("%d-%b-%Y")
    uids = m.uid("search", None, f"(SINCE {since})")[1][0].split()
    seen = set()
    if LOG.exists():
        seen = {json.loads(l).get("mid") for l in io.open(LOG, encoding="utf-8") if l.strip()}
    new = []
    for u in uids:
        d = m.uid("fetch", u, "(RFC822)")[1]
        if not d or not d[0]:
            continue
        msg = email.message_from_bytes(d[0][1])
        mid = msg.get("Message-ID", "")
        if not mid or mid in seen:
            continue
        sender, subject = msg.get("From", ""), msg.get("Subject", "")
        b = body_text(msg)
        is_calendly = "calendly" in sender.lower() and "scheduled" in b.lower()
        is_form = "new message from" in subject.lower() or "resend.dev" in sender.lower()
        if not (is_calendly or is_form) and any(n in sender.lower() for n in NOISE):
            continue
        who, text = extract(sender, subject, b)
        text = (text or "").strip()
        if len(text) < 30:
            continue
        rec = {"mid": mid, "date": msg.get("Date", "")[:31], "contact": who[:90],
               "src": "calendly" if is_calendly else ("form" if is_form else "email"),
               "themes": tag(text), "text": text[:600]}
        new.append(rec)
        seen.add(mid)
    m.logout()
    with io.open(LOG, "a", encoding="utf-8") as f:
        for r in new:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    return new


def report():
    if not LOG.exists():
        print("aucun signal"); return
    sigs = [json.loads(l) for l in io.open(LOG, encoding="utf-8") if l.strip()]
    tc = defaultdict(set)
    for s in sigs:
        for t in s.get("themes", []):
            tc[t].add(s.get("contact"))
    print(f"\n=== 🎙️ VOIX DU CLIENT ({len(sigs)} signaux, {len({s['contact'] for s in sigs})} contacts) ===")
    filons = [(len(c), t) for t, c in tc.items() if len(c) >= 2]
    print("FILONS (besoin recurrent chez >=2 contacts) :")
    for n, t in sorted(filons, reverse=True):
        print(f"  🔥 {t} : {n} contacts")
    if not filons:
        print("  (aucun filon >=2 encore — la base grossit a chaque lead)")
    solo = [t for t, c in tc.items() if len(c) == 1]
    if solo:
        print("A surveiller (1 contact) : " + ", ".join(sorted(solo)))


if __name__ == "__main__":
    days = 60
    if "--days" in sys.argv:
        days = int(sys.argv[sys.argv.index("--days") + 1])
    n = harvest(days)
    print(f"[{len(n)} nouveaux signaux harvestes -> {LOG.name}]")
    report()
