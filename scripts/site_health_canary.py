# -*- coding: utf-8 -*-
"""
site_health_canary.py -- Detecteur de pannes silencieuses du site tokyo-expat.com.
Tourne chaque jour (run_daily_watch). N'ALERTE QUE SI QUELQUE CHOSE CASSE (event-driven).

Verifie:
  - pages cles repondent 200 (accueil EN/FR, /data, /services, /contact, 1 article, sitemap, robots)
  - le tag Google Analytics (G-NL25TL3LDG) est bien present dans le HTML servi
  - le header CSP est present ET whiteliste les domaines critiques (GA + Google Fonts)
Si un check echoue -> alerte Telegram (avec le detail). Si tout est vert -> silence (pas de spam).

Run:
  python scripts/site_health_canary.py            # execute + alerte si panne
  python scripts/site_health_canary.py --verbose  # affiche tous les checks (vert compris)
"""
import sys, io, json, datetime
import requests, urllib3
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

BASE = "https://www.tokyo-expat.com"
PAGES = [
    "/en", "/fr",
    "/en/data", "/en/services", "/en/contact",
    "/en/blog/furnished-apartment-tokyo-top-5-expats",
    "/og?title=canary&locale=en",  # image OG: detecte si le middleware la re-casse (redirect->404)
    "/sitemap.xml", "/robots.txt",
]
GA_ID = "G-NL25TL3LDG"
CSP_MUST_CONTAIN = ["googletagmanager.com", "fonts.googleapis.com"]
HEADER_URL = "/en"  # page sur laquelle on inspecte GA + CSP

TIMEOUT = 25

# Fraicheur des donnees: l'Indice/Prix se rafraichit ~trimestriellement. Au-dela, ALERTE
# (sinon le contenu "auto-frais" se fige en silence car les scrapers sont desactives).
LIB = Path(__file__).parent.parent / "lib"
STALE_DAYS = 100
DATA_FILES = [
    ("tokyoRentIndex.json", "Indice loyers",
     "relancer les scrapers loyers puis python refresh_rent_index.py (tokyo_insights)"),
    ("tokyoPriceTrends.json", "Prix historiques",
     "python refresh_price_trends.py (tokyo_insights) apres nouveaux CSV"),
]


# ============================================================
# PARCOURS DE PAIEMENT (ajoute 09/09/2026)
# Pourquoi: c'est le SEUL chemin par lequel de l'argent peut arriver, et rien ne le
# surveillait. Precedents: le formulaire /contact est reste casse en SILENCE pendant
# des mois avant juillet (tous les leads perdus), le tier gratuit de Calendly peut
# desactiver l'evenement sans prevenir, et Poppy - seule personne allee jusqu'au oui -
# s'est arretee exactement a cette etape. Une panne ici ne fait aucun bruit.
# ============================================================
DEVIS_PAGES = ["/devis/appartement-1p", "/devis/appartement-meuble-1p", "/devis/share-house-1p"]
DEVIS_MUST_CONTAIN = ["Paiement", "montant"]   # verifie sur la page live le 09/09
CALENDLY_URL = "https://calendly.com/contact-tokyo-expat/30min"
CONTACT_PAGES = ["/en/contact", "/fr/contact"]


def check_payment_path(failures, oks):
    """Le client peut-il encore reserver un appel, et payer ?"""
    # 1) Les pages de devis repondent ET affichent bien le bloc de paiement.
    for path in DEVIS_PAGES:
        try:
            r = requests.get(BASE + path, verify=False, timeout=TIMEOUT, allow_redirects=True,
                             headers={"User-Agent": "TokyoExpat-HealthCanary/1.0"})
            if r.status_code != 200:
                failures.append(f"❌ PAIEMENT: {path} -> HTTP {r.status_code} (page de devis morte)")
                continue
            manquants = [m for m in DEVIS_MUST_CONTAIN if m not in r.text]
            if manquants:
                failures.append(f"❌ PAIEMENT: {path} repond 200 mais le bloc de paiement a disparu "
                                f"(absent: {', '.join(manquants)})")
            else:
                oks.append(f"Devis OK {path}")
        except Exception as e:
            failures.append(f"❌ PAIEMENT: {path} -> {type(e).__name__}: {str(e)[:70]}")

    # 2) Le lien Calendly est-il TOUJOURS sur les pages contact ?
    for path in CONTACT_PAGES:
        try:
            r = requests.get(BASE + path, verify=False, timeout=TIMEOUT, allow_redirects=True,
                             headers={"User-Agent": "TokyoExpat-HealthCanary/1.0"})
            if "calendly.com" in r.text:
                oks.append(f"Lien Calendly present {path}")
            else:
                failures.append(f"❌ RESERVATION: plus aucun lien Calendly sur {path} "
                                f"(le client ne peut plus reserver d'appel)")
        except Exception as e:
            failures.append(f"❌ RESERVATION: {path} -> {type(e).__name__}: {str(e)[:70]}")

    # 3) La page Calendly elle-meme repond-elle ? (le tier gratuit peut couper l'evenement)
    try:
        r = requests.get(CALENDLY_URL, verify=False, timeout=TIMEOUT, allow_redirects=True,
                         headers={"User-Agent": "Mozilla/5.0"})
        if r.status_code == 200:
            oks.append("Page Calendly 200")
        else:
            failures.append(f"❌ RESERVATION: la page Calendly renvoie HTTP {r.status_code}. "
                            f"L'evenement a peut-etre ete desactive (tier gratuit) = fuite "
                            f"silencieuse de leads. Verifier {CALENDLY_URL}")
    except Exception as e:
        failures.append(f"❌ RESERVATION: Calendly injoignable -> {type(e).__name__}: {str(e)[:70]}")


