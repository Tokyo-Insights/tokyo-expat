"""
backlink_spy.py — Tokyo Expat Backlink Intelligence
Trouve les backlinks des concurrents via API gratuite OpenLinkProfiler.
Génère un CSV d'opportunités triées par autorité.
Envoie un résumé Telegram avec les top cibles.

Run: python scripts/backlink_spy.py
"""

import requests
import csv
import json
import datetime
import os
import sys
import io
import time
import urllib3
from pathlib import Path
from urllib.parse import quote

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

# ── CONFIG ────────────────────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
OUTPUT_CSV = DATA_DIR / f"backlink_opportunities_{datetime.date.today()}.csv"
CACHE_FILE = DATA_DIR / "backlinks_cache.json"

OUR_DOMAIN = "tokyo-expat.com"

COMPETITORS = [
    "remoters.io",
    "housing.gaijinpot.com",
    "sakura-house.com",
    "tokyocheapo.com",
]

# Domaines à exclure (auto-liens, réseaux sociaux sans valeur SEO)
EXCLUDE_DOMAINS = {
    "facebook.com", "twitter.com", "instagram.com", "youtube.com",
    "pinterest.com", "linkedin.com", "reddit.com", "t.co",
    "google.com", "apple.com", "amazon.com",
    "web.archive.org", "addthis.com", "sharethis.com",
}

# Mots-clés qui indiquent un site pertinent pour nous
RELEVANT_KEYWORDS = [
    "japan", "tokyo", "expat", "foreigner", "housing", "apartment",
    "living", "travel", "relocation", "guide", "work", "visa",
    "french", "francophone", "international",
]

# ── API CALLS ─────────────────────────────────────────────────────────────────

def fetch_openlinkprofiler(domain: str, limit: int = 200) -> list[dict]:
    """
    Appelle l'API gratuite OpenLinkProfiler.
    Doc: http://api.openlinkprofiler.org/
    """
    url = f"http://api.openlinkprofiler.org/lps"
    params = {
        "url": domain,
        "limit": limit,
        "output": "json",
    }
    try:
        r = requests.get(url, params=params, timeout=30, verify=VERIFY_SSL)
        if r.ok:
            data = r.json()
            if isinstance(data, list):
                return data
            if isinstance(data, dict) and "links" in data:
                return data["links"]
    except Exception as e:
        print(f"  [WARN] OpenLinkProfiler error for {domain}: {e}")

    # Fallback: Moz Free API (mozchecklist)
    return fetch_fallback_links(domain)


def fetch_fallback_links(domain: str) -> list[dict]:
    """Fallback via Google site: search si OpenLinkProfiler échoue."""
    # On ne scrape pas Google ici — on retourne une liste vide et on log
    print(f"  [INFO] Fallback: manuellement, cherche sur ahrefs.com/backlink-checker?input={domain}")
    return []


def fetch_our_backlinks() -> list[dict]:
    """Vérifie nos propres backlinks pour comparaison."""
    return fetch_openlinkprofiler(OUR_DOMAIN, limit=100)

# ── ANALYSIS ──────────────────────────────────────────────────────────────────

def is_relevant(link: dict) -> bool:
    """Filtre les liens pertinents pour notre niche."""
    source = link.get("source_url", "") + link.get("source_domain", "")
    source_lower = source.lower()
    domain = link.get("source_domain", "").lower()

    if any(ex in domain for ex in EXCLUDE_DOMAINS):
        return False
    if not any(kw in source_lower for kw in RELEVANT_KEYWORDS):
        return False
    return True


def score_opportunity(link: dict) -> int:
    """Score 0-100 pour prioriser les opportunités."""
    score = 0
    source_lower = (link.get("source_url", "") + link.get("source_domain", "")).lower()

    # Autorité du domaine (si disponible)
    da = link.get("domain_authority", link.get("da", 0)) or 0
    score += min(da, 50)

    # Pertinence niche
    for kw in ["japan", "tokyo", "expat", "foreigner", "housing"]:
        if kw in source_lower:
            score += 8

    # Type de page
    if "guide" in source_lower or "resources" in source_lower:
        score += 10
    if "blog" in source_lower or "article" in source_lower:
        score += 5

    # Anchor text
    anchor = link.get("anchor", "").lower()
    if any(kw in anchor for kw in ["japan", "tokyo", "housing", "expat"]):
        score += 10

    return min(score, 100)


