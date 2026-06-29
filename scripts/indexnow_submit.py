"""
indexnow_submit.py -- Soumet les URLs a IndexNow (Bing) pour indexation instantanee.
ChatGPT utilise l'index Bing -> indexation rapide = visibilite IA + SEO plus vite.

Prerequis: le fichier cle public/<key>.txt doit etre EN LIGNE (deploye) avant de soumettre.
Cle dans scripts/.indexnow_key.

Usage:
  python scripts/indexnow_submit.py            -> soumet toutes les URLs du sitemap
  python scripts/indexnow_submit.py URL1 URL2  -> soumet des URLs precises
"""
import sys, io, re, requests, urllib3
from pathlib import Path
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

HOST = "www.tokyo-expat.com"
SITEMAP = f"https://{HOST}/sitemap.xml"
KEY = (Path(__file__).parent / ".indexnow_key").read_text(encoding="utf-8").strip()
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
ENDPOINT = "https://api.indexnow.org/indexnow"


def get_sitemap_urls():
    r = requests.get(SITEMAP, verify=False, timeout=30)
    return re.findall(r"<loc>(.*?)</loc>", r.text)


def main():
    urls = sys.argv[1:] if len(sys.argv) > 1 else get_sitemap_urls()
    if not urls:
        print("Aucune URL a soumettre."); return
    print(f"Cle: {KEY[:8]}... | {len(urls)} URLs a soumettre a IndexNow")

    # Verifier que la cle est en ligne
    kr = requests.get(KEY_LOCATION, verify=False, timeout=20)
    if kr.status_code != 200 or KEY not in kr.text:
        print(f"⚠️ Fichier cle pas accessible ({KEY_LOCATION}, HTTP {kr.status_code}). Deployer d'abord.")
        return

    payload = {"host": HOST, "key": KEY, "keyLocation": KEY_LOCATION, "urlList": urls[:10000]}
    r = requests.post(ENDPOINT, json=payload, verify=False, timeout=30)
    print(f"IndexNow reponse: HTTP {r.status_code}")
    if r.status_code in (200, 202):
        print(f"✅ {len(urls)} URLs soumises avec succes.")
    else:
        print(f"Reponse: {r.text[:300]}")


if __name__ == "__main__":
    main()
