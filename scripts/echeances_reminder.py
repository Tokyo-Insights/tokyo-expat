# -*- coding: utf-8 -*-
"""
echeances_reminder.py -- les dates de tokyo-expat, lues par une MACHINE (20/09/2026)

POURQUOI CE SCRIPT EXISTE
-------------------------
Le 20/09/2026, Alessandro a demande ce qui se passerait s'il arretait de dire
"BONJOUR TOKYO EXPAT" pendant une ou deux semaines. Reponse mesuree: les scripts
continuent, rien ne part sous son nom (verifie en rejouant 15 jours avec une fausse
horloge), aucun travail n'est perdu (backup toutes les 4 h)... mais **sur sept
echeances en cours, UNE SEULE existait dans le code**. Les six autres vivaient en
prose dans une fiche memoire, relue uniquement au briefing du matin.

C'est la 4e occurrence du meme defaut: *une consigne que la machine ne lit pas
n'existe pas*. Le cas le plus net etait le test Calendly, programme "au 1er BONJOUR
d'octobre": son declencheur etait le rituel lui-meme, donc il s'annulait tout seul.

CE QUE CE SCRIPT GARANTIT
-------------------------
1. Il rappelle une echeance **des que la date est atteinte OU DEPASSEE**, jamais
   seulement le jour J. Lecon du 17/09: une echeance a la minute pres plus un script
   qui tourne au demarrage du PC, c'est un rendez-vous manque. Si le PC reste eteint
   trois jours, l'echeance sort quand meme au rallumage.
2. Il ne repete pas la meme echeance tous les jours (bruit), mais il **ne se tait pas
   non plus** quand elle traine: il la re-sort tous les RELANCE_JOURS, avec son retard
   affiche. Un rappel qui s'eteint parce que la date est passee serait le pire des
   deux mondes.
3. Il n'envoie RIEN s'il n'y a rien a faire (garde-fou du 01/07: aucun rapport vide).
4. `--audit` montre TOUT le calendrier, y compris ce que le script ne notifie pas,
   pour que la liste ne rancisse pas en silence (meme garde-fou que keyword_tracker
   le 18/09).
5. Il n'ecrit a PERSONNE. Telegram uniquement, vers Alessandro.

  python scripts/echeances_reminder.py           # rappel du jour -> Telegram
  python scripts/echeances_reminder.py --print   # affiche sans envoyer
  python scripts/echeances_reminder.py --audit   # tout le calendrier, etat par etat
  python scripts/echeances_reminder.py --fait <id>   # marquer une echeance traitee
"""
import datetime as dt
import io
import json
import sys
from pathlib import Path

import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

sys.path.insert(0, str(Path(__file__).parent))
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

SCRIPT_DIR = Path(__file__).parent
FICHIER = SCRIPT_DIR / "data" / "echeances.json"
# Une echeance en retard ressort tous les 3 jours: assez pour ne pas etre oubliee,
# assez espace pour ne pas devenir du bruit qu'on apprend a ignorer.
RELANCE_JOURS = 3

# ⚠️ AJOUTE APRES CALIBRATION (20/09/2026). En rejouant 46 jours avec une fausse horloge
# en supposant qu'Alessandro ne fasse RIEN, le script envoyait 36 messages et finissait
# par afficher "EN RETARD DE 39 j" sur une tache de deux minutes. Une echeance en retard
# d'un mois n'est plus un rappel, c'est du bruit qu'on apprend a ignorer -- exactement ce
# que la regle du 01/07 interdit.
# Apres MAX_RAPPELS relances sans suite, le script envoie UN dernier message qui demande
# une DECISION (la faire ou l'abandonner), puis se tait. L'echeance n'est pas perdue: elle
# reste dans --audit, et une ligne la rappelle dans tout message ulterieur.
MAX_RAPPELS = 3


def charge():
    return json.loads(FICHIER.read_text(encoding="utf-8"))


def sauve(data):
    FICHIER.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n",
                       encoding="utf-8")


def send_telegram(msg: str) -> None:
    try:
        requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
            json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML",
                  "disable_web_page_preview": True},
            timeout=15, verify=False,
        )
    except Exception as e:
        print(f"[WARN] telegram: {e}")


def a_notifier(e, aujourdhui):
    """Cette echeance doit-elle sortir aujourd'hui ? Rend (verdict, raison)."""
    if e.get("fait"):
        return False, "faite"
    if e.get("abandonnee"):
        return False, "abandonnee"
    if not e.get("actif", True):
        return False, f"portee par {e.get('porte_par', 'un autre script')}"
    if e.get("en_sommeil"):
        return False, f"en sommeil apres {e.get('rappels', 0)} rappels sans suite"
    echeance = dt.date.fromisoformat(e["date"])
    if aujourdhui < echeance:
        return False, f"dans {(echeance - aujourdhui).days} j"
    dernier = e.get("notifie_le")
    if dernier:
        depuis = (aujourdhui - dt.date.fromisoformat(dernier)).days
        if depuis < RELANCE_JOURS:
            return False, f"deja rappelee il y a {depuis} j"
    return True, "DUE"