def normalize_link(raw: dict, source_competitor: str) -> dict:
    """Normalise un lien brut en format standard."""
    return {
        "competitor": source_competitor,
        "source_domain": raw.get("source_domain", raw.get("domain", "")),
        "source_url": raw.get("source_url", raw.get("url", "")),
        "target_url": raw.get("target_url", raw.get("link", "")),
        "anchor": raw.get("anchor_text", raw.get("anchor", "")),
        "da": raw.get("domain_authority", raw.get("da", 0)) or 0,
        "follow": raw.get("nofollow", True) == False or raw.get("follow", False),
        "score": 0,
    }

# ── OUTPUT ────────────────────────────────────────────────────────────────────

def write_csv(opportunities: list[dict]) -> None:
    DATA_DIR.mkdir(exist_ok=True)
    fields = ["score", "competitor", "source_domain", "anchor", "da", "follow", "source_url", "target_url"]
    with open(OUTPUT_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(opportunities)
    print(f"\n📁 CSV exporté: {OUTPUT_CSV}")


def send_telegram(msg: str) -> None:
    try:
        requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
            json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10,
            verify=VERIFY_SSL,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def send_report(opportunities: list[dict], our_count: int) -> None:
    top = opportunities[:10]
    lines = [
        f"🔗 <b>BACKLINK SPY</b> — {datetime.date.today()}\n",
        f"<b>{len(opportunities)}</b> opportunités trouvées | Nous: <b>{our_count}</b> backlinks\n",
        "<b>Top 10 cibles à contacter :</b>",
    ]
    for i, opp in enumerate(top, 1):
        domain = opp["source_domain"]
        comp = opp["competitor"]
        score = opp["score"]
        follow = "✅ dofollow" if opp["follow"] else "⬜ nofollow"
        lines.append(f"{i}. <b>{domain}</b> (score:{score}) [{follow}]\n   via {comp}")

    lines.append("\n<b>Action:</b> contacter ces sites pour proposer un échange de contenu ou guest post")
    send_telegram("\n".join(lines))


# ── MAIN ──────────────────────────────────────────────────────────────────────

def main():
    print(f"\n{'='*60}")
    print(f"BACKLINK SPY — {datetime.date.today()}")
    print(f"{'='*60}\n")

    all_opportunities: list[dict] = []
    seen_domains: set[str] = set()

    # Nos propres backlinks (pour comparaison)
    print("Fetching our own backlinks...")
    our_links = fetch_our_backlinks()
    our_domains = {l.get("source_domain", "") for l in our_links}
    print(f"  Nous avons {len(our_links)} backlinks depuis {len(our_domains)} domaines\n")

    # Backlinks des concurrents
    for competitor in COMPETITORS:
        print(f"Fetching backlinks for {competitor}...")
        raw_links = fetch_openlinkprofiler(competitor)
        time.sleep(2)
        print(f"  {len(raw_links)} links found")

        for raw in raw_links:
            link = normalize_link(raw, competitor)
            domain = link["source_domain"]

            # Filtres
            if not domain:
                continue
            if domain in seen_domains:
                continue
            if domain == OUR_DOMAIN:
                continue
            if not is_relevant(link):
                continue

            link["score"] = score_opportunity(link)
            link["already_have"] = domain in our_domains

            seen_domains.add(domain)
            all_opportunities.append(link)

    # Trier par score décroissant
    all_opportunities.sort(key=lambda x: x["score"], reverse=True)

    # Ne garder que ceux qu'on n'a pas encore
    new_opportunities = [o for o in all_opportunities if not o.get("already_have")]

    print(f"\n{'='*60}")
    print(f"RÉSULTATS:")
    print(f"  Total opportunités: {len(all_opportunities)}")
    print(f"  Nouvelles (pas encore nos backlinks): {len(new_opportunities)}")
    print(f"{'='*60}\n")

    # Top 20 en console
    for i, opp in enumerate(new_opportunities[:20], 1):
        follow = "dofollow" if opp["follow"] else "nofollow"
        print(f"{i:2d}. [{opp['score']:3d}] {opp['source_domain']:<40} via {opp['competitor']} ({follow})")

    # Export CSV
    write_csv(new_opportunities)

    # Telegram
    send_report(new_opportunities, len(our_links))


if __name__ == "__main__":
    main()
