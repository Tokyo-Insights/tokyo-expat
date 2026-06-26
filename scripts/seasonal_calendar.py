"""
seasonal_calendar.py - Calendrier saisonnier Japan relocation
Detecte les pics de recherche a venir et calcule la fenetre optimale de publication.
Regle : publier 6-8 semaines AVANT le pic.
Run: python scripts/seasonal_calendar.py
"""
import datetime
import json
import re
import sys
import io
import requests
import urllib3
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

from config import TE_TOKEN, TE_CHAT_ID

SCRIPT_DIR = Path(__file__).parent

# Calendrier des pics de recherche Japan/Tokyo relocation
# format: (mois, jour, nom, description, keywords cibles, article suggere)
RELOCATION_PEAKS = [
    {
        "month": 2, "day": 1,
        "name": "Annonces affectations pro",
        "desc": "Les entreprises japonaises annoncent les mutations d'avril. Surge de recherches logement.",
        "keywords": ["appartement tokyo etranger", "logement tokyo mutation", "find apartment tokyo april"],
        "article": "Guide complet : trouver un logement a Tokyo en 2 semaines (pour une mutation pro)",
        "urgency": "high",
    },
    {
        "month": 3, "day": 15,
        "name": "Pic demenagement Mars",
        "desc": "Mois le plus actif de l'annee pour les demenagements au Japon (fin annee fiscale).",
        "keywords": ["demenager tokyo guide", "moving tokyo march", "logement tokyo mars"],
        "article": "Checklist demenagement Tokyo : J-30 a J+7 (tout ce qu'il faut preparer)",
        "urgency": "high",
    },
    {
        "month": 4, "day": 1,
        "name": "Debut annee fiscale",
        "desc": "Nouvel emploi, nouvelle ecole, nouvelle vie. Vague d'arrivees a Tokyo.",
        "keywords": ["install tokyo avril", "nouveau travail tokyo logement", "start job tokyo housing"],
        "article": "S'installer a Tokyo en avril : guide pratique semaine par semaine",
        "urgency": "medium",
    },
    {
        "month": 7, "day": 15,
        "name": "Pre-rentree universitaire",
        "desc": "Les etudiants cherchent leur logement pour octobre (rentree JP universities).",
        "keywords": ["logement etudiant tokyo", "student housing tokyo october", "share house etudiant japon"],
        "article": "Logement etudiant a Tokyo pour octobre : share house vs dortoir universitaire",
        "urgency": "high",
    },
    {
        "month": 9, "day": 1,
        "name": "Rentree universitaire",
        "desc": "Second semestre universites, nouvelles embauches automne. 2e vague demenagements.",
        "keywords": ["apartment tokyo september", "move tokyo autumn", "logement tokyo rentree"],
        "article": "Trouver un appartement a Tokyo en septembre : ce qui change vs le printemps",
        "urgency": "medium",
    },
    {
        "month": 10, "day": 1,
        "name": "Pic Q4 expats",
        "desc": "Arrivees de cadres expatries pour le Q4 fiscal international.",
        "keywords": ["furnished apartment tokyo expat", "expat housing tokyo Q4", "appartement meuble tokyo"],
        "article": "Appartement meuble Tokyo : les 5 meilleures options pour expatries arrives rapidement",
        "urgency": "medium",
    },
    {
        "month": 12, "day": 15,
        "name": "Planification Noel/Nouvel An",
        "desc": "Les candidats a l'expatriation planifient leur installation pour janvier-mars.",
        "keywords": ["s installer tokyo 2025", "expatriation tokyo guide", "move to tokyo next year"],
        "article": "Mon guide complet pour s'expatrier a Tokyo : tout ce que j'aurais voulu savoir",
        "urgency": "high",
    },
]

PUBLISH_WINDOW_WEEKS = 7  # fenetre optimale de publication (6-8 semaines avant le pic)
ALERT_THRESHOLD_DAYS = 70  # alerter si pic dans les 70 jours
DEDUP_TTL_DAYS = 7  # re-alerter au max 1x par semaine pour le meme pic

DEDUP_FILE = SCRIPT_DIR / "data" / "alert_dedup.json"
BLOG_TS = SCRIPT_DIR.parent / "lib" / "blog.ts"


def load_dedup() -> dict:
    if DEDUP_FILE.exists():
        try:
            with open(DEDUP_FILE, encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, ValueError):
            pass
    return {}


def save_dedup(seen: dict) -> None:
    DEDUP_FILE.parent.mkdir(exist_ok=True)
    with open(DEDUP_FILE, "w", encoding="utf-8") as f:
        json.dump(seen, f, indent=2, ensure_ascii=False)


def is_fresh_alert(key: str, seen: dict, ttl_days: int = DEDUP_TTL_DAYS) -> bool:
    """True si l'alerte doit etre envoyee (jamais envoyee ou TTL expire)."""
    if key not in seen:
        return True
    entry = seen[key]
    if isinstance(entry, dict) and entry.get("dismissed"):
        return False  # dismissed de facon permanente
    last_sent = entry if isinstance(entry, str) else entry.get("date", "")
    if not last_sent:
        return True
    return (datetime.date.today() - datetime.date.fromisoformat(last_sent)).days >= ttl_days


def article_already_published(keywords: list[str]) -> bool:
    """Verifie si un article couvrant ces keywords existe deja dans blog.ts (slugs uniquement)."""
    if not BLOG_TS.exists():
        return False
    content = BLOG_TS.read_text(encoding="utf-8")
    slugs = [s.lower() for s in re.findall(r"slug:\s*['\"]([^'\"]+)['\"]", content)]
    for kw in keywords:
        phrase = re.sub(r"[\s']+", "-", kw.lower().strip())
        if any(phrase in slug for slug in slugs):
            return True
    return False


