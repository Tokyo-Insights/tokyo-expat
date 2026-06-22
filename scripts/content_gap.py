"""
content_gap.py — Content Gap Detector
Compare les sitemaps concurrents avec notre sitemap.
Identifie les topics qu'ils couvrent et que nous n'avons pas encore.
Alerte Telegram avec liste priorisee + angle de differentiation.

Run: python scripts/content_gap.py
"""
import json
import re
import sys
import io
import os
import datetime
import urllib3
import requests
from pathlib import Path
from collections import defaultdict

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
CACHE_FILE = DATA_DIR / "competitor_cache.json"
GAP_FILE = DATA_DIR / "content_gaps.json"

OUR_DOMAIN = "tokyo-expat.com"

# Notre sitemap (mise a jour automatique depuis le cache concurrent si disponible)
OUR_SITEMAP = "https://www.tokyo-expat.com/sitemap.xml"

# Topics cles pour notre niche
TOPIC_KEYWORDS = {
    "logement": ["apartment", "housing", "logement", "appartement", "share", "maison", "house", "room"],
    "tokyo": ["tokyo", "shibuya", "shinjuku", "minato", "meguro", "bunkyo", "setagaya", "nakameguro"],
    "visa": ["visa", "work permit", "permis", "resident", "zairyu"],
    "banque": ["bank", "banque", "compte", "account", "transfert"],
    "garant": ["guarantor", "garant", "hosho", "hoken"],
    "demenagement": ["moving", "demenager", "checklist", "relocation"],
    "cout": ["cost", "cout", "prix", "price", "budget", "cheap", "affordable"],
    "etudiant": ["student", "etudiant", "university", "universite", "school"],
    "famille": ["family", "famille", "kids", "enfants", "school", "ecole"],
    "francais": ["french", "francais", "francophone", "france"],
    "assurance": ["insurance", "assurance", "hoken"],
    "quartier": ["neighborhood", "quartier", "ward", "ku", "district"],
}

# Angle de differentiation par topic
DIFF_ANGLES = {
    "logement": "Ajouter des donnees prix reels + comparatif quartiers + notre reseau sans-garant",
    "visa": "Focus angle francophone specifique + scenarios concrets + erreurs a eviter",
    "banque": "Guide etape par etape avec screenshots + comparatif banques expat-friendly",
    "garant": "Expliquer les alternatives (pas uniquement Roomies/Cosigner) + notre solution directe",
    "demenagement": "Checklist interactive + timeline J-30/J-7/J+1 + contacts utiles en japonais",
    "cout": "Donnees reelles 2026 vs moyennes en ligne + calcul budget complet avec exemple",
    "etudiant": "Guide specifique universites FR au Japon + logements proches campus",
    "famille": "Focus ecole francaise + ecoles internationales + quartiers familiaux calmes",
    "francais": "Uniquement pour nous = avantage concurrentiel, developper cette niche a fond",
    "assurance": "Comparatif assurances expat vs assurance japonaise + couts reels",
    "quartier": "Donnees prix reel par quartier + temps trajet centre + pros/cons honnetes",
    "default": "Creer contenu plus specifique, avec donnees proprietaires et angle francophone unique",
}

def fetch_our_urls() -> set[str]:
    """Recupere nos propres URLs depuis notre sitemap."""
    try:
        import xml.etree.ElementTree as ET
        r = requests.get(OUR_SITEMAP, timeout=10, verify=VERIFY_SSL,
                        headers={"User-Agent": "Mozilla/5.0"})
        root = ET.fromstring(r.content)
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        return {loc.text.strip() for loc in root.findall("sm:url/sm:loc", ns) if loc.text}
    except Exception as e:
        print(f"  [WARN] Our sitemap: {e}")
        return set()

def url_to_slug(url: str) -> str:
    """Extrait le slug depuis une URL."""
    return url.rstrip("/").split("/")[-1].lower()

def slug_to_topic(slug: str) -> str:
    """Convertit un slug en topic lisible."""
    topic = re.sub(r"[-_]", " ", slug)
    topic = re.sub(r"\.(html|php|aspx)$", "", topic)
    return topic.strip()

