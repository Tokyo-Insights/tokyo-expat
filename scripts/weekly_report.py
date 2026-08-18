# -*- coding: utf-8 -*-
"""RAPPORT HEBDO CONSOLIDE tokyo-expat — un seul rapport propre et priorise.
Remplace les ~15 alertes eparpillees du lundi. A lancer le DIMANCHE (analyse hebdo).

Consolide: GA4 (trafic + LEADS attribues) + GSC (visibilite + striking distance) +
vulnerabilites concurrents + content gaps. Sortie: rapport markdown propre (scripts/data/)
+ digest Telegram concis. Lecture seule (aucune modif du site).
"""
import sys, io, json, sqlite3, glob, datetime as dt
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


def send_telegram(msg):
    try:
        from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID
        r = requests.post(f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
                          json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML",
                                "disable_web_page_preview": True}, verify=False, timeout=30)
        return r.status_code == 200
    except Exception as e:
        print("Telegram KO:", e); return False


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


HIST = DATA / "weekly_history.jsonl"


# ---------- GA4: sessions par page (pour le taux de conversion) ----------
def ga4_sessions_by_page(days=90):
    try:
        from ga4_analytics import get_access_token, GA4_API_URL
        tok = get_access_token()
        body = {"dateRanges": [{"startDate": f"{days}daysAgo", "endDate": "today"}],
                "dimensions": [{"name": "landingPagePlusQueryString"}], "metrics": [{"name": "sessions"}],
                "limit": 40, "orderBys": [{"metric": {"metricName": "sessions"}, "desc": True}]}
        r = requests.post(GA4_API_URL, headers={"Authorization": f"Bearer {tok}"}, json=body,
                          verify=False, timeout=60).json()
        return {row["dimensionValues"][0]["value"]: int(row["metricValues"][0]["value"]) for row in r.get("rows", [])}
    except Exception:
        return {}


# ---------- Snapshot + tendances (vagues montantes detectees auto) ----------
def snapshot_and_trend(ga4, gsc, leads):
    today = dt.date.today().isoformat()
    def qkw(r): return r.get("query") or (r.get("keys", [""]) or [""])[0]
    cur = {"date": today,
           "sessions": (ga4 or {}).get("this_week", {}).get("sessions"),
           "impressions": (gsc or {}).get("totals", {}).get("impressions"),
           "clicks": (gsc or {}).get("totals", {}).get("clicks"),
           "leads": leads.get("total") if isinstance(leads, dict) else None,
           "queries": {qkw(r): {"pos": r.get("position"), "impr": r.get("impressions")}
                       for r in (gsc or {}).get("top_queries", [])[:25]}}
    prev, hist = None, []
    if HIST.exists():
        hist = [json.loads(l) for l in io.open(HIST, encoding="utf-8").read().splitlines() if l.strip()]
        for e in reversed(hist):
            if e.get("date") != today:
                prev = e; break
    hist = [e for e in hist if e.get("date") != today] + [cur]   # dedupe same-day
    io.open(HIST, "w", encoding="utf-8").write("\n".join(json.dumps(e, ensure_ascii=False) for e in hist) + "\n")
    return cur, prev


# ---------- Helper GA4 generique ----------
def _ga4(dims, metrics, ranges, ev=None, filt=None, limit=50):
    try:
        from ga4_analytics import get_access_token, GA4_API_URL
        tok = get_access_token()
        body = {"dateRanges": ranges, "dimensions": [{"name": d} for d in dims],
                "metrics": [{"name": m} for m in metrics], "limit": limit}
        if ev:
            filt = ("eventName", ev)
        if filt:
            body["dimensionFilter"] = {"filter": {"fieldName": filt[0], "stringFilter": {"value": filt[1]}}}
        r = requests.post(GA4_API_URL, headers={"Authorization": f"Bearer {tok}"}, json=body,
                          verify=False, timeout=60).json()
        return r.get("rows", [])
    except Exception:
        return []


