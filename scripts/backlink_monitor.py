# -*- coding: utf-8 -*-
"""
backlink_monitor.py -- surveille les backlinks DEJA GAGNES et signale ceux qu'on perd.

POURQUOI CE SCRIPT EXISTE (14/09/2026)
Le parc surveillait les backlinks a CONQUERIR (`backlink_followup_watcher`, `bing_backlinks`)
et aucun de ceux qu'on avait deja. Resultat: les deux liens d'internationalschools.net, le
seul partenariat qui marchait, ont disparu entre le 13 et le 14/09 quand leurs pages ont ete
regenerees. Personne n'a rien vu, et rien ne l'aurait vu.
🔑 Un backlink verifie une fois n'est pas un backlink acquis.

CE QU'IL FAIT
Relit chaque page du registre, cherche notre URL cible dans le HTML livre, et ne parle que
quand un etat CHANGE. Il n'envoie jamais d'email et ne contacte personne: quand un lien est
perdu, il donne le contact et laisse Alessandro decider ([[feedback_no_autonomous_outbound]]).

TROIS PRECAUTIONS, chacune vient d'une erreur reelle
1. **User-Agent de navigateur.** internationalschools.net rendait 403 a WebFetch, et 200 a
   curl avec un UA de navigateur. Sans ca on ne lit rien et on croit que tout va bien.
2. **Une page illisible n'est PAS une perte.** expatarrivals.com rendait 522 le 14/09. Un
   resultat negatif se verifie comme un positif: seul un HTTP 200 sans notre lien compte.
3. **Deux absences consecutives avant d'annoncer une perte.** Un rendu partiel, un cache
   froid ou un deploiement en cours ne doivent pas declencher un email a un partenaire.

Usage:
    python scripts/backlink_monitor.py            # controle si le dernier date de >= 7 jours
    python scripts/backlink_monitor.py --force    # controle maintenant
    python scripts/backlink_monitor.py --etat     # affiche le registre, ne touche a rien
"""
import datetime as dt
import io
import json
import os
import re
import sys
import time
from pathlib import Path

import requests
import urllib3

urllib3.disable_warnings()
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

HERE = Path(__file__).parent
REGISTRE = HERE / "data" / "backlinks_registry.json"
JOURS_ENTRE_CONTROLES = 7

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                    "(KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"}

try:
    from config import TE_TOKEN, TE_CHAT_ID
except Exception:
    TE_TOKEN = os.environ.get("TE_TOKEN", "")
    TE_CHAT_ID = os.environ.get("TE_CHAT_ID", "")


DRY_RUN = "--dry-run" in sys.argv


def telegram(msg: str):
    # ⚠️ 14/09/2026: un test du moniteur, lance avec une cible volontairement fausse, a ecrit
    # "🔴 BACKLINK PERDU gaijinblog.com" dans data/telegram_log.jsonl. TE_TELEGRAM_SILENT=1
    # empechait l'envoi sur le telephone, mais PAS l'ecriture au journal, et `notify.py
    # --digest` a ressorti la fausse perte comme une vraie le matin meme.
    # 🔑 Un mode silencieux n'est pas un mode test: il tait la sortie, il n'annule pas la trace.
    # --dry-run ne touche a rien du tout.
    if DRY_RUN:
        print("[--dry-run] alerte NON envoyee et NON journalisee:\n"
              + re.sub(r"<[^>]+>", "", msg))
        return
    if not TE_TOKEN or not TE_CHAT_ID:
        print("[Telegram] non configure, message non envoye")
        return
    try:
        requests.post(f"https://api.telegram.org/bot{TE_TOKEN}/sendMessage",
                      json={"chat_id": TE_CHAT_ID, "text": msg, "parse_mode": "HTML",
                            "disable_web_page_preview": True},
                      timeout=15, verify=False)
    except Exception as e:
        print(f"[Telegram] erreur: {e}")


def charger():
    return json.loads(REGISTRE.read_text(encoding="utf-8"))


def sauver(d):
    REGISTRE.write_text(json.dumps(d, ensure_ascii=False, indent=2), encoding="utf-8")


def controler_page(entree):
    """Retourne (etat_observe, detail).

    etat_observe:
      'vivant'    la cible est bien la, comme href
      'degrade'   notre domaine est cite, mais plus aucun lien vers la cible
      'absent'    plus rien du tout, sur une page pourtant servie en 200
      'illisible' page non recuperable: on n'apprend RIEN, ce n'est pas une perte

    ⚠️ 'degrade' existe parce que la 1re version repondait 'vivant' des que le domaine
    apparaissait quelque part. Un site qui garde la mention "tokyo-expat.com" en texte et
    retire le lien serait passe pour sain, alors que c'est precisement la panne a detecter:
    une citation sans lien n'est pas un backlink. Trouve en simulant une perte.
    """
    url = entree["page"]
    try:
        r = requests.get(url, headers=UA, timeout=30, allow_redirects=True, verify=False)
    except Exception as e:
        return "illisible", f"requete impossible: {type(e).__name__}"
    if r.status_code != 200:
        return "illisible", f"HTTP {r.status_code}"

    html = r.text
    cible = entree["cible"].replace("https://", "").replace("http://", "").rstrip("/")
    # On cherche la cible sous ses formes plausibles: avec ou sans www, http ou https.
    motif = re.escape(cible).replace(r"tokyo\-expat\.com", r"(?:www\.)?tokyo\-expat\.com")
    ancres = re.findall(r"<a\b[^>]*href=\"[^\"]*" + motif + r"[^\"]*\"[^>]*>", html, re.I)
    if ancres:
        suivis = [a for a in ancres if not re.search(r'rel="[^"]*nofollow', a, re.I)]
        detail = f"{len(ancres)} ancre(s), {len(suivis)} suivie(s)"
        if not suivis:
            detail += " -- TOUTES EN NOFOLLOW"
        return "vivant", detail

    if re.search(r"(?:www\.)?tokyo-expat\.com", html, re.I):
        return "degrade", ("notre domaine est encore cite, mais plus AUCUN href vers "
                           f"{cible}: citation sans lien")
    return "absent", f"aucune occurrence de {cible} sur une page servie en 200"


