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


def get_competitor_radar(state: dict) -> list[dict]:
    """Nouvelles menaces detectees par competitor_radar.py (score >= 30)."""
    radar = load_json(DATA_DIR / "competitor_radar_state.json", {})
    actioned = set(state.get("actioned_threats", []))
    threats = []
    for domain, info in radar.get("threats", {}).items():
        if domain in actioned:
            continue
        score = info.get("score", 0)
        if score >= 30:
            threats.append({
                "domain": domain,
                "score": score,
                "keywords": info.get("keywords", [])[:3],
                "key": domain,
            })
    return sorted(threats, key=lambda x: -x["score"])[:2]


def get_influencer_opps(state: dict) -> list[dict]:
    """Top influenceurs non encore pitches (score >= 40)."""
    inf_data = load_json(DATA_DIR / "influencer_targets.json", {"targets": [], "pitched": []})
    pitched = set(inf_data.get("pitched", []))
    actioned = set(state.get("actioned_influencers", []))
    targets = [
        t for t in inf_data.get("targets", [])
        if t.get("url", "") not in pitched
        and t.get("url", "") not in actioned
        and t.get("score", 0) >= 40
    ]
    return sorted(targets, key=lambda x: -x.get("score", 0))[:2]


def get_buffer_queue_status() -> dict:
    """Statut des queues de posts Facebook + LinkedIn."""
    result = {}
    for platform, fname in [("fb", "content_queue_fb.json"), ("li", "content_queue_li.json")]:
        data = load_json(DATA_DIR / fname, {})
        if not data.get("queue"):
            continue
        total = data.get("total", len(data["queue"]))
        posted = data.get("posted_count", sum(1 for i in data["queue"] if i.get("posted")))
        result[platform] = {"remaining": total - posted, "total": total}
    return result


def get_pending_actions(n: int = 5) -> list[dict]:
    """Opportunites HARO + Reddit non encore actionnees (pour analyse avec Claude)."""
    data = load_json(DATA_DIR / "pending_actions.json", {"actions": []})
    pending = [a for a in data.get("actions", []) if not a.get("acted")]
    pending.sort(key=lambda x: x.get("date", ""), reverse=True)
    return pending[:n]