# ---------- Tier 1 additions: CTR sous la courbe / GEO-IA / backlinks referents ----------
def ctr_below_curve(gsc):
    EXP = {1: .28, 2: .15, 3: .11, 4: .08, 5: .07, 6: .05, 7: .04, 8: .035, 9: .03, 10: .025}
    out = []
    for r in (gsc or {}).get("top_queries", []):
        kw = r.get("query") or (r.get("keys", [""]) or [""])[0]
        pos = r.get("position", 99); impr = r.get("impressions", 0); clk = r.get("clicks", 0)
        if pos <= 10 and impr >= 30:
            exp = EXP.get(round(pos), .02)
            ctr = (clk / impr) if impr else 0
            if ctr < exp * 0.5:
                out.append((impr, pos, ctr, exp, kw))
    return sorted(out, reverse=True)[:6]


def ga4_ai():
    rows = _ga4(["sessionDefaultChannelGroup", "landingPagePlusQueryString"], ["sessions"],
                [{"startDate": "90daysAgo", "endDate": "today"}], limit=200)
    ai = [(int(r["metricValues"][0]["value"]), r["dimensionValues"][1]["value"]) for r in rows
          if "ai" in r["dimensionValues"][0]["value"].lower()]
    return sorted(ai, reverse=True)[:6]


def ga4_referrals():
    rows = _ga4(["sessionSource"], ["sessions"], [{"startDate": "90daysAgo", "endDate": "today"}],
                filt=("sessionMedium", "referral"), limit=15)
    return [(int(r["metricValues"][0]["value"]), r["dimensionValues"][0]["value"]) for r in rows]


# ---------- Dimension 1: CONTENT DECAY (pages qui declinent) ----------
def ga4_decay():
    def pages(rng):
        return {r["dimensionValues"][0]["value"]: int(r["metricValues"][0]["value"])
                for r in _ga4(["landingPagePlusQueryString"], ["sessions"], [rng])}
    cur = pages({"startDate": "28daysAgo", "endDate": "today"})
    prev = pages({"startDate": "56daysAgo", "endDate": "29daysAgo"})
    out = []
    for pg, p in prev.items():
        c = cur.get(pg, 0)
        if p >= 20 and c < p * 0.7:   # avait >=20 sessions, a chute de >30%
            out.append((p - c, p, c, pg))
    return sorted(out, reverse=True)[:6]


# ---------- Dimension 2: ENGAGEMENT (pages qui retiennent vs perdent) ----------
def ga4_engagement():
    rows = _ga4(["landingPagePlusQueryString"], ["sessions", "engagementRate", "averageSessionDuration"],
                [{"startDate": "28daysAgo", "endDate": "today"}])
    out = []
    for r in rows:
        try:
            s = int(r["metricValues"][0]["value"]); eng = float(r["metricValues"][1]["value"])
            dur = float(r["metricValues"][2]["value"])
            if s >= 15:
                out.append((s, eng, dur, r["dimensionValues"][0]["value"]))
        except Exception:
            pass
    return out


# ---------- Dimension 3: ENTONNOIR DE CONVERSION ----------
def ga4_funnel():
    res = {}
    for ev in ["form_start", "generate_lead", "select_consultation", "book_call_click"]:
        rows = _ga4(["eventName"], ["eventCount"], [{"startDate": "90daysAgo", "endDate": "today"}], ev=ev, limit=1)
        res[ev] = int(rows[0]["metricValues"][0]["value"]) if rows else 0
    return res


# ---------- Consolidation du LUNDI: nos positions / snippets / veille / pages mortes ----------
def keyword_positions():
    try:
        c = sqlite3.connect(str(DATA / "keyword_rankings.db"))
        last = c.execute("SELECT MAX(date) FROM rankings").fetchone()[0]
        rows = c.execute("SELECT keyword, lang, position FROM rankings WHERE date=? AND "
                         "domain LIKE '%tokyo-expat%' AND position>0 ORDER BY position", (last,)).fetchall()
        c.close()
        return rows
    except Exception:
        return []


def featured_snippets():
    return (load("featured_snippets_state.json") or {}).get("opportunities", [])


def content_velocity():
    cnt = (load("content_velocity.json") or {}).get("prev_week_counts", {})
    return sorted([(v, k) for k, v in cnt.items() if v > 0], reverse=True)[:5]


def dead_pages():
    files = sorted(glob.glob(str(DATA / "dead_pages_manual_check_*.csv")))
    if not files:
        return 0, None
    try:
        with io.open(files[-1], encoding="utf-8") as f:
            n = max(sum(1 for _ in f) - 1, 0)
        return n, Path(files[-1]).name
    except Exception:
        return 0, None