def next_occurrence(month: int, day: int, today: datetime.date) -> datetime.date:
    """Calcule la prochaine occurrence d'une date saisonniere."""
    try:
        candidate = datetime.date(today.year, month, day)
    except ValueError:
        candidate = datetime.date(today.year, month, 28)
    if candidate <= today:
        try:
            candidate = datetime.date(today.year + 1, month, day)
        except ValueError:
            candidate = datetime.date(today.year + 1, month, 28)
    return candidate


def get_publish_deadline(peak_date: datetime.date) -> datetime.date:
    return peak_date - datetime.timedelta(weeks=PUBLISH_WINDOW_WEEKS)


def send_telegram(msg: str) -> None:
    try:
        requests.post(
            f"https://api.telegram.org/bot{TE_TOKEN}/sendMessage",
            json={"chat_id": TE_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10, verify=VERIFY_SSL,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def main():
    today = datetime.date.today()
    print(f"\n{'='*60}")
    print(f"SEASONAL CALENDAR - {today}")
    print(f"{'='*60}\n")
    print(f"Regle : publier {PUBLISH_WINDOW_WEEKS} semaines AVANT le pic\n")

    # Calculer toutes les prochaines occurrences
    schedule = []
    for peak in RELOCATION_PEAKS:
        peak_date = next_occurrence(peak["month"], peak["day"], today)
        publish_deadline = get_publish_deadline(peak_date)
        days_to_peak = (peak_date - today).days
        days_to_deadline = (publish_deadline - today).days
        schedule.append({
            **peak,
            "peak_date": peak_date,
            "publish_deadline": publish_deadline,
            "days_to_peak": days_to_peak,
            "days_to_deadline": days_to_deadline,
            "is_urgent": days_to_deadline <= 14,
            "is_window_open": days_to_deadline <= 0 <= days_to_peak,
            "is_overdue": days_to_peak <= 0,
        })

    schedule.sort(key=lambda x: x["peak_date"])

    # Afficher
    alerts = []
    urgent_articles = []

    for s in schedule:
        status = ""
        if s["is_overdue"]:
            status = "[PASSE]"
        elif s["is_window_open"]:
            status = f"[PUBLIER MAINTENANT - {s['days_to_peak']}j restants avant pic]"
        elif s["is_urgent"]:
            status = f"[URGENT - deadline dans {s['days_to_deadline']}j]"
        elif s["days_to_peak"] <= ALERT_THRESHOLD_DAYS:
            status = f"[dans {s['days_to_peak']}j - preparer]"
        else:
            status = f"[dans {s['days_to_peak']}j]"

        print(f"{s['peak_date']} | {s['name']:<30} | Publier avant: {s['publish_deadline']} {status}")
        print(f"   Article : {s['article'][:70]}")
        print()

        if s["is_window_open"] or s["is_urgent"]:
            alerts.append(s)
            urgent_articles.append(s["article"])

    # Telegram: prochains pics
    upcoming = [s for s in schedule if not s["is_overdue"]][:4]
    lines = [
        f"<b>CALENDRIER SAISONNIER</b> - {today}\n",
        "<b>Regle : publier 6-7 semaines AVANT le pic</b>\n",
        "<b>Prochains pics :</b>",
    ]
    for s in upcoming:
        emoji = "🔴" if (s["is_window_open"] or s["is_urgent"]) else ("🟡" if s["days_to_peak"] <= 60 else "🟢")
        days_info = f"{s['days_to_peak']}j jusqu'au pic"
        if s["days_to_deadline"] > 0:
            days_info += f" | publier dans {s['days_to_deadline']}j max"
        elif s["is_window_open"]:
            days_info += " | PUBLIER MAINTENANT"
        lines.append(
            f"\n{emoji} <b>{s['name']}</b> ({s['peak_date'].strftime('%d %b')})"
            f"\n   {days_info}"
            f"\n   Article : <i>{s['article'][:65]}</i>"
        )

    seen = load_dedup()
    new_alerts = []
    for a in alerts:
        key = f"seasonal:{a['article'][:60].lower().replace(' ', '_')}"
        if article_already_published(a.get("keywords", [])):
            print(f"[SKIP] Article deja publie : {a['article'][:60]}")
            # Marquer comme done de facon permanente
            seen[key] = {"date": datetime.date.today().isoformat(), "dismissed": True}
        elif is_fresh_alert(key, seen):
            new_alerts.append((key, a))
        else:
            print(f"[DEDUP] Deja alerte recemment : {a['article'][:60]}")
    save_dedup(seen)

    if new_alerts:
        lines.append(f"\n<b>ACTIONS IMMEDIATES ({len(new_alerts)} articles a publier) :</b>")
        for key, a in new_alerts:
            lines.append(f"  ECRIRE : {a['article']}")
        # Marquer comme envoyees
        seen = load_dedup()
        for key, _ in new_alerts:
            seen[key] = datetime.date.today().isoformat()
        save_dedup(seen)

    send_telegram("\n".join(lines))
    print(f"Telegram envoye : {len(upcoming)} pics a venir")

    if urgent_articles:
        print(f"\nARTICLES URGENTS A ECRIRE :")
        for art in urgent_articles:
            print(f"  - {art}")


if __name__ == "__main__":
    main()
