#!/usr/bin/env python3
"""
reddit_cadence_reminder.py
Rappel Telegram AUTO-REPARANT de la passe d'engagement Reddit logement.
Se declenche a l'allumage du PC (via run_daily_watch.bat), MAIS ne notifie
que le MERCREDI et le SAMEDI (cadence 2x/sem), 1 seule fois par jour (idempotent).

Aligne [[feedback_delta_no_fixed_time]] (fire a l'allumage, pas heure fixe) et
la doctrine [[project_reddit_housing_engagement_playbook]].
On NE poste RIEN sur Reddit. Ce script ne fait qu'un rappel.
"""
import os
import sys
import json
import datetime as dt

import requests
import urllib3
urllib3.disable_warnings()

HERE = os.path.dirname(os.path.abspath(__file__))
if HERE not in sys.path:
    sys.path.insert(0, HERE)

QUEUE_PATH = os.path.join(HERE, "data", "reddit_housing_queue.json")
STATE_PATH = os.path.join(HERE, "data", "reddit_reminder_state.json")
FIRE_DAYS = {2, 5}   # Monday=0 ... Wednesday=2, Saturday=5

try:
    from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID
except Exception:
    TELEGRAM_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "")


def send_telegram(msg):
    if not TELEGRAM_TOKEN or not TELEGRAM_CHAT_ID:
        print("Telegram non configure, skip.")
        return
    try:
        requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
            json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10, verify=False,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def actionable_count():
    try:
        with open(QUEUE_PATH, encoding="utf-8") as f:
            q = json.load(f)
        return sum(1 for t in q.get("threads", {}).values()
                   if t.get("status") in ("new", "drafted"))
    except Exception:
        return 0


def already_fired_today(today_str):
    try:
        with open(STATE_PATH, encoding="utf-8") as f:
            return json.load(f).get("last") == today_str
    except Exception:
        return False


def mark_fired(today_str):
    os.makedirs(os.path.dirname(STATE_PATH), exist_ok=True)
    with open(STATE_PATH, "w", encoding="utf-8") as f:
        json.dump({"last": today_str}, f)


def main():
    today = dt.date.today()
    if today.weekday() not in FIRE_DAYS:
        return
    today_str = today.isoformat()
    if already_fired_today(today_str):
        return

    jour = "mercredi" if today.weekday() == 2 else "samedi"
    n = actionable_count()
    msg = (
        f"\U0001F3E0 <b>Passe Reddit logement ({jour})</b>\n"
        f"{n} fil(s) en attente dans la file.\n\n"
        f"Dis <b>BONJOUR</b> a Claude: il relance le watcher, verifie tes "
        f"reponses postees, et te livre les brouillons prets a coller."
    )
    send_telegram(msg)
    mark_fired(today_str)
    print(f"Rappel Reddit envoye ({jour}, {n} en attente).")


if __name__ == "__main__":
    main()
