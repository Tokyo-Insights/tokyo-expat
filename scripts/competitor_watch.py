"""
competitor_watch.py — Tokyo Expat Intelligence
Surveille les sitemaps de 8 concurrents, détecte nouveaux articles, alerte Telegram.
Run: python scripts/competitor_watch.py
"""

import requests
import xml.etree.ElementTree as ET
import json
import datetime
import re
import os
import sys
import io
from pathlib import Path

# Fix Windows console encoding
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# SSL cert workaround (Windows corporate cert chain issues)
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

# ── CONFIG ────────────────────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
CACHE_FILE = DATA_DIR / "competitor_cache.json"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0"
}

# ── COMPETITORS à surveiller ───────────────────────────────────────────────────
COMPETITORS = {
    "Remoters": {
        "sitemap": "https://www.remoters.io/sitemap.xml",
        "domain": "remoters.io",
        "note": "concurrent principal — 20% commission",
    },
    "GaijinPot Housing": {
        "sitemap": "https://housing.gaijinpot.com/sitemap.xml",
        "domain": "housing.gaijinpot.com",
        "note": "portail listing — backlinks forts",
    },
    "GaijinPot Blog": {
        "sitemap": "https://blog.gaijinpot.com/sitemap.xml",
        "domain": "blog.gaijinpot.com",
        "note": "blog expat en anglais — surveiller topics",
    },
    "Sakura House": {
        "sitemap": "https://www.sakura-house.com/sitemap.xml",
        "domain": "sakura-house.com",
        "note": "share house leader — surveiller promos",
    },
    "Oak House": {
        "sitemap": "https://www.oakhouse.jp/sitemap.xml",
        "domain": "oakhouse.jp",
        "note": "share house — concurrence directe",
    },
    "Tokyo Cheapo": {
        "sitemap": "https://tokyocheapo.com/sitemap.xml",
        "domain": "tokyocheapo.com",
        "note": "guide expat — opportunités backlinks",
    },
    "Japan Guide": {
        "sitemap": "https://www.japan-guide.com/sitemap.xml",
        "domain": "japan-guide.com",
        "note": "grand site — surveiller section logement",
    },
    "Fontaine Relocation": {
        "sitemap": "https://fontaine.co.jp/sitemap.xml",
        "domain": "fontaine.co.jp",
        "note": "relocation FR/JP — concurrent niche francophone",
    },
    "Savvy Tokyo": {
        "sitemap": "https://savvytokyo.com/sitemap.xml",
        "domain": "savvytokyo.com",
        "note": "magazine lifestyle expat Tokyo — backlinks potentiels, guest posts",
    },
    "Japan Property Central": {
        "sitemap": "https://japanpropertycentral.com/sitemap.xml",
        "domain": "japanpropertycentral.com",
        "note": "info achat immobilier JP — concurrent partiel, opportunités backlinks",
    },
}

# Keywords qui indiquent un contenu intéressant à contre-attaquer
INTERESTING_KEYWORDS = [
    "tokyo", "appartement", "apartment", "share house", "meuble", "furnished",
    "garant", "guarantor", "louer", "rent", "expatrie", "expat", "foreigner",
    "etranger", "logement", "housing", "visa", "quartier", "neighborhood",
    "francais", "french", "move", "demenager", "checklist", "guide",
]

# ── FUNCTIONS ─────────────────────────────────────────────────────────────────

def fetch_sitemap(url: str, depth: int = 0) -> list[str]:
    """Télécharge et parse un sitemap (gère les sitemap index)."""
    if depth > 2:
        return []
    try:
        r = requests.get(url, timeout=15, headers=HEADERS, verify=VERIFY_SSL)
        r.raise_for_status()
        root = ET.fromstring(r.content)
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}

        # Sitemap index
        sub_sitemaps = root.findall("sm:sitemap/sm:loc", ns)
        if sub_sitemaps:
            urls = []
            for sm in sub_sitemaps[:10]:
                urls.extend(fetch_sitemap(sm.text.strip(), depth + 1))
            return urls

        # Regular sitemap
        return [loc.text.strip() for loc in root.findall("sm:url/sm:loc", ns) if loc.text]
    except Exception as e:
        print(f"  [WARN] {url}: {e}")
        return []


def load_cache() -> dict:
    DATA_DIR.mkdir(exist_ok=True)
    if CACHE_FILE.exists():
        with open(CACHE_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_cache(cache: dict) -> None:
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2, ensure_ascii=False)


def is_interesting(url: str) -> bool:
    """Filtre les URLs qui couvrent des sujets qu'on devrait contre-attaquer."""
    url_lower = url.lower()
    return any(kw in url_lower for kw in INTERESTING_KEYWORDS)


def slug_to_topic(url: str) -> str:
    """Extrait un topic lisible depuis une URL."""
    slug = url.rstrip("/").split("/")[-1]
    slug = re.sub(r"[-_]", " ", slug)
    slug = re.sub(r"\.(html|php|aspx)$", "", slug)
    return slug.strip() or url


def send_telegram(msg: str) -> None:
    try:
        r = requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
            json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10,
            verify=VERIFY_SSL,
        )
        if not r.ok:
            print(f"  [WARN] Telegram error: {r.text}")
    except Exception as e:
        print(f"  [WARN] Telegram: {e}")


def main():
    print(f"\n{'='*60}")
    print(f"COMPETITOR WATCH - {datetime.date.today()}")
    print(f"{'='*60}\n")

    cache = load_cache()
    alerts = []
    counter_attack_suggestions = []

    for name, info in COMPETITORS.items():
        print(f"Scanning {name}...")
        urls = fetch_sitemap(info["sitemap"])
        print(f"  {len(urls)} URLs found")

        current_set = set(urls)
        prev_key = f"urls_{name}"

        if prev_key in cache:
            old_set = set(cache[prev_key])
            new_urls = current_set - old_set
            if new_urls:
                print(f"  🆕 {len(new_urls)} new URLs!")
                for url in sorted(new_urls):
                    topic = slug_to_topic(url)
                    alerts.append(f"📰 <b>{name}</b>: {topic}\n<code>{url}</code>")
                    if is_interesting(url):
                        counter_attack_suggestions.append(
                            f"⚔️ CONTRE-ATTAQUE: {name} a publié sur <b>{topic}</b> → créer un meilleur article ?"
                        )
        else:
            print(f"  (first scan - baseline saved)")

        cache[prev_key] = list(current_set)
        cache[f"last_scan_{name}"] = datetime.datetime.now().isoformat()

    save_cache(cache)

    # Envoyer alerte Telegram
    if alerts:
        msg_parts = [
            f"Competitor Watch - {datetime.date.today()}\n",
            f"<i>{len(alerts)} nouveaux articles détectés</i>\n",
        ]
        msg_parts.extend(alerts[:15])  # max 15 URLs par message
        if counter_attack_suggestions:
            msg_parts.append("\n" + "\n".join(counter_attack_suggestions[:5]))

        msg = "\n".join(msg_parts)
        send_telegram(msg)
        print(f"\n✅ Telegram alert sent ({len(alerts)} items)")
    else:
        print("\n✅ No new content detected — all quiet")

    # Rapport final
    total = sum(len(v) for k, v in cache.items() if k.startswith("urls_"))
    print(f"\nTotal indexed: {total} competitor URLs in cache")


if __name__ == "__main__":
    main()
