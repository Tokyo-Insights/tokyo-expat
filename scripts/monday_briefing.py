"""
monday_briefing.py -- Tokyo Expat Monday Morning Briefing
Consolide TOUTES les alertes de la semaine en un seul message Telegram.
Format : 5-7 actions priorisees, tirees de tous les scripts.

Run: python scripts/monday_briefing.py
"""

import json
import datetime
import sys
import io
import requests
import urllib3
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
STATE_FILE = DATA_DIR / "briefing_state.json"

# ── Seasonal calendar (copie locale, plus rapide que reimporter) ──────────────

RELOCATION_PEAKS = [
    {"month": 2,  "day": 1,  "name": "Annonces mutations pro",     "urgency": "high",
     "article": "Guide logement Tokyo pour mutation pro (arrivee en 2 semaines)"},
    {"month": 3,  "day": 15, "name": "Pic demenagements mars",     "urgency": "high",
     "article": "Checklist demenagement Tokyo J-30 a J+7"},
    {"month": 4,  "day": 1,  "name": "Debut annee fiscale JP",     "urgency": "medium",
     "article": "S installer a Tokyo en avril : guide semaine par semaine"},
    {"month": 7,  "day": 15, "name": "Pre-rentree universitaire",  "urgency": "high",
     "article": "Logement etudiant Tokyo pour octobre : share house vs dortoir"},
    {"month": 9,  "day": 1,  "name": "Rentree universitaire",      "urgency": "medium",
     "article": "Trouver un appartement Tokyo en septembre"},
    {"month": 10, "day": 1,  "name": "Pic Q4 expats",              "urgency": "medium",
     "article": "Appartement meuble Tokyo pour expatries arrives rapidement"},
    {"month": 12, "day": 15, "name": "Planification Noel/Nouvel An","urgency": "high",
     "article": "Guide complet s expatrier a Tokyo : tout ce qu il faut savoir"},
]

PUBLISH_WINDOW_WEEKS = 7
ALERT_THRESHOLD_DAYS = 70


def load_json(path: Path, default=None):
    if path.exists():
        try:
            with open(path, encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return default if default is not None else {}


def save_state(state: dict) -> None:
    DATA_DIR.mkdir(exist_ok=True)
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2, ensure_ascii=False)


def next_occurrence(month: int, day: int, today: datetime.date) -> datetime.date:
    try:
        c = datetime.date(today.year, month, day)
    except ValueError:
        c = datetime.date(today.year, month, 28)
    if c <= today:
        try:
            c = datetime.date(today.year + 1, month, day)
        except ValueError:
            c = datetime.date(today.year + 1, month, 28)
    return c


def get_seasonal_urgencies(today: datetime.date, dismissed_seasonal: list | None = None) -> list[dict]:
    """Retourne les alertes saisonnieres actives (deadline dans < 70 jours)."""
    dismissed = set(dismissed_seasonal or [])
    urgent = []
    for peak in RELOCATION_PEAKS:
        if peak["name"] in dismissed:
            continue
        peak_date = next_occurrence(peak["month"], peak["day"], today)
        publish_deadline = peak_date - datetime.timedelta(weeks=PUBLISH_WINDOW_WEEKS)
        days_to_deadline = (publish_deadline - today).days
        days_to_peak = (peak_date - today).days

        if days_to_peak <= 0:
            continue
        if days_to_deadline <= ALERT_THRESHOLD_DAYS:
            is_overdue = days_to_deadline < 0
            urgent.append({
                "name": peak["name"],
                "article": peak["article"],
                "urgency": peak["urgency"],
                "publish_deadline": publish_deadline.isoformat(),
                "days_to_deadline": days_to_deadline,
                "is_overdue": is_overdue,
            })
    return sorted(urgent, key=lambda x: x["days_to_deadline"])


def get_outreach_targets(contacts_data: list, n: int = 3) -> list[dict]:
    """Top N contacts a contacter cette semaine (to_contact uniquement, tries par priorite)."""
    PRIORITY_ORDER = {"high": 0, "medium": 1, "low": 2}
    eligible = [c for c in contacts_data if c.get("status", "to_contact") == "to_contact"]
    eligible.sort(key=lambda x: (PRIORITY_ORDER.get(x.get("priority", "low"), 2), -x.get("da_est", 0)))
    return eligible[:n]