def audit(data, aujourdhui):
    """Tout le calendrier, y compris ce qui ne sera jamais notifie."""
    print(f"CALENDRIER TOKYO-EXPAT au {aujourdhui} "
          f"({len(data['echeances'])} echeances)\n")
    for e in sorted(data["echeances"], key=lambda x: x["date"]):
        due, raison = a_notifier(e, aujourdhui)
        ec = dt.date.fromisoformat(e["date"])
        retard = (aujourdhui - ec).days
        if e.get("fait"):
            marque = "✅ faite"
        elif e.get("abandonnee"):
            marque = "🚫 abandonnee"
        elif e.get("en_sommeil"):
            marque = f"⚪ EN SOMMEIL (retard {retard} j, {e.get('rappels', 0)} rappels)"
        elif not e.get("actif", True):
            marque = "🔇 " + raison
        elif due:
            marque = f"🔴 DUE (retard {retard} j)" if retard > 0 else "🔴 DUE aujourd'hui"
        else:
            marque = "⏳ " + raison
        print(f"  {e['date']}  {marque:<34} {e['titre'][:62]}")
        if e.get("commande"):
            print(f"              $ {e['commande']}")
    actives = [e for e in data["echeances"]
               if e.get("actif", True) and not e.get("fait")]
    print(f"\n  {len(actives)} echeance(s) active(s) non faite(s). "
          f"Relance tous les {RELANCE_JOURS} jours tant qu'elles trainent.")


