"""
influencer_finder.py -- Trouve les influenceurs pertinents (YouTube/Instagram/Blog)
Niche : expatries au Japon, logement Tokyo, "moved to Japan" content.
Strategie : offrir une consultation gratuite en echange d'un avis honnete.
NO cash payment -- value exchange uniquement.

Run: python scripts/influencer_finder.py
     python scripts/influencer_finder.py --email channel_name  # genere pitch
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
INFLUENCERS_FILE = DATA_DIR / "influencer_targets.json"

# Queries de recherche pour trouver des influenceurs pertinents
SEARCH_QUERIES = [
    "moved to japan vlog site:youtube.com",
    "tokyo apartment hunting vlog 2024 2025",
    "expat in japan housing guide youtube",
    "living in tokyo foreigner youtube channel",
    "japan relocation vlog moving tips",
    "tokyo expat blog housing",
    "japan expat instagram housing",
    "find apartment tokyo vlog english",
    "japanlife expat housing instagram blog",
    "france japon expatrie blog logement",
]

# Mots-cles qui signalent un influenceur pertinent
RELEVANCE_KEYWORDS = [
    "japan", "tokyo", "expat", "housing", "apartment", "move", "living",
    "foreigner", "gaijin", "relocation", "vlog", "guide", "tips",
    "japon", "expatrie", "logement", "appartement", "installation",
]

# Mots-cles negatifs (contenu hors niche)
NEGATIVE_KEYWORDS = [
    "food only", "anime only", "gaming", "clickbait", "drama",
    "politics", "news only",
]

# Influenceurs connus de la niche (baseline, a ne pas re-alerter)
KNOWN_INFLUENCERS = {
    "abroadinjapan",      # 3.5M, trop grand pour free collab
    "paoloformtokyo",     # Tokyo lifestyle, trop grand
    "tokyolens",          # Norm, lifestyle photo
    "sharlainjapan",      # lifestyle, trop grand
    "lifewhereimfrom",    # Documentary, trop grand
}


def score_influencer(result: dict) -> int:
    """Score de pertinence 0-100."""
    title = result.get("title", "").lower()
    snippet = result.get("body", result.get("snippet", "")).lower()
    url = result.get("href", result.get("url", "")).lower()
    text = title + " " + snippet + " " + url

    score = 0
    for kw in RELEVANCE_KEYWORDS:
        if kw in text:
            score += 8

    for kw in NEGATIVE_KEYWORDS:
        if kw in text:
            score -= 15

    # Platform bonus
    if "youtube.com" in url:
        score += 15  # meilleur ROI pour housing content
    elif "instagram.com" in url:
        score += 10
    elif "blog" in url or ".com" in url:
        score += 5

    # Micro-influencer signals (taille ideale)
    micro_signals = ["k subscribers", "k followers", "channel", "vlog", "blog"]
    if any(s in text for s in micro_signals):
        score += 10

    return max(0, min(score, 100))


def detect_platform(url: str) -> str:
    url_lower = url.lower()
    if "youtube.com" in url_lower or "youtu.be" in url_lower:
        return "YouTube"
    if "instagram.com" in url_lower:
        return "Instagram"
    if "tiktok.com" in url_lower:
        return "TikTok"
    if "twitter.com" in url_lower or "x.com" in url_lower:
        return "Twitter/X"
    return "Blog/Site"


def search_influencers() -> list[dict]:
    results = []
    seen_urls: set[str] = set()

    with DDGS() as ddgs:
        for query in SEARCH_QUERIES:
            print(f"  Searching: {query[:60]}...")
            try:
                for r in ddgs.text(query, max_results=6):
                    url = r.get("href", "")
                    if url in seen_urls:
                        continue
                    seen_urls.add(url)
                    score = score_influencer(r)
                    if score >= 30:
                        results.append({
                            "title": r.get("title", "")[:100],
                            "url": url,
                            "snippet": r.get("body", "")[:200],
                            "platform": detect_platform(url),
                            "score": score,
                            "query": query,
                            "status": "new",
                            "found_date": datetime.date.today().isoformat(),
                        })
                time.sleep(3)
            except Exception as e:
                print(f"  [WARN] {query[:40]}: {e}")
                time.sleep(8)

    return sorted(results, key=lambda x: x["score"], reverse=True)


def load_known() -> dict:
    if INFLUENCERS_FILE.exists():
        try:
            with open(INFLUENCERS_FILE, encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {"targets": [], "pitched": [], "last_run": ""}


def save_known(data: dict):
    DATA_DIR.mkdir(exist_ok=True)
    with open(INFLUENCERS_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def generate_pitch(influencer: dict) -> str:
    platform = influencer.get("platform", "votre plateforme")
    title = influencer.get("title", "votre chaine")
    url = influencer.get("url", "")

    return f"""PITCH INFLUENCEUR -- {title}