def detect_topic_category(slug: str) -> str:
    """Detecte la categorie de topic d'un slug."""
    slug_lower = slug.lower()
    for category, keywords in TOPIC_KEYWORDS.items():
        if any(kw in slug_lower for kw in keywords):
            return category
    return "default"

# Topics hors-niche a ignorer (tourisme generique, autres villes, mauvaise pertinence)
OFFNICHE_KEYWORDS = [
    "spring", "summer", "winter", "autumn", "cherry-blossom", "cherry", "sakura",
    "christmas", "halloween", "festival", "fireworks", "hanami",
    "amsterdam", "dublin", "stockholm", "berlin", "paris", "london", "singapore",
    "seoul", "new-york", "sydney", "toronto",
    "parking", "recycle", "recycle-clothes", "hairdresser", "haircut",
    "luggage-storage", "luggage", "storage",
    "beginners-guide-to-tokyo",  # trop generique / tourisme
    "large-items", "motorbike",
]

# Slugs qui sont des filtres/amenites, pas des articles
AMENITY_SLUGS = {
    "privateroom", "privatekitchen", "sharedkitchen", "sharehouse", "parkingcycle",
    "deliverylocker", "workspace", "monthly", "worldwide", "gakuwari", "engineer",
    "entrepreneur", "designer", "couple", "theater", "family", "new-building",
    "motorbikes-parking", "en", "fr", "ja", "tokyo", "osaka", "kyoto", "fukuoka",
    "index", "home", "top", "main", "list", "search", "filter", "map",
}

def is_relevant_url(url: str) -> bool:
    """Filtre les URLs pertinentes pour notre niche (articles/guides uniquement)."""
    url_lower = url.lower()
    slug = url_to_slug(url)

    # Exclure pages non-contenu
    exclude = ["/tag/", "/category/", "/author/", "/page/", "?", "#",
               "/wp-", "/feed", "/sitemap", "/robots", "/cdn-", "/static/",
               "/login", "/signup", "/account", "/cart", "/checkout"]
    if any(ex in url_lower for ex in exclude):
        return False

    # Exclure slugs amenite/filtre connus
    if slug in AMENITY_SLUGS:
        return False

    # Un vrai article a au moins 2 mots (un tiret minimum) et 10+ chars
    if "-" not in slug or len(slug) < 12:
        return False

    # Inclure uniquement les URLs dans sections contenu
    include = ["/blog/", "/guides/", "/guide/", "/article/", "/news/",
               "/living/", "/housing/", "/apartment/", "/visa/", "/moving/",
               "/expat/", "/logement/", "/appartement/", "/life/", "/tips/"]
    if not any(inc in url_lower for inc in include):
        return False

    # Exclure topics hors niche (tourisme, autres villes, sujets irrelevants)
    if any(kw in slug_lower for kw in OFFNICHE_KEYWORDS):
        return False

    # Le slug doit contenir au moins un mot de notre niche
    niche_words = ["japan", "tokyo", "apartment", "housing", "expat", "living",
                   "visa", "moving", "rent", "share", "cost", "guide",
                   "foreigner", "work", "student", "bank", "insurance"]
    return any(w in slug for w in niche_words)

