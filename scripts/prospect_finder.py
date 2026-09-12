#!/usr/bin/env python3
"""
prospect_finder.py -- Qualifier des prescripteurs et trouver comment les joindre.

🔑 CE QUE CET OUTIL FAIT, ET CE QU'IL NE FAIT PAS
Il ne scrape PAS LinkedIn. Une recherche de personnes y exige d'etre connecte, l'automatiser
viole le contrat d'utilisation et fait restreindre le COMPTE d'Alessandro, et le script
casserait a la premiere evolution de leur page. LinkedIn reste un annuaire qu'on ouvre a la
main: `--segment` fabrique les URL de recherche a cliquer, rien de plus.

Ce qu'il automatise, parce que c'est la ou le temps passe:
  1. QUALIFIER   concurrent ? segment deja mort ? deja dans la base ? deja refuse ?
  2. JOINDRE     email public sur le site, sinon formulaire de contact, sinon rien
  3. CLASSER     sortie prete a verser dans scripts/data/outreach_contacts.json

⚠️ Le demarchage a FROID est mesure a 1/6, 0/35 et 0/12 dans cette base. Les deux seules
conversions etaient CHAUDES ou ENTRANTES. Cet outil reduit le cout d'un essai, il ne change
pas ce taux: **l'angle comptera plus que le canal.**

🚨 N'ECRIT RIEN sans `--add`, et n'envoie JAMAIS d'email.

Usage:
    python scripts/prospect_finder.py --segments                 # segments disponibles
    python scripts/prospect_finder.py --segment relocation       # URL LinkedIn + annuaires
    python scripts/prospect_finder.py --scan domaines.txt        # qualifie + cherche l'email
    python scripts/prospect_finder.py --scan domaines.txt --add  # verse dans la base
"""
import argparse
import io
import json
import re
import sys
import time
from pathlib import Path
from urllib.parse import quote_plus, urljoin

import requests
import urllib3

urllib3.disable_warnings()
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

HERE = Path(__file__).parent
BASE = HERE / "data" / "outreach_contacts.json"
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Gecko/20100101 Firefox/128.0"}

# Segments de PRESCRIPTEURS: des gens qui parlent a quelqu'un qui demenage, sans loger
# eux-memes. C'est la direction preferee (apporteur d'affaires) et la seule qui ait converti.
SEGMENTS = {
    "relocation": {
        "quoi": "Societes de relocation et mobilite internationale au Japon",
        "linkedin": ['"relocation" "Japan" (consultant OR manager OR director)',
                     '"global mobility" Japan Tokyo'],
        "pourquoi": "Ils gerent le mandat mais sous-traitent souvent la recherche de logement.",
    },
    "rh_corporate": {
        "quoi": "RH et mobilite interne des entreprises etrangeres au Japon",
        "linkedin": ['"HR manager" Tokyo "expatriate"',
                     '"mobility specialist" Japan'],
        "pourquoi": "Segment mesure a 0/12 a froid. N'y aller qu'avec un angle neuf.",
    },
    "ecoles": {
        "quoi": "Ecoles de langue et universites accueillant des etrangers",
        "linkedin": ['"student services" Japan language school',
                     '"international office" university Tokyo'],
        "pourquoi": "0/2: elles repondent 'deja couvert'. SEUL angle credible teste: "
                    "la SORTIE DE DORTOIR au 4e mois, qu'aucune liste d'ecole ne sert.",
    },
    "associations": {
        "quoi": "Associations d'expatries, chambres de commerce, clubs",
        "linkedin": ['chamber of commerce Japan president',
                     '"expat community" Tokyo organiser'],
        "pourquoi": "Audience deja constituee, un seul relais touche beaucoup de monde.",
    },
    "animalier": {
        "quoi": "Transport animalier et veterinaires de l'export",
        "linkedin": ['"pet relocation" Japan', '"pet transport" Tokyo'],
        "pourquoi": "Trou d'offre comble de notre cote, et personne ne loge un chien.",
    },
}

