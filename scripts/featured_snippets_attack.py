"""
featured_snippets_attack.py -- Detecte les positions 1 des concurrents sur nos keywords cibles
Pour chaque keyword ou un concurrent domine, genere un plan d'action concret
(format answer box, table, liste numerotee) pour contester la position.

Run: python scripts/featured_snippets_attack.py
Schedule: lundi dans run_weekly_intelligence.bat (step 29/30)
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
STATE_FILE = DATA_DIR / "featured_snippets_state.json"

COMPETITOR_DOMAINS = [
    "sakura-house.com",
    "oakhouse.jp",
    "gaijinpot.com",
    "gplusmedia.com",
    "savvytokyo.com",
    "tokyocheapo.com",
    "japantoday.com",
    "timeout.com",
    "realestatejapan.com",
    "expatica.com",
    "remoters.net",
    "tofugu.com",
    "japanguide.com",
    "tokyoexpats.com",
    "borderless-house.com",
]

# (keyword, format_ideal, action_concrete)
TARGET_KEYWORDS = [
    ("find apartment tokyo foreigner", "answer_box",
     "Intro article: reponse directe 50 mots. 'Finding an apartment in Tokyo as a foreigner is possible in 3 steps...'"),
    ("share house tokyo expat 2026", "list",
     "Ajouter tableau comparatif top 5 share houses: nom / prix / quartiers / garant requis oui/non"),
    ("tokyo apartment no guarantor", "answer_box",
     "H2 exact 'Can foreigners rent in Tokyo without a guarantor?' + reponse directe 60 mots"),
    ("how much does it cost to rent in tokyo", "table",
     "Tableau: type logement / loyer moyen / depot / garant. Inclure share house, 1K, 1LDK, meuble"),
    ("moving to tokyo housing guide", "list",
     "Checklist 8 etapes format numerote avec H2 'Step 1: ...' pour chaque etape"),
    ("furnished apartment tokyo monthly", "answer_box",
     "H2 'What is a monthly mansion in Tokyo?' + reponse 60 mots + tableau prix"),
    ("share house tokyo price", "table",
     "Tableau: operateur / prix moyen / quartiers / duree min / garant"),
    ("best neighborhoods tokyo expats", "table",
     "Tableau: quartier / loyer moyen 1K / acces metro / profil expat ideal"),
    ("japan guarantor foreigner rental", "answer_box",
     "Reponse directe: 'Foreigners have 3 options without a Japanese guarantor...' + liste"),
    ("student housing tokyo university", "list",
     "Liste: 1. Dortoirs universitaires 2. Share houses 3. Gaijin houses -- avec prix chacun"),
    ("cost of living tokyo expat 2026", "table",
     "Tableau depenses mensuelles: logement / nourriture / transport / assurance / total"),
    ("tokyo apartment foreigner documents", "list",
     "Liste documents avec pastilles: requis toujours / requis parfois / utile"),
    ("gaijin house tokyo guide", "answer_box",
     "H2 'What is a gaijin house?' + definition 50 mots + differences vs share house"),
    ("trouver appartement tokyo etranger", "answer_box",
     "Version FR: intro directe 'Trouver un appartement a Tokyo en tant qu'etranger est possible en...'"),
    ("chasseur immobilier tokyo", "answer_box",
     "H2 'Qu'est-ce qu'un chasseur immobilier a Tokyo?' + definition + role + prix"),
    ("tokyo expat housing options", "list",
     "Section intro: 4 options clairement separees avec H3 pour chacune"),
    ("moving to japan checklist 2026", "list",
     "Checklist numerotee 10 etapes avec case a cocher symbolique -- format tres snippet-friendly"),
    ("short term apartment tokyo", "table",
     "Tableau: type / duree min / prix / garant / plateformes. Couvrir 1 semaine a 6 mois"),
]

FORMAT_GUIDE = {
    "answer_box": (
        "Ajouter en intro de l'article une reponse directe de 40-60 mots apres un H2 "
        "qui repete le keyword exact. Google extrait les premiers paragraphes apres un header."
    ),
    "list": (
        "Reformater la section cle comme liste numerotee ou a puces sous un H2 qui commence "
        "par 'How to', 'Best' ou un nombre. Google prefere les listes de 5-8 items."
    ),
    "table": (
        "Ajouter un tableau HTML avec headers clairs. "
        "Google extrait les tableaux pour les requetes comparatives et de prix."
    ),
}


def find_competitor(url: str) -> str:
    for domain in COMPETITOR_DOMAINS:
        if domain in url:
            return domain
    return ""


def load_state() -> dict:
    DATA_DIR.mkdir(exist_ok=True)
    if STATE_FILE.exists():
        try:
            with open(STATE_FILE, encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {"last_run": "", "opportunities": []}


def save_state(state: dict):
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2, ensure_ascii=False)


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
    print(f"FEATURED SNIPPETS ATTACK -- {today}")
    print(f"{'='*60}\n")

    opportunities = []

    with DDGS() as ddgs:
        for keyword, fmt, action in TARGET_KEYWORDS:
            print(f"  Checking: {keyword[:55]}...")
            try:
                results = list(ddgs.text(keyword, max_results=3))
                for rank, r in enumerate(results, 1):
                    url = r.get("href", "")
                    title = r.get("title", "")
                    competitor = find_competitor(url)
                    if competitor:
                        opportunities.append({
                            "keyword": keyword,
                            "competitor": competitor,
                            "competitor_url": url,
                            "competitor_title": title[:100],
                            "rank": rank,
                            "format": fmt,
                            "action": action,
                            "format_guide": FORMAT_GUIDE[fmt],
                        })
                        print(f"    COMPETITOR pos {rank}: {competitor}")
                        break
                time.sleep(4)
            except Exception as e:
                print(f"    [WARN] {keyword[:40]}: {e}")
                time.sleep(10)

    state = load_state()
    state["last_run"] = today.isoformat()
    state["opportunities"] = opportunities
    save_state(state)

    print(f"\n{len(opportunities)} opportunites d'attaque trouvees\n")

    if not opportunities:
        send_telegram(
            f"<b>SNIPPETS ATTACK</b> -- {today}\n"
            "Aucune position 1 concurrente detectee sur nos keywords cibles. Bonne nouvelle."
        )
        return

    lines = [
        f"<b>FEATURED SNIPPETS ATTACK</b> -- {today}",
        f"{len(opportunities)}/{len(TARGET_KEYWORDS)} keywords domines par un concurrent\n",
    ]

    for i, opp in enumerate(opportunities[:5], 1):
        lines.append(
            f"<b>{i}. '{opp['keyword']}'</b>\n"
            f"   Concurrent pos {opp['rank']}: <b>{opp['competitor']}</b>\n"
            f"   Format cible: {opp['format'].upper()}\n"
            f"   Action: {opp['action'][:130]}\n"
        )

    if len(opportunities) > 5:
        lines.append(f"+ {len(opportunities) - 5} autres dans scripts/data/featured_snippets_state.json")

    send_telegram("\n".join(lines))
    print("Telegram envoye.")


if __name__ == "__main__":
    main()
