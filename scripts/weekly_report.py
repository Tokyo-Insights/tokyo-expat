# -*- coding: utf-8 -*-
"""RAPPORT HEBDO CONSOLIDE tokyo-expat — un seul rapport propre et priorise.

Tourne le MERCREDI, en DERNIERE etape de run_weekly_intelligence.bat (jour d'analyse
d'Alessandro depuis le 25/08). Il REMPLACE reellement les ~20 alertes de la chaine:
depuis le 09/09 celle-ci tourne avec TE_TELEGRAM_SILENT=1, donc tout est journalise
mais rien n'est envoye, et ce rapport est le seul message qui part.

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


# ---------- LA DEMANDE REELLE (ajoute 08/09/2026) ----------
# Pourquoi: l'evenement GA4 `generate_lead` ne se declenche QUE dans ExitIntentPopup,
# LeadMagnetForm et NewsletterForm. C'est une CAPTURE D'EMAIL, pas une demande commerciale.
# Le formulaire de contact, lui, n'emet aucun evenement. Resultat: le rapport annoncait
# "10 leads / 90j" alors que 3 personnes seulement avaient ecrit, dont un partenaire et un
# spam. Ces deux compteurs-ci sont les seuls qui mesurent une vraie intention d'achat.
def real_demand(days=90):
    """Demandes de contact reelles + reservations Calendly, comptees dans Gmail.

    Le site envoie ses formulaires via Resend et Calendly notifie chaque reservation:
    ces deux boites sont donc la source de verite, pas GA4.
    """
    import email as _email
    import imaplib
    from email.header import decode_header, make_header
    from email.utils import parsedate_to_datetime
    try:
        from config import GMAIL_ADDRESS, GMAIL_APP_PASSWORD
    except Exception as e:
        return {"error": f"config: {e}"}

    since = (dt.date.today() - dt.timedelta(days=days)).strftime("%d-%b-%Y")
    out = {"forms": [], "bookings": [], "error": None}
    try:
        m = imaplib.IMAP4_SSL("imap.gmail.com")
        m.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
        # All Mail: les notifications sont souvent archivees lors du triage.
        folder = "INBOX"
        typ, folders = m.list()
        for f in folders or []:
            line = f.decode("utf-8", "replace")
            if "\\All" in line:
                folder = line.split(' "/" ')[-1].strip().strip('"')
                break
        m.select(f'"{folder}"')

        for key, sender in (("forms", "resend.dev"), ("bookings", "notifications@calendly.com")):
            typ, data = m.uid("SEARCH", None, "FROM", sender, "SINCE", since)
            for uid in (data[0].split() if data and data[0] else []):
                _, md = m.uid("FETCH", uid, "(BODY.PEEK[HEADER])")
                if not md or not md[0]:
                    continue
                h = _email.message_from_bytes(md[0][1])
                subj = str(make_header(decode_header(h.get("Subject", ""))))
                if key == "bookings" and "New Event" not in subj:
                    continue    # ignore les emails marketing de Calendly
                try:
                    when = parsedate_to_datetime(h.get("Date")).date().isoformat()
                except Exception:
                    when = "?"
                out[key].append((when, subj[:80]))
        m.logout()
    except Exception as e:
        out["error"] = str(e)
    for k in ("forms", "bookings"):
        out[k].sort(reverse=True)
    return out


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


def ga4_ai_trend():
    """Le canal IA progresse-t-il ? 28j vs 28j precedents.

    Ajoute le 09/09/2026. Le GEO est le canal PRIORITAIRE du master plan et n'etait
    mesure qu'en absolu (une liste de pages), jamais en TENDANCE: impossible de dire
    s'il montait ou mourait. Bing expose bien un onglet "AI Performance" dans son
    interface, mais PAS par API (404 sur GetAIPerformanceStats / GetCopilotStats /
    GetChatStats, verifie le 09/09) -> on mesure via le regroupement GA4 'AI Assistant',
    qui est gratuit et automatisable.
    """
    def total(rng):
        rows = _ga4(["sessionDefaultChannelGroup"], ["sessions"], [rng], limit=30)
        return sum(int(r["metricValues"][0]["value"]) for r in rows
                   if "ai" in r["dimensionValues"][0]["value"].lower())
    try:
        cur = total({"startDate": "28daysAgo", "endDate": "today"})
        prev = total({"startDate": "56daysAgo", "endDate": "29daysAgo"})
    except Exception:
        return None
    return cur, prev


def bing_crawl_errors():
    """Erreurs de crawl vues par Bing (gratuit, jamais exploite jusqu'au 09/09/2026)."""
    try:
        from pathlib import Path as _P
        env = (_P(__file__).parent / ".env").read_text(encoding="utf-8")
        key = [l.split("=", 1)[1].strip() for l in env.splitlines()
               if l.startswith("BING_API_KEY=")][0]
        r = requests.get("https://ssl.bing.com/webmaster/api.svc/json/GetCrawlStats",
                         params={"apikey": key, "siteUrl": "https://tokyo-expat.com/"},
                         verify=False, timeout=45)
        rows = r.json().get("d", []) if r.status_code == 200 else []
        if not rows:
            return None
        dernier = rows[-1]
        return {"4xx": dernier.get("Code4xx", 0), "5xx": dernier.get("Code5xx", 0),
                "2xx": dernier.get("Code2xx", 0),
                "bloques_robots": dernier.get("BlockedByRobotsTxt", 0)}
    except Exception:
        return None


def ga4_referrals():
    rows = _ga4(["sessionSource"], ["sessions"], [{"startDate": "90daysAgo", "endDate": "today"}],
                filt=("sessionMedium", "referral"), limit=15)
    return [(int(r["metricValues"][0]["value"]), r["dimensionValues"][0]["value"]) for r in rows]


# ---------- Dimension 1: pages en baisse, DECOMPOSEES PAR CANAL ----------
# CORRIGE 09/09/2026. Cette section s'appelait "CONTENT DECAY" et concluait "declin"
# sur un simple delta de sessions. Le 09/09 elle a signale /en/data a -39: en realite
# -40 de Direct (le trafic Reddit qui s'arrete, jamais converti) et +10 d'IA (+59%).
# La page ne declinait pas, elle s'assainissait. Un total ne dit RIEN de la cause:
# on decompose donc par canal avant d'etiqueter quoi que ce soit.
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


# Canaux dont la perte n'est PAS un probleme de contenu.
_CANAUX_SANS_VALEUR = {"Direct", "Organic Social", "Unassigned", "Referral"}


def ga4_decay_by_channel(page):
    """Delta par canal pour UNE page, 28j vs 28j precedents."""
    def par_canal(rng):
        return {r["dimensionValues"][0]["value"]: int(r["metricValues"][0]["value"])
                for r in _ga4(["sessionDefaultChannelGroup"], ["sessions"], [rng],
                              filt=("landingPagePlusQueryString", page), limit=15)}
    try:
        cur = par_canal({"startDate": "28daysAgo", "endDate": "today"})
        prev = par_canal({"startDate": "56daysAgo", "endDate": "29daysAgo"})
    except Exception:
        return None
    deltas = {c: cur.get(c, 0) - prev.get(c, 0) for c in set(cur) | set(prev)}
    return dict(sorted(deltas.items(), key=lambda kv: kv[1]))


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
    """Masse de contenu concurrente, AVEC les scrapers muets signales.

    CORRIGE 09/09/2026: le rapport affichait "Sakura House 970" alors que la VELOCITE
    de Sakura House est a zero depuis 10 semaines d'affilee: son sitemap n'est pas lu.
    Sur 24 concurrents suivis, **17 sont a zero sur 10 semaines** = scrapers muets, pas
    des concurrents inactifs. Afficher leur masse sans le dire donne une fausse veille.
    """
    d = load("content_velocity.json") or {}
    cnt = d.get("prev_week_counts", {})
    hist = d.get("weekly_history", {})
    muets = [k for k, serie in hist.items()
             if isinstance(serie, list) and len(serie) >= 5 and not any(serie)]
    actifs = sorted([(v, k) for k, v in cnt.items() if v > 0], reverse=True)[:5]
    return actifs, muets


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
           f'<div class="kpi"><div class="lab">Captures email (90j)</div><div class="val">{K["leads"]}</div>'
           f'<div class="meta">PDF + newsletter · pas des prospects</div></div>').replace(",", " ")

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

    # --- Bing (ajoute 02/09/2026): index de Bing = index que ChatGPT interroge.
    # Donnee restee inexploitee jusqu'ici; le classement Bing est DIFFERENT de Google.
    b = d.get("bing") or {}
    b_tot = b.get("totals", {})
    b_pages = "".join(
        f'<div class="row"><span class="num">{p["impressions"]}</span>'
        f'<span class="path">{_esc(str(p["query"]).replace("https://www.tokyo-expat.com", ""))}</span>'
        f'{chip(str(p["clicks"]) + " clics", "c-good" if p["clicks"] else "c-crit")}</div>'
        for p in b.get("top_pages", [])[:8])
    b_strike = "".join(
        f'<div class="row"><span class="num">{q["impressions"]}</span>'
        f'<span class="kw">{_esc(q["query"])}</span>{chip("pos " + str(q["position"]), "c-warn")}</div>'
        for q in b.get("striking_distance", [])[:8])
    b_head = (f'<span class="tag">{b_tot.get("impressions", 0)} impr · '
              f'{b_tot.get("clicks", 0)} clics · CTR {b.get("ctr_pct", 0)}%</span>') if b else ""

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
            f'<div class="card"><h2>🅱️ Bing — pages fortes{b_head}</h2>{b_pages or "<div class=row><span class=kw>Aucune donnee</span></div>"}</div>\n'
            f'<div class="card"><h2>🅱️ Bing — visible, zero clic<span class="tag">titre/desc a revoir</span></h2>{b_strike or "<div class=row><span class=kw>Aucune</span></div>"}</div>\n'
            f'</div>\n<footer>Tokyo-Expat · rapport genere chaque mercredi · lecture seule</footer>\n</div>')
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
    demand = real_demand()
    if not demand.get("error"):
        L.append(f"- **🔴 DEMANDES REELLES (90j)** : {len(demand['forms'])} formulaires de contact "
                 f"· {len(demand['bookings'])} reservations Calendly")
    if isinstance(leads, dict) and "error" not in leads:
        L.append(f"- Captures d'email (90j) : {leads.get('total','?')}")
    L.append("")

    # B0. LA DEMANDE REELLE (ajoute 08/09/2026, cf real_demand())
    # Ces 2 compteurs passent AVANT les captures d'email: ce sont les seuls qui mesurent
    # quelqu'un qui demande quelque chose. Tout le reste ci-dessous est du trafic.
    L.append("## 🔴 DEMANDE REELLE (90j) — les seuls chiffres qui engagent quelqu'un")
    if demand.get("error"):
        L.append(f"_(indisponible: {demand['error']})_")
    else:
        L.append(f"**Formulaires de contact recus : {len(demand['forms'])}** "
                 f"· **Reservations Calendly : {len(demand['bookings'])}**")
        if demand["forms"]:
            L.append("Qui a ecrit :")
            for when, subj in demand["forms"][:10]:
                L.append(f"  - {when} | {subj}")
        if demand["bookings"]:
            L.append("Qui a reserve un appel :")
            for when, subj in demand["bookings"][:10]:
                L.append(f"  - {when} | {subj}")
        L.append("_Trier soi-meme: un partenaire qui propose une collaboration et un spam "
                 "commercial arrivent par le meme formulaire qu'un client._")
    L.append("")

    # B. CAPTURES D'EMAIL (attention: ce ne sont PAS des prospects)
    L.append("## 📧 CAPTURES D'EMAIL (lead magnet + newsletter, 90j)")
    L.append("_⚠️ L'evenement GA4 `generate_lead` se declenche uniquement quand quelqu'un donne "
             "son adresse contre un PDF gratuit ou la newsletter. Ce n'est PAS une demande "
             "commerciale, et ces personnes n'ont rien demande. Ne pas les appeler des leads._")
    if isinstance(leads, dict) and "error" not in leads:
        if leads.get("by_channel"):
            L.append("**Par canal :** " + " · ".join(f"{c} {n}" for c, n in leads["by_channel"]))
        if leads.get("by_country"):
            L.append("**Par pays :** " + " · ".join(f"{c} {n}" for c, n in leads["by_country"]))
        if leads.get("by_page"):
            L.append("**Pages qui captent le plus d'adresses :**")
            for pg, n in leads["by_page"][:8]:
                L.append(f"  - {n} | {pg}")
    else:
        L.append(f"_(GA4 indisponible: {leads.get('error','') if isinstance(leads,dict) else ''})_")
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

    # B4. PAGES EN BAISSE, decomposees par canal (cf ga4_decay_by_channel).
    L.append("## 📉 PAGES EN BAISSE (decomposees par canal — le total ne dit pas la cause)")
    dec = ga4_decay()
    if dec:
        for drop, p, c, pg in dec:
            L.append(f"  - **-{drop}** sessions ({p} -> {c}, 28j vs 28j prec.) | {pg}")
            parts = ga4_decay_by_channel(pg)
            if parts:
                detail = " · ".join(f"{ch} {d:+d}" for ch, d in parts.items() if d)
                if detail:
                    L.append(f"      {detail}")
                perdu_sans_valeur = sum(d for ch, d in parts.items()
                                        if d < 0 and ch in _CANAUX_SANS_VALEUR)
                gagne_qualifie = sum(d for ch, d in parts.items()
                                     if d > 0 and ch not in _CANAUX_SANS_VALEUR)
                if perdu_sans_valeur and abs(perdu_sans_valeur) >= drop * 0.8:
                    verdict = ("      ✅ **Pas un declin de contenu** : la perte vient de canaux "
                               "sans valeur (Direct/Social).")
                    if gagne_qualifie > 0:
                        verdict += f" Le trafic qualifie MONTE ({gagne_qualifie:+d})."
                    L.append(verdict)
                else:
                    L.append("      ⚠️ Baisse sur du trafic qualifie : la, oui, regarder le contenu.")
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

    # B6. ENTONNOIR (90j) — libelles corriges le 08/09/2026.
    # Les 4 evenements mesurent des CLICS, pas des etapes commerciales. Les anciens libelles
    # ("Lead", "Consultation", "Appel reserve") faisaient lire un entonnoir de vente la ou il
    # n'y a que de la navigation. Les vrais chiffres sont dans la section DEMANDE REELLE.
    L.append("## 🔻 ENTONNOIR DE NAVIGATION (90j) — que des clics, pas des ventes")
    fn = ga4_funnel()
    fs, gl, sc, bc = fn.get("form_start", 0), fn.get("generate_lead", 0), fn.get("select_consultation", 0), fn.get("book_call_click", 0)
    def rate(a, b): return f"{a/b*100:.0f}%" if b else "n/d"
    L.append(f"  - Clic dans un champ **{fs}** → Email donne **{gl}** ({rate(gl, fs)}) "
             f"→ Clic vers /contact **{sc}** ({rate(sc, gl)}) → Clic sur Calendly **{bc}** ({rate(bc, sc)})")
    L.append("  _Aucune de ces 4 etapes ne prouve qu'une personne a demande quelque chose. "
             "Un clic sur le bouton Calendly n'est pas une reservation: la reservation est "
             "comptee dans la section DEMANDE REELLE, depuis les emails Calendly._")
    if not demand.get("error"):
        nb = len(demand["bookings"])
        if bc and nb == 0:
            L.append(f"  ⚠️ **{bc} clics sur Calendly, 0 reservation reelle** → la page de "
                     f"reservation perd tout le monde, ou elle est cassee. A tester soi-meme.")
        elif bc:
            L.append(f"  📊 {bc} clics sur Calendly → **{nb} reservation(s) reelle(s)** ({rate(nb, bc)}).")
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

    # B8. GEO / IA -- canal PRIORITAIRE du master plan. Depuis le 09/09 on mesure aussi
    # sa TENDANCE, sans quoi on ne sait pas s'il monte ou s'il meurt.
    L.append("## 🤖 GEO / IA (canal prioritaire)")
    tr = ga4_ai_trend()
    if tr:
        cur, prev = tr
        if prev:
            var = (cur - prev) / prev * 100
            fleche = "📈" if var > 5 else ("📉" if var < -5 else "➡️")
            L.append(f"**{fleche} {cur} sessions IA sur 28j** (vs {prev} les 28j precedents, "
                     f"{var:+.0f}%)")
        else:
            L.append(f"**{cur} sessions IA sur 28j** (aucune reference precedente)")
    ai = ga4_ai()
    if ai:
        L.append("**Pages qui captent l'IA (90j) :**")
        for s, pg in ai:
            L.append(f"  - {s} sess IA | {pg}")
    else:
        L.append("_(aucun trafic IA attribue cette periode)_")
    L.append("_⚠️ Bing a un onglet 'AI Performance' plus precis, mais il n'est PAS expose par "
             "son API (404 verifie le 09/09) : ce chiffre-ci vient du regroupement GA4._")

    ce = bing_crawl_errors()
    if ce and (ce["4xx"] or ce["5xx"]):
        L.append(f"**Crawl Bing :** {ce['2xx']} pages OK · **{ce['4xx']} en 4xx** · "
                 f"{ce['5xx']} en 5xx · {ce['bloques_robots']} bloquees par robots.txt")
    L.append("")

    # B9. TRAFIC DE REFERENCE — ce n'est PAS un index de backlinks (corrige 08/09/2026).
    # Cette section lit les REFERRALS GA4. Un lien d'autorite n'envoie presque aucun trafic:
    # aucun des domaines referents reellement gagnes n'apparait ici, et c'est normal.
    # La metrique-phare du master plan (domaines referents) n'est donc mesuree par AUCUN script:
    # elle est tenue a la main dans reference_outreach_conversion_evidence (memoire).
    L.append("## 🔗 TRAFIC DE REFERENCE (GA4) — a ne pas confondre avec les backlinks")
    ref = ga4_referrals()
    if ref:
        for s, src in ref[:8]:
            L.append(f"  - {s} sess | {src}")
    else:
        L.append("_(aucun trafic de reference cette periode)_")
    L.append("_⚠️ Ceci mesure le TRAFIC envoye, pas les liens. Un backlink d'autorite n'envoie "
             "quasiment personne et n'apparaitra jamais ici. **Le compte des domaines referents "
             "n'est automatise nulle part**, il se tient a la main._")
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
        # CORRIGE 09/09/2026: le filtre etait purement thematique, donc "rental home
        # frankfurt" passait comme opportunite Tokyo. On exclut desormais toute
        # geographie etrangere, et on ecarte le hors-sujet vu dans le cache
        # ("mole removal tokyo", "getting married in tokyo" venaient de la rubrique
        # "living" de Tokyo Cheapo).
        _HORS_JAPON = ("frankfurt", "berlin", "london", "paris", "new york", "singapore",
                       "seoul", "bangkok", "dubai", "sydney", "toronto", "madrid",
                       "barcelona", "lisbon", "amsterdam", "hong kong", "taipei", "shanghai")
        _HORS_SUJET = ("mole removal", "married", "wedding", "dentist", "haircut", "gym")
        rel = [g for g in items if isinstance(g, dict)
               and any(w in gkw(g) for w in
                       ["rent", "apartment", "housing", "gaijin", "guarantor", "pet", "loyer",
                        "logement", "share house", "tenant", "landlord", "lease", "deposit"])
               and not any(v in gkw(g) for v in _HORS_JAPON)
               and not any(v in gkw(g) for v in _HORS_SUJET)][:4]
        if rel:
            L.append("**Content gaps pertinents (logement) :**")
            for g in rel:
                L.append(f"  - {g.get('keyword') or g.get('topic') or g.get('title','?')}")
    L.append("")

    # C-bis. GISEMENTS SEO (ajoute 09/09/2026) -- le radar le plus rentable du parc.
    # gsc_opportunity_miner regroupe les requetes en CLUSTERS et pondere la position par
    # les impressions. Il ne produisait que du Telegram: en passant la chaine en silence,
    # on l'aurait purement perdu. Il ecrit desormais gsc_opportunities.json, lu ici.
    opp = load("gsc_opportunities.json")
    if opp and opp.get("clusters"):
        L.append(f"## 💎 GISEMENTS SEO (clusters, {opp.get('days', 90)}j)")
        L.append("_Requetes regroupees par theme, position ponderee par les impressions. "
                 "🎯 = page 2-3, donc gagnable._")
        for c in opp["clusters"][:8]:
            cible = "🎯" if c.get("winnable") else "  "
            L.append(f"  {cible} **{c['impressions']} impr** · pos {c['position']} · "
                     f"{c['variants']} variantes · {c['action']} — _{c['example']}_")
        L.append("")

    # D. VULNERABILITES CONCURRENTS (places a prendre)
    # CORRIGE 09/09/2026: le radar signalait des concurrents en chute sur des mots-cles
    # ou NOUS SOMMES DEJA #1 (2 des 6 items du 09/09). Il ne croisait jamais nos propres
    # positions. On les croise ici: une place deja tenue n'est pas une place a prendre.
    kp = keyword_positions()

    def _norm(s):
        return "".join(ch for ch in str(s).lower() if ch.isalnum() or ch == " ").strip()

    nos_positions = {_norm(kw): p for kw, _l, p in kp}

    L.append("## 🔥 VULNERABILITES CONCURRENTS (places a prendre)")
    if vuln:
        vlist = vuln if isinstance(vuln, list) else vuln.get("items", [])
        a_prendre, deja_tenues = [], []
        for v in vlist:
            if not isinstance(v, dict):
                continue
            comp = v.get("competitor") or v.get("domain", "?")
            kw = v.get("keyword", "?")
            ma_pos = nos_positions.get(_norm(kw))
            (deja_tenues if (ma_pos and ma_pos <= 3) else a_prendre).append((comp, kw, ma_pos))
        for comp, kw, ma_pos in a_prendre[:6]:
            ou = f" (nous: #{ma_pos})" if ma_pos else " (position inconnue, a verifier)"
            L.append(f"  - **{comp}** chute sur _{kw}_{ou}")
        if deja_tenues:
            L.append(f"_✅ {len(deja_tenues)} vulnerabilite(s) ecartee(s), on y est deja top-3 : "
                     + ", ".join(f"{kw} (#{p})" for _c, kw, p in deja_tenues) + "._")
        if not a_prendre:
            L.append("_(aucune place reellement a prendre : tout est deja tenu)_")
    else:
        L.append("_(aucune)_")
    L.append("")
    # D. NOS POSITIONS (remplace le KEYWORD REPORT du lundi)
    L.append("## 🏅 NOS POSITIONS (keywords ou on ranke)")
    if kp:
        top = [r for r in kp if r[2] <= 3][:10]
        L.append(f"**{len(kp)} keywords rankes** · le top 3 :")
        for kw, lang, pos in top:
            L.append(f"  - #{pos} · [{lang}] {kw}")
    else:
        L.append("_(indisponible)_")
    L.append("")

    # D-bis. BING (ajoute 02/09/2026) -- index interroge par ChatGPT, longtemps inexploite.
    # ⚠️ Le classement Bing n'est PAS celui de Google: les pages gagnantes different.
    bing = load("bing_latest.json")
    if bing and bing.get("totals", {}).get("impressions"):
        bt, bp = bing["totals"], bing.get("period", {})
        L.append("## 🅱️ BING (l'index que ChatGPT interroge)")
        # CONTROLE DE FRAICHEUR (ajoute 09/09/2026). Ce bloc affichait des chiffres
        # sans jamais dire de quand ils dataient: le 09/09 il servait des donnees
        # arretees au 30/08 comme si elles etaient courantes, parce que
        # bing_analytics.py n'etait dans aucun planificateur.
        retard = None
        try:
            fin = dt.date.fromisoformat(str(bp.get("to", ""))[:10])
            retard = (dt.date.today() - fin).days
        except Exception:
            pass
        if retard is None:
            L.append("⚠️ **Fraicheur inconnue** : impossible de lire la periode. Lancer `bing_analytics.py`.")
        elif retard > 7:
            L.append(f"🚨 **DONNEES PERIMEES : {retard} jours de retard** (fin de periode "
                     f"{bp.get('to')}). Ne pas conclure sur ces chiffres, relancer "
                     f"`python scripts/bing_analytics.py`.")
        else:
            L.append(f"_Donnees a jour ({retard} j de decalage, fin {bp.get('to')})._")
        L.append(f"**{bt['impressions']} impressions · {bt['clicks']} clics · "
                 f"CTR {bing.get('ctr_pct', 0)}%** sur {bp.get('from', '?')} → {bp.get('to', '?')} "
                 f"({bing.get('queries_total', 0)} requetes, {bing.get('pages_total', 0)} pages)")
        if bing.get("top_pages"):
            L.append("**Pages fortes sur Bing (souvent PAS les memes que sur Google) :**")
            for p in bing["top_pages"][:6]:
                url = str(p["query"]).replace("https://www.tokyo-expat.com", "")
                L.append(f"  - {p['impressions']} impr · {p['clicks']} clics · pos {p['position']} | {url}")
        if bing.get("striking_distance"):
            L.append("**Visible sur Bing mais zero clic (titre/description a revoir) :**")
            for q in bing["striking_distance"][:6]:
                L.append(f"  - {q['impressions']} impr · pos {q['position']} · _{q['query']}_")
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

    # F. VEILLE (content velocity + reviews concurrents + pages mortes)
    L.append("## ⚡ VEILLE CONCURRENTS")
    cv, muets = content_velocity()
    if cv:
        L.append("**Masse de contenu (top) :** " + " · ".join(f"{k} {v}" for v, k in cv))
    if muets:
        L.append(f"⚠️ **{len(muets)} scrapers MUETS** (0 publication detectee sur 10 semaines "
                 f"d'affilee = sitemap probablement illisible, PAS un concurrent inactif) : "
                 + ", ".join(sorted(muets)[:8])
                 + ("..." if len(muets) > 8 else ""))

    # Plaintes clients des concurrents (review_monitor). Ce radar PRODUIT de la vraie
    # donnee depuis toujours et n'etait lu NULLE PART. Ajoute au rapport le 09/09/2026:
    # ce que les clients reprochent a un concurrent = angle de contenu et de vente.
    revs = load("competitor_reviews.json") or {}
    lignes = []
    for nom, r in revs.items():
        if not isinstance(r, dict):
            continue
        issues = r.get("issue_counts") or {}
        top = sorted(issues.items(), key=lambda kv: -kv[1])[:3]
        if r.get("complaints") or top:
            lignes.append(f"  - **{nom}** : {r.get('complaints', 0)} plainte(s) sur "
                          f"{r.get('total_results', 0)} resultats · "
                          + ", ".join(f"{m} ×{n}" for m, n in top))
    if lignes:
        L.append("**Ce qu'on reproche aux concurrents (matiere a contenu) :**")
        L.extend(lignes[:5])

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

    L.append("---\n_Genere par weekly_report.py (lecture seule), le MERCREDI en fin de chaine. Consolide GA4+GSC+Bing+keyword_tracker+snippets+velocity+vulnerabilites+content-gaps+voix-du-client. La chaine tourne en silence Telegram: ce rapport est le seul envoi._")

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
            "bing": load("bing_latest.json") or {},
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
