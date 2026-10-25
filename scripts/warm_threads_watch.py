# -*- coding: utf-8 -*-
"""warm_threads_watch.py -- surveille les FILS PARTENAIRES CHAUDS.

POURQUOI CE RADAR (cree le 09/09/2026)
Les 6 domaines referents de tokyo-expat viennent tous de la meme mecanique: une
relation email avec un editeur ou un operateur. C'est le SEUL canal qui ait jamais
produit un backlink (le cold outreach est a 0 sur 35). Or il n'avait aucun instrument:
`backlink_followup_watcher` travaille sur `outreach_contacts.json`, qui ne contient ni
GaijinBlog, ni InternationalSchools, ni UniLife, ni PetAir, et n'a pas bouge depuis
le 13/08. Sept fils pouvaient donc dormir sans que personne s'en apercoive - ce qui
est exactement arrive: 4 brouillons ecrits le 06/09 sont restes 3 jours en attente.

CE QU'IL FAIT, ET CE QU'IL NE FAIT PAS
  - Il REGARDE, il n'ecrit rien et n'envoie aucune relance a personne.
    (Alessandro a explicitement refuse la relance automatique le 08/09.)
  - Pour chaque contact suivi: dernier message recu, dernier message envoye, et
    surtout DE QUEL COTE est la balle.
  - Il alerte sur deux situations, et deux seulement:
      1. REPONSE RECUE non traitee (ils ont ecrit apres notre dernier envoi);
      2. SILENCE de notre interlocuteur au-dela de son delai propre.
  - Chaque contact porte son PROPRE delai, parce qu'ils n'ont pas le meme rythme et
    que certains ont recu une promesse de silence de notre part.

  python scripts/warm_threads_watch.py            # rapport + alerte si besoin
  python scripts/warm_threads_watch.py --quiet    # rapport seul, aucune alerte
"""
import datetime as dt
import email
import imaplib
import io
import json
import sys
from email.utils import parsedate_to_datetime
from pathlib import Path

import requests
import urllib3

urllib3.disable_warnings()
sys.path.insert(0, str(Path(__file__).resolve().parent))
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

from config import GMAIL_ADDRESS, GMAIL_APP_PASSWORD, TE_TOKEN, TE_CHAT_ID

ETAT = Path(__file__).resolve().parent / "data" / "warm_threads_state.json"

