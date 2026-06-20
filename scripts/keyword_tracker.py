"""
keyword_tracker.py — Tokyo Expat SERP Intelligence
Track positions de 30 keywords (FR+EN) via DuckDuckGo.
Stocke l'historique en SQLite. Envoie rapport Telegram hebdo.

Deps: pip install duckduckgo-search
Run: python scripts/keyword_tracker.py [--report]
"""

import sqlite3
import json
import time
import datetime
import sys
import os
import random
from pathlib import Path

try:
    from duckduckgo_search import DDGS
except ImportError:
    print("Install: pip install duckduckgo-search")
    sys.exit(1)

import io
import requests
import urllib3

# Windows UTF-8 console fix
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

# ── CONFIG ────────────────────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
DB_FILE = DATA_DIR / "keyword_rankings.db"

TELEGRAM_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "8717213663:AAGCYEOgylg2c8ew7JLi83NRu1pcTSTWOcs")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "6474251868")

OUR_DOMAIN = "tokyo-expat.com"

# ── COMPETITORS à tracker ─────────────────────────────────────────────────────
COMPETITOR_DOMAINS = [
    "remoters.io",
    "housing.gaijinpot.com",
    "sakura-house.com",
    "tokyocheapo.com",
    "gaijinpot.com",
    "oakhouse.jp",
    "japan-guide.com",
]

# ── 30 KEYWORDS cibles ────────────────────────────────────────────────────────
KEYWORDS = [
    # French — haute intention
    {"kw": "trouver appartement tokyo etranger", "lang": "fr", "priority": "high"},
    {"kw": "chasseur immobilier tokyo", "lang": "fr", "priority": "high"},
    {"kw": "share house tokyo guide", "lang": "fr", "priority": "high"},
    {"kw": "appartement meuble tokyo expatrie", "lang": "fr", "priority": "high"},
    {"kw": "louer tokyo sans garant etranger", "lang": "fr", "priority": "high"},
    {"kw": "logement tokyo expatrie", "lang": "fr", "priority": "medium"},
    {"kw": "installer tokyo francais", "lang": "fr", "priority": "medium"},
    {"kw": "quartiers tokyo expatries", "lang": "fr", "priority": "medium"},
    {"kw": "cout vie tokyo 2026", "lang": "fr", "priority": "medium"},
    {"kw": "garantie loyer japon etranger", "lang": "fr", "priority": "medium"},
    {"kw": "assurance habitation japon locataire", "lang": "fr", "priority": "medium"},
    {"kw": "logement etudiant tokyo", "lang": "fr", "priority": "medium"},
    {"kw": "visa travail japon francophone", "lang": "fr", "priority": "low"},
    {"kw": "ouvrir compte bancaire japon etranger", "lang": "fr", "priority": "low"},
    {"kw": "bail tokyo checklist", "lang": "fr", "priority": "low"},
    # English — haute intention
    {"kw": "find apartment tokyo foreigner", "lang": "en", "priority": "high"},
    {"kw": "property hunter tokyo", "lang": "en", "priority": "high"},
    {"kw": "share house tokyo guide 2026", "lang": "en", "priority": "high"},
    {"kw": "furnished apartment tokyo no guarantor", "lang": "en", "priority": "high"},
    {"kw": "moving to tokyo guide 2026", "lang": "en", "priority": "high"},
    {"kw": "tokyo expat housing", "lang": "en", "priority": "medium"},
    {"kw": "rent tokyo expat 2026", "lang": "en", "priority": "medium"},
    {"kw": "gaijin house tokyo", "lang": "en", "priority": "medium"},
    {"kw": "tokyo neighbourhoods expats guide", "lang": "en", "priority": "medium"},
    {"kw": "student housing tokyo guide", "lang": "en", "priority": "medium"},
    {"kw": "guarantor japan rental foreigner", "lang": "en", "priority": "medium"},
    {"kw": "tokyo rental contract checklist", "lang": "en", "priority": "low"},
    {"kw": "japan health insurance expat", "lang": "en", "priority": "low"},
    {"kw": "open bank account japan foreigner", "lang": "en", "priority": "low"},
    {"kw": "tokyo apartment hunting abroad", "lang": "en", "priority": "low"},
]

# ── DB ────────────────────────────────────────────────────────────────────────

def init_db():
    DATA_DIR.mkdir(exist_ok=True)
    conn = sqlite3.connect(DB_FILE)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS rankings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            keyword TEXT,
            lang TEXT,
            domain TEXT,
            position INTEGER,
            url TEXT
        )
    """)
    conn.execute("CREATE INDEX IF NOT EXISTS idx_date ON rankings(date)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_kw ON rankings(keyword)")
    conn.commit()
    return conn


def save_result(conn, date: str, keyword: str, lang: str, domain: str, position: int, url: str):
    conn.execute(
        "INSERT INTO rankings (date, keyword, lang, domain, position, url) VALUES (?,?,?,?,?,?)",
        (date, keyword, lang, domain, position, url),
    )


def get_previous(conn, domain: str, days: int = 7) -> dict:
    """Récupère les positions d'il y a N jours pour un domaine."""
    past = (datetime.date.today() - datetime.timedelta(days=days)).isoformat()
    rows = conn.execute(
        "SELECT keyword, position FROM rankings WHERE domain=? AND date>=? ORDER BY date ASC",
        (domain, past),
    ).fetchall()
    return {row[0]: row[1] for row in rows}

# ── SERP SEARCH ───────────────────────────────────────────────────────────────