def main():
    args = sys.argv[1:]
    d = charger()

    if "--etat" in args:
        print(f"{'ID':<34} {'ETAT':<11} {'DERNIER VU':<12} PAGE")
        for e in d["backlinks"]:
            print(f"{e['id']:<34} {e['etat']:<11} {str(e['dernier_vu'] or '-'):<12} {e['page'][:60]}")
        return

    aujourdhui = dt.date.today().isoformat()
    if "--force" not in args:
        derniers = [e.get("dernier_check") for e in d["backlinks"] if e.get("dernier_check")]
        if derniers:
            recent = max(derniers)
            age = (dt.date.today() - dt.date.fromisoformat(recent)).days
            if age < JOURS_ENTRE_CONTROLES:
                print(f"Dernier controle il y a {age} j (< {JOURS_ENTRE_CONTROLES}). Skip.")
                return

    perdus, retrouves, nouveaux, illisibles = [], [], [], []

    for e in d["backlinks"]:
        etat_obs, detail = controler_page(e)
        avant = e["etat"]
        e["dernier_check"] = aujourdhui
        print(f"  {e['id']:<34} {etat_obs:<10} {detail}")

        if etat_obs == "illisible":
            # On ne touche a RIEN d'autre: une page illisible n'apprend rien.
            illisibles.append(e)
            if avant != "illisible":
                e["historique"].append({"date": aujourdhui, "etat": "illisible", "detail": detail})
            continue

        if etat_obs == "vivant":
            e["dernier_vu"] = aujourdhui
            e["echecs_consecutifs"] = 0
            if not e.get("premier_vu"):
                e["premier_vu"] = aujourdhui
            if avant in ("PERDU", "attendu"):
                e["historique"].append({"date": aujourdhui, "etat": "vivant", "detail": detail})
                (nouveaux if avant == "attendu" else retrouves).append(e)
            e["etat"] = "vivant"

        else:  # absent ou degrade, sur une page servie en 200
            # ⚠️ Une entree "attendu" n'echoue pas: elle n'est simplement pas encore publiee.
            # Sans ce garde-fou, la section Fukuoka envoyee le 12/09 serait passee "PERDUE"
            # au 2e controle et aurait declenche une alerte rouge vers Engin. Un delai normal
            # serait devenu une relance. Une entree attendue ne peut que devenir "vivant".
            if avant == "attendu":
                print("     -> en attente de publication, ce n'est pas un echec")
                continue
            # Deja actee comme perdue: inutile de continuer a compter.
            if avant == "PERDU":
                continue
            e["echecs_consecutifs"] = e.get("echecs_consecutifs", 0) + 1
            if e["echecs_consecutifs"] >= 2:
                e["etat"] = "PERDU"
                e["derniere_cause"] = etat_obs   # 'absent' ou 'degrade'
                e["historique"].append({"date": aujourdhui, "etat": "PERDU", "detail": detail})
                perdus.append(e)
            else:
                e["etat"] = "suspect"
                print("     -> 1re absence, on attend le prochain controle avant de conclure")
        time.sleep(2)

    sauver(d)

    # On ne parle QUE s'il y a une action concrete. Pas de rapport "tout va bien".
    if not (perdus or retrouves or nouveaux):
        print("\nAucun changement d'etat. Aucune alerte envoyee (silence = sain).")
        if illisibles:
            print(f"({len(illisibles)} page(s) illisible(s), etat inchange: "
                  + ", ".join(x["domaine"] for x in illisibles) + ")")
        return

    lignes = []
    if perdus:
        lignes.append("🔴 <b>BACKLINK PERDU</b>")
        for e in perdus:
            cause = ("le lien a disparu, notre nom est encore cite"
                     if e.get("derniere_cause") == "degrade"
                     else "la page ne nous mentionne plus du tout")
            lignes.append(f"• <b>{e['domaine']}</b> — {cause}\n  {e['page']}\n"
                          f"  Contact: {e['contact_nom']} — {e['contact_email']}")
        lignes.append("\n⚠️ Rien n'a ete envoye. A toi de decider si on signale.")
    if nouveaux:
        lignes.append("\n🟢 <b>NOUVEAU LIEN EN LIGNE</b>")
        for e in nouveaux:
            lignes.append(f"• {e['domaine']} — {e['page']}")
    if retrouves:
        lignes.append("\n🟢 <b>LIEN RETROUVE</b>")
        for e in retrouves:
            lignes.append(f"• {e['domaine']} — {e['page']}")

    msg = "\n".join(lignes)
    print("\n" + re.sub(r"<[^>]+>", "", msg))
    telegram(msg)


if __name__ == "__main__":
    main()
