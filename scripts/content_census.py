#!/usr/bin/env python3
"""
content_census.py -- Recensement des pages mortes du blog.

🔑 POURQUOI CE SCRIPT EXISTE (biais du survivant):
la Search Console ne renvoie **que les pages ayant eu au moins une impression**. Une page a
zero n'apparait pas a la ligne "0", elle est **ABSENTE**. Lire la GSC seule revient donc a
n'examiner que les avions rentres. Pour voir les autres il faut apporter son propre
denominateur: la liste COMPLETE des slugs de `lib/blog.ts`, et soustraire.

Trois etats, et ils appellent trois gestes differents:
  VIVANTE          >=1 clic sur la fenetre           -> comprendre ce qu'elle a de particulier
  VUE SANS CLIC    des impressions, zero clic        -> cible n1 du reformatage citable
  MORTE            absente de la GSC = 0 impression  -> Google ne la montre a personne

Lecture SEULE. N'ecrit rien sur le site, n'envoie rien.

Usage:
    python scripts/content_census.py                 # 90 jours
    python scripts/content_census.py --days 28
    python scripts/content_census.py --locale fr     # ne compter que le FR
"""
import argparse
import datetime
import io
import json
import re
import sys
from pathlib import Path

import requests
from google.auth.transport import requests as google_requests
from google.oauth2 import service_account

VERIFY_SSL = False
if not VERIFY_SSL:
    import urllib3
    urllib3.disable_warnings()

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
CREDS_FILE = SCRIPT_DIR / "ga4-credentials.json"
BLOG_TS = SCRIPT_DIR.parent / "lib" / "blog.ts"
SITE_CANDIDATES = ["sc-domain:tokyo-expat.com", "https://www.tokyo-expat.com/"]
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

# slug puis locale, dans cet ordre, tels qu'ils se suivent dans blog.ts
POST_RE = re.compile(r"slug:\s*'([^']+)'\s*,\s*locale:\s*'([^']+)'")


def get_token():
    creds = service_account.Credentials.from_service_account_file(
        str(CREDS_FILE), scopes=SCOPES)
    session = requests.Session()
    session.verify = VERIFY_SSL
    creds.refresh(google_requests.Request(session=session))
    return creds.token


def query_pages(token, site_url, start, end, start_row=0, row_limit=5000):
    url = ("https://searchconsole.googleapis.com/webmasters/v3/sites/"
           f"{requests.utils.quote(site_url, safe='')}/searchAnalytics/query")
    payload = {"startDate": start, "endDate": end, "dimensions": ["page"],
               "rowLimit": row_limit, "startRow": start_row}
    return requests.post(url, headers={"Authorization": f"Bearer {token}"},
                         json=payload, verify=VERIFY_SSL, timeout=60)


