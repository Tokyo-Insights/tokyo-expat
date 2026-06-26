"""
content_velocity_tracker.py — Tokyo Expat Intelligence
Lit competitor_cache.json (genere par competitor_watch.py) et calcule
la velocite de publication hebdomadaire par concurrent.
Detecte les accelerations (concurrent qui publie soudainement plus).
Envoie alerte Telegram si un concurrent accelere sa cadence de contenu.

Run: python scripts/content_velocity_tracker.py
Prerequis: competitor_watch.py doit avoir tourne au moins 2 fois
"""

import json
import datetime
import sys
import io
import requests
import urllib3
from pathlib import Path
from collections import defaultdict

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
CACHE_FILE = DATA_DIR / "competitor_cache.json"
VELOCITY_FILE = DATA_DIR / "content_velocity.json"

# Seuil d'acceleration : si un concurrent publie X fois plus que sa moyenne -> alerte
ACCELERATION_THRESHOLD = 2.0  # 2x sa moyenne habituelle
# Seuil minimum pour considerer une semaine active
MIN_ARTICLES_TO_REPORT = 2


def load_cache() -> dict:
    if not CACHE_FILE.exists():
        print("[WARN] competitor_cache.json introuvable. Lancer competitor_watch.py d'abord.")
        return {}
    with open(CACHE_FILE, encoding="utf-8") as f:
        return json.load(f)


def load_velocity() -> dict:
    DATA_DIR.mkdir(exist_ok=True)
    if VELOCITY_FILE.exists():
        with open(VELOCITY_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_velocity(data: dict) -> None:
    with open(VELOCITY_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


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
    print(f"\n{'='*60}")
    print(f"CONTENT VELOCITY TRACKER - {datetime.date.today()}")
    print(f"{'='*60}\n")

    cache = load_cache()
    velocity = load_velocity()
    today = datetime.date.today().isoformat()
    week_key = f"week_{datetime.date.today().isocalendar()[0]}_{datetime.date.today().isocalendar()[1]}"

    # Compter les URLs par concurrent dans le cache actuel
    current_counts = {}
    for key, value in cache.items():
        if key.startswith("urls_") and isinstance(value, list):
            competitor = key[len("urls_"):]
            current_counts[competitor] = len(value)

    if not current_counts:
        print("Pas de donnees dans competitor_cache.json. Lancer competitor_watch.py.")
        return

    # Charger les comptes de la semaine precedente
    prev_week_counts = velocity.get("prev_week_counts", {})
    weekly_history = velocity.get("weekly_history", defaultdict(list))

    alerts = []
    report_lines = [f"<b>Content Velocity Report</b> — {today}\n"]

    for competitor, count in sorted(current_counts.items()):
        prev_count = prev_week_counts.get(competitor, count)
        new_this_week = max(0, count - prev_count)

        # Historique des velocites hebdo
        if competitor not in weekly_history:
            weekly_history[competitor] = []
        weekly_history[competitor].append(new_this_week)
        # Garder les 12 dernieres semaines
        weekly_history[competitor] = weekly_history[competitor][-12:]

        # Calculer la moyenne historique (hors semaine actuelle)
        history = weekly_history[competitor][:-1]
        avg = sum(history) / len(history) if history else 0

        print(f"{competitor}: {count} total, +{new_this_week} cette semaine (moy: {avg:.1f}/sem)")

        if new_this_week >= MIN_ARTICLES_TO_REPORT:
            report_lines.append(f"  {competitor}: <b>+{new_this_week}</b> articles")

        # Detecter acceleration
        if avg > 0 and new_this_week >= MIN_ARTICLES_TO_REPORT:
            ratio = new_this_week / avg
            if ratio >= ACCELERATION_THRESHOLD:
                alert = (
                    f"ACCELERATION: <b>{competitor}</b> a publie <b>{new_this_week}</b> articles "
                    f"cette semaine (moy habitualle: {avg:.1f}) = x{ratio:.1f}"
                )
                alerts.append(alert)
                print(f"  !! ACCELERATION DETECTEE (x{ratio:.1f})")

    # Sauvegarder
    velocity["prev_week_counts"] = current_counts
    velocity["weekly_history"] = dict(weekly_history)
    velocity["last_run"] = today
    save_velocity(velocity)

    # Telegram
    if alerts:
        msg = f"CONTENT VELOCITY ALERT — {today}\n\n" + "\n\n".join(alerts)
        msg += "\n\n<i>Action: analyser leurs nouveaux articles et creer une meilleure version.</i>"
        send_telegram(msg)
        print(f"\n{len(alerts)} alertes d'acceleration envoyees")
    else:
        # Rapport hebdo standard
        report_lines.append("\nAucune acceleration detectee cette semaine.")
        send_telegram("\n".join(report_lines))
        print("\nRapport hebdo envoye — pas d'acceleration")


if __name__ == "__main__":
    main()
