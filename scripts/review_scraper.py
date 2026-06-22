"""
review_scraper.py - Scrape les avis negatifs sur les concurrents
Cherche sur DuckDuckGo + Reddit les problemes signales par les clients concurrents.
Identifie les failles structurelles pour notre positionnement.
Deps: pip install duckduckgo-search
Run: python scripts/review_scraper.py
"""
import sys
import io
import json
import time
import datetime
import re
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
REVIEWS_FILE = DATA_DIR / "competitor_reviews.json"

# Concurrents a analyser
COMPETITORS = {
    "Remoters": {
        "name": "Remoters",
        "queries": [
            "remoters housing japan review problems",
            "remoters.io housing complaint reddit",
            "remoters tokyo housing scam review",
            "site:reddit.com remoters japan housing",
        ],
        "counter_angle": "On est local, eux sont une plateforme distante sans connaissance terrain",
    },
    "Sakura House": {
        "name": "Sakura House",
        "queries": [
            "sakura house tokyo review bad reddit",
            "sakura house japan complaints problems",
            "sakura house overcrowded noisy review",
            "site:reddit.com sakura-house review",
        ],
        "counter_angle": "Logements personnalises vs share house impersonnel de masse",
    },
    "Oak House": {
        "name": "Oak House",
        "queries": [
            "oak house japan review reddit problems",
            "oakhouse.jp complaint review 2024 2025",
            "oak house tokyo hidden fees problems",
        ],
        "counter_angle": "Transparence totale sur les frais vs frais caches",
    },
    "GaijinPot Housing": {
        "name": "GaijinPot",
        "queries": [
            "gaijinpot housing review problems reddit",
            "gaijinpot housing scam complaint japan",
            "housing.gaijinpot.com review bad experience",
        ],
        "counter_angle": "Accompagnement humain vs portail automatise sans suivi",
    },
}

# Mots-cles signalant un probleme
NEGATIVE_SIGNALS = [
    "scam", "fraud", "rip off", "ripoff", "overpriced", "hidden fees", "fee",
    "not worth", "awful", "terrible", "horrible", "bad", "worst", "avoid",
    "complaint", "problem", "issue", "nightmare", "disappointed", "lied",
    "dirty", "noisy", "overcrowded", "small", "expensive", "no refund",
    "arnaque", "probleme", "mauvais", "eviter", "trop cher", "sale", "bruyant",
    "deception", "mensonge", "frais caches", "pas rembourse", "pire",
    "unhelpful", "unresponsive", "poor communication", "late", "ghost",
    "mold", "cockroach", "insect", "pest", "broken", "unsafe",
]

POSITIVE_SIGNALS = ["great", "excellent", "amazing", "love", "perfect", "recommend", "best"]


def search_reviews(queries: list, max_per_query: int = 8) -> list[dict]:
    """Cherche les avis via DuckDuckGo."""
    results = []
    seen_urls = set()

    with DDGS() as ddgs:
        for query in queries:
            try:
                print(f"  Searching: {query[:60]}...")
                for r in ddgs.text(query, max_results=max_per_query):
                    url = r.get("href", "")
                    if url in seen_urls:
                        continue
                    seen_urls.add(url)
                    results.append({
                        "url": url,
                        "title": r.get("title", ""),
                        "snippet": r.get("body", ""),
                    })
                time.sleep(3)
            except Exception as e:
                print(f"  [WARN] {query[:40]}: {e}")
                time.sleep(8)

    return results


def analyze_sentiment(text: str) -> dict:
    """Analyse rapide du sentiment depuis le texte."""
    text_lower = text.lower()
    negative_hits = [s for s in NEGATIVE_SIGNALS if s in text_lower]
    positive_hits = [s for s in POSITIVE_SIGNALS if s in text_lower]
    score = len(negative_hits) * -2 + len(positive_hits)
    return {
        "score": score,
        "negative": negative_hits[:5],
        "positive": positive_hits[:3],
        "is_complaint": len(negative_hits) >= 2,
    }


def extract_key_issues(results: list[dict]) -> dict[str, int]:
    """Extrait les problemes les plus frequemment mentionnes."""
    issues: dict[str, int] = {}
    for r in results:
        text = (r.get("title", "") + " " + r.get("snippet", "")).lower()
        for signal in NEGATIVE_SIGNALS:
            if signal in text:
                issues[signal] = issues.get(signal, 0) + 1
    return dict(sorted(issues.items(), key=lambda x: x[1], reverse=True))


def is_reddit_result(url: str) -> bool:
    return "reddit.com" in url or "reddit" in url.lower()


def send_telegram(msg: str) -> None:
    try:
        requests.post(
            f"https://api.telegram.org/bot{TE_TOKEN}/sendMessage",
            json={"chat_id": TE_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10, verify=VERIFY_SSL,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def main():
    today = datetime.date.today().isoformat()
    print(f"\n{'='*60}")
    print(f"REVIEW SCRAPER - {today}")
    print(f"{'='*60}\n")

    all_findings = {}

    for comp_key, comp in COMPETITORS.items():
        print(f"\n--- {comp['name']} ---")
        results = search_reviews(comp["queries"])

        complaints = [r for r in results if analyze_sentiment(r.get("snippet", "") + r.get("title", ""))["is_complaint"]]
        reddit_threads = [r for r in results if is_reddit_result(r["url"])]
        issues = extract_key_issues(results)

        print(f"  {len(results)} resultats | {len(complaints)} plaintes | {len(reddit_threads)} Reddit threads")
        print(f"  Top issues: {', '.join(list(issues.keys())[:5])}")

        all_findings[comp_key] = {
            "name": comp["name"],
            "total_results": len(results),
            "complaints": len(complaints),
            "reddit_threads": len(reddit_threads),
            "top_issues": list(issues.keys())[:8],
            "issue_counts": issues,
            "counter_angle": comp["counter_angle"],
            "complaint_snippets": [
                {"url": r["url"], "title": r["title"][:80], "snippet": r["snippet"][:200]}
                for r in complaints[:5]
            ],
            "reddit_urls": [r["url"] for r in reddit_threads[:5]],
            "last_scraped": today,
        }

    # Sauvegarder
    DATA_DIR.mkdir(exist_ok=True)
    with open(REVIEWS_FILE, "w", encoding="utf-8") as f:
        json.dump(all_findings, f, indent=2, ensure_ascii=False)
    print(f"\nSauvegarde -> {REVIEWS_FILE}")

    # Telegram: synthese des failles
    lines = [
        f"<b>FAILLES CONCURRENTS</b> - {today}",
        "Analyse avis negatifs Reddit + Web\n",
    ]

    for comp_key, f in all_findings.items():
        issues_str = ", ".join(f["top_issues"][:4]) if f["top_issues"] else "aucun signe negatif clair"
        lines.append(
            f"\n<b>{f['name']}</b> : {f['complaints']} plaintes | {f['reddit_threads']} Reddit"
            f"\nFailles : {issues_str}"
            f"\nNotre angle : <i>{f['counter_angle']}</i>"
        )

    lines.append(f"\n<b>STRATEGIE :</b> Exploite ces failles dans nos articles comparatifs.")
    lines.append(f"Fichier complet : scripts/data/competitor_reviews.json")

    send_telegram("\n".join(lines))
    print("Telegram envoye.")


if __name__ == "__main__":
    main()
