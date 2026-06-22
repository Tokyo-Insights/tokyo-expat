"""
quora_finder.py -- Trouve les questions Quora sur Tokyo housing + genere les reponses
Cherche les questions actives, genere une reponse experte avec ton angle.
Strategie : repondre sans lien, devenir la reference, lien dans bio Quora.

Run: python scripts/quora_finder.py
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
QUORA_STATE = DATA_DIR / "quora_answered.json"

SEARCH_QUERIES = [
    "site:quora.com find apartment tokyo foreigner",
    "site:quora.com share house tokyo expat",
    "site:quora.com rent tokyo apartment foreigner 2024 2025",
    "site:quora.com moving to tokyo housing guide",
    "site:quora.com japan apartment guarantor foreigner",
    "site:quora.com student housing tokyo university",
    "site:quora.com trouver appartement tokyo etranger",
    "site:quora.com cost of living tokyo expat",
]

# Templates de reponse par topic (sans liens -- on reste dans les regles Quora)
ANSWER_TEMPLATES = {
    "apartment": (
        "Finding an apartment in Tokyo as a foreigner is very doable in 2025 — "
        "you just need to know the rules upfront.\n\n"
        "The three main hurdles:\n"
        "1. **Guarantor (hoshogaisha)**: Most landlords require one. "
        "If you don't have a Japanese guarantor, use a rental guarantee company (~0.5 months rent/year).\n"
        "2. **Documents**: Employment certificate (in Japanese), bank statements, residence card.\n"
        "3. **Key money (reikin)**: Still common in some areas, but avoidable if you filter for "
        "'reikin nashi' properties or go through expat-friendly agencies.\n\n"
        "For a foreigner arriving in Tokyo: start your search 6-8 weeks before your move date. "
        "Best share houses and furnished apartments fill up fast, especially September-October.\n\n"
        "Budget guide (Tokyo 2025):\n"
        "- Share house private room: 50,000-90,000 JPY/month (utilities often included)\n"
        "- 1K unfurnished apartment: 65,000-120,000 JPY depending on ward\n"
        "- Furnished expat apartment: 100,000-180,000 JPY\n\n"
        "Move-in cost: typically 2-3 months total (1-2 deposit + 1 month rent upfront + agency fee). "
        "Share houses are cheaper upfront (1 month deposit, no agency fee)."
    ),
    "cost": (
        "Tokyo cost of living for a single expat (2025 realistic numbers):\n\n"
        "- Housing: 60,000-120,000 JPY/month (depends heavily on ward and format)\n"
        "- Food: 40,000-70,000 JPY (cooking at home vs eating out ratio)\n"
        "- Transport: 8,000-15,000 JPY (IC card, Suica/Pasmo)\n"
        "- Health insurance: 10,000-20,000 JPY (national health)\n"
        "- Utilities: 8,000-15,000 JPY (or included in share house)\n"
        "- Phone: 2,000-4,000 JPY (MVNO like IIJmio or Ahamo)\n\n"
        "Total realistic range: 150,000-250,000 JPY/month depending on lifestyle.\n\n"
        "Key money-savers: outer Yamanote Line stations (Jujo, Nishi-Nippori, Itabashi) "
        "vs central Shibuya/Shinjuku area. The commute difference is often 20-30 minutes "
        "but the rent difference is 30-40%."
    ),
    "sharehouse": (
        "Share houses in Tokyo are the most practical entry point for new expats in 2025.\n\n"
        "**What you get**: private room (8-16 sqm), shared kitchen/bath/living room, "
        "internet + utilities usually included, no Japanese guarantor needed, "
        "flexible terms (1 month minimum at most operators).\n\n"
        "**Main networks**:\n"
        "- Sakura House: 300+ properties, English support, strongest network\n"
        "- OakHouse: slightly more premium, social events\n"
        "- Tokyo Cheap House: budget focus\n"
        "- Borderless House: international community focus\n\n"
        "**Realistic cost**: 50,000-90,000 JPY/month all-in.\n"
        "**Move-in**: typically just 1 month deposit, no key money, no agency fee.\n\n"
        "The catch: rooms in good locations get taken within 24-48 hours. "
        "Apply as soon as you find what you want — don't 'think about it' for a week."
    ),
    "guarantor": (
        "The Japanese rental guarantor system (hoshogaisha) is one of the main friction "
        "points for foreigners. Here's what you need to know:\n\n"
        "**Option 1 — Rental guarantee company (hoshogaisha)**: "
        "Most common solution for foreigners. They act as your guarantor for a fee: "
        "typically 0.5 months rent upfront, then 0.5-1 months rent annually. "
        "Major providers: Rent Guaranty, Cosmos Initia, Casa.\n\n"
        "**Option 2 — Foreigner-friendly agencies**: Some agencies (including expat-specialist ones) "
        "have agreements with landlords who don't require a Japanese guarantor at all.\n\n"
        "**Option 3 — Share house**: No guarantor needed. "
        "Just your passport/residence card and income proof.\n\n"
        "**Option 4 — Company housing**: If your employer provides housing assistance, "
        "they often act as guarantor.\n\n"
        "Bottom line: the no-guarantor, no-reikin, English-speaking agency route "
        "exists and works well — you just need to know where to look."
    ),
    "general": (
        "Tokyo is one of the most foreigner-friendly cities in Asia for expats, "
        "but housing has a learning curve.\n\n"
        "The key things most new expats don't know:\n\n"
        "1. **Start early**: Best properties for your target date get rented 6-8 weeks in advance. "
        "Don't wait until your visa arrives.\n\n"
        "2. **Share house first**: If you're new to Tokyo, 3-6 months in a share house while you "
        "learn the city saves money and stress vs committing to a long lease in the wrong area.\n\n"
        "3. **Ward matters more than people think**: Minato/Shibuya/Shinjuku = expensive, very international. "
        "Sumida/Koto = 30-40% cheaper, still great subway access.\n\n"
        "4. **Virtual tours work**: Many expat-friendly operators accept international applications "
        "with virtual tours, so you can secure housing before you land.\n\n"
        "Happy to answer specific questions about your situation."
    ),
}


def pick_answer(title: str, snippet: str) -> str:
    text = (title + " " + snippet).lower()
    if any(k in text for k in ["cost", "budget", "expensive", "money", "salary", "afford"]):
        return ANSWER_TEMPLATES["cost"]
    if any(k in text for k in ["share house", "sharehouse", "house share", "room"]):
        return ANSWER_TEMPLATES["sharehouse"]
    if any(k in text for k in ["guarantor", "garant", "hoshogaisha", "guarantee"]):
        return ANSWER_TEMPLATES["guarantor"]
    if any(k in text for k in ["apartment", "flat", "housing", "find", "rent", "logement"]):
        return ANSWER_TEMPLATES["apartment"]
    return ANSWER_TEMPLATES["general"]


def load_answered() -> dict:
    if QUORA_STATE.exists():
        try:
            with open(QUORA_STATE, encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {"answered_urls": [], "last_run": ""}


def save_answered(data: dict):
    DATA_DIR.mkdir(exist_ok=True)
    with open(QUORA_STATE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def send_telegram(msg: str):
    try:
        requests.post(
            f"https://api.telegram.org/bot{TE_TOKEN}/sendMessage",
            json={"chat_id": TE_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10, verify=VERIFY_SSL,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def main():
    today = datetime.date.today()
    print(f"\n{'='*60}")
    print(f"QUORA FINDER -- {today}")
    print(f"{'='*60}\n")

    state = load_answered()
    answered = set(state.get("answered_urls", []))

    questions = []
    seen_urls: set[str] = set()

    with DDGS() as ddgs:
        for query in SEARCH_QUERIES:
            print(f"  Searching: {query[:60]}...")
            try:
                for r in ddgs.text(query, max_results=5):
                    url = r.get("href", "")
                    if url in seen_urls or url in answered:
                        continue
                    if "quora.com" not in url:
                        continue
                    seen_urls.add(url)
                    title = r.get("title", "")
                    snippet = r.get("body", "")
                    answer = pick_answer(title, snippet)
                    questions.append({
                        "url": url,
                        "title": title[:120],
                        "answer_draft": answer,
                    })
                time.sleep(3)
            except Exception as e:
                print(f"  [WARN] {e}")
                time.sleep(8)

    print(f"\n{len(questions)} nouvelles questions Quora trouvees\n")

    if not questions:
        send_telegram(f"<b>QUORA FINDER</b> — {today}\nAucune nouvelle question trouvee.")
        return

    # Limiter a 3 par run pour ne pas spammer
    to_send = questions[:3]

    lines = [
        f"<b>QUORA</b> — {today}",
        f"{len(questions)} nouvelles questions | Affichage top {len(to_send)}\n",
        "<i>Regle : repondre sans lien, lien uniquement dans ta bio Quora.</i>\n",
    ]

    for i, q in enumerate(to_send, 1):
        lines.append(
            f"<b>{i}. {q['title'][:80]}</b>\n"
            f"URL: {q['url']}\n"
            f"<b>Draft reponse :</b> voir scripts/data/quora_answered.json\n"
        )

    send_telegram("\n".join(lines))

    # Sauvegarder questions + answers
    state["answered_urls"] = list(answered) + [q["url"] for q in questions]
    state["last_run"] = today.isoformat()
    state["pending"] = [{"url": q["url"], "title": q["title"], "draft": q["answer_draft"]}
                        for q in questions]
    save_answered(state)

    # Afficher en console les drafts complets
    print("\n" + "="*60)
    for q in to_send:
        print(f"\nQUESTION: {q['title']}")
        print(f"URL: {q['url']}")
        print(f"\nDRAFT REPONSE:\n{q['answer_draft']}")
        print("\n" + "-"*60)

    print(f"\nTelegram envoye. {len(questions)} questions sauvegardees.")


if __name__ == "__main__":
    main()