HTML_OUT = DATA / "weekly_report_latest.html"
_CSS = """
:root{--bg:#f5f7fa;--surface:#fff;--surface2:#eef1f6;--ink:#0f2744;--ink-soft:#42506a;--muted:#8291a8;--line:#e2e7ef;--accent:#e84141;--good:#12805c;--warn:#b9720a;--crit:#d64545;--shadow:0 1px 2px rgba(15,39,68,.06),0 8px 24px rgba(15,39,68,.05);--mono:ui-monospace,Menlo,Consolas,monospace;--sans:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}
@media(prefers-color-scheme:dark){:root:not([data-theme=light]){--bg:#0d1626;--surface:#152238;--surface2:#1b2842;--ink:#e9eef7;--ink-soft:#b3bfd4;--muted:#7688a3;--line:#27344e;--accent:#ff5c5c;--good:#33c191;--warn:#e0a63a;--crit:#ff6b6b;--shadow:0 1px 2px rgba(0,0,0,.3),0 10px 30px rgba(0,0,0,.25)}}
:root[data-theme=dark]{--bg:#0d1626;--surface:#152238;--surface2:#1b2842;--ink:#e9eef7;--ink-soft:#b3bfd4;--muted:#7688a3;--line:#27344e;--accent:#ff5c5c;--good:#33c191;--warn:#e0a63a;--crit:#ff6b6b;--shadow:0 1px 2px rgba(0,0,0,.3),0 10px 30px rgba(0,0,0,.25)}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:15px;line-height:1.5}
.wrap{max-width:1120px;margin:0 auto;padding:32px 20px 64px}
header{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap;padding-bottom:20px;border-bottom:2px solid var(--line);margin-bottom:24px}
.brand{display:flex;align-items:center;gap:11px}.dot{width:12px;height:12px;border-radius:3px;background:var(--accent)}
h1{font-size:23px;font-weight:800;letter-spacing:-.02em;margin:0}.sub{color:var(--muted);font-size:13px;margin-top:3px}
.stamp{text-align:right;color:var(--muted);font-size:12.5px}.stamp b{color:var(--ink);font-size:15px;display:block;font-variant-numeric:tabular-nums}
.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:16px}
.kpi{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:15px 16px;box-shadow:var(--shadow)}
.kpi .lab{font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:var(--muted);font-weight:600}
.kpi .val{font-size:26px;font-weight:800;letter-spacing:-.02em;margin-top:5px;font-variant-numeric:tabular-nums}.kpi .meta{font-size:12.5px;color:var(--ink-soft);margin-top:2px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:16px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:18px 18px 16px;box-shadow:var(--shadow)}.card.wide{grid-column:1/-1}
.card h2{font-size:12px;text-transform:uppercase;letter-spacing:.06em;margin:0 0 13px;color:var(--ink);display:flex;align-items:center;gap:8px}.card h2 .tag{margin-left:auto;font-size:10.5px;font-weight:700;color:var(--muted);text-transform:none;letter-spacing:0}
.row{display:flex;align-items:center;gap:10px;padding:7px 0;border-top:1px solid var(--line);font-size:13.5px;line-height:1.35}.row:first-of-type{border-top:0}
.num{font-family:var(--mono);font-variant-numeric:tabular-nums;font-weight:600;min-width:34px;text-align:right}
.path{font-family:var(--mono);font-size:12.5px;color:var(--ink-soft);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}.kw{color:var(--ink-soft);flex:1}
.chip{font-size:11px;font-weight:700;padding:2px 8px;border-radius:20px;white-space:nowrap;font-variant-numeric:tabular-nums}
.c-crit{background:color-mix(in srgb,var(--crit) 15%,transparent);color:var(--crit)}.c-good{background:color-mix(in srgb,var(--good) 16%,transparent);color:var(--good)}.c-warn{background:color-mix(in srgb,var(--warn) 16%,transparent);color:var(--warn)}.c-mut{background:var(--surface2);color:var(--muted)}
.split{display:grid;grid-template-columns:1fr 1fr;gap:20px}@media(max-width:560px){.split{grid-template-columns:1fr}.kpis{grid-template-columns:repeat(2,1fr)}}
.mini{font-size:10.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);font-weight:700;margin:0 0 6px}
.funnel{display:flex;gap:8px;flex-wrap:wrap}.stage{flex:1;min-width:110px;background:var(--surface2);border-radius:10px;padding:12px 13px;position:relative}
.stage .n{font-size:23px;font-weight:800;font-variant-numeric:tabular-nums}.stage .s{font-size:11.5px;color:var(--ink-soft)}.stage .pc{position:absolute;top:12px;right:12px;font-size:11px;font-weight:700;color:var(--muted)}.stage .bar{height:4px;border-radius:3px;background:var(--accent);margin-top:9px}
.callout{background:color-mix(in srgb,var(--accent) 8%,var(--surface));border:1px solid color-mix(in srgb,var(--accent) 30%,var(--line));border-radius:14px;padding:16px 18px;margin-bottom:16px}.callout h2{color:var(--accent);margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:.06em}.callout p{margin:0;font-size:13.5px;color:var(--ink-soft)}
footer{margin-top:26px;text-align:center;color:var(--muted);font-size:12px}
"""


