# -*- coding: utf-8 -*-
"""
ga4_daily_report.py -- Lecteur GA4 automatique (mesure = etape apres la distribution Reddit).

Lit la propriete GA4 tokyo-expat.com via l'API GA4 Data (GRATUITE, compte de service)
et pousse un resume Telegram chaque matin: sessions d'hier vs base 7j, top pages,
top pays, top sources. Permet de mesurer l'impact de chaque post Reddit sans ouvrir GA.

Prerequis (voir le guide donne par Claude):
  1. pip install google-analytics-data
  2. Cle de compte de service -> scripts/ga4_service_account.json
  3. GA4_PROPERTY_ID (id numerique de la propriete) dans config.py
  4. Le compte de service ajoute en "Lecteur" dans GA4 (Admin > Acces a la propriete)

Tant que la cle n'existe pas, le script se desactive proprement (aucune erreur).

  python scripts/ga4_daily_report.py            # rapport d'hier -> Telegram
  python scripts/ga4_daily_report.py --print     # affiche sans envoyer Telegram
"""
import sys, io
from pathlib import Path
import requests

sys.path.insert(0, str(Path(__file__).parent))
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID
try:
    from config import GA4_PROPERTY_ID
except ImportError:
    GA4_PROPERTY_ID = None

SA_PATH = Path(__file__).parent / "ga4_service_account.json"


def send_telegram(msg):
    try:
        requests.post(f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
                      json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML",
                            "disable_web_page_preview": True}, timeout=10, verify=False)
    except Exception as e:
        print(f"[WARN] telegram: {e}")


def main():
    do_print = "--print" in sys.argv
    if not SA_PATH.exists():
        print(f"[INACTIF] Cle compte de service absente ({SA_PATH.name}). "
              "Suis le guide de setup GA4 puis relance.")
        return
    if not GA4_PROPERTY_ID:
        print("[INACTIF] GA4_PROPERTY_ID manquant dans config.py.")
        return

    try:
        from google.analytics.data_v1beta import BetaAnalyticsDataClient
        from google.analytics.data_v1beta.types import (
            RunReportRequest, DateRange, Metric, Dimension, OrderBy)
        from google.oauth2 import service_account
    except ImportError:
        print("[INACTIF] Manque la lib. Fais: pip install google-analytics-data")
        return

    creds = service_account.Credentials.from_service_account_file(str(SA_PATH))
    client = BetaAnalyticsDataClient(credentials=creds)
    prop = f"properties/{GA4_PROPERTY_ID}"

    def run(metrics, dims=None, date_ranges=None, order_metric=None, limit=10):
        req = RunReportRequest(
            property=prop,
            metrics=[Metric(name=m) for m in metrics],
            dimensions=[Dimension(name=d) for d in (dims or [])],
            date_ranges=date_ranges,
            order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name=order_metric), desc=True)]
                      if order_metric else None,
            limit=limit,
        )
        return client.run_report(req)

    yest = DateRange(start_date="yesterday", end_date="yesterday")
    prior7 = DateRange(start_date="8daysAgo", end_date="2daysAgo")

    # Totaux hier vs base (moyenne/j des 7 jours precedents)
    tot = run(["sessions", "activeUsers", "screenPageViews"], date_ranges=[yest, prior7])
    y_sess = int(tot.rows[0].metric_values[0].value) if tot.rows else 0
    y_users = int(tot.rows[0].metric_values[1].value) if tot.rows else 0
    y_views = int(tot.rows[0].metric_values[2].value) if tot.rows else 0
    p_sess = int(tot.rows[1].metric_values[0].value) if len(tot.rows) > 1 else 0
    base_avg = p_sess / 7 if p_sess else 0
    delta = ((y_sess - base_avg) / base_avg * 100) if base_avg else 0

    # Top pages / pays / sources (hier)
    pages = run(["screenPageViews"], ["pagePath"], [yest], "screenPageViews", 5)
    countries = run(["activeUsers"], ["country"], [yest], "activeUsers", 3)
    sources = run(["sessions"], ["sessionSource"], [yest], "sessions", 4)

    def rows(rep, n=5):
        return [(r.dimension_values[0].value, r.metric_values[0].value) for r in rep.rows[:n]]

    arrow = "\U0001F4C8" if delta >= 0 else "\U0001F4C9"
    lines = [
        "\U0001F4CA <b>GA4 - hier</b>",
        f"Sessions: <b>{y_sess}</b> ({'+' if delta>=0 else ''}{delta:.0f}% vs base 7j) {arrow}",
        f"Utilisateurs: {y_users} · Vues: {y_views}",
        "",
        "<b>Top pages</b>:",
    ]
    for path, v in rows(pages):
        lines.append(f"  {path[:38]} — {v}")
    lines.append("<b>Top pays</b>: " + ", ".join(f"{c} ({v})" for c, v in rows(countries, 3)))
    lines.append("<b>Top sources</b>: " + ", ".join(f"{s or '(direct)'} ({v})" for s, v in rows(sources, 4)))
    msg = "\n".join(lines)

    print(msg.replace("<b>", "").replace("</b>", ""))
    if not do_print:
        send_telegram(msg)
        print("\n[Telegram envoye]")


if __name__ == "__main__":
    main()
