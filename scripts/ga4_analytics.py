"""
ga4_analytics.py -- Tokyo Expat GA4 Analytics Reporter
Fetches weekly stats from GA4 and sends Telegram digest.

Run: python scripts/ga4_analytics.py
Output: data/ga4_latest.json (pour monday_briefing.py)
"""

import json
import os
import sys
import io
import datetime
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

from google.oauth2 import service_account
import google.auth.transport.requests as google_requests

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
CREDS_FILE = SCRIPT_DIR / "ga4-credentials.json"
OUTPUT_FILE = DATA_DIR / "ga4_latest.json"

GA4_PROPERTY_ID = "542293344"
GA4_API_URL = f"https://analyticsdata.googleapis.com/v1beta/properties/{GA4_PROPERTY_ID}:runReport"

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID


def send_telegram(msg: str):
    requests.post(
        f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
        json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML"},
        verify=VERIFY_SSL, timeout=15
    )


def get_access_token():
    creds = service_account.Credentials.from_service_account_file(
        str(CREDS_FILE),
        scopes=["https://www.googleapis.com/auth/analytics.readonly"]
    )
    session = requests.Session()
    session.verify = VERIFY_SSL
    auth_req = google_requests.Request(session=session)
    creds.refresh(auth_req)
    return creds.token


def run_report(token, date_range, metrics, dimensions=None, limit=10):
    body = {
        "dateRanges": [date_range],
        "metrics": [{"name": m} for m in metrics],
        "limit": limit,
    }
    if dimensions:
        body["dimensions"] = [{"name": d} for d in dimensions]
    r = requests.post(
        GA4_API_URL,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        json=body,
        verify=VERIFY_SSL, timeout=30
    )
    r.raise_for_status()
    return r.json()


def parse_rows(response, dim_count=0):
    rows = []
    for row in response.get("rows", []):
        dims = [row["dimensionValues"][i]["value"] for i in range(dim_count)]
        vals = [row["metricValues"][i]["value"] for i in range(len(row["metricValues"]))]
        rows.append(dims + vals)
    return rows


def main():
    print("GA4 Analytics Reporter starting...")
    token = get_access_token()
    today = datetime.date.today()
    week_ago = today - datetime.timedelta(days=7)
    prev_week_start = today - datetime.timedelta(days=14)
    prev_week_end = today - datetime.timedelta(days=8)

    dr_this = {"startDate": week_ago.isoformat(), "endDate": today.isoformat()}
    dr_prev = {"startDate": prev_week_start.isoformat(), "endDate": prev_week_end.isoformat()}

    # 1. Sessions + users this week vs last week
    r_this = run_report(token, dr_this, ["sessions", "activeUsers", "screenPageViews", "bounceRate"])
    r_prev = run_report(token, dr_prev, ["sessions", "activeUsers", "screenPageViews", "bounceRate"])

    def get_totals(r):
        rows = r.get("rows", [])
        if rows:
            vals = rows[0]["metricValues"]
            return {
                "sessions": int(vals[0]["value"]),
                "users": int(vals[1]["value"]),
                "pageviews": int(vals[2]["value"]),
                "bounce_rate": float(vals[3]["value"]),
            }
        return {"sessions": 0, "users": 0, "pageviews": 0, "bounce_rate": 0}

    this_week = get_totals(r_this)
    prev_week = get_totals(r_prev)

    def pct_change(new, old):
        if old == 0:
            return "+100%" if new > 0 else "0%"
        delta = (new - old) / old * 100
        sign = "+" if delta >= 0 else ""
        return f"{sign}{delta:.0f}%"

    # 2. Top 5 pages this week
    r_pages = run_report(token, dr_this, ["screenPageViews"], ["pagePath"], limit=5)
    top_pages = parse_rows(r_pages, dim_count=1)

    # 3. Top 3 traffic sources
    r_sources = run_report(token, dr_this, ["sessions"], ["sessionDefaultChannelGroup"], limit=3)
    top_sources = parse_rows(r_sources, dim_count=1)

    # 4. Newsletter conversions (if event tracked)
    r_events = run_report(token, dr_this, ["eventCount"], ["eventName"], limit=20)
    events = {row[0]: int(row[1]) for row in parse_rows(r_events, dim_count=1)}
    form_submits = events.get("form_submit", 0) + events.get("generate_lead", 0)

    # 5. Build output
    data = {
        "generated_at": today.isoformat(),
        "period": f"{week_ago.isoformat()} to {today.isoformat()}",
        "this_week": this_week,
        "prev_week": prev_week,
        "changes": {
            "sessions": pct_change(this_week["sessions"], prev_week["sessions"]),
            "users": pct_change(this_week["users"], prev_week["users"]),
            "pageviews": pct_change(this_week["pageviews"], prev_week["pageviews"]),
        },
        "top_pages": top_pages,
        "top_sources": top_sources,
        "form_submits_week": form_submits,
        "events": events,
    }

    DATA_DIR.mkdir(exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Saved to {OUTPUT_FILE}")

    # Build Telegram message
    sess_icon = "UP" if this_week["sessions"] >= prev_week["sessions"] else "DOWN"
    lines = [
        "<b>Tokyo Expat - GA4 Weekly</b>",
        f"Period: {week_ago.strftime('%d %b')} - {today.strftime('%d %b')}",
        "",
        f"Sessions: <b>{this_week['sessions']}</b> ({data['changes']['sessions']}) {sess_icon}",
        f"Users: <b>{this_week['users']}</b> ({data['changes']['users']})",
        f"Pageviews: <b>{this_week['pageviews']}</b> ({data['changes']['pageviews']})",
        f"Bounce rate: {this_week['bounce_rate']*100:.0f}%",
        "",
        "<b>Top pages:</b>",
    ]
    for page in top_pages[:5]:
        path, views = page[0], page[1]
        short = path[:40] + "..." if len(path) > 40 else path
        lines.append(f"  {short} ({views} views)")

    lines += ["", "<b>Traffic sources:</b>"]
    for src in top_sources:
        lines.append(f"  {src[0]}: {src[1]} sessions")

    if form_submits:
        lines += ["", f"Newsletter signups: <b>{form_submits}</b>"]

    send_telegram("\n".join(lines))
    print("Telegram sent.")
    return data


if __name__ == "__main__":
    main()