def _esc(s):
    return str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def render_html(d):
    def rows_np(items):  # (num, path/kw, chip_html)
        return "".join(f'<div class="row"><span class="num">{_esc(n)}</span>'
                       f'<span class="{cls}">{_esc(t)}</span>{chip}</div>' for n, t, cls, chip in items)
    K = d
    kpi = (f'<div class="kpi"><div class="lab">Trafic (7j)</div><div class="val">{K["sessions"]}</div>'
           f'<div class="meta">sessions · {K["sess_delta"]} · {K["users"]} users</div></div>'
           f'<div class="kpi"><div class="lab">Visibilite (28j)</div><div class="val">{K["impr"]:,}</div>'
           f'<div class="meta">impr · {K["clicks"]} clics · CTR {K["ctr"]:.2f}%</div></div>'
           f'<div class="kpi"><div class="lab">Position moy.</div><div class="val">{K["pos"]:.1f}</div>'
           f'<div class="meta">page 2-3 · levier autorite</div></div>'
           f'<div class="kpi"><div class="lab">Leads (90j)</div><div class="val">{K["leads"]}</div>'
           f'<div class="meta">via SEO surtout</div></div>').replace(",", " ")

    def chip(txt, cls): return f'<span class="chip {cls}">{_esc(txt)}</span>'
    conv_boost = "".join(f'<div class="row"><span class="num">{s}</span><span class="path">{_esc(pg)}</span>{chip("0 lead","c-crit")}</div>' for s, pg in d["conv_boost"][:6])
    conv_win = "".join(f'<div class="row"><span class="path">{_esc(pg)}</span>{chip(f"{r:.1f}%","c-good")}</div>' for r, pg in d["conv_win"][:5])
    decay = "".join(f'<div class="row"><span class="num">-{drop}</span><span class="path">{_esc(pg)}</span>{chip(f"{p} → {c}","c-crit" if c==0 else "c-warn")}</div>' for drop, p, c, pg in d["decay"][:5]) or '<div class="row"><span class="kw">Aucune chute</span></div>'
    engl = "".join(f'<div class="row"><span class="path">{_esc(pg)}</span>{chip(f"{e*100:.0f}%","c-crit" if e<0.15 else "c-warn")}</div>' for s, e, dur, pg in d["eng_low"][:5])
    ai = "".join(f'<div class="row"><span class="num">{s}</span><span class="path">{_esc(pg)}</span></div>' for s, pg in d["ai"][:5])
    ref = "".join(f'<div class="row"><span class="num">{s}</span><span class="path">{_esc(src)}</span>{chip("social","c-mut")}</div>' for s, src in d["ref"][:5])
    pos = "".join(f'<div class="row"><span class="num">#{p}</span><span class="kw">[{l}] {_esc(kw)}</span></div>' for kw, l, p in d["positions"][:10])
    snip = "".join(f'<div class="row"><span class="kw">{_esc(s.get("keyword",""))}</span>{chip(s.get("format",""),"c-mut")}</div>' for s in d["snippets"][:5])
    vuln = "".join(f'<div class="row"><span class="path"><b>{_esc(c)}</b></span><span class="kw" style="flex:0">{_esc(kw)}</span></div>' for c, kw in d["vuln"][:6])
    lead_ch = "".join(f'<div class="row"><span class="num">{n}</span><span class="kw">{_esc(c)}</span></div>' for c, n in d["leads_channel"][:4])
    lead_co = "".join(f'<div class="row"><span class="num">{n}</span><span class="kw">{_esc(c)}</span></div>' for c, n in d["leads_country"][:4])
    fn = d["funnel"]
    def pct(a, b): return f"{a/b*100:.0f}%" if b else "-"

    html = (f'<title>Tokyo-Expat Intelligence</title>\n<meta name="viewport" content="width=device-width, initial-scale=1">\n'
            f'<style>{_CSS}</style>\n<div class="wrap">\n'
            f'<header><div class="brand"><span class="dot"></span><div><h1>Tokyo-Expat Intelligence</h1>'
            f'<div class="sub">Rapport hebdo consolide · weekly_report.py</div></div></div>'
            f'<div class="stamp">Semaine du<b>{d["date"]}</b></div></header>\n'
            f'<div class="kpis">{kpi}</div>\n'
            f'<div class="callout"><h2>🎯 Filon n°1</h2><p>{_esc(d["callout"])}</p></div>\n'
            f'<div class="grid">\n'
            f'<div class="card"><h2>💰 Leads &amp; conversion<span class="tag">90j</span></h2>'
            f'<div class="split"><div><p class="mini">Par canal</p>{lead_ch}</div><div><p class="mini">Par pays</p>{lead_co}</div></div></div>\n'
            f'<div class="card"><h2>🔻 Entonnoir<span class="tag">90j</span></h2><div class="funnel">'
            f'<div class="stage"><div class="n">{fn["fs"]}</div><div class="s">Form start</div><div class="bar" style="width:100%"></div></div>'
            f'<div class="stage"><div class="n">{fn["gl"]}</div><div class="s">Lead</div><span class="pc">{pct(fn["gl"],fn["fs"])}</span><div class="bar" style="width:{pct(fn["gl"],fn["fs"])}"></div></div>'
            f'<div class="stage"><div class="n">{fn["sc"]}</div><div class="s">Consult.</div><span class="pc">{pct(fn["sc"],fn["gl"])}</span><div class="bar" style="width:{pct(fn["sc"],fn["gl"])}"></div></div>'
            f'<div class="stage"><div class="n">{fn["bc"]}</div><div class="s">Appel</div><span class="pc">{pct(fn["bc"],fn["sc"])}</span><div class="bar" style="width:{pct(fn["bc"],fn["sc"])}"></div></div></div></div>\n'
            f'<div class="card wide"><h2>🔀 Conversion par page</h2><div class="split">'
            f'<div><p class="mini">Fort trafic, 0 lead — a booster</p>{conv_boost}</div>'
            f'<div><p class="mini">Convertissent — y amener + de trafic</p>{conv_win}</div></div></div>\n'
            f'<div class="card"><h2>🏅 Nos positions<span class="tag">{d["n_kw"]} keywords</span></h2>{pos}</div>\n'
            f'<div class="card"><h2>📉 Content decay<span class="tag">28j vs prec.</span></h2>{decay}</div>\n'
            f'<div class="card"><h2>🧲 Engagement faible</h2>{engl or "<div class=row><span class=kw>OK</span></div>"}</div>\n'
            f'<div class="card"><h2>🤖 GEO / IA<span class="tag">AI Assistant</span></h2>{ai or "<div class=row><span class=kw>Aucun</span></div>"}</div>\n'
            f'<div class="card"><h2>🔗 Referents<span class="tag">trafic entrant</span></h2>{ref or "<div class=row><span class=kw>Aucun</span></div>"}</div>\n'
            f'<div class="card"><h2>📦 Featured snippets<span class="tag">a voler</span></h2>{snip or "<div class=row><span class=kw>Aucun</span></div>"}</div>\n'
            f'<div class="card wide"><h2>🔥 Vulnerabilites concurrents<span class="tag">places a prendre</span></h2>{vuln or "<div class=row><span class=kw>Aucune</span></div>"}</div>\n'
            f'</div>\n<footer>Tokyo-Expat · rapport genere chaque dimanche · lecture seule</footer>\n</div>')
    HTML_OUT.write_text(html, encoding="utf-8")
    return html