# Un prescripteur qui LOGE lui-meme est un concurrent, pas un partenaire.
# Test memorise: "propose-t-il du logement a des etrangers au Japon ?" OUI = concurrent.
CONCURRENT = re.compile(
    r"share\s?house|guest\s?house|gaijin\s?house|serviced apartment|monthly mansion|"
    r"our (rooms|properties|apartments)|book a room|vacanc|listings|"
    r"apartment (search|hunting|finder)|find(ing)? (you )?an apartment", re.I)
JAPON = re.compile(r"japan|tokyo|osaka|kyoto|yokohama|nippon|日本|東京", re.I)

EMAIL = re.compile(r"[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}")
# Adresses a ignorer: techniques, sans humain au bout, ou interdites par la memoire.
EMAIL_POUBELLE = re.compile(
    r"^(noreply|no-reply|donotreply|postmaster|abuse|webmaster|hostmaster|"
    r"privacy|dpo|unsubscribe)@|\.(png|jpg|jpeg|gif|webp|svg|css|js)$", re.I)
PAGES_CONTACT = ["/contact", "/contact-us", "/en/contact", "/about/contact", "/contactez-nous",
                 "/お問い合わせ", "/inquiry"]


def charger_base():
    try:
        return json.loads(BASE.read_text(encoding="utf-8"))
    except Exception:
        return []


def contacts_radar():
    """Les fils suivis par warm_threads_watch.py ne sont PAS dans outreach_contacts.json.
    Sans ce croisement, l'outil proposerait de demarcher quelqu'un deja engage (constate
    sur petair.jp au premier test)."""
    out = {}
    try:
        src = (HERE / "warm_threads_watch.py").read_text(encoding="utf-8")
        # Le bloc se ferme sur un "]" SEUL en debut de ligne: s'arreter au premier "]"
        # rencontre couperait des la premiere liste "emails" (bug du 12/09).
        bloc = re.search(r"CONTACTS\s*=\s*\[(.*?)\n\]", src, re.S).group(1)
        for nom, emails in re.findall(r'"nom":\s*"([^"]+)".*?"emails":\s*\[([^\]]+)\]',
                                      bloc, re.S):
            for e in re.findall(r'"([^"]+)"', emails):
                dom = e.split("@")[-1].lower().lstrip("www.")
                out[dom] = nom
    except Exception:
        pass
    return out


def domaines_connus(base):
    return {(c.get("domain") or "").lower().lstrip("www.") for c in base if isinstance(c, dict)}


def statut_connu(base, radar, domaine):
    for c in base:
        if isinstance(c, dict) and (c.get("domain") or "").lower().lstrip("www.") == domaine:
            return c.get("status")
    if domaine in radar:
        return f"fil suivi par le radar ({radar[domaine]})"
    return None


def recuperer(url):
    try:
        r = requests.get(url, headers=UA, verify=False, timeout=20, allow_redirects=True)
        return r.text if r.status_code == 200 else ""
    except Exception:
        return ""


