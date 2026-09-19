# -*- coding: utf-8 -*-
"""
cluster_verdicts.py -- la CARTE PAGE 1, rendue lisible par la machine (17/09/2026).

POURQUOI CE FICHIER EXISTE
--------------------------
La carte page-1 des clusters (etablie le 09/09/2026, verifiee a l'oeil dans un navigateur
le 11/09/2026) vivait uniquement en memoire, en prose. Aucun script ne la lisait. Resultat
constate le 17/09/2026 en ouvrant `data/gsc_opportunities.json`:

    🎯 2848 impr pos 9.8  "tokyo gaijin house"        -> OPTIMISER
    🎯 2373 impr pos 8.9  "cheap gaijin house in tokyo" -> OPTIMISER   (0 clic)
    🎯 1630 impr pos 25.7 "furnished apartment tokyo"  -> OPTIMISER
    🎯 1400 impr pos 19.9 "expat apartments tokyo"     -> ECRIRE

Les QUATRE plus gros "gisements n1" recommandes chaque mercredi sont, dans l'ordre: un
cluster ou un APERCU IA repond au-dessus de nous (donc la position ne produira pas de clic),
le meme cluster une seconde fois, puis DEUX clusters dont la page 1 est tenue a 100 % par des
pages de stock (donc structurellement hors d'atteinte d'un article).

Le defaut n'est pas dans le calcul: `winnable` est vrai, la position EST en page 2-3. Le
defaut est que la position etait le seul critere, alors que deux autres avaient deja ete
etablis et ne se voyaient nulle part dans le code.

CE QUE CE MODULE FAIT, ET CE QU'IL NE FAIT PAS
----------------------------------------------
Il repond a UNE question: "que sait-on de la page 1 de ce cluster ?" et il a le droit de
repondre "rien". Un cluster non cartographie rend `unknown`, jamais `open`: l'absence de
verdict n'est pas un feu vert, et "je ne l'ai pas vu" n'est pas "il n'y en a pas".
Il ne mesure rien, ne va sur aucun reseau: c'est une carte datee, a rafraichir a l'oeil.

Sources: memoire `reference_carte_page1_clusters` (09/09, verifiee a l'oeil le 11/09),
`project_test_titre_gaijin_house_2026_09_09`, `project_gisement_furnished_2026_09_09`.
"""
import re

# --- Statuts. L'ordre compte: le premier qui matche gagne. ---
STOCK = "stock"              # page 1 tenue par des pages de stock -> aucun article n'y passe
APERCU_IA = "apercu_ia"      # un apercu IA repond au-dessus -> la position ne fait pas de clic
OUVERT = "ouvert"            # page 1 composee d'articles -> un article peut y gagner
MARQUE = "marque_concurrent"  # ouvert, mais on cherche la MARQUE d'un concurrent
INCONNU = "inconnu"          # jamais regarde. Ce n'est PAS un feu vert.

