"""
broken_link_finder.py — Tokyo Expat 404 Broken Link Builder
Technique: trouve les pages 404 chez les concurrents, identifie qui leur envoie
des backlinks, génère un pitch email personnalisé pour voler ces backlinks.
Run: python scripts/broken_link_finder.py
"""

import requests
import json
import csv
import datetime
import time
import urllib3
from pathlib import Path
import sys
import io

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
COMPETITOR_CACHE = DATA_DIR / "competitor_cache.json"
BROKEN_CACHE = DATA_DIR / "broken_links_cache.json"
OUTPUT_CSV = DATA_DIR / f"broken_link_opportunities_{datetime.date.today()}.csv"

OUR_DOMAIN = "tokyo-expat.com"

# Mapping keyword -> notre meilleure page de remplacement
OUR_PAGES = {
    "apartment": "/en/blog/find-apartment-tokyo-foreigner",
    "appartement": "/fr/blog/trouver-appartement-tokyo-etranger",
    "share house": "/en/blog/share-house-tokyo-guide-2026",
    "share-house": "/en/blog/share-house-tokyo-guide-2026",
    "furnished": "/en/blog/furnished-apartment-tokyo-no-guarantor",
    "meuble": "/fr/blog/appartement-meuble-tokyo-sans-garant",
    "guarantor": "/en/blog/furnished-apartment-tokyo-no-guarantor",
    "garant": "/fr/blog/garantie-loyer-etranger-japon",
    "visa": "/en/blog/japan-work-visa-foreigners-guide",
    "cost": "/en/blog/tokyo-expat-cost-of-living-2026",
    "cout": "/fr/blog/cout-vie-tokyo-expatrie-2026",
    "bank": "/en/blog/open-bank-account-japan-foreigner",
    "banque": "/fr/blog/ouvrir-compte-bancaire-japon-etranger",
    "tax": "/en/blog/japan-income-tax-foreigners-guide",
    "impot": "/fr/blog/impots-revenus-japon-expatrie-2026",
    "sim": "/en/blog/japan-sim-card-foreigners-2026",
    "transport": "/en/blog/tokyo-public-transport-expat-guide",
    "health": "/en/blog/japan-health-insurance-expat-guide",
    "insurance": "/en/blog/japan-health-insurance-expat-guide",
    "residence": "/en/blog/residence-card-japan-zairyu-card-guide",
    "checklist": "/en/blog/moving-to-tokyo-checklist-2026",
    "moving": "/en/blog/moving-to-tokyo-checklist-2026",
    "neighbourhood": "/en/blog/tokyo-neighbourhoods-expats-guide",
    "neighborhood": "/en/blog/tokyo-neighbourhoods-expats-guide",
    "quartier": "/fr/blog/quartiers-tokyo-expatries-guide",
    "work": "/en/blog/working-in-tokyo-expat-guide-2026",
    "travail": "/fr/blog/travailler-tokyo-expatrie-guide-2026",
    "utilities": "/en/blog/setting-up-utilities-tokyo-apartment",
    "internet": "/fr/blog/internet-utilitaires-tokyo-appartement",
    "family": "/en/blog/family-expat-tokyo-international-schools",
    "famille": "/fr/blog/famille-expatriee-tokyo-ecoles-internationales",
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0"
}

MAX_URLS_PER_COMPETITOR = 80
BATCH_SIZE = 15
SLEEP_BETWEEN_REQUESTS = 0.4
SLEEP_BETWEEN_BATCHES = 3


def load_competitor_cache() -> dict:
    if COMPETITOR_CACHE.exists():
        with open(COMPETITOR_CACHE, encoding="utf-8") as f:
            return json.load(f)
    return {}


def load_broken_cache() -> dict:
    DATA_DIR.mkdir(exist_ok=True)
    if BROKEN_CACHE.exists():
        with open(BROKEN_CACHE, encoding="utf-8") as f:
            return json.load(f)
    return {"checked": {}}


def save_broken_cache(cache: dict) -> None:
    with open(BROKEN_CACHE, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2, ensure_ascii=False)


def check_url_status(url: str) -> int:
    try:
        r = requests.head(url, timeout=8, headers=HEADERS, verify=VERIFY_SSL, allow_redirects=True)
        return r.status_code
    except Exception:
        try:
            r = requests.get(url, timeout=8, headers=HEADERS, verify=VERIFY_SSL, stream=True)
            return r.status_code
        except Exception:
            return 0


def find_who_links_to(dead_url: str) -> list[dict]:
    """Trouve qui lie vers une URL morte via OpenLinkProfiler."""
    try:
        from urllib.parse import quote
        api_url = f"http://api.openlinkprofiler.org/lps?url={quote(dead_url)}&limit=50&output=json"
        r = requests.get(api_url, timeout=20, verify=VERIFY_SSL)
        if r.ok:
            data = r.json()
            if isinstance(data, list):
                return data
            if isinstance(data, dict) and "links" in data:
                return data["links"]
    except Exception as e:
        print(f"    [WARN] API error for {dead_url}: {e}")
    return []


