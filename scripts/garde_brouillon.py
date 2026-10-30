"""
garde_brouillon.py -- Garde-fou AVANT la creation d'un brouillon a un tiers (defaut n°13, 30/10/2026).

Alessandro est SALARIE de Modern Living Tokyo et ses clients ne doivent pas le savoir
(memoire user_other_work_furnished_rental.md). Une regle en prose ne protege rien : ce module
BLOQUE le brouillon si le texte contient un nom de l'employeur, un dementi de lien avec les
operateurs (un dementi se retourne contre lui, le silence non), ou une formule retiree du site
(il n'opere pas de logements, il n'a aucune structure legale).

Usage dans un script de brouillon :
    from garde_brouillon import verifier
    verifier(SUBJ + "\n" + texte)        # leve ValueError si un terme interdit est trouve

Controle des brouillons deja dans Gmail (lecture seule) :
    python scripts/garde_brouillon.py --drafts
Auto-test sur des reponses connues :
    python scripts/garde_brouillon.py --test
"""
import re
import sys

INTERDITS = [
    # Employeur et marque voisine (memoire user_other_work_furnished_rental.md, fiche lead Elodie)
    (r"modern\s*living(?!\s+room)", "nom de l'employeur (Modern Living)"),
    (r"modernliving", "domaine de l'employeur"),
    (r"tokyo\s*f[ou]+rnish", "Tokyo Furnished (ne jamais proposer)"),
    (r"モダンリビング", "nom de l'employeur en japonais"),
    # Dementi de lien : interdit, il doit rester sur « I work with these operators regularly »
    (r"sans aucun lien|aucun lien avec (les|l')", "dementi de lien avec les operateurs"),
    (r"no (connection|affiliation|link) (with|to)|not affiliated with", "dementi de lien avec les operateurs"),
    # Formules retirees du site le 20/10 (il est salarie, sans structure legale)
    (r"j'op[eè]re mes|mes propres logements", "il n'opere pas de logements"),
    (r"i (operate|run) my own (properties|apartments|units)|my own properties", "il n'opere pas de logements"),
    (r"entit[eé] l[eé]gale|legal entity", "aucune structure legale"),
]
_RX = [(re.compile(p, re.IGNORECASE), why) for p, why in INTERDITS]


def problemes(texte: str):
    """Liste (extrait, raison) pour chaque terme interdit trouve."""
    out = []
    for rx, why in _RX:
        for m in rx.finditer(texte or ""):
            out.append((m.group(0), why))
    return out


def verifier(texte: str):
    p = problemes(texte)
    if p:
        detail = "; ".join(f"« {x} » ({why})" for x, why in p)
        raise ValueError(f"BROUILLON BLOQUE par garde_brouillon : {detail}")


def _test():
    # Reponses connues : doivent BLOQUER
    doivent_bloquer = [
        "Je vous propose un studio chez Modern Living à Komagome.",
        "See modernlivingjapan.com for details",
        "Tokyo Furnished a aussi des studios",
        "Je n'ai aucun lien avec les opérateurs.",
        "I have no connection with the operator.",
        "J'opère mes propres logements à Tokyo.",
        "Tokyo Expat, entité légale japonaise",
    ]
    # Doivent PASSER (dont le vrai brouillon Elodie et la formule autorisee)
    doivent_passer = [
        "Il existe une autre piste : une chambre en share house, à partir d'environ 25 000 ¥ par mois.",
        "I work with these operators regularly, I have a direct line to them.",
        "A modern living room with a balcony.",
        "Mon Diagnostic coûte 15 000 ¥, il est payé par vous seule.",
    ]
    ko = 0
    for t in doivent_bloquer:
        if not problemes(t):
            print("ECHEC (aurait du bloquer):", t); ko += 1
    for t in doivent_passer:
        if problemes(t):
            print("ECHEC (faux positif):", t, problemes(t)); ko += 1
    print(f"{len(doivent_bloquer)} cas a bloquer, {len(doivent_passer)} cas a laisser passer : "
          f"{'OK' if ko == 0 else str(ko) + ' ECHEC(S)'}")
    return ko


def _drafts():
    import email, imaplib
    from email.header import decode_header, make_header
    sys.path.insert(0, __file__.rsplit("\\", 1)[0] if "\\" in __file__ else ".")
    from config import GMAIL_ADDRESS, GMAIL_APP_PASSWORD
    m = imaplib.IMAP4_SSL("imap.gmail.com")
    m.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
    m.select('"[Gmail]/Drafts"', readonly=True)
    ids = m.search(None, "ALL")[1][0].split()
    print(f"{len(ids)} brouillon(s) dans Gmail")
    alerte = 0
    for i in ids:
        msg = email.message_from_bytes(m.fetch(i, "(BODY.PEEK[])")[1][0][1])
        subj = str(make_header(decode_header(msg.get("Subject", ""))))
        corps = []
        for part in msg.walk():
            if part.get_content_type() in ("text/plain", "text/html"):
                corps.append(part.get_payload(decode=True).decode(part.get_content_charset() or "utf-8", "replace"))
        p = problemes(subj + "\n" + "\n".join(corps))
        if p:
            alerte += 1
            print(f"  ⚠️ {msg.get('To')} | {subj} -> " + "; ".join(f"« {x} » ({w})" for x, w in p))
    m.logout()
    print("Aucun terme interdit." if not alerte else f"{alerte} brouillon(s) a corriger.")
    return alerte


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    if "--test" in sys.argv:
        sys.exit(1 if _test() else 0)
    if "--drafts" in sys.argv:
        sys.exit(1 if _drafts() else 0)
    print(__doc__)
