"""
competitor_watch.py — Tokyo Expat Intelligence
Surveille les sitemaps de 8 concurrents, détecte nouveaux articles, alerte Telegram.
Run: python scripts/competitor_watch.py
"""

import requests
import xml.etree.ElementTree as ET
import gzip
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

# Plafond par source. 18/09/2026: en reparant deux URLs de sitemap on a fait entrer
# 1,47 million d'URLs Wise (codes IBAN generes) et le cache est passe de 1,3 a 90 Mo.
# Aucun concurrent du logement a Tokyo ne publie 50 000 pages: au-dela, c'est qu'on
# vise le sitemap GLOBAL d'un groupe et pas sa section japonaise. Le plafond ne corrige
# pas la config, il empeche juste une erreur de config de saturer le disque en silence.
MAX_URLS_PER_SOURCE = 50000

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
        # 18/09/2026: /sitemap.xml rendait 404 depuis toujours. Le sitemap racine
        # declare dans robots.txt existe mais couvre les 714 villes du groupe: pointer
        # dessus faisait entrer 16 418 URLs de Londres et Madrid. On vise Tokyo.
        "sitemap": "https://www.timeout.com/tokyo/sitemap.xml.gz",
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
        # 18/09/2026: /sitemap.xml rendait 404. robots.txt declare /sitemap, mais ce
        # sitemap racine couvre TOUT Wise (IBAN, codes SWIFT, convertisseurs generes):
        # 1 468 686 URLs, 90 Mo de cache, zero rapport avec le logement au Japon.
        # La source utile est le blog japonais, et lui seul.
        "sitemap": "https://wise.com/blog-assets/jp-sitemap.xml",
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

# ── SOURCES HORS SERVICE (audit du 18/09/2026) ────────────────────────────────
# 🚨 Pourquoi ce dictionnaire existe: le matin du 18/09 le radar a annonce
# "1 nouvel article detecte" alors que 17 de ses 24 sources rendaient ZERO URL.
# Le message etait donc vrai et trompeur en meme temps: il decrivait un septieme
# du marche en pretendant le decrire tout entier. Un radar doit dire ce qu'il n'a
# PAS pu voir, sinon son silence se lit comme "rien ne bouge".
# Une source listee ici n'est plus interrogee (ca ne sert a rien et ca coute 15 s
# de timeout chacune) mais elle est COMPTEE et affichee dans le bilan de couverture.
# ⚠️ Pour reactiver une source: retirer sa ligne d'ici, rien d'autre. Sa config
# dans COMPETITORS est restee intacte exprès.
UNREACHABLE = {
    # Domaine qui ne resout plus du tout (verifie par socket.gethostbyname le 18/09)
    "GaijinPot Housing":    "domaine mort (DNS) — le portail a disparu, verifier si GaijinPot a fusionne ses sections",
    "Fontaine Relocation":  "domaine mort (DNS)",
    "Modern Living Tokyo":  "domaine mort (DNS)",
    "Tokyo Furnished":      "domaine mort (DNS)",
    "Japon Online":         "domaine mort (DNS)",
    # Domaine resolu mais le site n'existe plus
    "Gaijin House":         "domaine EN VENTE sur HugeDomains — concurrent disparu",
    # Resolu, mais refuse la connexion (pare-feu / geo-blocage)
    "Asian Tigers Japan":   "connexion refusee (timeout 443) malgre DNS OK",
    # 403 meme avec un user-agent navigateur: protection anti-bot type Cloudflare
    "GaijinPot Blog":       "403 anti-bot",
    "Savvy Tokyo":          "403 anti-bot",
    "Japan Today":          "403 anti-bot",
    "Crown Relocations JP": "403 anti-bot",
    # Le site n'expose aucun sitemap: ni /sitemap.xml, ni robots.txt, ni les 7
    # chemins classiques testes, ni flux RSS. Rien a reparer cote URL.
    "Japan Guide":          "aucun sitemap publie",
    "Japan Property Central": "aucun sitemap publie",
    # Serveur "attrape-tout": /sitemap.xml, /robots.txt et n'importe quelle URL rendent
    # la page d'accueil en HTML avec un code 200. Rien a corriger cote URL.
    "Tokyo Share House":    "aucun sitemap publie (toute URL rend la page d'accueil en 200)",
}

# Keywords qui indiquent un contenu intéressant à contre-attaquer
INTERESTING_KEYWORDS = [
    "appartement", "apartment", "share house", "sharehouse", "meuble", "furnished",
    "garant", "guarantor", "louer", "rent", "lease", "logement", "housing",
    "quartier", "neighborhood", "relocation", "move to", "demenag", "mansion",
    "apato", "deposit", "reikin", "shikikin",
]

# Slugs/URLs de bruit: images produit, attachments, taxonomies, pages non-editoriales.
# Empeche de prendre "socks1-cropped" ou "/product/..." pour un article a contre-attaquer.
NOISE_TOKENS = [
    "cropped", "scaled", "-thumb", "thumbnail", "/wp-content/", "/product",
    "/attachment", ".jpg", ".png", ".jpeg", ".webp", ".gif", "slider",
    "/tag/", "/author/", "/page/", "/category/", "/feed", "/cart", "/checkout",
]

