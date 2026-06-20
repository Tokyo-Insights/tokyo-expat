"""
weekly_report.py — Tokyo Expat Command Center
Rapport hebdomadaire consolidé : rankings + nouveaux concurrents + backlinks + actions.
Run: python scripts/weekly_report.py

Dépend de: keyword_tracker.py (DB SQLite doit exister)
"""

import sqlite3
import json
import datetime
import os
import sys
import io
import requests
import urllib3
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

# ── CONFIG ────────────────────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
DB_FILE = DATA_DIR / "keyword_rankings.db"
CACHE_FILE = DATA_DIR / "competitor_cache.json"

TELEGRAM_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "8717213663:AAGCYEOgylg2c8ew7JLi83NRu1pcTSTWOcs")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "6474251868")

OUR_DOMAIN = "tokyo-expat.com"
COMPETITOR_DOMAINS = ["remoters.io", "housing.gaijinpot.com", "sakura-house.com", "tokyocheapo.com"]

# ── HELPERS ───────────────────────────────────────────────────────────────────

def send_telegram(msg: str, split_at: int = 4000) -> None:
    """Envoie un message Telegram (gère les messages longs)."""
    parts = [msg[i:i+split_at] for i in range(0, len(msg), split_at)]
    for part in parts:
        try:
            requests.post(
                f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
                json={"chat_id": TELEGRAM_CHAT_ID, "text": part, "parse_mode": "HTML"},
                timeout=10,
                verify=VERIFY_SSL,
            )
        except Exception as e:
            print(f"Telegram error: {e}")


def trend_arrow(current: int, previous: int) -> str:
    if not previous or not current:
        return ""
    diff = previous - current
    if diff > 0:
        return f" ↑{diff}"
    elif diff < 0:
        return f" ↓{abs(diff)}"
    return " ="

# ── KEYWORD ANALYSIS ──────────────────────────────────────────────────────────

def keyword_section(conn) -> str:
    today = datetime.date.today().isoformat()
    week_ago = (datetime.date.today() - datetime.timedelta(days=7)).isoformat()

    # Positions actuelles
    current = dict(conn.execute(
        "SELECT keyword, position FROM rankings WHERE domain=? AND date=? AND position>0",
        (OUR_DOMAIN, today)
    ).fetchall())

    # Positions il y a 7 jours
    prev = dict(conn.execute(
        """SELECT keyword, MIN(position) FROM rankings
           WHERE domain=? AND date>=? AND date<? AND position>0
           GROUP BY keyword""",
        (OUR_DOMAIN, week_ago, today)
    ).fetchall())

    if not current:
        return "⚠️ Aucun tracking keywords cette semaine."

    ranked = sorted(current.items(), key=lambda x: x[1])
    top10 = [kw for kw, pos in ranked if pos <= 10]
    top20 = [kw for kw, pos in ranked if 11 <= pos <= 20]
    no_rank = conn.execute(
        "SELECT COUNT(DISTINCT keyword) FROM rankings WHERE domain=? AND date=? AND position=0",
        (OUR_DOMAIN, today)
    ).fetchone()[0]

    lines = [
        f"\n🎯 <b>NOS RANKINGS</b>\n",
        f"• Top 10: {len(top10)} keywords",
        f"• Top 20: {len(top20)} keywords",
        f"• Non rankés: {no_rank}\n",
    ]

    if top10:
        lines.append("<b>Top 10:</b>")
        for kw, pos in ranked[:10]:
            lines.append(f"  #{pos}{trend_arrow(pos, prev.get(kw,0))} {kw}")

    # Gains de la semaine
    gains = []
    for kw, pos in current.items():
        p = prev.get(kw, 0)
        if p and pos and p - pos > 2:
            gains.append((p - pos, kw, p, pos))
    gains.sort(reverse=True)
    if gains:
        lines.append("\n<b>Meilleurs gains:</b>")
        for diff, kw, old, new in gains[:5]:
            lines.append(f"  ↑{diff} {kw} ({old}→{new})")

    return "\n".join(lines)

# ── COMPETITOR ANALYSIS ───────────────────────────────────────────────────────

def competitor_section(conn) -> str:
    today = datetime.date.today().isoformat()

    lines = ["\n⚔️ <b>CONCURRENTS</b>\n"]

    # Sur nos top keywords, où sont-ils ?
    high_priority_kws = [
        "find apartment tokyo foreigner",
        "property hunter tokyo",
        "share house tokyo guide",
        "chasseur immobilier tokyo",
        "trouver appartement tokyo etranger",
    ]

    for kw in high_priority_kws:
        our = conn.execute(
            "SELECT position FROM rankings WHERE domain=? AND keyword=? AND date=? AND position>0",
            (OUR_DOMAIN, kw, today)
        ).fetchone()
        our_str = f"#{our[0]}" if our else "—"

        comp_parts = []
        for dom in COMPETITOR_DOMAINS:
            c = conn.execute(
                "SELECT position FROM rankings WHERE domain=? AND keyword=? AND date=? AND position>0",
                (dom, kw, today)
            ).fetchone()
            if c:
                comp_parts.append(f"{dom.split('.')[0]}:#{c[0]}")

        comp_str = " | ".join(comp_parts) if comp_parts else "aucun"
        lines.append(f"<i>{kw[:35]}</i>\n  TE:{our_str} | {comp_str}")

    return "\n".join(lines)

