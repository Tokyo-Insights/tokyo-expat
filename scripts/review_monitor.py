"""
review_monitor.py — Tokyo Expat Intelligence
Surveille les avis Google Maps et Trustpilot des concurrents.
Strategie : quand un concurrent recoit une mauvaise review (logement sale,
support mauvais, frais caches), c'est une opportunite de cibler exactement
cette douleur dans notre contenu et nos pitchs.

Run: python scripts/review_monitor.py
"""

import requests
import json
import datetime
import sys
import io
import re
import time
import urllib3
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
CACHE_FILE = DATA_DIR / "reviews_cache.json"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}

# Concurrents + leur Place ID Google Maps (ou recherche Trustpilot)
# Place IDs trouvables via: https://developers.google.com/maps/documentation/places/web-service/place-id
COMPETITORS = {
    "Sakura House": {
        "google_search": "Sakura House Tokyo share house reviews",
        "trustpilot_slug": "sakura-house.com",
        "note": "leader share house JP",
    },
    "Oak House": {
        "google_search": "Oak House Japan share house reviews",
        "trustpilot_slug": "oakhouse.jp",
        "note": "share house concurrent",
    },
    "GaijinPot Housing": {
        "google_search": "GaijinPot Housing Tokyo reviews",
        "trustpilot_slug": "housing.gaijinpot.com",
        "note": "portail logement",
    },
    "Remoters": {
        "google_search": "Remoters relocation service reviews",
        "trustpilot_slug": "remoters.io",
        "note": "plateforme chasseur — concurrent direct",
    },
    "Fontaine Relocation": {
        "google_search": "Fontaine Relocation Tokyo reviews",
        "trustpilot_slug": "fontaine.co.jp",
        "note": "relocation FR/JP",
    },
    "Crown Relocations Japan": {
        "google_search": "Crown Relocations Japan Tokyo reviews",
        "trustpilot_slug": "crownrelo.com",
        "note": "relocation B2B",
    },
}

# Mots-cles qui indiquent une plainte exploitable
PAIN_KEYWORDS = {
    "prix": ["expensive", "overpriced", "hidden fee", "extra charge", "cher", "frais", "arnaque"],
    "support": ["no response", "slow", "ignored", "unprofessional", "rude", "unhelpful"],
    "logement": ["dirty", "broken", "old", "maintenance", "mold", "noisy", "small", "cramped"],
    "process": ["complicated", "difficult", "confusing", "bureaucratic", "paperwork", "slow process"],
    "communication": ["no english", "language barrier", "japanese only", "no french"],
}


def fetch_trustpilot_reviews(slug: str) -> list[dict]:
    """Scrape les avis recents Trustpilot pour un domaine."""
    reviews = []
    url = f"https://www.trustpilot.com/review/{slug}"
    try:
        r = requests.get(url, headers=HEADERS, timeout=15, verify=VERIFY_SSL)
        if not r.ok:
            return reviews

        # Extraire les avis depuis le JSON-LD embed
        json_ld_matches = re.findall(
            r'<script type="application/ld\+json">([^<]+)</script>', r.text
        )
        for match in json_ld_matches:
            try:
                data = json.loads(match)
                if isinstance(data, dict) and data.get("@type") == "LocalBusiness":
                    for review in data.get("review", [])[:10]:
                        rating = review.get("reviewRating", {}).get("ratingValue", 0)
                        body = review.get("reviewBody", "")
                        date = review.get("datePublished", "")
                        if body:
                            reviews.append({
                                "rating": int(float(rating)),
                                "text": body[:500],
                                "date": date[:10],
                            })
            except Exception:
                pass

        # Fallback: regex sur le HTML
        if not reviews:
            rating_texts = re.findall(
                r'"ratingValue"\s*:\s*"?(\d)".*?"reviewBody"\s*:\s*"([^"]{20,300})"',
                r.text, re.DOTALL
            )
            for rating, text in rating_texts[:10]:
                reviews.append({"rating": int(rating), "text": text, "date": ""})

    except Exception as e:
        print(f"  [WARN] Trustpilot {slug}: {e}")
    return reviews


def classify_complaint(text: str) -> list[str]:
    """Identifie les types de plaintes dans un avis."""
    text_lower = text.lower()
    pains = []
    for pain_type, keywords in PAIN_KEYWORDS.items():
        if any(kw in text_lower for kw in keywords):
            pains.append(pain_type)
    return pains


def load_cache() -> dict:
    DATA_DIR.mkdir(exist_ok=True)
    if CACHE_FILE.exists():
        with open(CACHE_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_cache(cache: dict) -> None:
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2, ensure_ascii=False)


def send_telegram(msg: str) -> None:
    try:
        requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
            json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10, verify=VERIFY_SSL,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def main():
    print(f"\n{'='*60}")
    print(f"REVIEW MONITOR - {datetime.date.today()}")
    print(f"{'='*60}\n")

    cache = load_cache()
    today = datetime.date.today().isoformat()
    all_complaints = []
    pain_summary = {}

    for competitor, info in COMPETITORS.items():
        print(f"Scanning reviews for {competitor}...")
        slug = info.get("trustpilot_slug", "")
        if not slug:
            continue

        reviews = fetch_trustpilot_reviews(slug)
        print(f"  {len(reviews)} avis trouves")
        time.sleep(1)

        cache_key = f"reviews_{competitor}"
        prev_texts = set(cache.get(cache_key, []))

        new_low_reviews = []
        for rev in reviews:
            text_hash = rev["text"][:80]
            if text_hash in prev_texts:
                continue
            if rev["rating"] <= 2:
                pains = classify_complaint(rev["text"])
                if pains:
                    new_low_reviews.append((rev, pains))
                    for p in pains:
                        pain_summary[p] = pain_summary.get(p, 0) + 1

        if new_low_reviews:
            print(f"  {len(new_low_reviews)} nouvelles mauvaises reviews!")
            for rev, pains in new_low_reviews[:3]:
                excerpt = rev["text"][:150].replace("\n", " ")
                all_complaints.append({
                    "competitor": competitor,
                    "rating": rev["rating"],
                    "pains": pains,
                    "excerpt": excerpt,
                })

        cache[cache_key] = list({r["text"][:80] for r in reviews})
        cache[f"last_scan_{competitor}"] = today

    save_cache(cache)

    if all_complaints:
        lines = [f"<b>REVIEW INTEL</b> — {today}\n"]
        lines.append(f"<b>{len(all_complaints)}</b> nouvelles mauvaises reviews chez les concurrents:\n")

        for c in all_complaints[:8]:
            pains_str = ", ".join(c["pains"])
            lines.append(
                f"{c['competitor']} ({c['rating']}/5) [{pains_str}]\n"
                f"<i>'{c['excerpt']}...'</i>\n"
            )

        if pain_summary:
            top_pains = sorted(pain_summary.items(), key=lambda x: x[1], reverse=True)
            lines.append("\n<b>Douleurs les plus citees:</b>")
            for pain, count in top_pains[:5]:
                lines.append(f"  {pain}: {count}x")
            lines.append("\n<i>Action: cibler ces douleurs dans nos articles et pitchs commerciaux.</i>")

        send_telegram("\n".join(lines))
        print(f"\n{len(all_complaints)} complaints envoyes")
    else:
        print("\nAucune nouvelle mauvaise review detectee")


if __name__ == "__main__":
    main()
