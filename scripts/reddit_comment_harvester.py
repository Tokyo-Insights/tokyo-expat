# -*- coding: utf-8 -*-
"""
reddit_comment_harvester.py -- Capture l'OR: les commentaires Reddit sur nos posts.

Reddit bloque le scraping du thread, MAIS envoie un email a chaque reponse. Ce script
recolte ces emails (All Mail, donc meme archives), extrait commentaire + auteur + type,
tague des THEMES (heuristique) et logge tout dans data/reddit_comments_log.jsonl (dedup).

But: transformer des commentaires ephemeres en ASSET persistant analysable
-> idees de posts, idees d'articles, ameliore la qualite (boucle vertueuse).
Claude synthetise les LECONS depuis ce log (`--digest` donne les compteurs de themes).

  python scripts/reddit_comment_harvester.py            # recolte les nouveaux -> log
  python scripts/reddit_comment_harvester.py --digest    # stats/themes du log
"""
import imaplib, email, sys, io, json, re
import html as htmllib
from email.header import decode_header
from email.utils import parsedate_to_datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

from config import GMAIL_ADDRESS, GMAIL_APP_PASSWORD

LOG = Path(__file__).parent / "data" / "reddit_comments_log.jsonl"

# Themes detectes par mots-cles (heuristique). Ajuster librement.
THEMES = {
    "city-comparison": ["sydney", "hong kong", "london", "new york", "nyc", "paris", "usd", "dollar",
                        "australia", "italy", "canada", "europe", "compared", "cheaper than", "vs "],
    "station-request": ["what about", "where does", "curious where", "how about", "falls on the list",
                        "my station", "my neighborhood", "my neighbourhood"],
    "layout-confusion": ["1k mean", "what is 1k", "1k?", "sqft", "square feet", "how big", "size", "m2", "10m"],
    "price-reaction": ["cheap", "expensive", "so cheap", "too much", "bargain", "affordable", "pricey", "wild"],
    "methodology": ["missing", "sample", "median", "average", "wealthy", "prime", "outlier", "biased", "skew"],
    "building-age": ["newly built", "new build", "2015", "old", "age", "construction", "renovated"],
    "map-request": ["map", "choropleth", "geographic"],
    "local-validation": ["i live", "when i lived", "i stayed", "close to reality", "tracks", "accurate", "as expected"],
}


def dec(s):
    if not s:
        return ""
    return " ".join((p.decode(e or "utf-8", "replace") if isinstance(p, bytes) else str(p))
                    for p, e in decode_header(s))


def get_html(msg):
    for part in msg.walk():
        if part.get_content_type() == "text/html":
            try:
                return part.get_payload(decode=True).decode(part.get_content_charset() or "utf-8", "replace")
            except Exception:
                pass
    return ""


def extract_comment(raw_html):
    """Le commentaire propre est dans le <span class='preview-text'> (avant ' • [OC]')."""
    m = re.search(r'class="preview-text"[^>]*>(.*?)</span>', raw_html, re.S)
    if not m:
        return ""
    txt = htmllib.unescape(re.sub(r"<[^>]+>", " ", m.group(1)))
    txt = re.sub(r"\s+", " ", txt).strip()
    # couper avant le titre du post ([OC]...) ou le 1er bullet
    txt = re.split(r"\s*(?:\[OC\]|•|·|•)", txt)[0].strip()
    return txt[:500]


def tag_themes(comment):
    low = comment.lower()
    return [name for name, kws in THEMES.items() if any(k in low for k in kws)]


def load_seen():
    seen = set()
    rows = []
    if LOG.exists():
        for line in LOG.read_text(encoding="utf-8").splitlines():
            if line.strip():
                r = json.loads(line)
                rows.append(r)
                seen.add(r.get("msg_id"))
    return seen, rows


def digest(rows):
    from collections import Counter
    print(f"Commentaires captures au total: {len(rows)}")
    c = Counter()
    for r in rows:
        for th in r.get("themes", []):
            c[th] += 1
    print("Themes (frequence):")
    for th, n in c.most_common():
        print(f"  {th:20} {n}")
    print("\nDerniers 5 commentaires:")
    for r in rows[-5:]:
        print(f"  [{r.get('date','')[:10]}] u/{r.get('commenter','?')}: {r.get('comment','')[:80]}")


def main():
    seen, rows = load_seen()
    if "--digest" in sys.argv:
        digest(rows)
        return

    m = imaplib.IMAP4_SSL("imap.gmail.com")
    m.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
    m.select('"[Gmail]/All Mail"')
    # emails redditmail dont le sujet contient "répondu" (= une reponse a nous)
    typ, d = m.uid("SEARCH", None, "FROM", "redditmail.com")
    uids = d[0].split() if d and d[0] else []
    new = 0
    for uid in uids[-400:]:
        _, md = m.uid("FETCH", uid, "(BODY.PEEK[])")
        if not md or not md[0]:
            continue
        msg = email.message_from_bytes(md[0][1])
        subj = dec(msg.get("Subject", ""))
        if "répondu" not in subj.lower() and "replied" not in subj.lower():
            continue
        mid = msg.get("Message-ID", f"uid-{uid.decode()}")
        if mid in seen:
            continue
        cm = re.search(r"u/([A-Za-z0-9_\-]+)", subj)
        commenter = cm.group(1) if cm else "?"
        rtype = "post" if ("publication" in subj.lower() or "your post" in subj.lower()) else "comment"
        try:
            date = parsedate_to_datetime(msg.get("Date")).isoformat()
        except Exception:
            date = ""
        comment = extract_comment(get_html(msg))
        if not comment:
            continue
        rec = {"msg_id": mid, "date": date, "commenter": commenter, "type": rtype,
               "comment": comment, "themes": tag_themes(comment)}
        rows.append(rec)
        seen.add(mid)
        new += 1
    m.logout()

    LOG.parent.mkdir(exist_ok=True)
    with open(LOG, "w", encoding="utf-8") as f:
        for r in sorted(rows, key=lambda x: x.get("date", "")):
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    print(f"{new} nouveau(x) commentaire(s) capture(s). Total log: {len(rows)}.")
    if new:
        print("-> Demande a Claude d'analyser les lecons (python scripts/reddit_comment_harvester.py --digest).")


if __name__ == "__main__":
    main()