# Chaque regle: (mots exiges, statut, pourquoi, date de la verification)
# "mots exiges" = tous presents dans la signature du cluster (mots singularises, sans
# les stopwords tokyo/japan/the/..., cf sig() dans gsc_opportunity_miner.py).
REGLES = [
    (("gaijin", "house"), APERCU_IA,
     "Apercu IA au-dessus (Japan Guide +2, pas nous): c'est lui qui repond, pas le titre. "
     "4 731 impr pour ~0 clic. Test de titre en cours, lire le resultat le 05/10/2026.",
     "2026-09-11, vu dans le navigateur"),

    (("furnished", "apartment"), STOCK,
     "8 resultats sur 8 sont des pages de stock (Hmlet, Plaza Homes, Blueground, Anyplace, "
     "MetroResidences). 18 539 impr / 4 clics sur 90 j. Se capte avec une page qui MONTRE "
     "des biens, pas avec un guide.",
     "2026-09-11, vu dans le navigateur"),

    (("furnished", "rental"), STOCK,
     "Meme famille que 'furnished apartment': intention 'montre-moi du stock'.",
     "2026-09-09, par la donnee"),

    (("expat", "apartment"), STOCK,
     "Ken Corporation, RISE Corp, Plaza Homes, HouseRep, Expedia. Un seul article sur la "
     "page 1 (blog Wise). 1 280 impr / 2 clics.",
     "2026-09-09, par la donnee"),

    (("expat", "housing"), STOCK,
     "Ken Corp, Plaza Homes, YOLO HOME, Apartment Japan. 435 impr / 0 clic.",
     "2026-09-09, par la donnee"),

    (("foreigner", "apartment"), STOCK,
     "Oakhouse, Sakura House, wagaya, Borderless, YourHomeInJapan. 658 impr / 0 clic.",
     "2026-09-09, par la donnee"),

    (("foreigner", "house", "share"), STOCK,
     "Meme page 1 que 'apartment foreigner': operateurs de share house.",
     "2026-09-09, par la donnee"),

    (("social", "apartment"), MARQUE,
     "Page 1 ouverte (Kanpai, Medium, GaijinPot, Quora) MAIS c'est la marque d'un "
     "concurrent (Social Apartment) qui est cherchee: le visiteur veut CE produit. "
     "Gagnable, faible valeur. A ne pas confondre avec une demande generique.",
     "2026-09-09, par la donnee"),

    (("bukken",), OUVERT,
     "Page 1 entierement composee d'ARTICLES (Tokyo Cheapo, Uchi, Savvy Tokyo, Nippon "
     "Tradings, Tokyo Portfolio), zero page de stock. Notre meilleur terrain: "
     "/en/blog/jiko-bukken-cheap-apartments-tokyo est deja la page n1 du site en clics.",
     "2026-09-09, par la donnee"),

    (("appartement",), OUVERT,
     "Cluster FRANCAIS: FrancoTokyo, articles Sakura, et nous sur 2 des 6 resultats. "
     "Le francais est le seul segment ou des humains cliquent.",
     "2026-09-09, par la donnee"),
]

_ETIQUETTES = {
    STOCK: "⛔ FERME (page de stock)",
    APERCU_IA: "🤖 APERCU IA au-dessus",
    OUVERT: "✅ OUVERT aux articles",
    MARQUE: "⚠️ marque d'un concurrent (gagnable, faible valeur)",
    INCONNU: "❔ page 1 jamais regardee",
}


def mots(texte):
    """Mots distinctifs d'un theme ou d'une requete, singularises comme dans le miner.

    Les gens ecrivent `jikobukken` en UN mot au moins aussi souvent qu'en deux, et le
    module rendait alors INCONNU sur notre seul cluster ouvert qui convertit. Mesure du
    19/09/2026 (croisement page x requete de la GSC, 19/08 -> 15/09): les graphies
    agglutinees pesent `jikobukken map` 226 impr, `jikobukken` 89, `jikobukken map japan`
    38, `jikobukken oshimaland` 22, plus la coquille `jikkobukken` 16, TOUTES servies par
    /en/blog/jiko-bukken-cheap-apartments-tokyo. Les traiter en INCONNU revenait a rendre
    invisible ~40 % du cluster. On rattache donc toute graphie contenant `bukken` (et la
    coquille frequente `bukken` mal redoublee) au mot `bukken`.
    """
    bruts = {w[:-1] if w.endswith("s") and len(w) > 4 else w
             for w in re.findall(r"[a-z]+", str(texte).lower()) if len(w) > 2}
    if any("bukken" in w or "buken" in w for w in bruts):
        bruts.add("bukken")
    return bruts


# Une QUESTION n'est pas une recherche d'appartement (garde-fou ajoute le 17/09/2026,
# apres un faux positif observe dans le rapport genere le jour meme: "what is the minimum
# rental period for a furnished apartment in tokyo?" etait classe FERME parce qu'il
# contient furnished + apartment). La carte ferme l'intention "montre-moi du stock";
# l'intention EXPLICATIVE est au contraire le terrain qui reste au site. On ne la declare
# pas ouverte pour autant: on refuse simplement de la fermer.
_QUESTION = re.compile(r"\?|^(what|how|why|when|where|which|who|can|do|does|is|are|should"
                       r"|comment|pourquoi|quand|quel|quelle|est-ce)\b", re.I)


def est_question(texte):
    return bool(_QUESTION.search(str(texte).strip()))


