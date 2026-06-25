"""
reddit_quora_intercept.py -- Intercepte les questions Tokyo housing sur Reddit
Cherche via DuckDuckGo les posts recents dans les subreddits expat/Japan.
Alerte Telegram avec draft reponse pret a copier-coller.

Protocole Reddit (REGLES ABSOLUES):
  - first-person "I" uniquement
  - zero lien externe
  - zero mention de marque (Tokyo Expat, tokyo-expat.com)

Run: python scripts/reddit_quora_intercept.py
Schedule: quotidien dans run_daily_watch.bat (step 5/5)
"""

import json
import datetime
import sys
import io
import time
import requests
import urllib3
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

try:
    from ddgs import DDGS
except ImportError:
    try:
        from duckduckgo_search import DDGS
    except ImportError:
        print("Install: pip install ddgs")
        sys.exit(1)

from config import TE_TOKEN, TE_CHAT_ID

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
STATE_FILE = DATA_DIR / "reddit_intercept_state.json"
PENDING_FILE = DATA_DIR / "pending_actions.json"

# Requetes DDGS ciblees par subreddit + keyword
SEARCH_QUERIES = [
    "site:reddit.com/r/movingtojapan apartment housing rent tokyo",
    "site:reddit.com/r/JapanLife housing apartment rent foreigner tokyo",
    "site:reddit.com/r/japanfinance apartment rent tokyo foreigner",
    "site:reddit.com/r/Tokyo find apartment housing rent expat",
    "site:reddit.com/r/japan housing apartment foreigner share house",
    "site:reddit.com/r/teachinginjapan apartment housing tokyo rent",
    "site:reddit.com/r/expats housing apartment tokyo japan",
    "site:reddit.com/r/digitalnomad apartment housing tokyo japan",
]

TRIGGER_KEYWORDS = [
    "apartment", "housing", "rent", "share house", "sharehouse", "furnished",
    "property hunter", "find a place", "where to live", "which neighborhood",
    "guarantor", "garant", "hoshonin", "no guarantor",
    "move to tokyo", "moving to tokyo", "relocat",
    "foreigner housing", "foreigner apartment", "gaijin house", "monthly mansion",
]

EXCLUDE_KEYWORDS = [
    "invest", "buy property", "purchase", "mortgage", "real estate investment",
    "yield", "grm", "cap rate",
]

DRAFTS = {
    "share_house": (
        "I've helped a lot of people find share houses in Tokyo. A few things that matter:\n\n"
        "Main operators: Sakura House (largest, English-friendly), OakHouse (slightly more premium), "
        "Borderless House (international community).\n\n"
        "Budget: 50,000-90,000 JPY/month all-in, utilities usually included, "
        "no guarantor needed, just 1 month deposit.\n\n"
        "Key thing: good rooms go in 24-48 hours. Apply as soon as you find something you like, "
        "don't wait a week to think about it."
    ),
    "guarantor": (
        "I work with expat housing in Tokyo -- this comes up all the time. Realistic options:\n\n"
        "1. Rental guarantee company (hoshonin): ~0.5 month rent upfront + small annual fee. "
        "Most landlords accept this now as a substitute for a personal guarantor.\n"
        "2. Share houses: zero guarantor needed, just passport + residence card.\n"
        "3. Expat-specialist agencies: they have vetted landlords who waive the requirement entirely.\n\n"
        "The 'you need a Japanese guarantor' situation is largely outdated for expat-accessible properties."
    ),
    "neighborhood": (
        "I know the Tokyo rental market well. Honest overview:\n\n"
        "Yamanote loop inner area (Shibuya, Shinjuku, Minato): great location, "
        "expect 100,000+ JPY/month even for a small 1K.\n\n"
        "Just outside the loop (Sangenjaya, Shimokitazawa, Koenji, Nishi-Ogikubo): "
        "still excellent metro access, 30-40% cheaper, more residential feel.\n\n"
        "Outer wards (Adachi, Edogawa, Katsushika): cheapest options, commute adds 20-30 min.\n\n"
        "Happy to be more specific if you share your commute destination."
    ),
    "timing": (
        "I deal with Tokyo apartment searches regularly. On timing:\n\n"
        "Start your search 6-8 weeks before your move date. "
        "The best furnished apartments and share houses for a given month get taken well in advance.\n\n"
        "March and September are the hardest months (student + corporate relocation peaks). "
        "If you're moving then, add 2 extra weeks to your timeline.\n\n"
        "Virtual applications work fine for most expat-friendly properties."
    ),
    "general": (
        "I've helped a lot of expats find housing in Tokyo. A few things that trip people up:\n\n"
        "1. Start early: good properties for your target month get taken 6-8 weeks out.\n"
        "2. Share house first if unsure about the area: flexible 1-month minimum, "
        "no long-term commitment, no guarantor needed.\n"
        "3. Virtual applications work: you can secure a place before landing.\n\n"
        "Happy to answer specific questions about your situation."
    ),
}