# ── FUNCTIONS ─────────────────────────────────────────────────────────────────

def fetch_sitemap(url: str, depth: int = 0) -> tuple[list[str], bool]:
    """Télécharge et parse un sitemap (gère les sitemap index et les .gz).

    Retourne (urls, ok). ⚠️ 18/09/2026: le second membre est le coeur de la correction.
    Avant, un echec rendait [] exactement comme un sitemap vide, et l'appelant ECRASAIT
    la baseline du cache avec cette liste vide. Deux consequences silencieuses:
      - la source suivante repartait de zero et rendait TOUTES ses URLs "nouvelles"
        au scan d'apres (fausse rafale d'alertes);
      - content_velocity_tracker.py, qui compte les URLs du cache dans le temps,
        lisait une chute a 0 comme un effondrement editorial du concurrent.
    Un echec doit donc etre distingue d'un vide, et ne rien ecrire du tout.
    """
    if depth > 2:
        return [], False
    try:
        r = requests.get(url, timeout=15, headers=HEADERS, verify=VERIFY_SSL)
        r.raise_for_status()
        raw = r.content
        # Sitemaps servis compresses (.gz): requests ne les decompresse pas quand le
        # gzip est le CONTENU et non l'encodage de transport (cas de timeout.com).
        if raw[:2] == b"\x1f\x8b":
            raw = gzip.decompress(raw)
        root = ET.fromstring(raw)
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}

        # Sitemap index
        sub_sitemaps = root.findall("sm:sitemap/sm:loc", ns)
        if sub_sitemaps:
            urls, any_ok = [], False
            for sm in sub_sitemaps[:10]:
                sub_urls, sub_ok = fetch_sitemap(sm.text.strip(), depth + 1)
                urls.extend(sub_urls)
                any_ok = any_ok or sub_ok
            return urls, any_ok

        # Regular sitemap
        locs = [loc.text.strip() for loc in root.findall("sm:url/sm:loc", ns) if loc.text]
        if locs:
            return locs, True

        # 🚨 18/09/2026 — le ZERO SILENCIEUX. city-cost.com sert un sitemap de 140 ko
        # parfaitement rempli, mais declare le namespace comme un ELEMENT enfant
        # (<xmlns>http://...</xmlns>) au lieu d'un attribut sur <urlset>. Resultat:
        # <urlset> n'a aucun namespace par defaut, la requete "sm:url/sm:loc" ne matche
        # rien, et la source rendait 0 URL en se declarant SAINE depuis toujours.
        # Un zero qui se presente comme un succes est pire qu'une panne: il ne s'affiche
        # dans aucun compteur de pannes. On retente donc sans namespace avant de conclure.
        locs = [loc.text.strip() for loc in root.findall("url/loc") if loc.text]
        if locs:
            print(f"  [namespace absent, relu sans: {len(locs)} URLs recuperees]")
            return locs, True
        sub = [s.text.strip() for s in root.findall("sitemap/loc") if s.text]
        if sub:
            urls, any_ok = [], False
            for s in sub[:10]:
                u, o = fetch_sitemap(s, depth + 1)
                urls.extend(u)
                any_ok = any_ok or o
            return urls, any_ok

        # Vraiment vide: c'est une anomalie, pas un succes.
        print(f"  [VIDE] sitemap lisible mais sans aucune URL")
        return [], False
    except Exception as e:
        print(f"  [WARN] {url}: {e}")
        return [], False


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
    """True si l'URL est une image/attachment ou une page non-editoriale."""
    u = url.lower()
    if any(tok in u for tok in NOISE_TOKENS):
        return True
    # (a) Pages-attachments d'images WordPress (slug = nom de fichier media, sans extension .jpg):
    slug = u.rstrip("/").split("/")[-1]
    if re.search(r"\d{7,}", slug):         # ids type facebook: 18121019_10158621...
        return True
    if re.search(r"(^|[-_])o$", slug):     # ..._o / ...-o (image "original")
        return True
    if re.search(r"\d+x\d+", slug):        # dimensions: 1024x768, 150x150
        return True
    if "logo" in slug or "banner" in slug or "header" in slug:
        return True
    return False


def is_interesting(url: str) -> bool:
    """True seulement si le CHEMIN (hors domaine) couvre un sujet a contre-attaquer.
    On exclut le domaine sinon 'tokyo' dans 'savvytokyo.com' matche toutes leurs URLs."""
    if is_noise(url):
        return False
    path = re.sub(r"^https?://[^/]+", "", url.lower())
    path = re.sub(r"[-_]", " ", path)  # 'share-house' -> 'share house' (matche les mots-cles multi-mots)
    return any(kw in path for kw in INTERESTING_KEYWORDS)


