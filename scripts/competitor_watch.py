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
    # ── Core concurrents directs ──────────────────────────────────────────────
    "Remoters": {
        "sitemap": "https://www.remoters.io/sitemap.xml",
        "domain": "remoters.io",
        "note": "concurrent principal — 20% commission",
        "content_publisher": True,
    },
    "GaijinPot Housing": {
        "sitemap": "https://housing.gaijinpot.com/sitemap.xml",
        "domain": "housing.gaijinpot.com",
        "note": "portail listing — backlinks forts",
        "content_publisher": False,
    },
    "GaijinPot Blog": {
        "sitemap": "https://blog.gaijinpot.com/sitemap.xml",
        "domain": "blog.gaijinpot.com",
        "note": "blog expat EN — surveiller topics",
        "content_publisher": True,
    },
    "Sakura House": {
        "sitemap": "https://www.sakura-house.com/sitemap.xml",
        "domain": "sakura-house.com",
        "note": "share house leader — surveiller promos",
        "content_publisher": False,
    },
    "Oak House": {
        "sitemap": "https://www.oakhouse.jp/sitemap.xml",
        "domain": "oakhouse.jp",
        "note": "share house — concurrence directe",
        "content_publisher": False,
    },
    "Fontaine Relocation": {
        "sitemap": "https://fontaine.co.jp/sitemap.xml",
        "domain": "fontaine.co.jp",
        "note": "relocation FR/JP — concurrent niche francophone",
        "content_publisher": True,
    },
    # ── Editeurs contenu expat EN ─────────────────────────────────────────────
    "Tokyo Cheapo": {
        "sitemap": "https://tokyocheapo.com/sitemap.xml",
        "domain": "tokyocheapo.com",
        "note": "guide expat — backlinks potentiels",
        "content_publisher": True,
    },
    "Savvy Tokyo": {
        "sitemap": "https://savvytokyo.com/sitemap.xml",
        "domain": "savvytokyo.com",
        "note": "magazine lifestyle expat Tokyo",
        "content_publisher": True,
    },
    "Japan Guide": {
        "sitemap": "https://www.japan-guide.com/sitemap.xml",
        "domain": "japan-guide.com",
        "note": "grand site JP — section logement",
        "content_publisher": True,
    },
    "Japan Property Central": {
        "sitemap": "https://japanpropertycentral.com/sitemap.xml",
        "domain": "japanpropertycentral.com",
        "note": "achat immobilier JP — backlinks",
        "content_publisher": True,
    },
    "Japan Today": {
        "sitemap": "https://japantoday.com/sitemap.xml",
        "domain": "japantoday.com",
        "note": "media JP EN — surveiller section life/housing",
        "content_publisher": True,
    },
    "City Cost": {
        "sitemap": "https://www.city-cost.com/sitemap.xml",
        "domain": "city-cost.com",
        "note": "blog vie pratique JP — concurrent contenu direct",
        "content_publisher": True,
    },
    "Japan Insiders": {
        "sitemap": "https://japaninsiders.com/sitemap.xml",
        "domain": "japaninsiders.com",
        "note": "guide expat mid-size — audience pertinente",
        "content_publisher": True,
    },
    "Tofugu": {
        "sitemap": "https://www.tofugu.com/sitemap.xml",
        "domain": "tofugu.com",
        "note": "blog JP culture DA65 — section Living in Japan",
        "content_publisher": True,
    },
    "Time Out Tokyo": {
        "sitemap": "https://www.timeout.com/sitemap.xml",
        "domain": "timeout.com",
        "note": "magazine lifestyle Tokyo — backlinks DR80",
        "content_publisher": True,
    },
    # ── Share houses supplementaires ─────────────────────────────────────────
    "Gaijin House": {
        "sitemap": "https://www.gaijinhouse.com/sitemap.xml",
        "domain": "gaijinhouse.com",
        "note": "share house/guesthouse — concurrent direct",
        "content_publisher": False,
    },
    "Tokyo Share House": {
        "sitemap": "https://www.tokyosharehouse.com/sitemap.xml",
        "domain": "tokyosharehouse.com",
        "note": "portail share house JP — concurrent listings",
        "content_publisher": False,
    },
    # ── Relocation / RH ──────────────────────────────────────────────────────
    "Crown Relocations JP": {
        "sitemap": "https://www.crownrelo.com/sitemap.xml",
        "domain": "crownrelo.com",
        "note": "relocation B2B — surveiller services Tokyo",
        "content_publisher": True,
    },
    "Asian Tigers Japan": {
        "sitemap": "https://www.asiantigers-japan.com/sitemap.xml",
        "domain": "asiantigers-japan.com",
        "note": "demenageur + relocation — concurrent partiel",
        "content_publisher": True,
    },
    # ── Finance expat ─────────────────────────────────────────────────────────
    "Wise Blog JP": {
        "sitemap": "https://wise.com/sitemap.xml",
        "domain": "wise.com",
        "note": "fintech — blog Japan forte audience expat",
        "content_publisher": True,
    },
    # ── Concurrents directs chasseur immobilier Tokyo ────────────────────────
    "Modern Living Tokyo": {
        "sitemap": "https://www.modernlivingtokyo.com/sitemap.xml",
        "domain": "modernlivingtokyo.com",
        "note": "CONCURRENT DIRECT #1 — chasseur immobilier Tokyo EN — surveiller chaque article",
        "content_publisher": True,
    },
    "Tokyo Furnished": {
        "sitemap": "https://www.tokyofurnished.com/sitemap.xml",
        "domain": "tokyofurnished.com",
        "note": "CONCURRENT DIRECT #2 — appartements meubles + articles expat Tokyo",
        "content_publisher": True,
    },
    # ── Marche FR ─────────────────────────────────────────────────────────────
    "Vivre Au Japon": {
        "sitemap": "https://vivre-au-japon.com/sitemap.xml",
        "domain": "vivre-au-japon.com",
        "note": "blog FR expatrie JP — concurrent marche francophone",
        "content_publisher": True,
    },
    "Japon Online": {
        "sitemap": "https://www.japon-online.fr/sitemap.xml",
        "domain": "japon-online.fr",
        "note": "portail FR Japon — section logement/expatrie",
        "content_publisher": True,
    },
}