def verdict(theme):
    """Que sait-on de la page 1 de ce cluster ? Rend (statut, pourquoi, date).

    `theme` accepte la signature du cluster ("gaijin house") ou une requete entiere
    ("cheap gaijin house in tokyo"): les deux donnent le meme verdict.
    """
    w = mots(theme)
    question = est_question(theme)
    for exiges, statut, pourquoi, date in REGLES:
        if set(exiges) <= w:
            if statut == STOCK and question:
                return (INCONNU,
                        "Question explicative qui contient des mots d'un cluster ferme: la "
                        "carte ferme la recherche de logement, pas l'explication. Page 1 "
                        "jamais regardee pour cette requete precise.", "")
            return statut, pourquoi, date
    return INCONNU, "Page 1 jamais regardee pour ce cluster. Regarder AVANT d'investir.", ""


def etiquette(statut):
    return _ETIQUETTES.get(statut, _ETIQUETTES[INCONNU])


def actionnable(theme, position=None, low=8, high=30):
    """Un article peut-il encore gagner ce cluster ?

    Trois conditions, pas une seule. La position ne suffit pas: c'est precisement
    l'erreur que ce module corrige.
    """
    statut, _, _ = verdict(theme)
    if statut in (STOCK, APERCU_IA):
        return False
    if position is not None and not (low <= position <= high):
        return False
    return True


def sans_clic(impressions, clics, position, seuil_impr=150, seuil_pos=12):
    """Position haute, volume reel, ZERO clic: quelqu'un repond au-dessus de nous.

    Ce test existe parce que la fenetre 'striking distance' (position 5 a 15) CACHAIT le
    cas le plus parlant du site: "cheap gaijin house in tokyo", 704 impressions en
    position 4,6 et zero clic. Trop bien classe pour la fenetre, donc invisible dans le
    rapport, alors que c'est la ligne a lire le 05/10.
    """
    return bool(impressions >= seuil_impr and clics == 0 and 0 < position <= seuil_pos)


if __name__ == "__main__":
    # Calibrage: des cas dont on connait la reponse, DONT des cas qui doivent rendre INCONNU.
    cas = [
        ("tokyo gaijin house", APERCU_IA),
        ("cheap gaijin house in tokyo", APERCU_IA),
        ("gaijin houses", APERCU_IA),
        ("furnished apartment tokyo", STOCK),
        ("fully furnished apartments tokyo", STOCK),
        ("apartments for rent in tokyo furnished", STOCK),
        ("expat apartments tokyo", STOCK),
        ("apartments for foreigners in tokyo", STOCK),
        ("jiko bukken", OUVERT),
        # Graphies agglutinees: elles pesaient ~40 % du cluster et rendaient INCONNU
        # avant le 19/09/2026. Verifie dans la GSC, elles sont servies par notre page.
        ("jikobukken map", OUVERT),
        ("jikobukken", OUVERT),
        ("jikkobukken", OUVERT),              # coquille frequente, meme intention
        ("jiko buken", OUVERT),               # coquille frequente, meme intention
        ("gaijin house map", APERCU_IA),      # colle: un cluster ferme le reste avec 'map'
        ("social apartments japan", MARQUE),   # gagnable, mais on cherche un concurrent
        ("moving to japan checklist", INCONNU),
        # Faux positif observe dans le rapport du 17/09: une QUESTION contenant les mots
        # d'un cluster ferme n'est pas une recherche de stock.
        ("what is the minimum rental period for a furnished apartment in tokyo?", INCONNU),
        ("how much is a furnished apartment in tokyo", INCONNU),
        # ... mais la requete de stock elle-meme reste fermee.
        ("furnished apartment tokyo price", STOCK),
    ]
    ok = 0
    for texte, attendu in cas:
        got, _, _ = verdict(texte)
        marque = "OK " if got == attendu else "FAUX"
        ok += got == attendu
        print(f"{marque} {texte:<42} -> {got:<10} (attendu {attendu})")
    print(f"\n{ok}/{len(cas)} cas conformes")
    print("sans_clic(704 impr, 0 clic, pos 4.6) =", sans_clic(704, 0, 4.6))
    print("sans_clic(709 impr, 1 clic, pos 8.7) =", sans_clic(709, 1, 8.7))
