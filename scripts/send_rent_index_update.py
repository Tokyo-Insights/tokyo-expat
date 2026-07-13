"""
send_rent_index_update.py -- Envoie la MAJ trimestrielle de l'Indice des loyers
aux inscrits du lead magnet /data (segment SOURCE = 'lead-magnet-rent-index', liste 3).

Pourquoi: la copie du form /data PROMET des mises a jour trimestrielles par email.
Ce script tient la promesse (sinon overclaim). A lancer APRES chaque refresh_rent_index
(quand lib/tokyoRentIndex.json['generated'] change de trimestre).

Logique anti-spam / anti-doublon:
  - Cible UNIQUEMENT les contacts SOURCE='lead-magnet-rent-index'.
  - N'envoie la version V qu'aux contacts inscrits AVANT la date 'generated' de V
    (les nouveaux inscrits ont deja recu le PDF a jour au signup -> on ne les re-spamme pas).
  - Etat data/rent_index_update_state.json: une version n'est jamais envoyee 2x au meme email.

Usage:
  python scripts/send_rent_index_update.py            (DRY-RUN: montre qui recevrait, n'envoie rien)
  python scripts/send_rent_index_update.py --send     (envoie reellement)
"""
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
ROOT_DIR = SCRIPT_DIR.parent
DATA_DIR = SCRIPT_DIR / "data"
STATE_FILE = DATA_DIR / "rent_index_update_state.json"
ENV = SCRIPT_DIR / ".env"
INDEX_JSON = ROOT_DIR / "lib" / "tokyoRentIndex.json"

LIST_ID = 3
SEGMENT_SOURCE = "lead-magnet-rent-index"
SENDER = {"name": "Alessandro - Tokyo Expat", "email": "contact@tokyo-expat.com"}
SEND = "--send" in sys.argv          # defaut = DRY-RUN (securite: broadcast a de vrais abonnes)
DRY_RUN = not SEND

# Emails a ne jamais contacter (tests internes)
EXCLUDE = {
    "test@example.com",
    "test-debug@tokyo-insights.com",
    "audit-funnel-test-20260713@tokyo-expat.com",
}

API_KEY = None
if ENV.exists():
    for line in ENV.read_text(encoding="utf-8").splitlines():
        if line.startswith("BREVO_API_KEY="):
            API_KEY = line.split("=", 1)[1].strip()
            break
HEADERS = {"api-key": API_KEY, "Content-Type": "application/json", "accept": "application/json"}


def load_state():
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text(encoding="utf-8"))
    return {"sent": {}}


def save_state(state):
    DATA_DIR.mkdir(exist_ok=True)
    STATE_FILE.write_text(json.dumps(state, indent=2, ensure_ascii=False), encoding="utf-8")


def get_index_version():
    """Retourne (version_str, version_date) depuis tokyoRentIndex.json['generated']."""
    d = json.loads(INDEX_JSON.read_text(encoding="utf-8"))
    gen = str(d.get("generated", "")).strip()
    version_date = None
    for fmt in ("%Y-%m-%d", "%Y-%m-%dT%H:%M:%S", "%Y-%m-%d %H:%M:%S", "%Y/%m/%d"):
        try:
            version_date = datetime.datetime.strptime(gen[:len(datetime.datetime.now().strftime(fmt))], fmt)
            break
        except Exception:
            continue
    if version_date is None:
        # fallback: essaie ISO
        try:
            version_date = datetime.datetime.fromisoformat(gen.replace("Z", "+00:00")).replace(tzinfo=None)
        except Exception:
            version_date = None
    return gen, version_date


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