def score_gap(slug: str, competitor: str) -> int:
    """Score de priorite du gap (100 = ultra prioritaire)."""
    score = 0
    slug_lower = slug.lower()

    # Notre niche principale
    for kw in ["apartment", "housing", "logement", "share house", "expat", "tokyo"]:
        if kw in slug_lower:
            score += 15

    # Francophone = gap enorme (concurrents mostly anglophone)
    if any(k in slug_lower for k in ["french", "francais", "francophone"]):
        score += 30

    # Topics haute intention
    for kw in ["find", "trouver", "how to", "guide", "checklist", "cost", "prix"]:
        if kw in slug_lower:
            score += 10

    # Bonus si plusieurs concurrents couvrent le topic
    # (sera augmente lors de l'aggregation)
    score += 10

    # Penalite si topic trop generique
    if len(slug.replace("-", "")) < 8:
        score -= 20

    return max(0, min(score, 100))


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
    print(f"CONTENT GAP DETECTOR - {datetime.date.today()}")
    print(f"{'='*60}\n")

    if not CACHE_FILE.exists():
        print("Run competitor_watch.py first to build the cache.")
        return

    with open(CACHE_FILE, encoding='utf-8') as f:
        cache = json.load(f)

    our_urls = fetch_our_urls()
    our_slugs = {url_to_slug(u) for u in our_urls if url_to_slug(u)}
    print(f"Our content: {len(our_urls)} URLs, {len(our_slugs)} unique slugs\n")

    # Aggreger tous les URLs concurrents pertinents
    gap_topics: dict[str, dict] = {}  # slug -> {score, competitors, url, category}

    for key, urls in cache.items():
        if not key.startswith("urls_"):
            continue
        competitor = key.replace("urls_", "")
        if competitor == OUR_DOMAIN:
            continue

        relevant = [u for u in urls if is_relevant_url(u)]
        print(f"{competitor}: {len(relevant)} content URLs (from {len(urls)} total)")

        for url in relevant:
            slug = url_to_slug(url)
            if not slug or len(slug) < 5:
                continue
            if slug in our_slugs:
                continue  # Nous avons deja ce slug exact

            # Verifier si un slug similaire existe chez nous
            already_covered = any(
                slug[:8] in our_slug or our_slug[:8] in slug
                for our_slug in our_slugs
                if len(our_slug) >= 8 and len(slug) >= 8
            )
            if already_covered:
                continue

            if slug not in gap_topics:
                gap_topics[slug] = {
                    "slug": slug,
                    "topic": slug_to_topic(slug),
                    "url": url,
                    "competitors": [],
                    "score": 0,
                    "category": detect_topic_category(slug),
                }

            gap_topics[slug]["competitors"].append(competitor)
            gap_topics[slug]["score"] = max(
                gap_topics[slug]["score"],
                score_gap(slug, competitor)
            )
            # Bonus si plusieurs concurrents couvrent le meme topic
            if len(gap_topics[slug]["competitors"]) > 1:
                gap_topics[slug]["score"] = min(100, gap_topics[slug]["score"] + 15)

    # Trier par score
    gaps = sorted(gap_topics.values(), key=lambda x: x["score"], reverse=True)
    print(f"\nTotal gaps identifies: {len(gaps)}")

    # Sauvegarder
    DATA_DIR.mkdir(exist_ok=True)
    with open(GAP_FILE, "w", encoding="utf-8") as f:
        json.dump(gaps[:100], f, indent=2, ensure_ascii=False)
    print(f"Top 100 saved to {GAP_FILE}")

    # Afficher top 20
    print(f"\n{'='*60}")
    print("TOP 20 CONTENT GAPS (topics a couvrir en priorite):")
    print(f"{'='*60}")
    for i, g in enumerate(gaps[:20], 1):
        comps = ", ".join(set(g["competitors"]))
        print(f"\n{i:2d}. [{g['score']:3d}] {g['topic']}")
        print(f"     Via: {comps}")
        print(f"     Angle: {DIFF_ANGLES.get(g['category'], DIFF_ANGLES['default'])[:80]}")

    # Telegram alert
    top5 = gaps[:5]
    lines = [
        f"Content Gap - {datetime.date.today()}",
        f"{len(gaps)} topics concurrents non couverts par nous\n",
        "TOP 5 PRIORITES:",
    ]
    for i, g in enumerate(top5, 1):
        comps = " + ".join(set(g["competitors"]))
        angle = DIFF_ANGLES.get(g["category"], DIFF_ANGLES["default"])
        lines.append(
            f"\n{i}. <b>{g['topic'][:50]}</b> (score:{g['score']})"
            f"\nVia: {comps}"
            f"\nAngle: {angle[:80]}"
        )
    lines.append(f"\nFichier complet: scripts/data/content_gaps.json")
    send_telegram("\n".join(lines))
    print("\nTelegram alert sent.")


if __name__ == "__main__":
    main()