def get_content_gaps(gaps_data: dict, state: dict, n: int = 2) -> list[dict]:
    """Top N content gaps non deja signales ni dismisses."""
    dismissed = set(state.get("dismissed_gaps", []))
    gaps = []

    for source, items in gaps_data.items():
        if not isinstance(items, list):
            continue
        for item in items:
            topic = item.get("topic") or item.get("title") or str(item)
            if topic in dismissed:
                continue
            gaps.append({
                "topic": topic,
                "source": source,
                "url": item.get("url", ""),
            })

    return gaps[:n]


def get_vulnerability_alerts(vuln_data: dict, state: dict) -> list[dict]:
    """Retourne les vulnerabilites concurrentes non encore actionnees."""
    actioned = set(state.get("actioned_vulns", []))
    alerts = []

    for comp, details in vuln_data.items():
        if not isinstance(details, dict):
            continue
        drops = details.get("drops", [])
        for drop in drops:
            key = f"{comp}:{drop.get('keyword', '')}"
            if key not in actioned:
                alerts.append({
                    "competitor": comp,
                    "keyword": drop.get("keyword", ""),
                    "from_pos": drop.get("from_pos", 0),
                    "to_pos": drop.get("to_pos", 0),
                    "key": key,
                })
    return alerts[:2]


def get_broken_link_summary(broken_cache: dict) -> int:
    """Nombre total de pages 404 trouvees et reportees."""
    return len(broken_cache.get("reported", []))


def send_telegram(msg: str) -> None:
    try:
        requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
            json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10, verify=VERIFY_SSL,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def main():
    today = datetime.date.today()
    print(f"\n{'='*60}")
    print(f"MONDAY BRIEFING -- {today}")
    print(f"{'='*60}\n")

    state = load_json(STATE_FILE, {"dismissed_gaps": [], "actioned_vulns": [], "last_run": ""})

    # Charger tous les fichiers de donnees
    contacts_data = load_json(DATA_DIR / "outreach_contacts.json", [])
    gaps_data = load_json(DATA_DIR / "content_gaps.json", {})
    vuln_data = load_json(DATA_DIR / "vulnerabilities.json", {})
    broken_cache = load_json(DATA_DIR / "broken_links_cache.json", {})

    # Calculer toutes les sections
    seasonal = get_seasonal_urgencies(today, state.get("dismissed_seasonal", []))
    outreach = get_outreach_targets(contacts_data, n=3)
    gaps = get_content_gaps(gaps_data, state, n=2)
    vulns = get_vulnerability_alerts(vuln_data, state)
    broken_count = get_broken_link_summary(broken_cache)

    # Construire le message Telegram
    action_num = 1
    lines = [
        f"<b>LUNDI BRIEFING</b> — {today.strftime('%d %b %Y')}",
        f"Tes priorites de la semaine :\n",
    ]

    # 1. Alertes saisonnieres urgentes (max 2)
    for s in seasonal[:2]:
        overdue_tag = " <b>OVERDUE</b>" if s["is_overdue"] else ""
        days_str = f"deadline dans {s['days_to_deadline']}j" if s["days_to_deadline"] >= 0 else f"deadline depassee de {abs(s['days_to_deadline'])}j"
        emoji = "🔴" if s["urgency"] == "high" or s["is_overdue"] else "🟡"
        lines.append(
            f"{emoji} <b>{action_num}. ARTICLE URGENT{overdue_tag}</b> ({days_str})\n"
            f"   {s['article']}"
        )
        action_num += 1

    # 2. Outreach emails (max 3)
    if outreach:
        names = ", ".join(c.get("name", c.get("domain", "?")) for c in outreach)
        lines.append(
            f"📧 <b>{action_num}. OUTREACH — 2-3 emails cette semaine</b>\n"
            f"   Cibles : {names}\n"
            f"   <i>python scripts/outreach_tracker.py --email DOMAIN</i>"
        )
        action_num += 1

    # 3. Backlinks Ahrefs manuels
    if broken_count > 0:
        lines.append(
            f"🔴 <b>{action_num}. BROKEN LINKS — {broken_count} pages mortes repertoriees</b>\n"
            f"   Ouvre Ahrefs (gratuit) pour chaque URL dans scripts/data/dead_pages_manual_check_*.csv\n"
            f"   Identifie qui linke les pages mortes et envoie le pitch de remplacement."
        )
        action_num += 1

    # 4. Vulnerabilites concurrentes
    for v in vulns:
        lines.append(
            f"⚡ <b>{action_num}. VULN CONCURRENT</b> — {v['competitor']}\n"
            f"   Drop #{v['from_pos']} -> #{v['to_pos']} sur <i>{v['keyword']}</i>\n"
            f"   Action : publier/booster notre article sur ce keyword maintenant."
        )
        action_num += 1

    # 5. Content gaps
    for g in gaps:
        lines.append(
            f"📝 <b>{action_num}. CONTENT GAP</b> via {g['source']}\n"
            f"   Sujet : {g['topic'][:80]}"
        )
        action_num += 1

    # Footer
    lines.append(
        f"\n<b>Commandes utiles :</b>\n"
        f"• Email envoye : <code>python scripts/outreach_tracker.py --update DOMAIN emailed</code>\n"
        f"• Dismiss article : <code>python scripts/monday_briefing.py --dismiss-seasonal \"nom\"</code>\n"
        f"• Dismiss gap : <code>python scripts/monday_briefing.py --dismiss \"topic\"</code>\n"
        f"• Dismiss vuln : <code>python scripts/monday_briefing.py --dismiss-vuln \"comp:keyword\"</code>"
    )

    msg = "\n".join(lines)
    send_telegram(msg)
    print(msg)
    print("\nTelegram envoye.")

    state["last_run"] = today.isoformat()
    save_state(state)