Platform : {platform}
URL : {url}

---
Subject : Collaboration Tokyo housing — free consultation in exchange for honest review

Hi,

I've been following your content on expat life in Japan — really useful stuff, especially for people planning their move to Tokyo.

I run Tokyo Expat (tokyo-expat.com), a property hunting service for foreigners relocating to Tokyo. One thing I've noticed : your audience asks "how do I find an apartment in Tokyo?" constantly in the comments.

Here's what I'd like to propose : I offer you a free 30-min property search consultation (normally €400) — we'd go through your specific situation, budget, neighbourhood preferences, timeline. Zero sales pitch.

In exchange, if you found it genuinely useful, I'd appreciate an honest mention to your audience — no script, no paid promotion, just your real experience.

If not useful, you owe me nothing.

Would this work for you?

Best,
Alessandro
Tokyo Expat | www.tokyo-expat.com
---
"""


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
    print(f"INFLUENCER FINDER -- {today}")
    print(f"{'='*60}\n")

    known_data = load_known()
    known_urls = {t["url"] for t in known_data.get("targets", [])}
    pitched_urls = set(known_data.get("pitched", []))

    print(f"Recherche d'influenceurs pertinents...")
    results = search_influencers()
    print(f"\n{len(results)} resultats scores >= 30\n")

    # Filtrer les nouveaux
    new_targets = [r for r in results if r["url"] not in known_urls]

    # Sauvegarder
    all_targets = known_data.get("targets", []) + new_targets
    known_data["targets"] = all_targets
    known_data["last_run"] = today.isoformat()
    save_known(known_data)

    if not new_targets:
        send_telegram(f"<b>INFLUENCER FINDER</b> — {today}\nAucun nouveau profil pertinent detecte.")
        print("Aucun nouveau profil.")
        return

    # Telegram
    lines = [
        f"<b>INFLUENCEURS POTENTIELS</b> — {today}",
        f"{len(new_targets)} nouveaux profils detectes\n",
        "<b>Strategie :</b> offrir consultation gratuite (€400) en echange d'un avis honnete",
        "<b>NO cash, NO sponsored — value exchange uniquement</b>\n",
    ]

    for t in new_targets[:5]:
        lines.append(
            f"<b>{t['platform']}</b> [{t['score']}/100] {t['title'][:60]}\n"
            f"   {t['url'][:80]}\n"
            f"   <i>{t['snippet'][:100]}</i>"
        )

    lines.append(f"\nPour generer le pitch : <code>python scripts/influencer_finder.py --email [url]</code>")
    lines.append(f"Fichier complet : scripts/data/influencer_targets.json")

    send_telegram("\n".join(lines))
    print(f"Telegram envoye. {len(new_targets)} nouveaux influenceurs.")


if __name__ == "__main__":
    args = sys.argv[1:]
    if "--email" in args:
        idx = args.index("--email")
        if idx + 1 < len(args):
            target_url = args[idx + 1]
            known_data = load_known()
            target = next((t for t in known_data.get("targets", []) if target_url in t.get("url", "")), None)
            if not target:
                target = {"title": target_url, "url": target_url, "platform": "?"}
            print(generate_pitch(target))
        else:
            print("Usage: --email URL_ou_nom_influenceur")
    else:
        main()