def search_ddg(keyword: str, max_results: int = 20) -> list[dict]:
    """Cherche via DuckDuckGo, retourne liste de {url, title}."""
    results = []
    try:
        with DDGS() as ddgs:
            for r in ddgs.text(keyword, max_results=max_results):
                results.append({"url": r.get("href", ""), "title": r.get("title", "")})
        time.sleep(random.uniform(3, 6))
    except Exception as e:
        print(f"  [WARN] DDG error for '{keyword}': {e}")
        time.sleep(10)
    return results


def find_domain_position(results: list[dict], domain: str) -> tuple[int, str]:
    """Trouve la position d'un domaine dans les résultats."""
    for i, r in enumerate(results, 1):
        if domain in r.get("url", ""):
            return i, r["url"]
    return 0, ""

# ── MAIN TRACKING ─────────────────────────────────────────────────────────────

def run_tracking(conn):
    today = datetime.date.today().isoformat()
    all_domains = [OUR_DOMAIN] + COMPETITOR_DOMAINS
    results_summary = {}

    # Check si déjà tracké aujourd'hui
    already_today = conn.execute(
        "SELECT COUNT(*) FROM rankings WHERE date=? AND domain=?", (today, OUR_DOMAIN)
    ).fetchone()[0]

    if already_today > 0:
        print(f"Already tracked today ({today}). Use --force to override.")
        return

    print(f"\nTracking {len(KEYWORDS)} keywords across {len(all_domains)} domains...")
    print(f"ETA: ~{len(KEYWORDS) * 5 // 60}min {len(KEYWORDS) * 5 % 60}s\n")

    for i, kw_data in enumerate(KEYWORDS, 1):
        kw = kw_data["kw"]
        lang = kw_data["lang"]
        priority = kw_data["priority"]

        print(f"[{i:2d}/{len(KEYWORDS)}] {kw[:50]:<50} ", end="", flush=True)
        results = search_ddg(kw)

        our_pos, our_url = find_domain_position(results, OUR_DOMAIN)
        pos_str = f"#{our_pos}" if our_pos else "—"
        print(f"TE:{pos_str}", end="")

        for domain in all_domains:
            pos, url = find_domain_position(results, domain)
            save_result(conn, today, kw, lang, domain, pos, url)
            if domain != OUR_DOMAIN and pos > 0:
                print(f" | {domain.split('.')[0]}:#{pos}", end="")

        print()
        conn.commit()

    print(f"\n✅ Tracking complete for {today}")

# ── REPORT ────────────────────────────────────────────────────────────────────

def send_telegram(msg: str) -> None:
    try:
        requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
            json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10,
            verify=VERIFY_SSL,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def generate_report(conn):
    """Génère rapport hebdomadaire comparant notre position vs concurrents."""
    today = datetime.date.today().isoformat()
    week_ago = (datetime.date.today() - datetime.timedelta(days=7)).isoformat()

    lines = [f"📊 <b>KEYWORD REPORT</b> — {today}\n"]

    # Nos positions actuelles
    our_current = dict(conn.execute(
        "SELECT keyword, position FROM rankings WHERE domain=? AND date=? AND position>0",
        (OUR_DOMAIN, today)
    ).fetchall())

    our_prev = dict(conn.execute(
        "SELECT keyword, position FROM rankings WHERE domain=? AND date>=? AND date<? AND position>0",
        (OUR_DOMAIN, week_ago, today)
    ).fetchall())

    # Top rankings
    if our_current:
        ranked = sorted(our_current.items(), key=lambda x: x[1])
        lines.append(f"<b>Nos positions ({len(ranked)} keywords rankés):</b>")
        for kw, pos in ranked[:10]:
            prev = our_prev.get(kw, 0)
            trend = ""
            if prev and prev != pos:
                diff = prev - pos
                trend = f" (↑{diff})" if diff > 0 else f" (↓{abs(diff)})"
            lines.append(f"  #{pos}{trend} — {kw[:45]}")
    else:
        lines.append("Aucune position trouvée aujourd'hui.")

    # Concurrents sur nos keywords high priority
    high_priority = [k["kw"] for k in KEYWORDS if k["priority"] == "high"]
    lines.append(f"\n<b>Concurrents sur keywords prioritaires:</b>")

    for kw in high_priority[:5]:
        our_pos = our_current.get(kw, 0)
        our_str = f"#{our_pos}" if our_pos else "—"
        comp_positions = []
        for domain in COMPETITOR_DOMAINS:
            pos = conn.execute(
                "SELECT position FROM rankings WHERE domain=? AND keyword=? AND date=? AND position>0",
                (domain, kw, today)
            ).fetchone()
            if pos:
                comp_positions.append(f"{domain.split('.')[0]}:#{pos[0]}")
        comp_str = ", ".join(comp_positions[:3]) if comp_positions else "non rankés"
        lines.append(f"  <i>{kw[:40]}</i>\n  TE:{our_str} | {comp_str}")

    lines.append(f"\n<a href='https://search.google.com/search-console'>→ Search Console</a>")

    send_telegram("\n".join(lines))
    print("\n✅ Weekly report sent to Telegram")


# ── ENTRYPOINT ────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    report_only = "--report" in sys.argv
    force = "--force" in sys.argv

    conn = init_db()

    if report_only:
        generate_report(conn)
    else:
        if force:
            today = datetime.date.today().isoformat()
            conn.execute("DELETE FROM rankings WHERE date=?", (today,))
            conn.commit()
        run_tracking(conn)
        if "--with-report" in sys.argv:
            generate_report(conn)

    conn.close()