def main():
    if not FICHIER.exists():
        print(f"[INACTIF] {FICHIER.name} absent.")
        return
    data = charge()
    aujourdhui = dt.date.today()

    # MODE PAUSE (25/09/2026). Se taire ne suffit pas ici: chaque rappel bloque par
    # telegram_shim compterait comme une relance, et les echeances passeraient EN SOMMEIL
    # pendant la pause sans qu'Alessandro ait rien decide. On suspend donc tout, etat
    # compris; elles ressortent normalement a la fin de la pause. --audit reste possible.
    try:
        from telegram_shim import pause_active
        fin = pause_active()
    except Exception:
        fin = None
    if fin and len(sys.argv) == 1:      # les commandes manuelles (--audit, --fait...) restent possibles
        print(f"[PAUSE] jusqu'au {fin}: aucun rappel, aucun etat modifie. "
              f"(--audit pour voir le calendrier)")
        return

    # --fait / --abandon / --reveiller: changer l'etat d'UNE echeance.
    ETATS = {
        "--fait": ("fait", "marquee FAITE", True),
        "--abandon": ("abandonnee", "ABANDONNEE (assumee, pas oubliee)", True),
        "--reveiller": ("en_sommeil", "REVEILLEE, elle ressortira", False),
    }

    # --rouvrir: annuler un --fait ou un --abandon pose par erreur. Ajoute le 20/09 apres
    # m'etre marque 'test-photo' comme faite en la testant: sans cette commande, la seule
    # facon de corriger une faute de frappe etait d'editer le JSON a la main, et une
    # echeance eteinte par erreur ne se serait jamais rappelee a personne.
    if "--rouvrir" in sys.argv:
        i = sys.argv.index("--rouvrir")
        if i + 1 >= len(sys.argv):
            print("Usage: --rouvrir <id>")
            return
        cible = sys.argv[i + 1]
        for e in data["echeances"]:
            if e["id"] == cible:
                for champ in ("fait", "fait_le", "abandonnee", "abandonnee_le",
                              "en_sommeil", "en_sommeil_le", "notifie_le", "rappels"):
                    e.pop(champ, None)
                e["fait"] = False
                sauve(data)
                print(f"OK '{cible}' ROUVERTE: etat remis a neuf, elle repartira "
                      f"a sa date ({e['date']}).")
                return
        print(f"!! aucune echeance d'id '{cible}'.")
        return
    for drapeau, (champ, libelle, valeur) in ETATS.items():
        if drapeau not in sys.argv:
            continue
        i = sys.argv.index(drapeau)
        if i + 1 >= len(sys.argv):
            print(f"Usage: {drapeau} <id>")
            return
        cible = sys.argv[i + 1]
        for e in data["echeances"]:
            if e["id"] == cible:
                e[champ] = valeur
                e[f"{champ}_le"] = aujourdhui.isoformat()
                if drapeau == "--reveiller":
                    e["rappels"] = 0
                sauve(data)
                print(f"OK '{cible}' {libelle} le {aujourdhui}.")
                return
        print(f"!! aucune echeance d'id '{cible}'. "
              f"Ids connus: {', '.join(e['id'] for e in data['echeances'])}")
        return

    if "--audit" in sys.argv:
        audit(data, aujourdhui)
        return

    dues = [e for e in data["echeances"] if a_notifier(e, aujourdhui)[0]]
    if not dues:
        # Garde-fou: aucun message vide. Mais on DIT en console qu'on a regarde, pour
        # qu'un silence reste distinguable d'une panne.
        # ⚠️ Le compte ne melange pas les etats: une echeance EN SOMMEIL n'est plus
        # surveillee, et l'annoncer comme "la plus proche" ferait afficher une date
        # DEPASSEE comme si elle etait a venir.
        def vivante(e):
            return (e.get("actif", True) and not e.get("fait")
                    and not e.get("abandonnee") and not e.get("en_sommeil"))
        surveillees = [e for e in data["echeances"] if vivante(e)]
        dormantes = [e for e in data["echeances"]
                     if e.get("en_sommeil") and not e.get("fait")
                     and not e.get("abandonnee")]
        a_venir = sorted(e["date"] for e in surveillees
                         if dt.date.fromisoformat(e["date"]) >= aujourdhui)
        queue = f", la plus proche le {a_venir[0]}" if a_venir else ", aucune a venir"
        sommeil = f" | ⚪ {len(dormantes)} en sommeil" if dormantes else ""
        print(f"[{aujourdhui}] Aucune echeance due. "
              f"({len(surveillees)} surveillee(s){queue}{sommeil})")
        return

    lignes = [f"\U0001F4C5 <b>ECHEANCES TOKYO-EXPAT — {aujourdhui}</b>", ""]
    for e in sorted(dues, key=lambda x: x["date"]):
        retard = (aujourdhui - dt.date.fromisoformat(e["date"])).days
        dernier = e.get("rappels", 0) + 1 >= MAX_RAPPELS
        if retard == 0:
            entete = "⏰ <b>AUJOURD'HUI</b>"
        elif dernier:
            entete = f"⚠️ <b>DERNIER RAPPEL — en retard de {retard} j</b>"
        else:
            entete = f"🔴 <b>EN RETARD DE {retard} j</b>"
        lignes.append(f"{entete} — {e['titre']}")
        lignes.append(f"   {e['quoi']}")
        if e.get("commande"):
            lignes.append(f"   <code>{e['commande']}</code>")
        lignes.append(f"   Fiche: {e['fiche']}")
        if dernier:
            lignes.append(f"   👉 Apres ce message je me tais sur celle-ci. Soit tu la fais, "
                          f"soit: <code>python scripts/echeances_reminder.py --abandon {e['id']}</code>")
        lignes.append("")
    lignes.append(f"Traitee ? <code>python scripts/echeances_reminder.py --fait "
                  f"{dues[0]['id']}</code>")

    # Un garde-fou muet est une information: les echeances endormies ne disparaissent
    # pas, elles se rappellent en une ligne des que le script reparle.
    dormantes = [e for e in data["echeances"]
                 if e.get("en_sommeil") and not e.get("fait") and not e.get("abandonnee")]
    if dormantes:
        lignes.append(f"\n⚪ {len(dormantes)} echeance(s) EN SOMMEIL, jamais traitees ni "
                      f"abandonnees: {', '.join(e['id'] for e in dormantes)} "
                      f"(<code>--audit</code> pour les revoir)")
    msg = "\n".join(lignes)

    print(msg.replace("<b>", "").replace("</b>", "")
             .replace("<code>", "").replace("</code>", ""))

    if "--print" in sys.argv:
        print("\n[--print] Telegram NON envoye, rien marque.")
        return

    send_telegram(msg)
    endormies = []
    for e in dues:
        e["notifie_le"] = aujourdhui.isoformat()
        e["rappels"] = e.get("rappels", 0) + 1
        if e["rappels"] >= MAX_RAPPELS:
            e["en_sommeil"] = True
            endormies.append(e["id"])
    sauve(data)
    print(f"\n[Telegram envoye, {len(dues)} echeance(s) rappelee(s)]")
    if endormies:
        print(f"[{len(endormies)} passee(s) EN SOMMEIL apres {MAX_RAPPELS} rappels: "
              f"{', '.join(endormies)} -- visibles dans --audit]")


if __name__ == "__main__":
    main()
