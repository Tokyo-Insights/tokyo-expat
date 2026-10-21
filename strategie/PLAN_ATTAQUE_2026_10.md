# Plan d'attaque tokyo-expat (décidé le 20/10/2026)

## ▶️ État (à mettre à jour à chaque fin de séance)
| Chantier | État | Dernier geste | Prochain geste |
|---|---|---|---|
| A · Offre en une phrase | ✅ FINI le 20/10 | offre validée (`outreach/offre_b2b_2026_10.md` : phrase A « dossier prêt en 48 h », 15k / 60k / 120k / 400k¥ par an, garantie sur le dossier) ; « opérateur » retiré de l'accueil FR+EN (`af23b85`), déployé et vérifié dans le HTML servi | prix à réviser après 3 conversations d'entreprise ; « chasseur immobilier » NON touché (titre d'accueil, à mesurer en GSC avant toute décision) ; 20/10 après-midi (`1a08d0b`, déployé, vérifié servi) : « j'opère mes propres logements » retiré (À propos + 3 articles FR/EN), « Entité légale japonaise » retiré (aucune structure, ses mots), « 7j/7 » -> « réponse sous 24 h », titre « Comment choisir qui vous accompagne à Tokyo ? ». ⚠️ Les textes refund_* de i18n ne sont affichés NULLE PART ; la vraie garantie particuliers vit dans `app/devis/[offer]` (« remboursé si aucune proposition ») |
| B · LinkedIn | ⏸️ MIS DE CÔTÉ par lui le 20/10 (« je ne me sens pas de le faire maintenant ») | page entreprise existante + slogan posé ; textes et page copier-coller prêts (`outreach/linkedin_profil_2026_10.md`, `outreach/linkedin_copier_coller.html`) ; profil perso NON touché | ne pas le relancer de moi-même ; en attendant, Sirva / Santa Fe / TokyoDev seulement si un email est trouvé |
| C · Partenaires | en cours | 20/10 : 4 envoyés (Crown, H&R, PLAZA HOMES, AFJ) ; **PLAZA HOMES a répondu en 1 h** (Noriko Oseko : « refer clients to us ») = agence agréée nommée pour nos baux longue durée, brouillon de réponse prêt ; HIVEN : 26/10 proposé, en attente | PLAZA : AUCUNE réponse à leur envoyer (sa décision du 21/10 : « pas nécessaire d'envoyer un email juste pour dire merci ou ok », brouillon supprimé par lui) ; ils restent l'agence agréée vers qui référer nos locations longues ; relances des 3 autres au E le 27/10 |
| D · Appels d'écoute | en cours | 21/10 : **Business France Japon** (`tokyo@businessfrance.fr`, gère les ~245 VIE au Japon) ENVOYÉ à 8h41 ; Zenitus + Jolt envoyés le 20/10 ; grands groupes (Airbus H., Capgemini, Wipro, Infosys, TCS) = aucun contact RH/mobilité public hors LinkedIn, voie close tant que B est en pause ; la capture des offres VIE n'est plus demandée | attendre les réponses ; relances à la main au E ; pistes non écrites : Indo-Sakura (formulaire, plutôt partenaire C), Cyient (téléphone seul), Metatechno (formulaire à remplir par lui) |
| E · Relances | démarre le 27/10 | (aucun) | 1/semaine, angle différent, 3 fois : Crown, H&R, AFJ (envoyés 20/10) le 27/10 ; Zenitus, Jolt le 27/10 ; Business France le 28/10 ; tableau contactés / réponses / RDV |
| F · Particuliers | volet 1 ✅ le 20/10 | séquence v2 validée par lui et poussée dans Brevo, FR (1, 2, 3, 7, 8, 9) + EN (4, 5, 6, 10, 11, 12), relue en ligne ; source unique = `scripts/brevo_welcome_sequence.py` ; sauvegardes `scripts/data/brevo_templates_*_backup_2026-10-20.json` ; pied de page EN enfin en anglais | volet 2 (contact d'entreprise qui télécharge un guide = 1 message utile, 1 question) : déjà fait pour Sofitel le 29/09, à faire au cas par cas à chaque nouvelle inscription pro ; mesurer réponses et clics de la séquence dans 3 semaines |
| G · Réseau (ajouté le 20/10, fiche 075) | ⛔ SANS OBJET le 21/10 : ses mots, « je n'ai aucun contact ni réseau, donc je ne peux pas faire l'exercice des 5 cases ». Ne plus le lui demander ; le seul contact connu utile reste l'ami agent 宅建 (complémentaire). Le réseau se CONSTRUIT par C et D (partenaires, appels d'écoute), il ne se mobilise pas | `strategie/chantier_reseau_2026_10.md` : contacts déjà connus classés (ami agent 宅建 = complémentaire n° 1), exercice des 5 cases, messages FR/EN/JP | (aucun : chantier fermé le 21/10) |
| G bis · Réseau EN PERSONNE (21/10, fiches 367 / 070) | ouvert | il accepte les événements en personne (« envisageable ») ; lieux vérifiés : French Tech Connect (gratuit, mensuel, Shibuya), conférences CCIFJ (29/10, 10/11), France Japan Business Summit (01/12) ; règle, phrase de présentation et garde-fou employeur dans `strategie/chantier_reseau_en_personne_2026_10.md` | LUI : choisir sa 1re soirée (vérifier la date du French Tech Connect #41 sur luma.com/frenchtechtokyo) ; mesure après 3 soirées |

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

## Outils transverses
- **Kit d'appel** (20/10) : `strategie/kit_appel_2026_10.md` (fiches 102, 103, 050, 112, 052) : consultation
  particulier, appel d'écoute entreprise, dîner HIVEN. À relire avant CHAQUE appel.

## Ordre
Ses mots (20/10) : « un chantier à la fois », ordre laissé à Claude. **Ordre retenu : finir A (formulations du site) -> C -> B -> D -> E -> F.** C avant B : c'est le plus court vers un premier revenu et le dîner HIVEN arrive.

Ordre d'origine : A (offre) -> B (LinkedIn) et C (partenaires) -> D (appels d'écoute) -> E (relances, en continu) -> F.