def slug_to_topic(url: str) -> str:
    """Extrait un topic lisible depuis une URL."""
    slug = url.rstrip("/").split("/")[-1]
    slug = re.sub(r"[-_]", " ", slug)
    slug = re.sub(r"\.(html|php|aspx)$", "", slug)
    return slug.strip() or url


QUIET = "--quiet" in sys.argv   # 18/09/2026: permet de re-tester sans sonner le telephone


def send_telegram(msg: str) -> None:
    if QUIET:
        print("  [Telegram SAUTE: --quiet]")
        return
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
    seen, failed = [], []          # couverture reelle du scan (cf UNREACHABLE)

    for name, info in COMPETITORS.items():
        if name in UNREACHABLE:
            print(f"Skip {name} — {UNREACHABLE[name]}")
            continue

        is_content = info.get("content_publisher", True)
        print(f"Scanning {name} ({'editorial' if is_content else 'listings'})...")
        urls, ok = fetch_sitemap(info["sitemap"])
        print(f"  {len(urls)} URLs found")

        if not ok:
            # ⚠️ NE RIEN ECRIRE. Ecraser la baseline avec une liste vide ferait passer
            # la source pour vidée, puis rendrait toutes ses URLs "nouvelles" au scan
            # suivant. On garde la baseline precedente et on signale la panne.
            print(f"  [ECHEC] source injoignable, baseline precedente conservee")
            failed.append(name)
            continue
        if len(urls) > MAX_URLS_PER_SOURCE:
            print(f"  [PLAFOND] {len(urls)} URLs > {MAX_URLS_PER_SOURCE}: sitemap trop large, "
                  f"viser la section japonaise du site. Source ignoree ce tour.")
            failed.append(f"{name} (sitemap trop large: {len(urls)} URLs)")
            continue
        seen.append(name)

        current_set = set(urls)
        prev_key = f"urls_{name}"

        # ⚠️ `cache[prev_key]` peut exister mais etre VIDE: c'est la cicatrice de l'ancien
        # bug, qui ecrasait la baseline a chaque echec. Diffier contre une liste vide
        # ferait passer tout le catalogue du concurrent pour du neuf. Une baseline vide
        # n'est pas une baseline: on la traite comme un premier scan.
        if cache.get(prev_key):
            old_set = set(cache[prev_key])
            new_urls = current_set - old_set
            if new_urls:
                print(f"  {len(new_urls)} new URLs!")
                if is_content:
                    # Editeur de contenu : n'alerter QUE sur les articles pertinents
                    # pour notre niche (logement/expat). is_interesting filtre le bruit
                    # (jobs, apprentissage du japonais, etc.) ET les images/attachments.
                    real_urls = [u for u in sorted(new_urls) if is_interesting(u)]
                    for url in real_urls:
                        topic = slug_to_topic(url)
                        alerts.append(f"📰 <b>{name}</b>: {topic}\n<code>{url}</code>")
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

    cache["coverage"] = {
        "date": datetime.date.today().isoformat(),
        "scanned": sorted(seen),
        "failed": sorted(failed),
        "unreachable": sorted(UNREACHABLE),
        "total_sources": len(COMPETITORS),
    }
    save_cache(cache)

    # Bilan de couverture: dire ce qu'on a pu regarder AVANT de dire ce qu'on a vu.
    cov = f"{len(seen)}/{len(COMPETITORS)} sources lues"
    print(f"\n{'='*60}")
    print(f"COUVERTURE: {cov} | {len(failed)} en panne | {len(UNREACHABLE)} hors service")
    if failed:
        print(f"  En panne ce matin: {', '.join(failed)}")

    # Envoyer alerte Telegram
    if alerts:
        msg_parts = [
            f"Competitor Watch - {datetime.date.today()}\n",
            f"<i>{len(alerts)} nouveaux articles détectés</i>",
            f"<i>Couverture: {cov}</i>\n",
        ]
        msg_parts.extend(alerts[:15])  # max 15 URLs par message
        if counter_attack_suggestions:
            msg_parts.append("\n" + "\n".join(counter_attack_suggestions[:5]))

        msg = "\n".join(msg_parts)
        send_telegram(msg)
        print(f"\n✅ Telegram alert sent ({len(alerts)} items)")
    else:
        print("\n✅ No new content detected — all quiet")

    # Une source qui tombe en panne APRES l'audit merite un mot: c'est peut-etre un
    # concurrent qui ferme (comme gaijinhouse.com), pas un incident reseau.
    if failed:
        send_telegram(
            f"⚠️ <b>Radar concurrents</b>: {len(failed)} source(s) injoignable(s)\n"
            f"{', '.join(failed)}\n\n"
            f"<i>Couverture: {cov}. Baselines conservees, aucune fausse alerte.</i>\n"
            f"Si ca persiste 3 jours, la passer dans UNREACHABLE ou corriger son URL."
        )

    # Rapport final
    total = sum(len(v) for k, v in cache.items()
                if k.startswith("urls_") and isinstance(v, list))
    print(f"\nTotal indexed: {total} competitor URLs in cache")


if __name__ == "__main__":
    main()