# silence_du    = jours de silence de LEUR part au-dela desquels on signale.
#                 None = on ne signale JAMAIS (promesse de silence faite, ou fil clos).
# reponse_agit  = leur reponse appelle-t-elle une action de notre part ?
#                 False pour les fils transactionnels, ou un "merci" declencherait
#                 une alerte pour rien. Regle des radars: n'alerter que s'il y a
#                 une action CONCRETE.
# emails        = plusieurs adresses possibles: certains ecrivent depuis un domaine
#                 different de celui auquel on leur ecrit (cas Camilla / Coto).
# reponse_lue_le = date ISO: leur dernier message, recu ce jour-la ou avant, a ete LU et
#                 n'appelle rien (ex: « everything is clear »). Il ne declenche plus l'alerte;
#                 un message recu APRES cette date alerte de nouveau. Ajoute le 22/10/2026.
CONTACTS = [
    {"nom": "Elodie (cliente WHV, bail fini le 31/12)", "emails": ["elogood@hotmail.fr"],
     "silence_du": None, "reponse_agit": True,
     "note": "Lead entrant du 23/10. Email 1 envoye le 23/10 (3 questions). Sa reponse declenche "
             "l'email 2 (prix) : outreach/lead_elodie_2026_10.md. Par email seulement, pas d'appel."},
    {"nom": "Lollyta (mere, fille etudiante TIU Ikebukuro)", "emails": ["lollyta81@yahoo.com"],
     "silence_du": None, "reponse_agit": True,
     "note": "Lead entrant du 25/10. Email 1 envoye le 25/10 15h41 (5 questions : date + duree, age, visa / "
             "nom du bail, budget loyer ou total, priorite). Sa reponse declenche l'email 2 (prix) : "
             "outreach/lead_lollyta_2026_10.md. Revérifier les dispos (UniLife d'abord) avant l'email 2."},
    {"nom": "X-House / Cross House (Takahashi Ai)",
     "emails": ["a.takahashi@x-house.jp", "info_xh@x-house.jp", "xrosshouse.com"],
     "silence_du": None, "reponse_agit": True, "reponse_lue_le": "2026-10-24",
     "note": "24/10 : customer@xrosshouse.com a repondu aux 3 questions Elodie (lu, rien a repondre). PARTENAIRE ACTIF depuis le 24/09. Accord conclu: visibilite editoriale contre "
             "orientation de locataires, sans contrat ni commission. Son message du 25/09 "
             "(« Everything is clear on our side ») clot l'echange: rien a repondre (regle du "
             "21/10, pas de « merci / ok »). Pas de seuil de silence. Une NOUVELLE reponse de "
             "sa part compte toujours. ⚠️ Repondre depuis l'alias contact@tokyo-expat.com."},
    {"nom": "GaijinBlog (Fernando/Damith)", "emails": ["info@gaijinblog.com"],
     "silence_du": 10, "reponse_agit": True,
     "note": "1er canal entrant. Commande move-in costs envoyee le 08/09."},
    {"nom": "Expat Arrivals (Daniel)", "emails": ["daniel@expatarrivals.com",
                                                  "content@expatarrivals.com"],
     "silence_du": 10, "reponse_agit": True,
     "note": "Angle move-in cost myth propose le 08/09."},
    {"nom": "InternationalSchools (Engin)", "emails": ["info@internationalschools.net"],
     "silence_du": 14, "reponse_agit": True,
     "note": "Bouge toujours de lui-meme. Offre ville suivante posee."},
    {"nom": "UniLife (Shin)", "emails": ["n-shin@jsb-g.co.jp", "unilife@jsb-g.co.jp"],
     "silence_du": None, "reponse_agit": True,
     "note": "SILENCE PROMIS de notre part: ne pas relancer, prochain contact = un etudiant reel."},
    {"nom": "Dormy (Kyoritsu)", "emails": ["int@gakuseikaikan.com"],
     "silence_du": None, "reponse_agit": False,
     "note": "Catalogue, pas partenaire. Fil transactionnel: un 'merci' n'appelle rien."},
    {"nom": "PetAir", "emails": ["estimate@petair.jp", "petair.jp"],
     "silence_du": 14, "reponse_agit": True,
     "note": "1er pitch vente directe hors ecoles, envoye le 08/09."},
    {"nom": "Naganuma", "emails": ["info@naganuma-school.ac.jp"],
     "silence_du": None, "reponse_agit": True,
     "note": "Engagement a ne pas relancer, mais une reponse de leur part compte."},
    {"nom": "SNG", "emails": ["h_huynh@sng.ac.jp", "communication@sng.ac.jp"],
     "silence_du": None, "reponse_agit": True,
     "note": "Report poli. Ne pas re-pitcher, mais ecouter s'ils reviennent."},
    {"nom": "Coto / studyinjapan (Camilla)", "emails": ["camilla@cotoacademy.com",
                                                        "camilla@funjapanese.net"],
     "silence_du": 21, "reponse_agit": True,
     "note": "Ecrit depuis funjapanese.net, on lui ecrit sur cotoacademy.com. 2 liens dofollow."},
]


REGISTRE = Path(__file__).resolve().parent / "data" / "outreach_contacts.json"


def contacts_du_plan():
    """Prospects du plan d'attaque (24/10/2026) : les fiches du registre qui portent le
    champ `pilotage`. Jusque-la ce radar ne suivait que les partenaires de septembre et
    ignorait tous les fils vivants (HIVEN, Business France...). Lus dans le registre, pas
    recopies ici : un nouveau prospect avec `pilotage` est suivi sans toucher ce fichier.
    On cherche par DOMAINE (une equipe repond souvent depuis une autre adresse : HIVEN).
    Pas de seuil de silence : les relances vivent dans echeances.json (chantier E).
    `reponse_lue_le` sur la fiche = leur reponse a ete lue et n'appelle rien (PLAZA)."""
    try:
        fiches = json.loads(REGISTRE.read_text(encoding="utf-8"))
    except Exception as e:
        print(f"[WARN] registre illisible, prospects du plan non suivis: {e}")
        return []
    out = []
    for f in fiches:
        if not f.get("pilotage") or "@" not in (f.get("email") or ""):
            continue
        out.append({"nom": f"{f.get('name')} [{f['pilotage']}]",
                    "emails": [f["email"].split("@", 1)[1]],
                    "silence_du": None, "reponse_agit": True,
                    "reponse_lue_le": f.get("reponse_lue_le")})
    return out


def _dossier(m, flag, defaut):
    try:
        for f in (m.list()[1] or []):
            ligne = f.decode("utf-8", "replace")
            if flag in ligne:
                return ligne.split(' "/" ')[-1].strip().strip('"')
    except Exception:
        pass
    return defaut


def _dernier(m, dossier, critere, adresse):
    """Date du dernier message d'un dossier correspondant au critere."""
    try:
        m.select(f'"{dossier}"')
        typ, data = m.uid("SEARCH", None, critere, adresse)
        uids = data[0].split() if data and data[0] else []
        if not uids:
            return None
        _, md = m.uid("FETCH", uids[-1], "(BODY.PEEK[HEADER.FIELDS (DATE)])")
        if not md or not md[0]:
            return None
        return parsedate_to_datetime(email.message_from_bytes(md[0][1]).get("Date"))
    except Exception:
        return None


