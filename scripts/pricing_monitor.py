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

# Pages de pricing/services a surveiller.
# ⚠️ 09/09/2026 — 4 cibles retirees apres verification, elles ne repondaient plus:
#   gaijinhouse.com (timeout), fontaine.co.jp (le DNS ne resout plus),
#   asiantigers-japan.com (timeout), tokyocheapo.com/living/housing/ (404, remplacee
#   par la page loyers qui, elle, repond 200).
#   sakura-house.com/en/ rend un 520 intermittent: gardee, le compteur de couverture
#   la signalera si ca dure.
# Avant d'ajouter une cible ici: verifier qu'elle repond 200.
PRICING_PAGES = {
    # Concurrents directs logement
    "Remoters Tokyo":           "https://www.remoters.io/destination/tokyo",
    "Remoters Homepage":        "https://www.remoters.io",
    "Sakura House Pricing EN":  "https://www.sakura-house.com/en/about/",
    "Sakura House Homepage":    "https://www.sakura-house.com/en/",
    "Oak House Rent Guide":     "https://www.oakhouse.jp/column/column_basic/rent-prices",
    "Oak House About":          "https://www.oakhouse.jp/about",
    # Relocation services
    "Crown Relo Tokyo":         "https://www.crownrelo.com/japan/en-jp/services",
    # Content competitors (surveiller leurs offres premium/ads)
    "Tokyo Cheapo Rent":        "https://tokyocheapo.com/lifestyle/rent-an-apartment-in-tokyo/",
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

        # CORRIGE 09/09/2026 — l'ancienne expression produisait du charabia.
        #   [\d,]+\s*[¥円JPY]  -> la classe ne matche qu'UN caractere parmi ¥ 円 J P Y,
        #                         donc "40,000 JPY" ressortait en "40,000 J" et
        #                         "2 Pers" en "2 P".
        #   [¥$€£]\s*[\d,]+    -> "[\d,]+" accepte une virgule seule, d'ou "€,".
        #   [\d.]+\s*%         -> ramassait n'importe quel pourcentage de la page.
        # Sortie reelle du 09/09: ['2 P', '€,', '100 %'] annonces comme "prix actuels".
        # On exige desormais un vrai montant (>= 3 chiffres) ET une vraie devise.
        # Separateur virgule OU point: "40.000 JPY" donnait "000JPY" sans le point,
        # parce que \d{3,} ne pouvait pas attraper le "40" isole. Constate au 1er run.
        montant = r'\d{1,3}(?:[.,]\d{3})+|\d{3,}'
        price_pattern = re.findall(
            r'(?:[¥$€£]\s?(?:' + montant + r')'
            r'|(?:' + montant + r')\s?(?:JPY|USD|EUR|GBP|yen|円))',
            text, flags=re.IGNORECASE)
        # Normalisation: les espaces et la casse ne sont pas des changements de prix.
        price_pattern = sorted({re.sub(r'\s+', '', p).upper() for p in price_pattern})

        # Le hash portait sur text[:3000] = l'en-tete de la page (nav, banniere,
        # bandeau cookies), pas la grille tarifaire. N'importe quel element tournant
        # declenchait "CHANGEMENT DETECTE". On signe desormais les PRIX eux-memes.
        return "|".join(price_pattern), price_pattern
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
    injoignables = []          # 09/09/2026: 6 des 14 pages etaient mortes en silence

    for name, url in PRICING_PAGES.items():
        print(f"Checking {name}...")
        content, prices = fetch_page_content(url)

        if content is None:
            print(f"  [SKIP] Could not fetch")
            injoignables.append((name, url))
            continue

        h = content_hash(content)
        prev_hash = cache.get(f"hash_{name}")
        prev_prices = cache.get(f"prices_{name}", [])

        new_prices = sorted(set(prices) - set(prev_prices))
        removed_prices = sorted(set(prev_prices) - set(prices))

        # On n'alerte QUE si des montants ont bouge, et seulement si la page en a
        # vraiment (une page sans prix qui reste sans prix n'est pas une nouvelle).
        if prev_hash and prev_hash != h and (new_prices or removed_prices):
            alert_parts = [f"Prix change detecte: <b>{name}</b>"]
            if new_prices:
                alert_parts.append(f"Nouveaux montants: {', '.join(new_prices[:5])}")
            if removed_prices:
                alert_parts.append(f"Montants disparus: {', '.join(removed_prices[:5])}")
            alert_parts.append(f"URL: {url}")

            alert = "\n".join(alert_parts)
            alerts.append(alert)
            print(f"  CHANGEMENT DE PRIX: +{new_prices[:4]} / -{removed_prices[:4]}")
        elif prev_hash and prev_hash != h:
            print(f"  (la page a bouge mais aucun montant n'a change - pas d'alerte)")
        elif not prev_hash:
            print(f"  (premier scan - baseline enregistree)")
            if prices:
                print(f"  Prix detectes: {prices[:5]}")
        else:
            print(f"  Aucun changement")

        cache[f"hash_{name}"] = h
        cache[f"prices_{name}"] = prices
        cache[f"last_check_{name}"] = datetime.datetime.now().isoformat()

    cache["_injoignables"] = [n for n, _u in injoignables]
    cache["_couverture"] = f"{len(PRICING_PAGES) - len(injoignables)}/{len(PRICING_PAGES)}"
    save_cache(cache)

    # Un radar qui ne peut pas lire la moitie de ses cibles doit le DIRE.
    # Sinon "aucun changement detecte" se lit comme "rien n'a bouge", alors que
    # la vraie phrase est "je n'ai pas regarde".
    lus = len(PRICING_PAGES) - len(injoignables)
    print(f"\nCouverture : {lus}/{len(PRICING_PAGES)} pages lues.")
    if injoignables:
        print("Pages INJOIGNABLES (a corriger ou a retirer de la liste) :")
        for n, u in injoignables:
            print(f"  - {n} : {u}")

    if alerts:
        msg = f"Pricing Monitor - {datetime.date.today()}\n\n" + "\n\n".join(alerts)
        if injoignables:
            msg += (f"\n\n⚠️ Couverture {lus}/{len(PRICING_PAGES)} — injoignables : "
                    + ", ".join(n for n, _u in injoignables))
        send_telegram(msg)
        print(f"\n{len(alerts)} alertes envoyees")
    elif len(injoignables) > len(PRICING_PAGES) // 3:
        # Plus d'un tiers de cibles muettes: c'est ca, la nouvelle du jour.
        send_telegram(f"Pricing Monitor - {datetime.date.today()}\n"
                      f"Aucun changement de prix, MAIS couverture degradee : "
                      f"{lus}/{len(PRICING_PAGES)} pages lues.\n"
                      "Injoignables : " + ", ".join(n for n, _u in injoignables))
        print("\nAucun changement, mais alerte de couverture envoyee")
    else:
        print("\nAucun changement de prix detecte")


if __name__ == "__main__":
    main()
