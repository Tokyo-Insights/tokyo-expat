# -*- coding: utf-8 -*-
"""
GSC Canonical / Indexing Diagnostic (reutilisable)
==================================================
Pour chaque URL, interroge l'API Search Console "URL Inspection" et rapporte:
  - coverageState (ex: "Duplicate without user-selected canonical", "Submitted and indexed")
  - la canonique choisie par GOOGLE vs la canonique declaree par TOI (userCanonical)
  - statut d'indexation + derniere exploration
  - un DIAGNOSTIC auto (benin / a corriger) par URL

Usage:
  python gsc_canonical_diagnose.py                 # utilise la liste SUSPECTS par defaut
  python gsc_canonical_diagnose.py <url1> <url2>   # URLs precises
  python gsc_canonical_diagnose.py --file urls.txt # 1 URL par ligne

Pre-requis: le compte de service (ga4-credentials.json) doit etre PROPRIETAIRE
verifie de la propriete dans Search Console (pas juste "utilisateur restreint"),
sinon l'API renvoie 403 (l'inspection exige owner). Meme cle que gsc_analytics.py.
"""
import sys
import json
import time
import datetime
from pathlib import Path

import requests
from google.oauth2 import service_account
from google.auth.transport import requests as google_requests

try:
    import urllib3
    urllib3.disable_warnings()
except Exception:
    pass

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)
CREDS_FILE = SCRIPT_DIR / "ga4-credentials.json"
OUTPUT_FILE = DATA_DIR / "gsc_canonical_latest.json"

# SSL interception dans cet environnement -> verify=False (comme gsc_analytics.py)
VERIFY_SSL = False

SITE_CANDIDATES = [
    "sc-domain:tokyo-expat.com",
    "https://www.tokyo-expat.com/",
]
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
INSPECT_URL = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect"

# Liste par defaut = les 10 URLs signalees le 20/08/2026 (a adapter au besoin)
DEFAULT_SUSPECTS = [
    "https://www.tokyo-expat.com/en/contact?type=appartement",
    "https://www.tokyo-expat.com/fr",
    "https://www.tokyo-expat.com/fr/contact?type=appartement",
    "https://www.tokyo-expat.com/fr/blog/appartement-tokyo-septembre-guide",
    "https://www.tokyo-expat.com/fr/blog/frais-caches-location-tokyo",
    "https://www.tokyo-expat.com/fr/blog/quartiers-tokyo-expatries-guide",
    "https://www.tokyo-expat.com/fr/blog/pieges-location-tokyo-etranger",
    "https://www.tokyo-expat.com/fr/blog/service-chasseur-immobilier-tokyo-comment-ca-marche",
    "https://www.tokyo-expat.com/fr/blog/assurance-maladie-japon-expatrie",
    "https://www.tokyo-expat.com/fr/blog/impots-revenus-japon-expatrie-2026",
]


def get_token() -> str:
    creds = service_account.Credentials.from_service_account_file(str(CREDS_FILE), scopes=SCOPES)
    session = requests.Session()
    session.verify = VERIFY_SSL
    creds.refresh(google_requests.Request(session=session))
    return creds.token


def resolve_site(token: str) -> str:
    """Trouve la propriete accessible (domain property ou URL prefix)."""
    for cand in SITE_CANDIDATES:
        url = ("https://searchconsole.googleapis.com/webmasters/v3/sites/"
               + requests.utils.quote(cand, safe=""))
        r = requests.get(url, headers={"Authorization": f"Bearer {token}"},
                         verify=VERIFY_SSL, timeout=30)
        if r.status_code == 200:
            return cand
        print(f"  propriete '{cand}' -> {r.status_code} {r.text[:100]}")
    return SITE_CANDIDATES[0]  # fallback (l'inspect precisera l'erreur)


def inspect(token: str, site_url: str, page_url: str, lang="fr") -> dict:
    body = {"inspectionUrl": page_url, "siteUrl": site_url, "languageCode": lang}
    r = requests.post(INSPECT_URL, headers={"Authorization": f"Bearer {token}"},
                      json=body, verify=VERIFY_SSL, timeout=60)
    if r.status_code != 200:
        return {"_error": f"{r.status_code}: {r.text[:200]}"}
    return r.json().get("inspectionResult", {})


def diagnose(page_url: str, idx: dict) -> str:
    """Petit verdict lisible a partir du coverageState + canonicals."""
    cov = (idx.get("coverageState") or "").lower()
    gc = idx.get("googleCanonical", "")
    uc = idx.get("userCanonical", "")
    if "?" in page_url:
        return "BENIN (URL a parametre -> Google consolide sur la version propre; normal)"
    if "duplicate" in cov and "user-selected" in cov:
        if gc and uc and gc != uc:
            return "A VERIFIER (Google ignore ta canonique -> cannibalisation/contenu trop proche)"
        if gc and gc != page_url:
            return f"CONSOLIDE par Google vers: {gc}"
        return "DOUBLON sans canonique retenue -> verifier le contenu jumeau"
    if "redirect" in cov:
        return "BENIN (page avec redirection 301 -> se resout au recrawl)"
    if "indexed" in cov:
        return "OK (indexee)"
    if "not indexed" in cov or "crawled" in cov:
        return "NON INDEXEE (faible priorite Google ou contenu mince)"
    return cov or "?"


def main():
    args = [a for a in sys.argv[1:]]
    urls = DEFAULT_SUSPECTS
    if args:
        if args[0] == "--file" and len(args) > 1:
            urls = [l.strip() for l in open(args[1], encoding="utf-8") if l.strip()]
        else:
            urls = args

    print(f"GSC Canonical Diagnostic -- {len(urls)} URL(s)\n")
    token = get_token()
    site = resolve_site(token)
    print(f"Propriete: {site}\n" + "=" * 92)

    results = []
    for u in urls:
        idx = inspect(token, site, u)
        if idx.get("_error"):
            print(f"\n[ERREUR] {u}\n  -> {idx['_error']}")
            results.append({"url": u, "error": idx["_error"]})
            time.sleep(0.5)
            continue
        cov = idx.get("coverageState", "?")
        gc = idx.get("googleCanonical", "")
        uc = idx.get("userCanonical", "")
        last = idx.get("lastCrawlTime", "")
        verdict = diagnose(u, idx)
        print(f"\n{u}")
        print(f"  Etat        : {cov}")
        print(f"  Canon Google: {gc or '(aucune)'}")
        print(f"  Canon TOI   : {uc or '(aucune declaree)'}")
        print(f"  Dernier crawl: {last[:10] if last else '?'}")
        print(f"  >> {verdict}")
        results.append({"url": u, "coverageState": cov, "googleCanonical": gc,
                        "userCanonical": uc, "lastCrawlTime": last, "verdict": verdict})
        time.sleep(0.5)  # menagement quota

    OUTPUT_FILE.write_text(json.dumps(
        {"generated": datetime.datetime.now().isoformat(), "site": site, "results": results},
        ensure_ascii=False, indent=2), encoding="utf-8")
    print("\n" + "=" * 92)
    print(f"Sauve -> {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