# ── COMPETITOR NEW CONTENT ────────────────────────────────────────────────────

def new_content_section() -> str:
    if not CACHE_FILE.exists():
        return "\n📰 <b>NOUVEAU CONTENU CONCURRENT</b>\nAucun scan effectué cette semaine."

    with open(CACHE_FILE, encoding="utf-8") as f:
        cache = json.load(f)

    lines = ["\n📰 <b>NOUVEAU CONTENU (7j)</b>"]

    week_ago = datetime.datetime.now() - datetime.timedelta(days=7)

    # Compter les nouveaux par concurrent
    # (On compare la date du dernier scan — simplifié)
    total_urls = sum(len(v) for k, v in cache.items() if k.startswith("urls_"))
    lines.append(f"Total URLs trackées: {total_urls}")

    return "\n".join(lines)

# ── ACTIONS SUGGÉRÉES ─────────────────────────────────────────────────────────

def actions_section(conn) -> str:
    today = datetime.date.today().isoformat()

    lines = ["\n📋 <b>ACTIONS PRIORITAIRES</b>\n"]

    # Keywords à fort potentiel non encore rankés
    unranked_high = conn.execute(
        """SELECT keyword FROM rankings
           WHERE domain=? AND date=? AND position=0
           AND keyword IN (
               'find apartment tokyo foreigner',
               'property hunter tokyo',
               'chasseur immobilier tokyo',
               'tokyo expat housing',
               'share house tokyo guide'
           )""",
        (OUR_DOMAIN, today)
    ).fetchall()

    if unranked_high:
        lines.append("<b>🔴 Keywords prioritaires non rankés → créer contenu :</b>")
        for (kw,) in unranked_high:
            lines.append(f"  • {kw}")

    # Positions 11-20 (à optimiser pour entrer top 10)
    almost_top10 = conn.execute(
        "SELECT keyword, position FROM rankings WHERE domain=? AND date=? AND position BETWEEN 11 AND 20",
        (OUR_DOMAIN, today)
    ).fetchall()

    if almost_top10:
        lines.append("\n<b>🟡 Top 11-20 → optimiser pour top 10 :</b>")
        for kw, pos in almost_top10[:5]:
            lines.append(f"  • #{pos} {kw}")

    lines.append("\n<b>⚡ Actions rapides :</b>")
    lines.append("  • Vérifier Search Console → requêtes avec clics nuls")
    lines.append("  • Ajouter 1-2 liens internes depuis articles existants")
    lines.append("  • Contacter 2 sites depuis liste backlink_spy CSV")

    return "\n".join(lines)

# ── SITE STATS ────────────────────────────────────────────────────────────────

def stats_section(conn) -> str:
    today = datetime.date.today().isoformat()

    total_kws = conn.execute("SELECT COUNT(DISTINCT keyword) FROM rankings WHERE date=?", (today,)).fetchone()[0]
    our_ranked = conn.execute(
        "SELECT COUNT(*) FROM rankings WHERE domain=? AND date=? AND position>0",
        (OUR_DOMAIN, today)
    ).fetchone()[0]

    lines = [
        f"\n📈 <b>STATS SEMAINE</b>",
        f"  Keywords trackés: {total_kws}",
        f"  Nos positions trouvées: {our_ranked}",
        f"  Date: {today}",
    ]
    return "\n".join(lines)

# ── MAIN ──────────────────────────────────────────────────────────────────────

def main():
    print(f"\n{'='*60}")
    print(f"WEEKLY REPORT — {datetime.date.today()}")
    print(f"{'='*60}")

    if not DB_FILE.exists():
        msg = f"⚠️ <b>WEEKLY REPORT</b> — {datetime.date.today()}\n\nAucune donnée keyword disponible. Lance d'abord:\n<code>python scripts/keyword_tracker.py</code>"
        send_telegram(msg)
        print("No DB found. Run keyword_tracker.py first.")
        return

    conn = sqlite3.connect(DB_FILE)

    sections = [
        f"🏠 <b>TOKYO EXPAT — RAPPORT HEBDO</b>\n{datetime.date.today().strftime('%A %d %B %Y')}\n{'─'*40}",
        keyword_section(conn),
        competitor_section(conn),
        new_content_section(),
        actions_section(conn),
        stats_section(conn),
        "\n─────────────────────────\n<a href='https://www.tokyo-expat.com'>tokyo-expat.com</a> | <a href='https://analytics.google.com'>GA4</a> | <a href='https://search.google.com/search-console'>Search Console</a>",
    ]

    full_report = "\n".join(sections)
    send_telegram(full_report)
    print("✅ Weekly report sent to Telegram")
    conn.close()


if __name__ == "__main__":
    main()
