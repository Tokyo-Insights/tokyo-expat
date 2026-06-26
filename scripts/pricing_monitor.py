"""
pricing_monitor.py — Surveille les pages /services ou /pricing des concurrents.
Detecte tout changement (nouveau service, modification de prix, nouvelle offre).
Run: python scripts/pricing_monitor.py
"""
import requests
import hashlib
import json
import datetime
import sys
import io
import re
import urllib3
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
CACHE_FILE = DATA_DIR / "pricing_cache.json"

HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

# Pages de pricing/services a surveiller
PRICING_PAGES = {
    # Concurrents directs logement
    "Remoters Tokyo":           "https://www.remoters.io/destination/tokyo",
    "Remoters Homepage":        "https://www.remoters.io",
    "Sakura House Pricing EN":  "https://www.sakura-house.com/en/about/",
    "Sakura House Homepage":    "https://www.sakura-house.com/en/",
    "Oak House Rent Guide":     "https://www.oakhouse.jp/column/column_basic/rent-prices",
    "Oak House About":          "https://www.oakhouse.jp/about",
    "Gaijin House Pricing":     "https://www.gaijinhouse.com/pricing/",
    # Relocation services
    "Fontaine Services":        "https://fontaine.co.jp/services/",
    "Crown Relo Tokyo":         "https://www.crownrelo.com/japan/en-jp/services",
    "Asian Tigers Services":    "https://www.asiantigers-japan.com/services/",
    # Content competitors (surveiller leurs offres premium/ads)
    "Tokyo Cheapo Housing":     "https://tokyocheapo.com/living/housing/",
    "Savvy Tokyo Advertise":    "https://savvytokyo.com/advertise/",
    "GaijinPot Advertise":      "https://gaijinpot.com/advertise/",
    # Notre propre page (reference)
    "Tokyo Expat Services":     "https://www.tokyo-expat.com/services",
}

def fetch_page_content(url: str) -> str | None:
    """Telecharge une page et extrait le texte pertinent (prix, services)."""
    try:
        r = requests.get(url, timeout=15, headers=HEADERS, verify=VERIFY_SSL)
        r.raise_for_status()
        text = r.text

        # Extraire seulement les donnees pertinentes (prix, services, features)
        # Supprimer scripts, styles, nav pour reduire le bruit
        text = re.sub(r'<script[^>]*>.*?</script>', '', text, flags=re.DOTALL)
        text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.DOTALL)
        text = re.sub(r'<nav[^>]*>.*?</nav>', '', text, flags=re.DOTALL)
        text = re.sub(r'<footer[^>]*>.*?</footer>', '', text, flags=re.DOTALL)
        text = re.sub(r'<[^>]+>', ' ', text)
        text = re.sub(r'\s+', ' ', text).strip()

        # Extraire les sections avec des prix (chiffres + devises)
        price_pattern = re.findall(r'[¥$€£]\s*[\d,]+|[\d,]+\s*[¥円JPY]|[\d.]+\s*%', text)
        return text[:3000], price_pattern  # Limiter a 3000 chars pour le hash
    except Exception as e:
        print(f"  [WARN] {url}: {e}")
        return None, []


def content_hash(content: str) -> str:
    return hashlib.md5(content.encode()).hexdigest()


def load_cache() -> dict:
    DATA_DIR.mkdir(exist_ok=True)
    if CACHE_FILE.exists():
        with open(CACHE_FILE, encoding='utf-8') as f:
            return json.load(f)
    return {}


def save_cache(cache: dict) -> None:
    with open(CACHE_FILE, 'w', encoding='utf-8') as f:
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
    print(f"PRICING MONITOR - {datetime.date.today()}")
    print(f"{'='*60}\n")

    cache = load_cache()
    alerts = []

    for name, url in PRICING_PAGES.items():
        print(f"Checking {name}...")
        content, prices = fetch_page_content(url)

        if content is None:
            print(f"  [SKIP] Could not fetch")
            continue

        h = content_hash(content)
        prev_hash = cache.get(f"hash_{name}")
        prev_prices = cache.get(f"prices_{name}", [])

        if prev_hash and prev_hash != h:
            # Detecter quels prix ont change
            new_prices = set(prices) - set(prev_prices)
            removed_prices = set(prev_prices) - set(prices)

            alert_parts = [f"Prix/services change detecte: <b>{name}</b>"]
            if new_prices:
                alert_parts.append(f"Nouveaux prix: {', '.join(list(new_prices)[:5])}")
            if removed_prices:
                alert_parts.append(f"Prix supprimes: {', '.join(list(removed_prices)[:5])}")
            alert_parts.append(f"URL: {url}")

            alert = "\n".join(alert_parts)
            alerts.append(alert)
            print(f"  CHANGEMENT DETECTE! Prix actuels: {prices[:5]}")
        elif not prev_hash:
            print(f"  (premier scan - baseline enregistree)")
            if prices:
                print(f"  Prix detectes: {prices[:5]}")
        else:
            print(f"  Aucun changement")

        cache[f"hash_{name}"] = h
        cache[f"prices_{name}"] = prices
        cache[f"last_check_{name}"] = datetime.datetime.now().isoformat()

    save_cache(cache)

    if alerts:
        msg = f"Pricing Monitor - {datetime.date.today()}\n\n" + "\n\n".join(alerts)
        send_telegram(msg)
        print(f"\n{len(alerts)} alertes envoyees")
    else:
        print("\nAucun changement de prix detecte")


if __name__ == "__main__":
    main()