def build_email(lang, version_str):
    base = "https://www.tokyo-expat.com"
    if lang == "en":
        pdf = f"{base}/tokyo-rent-index-en.pdf"
        data = f"{base}/en/data"
        subject = "The Tokyo Rent Index was just updated"
        html = f"""<p>Hi,</p>
<p>You downloaded the Tokyo Rent Index a while back. The figures have just been refreshed
(new data, as of {version_str}), so here is the updated version.</p>
<p><a href="{pdf}">Download the updated index (PDF)</a><br>
Or view it online: <a href="{data}">{data}</a></p>
<p>Median 1K, 1LDK and 2LDK rents across 23 wards, 27 train lines and 50 stations,
from real recorded transactions.</p>
<p>Alessandro<br>tokyo-expat.com</p>"""
    else:
        pdf = f"{base}/tokyo-rent-index-fr.pdf"
        data = f"{base}/fr/data"
        subject = "L'Indice des loyers de Tokyo vient d'etre mis a jour"
        html = f"""<p>Bonjour,</p>
<p>Vous aviez telecharge l'Indice des loyers de Tokyo. Les chiffres viennent d'etre actualises
(nouvelles donnees, au {version_str}), voici donc la version a jour.</p>
<p><a href="{pdf}">Telecharger l'indice a jour (PDF)</a><br>
Ou le consulter en ligne : <a href="{data}">{data}</a></p>
<p>Loyers medians 1K, 1LDK et 2LDK pour 23 arrondissements, 27 lignes et 50 stations,
a partir de transactions reelles enregistrees.</p>
<p>Alessandro<br>tokyo-expat.com</p>"""
    return subject, html


def send_email(email, subject, html):
    payload = {"to": [{"email": email}], "sender": SENDER, "subject": subject, "htmlContent": html}
    r = requests.post("https://api.brevo.com/v3/smtp/email", headers=HEADERS, json=payload, verify=False, timeout=30)
    return r.status_code in (200, 201), r.status_code, r.text[:150]


def main():
    if not API_KEY:
        print("BREVO_API_KEY introuvable dans scripts/.env.")
        return

    version_str, version_date = get_index_version()
    if not version_str:
        print("Champ 'generated' introuvable dans tokyoRentIndex.json -- abandon.")
        return
    print(f"{'[DRY-RUN] ' if DRY_RUN else ''}Version de l'indice: {version_str}"
          f"{'' if version_date else '  (date non parsee -> pas de filtre createdAt)'}")

    state = load_state()
    already = set(state.get("sent", {}).get(version_str, []))

    contacts = get_list_contacts()
    rent_index_contacts = [
        c for c in contacts
        if str((c.get("attributes", {}) or {}).get("SOURCE", "")).strip() == SEGMENT_SOURCE
    ]
    print(f"Liste {LIST_ID}: {len(contacts)} contacts, dont {len(rent_index_contacts)} segment '{SEGMENT_SOURCE}'.")

    sent_count = 0
    skipped_new = 0
    skipped_done = 0
    for c in contacts:
        email = c.get("email")
        attrs = c.get("attributes", {}) or {}
        if str(attrs.get("SOURCE", "")).strip() != SEGMENT_SOURCE:
            continue
        if email in EXCLUDE:
            continue
        if email in already:
            skipped_done += 1
            continue
        # N'envoie qu'aux inscrits AVANT cette version (les nouveaux ont deja le PDF a jour).
        if version_date is not None:
            created = c.get("createdAt")
            if created:
                try:
                    created_dt = datetime.datetime.fromisoformat(created.replace("Z", "+00:00")).replace(tzinfo=None)
                    if created_dt >= version_date:
                        skipped_new += 1
                        continue
                except Exception:
                    pass
        lang = str(attrs.get("LANGUE", "fr")).lower()
        if lang not in ("en", "fr"):
            lang = "fr"
        subject, html = build_email(lang, version_str)
        if DRY_RUN:
            print(f"  [would send] {email} | {lang} | \"{subject}\"")
            already.add(email)
            sent_count += 1
        else:
            ok, code, msg = send_email(email, subject, html)
            if ok:
                print(f"  SENT {email} | {lang}")
                already.add(email)
                sent_count += 1
            else:
                print(f"  FAIL {email} -> {code} {msg}")

    if not DRY_RUN:
        state.setdefault("sent", {})[version_str] = sorted(already)
        state["last_version"] = version_str
        save_state(state)

    print(f"\n{'[DRY-RUN] ' if DRY_RUN else ''}{sent_count} email(s) "
          f"{'a envoyer' if DRY_RUN else 'envoyes'} pour la version {version_str}.")
    print(f"  ({skipped_new} nouveau(x) inscrit(s) ignore(s) - deja a jour, {skipped_done} deja notifie(s)).")
    if DRY_RUN:
        print("  DRY-RUN: rien n'a ete envoye. Relancer avec --send pour envoyer.")


if __name__ == "__main__":
    main()
