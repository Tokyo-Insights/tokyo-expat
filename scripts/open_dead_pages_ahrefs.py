"""
open_dead_pages_ahrefs.py -- Ouvre les pages mortes dans Ahrefs Backlink Checker
Lit broken_links_cache.json, ouvre chaque URL 404 dans le browser via Ahrefs.
Instruction : pour chaque URL, note les domaines qui la linkent, envoie le pitch.

Run: python scripts/open_dead_pages_ahrefs.py
     python scripts/open_dead_pages_ahrefs.py --list     # affiche sans ouvrir
     python scripts/open_dead_pages_ahrefs.py --filter sakura-house  # filtre par domaine
"""

import json
import sys
import io
import time
import webbrowser
from pathlib import Path
from urllib.parse import quote

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
BROKEN_CACHE = DATA_DIR / "broken_links_cache.json"

# Mapping : partie du domaine -> notre page de remplacement
OUR_REPLACEMENTS = {
    "sakura-house": "https://www.tokyo-expat.com/en/blog/share-house-tokyo-guide-2026",
    "oakhouse":     "https://www.tokyo-expat.com/en/blog/share-house-tokyo-guide-2026",
    "gaijinpot":    "https://www.tokyo-expat.com/en/blog/find-apartment-tokyo-foreigner",
    "remoters":     "https://www.tokyo-expat.com/en/blog/find-apartment-tokyo-foreigner",
    "tokyocheapo":  "https://www.tokyo-expat.com/en/blog/tokyo-expat-cost-of-living-2026",
}


def ahrefs_url(dead_url: str) -> str:
    return f"https://ahrefs.com/backlink-checker/?input={quote(dead_url)}&mode=exact"


def guess_replacement(dead_url: str) -> str:
    url_lower = dead_url.lower()
    for key, replacement in OUR_REPLACEMENTS.items():
        if key in url_lower:
            return replacement
    return "https://www.tokyo-expat.com/en/blog/find-apartment-tokyo-foreigner"


def main():
    args = sys.argv[1:]
    list_only = "--list" in args
    filter_domain = None
    if "--filter" in args:
        idx = args.index("--filter")
        if idx + 1 < len(args):
            filter_domain = args[idx + 1].lower()

    if not BROKEN_CACHE.exists():
        print("broken_links_cache.json introuvable. Lance broken_link_finder.py d'abord.")
        sys.exit(1)

    with open(BROKEN_CACHE, encoding="utf-8") as f:
        cache = json.load(f)

    reported: list[str] = cache.get("reported", [])
    checked: dict = cache.get("checked", {})

    # Filtrer uniquement les vraies 404
    dead_pages = [url for url in reported if checked.get(url) == 404]

    if filter_domain:
        dead_pages = [u for u in dead_pages if filter_domain in u.lower()]

    if not dead_pages:
        print("Aucune page morte trouvee dans le cache.")
        return

    print(f"\n{'='*60}")
    print(f"PAGES MORTES A VERIFIER SUR AHREFS ({len(dead_pages)} URLs)")
    print(f"{'='*60}\n")
    print("Pour chaque URL :")
    print("1. Ouvre le lien Ahrefs gratuit")
    print("2. Regarde combien de domaines la linkent")
    print("3. Contacte chacun avec ton pitch de remplacement\n")

    PITCH_TEMPLATE = (
        "Subject: Broken link on your site — replacement available\n\n"
        "Hi,\n\n"
        "I noticed your site links to a URL that now returns a 404 error:\n"
        "{dead_url}\n\n"
        "We've published an up-to-date guide covering the same topic:\n"
        "{our_url}\n\n"
        "Would you consider updating the link? Happy to write a short intro paragraph "
        "tailored to your audience.\n\n"
        "Best regards,\nAlessandro\nTokyo Expat — www.tokyo-expat.com"
    )

    for i, url in enumerate(dead_pages, 1):
        our_url = guess_replacement(url)
        ahrefs = ahrefs_url(url)
        print(f"{i:2d}. {url}")
        print(f"    Ahrefs: {ahrefs}")
        print(f"    Notre remplacement: {our_url}")
        print()

        if not list_only:
            input(f"    [Entree pour ouvrir dans le browser, Ctrl+C pour arreter] ")
            webbrowser.open(ahrefs)
            time.sleep(2)

            print(f"\n    PITCH EMAIL :\n")
            print(PITCH_TEMPLATE.format(dead_url=url, our_url=our_url))
            print("\n" + "-"*40 + "\n")
            input("    [Entree pour la suivante] ")

    if list_only:
        print(f"\nTotal: {len(dead_pages)} pages a verifier sur Ahrefs.")
        print("Lance sans --list pour ouvrir interactivement dans le browser.")


if __name__ == "__main__":
    main()