def voice_of_customer():
    p = DATA / "customer_signals.jsonl"
    if not p.exists():
        return []
    from collections import defaultdict
    tc = defaultdict(set)
    for l in io.open(p, encoding="utf-8"):
        if l.strip():
            s = json.loads(l)
            for t in s.get("themes", []):
                tc[t].add(s.get("contact"))
    return sorted([(len(c), t) for t, c in tc.items() if len(c) >= 2], reverse=True)


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

    # B2. CONVERSION PAR PAGE (fort trafic / faible conversion = a booster)
    L.append("## 🔀 CONVERSION PAR PAGE")
    sess = ga4_sessions_by_page()
    lead_pg = dict(leads.get("by_page", [])) if isinstance(leads, dict) and "error" not in leads else {}
    if sess:
        boost = [(s, pg) for pg, s in sorted(sess.items(), key=lambda x: -x[1])[:12]
                 if s >= 20 and lead_pg.get(pg, 0) == 0]
        if boost:
            L.append("**Fort trafic SANS lead (ajouter/renforcer un CTA) :**")
            for s, pg in boost[:8]:
                L.append(f"  - {s} sessions · 0 lead | {pg}")
        winners = [(lead_pg[pg], sess.get(pg, 0), pg) for pg in lead_pg if lead_pg[pg] > 0]
        if winners:
            L.append("**Convertissent (y amener plus de trafic) :**")
            for ld, s, pg in sorted(winners, reverse=True)[:5]:
                rate = f"{ld/s*100:.1f}%" if s else "n/d"
                L.append(f"  - {ld} lead / {s} sess ({rate}) | {pg}")
    else:
        L.append("_(sessions par page indisponibles)_")
    L.append("")

    # B3. TENDANCES (vagues montantes vs snapshot precedent)
    L.append("## 📈 TENDANCES (vs snapshot precedent)")
    cur, prev = snapshot_and_trend(ga4, gsc, leads)
    if prev:
        def delta(k):
            a, b = cur.get(k), prev.get(k)
            if isinstance(a, (int, float)) and isinstance(b, (int, float)):
                d = a - b; return f"{'+' if d >= 0 else ''}{d}"
            return "n/d"
        L.append(f"- Sessions {delta('sessions')} · Impressions {delta('impressions')} · "
                 f"Clics {delta('clicks')} · Leads {delta('leads')} (depuis {prev.get('date')})")
        rising = []
        for kw, v in cur.get("queries", {}).items():
            pv = prev.get("queries", {}).get(kw)
            if pv and isinstance(v.get("impr"), (int, float)) and isinstance(pv.get("impr"), (int, float)):
                di = v["impr"] - pv["impr"]
                dp = (pv.get("pos") or 0) - (v.get("pos") or 0)   # positif = monte en position
                if di >= 15 or dp >= 2:
                    rising.append((di, dp, kw, v.get("pos") or 0))
        if rising:
            L.append("**Vagues montantes (requetes) :**")
            for di, dp, kw, pos in sorted(rising, reverse=True)[:6]:
                L.append(f"  - _{kw}_ : impr {'+' if di>=0 else ''}{di}, pos {pos:.1f} ({'monte' if dp > 0 else 'stable'})")
    else:
        L.append("_(1er snapshot enregistre — les tendances apparaitront a la prochaine execution)_")
    L.append("")

    # B4. CONTENT DECAY (pages qui declinent -> rafraichir avant qu'elles meurent)
    L.append("## 📉 CONTENT DECAY (pages en declin — a rafraichir)")
    dec = ga4_decay()
    if dec:
        for drop, p, c, pg in dec:
            L.append(f"  - **-{drop}** sessions ({p} -> {c}, 28j vs 28j prec.) | {pg}")
    else:
        L.append("_(aucune chute significative)_")
    L.append("")

    # B5. ENGAGEMENT (pages qui retiennent vs perdent l'attention)
    L.append("## 🧲 ENGAGEMENT PAR PAGE")
    eng = ga4_engagement()
    if eng:
        low = sorted([x for x in eng if x[1] < 0.45], reverse=True)[:6]
        if low:
            L.append("**Fort trafic, FAIBLE engagement (contenu a ameliorer) :**")
            for s, e, d, pg in low:
                L.append(f"  - {s} sess · engagement {e*100:.0f}% · {d:.0f}s | {pg}")
        best = sorted([x for x in eng if x[1] >= 0.6], reverse=True)[:4]
        if best:
            L.append("**Retiennent le mieux (modeles a suivre) :**")
            for s, e, d, pg in best:
                L.append(f"  - {s} sess · engagement {e*100:.0f}% · {d:.0f}s | {pg}")
    else:
        L.append("_(indisponible)_")
    L.append("")

    # B6. ENTONNOIR DE CONVERSION (90j)
    L.append("## 🔻 ENTONNOIR DE CONVERSION (90j)")
    fn = ga4_funnel()
    fs, gl, sc, bc = fn.get("form_start", 0), fn.get("generate_lead", 0), fn.get("select_consultation", 0), fn.get("book_call_click", 0)
    def rate(a, b): return f"{a/b*100:.0f}%" if b else "n/d"
    L.append(f"  - Form start **{fs}** → Lead **{gl}** ({rate(gl, fs)}) → Consultation **{sc}** ({rate(sc, gl)}) → Appel reserve **{bc}** ({rate(bc, sc)})")
    if gl and bc == 0:
        L.append("  ⚠️ **Deperdition lead → appel** : des leads mais 0 appel reserve → renforcer le nurture / la prise de RDV.")
    L.append("")

    # B7. CTR SOUS LA COURBE (page 1, titre/meta a ameliorer = clics gratuits)
    L.append("## 🔎 CTR SOUS LA COURBE (page 1 — titre/meta a ameliorer)")
    cb = ctr_below_curve(gsc)
    if cb:
        for impr, pos, ctr, exp, kw in cb:
            L.append(f"  - {impr} impr · pos {pos:.1f} · CTR {ctr*100:.1f}% (attendu ~{exp*100:.0f}%) · _{kw}_")
    else:
        L.append("_(aucune page 1 sous-performante)_")
    L.append("")

    # B8. GEO / IA (pages qui captent le trafic IA)
    L.append("## 🤖 GEO / IA (pages qui captent le trafic 'AI Assistant')")
    ai = ga4_ai()
    if ai:
        for s, pg in ai:
            L.append(f"  - {s} sess IA | {pg}")
    else:
        L.append("_(aucun trafic IA attribue cette periode)_")
    L.append("")

    # B9. BACKLINKS / REFERENTS (domaines qui envoient du trafic = ton autorite)
    L.append("## 🔗 BACKLINKS / REFERENTS (domaines qui t'envoient du trafic)")
    ref = ga4_referrals()
    if ref:
        for s, src in ref[:8]:
            L.append(f"  - {s} sess | {src}")
    else:
        L.append("_(aucun referral — le goulot autorite reste entier)_")
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
    # D. NOS POSITIONS (remplace le KEYWORD REPORT du lundi)
    L.append("## 🏅 NOS POSITIONS (keywords ou on ranke)")
    kp = keyword_positions()
    if kp:
        top = [r for r in kp if r[2] <= 3][:10]
        L.append(f"**{len(kp)} keywords rankes** · le top 3 :")
        for kw, lang, pos in top:
            L.append(f"  - #{pos} · [{lang}] {kw}")
    else:
        L.append("_(indisponible)_")
    L.append("")

    # E. FEATURED SNIPPETS (a voler)
    L.append("## 📦 FEATURED SNIPPETS (a voler aux concurrents)")
    fss = featured_snippets()
    if fss:
        for s in fss[:5]:
            L.append(f"  - _{s.get('keyword','?')}_ ({s.get('format','?')}) — {s.get('competitor','?')} pos {s.get('rank','?')}")
    else:
        L.append("_(aucun)_")
    L.append("")

    # F. VEILLE (content velocity + pages mortes)
    L.append("## ⚡ VEILLE")
    cv = content_velocity()
    if cv:
        L.append("**Masse de contenu concurrents (top) :** " + " · ".join(f"{k} {v}" for v, k in cv))
    dp_n, dp_f = dead_pages()
    if dp_n:
        L.append(f"**Pages mortes a traiter :** {dp_n} (cf {dp_f})")
    L.append("")

    # G. VOIX DU CLIENT (filons issus des messages leads/clients, via customer_signals.py)
    L.append("## 🎙️ VOIX DU CLIENT (besoins recurrents des leads)")
    voc = voice_of_customer()
    if voc:
        for n, t in voc[:8]:
            L.append(f"  - 🔥 {t} : {n} contacts")
    else:
        L.append("_(lancer scripts/customer_signals.py pour alimenter)_")
    L.append("")

    L.append("---\n_Genere par weekly_report.py (lecture seule). Lancer le dimanche. Consolide GA4+GSC+keyword_tracker+snippets+velocity+vulnerabilites+content-gaps+voix-du-client._")

    # ---- Dashboard HTML (memes donnees, genere automatiquement) ----
    try:
        t = (gsc or {}).get("totals", {})
        impr, clk = t.get("impressions", 0) or 0, t.get("clicks", 0) or 0
        cboost = [(s, pg) for pg, s in sorted(sess.items(), key=lambda x: -x[1])
                  if s >= 20 and lead_pg.get(pg, 0) == 0 and "not set" not in pg.lower()]
        cwin = sorted([(lead_pg[pg] / sess.get(pg, 1) * 100, pg) for pg in lead_pg
                       if lead_pg[pg] > 0 and sess.get(pg, 0) > 0], reverse=True)
        engl = sorted([x for x in eng if x[1] < 0.45], reverse=True)
        vlist = vuln if isinstance(vuln, list) else (vuln or {}).get("items", [])
        vpairs = [(v.get("competitor") or v.get("domain", "?"), v.get("keyword", "?"))
                  for v in vlist if isinstance(v, dict)]
        callout = (f'{cboost[0][1]} = {cboost[0][0]} sessions, 0 lead — ta page la plus visitee '
                   f'ne convertit rien. A optimiser en priorite.') if cboost else "Voir la conversion par page."
        render_html({
            "date": dt.date.today().isoformat(),
            "sessions": (ga4 or {}).get("this_week", {}).get("sessions", "?"),
            "sess_delta": (ga4 or {}).get("changes", {}).get("sessions", ""),
            "users": (ga4 or {}).get("this_week", {}).get("users", "?"),
            "impr": impr, "clicks": clk, "ctr": (clk / impr * 100) if impr else 0,
            "pos": t.get("position", 0) or 0,
            "leads": leads.get("total", "?") if isinstance(leads, dict) else "?",
            "leads_channel": leads.get("by_channel", []) if isinstance(leads, dict) else [],
            "leads_country": leads.get("by_country", []) if isinstance(leads, dict) else [],
            "conv_boost": cboost, "conv_win": cwin, "decay": dec, "eng_low": engl,
            "funnel": {"fs": fn.get("form_start", 0), "gl": fn.get("generate_lead", 0),
                       "sc": fn.get("select_consultation", 0), "bc": fn.get("book_call_click", 0)},
            "ai": ai, "ref": ref, "positions": kp, "n_kw": len(kp), "snippets": fss,
            "vuln": vpairs, "callout": callout,
        })
        print(f"[Ecrit: {HTML_OUT}]")
        if "--telegram" in sys.argv:
            tp = ", ".join(f"#{p} {kw}" for kw, lg, p in kp if p <= 2)
            dg = (f"📊 <b>RAPPORT HEBDO</b> — tokyo-expat — {dt.date.today().isoformat()}\n\n"
                  f"Trafic <b>{(ga4 or {}).get('this_week',{}).get('sessions','?')}</b> sess · "
                  f"<b>{leads.get('total','?') if isinstance(leads,dict) else '?'}</b> leads (surtout SEO)\n"
                  f"Visibilite {impr} impr · pos moy {t.get('position',0) or 0:.1f}\n\n"
                  f"🎯 <b>Action n1 :</b> {callout}\n\n"
                  f"🔻 Entonnoir : {fn.get('form_start',0)} form → {fn.get('generate_lead',0)} lead → "
                  f"{fn.get('select_consultation',0)} consult → {fn.get('book_call_click',0)} appel\n"
                  f"🏅 {len(kp)} keywords rankes · {tp[:110]}\n\n"
                  f"Rapport complet (16 sections) + dashboard HTML generes. Dis-moi 'rapport' pour le voir.")
            if send_telegram(dg):
                print("[Telegram digest envoye]")
    except Exception as e:
        print("WARN HTML dashboard KO:", e)

    report = "\n".join(L)
    io.open(OUT, "w", encoding="utf-8").write(report)
    print(report)
    print(f"\n[Ecrit: {OUT}]")
    return report


if __name__ == "__main__":
    build()