def guess_our_replacement(dead_url: str) -> str:
    url_lower = dead_url.lower()
    for keyword, path in OUR_PAGES.items():
        if keyword in url_lower:
            return f"https://www.tokyo-expat.com{path}"
    return "https://www.tokyo-expat.com/en/blog/find-apartment-tokyo-foreigner"


def generate_pitch_email(dead_url: str, our_replacement: str, linker_domain: str) -> str:
    return (
        f"Subject: Broken link on {linker_domain} — replacement available\n\n"
        f"Hi,\n\n"
        f"I noticed a page on your site links to:\n{dead_url}\n\n"
        f"This URL now returns a 404 error. We've published an up-to-date guide on the same topic:\n"
        f"{our_replacement}\n\n"
        f"It covers everything your readers need with current 2026 information.\n"
        f"Would you consider updating the link? Happy to tailor a short intro paragraph for your audience.\n\n"
        f"Best regards,\n"
        f"Alessandro\n"
        f"Tokyo Expat — www.tokyo-expat.com"
    )


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
    print(f"BROKEN LINK FINDER — {datetime.date.today()}")
    print(f"{'='*60}\n")

    comp_cache = load_competitor_cache()
    broken_cache = load_broken_cache()
    if "checked" not in broken_cache:
        broken_cache["checked"] = {}

    opportunities = []
    total_checked = 0
    total_404 = 0

    # Extraire les URLs de concurrents depuis le cache competitor_watch
    competitor_urls: dict[str, list[str]] = {}
    for key, value in comp_cache.items():
        if key.startswith("urls_") and isinstance(value, list):
            name = key.replace("urls_", "")
            competitor_urls[name] = value

    if not competitor_urls:
        print("[WARN] Aucun cache competitor trouvé. Lance competitor_watch.py d'abord.")
        send_telegram("⚠️ <b>BROKEN LINK FINDER</b>: aucun cache concurrent. Lance competitor_watch.py d'abord.")
        return

    seen_linker_domains: set[str] = set()

    for name, urls in competitor_urls.items():
        sample = urls[:MAX_URLS_PER_COMPETITOR]
        print(f"\nChecking {name} ({len(sample)} URLs)...")

        for i in range(0, len(sample), BATCH_SIZE):
            batch = sample[i:i + BATCH_SIZE]

            for url in batch:
                cached_status = broken_cache["checked"].get(url)
                if cached_status is not None:
                    status = cached_status
                else:
                    status = check_url_status(url)
                    broken_cache["checked"][url] = status
                    time.sleep(SLEEP_BETWEEN_REQUESTS)

                total_checked += 1

                if status == 404:
                    total_404 += 1
                    print(f"  404: {url}")

                    our_replacement = guess_our_replacement(url)
                    linkers = find_who_links_to(url)
                    time.sleep(2)

                    for linker in linkers[:5]:
                        linker_domain = linker.get("source_domain", linker.get("domain", ""))
                        linker_url = linker.get("source_url", linker.get("url", ""))
                        da = int(linker.get("domain_authority", linker.get("da", 0)) or 0)

                        if not linker_domain or linker_domain == OUR_DOMAIN:
                            continue
                        if linker_domain in seen_linker_domains:
                            continue

                        seen_linker_domains.add(linker_domain)
                        pitch = generate_pitch_email(url, our_replacement, linker_domain)

                        opportunities.append({
                            "competitor": name,
                            "dead_url": url,
                            "linker_domain": linker_domain,
                            "linker_url": linker_url,
                            "da": da,
                            "our_replacement": our_replacement,
                            "pitch_email": pitch,
                        })

            time.sleep(SLEEP_BETWEEN_BATCHES)
            save_broken_cache(broken_cache)

    # Trier par DA décroissant
    opportunities.sort(key=lambda x: x.get("da", 0), reverse=True)

    # Export CSV
    DATA_DIR.mkdir(exist_ok=True)
    if opportunities:
        fields = ["competitor", "dead_url", "linker_domain", "da", "our_replacement", "linker_url", "pitch_email"]
        with open(OUTPUT_CSV, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
            writer.writeheader()
            writer.writerows(opportunities)
        print(f"\nCSV: {OUTPUT_CSV}")

    # Telegram
    msg = (
        f"🔴 <b>BROKEN LINK FINDER</b> — {datetime.date.today()}\n\n"
        f"URLs vérifiées: <b>{total_checked}</b>\n"
        f"Pages 404 trouvées: <b>{total_404}</b>\n"
        f"Opportunités backlinks: <b>{len(opportunities)}</b>\n"
    )
    if opportunities:
        msg += "\n<b>Top 5 cibles (par DA) :</b>\n"
        for opp in opportunities[:5]:
            msg += f"• <b>{opp['linker_domain']}</b> (DA:{opp['da']}) via {opp['competitor']}\n"
        msg += f"\n<i>CSV: scripts/data/broken_link_opportunities_{datetime.date.today()}.csv</i>"
    else:
        msg += "\nAucune opportunité trouvée cette semaine."
    send_telegram(msg)

    print(f"\nRESULTATS: {total_checked} vérifiées, {total_404} mortes, {len(opportunities)} opportunités")


if __name__ == "__main__":
    main()