# Keywords qui indiquent un contenu intéressant à contre-attaquer
INTERESTING_KEYWORDS = [
    "tokyo", "appartement", "apartment", "share house", "meuble", "furnished",
    "garant", "guarantor", "louer", "rent", "expatrie", "expat", "foreigner",
    "etranger", "logement", "housing", "visa", "quartier", "neighborhood",
    "francais", "french", "move", "demenager", "checklist", "guide",
]

# Slugs/URLs de bruit: images produit, attachments, taxonomies, pages non-editoriales.
# Empeche de prendre "socks1-cropped" ou "/product/..." pour un article a contre-attaquer.
NOISE_TOKENS = [
    "cropped", "scaled", "-thumb", "thumbnail", "/wp-content/", "/product",
    "/attachment", ".jpg", ".png", ".jpeg", ".webp", ".gif", "slider",
    "/tag/", "/author/", "/page/", "/category/", "/feed", "/cart", "/checkout",
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


def is_noise(url: str) -> bool:
    """True si l'URL est une image produit, un attachment ou une page non-editoriale."""
    return any(tok in url.lower() for tok in NOISE_TOKENS)


def is_interesting(url: str) -> bool:
    """True seulement si le CHEMIN (hors domaine) couvre un sujet a contre-attaquer.
    On exclut le domaine sinon 'tokyo' dans 'savvytokyo.com' matche toutes leurs URLs."""
    if is_noise(url):
        return False
    path = re.sub(r"^https?://[^/]+", "", url.lower())
    return any(kw in path for kw in INTERESTING_KEYWORDS)


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
        is_content = info.get("content_publisher", True)
        print(f"Scanning {name} ({'editorial' if is_content else 'listings'})...")
        urls = fetch_sitemap(info["sitemap"])
        print(f"  {len(urls)} URLs found")

        current_set = set(urls)
        prev_key = f"urls_{name}"

        if prev_key in cache:
            old_set = set(cache[prev_key])
            new_urls = current_set - old_set
            if new_urls:
                print(f"  {len(new_urls)} new URLs!")
                if is_content:
                    # Editeur de contenu : alerte URL par URL + contre-attaque
                    # On ignore les URLs de bruit (images produit, attachments, taxonomies).
                    real_urls = [u for u in sorted(new_urls) if not is_noise(u)]
                    for url in real_urls:
                        topic = slug_to_topic(url)
                        alerts.append(f"📰 <b>{name}</b>: {topic}\n<code>{url}</code>")
                        if is_interesting(url):
                            counter_attack_suggestions.append(
                                f"⚔️ CONTRE-ATTAQUE: {name} a publié sur <b>{topic}</b> → créer un meilleur article ?"
                            )
                else:
                    # Site de listings (Oak House, Sakura, GaijinPot Housing) :
                    # résumé uniquement, pas de contre-attaque
                    alerts.append(
                        f"🏠 <b>{name}</b>: {len(new_urls)} nouvelles annonces ajoutées"
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
