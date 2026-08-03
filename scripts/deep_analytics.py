# -*- coding: utf-8 -*-
"""
deep_analytics.py -- Analyse EN PROFONDEUR de GSC + GA4 (angles non couverts par
les rapports hebdo). Objectif: extraire l'or actionnable.

GSC (searchAnalytics): striking-distance precis, CTR vs attendu, requetes MONTANTES
(28j vs 28j precedents), zero-click, device, pays, cannibalisation page/requete.
GA4 (Data API): landing pages + engagement + conversions, canaux, events (leads),
villes + engagement (valider "Singapour"), new vs returning.

Meme cle que les autres scripts: ga4-credentials.json (2 scopes).
Usage: python scripts/deep_analytics.py
"""
import sys, io, json, datetime as dt
from pathlib import Path
import requests, urllib3
urllib3.disable_warnings()
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

from google.oauth2 import service_account
import google.auth.transport.requests as gr

CREDS = Path(__file__).parent / "ga4-credentials.json"
SITE = "sc-domain:tokyo-expat.com"
GA4_PROP = "542293344"

def token(scope):
    c = service_account.Credentials.from_service_account_file(str(CREDS), scopes=[scope])
    s = requests.Session(); s.verify = False
    c.refresh(gr.Request(session=s))
    return c.token

def gsc(body, tk):
    url = ("https://searchconsole.googleapis.com/webmasters/v3/sites/%s/searchAnalytics/query"
           % requests.utils.quote(SITE, safe=""))
    r = requests.post(url, headers={"Authorization": "Bearer " + tk}, json=body, verify=False, timeout=40)
    if r.status_code != 200:
        print("  [GSC err %s] %s" % (r.status_code, r.text[:150])); return []
    return r.json().get("rows", [])

def ga4(body, tk):
    url = "https://analyticsdata.googleapis.com/v1beta/properties/%s:runReport" % GA4_PROP
    r = requests.post(url, headers={"Authorization": "Bearer " + tk}, json=body, verify=False, timeout=40)
    if r.status_code != 200:
        print("  [GA4 err %s] %s" % (r.status_code, r.text[:150])); return None
    return r.json()

# Courbe CTR attendue par position (benchmark)
EXP = {1:.28,2:.15,3:.11,4:.08,5:.07,6:.055,7:.045,8:.036,9:.03,10:.026}
def exp_ctr(p):
    p = int(round(p))
    if p <= 10: return EXP.get(p, .026)
    if p <= 20: return .012
    return .005

def is_junk(q):
    import re
    return bool(re.search(r'["]|site:|\bOR\b|-site', q)) or len(q) < 4