def scanner(domaine, base, radar):
    """Retourne un dict de qualification pour un domaine."""
    # ﻿: un fichier enregistre en UTF-8 avec BOM colle la marque au 1er domaine.
    domaine = domaine.strip().lstrip("﻿").lower().lstrip("www.").rstrip("/")
    if not domaine or domaine.startswith("#"):
        return None
    res = {"domain": domaine, "emails": [], "form_url": "", "verdict": "", "raison": ""}

    deja = statut_connu(base, radar, domaine)
    if deja:
        res["verdict"] = "DEJA EN BASE"
        res["raison"] = f"statut actuel: {deja}"
        return res

    racine = f"https://{domaine}"
    html = recuperer(racine)
    if not html:
        res["verdict"] = "INJOIGNABLE"
        res["raison"] = "le site ne repond pas en HTTPS"
        return res

    texte = re.sub(r"<[^>]+>", " ", html)
    if CONCURRENT.search(texte) and JAPON.search(texte):
        res["verdict"] = "CONCURRENT"
        res["raison"] = "propose lui-meme du logement a des etrangers au Japon"
        return res

    # Emails: page d'accueil puis pages de contact usuelles
    vus, pages = [], [html]
    for chemin in PAGES_CONTACT:
        p = recuperer(urljoin(racine, chemin))
        if p:
            pages.append(p)
            if not res["form_url"] and re.search(r"<form", p, re.I):
                res["form_url"] = urljoin(racine, chemin)
            time.sleep(0.4)
    for p in pages:
        for e in EMAIL.findall(p):
            e = e.lower()
            if EMAIL_POUBELLE.search(e) or e in vus:
                continue
            if e.split("@")[1].lstrip("www.") not in domaine and domaine not in e:
                continue      # email d'un tiers (prestataire, CMS)
            vus.append(e)
    res["emails"] = vus[:4]

    if res["emails"]:
        res["verdict"] = "A CONTACTER"
        res["raison"] = "email public trouve sur le site"
    elif res["form_url"]:
        res["verdict"] = "FORMULAIRE"
        res["raison"] = "pas d'email public, formulaire de contact disponible"
    else:
        res["verdict"] = "SANS CANAL"
        res["raison"] = "ni email public ni formulaire: LinkedIn a la main, ou passer"
    return res


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--segments", action="store_true")
    ap.add_argument("--segment")
    ap.add_argument("--scan", help="fichier texte, un domaine par ligne")
    ap.add_argument("--add", action="store_true",
                    help="verser les 'A CONTACTER' et 'FORMULAIRE' dans outreach_contacts.json")
    args = ap.parse_args()

    if args.segments or (args.segment and args.segment not in SEGMENTS):
        print("Segments disponibles:\n")
        for nom, s in SEGMENTS.items():
            print(f"  {nom:14} {s['quoi']}")
            print(f"  {'':14} {s['pourquoi']}\n")
        return

    if args.segment:
        s = SEGMENTS[args.segment]
        print(f"=== {args.segment.upper()} — {s['quoi']} ===")
        print(f"{s['pourquoi']}\n")
        print("Recherches LinkedIn a ouvrir A LA MAIN (lecture seule, aucun automate):")
        for q in s["linkedin"]:
            print(f"  https://www.linkedin.com/search/results/people/?keywords={quote_plus(q)}")
        print("\nPuis: noter le DOMAINE de leur employeur dans un fichier texte,")
        print("et lancer  python scripts/prospect_finder.py --scan domaines.txt")
        return

    if not args.scan:
        ap.print_help()
        return

    base = charger_base()
    radar = contacts_radar()
    print(f"Base actuelle: {len(base)} contacts, {len(domaines_connus(base))} domaines, "
          f"plus {len(radar)} domaines suivis par le radar des fils chauds.\n")
    # utf-8-sig: avale le BOM si le fichier a ete enregistre depuis PowerShell.
    lignes = Path(args.scan).read_text(encoding="utf-8-sig").splitlines()
    resultats = []
    for ligne in lignes:
        r = scanner(ligne, base, radar)
        if not r:
            continue
        resultats.append(r)
        canal = r["emails"][0] if r["emails"] else (r["form_url"] or "-")
        print(f"  {r['verdict']:<14} {r['domain']:<34} {canal}")
        if r["verdict"] in ("CONCURRENT", "DEJA EN BASE"):
            print(f"  {'':<14} └ {r['raison']}")

    retenus = [r for r in resultats if r["verdict"] in ("A CONTACTER", "FORMULAIRE")]
    print(f"\n{len(retenus)} prospects retenus sur {len(resultats)} domaines examines.")

    if not args.add:
        print("Rien n'a ete ecrit. Relancer avec --add pour verser dans la base.")
        return

    for r in retenus:
        base.append({
            "domain": r["domain"], "name": r["domain"], "type": "prescripteur",
            "email": r["emails"][0] if r["emails"] else "",
            "approach": "intro", "priority": "medium", "pitch": "",
            "notes": r["raison"], "manual_required": not r["emails"],
            "form_url": r["form_url"], "status": "to_contact",
            "emailed_date": None, "last_contact": None, "response": None,
            "link_obtained": False, "added": time.strftime("%Y-%m-%d"),
        })
    BASE.write_text(json.dumps(base, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Ajoutes a la base: {len(retenus)}. Statut 'to_contact', aucun email envoye.")


if __name__ == "__main__":
    main()
