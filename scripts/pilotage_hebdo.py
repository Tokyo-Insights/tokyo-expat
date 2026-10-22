"""
pilotage_hebdo.py — Tableau de pilotage du plan d'attaque (chantier J, 22/10/2026).

Stan [378] [311] [092] : chaque semaine, contactés / réponses / relances / rendez-vous / présents,
et rien de conclu avant 10 conversations.

Perimetre = les contacts du registre qui portent le champ `pilotage` (C, D...). Pour en ajouter un,
poser `pilotage` sur sa fiche dans scripts/data/outreach_contacts.json : rien d'autre a saisir.

Ce qui est MESURE (IMAP, pas le registre) :
  - relances = nos envois a ce domaine apres le premier et AVANT leur premiere reponse
  - reponse  = au moins un message RECU de ce domaine depuis emailed_date
Ce qui est DECLARE (seul geste manuel, rempli par Claude sur ce qu'Alessandro dit) :
  - rdv = [{"date": "AAAA-MM-JJ", "tenu": true/false, "objet": "..."}]

Run: python scripts/pilotage_hebdo.py            # tableau + historique
     python scripts/pilotage_hebdo.py --no-save  # tableau seulement
"""

import datetime as dt
import email
import imaplib
import io
import json
import sys
from email.utils import parsedate_to_datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

from config import GMAIL_ADDRESS, GMAIL_APP_PASSWORD
from warm_threads_watch import _dossier

DATA = Path(__file__).resolve().parent / "data"
REGISTRE = DATA / "outreach_contacts.json"
HISTO = DATA / "pilotage_history.json"
SORTIE = DATA / "pilotage_latest.md"
OBJECTIF_CONVERSATIONS = 10   # [092]
RELANCES_VISEES = 3           # [077] [168]


def _dates(m, dossier, critere, domaine, depuis):
    """Dates des messages d'un dossier dont FROM/TO contient le domaine, depuis une date."""
    try:
        m.select(f'"{dossier}"', readonly=True)
        since = depuis.strftime("%d-%b-%Y")
        typ, data = m.uid("SEARCH", None, "SINCE", since, critere, domaine)
        uids = data[0].split() if data and data[0] else []
        out = []
        for u in uids:
            _, md = m.uid("FETCH", u, "(BODY.PEEK[HEADER.FIELDS (DATE)])")
            if md and md[0]:
                out.append(parsedate_to_datetime(email.message_from_bytes(md[0][1]).get("Date")))
        return sorted(out)
    except Exception as e:
        print(f"[WARN] {domaine} {critere}: {e}")
        return None


def mesurer():
    contacts = [c for c in json.loads(REGISTRE.read_text(encoding="utf-8")) if c.get("pilotage")]
    m = imaplib.IMAP4_SSL("imap.gmail.com")
    m.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
    boite = _dossier(m, "\\All", "INBOX")
    envoyes = _dossier(m, "\\Sent", "[Gmail]/Sent Mail")
    lignes = []
    for c in contacts:
        depuis = dt.date.fromisoformat(c.get("emailed_date") or c.get("added"))
        domaines = c.get("domaines_emails") or [c["domain"]]
        recus, envois, aveugle = [], [], False
        for d in domaines:
            r = _dates(m, boite, "FROM", d, depuis)
            s = _dates(m, envoyes, "TO", d, depuis)
            if r is None or s is None:
                aveugle = True
                continue
            recus += r
            envois += s
        rdv = c.get("rdv") or []
        recus.sort()
        envois.sort()
        # Une relance = un envoi de plus SANS reponse ; apres leur reponse, c'est un echange.
        avant = [e for e in envois if not recus or e < recus[0]]
        lignes.append({
            "nom": c["name"], "chantier": c["pilotage"], "depuis": depuis.isoformat(),
            "envois": len(envois), "relances": max(len(avant) - 1, 0),
            "reponse": bool(recus), "premiere_reponse": recus[0].date().isoformat() if recus else None,
            "rdv": len(rdv), "presents": sum(1 for x in rdv if x.get("tenu")),
            "aveugle": aveugle,
        })
    m.logout()
    return lignes


def rendre(lignes):
    tot = {k: sum(l[k] for l in lignes) for k in ("rdv", "presents")}
    rep = sum(1 for l in lignes if l["reponse"])
    aveugles = [l["nom"] for l in lignes if l["aveugle"]]
    today = dt.date.today().isoformat()
    md = [f"# Pilotage du plan d'attaque, {today}", "",
          f"**Contactés {len(lignes)} · réponses {rep} · rendez-vous {tot['rdv']} · présents {tot['presents']}**"
          f" · conversations tenues {tot['presents']} / {OBJECTIF_CONVERSATIONS} avant de conclure [092]", ""]
    if aveugles:
        md += [f"⚠️ IMAP n'a pas pu lire : {', '.join(aveugles)} (lignes non fiables)", ""]
    md += ["| Contact | Ch. | Depuis | Relances | Réponse | RDV | Présent |", "|---|---|---|---|---|---|---|"]
    for l in sorted(lignes, key=lambda x: (x["chantier"], x["depuis"])):
        md.append(f"| {l['nom']} | {l['chantier']} | {l['depuis']} | {l['relances']} / {RELANCES_VISEES} | "
                  f"{l['premiere_reponse'] or 'non'} | {l['rdv']} | {l['presents']} |")
    return "\n".join(md) + "\n", {"date": today, "contactes": len(lignes), "reponses": rep, **tot}


def main():
    lignes = mesurer()
    md, resume = rendre(lignes)
    print(md)
    if "--no-save" in sys.argv:
        return
    tmp = SORTIE.with_suffix(".tmp")
    tmp.write_text(md, encoding="utf-8")
    tmp.replace(SORTIE)
    histo = json.loads(HISTO.read_text(encoding="utf-8")) if HISTO.exists() else []
    histo = [h for h in histo if h["date"] != resume["date"]] + [resume]
    tmp = HISTO.with_suffix(".tmp")
    tmp.write_text(json.dumps(histo, ensure_ascii=False, indent=2), encoding="utf-8")
    tmp.replace(HISTO)


if __name__ == "__main__":
    main()