def main():
    today = dt.date.today()
    d28 = (today - dt.timedelta(days=28)).isoformat()
    d56 = (today - dt.timedelta(days=56)).isoformat()
    d29 = (today - dt.timedelta(days=29)).isoformat()
    end = today.isoformat()

    tg = token("https://www.googleapis.com/auth/webmasters.readonly")

    print("="*70); print("PARTIE 1 - GSC PROFONDEUR (28j: %s -> %s)" % (d28, end)); print("="*70)

    cur = gsc({"startDate": d28, "endDate": end, "dimensions": ["query"], "rowLimit": 1000}, tg)
    prev = gsc({"startDate": d56, "endDate": d29, "dimensions": ["query"], "rowLimit": 1000}, tg)
    curm = {r["keys"][0]: r for r in cur if not is_junk(r["keys"][0])}
    prevm = {r["keys"][0]: r for r in prev}

    print("\n--- A. STRIKING DISTANCE PRECIS (pos 5-15, >=20 impr, tri par impr) ---")
    sd = [r for r in curm.values() if 5 <= r["position"] <= 15 and r["impressions"] >= 20]
    sd.sort(key=lambda x: -x["impressions"])
    for r in sd[:15]:
        print("  %4d impr | pos %4.1f | CTR %4.1f%% | %s" %
              (r["impressions"], r["position"], r["ctr"]*100, r["keys"][0]))

    print("\n--- B. REQUETES MONTANTES (impr 28j vs 28j precedents, delta>=+15) ---")
    rising = []
    for q, r in curm.items():
        p = prevm.get(q, {"impressions":0,"position":99})
        d = r["impressions"] - p["impressions"]
        if d >= 15:
            rising.append((d, r, p))
    rising.sort(key=lambda x: -x[0])
    for d, r, p in rising[:12]:
        print("  +%3d impr (%d->%d) | pos %4.1f (etait %s) | %s" %
              (d, p["impressions"], r["impressions"], r["position"],
               ("%.0f"%p["position"]) if p["impressions"] else "-", r["keys"][0]))

    print("\n--- C. CTR SOUS-PERFORMANT (pos<=12, CTR < moitie de l'attendu, impr>=30) ---")
    under = []
    for r in curm.values():
        if r["position"] <= 12 and r["impressions"] >= 30:
            e = exp_ctr(r["position"])
            if r["ctr"] < e*0.5:
                under.append((e - r["ctr"], r, e))
    under.sort(key=lambda x: -x[1]["impressions"])
    for gap, r, e in under[:12]:
        print("  %4d impr | pos %4.1f | CTR %4.1f%% (attendu ~%3.0f%%) | %s" %
              (r["impressions"], r["position"], r["ctr"]*100, e*100, r["keys"][0]))

    print("\n--- D. GROS GACHIS (>=150 impr, 0 clic) ---")
    waste = [r for r in curm.values() if r["impressions"] >= 150 and r["clicks"] == 0]
    waste.sort(key=lambda x: -x["impressions"])
    for r in waste[:10]:
        print("  %4d impr | pos %4.1f | %s" % (r["impressions"], r["position"], r["keys"][0]))

    print("\n--- E. DEVICE ---")
    for r in gsc({"startDate": d28, "endDate": end, "dimensions": ["device"]}, tg):
        print("  %-8s | %5d impr | %3d clics | CTR %4.2f%% | pos %4.1f" %
              (r["keys"][0], r["impressions"], r["clicks"], r["ctr"]*100, r["position"]))

    print("\n--- F. PAYS (top 8 impr) ---")
    ctry = gsc({"startDate": d28, "endDate": end, "dimensions": ["country"], "rowLimit": 8}, tg)
    for r in ctry:
        print("  %-4s | %5d impr | %3d clics | CTR %4.2f%% | pos %4.1f" %
              (r["keys"][0], r["impressions"], r["clicks"], r["ctr"]*100, r["position"]))

    print("\n--- G. CANNIBALISATION (meme requete servie par >=2 pages) ---")
    pq = gsc({"startDate": d28, "endDate": end, "dimensions": ["query","page"], "rowLimit": 2000}, tg)
    from collections import defaultdict
    bykw = defaultdict(list)
    for r in pq:
        if r["impressions"] >= 10:
            bykw[r["keys"][0]].append((r["keys"][1], r["impressions"], r["position"]))
    cann = {k:v for k,v in bykw.items() if len(v) >= 2}
    for k in sorted(cann, key=lambda k:-sum(x[1] for x in cann[k]))[:8]:
        print("  '%s':" % k)
        for pg, im, po in sorted(cann[k], key=lambda x:-x[1])[:3]:
            print("      %4d impr pos %4.1f | %s" % (im, po, pg.replace("https://www.tokyo-expat.com","")))

    # ================= GA4 =================
    ta = token("https://www.googleapis.com/auth/analytics.readonly")
    print("\n\n"+"="*70); print("PARTIE 2 - GA4 PROFONDEUR (28j)"); print("="*70)
    dr = [{"startDate": d28, "endDate": end}]

    print("\n--- H. LANDING PAGES (sessions + engagement + leads) ---")
    j = ga4({"dateRanges": dr,
             "dimensions":[{"name":"landingPagePlusQueryString"}],
             "metrics":[{"name":"sessions"},{"name":"engagementRate"},
                        {"name":"averageSessionDuration"},{"name":"keyEvents"}],
             "orderBys":[{"metric":{"metricName":"sessions"},"desc":True}],
             "limit":15}, ta)
    if j:
        for row in j.get("rows",[]):
            d = row["dimensionValues"][0]["value"]; m = [x["value"] for x in row["metricValues"]]
            print("  sess %3s | eng %5.0f%% | dur %4.0fs | leads %s | %s" %
                  (m[0], float(m[1])*100, float(m[2]), m[3], d[:46]))

    print("\n--- I. CANAUX (source/support) ---")
    j = ga4({"dateRanges": dr, "dimensions":[{"name":"sessionDefaultChannelGroup"}],
             "metrics":[{"name":"sessions"},{"name":"engagementRate"},{"name":"keyEvents"}],
             "orderBys":[{"metric":{"metricName":"sessions"},"desc":True}]}, ta)
    if j:
        for row in j.get("rows",[]):
            d=row["dimensionValues"][0]["value"]; m=[x["value"] for x in row["metricValues"]]
            print("  %-18s sess %3s | eng %5.0f%% | leads %s" % (d, m[0], float(m[1])*100, m[2]))

    print("\n--- J. EVENTS (dont leads) ---")
    j = ga4({"dateRanges": dr, "dimensions":[{"name":"eventName"}],
             "metrics":[{"name":"eventCount"}],
             "orderBys":[{"metric":{"metricName":"eventCount"},"desc":True}],"limit":20}, ta)
    if j:
        for row in j.get("rows",[]):
            print("  %-24s %s" % (row["dimensionValues"][0]["value"], row["metricValues"][0]["value"]))

    print("\n--- K. VILLES (valider la geo + engagement) ---")
    j = ga4({"dateRanges": dr, "dimensions":[{"name":"city"}],
             "metrics":[{"name":"sessions"},{"name":"engagementRate"}],
             "orderBys":[{"metric":{"metricName":"sessions"},"desc":True}],"limit":12}, ta)
    if j:
        for row in j.get("rows",[]):
            d=row["dimensionValues"][0]["value"]; m=[x["value"] for x in row["metricValues"]]
            print("  %-18s sess %3s | eng %5.0f%%" % (d[:18], m[0], float(m[1])*100))

    print("\n--- L. NEW vs RETURNING ---")
    j = ga4({"dateRanges": dr, "dimensions":[{"name":"newVsReturning"}],
             "metrics":[{"name":"sessions"},{"name":"engagementRate"}]}, ta)
    if j:
        for row in j.get("rows",[]):
            d=row["dimensionValues"][0]["value"] or "(unknown)"; m=[x["value"] for x in row["metricValues"]]
            print("  %-12s sess %3s | eng %5.0f%%" % (d, m[0], float(m[1])*100))

if __name__ == "__main__":
    main()
