# -*- coding: utf-8 -*-
"""RAPPORT HEBDO CONSOLIDE tokyo-expat — un seul rapport propre et priorise.
Remplace les ~15 alertes eparpillees du lundi. A lancer le DIMANCHE (analyse hebdo).

Consolide: GA4 (trafic + LEADS attribues) + GSC (visibilite + striking distance) +
vulnerabilites concurrents + content gaps. Sortie: rapport markdown propre (scripts/data/)
+ digest Telegram concis. Lecture seule (aucune modif du site).
"""
import sys, io, json, datetime as dt
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import requests, urllib3
urllib3.disable_warnings()
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

DATA = Path(__file__).resolve().parent / "data"
OUT = DATA / "weekly_report_latest.md"


def load(name):
    p = DATA / name
    try: return json.load(io.open(p, encoding="utf-8"))
    except Exception: return None


# ---------- GA4 live: attribution des leads (le pont vers les clients) ----------
def ga4_leads():
    try:
        from ga4_analytics import get_access_token, GA4_API_URL
        tok = get_access_token()
    except Exception as e:
        return {"error": str(e)}
    def q(dims, ev="generate_lead", days=90):
        body = {"dateRanges": [{"startDate": f"{days}daysAgo", "endDate": "today"}],
                "dimensions": [{"name": d} for d in dims], "metrics": [{"name": "eventCount"}],
                "dimensionFilter": {"filter": {"fieldName": "eventName", "stringFilter": {"value": ev}}},
                "limit": 12, "orderBys": [{"metric": {"metricName": "eventCount"}, "desc": True}]}
        try:
            r = requests.post(GA4_API_URL, headers={"Authorization": f"Bearer {tok}"}, json=body,
                              verify=False, timeout=60).json()
            return [(row["dimensionValues"][0]["value"], int(row["metricValues"][0]["value"]))
                    for row in r.get("rows", [])]
        except Exception:
            return []
    return {"by_channel": q(["sessionDefaultChannelGroup"]), "by_page": q(["landingPagePlusQueryString"]),
            "by_country": q(["country"]), "total": sum(n for _, n in q(["sessionDefaultChannelGroup"]))}


# ---------- GSC: striking distance (pos 5-15, forte impression) ----------
def striking(gsc):
    out = []
    for r in (gsc or {}).get("top_queries", []):
        kw = r.get("query") or (r.get("keys", [""]) or [""])[0]
        pos, impr, clk = r.get("position", 0), r.get("impressions", 0), r.get("clicks", 0)
        if 5 <= pos <= 15 and impr >= 40:
            out.append((impr, pos, clk, kw))
    return sorted(out, reverse=True)[:6]


def build():
    ga4, gsc, vuln, gaps = load("ga4_latest.json"), load("gsc_latest.json"), load("vulnerabilities.json"), load("content_gaps.json")
    leads = ga4_leads()
    L = []
    L.append(f"# 📊 RAPPORT HEBDO — tokyo-expat — {dt.date.today().isoformat()}\n")

    # A. KPIs
    L.append("## 🎯 KPIs")
    if ga4:
        tw, ch = ga4.get("this_week", {}), ga4.get("changes", {})
        L.append(f"- **Trafic (7j)** : {tw.get('sessions','?')} sessions ({ch.get('sessions','')}), "
                 f"{tw.get('users','?')} users ({ch.get('users','')})")
    if gsc:
        t = gsc.get("totals", {})
        impr, clk = t.get("impressions", 0) or 0, t.get("clicks", 0) or 0
        ctr = (clk / impr * 100) if impr else 0
        L.append(f"- **Visibilite (28j)** : {impr} impressions | {clk} clics | CTR {ctr:.2f}% "
                 f"| pos moy {t.get('position',0):.1f}" if t else "- Visibilite : n/d")
    if isinstance(leads, dict) and "error" not in leads:
        L.append(f"- **Leads (90j)** : {leads.get('total','?')}")
    L.append("")

    # B. LEADS & CONVERSION (le coeur : d'ou viennent les clients)
    L.append("## 💰 LEADS & CONVERSION (le pont vers les clients)")
    if isinstance(leads, dict) and "error" not in leads:
        if leads.get("by_channel"):
            L.append("**Par canal :** " + " · ".join(f"{c} {n}" for c, n in leads["by_channel"]))
        if leads.get("by_country"):
            L.append("**Par pays :** " + " · ".join(f"{c} {n}" for c, n in leads["by_country"]))
        if leads.get("by_page"):
            L.append("**Pages qui convertissent :**")
            for pg, n in leads["by_page"][:8]:
                L.append(f"  - {n} | {pg}")
    else:
        L.append(f"_(GA4 leads indisponible: {leads.get('error','') if isinstance(leads,dict) else ''})_")
    L.append("")

    # C. TOP OPPORTUNITES (priorisees)
    L.append("## 🎯 TOP OPPORTUNITES (priorisees)")
    sd = striking(gsc)
    if sd:
        L.append("**Striking distance (page 1-2, a pousser en top-3) :**")
        for impr, pos, clk, kw in sd:
            L.append(f"  - {impr} impr · pos {pos:.1f} · {clk} clics · _{kw}_")
    if gaps:
        items = gaps if isinstance(gaps, list) else gaps.get("gaps", gaps.get("items", []))
        def gkw(g): return str(g.get("keyword") or g.get("topic") or g.get("title", "")).lower()
        rel = [g for g in items if isinstance(g, dict) and any(w in gkw(g)
               for w in ["rent", "apartment", "housing", "gaijin", "guarantor", "pet", "loyer",
                         "logement", "share house", "tenant", "landlord", "lease", "deposit"])][:4]
        if rel:
            L.append("**Content gaps pertinents (logement) :**")
            for g in rel:
                L.append(f"  - {g.get('keyword') or g.get('topic') or g.get('title','?')}")
    L.append("")

    # D. VULNERABILITES CONCURRENTS (places a prendre)
    L.append("## 🔥 VULNERABILITES CONCURRENTS (places a prendre)")
    if vuln:
        vlist = vuln if isinstance(vuln, list) else vuln.get("items", [])
        for v in vlist[:6]:
            if isinstance(v, dict):
                comp = v.get("competitor") or v.get("domain", "?")
                kw = v.get("keyword", "?")
                L.append(f"  - **{comp}** chute sur _{kw}_ -> attaquer / verifier notre position")
    else:
        L.append("_(aucune)_")
    L.append("")
    L.append("---\n_Genere par weekly_report.py (lecture seule). Lancer le dimanche._")

    report = "\n".join(L)
    io.open(OUT, "w", encoding="utf-8").write(report)
    print(report)
    print(f"\n[Ecrit: {OUT}]")
    return report


if __name__ == "__main__":
    build()
