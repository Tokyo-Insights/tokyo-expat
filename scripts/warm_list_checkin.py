#!/usr/bin/env python3
"""
warm_list_checkin.py -- Prise de nouvelles de la liste tiede Brevo (angle "ou en etes-vous").

Rend un email PERSONNALISE par contact a partir de faits reels lus dans Brevo:
la LANGUE (fr/en), le mois d'inscription et l'aimant telecharge (attribut SOURCE).
Aucun champ a trous: si un fait manque, la phrase qui en depend disparait.

🚨 RIEN NE PART D'ICI. Le script ECRIT UN FICHIER, il n'envoie pas et ne cree pas de
brouillon Gmail. L'envoi reste un geste humain, cf la regle du 11/09/2026.

Usage:
    python scripts/warm_list_checkin.py            # rend les emails dans data/
    python scripts/warm_list_checkin.py --list     # liste seule, qui entre et qui sort
"""
import argparse
import datetime as dt
import sys
from pathlib import Path

import requests
import urllib3

urllib3.disable_warnings()

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

HERE = Path(__file__).parent
OUT = HERE / "data" / f"warm_list_checkin_{dt.date.today().isoformat()}.md"

# Exclusions, chacune pour une raison nommee (cf memoire).
EXCLUDE = {
    "poppyhewlett7@gmail.com": "dossier CLOS le 08/09, ne plus jamais relancer",
    "digev17942@94an.com": "adresse jetable (94an.com), inscription du 11/09",
    "assistia.bot@gmail.com": "'bot' dans l'adresse, inscription du 11/09",
    "pbryer@hotmail.com": "contact apporteur d'affaires (Hokkaido), pas un lead logement",
    "test@example.com": "contact de test",
    "test-debug@tokyo-insights.com": "contact de test",
    "info.tokyoinsights@gmail.com": "c'est toi",
}

MOIS_FR = ["", "janvier", "février", "mars", "avril", "mai", "juin", "juillet",
           "août", "septembre", "octobre", "novembre", "décembre"]
MOIS_EN = ["", "January", "February", "March", "April", "May", "June", "July",
           "August", "September", "October", "November", "December"]

AIMANT = {
    "lead-magnet-rent-index": ("l'indice des loyers de Tokyo", "the Tokyo rent index"),
    "lead-magnet-checklist": ("la checklist relocation", "the Tokyo relocation checklist"),
    "lead-magnet-exit-popup": ("la checklist relocation", "the Tokyo relocation checklist"),
}

SUBJECT_FR = "Où en êtes-vous de votre installation au Japon ?"
SUBJECT_EN = "How is the Tokyo move going?"

BODY_FR = """Bonjour,

Vous avez téléchargé {aimant} {quand}. Plutôt que de vous laisser sur une liste
de diffusion, je préfère prendre de vos nouvelles directement.

Où en êtes-vous aujourd'hui ? Encore au stade du projet, des dates déjà posées, ou
bien le projet est tombé à l'eau ? Les trois réponses me vont. Ce que je cherche à
comprendre, c'est ce qui bloque réellement entre le moment où on décide de partir et
celui où on a les clés.

Si vous butez sur quelque chose de précis, répondez-moi en une ligne. Je lis tout
moi-même et je réponds avec ce que je sais.

Alessandro
Tokyo Expat
"""

BODY_EN = """Hello,

You downloaded {aimant} {quand}. Rather than leave you sitting on a mailing
list, I would rather hear how it is actually going.

Where are you at right now? Still at the planning stage, dates already booked, or did
the whole thing fall through? Any of those is a fine answer. What I am trying to
understand is what actually trips people up between deciding to move and having keys
in hand.

If you are stuck on something specific, reply in one line and tell me what it is. I
read every one of these myself and I will answer with whatever I know.

Alessandro
Tokyo Expat
"""


def load_key():
    env = HERE / ".env"
    for line in env.read_text(encoding="utf-8").splitlines():
        if line.startswith("BREVO_API_KEY="):
            return line.split("=", 1)[1].strip()
    sys.exit("BREVO_API_KEY introuvable dans scripts/.env")


def fetch_contacts():
    h = {"api-key": load_key(), "accept": "application/json"}
    r = requests.get("https://api.brevo.com/v3/contacts?limit=500", headers=h,
                     verify=False, timeout=30)
    if r.status_code != 200:
        sys.exit(f"Brevo HTTP {r.status_code}: {r.text[:200]}")
    return r.json().get("contacts", [])


def when_phrase(created, fr):
    """'back in August' pour une inscription ancienne, mais 'a few days ago' pour une
    inscription de la semaine: dire 'en septembre' a quelqu'un inscrit il y a 4 jours
    sonne faux et trahit l'envoi automatique."""
    try:
        d = dt.date.fromisoformat(created[:10])
        m = int(created[5:7])
    except ValueError:
        return None
    age = (dt.date.today() - d).days
    if age <= 10:
        return "il y a quelques jours" if fr else "a few days ago"
    if age <= 31:
        return "il y a quelques semaines" if fr else "a few weeks ago"
    return f"en {MOIS_FR[m]}" if fr else f"back in {MOIS_EN[m]}"


def render(contact):
    attrs = contact.get("attributes", {}) or {}
    lang = (attrs.get("LANGUE") or "en").lower()
    fr = lang.startswith("fr")
    src = attrs.get("SOURCE", "")
    aimant_fr, aimant_en = AIMANT.get(src, ("un de mes guides", "one of my guides"))
    quand = when_phrase(contact.get("createdAt", ""), fr)
    if quand is None:
        return None  # pas de date fiable: on ne fabrique pas un faux souvenir
    if fr:
        return (SUBJECT_FR, BODY_FR.format(aimant=aimant_fr, quand=quand))
    return (SUBJECT_EN, BODY_EN.format(aimant=aimant_en, quand=quand))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--list", action="store_true", help="qui entre, qui sort, et pourquoi")
    args = ap.parse_args()

    contacts = fetch_contacts()
    kept, dropped = [], []
    for c in contacts:
        email = (c.get("email") or "").lower()
        if email in EXCLUDE:
            dropped.append((email, EXCLUDE[email]))
        else:
            kept.append(c)
    kept.sort(key=lambda c: c.get("createdAt", ""), reverse=True)

    print(f"RETENUS : {len(kept)}    ECARTES : {len(dropped)}")
    for email, why in dropped:
        print(f"  hors envoi  {email:<40} {why}")
    if args.list:
        for c in kept:
            a = c.get("attributes", {}) or {}
            print(f"  retenu      {c.get('email',''):<40} "
                  f"{a.get('LANGUE','?')}  {a.get('SOURCE','?')}")
        return

    lines = [f"# Prise de nouvelles, liste tiede ({dt.date.today().isoformat()})", "",
             f"{len(kept)} destinataires. **Rien n'est envoye par ce script.**", ""]
    for c in kept:
        out = render(c)
        if out is None:
            lines.append(f"## {c.get('email')}\n\nECARTE: date d'inscription illisible.\n")
            continue
        subject, body = out
        a = c.get("attributes", {}) or {}
        lines.append(f"## {c.get('email')}  ({a.get('LANGUE','?')}, "
                     f"inscrit le {(c.get('createdAt') or '')[:10]})")
        lines.append(f"\n**Objet :** {subject}\n")
        lines.append("```")
        lines.append(body.strip())
        lines.append("```\n")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"\nEcrit: {OUT}")
    print("Relire, puis envoyer a la main. Aucun brouillon n'a ete cree.")


if __name__ == "__main__":
    main()