def main():
    quiet = "--quiet" in sys.argv
    m = imaplib.IMAP4_SSL("imap.gmail.com")
    m.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
    boite = _dossier(m, "\\All", "INBOX")
    envoyes = _dossier(m, "\\Sent", "[Gmail]/Sent Mail")

    maintenant = dt.datetime.now(dt.timezone.utc)
    a_traiter, silencieux, lignes = [], [], []

    for c in CONTACTS + contacts_du_plan():
        # Plusieurs adresses possibles: on garde la date la plus RECENTE de chaque cote.
        recus = [d for a in c["emails"] if (d := _dernier(m, boite, "FROM", a))]
        envois = [d for a in c["emails"] if (d := _dernier(m, envoyes, "TO", a))]
        recu = max(recus) if recus else None
        envoye = max(envois) if envois else None
        if recu is None and envoye is None:
            lignes.append(f"  {c['nom']:<34} aucun echange trouve")
            continue

        j_recu = (maintenant - recu).days if recu else None
        j_envoye = (maintenant - envoye).days if envoye else None

        # De quel cote est la balle ?
        if recu and (not envoye or recu > envoye):
            cote = "EUX ont ecrit en dernier"
            lue = c.get("reponse_lue_le")
            if lue and recu.date() <= dt.date.fromisoformat(lue):
                cote += f" (reponse lue le {lue}, rien a faire)"
            elif c.get("reponse_agit", True):
                a_traiter.append((c["nom"], j_recu))
            else:
                cote += " (transactionnel, pas d'action)"
        else:
            cote = "nous avons ecrit en dernier"
            seuil = c["silence_du"]
            if seuil is not None and j_envoye is not None and j_envoye >= seuil:
                silencieux.append((c["nom"], j_envoye, seuil))

        lignes.append(
            f"  {c['nom']:<34} recu il y a {j_recu if j_recu is not None else '-'}j · "
            f"envoye il y a {j_envoye if j_envoye is not None else '-'}j · {cote}")

    m.logout()

    print(f"=== FILS PARTENAIRES CHAUDS — {dt.date.today().isoformat()} ===")
    for l in lignes:
        print(l)

    # UN SILENCE SE SIGNALE UNE FOIS (24/10/2026) : le meme constat (« GaijinBlog : 45j »)
    # sonnait chaque matin depuis des semaines sans rien demander. On ne signale plus que
    # les silences NOUVEAUX ; un fil qui revit (reponse ou envoi) sort de la liste et
    # pourra etre signale a nouveau. Le rapport console garde tout.
    try:
        deja = set(json.loads(ETAT.read_text(encoding="utf-8")).get("silence_signale", []))
    except Exception:
        deja = set()
    noms_silencieux = [n for n, _, _ in silencieux]
    nouveaux_silences = [s for s in silencieux if s[0] not in deja]

    ETAT.parent.mkdir(exist_ok=True)
    ETAT.write_text(json.dumps({"date": dt.date.today().isoformat(),
                                "a_traiter": a_traiter, "silencieux": silencieux,
                                "silence_signale": noms_silencieux},
                               ensure_ascii=False, indent=2), encoding="utf-8")
    silencieux = nouveaux_silences

    # ALERTE UNIQUEMENT s'il y a une action concrete (regle des radars).
    if quiet or (not a_traiter and not silencieux):
        print("\nRien a signaler (silence = sain).")
        return

    msg = "🤝 <b>FILS PARTENAIRES</b>"
    if a_traiter:
        msg += "\n\n📬 <b>Ils ont repondu, balle dans TON camp :</b>"
        for nom, j in a_traiter:
            msg += f"\n  • {nom} (il y a {j}j)"
    if silencieux:
        msg += "\n\n🕐 <b>Sans nouvelles au-dela du delai :</b>"
        for nom, j, seuil in silencieux:
            msg += f"\n  • {nom} : {j}j de silence (seuil {seuil}j)"
        msg += "\n<i>Constat seulement. Aucune relance automatique.</i>"
    try:
        requests.post(f"https://api.telegram.org/bot{TE_TOKEN}/sendMessage",
                      json={"chat_id": TE_CHAT_ID, "text": msg, "parse_mode": "HTML",
                            "disable_web_page_preview": True},
                      timeout=20, verify=False)
        print("\nAlerte envoyee.")
    except Exception as e:
        print(f"\n[WARN] telegram: {e}")


if __name__ == "__main__":
    main()
