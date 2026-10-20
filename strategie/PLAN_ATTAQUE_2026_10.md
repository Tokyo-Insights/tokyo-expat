# Plan d'attaque tokyo-expat (décidé le 20/10/2026)

## ▶️ État (à mettre à jour à chaque fin de séance)
| Chantier | État | Dernier geste | Prochain geste |
|---|---|---|---|
| A · Offre en une phrase | ✅ FINI le 20/10 | offre validée (`outreach/offre_b2b_2026_10.md` : phrase A « dossier prêt en 48 h », 15k / 60k / 120k / 400k¥ par an, garantie sur le dossier) ; « opérateur » retiré de l'accueil FR+EN (`af23b85`), déployé et vérifié dans le HTML servi | prix à réviser après 3 conversations d'entreprise ; « chasseur immobilier » NON touché (titre d'accueil, à mesurer en GSC avant toute décision) |
| B · LinkedIn | à faire | (aucun) | après A |
| C · Partenaires | en cours | 20/10 : liste et messages validés ; 4 brouillons Gmail prêts (Crown, H&R, PLAZA HOMES, AFJ) ; HIVEN : 26/10 proposé, en attente | il envoie les 4 (depuis l'alias) ; TokyoDev, Sirva, Santa Fe via LinkedIn après B ; inscrire les envoyés au registre avec `no_followup` |
| D · Appels d'écoute | en cours (avancé avant B à sa demande du 20/10) | cible = entreprises qui envoient du personnel au Japon, option C (Occident + Asie anglophone) ; mesure par pays `segment_mutations_formation_2026_10_20.md` ; liste `chantier_D_liste_2026_10.md` : 8 prouvés côté B, 2 côté A | il colle la liste des VIE Japon (site Business France, depuis son navigateur) -> je complète A ; Business France Japon à ajouter en C ; puis trouver la personne par entreprise |
| E · Relances | à faire | (aucun) | en continu dès le premier envoi |
| F · Particuliers | à faire | (aucun) | après D |

Décisions d'Alessandro (20/10/2026) : « on lève la pause », « on attaque fort », « si il faut mettre ma photo de
profil sur LinkedIn alors allons-y aussi ». Pause levée le jour même (commit `bb4191b`).

Ce plan applique les formations marketing (projet `C:\Users\alegu\Marketing_Formations`). Chaque action renvoie à la
fiche qui la justifie : `[075]` = fiche 075 ; relire la source avec
`cd C:\Users\alegu\Marketing_Formations && python outils/chercher.py --voir 075 08:04`.

## Ce dont on part (mesuré, pas supposé)
- 3 clients en 3 mois, tous ENTRANTS (Meg via ChatGPT, GaijinBlog, X-House).
- Prospection à froid : 0/35 (guest posts), 0/12 (RH en direct). Pitch qui apportait une DONNÉE : 1/6.
- Les contacts d'entreprise qui arrivent (Dassault, Equinix, Sofitel) viennent des guides gratuits.
- Stan a vécu exactement la même chose : « pas une seule réponse » sur 50 à 100 démarchages à froid [075 @ 08:13],
  « quasiment 0 % » [276 @ 03:08]. Sa conclusion : le premier client vient du réseau, la prospection vient après [075].

## Garde-fous permanents
- **Vendre avant de construire** (sa règle du 16/09) ; Stan pareil : sa page de vente est arrivée « au moins six mois,
  peut-être un an » après ses premiers clients payants, trouvés au téléphone [373 @ 16:53].
- **Employeur jamais visible** : ni sur le profil LinkedIn, ni dans un message, ni sur le site (règle du 28/08).
- **Rien ne part sous son nom sans validation** : chaque message à un tiers = brouillon qu'il envoie.
- Positionnement conforme : support et conseil, pas de courtage (pas de commission par locataire placé).
- **Séquentiel** : un chantier fini et mesuré avant le suivant.

## Chantier A · L'offre, en une phrase (avant tout contact)
1. Une phrase, un problème que l'acheteur reconnaît déjà, douloureux et urgent [334] [370 @ 71:02] [011]. Côté RH : un
   cadre étranger qui n'est pas opérationnel, qui perd des semaines sur le logement, ou qui repart tôt.
2. Test « je / vous » [001] sur : la page d'accueil, `outreach/b2b-corporate-relocation-offer.md`, l'email Sofitel du 29/09.
3. Trois formules, celle du milieu est celle qu'on vend [110] [318] ; une porte d'entrée payante et petite
   (« projet test ») [006 @ 10:27] [156] [222 @ 01:53] : par exemple un diagnostic logement d'une heure.
4. Une garantie précise, inhabituelle [029] : par exemple remboursé si le dossier n'est pas complet à une date donnée.
Livrable : l'offre réécrite (une page) + la phrase de positionnement. Mesure : il la valide.

## Chantier B · LinkedIn (décidé le 20/10 : photo acceptée)
1. Titre « J'aide [qui] à [résultat] grâce à [moyen] » [081] [082] ; le profil traité comme une page de vente [082].
2. Photo de profil (sa décision) ; expérience présentée côté tokyo-expat UNIQUEMENT, employeur invisible.
3. Ne jamais vendre sur LinkedIn : connexion avec un message court sans vente, puis 3 messages espacés de 3 à 4 jours,
   but unique = sortir sur un appel ou un email [084].
Livrable : profil prêt (textes rédigés par Claude, mis en ligne par lui).

## Chantier C · Partenaires (le canal le plus court vers un premier revenu)
1. Les grandes entreprises passent par des agences déjà en place [292] : les sociétés de relocation (Crown, Asian Tigers,
   etc., contactées en juin comme CLIENTS) se recontactent comme PARTENAIRES à qui il sous-traite la partie japonaise
   [152] [063].
2. HIVEN (Damien et Justin) veut une collaboration : suivre l'appel du 17/10 (voir `project_lead_hiven_damien_2026_10_15`).
Livrable : liste nominative de 10 partenaires possibles + un message par partenaire (brouillons).

## Chantier D · Appels d'écoute (porte 3 : 20 noms, 5 conversations)
1. Liste nominative de 20 entreprises de 10 à 100 employés qui font DÉJÀ venir des étrangers à Tokyo [369 @ 04:19] [378].
2. Demander 10 à 15 minutes pour comprendre leur organisation, SANS rien vendre [363 @ 20:13] ; cadrer l'appel comme un
   conseil gratuit pour eux, pas comme une interview [202 @ 00:41].
3. Premier message en une phrase, demande oui/non [366 @ 44:09] [072] ; jamais de lien de calendrier avant le oui [088].
Mesure : 10 conversations avant de conclure quoi que ce soit [092].

## Chantier E · Prospection ciblée et relances
1. Relancer au moins 3 fois, une fois par semaine, sous un angle différent [168] [080] ; 70 à 90 % des réponses viennent
   d'une relance [077 @ 17:55] ; un non veut dire « pas maintenant », recontacter dans 6 mois [379 @ 14:26].
2. Tableau hebdomadaire : contactés, réponses, rendez-vous, présents [378].

## Chantier F · Particuliers : le système entrant existant, réglé
1. Séquence courte (6 emails sur 12 jours) [031] ; un email où le lecteur clique s'il veut de l'aide [190] ;
   annoncer honnêtement qu'une offre payante viendra [195].
2. Contact d'entreprise qui télécharge un guide : un message utile avec UNE question, pas de pitch.

## Écarté (et pourquoi)
- Publicité Facebook : 1 500 à 3 000 euros de pertes à accepter avant un tunnel rentable [035 @ 14:40] ; capital 0.
- Webinaire, YouTube : demandent une audience existante.
- Message de masse automatisé : 1,3 à 1,6 % de réponses avec un message vague [364 @ 02:32].

## Ordre
Ses mots (20/10) : « un chantier à la fois », ordre laissé à Claude. **Ordre retenu : finir A (formulations du site) -> C -> B -> D -> E -> F.** C avant B : c'est le plus court vers un premier revenu et le dîner HIVEN arrive.

Ordre d'origine : A (offre) -> B (LinkedIn) et C (partenaires) -> D (appels d'écoute) -> E (relances, en continu) -> F.