def pick_draft(title: str, snippet: str) -> str:
    text = (title + " " + snippet).lower()
    if any(k in text for k in ["share house", "sharehouse", "coloc", "roommate"]):
        return DRAFTS["share_house"]
    if any(k in text for k in ["guarantor", "garant", "hoshonin"]):
        return DRAFTS["guarantor"]
    if any(k in text for k in ["neighborhood", "ward", "area", "where to live", "which part"]):
        return DRAFTS["neighborhood"]
    if any(k in text for k in ["when", "timing", "how early", "months before", "advance"]):
        return DRAFTS["timing"]
    return DRAFTS["general"]


def is_relevant(title: str, snippet: str) -> bool:
    text = (title + " " + snippet).lower()
    if "tokyo" not in text and "japan" not in text:
        return False
    if not any(k in text for k in TRIGGER_KEYWORDS):
        return False
    if any(k in text for k in EXCLUDE_KEYWORDS):
        return False
    return True


def append_pending_action(action: dict) -> None:
    """Sauvegarde un match dans pending_actions.json pour analyse avec Claude."""
    try:
        DATA_DIR.mkdir(exist_ok=True)
        data = {"actions": []}
        if PENDING_FILE.exists():
            data = json.loads(PENDING_FILE.read_text(encoding="utf-8"))
        existing_ids = {a.get("id") for a in data.get("actions", [])}
        if action.get("id") not in existing_ids:
            data.setdefault("actions", []).append(action)
            data["actions"] = data["actions"][-200:]
        PENDING_FILE.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    except Exception as e:
        print(f"[WARN] pending_actions save error: {e}")


def load_state() -> dict:
    DATA_DIR.mkdir(exist_ok=True)
    if STATE_FILE.exists():
        try:
            with open(STATE_FILE, encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {"seen_urls": [], "last_run": ""}


def save_state(state: dict):
    state["seen_urls"] = state["seen_urls"][-2000:]
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2, ensure_ascii=False)


def send_telegram(msg: str):
    try:
        requests.post(
            f"https://api.telegram.org/bot{TE_TOKEN}/sendMessage",
            json={"chat_id": TE_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10, verify=VERIFY_SSL,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def extract_subreddit(url: str) -> str:
    import re
    m = re.search(r'reddit\.com/r/([^/]+)', url)
    return m.group(1) if m else "reddit"


def main():
    today = datetime.date.today()
    print(f"\n{'='*60}")
    print(f"REDDIT INTERCEPT -- {today}")
    print(f"{'='*60}\n")

    state = load_state()
    seen_urls = set(state.get("seen_urls", []))
    matches = []

    with DDGS() as ddgs:
        for query in SEARCH_QUERIES:
            print(f"  Searching: {query[:65]}...")
            try:
                for r in ddgs.text(query, max_results=5, timelimit='w'):
                    url = r.get("href", "")
                    if "reddit.com" not in url or url in seen_urls:
                        continue
                    seen_urls.add(url)
                    title = r.get("title", "")
                    snippet = r.get("body", "")
                    if is_relevant(title, snippet):
                        sub = extract_subreddit(url)
                        matches.append({
                            "subreddit": sub,
                            "title": title[:120],
                            "url": url,
                            "draft": pick_draft(title, snippet),
                        })
                        print(f"    MATCH r/{sub}: {title[:60]}")
                time.sleep(3)
            except Exception as e:
                print(f"  [WARN] {e}")
                time.sleep(8)

    state["seen_urls"] = list(seen_urls)
    state["last_run"] = today.isoformat()
    save_state(state)

    print(f"\n{len(matches)} posts pertinents trouves\n")

    if not matches:
        print("Aucun match. Pas d'alerte envoyee.")
        return

    for m in matches[:5]:
        msg = (
            f"<b>REDDIT</b> -- r/{m['subreddit']}\n"
            f"<b>{m['title'][:100]}</b>\n"
            f"<a href='{m['url']}'>Voir le post</a>\n\n"
            f"<i>Regles: first-person I, zero lien, zero mention marque</i>\n\n"
            f"<b>Draft:</b>\n{m['draft'][:600]}"
        )
        send_telegram(msg)
        append_pending_action({
            "type":      "reddit",
            "date":      today.isoformat(),
            "subreddit": m["subreddit"],
            "title":     m["title"],
            "url":       m["url"],
            "draft":     m["draft"],
            "acted":     False,
            "id":        f"reddit_{today}_{abs(hash(m['url'])) % 100000}",
        })

    if len(matches) > 5:
        send_telegram(f"<b>REDDIT</b> -- {len(matches) - 5} posts supplementaires. Voir log.")

    print(f"{len(matches)} alertes envoyees.")


if __name__ == "__main__":
    main()