def load_posts():
    txt = BLOG_TS.read_text(encoding="utf-8")
    posts = [{"slug": s, "locale": loc} for s, loc in POST_RE.findall(txt)]
    seen, out = set(), []
    for p in posts:
        key = (p["slug"], p["locale"])
        if key not in seen:
            seen.add(key)
            out.append(p)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--days", type=int, default=90)
    ap.add_argument("--locale", choices=["fr", "en"], help="ne compter qu'une langue")
    args = ap.parse_args()

    posts = load_posts()
    if args.locale:
        posts = [p for p in posts if p["locale"] == args.locale]
    if not posts:
        sys.exit("Aucun article lu dans blog.ts: le motif slug/locale a-t-il change ?")
    print(f"Denominateur: {len(posts)} articles lus dans lib/blog.ts")

    token = get_token()
    today = datetime.date.today()
    end = (today - datetime.timedelta(days=3)).isoformat()   # latence GSC
    start = (today - datetime.timedelta(days=args.days + 3)).isoformat()

    site_url = None
    for cand in SITE_CANDIDATES:
        r = query_pages(token, cand, start, end, row_limit=1)
        if r.status_code == 200:
            site_url = cand
            break
        print(f"  propriete '{cand}' -> {r.status_code} {r.text[:120]}")
    if not site_url:
        sys.exit("Aucune propriete GSC accessible.")
    print(f"Propriete: {site_url}   fenetre: {start} -> {end}")

    rows, start_row = [], 0
    while True:
        r = query_pages(token, site_url, start, end, start_row=start_row)
        if r.status_code != 200:
            sys.exit(f"GSC HTTP {r.status_code}: {r.text[:200]}")
        batch = r.json().get("rows", [])
        rows.extend(batch)
        if len(batch) < 5000:
            break
        start_row += 5000
    print(f"La GSC renvoie {len(rows)} URL ayant eu au moins une impression.\n")

    # Index par slug: une URL peut porter des parametres ou une barre finale.
    stats = {}
    for row in rows:
        page = row["keys"][0]
        stats[page] = {"clicks": row.get("clicks", 0),
                       "impressions": row.get("impressions", 0),
                       "position": row.get("position", 0)}

    vivantes, vues_sans_clic, mortes = [], [], []
    for p in posts:
        slug = p["slug"]
        hit = None
        for page, s in stats.items():
            if re.search(rf"/{re.escape(slug)}/?(\?|$)", page):
                hit = s
                break
        if hit is None:
            mortes.append({**p, "clicks": 0, "impressions": 0})
        elif hit["clicks"] >= 1:
            vivantes.append({**p, **hit})
        else:
            vues_sans_clic.append({**p, **hit})

    n = len(posts)
    def pct(x):
        return f"{100 * x / n:.0f}%"

    print("=" * 64)
    print(f"RECENSEMENT SUR {args.days} JOURS — {n} articles")
    print("=" * 64)
    print(f"  VIVANTES       (>=1 clic)            : {len(vivantes):3d}  {pct(len(vivantes))}")
    print(f"  VUES SANS CLIC (impressions, 0 clic) : {len(vues_sans_clic):3d}  {pct(len(vues_sans_clic))}")
    print(f"  MORTES         (0 impression)        : {len(mortes):3d}  {pct(len(mortes))}")

    for label, group in (("fr", "FR"), ("en", "EN")):
        sub = [p for p in posts if p["locale"] == label]
        if not sub:
            continue
        v = len([x for x in vivantes if x["locale"] == label])
        s = len([x for x in vues_sans_clic if x["locale"] == label])
        m = len([x for x in mortes if x["locale"] == label])
        print(f"    {group}: {len(sub):3d} articles -> {v} vivantes, {s} vues sans clic, {m} mortes")

    vues_sans_clic.sort(key=lambda x: -x["impressions"])
    print(f"\n--- VUES SANS CLIC, les 15 plus vues (cibles n1 du reformatage) ---")
    for x in vues_sans_clic[:15]:
        print(f"  {x['impressions']:6.0f} impr  pos {x['position']:5.1f}  [{x['locale']}] {x['slug']}")

    vivantes.sort(key=lambda x: -x["clicks"])
    print(f"\n--- VIVANTES, les 15 premieres (ce que les survivants ont en commun) ---")
    for x in vivantes[:15]:
        print(f"  {x['clicks']:5.0f} clics  {x['impressions']:6.0f} impr  [{x['locale']}] {x['slug']}")

    print(f"\n--- MORTES: {len(mortes)} articles que Google ne montre a personne ---")
    for x in mortes[:30]:
        print(f"  [{x['locale']}] {x['slug']}")
    if len(mortes) > 30:
        print(f"  ... et {len(mortes) - 30} autres (liste complete dans le JSON)")

    out = DATA_DIR / f"content_census_{today.isoformat()}.json"
    out.parent.mkdir(exist_ok=True)
    out.write_text(json.dumps({
        "date": today.isoformat(), "fenetre_jours": args.days,
        "start": start, "end": end, "total": n,
        "vivantes": vivantes, "vues_sans_clic": vues_sans_clic, "mortes": mortes,
    }, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nEcrit: {out}")


if __name__ == "__main__":
    main()