def get_quora_pending(state: dict) -> list[dict]:
    """Questions Quora avec drafts prets a coller-coller."""
    quora = load_json(DATA_DIR / "quora_answered.json", {"pending": []})
    actioned = set(state.get("actioned_quora", []))
    return [
        q for q in quora.get("pending", [])
        if q.get("url", "") not in actioned
    ][:3]


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
    ga4_data = load_json(DATA_DIR / "ga4_latest.json", {})

    # Calculer toutes les sections
    seasonal = get_seasonal_urgencies(today, state.get("dismissed_seasonal", []))
    outreach = get_outreach_targets(contacts_data, n=3)
    gaps = get_content_gaps(gaps_data, state, n=2)
    vulns = get_vulnerability_alerts(vuln_data, state)
    broken_count = get_broken_link_summary(broken_cache)
    radar_threats = get_competitor_radar(state)
    influencer_opps = get_influencer_opps(state)
    quora_pending = get_quora_pending(state)

    # Construire le message Telegram
    action_num = 1
    lines = [
        f"<b>LUNDI BRIEFING</b> — {today.strftime('%d %b %Y')}",
        f"Tes priorites de la semaine :\n",
    ]

    # 0. GA4 stats (toujours en tete)
    if ga4_data:
        tw = ga4_data.get("this_week", {})
        ch = ga4_data.get("changes", {})
        period = ga4_data.get("period", "")
        sess_arrow = "UP" if "+" in ch.get("sessions", "+0%") else "DOWN"
        lines.append(
            f"<b>Analytics ({period}):</b>\n"
            f"   Sessions: {tw.get('sessions', 0)} ({ch.get('sessions', '?')}) {sess_arrow} | "
            f"Users: {tw.get('users', 0)} ({ch.get('users', '?')}) | "
            f"Pages vues: {tw.get('pageviews', 0)}"
        )
        top = ga4_data.get("top_pages", [])
        if top:
            top_str = " | ".join(f"{p[0].split('/')[-1] or 'home'}({p[1]})" for p in top[:3])
            lines.append(f"   Top pages: {top_str}")
        signups = ga4_data.get("form_submits_week", 0)
        if signups:
            lines.append(f"   Newsletter signups: {signups}")
        lines.append("")

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

    # 6. Competitor radar (nouveaux concurrents)
    for t in radar_threats:
        kw_str = ", ".join(t["keywords"]) if t["keywords"] else "SERP generique"
        lines.append(
            f"🎯 <b>{action_num}. NOUVEAU CONCURRENT</b> [{t['score']}/100] {t['domain']}\n"
            f"   Keywords : {kw_str}\n"
            f"   Action : renforcer nos articles sur ces keywords maintenant.\n"
            f"   Dismiss : <code>monday_briefing.py --dismiss-threat \"{t['domain']}\"</code>"
        )
        action_num += 1

    # 7. Influenceurs a pitcher
    for inf in influencer_opps:
        platform = inf.get("platform", "?")
        score = inf.get("score", 0)
        title = inf.get("title", "")[:50]
        url = inf.get("url", "")
        lines.append(
            f"🎤 <b>{action_num}. INFLUENCEUR</b> [{platform}, {score}/100]\n"
            f"   {title}\n"
            f"   Pitch : <code>python scripts/influencer_finder.py --email {url[:60]}</code>\n"
            f"   Envoyer le pitch personnellement (email direct, pas automatise).\n"
            f"   Dismiss : <code>monday_briefing.py --dismiss-influencer \"{url[:60]}\"</code>"
        )
        action_num += 1

    # 8. Quora -- copier-coller les drafts
    if quora_pending:
        lines.append(
            f"💬 <b>{action_num}. QUORA</b> -- {len(quora_pending)} reponse(s) a coller\n"
            f"   Copier depuis scripts/data/quora_answered.json -> coller sur Quora\n"
            f"   Regle : ZERO lien dans la reponse, lien uniquement dans la bio.\n"
            + "\n".join(f"   • {q.get('title', '')[:60]}" for q in quora_pending[:3])
        )
        action_num += 1

    # 9. Buffer queue status
    queue_status = get_buffer_queue_status()
    if queue_status:
        fb_r = queue_status.get("fb", {}).get("remaining", 0)
        fb_t = queue_status.get("fb", {}).get("total", 0)
        li_r = queue_status.get("li", {}).get("remaining", 0)
        li_t = queue_status.get("li", {}).get("total", 0)
        fb_weeks = fb_r
        status_icon = "🟢" if fb_r > 10 else ("🟡" if fb_r > 3 else "🔴")
        lines.append(
            f"{status_icon} <b>BUFFER QUEUE</b>\n"
            f"   FB: {fb_r}/{fb_t} posts restants (~{fb_weeks} semaines)\n"
            f"   LI: {li_r}/{li_t} posts restants\n"
            f"   <i>Regenerer si < 5 restants : python scripts/generate_content_queue.py</i>"
        )

    # 10. HARO / Reddit en attente d analyse
    pending = get_pending_actions(n=5)
    if pending:
        haro_items = [p for p in pending if p.get("type") == "haro"]
        reddit_items = [p for p in pending if p.get("type") == "reddit"]
        lines.append(f"\n<b>ACTIONS EN ATTENTE (non actionnees) :</b>")
        for p in haro_items[:3]:
            lines.append(
                f"📰 <b>HARO</b> [{p.get('date', '?')}] {p.get('source', '?')}\n"
                f"   {p.get('query', '')[:120]}\n"
                f"   <i>Dis a Claude 'analyse les HARO' pour rediger la reponse</i>"
            )
        for p in reddit_items[:2]:
            lines.append(
                f"💬 <b>Reddit</b> r/{p.get('subreddit', '?')} [{p.get('date', '?')}]\n"
                f"   {p.get('title', '')[:100]}\n"
                f"   <i>Dis a Claude 'aide-moi a repondre' pour le draft</i>"
            )

    # Footer
    lines.append(
        f"\n<b>Commandes utiles :</b>\n"
        f"• Email envoye : <code>python scripts/outreach_tracker.py --update DOMAIN emailed</code>\n"
        f"• Email auto : <code>python scripts/email_sender.py --preview</code>\n"
        f"• Dismiss article : <code>python scripts/monday_briefing.py --dismiss-seasonal \"nom\"</code>\n"
        f"• Dismiss gap : <code>python scripts/monday_briefing.py --dismiss \"topic\"</code>\n"
        f"• Dismiss vuln : <code>python scripts/monday_briefing.py --dismiss-vuln \"comp:keyword\"</code>\n"
        f"• Dismiss threat : <code>python scripts/monday_briefing.py --dismiss-threat \"domain\"</code>\n"
        f"• Dismiss influenceur : <code>python scripts/monday_briefing.py --dismiss-influencer \"url\"</code>\n"
        f"• Quora done : <code>python scripts/monday_briefing.py --dismiss-quora \"url\"</code>"
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
    elif "--dismiss-threat" in args:
        idx = args.index("--dismiss-threat")
        if idx + 1 < len(args):
            s = load_json(STATE_FILE, {"actioned_threats": []})
            key = args[idx + 1]
            s.setdefault("actioned_threats", [])
            if key not in s["actioned_threats"]:
                s["actioned_threats"].append(key)
                save_state(s)
            print(f"Threat dismissed: {key}")
        else:
            print("Usage: --dismiss-threat \"domain\"")
    elif "--dismiss-influencer" in args:
        idx = args.index("--dismiss-influencer")
        if idx + 1 < len(args):
            s = load_json(STATE_FILE, {"actioned_influencers": []})
            key = args[idx + 1]
            s.setdefault("actioned_influencers", [])
            if key not in s["actioned_influencers"]:
                s["actioned_influencers"].append(key)
                save_state(s)
            print(f"Influenceur dismissed: {key}")
        else:
            print("Usage: --dismiss-influencer \"url\"")
    elif "--thursday" in args:
        # Briefing jeudi : leger, 2 sections seulement
        today = datetime.date.today()
        queue_status = get_buffer_queue_status()
        pending = get_pending_actions(n=5)
        lines = [
            f"<b>JEUDI CHECK</b> -- {today.strftime('%d %b %Y')}",
            "",
        ]
        if queue_status:
            fb_r = queue_status.get("fb", {}).get("remaining", 0)
            li_r = queue_status.get("li", {}).get("remaining", 0)
            icon = "🟢" if fb_r > 10 else ("🟡" if fb_r > 3 else "🔴")
            lines.append(f"{icon} <b>Buffer queue</b> : {fb_r} posts FB, {li_r} posts LI restants")
        else:
            lines.append("Buffer queue : non generee (python scripts/generate_content_queue.py)")
        if pending:
            haro_items = [p for p in pending if p.get("type") == "haro"]
            reddit_items = [p for p in pending if p.get("type") == "reddit"]
            if haro_items or reddit_items:
                lines.append(f"\n<b>{len(pending)} action(s) en attente :</b>")
                for p in haro_items[:3]:
                    lines.append(f"📰 HARO [{p.get('date')}] {p.get('query', '')[:100]}")
                for p in reddit_items[:2]:
                    lines.append(f"💬 Reddit r/{p.get('subreddit')} [{p.get('date')}] {p.get('title', '')[:80]}")
                lines.append("<i>Dis a Claude 'analyse les pendants' pour travailler dessus</i>")
            else:
                lines.append("Aucune action HARO/Reddit en attente.")
        else:
            lines.append("Aucune action HARO/Reddit en attente.")
        msg = "\n".join(lines)
        send_telegram(msg)
        print(msg)
    elif "--dismiss-quora" in args:
        idx = args.index("--dismiss-quora")
        if idx + 1 < len(args):
            s = load_json(STATE_FILE, {"actioned_quora": []})
            key = args[idx + 1]
            s.setdefault("actioned_quora", [])
            if key not in s["actioned_quora"]:
                s["actioned_quora"].append(key)
                save_state(s)
            print(f"Quora answered dismissed: {key}")
        else:
            print("Usage: --dismiss-quora \"url\"")
    else:
        main()