def check_data_freshness(failures, oks):
    """Alerte si un jeu de donnees local depasse STALE_DAYS (data 'auto-fraiche' figee)."""
    today = datetime.date.today()
    for fname, label, how in DATA_FILES:
        p = LIB / fname
        try:
            gen = json.loads(p.read_text(encoding="utf-8")).get("generated", "")
            age = (today - datetime.date.fromisoformat(gen)).days
            if age > STALE_DAYS:
                failures.append(f"❌ Data '{label}' PERIMEE: {age}j (genere {gen}). Rafraichir: {how}")
            else:
                oks.append(f"Data {label} fraiche ({age}j)")
        except Exception as e:
            failures.append(f"❌ Data '{label}' illisible ({fname}): {str(e)[:60]}")


def send_telegram(msg: str):
    try:
        requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
            json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10, verify=False,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def main():
    verbose = "--verbose" in sys.argv
    failures = []
    oks = []

    # 1) Pages cles -> 200
    for path in PAGES:
        url = BASE + path
        try:
            r = requests.get(url, verify=False, timeout=TIMEOUT, allow_redirects=True,
                             headers={"User-Agent": "TokyoExpat-HealthCanary/1.0"})
            if r.status_code == 200:
                oks.append(f"200 {path}")
            else:
                failures.append(f"❌ {path} -> HTTP {r.status_code}")
        except Exception as e:
            failures.append(f"❌ {path} -> {type(e).__name__}: {str(e)[:80]}")

    # 2) Tag GA + header CSP sur la home
    try:
        r = requests.get(BASE + HEADER_URL, verify=False, timeout=TIMEOUT,
                         headers={"User-Agent": "TokyoExpat-HealthCanary/1.0"})
        html = r.text
        if GA_ID in html:
            oks.append("GA tag present")
        else:
            failures.append(f"❌ Tag GA ({GA_ID}) ABSENT du HTML {HEADER_URL} (tracking casse ?)")

        csp = ""
        for k, v in r.headers.items():
            if k.lower() == "content-security-policy":
                csp = v
                break
        if not csp:
            failures.append("❌ Header CSP ABSENT (securite ?)")
        else:
            oks.append("CSP present")
            for dom in CSP_MUST_CONTAIN:
                if dom in csp:
                    oks.append(f"CSP autorise {dom}")
                else:
                    failures.append(f"❌ CSP ne whiteliste plus {dom} (GA/Fonts risque d'etre bloque)")
    except Exception as e:
        failures.append(f"❌ Inspection home ({HEADER_URL}) -> {type(e).__name__}: {str(e)[:80]}")

    # 3) Parcours de paiement: devis + reservation Calendly (ajoute 09/09/2026)
    check_payment_path(failures, oks)

    # 4) Fraicheur des donnees locales (Indice loyers + Prix)
    check_data_freshness(failures, oks)

    # Rapport
    if verbose:
        print("=== CHECKS VERTS ===")
        for o in oks:
            print("  ✅", o)
    if failures:
        print("=== ECHECS ===")
        for f in failures:
            print(" ", f)
        body = "🚨 <b>SITE HEALTH CANARY</b> — tokyo-expat.com\n\n" + "\n".join(failures)
        body += f"\n\n({len(oks)} checks OK)"
        send_telegram(body)
        print(f"\n{len(failures)} panne(s) detectee(s) -> alerte Telegram envoyee.")
    else:
        print(f"Tout vert ({len(oks)} checks OK). Pas d'alerte (silence = sain).")


if __name__ == "__main__":
    main()