def handle_dismiss(topic: str):
    """Ajoute un topic dans dismissed_gaps pour ne plus l alerter."""
    state = load_json(STATE_FILE, {"dismissed_gaps": [], "actioned_vulns": [], "last_run": ""})
    if topic not in state["dismissed_gaps"]:
        state["dismissed_gaps"].append(topic)
        save_state(state)
        print(f"Gap dismissed: {topic}")
    else:
        print(f"Deja dismissed: {topic}")


def handle_dismiss_vuln(key: str):
    """Marque une vulnerabilite comme actionnee."""
    state = load_json(STATE_FILE, {"dismissed_gaps": [], "actioned_vulns": [], "last_run": ""})
    if key not in state["actioned_vulns"]:
        state["actioned_vulns"].append(key)
        save_state(state)
        print(f"Vuln actionnee: {key}")
    else:
        print(f"Deja actionnee: {key}")


if __name__ == "__main__":
    import sys as _sys
    args = _sys.argv[1:]
    if "--dismiss" in args:
        idx = args.index("--dismiss")
        if idx + 1 < len(args):
            handle_dismiss(args[idx + 1])
        else:
            print("Usage: --dismiss \"topic\"")
    elif "--dismiss-seasonal" in args:
        idx = args.index("--dismiss-seasonal")
        if idx + 1 < len(args):
            state = load_json(STATE_FILE, {"dismissed_gaps": [], "actioned_vulns": [], "dismissed_seasonal": [], "last_run": ""})
            name = args[idx + 1]
            if name not in state.setdefault("dismissed_seasonal", []):
                state["dismissed_seasonal"].append(name)
                save_state(state)
                print(f"Seasonal dismissed: {name}")
            else:
                print(f"Deja dismissed: {name}")
        else:
            print("Usage: --dismiss-seasonal \"nom du pic\"")
    elif "--dismiss-vuln" in args:
        idx = args.index("--dismiss-vuln")
        if idx + 1 < len(args):
            handle_dismiss_vuln(args[idx + 1])
        else:
            print("Usage: --dismiss-vuln \"competitor:keyword\"")
    else:
        main()
