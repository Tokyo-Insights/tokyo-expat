# -*- coding: utf-8 -*-
"""
data_pitch_drafter.py -- Loop 3: stocke un DRAFT de pitch data dans Gmail Drafts.

Modele "je stocke, tu cliques": tu trouves un journaliste/blogueur -> une commande ->
un brouillon personnalise (voix humaine, court, un stat + le lien data) apparait dans
Gmail Drafts, pret a relire et envoyer. On automate l'ECRITURE; le ciblage + l'envoi
restent humains (anti-spam, cf lecon "sonne IA"). Angles: outreach/DATA_PITCH_ANGLES.md.

  python scripts/data_pitch_drafter.py --list
  python scripts/data_pitch_drafter.py --to jane@site.com --angle 1 --name Jane
"""
import sys, io, imaplib
from datetime import datetime, timezone
from email.mime.text import MIMEText
from email.utils import formatdate, make_msgid
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

from config import GMAIL_ADDRESS, GMAIL_APP_PASSWORD

# Angles = un stat qui accroche + le lien data. Ton HUMAIN, court, pas d'IA-speak.
ANGLES = {
    1: ("Tokyo rent data for your piece",
        "a central Tokyo studio now rents for under $800 a month, a fraction of NYC, London or Sydney",
        "tokyo-expat.com/en/data"),
    2: ("Tokyo condo prices, some numbers for your story",
        "Tokyo condo prices rose about 30% per square metre from 2021 to 2025, and the centre pulled away hard (Chuo +60%, Minato +52%)",
        "tokyo-expat.com/en/data"),
    3: ("Tokyo rent, station by station (data)",
        "I mapped the median rent near 50 Tokyo stations, it swings from 76k to 150k yen depending on the line",
        "tokyo-expat.com/en/data"),
    4: ("What a family flat vs a studio costs in Tokyo",
        "a 2LDK family flat runs 2 to 2.8 times a studio in the same ward, the gap is widest in the centre",
        "tokyo-expat.com/en/data"),
    5: ("How foreigners actually rent in Tokyo",
        "most foreigners skip the guarantor and the 4-6 months upfront by going furnished, I broke down how",
        "tokyo-expat.com/en/blog/furnished-apartments-tokyo-guide"),
}


def draft_body(name, stat, link):
    hi = f"Hi {name}," if name else "Hi,"
    return (f"{hi}\n\n"
            f"I run Tokyo Expat, we publish original Tokyo rental data from 500k+ real listings.\n\n"
            f"Saw your work and thought a hard number might be useful: {stat}.\n\n"
            f"Happy to send the chart or a custom cut if it helps. Full data, free to cite with a link: {link}\n\n"
            f"Cheers,\nAlessandro")


def main():
    if "--list" in sys.argv or "--to" not in sys.argv:
        print("Angles disponibles:")
        for k, (subj, stat, _) in ANGLES.items():
            print(f"  {k}. {subj}  --  \"{stat[:60]}...\"")
        print("\nUsage: --to <email> --angle <1-5> [--name <Prenom>]")
        return
    args = sys.argv
    to = args[args.index("--to") + 1]
    angle = int(args[args.index("--angle") + 1]) if "--angle" in args else 1
    name = args[args.index("--name") + 1] if "--name" in args else ""
    subj, stat, link = ANGLES.get(angle, ANGLES[1])

    msg = MIMEText(draft_body(name, stat, link), "plain", "utf-8")
    msg["From"] = GMAIL_ADDRESS
    msg["To"] = to
    msg["Subject"] = subj
    msg["Date"] = formatdate(localtime=True)
    msg["Message-ID"] = make_msgid()

    m = imaplib.IMAP4_SSL("imap.gmail.com")
    m.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
    m.append("[Gmail]/Drafts", None, imaplib.Time2Internaldate(datetime.now(timezone.utc)), msg.as_bytes())
    m.logout()
    print(f"Draft stocke dans Gmail Drafts -> {to} | angle {angle}: {subj}")
    print("Relis-le et envoie-le a la main (jamais d'envoi auto = anti-spam).")


if __name__ == "__main__":
    main()
