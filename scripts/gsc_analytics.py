"""
gsc_analytics.py -- Tokyo Expat Google Search Console reporter.
Fetches emerging queries + pages from GSC and sends a Telegram digest.

PREREQUIS (one-time setup) :
  1. Activer "Google Search Console API" dans Google Cloud project "tokyo-expat".
     https://console.cloud.google.com/apis/library/searchconsole.googleapis.com?project=tokyo-expat
  2. Dans Search Console (search.google.com/search-console) > Parametres > Utilisateurs
     et autorisations > Ajouter un utilisateur :
       ga4-reader@tokyo-expat.iam.gserviceaccount.com   (role: Lecteur complet)
  3. Verifier SITE_URL ci-dessous (domain property vs URL prefix).

Run: python scripts/gsc_analytics.py
Output: data/gsc_latest.json (pour monday_briefing.py)
"""
import json
import sys
import io
import datetime
from pathlib import Path

import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

from google.oauth2 import service_account
import google.auth.transport.requests as google_requests

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
CREDS_FILE = SCRIPT_DIR / "ga4-credentials.json"
OUTPUT_FILE = DATA_DIR / "gsc_latest.json"

# Search Console property. Try domain property first, fallback to URL prefix.
SITE_CANDIDATES = [
    "sc-domain:tokyo-expat.com",
    "https://www.tokyo-expat.com/",
]
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

try:
    from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID
    HAVE_TELEGRAM = True
except Exception:
    HAVE_TELEGRAM = False


def send_telegram(msg: str):
    if not HAVE_TELEGRAM:
        return
    try:
        requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
            json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            verify=VERIFY_SSL, timeout=20,
        )
    except Exception as e:
        print(f"Telegram failed: {e}")


def get_token() -> str:
    creds = service_account.Credentials.from_service_account_file(str(CREDS_FILE), scopes=SCOPES)
    session = requests.Session()
    session.verify = VERIFY_SSL
    creds.refresh(google_requests.Request(session=session))
    return creds.token


def query_gsc(token: str, site_url: str, start: str, end: str, dimensions, row_limit=25):
    url = f"https://searchconsole.googleapis.com/webmasters/v3/sites/{requests.utils.quote(site_url, safe='')}/searchAnalytics/query"
    payload = {
        "startDate": start,
        "endDate": end,
        "dimensions": dimensions,
        "rowLimit": row_limit,
    }
    r = requests.post(url, headers={"Authorization": f"Bearer {token}"}, json=payload, verify=VERIFY_SSL, timeout=30)
    return r


def main():
    print("GSC Analytics Reporter starting...")
    token = get_token()

    today = datetime.date.today()
    end = (today - datetime.timedelta(days=1)).isoformat()      # GSC lag ~2-3 days
    start = (today - datetime.timedelta(days=28)).isoformat()

    # Find the working property
    site_url = None
    for candidate in SITE_CANDIDATES:
        r = query_gsc(token, candidate, start, end, ["query"], row_limit=1)
        if r.status_code == 200:
            site_url = candidate
            break
        else:
            print(f"  property '{candidate}' -> {r.status_code} {r.text[:120]}")

    if not site_url:
        msg = ("GSC: aucune propriete accessible. Verifier que "
               "ga4-reader@tokyo-expat.iam.gserviceaccount.com est ajoute comme "
               "utilisateur dans Search Console + API activee.")
        print(msg)
        send_telegram("⚠️ " + msg)
        return

    print(f"  using property: {site_url}")

    queries_r = query_gsc(token, site_url, start, end, ["query"], row_limit=25)
    pages_r = query_gsc(token, site_url, start, end, ["page"], row_limit=15)

    queries = queries_r.json().get("rows", []) if queries_r.status_code == 200 else []
    pages = pages_r.json().get("rows", []) if pages_r.status_code == 200 else []

    # VRAI total du site = requete SANS dimension.
    # BUG corrige le 2026-07-24: avant, totals = somme du TOP 25 requetes seulement,
    # ce qui sous-estimait massivement (1293 affiche au lieu de 26340 reels).
    # Toutes les analyses GSC anterieures a cette date sont donc sous-estimees.
    totals_r = query_gsc(token, site_url, start, end, [], row_limit=1)
    _tr = totals_r.json().get("rows", []) if totals_r.status_code == 200 else []
    if _tr:
        totals = {
            "clicks": _tr[0].get("clicks", 0),
            "impressions": _tr[0].get("impressions", 0),
            "ctr_pct": round(_tr[0].get("ctr", 0) * 100, 2),
            "position": round(_tr[0].get("position", 0), 1),
        }
    else:
        totals = {"clicks": 0, "impressions": 0, "ctr_pct": 0, "position": 0}

    out = {
        "generated_at": today.isoformat(),
        "period": f"{start} to {end}",
        "property": site_url,
        "totals": totals,
        "top_queries": [
            {
                "query": row["keys"][0],
                "clicks": row.get("clicks", 0),
                "impressions": row.get("impressions", 0),
                "position": round(row.get("position", 0), 1),
            }
            for row in queries
        ],
        "top_pages": [
            {
                "page": row["keys"][0],
                "clicks": row.get("clicks", 0),
                "impressions": row.get("impressions", 0),
            }
            for row in pages
        ],
    }

    DATA_DIR.mkdir(exist_ok=True)
    OUTPUT_FILE.write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Saved to {OUTPUT_FILE}")

    # Telegram digest
    lines = [f"<b>GSC 28j</b> ({site_url})",
             f"Impressions: {totals['impressions']} | Clics: {totals['clicks']} "
             f"| CTR {totals.get('ctr_pct', 0)}% | pos moy {totals.get('position', 0)}", ""]
    if out["top_queries"]:
        lines.append("<b>Top requetes (impressions):</b>")
        for q in sorted(out["top_queries"], key=lambda x: x["impressions"], reverse=True)[:8]:
            lines.append(f"- {q['query']} : {q['impressions']} impr, pos {q['position']}")
    else:
        lines.append("Aucune requete encore (site jeune, indexation en cours).")
    send_telegram("\n".join(lines))
    print("Telegram sent.")


if __name__ == "__main__":
    main()
