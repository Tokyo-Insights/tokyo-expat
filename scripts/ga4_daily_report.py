# -*- coding: utf-8 -*-
"""
ga4_daily_report.py -- Pouls QUOTIDIEN GA4 (complement du digest hebdo ga4_analytics.py).

Mesure l'impact des posts Reddit au jour le jour: sessions d'hier vs base 7j,
top pages, TOP PAYS (d'ou viennent les visiteurs), top sources, conversions email.
Reutilise la cle de service EXISTANTE (ga4-credentials.json) + property 542293344.
REST direct (pas de lib supplementaire). Telegram chaque matin.

Se desactive proprement si la cle est absente.

  python scripts/ga4_daily_report.py            # rapport d'hier -> Telegram
  python scripts/ga4_daily_report.py --print     # affiche sans envoyer
"""
import sys, io, datetime
from pathlib import Path
import requests, urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

sys.path.insert(0, str(Path(__file__).parent))
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

SCRIPT_DIR = Path(__file__).parent
CREDS_FILE = SCRIPT_DIR / "ga4-credentials.json"
PROPERTY_ID = "542293344"
API = f"https://analyticsdata.googleapis.com/v1beta/properties/{PROPERTY_ID}:runReport"


def send_telegram(msg):
    try:
        requests.post(f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
                      json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML",
                            "disable_web_page_preview": True}, timeout=15, verify=False)
    except Exception as e:
        print(f"[WARN] telegram: {e}")


def get_token():
    from google.oauth2 import service_account
    import google.auth.transport.requests as gr
    creds = service_account.Credentials.from_service_account_file(
        str(CREDS_FILE), scopes=["https://www.googleapis.com/auth/analytics.readonly"])
    s = requests.Session(); s.verify = False
    creds.refresh(gr.Request(session=s))
    return creds.token


def report(token, date_ranges, metrics, dimensions=None, order_metric=None, limit=10):
    body = {"dateRanges": date_ranges, "metrics": [{"name": m} for m in metrics], "limit": limit}
    if dimensions:
        body["dimensions"] = [{"name": d} for d in dimensions]
    if order_metric:
        body["orderBys"] = [{"metric": {"metricName": order_metric}, "desc": True}]
    r = requests.post(API, headers={"Authorization": f"Bearer {token}"}, json=body, verify=False, timeout=30)
    r.raise_for_status()
    return r.json()


def total(j, i=0):
    rows = j.get("rows", [])
    return int(rows[0]["metricValues"][i]["value"]) if rows else 0


def rows(j, n=6):
    out = []
    for r in j.get("rows", [])[:n]:
        out.append((r["dimensionValues"][0]["value"], r["metricValues"][0]["value"]))
    return out


def main():
    do_print = "--print" in sys.argv
    force = "--force" in sys.argv
    if not CREDS_FILE.exists():
        print(f"[INACTIF] {CREDS_FILE.name} absent.")
        return
    # garde-fou: 1 seul envoi Telegram par jour (meme si le PC redemarre plusieurs fois)
    marker = SCRIPT_DIR / "data" / "ga4_daily_last.txt"
    today = datetime.date.today().isoformat()
    if not do_print and not force and marker.exists() and marker.read_text(encoding="utf-8").strip() == today:
        print("[SKIP] rapport GA4 deja envoye aujourd'hui.")
        return
    token = get_token()
    yest = {"startDate": "yesterday", "endDate": "yesterday"}
    prior = {"startDate": "8daysAgo", "endDate": "2daysAgo"}

    tot = report(token, [yest, prior], ["sessions", "activeUsers", "screenPageViews"])
    trows = tot.get("rows", [])
    y_sess = int(trows[0]["metricValues"][0]["value"]) if trows else 0
    y_users = int(trows[0]["metricValues"][1]["value"]) if trows else 0
    y_views = int(trows[0]["metricValues"][2]["value"]) if trows else 0
    p_sess = int(trows[1]["metricValues"][0]["value"]) if len(trows) > 1 else 0
    base = p_sess / 7 if p_sess else 0
    delta = ((y_sess - base) / base * 100) if base else 0

    pages = report(token, [yest], ["screenPageViews"], ["pagePath"], "screenPageViews", 5)
    countries = report(token, [yest], ["activeUsers"], ["country"], "activeUsers", 6)
    sources = report(token, [yest], ["sessions"], ["sessionDefaultChannelGroup"], "sessions", 4)
    ev = report(token, [yest], ["eventCount"], ["eventName"], "eventCount", 25)
    events = {r["dimensionValues"][0]["value"]: int(r["metricValues"][0]["value"]) for r in ev.get("rows", [])}
    signups = events.get("form_submit", 0) + events.get("generate_lead", 0)

    arrow = "\U0001F4C8" if delta >= 0 else "\U0001F4C9"
    L = [
        "\U0001F4CA <b>GA4 - hier</b>",
        f"Sessions: <b>{y_sess}</b> ({'+' if delta>=0 else ''}{delta:.0f}% vs base 7j) {arrow}",
        f"Utilisateurs: {y_users} | Vues: {y_views}",
        "",
        "<b>Top pays</b>: " + ", ".join(f"{c} ({v})" for c, v in rows(countries)),
        "<b>Top sources</b>: " + ", ".join(f"{s} ({v})" for s, v in rows(sources, 4)),
        "",
        "<b>Top pages</b>:",
    ]
    for p, v in rows(pages, 5):
        L.append(f"  {p[:38]} ({v})")
    if signups:
        L.append(f"\n\U0001F4E9 Inscriptions email: <b>{signups}</b>")
    msg = "\n".join(L)

    print(msg.replace("<b>", "").replace("</b>", ""))
    if not do_print:
        send_telegram(msg)
        marker.parent.mkdir(exist_ok=True)
        marker.write_text(today, encoding="utf-8")
        print("\n[Telegram envoye]")


if __name__ == "__main__":
    main()
