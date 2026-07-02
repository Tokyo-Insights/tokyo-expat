"""
brevo_welcome_drip.py -- Moteur de sequence de bienvenue Tokyo Expat.
Remplace le workflow dashboard Brevo par un drip 100% automatise.

A lancer 1x/jour (cron / startup / batch quotidien TE).
Pour chaque contact de la liste 3 (lead magnet checklist) :
  - J+0  -> email bienvenue 1  ENVOYE PAR /api/subscribe (route serverless, instantane)
  - J+2  -> email bienvenue 2  (ce script)
  - J+5  -> email bienvenue 3  (ce script)
IMPORTANT: J+0 est gere par la route /api/subscribe (envoi immediat + fiable, serverless).
Ce script ne gere QUE J+2 et J+5 pour eviter un double envoi de Welcome 1.
Langue lue dans l'attribut LANGUE (fr/en), defaut fr.
Etat anti-doublon dans data/welcome_drip_state.json.

Usage:
  python scripts/brevo_welcome_drip.py --dry-run   (montre sans envoyer)
  python scripts/brevo_welcome_drip.py             (envoie reellement)
"""
import os
import sys
import io
import json
import datetime
from pathlib import Path

import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
STATE_FILE = DATA_DIR / "welcome_drip_state.json"
ENV = SCRIPT_DIR / ".env"

LIST_ID = 3
DRY_RUN = "--dry-run" in sys.argv

# N'enroler que les inscrits a partir de cette date (evite de spammer
# les anciens contacts / contacts de test pre-existants).
ENROLL_AFTER = datetime.datetime(2026, 6, 27, 0, 0, tzinfo=datetime.timezone.utc)
# Emails a ne jamais contacter (tests internes)
EXCLUDE = {"test@example.com", "test-debug@tokyo-insights.com"}

# Template ids cree par brevo_welcome_sequence.py (1-6 = seq initiale, 7-12 = rallonge J+9/14/21)
TEMPLATES = {
    "fr": {0: 1, 2: 2, 5: 3, 9: 7, 14: 8, 21: 9},
    "en": {0: 4, 2: 5, 5: 6, 9: 10, 14: 11, 21: 12},
}
# Etapes par jour-seuil. J+0 (step0) RETIRE: gere par /api/subscribe (evite double Welcome 1).
STEPS = [(2, "step2"), (5, "step5"), (9, "step9"), (14, "step14"), (21, "step21")]

API_KEY = None
for line in ENV.read_text(encoding="utf-8").splitlines():
    if line.startswith("BREVO_API_KEY="):
        API_KEY = line.split("=", 1)[1].strip()
        break
HEADERS = {"api-key": API_KEY, "Content-Type": "application/json", "accept": "application/json"}


def load_state():
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text(encoding="utf-8"))
    return {}


def save_state(state):
    DATA_DIR.mkdir(exist_ok=True)
    STATE_FILE.write_text(json.dumps(state, indent=2, ensure_ascii=False), encoding="utf-8")


def get_list_contacts():
    contacts = []
    offset = 0
    while True:
        url = f"https://api.brevo.com/v3/contacts/lists/{LIST_ID}/contacts?limit=500&offset={offset}"
        r = requests.get(url, headers=HEADERS, verify=False, timeout=30)
        if r.status_code != 200:
            print(f"Erreur recuperation contacts: {r.status_code} {r.text[:200]}")
            break
        batch = r.json().get("contacts", [])
        contacts.extend(batch)
        if len(batch) < 500:
            break
        offset += 500
    return contacts


def send_template(email, template_id):
    payload = {"to": [{"email": email}], "templateId": template_id}
    r = requests.post("https://api.brevo.com/v3/smtp/email", headers=HEADERS, json=payload, verify=False, timeout=30)
    return r.status_code in (200, 201), r.status_code, r.text[:150]


def main():
    if not API_KEY:
        print("BREVO_API_KEY introuvable.")
        return
    state = load_state()
    today = datetime.datetime.now(datetime.timezone.utc)
    contacts = get_list_contacts()
    print(f"{'[DRY-RUN] ' if DRY_RUN else ''}Liste {LIST_ID}: {len(contacts)} contacts")

    sent_count = 0
    skipped_old = 0
    for c in contacts:
        email = c.get("email")
        if email in EXCLUDE:
            continue
        attrs = c.get("attributes", {}) or {}
        lang = str(attrs.get("LANGUE", "fr")).lower()
        if lang not in TEMPLATES:
            lang = "fr"
        created = c.get("createdAt")
        if not created:
            continue
        try:
            created_dt = datetime.datetime.fromisoformat(created.replace("Z", "+00:00"))
        except Exception:
            continue
        if created_dt < ENROLL_AFTER:
            skipped_old += 1
            continue
        days = (today - created_dt).days

        done = set(state.get(email, []))
        for threshold, step_key in STEPS:
            if days >= threshold and step_key not in done:
                tid = TEMPLATES[lang][threshold]
                if DRY_RUN:
                    print(f"  [would send] {email} | {lang} | J+{days} | {step_key} -> template {tid}")
                    done.add(step_key)
                    sent_count += 1
                else:
                    ok, code, msg = send_template(email, tid)
                    if ok:
                        print(f"  SENT {email} | {lang} | {step_key} -> template {tid}")
                        done.add(step_key)
                        sent_count += 1
                    else:
                        print(f"  FAIL {email} | {step_key} -> {code} {msg}")
        state[email] = sorted(done)

    if not DRY_RUN:
        save_state(state)
    print(f"  ({skipped_old} ancien(s) contact(s) ignore(s), inscrits avant {ENROLL_AFTER.date()})")
    print(f"\n{'[DRY-RUN] ' if DRY_RUN else ''}{sent_count} email(s) {'a envoyer' if DRY_RUN else 'envoyes'}.")


if __name__ == "__main__":
    main()
