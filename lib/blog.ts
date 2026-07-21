export type Locale = 'fr' | 'en'

export interface BlogPost {
  slug: string
  locale: Locale
  title: string
  description: string
  date: string
  readingTime: string
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'trouver-appartement-tokyo-etranger',
    locale: 'fr',
    title: 'Comment trouver un appartement à Tokyo quand on est étranger',
    description: 'Le marché locatif tokyoïte est fermé aux étrangers par défaut. Garant, langue, dossier : voici exactement comment contourner chaque obstacle.',
    date: '2026-06-19',
    readingTime: '8 min',
    content: `
Le marché locatif japonais est l'un des plus fermés au monde pour les étrangers. Pas de résidence permanente, pas de garant japonais, pas de compte bancaire local : la plupart des agences refusent d'instruire votre dossier avant même de vous rencontrer.

Pourtant, des milliers d'expatriés trouvent un logement à Tokyo chaque année. La différence entre ceux qui y arrivent en 2 semaines et ceux qui galèrent 3 mois : la méthode.

**Réponse rapide :** Pour trouver un appartement à Tokyo en tant qu'étranger, ciblez les agences spécialisées internationales et utilisez une société de garantie (garantee company) à la place d'un garant japonais. Les options sans garant les plus rapides sont la share house, le monthly mansion et l'appartement meublé. Notre [guide complet des appartements meublés à Tokyo](/fr/blog/guide-appartements-meubles-tokyo) détaille ces solutions. Préparez votre passeport, votre visa, un justificatif de revenus et une adresse au Japon. Avec la bonne méthode, comptez 2 semaines plutôt que 3 mois.


![Coût d'entrée en mois de loyer, par type de logement à Tokyo](/tokyo-housing-barrier-fr.png "Share house ~1 mois vs location standard ~5 mois plus un garant")
## Le problème du garant (hoshounin)

La quasi-totalité des propriétés traditionnelles japonaises exigent un **hoshounin** (garant personnel) : un citoyen japonais qui accepte de payer votre loyer si vous devenez défaillant. Pour un étranger sans famille japonaise, c'est un mur.

Il existe trois solutions :

**1. Les sociétés de garantie (hoshougaisha)**
Ces sociétés se substituent au garant humain, moyennant une prime annuelle de 0,5 à 1 mois de loyer. La plupart des propriétés modernes acceptent ce système. Coût : environ 50 000 JPY pour un appartement à 100 000 JPY/mois.

**2. Le logement meublé sans garant**
Certains opérateurs de logements meublés, ciblant spécifiquement les étrangers, proposent des baux sans garant. Les conditions d'éligibilité sont plus souples : un visa valide et un contrat de travail suffisent souvent. C'est la voie la plus rapide pour une installation immédiate.

**3. Le logement d'entreprise (shataku)**
Si votre employeur japonais vous prend en charge, il peut louer directement en son nom. Le garant est l'entreprise elle-même. Cette option est très courante dans les grandes sociétés.

## La barrière de la langue

Même en parlant anglais couramment, vous aurez du mal. La plupart des agences immobilières japonaises ne parlent pas anglais. Les contrats de bail (yakkan) font 20 à 30 pages en japonais dense.

Les erreurs classiques des étrangers :
- Signer un contrat sans en comprendre les clauses de résiliation
- Ignorer le "reikin" (clé de courtoisie) payable à l'entrée, non remboursable
- Ne pas savoir que certains baux interdisent les colocataires, les animaux ou le travail à domicile

Un chasseur trilingue lit chaque clause avec vous avant signature.

## Le "reikin" et les frais d'entrée

Au Japon, s'installer dans un appartement standard coûte environ 4 à 6 mois de loyer en frais d'entrée :

- **Shikikin** (dépôt de garantie) : 1 à 2 mois, remboursable
- **Reikin** (clé de courtoisie) : 1 à 2 mois, non remboursable, payable au propriétaire
- **Frais d'agence** : 1 mois HT (légalement plafonné)
- **Prime de garantie** : 0,5 à 1 mois

Pour un appartement à 100 000 JPY/mois, comptez 400 000 à 600 000 JPY d'entrée. Les logements meublés sans reikin existent et permettent de diviser cette somme par deux.

## Le délai réaliste

Chercher seul, sans réseau ni japonais : **6 à 10 semaines** en moyenne.

Avec un chasseur qui a accès à un inventaire immédiat : **7 à 14 jours** entre le premier contact et la remise des clés.

La différence vient du fait que la plupart des biens sur les portails publics classiques sont déjà loués au moment où vous les voyez. Les propriétés disponibles circulent dans des réseaux professionnels avant d'être listées en ligne.

## Les quartiers pour les expatriés

Tokyo est une mégalopole de 14 millions d'habitants. Choisir le mauvais quartier coûte cher en temps de transport et en qualité de vie.

Les zones les plus demandées par les francophones et anglophones :

**Shinjuku / Shin-Okubo** : accès au consulat de France, communauté internationale importante, loyers modérés par rapport au centre.

**Shibuya / Ebisu / Daikanyama** : quartiers branchés, anglophiles, proches des grandes lignes. Loyers élevés (120 000 à 200 000 JPY pour un 1K).

**Minato-ku (Roppongi, Azabu, Hiroo)** : zone historique des expatriés, écoles internationales, supermarchés étrangers. Le plus cher.

**Koto-ku / Sumida-ku** : émergents, bien connectés, loyers 20 à 30% moins chers qu'en zone centrale. Attire les jeunes actifs.

## Les types de logement

**1K / 1DK** : studio avec cuisine séparée, 25 à 40m2. Pour une personne, budget 80 000 à 130 000 JPY/mois en zone centrale.

**1LDK** : salon-cuisine séparé de la chambre, 40 à 55m2. Couple ou personne avec besoin d'espace bureau. 120 000 à 200 000 JPY.

**Share house** : chambre privée dans une maison partagée, cuisine et salle de bains communes. La solution la moins chère (50 000 à 80 000 JPY/mois), idéale pour une installation rapide ou un séjour de moins de 12 mois.

**Maison individuelle (kodate)** : rare en zone centrale, plus accessible en banlieue. Pour les familles.

## Ce que fait un chasseur immobilier

Le rôle d'un chasseur immobilier à Tokyo est fondamentalement différent de celui d'un agent traditionnel. L'agent représente le propriétaire. Le chasseur travaille exclusivement pour vous.

Concrètement :
1. Entretien initial pour cerner vos critères (budget, zone, type, durée)
2. Accès à des propriétés hors marché public
3. Présélection et visite à votre place si vous n'êtes pas encore au Japon
4. Traduction intégrale du contrat avant signature
5. Négociation du reikin et des conditions d'entrée
6. Suivi jusqu'à la remise des clés

Pour une installation réussie à Tokyo, c'est le levier le plus efficace que vous puissiez activer.


Pour votre couverture sante pendant la recherche de logement, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement, activable avant l'assurance nationale japonaise. Pour communiquer avec les agences en japonais, [iTalki](https://www.italki.com/affshare?ref=af32660342) propose des cours avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*
---

*À lire aussi : [Chercher un appartement à Tokyo depuis l'étranger](/blog/chercher-appartement-tokyo-depuis-etranger), [Chercher un appartement à Tokyo depuis l'étranger](/blog/chercher-appartement-tokyo-depuis-etranger).*

*Vous avez un projet d'installation à Tokyo ? Réservez une consultation gratuite de 30 minutes pour évaluer votre situation.*
    `.trim(),
  },
  {
    slug: 'share-house-tokyo-guide-complet',
    locale: 'fr',
    title: 'Share house à Tokyo : guide complet pour expatriés (2026)',
    description: 'Prix, règles, meilleurs quartiers, comment candidater : tout ce que vous devez savoir avant de louer une chambre en share house à Tokyo.',
    date: '2026-06-19',
    readingTime: '6 min',
    content: `
Le share house est la porte d'entrée la plus accessible au marché locatif tokyoïte pour un étranger. Pas de reikin, pas de garant, installation en quelques jours. Mais le modèle a ses règles et ses pièges.

**Réponse rapide :** Un share house à Tokyo coûte 45 000 à 90 000 JPY/mois, sans reikin ni garant japonais, avec une installation possible en quelques jours. Chaque résident a une chambre privée (8 à 16 m²) et partage cuisine, salle de bains et salon. Les charges (eau, électricité, internet) sont souvent incluses. C'est l'option la plus accessible pour un étranger qui arrive à Tokyo.


![Coût d'entrée en mois de loyer, par type de logement à Tokyo](/tokyo-housing-barrier-fr.png "Share house ~1 mois vs location standard ~5 mois plus un garant")
## Qu'est-ce qu'un share house au Japon ?

Un share house (シェアハウス) est une maison ou un appartement où plusieurs résidents partagent les espaces communs : cuisine, salle de bains, salon. Chaque résident dispose d'une chambre privée, généralement de 8 à 16m2.

Contrairement à la colocation française improvisée entre amis, le share house japonais est géré par un opérateur professionnel. Il existe des centaines d'opérateurs à Tokyo, de la chambre à 40 000 JPY/mois dans un immeuble standard aux "designer share houses" à 90 000 JPY avec salle de sport et toit-terrasse.

## Combien ça coûte vraiment ?

**Loyer mensuel** : 45 000 à 90 000 JPY selon la taille de la chambre, le quartier et les équipements.

**Frais d'entrée** : généralement 1 mois de caution remboursable et frais administratifs de 10 000 à 30 000 JPY. Pas de reikin.

**Charges incluses** : eau, électricité, gaz, internet sont souvent inclus dans le loyer. Vérifiez toujours avant de signer.

**Durée minimale** : certains opérateurs acceptent des séjours à partir de 1 mois, d'autres exigent 3 mois minimum.

Budget total pour une installation en share house à Tokyo : **100 000 à 180 000 JPY** (contre 400 000 à 600 000 JPY pour un appartement standard).

## Principaux opérateurs a Tokyo : comparatif des prix

| Type | Loyer mensuel (JPY) | Durée min. | Garant | Profil |
|---|---|---|---|---|
| Budget / périphérie | 40 000-65 000 | 1 mois | Non requis | Arrondissements extérieurs, idéal petits budgets |
| Standard central | 50 000-85 000 | 1 mois | Non requis | Accès direct Yamanote Line ou Chuo Line |
| Premium central | 55 000-100 000 | 1 mois | Non requis | Chambres plus spacieuses, espaces communs soignés |
| Communautaire | 55 000-95 000 | 1 mois | Non requis | Mix résidents japonais et étrangers |

Tous les opérateurs spécialisés expatriés acceptent les locataires étrangers sans garant japonais. Les charges (eau, électricité, internet) sont généralement incluses dans le loyer mensuel.

## Les meilleurs quartiers pour un share house

**Ikebukuro** : très connecté (3 lignes de métro), ambiance internationale, nombreux share houses de bonne qualité entre 50 000 et 70 000 JPY.

**Shinjuku / Nakano** : accès direct à la JR Chuo Line, quartiers vivants, offre abondante.

**Shimokitazawa** : atmosphère village dans la ville, prisée des jeunes créatifs. Attention : moins bien desservi en transport.

**Koenji / Asagaya** : moins connues des étrangers, très accessibles, communauté artistique. Share houses de caractère.

**Saitama / Banlieue nord** : si votre budget est serré (moins de 50 000 JPY), des options existent en banlieue proche avec 30 à 45 min de trajet vers le centre.

## Les règles de vie

Le share house japonais a ses codes. Les transgresser peut valoir un avertissement ou une expulsion :

**Bruit** : les murs sont fins. La règle implicite est "pas de bruit audible depuis le couloir après 22h".

**Cuisine** : nettoyer immédiatement après usage. La vaisselle qui sèche sur l'égouttoir est tolérable une heure, pas une nuit.

**Invités** : la plupart des share houses interdisent ou limitent strictement les invités. Certains interdisent toute visite dans les chambres. Lisez le règlement.

**Poubelles** : le tri sélectif est obligatoire au Japon. Plastique, verre, papier, restes alimentaires : chaque catégorie a son jour de collecte. L'opérateur vous explique les règles de la commune.

## Comment candidater depuis l'étranger

La majorité des share houses acceptent les candidatures en ligne. Le processus :

1. Visite virtuelle ou photos sur le site de l'opérateur
2. Formulaire de candidature : nom, nationalité, profession, date d'arrivée, durée prévue
3. Entretien vidéo (souvent en japonais basique ou anglais)
4. Confirmation et virement de la caution

Le délai entre candidature et confirmation est généralement de 3 à 7 jours.

**Ce que les opérateurs regardent** : la stabilité financière (revenus ou lettre d'employeur), la durée du séjour prévu, et la compatibilité avec les résidents actuels.

## Share house vs appartement : comment choisir ?

Le share house est le bon choix si :
- Vous arrivez pour moins de 18 mois
- Vous voulez rencontrer des gens et pratiquer le japonais
- Votre budget est inférieur à 80 000 JPY/mois
- Vous n'avez pas encore de garant ni de compte bancaire japonais

L'appartement est préférable si :
- Vous prévoyez de rester plus de 2 ans
- Vous avez besoin d'espace (famille, télétravail intensif)
- La vie privée est une priorité absolue


Pour votre couverture sante pendant votre sejour en share house, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement. Pour progresser en japonais avec vos colocataires, [iTalki](https://www.italki.com/affshare?ref=af32660342) propose des cours particuliers avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*
---

*À lire aussi : [Gaijin house vs share house à Tokyo : quelle est la différence ?](/blog/gaijin-house-vs-share-house-difference).*

*Besoin d'aide pour trouver un share house à Tokyo ? Je sélectionne les meilleures options disponibles selon vos critères, sans frais d'agence supplémentaires.*
    `.trim(),
  },
  {
    slug: 'cout-vie-tokyo-expatrie-2026',
    locale: 'fr',
    title: 'Coût de la vie à Tokyo pour les expatriés en 2026 : chiffres réels',
    description: 'Loyer, nourriture, transport, santé : le vrai budget mensuel d\'un expatrié à Tokyo, avec des chiffres concrets par profil.',
    date: '2026-06-19',
    readingTime: '7 min',
    content: `
Combien faut-il gagner pour vivre confortablement à Tokyo en tant qu'expatrié ? La réponse dépend de votre style de vie, mais les chiffres ci-dessous sont des moyennes réelles, pas des estimations touristiques.

**Réponse rapide :** Un expatrié vit confortablement à Tokyo avec environ 200 000 à 350 000 JPY par mois selon le style de vie. Le loyer pèse 40 à 50% du budget : share house 50 000 à 90 000 JPY, studio central 80 000 à 130 000 JPY, 1LDK 130 000 à 200 000 JPY. Ajoutez l'alimentation (~40 000 JPY), le transport, l'assurance santé et les charges. Le loyer est votre principal levier d'économie.


![Fourchette de loyer mensuel par type de logement à Tokyo](/tokyo-housing-rent-range-fr.png "Share house 35k-90k vs location standard 60k-250k JPY")
## Le logement : le poste dominant

Le loyer représente 40 à 50% du budget total d'un expatrié à Tokyo. C'est le levier principal sur lequel vous pouvez agir. Pour le loyer médian par arrondissement et layout, voyez notre [Indice des loyers de Tokyo](/data).

**Share house** : 50 000 à 90 000 JPY/mois (charges généralement incluses)

**Appartement 1K en zone centrale** : 80 000 à 130 000 JPY/mois hors charges

**Appartement 1LDK** : 130 000 à 200 000 JPY/mois

**Appartement 2LDK (couple ou famille)** : 180 000 à 300 000 JPY/mois selon le quartier

Les quartiers les plus abordables à moins de 20 minutes du centre : Koenji, Asagaya, Nerima, Adachi, Katsushika. Les plus chers : Minato-ku, Shibuya-ku, Shinjuku-ku.

Les charges (eau, électricité, gaz) ajoutent 10 000 à 20 000 JPY par mois en été et jusqu'à 25 000 JPY en hiver (climatisation et chauffage).

## La nourriture : maîtrisable

Tokyo est l'une des villes où manger à l'extérieur est le moins cher parmi les grandes métropoles mondiales.

**Manger au restaurant** : un repas du midi dans un restaurant de quartier coûte 800 à 1 200 JPY. Un dîner correct : 1 500 à 3 000 JPY.

**Courses au supermarché** : 30 000 à 50 000 JPY/mois pour une personne qui cuisine régulièrement.

**Budget alimentaire mensuel réaliste** :
- Cuisine à la maison principalement : 30 000 à 40 000 JPY
- Mix cuisine et restaurant : 50 000 à 70 000 JPY
- Restaurant quasi-quotidien : 70 000 à 100 000 JPY

Les konbinis (Lawson, 7-Eleven, FamilyMart) sont une option de repas rapide et peu coûteuse : 400 à 700 JPY par repas.

## Les transports : efficaces et abordables

Tokyo dispose du réseau de transports en commun le plus dense au monde. La voiture est inutile en zone centrale.

**Abonnement mensuel de train/métro** : 10 000 à 20 000 JPY selon la distance. Si votre employeur prend en charge les frais de transport (très courant au Japon), ce poste est nul pour vous.

**Vélo** : une alternative très répandue pour les courtes distances. Un vélo d'occasion : 5 000 à 15 000 JPY.

**Taxi** : cher par rapport à l'Europe. 700 JPY de prise en charge, puis environ 80 JPY par 200 mètres.

## La santé : l'assurance maladie japonaise

Tout résident étranger au Japon doit cotiser à la Kokumin Kenko Hoken (assurance maladie nationale) ou être couvert par l'assurance de son employeur.

**Assurance maladie nationale** : environ 2 000 à 5 000 JPY/mois pour un célibataire avec revenus modérés. Remboursement à 70% des frais médicaux.

**Consultation médecin généraliste** : 1 500 à 3 000 JPY avec l'assurance nationale.

**Pharmacie** : beaucoup de médicaments courants sont en vente libre à bas prix.

## Les loisirs et la vie sociale

Tokyo offre une quantité infinie d'activités, souvent à des prix très abordables :

**Salle de sport** : 4 000 à 10 000 JPY/mois (les gymnases municipaux coûtent 200 à 500 JPY par séance).

**Bars et soirées** : une bière en bar : 500 à 800 JPY. Une soirée en izakaya avec repas : 2 000 à 4 000 JPY.

**Culture** : musées (500 à 1 500 JPY), cinéma (1 800 JPY), concerts.

## Le budget mensuel total selon le profil

**Profil économe (share house, cuisine maison)** : 150 000 à 200 000 JPY/mois

**Profil confort (appartement 1K, mix cuisine/restaurant)** : 220 000 à 300 000 JPY/mois

**Profil expatrié cadre (appartement 1LDK zone centrale, vie sociale active)** : 350 000 à 500 000 JPY/mois

**Famille (2LDK, école internationale)** : 600 000 JPY/mois et plus

## Ce que ces chiffres signifient pour votre recherche de logement

Le loyer est le seul poste sur lequel vous pouvez agir rapidement et significativement. Une économie de 20 000 JPY/mois sur le logement représente 240 000 JPY par an, soit le prix d'un aller-retour France-Japon et quelques voyages régionaux.

Pour identifier les meilleures opportunités dans votre budget, une consultation avec un chasseur local vous évite les visites inutiles et les mauvaises surprises sur les frais d'entrée.


Pour les activites et visites a Tokyo, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) propose des experiences reservables en ligne a tous les budgets. Pour votre couverture sante, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement. *(liens affilies)*
---

*Vous préparez votre installation à Tokyo ? Réservez une consultation gratuite pour établir un budget précis selon votre profil.*
    `.trim(),
  },
  {
    slug: 'quartiers-tokyo-expatries-guide',
    locale: 'fr',
    title: 'Meilleurs quartiers de Tokyo pour les expatriés : guide complet 2026',
    description: 'Shinjuku, Shibuya, Minato, Koenji : quel quartier de Tokyo choisir selon votre budget, votre style de vie et votre lieu de travail ?',
    date: '2026-06-19',
    readingTime: '9 min',
    content: `
Choisir le bon quartier à Tokyo est une décision qui engage votre qualité de vie pour les 12 à 36 prochains mois. Trop central : le loyer dépasse le budget. Trop excentré : les transports grignotent vos soirées. Voici les quartiers qui offrent le meilleur équilibre pour les expatriés francophones et anglophones.

**Réponse rapide :** Les meilleurs quartiers de Tokyo pour expatriés équilibrent loyer, trajet et commodité. Les zones centrales premium (Minato, Shibuya, Meguro) démarrent vers 130 000 JPY pour un studio ; les zones intermédiaires (Setagaya, Nakano, Koto) offrent plus d'espace par yen ; les arrondissements de l'est (Edogawa, Adachi) sont les plus abordables. Choisissez d'abord selon le temps de trajet vers votre bureau, puis selon l'ambiance.

## Shinjuku : le quartier de l'expatrié pratique

**Pour qui** : travailleurs en zone ouest de Tokyo, familles cherchant des services en français

**Loyer moyen 1K** : 90 000 à 140 000 JPY/mois

Shinjuku est l'une des gares les plus fréquentées du monde, avec 12 lignes de train et de métro. C'est ici que se trouve le Consulat général de France, et plusieurs restaurants français et européens.

Le quartier de Shin-Okubo, à 10 minutes à pied, est le quartier coréen de Tokyo : alimentation, restaurants et ambiance internationale à prix raisonnables.

**Avantages** : connectivité maximale, services en langues étrangères, vie nocturne développée

**Inconvénients** : bruyant, les rues autour de Kabukicho sont animées la nuit

## Shibuya / Daikanyama / Ebisu : le triangle branché

**Pour qui** : jeunes actifs, profils créatifs, anglophones

**Loyer moyen 1K** : 120 000 à 180 000 JPY/mois

Ces trois quartiers forment un triangle résidentiel très prisé des expatriés occidentaux. Daikanyama et Ebisu offrent une atmosphère de village avec des cafés de qualité et une architecture soignée. Shibuya est le hub commercial et culturel.

L'accès en transports est excellent : Yamanote Line, Tokyu Toyoko Line, Hibiya Line.

**Avantages** : qualité de vie élevée, nombreux bars et restaurants internationaux, environnement anglophone

**Inconvénients** : loyers parmi les plus élevés de Tokyo

## Minato-ku (Roppongi, Azabu-Juban, Hiroo) : la zone expatriés classique

**Pour qui** : familles avec enfants en école internationale, cadres en mission longue durée

**Loyer moyen 1LDK** : 200 000 à 350 000 JPY/mois

Minato-ku est historiquement la zone résidentielle des expatriés haut de gamme à Tokyo. On y trouve le Lycée franco-japonais, l'école allemande, plusieurs épiceries étrangères (National Azabu, Hiroo Supermarket), et une forte concentration d'ambassades.

Hiroo est le quartier le plus familial, Roppongi le plus festif, Azabu-Juban le plus équilibré.

**Avantages** : infrastructures pour familles, services en anglais partout, sécurité maximale

**Inconvénients** : le plus cher de Tokyo, risque de bulle expatriée (peu de contact avec le Japon réel)

## Nakameguro / Meguro : l'équilibre parfait

**Pour qui** : personnes en couple, profils qui veulent Tokyo authentique sans sacrifier le confort

**Loyer moyen 1K** : 100 000 à 150 000 JPY/mois

Nakameguro est devenu l'un des quartiers les plus populaires de Tokyo. Le canal de Meguro est magnifique au printemps (cerisiers) et le quartier offre une sélection de restaurants et boutiques indépendants de qualité.

**Avantages** : atmosphère agréable, bonne connexion (Tokyu Toyoko, Hibiya Line), moins touristique que Shibuya

**Inconvénients** : loyers en hausse, peu de commerces pratiques du quotidien

## Koenji / Nakano : le choix malin

**Pour qui** : budget limité, jeunes actifs, artistes, personnes qui veulent s'intégrer

**Loyer moyen 1K** : 70 000 à 100 000 JPY/mois

Koenji est le quartier alternatif de Tokyo : friperies, bars à vinyle, petits restaurants. Peu d'étrangers, beaucoup de Japonais créatifs. L'ambiance est décontractée et les loyers sont 30 à 40% moins chers que les quartiers centraux pour une qualité de vie similaire.

La JR Chuo Line relie Koenji à Shinjuku en 7 minutes.

**Avantages** : loyers abordables, accès rapide au centre, authenticité japonaise

**Inconvénients** : peu de services en anglais, moins pratique pour les familles

## Ikebukuro : la ville dans la ville

**Pour qui** : étudiants, budget intermédiaire, fans de culture populaire

**Loyer moyen 1K** : 80 000 à 120 000 JPY/mois

Ikebukuro est souvent négligée par les guides touristiques mais elle est l'une des zones les plus vivantes de Tokyo. Deux grands magasins (Seibu, Tobu), une offre de restaurants coréens et chinois abondante, et une connexion exceptionnelle (Yamanote Line, Marunouchi Line, Seibu et Tobu Lines).

**Avantages** : rapport qualité-prix excellent, animations 7j/7, bien connecté

**Inconvénients** : ambiance moins résidentielle que les quartiers du sud

## Comment choisir selon votre profil

**Vous arrivez seul, budget 100 000 à 150 000 JPY/mois** : Koenji, Nakano, ou Ikebukuro. Qualité de vie élevée, loyers raisonnables.

**Vous venez en couple, budget 180 000 à 250 000 JPY/mois** : Nakameguro, Meguro, ou Ebisu. Équilibre idéal.

**Vous avez des enfants ou une école internationale** : Minato-ku ou Shinjuku. Infrastructures familiales complètes.

**Vous travaillez dans l'est de Tokyo (Marunouchi, Nihonbashi)** : Kiyosumi-Shirakawa, Monzen-Nakacho. Méconnus et abordables.

La règle générale : chaque station supplémentaire de la zone centrale représente environ 10 000 JPY de loyer en moins. Un appartement à 20 minutes de Shibuya coûte souvent 30 à 40% moins cher qu'à 5 minutes.


Pour explorer Tokyo et ses quartiers avant de vous installer, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) propose des visites guidees, experiences culinaires et activites culturelles reservables en ligne. *(lien affilie)*
---

*À lire aussi : [Meilleurs quartiers de Tokyo pour familles expatriées 2026](/blog/quartiers-tokyo-familles-expatriees-guide).*

*Vous hésitez entre deux quartiers ? Lors d'une consultation gratuite, je vous aide à identifier les biens disponibles dans chaque zone selon votre budget réel.*
    `.trim(),
  },
  {
    slug: 'find-apartment-tokyo-foreigner',
    locale: 'en',
    title: 'How to Find an Apartment in Tokyo as a Foreigner (2026 Guide)',
    description: 'Guarantors, language barriers, key money: the Tokyo rental market is notoriously difficult for foreigners. Here is exactly how to navigate it.',
    date: '2026-06-19',
    readingTime: '8 min',
    content: `
Tokyo has one of the most closed rental markets in the world for foreigners. No permanent residency, no Japanese guarantor, no local bank account: most agencies will decline your application before you even visit a property.

**Quick answer:** To rent in Tokyo as a foreigner, start with no-guarantor options (share houses, furnished or monthly mansions) that accept just a passport and visa, or use a bilingual agent plus a guarantor company for a standard lease. Apply remotely before you land, budget 4 to 6 months of upfront costs for a standard lease, and allow 2 to 8 weeks depending on the housing type. If you want to skip the guarantor entirely, our [complete guide to furnished apartments in Tokyo](/en/blog/furnished-apartments-tokyo-guide) breaks down every fast move-in option.

Yet thousands of expats find housing in Tokyo every year. The difference between those who settle in two weeks and those who struggle for three months comes down to method.


![Move-in cost in months of rent, by housing type in Tokyo](/tokyo-housing-barrier-en.png "Share house ~1 month vs a standard lease ~5 months plus a guarantor")
## The guarantor problem

Almost all traditional Japanese rental properties require a **hoshounin** (personal guarantor): a Japanese citizen who agrees to cover your rent if you default. For a foreigner without Japanese family, this is a hard wall.

Three solutions exist:

**1. Guarantee companies (hoshougaisha)**
These companies replace the human guarantor for an annual premium of 0.5 to 1 month of rent. Most modern properties accept this system. Cost: around 50,000 JPY per year for a 100,000 JPY/month apartment.

**2. Furnished rentals with no guarantor required**
Some furnished housing operators targeting foreigners offer leases without a guarantor. Eligibility requirements are looser: a valid visa and an employment contract often suffice. This is the fastest route to immediate housing.

**3. Corporate housing (shataku)**
If your Japanese employer sponsors you, they can lease directly in the company name. The guarantor is the company itself. Very common in large corporations.

## The language barrier

Even if you speak fluent English, you will struggle. Most Japanese real estate agencies do not speak English. Lease agreements (yakkan) run 20 to 30 pages of dense Japanese.

Common mistakes foreigners make:
- Signing a contract without understanding the termination clauses
- Missing the "reikin" (key money), a non-refundable fee paid to the landlord upfront
- Not knowing that some leases prohibit roommates, pets, or working from home

A trilingual property hunter reads every clause with you before you sign anything.

## Key money and move-in costs

In Japan, moving into a standard apartment costs roughly 4 to 6 months of rent in upfront fees:

- **Shikikin** (security deposit): 1 to 2 months, refundable
- **Reikin** (key money): 1 to 2 months, non-refundable, paid to the landlord
- **Agency fee**: 1 month plus tax (legally capped)
- **Guarantee premium**: 0.5 to 1 month

For a 100,000 JPY/month apartment, budget 400,000 to 600,000 JPY upfront. Furnished rentals without reikin exist and can cut this sum in half.

## Realistic timelines

Searching alone, without a network or Japanese: **6 to 10 weeks** on average.

With a hunter who has access to immediate inventory: **7 to 14 days** from first contact to key handover.

The difference comes from the fact that most listings on public portals (Suumo, Homes) are already rented by the time you see them. Available properties circulate through professional networks before appearing online.

> **From the field.** I run furnished rentals in Tokyo, and the pattern is consistent: the best foreigner-friendly units barely touch the public portals. They move through operator and agent networks first, so by the time a good no-guarantor place appears on Suumo, it is usually already gone. Arriving with a network, or someone who has one, beats refreshing listing sites.

## Best neighbourhoods for expats

Tokyo is a metropolis of 14 million people. Choosing the wrong neighbourhood costs you in commute time and quality of life.

**Shinjuku / Shin-Okubo**: access to the French Consulate, significant international community, moderate rents compared to the centre.

**Shibuya / Ebisu / Daikanyama**: trendy, English-friendly, close to major train lines. High rents (120,000 to 200,000 JPY for a 1K).

**Minato-ku (Roppongi, Azabu, Hiroo)**: the historic expat zone, international schools, foreign supermarkets. The most expensive.

**Koto-ku / Sumida-ku**: up and coming, well connected, rents 20 to 30% cheaper than central areas. Popular with young professionals.

## Property types

**1K / 1DK**: studio with separate kitchen, 25 to 40sqm. For one person, budget 80,000 to 130,000 JPY/month in central areas.

**1LDK**: separate living room and kitchen, 40 to 55sqm. For couples or those needing a home office. 120,000 to 200,000 JPY.

**Share house**: private room in a shared house, communal kitchen and bathroom. The cheapest option (50,000 to 80,000 JPY/month), ideal for a quick setup or a stay under 12 months.

**Kodate (house)**: rare in central areas, more accessible in the suburbs. For families.

## What a property hunter does

A property hunter in Tokyo works fundamentally differently from a traditional agent. The agent represents the landlord. The hunter works exclusively for you.

In practice:
1. Initial interview to define your criteria (budget, area, type, duration)
2. Access to off-market inventory
3. Pre-screening and visits on your behalf if you are not yet in Japan
4. Full translation of the lease before signing
5. Negotiation of key money and entry conditions
6. Follow-up through to key handover

For a successful move to Tokyo, it is the most efficient lever you can activate.

## Frequently asked questions

**Can foreigners rent apartments in Tokyo?** Yes. Foreigners rent apartments in Tokyo every day, either through no-guarantor options (share houses, furnished and monthly mansions) or a standard lease arranged with a bilingual agent and a guarantee company.

**What kind of apartments in Tokyo accept foreigners?** Share houses, social apartments and monthly mansions are built for foreign tenants and need no Japanese guarantor. For the full breakdown of foreigner-friendly options, see our guide to [expat and gaijin apartments in Tokyo](/en/blog/expat-apartments-tokyo).

**Do I need a guarantor to rent an apartment in Tokyo as a foreigner?** Not always. No-guarantor rentals exist, and standard leases accept a guarantee company (hoshougaisha) in place of a personal Japanese guarantor.

**How much does an apartment for foreigners in Tokyo cost?** From around 50,000 JPY per month for a share house room to 200,000 JPY for a central furnished studio, plus four to six months of upfront fees on a standard lease.

**Can I rent an apartment in Tokyo before I arrive?** Yes. Share houses, furnished flats and monthly mansions can be booked from abroad with a passport and visa, so you can secure housing before you land.


For health coverage during your apartment search, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment, activatable before Japanese national insurance. To communicate with agencies in Japanese, [iTalki](https://www.italki.com/affshare?ref=af32660342) offers lessons with native teachers from $10/hour. *(affiliate links)*
---

*See also: [How to Find an Apartment in Tokyo from Abroad (Remote Hunting Guide)](/blog/tokyo-apartment-hunting-from-abroad), [Finding an Apartment in Tokyo in September: What Changes vs Spring](/blog/find-apartment-tokyo-september), [Furnished Apartment Tokyo: 5 Best Options for Expats in 2026](/blog/furnished-apartment-tokyo-top-5-expats).*

*Planning to move to Tokyo? Book a free 30-minute consultation to assess your situation and see what is available now.*
    `.trim(),
  },
  {
    slug: 'moving-to-tokyo-checklist-2026',
    locale: 'en',
    title: 'Moving to Tokyo in 2026: Complete Expat Checklist',
    description: 'Visa, housing, bank account, residence card, health insurance: the complete step-by-step checklist for relocating to Tokyo as a foreigner.',
    date: '2026-06-19',
    readingTime: '10 min',
    content: `
Relocating to Tokyo involves more paperwork and bureaucratic steps than most expats anticipate. This checklist covers everything from visa selection to setting up utilities, in the order you should tackle each step.

**Quick answer:** Moving to Tokyo runs in a clear order: confirm your visa, secure housing before you arrive, then within 14 days register your address at the ward office and collect your residence card. Next, open a bank account, enrol in national health insurance, get a SIM card, and set up utilities. Sorting the visa and housing first makes every later step easier.


![When to look for housing in Tokyo, by season](/tokyo-seasonality-en.png "Feb-Apr peak vs the May-Aug lull, the best time to negotiate")
## Step 1: Secure the right visa (before you leave)

Your visa determines almost everything: what you can rent, where you can open a bank account, and how long you can stay.

**Working visa (Engineer / Humanities / International Services)**: the most common for skilled workers. Requires a job offer and company sponsorship. Duration: 1 to 5 years, renewable.

**Highly Skilled Professional (HSP)**: point-based system. If you qualify (usually 70+ points based on age, education, salary, and job type), you get priority processing and easier permanent residency later.

**Spouse of Japanese national**: unlimited work permission.

**Working Holiday** (available for French and Australian citizens aged 18 to 30): 1 year, unrestricted work up to a certain threshold.

**Student visa**: allows part-time work (28 hours per week). Does not allow signing most lease agreements as the primary tenant.

Key point: you cannot enter Japan on a tourist visa and then switch to a working visa from inside the country. The visa must be obtained before arrival.

## Step 2: Find housing before you arrive

Finding housing remotely is possible, but requires a structured approach. Most foreigners make the mistake of arriving in Tokyo, staying in a hotel or Airbnb, and then spending 4 to 8 weeks searching while bleeding money on temporary accommodation.

The better sequence:
1. Start your search 4 to 8 weeks before arrival
2. Contact a property hunter who can visit on your behalf and send video walkthroughs
3. Sign remotely and have the keys ready for your arrival day

For share houses: most operators accept remote applications and confirm within 3 to 7 days.

For apartments: some landlords accept video visits and remote signing, especially for furnished units targeting foreigners.

## Step 3: Register at the ward office (within 14 days of arrival)

This is the most important administrative step and the one most overlooked by new arrivals.

Within 14 days of moving into your address, you must register at your local ward office (kuyakusho) to obtain your **Residence Card** (Zairyu Card). The card will be stamped with your registered address.

What you need:
- Your passport with valid visa
- Your rental contract or proof of address
- The Zairyu Card issued at the airport on arrival

Your Residence Card is the foundation of your life in Japan. You need it to open a bank account, get a SIM card with a contract, and access most public services.

## Step 4: Open a bank account

Opening a bank account in Japan used to require 6 months of residence. This has changed significantly.

**Japan Post Bank (Yucho)**: the most expat-friendly. Can open with a Residence Card and passport, even recently arrived.

**Sony Bank**: fully online, English interface, excellent for international transfers. Requires a My Number Card (see Step 5).

**Wise**: not a Japanese bank, but allows you to receive and send JPY. Useful as a bridge account while waiting for a Japanese bank.

**SMBC, Mizuho, MUFG (major Japanese banks)**: more difficult for recent arrivals. Usually require 6 months of registered residence.

## Step 5: Get your My Number (Individual Number)

My Number is Japan's tax and social security identification system, equivalent to a Social Security Number or INSEE number.

You will receive a notification letter at your registered address within 2 to 3 weeks of registration. Take this letter to the ward office to receive your **My Number Card** (photo ID card version), which usually takes 1 to 2 months to be issued.

You need My Number for:
- Filing taxes
- Applying for national health insurance
- Opening certain bank accounts (Sony Bank, Rakuten Bank)
- Accessing government benefits

## Step 6: Enrol in national health insurance

If your employer does not provide health insurance (shakai hoken), you must enrol in the national health insurance scheme (Kokumin Kenko Hoken) at your ward office.

Premium: varies by income. For a new arrival with no Japanese income history, it is usually 2,000 to 5,000 JPY per month. Coverage: 70% of medical costs.

Enrol within 14 days of losing or not having other coverage. Late enrolment means paying backdated premiums.

## Step 7: Get a SIM card

Three options:

**Contract SIM (docomo, SoftBank, au)**: requires a Residence Card and bank account. Cheapest per month (2,000 to 4,000 JPY) but involves a commitment period.

**MVNO SIM (IIJmio, OCN Mobile, mineo)**: contract SIM on a major network, more flexible, similar prices. Good English support options.

**Prepaid SIM**: available immediately at the airport. More expensive per month and limited to data only (no phone number for calls).

## Step 8: Get a Japanese driving licence (if needed)

If you hold an EU or Australian driving licence, you can convert it to a Japanese licence at the licensing centre without taking a practical test. Required documents include your original licence, an official translation from your country's embassy, and your Residence Card.

The process takes one day and costs approximately 3,000 to 5,000 JPY.

Note: a Japanese driving licence doubles as a government-issued photo ID for daily use.

## Step 9: Set up utilities at your apartment

If you are renting an unfurnished apartment (rather than a share house where utilities are included):

**Electricity**: contact Tokyo Electric Power Company (TEPCO) online or by phone. Can be set up the day you move in.

**Gas**: a technician must come to your apartment to open the gas line. Book 1 to 2 days in advance.

**Water**: already connected in most apartments. Register with the local water authority within a few days.

**Internet**: the fastest option is a home router SIM card (available same day). Fibre broadband takes 2 to 4 weeks to install.

## Step 10: Register for tax filing

If you are employed in Japan, your employer handles income tax withholding and year-end adjustments (nenmatsu chosei). You likely will not need to file separately.

If you are self-employed, freelance, or have side income: you must file a Kakuteishinkoku (individual tax return) between February 16 and March 15 each year.

Important: Japan taxes worldwide income for tax residents (those who have lived in Japan for more than 5 years in the last 10). If you are on a short-term assignment, you are taxed only on Japan-source income.

## Next steps: housing and lease

Before you sign your lease, work through our complete [Tokyo rental contract checklist](/en/blog/tokyo-rental-contract-checklist), every clause worth reviewing, hidden fees to watch for, and what you can negotiate before committing. If you are still searching from outside Japan, our guide to [finding an apartment in Tokyo from abroad](/en/blog/tokyo-apartment-hunting-from-abroad) covers remote search, virtual tours, and operators who accept international applications.


For health coverage during your transition, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment. To build your Japanese before or after arrival, [iTalki](https://www.italki.com/affshare?ref=af32660342) offers lessons with native teachers from $10/hour. *(affiliate links)*
---

*See also: [Best International Moving Companies to Japan (2026)](/blog/international-moving-company-japan-guide).*

*Planning your relocation to Tokyo? Book a free consultation to get housing options ready before you land.*
    `.trim(),
  },
  {
    slug: 'tokyo-expat-cost-of-living-2026',
    locale: 'en',
    title: 'Cost of Living in Tokyo for Expats in 2026: Real Numbers',
    description: 'Rent, food, transport, healthcare: the real monthly budget for an expat in Tokyo, broken down by lifestyle and neighbourhood.',
    date: '2026-06-19',
    readingTime: '7 min',
    content: `
How much do you need to live comfortably in Tokyo as a foreigner? The answer depends on your lifestyle, but the numbers below are real averages, not tourist estimates.

**Quick answer:** A foreigner lives comfortably in Tokyo on roughly 200,000 to 350,000 JPY per month depending on lifestyle. Rent is 40 to 50% of the budget: share house 50,000 to 90,000 JPY, central studio 80,000 to 130,000 JPY, 1LDK 130,000 to 200,000 JPY. Add food (~40,000 JPY), transport, health insurance and utilities. Rent is your main lever to save.


![Monthly rent range by housing type in Tokyo](/tokyo-housing-rent-range-en.png "Share house 35k-90k vs standard rental 60k-250k JPY")
## Housing: the dominant cost

Rent represents 40 to 50% of a Tokyo expat's total budget. It is also the main lever you can act on. For median rent by ward and layout, see our [Tokyo Rent Index](/data).

**Share house**: 50,000 to 90,000 JPY/month (utilities usually included)

**1K apartment in a central area**: 80,000 to 130,000 JPY/month before utilities

**1LDK apartment**: 130,000 to 200,000 JPY/month

**2LDK apartment (couple or family)**: 180,000 to 300,000 JPY/month depending on the neighbourhood

Most affordable neighbourhoods within 20 minutes of the centre: Koenji, Asagaya, Nerima, Adachi, Katsushika. Most expensive: Minato-ku, Shibuya-ku, Shinjuku-ku.

Utilities (water, electricity, gas) add 10,000 to 20,000 JPY per month in summer and up to 25,000 JPY in winter.

## Food: manageable and often surprising

Tokyo is one of the most affordable cities in the world for eating out, relative to the quality.

**Restaurant meal**: lunch at a neighbourhood restaurant costs 800 to 1,200 JPY. A decent dinner: 1,500 to 3,000 JPY.

**Groceries**: 30,000 to 50,000 JPY/month for one person cooking regularly.

**Realistic monthly food budget**:
- Mostly cooking at home: 30,000 to 40,000 JPY
- Mix of cooking and eating out: 50,000 to 70,000 JPY
- Eating out most days: 70,000 to 100,000 JPY

Convenience stores (Lawson, 7-Eleven, FamilyMart) offer fast and cheap meals at 400 to 700 JPY.

## Transport: efficient and affordable

Tokyo has the densest public transport network in the world. A car is unnecessary in central areas.

**Monthly train/metro pass**: 10,000 to 20,000 JPY depending on distance. If your employer covers commuting costs (very common in Japan), this is zero for you.

**Bicycle**: a popular option for short distances. A second-hand bike costs 5,000 to 15,000 JPY.

**Taxi**: expensive compared to Europe. 700 JPY base fare, then approximately 80 JPY per 200 metres.

## Healthcare: national health insurance

Every foreign resident in Japan must enrol in national health insurance (Kokumin Kenko Hoken) or be covered by their employer.

**National health insurance**: approximately 2,000 to 5,000 JPY/month for a single person with moderate income. Covers 70% of medical costs.

**GP visit**: 1,500 to 3,000 JPY with national insurance.

**Pharmacy**: most common medications are available over the counter at low prices.

## Leisure and social life

**Gym**: 4,000 to 10,000 JPY/month. Municipal gyms cost 200 to 500 JPY per session.

**Bars and dining**: a beer at a bar: 500 to 800 JPY. A night out at an izakaya with food: 2,000 to 4,000 JPY.

**Culture**: museums (500 to 1,500 JPY), cinema (1,800 JPY).

## Total monthly budget by profile

**Budget profile (share house, cooking at home)**: 150,000 to 200,000 JPY/month

**Comfort profile (1K apartment, mix cooking/dining)**: 220,000 to 300,000 JPY/month

**Professional expat (1LDK central, active social life)**: 350,000 to 500,000 JPY/month

**Family (2LDK, international school)**: 600,000 JPY/month and up

## What this means for your housing search

Rent is the only major expense you can reduce significantly and immediately. Saving 20,000 JPY/month on housing equals 240,000 JPY per year, enough for a return flight to Europe and several regional trips.

Finding the right property at the right price in the right neighbourhood is where a local property hunter adds the most value: access to off-market options and honest advice on where to compromise and where not to.


For activities and sightseeing in Tokyo, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) offers experiences bookable online at all budgets. For health coverage, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment. *(affiliate links)*
---

*Preparing your move to Tokyo? Book a free consultation to map out a realistic budget and see what is available in your range.*
    `.trim(),
  },
  {
    slug: 'visa-travail-japon-francophone-2026',
    locale: 'fr',
    title: 'Visa travail au Japon pour les francophones : quel type choisir en 2026 ?',
    description: 'Visa ingénieur, travailleur hautement qualifié, working holiday : les options de visa pour travailler au Japon expliquées pour les ressortissants français et belges.',
    date: '2026-06-19',
    readingTime: '8 min',
    content: `
Travailler au Japon en tant que francophone est tout à fait possible, mais le système de visas japonais est complexe et mal documenté en français. Voici les principales catégories de visas pour les ressortissants français, belges et suisses, avec les conditions réelles pour chacune.

**Réponse rapide :** Pour travailler au Japon, il faut un visa de travail parrainé par un employeur, dans une catégorie adaptée à votre poste (ingénieur/spécialiste en sciences humaines, transfert intra-entreprise, professeur, etc.). Il exige en général un diplôme ou une expérience équivalente et un contrat. Le PVT et le visa nomade digital sont des alternatives pour certains profils.

## Le visa ingénieur / humanités / services internationaux (le plus courant)

C'est le visa de travail standard pour les professionnels qualifiés au Japon. Il couvre un large éventail de métiers : développeurs, ingénieurs, traducteurs, professeurs de langues, marketing international, ressources humaines.

**Conditions** :
- Un diplôme universitaire (licence minimum) dans un domaine lié au poste
- Ou 10 ans d'expérience professionnelle dans le domaine (sans diplôme)
- Une offre d'emploi ferme d'une entreprise japonaise qui fait la demande de visa en votre nom
- Le salaire doit être équivalent à celui d'un Japonais au même poste

**Durée** : 1 an, 3 ans ou 5 ans selon le profil et l'entreprise. Renouvelable indéfiniment.

**Délai** : 1 à 3 mois après soumission du dossier. Certaines entreprises sont "reconnues" par l'immigration japonaise et bénéficient de délais réduits (2 semaines).

**Ce que ce visa vous permet** : travailler uniquement pour l'employeur mentionné sur le visa. Changer d'employeur nécessite de modifier le statut de résidence.

## Le visa travailleur hautement qualifié (HSP)

Le système HSP (Highly Skilled Professional) est un système à points. Si vous cumulez 70 points ou plus selon un barème officiel, vous obtenez un statut préférentiel avec de nombreux avantages.

**Les points sont attribués selon** :
- L'âge (plus on est jeune, plus on a de points : 15 points avant 30 ans, 10 entre 30 et 35 ans)
- Le niveau de diplôme (doctorat = 30 points, master = 20 points, licence = 10 points)
- Le salaire annuel (70 points pour 10 millions JPY/an, 40 points pour 4 millions JPY/an)
- L'expérience professionnelle
- Les brevets déposés
- La recherche académique
- La connaissance du japonais (JLPT N1 ou N2 ajoute des points)

**Avantages du HSP par rapport au visa standard** :
- Résidence permanente accessible après 1 à 3 ans (au lieu de 10 ans normalement)
- Autorisation de faire venir les parents au Japon dans certains cas
- Autorisation de travailler dans plusieurs entreprises simultanément
- Le conjoint peut travailler sans restriction

**Comment calculer ses points** : le Ministère de la Justice japonais propose un calculateur officiel en ligne (en japonais, mais les chiffres parlent d'eux-mêmes).

## Le working holiday pour les moins de 30 ans

La France, la Belgique et le Canada ont des accords de working holiday avec le Japon. La Suisse n'est pas incluse dans cet accord.

**Conditions** :
- Avoir entre 18 et 30 ans (jusqu'à 30 ans inclus au moment de la demande)
- Être ressortissant français ou belge
- Ne pas avoir de charges familiales (conjoint ou enfants dépendants)
- Ne jamais avoir obtenu de visa working holiday pour le Japon auparavant

**Ce que ce visa permet** :
- Séjour d'1 an au Japon
- Travail sans restriction particulière sur le type d'emploi
- Possibilité de changer d'employeur librement
- Études jusqu'à 6 mois

**Ce qu'il ne permet pas** :
- Être renouvelé (une seule utilisation possible)
- Travailler dans des établissements de divertissement pour adultes

**Quota annuel** : 1 500 places pour la France, accordées sur demande dans l'ordre de réception. Les demandes ouvrent en janvier. Il est fortement conseillé de postuler dès l'ouverture.

## Le visa étudiant

Si vous venez étudier le japonais dans une école de langue ou dans une université japonaise, le visa étudiant est la voie naturelle.

**Ce qu'il permet** :
- Rester au Japon pendant la durée des études
- Travailler jusqu'à 28 heures par semaine (autorisation à demander séparément à l'immigration)

**Ce qu'il ne permet pas** :
- Signer la plupart des contrats de bail en tant que locataire principal (beaucoup de propriétaires refusent)
- Changer de statut facilement si vous trouvez un emploi (il faut souvent rentrer et repostuler)

Pour loger, les étudiants sont orientés vers les résidences universitaires ou les share houses, qui acceptent généralement les visas étudiants.

## Le visa conjoint de ressortissant japonais

Si vous êtes marié à un citoyen japonais, vous obtenez un visa conjoint qui vous permet de travailler sans restriction, dans n'importe quelle entreprise et dans n'importe quel secteur.

Ce visa ne dépend pas d'un employeur et n'est pas lié à un poste spécifique. Il est renouvelable tant que le mariage est valide.

## Les erreurs à éviter absolument

**Arriver au Japon en touriste en espérant changer de visa sur place** : c'est légalement possible dans certains cas très précis, mais les délais administratifs (plusieurs semaines) pendant lesquels vous ne pouvez pas travailler légalement rendent cette approche risquée. La voie normale est d'obtenir le visa dans votre pays avant de partir.

**Changer d'employeur sans signaler le changement de statut** : le visa de travail est lié à un employeur. Si vous changez d'emploi, vous devez déclarer le changement au bureau de l'immigration dans les 14 jours.

**Travailler au-delà des heures autorisées avec un visa étudiant** : le quota de 28h/semaine est contrôlé. Le dépassement peut entraîner la non-renouvellement du visa.

## Quel visa choisir selon votre situation ?

**Vous avez une offre d'emploi** : visa ingénieur/humanités (ou HSP si vous cumulez 70+ points).

**Vous avez moins de 30 ans et voulez tester le Japon** : working holiday. C'est la porte d'entrée la plus souple.

**Vous venez pour des études** : visa étudiant avec autorisation de travail partiel.

**Vous êtes marié à un Japonais** : visa conjoint, le plus flexible.

Une fois votre visa obtenu, l'étape suivante est de trouver un logement. Les contraintes varient selon le type de visa : un visa ingénieur facilite l'accès aux appartements standard, tandis que les titulaires de working holiday ou de visa étudiant sont souvent orientés vers les share houses.

## Deux Options Supplémentaires à Connaître

**Visa Nomade Digital (2024)** : si vous travaillez à distance pour une entreprise basée hors Japon et gagnez plus de 10 millions JPY par an, le visa nomade digital vous permet de rester au Japon jusqu'à 6 mois (prorogeable une fois). Disponible pour les ressortissants de plus de 50 pays. Voir notre [guide complet du Visa Nomade Digital Japon](/blog/visa-nomade-digital-japon-2026).

**Programme Vacances Travail (PVT)** : pour les ressortissants de 18 à 30 ans des pays partenaires (France, Canada, Allemagne, Irlande et autres), le PVT Japon permet de rester 12 mois sans être lié à un employeur. L'option long séjour la plus accessible pour les jeunes. Voir notre [guide complet du PVT Japon](/blog/pvt-japon-visa-vacances-travail-2026).


Pour votre couverture sante et celle de votre famille pendant la transition, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement, activable avant votre inscription a l'assurance nationale japonaise. Pour apprendre le japonais avant votre arrivee, [iTalki](https://www.italki.com/affshare?ref=af32660342) propose des cours particuliers avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*
---

*Vous avez votre visa et cherchez un logement à Tokyo ? Réservez une consultation gratuite pour voir les options disponibles dès votre arrivée.*
    `.trim(),
  },
  {
    slug: 'ouvrir-compte-bancaire-japon-etranger',
    locale: 'fr',
    title: 'Ouvrir un compte bancaire au Japon en tant qu\'étranger : guide 2026',
    description: 'Japan Post Bank, Sony Bank, Rakuten : quelle banque choisir et comment ouvrir un compte bancaire au Japon sans parler japonais, avec un visa récent.',
    date: '2026-06-19',
    readingTime: '6 min',
    content: `
Ouvrir un compte bancaire au Japon est l'une des premières démarches administratives à régler après l'obtention de votre carte de résidence. Sans compte bancaire japonais, vous ne pouvez pas recevoir un salaire japonais, payer votre loyer par virement, ni obtenir un SIM card en contrat.

**Réponse rapide :** Pour ouvrir un compte bancaire au Japon en tant qu'étranger nouvellement arrivé, les options les plus accessibles sont Japan Post Bank (Yucho) et les banques en ligne (Sony Bank, Rakuten). Il vous faut votre carte de résidence, idéalement votre My Number, et parfois un hanko (sceau personnel). La plupart des banques classiques exigent 6 mois de résidence, mais Yucho accepte souvent dès l'arrivée.

## Ce dont vous avez besoin avant de commencer

Toutes les banques japonaises exigent au minimum :
- Votre **carte de résidence** (Zairyu Card) avec votre adresse enregistrée
- Votre **passeport**
- Votre adresse au Japon (l'adresse doit être enregistrée à la mairie avant d'ouvrir un compte)

Certaines banques demandent également :
- Votre numéro My Number (le numéro fiscal japonais, reçu par courrier 2 à 3 semaines après l'enregistrement à la mairie)
- Un cachet d'enregistrement personnel (hanko) - de moins en moins exigé
- Une preuve d'emploi ou de revenus

## Japan Post Bank (Yucho) : la plus accessible

**Recommandée pour les expatriés récemment arrivés.**

La Japan Post Bank (ゆうちょ銀行) est la plus accueillante envers les étrangers nouvellement arrivés. Elle est présente dans tous les bureaux de poste du Japon, soit plusieurs milliers d'agences.

**Ce qu'elle accepte** :
- Carte de résidence même très récente (quelques jours suffisent)
- Passeport
- L'interface peut être faite en anglais dans les grandes agences

**Ce qu'elle propose** :
- Compte courant standard (futsu yokin)
- Carte de débit (Yucho Visa Debit) utilisable partout
- Virements vers l'étranger possibles mais coûteux (utiliser Wise pour les transferts internationaux)
- Pas de frais de tenue de compte

**Délai** : ouverture le jour même en agence. Carte reçue par courrier sous 1 à 2 semaines.

## Sony Bank : la meilleure pour les expatriés actifs

Sony Bank est une banque entièrement en ligne avec une interface disponible en anglais et une application mobile bien conçue. Elle est particulièrement adaptée aux expatriés qui effectuent des transferts internationaux réguliers.

**Avantages** :
- Interface et support en anglais
- Taux de change avantageux pour les transferts internationaux (proches du taux de marché)
- Compte multidevises (JPY, USD, EUR, GBP, AUD, etc.)
- Carte Visa internationale incluse

**Conditions** :
- Nécessite votre numéro My Number (reçu par courrier 2-3 semaines après l'enregistrement)
- Demande en ligne, pas besoin de se déplacer

**Délai** : 1 à 2 semaines après soumission du dossier en ligne.

## Rakuten Bank : pratique si vous utilisez Rakuten

Si vous commandez régulièrement sur Rakuten (l'équivalent japonais d'Amazon), Rakuten Bank est intéressant car chaque achat génère des points Rakuten utilisables partout.

**Conditions** :
- Nécessite le numéro My Number
- Demande entièrement en ligne

**Inconvénients** :
- Interface principalement en japonais
- Moins adapté aux transferts internationaux que Sony Bank

## Les grandes banques japonaises (SMBC, Mizuho, MUFG)

Sumitomo Mitsui Banking Corporation (SMBC), Mizuho, et Mitsubishi UFJ (MUFG) sont les trois plus grandes banques japonaises. Elles sont nécessaires pour certaines transactions professionnelles ou pour les employeurs qui exigent un virement sur l'une de ces banques.

**Problème pour les expatriés récents** : la plupart de ces banques refusent d'ouvrir un compte si vous êtes au Japon depuis moins de 6 mois. Les exceptions existent si votre employeur est client de la banque et intervient en votre faveur.

**Conseil** : ouvrez d'abord un compte Japan Post Bank ou Sony Bank à l'arrivée, puis une grande banque après 6 mois si votre employeur ou situation le nécessite.

## Wise (ex-TransferWise) : le compte de transition

Wise n'est pas une banque japonaise, mais un service de transfert et de gestion de devises en ligne. Il permet d'avoir un IBAN européen et un compte en JPY, d'effectuer des virements internationaux au taux de marché, et de payer avec une carte dans le monde entier.

Utile comme solution de transition pendant les premières semaines, avant d'obtenir un vrai compte bancaire japonais.

## Les erreurs à éviter

**Essayer d'ouvrir un compte sans carte de résidence** : les banques japonaises n'ouvrent pas de compte aux touristes ou aux détenteurs de visa court séjour. La Zairyu Card est obligatoire.

**Attendre trop longtemps** : sans compte bancaire japonais, vous ne pouvez pas recevoir de salaire, payer votre loyer par prélèvement automatique, ni obtenir de carte SIM en contrat. C'est une priorité dès la première semaine.

**Oublier de mettre à jour votre adresse à la banque** : si vous déménagez, vous devez signaler votre nouvelle adresse à votre banque (comme à la mairie). Les Japonais sont très stricts sur la correspondance entre l'adresse enregistrée et l'adresse bancaire.

## Récapitulatif par profil

**Venez d'arriver (moins d'1 mois)** : Japan Post Bank en premier, Sony Bank dès réception du My Number.

**Vous avez besoin de transferts internationaux fréquents** : Sony Bank pour le compte principal, Wise pour les transferts ponctuels.

**Votre employeur impose SMBC ou Mizuho** : Japan Post Bank en attendant les 6 mois, puis grande banque.

**Vous êtes étudiant ou en working holiday** : Japan Post Bank, la seule qui accepte sans délai de résidence minimum.


Pour votre couverture sante pendant les demarches administratives, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement, activable avant votre inscription a l'assurance nationale japonaise. *(lien affilie)*
---

*Vous préparez votre installation à Tokyo ? Consultez gratuitement pour obtenir une liste de logements disponibles immédiatement.*
    `.trim(),
  },
  {
    slug: 'appartement-meuble-tokyo-sans-garant',
    locale: 'fr',
    title: 'Appartement meublé à Tokyo sans garant : comment trouver en 2026',
    description: 'Louer un appartement meublé à Tokyo sans garant japonais est possible. Voici les opérateurs, les conditions réelles et les alternatives au reikin.',
    date: '2026-06-19',
    readingTime: '7 min',
    content: `
L'un des plus grands obstacles pour un étranger qui cherche un appartement à Tokyo est le garant japonais (hoshounin). La bonne nouvelle : il existe un marché entier de logements meublés conçus spécifiquement pour les étrangers, sans garant obligatoire. Notre [guide complet des appartements meublés à Tokyo](/fr/blog/guide-appartements-meubles-tokyo) détaille chaque option.

**Réponse rapide :** Oui, on peut louer un appartement meublé à Tokyo sans garant japonais. Les monthly mansions et appartements meublés court terme acceptent les étrangers avec un passeport et un visa, sans garant ni argent-clé, avec emménagement en quelques jours. Comptez 90 000 à 250 000 JPY par mois selon la taille et l'emplacement.


![Coût d'entrée en mois de loyer, par type de logement à Tokyo](/tokyo-housing-barrier-fr.png "Share house ~1 mois vs location standard ~5 mois plus un garant")
## Pourquoi les propriétaires japonais exigent un garant

Historiquement, le système locatif japonais repose sur une confiance implicite communautaire. Un garant personnel est censé garantir non seulement le paiement du loyer, mais aussi le comportement du locataire. Pour un propriétaire japonais traditionnel, louer à un étranger sans garant japonais représente un risque perçu comme élevé.

Ce système évolue, mais lentement. La solution qui s'est développée pour contourner cette barrière est double : les sociétés de garantie (hoshougaisha) et les opérateurs de logements meublés ciblant les expatriés.

## Les appartements meublés "gaijin-friendly"

Des opérateurs spécialisés ont construit leur modèle sur la location aux étrangers. Ils ont négocié en amont avec les propriétaires, pre-sélectionné les biens, et simplifié le processus de candidature.

**Ce que ces opérateurs proposent typiquement** :
- Baux sans garant japonais (ils se portent garants collectivement ou utilisent une société de garantie partenaire)
- Contrats disponibles en anglais
- Durées flexibles (parfois dès 1 mois)
- Logements déjà équipés (lit, bureau, réfrigérateur, machine à laver, cuisine équipée)
- Internet inclus dans beaucoup de cas

**Les conditions habituelles pour candidater** :
- Visa valide (travail, étudiant, working holiday ou autre)
- Revenus stables ou contrat de travail
- Paiement d'une caution (généralement 1 mois de loyer)
- Parfois : paiement de l'équivalent de 1 à 2 mois en avance

## Les frais d'entrée réels pour un meublé sans reikin

L'un des avantages majeurs du logement meublé sans reikin est la réduction drastique des frais d'entrée :

**Appartement meublé sans reikin :**
- Caution : 1 mois de loyer (remboursable)
- Frais administratifs : 10 000 à 30 000 JPY
- Premier mois de loyer
- **Total : environ 2 à 2,5 mois de loyer**

**Appartement standard avec reikin :**
- Caution : 1 à 2 mois (remboursable)
- Reikin : 1 à 2 mois (non remboursable)
- Frais d'agence : 1 mois
- Prime de garantie : 0,5 à 1 mois
- **Total : 4 à 6 mois de loyer**

Pour un appartement à 120 000 JPY/mois, la différence est de 240 000 à 480 000 JPY d'économies à l'entrée.

## Les gammes de prix pour un meublé à Tokyo

Les appartements meublés sans garant à Tokyo couvrent un large spectre :

**Entrée de gamme (60 000 à 90 000 JPY/mois)** :
- Studio de 18 à 25m2
- Quartiers : Adachi, Itabashi, Katsushika, banlieue nord
- Équipements basiques mais fonctionnels
- Idéal pour une personne seule avec budget serré

**Gamme intermédiaire (90 000 à 150 000 JPY/mois)** :
- 1K ou 1DK de 25 à 40m2
- Quartiers : Shinjuku, Nakano, Koenji, Ikebukuro
- Équipements complets, souvent internet inclus
- La gamme la plus demandée par les jeunes actifs expatriés

**Gamme supérieure (150 000 à 250 000 JPY/mois)** :
- 1LDK à 2LDK de 40 à 60m2
- Quartiers : Shibuya, Minato, Meguro
- Mobilier design, appliances haut de gamme, parfois concierge
- Pour les expatriés cadres ou les couples

## Les pièges à connaître avant de signer

**La durée minimale cachée** : certains opérateurs affichent "à partir de 1 mois" mais imposent en réalité des frais de résiliation importants si vous partez avant 3 ou 6 mois. Lisez la clause de résiliation anticipée.

**Les charges non incluses** : vérifiez si l'électricité, le gaz, l'eau et internet sont inclus dans le loyer affiché. Certains opérateurs n'incluent que l'eau, et les autres charges s'ajoutent.

**Le renouvellement automatique** : beaucoup de baux se renouvellent automatiquement avec parfois des frais de renouvellement (environ 0,5 à 1 mois de loyer). Notez la date d'anniversaire du bail.

**La clause "no cooking"** : certains studios très petits interdisent contractuellement la cuisson d'aliments avec odeurs fortes. Vérifié avant de signer si vous cuisinez régulièrement.

## Comment candidater depuis l'étranger

La majorité des opérateurs de logements meublés acceptent les candidatures à distance. Le processus type :

1. Envoyer votre demande par email ou via le formulaire en ligne avec : type de logement souhaité, budget, date d'arrivée prévue, durée estimée, copie de votre passeport et visa
2. Recevoir une sélection de biens disponibles avec photos et plans
3. Visite virtuelle par vidéo ou WhatsApp avec le gestionnaire
4. Signature du bail à distance (par email ou DocuSign)
5. Virement de la caution depuis votre pays
6. Clés disponibles à votre arrivée à l'aéroport ou dans un casier sécurisé

Ce processus prend généralement 3 à 10 jours depuis la première demande jusqu'à la confirmation.

## Le rôle d'un chasseur dans ce processus

Un chasseur immobilier à Tokyo a accès à un inventaire de propriétés meublées qui ne sont pas toutes listées sur les portails publics. Les propriétés disponibles immédiatement circulent dans des réseaux professionnels avant d'apparaître en ligne, et disparaissent souvent avant même d'être publiées.

Passer par un chasseur vous permet d'accéder à ce stock invisible, de comparer plusieurs options en une seule consultation, et d'obtenir un accompagnement sur la négociation des frais d'entrée.


Pour votre couverture sante pendant la transition, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement, adaptee aux expatries avant l'assurance nationale japonaise. *(lien affilie)*
---

*À lire aussi : [Appartement meublé Tokyo expatriés : 5 options rapides 2026](/blog/appartement-meuble-tokyo-expats), [Appartement meublé à Tokyo : les 5 meilleures options pour expatriés (2026)](/blog/appartement-meuble-tokyo-expats-top-5), [Garantie de loyer au Japon : guide complet pour étrangers](/blog/garantie-loyer-etranger-japon).*

*Vous cherchez un appartement meublé à Tokyo sans garant ? Réservez une consultation gratuite pour recevoir une sélection de biens disponibles cette semaine.*
    `.trim(),
  },
  {
    slug: 'pieges-location-tokyo-etranger',
    locale: 'fr',
    title: '7 pièges à éviter quand on loue un appartement à Tokyo en tant qu\'étranger',
    description: 'Reikin non remboursable, clauses de résiliation cachées, frais de nettoyage abusifs : les erreurs les plus coûteuses des expatriés sur le marché locatif tokyoïte.',
    date: '2026-06-19',
    readingTime: '6 min',
    content: `
Le marché locatif tokyoïte est l'un des plus complexes au monde pour les étrangers. Chaque année, des expatriés perdent des dizaines de milliers de yens à cause d'erreurs évitables. Voici les sept pièges les plus fréquents, avec les solutions concrètes pour les éviter.

**Réponse rapide :** Les principaux pièges de la location à Tokyo pour un étranger : sous-estimer les frais d'entrée (argent-clé, caution, agence, garant, jusqu'à 4 à 6 mois), signer un contrat en japonais sans traduction, ignorer la clause de remise en état, mal comprendre le préavis, et négliger les frais de renouvellement. La parade : faire traduire le bail et budgétiser tous les coûts avant de signer.

> **Vu du terrain.** Le piège qui coince le plus les gens n'est pas une arnaque, c'est la facture d'entrée. Ils budgètent le loyer mensuel, signent, puis se prennent quatre à six mois d'avance. Demandez le total d'entrée par écrit avant de tomber amoureux d'un logement.
## Piège n°1 : signer sans lire les clauses de résiliation

La plupart des baux japonais contiennent une clause de résiliation anticipée (chuto kaiyaku) qui impose des pénalités si vous partez avant la fin de la période minimale. Ces pénalités peuvent représenter 1 à 2 mois de loyer.

**La solution** : avant de signer, posez explicitement la question : "Quels sont les frais si je dois partir dans 4 mois, 6 mois, 12 mois ?" Faites-vous traduire cette clause si le contrat est en japonais.

## Piège n°2 : sous-estimer les frais de remise en état à la sortie

Au Japon, les locataires sont souvent tenus de participer aux frais de remise en état du logement à la sortie, même s'ils ont pris soin de l'appartement. Ce système (genjo kaifuku) peut donner lieu à des factures surprises de 50 000 à 200 000 JPY selon la taille du logement et la durée du séjour.

**Ce que les propriétaires peuvent légalement facturer** : remise en peinture si vous avez fumé, nettoyage de la cuisine si elle est grasse, remplacement du tatami si taché.

**Ce qu'ils ne peuvent PAS légalement facturer** : l'usure normale des murs et des sols, les traces légères d'utilisation normale, le changement des serrures après votre départ.

**La solution** : prenez des photos détaillées de chaque pièce le jour de votre emménagement. Signalez par écrit à l'agence ou au propriétaire tout défaut ou dommage existant dans les 3 premiers jours.

## Piège n°3 : confondre reikin et shikikin

Ces deux termes reviennent dans tous les contrats de bail japonais, et les confondre coûte cher.

**Shikikin** (敷金) : dépôt de garantie. Remboursable à la sortie, déduction faite des éventuels frais de remise en état. Généralement 1 à 2 mois de loyer.

**Reikin** (礼金) : littéralement "argent de remerciement". Payé au propriétaire, non remboursable, sans contrepartie. Vestige d'une tradition japonaise d'après-guerre. Représente 1 à 2 mois de loyer.

**La solution** : privilégier les logements sans reikin, de plus en plus courants notamment dans les résidences meublées pour étrangers. Économie potentielle : 100 000 à 300 000 JPY.

## Piège n°4 : louer dans un immeuble à gestion stricte sans le savoir

Certains immeubles résidentiels japonais ont des règlements intérieurs très stricts : interdiction de recevoir des visites après 22h, interdiction de faire du bruit après 21h, interdiction de sortir les poubelles en dehors des créneaux autorisés. Ces règles ne sont pas toujours mentionnées par l'agence.

**La solution** : demandez le règlement de copropriété (kanri kisoku) avant de signer. Si l'agence ne peut pas vous le fournir, c'est un signal d'alerte.

## Piège n°5 : choisir un logement trop éloigné de son lieu de travail

Tokyo est immense. Un trajet de "seulement 40 minutes" en train peut devenir 1h15 aux heures de pointe avec les correspondances et le temps d'attente sur quai. Sur une année, c'est 500 heures de transport supplémentaires.

**La solution** : testez le trajet porte-à-porte (pas station-à-station) aux heures de pointe avant de vous engager. Les applications japonaises de navigation (Hyperdia, Navitime) sont très précises sur les temps de trajet réels.

## Piège n°6 : ne pas vérifier la couverture téléphonique dans l'appartement

Les immeubles en béton épais (très courants à Tokyo) peuvent bloquer le signal téléphonique à l'intérieur. Certains sous-sols ou rez-de-chaussée sont des angles morts totaux.

**La solution** : testez votre signal dans l'appartement lors de la visite. Vérifiez également la connexion internet disponible dans l'immeuble : fibre directe ou seulement VDSL (plus lent).

## Piège n°7 : payer des frais d'agence injustifiés

Légalement, les frais d'agence japonais sont plafonnés à 1 mois de loyer toutes taxes comprises. Certaines agences peu scrupuleuses ajoutent des frais de "service" ou de "documentation" qui s'accumulent.

De plus, une réforme récente (avril 2024) a modifié les règles : désormais, pour les logements résidentiels, les frais d'agence sont normalement à la charge du propriétaire, pas du locataire, sauf si le locataire a explicitement accepté de les payer.

**La solution** : demandez un devis détaillé par écrit avant toute visite. Questionnez chaque ligne de frais. Comparez avec plusieurs agences ou passez par un chasseur qui travaille à frais fixe et sans commission d'agence cachée.

## Ce que fait un chasseur immobilier pour éviter ces pièges

Le rôle d'un chasseur n'est pas seulement de trouver des biens. C'est aussi de lire les contrats, d'identifier les clauses problématiques avant signature, de négocier les conditions d'entrée, et de documenter l'état du logement à l'entrée pour protéger votre caution à la sortie.

Ces sept pièges sont évitables avec la bonne préparation et le bon accompagnement.


Pour votre couverture sante pendant la recherche d'appartement, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement. Pour negocier en japonais avec les agences, [iTalki](https://www.italki.com/affshare?ref=af32660342) propose des cours avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*
---

*À lire aussi : [Dossier refusé à Tokyo : solutions concrètes pour les étrangers](/blog/dossier-location-refuse-tokyo-etranger).*

*Vous avez trouvé un appartement à Tokyo et souhaitez faire relire le contrat avant de signer ? Contactez-nous pour une consultation.*
    `.trim(),
  },
  {
    slug: 'share-house-tokyo-guide-2026',
    locale: 'en',
    title: 'Share House in Tokyo: Complete Guide for Foreigners (2026)',
    description: 'How share houses work in Tokyo, what they cost, how to apply from abroad, and which neighbourhoods have the best options for expats.',
    date: '2026-06-19',
    readingTime: '7 min',
    content: `
Share houses are the fastest, most accessible entry point into the Tokyo rental market for foreigners. No key money, no guarantor, move in within days. Here is everything you need to know before you sign.

**Quick answer:** A Tokyo share house is a furnished private room with shared kitchen and bathroom, no guarantor and no key money, with move-in within days. Rent runs 40,000 to 90,000 JPY per month, utilities often included, and you can apply online from abroad with just a passport and visa. It is the easiest first home for newcomers.


![Move-in cost in months of rent, by housing type in Tokyo](/tokyo-housing-barrier-en.png "Share house ~1 month vs a standard lease ~5 months plus a guarantor")
## What is a share house in Japan?

A share house (シェアハウス) is a managed residential property where several tenants share common areas: kitchen, bathroom, living room. Each resident has their own private room, typically 8 to 16 sqm.

Unlike informal flat-sharing between friends, Japanese share houses are run by professional operators. There are hundreds of operators in Tokyo, ranging from basic rooms at 40,000 JPY/month to designer share houses at 90,000 JPY with rooftop terraces and gym access.

The key difference from a standard apartment: you move in with a valid visa and a security deposit. No guarantor, no key money, no 4-to-6-month upfront cost.

## How much does it actually cost?

**Monthly rent**: 45,000 to 90,000 JPY depending on room size, neighbourhood, and amenities.

**Move-in costs**: typically 1 month refundable security deposit plus administrative fees of 10,000 to 30,000 JPY. No reikin (key money).

**What is usually included**: water, electricity, gas, and internet are often included in the rent. Always confirm before signing.

**Minimum stay**: some operators accept stays from 1 month, others require 3 months minimum.

Total move-in budget for a Tokyo share house: **100,000 to 180,000 JPY**, versus 400,000 to 600,000 JPY for a standard apartment.

## Main operators in Tokyo: price comparison

| Type | Monthly rent (JPY) | Min. stay | Guarantor | Profile |
|---|---|---|---|---|
| Budget / outer wards | 40,000-65,000 | 1 month | Not required | Further from centre, best for tight budgets |
| Standard central | 50,000-85,000 | 1 month | Not required | Direct access to Yamanote or Chuo Line |
| Premium central | 55,000-100,000 | 1 month | Not required | Larger rooms, quality shared spaces |
| Mixed community | 55,000-95,000 | 1 month | Not required | Japanese and international residents together |

All expat-specialist operators accept foreign tenants without a Japanese guarantor. Utilities (water, electricity, internet) are typically included in the monthly rent.

## Best neighbourhoods for share houses

**Ikebukuro**: highly connected (3 metro lines), international atmosphere, solid share houses at 50,000 to 70,000 JPY.

**Shinjuku / Nakano**: direct access to JR Chuo Line, lively neighbourhoods, abundant supply.

**Shimokitazawa**: village-within-the-city atmosphere, popular with young creatives. Note: less well served by transport.

**Koenji / Asagaya**: under the radar for foreigners, very affordable, artistic community, characterful properties.

**Saitama / Northern suburbs**: if your budget is tight (under 50,000 JPY), options exist 30 to 45 minutes from the centre.

## House rules: what to expect

Japanese share houses have codes. Breaking them can mean a warning or eviction.

**Noise**: walls are thin. The unwritten rule is no audible noise from the corridor after 10pm.

**Kitchen**: clean immediately after use. Dishes left on the drying rack for one hour are tolerable. Overnight is not.

**Guests**: most share houses prohibit or strictly limit guests. Some ban all visitors in private rooms. Read the house rules before signing.

**Rubbish**: selective waste sorting is mandatory in Japan. Plastic, glass, paper, food waste: each category has a specific collection day. The operator explains your municipality's rules.

**Shoes**: always removed at the entrance (genkan). This is non-negotiable.

## How to apply from abroad

The majority of share house operators accept online applications. The typical process:

1. Browse available rooms on the operator's website (photos, floor plans, availability dates)
2. Submit an application form: name, nationality, profession, arrival date, expected duration
3. Video interview (often basic Japanese or English)
4. Confirmation and security deposit transfer

Time from application to confirmation: typically 3 to 7 days.

**What operators look at**: financial stability (income or employer letter), expected length of stay, and compatibility with current residents.

## Share house vs apartment: how to choose

A share house is the right choice if:
- You are arriving for less than 18 months
- You want to meet people and practise Japanese
- Your budget is under 80,000 JPY/month
- You do not yet have a Japanese guarantor or bank account

An apartment is preferable if:
- You plan to stay more than 2 years
- You need space (family, intensive remote work)
- Privacy is an absolute priority

## What to look for when choosing an operator

Not all share house operators are equal. Before committing:

- Check online reviews (Google Maps reviews, Facebook groups like Expats in Tokyo)
- Ask how long the operator has been running the property
- Confirm what happens if a housemate is noisy or creates problems (is there an operator to escalate to?)
- Ask for the full house rules document before signing

The best operators have clear communication channels, English-speaking staff, and documented check-in procedures.


For health coverage during your share house stay, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment. To improve your Japanese with housemates, [iTalki](https://www.italki.com/affshare?ref=af32660342) offers private lessons with native teachers from $10/hour. *(affiliate links)*
---

*See also: [Gaijin House vs Share House in Tokyo: What Is the Difference?](/blog/gaijin-house-vs-share-house-tokyo), [Furnished Apartment Tokyo: 5 Best Options for Expats in 2026](/blog/furnished-apartment-tokyo-top-5-expats).*

*Need help finding the right share house in Tokyo for your arrival date and budget? Book a free 30-minute consultation.*
    `.trim(),
  },
  {
    slug: 'furnished-apartment-tokyo-no-guarantor',
    locale: 'en',
    title: 'Furnished Apartments in Tokyo With No Guarantor Required (2026)',
    description: 'How to find a furnished apartment in Tokyo without a Japanese guarantor: which operators accept foreigners, what conditions apply, and how to apply remotely.',
    date: '2026-06-19',
    readingTime: '7 min',
    content: `
The Japanese guarantor requirement is the single biggest barrier for foreigners renting in Tokyo. The good news: an entire segment of the market exists specifically for foreigners who need furnished housing without a Japanese guarantor. Our [complete guide to furnished apartments in Tokyo](/en/blog/furnished-apartments-tokyo-guide) walks through every option in detail.

**Quick answer:** Yes, you can rent a furnished apartment in Tokyo without a Japanese guarantor. Monthly mansions and short-term furnished apartments accept foreigners with a passport and visa, no guarantor and no key money, with move-in within days. Expect 90,000 to 250,000 JPY per month depending on size and location.


![Move-in cost in months of rent, by housing type in Tokyo](/tokyo-housing-barrier-en.png "Share house ~1 month vs a standard lease ~5 months plus a guarantor")
## Why the guarantor barrier exists

Traditional Japanese rental culture relies on a personal guarantor (hoshounin): a Japanese citizen who takes legal responsibility for your rent and behaviour. For a landlord dealing with a foreign tenant who may not speak Japanese and might leave after 1 to 2 years, the perceived risk is high.

The system has evolved. Guarantee companies (hoshougaisha) now substitute for personal guarantors in most modern properties. But even with a guarantee company, many landlords remain hesitant about foreign tenants.

The solution: operators who have pre-negotiated with landlords and built businesses around servicing expat tenants.

## What furnished no-guarantor rentals actually offer

Operators specialising in foreign tenants typically provide:

- Leases without a personal Japanese guarantor
- Contracts available in English
- Flexible terms (often from 1 month minimum)
- Fully furnished units: bed, desk, sofa, fridge, washing machine, kitchen equipment
- Internet often included
- Utility setup handled by the operator

The trade-off: monthly rents are 10 to 20% higher than equivalent unfurnished units. The saving on move-in costs (no reikin, no agency fee) more than compensates in most cases.

## Move-in costs: the real numbers

**Furnished apartment with no reikin**:
- Security deposit: 1 month (refundable)
- Administrative fee: 10,000 to 30,000 JPY
- First month rent
- Total: approximately 2 to 2.5 months of rent upfront

**Standard Japanese apartment with reikin**:
- Security deposit: 1 to 2 months (refundable)
- Key money (reikin): 1 to 2 months (non-refundable)
- Agency fee: 1 month
- Guarantee premium: 0.5 to 1 month
- Total: 4 to 6 months of rent upfront

For a 120,000 JPY/month apartment, the saving at move-in is 240,000 to 480,000 JPY.

## Price ranges in Tokyo (2026)

**Budget range (60,000 to 90,000 JPY/month)**:
- Studio 18 to 25 sqm
- Neighbourhoods: Adachi, Itabashi, northern suburbs
- Basic but functional furnishings
- Best for single professionals on a tight budget

**Mid-range (90,000 to 150,000 JPY/month)**:
- 1K or 1DK 25 to 40 sqm
- Neighbourhoods: Shinjuku, Nakano, Koenji, Ikebukuro
- Full furnishings, internet usually included
- The most in-demand category for expat professionals

**Upper range (150,000 to 250,000 JPY/month)**:
- 1LDK to 2LDK 40 to 60 sqm
- Neighbourhoods: Shibuya, Minato, Meguro
- Designer furniture, high-end appliances, sometimes concierge service
- For senior expats or couples

## How to apply remotely

Most furnished apartment operators accept remote applications. The typical process:

1. Send your enquiry with: property type, budget, arrival date, expected duration, copy of passport and visa
2. Receive a shortlist of available properties with photos and floor plans
3. Video walkthrough via WhatsApp, Zoom or FaceTime with the property manager
4. Sign the lease remotely (email or DocuSign)
5. Transfer the security deposit from your home country
6. Keys available at airport pickup or in a secure key box

From first enquiry to confirmation: typically 3 to 10 days.

## What to verify before signing

**Early termination clause**: ask exactly what the cost is if you leave after 3, 6, or 12 months. Some operators charge 1 to 2 months as a penalty for early exit.

**What is included in the rent**: electricity, gas, water, and internet are sometimes included, sometimes not. Confirm in writing.

**Automatic renewal**: many leases renew automatically at the anniversary date, sometimes with a renewal fee of 0.5 to 1 month. Note the date.

**Cooking restrictions**: some small studios contractually prohibit cooking strong-smelling food. Check this if you cook regularly.

## The role of a property hunter

A property hunter in Tokyo has direct access to furnished inventory that is not fully listed on public platforms. Available properties in the right price range and location circulate in professional networks before appearing online, and the best ones disappear within 24 to 48 hours.

A hunter can shortlist options matching your criteria, arrange video tours, review the lease before you sign, and negotiate the entry costs.


For health coverage during your transition, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment, suited for expats before Japanese national insurance enrolment. *(affiliate link)*
---

*See also: [Furnished Apartment in Tokyo for Expats: 5 Quick Options (2026)](/blog/furnished-apartment-tokyo-expats), [Furnished Apartment Tokyo: 5 Best Options for Expats in 2026](/blog/furnished-apartment-tokyo-top-5-expats), [Guarantor for Japan Rental: Complete Guide for Foreigners](/blog/guarantor-japan-rental-foreigner).*

*Looking for a furnished apartment in Tokyo without a guarantor? Book a free consultation to see what is currently available.*
    `.trim(),
  },
  {
    slug: 'open-bank-account-japan-foreigner',
    locale: 'en',
    title: 'How to Open a Bank Account in Japan as a Foreigner (2026 Guide)',
    description: 'Japan Post Bank, Sony Bank, Rakuten: which Japanese bank is easiest for foreigners to open, step by step, without speaking Japanese.',
    date: '2026-06-19',
    readingTime: '6 min',
    content: `
Opening a Japanese bank account is one of the first administrative tasks to complete after registering your address at the ward office. Without a Japanese bank account, you cannot receive a local salary, pay rent by bank transfer, or get a contract SIM card.

**Quick answer:** To open a Japanese bank account, first register your address at the ward office, then apply with your residence card, address, and a phone number. Japan Post Bank (Yucho) is the most accessible to newcomers and can often be opened soon after arrival; some other banks ask for six months of residence. You need an account to receive a salary, pay rent, and get a contract SIM.


![The order of steps to settle in Tokyo: visa, residence card, bank, guarantor, lease](/tokyo-process-en.png "Your residence card unlocks everything, get it on day 1")
## What you need before you start

All Japanese banks require at minimum:
- Your **Residence Card** (Zairyu Card) with your registered address
- Your **passport**
- A registered address in Japan (the address must be recorded at the ward office before opening an account)

Some banks additionally require:
- Your My Number (Japanese tax identification number, received by post 2 to 3 weeks after ward registration)
- A personal seal (hanko), though this is increasingly not required
- Proof of employment or income

## Japan Post Bank (Yucho): the most accessible

**Best for newly arrived expats.**

Japan Post Bank (ゆうちょ銀行) is the most foreigner-friendly option for recent arrivals. It operates through post office branches across Japan, thousands of locations nationwide.

**What it accepts**:
- Residence Card even from very recently (a few days is sufficient)
- Passport
- English assistance available at major branches

**What it offers**:
- Standard current account (futsu yokin)
- Debit card (Yucho Visa Debit) accepted everywhere
- International transfers possible but expensive (use Wise for international remittances)
- No monthly maintenance fees

**Timeline**: account opened the same day at a branch. Card received by post within 1 to 2 weeks.

## Sony Bank: best for active expats

Sony Bank is a fully online bank with an English interface and well-designed mobile app. It is particularly suitable for expats who make regular international transfers.

**Advantages**:
- Full English interface and support
- Competitive exchange rates for international transfers (close to the mid-market rate)
- Multi-currency account (JPY, USD, EUR, GBP, AUD, and more)
- Visa card included

**Requirements**:
- Requires your My Number (received 2 to 3 weeks after ward registration)
- Application entirely online, no branch visit needed

**Timeline**: 1 to 2 weeks after submitting the online application.

## Rakuten Bank: good if you use Rakuten

If you regularly shop on Rakuten (Japan's equivalent of Amazon), Rakuten Bank is practical since every purchase generates Rakuten points usable across the ecosystem.

**Requirements**:
- Requires My Number
- Fully online application

**Limitations**:
- Interface primarily in Japanese
- Less suited to international transfers than Sony Bank

## Major Japanese banks (SMBC, Mizuho, MUFG)

Japan's three major banks are sometimes required by employers for salary payments. However, most refuse to open accounts for foreigners who have been in Japan less than 6 months.

**Exceptions**: if your employer is a client of the bank and intervenes on your behalf, this waiting period can sometimes be waived.

**Recommendation**: open a Japan Post Bank account first on arrival, then a major bank account after 6 months if your employer requires it.

## Wise: a useful transition tool

Wise (formerly TransferWise) is not a Japanese bank, but it allows you to hold and receive JPY, make international transfers at mid-market rates, and pay by card worldwide.

Useful as a bridge solution during your first weeks while waiting for a Japanese bank account to open.

## Common mistakes to avoid

**Trying to open an account without a Residence Card**: Japanese banks do not open accounts for tourists or short-stay visa holders. The Zairyu Card is mandatory.

**Waiting too long**: without a Japanese bank account, you cannot receive salary, pay rent by automatic transfer, or get a contract SIM. Prioritise this in your first week.

**Not updating your address after moving**: if you change address in Japan, notify your bank (as you would the ward office). Japanese institutions are strict about address consistency.

## Summary by profile

**Just arrived (less than 1 month)**: Japan Post Bank first, then Sony Bank once you receive your My Number.

**Frequent international transfers needed**: Sony Bank for the main account, Wise for occasional transfers.

**Employer requires SMBC or Mizuho**: Japan Post Bank as interim, then major bank after 6 months.

**Student or working holiday**: Japan Post Bank, the only one with no minimum residence period.


For health coverage while you complete your admin setup, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment, activatable before Japanese national insurance enrolment. *(affiliate link)*
---

*Setting up in Tokyo? Book a free consultation to get a shortlist of available housing matching your profile and arrival date.*
    `.trim(),
  },
  {
    slug: 'tokyo-apartment-hunting-from-abroad',
    locale: 'en',
    title: 'How to Find an Apartment in Tokyo from Abroad (Remote Hunting Guide)',
    description: 'The step-by-step process to secure Tokyo housing before you arrive: video tours, remote signing, what to watch out for, and common mistakes.',
    date: '2026-06-19',
    readingTime: '8 min',
    content: `
The most expensive mistake foreigners make when relocating to Tokyo is arriving without secured housing. Staying in a hotel or short-term rental while searching typically costs 150,000 to 300,000 JPY for the 4 to 8 weeks the search takes. That money is entirely avoidable.

**Quick answer:** You can secure Tokyo housing from abroad and avoid weeks in a hotel. Shortlist no-guarantor options (share houses, furnished or monthly mansions), apply online with your passport and visa, and use virtual viewings to confirm. Book before you land, then handle your residence card and bank account in the first days. This avoids 150,000 to 300,000 JPY of temporary-stay costs.

Here is the complete process for finding and securing Tokyo housing before you land.

## Why searching remotely is harder than it seems

Tokyo's rental market moves fast. Properties listed on public portals (Suumo, Homes, Chintai) are typically already rented or under application within 24 to 72 hours of listing. By the time you see a listing from abroad, shortlist it, contact the agency, and arrange a visit... the property is gone.

The deeper issue: most Japanese real estate agencies operate entirely in Japanese. They do not respond to English enquiries, do not offer video tours, and require in-person visits before processing an application.

This creates a catch-22 for foreigners: the market moves too fast to search from abroad through normal channels.

## The two viable paths for remote housing in Tokyo

**Path 1: Share houses**

Share house operators almost universally accept remote applications. The process is standardised, English-friendly, and fast (3 to 7 days from enquiry to confirmation). The trade-off is that you get a room in a shared property rather than a private apartment.

This is the right path if you need to move immediately, your budget is under 80,000 JPY/month, or you are arriving for less than 18 months.

**Path 2: A local property hunter**

A property hunter operates differently from a traditional agency. They work for you (not the landlord), have access to inventory not listed publicly, and can physically visit properties on your behalf, send video walkthroughs, and manage the full application process remotely.

This is the right path if you need a private apartment, have a budget of 80,000 JPY/month or more, or are planning a longer stay.

## The step-by-step remote process

**Week 1: define your criteria**

Before contacting anyone, be clear on:
- Budget (monthly rent, excluding or including utilities)
- Location (based on your workplace, or preferred neighbourhood)
- Property type (share house, furnished studio, 1K, 1LDK)
- Arrival date
- Expected duration of stay

**Week 1-2: initial contact and shortlisting**

For share houses: contact 3 to 5 operators with your criteria. Most respond within 24 hours. Ask for photos, floor plans, and a video walkthrough.

For apartments with a hunter: send your criteria by email. A good hunter responds within 24 to 48 hours with an initial shortlist of available properties.

**Week 2-3: video tours**

For share houses: most operators offer photos and virtual tours directly on their websites.

For apartments: the hunter visits in person and records a video walkthrough of each property you are interested in. A good walkthrough shows: entrance area (genkan), all rooms with dimensions, kitchen, bathroom, view from windows, building entrance, nearest station, and surroundings.

What to look for in a video tour:
- Natural light (which direction do the windows face?)
- Ceiling height (Japanese apartments can be low)
- Noise level (ask for the windows to be opened during the video)
- Condition of walls, floors, and fittings

**Week 3: application and signing**

Once you confirm a property, the application process begins:
1. Submit your details: passport copy, visa copy, proof of income or employment letter
2. The landlord or guarantee company reviews the application (2 to 5 days)
3. If approved: sign the lease electronically (DocuSign or email-based signature)
4. Transfer the security deposit (and first month's rent if required) from your home country

**Arrival day: key handover**

Keys are typically handed over in one of three ways:
- In-person at the agency or hunter's office
- Key box at the property entrance (code sent by email)
- Courier to your arrival hotel if you land before moving in

## What you need to prepare in advance

**Documents to have ready** (digital copies):
- Passport biographical page
- Visa page
- Employment contract or offer letter
- Last 3 months of payslips or bank statements
- Photo (for some guarantee company applications)

**Financial setup**:
- A way to make an international wire transfer (bank or Wise)
- Budget for the security deposit (typically 1 to 2 months of rent)

## Common remote hunting mistakes

**Choosing by photos alone**: Japanese property photos are often taken with wide-angle lenses that make small rooms appear larger. Always ask for floor plans with dimensions.

**Not confirming the exact move-in date**: availability windows in Tokyo are sometimes 2 to 3 weeks wide. Confirm that the property is available on your specific arrival date.

**Sending money before receiving a signed lease**: never transfer a security deposit without a signed contract in hand. Legitimate operators always provide contracts before requesting payment.

**Not asking about the cancellation policy**: if your arrival date changes or you need to cancel, what is the policy? Ask before committing.

## The timeline that works

The optimal timeline for remote apartment hunting in Tokyo:

- **8 weeks before arrival**: define criteria, start initial contact with operators or a hunter
- **6 weeks before**: shortlist 3 to 5 properties, arrange video tours
- **4 weeks before**: confirm your first choice, submit application
- **2 weeks before**: sign lease, transfer deposit
- **Arrival day**: key handover, move in

This timeline gives you buffer for unexpected delays (application rejection, property withdrawn) without pressure.


For health coverage from day one in Japan, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment, activatable before you arrive. To prepare your Japanese before landing, [iTalki](https://www.italki.com/affshare?ref=af32660342) offers online lessons with native teachers from $10/hour. *(affiliate links)*
---

*See also: [How to Find an Apartment in Tokyo as a Foreigner (2026 Guide)](/blog/find-apartment-tokyo-foreigner), [Finding an Apartment in Tokyo in September: What Changes vs Spring](/blog/find-apartment-tokyo-september), [Furnished Apartment Tokyo: 5 Best Options for Expats in 2026](/blog/furnished-apartment-tokyo-top-5-expats).*

*Relocating to Tokyo and want housing ready before you arrive? Book a free 30-minute consultation to start the remote search process.*
    `.trim(),
  },
  {
    slug: 'assurance-maladie-japon-expatrie',
    locale: 'fr',
    title: 'Assurance maladie au Japon pour les expatriés : guide complet 2026',
    description: 'Kokumin Kenko Hoken ou shakai hoken : comment fonctionne l\'assurance maladie au Japon, combien ça coûte et comment s\'inscrire en tant qu\'étranger.',
    date: '2026-06-19',
    readingTime: '6 min',
    content: `
Le système de santé japonais est l'un des meilleurs au monde, mais il est basé sur une couverture obligatoire que tout résident doit avoir. Comprendre comment fonctionne l'assurance maladie au Japon est essentiel avant votre arrivée.

**Réponse rapide :** Au Japon, tout résident (étrangers inclus) doit avoir une assurance maladie : soit le shakai hoken (assurance d'entreprise, environ 50% payé par l'employeur), soit le kokumin kenko hoken (assurance nationale, pour les indépendants et sans emploi). Elle couvre 70% des frais médicaux. Le coût dépend de vos revenus, souvent 1 500 à 3 000 JPY/mois pour un nouvel arrivant à faible revenu. L'inscription se fait à la mairie de votre quartier.


![L'ordre des étapes pour s'installer à Tokyo : visa, carte de séjour, banque, garant, bail](/tokyo-process-fr.png "La carte de séjour débloque tout, faites-la le jour 1")
## Les deux systèmes d'assurance maladie au Japon

Au Japon, tout résident (y compris les étrangers) doit être couvert par l'un des deux systèmes :

**1. La shakai hoken (assurance maladie salariée)**
Si vous êtes employé par une entreprise japonaise qui vous emploie à temps plein, votre employeur vous inscrit automatiquement à la shakai hoken. Les cotisations sont prélevées directement sur votre salaire, avec une part payée par vous et une part payée par l'employeur.

**2. La kokumin kenko hoken (assurance maladie nationale)**
Si vous êtes travailleur indépendant, en working holiday, étudiant, ou si votre employeur n'adhère pas à la shakai hoken, vous devez vous inscrire vous-même à l'assurance maladie nationale auprès de votre mairie (kuyakusho).

## Combien coûte l'assurance maladie nationale ?

Le montant des cotisations à la kokumin kenko hoken est calculé sur la base de vos revenus de l'année précédente. Pour un expatrié qui vient d'arriver au Japon sans revenus japonais antérieurs, la cotisation minimale s'applique.

**Estimations pour une personne seule :**
- Revenus nuls ou premier arrivée : 2 000 à 5 000 JPY/mois
- Revenus annuels de 3 millions JPY : environ 15 000 à 20 000 JPY/mois
- Revenus annuels de 5 millions JPY : environ 25 000 à 35 000 JPY/mois

La cotisation couvre le titulaire et ses ayants droit (conjoint sans revenus, enfants).

## Ce que l'assurance couvre

Avec l'assurance maladie japonaise (shakai hoken ou kokumin kenko hoken), vous payez 30% des frais médicaux. L'assurance couvre les 70% restants.

**Ce qui est couvert :**
- Consultations chez un médecin généraliste ou spécialiste
- Hospitalisations
- Médicaments prescrits
- Soins dentaires (partiellement)
- Examens médicaux courants

**Plafond mensuel (haut-yosha seido) :** si vos frais médicaux dans le mois dépassent un certain seuil (environ 80 000 à 90 000 JPY pour un revenu moyen), l'assurance prend en charge le surplus. Ce mécanisme protège contre les dépenses catastrophiques.

**Ce qui n'est pas couvert :**
- Les soins dentaires esthétiques
- Les lunettes et lentilles de contact (sauf cas médicaux)
- Certains vaccins de voyage
- Les consultations en cliniques privées hors réseau

## Comment s'inscrire à la kokumin kenko hoken

L'inscription se fait à votre mairie (kuyakusho), au guichet de l'assurance maladie nationale.

**Documents nécessaires :**
- Votre carte de résidence (Zairyu Card)
- Votre passeport
- Votre adresse enregistrée au Japon
- Votre numéro My Number (si vous l'avez déjà reçu)

**Délai :** vous devez vous inscrire dans les 14 jours suivant votre arrivée ou la perte d'une autre couverture (fin de shakai hoken, par exemple). Une inscription tardive entraîne le paiement des cotisations rétroactives depuis la date à laquelle vous auriez dû vous inscrire.

**Ce que vous recevez :** une carte d'assurance maladie (hoken-sho) que vous présentez à chaque consultation. Elle est envoyée par courrier sous 2 à 3 semaines.

## Utiliser votre assurance au quotidien

**Chez le médecin :** présentez votre carte d'assurance à l'accueil. Vous payez 30% du coût de la consultation à la fin de la visite.

**Coût réel d'une consultation :** avec l'assurance, une consultation chez un médecin généraliste coûte généralement entre 1 000 et 3 000 JPY selon le type de consultation et les examens effectués.

**À la pharmacie :** les médicaments prescrits sont également remboursés à 70%. Les médicaments en vente libre ne sont pas remboursés.

**À l'hôpital :** pour une hospitalisation, le système du plafond mensuel s'applique. En pratique, même une hospitalisation d'une semaine reste abordable avec l'assurance.

## L'assurance complémentaire (hoken)

Comme en France avec la mutuelle, beaucoup de résidents au Japon souscrivent une assurance complémentaire privée pour couvrir la partie restante à leur charge (les 30%). Des compagnies comme AIA, AXA ou MetLife Japon proposent des couvertures complémentaires à partir de 2 000 à 5 000 JPY/mois.

Utile si vous avez des problèmes de santé chroniques ou si vous prévoyez de rester plusieurs années.

Pour les expatriés en phase d'installation ou en mobilité internationale, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une couverture sante mensuelle sans engagement, activable avant votre inscription a la kokumin kenko hoken. *(lien affilie)*

## Que faire si vous tombez malade avant d'avoir votre carte ?

Si vous avez besoin d'un médecin avant d'avoir reçu votre carte d'assurance, vous payez le montant total (100%) de la consultation. Conservez tous vos reçus. Une fois votre carte reçue, vous pouvez demander le remboursement de la part prise en charge (70%) auprès de votre mairie.

---

*À lire aussi : [Assurance habitation Japon : ce que tout locataire doit savoir](/blog/assurance-habitation-japon-locataire).*

*Vous planifiez votre installation à Tokyo ? Réservez une consultation gratuite pour préparer votre logement avant votre arrivée.*
    `.trim(),
  },
  {
    slug: 'carte-residence-japon-zairyu-card',
    locale: 'fr',
    title: 'Carte de résidence au Japon (Zairyu Card) : tout ce qu\'il faut savoir',
    description: 'Comment obtenir votre carte de résidence japonaise, ce qu\'elle vous permet de faire, et les démarches obligatoires dans les 14 jours suivant votre arrivée.',
    date: '2026-06-19',
    readingTime: '5 min',
    content: `
La carte de résidence japonaise (在留カード, zairyu card) est le document le plus important pour tout étranger vivant au Japon. Sans elle, vous ne pouvez pas ouvrir un compte bancaire, louer un appartement, obtenir un SIM card en contrat, ni accéder à la plupart des services publics.

**Réponse rapide :** La carte de résidence (zairyu card) est délivrée à l'aéroport à l'arrivée pour les séjours de plus de 3 mois, puis activée en déclarant votre adresse à la mairie sous 14 jours. Elle est indispensable pour ouvrir un compte, louer, obtenir un forfait mobile et accéder aux services publics. Gardez-la toujours sur vous : la loi l'exige.

## Qu'est-ce que la zairyu card ?

La zairyu card est une carte d'identité officielle délivrée par le gouvernement japonais à tous les résidents étrangers titulaires d'un visa long séjour. Elle atteste de votre statut de résidence, de votre type de visa et de la date d'expiration de votre séjour autorisé.

Elle ressemble à une carte bancaire : plastifiée, avec votre photo, votre nom, votre date de naissance, votre nationalité, votre adresse, votre type de visa et sa date d'expiration.

## Comment l'obtenir

**À l'arrivée à l'aéroport :** si vous arrivez à Tokyo (Narita ou Haneda), Osaka (Kansai) ou dans l'un des aéroports principaux avec un visa long séjour valide, la zairyu card vous est remise directement au contrôle des frontières (immigration). Aucune démarche supplémentaire n'est nécessaire à cet instant.

Si vous arrivez par un aéroport secondaire, la carte sera envoyée par courrier à votre adresse japonaise après votre enregistrement à la mairie.

## L'enregistrement à la mairie : obligatoire dans les 14 jours

Une fois que vous avez votre adresse au Japon (votre logement), vous devez vous rendre à la mairie (kuyakusho) de votre arrondissement dans les **14 jours** pour y enregistrer votre adresse.

**Documents à apporter :**
- Votre zairyu card
- Votre passeport
- Votre adresse (une copie de votre contrat de bail ou une attestation du logement suffit)

La mairie enregistre votre adresse et l'inscrit au dos de votre zairyu card avec un tampon.

**Attention :** cet enregistrement est obligatoire. Ne pas le faire dans les 14 jours est une infraction à la loi sur l'immigration et peut entraîner des complications pour le renouvellement de votre visa.

## Ce que vous pouvez faire avec votre zairyu card

Une fois votre adresse enregistrée au dos de la carte, vous pouvez :
- Ouvrir un compte bancaire (Japan Post Bank en priorité)
- Signer un contrat de bail
- Obtenir un SIM card en contrat
- Vous inscrire à l'assurance maladie nationale
- Accéder à la plupart des services administratifs japonais

La carte sert également de pièce d'identité officielle au quotidien. En pratique, vous l'utilisez presque autant que votre passeport.

## Mettre à jour votre adresse en cas de déménagement

Si vous changez d'adresse au Japon, vous devez notifier votre nouvelle adresse à la mairie dans les 14 jours suivant le déménagement. La mairie met à jour l'adresse au dos de la carte.

Ne pas notifier un changement d'adresse est une infraction. De plus, de nombreux services (banque, assurance, employeur) exigent que votre adresse bancaire corresponde à l'adresse sur votre zairyu card.

## La date d'expiration : à surveiller

Votre zairyu card expire à la même date que votre visa. Il faut renouveler votre visa (et donc votre carte) avant cette date.

La demande de renouvellement doit être faite auprès du bureau régional de l'immigration (nyukan) **avant** l'expiration. Il est conseillé de commencer les démarches 3 mois avant la date limite. Un renouvellement tardif peut entraîner des complications administratives significatives.

**Notification de renouvellement :** vous recevrez normalement un courrier de rappel de l'immigration japonaise plusieurs mois avant l'expiration. Ne comptez pas uniquement sur ce courrier : notez vous-même la date dans votre agenda.

## La carte de résidence permanente

Après un certain nombre d'années de résidence légale et continue au Japon (en général 10 ans, réduits à 1 à 3 ans pour les titulaires du statut HSP), vous pouvez demander la résidence permanente. La carte de résidence permanente (eijuusha) n'a pas de date d'expiration liée au visa. Elle doit simplement être renouvelée tous les 7 ans pour mettre à jour la photo.


Pour votre couverture sante pendant les demarches d'installation, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement, activable des votre arrivee au Japon. *(lien affilie)*
---

*Votre logement à Tokyo est la première étape pour obtenir votre adresse et enregistrer votre zairyu card. Réservez une consultation gratuite pour cadrer votre recherche de logement.*
    `.trim(),
  },
  {
    slug: 'famille-expatriee-tokyo-ecoles-internationales',
    locale: 'fr',
    title: 'Famille expatriée à Tokyo : écoles internationales, quartiers et logement',
    description: 'Lycée franco-japonais, écoles anglophones, quartiers familiaux : guide complet pour les familles qui s\'installent à Tokyo avec des enfants.',
    date: '2026-06-19',
    readingTime: '8 min',
    content: `
S'installer à Tokyo en famille est une expérience exceptionnelle, mais qui demande une préparation plus approfondie qu'une installation en solo. Scolarité, logement, quartier, budget : voici ce que les familles expatriées doivent savoir avant d'arriver.

**Réponse rapide :** Pour une famille expatriée à Tokyo, anticipez trois choses : l'école (les internationales ont de longues listes d'attente et coûtent 2 à 3 millions JPY par an, à réserver tôt), le quartier (proximité de l'école et espaces verts, comme Minato ou Setagaya) et le logement familial (2LDK/3LDK, plus rare et cher). Commencez par choisir l'école, le reste en découle.

## Les options de scolarité à Tokyo

Le choix de l'école est souvent le premier critère qui détermine le quartier de résidence. À Tokyo, les familles francophones et anglophones ont plusieurs options.

### Le Lycée franco-japonais de Tokyo (LFJT)

Le Lycée franco-japonais de Tokyo (在日フランス学校) est l'école officielle de l'Ambassade de France. Il suit les programmes du Ministère de l'Éducation nationale français, de la maternelle jusqu'au baccalauréat.

**Localisation :** Fujimidai, Nerima-ku (ligne Seibu Ikebukuro, à environ 20 minutes de Shibuya)

**Frais de scolarité :** environ 1 200 000 à 1 800 000 JPY par an selon le niveau. Réductions possibles si l'employeur cotise à la CCIFJ ou si vous êtes inscrit sur les listes consulaires.

**Processus d'inscription :** liste d'attente possible pour certains niveaux, notamment en primaire. Contactez l'école au moins 6 mois avant la rentrée souhaitée.

### Les écoles anglophones

Pour les familles anglophones ou qui souhaitent une scolarité en anglais :

**Tokyo International School** (Minato-ku) : programme IB (International Baccalaureate), réputation excellente, très coûteux (2 000 000 à 3 000 000 JPY/an).

**Nishimachi International School** (Minato-ku) : programme anglophone de la maternelle à la 9e année.

**The British School in Tokyo** : programme national britannique.

**Canadian International School** (Minato-ku) : programme canadien en anglais.

### Les écoles publiques japonaises

Les enfants étrangers peuvent s'inscrire dans les écoles publiques japonaises gratuitement. La scolarité est entièrement en japonais. Certains enfants s'adaptent remarquablement en 6 à 12 mois, d'autres ont du mal avec la barrière de la langue.

Les mairies proposent des classes de soutien en japonais pour les enfants étrangers nouvellement arrivés.

## Les quartiers familiaux à Tokyo

Le quartier de résidence d'une famille suit généralement la localisation de l'école choisie.

### Minato-ku : le quartier des familles expatriées

Minato-ku (Hiroo, Azabu-Juban, Roppongi) concentre la majorité des familles expatriées à Tokyo. Proximité des écoles internationales anglophones, épiceries étrangères (National Azabu, Hiroo Supermarket), clubs sportifs anglophones, nombreuses familles dans la même situation.

**Inconvénient :** les loyers sont les plus élevés de Tokyo. Un appartement familial 3LDK dans Hiroo coûte 300 000 à 600 000 JPY/mois.

### Nerima-ku : le choix des familles francophones

Nerima-ku est le quartier le plus proche du Lycée franco-japonais. Moins cosmopolite que Minato-ku, mais très résidentiel et calme. Loyers 40 à 50% moins chers qu'à Hiroo pour une surface équivalente.

**Atouts :** grands appartements possibles, jardins, écoles publiques japonaises de qualité pour les fratries, communauté francophone soudée autour du LFJT.

### Setagaya-ku : l'alternative résidentielle

Setagaya-ku (Jiyugaoka, Sangenjaya, Futako-Tamagawa) est un arrondissement résidentiel très prisé des familles japonaises aisées et de certaines familles expatriées. Appartements plus spacieux, nombreux parcs, écoles japonaises de qualité.

**Atouts :** rapport qualité-prix meilleur qu'en zone centrale, ambiance résidentielle calme, plusieurs structures sportives et culturelles pour enfants.

## Le logement familial : ce qu'il faut savoir

### La surface : plus difficile à trouver qu'on ne le pense

Tokyo est dense. Les appartements de 3 chambres (3LDK) en zone centrale sont rares et très chers. Les familles avec 2 enfants ou plus doivent souvent choisir entre :
- Un appartement 3LDK en zone centrale à budget élevé (250 000 à 450 000 JPY/mois)
- Un appartement 3LDK ou une maison (kodate) en banlieue à budget raisonnable (150 000 à 250 000 JPY/mois) avec un trajet d'école plus long

### Les maisons individuelles (kodate)

Les maisons individuelles sont plus courantes en banlieue (Nerima, Setagaya, Suginami, Adachi). Elles offrent un jardin (souvent petit), plus d'espace, et l'absence de voisins immédiats au-dessus et en dessous.

Budget : 200 000 à 350 000 JPY/mois pour une maison de 3 à 4 chambres en zone accessible.

### Ce que les familles négocient différemment

Par rapport à une installation en solo, les familles peuvent négocier :
- Un bail de 2 ans minimum (les propriétaires préfèrent la stabilité)
- L'autorisation pour les enfants (certains contrats de bail japonais précisent le nombre d'occupants)
- Les aménagements pour enfants (détecteurs de fumée supplémentaires, garde-corps, etc.)

## Le budget familial mensuel à Tokyo

**Loyer (3LDK Nerima-ku)** : 180 000 à 280 000 JPY

**Scolarité (Lycée franco-japonais, 2 enfants)** : 200 000 à 300 000 JPY

**Nourriture (famille de 4)** : 80 000 à 120 000 JPY

**Transports** : 20 000 à 40 000 JPY (selon distance école/travail)

**Activités extrascolaires** : 30 000 à 60 000 JPY

**Budget mensuel total famille de 4** : 600 000 à 900 000 JPY/mois

La couverture d'une partie des frais de scolarité et du logement par l'employeur (package expatriation) est courante dans les grandes entreprises et réduit significativement la charge personnelle.


Pour faire decouvrir Tokyo a vos enfants de facon ludique, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) propose des visites guidees et activites familiales adaptees aux expatries. *(lien affilie)*
---

*Vous installez votre famille à Tokyo ? Réservez une consultation gratuite pour identifier les logements familiaux disponibles à proximité des écoles internationales.*
    `.trim(),
  },
  {
    slug: 'negocier-loyer-tokyo-conseils',
    locale: 'fr',
    title: 'Négocier son loyer à Tokyo : est-ce possible et comment s\'y prendre ?',
    description: 'Le marché locatif tokyoïte est réputé rigide, mais la négociation est possible dans certains cas. Voici quand et comment négocier votre loyer ou vos frais d\'entrée.',
    date: '2026-06-19',
    readingTime: '5 min',
    content: `
Contrairement aux idées reçues, négocier à Tokyo est possible. Pas dans tous les cas, pas de la même façon qu'en Europe, mais les marges de manœuvre existent. Savoir quand et comment négocier peut vous faire économiser plusieurs mois de loyer.

**Réponse rapide :** À Tokyo, on négocie surtout les frais d'entrée plutôt que le loyer affiché : demander un mois offert, réduire l'argent-clé (reikin) ou les frais, surtout en basse saison (mai à août) ou sur un bien vacant depuis longtemps. En haute saison (mars), la marge est quasi nulle. Un agent bilingue négocie plus efficacement en japonais.

> **Vu du terrain.** On bouge rarement le loyer lui-même à Tokyo, les propriétaires tiennent le chiffre. Ce qui se négocie, ce sont les frais d'entrée : un mois d'argent-clé offert, quelques semaines gratuites, une caution réduite, surtout dans la période creuse de mai à août. Négociez la facture d'entrée, pas le montant mensuel.
## Ce qui est négociable (et ce qui ne l'est pas)

**Rarement négociable :**
- Le loyer mensuel d'un bien récent ou bien situé avec plusieurs candidats en concurrence
- Le shikikin (dépôt de garantie) : c'est une garantie légale, les propriétaires y tiennent
- Les frais d'agence : légalement plafonnés à 1 mois, rarement réduits davantage

**Souvent négociable :**
- Le reikin (clé de courtoisie) : c'est le poste où la marge est la plus grande
- La durée du préavis de résiliation
- Certains équipements ou travaux (peinture, climatiseur supplémentaire)
- Le loyer des biens vacants depuis plus de 2 à 3 mois
- La franchise de loyer sur les premiers mois (rent-free period) pour les grands appartements

## Quand la négociation a le plus de chances de réussir

**Biens vacants depuis longtemps :** si un appartement est sur le marché depuis plus de 2 mois, le propriétaire est clairement preneur d'un locataire fiable. Le reikin et parfois même le loyer peuvent être négociés.

**Basse saison :** le marché locatif tokyoïte est saisonnier. Les pics sont en mars-avril (rentrée japonaise) et en septembre-octobre. En dehors de ces périodes (juillet-août et novembre-février), les propriétaires sont plus flexibles.

**Profil de locataire solide :** un contrat de travail stable, un salaire élevé et une longue durée de séjour prévue (2 ans ou plus) sont des arguments forts. Les propriétaires préfèrent un bon locataire à un loyer légèrement plus élevé avec un locataire incertain.

**Paiement immédiat :** proposer de signer rapidement et de verser le premier loyer immédiatement peut convaincre un propriétaire hésitant.

## La technique de négociation qui fonctionne au Japon

La négociation directe et agressive n'est pas dans la culture japonaise. La bonne approche est indirecte et respectueuse.

**Étape 1 :** exprimez un intérêt ferme pour le bien avant de poser la question ("Ce logement nous convient parfaitement et nous souhaitons vraiment aller de l'avant...")

**Étape 2 :** posez la question via l'agence, jamais directement au propriétaire ("Serait-il possible de demander au propriétaire si le reikin est négociable dans notre cas ?")

**Étape 3 :** justifiez par votre profil ("Nous prévoyons de rester 2 ans minimum, nous avons un contrat de travail stable...")

**Étape 4 :** acceptez gracieusement le refus si c'est non. Insister est contre-productif dans la culture japonaise.

## Exemple concret de négociation réussie

Appartement à 120 000 JPY/mois, reikin de 2 mois, shikikin de 2 mois, vacant depuis 3 mois.

Demande : reikin réduit de 2 mois à 1 mois.
Résultat obtenu : reikin réduit à 1 mois.
Économie : 120 000 JPY immédiatement.

Ce type de négociation réussit dans environ 40 à 50% des cas pour les biens vacants depuis plus de 2 mois.

## Ce qu'un chasseur peut faire que vous ne pouvez pas

Un chasseur immobilier local a plusieurs avantages en négociation :

Il connaît l'historique du bien (depuis combien de temps il est vacant, si le propriétaire a déjà réduit le reikin pour d'autres candidats).

Il a une relation avec les agences locales, ce qui donne du poids à ses demandes.

Il négocie en japonais, ce qui permet de faire passer des demandes qui semblent moins "agressives" quand elles sont formulées dans la langue et les codes culturels appropriés.


Pour mieux negocier en japonais avec votre agence, [iTalki](https://www.italki.com/affshare?ref=af32660342) propose des cours particuliers avec des professeurs natifs japonais a partir de 10$/heure. Pour votre couverture sante pendant la transition, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement. *(liens affilies)*
---

*À lire aussi : [Loyers à Tokyo par quartier 2026 : guide pour expatriés](/blog/loyers-tokyo-par-quartier-2026).*

*Vous avez trouvé un appartement à Tokyo et souhaitez optimiser les conditions d\'entrée ? Contactez-nous pour un accompagnement à la négociation.*
    `.trim(),
  },
  {
    slug: 'demenager-japon-checklist-complete',
    locale: 'fr',
    title: 'Déménager au Japon : checklist complète pour bien s\'installer (2026)',
    description: 'Visa, logement, mairie, compte bancaire, assurance, SIM card : toutes les étapes dans le bon ordre pour réussir votre installation au Japon.',
    date: '2026-06-19',
    readingTime: '9 min',
    content: `
Déménager au Japon implique plus de démarches administratives que la plupart des pays. Voici toutes les étapes dans l'ordre chronologique, depuis la préparation avant le départ jusqu'à la vie courante une fois installé.

**Réponse rapide :** Déménager au Japon suit un ordre précis : confirmer le visa, sécuriser le logement avant l'arrivée, puis sous 14 jours déclarer son adresse à la mairie et récupérer la carte de résidence. Ensuite : compte bancaire, assurance maladie nationale, carte SIM et mise en service des utilités. Régler le visa et le logement en premier simplifie tout le reste.


![Quand chercher un logement à Tokyo, par saison](/tokyo-seasonality-fr.png "Fév-Avr haute saison vs le creux Mai-Août, le meilleur moment pour négocier")
## Avant le départ (2 à 6 mois avant)

**Obtenir votre visa**
C'est l'étape la plus critique et souvent la plus longue. Le visa de travail nécessite une offre d'emploi et un sponsor japonais. Le visa working holiday demande de soumettre la demande tôt (les quotas pour la France sont limités). Aucun visa ne peut être obtenu depuis le Japon sur visa touriste, sauf exceptions très rares.

**Sécuriser un logement avant l'arrivée**
Ne pas arriver sans logement. L'hôtel ou le Airbnb pendant la recherche coûte 150 000 à 300 000 JPY supplémentaires. Les share houses et les appartements meublés pour expatriés acceptent les candidatures à distance. Idéalement, la recherche démarre 6 à 8 semaines avant l'arrivée.

**Préparer les documents administratifs**
- Passeport valide au moins 6 mois après la date de départ prévue
- Copies certifiées de votre diplôme (pour le visa travail)
- Relevés bancaires des 3 derniers mois
- Contrat de travail ou lettre d'engagement de l'employeur
- Acte de naissance et livret de famille (pour les conjoints et enfants)
- Traductions officielles en japonais si demandées

**Informer votre banque française**
Signalez votre départ à votre banque pour éviter le blocage de votre carte lors des premières transactions au Japon. Vérifiez que votre carte accepte les retraits internationaux.

**Souscrire une assurance voyage internationale**
Jusqu'à votre inscription à l'assurance maladie japonaise, vous n'avez aucune couverture médicale au Japon. Une assurance voyage couvrant les soins médicaux est indispensable pour les premières semaines.

## À l'arrivée (jours 1 à 3)

**Récupérer la zairyu card à l'aéroport**
Si vous arrivez à Narita ou Haneda avec un visa long séjour, la zairyu card est remise au contrôle des frontières. Vérifiez que toutes les informations sont correctes avant de quitter l'immigration.

**Rejoindre votre logement**
Confirmez la procédure de remise des clés avec l'opérateur ou le chasseur avant votre vol. Prévoyez un moyen de paiement pour les frais d'entrée si vous ne les avez pas déjà virés.

**Acheter un SIM card prépayé**
Avant d'avoir un compte bancaire japonais, vous ne pouvez pas obtenir un SIM card en contrat. Achetez un SIM prépayé à l'aéroport pour les premières semaines. Les boutiques IIJmio, OCN Mobile ou B-Mobile sont présentes dans les aéroports principaux.

## Semaine 1 : les démarches obligatoires

**S'enregistrer à la mairie (dans les 14 jours)**
Rendez-vous à la mairie (kuyakusho) de votre arrondissement avec votre zairyu card, votre passeport et une preuve d'adresse (contrat de bail). L'enregistrement prend 30 à 60 minutes. La mairie inscrit votre adresse au dos de la zairyu card.

**S'inscrire à l'assurance maladie nationale**
Dans le même guichet ou un guichet adjacent à la mairie. Amenez votre zairyu card et votre passeport. Si vous n'avez pas encore votre My Number, l'inscription est quand même possible. Vous recevrez votre carte d'assurance par courrier sous 2 à 3 semaines.

**Ouvrir un compte Japan Post Bank**
Rendez-vous dans n'importe quel bureau de poste avec votre zairyu card et votre passeport. Le compte est ouvert le jour même. La carte de débit arrive par courrier sous 1 à 2 semaines.

## Semaine 2 à 4 : les démarches complémentaires

**Recevoir le courrier My Number**
Environ 2 à 3 semaines après l'enregistrement à la mairie, vous recevrez une lettre avec votre numéro My Number. Ne la jetez pas. Rendez-vous ensuite à la mairie pour demander votre carte My Number (avec photo, valeur de pièce d'identité). Délai de fabrication : 1 à 2 mois.

**Ouvrir un compte Sony Bank (avec My Number)**
Une fois votre numéro My Number reçu, faites la demande en ligne pour Sony Bank. Interface en anglais, taux de change avantageux pour les transferts internationaux.

**Obtenir un SIM card en contrat**
Avec votre zairyu card et votre compte bancaire japonais, vous pouvez signer un contrat SIM chez un opérateur MVNO (IIJmio, OCN, mineo) ou directement chez docomo, SoftBank ou au.

**Installer les applications essentielles**
- Google Maps (version japonaise, avec transports)
- Navitime ou Hyperdia (trains)
- PayPay (paiement mobile, très répandu)
- Mercari (occasion, très utilisé)
- LINE (messagerie standard au Japon)

## Mois 2 à 6 : la vie courante

**Permis de conduire japonais**
Si vous en avez besoin, la conversion d'un permis français se fait sans examen pratique. Documents nécessaires : permis original, traduction officielle (ambassade de France), zairyu card.

**Enregistrement auprès de l'ambassade de France**
L'inscription consulaire est recommandée. Elle vous permet de recevoir les alertes de l'ambassade, de voter aux élections françaises depuis le Japon, et facilite certaines démarches administratives.

**Déclaration des revenus japonais en France**
La France et le Japon ont une convention fiscale. Les revenus gagnés au Japon sont imposables au Japon, pas en France (sous certaines conditions). Consultez un expert fiscal pour votre situation spécifique.

**Grande banque japonaise (après 6 mois)**
Si votre employeur exige SMBC, Mizuho ou MUFG, vous pouvez faire la demande après 6 mois de résidence.

## Prochaines étapes : logement et bail

Avant de signer votre contrat de location, parcourez notre [checklist complète du bail à Tokyo](/fr/blog/checklist-bail-tokyo), toutes les clauses à vérifier, les frais cachés à débusquer et les points de négociation avant de vous engager. Si vous êtes encore en France et que vous cherchez à distance, notre guide pour [trouver un appartement à Tokyo depuis l'étranger](/fr/blog/chercher-appartement-tokyo-depuis-etranger) couvre la recherche à distance, les visites virtuelles et les opérateurs qui acceptent les candidatures internationales.


Pour votre couverture sante pendant la transition, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement. Pour apprendre le japonais avant ou apres l'arrivee, [iTalki](https://www.italki.com/affshare?ref=af32660342) propose des cours avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*
---

*À lire aussi : [Déménageur international vers le Japon : guide et prix 2026](/blog/demenageur-international-japon-guide).*

*Vous préparez votre déménagement au Japon ? Réservez une consultation gratuite pour sécuriser votre logement avant l'arrivée.*
    `.trim(),
  },
  {
    slug: 'tokyo-osaka-kyoto-ou-s-installer',
    locale: 'fr',
    title: 'Tokyo, Osaka ou Kyoto : quelle ville choisir pour s\'installer au Japon ?',
    description: 'Loyers, emploi, qualité de vie, communauté francophone : comparatif complet des trois principales villes pour les expatriés qui veulent s\'installer au Japon.',
    date: '2026-06-19',
    readingTime: '7 min',
    content: `
La question revient dans tous les groupes d'expatriés : quelle ville japonaise choisir pour s'installer ? Tokyo, Osaka et Kyoto ont chacune leurs avantages et leurs contraintes. Voici une comparaison honnête basée sur les critères qui comptent vraiment pour un expatrié.

**Réponse rapide :** Tokyo offre le plus d'emplois, de services internationaux et de dynamisme, mais les loyers les plus élevés. Osaka est plus abordable, chaleureuse et bien reliée, idéale pour un meilleur rapport qualité-prix. Kyoto est la plus calme et culturelle, mais avec moins d'emplois internationaux. Choisissez selon votre emploi d'abord, puis le style de vie.

## Tokyo : la métropole des opportunités

**Population :** 14 millions d'habitants (Grand Tokyo : 37 millions)

**Pour qui :** professionnels actifs, carrières internationales, familles avec enfants en écoles internationales, anglophones et francophones

### Emploi et économie
Tokyo concentre plus de 60% des sièges sociaux des grandes entreprises japonaises et étrangères. C'est la seule ville au Japon où le marché de l'emploi en anglais est suffisamment développé pour trouver un poste dans des secteurs très variés : finance, tech, consulting, mode, restauration, enseignement.

Pour les francophones cherchant un poste en français ou dans un contexte franco-japonais, Tokyo est de loin la meilleure option.

### Loyers
Les plus élevés du Japon. Un 1K en zone centrale : 80 000 à 130 000 JPY/mois. Un appartement familial 3LDK : 200 000 à 450 000 JPY/mois selon le quartier.

### Communauté expatriée
La plus grande et la plus diversifiée. Lycée franco-japonais, consulat, associations franco-japonaises, restaurants français, epiceries étrangères. Jamais isolé.

### Qualité de vie
Excellente, mais intense. Tokyo est une ville stimulante qui peut être épuisante. Les espaces verts existent mais sont limités. Les transports sont impeccables mais bondés aux heures de pointe.

## Osaka : le meilleur rapport qualité-vie

**Population :** 2,7 millions d'habitants (Grand Osaka : 19 millions)

**Pour qui :** ceux qui veulent vivre au Japon sans la pression de Tokyo, profils culinaires et créatifs, budget plus serré

### Emploi et économie
Le marché de l'emploi en anglais est nettement moins développé qu'à Tokyo. Les opportunités existent surtout dans le tourisme, l'enseignement des langues, la gastronomie, et quelques secteurs industriels (Panasonic, Sharp ont leurs sièges dans la région). Pour un travail entièrement en anglais ou en français : les options sont limitées.

### Loyers
30 à 40% moins chers qu'à Tokyo pour une surface équivalente. Un 1K en zone centrale d'Osaka : 55 000 à 90 000 JPY/mois. L'un des meilleurs rapports qualité-prix de toutes les grandes villes asiatiques.

### Communauté expatriée
Bien plus petite qu'à Tokyo. Pas de lycée français. Le consulat général de France est à Osaka, mais les services sont limités. Communauté anglophone active mais moins structurée.

### Qualité de vie
Osaka est souvent citée comme la ville japonaise où l'on mange le mieux (takoyaki, okonomiyaki, kushikatsu) et où les habitants sont les plus chaleureux et directs. Le rythme de vie est plus détendu qu'à Tokyo. Idéal pour ceux qui veulent s'immerger dans la culture japonaise réelle.

## Kyoto : le choix atypique

**Population :** 1,5 million d'habitants

**Pour qui :** amoureux de la culture japonaise traditionnelle, enseignants, chercheurs, profils indépendants, séjours courts à moyens

### Emploi et économie
Marché de l'emploi très limité pour les anglophones et francophones en dehors de l'enseignement des langues et du tourisme. Quelques startups technologiques et universités recrutent des profils internationaux, mais c'est marginal. Kyoto n'est pas une ville pour les carrières corporate classiques.

### Loyers
Comparables à Osaka, parfois légèrement moins chers dans les quartiers résidentiels. Les logements traditionnels (machiya, maisons en bois) sont une spécificité kyotoïte à prix raisonnables.

### Communauté expatriée
La plus petite des trois. Peu de services en français. Communauté internationale présente via les universités (Doshisha, Ritsumeikan, Kyoto University), mais peu structurée pour les travailleurs.

### Qualité de vie
Exceptionnelle pour ceux qui valorisent la culture, les temples, la nature et un rythme de vie lent. Peu adaptée si vous avez besoin de dynamisme professionnel ou de services internationaux.

## Le tableau de comparaison

| Critère | Tokyo | Osaka | Kyoto |
|---|---|---|---|
| Emploi en anglais | Excellent | Limité | Très limité |
| Loyer (1K central) | 80-130k JPY | 55-90k JPY | 50-85k JPY |
| École française | Oui (LFJT) | Non | Non |
| Communauté FR | Grande | Petite | Très petite |
| Transport | Excellent | Bon | Bon |
| Rythme de vie | Intense | Modéré | Lent |

## La question qui tranche tout

**Votre employeur ou votre activité détermine la ville.** Si vous avez un emploi à Tokyo, habitez à Tokyo. Si votre activité vous permet de travailler depuis n'importe où, Osaka offre le meilleur compromis qualité de vie / coût de la vie. Kyoto est un choix de style de vie, pas un choix professionnel.

Pour les familles avec enfants : Tokyo s'impose si l'école française est une priorité.


Pour comparer les atmospheres de Tokyo, Osaka et Kyoto par vous-meme, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) propose des visites guidees dans chacune de ces villes, reservables en ligne. *(lien affilie)*
---

*À lire aussi : [Tokyo ou Osaka pour vivre : comparatif expatrié 2026](/blog/tokyo-osaka-ou-vivre-expatrie-comparatif).*

*Vous hésitez encore sur votre ville et cherchez un logement à Tokyo ? Réservez une consultation gratuite pour explorer les options disponibles.*
    `.trim(),
  },
  {
    slug: 'residence-card-japan-zairyu-card-guide',
    locale: 'en',
    title: 'Japan Residence Card (Zairyu Card): Complete Guide for Foreigners',
    description: 'How to get your Japan Residence Card, what it lets you do, and the mandatory steps within 14 days of arrival. Everything foreigners need to know.',
    date: '2026-06-19',
    readingTime: '5 min',
    content: `
The Japan Residence Card (在留カード, zairyu card) is the most important document for any foreigner living in Japan. Without it, you cannot open a bank account, sign a lease, get a contract SIM card, or access most public services.

**Quick answer:** The residence card (zairyu card) is issued at the airport on arrival for stays over three months, then activated by registering your address at the ward office within 14 days. You need it to open a bank account, sign a lease, get a contract SIM, and use public services. Carry it at all times: it is legally required.

## What is the zairyu card?

The zairyu card is an official ID card issued by the Japanese government to all foreign residents on a long-stay visa. It confirms your residency status, visa type, and the expiry date of your authorised stay.

It looks like a credit card: laminated, with your photo, name, date of birth, nationality, registered address, visa type, and expiry date.

## How to get it

**At the airport on arrival**: if you arrive at Tokyo (Narita or Haneda), Osaka (Kansai), or another major international airport with a valid long-stay visa, the zairyu card is issued to you directly at the immigration counter. No additional steps are needed at that moment.

If you arrive through a smaller airport, the card is sent by post to your Japanese address after you register at the ward office.

## Register at the ward office: mandatory within 14 days

Once you have a Japanese address (your accommodation), you must go to your local ward office (kuyakusho) within **14 days** to register your address.

**Documents to bring**:
- Your zairyu card
- Your passport
- Proof of address (a copy of your lease agreement is sufficient)

The ward office registers your address and stamps it on the back of your zairyu card.

**Important**: this registration is mandatory. Failing to do it within 14 days is a violation of immigration law and can cause complications when renewing your visa.

## What you can do with your zairyu card

Once your address is registered on the back:
- Open a bank account (Japan Post Bank first)
- Sign a lease agreement
- Get a contract SIM card
- Enrol in national health insurance
- Access most Japanese public services

The card also serves as official government-issued photo ID in daily life. In practice, you use it almost as often as your passport.

## Updating your address when you move

If you change your address in Japan, you must notify the ward office within 14 days of the move. The ward office updates the address stamp on the back of the card.

Failing to notify an address change is a violation of immigration law. Additionally, most services (bank, insurance, employer) require that your address on record matches the address on your zairyu card.

## Expiry: watch this date

Your zairyu card expires on the same date as your visa. You must renew your visa (and therefore your card) before this date.

The renewal application must be submitted to the regional immigration bureau (nyukan) **before** expiry. It is advisable to start the process 3 months before the deadline. Late renewal can cause significant administrative complications.

You will normally receive a reminder letter from Japanese immigration several months before expiry. Do not rely solely on that letter: set a calendar reminder when you receive your card.

## Permanent residency card

After a certain number of years of legal, continuous residence in Japan (generally 10 years, reduced to 1 to 3 years for Highly Skilled Professional visa holders), you can apply for permanent residency. The permanent residency card (eijuusha) has no visa expiry date. It must simply be renewed every 7 years to update the photo.


For health coverage while completing your registration process, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment, activatable from your first day in Japan. *(affiliate link)*
---

*Your Tokyo address starts with securing housing. Book a free consultation to see what is available for your arrival date.*
    `.trim(),
  },
  {
    slug: 'japan-health-insurance-expat-guide',
    locale: 'en',
    title: 'Health Insurance in Japan for Expats: Complete Guide 2026',
    description: 'Shakai hoken or kokumin kenko hoken: how Japanese health insurance works for foreigners, what it covers, and how to enrol within 14 days of arrival.',
    date: '2026-06-19',
    readingTime: '6 min',
    content: `
Japan has one of the best healthcare systems in the world, built on a mandatory insurance model that covers every resident, including foreign nationals. Understanding how it works before you arrive saves time and avoids costly gaps in coverage.

**Quick answer:** Japan requires every resident, including foreigners, to enrol in health insurance. If you are employed, you join your company's Social Insurance (Shakai Hoken); otherwise you enrol in National Health Insurance (NHI) at the ward office. Both cover about 70% of medical costs, so you pay 30% out of pocket. Enrol as soon as you register your address to avoid back-payments.


![The order of steps to settle in Tokyo: visa, residence card, bank, guarantor, lease](/tokyo-process-en.png "Your residence card unlocks everything, get it on day 1")
## The two systems

Every resident in Japan must be covered by one of two systems:

**1. Shakai hoken (employee health insurance)**
If you are employed full-time by a Japanese company, your employer automatically enrols you in shakai hoken. Contributions are deducted directly from your salary, split between you and your employer. This is the most common situation for expats on a working visa.

**2. Kokumin kenko hoken (national health insurance)**
If you are self-employed, on a working holiday visa, a student, or your employer does not offer shakai hoken, you must enrol yourself in the national health insurance scheme at your local ward office.

## How much does national health insurance cost?

Premiums for kokumin kenko hoken are calculated based on your income from the previous year. For a newly arrived expat with no prior Japanese income history, the minimum premium applies.

**Estimates for a single person**:
- New arrival with no Japanese income history: 2,000 to 5,000 JPY/month
- Annual income of 3 million JPY: approximately 15,000 to 20,000 JPY/month
- Annual income of 5 million JPY: approximately 25,000 to 35,000 JPY/month

The premium covers the policyholder and dependants (non-working spouse, children).

## What is covered

With either shakai hoken or kokumin kenko hoken, you pay 30% of medical costs. The insurance covers the remaining 70%.

**What is covered**:
- GP and specialist consultations
- Hospitalisations
- Prescription medications
- Dental care (partially)
- Standard medical tests and procedures

**Monthly cost ceiling (kogen ryoyo seido)**: if your out-of-pocket medical costs in a single month exceed a set threshold (approximately 80,000 to 90,000 JPY for an average income), the insurance covers the excess. This protects against catastrophic expenses.

**What is not covered**:
- Cosmetic dental treatments
- Glasses and contact lenses (except for medical conditions)
- Some travel vaccines
- Private clinic consultations outside the network

## How to enrol in national health insurance

Go to your local ward office (kuyakusho), to the national health insurance counter.

**Documents needed**:
- Your Residence Card (zairyu card)
- Your passport
- Your registered Japanese address
- Your My Number (if you have received it)

**Timing**: you must enrol within 14 days of arrival or of losing other coverage (such as leaving a shakai hoken-covered job). Late enrolment results in paying backdated premiums from the date you should have enrolled.

**What you receive**: a health insurance card (hoken-sho) sent by post within 2 to 3 weeks. Present this card at every medical appointment.

## Using your insurance in daily life

**At the clinic**: show your insurance card at reception. You pay 30% of the consultation cost at the end of the visit.

**Real cost of a GP visit**: with insurance, a standard consultation typically costs 1,000 to 3,000 JPY depending on the tests performed.

**At the pharmacy**: prescription medications are also reimbursed at 70%. Over-the-counter medications are not reimbursed.

**At the hospital**: for hospitalisations, the monthly cost ceiling applies. In practice, even a week-long hospital stay remains manageable with insurance.

## Supplementary insurance

Like a complementary mutuelle in France, many residents in Japan take out private supplementary insurance to cover their remaining 30% out-of-pocket share. Companies such as AIA, AXA Japan, and MetLife Japan offer supplementary plans from 2,000 to 5,000 JPY/month.

Useful if you have chronic health conditions or plan to stay several years.

For expats in the installation phase or on international mobility, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers a flexible alternative: monthly health coverage with no commitment, activatable before enrolling in kokumin kenko hoken. *(affiliate link)*

## What to do if you fall ill before your insurance card arrives

If you need a doctor before receiving your insurance card, you pay 100% of the consultation cost. Keep all your receipts. Once your card arrives, you can claim reimbursement of the 70% covered portion at your ward office.

---

*See also: [Renter's Insurance in Japan: What Every Tenant Should Know](/blog/renters-insurance-japan-guide).*

*Planning your move to Tokyo? Book a free consultation to secure housing before you arrive and start your administrative setup on the right foot.*
    `.trim(),
  },
  {
    slug: 'family-expat-tokyo-international-schools',
    locale: 'en',
    title: 'Family Expat Life in Tokyo: International Schools and Neighbourhoods (2026)',
    description: 'International schools in Tokyo, family-friendly neighbourhoods, housing costs for families: the complete guide for expats relocating to Tokyo with children.',
    date: '2026-06-19',
    readingTime: '8 min',
    content: `
Relocating to Tokyo with children requires more planning than moving solo, but it is one of the most rewarding experiences a family can have. Here is what you need to know about schooling, neighbourhoods, and housing before you arrive.

**Quick answer:** For a family relocating to Tokyo, plan three things early: school (international schools have long waitlists and cost 2 to 3 million JPY per year, so apply first), neighbourhood (near the school with green space, such as Minato or Setagaya), and family-sized housing (2LDK/3LDK, rarer and pricier). Choose the school first and the rest follows.

## International schools in Tokyo

The choice of school is often what determines which neighbourhood a family lives in. Tokyo has solid options for English-speaking and French-speaking families.

### For French-speaking families: Lycée franco-japonais de Tokyo (LFJT)

The Lycée franco-japonais de Tokyo is the official French school attached to the Embassy of France. It follows the French national curriculum from nursery through to the baccalauréat.

**Location**: Fujimidai, Nerima-ku (Seibu Ikebukuro line, approximately 20 minutes from Shibuya)

**Annual fees**: approximately 1,200,000 to 1,800,000 JPY per year depending on the grade level. Reductions may apply through the CCIFJ (French Chamber of Commerce in Japan) or French consular registration.

**Admissions**: waiting lists exist for some grade levels, particularly primary school. Contact the school at least 6 months before the desired start date.

### For English-speaking families

**Tokyo International School** (Minato-ku): International Baccalaureate programme, excellent reputation. Annual fees: 2,000,000 to 3,000,000 JPY.

**Nishimachi International School** (Minato-ku): English-medium school from nursery through to grade 9.

**The British School in Tokyo**: British national curriculum.

**Canadian International School** (Minato-ku): Canadian curriculum in English.

### Japanese public schools

Foreign children can attend Japanese public schools free of charge. Schooling is entirely in Japanese. Some children adapt remarkably within 6 to 12 months; others find the language barrier challenging.

Ward offices provide Japanese language support classes for newly arrived foreign children.

## Family-friendly neighbourhoods in Tokyo

The residential neighbourhood a family chooses typically follows the location of the school.

### Minato-ku: the classic expat family zone

Minato-ku (Hiroo, Azabu-Juban, Roppongi) concentrates the majority of expat families in Tokyo. Close to English-medium international schools, foreign grocery stores (National Azabu, Hiroo Supermarket), English-speaking sports clubs, and many families in the same situation.

**Drawback**: the most expensive rents in Tokyo. A family 3LDK apartment in Hiroo costs 300,000 to 600,000 JPY/month.

### Nerima-ku: the French family neighbourhood

Nerima-ku is the closest ward to the Lycée franco-japonais. Less cosmopolitan than Minato-ku, but very residential and quiet. Rents are 40 to 50% lower than Hiroo for equivalent space.

**Strengths**: large apartments available, gardens, high-quality Japanese public schools for siblings, tight-knit francophone community around the LFJT.

### Setagaya-ku: the residential alternative

Setagaya-ku (Jiyugaoka, Sangenjaya, Futako-Tamagawa) is a residential ward popular with affluent Japanese families and some expat families. Larger apartments, parks, quality Japanese schools.

**Strengths**: better value than central zones, quiet residential atmosphere, several children's sports and cultural facilities.

## Family housing in Tokyo: what to know

### Space is harder to find than you expect

Tokyo is dense. Three-bedroom apartments (3LDK) in central areas are rare and expensive. Families with two or more children typically choose between:
- A 3LDK in a central zone at high cost (250,000 to 450,000 JPY/month)
- A 3LDK or house (kodate) in the suburbs at a reasonable price (150,000 to 250,000 JPY/month) with a longer school commute

### Houses (kodate)

Individual houses are more common in suburban areas (Nerima, Setagaya, Suginami, Adachi). They offer a small garden, more living space, and no neighbours directly above and below.

Budget: 200,000 to 350,000 JPY/month for a 3 to 4-bedroom house in an accessible area.

### What families negotiate differently

Compared to a single-person relocation, families can negotiate:
- A minimum 2-year lease term (landlords prefer stable, long-term tenants)
- Permission for children (some Japanese leases specify the number of occupants)
- Minor fittings or safety adaptations (additional smoke detectors, window guards)

## Monthly budget for a family of four in Tokyo

**Rent (3LDK Nerima-ku)**: 180,000 to 280,000 JPY

**Schooling (LFJT or international school, 2 children)**: 200,000 to 300,000 JPY

**Food (family of four)**: 80,000 to 120,000 JPY

**Transport**: 20,000 to 40,000 JPY

**Extracurricular activities**: 30,000 to 60,000 JPY

**Total monthly budget, family of four**: 600,000 to 900,000 JPY/month

Employer-provided relocation packages covering part of the school fees and housing are common in large corporations and significantly reduce the personal financial burden.


To introduce Tokyo to your children in an engaging way, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) offers family-friendly guided tours and activities suited for expat families. *(affiliate link)*
---

*Relocating to Tokyo with your family? Book a free consultation to find available family housing near international schools.*
    `.trim(),
  },
  {
    slug: 'negotiating-rent-tokyo-tips',
    locale: 'en',
    title: 'Negotiating Rent in Tokyo: Is It Possible and How to Do It?',
    description: 'Tokyo\'s rental market has a reputation for being rigid, but negotiation is possible in specific situations. Here is when and how to negotiate your rent or move-in costs.',
    date: '2026-06-19',
    readingTime: '5 min',
    content: `
Contrary to common belief, negotiation in Tokyo is possible. Not in every case, not in the same way as in Europe, but room for manoeuvre exists. Knowing when and how to negotiate can save you several months of rent.

**Quick answer:** In Tokyo you mostly negotiate the move-in costs, not the advertised rent: ask for a free month, reduced key money (reikin) or fees, especially in the quiet season (May to August) or on a long-vacant unit. In peak season (March) there is almost no room. A bilingual agent negotiates far more effectively in Japanese.

> **From the field.** You rarely move the rent itself in Tokyo, owners hold the number. The give is on the move-in fees: a waived month of key money, a few free weeks, a smaller deposit, especially in the quiet May to August window. Negotiate the upfront bill, not the monthly figure.
## What is and is not negotiable

**Rarely negotiable**:
- Monthly rent on a recently built or well-located property with multiple competing applicants
- Shikikin (security deposit): this is a legal guarantee; landlords are firm on this
- Agency fee: legally capped at 1 month, rarely reduced further

**Often negotiable**:
- Reikin (key money): this is where the margin is greatest
- Notice period for termination
- Equipment or minor works (air conditioning unit, fresh paint)
- Rent on properties that have been vacant for more than 2 to 3 months
- Rent-free period (free months at the start of the lease) for large apartments

## When negotiation has the best chance of success

**Long-vacant properties**: if an apartment has been on the market for more than 2 months, the landlord is clearly open to a reliable tenant. The reikin and sometimes even the monthly rent can be negotiated.

**Off-season**: the Tokyo rental market is seasonal. Peak periods are March to April (Japanese school year start) and September to October. Outside these periods (July to August and November to February), landlords are more flexible.

**Strong tenant profile**: a stable employment contract, good salary, and planned long stay (2 years or more) are strong arguments. Landlords often prefer a good tenant over a slightly higher rent from an uncertain one.

**Immediate commitment**: offering to sign quickly and transfer the first month's rent immediately can persuade a hesitant landlord.

## The negotiation approach that works in Japan

Direct, aggressive negotiation is not part of Japanese culture. The right approach is indirect and respectful.

**Step 1**: express firm interest before raising any request ("We love this apartment and are very keen to move forward...")

**Step 2**: raise the question through the agency, never directly with the landlord ("Would it be possible to ask the landlord if the reikin is negotiable in our case?")

**Step 3**: justify with your profile ("We are planning to stay for at least 2 years and have a stable employment contract...")

**Step 4**: accept a refusal graciously if the answer is no. Pushing further is counterproductive in Japanese business culture.

## A concrete example of successful negotiation

Apartment at 120,000 JPY/month, reikin of 2 months, shikikin of 2 months, vacant for 3 months.

Request: reduce reikin from 2 months to 1 month.
Result: reikin reduced to 1 month.
Saving: 120,000 JPY immediately.

This type of negotiation succeeds in approximately 40 to 50% of cases on properties vacant for more than 2 months.

## What a property hunter can do that you cannot

A local property hunter has several negotiation advantages:

They know the property's history: how long it has been vacant, whether the landlord has already reduced the reikin for other applicants.

They have existing relationships with local agencies, which adds weight to their requests.

They negotiate in Japanese, allowing requests to be phrased in culturally appropriate ways that feel less confrontational than the same request made in English through an intermediary.


To negotiate in Japanese with your agency, [iTalki](https://www.italki.com/affshare?ref=af32660342) offers private lessons with native Japanese teachers from $10/hour. For health coverage during your transition, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment. *(affiliate links)*
---

*See also: [7 Rental Traps to Avoid When Renting in Tokyo as a Foreigner](/blog/tokyo-rental-traps-foreigners), [Tokyo Rental Contract: 12 Things to Check Before Signing](/blog/tokyo-rental-contract-checklist), [Tokyo Rent by Neighborhood 2026: Expat Price Guide](/blog/tokyo-rent-by-neighborhood-2026).*

*Found an apartment in Tokyo and want help optimising your entry conditions? Contact us for negotiation support.*
    `.trim(),
  },
  {
    slug: 'gaijin-house-vs-share-house-tokyo',
    locale: 'en',
    title: 'Gaijin House vs Share House in Tokyo: What\'s the Difference?',
    description: 'Gaijin house and share house are often used interchangeably, but they are not the same thing. Here is the real difference and which one suits your situation.',
    date: '2026-06-19',
    readingTime: '5 min',
    content: `
If you have been searching for short-term housing in Tokyo as a foreigner, you have probably seen both "gaijin house" and "share house" used, sometimes for the same type of property. They are related but not identical. Understanding the difference helps you find the right option for your situation.

**Quick answer:** Gaijin houses and share houses have largely merged: both offer furnished private rooms with shared common areas, no guarantor and no key money. Historically 'gaijin house' meant foreigner-focused shared housing, while 'share house' is the broader modern term used across Japan. For a newcomer, either is the fastest, cheapest way into Tokyo.

## What is a gaijin house?

"Gaijin" (外人) is a Japanese term for foreigner, though it carries an informal and sometimes slightly pejorative connotation depending on context. A "gaijin house" is a colloquial term, not a formal property category. It refers to any shared accommodation that specifically caters to foreign residents in Japan.

Historically, gaijin houses emerged in the 1980s and 1990s as a response to the extreme difficulty foreigners faced renting standard apartments. They were often older buildings, minimally renovated, with shared facilities and very few move-in requirements. They accepted anyone with a passport, regardless of visa status or length of stay.

**Key characteristics of the traditional gaijin house**:
- Older building, basic facilities
- Very flexible entry conditions (sometimes no visa requirements beyond tourist status)
- Weekly or monthly payment options
- No long-term commitment required
- Often international atmosphere, frequent turnover of residents

## What is a share house?

A share house (シェアハウス) is a formal, professionally managed residential property where multiple tenants share communal spaces. The term is a modern, regulated concept in Japan, developed primarily from the mid-2000s onward.

Modern share houses range from budget options at 40,000 JPY/month to premium properties at 90,000 JPY/month with gym access, designer interiors, rooftop terraces, and concierge services.

**Key characteristics of the modern share house**:
- Managed by a professional operator (often a company with dozens of properties)
- Minimum stay typically 1 to 3 months
- Standard screening process (application, visa check, income verification)
- Lease agreement signed
- Often a mix of Japanese and foreign residents

## The overlap and the confusion

The confusion arises because many properties marketed online as "gaijin houses" are actually modern share houses targeting foreigners. The word "gaijin house" is often used as a search term or marketing label to signal "foreigner-friendly" rather than as a precise description of the property type.

In practice, when people say "gaijin house" in 2026, they usually mean a share house that:
- Has a straightforward application process for foreigners
- Has an English-speaking operator or English documentation
- Accepts short stays (1 month minimum rather than 3 or 6)
- Has few requirements beyond a valid visa

## Which one suits your situation?

**Choose a modern share house if**:
- You want a clean, well-managed property with clear rules
- You plan to stay 1 month or more
- You want to live with a mix of Japanese and international residents
- You have a valid long-stay visa

**A more flexible "gaijin house" setup may work if**:
- You are arriving on a tourist visa and waiting for your work visa to be processed
- You need accommodation for less than 1 month
- You need to move in immediately with no application process
- Your budget is very tight (some gaijin houses accept payment by the week)

**Avoid if**:
- You want a stable living environment for more than a few months (turnover is high, management quality is variable in the most informal properties)
- You care about the condition of the building and facilities

## Practical advice

When evaluating a property marketed as a "gaijin house" or share house, the questions to ask are always the same:

- What is the minimum stay?
- What documents are required to move in?
- What is included in the monthly fee (utilities, internet)?
- What are the house rules?
- Is there a contact person if there is a problem?

The answers tell you whether you are dealing with a well-managed modern share house or an informal short-stay arrangement. Both can be the right choice depending on your timing and needs.


Pour votre couverture sante quelle que soit votre option de logement, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement. Pour progresser en japonais pendant votre sejour, [iTalki](https://www.italki.com/affshare?ref=af32660342) propose des cours particuliers avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*
---

*See also: [Share House in Tokyo: Complete Guide for Foreigners (2026)](/blog/share-house-tokyo-guide-2026).*

*Looking for the right share house or furnished apartment in Tokyo for your arrival? Book a free consultation to see current availability.*
    `.trim(),
  },
  {
    slug: 'tokyo-neighbourhoods-expats-guide',
    locale: 'en',
    title: 'Best Tokyo Neighbourhoods for Expats: Complete Guide 2026',
    description: 'Shinjuku, Shibuya, Minato, Koenji, Ikebukuro: which Tokyo neighbourhood to choose based on your budget, lifestyle, and workplace.',
    date: '2026-06-19',
    readingTime: '9 min',
    content: `
Choosing the right neighbourhood in Tokyo is a decision that shapes your quality of life for the next 12 to 36 months. Too central and rent exceeds your budget. Too far out and commutes eat into your evenings. Here are the neighbourhoods that offer the best balance for French-speaking and English-speaking expats.

**Quick answer:** The best Tokyo neighbourhoods for expats balance rent, commute and convenience. Central premium areas (Minato, Shibuya, Meguro) start around 130,000 JPY for a studio; mid-range areas (Setagaya, Nakano, Koto) give more space per yen; eastern and outer wards (Edogawa, Adachi) are the most affordable. Pick by commute time to your office first, then by vibe.

## Shinjuku: the practical expat hub

**Best for**: professionals working in west Tokyo, families looking for French-language services

**Average 1K rent**: 90,000 to 140,000 JPY/month

Shinjuku is one of the busiest train stations in the world, with 12 train and metro lines. It is home to the French Consulate General and several French and European restaurants.

The neighbouring district of Shin-Okubo, a 10-minute walk away, is Tokyo's Korean quarter: international food shops, restaurants, and an affordable international atmosphere.

**Strengths**: maximum connectivity, foreign-language services, vibrant nightlife

**Drawbacks**: noisy, the streets around Kabukicho are busy at night

## Shibuya / Daikanyama / Ebisu: the trendy triangle

**Best for**: young professionals, creative profiles, English speakers

**Average 1K rent**: 120,000 to 180,000 JPY/month

These three neighbourhoods form a residential triangle popular with Western expats. Daikanyama and Ebisu offer a village-like feel with quality cafes and boutique shops. Shibuya is the commercial and cultural hub.

Transport connections are excellent: Yamanote Line, Tokyu Toyoko Line, Hibiya Line.

**Strengths**: high quality of life, international bars and restaurants, English-friendly environment

**Drawbacks**: among the most expensive rents in Tokyo

## Minato-ku (Roppongi, Azabu-Juban, Hiroo): the classic expat zone

**Best for**: families with children in international schools, senior expats on long-term assignments

**Average 1LDK rent**: 200,000 to 350,000 JPY/month

Minato-ku is historically the upscale expat residential zone in Tokyo. It hosts the Lycée franco-japonais, several English-medium international schools, foreign supermarkets (National Azabu, Hiroo Supermarket), and a high concentration of embassies.

Hiroo is the most family-friendly sub-district, Roppongi the most lively, Azabu-Juban the most balanced.

**Strengths**: full family infrastructure, English-speaking services everywhere, maximum safety

**Drawbacks**: the most expensive area in Tokyo, risk of expat bubble (limited contact with everyday Japanese life)

## Nakameguro / Meguro: the ideal balance

**Best for**: couples, profiles who want authentic Tokyo without sacrificing comfort

**Average 1K rent**: 100,000 to 150,000 JPY/month

Nakameguro has become one of Tokyo's most popular neighbourhoods. The Meguro River canal is stunning in spring (cherry blossoms) and the area offers a strong selection of independent restaurants and boutiques.

**Strengths**: pleasant atmosphere, good transport links (Tokyu Toyoko, Hibiya Line), less touristy than Shibuya

**Drawbacks**: rents rising, fewer practical everyday shops

## Koenji / Nakano: the smart choice

**Best for**: limited budget, young professionals, artists, those who want to integrate into Japanese life

**Average 1K rent**: 70,000 to 100,000 JPY/month

Koenji is Tokyo's alternative neighbourhood: vintage shops, vinyl bars, small restaurants. Few foreigners, many creative Japanese residents. The atmosphere is relaxed and rents are 30 to 40% cheaper than central areas for comparable quality of life.

The JR Chuo Line connects Koenji to Shinjuku in 7 minutes.

**Strengths**: affordable rents, quick access to the centre, authentic Japanese atmosphere

**Drawbacks**: few English-language services, less practical for families

## Ikebukuro: the self-contained city

**Best for**: students, mid-range budget, fans of popular culture

**Average 1K rent**: 80,000 to 120,000 JPY/month

Ikebukuro is often overlooked by guidebooks but is one of Tokyo's most lively areas. Two major department stores (Seibu, Tobu), an abundant selection of Korean and Chinese restaurants, and excellent transport connections (Yamanote Line, Marunouchi Line, Seibu and Tobu Lines).

**Strengths**: excellent value for money, activity 7 days a week, highly connected

**Drawbacks**: less residential feel than southern neighbourhoods

## How to choose based on your profile

**Arriving solo, budget 100,000 to 150,000 JPY/month**: Koenji, Nakano, or Ikebukuro. High quality of life, reasonable rents.

**Coming as a couple, budget 180,000 to 250,000 JPY/month**: Nakameguro, Meguro, or Ebisu. Ideal balance.

**Children or international school needed**: Minato-ku or Shinjuku. Complete family infrastructure.

**Working in east Tokyo (Marunouchi, Nihonbashi)**: Kiyosumi-Shirakawa, Monzen-Nakacho. Under the radar and affordable.

The general rule: each station further from the central zone means approximately 10,000 JPY less in rent per month. An apartment 20 minutes from Shibuya often costs 30 to 40% less than one 5 minutes away.


To explore Tokyo and its neighbourhoods before settling in, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) offers guided tours, food experiences and cultural activities bookable online. *(affiliate link)*
---

*See also: [Best Tokyo Neighbourhoods for Expat Families (2026)](/blog/best-neighbourhoods-families-tokyo-guide).*

*Unsure between two neighbourhoods? During a free consultation, I help you identify available properties in each area based on your actual budget.*
    `.trim(),
  },
  {
    slug: 'japan-work-visa-foreigners-guide',
    locale: 'en',
    title: 'Japan Work Visa for Foreigners: Which Type to Choose in 2026?',
    description: 'Engineer visa, Highly Skilled Professional, working holiday: Japan work visa options explained for English and French speakers, with real conditions and timelines.',
    date: '2026-06-19',
    readingTime: '8 min',
    content: `
Working in Japan as a foreigner is entirely achievable, but Japan's visa system is complex and poorly documented in English. Here are the main visa categories for foreign nationals, with the real conditions for each.

**Quick answer:** To work in Japan you need an employer-sponsored work visa in a category that matches your role (Engineer/Specialist in Humanities, Intra-company Transfer, Instructor, and others). It usually requires a degree or equivalent experience plus a job contract. The Working Holiday visa and the digital nomad visa are alternatives for some profiles.

## Engineer / Humanities / International Services visa (the most common)

This is the standard work visa for skilled professionals in Japan. It covers a wide range of jobs: developers, engineers, translators, language teachers, international marketing, human resources.

**Requirements**:
- A university degree (bachelor's minimum) in a field related to the position
- Or 10 years of professional experience in the field (without a degree)
- A firm job offer from a Japanese company that sponsors your visa application
- Salary must be equivalent to that of a Japanese employee in the same role

**Duration**: 1, 3, or 5 years depending on profile and company. Renewable indefinitely.

**Processing time**: 1 to 3 months after submission. Some companies are "recognised" by Japanese immigration and benefit from accelerated processing (2 weeks).

**What this visa allows**: working only for the employer named on the visa. Changing employer requires modifying your residence status.

## Highly Skilled Professional (HSP) visa

The HSP system is points-based. If you accumulate 70 points or more according to an official scoring table, you receive preferential status with significant advantages.

**Points are awarded for**:
- Age (younger scores higher: 15 points under 30, 10 points between 30 and 35)
- Degree level (PhD = 30 points, master's = 20 points, bachelor's = 10 points)
- Annual salary (70 points for 10 million JPY/year, 40 points for 4 million JPY/year)
- Professional experience
- Patents filed
- Academic research
- Japanese language proficiency (JLPT N1 or N2 adds points)

**HSP advantages over the standard visa**:
- Permanent residency accessible after 1 to 3 years (versus 10 years normally)
- Permission to bring parents to Japan in certain cases
- Permission to work for multiple companies simultaneously
- Spouse can work without restriction

**How to calculate your score**: Japan's Ministry of Justice provides an official online calculator.

## Working holiday for under-30s

France, Australia, Canada, and several other countries have working holiday agreements with Japan. Switzerland is not included in this scheme.

**Requirements**:
- Aged 18 to 30 (up to 30 inclusive at the time of application)
- National of a participating country (France, Australia, Canada, UK, Ireland, etc.)
- No dependent family members (spouse or children)
- Never previously obtained a working holiday visa for Japan

**What this visa allows**:
- 1-year stay in Japan
- Work without restriction on the type of employment
- Freedom to change employers
- Study up to 6 months

**What it does not allow**:
- Renewal (one-time use only)
- Working in certain adult entertainment establishments

**Annual quota**: 1,500 places for French nationals, allocated on a first-come, first-served basis. Applications open in January. Apply as early as possible.

## Student visa

If you are coming to study Japanese at a language school or enrol in a Japanese university, the student visa is the natural path.

**What it allows**:
- Stay in Japan for the duration of studies
- Work up to 28 hours per week (separate work permit application required)

**What it does not allow**:
- Signing most lease agreements as the primary tenant (many landlords refuse)
- Easily changing status if you find employment (often requires returning home and reapplying)

For housing, students are typically directed towards university dormitories or share houses, which generally accept student visas.

## Spouse of Japanese national

If you are married to a Japanese citizen, you receive a spouse visa that allows unrestricted work in any company and any sector.

This visa is not tied to an employer and not linked to a specific position. It is renewable as long as the marriage is valid.

## Critical mistakes to avoid

**Arriving on a tourist visa hoping to switch to a work visa from inside Japan**: technically possible in rare specific cases, but the administrative delays (several weeks during which you cannot legally work) make this approach risky. The standard path is obtaining the visa in your home country before departure.

**Changing employer without reporting the change**: the work visa is linked to a specific employer. If you change jobs, you must notify the immigration bureau within 14 days.

**Working beyond authorised hours on a student visa**: the 28h/week limit is enforced. Exceeding it can result in your visa not being renewed.

## Which visa to choose based on your situation

**You have a job offer**: Engineer/Humanities visa (or HSP if you score 70+ points).

**You are under 30 and want to explore Japan**: working holiday. The most flexible entry option.

**You are coming to study**: student visa with work permit.

**You are married to a Japanese national**: spouse visa, the most flexible of all.

Once your visa is obtained, the next step is finding housing. Visa type affects what you can rent: an engineer visa facilitates access to standard apartments, while working holiday or student visa holders are often directed toward share houses.

## Two Additional Options Worth Knowing

**Digital Nomad Visa (2024)**: if you work remotely for a company based outside Japan and earn above approximately 10 million JPY per year, Japan's digital nomad visa allows you to stay for up to 6 months (extendable once). No need to quit your current job. Available to nationals of 50+ countries. See our [complete Japan Digital Nomad Visa guide](/blog/japan-digital-nomad-visa-2026).

**Working Holiday Visa**: for nationals aged 18-30 from eligible countries (France, UK, Australia, Canada, Germany and others), the working holiday visa allows 12 months in Japan with no employer restriction. The most accessible long-stay option for young people. See our [complete Working Holiday Visa guide](/blog/japan-working-holiday-visa-guide-2026).


For health coverage during your transition, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment, activatable before your Japanese national insurance enrolment. To build your Japanese before arriving, [iTalki](https://www.italki.com/affshare?ref=af32660342) offers private lessons with native teachers from $10/hour. *(affiliate links)*
---

*Visa sorted and looking for housing in Tokyo? Book a free consultation to see what is available before your arrival date.*
    `.trim(),
  },
  {
    slug: 'tokyo-rental-traps-foreigners',
    locale: 'en',
    title: '7 Rental Traps to Avoid When Renting in Tokyo as a Foreigner',
    description: 'Hidden key money, exit cost surprises, lease clauses you cannot read: the most expensive mistakes expats make in the Tokyo rental market, and how to avoid them.',
    date: '2026-06-19',
    readingTime: '6 min',
    content: `
Tokyo's rental market is one of the most complex in the world for foreigners. Every year, expats lose tens of thousands of yen through avoidable mistakes. Here are the seven most common traps, with concrete solutions for each.

**Quick answer:** The main rental traps in Tokyo for foreigners: underestimating move-in costs (key money, deposit, agency, guarantor, up to 4 to 6 months), signing a Japanese-language contract without translation, missing the restoration clause, misunderstanding the notice period, and overlooking renewal fees. The fix: get the lease translated and budget every cost before signing.

> **From the field.** The trap I see catch people most is not a scam, it is the move-in bill. They budget the monthly rent, sign, then get hit with four to six months upfront. Ask for the full move-in total in writing before you fall for a place.
## Trap 1: Signing without reading the termination clauses

Most Japanese leases contain an early termination clause (chuto kaiyaku) imposing penalties if you leave before the end of the minimum period. These penalties can represent 1 to 2 months of rent.

**The solution**: before signing, ask explicitly: "What are the costs if I need to leave in 4 months, 6 months, 12 months?" Have this clause translated if the contract is in Japanese.

## Trap 2: Underestimating exit restoration costs

In Japan, tenants are often required to contribute to the cost of restoring the property to its original condition when they leave, even if they have taken good care of the apartment. This system (genjo kaifuku) can result in surprise bills of 50,000 to 200,000 JPY depending on the property size and length of stay.

**What landlords can legally charge**: repainting if you smoked, kitchen cleaning if it is greasy, tatami mat replacement if stained.

**What they cannot legally charge**: normal wall and floor wear, light traces of normal use, lock replacement after your departure.

**The solution**: take detailed photos of every room on move-in day. Report any existing damage or defects in writing to the agency or landlord within the first 3 days.

## Trap 3: Confusing reikin and shikikin

These two terms appear in all Japanese lease contracts, and confusing them is costly.

**Shikikin** (敷金): security deposit. Refundable on exit, minus any restoration costs. Typically 1 to 2 months of rent.

**Reikin** (礼金): literally "thank-you money." Paid to the landlord, non-refundable, with no counterpart. A legacy of post-war Japanese tradition. Represents 1 to 2 months of rent.

**The solution**: prioritise properties without reikin, which are increasingly common especially in furnished rentals targeting foreigners. Potential saving: 100,000 to 300,000 JPY.

## Trap 4: Renting in a strictly managed building without knowing it

Some Japanese residential buildings have very strict internal rules: no visitors after 10pm, no noise after 9pm, rubbish bins only accessible during authorised time windows. These rules are not always mentioned by the agency.

**The solution**: ask for the building regulations (kanri kisoku) before signing. If the agency cannot provide them, that is a warning sign.

## Trap 5: Choosing a property too far from your workplace

Tokyo is enormous. A "mere 40-minute" train journey can become 75 minutes during peak hours once connections and platform waiting time are factored in. Over a year, that is 500 extra hours of commuting.

**The solution**: test the full door-to-door journey during rush hour before committing. Japanese navigation apps (Hyperdia, Navitime) are very accurate on real journey times.

## Trap 6: Not checking phone signal inside the apartment

Thick concrete buildings (very common in Tokyo) can block phone signal inside. Some basement or ground-floor units are complete dead zones.

**The solution**: test your signal inside the apartment during the viewing. Also verify the internet connection available in the building: direct fibre or only VDSL (slower).

## Trap 7: Paying unjustified agency fees

Legally, Japanese agency fees are capped at 1 month of rent including tax. Some unscrupulous agencies add "service fees" or "documentation fees" that accumulate.

Additionally, a recent reform (April 2024) changed the rules: for residential properties, agency fees are now normally the landlord's responsibility, not the tenant's, unless the tenant has explicitly agreed to pay them.

**The solution**: request a detailed written quote before any viewing. Question every line item. Compare across multiple agencies, or work with a property hunter who operates on a fixed fee with no hidden agency commission.

## What a property hunter does to avoid these traps

A hunter's role goes beyond finding properties. It includes reading contracts to identify problematic clauses before signing, negotiating entry conditions, and documenting the property's condition on move-in to protect your deposit on exit.

All seven traps are avoidable with the right preparation and the right support.


For health coverage during your apartment search, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment. To negotiate in Japanese with agencies, [iTalki](https://www.italki.com/affshare?ref=af32660342) offers lessons with native teachers from $10/hour. *(affiliate links)*
---

*See also: [Negotiating Rent in Tokyo: Is It Possible and How to Do It?](/blog/negotiating-rent-tokyo-tips), [Tokyo Rental Contract: 12 Things to Check Before Signing](/blog/tokyo-rental-contract-checklist), [Tokyo Rent by Neighborhood 2026: Expat Price Guide](/blog/tokyo-rent-by-neighborhood-2026), [Rental Application Rejected in Japan: What to Do Next](/blog/rental-application-rejected-japan-foreigner), [Furnished Apartment Tokyo: 5 Best Options for Expats in 2026](/blog/furnished-apartment-tokyo-top-5-expats).*

*Found an apartment in Tokyo and want the contract reviewed before signing? Contact us for a consultation.*
    `.trim(),
  },
  {
    slug: 'tokyo-osaka-kyoto-which-city-to-live',
    locale: 'en',
    title: 'Tokyo, Osaka or Kyoto: Which City Should You Live in as an Expat?',
    description: 'Rent, job market, quality of life, expat community: an honest comparison of Japan\'s three main cities for foreigners deciding where to settle.',
    date: '2026-06-19',
    readingTime: '7 min',
    content: `
The question comes up in every expat group: which Japanese city should I move to? Tokyo, Osaka, and Kyoto each have their advantages and constraints. Here is an honest comparison based on the criteria that actually matter for expats.

**Quick answer:** Tokyo offers the most jobs, international services and energy, but the highest rents. Osaka is more affordable, friendly and well-connected, the best value for money. Kyoto is the calmest and most cultural, but with fewer international jobs. Choose by your job first, then lifestyle.

## Tokyo: the city of opportunity

**Population**: 14 million residents (Greater Tokyo: 37 million)

**Best for**: active professionals, international careers, families with children in international schools, English and French speakers

### Employment and economy
Tokyo concentrates more than 60% of major Japanese and international corporate headquarters. It is the only city in Japan where the English-language job market is developed enough to find roles across a wide range of sectors: finance, tech, consulting, fashion, hospitality, teaching.

For French speakers looking for positions in French or in a Franco-Japanese context, Tokyo is by far the strongest option.

### Rents
The highest in Japan. A 1K apartment in a central area: 80,000 to 130,000 JPY/month. A family 3LDK: 200,000 to 450,000 JPY/month depending on the neighbourhood.

### Expat community
The largest and most diverse. Lycée franco-japonais, consulate, Franco-Japanese associations, French restaurants, foreign supermarkets. You will never be isolated.

### Quality of life
Excellent but intense. Tokyo is a stimulating city that can be exhausting. Green spaces exist but are limited. Transport is impeccable but packed during rush hours.

## Osaka: the best quality-to-cost ratio

**Population**: 2.7 million residents (Greater Osaka: 19 million)

**Best for**: those who want to live in Japan without Tokyo's pressure, food and creative profiles, tighter budgets

### Employment and economy
The English-language job market is significantly less developed than Tokyo. Opportunities exist mainly in tourism, language teaching, food and beverage, and some industrial sectors (Panasonic, Sharp have their headquarters in the region). For work entirely in English or French: options are limited.

### Rents
30 to 40% cheaper than Tokyo for equivalent space. A 1K in central Osaka: 55,000 to 90,000 JPY/month. One of the best value-for-money ratios of any major Asian city.

### Expat community
Much smaller than Tokyo. No French school. The French Consulate General is in Osaka, but services are limited. Active English-speaking community but less structured.

### Quality of life
Osaka is frequently cited as the Japanese city with the best food (takoyaki, okonomiyaki, kushikatsu) and the friendliest, most direct residents. The pace of life is more relaxed than Tokyo. Ideal for those who want to immerse themselves in authentic Japanese culture.

## Kyoto: the atypical choice

**Population**: 1.5 million residents

**Best for**: lovers of traditional Japanese culture, teachers, researchers, independent workers, short to medium stays

### Employment and economy
Very limited job market for English and French speakers outside language teaching and tourism. Some tech startups and universities recruit international profiles, but this is marginal. Kyoto is not a city for conventional corporate careers.

### Rents
Comparable to Osaka, sometimes slightly cheaper in residential neighbourhoods. Traditional properties (machiya wooden townhouses) are a Kyoto speciality available at reasonable prices.

### Expat community
The smallest of the three. Few French-language services. An international community exists through universities (Doshisha, Ritsumeikan, Kyoto University), but is poorly structured for working professionals.

### Quality of life
Exceptional for those who value culture, temples, nature, and a slow pace of life. Not suitable if you need professional dynamism or international services.

## Comparison at a glance

| Criterion | Tokyo | Osaka | Kyoto |
|---|---|---|---|
| English job market | Excellent | Limited | Very limited |
| Central 1K rent | 80-130k JPY | 55-90k JPY | 50-85k JPY |
| French school | Yes (LFJT) | No | No |
| French community | Large | Small | Very small |
| Transport | Excellent | Good | Good |
| Life pace | Intense | Moderate | Slow |

## The question that decides everything

**Your employer or your work determines the city.** If you have a job in Tokyo, live in Tokyo. If your work allows you to be based anywhere, Osaka offers the best quality-of-life-to-cost trade-off. Kyoto is a lifestyle choice, not a professional one.

For families with children: Tokyo is the obvious choice if a French-curriculum school is a priority.


To compare the atmosphere of Tokyo, Osaka and Kyoto for yourself, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) offers guided tours in each city, bookable online. *(affiliate link)*
---

*Decided on Tokyo and looking for housing? Book a free consultation to explore available options.*
    `.trim(),
  },
  {
    slug: 'chercher-appartement-tokyo-depuis-etranger',
    locale: 'fr',
    title: 'Chercher un appartement à Tokyo depuis l\'étranger : guide complet',
    description: 'Comment sécuriser votre logement à Tokyo avant d\'arriver : visites vidéo, signature à distance, délais réalistes et erreurs à éviter.',
    date: '2026-06-19',
    readingTime: '8 min',
    content: `
L'erreur la plus coûteuse des expatriés qui s'installent à Tokyo est d'arriver sans logement sécurisé. L'hôtel ou le logement temporaire pendant la recherche coûte 150 000 à 300 000 JPY supplémentaires pour les 4 à 8 semaines que prend la recherche en moyenne. C'est entièrement évitable.

**Réponse rapide :** On peut sécuriser un logement à Tokyo depuis l'étranger et éviter des semaines d'hôtel. Présélectionnez des options sans garant (share houses, meublés ou monthly mansions), candidatez en ligne avec passeport et visa, et confirmez par visite virtuelle. Notre [guide complet des appartements meublés à Tokyo](/fr/blog/guide-appartements-meubles-tokyo) compare chaque option. Réservez avant d'atterrir, puis réglez carte de résidence et compte bancaire les premiers jours. Vous évitez 150 000 à 300 000 JPY de logement temporaire.

## Pourquoi chercher depuis l'étranger est plus difficile qu'on ne le pense

Le marché locatif tokyoïte est rapide. Les biens listés sur les portails publics (Suumo, Homes, Chintai) sont généralement loués ou en cours de candidature dans les 24 à 72 heures après leur publication. Au moment où vous voyez une annonce depuis l'étranger, la contactez, organisez une visite... le bien est parti.

Le problème plus profond : la plupart des agences immobilières japonaises fonctionnent entièrement en japonais. Elles ne répondent pas aux demandes en anglais ou en français, ne proposent pas de visites vidéo, et exigent des visites en personne avant toute candidature.

Cela crée une impasse pour les étrangers : le marché bouge trop vite pour chercher depuis l'étranger via les canaux normaux.

## Les deux voies viables pour se loger à distance

**Voie 1 : les share houses**

Les opérateurs de share houses acceptent quasi-universellement les candidatures à distance. Le processus est standardisé, accessible en anglais ou en français, et rapide (3 à 7 jours entre la demande et la confirmation). La contrepartie : vous obtenez une chambre dans une propriété partagée plutôt qu'un appartement privé.

C'est la bonne voie si vous devez emménager rapidement, votre budget est inférieur à 80 000 JPY/mois, ou vous arrivez pour moins de 18 mois.

**Voie 2 : un chasseur immobilier local**

Un chasseur fonctionne différemment d'une agence traditionnelle. Il travaille pour vous (pas pour le propriétaire), a accès à des biens non listés publiquement, peut visiter physiquement des propriétés à votre place, envoyer des vidéos, et gérer l'intégralité de la candidature à distance.

C'est la bonne voie si vous avez besoin d'un appartement privé, votre budget est supérieur à 80 000 JPY/mois, ou vous prévoyez un séjour plus long.

## Le processus étape par étape

**Semaine 1 : définir vos critères**

Avant de contacter qui que ce soit, soyez précis sur :
- Budget (loyer mensuel, charges incluses ou non)
- Localisation (en fonction du lieu de travail ou du quartier souhaité)
- Type de bien (share house, studio meublé, 1K, 1LDK)
- Date d'arrivée
- Durée prévue du séjour

**Semaines 1 à 2 : premier contact et présélection**

Pour les share houses : contactez 3 à 5 opérateurs avec vos critères. La plupart répondent en 24 heures. Demandez des photos, des plans et une visite virtuelle.

Pour les appartements avec un chasseur : envoyez vos critères par email. Un bon chasseur répond sous 24 à 48 heures avec une première sélection de biens disponibles.

**Semaines 2 à 3 : visites vidéo**

Pour les share houses : la plupart des opérateurs proposent photos et visites virtuelles directement sur leur site.

Pour les appartements : le chasseur visite en personne et filme une vidéo de chaque bien qui vous intéresse. Une bonne vidéo montre : l'entrée (genkan), toutes les pièces avec dimensions, cuisine, salle de bains, vue depuis les fenêtres, entrée de l'immeuble, station la plus proche et environnement.

Ce qu'il faut observer dans une visite vidéo :
- La lumière naturelle (vers quelle direction donnent les fenêtres ?)
- La hauteur sous plafond (les appartements japonais peuvent être bas)
- Le niveau sonore (demandez à ouvrir les fenêtres pendant la vidéo)
- L'état des murs, du sol et des équipements

**Semaine 3 : candidature et signature**

Une fois le bien confirmé, la candidature démarre :
1. Envoi de vos documents : copie du passeport, copie du visa, justificatif de revenus ou lettre d'employeur
2. Le propriétaire ou la société de garantie examine la candidature (2 à 5 jours)
3. Si acceptée : signature du bail par email ou DocuSign
4. Virement de la caution depuis votre pays d'origine

**Jour de l'arrivée : remise des clés**

Les clés sont généralement remises de trois façons :
- En personne à l'agence ou au bureau du chasseur
- Boîte à clés à l'entrée de la propriété (code envoyé par email)
- Coursier à votre hôtel d'arrivée si vous atterrissez avant l'emménagement

## Ce qu'il faut préparer à l'avance

**Documents à avoir en version numérique :**
- Page biographique du passeport
- Page du visa
- Contrat de travail ou lettre d'engagement
- 3 derniers bulletins de salaire ou relevés bancaires
- Photo d'identité (pour certaines sociétés de garantie)

**Finances :**
- Un moyen de faire un virement international (banque ou Wise)
- Budget pour la caution (généralement 1 à 2 mois de loyer)

## Les erreurs classiques de la recherche à distance

**Choisir uniquement sur les photos :** les photos japonaises sont souvent prises avec un grand-angle qui agrandit visuellement les petites pièces. Demandez toujours les plans avec les dimensions.

**Ne pas confirmer la date exacte d'emménagement :** les fenêtres de disponibilité à Tokyo sont parfois de 2 à 3 semaines. Confirmez que le bien est disponible exactement à votre date d'arrivée.

**Envoyer de l'argent avant d'avoir un bail signé :** ne virez jamais une caution sans avoir un contrat signé en main. Les opérateurs sérieux fournissent toujours le contrat avant de demander le paiement.

**Ne pas se renseigner sur la politique d'annulation :** si votre date d'arrivée change ou si vous devez annuler, quelle est la politique ? Posez la question avant de vous engager.

## Le calendrier qui fonctionne

- **8 semaines avant l'arrivée :** définir les critères, prendre contact avec les opérateurs ou un chasseur
- **6 semaines avant :** présélection de 3 à 5 biens, organisation des visites vidéo
- **4 semaines avant :** confirmation du premier choix, dépôt de candidature
- **2 semaines avant :** signature du bail, virement de la caution
- **Jour J :** remise des clés, emménagement

Ce calendrier vous laisse une marge pour les imprévus (refus de candidature, bien retiré) sans pression de dernière minute.


Pour preparer votre couverture sante avant l'arrivee, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle activable depuis l'etranger. Pour commencer le japonais avant votre installation, [iTalki](https://www.italki.com/affshare?ref=af32660342) propose des cours en ligne avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*
---

*À lire aussi : [Comment trouver un appartement à Tokyo quand on est étranger](/blog/trouver-appartement-tokyo-etranger).*

*Vous vous installez à Tokyo et voulez un logement prêt avant votre arrivée ? Réservez une consultation gratuite pour démarrer la recherche à distance.*
    `.trim(),
  },
  {
    slug: 'garantie-loyer-etranger-japon',
    locale: 'fr',
    title: 'Garantie de loyer au Japon : guide complet pour étrangers',
    description: 'En tant qu\'étranger au Japon, obtenir une garantie de loyer est souvent le plus grand obstacle à la location. Voici comment le contourner en 2026.',
    date: '2026-06-20',
    readingTime: '7 min',
    content: `
La garantie de loyer est l'un des obstacles les plus redoutés par les étrangers qui cherchent un appartement au Japon. Dans le système locatif japonais traditionnel, le propriétaire exige un garant personnel, souvent japonais, qui s'engage à payer à votre place en cas de défaut. Sans réseau local, trouver ce garant est quasiment impossible à votre arrivée. Bonne nouvelle : le marché a évolué, et des solutions concrètes existent.

**Réponse rapide :** Vous n'avez pas besoin d'un garant personnel japonais pour louer au Japon. La plupart des étrangers passent par une société de garantie (hoshou-gaisha), qui coûte 50 à 100% d'un mois de loyer et couvre le propriétaire en cas de défaut. Les options sans garant (share houses, appartements meublés et monthly mansions) évitent totalement cette exigence et acceptent un passeport et un visa.

> **Vu du terrain.** Les propriétaires ne vous rejettent pas vraiment en tant que personne : ils tarifent un risque qu'ils ne savent pas lire (pas d'historique de crédit local, durée de séjour incertaine). Les opérateurs et sociétés de garantie qui acceptent les étrangers ont simplement appris à le lire. Donnez-leur un dossier propre et complet, et l'essentiel du mur tombe.

![Coût d'entrée en mois de loyer, par type de logement à Tokyo](/tokyo-housing-barrier-fr.png "Share house ~1 mois vs location standard ~5 mois plus un garant")
## Le garant personnel (保証人 hoshounin) : l'obstacle historique

Pendant des décennies, tout locataire au Japon devait présenter un hoshounin, littéralement "personne qui garantit". Ce garant devait être japonais, résider au Japon, disposer de revenus suffisants et accepter une responsabilité solidaire sur le loyer.

Pour un expatrié qui vient d'arriver, c'est un cercle vicieux : vous n'avez pas de réseau japonais, donc vous n'avez pas de garant, donc vous ne pouvez pas louer d'appartement classique.

Quelques cas où le garant personnel reste possible :
- **Votre employeur japonais** joue le rôle de garant (courant pour les contrats d'expatriation en entreprise)
- **Un ami japonais** accepte de se porter garant (rare et engagement lourd pour lui)
- **Votre université** facilite l'accès à un garant pour les étudiants étrangers

Dans tous les autres cas, la société de garantie est devenue la norme.


![Comment marche le garant à Tokyo : locataire, société de garantie, bailleur](/tokyo-guarantor-fr.png "La plupart des étrangers passent par une société de garantie")
## La société de garantie (保証会社 hoshougaisha) : la solution moderne

Depuis les années 2010, les sociétés de garantie locative ont transformé le marché. Aujourd'hui, plus de 80 % des propriétaires à Tokyo acceptent une hoshougaisha à la place d'un garant personnel. C'est devenu la solution standard, y compris pour les locataires japonais.

**Comment ça fonctionne :**
La société de garantie vérifie votre dossier (visa, revenus, situation professionnelle) et prend en charge le risque d'impayé pour le propriétaire. En échange, vous payez :
- Un frais d'entrée : généralement 0,5 à 1 mois de loyer
- Un frais de renouvellement annuel : 10 000 à 15 000 JPY par an

**Principales sociétés de garantie acceptant les étrangers :**
- JRFS (Japan Rental Financial Services) : l'une des plus courantes, traitement en anglais possible
- Cosmos Initia : souvent liée aux agences ERA
- Nihon Hosho : répandue sur tout le territoire
- Rent Guarantee : traitement simplifié pour les étrangers

**Le piège à éviter :** certaines hoshougaisha vérifient que votre visa de séjour couvre toute la durée du bail (généralement 2 ans). Si votre carte de résidence expire avant, elles peuvent refuser votre dossier ou exiger un renouvellement en cours de bail. Si c'est votre situation, [renouvelez votre visa avant de signer](/fr/blog/carte-residence-japon-zairyu-card) ou optez pour un bail d'un an.

## Les logements sans garantie

Si vous n'arrivez pas à passer la case "garantie", d'autres types de logements n'en demandent pas :

**Share houses et gaijin houses :** pas de garant, pas de caution élevée, contrat simplifié. Le prix à payer est une chambre privée plutôt qu'un appartement entier. C'est souvent la porte d'entrée idéale pour les primo-arrivants. Notre [guide complet sur les share houses](/fr/blog/share-house-tokyo-guide-complet) vous explique comment choisir.

**Appartements meublés pour étrangers :** des opérateurs spécialisés proposent des logements meublés avec un processus d'entrée simplifié, sans hoshounin ni hoshougaisha. Ces logements sont plus chers au m² mais accessibles dès le premier jour. Voir notre [guide sur les appartements meublés à Tokyo](/fr/blog/appartement-meuble-tokyo-sans-garant).

**Propriétaires expérimentés avec les étrangers :** certains propriétaires ont l'habitude de louer à des étrangers et acceptent les dossiers sans garant avec un processus simplifié. Votre chasseur immobilier peut identifier ces propriétaires dans son réseau.

## Constituer un dossier solide

Même avec une hoshougaisha, votre dossier doit être bien présenté. Préparez :
- Passeport valide
- Carte de résidence (zairyu card) avec date d'expiration visible
- Attestation de travail ou contrat d'emploi (avec niveau de salaire)
- 3 derniers bulletins de salaire ou relevés bancaires
- Coordonnées d'une personne à contacter en urgence (en dehors du Japon est acceptable)

Si vous êtes indépendant ou en phase de démarrage, apporter 3 à 6 mois de relevés bancaires avec des entrées régulières renforce considérablement le dossier.

## Ce que fait un chasseur immobilier

Naviguer le système de garantie en japonais est stressant. Un chasseur immobilier local connaît les hoshougaisha qui traitent le mieux les profils étrangers, sait quelles agences sont souples et peut vous accompagner dans la constitution du dossier. Il peut aussi identifier les propriétaires ouverts aux locataires étrangers dès la recherche.

Pour éviter les [pièges classiques de la location à Tokyo](/fr/blog/pieges-location-tokyo-etranger), avoir un interlocuteur qui parle japonais et connaît les usages locaux fait souvent la différence entre un appartement signé en 2 semaines et une recherche épuisante de 2 mois.


Pour votre couverture sante pendant les demarches de garant, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement. Pour communiquer avec votre garant en japonais, [iTalki](https://www.italki.com/affshare?ref=af32660342) propose des cours avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*
---

*Vous cherchez un appartement à Tokyo et vous bloquez sur la garantie ? Réservez une consultation gratuite : on étudie votre profil et on identifie les meilleurs dossiers pour votre situation.*
    `.trim(),
  },
  {
    slug: 'guarantor-japan-rental-foreigner',
    locale: 'en',
    title: 'Guarantor for Japan Rental: Complete Guide for Foreigners',
    description: 'Getting a guarantor in Japan as a foreigner is often the biggest obstacle to renting. Here\'s everything you need to know to solve it in 2026.',
    date: '2026-06-20',
    readingTime: '7 min',
    content: `
The guarantor requirement is one of the most feared obstacles for foreigners looking for an apartment in Japan. In the traditional Japanese rental system, landlords require a personal guarantor, usually Japanese, who commits to paying rent on your behalf if you default. Without a local network, finding such a person is nearly impossible when you first arrive. The good news: the market has evolved, and concrete solutions exist.

**Quick answer:** You do not need a Japanese personal guarantor to rent in Japan. Most foreigners use a guarantor company (hoshou-gaisha), which charges 50 to 100% of one month's rent and covers the landlord if you default. No-guarantor options (share houses, furnished or monthly mansions) skip the requirement entirely and accept a passport and visa. See our [complete guide to furnished apartments in Tokyo](/en/blog/furnished-apartments-tokyo-guide) for how these work.

> **From the field.** Landlords are not really rejecting you as a person, they are pricing a risk they cannot read: no local credit history, unclear how long you will stay. The operators and guarantee companies that take foreigners have simply learned to read it. Give them a clean, complete file and most of the wall disappears.

![Move-in cost in months of rent, by housing type in Tokyo](/tokyo-housing-barrier-en.png "Share house ~1 month vs a standard lease ~5 months plus a guarantor")
## The personal guarantor (保証人 hoshounin): the historical barrier

For decades, every tenant in Japan had to provide a hoshounin, literally "a person who guarantees." This guarantor had to be Japanese, resident in Japan, have sufficient income, and accept joint liability for the rent.

For an expat just arriving, it's a vicious cycle: no Japanese network means no guarantor, which means no standard apartment.

A personal guarantor may still be possible when:
- **Your Japanese employer** acts as guarantor (common in corporate expat transfers)
- **A Japanese friend** agrees to act as guarantor (rare, and a heavy commitment for them)
- **Your university** facilitates access to a guarantor for international students

In all other cases, the guarantee company has become the standard solution.


![How the guarantor system works in Tokyo: tenant, guarantee company, landlord](/tokyo-guarantor-en.png "Most foreigners use a guarantee company instead of a personal guarantor")
## The guarantee company (保証会社 hoshougaisha): the modern solution

Since the 2010s, rental guarantee companies have transformed the market. Today, over 80% of landlords in Tokyo accept a hoshougaisha instead of a personal guarantor. It's now the standard even for Japanese tenants.

**How it works:**
The guarantee company reviews your file (visa, income, employment) and assumes the risk of non-payment for the landlord. In return, you pay:
- An entry fee: usually 0.5 to 1 month's rent
- An annual renewal fee: 10,000 to 15,000 JPY per year

**Main guarantee companies accepting foreigners:**
- JRFS (Japan Rental Financial Services): one of the most common, English processing available
- Cosmos Initia: often linked to ERA-affiliated agencies
- Nihon Hosho: nationwide coverage
- Rent Guarantee: simplified processing for foreign applicants

**A key pitfall:** some hoshougaisha verify that your residence permit covers the full lease term (typically 2 years). If your zairyu card expires before then, they may decline your application. If this applies to you, [renew your residence card before signing](/en/blog/residence-card-japan-zairyu-card-guide) or opt for a one-year lease.

## Accommodation with no guarantor required

If you can't clear the guarantor hurdle, other types of accommodation don't require one:

**Share houses and gaijin houses:** no guarantor, no large deposit, simplified contract. The trade-off is a private room rather than a full apartment. It's often the ideal entry point for newcomers. Our [complete share house guide](/en/blog/share-house-tokyo-guide-2026) walks you through how to choose.

**Foreigner-friendly furnished apartments:** specialist operators offer furnished apartments with a simplified entry process, no hoshounin, no hoshougaisha. These are more expensive per sqm but accessible from day one. See our [furnished apartment guide](/en/blog/furnished-apartment-tokyo-no-guarantor).

**Landlords experienced with foreigners:** some landlords are used to renting to foreign tenants and accept applications without a guarantor through a simplified process. Your property hunter can identify these landlords through their professional network.

## Building a strong application file

Even with a hoshougaisha, your file needs to be solid. Prepare:
- Valid passport
- Zairyu card (residence card) with visible expiry date
- Employment certificate or work contract (showing salary level)
- Last 3 pay slips or bank statements
- Emergency contact details (outside Japan is usually acceptable)

If you're self-employed or recently started working, providing 3 to 6 months of bank statements with regular income significantly strengthens your application.

## What a property hunter does

Navigating the guarantee system in Japanese is stressful. A local property hunter knows which hoshougaisha handle foreign profiles most smoothly, which agencies are flexible with expats, and can guide you through the full application process. They can also identify landlords open to foreign tenants from the start of the search.

To avoid the [classic traps of renting in Tokyo](/en/blog/tokyo-rental-traps-foreigners), having someone who speaks Japanese and knows local customs often makes the difference between a signed lease in 2 weeks and an exhausting 2-month search.


For health coverage while navigating the guarantor process, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment. To communicate with your guarantor in Japanese, [iTalki](https://www.italki.com/affshare?ref=af32660342) offers lessons with native teachers from $10/hour. *(affiliate links)*
---

*See also: [Furnished Apartment Tokyo: 5 Best Options for Expats in 2026](/blog/furnished-apartment-tokyo-top-5-expats).*

*Looking for an apartment in Tokyo and stuck on the guarantor requirement? Book a free consultation: we'll assess your profile and identify the best-fit properties for your situation.*
    `.trim(),
  },
  {
    slug: 'assurance-habitation-japon-locataire',
    locale: 'fr',
    title: 'Assurance habitation Japon : ce que tout locataire doit savoir',
    description: 'L\'assurance habitation est obligatoire dans presque tous les baux au Japon. Voici comment choisir la bonne assurance en tant qu\'expatrié et combien ça coûte.',
    date: '2026-06-20',
    readingTime: '6 min',
    content: `
Quand vous signez un bail au Japon, vous remarquerez rapidement qu'une clause exige une assurance habitation. Ce n'est pas une suggestion : dans la quasi-totalité des contrats de location japonais, souscrire une assurance incendie (火災保険, kasai hoken) est une condition de signature. Voici tout ce que vous devez savoir pour choisir la bonne couverture et éviter les pièges.

**Réponse rapide :** L'assurance habitation (assurance incendie, kasai hoken) est quasi toujours obligatoire pour signer un bail au Japon. Elle est peu chère, souvent 15 000 à 20 000 JPY pour deux ans, et couvre incendie, dégâts des eaux et responsabilité civile. Vous pouvez généralement choisir votre propre assureur plutôt que celui imposé par l'agence, souvent moins cher.

## Pourquoi l'assurance habitation est obligatoire au Japon

Le Japon est l'un des pays les plus exposés aux risques naturels au monde : tremblements de terre, typhons, inondations, incendies. Dans un pays où les immeubles résidentiels sont souvent mitoyens et denses, un sinistre dans un appartement peut rapidement affecter les voisins.

C'est pour cette raison que les propriétaires et agences immobilières exigent systématiquement une assurance habitation à la signature du bail. L'assurance couvre principalement :

**La responsabilité civile (個人賠償責任 kojin baisho sekinin) :**
Si vous provoquez un dégât des eaux ou un incendie qui se propage à l'appartement du dessus ou du dessous, vous êtes légalement responsable des dommages causés aux voisins. Sans assurance, ce risque pèse intégralement sur votre patrimoine.

**Les dommages à l'appartement (火災 kasai) :**
Les dommages causés par un incendie, même accidentel, à l'appartement que vous louez sont couverts. Attention : ce n'est pas la même chose que l'assurance souscrite par le propriétaire sur l'immeuble.

**Le vol et les effets personnels :**
Les polices standards incluent souvent une couverture basique contre le vol ou la détérioration de vos affaires personnelles.

## Combien coûte l'assurance habitation au Japon

Les prix varient selon la surface du logement, la valeur des biens assurés et les options choisies :

- **Assurance de base (responsabilité civile + incendie) :** 1 000 à 2 000 JPY par mois
- **Assurance étendue (+ vol, dégâts des eaux) :** 1 500 à 3 000 JPY par mois
- **Option tremblement de terre (jishin hoken) :** 500 à 1 500 JPY supplémentaires par mois

La durée de souscription est généralement annuelle ou biennale (alignée sur la durée du bail). L'assurance tremblement de terre est distincte de l'assurance incendie au Japon et doit être souscrite séparément.

**Le piège le plus courant :** l'agence immobilière vous proposera systématiquement sa propre assurance. C'est pratique (tout se règle en même temps), mais le tarif est souvent 30 à 50 % plus élevé qu'une assurance souscrite indépendamment. Vous avez le droit de refuser et de choisir votre propre assureur, tant que la police respecte les minima exigés dans le bail.

## Comment souscrire une assurance habitation en tant qu'étranger

La barrière principale est la langue : la majorité des assureurs japonais ne traitent qu'en japonais.

**Assureurs avec service en anglais :**
- **Chubb Insurance Japan** : couverture internationale, interface en anglais, accepte les expatriés
- **Tokio Marine & Nichido (English service)** : l'un des plus grands assureurs japonais avec un département anglophone
- **Sompo Japan** : dispose d'un service expatriés accessible en anglais
- **AIG Japan** : couverture multinationale avec support en anglais

**Via l'agence immobilière :**
Si vous ne voulez pas gérer la démarche séparément, accepter l'assurance proposée par l'agence est une solution valide. Elle coûte plus cher, mais tout est en ordre dès la signature. Vérifiez que la police couvre bien la responsabilité civile, car c'est la garantie la plus critique pour un locataire.

**Renouvellement :** l'assurance habitation se renouvelle généralement automatiquement. Gardez une trace de la date d'expiration et vérifiez que la couverture est toujours en place si vous renouvelez votre bail ou si vous déménagez.

## L'assurance tremblement de terre : option ou nécessité ?

Au Japon, l'assurance tremblement de terre est distincte et optionnelle dans le contrat d'assurance habitation standard. Elle peut être ajoutée en option sur votre kasai hoken.

Pour décider :
- Si vous vivez dans une zone sismique active (Tokyo, Osaka) : fortement recommandée
- Si vous avez des effets personnels de valeur (bijoux, instruments, matériel professionnel) : utile
- Pour un logement récent (construit après 2000 selon les nouvelles normes antisismiques) : le risque structurel est plus faible, mais les effets personnels restent exposés

Pour aller plus loin sur la vie quotidienne au Japon, notre guide sur [l'assurance maladie pour expatriés](/fr/blog/assurance-maladie-japon-expatrie) couvre l'autre assurance indispensable à souscrire dès votre arrivée.

## Ce qu'il faut vérifier avant de signer votre police

- La police couvre-t-elle la **responsabilité civile envers les tiers** ? (indispensable)
- Quel est le **plafond de couverture** pour la responsabilité civile ? (minimum 100 millions JPY recommandé)
- Les **affaires personnelles** sont-elles incluses ?
- La police est-elle **valide pendant toute la durée du bail** sans interruption en cas de renouvellement automatique ?
- Y a-t-il une **franchise** (jikou baisho) avant remboursement ?


Pour les expatries sans couverture interim, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance sante mensuelle sans engagement, activable des l'arrivee au Japon et avant la signature d'un contrat d'assurance habitation local. *(lien affilie)*
---

*Vous vous installez à Tokyo et vous avez des questions sur les démarches à faire à votre arrivée ? Réservez une consultation gratuite : on vous guide de A à Z pour éviter les erreurs coûteuses.*
    `.trim(),
  },
  {
    slug: 'renters-insurance-japan-guide',
    locale: 'en',
    title: 'Renter\'s Insurance Japan: What Every Expat Tenant Must Know',
    description: 'Renter\'s insurance (kasai hoken) is mandatory in almost every Japanese lease. Here\'s how to choose the right policy as a foreigner and what it costs.',
    date: '2026-06-20',
    readingTime: '6 min',
    content: `
When you sign a lease in Japan, you'll quickly notice a clause requiring renter's insurance. This is not a suggestion: in the vast majority of Japanese rental contracts, taking out fire insurance (火災保険, kasai hoken) is a condition of signing. Here's everything you need to know to choose the right coverage and avoid the common traps.

**Quick answer:** Renter's (fire) insurance, kasai hoken, is almost always mandatory to sign a lease in Japan. It is cheap, often 15,000 to 20,000 JPY for two years, and covers fire, water damage and personal liability. You can usually pick your own insurer instead of the agency's default, which is often cheaper.

## Why renter's insurance is mandatory in Japan

Japan is one of the most exposed countries in the world to natural disasters: earthquakes, typhoons, floods, and fires. In a country where residential buildings are often dense and interconnected, a single incident in one apartment can quickly affect neighbors on other floors.

This is why landlords and real estate agencies systematically require renter's insurance at lease signing. Coverage typically includes:

**Third-party liability (個人賠償責任 kojin baisho sekinin):**
If you cause water damage or a fire that spreads to the apartment above or below you, you are legally responsible for the damage to your neighbors. Without insurance, this risk falls entirely on you personally.

**Damage to the apartment (火災 kasai):**
Damage to the rental unit caused by fire, even accidental, is covered. Note: this is separate from the insurance the landlord holds on the building itself.

**Theft and personal belongings:**
Standard policies usually include basic coverage against theft or damage to your personal possessions.

## How much does renter's insurance cost in Japan

Prices vary depending on the size of the unit, the value of insured items, and chosen options:

- **Basic insurance (liability + fire):** 1,000 to 2,000 JPY per month
- **Extended coverage (+ theft, water damage):** 1,500 to 3,000 JPY per month
- **Earthquake insurance option (jishin hoken):** an additional 500 to 1,500 JPY per month

The standard subscription period is annual or biannual (aligned with the lease term). Earthquake insurance is separate from fire insurance in Japan and must be taken out as an add-on.

**The most common trap:** your real estate agency will systematically offer their own insurance. It's convenient (everything handled at signing), but the premium is often 30 to 50% higher than a policy taken out independently. You have the right to decline and choose your own insurer, as long as the policy meets the minimum requirements specified in the lease.

## How to get renter's insurance as a foreigner

The main barrier is language: the majority of Japanese insurers operate exclusively in Japanese.

**Insurers with English service:**
- **Chubb Insurance Japan:** international coverage, English interface, accepts expats
- **Tokio Marine & Nichido (English service):** one of Japan's largest insurers with an English-speaking department
- **Sompo Japan:** has an expat department accessible in English
- **AIG Japan:** multinational coverage with English support

**Through the real estate agency:**
If you don't want to handle the process separately, accepting the agency's insurance is a valid option. It costs more, but everything is in order from signing day. Just verify that the policy covers third-party liability, that's the most critical coverage for a tenant.

**Renewal:** renter's insurance typically auto-renews. Keep track of the expiry date and verify coverage remains in place if you renew your lease or move.

## Earthquake insurance: option or necessity?

In Japan, earthquake insurance is separate and optional within a standard kasai hoken policy. It can be added as a rider.

To decide:
- If you live in an active seismic zone (Tokyo, Osaka): strongly recommended
- If you have high-value personal items (jewelry, instruments, professional equipment): worthwhile
- For a newer building (built after 2000 under updated earthquake resistance standards): structural risk is lower, but personal belongings remain exposed

For a broader picture of life in Japan as an expat, our guide on [health insurance for expats in Japan](/en/blog/japan-health-insurance-expat-guide) covers the other essential insurance to sort out on arrival.

## What to verify before signing your policy

- Does the policy cover **third-party liability**? (essential)
- What is the **liability coverage limit**? (minimum 100 million JPY recommended)
- Are **personal belongings** included?
- Is the policy valid for the **full lease term** without gaps if auto-renewed?
- Is there a **deductible (jikou baisho)** before reimbursement kicks in?


For expats without interim health coverage, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment, activatable from day one in Japan and before signing a local renters insurance contract. *(affiliate link)*
---

*Setting up in Tokyo and need guidance on the paperwork required on arrival? Book a free consultation, we walk you through every step so you don't make costly mistakes.*
    `.trim(),
  },
  {
    slug: 'logement-etudiant-tokyo-guide',
    locale: 'fr',
    title: 'Logement étudiant à Tokyo : guide complet pour francophones',
    description: 'Trouver un logement étudiant à Tokyo en tant que francophone : dortoirs universitaires, share houses, appartements meublés et aides financières disponibles.',
    date: '2026-06-20',
    readingTime: '8 min',
    content: `
Tokyo attire chaque année des milliers d'étudiants étrangers, notamment des francophones venus de France, de Belgique, du Canada ou de Suisse pour des échanges universitaires, des masters ou des programmes de langue. Trouver un logement satisfaisant dans une ville aussi dense peut sembler intimidant. Ce guide couvre toutes les options disponibles en 2026, avec les budgets réels et les calendriers à respecter.

**Réponse rapide :** Pour un étudiant francophone à Tokyo, l'option la moins chère est la résidence universitaire (学生寮) à 30 000-60 000 JPY/mois tout compris, mais les places sont limitées et à demander tôt. Un share house (45 000-90 000 JPY/mois, sans garant) offre flexibilité et vie sociale immédiate. Les appartements meublés conviennent pour plus d'intimité. Réservez idéalement 2 à 3 mois avant la rentrée.

## Les résidences universitaires (学生寮 gakusei ryou)

C'est l'option la moins chère, et souvent la plus demandée. Les universités japonaises proposent des résidences internes ou partenaires pour leurs étudiants étrangers.

**Avantages :**
- Prix compétitifs : 30 000 à 60 000 JPY par mois tout compris (chambre, charges, internet)
- Emplacement souvent proche du campus
- Réseau social immédiat avec d'autres étudiants internationaux et japonais
- Processus géré en grande partie par l'université

**Inconvénients :**
- Places limitées et fortement compétitives, ce n'est pas garanti même si vous êtes accepté à l'université
- Règles de vie strictes (couvre-feu, règles sur les visiteurs, horaires de cuisine)
- Durée maximale souvent limitée à 1 an

**Comment postuler :** la demande passe par le bureau des relations internationales (kokusai kouryuu) de votre université japonaise. Faites-le en même temps que votre candidature d'admission, soit 4 à 6 mois avant votre arrivée. La compétition est forte, notamment dans les grandes universités de Tokyo (Todai, Waseda, Keio, TUJ).

## Les share houses pour étudiants

Si la résidence universitaire n'est pas disponible ou ne correspond pas à ce que vous cherchez, les share houses sont l'option la plus populaire parmi les étudiants étrangers à Tokyo.

**Prix typiques :**
- Chambre privée dans un share house standard : 40 000 à 65 000 JPY par mois
- Chambre dans un share house design / premium : 70 000 à 90 000 JPY par mois
- Charges et internet généralement inclus

**Ce qu'il faut comparer entre opérateurs :**
- Proximité de votre école (accès direct sans correspondance)
- Présence d'autres étudiants internationaux dans la maison
- Durée minimum de séjour (1 mois, 3 mois ou un semestre selon l'opérateur)
- Interface en anglais pour la réservation et la communication

**Durée minimale :** généralement 1 à 3 mois selon l'opérateur. Pratique pour un semestre d'échange ou une année universitaire complète.

Notre [guide complet sur les share houses à Tokyo](/fr/blog/share-house-tokyo-guide-complet) vous aide à comprendre ce qu'il faut vérifier avant de réserver.

## L'appartement meublé indépendant

Pour les étudiants qui préfèrent vivre seuls ou avec un partenaire, les appartements meublés à Tokyo sont une option plus onéreuse mais qui offre une vraie indépendance.

**Budget à prévoir :**
- Studio meublé dans un quartier étudiant (Bunkyo, Koenji, Nakano) : 65 000 à 90 000 JPY par mois hors charges
- Studio meublé dans le centre (Shinjuku, Shibuya) : 90 000 à 130 000 JPY par mois
- Dépôt initial (sans reikin) : généralement 1 à 2 mois de caution + 0,5 mois de garantie

Sans garant japonais, un [appartement meublé spécialisé étrangers](/fr/blog/appartement-meuble-tokyo-sans-garant) est souvent la meilleure voie : le gestionnaire connaît les spécificités des profils étudiants et peut traiter votre dossier même sans historique de crédit japonais.

## Quartiers étudiants à Tokyo

Le choix du quartier dépend de votre université, mais voici les zones les plus prisées pour les étudiants :

**Bunkyo-ku (文京区)** : quartier universitaire par excellence. Abrite l'Université de Tokyo (Todai), Tokyo University of Science et plusieurs autres. Calme, bien connecté, nombreux logements étudiants.

**Shinjuku-ku (新宿区)** : central, nombreuses lignes de métro, proche de Waseda University et du campus de Yotsuya de Sophia University. Plus animé, légèrement plus cher.

**Koenji / Nakano (高円寺・中野)** : populaires parmi les étudiants pour le bon rapport qualité-prix. Bien desservi par la Chuo Line. Ambiance alternative et artistique.

**Eviter :** Minato, Shibuya et Roppongi pour un budget étudiant. Le loyer est 30 à 50 % plus élevé pour une qualité de vie similaire.

## Aides financières disponibles

Les étudiants étrangers au Japon peuvent accéder à plusieurs sources de financement :

**JASSO (Japan Student Services Organization) :** bourse mensuelle de 48 000 à 117 000 JPY selon les critères. Candidature via votre université japonaise après l'arrivée.

**Bourses MEXT :** programme de bourses du gouvernement japonais, très compétitif, couvre les frais de scolarité, le logement et une allocation mensuelle. À demander avant l'arrivée via l'ambassade du Japon dans votre pays.

**Bourses de l'ambassade du Japon :** programme pour les courts séjours (stage de langue, semestre d'échange). Renseignez-vous auprès de l'ambassade du Japon en France ou en Belgique.

**Aides institutionnelles :** votre université d'origine peut avoir des accords de coopération qui incluent une aide au logement. À vérifier auprès du bureau des relations internationales de votre établissement.

## Calendrier et délais à respecter

La gestion du temps est cruciale pour le logement étudiant à Tokyo :

- **6 mois avant :** demander la résidence universitaire via votre université japonaise
- **3 mois avant :** si résidence universitaire non confirmée, commencer à chercher un share house ou un appartement meublé
- **1 à 2 mois avant :** réserver votre logement, préparer les documents requis (lettre d'admission, preuve de visa étudiant)
- **À l'arrivée :** activation du contrat, remise des clés, enregistrement à la mairie (obligatoire dans les 14 jours)

Commencer tôt est important. Les meilleures chambres dans les share houses prisés partent plusieurs semaines à l'avance, notamment pour les rentrées de septembre et d'avril.


Pour votre couverture sante pendant vos etudes au Japon, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement, populaire aupres des etudiants en attente de l'assurance nationale. Pour progresser en japonais, [iTalki](https://www.italki.com/affshare?ref=af32660342) propose des cours avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*
---

*À lire aussi : [Logement étudiant à Tokyo : share house, dortoir ou appart ? (2026)](/blog/logement-etudiant-tokyo-2026), [Logement étudiant à Tokyo pour octobre : share house ou dortoir ?](/blog/logement-etudiant-tokyo-octobre).*

*Vous préparez un séjour d'études à Tokyo et vous cherchez un logement accessible dès votre arrivée ? Contactez-nous pour une consultation gratuite et on vous aide à trouver la bonne option selon votre budget et votre visa.*
    `.trim(),
  },
  {
    slug: 'student-housing-tokyo-guide',
    locale: 'en',
    title: 'Student Housing Tokyo 2026: Complete Guide for International Students',
    description: 'Finding student housing in Tokyo as an international student: university dorms, share houses, furnished apartments, and financial aid options explained for 2026.',
    date: '2026-06-20',
    readingTime: '8 min',
    content: `
Tokyo attracts thousands of international students each year for university exchanges, master's programs, or language courses. Finding the right housing in one of the world's most densely populated cities can feel overwhelming. This guide covers every realistic option available in 2026, with real budgets and the timelines you need to respect.

**Quick answer:** International students in Tokyo have three main housing options: university dormitories (cheapest, limited spots, apply early), share houses (40,000 to 80,000 JPY, no guarantor, social), and student residences. Most accept online applications from abroad with a passport and student visa. Apply 2 to 3 months before your term starts.

## University dormitories (学生寮 gakusei ryou)

This is the least expensive option, and the most competitive. Japanese universities offer internal or partner dormitories for their international students.

**Advantages:**
- Competitive pricing: 30,000 to 60,000 JPY per month all-inclusive (room, utilities, internet)
- Often located near campus
- Immediate social network with other international and Japanese students
- Process largely managed by the university

**Disadvantages:**
- Limited spots and highly competitive, not guaranteed even after university acceptance
- Strict house rules (curfews, visitor policies, kitchen hours)
- Maximum stay often limited to one year

**How to apply:** applications go through the international office (kokusai kouryuu) of your Japanese university. Submit it at the same time as your admission application, 4 to 6 months before arrival. Competition is intense at top Tokyo universities (Todai, Waseda, Keio, TUJ, Sophia).

## Share houses for students

If university housing is unavailable or doesn't suit your needs, share houses are the most popular option among international students in Tokyo.

**Typical prices:**
- Private room in a standard share house: 40,000 to 65,000 JPY per month
- Room in a design/premium share house: 70,000 to 90,000 JPY per month
- Utilities and internet generally included

**What to compare between operators:**
- Proximity to your school (direct access without transfers)
- Mix of international and local residents in the house
- Minimum stay duration (1 month, 3 months, or a semester depending on the operator)
- English interface for booking and communication

**Minimum stay:** typically 1 to 3 months depending on the operator, practical for a semester abroad or a full academic year.

Our [complete share house guide for Tokyo](/en/blog/share-house-tokyo-guide-2026) helps you understand what to check before booking.

## Independent furnished apartments

For students who prefer living alone or with a partner, furnished apartments in Tokyo offer genuine independence at a higher cost.

**Budget to plan for:**
- Furnished studio in a student neighborhood (Bunkyo, Koenji, Nakano): 65,000 to 90,000 JPY per month excluding utilities
- Furnished studio in central Tokyo (Shinjuku, Shibuya): 90,000 to 130,000 JPY per month
- Move-in costs (no reikin): typically 1 to 2 months security deposit + 0.5 month guarantee fee

Without a Japanese guarantor, a [foreigner-friendly furnished apartment](/en/blog/furnished-apartment-tokyo-no-guarantor) is often the best path: the manager understands international student profiles and can process your file even without a Japanese credit history.

## Best student neighborhoods in Tokyo

The right neighborhood depends on your university, but here are the most popular areas for students:

**Bunkyo-ku (文京区):** the quintessential university district. Home to the University of Tokyo (Todai), Tokyo University of Science, and others. Quiet, well-connected, many student housing options.

**Shinjuku-ku (新宿区):** central, multiple subway lines, close to Waseda University and Sophia University's Yotsuya campus. More lively, slightly pricier.

**Koenji / Nakano (高円寺・中野):** popular among students for good value for money. Well-served by the Chuo Line. Alternative, artistic atmosphere.

**Avoid for a student budget:** Minato, Shibuya, and Roppongi. Rent is 30 to 50% higher for similar living quality.

## Financial aid available for international students

International students in Japan can access several funding sources:

**JASSO (Japan Student Services Organization):** monthly scholarship of 48,000 to 117,000 JPY depending on criteria. Apply through your Japanese university after arrival.

**MEXT Scholarships:** Japanese government scholarship program, very competitive, covers tuition, housing, and a monthly stipend. Apply before arrival through the Japanese embassy in your country.

**Japanese Embassy Scholarships:** program for short stays (language study, semester abroad). Check with the Japanese embassy or consulate in your home country.

**Institutional support:** your home university may have cooperation agreements that include housing assistance. Check with your international office.

## Timeline and deadlines to respect

Time management is critical for student housing in Tokyo:

- **6 months out:** apply for university dormitory through your Japanese university
- **3 months out:** if dorm not confirmed, start searching for a share house or furnished apartment
- **1 to 2 months out:** book your housing, prepare required documents (admission letter, proof of student visa)
- **On arrival:** activate contract, collect keys, register at the local city hall (required within 14 days of arrival)

Starting early matters. The best rooms in popular share houses go weeks in advance, especially for September and April intakes.


For health coverage during your studies in Japan, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment, popular among students before enrolling in national insurance. To improve your Japanese, [iTalki](https://www.italki.com/affshare?ref=af32660342) offers lessons with native teachers from $10/hour. *(affiliate links)*
---

*See also: [Student Housing in Tokyo: Share House vs University Dorm (2026 Guide)](/blog/student-housing-tokyo-guide-2026), [Student Housing in Tokyo for October Intake: Share House vs University Dorm](/blog/student-housing-tokyo-october).*

*Preparing a study stay in Tokyo and need housing sorted before you arrive? Get in touch for a free consultation, we'll help you find the right option for your budget and visa type.*
    `.trim(),
  },
  {
    slug: 'checklist-bail-tokyo',
    locale: 'fr',
    title: 'Checklist bail Tokyo : 12 points à vérifier avant de signer',
    description: 'Avant de signer votre bail à Tokyo, vérifiez ces 12 points essentiels pour éviter les mauvaises surprises : montant total, clauses cachées et état des lieux.',
    date: '2026-06-20',
    readingTime: '7 min',
    content: `
Signer un bail à Tokyo en tant qu'étranger comporte des risques concrets si vous ne savez pas lire un contrat en japonais. Les mauvaises surprises les plus fréquentes, frais cachés, clause de remise en état abusive, préavis mal compris, peuvent vous coûter plusieurs centaines de milliers de yens à la sortie. Cette checklist couvre les 12 points à vérifier impérativement avant de signer.

**Réponse rapide :** Avant de signer un bail à Tokyo, vérifiez les 12 points clés : loyer et charges réels, argent-clé (reikin) et caution (shikikin), frais d'agence et de garant, clause de remise en état, préavis de départ, frais de renouvellement et règlement de l'immeuble. Faites traduire toute clause que vous ne comprenez pas : une mauvaise surprise peut coûter des centaines de milliers de yens.


![Comment marche le garant à Tokyo : locataire, société de garantie, bailleur](/tokyo-guarantor-fr.png "La plupart des étrangers passent par une société de garantie")
## 1. Le montant total des frais d'entrée

La première chose à calculer est le coût total d'entrée, pas seulement le loyer mensuel. Au Japon, la première mise de fonds comprend généralement :

- **Shikikin (敷金) :** caution remboursable, généralement 1 à 2 mois de loyer
- **Reikin (礼金) :** "clé de mains" non remboursable, 0 à 2 mois de loyer (parfois négociable)
- **Frais d'agence :** 1 mois de loyer + taxes (légalement plafonné à 1 mois TTC)
- **Frais de société de garantie :** 0,5 à 1 mois de loyer à l'entrée
- **Assurance habitation :** 1ère année payable à l'avance
- **Premier mois de loyer** (parfois au prorata)

**En pratique :** prévoyez 4 à 6 fois le loyer mensuel pour la mise de fonds initiale. Sur un appartement à 80 000 JPY/mois, cela représente 320 000 à 480 000 JPY à débloquer avant d'entrer.

Lisez également notre guide sur la [recherche d'appartement à Tokyo depuis l'étranger](/fr/blog/chercher-appartement-tokyo-depuis-etranger) pour anticiper les démarches avant même d'arriver au Japon.

## 2. La durée du bail et les conditions de renouvellement

Le bail standard au Japon dure 2 ans (普通借家契約, futsuu shakka keiyaku). À l'échéance, il peut être renouvelé pour 2 ans supplémentaires, parfois avec des frais de renouvellement (koushin ryou) de 0,5 à 1 mois de loyer.

Vérifiez :
- La date de début et la date de fin du bail
- Le montant des frais de renouvellement
- Si c'est un bail à durée fixe (定期借家契約, teiki shakka keiyaku), dans ce cas, pas de renouvellement automatique, le propriétaire peut refuser de prolonger

## 3. Le préavis en cas de résiliation

En cas de départ avant la fin du bail, le préavis standard est de 1 mois, mais certains contrats exigent 2 mois. Vérifiez également s'il y a une clause de pénalité pour résiliation anticipée (par exemple, obligation de payer 2 mois de loyer si vous partez dans les 6 premiers mois).

## 4. La clause de remise en état (原状回復 genjou kaifuku)

C'est la clause qui cause le plus de litiges entre locataires et propriétaires au Japon. Le principe légal est que le locataire n'est responsable que des dommages qu'il a causés, pas de l'usure normale. En pratique, certains propriétaires tentent de facturer des travaux qui relèvent de l'entretien normal.

Vérifiez explicitement :
- Qui paye le nettoyage final ? (souvent facturé au locataire même si c'est discutable)
- Qui paye le remplacement des tatamis ou fusuma abîmés par usure normale ?
- Y a-t-il une clause de peinture systématique à la charge du locataire ?

Les directives du Ministère du Territoire (国土交通省) sont claires : l'usure normale est à la charge du propriétaire. Un bail qui dévie fortement de ces directives est sujet à négociation.

## 5. Les règles sur les animaux de compagnie

La majorité des appartements à Tokyo est classée "禁止 (kinshi)" pour les animaux. Vérifiez explicitement si les animaux sont autorisés, et si oui, lesquels. En cas de doute, demandez une confirmation écrite, un accord verbal ne protège pas en cas de litige.

## 6. L'état des lieux d'entrée (入居前確認 nyuukyomae kakunin)

Avant de déménager vos affaires, effectuez un état des lieux complet avec l'agence ou le propriétaire. Photographiez systématiquement :
- Toutes les rayures, marques et trous préexistants sur les murs
- L'état du sol, de la cuisine, de la salle de bain
- Tous les équipements fournis (réfrigérateur, AC, etc.) et leur état de fonctionnement

Envoyez les photos par email à l'agence le jour même pour créer une preuve datée. C'est votre protection si le propriétaire tente de vous imputer ces dommages à la sortie.

## 7. La connexion internet

Internet n'est pas inclus par défaut dans la plupart des baux japonais. Vérifiez :
- L'immeuble est-il câblé en fibre optique (hikari) ?
- Faut-il contacter un fournisseur séparément, et si oui, quel est le délai d'installation ? (parfois 4 à 6 semaines)
- Y a-t-il un réseau Wi-Fi partagé dans le bâtiment (courant dans les share houses, rare dans les appartements)

## 8. Le système de chauffage et de climatisation

Vérifiez que chaque pièce dispose d'un climatiseur réversible (reikon). Au Japon, les appareils de climatisation sont généralement fixés et laissés par le locataire précédent ou fournis par le propriétaire. Demandez :
- Y a-t-il un AC dans toutes les pièces principales ?
- Quel est l'état des filtres et la date du dernier entretien ?
- Y a-t-il un chauffe-eau (gas ou électrique) et est-il fonctionnel ?

## 9. La place de stationnement

Le stationnement à Tokyo est presque toujours payant et séparé du loyer. Si vous avez un vélo, vérifiez l'existence d'un local vélo (jitenshashoki) dans l'immeuble. Pour une voiture, le stationnement mensuel est généralement de 15 000 à 30 000 JPY dans Tokyo intramuros.

## 10. Les charges locatives (管理費 kanrihi)

En plus du loyer, la plupart des appartements facturent des charges mensuelles (kanrihi) de 3 000 à 15 000 JPY pour l'entretien des parties communes, les poubelles, l'ascenseur. Ces charges sont généralement indiquées séparément dans l'annonce. Vérifiez qu'elles sont bien incluses dans votre calcul de coût mensuel total.

## 11. L'orientation du logement

Au Japon, l'exposition est cruciale pour le confort thermique et la facture d'énergie. Un appartement exposé sud (南向き minamiuki) est beaucoup plus convoité et coûteux. Un appartement exposé nord sera froid en hiver et humide. Si vous visitez en journée, observez l'entrée de la lumière naturelle à différentes heures.

## 12. La procédure en cas de problème de maintenance

Qui contacter en cas de panne (chauffe-eau, fuite d'eau, panne de serrure) ? Est-ce le propriétaire, l'agence, ou une société de gestion tierce ? Y a-t-il une ligne d'urgence 24h/24 ?

Les problèmes de maintenance non résolus sont l'une des principales sources de friction entre locataires étrangers et propriétaires. Avoir les contacts et la procédure clairement établis dès la signature évite des situations de blocage.

Pour aller plus loin, notre guide sur les [pièges classiques de la location à Tokyo](/fr/blog/pieges-location-tokyo-etranger) couvre les erreurs les plus coûteuses que font les expatriés.


Pour votre couverture sante pendant la signature du bail, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement. Pour comprendre votre contrat en japonais, [iTalki](https://www.italki.com/affshare?ref=af32660342) propose des cours avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*
---

*Vous êtes sur le point de signer un bail à Tokyo et vous voulez être sûr que tout est en ordre ? Réservez une consultation : on revoit les documents avec vous et on identifie les clauses à négocier.*
    `.trim(),
  },
  {
    slug: 'tokyo-rental-contract-checklist',
    locale: 'en',
    title: 'Tokyo Rental Contract: 12 Things to Check Before Signing',
    description: 'Before signing your Tokyo rental contract, verify these 12 essential points to avoid surprises: total move-in cost, hidden clauses, and the move-in inspection.',
    date: '2026-06-20',
    readingTime: '7 min',
    content: `
Signing a lease in Tokyo as a foreigner carries real risks if you can't read a contract in Japanese. The most common bad surprises, hidden fees, an aggressive restoration clause, a misunderstood notice period, can cost you hundreds of thousands of yen when you move out. This checklist covers the 12 points you must verify before signing.

**Quick answer:** Before signing a lease in Tokyo, verify 12 key points: real rent and fees, key money (reikin) and deposit (shikikin), agency and guarantor fees, the restoration clause, the notice period, renewal fees, and the building rules. Get any clause you do not understand translated: a bad surprise can cost hundreds of thousands of yen.


![How the guarantor system works in Tokyo: tenant, guarantee company, landlord](/tokyo-guarantor-en.png "Most foreigners use a guarantee company instead of a personal guarantor")
## 1. Total move-in costs

The first thing to calculate is the total upfront cost, not just the monthly rent. In Japan, the initial outlay typically includes:

- **Shikikin (敷金):** refundable security deposit, usually 1 to 2 months' rent
- **Reikin (礼金):** non-refundable "key money," 0 to 2 months' rent (sometimes negotiable)
- **Agency fee:** 1 month's rent + tax (legally capped at 1 month inclusive)
- **Guarantee company fee:** 0.5 to 1 month's rent upfront
- **Renter's insurance:** first year payable in advance
- **First month's rent** (sometimes prorated)

**In practice:** budget 4 to 6 times the monthly rent for the initial outlay. On an 80,000 JPY/month apartment, that's 320,000 to 480,000 JPY before you even get the keys.

Also read our guide on [searching for an apartment in Tokyo from abroad](/en/blog/tokyo-apartment-hunting-from-abroad) to understand how to get ahead of the process before arriving.

## 2. Lease term and renewal conditions

The standard Japanese lease runs 2 years (普通借家契約 futsuu shakka keiyaku). At expiry, it can be renewed for another 2 years, sometimes with a renewal fee (koushin ryou) of 0.5 to 1 month's rent.

Verify:
- Start and end date of the lease
- Renewal fee amount
- Whether it's a fixed-term lease (定期借家契約 teiki shakka keiyaku), in this case, no automatic renewal, and the landlord may refuse to extend

## 3. Notice period if you leave early

The standard notice period if you leave before the lease ends is 1 month, but some contracts require 2. Also check whether there's an early termination penalty (e.g., required to pay 2 months' rent if you leave within the first 6 months).

## 4. Restoration clause (原状回復 genjou kaifuku)

This is the clause that causes the most disputes between tenants and landlords in Japan. The legal principle is that tenants are only responsible for damage they caused, not for normal wear and tear. In practice, some landlords try to charge for work that falls under normal maintenance.

Explicitly verify:
- Who pays for the final cleaning? (often billed to the tenant even when debatable)
- Who pays for tatami or fusuma replacement due to normal wear?
- Is there a clause requiring tenants to repaint walls at their own expense?

The Ministry of Land, Infrastructure and Transport guidelines are clear: normal wear and tear is the landlord's responsibility. A lease that deviates significantly from these guidelines is open to negotiation.

## 5. Pet policy

The majority of apartments in Tokyo are classified as "禁止 (kinshi)" for pets. Explicitly verify whether pets are allowed, and if so, which types. If in doubt, request written confirmation, a verbal agreement provides no protection in a dispute.

## 6. Move-in inspection (入居前確認 nyuukyomae kakunin)

Before moving in your belongings, conduct a thorough inspection with the agency or landlord. Systematically photograph:
- All pre-existing scratches, marks, and holes on walls
- The condition of floors, kitchen, and bathroom
- All provided appliances (refrigerator, AC, etc.) and their working condition

Email the photos to the agency on the same day to create dated proof. This is your protection if the landlord tries to charge you for these damages on move-out.

## 7. Internet connection

Internet is not included by default in most Japanese leases. Verify:
- Is the building wired for fiber optic (hikari)?
- Do you need to contact a provider separately, and if so, what's the installation lead time? (sometimes 4 to 6 weeks)
- Is there shared Wi-Fi in the building? (common in share houses, rare in standard apartments)

## 8. Heating and air conditioning

Verify that each main room has a reversible air conditioner (reikon). In Japan, AC units are typically fixed to the wall and left by the previous tenant or provided by the landlord. Ask:
- Is there an AC unit in all main rooms?
- What's the condition of the filters and when was the last service?
- Is there a water heater (gas or electric) and is it functioning?

## 9. Parking

Parking in Tokyo is almost always paid and separate from rent. If you have a bicycle, check whether there's a bike storage area (jitenshashoki) in the building. For a car, monthly parking in central Tokyo typically runs 15,000 to 30,000 JPY.

## 10. Management fees (管理費 kanrihi)

In addition to rent, most apartments charge monthly management fees (kanrihi) of 3,000 to 15,000 JPY for common area maintenance, garbage, and elevator upkeep. These fees are usually listed separately in listings. Make sure they're factored into your total monthly cost calculation.

## 11. Apartment orientation

In Japan, exposure is critical for thermal comfort and energy costs. A south-facing apartment (南向き minamiuki) is much more desirable and expensive. A north-facing apartment will be cold in winter and prone to humidity. If you visit during the day, observe natural light at different times of day.

## 12. Maintenance and emergency procedure

Who do you contact in case of a breakdown (water heater, water leak, broken lock)? Is it the landlord, the agency, or a third-party management company? Is there a 24/7 emergency line?

Unresolved maintenance issues are one of the main friction points between foreign tenants and landlords. Having contacts and procedures clearly established from signing day prevents frustrating standoffs.

For more, our guide on [classic traps to avoid when renting in Tokyo](/en/blog/tokyo-rental-traps-foreigners) covers the most costly mistakes expats make.


For health coverage when signing your lease, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment. To understand your contract in Japanese, [iTalki](https://www.italki.com/affshare?ref=af32660342) offers lessons with native teachers from $10/hour. *(affiliate links)*
---

*See also: [Negotiating Rent in Tokyo: Is It Possible and How to Do It?](/blog/negotiating-rent-tokyo-tips), [Tokyo Rent by Neighborhood 2026: Expat Price Guide](/blog/tokyo-rent-by-neighborhood-2026).*

*About to sign a lease in Tokyo and want to make sure everything is in order? Book a consultation: we review the documents with you and identify what to negotiate.*
    `.trim(),
  },
  {
    slug: 'gaijin-house-vs-share-house-difference',
    locale: 'fr',
    title: 'Gaijin house vs share house à Tokyo : quelle est la différence ?',
    description: 'Gaijin house et share house sont souvent confondus, mais ce n\'est pas la même chose. Voici la vraie différence et lequel convient à votre situation.',
    date: '2026-06-19',
    readingTime: '5 min',
    content: `
Si vous avez cherché un logement de courte durée à Tokyo en tant qu'étranger, vous avez probablement vu les termes "gaijin house" et "share house" utilisés parfois pour le même type de bien. Ils sont liés mais pas identiques. Comprendre la différence vous aide à trouver la bonne option pour votre situation.

**Réponse rapide :** Gaijin houses et share houses ont largement fusionné : les deux offrent des chambres privées meublées avec espaces communs, sans garant ni argent-clé. Historiquement, une gaijin house désignait un logement partagé pour étrangers, tandis que share house est le terme moderne plus large utilisé dans tout le Japon. Pour un nouvel arrivant, les deux sont la voie la plus rapide et économique vers Tokyo.

## Qu'est-ce qu'une gaijin house ?

"Gaijin" (外人) est un terme japonais pour désigner un étranger, avec une connotation informelle et parfois légèrement péjorative selon le contexte. Une "gaijin house" est un terme familier, pas une catégorie officielle de logement. Il désigne tout hébergement partagé qui cible spécifiquement les résidents étrangers au Japon.

Historiquement, les gaijin houses sont apparues dans les années 1980 et 1990 comme une réponse à la difficulté extrême rencontrée par les étrangers pour louer des appartements classiques. Ce sont souvent des immeubles anciens, peu rénovés, avec des équipements communs et très peu de conditions d'entrée. Elles acceptaient n'importe qui avec un passeport, quel que soit le statut de visa ou la durée du séjour.

**Caractéristiques typiques d'une gaijin house traditionnelle :**
- Immeuble ancien, équipements basiques
- Conditions d'entrée très souples (parfois sans exigence de visa long séjour)
- Paiement possible à la semaine ou au mois
- Aucun engagement long terme requis
- Atmosphère internationale, forte rotation des résidents

## Qu'est-ce qu'un share house ?

Un share house (シェアハウス) est une propriété résidentielle gérée professionnellement où plusieurs locataires partagent des espaces communs. Le terme est un concept moderne et réglementé au Japon, développé principalement à partir du milieu des années 2000.

Les share houses modernes vont de l'option basique à 40 000 JPY/mois aux propriétés premium à 90 000 JPY avec accès à une salle de sport, intérieurs design et terrasse sur le toit.

**Caractéristiques typiques d'un share house moderne :**
- Géré par un opérateur professionnel (souvent une société avec des dizaines de propriétés)
- Durée minimale généralement de 1 à 3 mois
- Processus de candidature standard (dossier, vérification du visa, revenus)
- Bail signé
- Souvent un mélange de résidents japonais et étrangers

## Le chevauchement et la confusion

La confusion vient du fait que beaucoup de propriétés commercialisées en ligne comme "gaijin house" sont en réalité des share houses modernes ciblant les étrangers. Le terme "gaijin house" est souvent utilisé comme terme de recherche ou étiquette marketing pour signifier "ouvert aux étrangers", pas comme une description précise du type de propriété.

En pratique, quand les gens disent "gaijin house" en 2026, ils désignent généralement un share house qui :
- A un processus de candidature simplifié pour les étrangers
- Dispose d'un opérateur anglophone ou de documents en anglais
- Accepte des séjours courts (minimum 1 mois plutôt que 3 ou 6)
- A peu d'exigences au-delà d'un visa valide

## Lequel convient à votre situation ?

**Choisissez un share house moderne si :**
- Vous voulez un logement propre, bien géré, avec des règles claires
- Vous prévoyez de rester 1 mois ou plus
- Vous souhaitez vivre avec un mélange de résidents japonais et internationaux
- Vous avez un visa long séjour valide

**Une gaijin house plus flexible peut convenir si :**
- Vous arrivez en visa touriste en attendant que votre visa de travail soit traité
- Vous avez besoin d'un logement pour moins d'1 mois
- Vous devez emménager immédiatement sans processus de candidature
- Votre budget est très serré (certaines gaijin houses acceptent le paiement à la semaine)

**À éviter si :**
- Vous voulez un environnement de vie stable pour plus de quelques mois (forte rotation, qualité de gestion variable dans les propriétés les plus informelles)
- Vous tenez à la qualité de l'immeuble et des équipements

## Conseils pratiques

Lorsque vous évaluez une propriété commercialisée comme "gaijin house" ou share house, les questions à poser sont toujours les mêmes :

- Quelle est la durée minimale de séjour ?
- Quels documents sont nécessaires pour emménager ?
- Qu'est-ce qui est inclus dans le loyer mensuel (charges, internet) ?
- Quelles sont les règles de vie ?
- Y a-t-il un interlocuteur en cas de problème ?

Les réponses vous disent si vous avez affaire à un share house moderne bien géré ou à un hébergement informel de courte durée. Les deux peuvent être le bon choix selon votre timing et vos besoins.


For health coverage whatever your housing option, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment. To improve your Japanese during your stay, [iTalki](https://www.italki.com/affshare?ref=af32660342) offers private lessons with native teachers from $10/hour. *(affiliate links)*
---

*À lire aussi : [Share house à Tokyo : guide complet pour expatriés (2026)](/blog/share-house-tokyo-guide-complet).*

*Vous cherchez un share house ou un appartement meublé à Tokyo pour votre arrivée ? Réservez une consultation gratuite pour explorer les options adaptées à votre arrivée.*
    `.trim(),
  },

  // ── ARTICLE : Logement étudiant Tokyo (FR) ──────────────────────────────────
  {
    slug: 'logement-etudiant-tokyo-2026',
    locale: 'fr',
    title: 'Logement étudiant à Tokyo : share house, dortoir ou appart ? (2026)',
    description: 'Share house, résidence universitaire ou appartement meublé : comparatif complet pour étudiants à Tokyo. Budgets réels, quartiers, comment candidater depuis la France.',
    date: '2026-06-20',
    readingTime: '9 min',
    content: `
Trouver un logement étudiant à Tokyo est une étape qui stresse la majorité des étudiants avant le départ, surtout quand on ne parle pas encore bien japonais. La bonne nouvelle : le marché dispose d'options spécifiquement pensées pour les étudiants internationaux, avec des processus de candidature entièrement en ligne depuis la France.

**Réponse rapide :** Les étudiants internationaux à Tokyo ont trois options principales : dortoirs universitaires (les moins chers, places limitées, candidater tôt), share houses (40 000 à 80 000 JPY, sans garant, ambiance sociale) et résidences étudiantes. La plupart acceptent une candidature en ligne depuis l'étranger avec passeport et visa étudiant. Candidatez 2 à 3 mois avant la rentrée.

La mauvaise nouvelle : les délais sont serrés. Les meilleurs logements pour la rentrée d'octobre se réservent à partir de juillet, parfois avant.

## Les 3 options principales pour un étudiant étranger

### Le share house : l'option la plus populaire

Le [share house à Tokyo](/fr/blog/share-house-tokyo-guide-complet) est de loin la solution la plus utilisée par les étudiants étrangers. Chambre privée de 8 à 16 m2, espaces communs partagés, contrat flexible, pas de garant japonais requis.

**Avantages pour un étudiant :**
- Aucun reikin (clé de courtoisie), pas de garant japonais
- Internet et souvent les charges inclus
- Durées flexibles à partir de 1 mois
- Communauté prête-à-l'emploi pour pratiquer le japonais
- Budget d'entrée faible : 100 000 à 180 000 JPY

**Inconvénients :**
- Intimité limitée
- Règles de vie strictes (bruit, cuisine, invités)
- Chambre souvent petite pour travailler confortablement

### La résidence universitaire

Si votre université japonaise propose des dortoirs, c'est généralement la solution la moins chère. Les loyers vont de 20 000 à 50 000 JPY/mois, charges incluses.

**Ce qu'il faut savoir :**
- Les places sont limitées et attribuées par l'université, pas par vous
- Les dossiers sont souvent à déposer en même temps que la candidature universitaire
- La vie en dortoir japonais est très encadrée (couvre-feu parfois, règles strictes)
- Certains dortoirs refusent les animaux de compagnie et les visiteurs après 22h
- L'option n'est disponible que si vous êtes inscrit dans une université au Japon

### L'appartement meublé sans garant

L'[appartement meublé sans garant](/fr/blog/appartement-meuble-tokyo-sans-garant) est une troisième voie, plus confortable et plus indépendante. Des opérateurs spécialisés proposent des studios à partir de 65 000 JPY/mois sans garant japonais, avec contrat en anglais.

C'est la bonne option si vous recevez une bourse qui couvre 100 000 JPY/mois ou plus, ou si vous arrivez en famille.

## Comparatif des coûts réels

| Type de logement | Loyer mensuel | Frais d'entrée | Garant requis |
|---|---|---|---|
| Share house | 45 000 - 90 000 JPY | 1-2 mois (caution seulement) | Non |
| Dortoir universitaire | 20 000 - 50 000 JPY | Variable | Non |
| Appartement meublé | 65 000 - 150 000 JPY | 2-2,5 mois | Non |
| Appartement standard | 80 000 - 130 000 JPY | 4-6 mois + garant | Oui |

Pour un budget étudiant standard entre 60 000 et 90 000 JPY/mois pour le logement, le share house est presque toujours le meilleur compromis.

## Comment candidater depuis la France (timeline)

Le piège classique : attendre d'avoir son visa pour commencer à chercher. C'est 2 mois de perdus.

**J-90 (juillet pour une rentrée octobre) :**
- Décider du type de logement selon votre budget et votre programme
- Lister 5 à 8 share houses ou opérateurs de logements meublés dans vos quartiers cibles
- Préparer votre dossier : passeport, lettre d'admission ou contrat d'études, justificatif de revenus ou de bourse

**J-60 :**
- Envoyer les premières candidatures (ne pas attendre le visa, la plupart des opérateurs l'acceptent en avance)
- Passer les entretiens vidéo avec les opérateurs qui répondent positivement
- Mettre une option sur 2 à 3 logements

**J-30 :**
- Confirmer votre choix et payer la caution depuis la France (virement international ou Wise)
- Signer le bail à distance

**Jour J :**
- Clés disponibles à votre arrivée à Tokyo

Ce planning est possible pour la quasi-totalité des share houses et appartements meublés ciblant les étudiants étrangers. La majorité a un système de candidature entièrement en ligne.

## Les quartiers les mieux adaptés aux étudiants

Le bon quartier dépend surtout de votre campus.

**Waseda / Takadanobaba (Shinjuku-ku)** : idéal si vous êtes à Waseda University. Nombreux share houses étudiants entre 55 000 et 75 000 JPY, ambiance internationale.

**Hongo / Nezu (Bunkyo-ku)** : quartier de l'Université de Tokyo. Calme, résidentiel, loyers raisonnables pour Tokyo.

**Ikebukuro (Toshima-ku)** : bien connecté à plusieurs universités, large offre de share houses entre 50 000 et 80 000 JPY.

**Shinjuku / Nakano** : connexion directe à Keio, Sophia, Tokyo Medical and Dental University. Bonne offre, prix variés.

La règle générale : habitez à moins de 30 minutes de votre campus. Les transports en commun sont fiables mais les allers-retours de plus de 45 minutes épuisent sur la durée.

## Les erreurs les plus fréquentes chez les étudiants

**Chercher trop tard.** Pour les rentrées d'avril et d'octobre, les meilleurs share houses en zone centrale sont pris entre 60 et 90 jours avant la date d'entrée.

**Ignorer la clause de résiliation.** Si vous rentrez en France avant la fin du contrat, vous pouvez devoir payer 1 à 2 mois de pénalités. Négociez une clause de sortie anticipée à 30 jours.

**Sous-estimer le budget des transports.** Un pass mensuel de train entre votre logement et votre campus peut coûter 10 000 à 20 000 JPY. Intégrez-le dans votre calcul avant de choisir un quartier "moins cher".

**Ne pas vérifier si l'opérateur accepte les visas étudiants.** Certains share houses n'acceptent que les visas de travail. Confirmez ce point avant d'envoyer votre candidature.

## Ce que propose notre service pour les étudiants

Nous avons accès à un réseau de logements spécifiquement sélectionnés pour les étudiants internationaux : share houses qui acceptent les visas étudiants, appartements meublés avec contrats souples, et logements proches des campus des grandes universités tokyoïtes.

Une consultation de 30 minutes suffit pour identifier les options disponibles à votre date d'arrivée, dans votre budget, et à bonne distance de votre université.


Pour votre couverture sante pendant vos etudes au Japon, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement. Pour preparer votre japonais, [iTalki](https://www.italki.com/affshare?ref=af32660342) propose des cours particuliers avec des professeurs natifs. *(liens affilies)*
---

*À lire aussi : [Logement étudiant à Tokyo : guide complet pour francophones](/blog/logement-etudiant-tokyo-guide), [Logement étudiant à Tokyo pour octobre : share house ou dortoir ?](/blog/logement-etudiant-tokyo-octobre).*

*Vous commencez vos études à Tokyo en octobre ? Réservez maintenant une consultation gratuite pour sécuriser votre logement avant la rentrée.*
    `.trim(),
  },

  // ── ARTICLE : Student Housing Tokyo (EN) ────────────────────────────────────
  {
    slug: 'student-housing-tokyo-guide-2026',
    locale: 'en',
    title: 'Student Housing in Tokyo: Share House vs University Dorm (2026 Guide)',
    description: 'Real costs, best neighbourhoods, and how to apply from abroad for student housing in Tokyo. Share house vs dorm vs furnished apartment compared.',
    date: '2026-06-20',
    readingTime: '9 min',
    content: `
Finding student housing in Tokyo is one of the most stressful parts of preparing for a study abroad experience, especially when you are doing it from thousands of kilometres away. The good news: there is an entire segment of the market built specifically for international students, with fully online application processes.

**Quick answer:** International students in Tokyo choose mainly between university dormitories (cheapest, limited, apply early), share houses (40,000 to 80,000 JPY, no guarantor, social) and student residences. Most accept online applications from abroad with a passport and student visa. Apply 2 to 3 months before your term starts to secure a spot.

The bad news: the best properties for the October semester fill up from July onwards. Waiting until you have your visa in hand means missing the best options.

## The three main housing options for international students

### Share houses: the most popular choice

A [share house in Tokyo](/en/blog/share-house-tokyo-guide-2026) is the most widely used solution for international students. Private room of 8 to 16 sqm, shared communal areas, flexible contracts, no Japanese guarantor required.

**Advantages for students:**
- No reikin (key money), no Japanese guarantor
- Internet and often utilities included in the rent
- Flexible terms from 1 month
- Built-in community for practising Japanese
- Low move-in budget: 100,000 to 180,000 JPY

**Disadvantages:**
- Limited privacy
- Strict house rules (noise, kitchen use, guests)
- Small rooms that can be cramped for studying

### University dormitories

If your Japanese university offers on-campus dormitories, this is usually the cheapest option. Monthly rents range from 20,000 to 50,000 JPY, utilities included.

**What you need to know:**
- Places are limited and allocated by the university, not chosen by you
- Applications are often submitted alongside your university enrolment dossier
- Japanese dormitory life is highly regulated: some have curfews, strict guest policies after 10pm
- Only available if you are enrolled in a Japanese university

### Furnished apartments with no guarantor

A [furnished apartment without a guarantor](/en/blog/furnished-apartment-tokyo-no-guarantor) is a third option: more comfortable and independent. Operators specialising in foreign tenants offer studios from 65,000 JPY/month with English contracts and no Japanese guarantor.

This is the right option if you receive a scholarship covering 100,000 JPY/month or more, or if you are arriving with a partner.

## Real cost comparison

| Housing type | Monthly rent | Move-in costs | Guarantor needed |
|---|---|---|---|
| Share house | 45,000 - 90,000 JPY | 1-2 months (deposit only) | No |
| University dorm | 20,000 - 50,000 JPY | Variable | No |
| Furnished apartment | 65,000 - 150,000 JPY | 2-2.5 months | No |
| Standard apartment | 80,000 - 130,000 JPY | 4-6 months + guarantor | Yes |

For a typical student budget of 60,000 to 90,000 JPY/month for housing, a share house is almost always the best compromise.

## How to apply from abroad: timeline

The classic mistake is waiting until you have your visa before starting your search. That is 2 months wasted.

**90 days before arrival (July for October semester):**
- Decide on housing type based on your budget and study programme
- List 5 to 8 share houses or furnished apartment operators in your target neighbourhoods
- Prepare your dossier: passport, admission letter, proof of income or scholarship

**60 days before:**
- Send initial applications. Most operators accept applications in advance, before visa issuance
- Complete video interviews with operators who respond positively
- Place holds on 2 to 3 properties

**30 days before:**
- Confirm your choice and pay the security deposit from abroad (bank transfer or Wise)
- Sign the lease remotely

**Arrival day:**
- Keys available on arrival in Tokyo

This timeline works for the vast majority of share houses and furnished apartments targeting international students. Most have fully online application systems.

## Best neighbourhoods for students

The right neighbourhood depends primarily on your campus location.

**Waseda / Takadanobaba (Shinjuku-ku)**: ideal if you attend Waseda University. Many student share houses at 55,000 to 75,000 JPY, international atmosphere.

**Hongo / Nezu (Bunkyo-ku)**: University of Tokyo neighbourhood. Quiet, residential, reasonable rents for Tokyo.

**Ikebukuro (Toshima-ku)**: well connected to multiple universities, large share house supply at 50,000 to 80,000 JPY.

**Shinjuku / Nakano**: direct connections to Keio, Sophia, and Tokyo Medical and Dental University. Good supply, varied prices.

The general rule: live within 30 minutes of your campus. Public transport is reliable but 45-minute-plus daily commutes become exhausting over a semester.

## Most common student mistakes

**Searching too late.** For April and October semesters, the best share houses in central areas are taken 60 to 90 days before the start date.

**Ignoring the early termination clause.** If you return home before your contract ends, you may owe 1 to 2 months in penalties. Negotiate a 30-day early exit clause before signing.

**Underestimating transport costs.** A monthly train pass between your housing and campus can cost 10,000 to 20,000 JPY. Include this in your budget before choosing a "cheaper" neighbourhood further out.

**Not confirming the operator accepts student visas.** Some share houses only accept work visas. Confirm this before submitting your application.

## How our service helps students

We have access to a network of housing specifically selected for international students: share houses that accept student visas, furnished apartments with flexible contracts, and properties close to the campuses of major Tokyo universities.

A 30-minute consultation is enough to identify the options available on your arrival date, within your budget, and at the right distance from your university.


For health coverage during your studies in Japan, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment. To prepare your Japanese, [iTalki](https://www.italki.com/affshare?ref=af32660342) offers private lessons with native teachers. *(affiliate links)*
---

*See also: [Student Housing Tokyo 2026: Complete Guide for International Students](/blog/student-housing-tokyo-guide), [Student Housing in Tokyo for October Intake: Share House vs University Dorm](/blog/student-housing-tokyo-october).*

*Starting your studies in Tokyo in October? Book a free consultation now to secure housing before the semester starts.*
    `.trim(),
  },

  // ── ARTICLE : Jiko Bukken (FR) ───────────────────────────────────────────────
  {
    slug: 'jiko-bukken-appartements-pas-chers-tokyo',
    locale: 'fr',
    title: 'Jiko bukken à Tokyo : appartements pas chers et légaux (2026)',
    description: "Les jiko bukken sont des logements où un incident grave a eu lieu. Légaux, jusqu'à 30% moins chers, souvent en centre-ville : comment en trouver à Tokyo.",
    date: '2026-06-20',
    readingTime: '7 min',
    content: `
Il existe une catégorie de logements à Tokyo que la grande majorité des expatriés ne connaît pas, et qui offre certaines des meilleures opportunités de loyer en zone centrale. Ce sont les **jiko bukken** (事故物件), littéralement "propriétés à incident". Légaux, bien situés, et jusqu'à 30% moins chers que le marché : voici ce qu'il faut savoir.

**Réponse rapide :** Les jiko bukken (事故物件) sont des logements où un incident est survenu (souvent un décès), légaux à louer et jusqu'à 30% moins chers en zone centrale. Le propriétaire doit déclarer l'incident au premier locataire. Si le tabou ne vous dérange pas, c'est une vraie opportunité de loyer ; des sites spécialisés et agences peuvent vous en trouver.

## Qu'est-ce qu'un jiko bukken ?

Un jiko bukken est un bien immobilier dans lequel un "incident particulier" a eu lieu. En japonais, le terme est large : il peut s'agir d'un suicide, d'un homicide, d'un décès isolé découvert après plusieurs jours, ou d'un grave accident domestique.

Ce n'est pas une catégorie illégale ni honteuse dans le droit japonais : c'est simplement une obligation de transparence imposée par la loi.

**Ce que la loi japonaise impose :**
En vertu des directives du Ministère du Territoire, de l'Infrastructure, du Transport et du Tourisme (MLIT), un propriétaire ou une agence est légalement tenu de déclarer tout incident significatif survenu dans un logement **pendant les 3 premières années suivant l'événement**. Après ces 3 ans, l'obligation de divulgation disparaît.

## Pourquoi c'est une opportunité pour les étrangers

La culture japonaise accorde une importance considérable au concept de "ke" (souillure) et de "en" (karma). Pour de nombreux Japonais, l'idée de vivre dans un appartement où quelqu'un est décédé est psychologiquement difficile, quelle que soit la durée écoulée.

Ce sentiment culturel a un effet concret sur le marché : les propriétaires peinent à louer ces biens au prix du marché, même après plusieurs années. Ils sont donc contraints de proposer des réductions significatives.

**Réductions constatées :**
- Suicide ou homicide (moins d'1 an) : 30 à 50% sous le prix du marché
- Décès naturel isolé (1 à 3 ans) : 10 à 25% sous le marché
- Après 3 ans (sans obligation légale) : 5 à 15% sous le marché selon la sensibilité du propriétaire

Pour un appartement en zone centrale à 120 000 JPY/mois, une réduction de 25% représente 30 000 JPY d'économie mensuelle, soit 360 000 JPY par an.

## Comment trouver un jiko bukken à Tokyo

Contrairement à ce que l'on pourrait penser, il n'est pas difficile de trouver ces biens si on sait où chercher.

**Sites spécialisés :**
- **Oshimaland** (大島てる) : le site de référence au Japon pour les jiko bukken. Une carte Google Maps collaborative recense les incidents signalés dans toute la ville, avec les adresses et la nature de l'événement.
- **JikoBukken.net** : annonces de locations et ventes avec l'historique de l'incident.

**Agences immobilières locales :**
Certaines agences spécialisées s'occupent exclusivement de ce type de bien. En demandant explicitement à une agence généraliste si elle a des "jiko bukken", certaines acceptent d'en proposer.

**Portails classiques :**
Les biens peuvent parfois apparaître sur Suumo ou Homes avec la mention 心理的瑕疵あり (défaut psychologique), ce qui signifie jiko bukken sans utiliser le terme directement.

## Ce qu'il faut vérifier avant de signer

Un jiko bukken n'est pas un bien à éviter par principe, mais il demande une vérification rigoureuse.

**1. La nature exacte de l'incident.** Un décès naturel de vieillesse est différent d'un homicide. Demandez le document de divulgation officiel (kikakusho) et faites-le traduire si nécessaire.

**2. L'état de l'appartement.** Demandez si un nettoyage spécialisé (特殊清掃) a été effectué. C'est presque toujours le cas pour les propriétés remises en location, mais il faut le confirmer.

**3. L'implication du voisinage.** Dans certains immeubles, les voisins sont au courant. Si vous êtes sensible à ce type de regards, choisissez un grand immeuble anonyme plutôt qu'une petite résidence de 4 appartements.

**4. L'accessibilité de la documentation.** Un propriétaire ou une agence qui refuse de vous fournir la documentation complète sur l'incident est un signal d'alerte.

## Jiko bukken vs logement standard : ce qui change vraiment

La plupart des expatriés occidentaux qui ont vécu dans un jiko bukken le rapportent : après les premières semaines, l'appartement est... un appartement. Les murs, le sol et le plafond sont les mêmes.

Ce qui change concrètement :
- Le loyer, durablement inférieur au marché
- Parfois une négociation plus favorable sur les frais d'entrée (le propriétaire est moins en position de force)
- Dans de rares cas, des voisins au comportement légèrement distancé au départ

Ce qui ne change pas :
- La qualité de l'immeuble
- Les transports, le quartier, la vue
- La légalité du bail et vos droits en tant que locataire

## Notre conseil pratique

Le jiko bukken est une option à considérer sérieusement si :
- Vous cherchez un appartement en zone centrale avec un budget limité
- Vous n'êtes pas sensible aux superstitions
- Vous voulez un logement de qualité sans payer le premium "appartement irréprochable"

Si l'aspect psychologique vous dérange, il vaut mieux ne pas y aller. Un appartement où vous dormiez mal chaque nuit n'en vaut pas la réduction.

Pour les autres : c'est l'un des rares leviers qui permettent de louer en zone centrale à des prix comparables à la banlieue.


Pour votre couverture sante pendant la recherche et les demarches, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement. Pour communiquer avec les agences en japonais, [iTalki](https://www.italki.com/affshare?ref=af32660342) propose des cours avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*
---

*Vous cherchez un logement à Tokyo avec un bon rapport qualité-prix ? Discutons de votre situation lors d'une consultation gratuite.*
    `.trim(),
  },

  // ── ARTICLE : Jiko Bukken (EN) ───────────────────────────────────────────────
  {
    slug: 'jiko-bukken-cheap-apartments-tokyo',
    locale: 'en',
    title: 'Jiko Bukken: Tokyo\'s Cheapest Legal Apartments Explained (2026)',
    description: "Jiko bukken are stigmatised properties in Japan where a serious incident occurred. Legal to rent, up to 30% below market rate: how to find them in Tokyo.",
    date: '2026-06-20',
    readingTime: '7 min',
    content: `
There is a category of apartments in Tokyo that most expats have never heard of, yet it offers some of the best value rents in central areas. They are called **jiko bukken** (事故物件), literally "incident properties." Legal, often centrally located, and up to 30% cheaper than comparable units: here is what you need to know.

**Quick answer:** Jiko bukken (事故物件) are "incident properties" where a death or serious event occurred. They are fully legal to rent and priced up to 30% below market, often in central Tokyo. Landlords must disclose the incident to the first tenant who moves in afterwards. If you are not superstitious, they are one of the cheapest legal ways to live centrally, and sites like Oshimaland map them across the city.

## What is a jiko bukken?

A jiko bukken is a property where a "particular incident" has occurred. In Japanese law, the term is broad: it can refer to a suicide, a homicide, a solitary death discovered after several days, or a serious domestic accident.

This is not an illegal or shameful category in Japanese law. It is simply a transparency obligation imposed by regulation.

**What Japanese law requires:**
Under guidelines from the Ministry of Land, Infrastructure, Transport and Tourism (MLIT), landlords and agencies are legally required to disclose any significant incident that occurred in a property **for the first 3 years following the event.** After 3 years, the disclosure obligation expires.

## Why this is an opportunity for foreigners

Japanese culture places considerable importance on the concept of "ke" (impurity) and "en" (karmic connection). For many Japanese people, the idea of living in an apartment where someone has died is psychologically difficult, regardless of how much time has passed.

This cultural sensitivity has a direct market effect: landlords struggle to rent these properties at market rate, even years after the event. They are therefore forced to offer significant discounts.

**Observed discounts:**
- Suicide or homicide (under 1 year): 30 to 50% below market rate
- Solitary death discovered after delay (1 to 3 years): 10 to 25% below market
- After 3 years (no legal disclosure required): 5 to 15% below market depending on landlord sensitivity

For a central Tokyo apartment at 120,000 JPY/month, a 25% discount saves 30,000 JPY per month, 360,000 JPY per year.

## How to find a jiko bukken in Tokyo

Contrary to what you might expect, these properties are not hard to find if you know where to look.

**Specialist websites:**
- **Oshimaland** (大島てる): Japan's reference site for jiko bukken. A collaborative Google Maps listing records reported incidents across the city, with addresses and the nature of each event.
- **JikoBukken.net**: rental and sale listings with incident history.

**Local estate agencies:**
Some agencies specialise exclusively in these properties. Asking a general agency directly whether they have "jiko bukken" will sometimes get a positive response.

**Standard portals:**
Properties occasionally appear on Suumo or Homes with the notation 心理的瑕疵あり (psychological defect), which means jiko bukken without using the term directly.

## What to check before signing

A jiko bukken is not a property to avoid on principle, but it requires careful verification.

**1. The exact nature of the incident.** A natural death from old age is very different from a homicide. Request the official disclosure document (kikakusho) and have it translated if necessary.

**2. The condition of the apartment.** Ask whether a specialist cleaning (特殊清掃) has been carried out. This is almost always done before properties are re-let, but confirm it explicitly.

**3. Building dynamics.** In some buildings, neighbours are aware of the history. If you are sensitive to that kind of social context, choose a large anonymous building rather than a small 4-unit residence.

**4. Availability of documentation.** A landlord or agency that refuses to provide complete documentation about the incident is a red flag.

## Jiko bukken vs standard apartment: what actually changes

Most Western expats who have lived in a jiko bukken report the same thing: after the first few weeks, the apartment is just... an apartment. The walls, floor, and ceiling are the same.

What concretely changes:
- The rent, durably below market rate
- Sometimes a more favourable negotiation on move-in costs (the landlord has less leverage)
- In rare cases, initially slightly distant behaviour from neighbours

What does not change:
- The building quality
- Transport, neighbourhood, views
- The legality of your lease and your tenant rights

## Practical advice

A jiko bukken is worth considering seriously if:
- You are looking for a centrally located apartment on a limited budget
- You are not particularly superstitious
- You want a quality apartment without paying the "flawless history" premium

If the psychological aspect bothers you, it is better not to go there. An apartment where you sleep badly every night is not worth the discount.

For everyone else: it is one of the rare levers that allows you to rent in central Tokyo at prices comparable to the suburbs, with none of the commute penalty.


For health coverage during your search and admin process, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment. To navigate the process in Japanese, [iTalki](https://www.italki.com/affshare?ref=af32660342) offers lessons with native teachers from $10/hour. *(affiliate links)*
---

*See also: [Furnished Apartment Tokyo: 5 Best Options for Expats in 2026](/blog/furnished-apartment-tokyo-top-5-expats).*

*Looking for good-value housing in Tokyo? Let's discuss your situation in a free 30-minute consultation.*
    `.trim(),
  },

  // ── ARTICLE : Appartement Tokyo septembre FR ────────────────────────────────
  {
    slug: 'appartement-tokyo-septembre-guide',
    locale: 'fr',
    title: 'Trouver un appartement à Tokyo en septembre : ce qui change vs le printemps',
    description: 'Le marché locatif de Tokyo en septembre est très différent de mars-avril. Moins de concurrence, mais moins de stock : comment en profiter pour bien loger.',
    date: '2026-06-21',
    readingTime: '7 min',
    content: `
La grande majorité des guides sur la recherche de logement à Tokyo parle implicitement du printemps : la rentrée d'avril, le pic de mars, la pression du marché en février. Ce que ces guides omettent : la rentrée de septembre obéit à des règles complètement différentes.

**Réponse rapide :** La rentrée de septembre à Tokyo est un marché plus calme que le pic de mars-avril : moins de concurrence, plus de marge de négociation, mais moins de nouveaux biens. C'est une bonne fenêtre pour les étudiants et les mutations d'automne. Cherchez dès juillet-août pour emménager avant que la demande d'octobre ne remonte.

Si vous arrivez à Tokyo en août ou septembre, vous avez à la fois un avantage et un défi par rapport à vos homologues de printemps.

## Ce qui change en septembre par rapport au printemps

### La demande est structurellement plus faible

Mars est le mois le plus tendu de l'année sur le marché locatif tokyoïte. Les grandes entreprises japonaises emménagent leurs nouvelles recrues, les universités reçoivent leurs étudiants de première année, et des dizaines de milliers de personnes cherchent simultanément. La concurrence sur chaque bien est réelle.

Septembre est un pic secondaire, plus modeste. Les entreprises qui recrutent en cours d'année et les universités qui ont une rentrée d'automne génèrent une demande, mais elle est 40 à 50% plus faible que le printemps en volume.

**Ce que ça signifie pour vous :** moins de pression pour décider en 24h, plus de marge pour négocier, propriétaires plus ouverts aux conditions flexibles.

### Le stock disponible est différent

Au printemps, tout le parc locatif tokyoïte est mis en circulation simultanément. En septembre, c'est un marché de rotation : vous cherchez parmi les biens dont les anciens locataires sont partis pendant l'été.

Ces biens ont souvent été refaits pendant la période creuse de juillet-août (peinture, ménage, parfois rénovation légère). Ils arrivent sur le marché en meilleur état qu'un bien libéré en urgence en février.

**Ce que ça signifie pour vous :** biens en meilleur état visuel, mais stock total plus limité. Il faut être prêt à décider plus rapidement quand une bonne option apparaît.

### Les propriétaires sont plus négociables

Après deux mois d'été sans locataire (juillet-août), beaucoup de propriétaires sont pressés de relouer. Un bien vacant coûte 100 000 JPY/mois en loyer perdu. Un locataire qui arrive en septembre représente 6 à 12 mois de revenus assurés avant le prochain départ éventuel.

**Ce que vous pouvez négocier en septembre :**
- Réduction ou suppression du reikin (clé de courtoisie) pour les biens vacants depuis plus de 60 jours
- Prise en charge d'une partie des frais de nettoyage
- Délai de paiement du premier mois pour vous laisser le temps d'ouvrir un compte bancaire
- Clause de sortie anticipée à 30 jours au lieu de 60

Aucune de ces négociations n'est garantie, mais la probabilité d'accord est bien plus élevée qu'en mars où le propriétaire a 5 candidatures en attente.

## Les quartiers les plus actifs en septembre

La rentrée de septembre attire surtout deux profils : les étudiants de master qui commencent un programme international en automne, et les cadres expatriés dont le contrat démarre en Q4 fiscal.

**Zones qui s'activent particulièrement en septembre :**

**Bunkyo-ku (Hongo, Nezu, Koishikawa)** : très proche de l'Université de Tokyo, qui a une rentrée d'automne significative pour ses masters et doctorats. La demande monte fortement en août-septembre.

**Shinjuku / Takadanobaba** : Waseda University attire des centaines d'étudiants internationaux en automne. Le quartier voit son taux d'occupation remonter en septembre après un creux estival.

**Minato-ku / Roppongi** : les cadres d'entreprises multinationales dont l'année fiscale est calée sur le calendrier international (pas le calendrier japonais) débarquent en Q3-Q4. La demande en appartements meublés haut de gamme est forte.

**Koenji / Nakano** : quartiers d'artistes et de créatifs qui reçoivent beaucoup de travailleurs en remote ou freelances en début d'automne. Bonne disponibilité, loyers stables.

## Le bon timing pour chercher

**J-60 (fin juillet)** : commencer à surveiller le marché. Les annonces de biens disponibles en septembre commencent à sortir à partir de la mi-juillet.

**J-45 (début août)** : prendre contact avec les opérateurs et chasseurs. C'est la période où les propriétaires et agences ont le plus d'informations sur leurs disponibilités de septembre.

**J-30 (début août)** : positionner une option sur les meilleurs biens. Les bons appartements meublés pour la rentrée septembre sont souvent reservés entre J-30 et J-45.

**J-14 (mi-août)** : signer et payer la caution. Pour une entrée dans les lieux le 1er septembre.

Si vous êtes encore à l'étranger : un chasseur peut visiter à votre place et envoyer des vidéos de présentation, ce qui permet de prendre une décision à distance en toute confiance.

## Ce qu'il ne faut pas faire

**Attendre votre arrivée à Tokyo pour commencer à chercher.** En septembre, avec moins de stock qu'au printemps, les bons biens partent vite quand un locataire est présent pour visiter immédiatement. Arriver sans logement confirmé signifie souvent 2 à 4 semaines d'hôtel à 80 000 à 150 000 JPY.

**Chercher uniquement sur les portails publics.** Suumo et Homes ne montrent qu'une partie du marché. Les biens hors marché, qui circulent via les réseaux professionnels, représentent souvent les meilleures opportunités, surtout en période de plus faible demande où les propriétaires acceptent de travailler avec des intermédiaires pour éviter la vacance.

**Ignorer les logements meublés.** Pour une arrivée en septembre, l'[appartement meublé sans garant](/fr/blog/appartement-meuble-tokyo-sans-garant) est souvent la solution optimale : installation immédiate, pas de frais de mobilier, contrat en anglais, et accès à des biens disponibles sur des délais très courts.

## Le comparatif printemps vs automne en un coup d'oeil

| Critère | Mars-avril (printemps) | Août-septembre (automne) |
|---|---|---|
| Niveau de demande | Très fort | Modere |
| Stock disponible | Maximum | Restreint |
| Pression concurrentielle | Forte (5+ candidats par bien) | Faible (1-2 candidats) |
| Negociabilite | Faible | Bonne |
| Délai de décision exige | 24-48h | 3-5 jours |
| Biens en bon etat | Variable | Souvent refaits ete |

## Notre service pour les arrivees en septembre

Nous avons une visibilité directe sur les biens disponibles pour la rentrée de septembre à Tokyo, notamment les logements meublés sans garant accessibles aux étrangers et les share houses avec entrée immédiate.

Une consultation de 30 minutes suffit pour faire le point sur ce qui est disponible dans votre budget et votre quartier cible, avant même votre arrivée au Japon.


Pour votre couverture sante en arrivant en septembre, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement, activable avant votre inscription a l'assurance nationale japonaise. *(lien affilie)*
---

*À lire aussi : [Logement étudiant à Tokyo pour octobre : share house ou dortoir ?](/blog/logement-etudiant-tokyo-octobre).*

*Vous arrivez à Tokyo en septembre ? Réservez une consultation gratuite maintenant pour préparer votre recherche et avancer avant d'atterrir.*
    `.trim(),
  },

  // ── ARTICLE : Find apartment Tokyo September (EN) ────────────────────────────
  {
    slug: 'find-apartment-tokyo-september',
    locale: 'en',
    title: 'Finding an Apartment in Tokyo in September: What Changes vs Spring',
    description: 'The Tokyo rental market in September works very differently from March-April. Less competition but less stock: how to use the autumn season to your advantage.',
    date: '2026-06-21',
    readingTime: '7 min',
    content: `
Most guides about finding housing in Tokyo implicitly discuss the spring market: the April fiscal start, the March moving peak, the February pressure. What these guides rarely cover: the September rental season follows completely different rules.

**Quick answer:** The September rental season in Tokyo is quieter than the March-April peak: less competition and more negotiation room, but fewer new listings. It suits autumn students and transfers. Start searching in July or August to move in before October demand picks up.

If you are arriving in Tokyo in August or September, you have both an advantage and a challenge compared to your spring counterparts.

## What changes in September versus spring

### Demand is structurally lower

March is the most competitive month of the year in the Tokyo rental market. Large Japanese companies place their new recruits, universities receive first-year students, and tens of thousands of people search simultaneously. Competition for each property is real and intense.

September is a secondary peak, significantly more modest. Companies hiring mid-year and universities running autumn programmes generate demand, but the volume is 40 to 50% lower than spring.

**What this means for you:** less pressure to decide in 24 hours, more room to negotiate, landlords more open to flexible conditions.

### The available stock is different

In spring, the entire Tokyo rental market turns over simultaneously. In September, you are searching among properties whose previous tenants left during summer.

These properties have often been refreshed during the slow July-August period: fresh paint, thorough cleaning, sometimes light renovation. They arrive on the market in better condition than a property vacated urgently in February.

**What this means for you:** properties in better visual condition, but total supply more limited. You need to be ready to decide more quickly when a good option appears.

### Landlords are more open to negotiation

After two vacant summer months (July-August), many landlords are eager to re-let. A vacant property costs 100,000 JPY/month in lost rent. A tenant arriving in September represents 6 to 12 months of guaranteed income before the next potential departure.

**What you can negotiate in September:**
- Reduction or waiver of reikin (key money) for properties vacant more than 60 days
- Partial coverage of cleaning fees
- Deferred first-month payment to give you time to open a bank account
- Early termination clause at 30 days instead of 60

None of these are guaranteed, but the probability of agreement is much higher than in March, when the landlord has 5 other applications waiting.

## Most active neighbourhoods in September

The September intake attracts mainly two profiles: postgraduate students starting international programmes in autumn, and corporate expats whose contracts begin in Q4.

**Areas that see the most activity in September:**

**Bunkyo-ku (Hongo, Nezu, Koishikawa)**: very close to the University of Tokyo, which runs significant master's and doctoral autumn intakes. Demand rises strongly in August-September.

**Shinjuku / Takadanobaba**: Waseda University attracts hundreds of international students in autumn. The area sees occupancy rates climb in September after a summer low.

**Minato-ku / Roppongi**: executives from multinationals whose fiscal year follows the international (not Japanese) calendar arrive in Q3-Q4. Demand for high-end furnished apartments is strong.

**Koenji / Nakano**: attract remote workers and creative freelancers at the start of autumn. Good availability, stable rents.

## The right search timeline

**90 days out (late July)**: start monitoring the market. Listings for September availability begin appearing from mid-July onwards.

**60 days out (early August)**: reach out to operators and hunters. This is when landlords and agencies have the most accurate information on September availability.

**45 days out (mid-August)**: place a hold on the best properties. Good furnished apartments for September are often reserved between 30 and 45 days before the move-in date.

**30 days out (mid-August)**: sign and pay the deposit. For a September 1st move-in.

**If you are still abroad**: a property hunter can visit on your behalf and send video walkthroughs, allowing you to decide with confidence from a distance.

## What not to do

**Arrive in Tokyo before confirming housing.** In September, with less supply than spring, good properties move quickly once a tenant can visit immediately. Arriving without confirmed housing typically means 2 to 4 weeks of hotel at 80,000 to 150,000 JPY.

**Search only on public portals.** Suumo and Homes show only part of the market. Off-market properties, circulating through professional networks, often represent the best opportunities, especially in lower-demand periods when landlords accept working with intermediaries to avoid vacancy.

**Overlook furnished apartments.** For a September arrival, a [furnished apartment with no guarantor](/en/blog/furnished-apartment-tokyo-no-guarantor) is often the optimal solution: immediate setup, no furniture costs, English contract, and access to properties available on very short timelines.

## Spring vs autumn: at a glance

| Factor | March-April (spring) | August-September (autumn) |
|---|---|---|
| Demand level | Very high | Moderate |
| Available supply | Maximum | Restricted |
| Competition per property | 5+ applicants | 1-2 applicants |
| Negotiation room | Low | Good |
| Decision time expected | 24-48 hours | 3-5 days |
| Property condition | Variable | Often refreshed in summer |

## Our service for September arrivals

We have direct visibility into properties available for the September intake in Tokyo, including no-guarantor furnished apartments accessible to foreigners and share houses with immediate availability.

A 30-minute consultation is enough to review what is available in your budget and target neighbourhood, before you even fly to Japan.


For health coverage upon your September arrival, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment, activatable before Japanese national insurance enrolment. *(affiliate link)*
---

*See also: [How to Find an Apartment in Tokyo as a Foreigner (2026 Guide)](/blog/find-apartment-tokyo-foreigner), [How to Find an Apartment in Tokyo from Abroad (Remote Hunting Guide)](/blog/tokyo-apartment-hunting-from-abroad), [Student Housing in Tokyo for October Intake: Share House vs University Dorm](/blog/student-housing-tokyo-october).*

*Arriving in Tokyo in September? Book a free consultation now to see current availability and secure your housing before you land.*
    `.trim(),
  },
  {
    slug: 'appartement-meuble-tokyo-expats',
    locale: 'fr',
    title: 'Appartement meublé Tokyo expatriés : 5 options rapides 2026',
    description: 'Arrivée à Tokyo en octobre ? Comparatif share house, monthly mansion, serviced apartment avec prix 2026 pour expatriés qui ont besoin d\'un logement meublé vite.',
    date: '2026-06-21',
    readingTime: '8 min',
    content: `

![Fourchette de loyer mensuel par type de logement à Tokyo](/tokyo-housing-rent-range-fr.png "Share house 35k-90k vs location standard 60k-250k JPY")
## Trouver un appartement meublé à Tokyo rapidement : le guide pour expatriés

**Réponse rapide :** Un appartement meublé à Tokyo (monthly mansion) permet d'emménager vite, sans garant ni argent-clé, avec mobilier, électroménager et souvent internet inclus. Idéal pour les premiers mois d'un expatrié : comptez 90 000 à 250 000 JPY par mois selon la taille et le quartier. On candidate en ligne avec passeport et visa.

Vous arrivez à Tokyo en octobre, mutation professionnelle, nouveau poste, installation longue durée, et vous avez besoin d'un logement **meublé et disponible sous 48h**. Les procédures japonaises standard (garant, hanko, caution) prennent 3 à 6 semaines. Ces 5 options les contournent. Pour comprendre comment fonctionne la location meublée à Tokyo, commencez par notre [guide complet des appartements meublés à Tokyo](/fr/blog/guide-appartements-meubles-tokyo).

## 1. Share houses spécialisées expatriés

Les réseaux de share houses spécialisés expatriés proposent des chambres et studios meublés disponibles sans garant japonais.

Avantages :
- Zéro garant japonais : dépôt de 1 à 2 mois
- Tout inclus : meubles, literie, wifi, eau, électricité
- Durée flexible : minimum 1 mois, renouvellement mensuel
- Couverture : toutes les lignes principales (Yamanote, Chuo, Keio, Tokyu)

Prix typiques : 45 000 à 80 000 ¥/mois selon la chambre et le quartier.

Idéal pour : premières semaines au Japon, budget serré, pas de meubles à transporter.

## 2. Monthly mansions (マンスリーマンション)

Les monthly mansions sont des appartements privés loués au mois, déjà équipés : cuisine, machine à laver, TV. Contrairement aux share houses, vous disposez de votre propre espace.

Les monthly mansions sont disponibles dans tous les quartiers centraux de Tokyo, réservation possible en quelques heures.

- Disponibilité : parfois sous 24h
- Surface : studios de 20 à 35 m² typiquement
- Prix : 100 000 à 200 000 ¥/mois selon le quartier
- Durée minimum : souvent 7 jours, idéal pour tester un quartier avant de s'engager

Quartiers recommandés pour expatriés : Shinjuku, Minato, Shibuya, Nakameguro, Shin-Koenji.

## 3. Serviced apartments pour missions corporate

Si votre entreprise prend en charge le logement, les serviced apartments combinent confort hôtelier et espace privatif :

- Oakwood Residence (Akasaka, Azabudai)
- Tokyo Serviced Apartments (Minato, Shinjuku)
- Citadines (Shinjuku, Asakusa)

Prix : 250 000 à 500 000 ¥/mois. Inclut souvent ménage hebdomadaire et conciergerie bilingue. Adapté aux contrats de 3 à 12 mois.

## 4. Weekly mansions pour votre première semaine

Vous arrivez sans logement confirmé ? Les weekly mansions acceptent une réservation sur passeport seul, dès le jour de votre arrivée, le temps de chercher une solution long terme.

Tarif typique : 25 000 à 50 000 ¥/semaine pour un studio.

Les weekly mansions acceptent la réservation par passeport uniquement, sans dossier préalable.

Avantage stratégique : vous pouvez visiter physiquement des appartements standard depuis Tokyo, ce qui améliore nettement vos chances d'obtenir un bail classique.

## 5. Appartements "gaikokujin-muke" (外国人向け)

Depuis 2020, une catégorie d'appartements conçus pour étrangers s'est développée sur les portails japonais, avec le filtre 「外国人可」. Ces logements peuvent être meublés ou non, mais l'agence maîtrise les démarches pour non-résidents.

Partenaires : Able, Sumifu et d'autres agences spécialisées en logement pour étrangers.

## Comparatif rapide

| Situation | Option recommandée | Budget mensuel |
|-----------|-------------------|----------------|
| Arrivée en urgence (moins de 7 jours) | Weekly mansion | 25 à 50k ¥/semaine |
| Installation 1 à 3 mois | Share house | 45 à 80k ¥ |
| Budget moyen, seul | Monthly mansion | 100 à 150k ¥ |
| Couple ou famille | Monthly mansion ou gaikokujin-muke | 150 à 250k ¥ |
| Mission corporate | Serviced apartment | 250k ¥ et plus |

## Le pic d'octobre : ce que les agences ne disent pas

En septembre-octobre, les mutations d'entreprises japonaises et les entrées en poste du second semestre créent une forte concurrence sur les logements disponibles. Les meilleures chambres de share houses et les studios monthly mansion partent en quelques heures après mise en ligne.

Si vous arrivez en octobre, réservez votre premier logement, même temporaire,**au moins 3 semaines avant votre arrivée**. La plupart des share houses acceptent les paiements par carte bancaire internationale à distance.

## Questions fréquentes

**Peut-on louer un appartement meublé à Tokyo sans résidence au Japon ?**

Oui, pour les share houses et monthly mansions. Le passeport suffit à l'entrée. Pour un bail standard, vous aurez besoin de votre numéro de résidence (obtenu à la mairie après votre installation).

**Faut-il un garant japonais ?**

Non pour les share houses et monthly mansions. Oui pour un bail classique. Nous pouvons vous orienter vers des appartements avec garantie alternative (J-Trust, Global Trust Networks).

**Peut-on visiter à distance avant d'arriver ?**

Oui. La majorité des share houses proposent des visites virtuelles via Zoom. Les principaux opérateurs spécialisés expatriés disposent d'équipes anglophones, et certains ont des interlocuteurs francophones.


Pour votre couverture sante pendant la transition, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement, ideale pour la periode entre l'arrivee et l'inscription a l'assurance nationale. *(lien affilie)*
---

*À lire aussi : [Appartement meublé à Tokyo sans garant : comment trouver en 2026](/blog/appartement-meuble-tokyo-sans-garant), [Appartement meublé à Tokyo : les 5 meilleures options pour expatriés (2026)](/blog/appartement-meuble-tokyo-expats-top-5).*

*Vous arrivez à Tokyo prochainement ? [Contactez-nous](/contact) pour qu'on vous oriente vers les options adaptées à votre budget et votre quartier cible.*
    `.trim(),
  },
  {
    slug: 'furnished-apartment-tokyo-expats',
    locale: 'en',
    title: 'Furnished Apartment in Tokyo for Expats: 5 Quick Options (2026)',
    description: 'Relocating to Tokyo for Q4? Compare share houses, monthly mansions and serviced apartments with 2026 price ranges and availability tips for expats arriving fast.',
    date: '2026-06-21',
    readingTime: '8 min',
    content: `
## Furnished Housing in Tokyo: What Expats Actually Need to Know

**Quick answer:** A furnished apartment in Tokyo (monthly mansion) lets you move in fast, with no guarantor and no key money, and furniture, appliances and often internet included. It is ideal for an expat's first months: expect 90,000 to 250,000 JPY per month depending on size and ward. You apply online with a passport and visa.

Relocating to Tokyo, corporate transfer, new job, long-term move, means facing one of the tightest rental markets in the developed world. Standard Japanese leases require a guarantor, hanko, and 3 to 6 weeks of processing. These 5 options bypass all that. For how furnished rentals actually work in Tokyo, start with our [complete guide to furnished apartments in Tokyo](/en/blog/furnished-apartments-tokyo-guide).

## 1. Expat-friendly share houses

Expat-specialist share house networks offer furnished rooms and studios for foreigners, with no Japanese guarantor required.

Key advantages:
- No Japanese guarantor: a deposit of 1 to 2 months is enough
- All-inclusive: furniture, bedding, wifi, all utilities
- Flexible terms: minimum 1 month, renewable monthly
- Coverage: all major lines (Yamanote, Chuo, Keio, Tokyu)

Typical price range: ¥45,000 to ¥80,000 per month depending on room type and location.

Best for: first weeks in Japan, tight budget, no furniture to ship.

## 2. Monthly mansions (マンスリーマンション)

Monthly mansions are private fully-equipped apartments rented by the month, kitchen, washing machine, TV all included. Unlike share houses, you have complete privacy.

Monthly mansions are available across all central Tokyo neighbourhoods, bookable within hours.

- Availability: sometimes within 24 hours of booking
- Size: typically 20 to 35 m² studios
- Price: ¥100,000 to ¥200,000 per month depending on neighbourhood
- Minimum stay: usually 7 days, useful for testing an area before committing to a long lease

Popular expat neighbourhoods: Shinjuku, Minato, Shibuya, Nakameguro, Shin-Koenji.

## 3. Serviced apartments for corporate relocations

If your company covers accommodation, serviced apartments combine hotel-level comfort with apartment space:

- Oakwood Residence (Akasaka, Azabudai)
- Tokyo Serviced Apartments (Minato, Shinjuku)
- Citadines (Shinjuku, Asakusa)

Price: ¥250,000 to ¥500,000 per month depending on size. Usually includes weekly housekeeping and bilingual concierge. Suited to 3 to 12 month corporate contracts.

## 4. Weekly mansions for your first days

Arriving without confirmed housing? Weekly mansions accept passport-only bookings so you can check in on arrival day while searching for a longer-term solution.

Typical rate: ¥25,000 to ¥50,000 per week for a studio.

Weekly mansions accept passport-only bookings with no prior paperwork required.

Strategic advantage: being in Tokyo lets you physically visit standard apartments, which substantially increases your chances of securing a regular lease.

## 5. Foreigner-friendly apartments (外国人向け)

Since 2020, a growing category of foreigner-ready listings has appeared on Japanese property portals, searchable with the filter 「外国人可」. These may be furnished or unfurnished but the agency handles paperwork for non-residents.

Key partners: Able, Sumifu, and other agencies specialising in foreigner-friendly housing.

## Quick comparison

| Situation | Best option | Monthly budget |
|-----------|-------------|----------------|
| Urgent arrival (under 7 days) | Weekly mansion | ¥25k to 50k per week |
| Stay of 1 to 3 months | Share house | ¥45k to 80k |
| Mid-range budget, solo | Monthly mansion | ¥100k to 150k |
| Couple or family | Monthly mansion or gaikokujin-muke | ¥150k to 250k |
| Corporate relocation | Serviced apartment | ¥250k and above |

## The October crunch: what agencies don't tell you

October and early Q4 are peak relocation periods. Japanese companies process mid-year staff transfers, and foreign executives arrive ahead of the November-March fiscal cycle. The best share house rooms and monthly mansion studios rent within hours of listing.

If you are arriving in October, reserve your first accommodation, even temporary,**at least 3 weeks before landing**. Most share houses accept international card payments and remote booking.

## FAQ

**Can I rent a furnished apartment in Tokyo without Japanese residency?**

Yes, for share houses and monthly mansions, your passport is enough on arrival. For a standard lease, you will need your residence registration number, obtained at your local ward office after arrival.

**Do I need a Japanese guarantor?**

Not for share houses or monthly mansions. Yes for a standard lease. We can connect you with apartments that accept alternative guarantors such as J-Trust or Global Trust Networks.

**Can I view the property before arriving?**

Yes. Most share houses offer virtual tours via Zoom. The main expat-specialist operators have English-speaking staff, and some also have French speakers.


For health coverage during your transition, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment, ideal for the period between arrival and national insurance enrolment. *(affiliate link)*
---

*See also: [Furnished Apartments in Tokyo With No Guarantor Required (2026)](/blog/furnished-apartment-tokyo-no-guarantor), [Furnished Apartment Tokyo: 5 Best Options for Expats in 2026](/blog/furnished-apartment-tokyo-top-5-expats).*

*Relocating to Tokyo soon? [Contact us](/contact) for a current availability list matching your budget and target neighbourhood.*
    `.trim(),
  },
  {
    slug: 'transport-tokyo-expatrie-guide',
    locale: 'fr',
    title: 'Transport à Tokyo : guide complet pour expatriés 2026',
    description: 'Métro, JR, carte Suica et applications : tout ce que les expatriés doivent savoir pour se déplacer à Tokyo et choisir leur quartier selon leur trajet.',
    date: '2026-06-21',
    readingTime: '8 min',
    content: `
## Transports à Tokyo : métro, JR et tout ce qu'il faut savoir

**Réponse rapide :** Tokyo se déplace surtout en train et métro (JR, Tokyo Metro, Toei). Prenez une carte rechargeable Suica ou PASMO pour tout payer d'un tap. Si vous faites le même trajet domicile-travail, un abonnement (teiki) est très rentable et souvent remboursé par l'employeur. Le vélo est pratique en quartier résidentiel ; le taxi reste cher.

Se déplacer à Tokyo ne demande pas de voiture. Le réseau est l'un des plus ponctuels au monde, avec un retard moyen inférieur à 60 secondes. Pour un expatrié qui arrive, la superposition des lignes et des opérateurs peut sembler complexe. Ce guide clarifie l'essentiel.

## Le métro Tokyo : deux réseaux, une seule carte

Tokyo compte deux réseaux de métro distincts.

**Tokyo Metro** opère 9 lignes : Ginza, Marunouchi, Hibiya, Namboku, Fukutoshin, Chiyoda, Yurakucho, Hanzomon et Tozai. C'est le réseau le plus étendu, couvrant l'essentiel des arrondissements centraux.

**Toei Subway** opère 4 lignes : Asakusa, Mita, Shinjuku et Oedo. La ligne Oedo est utile pour Roppongi, Shiodome et Shinjuku.

Les deux réseaux acceptent la même carte Suica ou Pasmo. Un trajet combinant les deux coûte légèrement plus cher qu'un trajet sur un seul réseau. Fréquence aux heures de pointe : 2 à 5 minutes. Amplitude : 5h00 à 0h30 environ.

## Les lignes JR : la colonne vertébrale de Tokyo

**JR Yamanote Line** : boucle circulaire reliant les 30 principales gares (Shinjuku, Shibuya, Harajuku, Ebisu, Osaki, Shinagawa, Tokyo, Akihabara, Ueno, Ikebukuro). Comprendre la Yamanote, c'est comprendre la géographie de Tokyo.

**JR Chuo / Sobu Line** : axe est-ouest depuis Tokyo Station vers Nakano, Koenji, Asagaya, Mitaka. Idéale pour les familles cherchant plus d'espace à prix modéré.

**JR Keihin-Tohoku Line** : axe nord-sud depuis Omiya vers Kawasaki et Yokohama.

**JR Saikyo Line** : relie Shibuya et Shinjuku à Ikebukuro et Omiya.

## La carte Suica : votre seul outil de paiement

La Suica (ou Pasmo, techniquement identique) est une carte rechargeable sans contact qui fonctionne sur l'ensemble du réseau : tous les métros et lignes JR, la majorité des bus, les taxis, les konbini (Seven-Eleven, FamilyMart, Lawson) et les distributeurs en gare.

Pour l'obtenir : guichet automatique dans n'importe quelle gare JR, ou version mobile sur iPhone via l'app Suica. Dépôt initial de 500 ¥ (remboursable). Il n'existe pas d'abonnement mensuel illimité généraliste à Tokyo. Les teiki-ken (passes trajet fixe) sont liés à un itinéraire précis et souvent pris en charge par l'employeur.

## Choisir son quartier selon son lieu de travail

| Bureau dans... | Quartiers recommandés | Ligne directe |
|---------------|----------------------|---------------|
| Marunouchi / Tokyo Stn | Yotsuya, Koenji, Ichigaya | JR Chuo Line |
| Shinjuku | Nakano, Koenji, Asagaya | JR Chuo Line |
| Shibuya | Nakameguro, Daikanyama, Shimokitazawa | Tokyu Toyoko |
| Roppongi / Minato | Azabu-Juban, Hiroo | Hibiya / Namboku |
| Akihabara | Ueno, Asakusa, Okachimachi | JR Yamanote |

Règle générale : évitez les trajets avec plus de deux correspondances. Trois changements quotidiens représentent une fatigue réelle sur le long terme, même si le temps total reste inférieur à 45 minutes.

## Applications indispensables

**Google Maps** : itinéraires multimodaux en temps réel, coût exact du trajet inclus. La référence pour les expatriés.

**Tokyo Subway Navigation** (app officielle Tokyo Metro) : bilingue, minutages précis, mode hors ligne disponible.

**Yahoo! Loco** : favori local pour les itinéraires alternatifs et les alertes de perturbations en temps réel.

**Suica app** : gestion de votre Suica mobile et recharge à distance depuis n'importe où dans le monde.

## Vélo, bus et retours nocturnes

Le **vélo** est pratique pour les courts trajets. Docomo Bike Share (vélos rouges) couvre les 23 arrondissements centraux, location à la journée ou abonnement mensuel (environ 3 000 ¥). Des zones de stationnement gratuites existent près de la plupart des gares.

Les **bus Toei** couvrent les zones peu desservies par le métro. Paiement Suica. Moins ponctuels que le métro mais utiles en complément.

Après le dernier métro (0h30 environ), les **taxis** sont disponibles partout. Tarif de base : 730 ¥, puis 90 ¥ par 268 m. Un trajet Shibuya-Shinjuku de nuit revient à environ 1 500 ¥. Tokyo est très sûre la nuit : marcher 15 minutes depuis une gare est courant.

## Questions fréquentes

**Y a-t-il un pass illimité pour les premières semaines ?**

La Tokyo Subway Ticket (24h/48h/72h) couvre les 13 lignes de métro pour 800, 1 200 ou 1 500 ¥. Disponible à l'aéroport. Utile avant d'obtenir une Suica permanente.

**Le JR Pass couvre-t-il le réseau intra-Tokyo ?**

Le JR Pass national couvre les lignes JR (Yamanote, Chuo, Keihin-Tohoku) mais pas les lignes Tokyo Metro ni Toei. La Suica reste indispensable en complément.


Pour decouvrir Tokyo lors de vos premiers trajets, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) propose des visites guidees et experiences culturelles reservables en ligne. Pour lire les panneaux et annonces en japonais, [iTalki](https://www.italki.com/affshare?ref=af32660342) propose des cours avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*
---

*Prêt à choisir votre quartier ? Notre guide des [quartiers Tokyo pour expatriés](/blog/quartiers-tokyo-expatries-guide) compare les principales zones par ligne, budget et ambiance internationale. Pour la recherche d'appartement, lisez notre [guide complet de location à Tokyo](/blog/trouver-appartement-tokyo-etranger).*
    `.trim(),
  },
  {
    slug: 'carte-sim-japon-etranger-2026',
    locale: 'fr',
    title: 'Carte SIM Japon étranger 2026 : quel forfait choisir ?',
    description: 'IIJmio, ahamo ou povo2.0 : comparatif des meilleures cartes SIM et forfaits mobiles au Japon pour les expatriés et nouveaux arrivants. Tarifs 2026 mis à jour.',
    date: '2026-06-21',
    readingTime: '7 min',
    content: `
## Quelle carte SIM choisir en arrivant au Japon en 2026 ?

**Réponse rapide :** À l'arrivée au Japon, une SIM ou eSIM prépayée data (activable sans justificatif de domicile) vous connecte immédiatement. Pour un forfait complet avec appels et numéro japonais, il faut généralement une carte de résidence et parfois un compte bancaire. Des opérateurs pensés pour les étrangers proposent des forfaits sans My Number, disponibles dès l'aéroport.

Entre les SIM prépayées disponibles à l'aéroport, les eSIM activables depuis la France et les forfaits long terme des opérateurs virtuels, le choix est large. Voici comment s'y retrouver rapidement.

## Les 3 types de forfaits mobiles au Japon

**SIM prépayée data-only (arrivée et court séjour)**

Disponible à l'aéroport (Narita, Haneda) ou sur Amazon Japan. Pas d'appels voix inclus. Idéale pour les premières semaines avant d'ouvrir un forfait résident.

Opérateurs : IIJmio Tourist, B-Mobile, JAPAN TRAVEL SIM, eConnect Japan.

Tarifs typiques : 2 000 à 4 500 ¥ pour 15 à 30 jours (3 à 20 Go).

**Forfaits MVNO long terme (résidents)**

Pour les résidents avec une carte de séjour et une adresse enregistrée à la mairie. Appels voix inclus en option.

Opérateurs : IIJmio, OCN Mobile One, mineo, NURO Mobile.

Prix : 850 à 3 000 ¥/mois selon le volume de données. Le moins cher du marché.

**Sub-marques des opérateurs principaux**

Les sous-marques discount de Docomo, SoftBank et KDDI offrent des forfaits 20 Go à prix fixe compétitif.

- ahamo (NTT Docomo) : 20 Go pour 2 970 ¥/mois.
- LINEMO (SoftBank) : 20 Go pour 2 728 ¥/mois ou mini 3 Go à 990 ¥/mois.
- povo2.0 (KDDI/au) : base à 0 ¥/mois, puis packs de données à la carte.

## Comparatif 2026 : quelle SIM pour quel profil ?

| Profil | Option recommandée | Prix approximatif |
|--------|-------------------|-------------------|
| Arrivée récente, moins d'un mois | IIJmio Tourist 30 jours | 4 000 ¥ |
| Sans adresse fixe encore | povo2.0 base 0 ¥ + packs | 330 ¥ par Go |
| Résident, budget minimal | IIJmio 2 Go | 850 ¥/mois |
| Résident, usage data moyen | ahamo 20 Go | 2 970 ¥/mois |
| Famille avec plusieurs lignes | IIJmio tarif famille | Remise par ligne |

## Comment obtenir une SIM à votre arrivée ?

**Option 1 : eSIM avant le départ**

La solution la plus pratique si votre téléphone est compatible. Vous activez la SIM depuis la France avant d'atterrir. Compatibilité : iPhone XS et versions suivantes, la plupart des Android depuis 2019. Le téléphone doit être débloqué. Opérateurs eSIM Japan : IIJmio Tourist, Airalo, Ubigi.

**Option 2 : SIM physique à l'aéroport**

Des kiosques IIJmio, B-Mobile et Sakura Mobile sont présents dans les terminaux d'arrivée de Narita (T1/T2/T3) et Haneda (T3). Munissez-vous de votre passeport. Horaires : 7h00 à 23h00 environ.

**Option 3 : commande en ligne après installation**

Une fois votre adresse enregistrée à la mairie et votre zairyu card obtenue, commandez directement sur le site de l'opérateur. Délai de livraison : 2 à 5 jours ouvrés. La plupart des MVNO acceptent les cartes bancaires étrangères.

## Appels voix et appels internationaux

La majorité des SIM prépayées n'incluent pas les appels voix. Pour vos communications :

- **Appels vers la France** : LINE (gratuit entre utilisateurs), WhatsApp ou Skype sont la norme chez les expatriés.
- **Appels voix locaux** (agences, banques, mairie) : optez pour un forfait MVNO avec voix incluse. IIJmio et mineo proposent des options voix à 550 à 880 ¥/mois supplémentaires.
- **Numéros spéciaux** : les 0120- (numéros gratuits) sont accessibles depuis les mobiles. Les 0570- (Navi-dial) peuvent générer des frais.

## Débloquer votre téléphone avant de partir

Les téléphones achetés chez Orange, SFR, Bouygues ou Free sont déverrouillables gratuitement depuis la loi de 2018. Contactez votre opérateur avant de partir. Un téléphone verrouillé ne reconnaîtra pas une SIM japonaise.

Les iPhone achetés en Apple Store sans abonnement sont généralement déjà déverrouillés.

Bandes de fréquences à vérifier : B1, B3, B19 pour Docomo (IIJmio / ahamo) ; B1, B3, B8 pour SoftBank (LINEMO). Les smartphones européens récents couvrent ces bandes sans problème.

## Questions fréquentes

**Ai-je besoin d'une adresse japonaise pour un forfait long terme ?**

Oui, pour les forfaits résidents. Utilisez une SIM prépayée pour les premières semaines, puis passez à un forfait résident une fois votre carte de séjour obtenue et votre adresse enregistrée à la mairie.

**Mon téléphone français fonctionnera-t-il au Japon ?**

Oui, s'il est débloqué. Vérifiez les bandes LTE mentionnées ci-dessus. Les modèles récents (iPhone 12+, Samsung Galaxy S21+, Pixel 6+) sont compatibles sans problème.


Pour votre carte SIM au Japon, [Sakura Mobile](https://www.sakuramobile.jp/tokyoexpat-top) propose des forfaits prepaye et postpaye sans justificatif de domicile, disponibles des l'arrivee a l'aeroport et utilisables par les etrangers sans numero My Number. *(lien affilie)*
---

*Pour l'internet fixe dans votre appartement, notre guide sur [l'internet et les utilitaires à Tokyo](/blog/internet-utilitaires-tokyo-appartement) détaille les démarches étape par étape. Pour toutes les démarches d'installation, consultez notre [checklist de déménagement au Japon](/blog/demenager-japon-checklist-complete).*
    `.trim(),
  },
  {
    slug: 'impots-revenus-japon-expatrie-2026',
    locale: 'fr',
    title: 'Impôts au Japon pour expatrié : guide complet 2026',
    description: 'Barème fiscal, déclaration kakutei shinkoku et deadline du 15 mars : guide complet sur les impôts sur le revenu au Japon pour les résidents étrangers en 2026.',
    date: '2026-06-21',
    readingTime: '9 min',
    content: `
## Impôts sur le revenu au Japon : ce que les expatriés doivent savoir

**Réponse rapide :** Au Japon, l'impôt sur le revenu est prélevé à la source pour les salariés, avec une régularisation annuelle (nenmatsu chosei) faite par l'employeur. Votre statut de résidence fiscale détermine ce qui est imposable. Ajoutez la taxe de résidence locale (~10%), prélevée l'année suivante. Une déclaration (kakutei shinkoku) peut être requise selon votre situation.

Le système fiscal japonais est rarement documenté en français. Pourtant, si vous résidez au Japon, vous êtes imposable, et la déclaration annuelle est obligatoire dans la majorité des cas. Ce guide explique les fondamentaux.

## Qui est imposable au Japon ?

Votre statut fiscal dépend de votre durée de résidence au Japon.

**Résident non permanent (moins de 5 ans au Japon sur les 10 dernières années)**

Vous n'êtes imposable que sur vos revenus de source japonaise, et sur les revenus étrangers effectivement transférés au Japon. Les revenus étrangers laissés à l'étranger ne sont pas imposés. C'est le statut de la grande majorité des expatriés durant leurs premières années.

**Résident permanent fiscal (plus de 5 ans au Japon sur les 10 dernières années)**

Vous êtes imposable sur l'ensemble de vos revenus mondiaux, quel que soit leur pays d'origine.

**Non-résident**

Vous ne séjournez pas au Japon de manière continue. Imposable uniquement sur les revenus de source japonaise.

## Le barème de l'impôt sur le revenu 2026

L'impôt sur le revenu au Japon est progressif. À l'impôt national s'ajoute un impôt local (住民税, juminzei) de 10%, prélevé l'année suivante.

| Revenu imposable annuel (¥) | Taux national |
|---------------------------|---------------|
| Jusqu'à 1 950 000 | 5% |
| 1 950 001 à 3 300 000 | 10% |
| 3 300 001 à 6 950 000 | 20% |
| 6 950 001 à 9 000 000 | 23% |
| 9 000 001 à 18 000 000 | 33% |
| 18 000 001 à 40 000 000 | 40% |
| Plus de 40 000 000 | 45% |

Pour un salaire de 6 000 000 ¥/an (environ 36 000 EUR), le taux effectif combiné national + local est d'environ 22 à 25%.

## Quand et comment déclarer ?

La déclaration de revenus (確定申告, kakutei shinkoku) se dépose chaque année du 16 février au 15 mars pour les revenus de l'année précédente.

**Si votre employeur japonais retient l'impôt à la source (gensen choshū)**, vous n'avez pas toujours besoin de faire une déclaration complète. Votre employeur vous remet un certificat de retenue à la source (源泉徴収票) en décembre ou janvier. Vérifiez avec votre RH.

**Vous devez déclarer si** vous avez des revenus complémentaires : activité freelance, revenus fonciers étrangers, revenus de placements non japonais, ou si vous avez travaillé pour plusieurs employeurs.

**Via MyPortal** (mynaportal.go.jp) : déclaration en ligne depuis 2021. Nécessite un numéro My Number et une carte My Number avec puce. Certains bureaux des impôts proposent des créneaux bilingues.

**En personne** : le bureau des impôts (税務署, zeimusho) de votre arrondissement accepte les dossiers papier. Plusieurs bureaux à Tokyo ont des guichets dédiés aux étrangers avec assistance en anglais.

## Le juminzei : la taxe résidentielle

Le juminzei (住民税) est la taxe locale prélevée par votre commune et votre préfecture. Taux fixe : 10% du revenu imposable (6% communal + 4% préfectoral).

Elle est calculée sur les revenus de l'année N et facturée en juin de l'année N+1. Cela crée un décalage à anticiper lors de votre première année au Japon : vous payez le juminzei de l'année 1 lors de votre deuxième année.

## Convention fiscale France-Japon

La France et le Japon ont signé une convention bilatérale qui prévient la double imposition. Si vous êtes résident fiscal au Japon et avez payé des impôts japonais sur vos revenus, la France vous accorde un crédit d'impôt équivalent.

Important : même si vous ne devez pas d'impôt en France, vous devez continuer à déclarer votre situation si vous avez des liens fiscaux français (comptes bancaires, biens immobiliers en France). Contactez le Centre des Impôts des Non-Résidents (CINR) pour votre situation personnelle.

## Principales déductions disponibles

- Cotisations sociales (shakai hoken) : entièrement déductibles.
- Frais médicaux supérieurs à 100 000 ¥/an : déductibles au-delà de ce seuil.
- Dons à des organisations reconnues (dont furusato nozei).
- Intérêts d'emprunt immobilier pour un achat au Japon.
- Déduction forfaitaire de base : 480 000 ¥ pour la majorité des contribuables.

## Questions fréquentes

**Mon employeur japonais gère-t-il tout ?**

En grande partie oui pour les salariés en CDI japonais. Mais vérifiez avec votre RH si une déclaration complémentaire est requise, notamment si vous avez des revenus étrangers.

**Que se passe-t-il si je quitte le Japon en cours d'année ?**

Vous devez déposer une déclaration de revenus avant de partir, ou désigner un mandataire fiscal (zeirishi). Votre employeur peut également réaliser un ajustement de fin d'année selon les cas.

**Le furusato nozei (ふるさと納税) est-il accessible aux étrangers ?**

Oui, à condition de payer le juminzei au Japon. C'est un système de dons aux municipalités qui vous retourne des cadeaux locaux et réduit votre taxe résidentielle. Plafond calculé sur vos revenus de l'année précédente.


Pour votre couverture sante en tant qu'expatrie au Japon, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement, activable avant l'assurance nationale japonaise. *(lien affilie)*
---

*Pour les autres démarches administratives de votre installation, consultez notre [checklist de déménagement au Japon](/blog/demenager-japon-checklist-complete) et notre guide sur [l'assurance maladie au Japon pour expatriés](/blog/assurance-maladie-japon-expatrie).*
    `.trim(),
  },
  {
    slug: 'internet-utilitaires-tokyo-appartement',
    locale: 'fr',
    title: 'Internet et utilitaires à Tokyo : guide expat 2026',
    description: 'Électricité, gaz, eau et internet fixe : démarches étape par étape pour ouvrir vos compteurs et choisir votre opérateur fibre à Tokyo en tant qu\'expatrié.',
    date: '2026-06-21',
    readingTime: '7 min',
    content: `
## Internet et utilitaires à Tokyo : toutes les démarches pour expatriés

**Réponse rapide :** À l'emménagement, mettez en service l'électricité, le gaz et l'eau (souvent un simple appel ou formulaire en ligne, parfois un rendez-vous pour le gaz). L'internet fibre prend 2 à 4 semaines à installer : prévoyez une SIM data en attendant. Gardez votre carte de résidence et un compte bancaire pour les prélèvements automatiques.

Une fois les clés de votre appartement en main, quatre services sont à ouvrir ou à souscrire : l'électricité, le gaz, l'eau et l'internet. La bonne nouvelle : la plupart s'effectuent en ligne ou par formulaire bilingue, et les délais sont courts. Voici comment procéder.

## Électricité : ouvrir le compteur en ligne

L'électricité à Tokyo est fournie par **TEPCO** (Tokyo Electric Power Company). Vous n'avez pas le choix du fournisseur dans la zone métropolitaine.

Démarche : rendez-vous sur le site de TEPCO (kurashi.tepco.co.jp) et remplissez le formulaire de mise en service. Informations nécessaires : date d'emménagement, numéro de compteur (étiquette dans l'appartement ou sur le tableau électrique), coordonnées et adresse.

Le formulaire est en japonais avec aide en anglais. Vous pouvez aussi appeler le 0120-995-113 (options en anglais disponibles).

Délai : mise en service instantanée si l'ancien locataire a correctement résilié. Sinon, un technicien passe sous 1 à 3 jours.

Facturation : mensuelle par prélèvement ou en konbini. Forfait de base environ 300 à 400 ¥/mois, puis facturation au kWh.

## Gaz : selon votre type d'appartement

Le gaz n'est présent que si votre appartement est équipé d'une cuisinière à gaz ou d'un chauffe-eau à gaz. De nombreux appartements modernes fonctionnent entièrement à l'électricité (plaque IH + chauffe-eau électrique) et ne nécessitent pas d'abonnement gaz.

Si vous avez le gaz, le fournisseur est **Tokyo Gas** (tokyogas.co.jp). La mise en service nécessite la présence d'un technicien. Prenez rendez-vous via le site ou le 03-3433-7111 (options en anglais disponibles). Délai : 3 à 7 jours ouvrés.

Vérifiez avec votre agence si votre appartement est gaz ou IH avant d'acheter une cuisinière.

## Eau : automatique dans la majorité des cas

L'eau (水道, suidō) est gérée par le Bureau métropolitain de l'eau de Tokyo. Dans la plupart des appartements modernes, le compteur est activé automatiquement lors de la mise en service du bail par votre agence ou propriétaire.

Si ce n'est pas le cas, contactez le Bureau de l'eau au 03-5326-1101 (anglais disponible).

Facturation : bimestrielle. Montant moyen pour un studio : 1 000 à 2 500 ¥ par bimestre.

## Internet fixe : quel fournisseur choisir ?

L'internet fixe au Japon (hikari, fibre optique) est parmi les plus rapides et les moins chers au monde. Le processus se fait en deux étapes : choisir l'infrastructure réseau (souvent NTT Flets), puis un fournisseur internet (ISP) qui loue ce réseau.

Principaux opérateurs fibre à Tokyo :

- **NTT Flets Hikari + ISP partenaire** : la combinaison la plus répandue. Flets coûte 5 500 à 6 000 ¥/mois, l'ISP ajoute 500 à 1 500 ¥/mois. Total : 6 000 à 7 500 ¥/mois.
- **SoftBank Hikari** : contrat unique simplifié, environ 5 500 ¥/mois.
- **NURO Hikari** : l'un des plus rapides (2 Gbps), 5 200 ¥/mois. Disponible dans les zones desservies.
- **au Hikari** : bonne couverture Tokyo, souvent proposé en bundle avec un forfait mobile KDDI.

Délai d'installation : 2 à 6 semaines selon la disponibilité du technicien. Prévoyez une solution de repli pour votre premier mois.

**En attendant la fibre** : utilisez votre carte SIM en mode partage de connexion (tethering) ou souscrivez un routeur 4G/5G portable (pocket WiFi) chez IIJmio, Rakuten ou SoftBank. Débit typique : 50 à 150 Mbps pour 2 500 à 4 000 ¥/mois.

## Récapitulatif par ordre de priorité

| Service | Délai habituel | Démarche |
|---------|---------------|----------|
| Électricité | Immédiat à 3 jours | Formulaire TEPCO en ligne |
| Eau | En général automatique | Appel si non ouvert à J+1 |
| Gaz | 3 à 7 jours ouvrés | Prise de RDV Tokyo Gas |
| Internet fixe | 2 à 6 semaines | Comparer les ISP puis commander |
| Mobile / SIM | Immédiat (eSIM) à 5 jours | Voir guide carte SIM Japon |

## Questions fréquentes

**Dois-je avoir une adresse enregistrée pour souscrire à internet ?**

Oui pour les contrats fibre. Une adresse japonaise officielle est requise. Pour les pocket WiFi, votre passeport suffit souvent.

**Les formulaires TEPCO et Tokyo Gas sont-ils disponibles en français ?**

Non, mais les formulaires en ligne sont relativement simples et des aides en anglais sont disponibles. En cas de difficulté, votre agence immobilière peut vous assister pour les premiers contacts.


Pour votre connexion mobile en attendant l'installation internet, [Sakura Mobile](https://www.sakuramobile.jp/tokyoexpat-top) propose des forfaits data sans justificatif de domicile, utilisables des l'arrivee au Japon. *(lien affilie)*
---

*Votre installation avance. Pour tout ce qui concerne la recherche d'appartement en amont, lisez notre [guide de location à Tokyo pour étrangers](/blog/trouver-appartement-tokyo-etranger). Pour votre forfait mobile, consultez notre [comparatif des cartes SIM au Japon](/blog/carte-sim-japon-etranger-2026).*
    `.trim(),
  },
  {
    slug: 'travailler-tokyo-expatrie-guide-2026',
    locale: 'fr',
    title: 'Travailler à Tokyo en tant qu\'expatrié : guide 2026',
    description: 'Culture d\'entreprise japonaise, visa de travail, salaires et droits des salariés étrangers à Tokyo. Ce que les expatriés doivent savoir avant de commencer.',
    date: '2026-06-21',
    readingTime: '9 min',
    content: `
## Travailler à Tokyo en tant qu'expatrié : ce qu'il faut savoir avant de commencer

**Réponse rapide :** Travailler à Tokyo demande un visa de travail parrainé par un employeur, adapté à votre poste. Le marché recrute surtout dans la tech, la finance, l'enseignement des langues et les postes bilingues. Un bon niveau de japonais aide beaucoup, mais des postes existent en anglais. Préparez un CV au format japonais et visez les agences de recrutement spécialisées expatriés.

Que vous arriviez avec un contrat local ou en détachement international, le monde du travail à Tokyo présente des spécificités qui peuvent déstabiliser même les professionnels expérimentés. Ce guide décrit les éléments essentiels pour bien démarrer.

## Les types de visa de travail au Japon

Avant de travailler au Japon, vous avez besoin d'un visa approprié. Les plus courants pour les expatriés qualifiés sont :

**Visa Ingénieurs / Humanités / Services internationaux (技術・人文知識・国際業務)**

C'est le visa de travail le plus fréquent pour les profils techniques, commerciaux, marketing, enseignants de langue étrangère. Durée : 1, 3 ou 5 ans, renouvelable.

**Visa de direction d'entreprise (経営管理)**

Pour les fondateurs ou directeurs généraux. Conditions spécifiques sur le capital social et le nombre d'employés.

**Visa de professionnel hautement qualifié (高度専門職)**

Visa à points pour les profils très qualifiés. Avantage principal : résidence permanente accélérée (possible dès 1 à 3 ans selon le score).

**Visa Working Holiday**

Accord bilatéral France-Japon disponible pour les 18-30 ans. Permet de travailler jusqu'à 1 an sans contrat préalable.

Pour les détails sur les conditions et les démarches, consultez notre [guide des visas de travail pour francophones](/blog/visa-travail-japon-francophone-2026).

## La culture d'entreprise japonaise : les fondamentaux

**La ponctualité est non négociable**

Arriver à l'heure signifie arriver 5 minutes avant. Un retard, même de 3 minutes, est remarqué. Pour une réunion client, prévoyez d'arriver 10 à 15 minutes à l'avance.

**Le nemawashi (根回し)**

Les décisions importantes passent par une consultation informelle en amont. Avant une réunion formelle, il est courant de "vendre" votre idée individuellement à chaque partie prenante. Les réunions formelles servent souvent à valider, pas à débattre.

**Le meishi (名刺)**

L'échange de cartes de visite au début d'une réunion est un rituel. Présentez votre carte avec les deux mains, texte face à votre interlocuteur. Ne pliez jamais une carte reçue et ne la mettez pas directement dans votre poche.

**Les heures supplémentaires**

Les lois révisées de 2019 plafonnent les heures supplémentaires à 45h/mois. Les longues journées restent néanmoins la norme dans certains secteurs (banque, consulting, publicité). Vérifiez les clauses de votre contrat, en particulier la clause de travail discrétionnaire (sairyo rodo) qui peut affecter le calcul des heures sup.

## Salaires à Tokyo pour les expatriés en 2026

| Poste | Salaire brut annuel (¥) | Équivalent EUR approx. |
|-------|------------------------|----------------------|
| Ingénieur IT junior | 4 000 000 à 5 500 000 | 24 000 à 33 000 € |
| Ingénieur IT senior | 6 000 000 à 10 000 000 | 36 000 à 60 000 € |
| Marketing / Commercial | 4 500 000 à 7 000 000 | 27 000 à 42 000 € |
| Finance (banque) | 7 000 000 à 15 000 000 | 42 000 à 90 000 € |
| Enseignant de langue (ALT) | 2 800 000 à 3 600 000 | 17 000 à 22 000 € |

Les contrats de détachement international incluent généralement une prime d'expatriation, la prise en charge du logement et les frais de scolarité, ce qui dépasse largement les équivalents locaux.

## Cotisations sociales et avantages salariaux

Au Japon, les salariés paient des cotisations sociales (shakai hoken) couvrant : l'assurance maladie (kenko hoken), la retraite (nenkin) et l'assurance chômage (koyo hoken). Ces cotisations représentent environ 14 à 16% du salaire brut côté salarié.

L'assurance maladie couvre 70% des frais médicaux (ticket modérateur de 30%). Pour les détails, consultez notre guide sur [l'assurance maladie au Japon pour expatriés](/blog/assurance-maladie-japon-expatrie).

La plupart des entreprises japonaises remboursent les frais de transport (teiki-ken) jusqu'à 150 000 ¥/mois, et versent des bonus biannuels en juin et décembre représentant 1 à 4 mois de salaire selon la performance.

## Documents à préparer avant votre premier jour

1. Votre carte de résident (zairyu card), obtenue à l'aéroport ou à la mairie.
2. Votre numéro My Number, communiqué dans votre première notification fiscale.
3. Un compte bancaire japonais pour le versement du salaire. Voir notre guide [ouvrir un compte bancaire au Japon](/blog/ouvrir-compte-bancaire-japon-etranger).
4. Un certificat de résidence (juminhyo), disponible à la mairie de votre arrondissement.
5. Un tampon personnel (inkan) ou accord de signature pour les formulaires RH.

## Questions fréquentes

**Peut-on trouver un emploi à Tokyo sans parler japonais ?**

Oui, notamment dans les multinationales, les startups tech, les services financiers et l'enseignement. Le niveau de japonais requis varie fortement selon le secteur. En finance et IT dans des entreprises internationales, l'anglais suffit souvent au niveau opérationnel.

**Comment se passe la période d'essai au Japon ?**

Les contrats japonais incluent typiquement une période d'essai de 3 à 6 mois. Les droits des salariés sont protégés dès le premier jour par la loi japonaise du travail, y compris pendant la période d'essai.


Pour developper votre japonais professionnel, [iTalki](https://www.italki.com/affshare?ref=af32660342) propose des cours particuliers en ligne avec des professeurs natifs japonais, specialises dans le japonais des affaires, a partir de 10$/heure. *(lien affilie)*
---

*Pour trouver un logement proche de votre lieu de travail, notre [guide des quartiers Tokyo pour expatriés](/blog/quartiers-tokyo-expatries-guide) vous aide à choisir selon votre ligne de métro et votre budget. Pour les démarches administratives complètes, consultez notre [checklist de déménagement au Japon](/blog/demenager-japon-checklist-complete).*
    `.trim(),
  },
  {
    slug: 'tokyo-public-transport-expat-guide',
    locale: 'en',
    title: 'Tokyo Public Transport for Expats: Complete Guide 2026',
    description: 'Subway, JR lines, IC cards and travel apps: everything expats need to know to get around Tokyo and pick the right neighbourhood for their daily commute.',
    date: '2026-06-21',
    readingTime: '8 min',
    content: `
## Getting Around Tokyo: What Every Expat Needs to Know

**Quick answer:** Tokyo runs on trains and metro (JR, Tokyo Metro, Toei). Get a rechargeable Suica or PASMO card to tap through everything. If you commute the same route daily, a season pass (teiki) is very cost-effective and often reimbursed by your employer. Cycling is handy in residential areas; taxis stay expensive.

You do not need a car in Tokyo. The public transport network runs on average less than 60 seconds late, covers virtually every corner of the city, and costs a fraction of equivalent trips in other major capitals. The layered system of operators and lines looks complicated at first. This guide cuts through it.

## Two metro systems, one IC card

Tokyo has two separate metro networks run by different operators.

**Tokyo Metro** operates 9 lines: Ginza, Marunouchi, Hibiya, Namboku, Fukutoshin, Chiyoda, Yurakucho, Hanzomon, and Tozai. It covers most of the central wards and connects the major employment hubs.

**Toei Subway** operates 4 lines: Asakusa, Mita, Shinjuku, and Oedo. The Oedo line is particularly useful for reaching Roppongi, Shiodome, and Shinjuku.

Both networks use the same Suica or Pasmo IC cards. Cross-operator transfers cost slightly more than staying on one network. Peak frequency: 2 to 5 minutes. Operating hours: approximately 5:00 AM to 12:30 AM.

## JR Lines: the backbone of the city

**JR Yamanote Line**: the circular loop connecting Tokyo's 30 most important stations, Shinjuku, Shibuya, Harajuku, Ebisu, Osaki, Shinagawa, Tokyo, Akihabara, Ueno, Ikebukuro. If you understand this single line, you understand Tokyo's geography.

**JR Chuo / Sobu Line**: east-west corridor from Tokyo Station through Nakano, Koenji, Asagaya, Mitaka, and out to the suburbs. Popular with families who want more space at lower rents.

**JR Keihin-Tohoku Line**: north-south axis from Omiya through Akihabara and Tokyo down to Kawasaki and Yokohama.

**JR Saikyo Line**: connects Shibuya and Shinjuku to Ikebukuro and Omiya.

## Suica: the only payment tool you need

The Suica (or Pasmo, technically identical) is a prepaid contactless card that works across the entire Tokyo transport network and beyond.

It covers: all metro and JR lines in Greater Tokyo, most buses, taxis, convenience stores (Seven-Eleven, FamilyMart, Lawson), and station vending machines.

How to get one: any JR station ticket machine, or add Mobile Suica to your iPhone (foreign bank cards accepted for top-ups). Initial deposit: ¥500 (refundable). Note: there is no general unlimited monthly pass in Tokyo. Company commuter passes (teiki-ken) are fixed-route passes usually paid by employers.

## Choosing your neighbourhood based on your commute

| Office location | Best residential areas | Direct line |
|----------------|----------------------|-------------|
| Marunouchi / Tokyo Stn | Yotsuya, Koenji, Ichigaya | JR Chuo Line |
| Shinjuku | Nakano, Koenji, Asagaya | JR Chuo Line |
| Shibuya | Nakameguro, Daikanyama, Shimokitazawa | Tokyu Toyoko |
| Roppongi / Minato | Azabu-Juban, Hiroo | Hibiya / Namboku |
| Akihabara | Ueno, Asakusa, Okachimachi | JR Yamanote |

Key rule: avoid itineraries requiring more than two line changes. Three daily transfers adds up to real fatigue over months, even if the total commute time looks acceptable on paper.

## Essential apps for navigating Tokyo

**Google Maps**: the most complete option for real-time multimodal routing in English, including exact fares and transfer times.

**Tokyo Subway Navigation** (official Tokyo Metro app): bilingual, precise connection timings, offline mode available.

**Yahoo! Loco**: the Japanese default for alternative routes and disruption alerts.

**Suica app**: check your balance and top up your mobile Suica remotely.

## Cycling, buses, and getting home late

**Cycling**: legal and practical for short distances. Docomo Bike Share (red bikes) covers all 23 central wards with day passes or monthly subscriptions (~¥3,000/month). Free parking zones are available near most stations.

**Toei buses** cover areas with limited metro access. Suica accepted. Less predictable than the metro but useful as a complement.

After the last train (roughly 12:30 AM to 1:00 AM), taxis are always available. Starting fare: approximately ¥730, then ¥90 per 268 m. A Shibuya-to-Shinjuku night ride costs around ¥1,500. Tokyo is very safe at night and walking 15 minutes from a station is common.

## FAQ

**Is there an unlimited day pass for the first weeks?**

The Tokyo Subway Ticket (24h/48h/72h) covers all 13 metro lines for ¥800, ¥1,200 or ¥1,500. Available at airports. Useful before you get a permanent Suica.

**Does the JR Pass cover inner-city Tokyo?**

The national JR Pass covers JR lines (Yamanote, Chuo, Keihin-Tohoku) but not Tokyo Metro or Toei subway lines. A Suica remains essential in addition.


To discover Tokyo on your first commutes, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) offers guided tours and cultural experiences bookable online. To read signs and announcements in Japanese, [iTalki](https://www.italki.com/affshare?ref=af32660342) offers lessons with native teachers from $10/hour. *(affiliate links)*
---

*Once you know which commute line suits you, the next step is choosing your neighbourhood. Our guide to [Tokyo neighbourhoods for expats](/blog/tokyo-neighbourhoods-expats-guide) compares the main areas by line, price, and community. For the rental process itself, see our complete [Tokyo apartment hunting guide for foreigners](/blog/find-apartment-tokyo-foreigner).*
    `.trim(),
  },
  {
    slug: 'japan-sim-card-foreigners-2026',
    locale: 'en',
    title: 'Best Japan SIM Card for Foreigners 2026: Full Guide',
    description: 'IIJmio, ahamo or povo2.0: compare Japan\'s best SIM cards and phone plans for foreigners arriving in 2026, with setup steps and provider recommendations.',
    date: '2026-06-21',
    readingTime: '7 min',
    content: `
## Which Japan SIM Card Should You Get as a Foreigner in 2026?

**Quick answer:** On arrival in Japan, a prepaid data SIM or eSIM (activatable with no proof of address) gets you online immediately. For a full plan with calls and a Japanese number, you usually need a residence card and sometimes a bank account. Foreigner-friendly carriers offer plans with no My Number, available right at the airport.

Between airport prepaid SIMs, eSIMs you can activate before landing, and long-term resident plans from virtual operators, the options are wider than most people expect. Here is how to choose the right one quickly.

## 3 types of Japanese mobile plans

**Prepaid data-only SIM (arrival and short stay)**

Available at Narita and Haneda airports or on Amazon Japan. No voice calls included. Best option for your first weeks before setting up a resident plan.

Operators: IIJmio Tourist, B-Mobile, JAPAN TRAVEL SIM, eConnect Japan.

Typical terms: 15 to 30 days, ¥2,000 to ¥4,500 depending on data volume (3 to 20 GB).

**Long-term MVNO plans (residents)**

For foreigners with a residence card (zairyu card) and a registered address at a ward office. Optional voice calls, capped or unlimited data.

Operators: IIJmio, OCN Mobile One, mineo, NURO Mobile.

Price: ¥850 to ¥3,000/month depending on data allowance. The most affordable long-term option.

**Sub-brands of the big three operators**

Discount sub-brands from NTT Docomo, SoftBank, and KDDI offer flat-rate plans at competitive prices.

- ahamo (NTT Docomo): 20 GB for ¥2,970/month.
- LINEMO (SoftBank): 20 GB for ¥2,728/month or mini 3 GB at ¥990/month.
- povo2.0 (KDDI/au): base plan at ¥0/month, then data add-ons purchased as needed.

## 2026 comparison: which SIM for which situation?

| Situation | Best option | Approximate cost |
|-----------|-------------|-----------------|
| New arrival, under 1 month | IIJmio Tourist 30-day SIM | ¥4,000 |
| No fixed address yet | povo2.0 base ¥0 + data packs | ¥330 per GB |
| Resident, minimal budget | IIJmio 2 GB plan | ¥850/month |
| Resident, moderate data use | ahamo 20 GB | ¥2,970/month |
| Family with multiple lines | IIJmio family discount | Discount per additional line |

## How to get a SIM card when arriving in Japan

**Option 1: eSIM before departure**

The most convenient option if your phone supports it. You activate the SIM from your home country before landing. Compatibility: iPhone XS and later, most Android phones released after 2019. Your device must be unlocked. eSIM providers for Japan: IIJmio Tourist, Airalo (Japan pack), Ubigi.

**Option 2: Physical SIM at the airport**

IIJmio, B-Mobile, and Sakura Mobile kiosks are in the arrival terminals at Narita (T1/T2/T3) and Haneda (T3). Bring your passport. Opening hours: approximately 7:00 AM to 11:00 PM.

**Option 3: Online order after registration**

Once you have registered your address at your local ward office (yakusho) and received your residence card, order directly on the operator's website. Delivery: 2 to 5 business days. Most MVNOs accept foreign credit cards.

## Voice calls and international calls

Most prepaid SIMs do not include voice calls. For your daily communication needs:

- **International calls**: LINE (free between LINE users), WhatsApp, or Skype are standard among expats.
- **Local voice calls** (estate agents, banks, ward office): choose an MVNO plan with voice included. IIJmio and mineo offer voice add-ons for ¥550 to ¥880/month extra.
- **Japanese special numbers**: 0120- freephone numbers are accessible from mobiles; 0570- Navi-dial numbers may generate extra charges.

## Unlock your phone before leaving home

Contact your home-country carrier to unlock your phone before departing. A SIM-locked device will not accept a Japanese SIM.

iPhones purchased outright from an Apple Store are usually already unlocked. Frequency bands to verify: B1, B3, B19 for Docomo-network operators (IIJmio, ahamo); B1, B3, B8 for SoftBank-network operators (LINEMO). Most recent smartphones support these bands.


For your SIM card in Japan, [Sakura Mobile](https://www.sakuramobile.jp/tokyoexpat-top) offers prepaid and postpaid plans with no address proof required, available from arrival at the airport and usable by foreigners without a My Number. *(affiliate link)*
---

*For home internet in your apartment, see our guide to [setting up utilities in Tokyo](/blog/setting-up-utilities-tokyo-apartment). For a complete move-in checklist, read our [step-by-step guide to moving to Tokyo](/blog/moving-to-tokyo-checklist-2026).*
    `.trim(),
  },
  {
    slug: 'japan-income-tax-foreigners-guide',
    locale: 'en',
    title: 'Japan Income Tax for Foreigners: Complete Guide 2026',
    description: 'Tax brackets, filing deadlines and deductions for expats in Japan. How the 15 March deadline, MyPortal online filing, and foreign income rules work in 2026.',
    date: '2026-06-21',
    readingTime: '9 min',
    content: `
## Japan Income Tax for Expats: What You Actually Need to Know

**Quick answer:** In Japan, income tax is withheld at source for employees, with an annual year-end adjustment (nenmatsu chosei) done by your employer. Your tax-residency status determines what is taxable. Add local resident tax (~10%), billed the following year. A tax return (kakutei shinkoku) may be required depending on your situation.

Japan's tax system is rarely covered in expat relocation guides, yet it directly affects your take-home pay from day one. This guide covers who is taxable, what rates apply, and how to file.

## Who pays income tax in Japan?

Your tax status depends on how long you have lived in Japan.

**Non-permanent resident (less than 5 years in Japan during the past 10)**

You are taxed only on income sourced in Japan, plus any foreign income remitted to Japan. Foreign income left abroad is not taxed. This is the status of the large majority of foreign employees in Japan during their first years.

**Permanent resident (more than 5 years in Japan during the past 10)**

You are taxed on your worldwide income, regardless of where it is paid or held.

**Non-resident**

You are not based in Japan continuously. Taxed only on Japan-sourced income.

## Japan's 2026 income tax brackets

Japan's national income tax is progressive. On top of this, local residential tax (juminzei, 住民税) adds a flat 10% billed the following year.

| Taxable income (¥/year) | National rate |
|------------------------|---------------|
| Up to 1,950,000 | 5% |
| 1,950,001 to 3,300,000 | 10% |
| 3,300,001 to 6,950,000 | 20% |
| 6,950,001 to 9,000,000 | 23% |
| 9,000,001 to 18,000,000 | 33% |
| 18,000,001 to 40,000,000 | 40% |
| Over 40,000,000 | 45% |

At a salary of ¥6,000,000/year (approximately $40,000 or €36,000), the combined effective rate (national + local) is typically 22 to 25%.

## When and how to file your taxes

The tax return filing period (kakutei shinkoku, 確定申告) runs from 16 February to 15 March each year, covering income from the previous calendar year.

**If your Japanese employer withholds tax at source (gensen choshū)**, you may not need to file a full return. Your employer issues a withholding tax certificate (源泉徴収票) in December or January. Check with your HR team.

**You must file if** you have supplementary income: freelance earnings, overseas rental income, investment returns from non-Japanese accounts, or income from multiple employers.

**Online via MyPortal** (mynaportal.go.jp): electronic filing available since 2021. Requires a My Number card with chip. Some local tax offices offer bilingual appointment slots from mid-February to mid-March.

**In person**: your local tax office (zeimusho, 税務署) accepts paper returns. Several Tokyo wards have foreigner-friendly counters, sometimes with English-speaking staff.

## The juminzei: local residential tax

Juminzei (住民税) is the local tax levied by your municipality and prefecture at a flat 10% of taxable income (6% municipal + 4% prefectural).

It is calculated on your year N income and billed in June of year N+1. This creates a cash-flow gap in your first year: you pay juminzei for year 1 during your second year in Japan.

## Key deductions available to expats

- Social insurance premiums (shakai hoken contributions paid by employees): fully deductible.
- Medical expenses exceeding ¥100,000 per year: deductible above this threshold.
- Donations to approved organisations (including furusato nozei).
- Home loan interest for property purchased in Japan.
- Basic deduction: ¥480,000 for most taxpayers.

## Bilateral tax treaties

Japan has bilateral tax treaties with France, the US, the UK, and most OECD countries that prevent double taxation. If you have paid income tax in Japan, your home country typically grants a credit against any domestic liability on the same income.

Important: even if you owe no tax at home, you may still be required to report your situation (FBAR for US citizens holding foreign accounts, for example). Check with your home-country tax authority.

## FAQ

**Does my Japanese employer handle everything?**

Mostly yes, for full-time employees on a standard Japanese contract. Verify with HR whether a supplementary return is required for overseas income.

**What happens if I leave Japan mid-year?**

You must file a final return before leaving, or appoint a tax representative (zeirishi). Your employer may complete a year-end adjustment for salary income.


For health coverage as an expat in Japan, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment, activatable before Japanese national insurance enrolment. *(affiliate link)*
---

*For a complete relocation checklist, see our guide on [moving to Tokyo step by step](/blog/moving-to-tokyo-checklist-2026). For healthcare contributions, read our guide to [Japan's health insurance for expats](/blog/japan-health-insurance-expat-guide).*
    `.trim(),
  },
  {
    slug: 'setting-up-utilities-tokyo-apartment',
    locale: 'en',
    title: 'How to Set Up Utilities in Your Tokyo Apartment (2026)',
    description: 'Electricity, gas, water and internet: step-by-step guide to setting up all utilities in a Tokyo apartment as an expat, with provider names and lead times.',
    date: '2026-06-21',
    readingTime: '7 min',
    content: `
## Setting Up Utilities in Your Tokyo Apartment: Step-by-Step

**Quick answer:** When you move in, set up electricity, gas and water (often a quick call or online form, sometimes an appointment for gas). Home fibre internet takes 2 to 4 weeks to install, so use a data SIM in the meantime. Keep your residence card and a bank account handy for automatic payments.

Once you have the keys to your Tokyo apartment, four services need to be activated or subscribed: electricity, gas, water, and internet. Most can be done online in under 30 minutes. Here is exactly what to do.

## Electricity: activate your meter online

Electricity in Tokyo is supplied by **TEPCO** (Tokyo Electric Power Company). You cannot choose your supplier in the greater Tokyo area.

Process: visit TEPCO's website (kurashi.tepco.co.jp) and fill in the move-in registration form. You will need: your move-in date, the meter number (printed on a sticker near your electrical panel), your contact details, and your new address.

The form is primarily in Japanese with English guidance notes. You can also call TEPCO's English helpline at 0120-995-113.

Activation: usually instant if the previous tenant properly cancelled their contract. If not, a technician may visit within 1 to 3 days.

Billing: monthly, by direct debit or at a convenience store. Base subscription: approximately ¥300 to ¥400/month plus consumption per kWh.

## Gas: only if your apartment uses it

Gas is only relevant if your apartment has a gas hob or gas water heater. Many modern Tokyo apartments run entirely on electricity (IH cooking hob and electric water heater), in which case no gas contract is needed.

If your apartment has gas, the supplier is **Tokyo Gas** (tokyogas.co.jp). Activation requires a technician visit. Book online or call 03-3433-7111 (English options available). Lead time: 3 to 7 business days.

Ask your agency whether your apartment is gas or IH before buying a hob or rice cooker.

## Water: usually automatic

Water (suidō, 水道) in Tokyo is managed by the Tokyo Metropolitan Government's Bureau of Waterworks. In most modern apartments, the meter activates automatically when the lease starts. Your agent or landlord handles this.

If your water is not running after move-in, contact the Tokyo Waterworks Bureau at 03-5326-1101 (English available).

Billing: every two months. Average for a studio: ¥1,000 to ¥2,500 per billing cycle.

## Home internet: choosing the right provider

Japan's fibre internet (hikari) is among the fastest and most affordable in the world. Setup involves two steps: choosing the physical network (typically NTT Flets) then an ISP that leases access on that network.

Main options in Tokyo:

- **NTT Flets Hikari + partner ISP**: the most common combination. Flets costs ¥5,500 to ¥6,000/month, plus ISP fees of ¥500 to ¥1,500/month. Total: ¥6,000 to ¥7,500/month.
- **SoftBank Hikari**: single bundled contract, approximately ¥5,500/month.
- **NURO Hikari**: one of the fastest options (2 Gbps download), ¥5,200/month. Coverage varies by area.
- **au Hikari**: strong Tokyo coverage, often bundled with KDDI mobile plans.

Installation lead time: 2 to 6 weeks. Plan a backup solution for your first month.

**Internet while waiting for fibre**: use your SIM card as a mobile hotspot (tethering), or rent a portable pocket WiFi router from IIJmio, Rakuten, or a SoftBank counter at your nearest station. Pocket WiFi typically delivers 50 to 150 Mbps for ¥2,500 to ¥4,000/month.

## Summary: what to do and when

| Service | Typical lead time | How to set up |
|---------|-----------------|---------------|
| Electricity | Instant to 3 days | TEPCO online form |
| Water | Usually automatic | Call if not running at move-in |
| Gas | 3 to 7 business days | Book technician with Tokyo Gas |
| Home internet | 2 to 6 weeks | Compare ISPs then order online |
| Mobile SIM | Instant (eSIM) or 2-5 days | See Japan SIM card guide |

## FAQ

**Do I need a registered Japanese address to subscribe to internet?**

Yes, for fibre contracts. A Japanese address is required. For pocket WiFi devices, your passport often suffices.

**Are TEPCO and Tokyo Gas forms available in English?**

TEPCO has English guidance on its website and an English-language phone line. Tokyo Gas has an English-language phone option. If you are struggling, your letting agency can often assist with first-contact calls.


For mobile connectivity while waiting for home internet setup, [Sakura Mobile](https://www.sakuramobile.jp/tokyoexpat-top) offers data plans with no address proof required, usable from day one in Japan. *(affiliate link)*
---

*For a complete move-in checklist, see our [step-by-step guide to moving to Tokyo](/blog/moving-to-tokyo-checklist-2026). For the apartment search before you get to this stage, read our [Tokyo apartment hunting guide for foreigners](/blog/find-apartment-tokyo-foreigner).*
    `.trim(),
  },
  {
    slug: 'working-in-tokyo-expat-guide-2026',
    locale: 'en',
    title: 'Working in Tokyo as an Expat: Practical Guide 2026',
    description: 'Work visas, Japanese business culture, average salaries and employee rights for expats in Tokyo. What to expect when starting work at a Japanese company in 2026.',
    date: '2026-06-21',
    readingTime: '9 min',
    content: `
## Working in Tokyo as an Expat: What to Expect in 2026

**Quick answer:** Working in Tokyo requires an employer-sponsored work visa matched to your role. Hiring is strongest in tech, finance, language teaching and bilingual positions. Good Japanese helps a lot, but English-only roles exist. Prepare a Japanese-style CV and target recruitment agencies that specialise in foreign talent.

Whether you are arriving on a local contract or an international assignment, Tokyo's workplace culture has specific codes that can catch even experienced professionals off guard. This guide covers the essentials.

## Work visa types for foreigners in Japan

You need a valid work visa before starting employment in Japan. The most common categories for qualified expats are:

**Engineer / Specialist in Humanities / International Services visa (技術・人文知識・国際業務)**

The most common work visa for technical, business, marketing, and language specialist roles. Duration: 1, 3, or 5 years, renewable.

**Business Manager visa (経営管理)**

For company founders or managing directors. Specific requirements on capital and employee count apply.

**Highly Skilled Professional visa (高度専門職)**

Points-based visa for high earners or highly qualified profiles. Key benefit: accelerated permanent residency, possible from 1 to 3 years depending on your point score.

**Working Holiday visa**

Bilateral agreement available to citizens of France, the UK, Australia, Canada, and others aged 18 to 30. Allows working in Japan for up to 1 year without a prior employment contract.

For detailed conditions and application steps, see our [Japan work visa guide](/blog/japan-work-visa-foreigners-guide).

## Japanese workplace culture: what you need to know

**Punctuality is absolute**

On time means 5 minutes early. A 3-minute delay is noticed. For client meetings, arrive 10 to 15 minutes ahead.

**Nemawashi (根回し): pre-meeting consensus building**

Important decisions go through informal pre-consultation before a formal meeting. You will often need to pitch your idea individually to each stakeholder beforehand. Formal meetings are usually for validation, not debate.

**Meishi (名刺): business card exchange**

Present your card with both hands, text facing your counterpart. Never write on or fold a received card. Do not put it straight into your pocket. This exchange happens at the start of every first meeting.

**Overtime culture**

Japan's 2019 labour reforms capped overtime at 45 hours per month (720 per year) for most employees. Long hours remain common in banking, consulting, and advertising. Check your contract carefully, particularly for discretionary work clauses (sairyo rodo), which can affect overtime pay.

## Salaries in Tokyo for expats in 2026

| Role | Annual gross (¥) | Approximate EUR equivalent |
|------|-----------------|--------------------------|
| Junior IT engineer | 4,000,000 to 5,500,000 | €24,000 to €33,000 |
| Senior IT engineer | 6,000,000 to 10,000,000 | €36,000 to €60,000 |
| Mid-level marketing / sales | 4,500,000 to 7,000,000 | €27,000 to €42,000 |
| Finance (banking) | 7,000,000 to 15,000,000 | €42,000 to €90,000 |
| Language teacher (ALT) | 2,800,000 to 3,600,000 | €17,000 to €22,000 |

International assignment packages (expats sent by multinationals) typically include a relocation premium, housing allowance, and school fees, putting total compensation well above equivalent local salaries.

## Social contributions and employee benefits

Employees in Japan contribute to the social insurance system (shakai hoken), covering health insurance (kenko hoken), pension (nenkin), and employment insurance (koyo hoken). Total employee contributions: approximately 14 to 16% of gross salary.

Your employer health insurance covers 70% of medical costs (you pay the remaining 30%). For details, see our guide on [Japan's health insurance for expats](/blog/japan-health-insurance-expat-guide).

Most Japanese companies reimburse commuting costs (teiki-ken passes) up to ¥150,000/month and pay biannual bonuses in June and December, typically equivalent to 1 to 4 months of base salary depending on performance.

## Documents to prepare before your first day

1. Residence card (zairyu card): obtained at the airport or your local ward office.
2. My Number: your social security equivalent, issued with your first tax notification.
3. Japanese bank account for salary payments. See our [bank account guide](/blog/open-bank-account-japan-foreigner).
4. Resident certificate (juminhyo): available at your ward office (yakusho).
5. Personal seal (inkan) or signature agreement for HR paperwork.

## FAQ

**Can you find work in Tokyo without speaking Japanese?**

Yes, particularly in multinationals, tech startups, financial services, and education. The Japanese proficiency required varies widely by sector. In finance and IT at international firms, English is often sufficient at an operational level.

**How does the probation period work in Japan?**

Japanese contracts typically include a 3 to 6 month probation period. Employee rights are protected from day one under Japanese labour law, including during probation.


To develop your professional Japanese, [iTalki](https://www.italki.com/affshare?ref=af32660342) offers online private lessons with native Japanese teachers specialised in business Japanese, from $10/hour. *(affiliate link)*
---

*To find housing near your workplace, our guide to [Tokyo neighbourhoods for expats](/blog/tokyo-neighbourhoods-expats-guide) helps you choose by commute line and budget. For all administrative steps after arrival, see our [complete Tokyo moving checklist](/blog/moving-to-tokyo-checklist-2026).*
    `.trim(),
  },
  {
    slug: 'virement-international-japon-wise-revolut',
    locale: 'fr',
    title: 'Virement vers le Japon : Wise, Revolut et banques 2026',
    description: 'Comparatif complet des meilleures solutions pour transférer de l\'argent vers le Japon en 2026. Wise, Revolut et virement SWIFT : frais réels, délais et pièges à éviter.',
    date: '2026-06-21',
    readingTime: '7 min',
    content: `
## Transférer de l'argent vers le Japon : les vraies options en 2026

**Réponse rapide :** Pour transférer de l'argent vers le Japon, les services en ligne (Wise, Revolut) offrent presque toujours un meilleur taux et des frais plus bas que les banques traditionnelles. Comparez le taux de change réel, pas seulement les frais affichés. Pour recevoir un salaire local, il vous faut un compte bancaire japonais.

Que vous receviez un salaire depuis la France, remboursiez un prêt à domicile ou envoyiez de l'argent à votre famille, les transferts internationaux font partie du quotidien des expatriés. Les banques traditionnelles font payer cette commodité très cher. Voici un comparatif honnête des solutions disponibles.

## Wise : la référence pour les virements vers le Japon

Wise (anciennement TransferWise) applique le taux de change interbancaire réel sans marge cachée. C'est l'option la plus compétitive pour la grande majorité des expatriés.

**Frais typiques EUR vers JPY :**
- Frais fixes : 0,40 euros + 0,47 % du montant
- Pour un virement de 1 000 euros : environ 5 à 6 euros de frais
- Délai : 0 à 24 heures pour les virements bancaires

**Comment recevoir sur un compte japonais :** Wise prend en charge les virements vers la plupart des banques japonaises. Vous aurez besoin du numéro d'agence (店番 en 3 chiffres) et de votre numéro de compte (口座番号 en 7 chiffres). Rakuten Bank, PayPay Bank et Shinsei Bank reçoivent les virements sans frais de réception. Pour ouvrir un compte japonais, consultez notre [guide d'ouverture de compte bancaire au Japon](/blog/ouvrir-compte-bancaire-japon-etranger).

## Revolut : idéal pour les petits montants fréquents

Le plan gratuit Revolut offre jusqu'à 1 000 euros de change mensuel au taux interbancaire (hors weekend). Le plan Premium à 7,99 euros par mois supprime cette limite.

**Avantages :** interface simple, carte virtuelle en JPY disponible, rechargement en temps réel.

**Limite :** le weekend, Revolut ajoute une marge de 0,5 à 1 % sur le taux. Pour les montants importants, Wise reste plus compétitif.

## Virements bancaires SWIFT : à éviter si possible

Un virement depuis une banque française classique (BNP Paribas, Société Générale, Crédit Agricole) vers le Japon coûte en général :

- 25 à 45 euros de frais fixes à l'émission
- Une marge de change de 2 à 4 %
- Des frais de réception japonais : 1 000 à 2 000 ¥

Pour un virement de 1 000 euros, vous perdez entre 60 et 90 euros par rapport à Wise. Sur une année avec un virement mensuel, la différence dépasse 700 euros.

## Tableau comparatif

| Service | Frais sur 1 000 euros | Délai | Usage recommandé |
|---------|----------------------|-------|-----------------|
| Wise | 5 à 6 euros | 0 à 1 jour | Virements réguliers de tout montant |
| Revolut (plan gratuit) | 0 euro jusqu'à 1 000 euros/mois | 1 à 2 jours | Petits montants fréquents |
| Western Union | 15 à 25 euros | 0 à 1 jour | Urgences uniquement |
| Virement bancaire SWIFT | 60 à 90 euros | 3 à 5 jours | A éviter |

## Recevoir de l'argent au Japon : quels comptes ouvrir ?

**PayPay Bank** : accepte les virements SWIFT et Wise, interface entièrement en anglais, ouverture en ligne avec carte de résidence. La meilleure option pour les nouveaux arrivants.

**Rakuten Bank** : bien intégrée avec Wise, interface bilingue, aucun frais de réception.

**Shinsei Bank** : historiquement la banque des expatriés à Tokyo. Service client en anglais disponible, virements internationaux entrants sans frais.

## Aspects fiscaux

Si vous résidez au Japon et percevez des revenus étrangers, ces revenus sont en principe soumis à l'impôt japonais sur le revenu selon votre statut de résidence. La déclaration fiscale se fait chaque mars pour l'année civile précédente. Notre [guide fiscal pour expatriés au Japon](/blog/impots-revenus-japon-expatrie-2026) détaille vos obligations selon votre durée de résidence.

## FAQ

**Peut-on envoyer de l'argent depuis le Japon vers la France avec Wise ?**

Oui. Wise fonctionne dans les deux sens. Le sens JPY vers EUR est disponible avec des frais similaires.

**Y a-t-il des limites de montant par virement ?**

Wise permet jusqu'à l'équivalent de 1 million de livres par virement. Revolut gratuit est limité à 1 000 euros de change mensuel au taux interbancaire.

**Les virements reçus doivent-ils être déclarés ?**

Les virements eux-mêmes ne sont pas automatiquement déclarés, mais les revenus qu'ils représentent le sont. La NTA (Administration Fiscale Nationale) peut demander une justification pour des virements importants et réguliers.


Pour votre couverture sante en expatrie, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement adaptee aux residents etrangers au Japon. *(lien affilie)*
---

*Pour les démarches bancaires à Tokyo, notre [guide d'ouverture de compte](/blog/ouvrir-compte-bancaire-japon-etranger) couvre toutes les banques adaptées aux expatriés. Pour votre installation complète, consultez notre [checklist déménagement Japon](/blog/demenager-japon-checklist-complete).*
    `.trim(),
  },
  {
    slug: 'cours-japonais-tokyo-expatries-guide',
    locale: 'fr',
    title: 'Cours de japonais à Tokyo pour expatriés : guide 2026',
    description: 'Coto Academy, ISI, Berlitz ou applications : comparatif des meilleures écoles de japonais à Tokyo pour expatriés résidents. Tarifs, niveaux et conseils pour progresser vite.',
    date: '2026-06-21',
    readingTime: '8 min',
    content: `
## Apprendre le japonais à Tokyo : par où commencer ?

**Réponse rapide :** Pour apprendre le japonais à Tokyo, plusieurs voies : écoles de langue à temps plein (visa étudiant possible), cours du soir pour salariés, cours en ligne avec professeurs natifs, et échanges linguistiques gratuits. Commencez par les kana (hiragana et katakana), puis visez le JLPT comme objectif. Choisissez selon votre budget et votre temps disponible.

Même dans un environnement de travail entièrement en anglais, parler japonais change radicalement la qualité de vie à Tokyo. Pour les démarches administratives, la recherche d'appartement, les visites chez le médecin et les conversations de voisinage, quelques centaines de mots suffisent à transformer l'expérience. Ce guide compare les options disponibles pour les expatriés résidents.

## Coto Academy : la référence pour les professionnels expatriés

Coto Academy est probablement l'école de japonais la mieux adaptée aux expatriés qui travaillent. Elle propose des cours intensifs, des cours du soir et des programmes en ligne, tous dispensés en anglais.

**Points forts :**
- Groupes limités à 4 à 6 personnes
- Contenu orienté vie quotidienne et japonais professionnel
- Cours du soir disponibles dès 19h
- Locaux à Shinjuku et cours en ligne

**Tarifs :** 15 000 à 30 000 ¥ par mois pour les cours en groupe selon l'intensité. Cours particuliers autour de 4 000 à 5 000 ¥ par heure.

## ISI Language School : pour les étudiants à plein temps

ISI est davantage orientée vers les étudiants en visa étudiant souhaitant se préparer au JLPT (Japanese Language Proficiency Test) ou intégrer une université japonaise. Moins flexible pour les professionnels en poste, mais pédagogie solide et structurée.

**Disponible :** du niveau débutant absolu jusqu'au JLPT N1. Programmes de 6 à 24 mois avec aide à l'obtention du visa étudiant.

## Berlitz Japan : la solution corporate

Berlitz propose des cours individuels sur mesure pour les entreprises. Idéal si votre employeur prend en charge les frais de formation linguistique.

**Avantage :** horaires ultra-flexibles, cours possibles à domicile ou sur site. Formateurs disponibles en soirée et le weekend.

**Inconvénient :** tarifs parmi les plus élevés, peu de groupes de conversation.

## Applications et ressources en ligne : le complément indispensable

Pour les expatriés qui manquent de temps ou veulent progresser en dehors des cours :

- **Anki** : logiciel de flashcards pour les kanjis et le vocabulaire. Gratuit, très efficace.
- **WaniKani** : apprentissage des kanjis par radicaux, système gamifié. 9 USD par mois.
- **iTalki** : cours particuliers en ligne avec des natifs japonais. 15 à 25 USD par heure.
- **NHK Web Easy** : articles d'actualité en japonais simplifié, gratuits.
- **HelloTalk** : échange linguistique avec des Japonais apprenant votre langue.

## Comprendre les niveaux JLPT

Le JLPT (日本語能力試験) est le certificat de référence en japonais. 5 niveaux du N5 (débutant) au N1 (quasi-natif). Pour la vie quotidienne à Tokyo, le N4 est largement suffisant. Pour travailler en japonais, le N2 est généralement requis.

| Niveau | Description | Heures d'étude estimées |
|--------|-------------|------------------------|
| N5 | Hiragana, katakana, 100 kanjis, phrases de base | 150 heures |
| N4 | Conversations quotidiennes simples | 300 heures |
| N3 | Lecture de panneaux et journaux simplifiés | 450 heures |
| N2 | Travail en environnement partiellement japonais | 600 heures |
| N1 | Niveau professionnel natif | 900 heures et plus |

## Priorité absolue : hiragana et katakana en deux semaines

Avant de vous inscrire dans une école, consacrez 2 à 3 semaines à mémoriser hiragana et katakana. Ces deux syllabaires de 46 caractères chacun couvrent la totalité du japonais oral et une grande partie de l'écrit. Des applications comme Kana Mind ou Duolingo les enseignent en 10 à 20 minutes par jour.

Une fois ces deux alphabets maîtrisés, chaque leçon en école sera deux fois plus efficace.

## Quel budget prévoir ?

| Option | Coût mensuel | Progression |
|--------|-------------|-------------|
| Cours en groupe (Coto, ISI) | 15 000 à 30 000 ¥ | Rapide avec structure |
| Cours particuliers | 40 000 à 80 000 ¥ | Très rapide |
| Applications uniquement | 1 000 à 2 000 ¥ | Lente sans discipline |
| Cours en ligne ([iTalki](https://www.italki.com/affshare?ref=af32660342)) | 10 000 à 20 000 ¥ | Flexible |

## FAQ

**Dois-je apprendre le japonais pour vivre à Tokyo ?**

Non, c'est possible sans. Mais les expatriés qui apprennent, même à un niveau basique, rapportent une expérience de vie beaucoup plus riche et moins stressante. La barrière administrative est réelle.

**Quelle option si je travaille 5 jours sur 7 ?**

Coto Academy pour les cours du soir en groupe, et [iTalki](https://www.italki.com/affshare?ref=af32660342) pour des cours particuliers flexibles le weekend.

**Le japonais est-il utile pour trouver un appartement ?**

Oui, clairement. Même quelques phrases de base facilitent les visites avec les agences locales et la compréhension des contrats. Notre [guide de location d'appartement à Tokyo](/blog/trouver-appartement-tokyo-etranger) décrit tout le processus étape par étape.

---

*Pour votre installation complète à Tokyo, notre [checklist déménagement Japon](/blog/demenager-japon-checklist-complete) couvre toutes les étapes administratives. Pour le logement, voir notre [guide des quartiers pour expatriés](/blog/quartiers-tokyo-expatries-guide).*
    `.trim(),
  },
  {
    slug: 'permis-conduire-etranger-japon-conversion',
    locale: 'fr',
    title: 'Convertir son permis de conduire étranger au Japon 2026',
    description: 'Convertir un permis français, européen ou canadien au Japon en 2026 : documents requis, centre d\'examen, test de conduite et délais. Guide complet pour expatriés.',
    date: '2026-06-21',
    readingTime: '8 min',
    content: `
## Conversion du permis de conduire au Japon : ce qu'il faut savoir

**Réponse rapide :** Pour conduire au Japon durablement, il faut convertir votre permis étranger (procédure gaimen kirikae) au centre de permis, avec traduction officielle (souvent via la JAF), documents de résidence et parfois un examen théorique et pratique. Certains pays, dont la France, la Suisse et la Belgique, bénéficient d'une conversion simplifiée. Un permis international ne vaut qu'un an.

Le Japon reconnaît les permis étrangers par le biais de la Convention de Genève, mais cette reconnaissance ne s'applique qu'aux visiteurs temporaires. Dès que vous devenez résident (carte de séjour obtenue), vous devez convertir votre permis étranger pour continuer à conduire légalement.

La bonne nouvelle : les ressortissants français et de nombreux pays européens bénéficient d'une procédure simplifiée, sans test de conduite si votre permis a plus de 3 mois à la date de votre arrivée au Japon.

## Pays éligibles à la conversion sans test de conduite

La liste inclut la France, la Belgique, la Suisse, l'Allemagne, l'Italie, le Canada, l'Australie, la Nouvelle-Zélande, le Royaume-Uni et la majorité des pays de l'Union européenne.

Les ressortissants américains (hors quelques États) et chinois doivent passer un test de conduite pratique.

## Documents requis pour la conversion

1. Votre permis de conduire étranger original
2. Une traduction officielle du permis par une organisation reconnue (JAF - Japan Automobile Federation - pour les permis français, belges et suisses)
3. Votre passeport original + photocopie
4. Votre carte de résidence (zairyu card) originale + photocopie
5. Votre certificat de résidence (juminhyo) délivré par votre mairie
6. 2 photos d'identité récentes (3 cm x 2,4 cm, fond blanc)
7. Attestation prouvant que vous étiez bien dans votre pays d'origine pendant au moins 3 mois après l'obtention de votre permis (entrées/sorties du passeport ou relevé de compte)

La traduction JAF coûte environ 3 000 ¥ et prend 1 à 5 jours ouvrés. Prenez rendez-vous au bureau JAF le plus proche.

## Où effectuer la démarche ?

La conversion se fait uniquement dans les centres d'examen du permis de conduire (運転免許試験場). Il n'existe pas de centre dans chaque arrondissement. Pour Tokyo, les principaux centres sont :

- **Fuchu Driver's License Center** (府中運転免許試験場) : accessible depuis Kokubunji en 10 minutes de bus
- **Koto Driver's License Center** (江東運転免許試験場) : accès depuis Tatsumi (ligne Rinkai)
- **Samezu Driver's License Center** (鮫洲運転免許試験場) : accès depuis Samezu (ligne Keikyu)

Aucun rendez-vous en ligne disponible : présentez-vous à l'ouverture (8h30 généralement). Prévoyez une journée complète.

## Déroulement de la procédure simplifiée (pays reconnus)

1. Dépôt du dossier au guichet (vérification des documents)
2. Test de vue et de couleurs (5 minutes)
3. Questionnaire de connaissance du code de la route japonais (10 questions, sans notes, en anglais disponible)
4. Attente et remise du permis japonais (souvent le même jour)

**Coût total :** 2 350 ¥ environ pour le permis japonais, plus les frais JAF.

## Test de conduite pour les pays non reconnus

Si vous êtes ressortissant d'un pays non éligible à la conversion simplifiée, vous devez passer :

1. Un test écrit (code de la route) disponible en anglais, français, chinois et d'autres langues
2. Un test de conduite pratique sur circuit (pas sur route ouverte)

Le test pratique est notoirement difficile pour les étrangers car il suit un protocole japonais très précis (vérifications visuelles, miroirs, placement mains). Certains centres proposent des cours de préparation en anglais.

## Carte de résidence et preuve de 3 mois à l'étranger

Un point crucial souvent oublié : les autorités japonaises doivent vérifier que vous conduisiez réellement dans votre pays d'origine après l'obtention du permis. Si votre passeport montre que vous êtes arrivé au Japon moins de 3 mois après l'obtention du permis, la conversion peut être refusée.

Dans ce cas, la solution est généralement d'attendre ou de rassembler d'autres preuves (factures bancaires, relevés de compte, contrat d'emploi dans le pays d'origine).

## FAQ

**Mon permis international suffit-il au Japon ?**

Le permis international de l'AAA (Geneva Convention) est valable un an au Japon. Mais dès que vous avez une adresse enregistrée à la mairie (juminhyo), vous êtes considéré comme résident et devez convertir votre permis. Ne pas le faire est une infraction.

**Peut-on conduire avec un permis européen sans conversion ?**

Oui, pendant la période touristique ou lors des 3 premiers mois de résidence, avec le permis international. Au-delà, la conversion est obligatoire.

**La conversion est-elle permanente ?**

Oui. Le permis japonais obtenu par conversion est identique à celui obtenu par examen. Il se renouvelle selon les mêmes règles (tous les 3 à 5 ans selon votre historique de conduite).


Pour votre couverture sante pendant les demarches administratives, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement. Pour faciliter les demarches en japonais, [iTalki](https://www.italki.com/affshare?ref=af32660342) propose des cours avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*
---

*Pour votre installation complète au Japon, notre [guide des démarches administratives](/blog/demenager-japon-checklist-complete) liste toutes les étapes à effectuer après l'arrivée. Pour le logement, consultez notre [guide de location à Tokyo](/blog/trouver-appartement-tokyo-etranger).*
    `.trim(),
  },
  {
    slug: 'demenageur-international-japon-guide',
    locale: 'fr',
    title: 'Déménageur international vers le Japon : guide et prix 2026',
    description: 'Crown Relocations, Asian Tigers ou Nippon Express : comparer les déménageurs internationaux vers le Japon, comprendre les options de fret et préparer son expédition 2026.',
    date: '2026-06-21',
    readingTime: '8 min',
    content: `

![L'ordre des étapes pour s'installer à Tokyo : visa, carte de séjour, banque, garant, bail](/tokyo-process-fr.png "La carte de séjour débloque tout, faites-la le jour 1")
## Organiser son déménagement international vers le Japon

**Réponse rapide :** Pour un déménagement international vers le Japon, comparez plusieurs devis (fret maritime, moins cher mais lent ; aérien, rapide mais coûteux). Vérifiez l'assurance, le dédouanement et la livraison jusqu'au domicile. Déménagez léger : beaucoup de logements japonais sont petits, et racheter sur place est souvent plus simple que d'expédier.

Un déménagement vers le Japon depuis l'Europe dure en général 4 à 8 semaines par voie maritime, ou 5 à 10 jours par voie aérienne. La logistique est complexe, les règles douanières strictes, et les délais souvent sous-estimés. Ce guide vous donne les informations essentielles pour choisir le bon prestataire.

## Les principaux déménageurs internationaux opérant vers le Japon

### Crown Relocations

Crown est l'un des leaders mondiaux de la relocation d'entreprise. Ils proposent des services complets : emballage, expédition, dédouanement au Japon, livraison et montage.

**Points forts :** service all-inclusive, coordinateurs bilingues, couverture assurance complète, expérience spécifique Japon.

**Coût estimé :** 3 000 à 8 000 USD pour un appartement de 50 à 80 m² par voie maritime (20 à 30 m³).

### Asian Tigers Japan

Spécialiste en relocation internationale pour l'Asie, Asian Tigers propose des services similaires à Crown avec une forte présence locale au Japon.

**Points forts :** tarifs généralement 10 à 20 % inférieurs à Crown, bon service client en anglais, gestion complète du dédouanement.

### Nippon Express International

Nippon Express est l'opérateur logistique japonais de référence. Avantage : leur réseau local au Japon est extrêmement dense, la livraison en dernier kilomètre est plus fiable.

**Adapté à :** ceux qui envoient d'abord leurs effets depuis l'étranger, puis se chargent de la livraison locale depuis le Japon.

### Yamato Transport (TA-Q-BIN)

Pour les petits volumes ou les envois en boîtes, Yamato propose un service de fret international (Takkyubin International) depuis la France. Pratique pour les vêtements, livres et petits objets.

## Voie maritime vs voie aérienne

| Critère | Maritime (FCL/LCL) | Aérien |
|---------|-------------------|--------|
| Délai | 4 à 8 semaines | 5 à 10 jours |
| Coût (1 m³) | 100 à 200 USD | 400 à 800 USD |
| Volume min. recommandé | 5 m³ (LCL) | Illimité |
| Idéal pour | Meubles, électroménager, grande quantité | Vêtements, documents, objets urgents |

Pour un déménagement complet depuis la France, la voie maritime est la plus économique. Beaucoup d'expatriés envoient leurs affaires essentielles par avion (1 ou 2 valises supplémentaires en soute) et le reste par conteneur partagé (LCL).

## Règles douanières japonaises

**Ce qui entre en franchise :** vos effets personnels usagés, vêtements, livres, matériel informatique personnel. Pas de limite de valeur pour les effets personnels déclarés comme tels.

**Ce qui est taxé :** nouveaux appareils électroniques, alcool au-delà des quotas, certains aliments.

**Ce qui est interdit :** certains médicaments (notamment ceux contenant de la pseudoéphédrine, certains antidouleurs, des médicaments TDAH courants en Europe). Vérifiez votre liste de médicaments avant le départ.

**Certificat de déménagement :** pour bénéficier de l'exonération douanière sur vos effets personnels, vous devez fournir un certificat prouvant votre statut de résident au Japon (visa + carte de résidence ou attestation consulaire).

## Calendrier et conseils pratiques

**3 mois avant :** demandez des devis à au moins 3 prestataires. Réservez votre créneau maritime.

**6 semaines avant :** préparez la liste d'inventaire détaillée (exigée par les douanes japonaises). Triez et vendez ou donnez ce qui ne vaut pas le coût d'expédition.

**4 semaines avant :** emballage professionnel si inclus dans votre contrat. Sinon, commencez par les pièces rarement utilisées.

**Arrivée :** votre déménageur se charge du dédouanement, mais vous devez être présent ou représenté pour la livraison. Assurez-vous d'avoir un appartement avec ascenseur ou prévenez votre propriétaire à l'avance.

## Coût total estimé pour un expatrié célibataire

- Studio ou 1LDK vidé (10 à 15 m³) : 1 500 à 3 500 USD par maritime
- Appartement familial (30 à 50 m³) : 4 000 à 9 000 USD

Ces tarifs incluent l'emballage, le transport, le dédouanement et la livraison. L'assurance est généralement facturée séparément (0,5 à 1 % de la valeur déclarée).

## FAQ

**Faut-il être présent à Tokyo pour la livraison ?**

Oui, en général. Certains déménageurs acceptent un représentant mandaté, mais la plupart exigent votre présence pour signer les documents de livraison.

**Que faire de ses meubles français ?**

Les appartements japonais sont souvent meublés ou beaucoup plus petits. Beaucoup d'expatriés stockent ou vendent leurs gros meubles en France plutôt que de les expédier. Les canapés européens passent rarement dans les espaces japonais standard. Consultez notre [guide des quartiers de Tokyo](/blog/quartiers-tokyo-expatries-guide) pour comprendre les configurations typiques des appartements.


Pour votre couverture sante pendant le demenagement, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement, activable avant votre arrivee au Japon. *(lien affilie)*
---

*Pour votre logement à Tokyo après l'arrivée, notre [guide de location pour expatriés](/blog/trouver-appartement-tokyo-etranger) vous aide à trouver rapidement. Pour les démarches administratives à effectuer dès l'arrivée, voir notre [checklist complète](/blog/demenager-japon-checklist-complete).*
    `.trim(),
  },
  {
    slug: 'importer-animal-compagnie-japon-guide',
    locale: 'fr',
    title: 'Emmener son chat ou chien au Japon : guide quarantaine 2026',
    description: 'Procédure complète pour importer votre chat ou chien au Japon sans quarantaine : microchip, vaccin antirabique, titre vaccinal et calendrier strict à respecter en 2026.',
    date: '2026-06-21',
    readingTime: '9 min',
    content: `
## Importer son animal de compagnie au Japon : les règles strictes

**Réponse rapide :** Importer un chien ou un chat au Japon demande une préparation longue (jusqu'à 7 mois avant) : puçage, vaccins antirabiques, test sérologique, puis période d'attente. Sans ces étapes, l'animal peut être mis en quarantaine jusqu'à 180 jours. Prévenez l'aéroport d'arrivée à l'avance et suivez à la lettre les règles du ministère (MAFF).

Le Japon applique l'une des réglementations sanitaires les plus strictes au monde pour l'importation d'animaux domestiques. La procédure est longue et très précise. Si elle est mal suivie, votre animal peut être mis en quarantaine pendant 180 jours à votre charge. Ce guide détaille les étapes pour les chats et chiens en provenance de France.

La France est classée dans la "Zone B" par le Japon, aux côtés de la majorité des pays européens et de certains pays anglophones (Canada, Australie). C'est la catégorie intermédiaire : pas la plus simple (Zone A : Royaume-Uni, Australie, Nouvelle-Zélande), mais évitable en suivant scrupuleusement la procédure.

## La procédure en 8 étapes

**Etape 1 : microchip ISO 11784/11785**

Votre animal doit être identifié par un microchip répondant à la norme ISO 11784 ou 11785. Si votre animal a un microchip plus ancien ou non standard, une nouvelle puce doit être implantée avant toute vaccination.

**Etape 2 : première vaccination antirabique**

Effectuée après l'implantation du microchip. Le vaccin utilisé doit être homologué et son numéro de lot enregistré dans le carnet de santé.

**Etape 3 : rappel antirabique**

Un rappel est nécessaire 30 jours après la première injection si votre animal n'avait jamais été vacciné contre la rage.

**Etape 4 : test de neutralisation du virus rabique (FAVN/RFFIT)**

C'est l'étape la plus critique. Un prélèvement sanguin est effectué par votre vétérinaire et envoyé à un laboratoire agréé par le Japon. Le résultat doit être supérieur ou égal à 0,5 UI/ml.

**Laboratoires agréés pour la France :** le laboratoire de l'ANSES à Nancy est accrédité. D'autres laboratoires européens agréés sont acceptés. Vérifiez la liste actuelle sur le site de l'APHIS japonais.

**Etape 5 : attente de 180 jours**

Après un résultat positif au test FAVN, vous devez attendre **180 jours complets** avant d'importer l'animal au Japon. C'est la contrainte principale. Si vous avez un déménagement dans 8 mois, commencez la procédure maintenant.

**Etape 6 : certificat sanitaire officiel**

Au moins 7 jours avant l'export, votre vétérinaire (ou la DDPP de votre département) établit un certificat sanitaire officiel. Ce document doit être visé par la DDPP et parfois par le Service de Coopération Vétérinaire de l'ambassade du Japon.

**Etape 7 : déclaration préalable à l'AQIS japonais**

Vous devez notifier le bureau d'inspection japonais (Animal Quarantine Service) au moins 40 jours avant l'arrivée de votre animal. La déclaration se fait en ligne sur le site de l'APHIS du Ministère de l'Agriculture japonais.

**Etape 8 : inspection à l'arrivée**

À l'aéroport de Narita ou Haneda, votre animal passe par l'inspection quarantaine (généralement 1 à 2 heures si tous les documents sont en ordre). Si tout est conforme, votre animal vous rejoint directement.

## Calendrier recommandé

| Etape | Délai avant arrivée au Japon |
|-------|----------------------------|
| Microchip | 8 mois minimum |
| Primo-vaccination + rappel | 7 mois |
| Test FAVN | 6,5 mois |
| Résultat FAVN + démarrage période 180 jours | 6 mois |
| Certificat sanitaire | 2 à 4 semaines |
| Déclaration AQIS | 40 jours minimum |

## Transport en avion avec un animal

**En cabine :** accepté par certaines compagnies (Air France, Lufthansa) pour les petits animaux jusqu'à 8 kg (animal + sac). Le sac doit tenir sous le siège. Réservez impérativement à l'avance car le nombre de places est limité.

**En soute (cargo animal) :** pour les animaux plus grands. Température régulée, mais plus de stress pour l'animal. Certaines compagnies refusent les animaux en soute selon les températures extérieures.

**Compagnies acceptant les animaux :** Air France, Japan Airlines (JAL), ANA. Vérifiez les conditions spécifiques à la réservation.

## Coûts estimés de la procédure complète

| Poste | Coût estimé |
|-------|------------|
| Microchip (si absent) | 50 à 80 euros |
| Vaccinations (primo + rappel) | 80 à 150 euros |
| Test FAVN laboratoire | 150 à 250 euros |
| Certificat sanitaire officiel | 80 à 200 euros (variable selon département) |
| Supplément transport en cabine | 50 à 200 euros selon compagnie |
| **Total estimé** | **400 à 900 euros** |

## FAQ

**Peut-on accélérer la procédure si on a moins de 6 mois avant le départ ?**

Non. Le délai de 180 jours post-test FAVN est incompressible. Si vous ne pouvez pas le respecter, votre animal sera mis en quarantaine à l'arrivée (180 jours, à vos frais, environ 300 à 400 USD par mois selon les installations).

**Les chats sont-ils soumis aux mêmes règles que les chiens ?**

Oui, exactement les mêmes règles s'appliquent aux chats et aux chiens.

**Les hôtels et appartements japonais acceptent-ils les animaux ?**

Peu d'appartements locatifs standards acceptent les animaux. Certains share houses ont des politiques "animaux bienvenus". Consultez notre [guide des quartiers pour expatriés](/blog/quartiers-tokyo-expatries-guide) pour trouver les zones où les logements "pet-friendly" sont plus fréquents.


Pour votre couverture sante pendant la periode d'installation au Japon, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement. *(lien affilie)*
---

*Pour votre logement à Tokyo, notre [guide de recherche d'appartement](/blog/trouver-appartement-tokyo-etranger) vous aide à trouver un bien adapté à votre situation. Pour toutes les démarches administratives après l'arrivée, voir notre [checklist déménagement Japon](/blog/demenager-japon-checklist-complete).*
    `.trim(),
  },
  {
    slug: 'quartiers-tokyo-familles-expatriees-guide',
    locale: 'fr',
    title: 'Meilleurs quartiers de Tokyo pour familles expatriées 2026',
    description: 'Setagaya, Meguro, Minato ou Yokohama : guide des meilleurs quartiers de Tokyo pour les familles expatriées avec enfants, écoles internationales, sécurité et loyers.',
    date: '2026-06-21',
    readingTime: '9 min',
    content: `

![Du studio à l'appartement familial : le saut de loyer par arrondissement à Tokyo](/tokyo-layout-gap.png "Un 2LDK familial coûte environ 2 à 2,8x un studio, sur 528 660 annonces réelles actives")
## Choisir son quartier à Tokyo quand on a des enfants

**Réponse rapide :** Les meilleurs quartiers de Tokyo pour familles expatriées combinent proximité des écoles internationales, espaces verts et logements plus grands : Minato (Hiroo, Azabu), Setagaya, Meguro et Shibuya en tête. Ils sont plus chers mais offrent l'infrastructure familiale. Choisissez d'abord selon l'école de vos enfants, puis le trajet.

Pour une famille expatriée, le choix du quartier est plus contraignant qu'pour un célibataire. Trois facteurs dominent la décision : la proximité de l'école internationale des enfants, la surface disponible pour le loyer payé, et l'accès aux équipements familiaux (parcs, supermarchés, hôpitaux). Ce guide passe en revue les zones les plus plébiscitées par les familles étrangères résidant à Tokyo.


![Loyer médian d'un appartement familial (2LDK) par arrondissement de Tokyo](/tokyo-family-rent-ward-fr.png "De Adachi 161k à Minato 390k pour un 2LDK, sur des annonces réelles actives")
## Setagaya-ku : le quartier famille par excellence

Setagaya est l'arrondissement préféré des familles expatriées depuis des décennies. Ses avantages :

**Surface et verdure :** grandes maisons (kodate) disponibles, nombreux parcs dont le parc de Shinjuku Gyoen (accessible en 20 min) et les zones vertes de Sangenjaya. Les rues résidentielles sont calmes et piétonnes.

**Transports :** lignes Tokyu Den-en-toshi, Tokyu Setagaya et Odakyu. Trajet vers Shibuya en 10 à 20 minutes selon l'emplacement.

**Ecoles internationales à proximité :** Tokyo International School (réseau IBO), Seisen International School, Nishimachi International School.

**Loyers typiques :** appartements 3LDK (3 chambres + salon) entre 200 000 et 350 000 ¥/mois. Maisons (kodate) entre 300 000 et 500 000 ¥/mois.

**Zones recommandées dans Setagaya :** Yoga, Sangenjaya, Daikanyama (limite Shibuya), Shimokitazawa pour un esprit plus bohème.

## Meguro-ku : central, calme et pratique

Meguro est populaire pour sa position centrale et son ambiance résidentielle tranquille malgré la proximité de Shibuya (10 minutes) et Shinjuku (15 minutes).

**Nakameguro et Aobadai** sont les zones les plus demandées. Nombreux restaurants et cafés, bonne communauté internationale, crèches bilingues.

**Ecoles à proximité :** Tokyo British School (Jiyugaoka), ASIJ (American School in Japan, accès par Jiyugaoka).

**Loyers typiques :** 2LDK entre 180 000 et 280 000 ¥/mois. Moins d'espace qu'à Setagaya pour le même prix.

## Minato-ku et Shirokane : prestige et confort

Minato est l'arrondissement premium de Tokyo, abritant de nombreuses ambassades, le quartier d'Azabu-Juban et Hiroo.

**Avantages :** communauté internationale très dense, supermarchés étrangers (National Azabu, Hiroo Stores), hôpitaux avec médecins anglophones, garde d'enfants premium.

**Transports :** Hibiya Line, Namboku Line, Mita Line. Accès Roppongi et Shibuya en moins de 15 minutes.

**Ecoles à proximité :** Nishimachi (Moto-Azabu), ASIJ, Tokyo International School.

**Loyers typiques :** plus élevés que Setagaya. 3LDK entre 300 000 et 600 000 ¥/mois selon l'immeuble.

## Yokohama : l'alternative plus spacieuse

Yokohama est souvent ignorée par les expatriés qui se concentrent sur les 23 arrondissements de Tokyo, mais c'est une erreur. A 25 à 40 minutes de Shibuya en ligne directe, Yokohama offre des appartements 15 à 25 % moins chers pour une surface supérieure.

**Zones recommandées :** Motomachi-Chinatown, Yamate, Minato Mirai, Tsunashima.

**Ecoles internationales :** Yokohama International School (YIS, IBO), St. Maur International School, Yokohama YMCA Academy.

**Loyers typiques :** 3LDK entre 140 000 et 220 000 ¥/mois, maisons (kodate) entre 200 000 et 350 000 ¥/mois.

## Comparatif résumé

| Zone | Loyer 3LDK | Esprit | Ecoles INT à proximité |
|------|-----------|--------|----------------------|
| Setagaya | 200-350k ¥ | Résidentiel, verdure | Seisen, TIS, Nishimachi |
| Meguro | 180-280k ¥ | Central, branché | BST, ASIJ |
| Minato (Hiroo/Azabu) | 300-600k ¥ | Prestige, commodités | Nishimachi, ASIJ |
| Yokohama | 140-220k ¥ | Espace, calme | YIS, St Maur |

## Conseils pratiques pour les familles

**Vérifiez le secteur scolaire avant de signer le bail.** Les écoles internationales n'ont pas de secteur scolaire au sens strict, mais la navette scolaire couvre des zones précises. Confirmez que l'adresse de votre futur appartement est desservie.

**Privilégiez un immeuble avec une salle de jeux ou une cour.** De nombreux immeubles résidentiels modernes à Tokyo n'ont pas d'espaces communs. Pour les familles avec jeunes enfants, la proximité d'un parc est cruciale.

**Testez le trajet école en heures de pointe.** Ce qui semble simple en dehors des heures de pointe peut devenir éprouvant à 7h30 avec des enfants.

## FAQ

**Les Japonais acceptent-ils les familles avec enfants comme locataires ?**

Oui, en général. Les familles sont même souvent préférées aux groupes de jeunes adultes par les propriétaires. Certains immeubles anciens sont moins bien insonorisés pour les enfants en bas âge. Notre [guide de location à Tokyo](/blog/trouver-appartement-tokyo-etranger) décrit comment présenter votre dossier de manière optimale.

**Les crèches et jardins d'enfants publics acceptent-ils les étrangers ?**

Oui, sous réserve de places disponibles. L'inscription se fait via la mairie de l'arrondissement. Prévoyez une liste d'attente dans les zones très demandées (Minato, Setagaya). Les mairies disposent généralement de services de traduction pour les familles étrangères.


Pour explorer les quartiers familiaux de Tokyo avant votre installation, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) propose des visites guidees et activites en famille reservables en ligne. *(lien affilie)*
---

*À lire aussi : [Meilleurs quartiers de Tokyo pour les expatriés : guide complet 2026](/blog/quartiers-tokyo-expatries-guide).*

*Pour votre logement dans ces quartiers, consultez notre [guide de recherche d'appartement à Tokyo](/blog/trouver-appartement-tokyo-etranger) ou [contactez-nous](/contact) pour une sélection ciblée selon votre école et votre budget.*
    `.trim(),
  },
  {
    slug: 'tokyo-osaka-ou-vivre-expatrie-comparatif',
    locale: 'fr',
    title: 'Tokyo ou Osaka pour vivre : comparatif expatrié 2026',
    description: 'Coût de la vie, emploi, logement et ambiance : comparaison complète entre Tokyo et Osaka pour choisir la meilleure ville japonaise pour votre expatriation en 2026.',
    date: '2026-06-21',
    readingTime: '8 min',
    content: `
## Tokyo vs Osaka : quelle ville choisir pour s'expatrier au Japon ?

**Réponse rapide :** Tokyo offre plus d'emplois internationaux, de services et de dynamisme, mais des loyers plus élevés et un rythme intense. Osaka est plus abordable, plus chaleureuse et plus décontractée, avec une excellente gastronomie. Pour un maximum d'opportunités professionnelles, choisissez Tokyo ; pour le rapport qualité-prix et la convivialité, Osaka.

La question revient souvent chez les expatriés qui découvrent que le Japon ne se résume pas à Tokyo. Osaka, deuxième agglomération économique du Japon avec 2,7 millions d'habitants en ville centrale (19 millions dans l'agglomération Keihanshin avec Kobe et Kyoto), offre une alternative sérieuse à la capitale. Ce comparatif vous aide à choisir.

## Emploi et économie : Tokyo sans équivalent

Pour la grande majorité des secteurs professionnels, Tokyo reste sans équivalent.

**Tokyo :** siège de 60 % des multinationales opérant au Japon, du secteur financier (Marunouchi, Otemachi), de la tech (Shibuya, Minato), des médias et de la mode. Le marché de l'emploi anglophone est le plus développé du pays.

**Osaka :** forte en commerce international (le port d'Osaka est le deuxième de la région), en pharmaceutique (Takeda, Shionogi), en agroalimentaire (Nestlé Japan, Ajinomoto) et en technologie industrielle (Panasonic, Sharp). Le marché anglophone existe mais reste plus étroit.

**Verdict emploi :** Tokyo pour la finance, la tech, les multinationales, les postes de direction. Osaka si votre secteur spécifique y est représenté ou si vous créez votre propre activité.

## Coût de la vie : Osaka moins cher, mais pas révolutionnaire

| Poste | Tokyo | Osaka |
|-------|-------|-------|
| Loyer 1LDK (central) | 100 000 à 180 000 ¥/mois | 70 000 à 130 000 ¥/mois |
| Repas restaurant moyen | 1 000 à 2 000 ¥ | 800 à 1 500 ¥ |
| Courses hebdomadaires pour 1 personne | 5 000 à 8 000 ¥ | 4 000 à 7 000 ¥ |
| Abonnement transport mensuel (trajet moyen) | 10 000 à 15 000 ¥ | 8 000 à 12 000 ¥ |

Osaka est généralement 15 à 25 % moins chère que Tokyo sur le logement. Pour la nourriture, la différence est réelle mais moins marquée.

**Avantage spécifique d'Osaka :** la gastronomie. Osaka a la réputation (méritée) d'être la capitale culinaire du Japon. Les prix des restaurants y sont souvent inférieurs pour une qualité équivalente ou supérieure.

## Logement : Osaka plus accessible

Pour un appartement 1LDK central (Namba, Shinsaibashi, Umeda), comptez 70 000 à 120 000 ¥/mois. L'équivalent à Shibuya ou Shinjuku à Tokyo serait 100 000 à 160 000 ¥/mois.

Osaka dispose aussi de nombreux quartiers résidentiels de qualité à 30 à 45 minutes du centre (Toyonaka, Suita, Nishinomiya) où les loyers sont encore plus abordables.

En revanche, l'offre d'appartements meublés ou de share houses premium pour expatriés est beaucoup moins développée qu'à Tokyo. Notre [guide sur les appartements meublés à Tokyo](/blog/appartement-meuble-tokyo-expats) n'a pas d'équivalent pour Osaka : le marché y est moins structuré.

## Transports : les deux villes sont excellentes

Les deux métros sont efficaces, ponctuels et bien couverts. Osaka est de taille plus compacte que Tokyo, ce qui rend les trajets globalement plus courts.

**Osaka :** 8 lignes de métro (Municipal Subway), réseau JR, lignes privées Hankyu, Hanshin, Kintetsu, Nankai. Le trajet depuis Namba jusqu'à la gare d'Osaka dure 10 minutes.

**Tokyo :** réseau métro plus étendu (13 lignes), plus de lignes JR et de lignes privées. Les trajets sont plus longs mais la couverture est extrêmement dense.

**Avantage Osaka :** accès rapide à Kyoto (15 minutes en Shinkansen ou 28 minutes par Hankyu), Kobe (30 minutes) et Nara (40 minutes). Ideal pour les weekends.

## Ambiance et qualité de vie

L'ambiance des deux villes est fondamentalement différente.

**Tokyo :** plus formelle, plus internationale, plus verticale dans ses hiérarchies sociales. Les Tokyoïtes ont la réputation d'être moins spontanément chaleureux avec les étrangers, mais la communauté expatriée y est extrêmement développée avec de nombreux événements dédiés.

**Osaka :** les habitants d'Osaka (Osakans) ont la réputation d'être les plus chaleureux et les plus directs du Japon. Le dialecte local (Kansai-ben) est coloré et expressif. La culture de rue (takoyaki, okonomiyaki), les marchés d'Osaka (Kuromon Ichiba), et l'esprit commerçant de la ville créent une atmosphère différente.

## Pour qui choisir quoi ?

| Profil | Tokyo | Osaka |
|--------|-------|-------|
| Cadre multinational | Idéal | Possible si secteur représenté |
| Entrepreneur / freelance | Bonne communauté | Plus calme, coûts inférieurs |
| Famille avec enfants | Plus d'écoles INT | Moins d'options INT |
| Budget serré | Challenging | Plus accessible |
| Aime la gastronomie / ambiance locale | Bien mais formel | Excellent |
| Envisage des weekends fréquents à Kyoto | 2h30 Shinkansen | 15 min Shinkansen |

## FAQ

**Peut-on travailler à Tokyo depuis Osaka ?**

La distance Tokyo-Osaka est de 515 km, soit 2h30 en Shinkansen (environ 13 000 ¥ aller simple). Certains professionnels font ce trajet hebdomadaire en bullet train (shinkansen teiki), un abonnement annuel existant. C'est inhabituel mais pratiqué dans certains secteurs.

**Les démarches administratives sont-elles identiques à Tokyo ?**

Oui, les procédures (carte de résidence, assurance maladie, compte bancaire, numéro My Number) sont les mêmes partout au Japon. Les formalités se font auprès de votre mairie locale.


Pour vivre l'experience gastronomique de Tokyo avant de choisir votre ville, [Arigato Travel](https://tours.arigatojapan.co.jp/?rfsn=91948) propose des food tours dans les quartiers de Tokyo guides par des locaux. *(lien affilie)*
---

*À lire aussi : [Tokyo, Osaka ou Kyoto : quelle ville choisir pour s'installer ?](/blog/tokyo-osaka-kyoto-ou-s-installer).*

*Si Tokyo est votre choix, notre [guide complet de logement pour expatriés](/blog/trouver-appartement-tokyo-etranger) vous aide à trouver un appartement rapidement. Pour les démarches d'arrivée, consultez notre [checklist déménagement Japon](/blog/demenager-japon-checklist-complete).*
    `.trim(),
  },
  {
    slug: 'send-money-to-japan-from-abroad',
    locale: 'en',
    title: 'How to Send Money to Japan from Abroad (2026)',
    description: 'Wise, Revolut or bank transfer: compare the best ways to transfer money to Japan in 2026. Honest fee comparison, transfer limits and tips for expats receiving income abroad.',
    date: '2026-06-21',
    readingTime: '7 min',
    content: `
## Sending Money to Japan: Your Options in 2026

**Quick answer:** To send money to Japan, online services (Wise, Revolut) almost always beat traditional banks on rate and fees. Compare the real exchange rate, not just the advertised fee. To receive a local salary, you will need a Japanese bank account.

Whether you receive a salary from abroad, repay a loan at home, or send money to family, international transfers are a regular part of expat life in Japan. Traditional banks make this expensive. Here is an honest comparison of the best alternatives.

## Wise: The Go-To for Most Japan Expats

Wise (formerly TransferWise) uses the real mid-market exchange rate with no hidden markup. This makes it consistently the most competitive option for transfers to Japan.

**Typical fees EUR to JPY:**
- Fixed fee: approximately 0.40 EUR + 0.47% of the amount
- For a 1,000 EUR transfer: around 5 to 6 EUR total in fees
- Transfer time: instant to 24 hours for most currencies

**Receiving on a Japanese bank account:** Wise supports transfers to most Japanese banks. You will need your 3-digit branch code (店番), 7-digit account number (口座番号), and account type (普通 for standard savings). Rakuten Bank, PayPay Bank and Shinsei Bank receive Wise transfers without reception fees. For opening a Japanese bank account, see our [guide to opening a bank account in Japan](/blog/open-bank-account-japan-foreigner).

## Revolut: Best for Frequent Small Amounts

The free Revolut plan offers up to 1,000 EUR of currency exchange per month at the interbank rate (excluding weekends). The Premium plan at 7.99 EUR per month removes this cap.

**Strengths:** simple interface, JPY virtual card available, instant notification.

**Limitation:** on weekends, Revolut adds a 0.5 to 1% markup on the exchange rate. For large transfers, Wise remains more competitive.

## Traditional Bank Wire (SWIFT): Avoid If Possible

A standard SWIFT transfer from a UK, US or French bank to a Japanese bank typically costs:

- 25 to 45 EUR in fixed outgoing fees
- A 2 to 4% exchange rate margin
- 1,000 to 2,000 ¥ in reception fees at the Japanese end

For a 1,000 EUR transfer, you lose 60 to 90 EUR more than with Wise. Over a year with monthly transfers, the difference exceeds 700 EUR.

## Comparison Table

| Service | Fees on 1,000 EUR | Speed | Best use |
|---------|------------------|-------|----------|
| Wise | 5 to 6 EUR | 0 to 1 day | Regular transfers of any amount |
| Revolut (free) | 0 EUR up to 1,000 EUR/month | 1 to 2 days | Frequent small amounts |
| Western Union | 15 to 25 EUR | 0 to 1 day | Emergencies only |
| Bank wire (SWIFT) | 60 to 90 EUR | 3 to 5 days | Avoid |

## Best Japanese Accounts for Receiving International Transfers

**PayPay Bank:** accepts SWIFT and Wise transfers, fully English interface, can be opened online with a residence card. Best option for new arrivals.

**Rakuten Bank:** well integrated with Wise, bilingual interface, no reception fees.

**Shinsei Bank:** historically the expat bank of choice in Tokyo. English customer support available, free international incoming transfers.

## Tax Considerations

If you live in Japan and receive income from abroad, this income is generally subject to Japanese income tax depending on your residency status. Tax returns are filed each March for the previous calendar year. See our [complete Japan income tax guide for foreigners](/blog/japan-income-tax-foreigners-guide) for details on your obligations.

## FAQ

**Can I use Wise to send money from Japan back to Europe?**

Yes. Wise works in both directions. The JPY to EUR direction is available with similar competitive fees.

**Are there transfer limits?**

Wise allows up to the equivalent of 1 million GBP per transfer. Free Revolut caps currency exchange at 1,000 EUR per month at the interbank rate.

**Do I need to declare international transfers received in Japan?**

The transfers themselves are not automatically reported, but the income they represent is. The NTA (National Tax Agency) may request justification for large or regular incoming transfers.


For health coverage as an expat in Japan, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment, designed for foreign residents in Japan. *(affiliate link)*
---

*For banking setup in Japan, our [bank account opening guide](/blog/open-bank-account-japan-foreigner) covers the best banks for expats. For your full relocation to Tokyo, see our [complete moving checklist](/blog/moving-to-tokyo-checklist-2026).*
    `.trim(),
  },
  {
    slug: 'japanese-language-schools-tokyo-guide',
    locale: 'en',
    title: 'Best Japanese Language Schools in Tokyo (2026 Guide)',
    description: 'Coto Academy, ISI, Berlitz or online lessons: compare Japanese language schools in Tokyo by price, teaching method and schedule to find the right fit for your level and goals.',
    date: '2026-06-21',
    readingTime: '8 min',
    content: `
## Learning Japanese in Tokyo: Where to Start

**Quick answer:** To learn Japanese in Tokyo, options include full-time language schools (which can sponsor a student visa), evening classes for working people, online lessons with native teachers, and free language exchanges. Start with the kana (hiragana and katakana), then aim for the JLPT as a goal. Choose by your budget and available time.

Even in a fully English-speaking work environment, knowing Japanese dramatically changes the quality of life in Tokyo. For administrative tasks, apartment hunting, medical appointments and everyday interactions, a few hundred words make the experience completely different. This guide compares the main options for resident expats.

## Coto Academy: Best for Working Professionals

Coto Academy is arguably the Japanese school best adapted to expats who hold a full-time job. All instruction is in English, and the schedule includes evening and weekend options.

**Strengths:**
- Small groups of 4 to 6 students maximum
- Content focused on real-life situations and business Japanese
- Evening classes available from 19:00
- Locations in Shinjuku, Ichigaya and online

**Typical cost:** 15,000 to 30,000 ¥ per month for group classes depending on intensity. Private lessons at approximately 4,000 to 5,000 ¥ per hour.

## ISI Language School: Best for Full-Time Students

ISI is primarily designed for students on a student visa who want to prepare for the JLPT (Japanese Language Proficiency Test) or apply to a Japanese university. Less flexible for professionals in employment, but with a solid, structured curriculum.

**Available levels:** complete beginner through JLPT N1. Programs of 6 to 24 months with support for obtaining a student visa.

## Berlitz Japan: Best for Corporate Learners

Berlitz offers one-to-one lessons tailored to corporate clients. Ideal if your employer covers language training costs.

**Strength:** highly flexible scheduling, lessons possible at your office or home. Trainers available in the evening and on weekends.

**Weakness:** among the most expensive options, limited group conversation classes.

## Apps and Online Resources: Your Essential Complement

For expats short on time, or to reinforce classroom learning:

- **Anki:** flashcard software for kanji and vocabulary. Free and very effective with 20 minutes daily.
- **WaniKani:** kanji learning via radicals, gamified progression. 9 USD per month.
- **iTalki:** online lessons with native Japanese tutors. 15 to 25 USD per hour.
- **NHK Web Easy:** real news articles written in simplified Japanese. Free.
- **HelloTalk:** language exchange with native Japanese speakers learning your language.

## Understanding JLPT Levels

The JLPT (日本語能力試験) is the international standard for certifying Japanese proficiency. Five levels from N5 (beginner) to N1 (near-native). For everyday life in Tokyo, N4 is comfortably sufficient. To work in Japanese, N2 is generally expected.

| Level | Description | Approximate study hours |
|-------|-------------|------------------------|
| N5 | Hiragana, katakana, 100 kanji, basic phrases | 150 hours |
| N4 | Simple daily conversations | 300 hours |
| N3 | Signs, simplified news, basic reading | 450 hours |
| N2 | Partial Japanese work environment | 600 hours |
| N1 | Professional native-equivalent level | 900+ hours |

## First Priority: Master Hiragana and Katakana

Before enrolling in any school, invest 2 to 3 weeks in memorising hiragana and katakana. These two 46-character syllabaries cover all spoken Japanese and a large part of written Japanese. Apps like Kana Mind or Duolingo teach them in 10 to 20 minutes per day. Once mastered, every lesson at school becomes twice as efficient.

## Realistic Monthly Budgets

| Option | Monthly cost | Learning pace |
|--------|-------------|--------------|
| Group classes (Coto, ISI) | 15,000 to 30,000 ¥ | Fast with structure |
| Private lessons | 40,000 to 80,000 ¥ | Very fast |
| Apps only | 1,000 to 2,000 ¥ | Slow without discipline |
| Online tutors ([iTalki](https://www.italki.com/affshare?ref=af32660342)) | 10,000 to 20,000 ¥ | Flexible |

## FAQ

**Is Japanese necessary to live in Tokyo?**

Not strictly. But expats who learn, even at a basic level, report a significantly richer and less stressful experience. Administrative barriers are real in Japan.

**Does knowing Japanese help find an apartment?**

Definitely. Even basic phrases help with agency visits and understanding contract terms. Our [guide to finding an apartment in Tokyo](/blog/find-apartment-tokyo-foreigner) explains the full rental process step by step.

**Which option if I work five days a week?**

Coto Academy for group evening classes, and [iTalki](https://www.italki.com/affshare?ref=af32660342) for flexible weekend private lessons.

---

*For your full Tokyo setup, our [Tokyo expat moving checklist](/blog/moving-to-tokyo-checklist-2026) covers all administrative steps. For housing, see our [guide to finding an apartment in Tokyo](/blog/find-apartment-tokyo-foreigner).*
    `.trim(),
  },
  {
    slug: 'convert-foreign-driving-licence-japan',
    locale: 'en',
    title: 'How to Convert Your Foreign Driving Licence in Japan',
    description: 'Step-by-step guide to converting a EU, US, UK, Canadian or Australian driving licence to a Japanese licence in 2026: required documents, test centres and costs explained.',
    date: '2026-06-21',
    readingTime: '8 min',
    content: `
## Converting a Foreign Driving Licence in Japan: What You Need to Know

**Quick answer:** To drive long-term in Japan, convert your foreign licence (gaimen kirikae) at a licence centre, with an official translation (often via JAF), residence documents, and sometimes a written and practical test. Some countries, including France, Switzerland and Belgium, get a simplified conversion. An international permit is valid for only one year.

Japan recognises foreign licences under the Geneva Convention, but only for temporary visitors. Once you become a resident (residence card obtained), you must convert your foreign licence to a Japanese one to drive legally. The good news: nationals of France, most EU countries, Australia, New Zealand, Canada and the UK benefit from a simplified procedure with no practical driving test.

## Countries Eligible for Simplified Conversion (No Driving Test)

The list includes France, Belgium, Switzerland, Germany, Italy, the Netherlands, Australia, New Zealand, Canada, the United Kingdom, and most EU member states.

US nationals are generally NOT eligible for simplified conversion (with some state exceptions) and must pass a practical driving test.

## Required Documents

1. Your original foreign driving licence
2. An official Japanese translation of your licence (JAF translates most EU licences; see below)
3. Your original passport plus photocopy (all pages with stamps)
4. Your residence card (zairyu card) plus photocopy
5. Your resident certificate (juminhyo) from your ward office
6. 2 recent passport photos (30 mm x 24 mm, white background)
7. Proof that you were resident in your home country for at least 3 months after your licence was issued (bank statements, employment contract or multiple passport entry stamps)

**JAF translation:** The Japan Automobile Federation (JAF) provides official translations for most European licences. Cost: approximately 3,000 ¥. Processing time: 1 to 5 business days. Find your nearest JAF branch at jaf.or.jp.

## Where to Go: Licence Examination Centres

Conversion is processed only at official driver's licence examination centres (運転免許試験場). For Tokyo:

- **Fuchu Driver's Licence Centre:** accessible from Kokubunji by bus (10 minutes)
- **Koto Driver's Licence Centre:** accessible from Tatsumi station (Rinkai Line)
- **Samezu Driver's Licence Centre:** accessible from Samezu station (Keikyu Line)

No online appointment system exists. Arrive at opening time (typically 8:30) and expect to spend a full day.

## The Simplified Conversion Process (Eligible Countries)

1. Document check at the counter (allow 30 to 60 minutes for review)
2. Vision and colour test (approximately 5 minutes)
3. Written highway code questionnaire (10 questions, available in English and several other languages)
4. Wait and collection of Japanese licence (usually the same day)

**Total cost:** approximately 2,350 ¥ for the Japanese licence, plus JAF translation fees.

## Practical Driving Test (Non-Eligible Countries)

If your country is not eligible for simplified conversion, you must complete:

1. A written road rules test (available in English, Chinese, French and other languages)
2. A practical driving test on a dedicated circuit (not on public roads)

The practical test follows a very precise Japanese protocol: specific mirror checks, hand placement, verbal confirmations at intersections. Many applicants fail on their first attempt due to unfamiliarity with the procedure rather than actual driving ability. Preparation courses in English are available at some centres.

## The Critical 3-Month Rule

Japanese authorities must verify that you were actually using your licence in your home country for at least 3 months after it was issued. If your passport shows that you arrived in Japan within 3 months of obtaining your licence, the conversion may be refused.

In this case, you typically need to wait or provide additional evidence: bank statements, utility bills, employment records in your home country dated after the licence issue date.

## What About an International Driving Permit?

An International Driving Permit (IDP) under the Geneva Convention is valid in Japan for one year after arrival. However, once you register at a ward office and obtain a juminhyo (resident certificate), you are treated as a resident and must convert your licence. Continuing to drive on an IDP as a registered resident is an infraction.

## FAQ

**How long is the process from start to finish?**

The actual conversion day takes 4 to 8 hours at the centre. But preparation time matters: gathering documents, getting the JAF translation (up to 5 days) and booking a day off work typically means 1 to 2 weeks of preparation.

**Is the Japanese licence permanent?**

Yes. A Japanese licence obtained by conversion is identical to one obtained by examination. It renews on the same schedule: every 3 to 5 years depending on your driving record.

**Can I drive in Japan with just an EU or UK licence?**

For the first year after arrival (or as a tourist), yes, with an IDP. As a registered resident, you must convert. Traffic fines for driving on an expired conversion right are the same as for unlicensed driving.


For health coverage during your admin process, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment. To navigate the process in Japanese, [iTalki](https://www.italki.com/affshare?ref=af32660342) offers lessons with native teachers from $10/hour. *(affiliate links)*
---

*For housing near convenient transport links, our [Tokyo neighbourhoods guide for expats](/blog/tokyo-neighbourhoods-expats-guide) helps you choose by commute line. For all administrative steps after arrival, see our [complete moving checklist](/blog/moving-to-tokyo-checklist-2026).*
    `.trim(),
  },
  {
    slug: 'international-moving-company-japan-guide',
    locale: 'en',
    title: 'Best International Moving Companies to Japan (2026)',
    description: 'Crown Relocations, Asian Tigers or Nippon Express: compare international movers to Japan on price, service and container options. Practical guide for expats shipping belongings.',
    date: '2026-06-21',
    readingTime: '8 min',
    content: `
## Shipping Your Belongings to Japan: How to Choose a Mover

**Quick answer:** For an international move to Japan, compare several quotes (sea freight is cheaper but slow; air is fast but costly). Check insurance, customs clearance, and door-to-door delivery. Move light: many Japanese homes are small, and buying locally is often simpler than shipping.

An international move to Japan from Europe or North America takes 4 to 8 weeks by sea, or 5 to 10 days by air. Japanese customs rules are strict, paperwork is significant, and lead times are often underestimated. This guide gives you what you need to select the right provider and avoid the most common mistakes.

## The Main International Movers Operating to Japan

### Crown Relocations

Crown is one of the global leaders in corporate relocation and operates one of the largest Japan-specific networks. Their service is end-to-end: professional packing, ocean or air freight, Japanese customs clearance, delivery and assembly.

**Strengths:** complete all-inclusive service, bilingual coordinators, full insurance options, deep Japan experience.

**Estimated cost:** 3,000 to 8,000 USD for a 50 to 80 sqm apartment by sea (20 to 30 cubic metres).

### Asian Tigers Japan

Asian Tigers specialises in international relocation across Asia. Their pricing is typically 10 to 20% below Crown with comparable service quality.

**Strengths:** competitive pricing, strong English-language customer service, experienced customs clearance team in Japan.

### Nippon Express International

Nippon Express is Japan's dominant logistics operator. Their advantage: unmatched last-mile delivery network across Japan, including rural areas.

**Best for:** expats who want to ship belongings before arrival and receive them reliably anywhere in Japan.

### Yamato Transport (International Takkyubin)

For small volumes, Yamato offers international parcel shipping (TA-Q-BIN International) from many countries. Practical for clothes, books and electronics without heavy furniture.

## Sea Freight vs Air Freight

| Criteria | Sea (FCL/LCL) | Air |
|----------|---------------|-----|
| Transit time | 4 to 8 weeks | 5 to 10 days |
| Cost per cubic metre | 100 to 200 USD | 400 to 800 USD |
| Minimum recommended volume | 5 cbm (LCL) | Any |
| Best for | Furniture, appliances, large quantities | Clothes, documents, urgent items |

Most expats use a hybrid approach: essential items by air (checked luggage or air freight) and the bulk by shared sea container (LCL).

## Japanese Customs Rules

**What enters duty-free:** personal used effects, clothing, books, personal computers. No value limit for genuinely used personal belongings.

**What is taxed:** new electronics, alcohol above quotas, some food items.

**What is prohibited:** certain medications that are legal in other countries (including some ADHD medications, certain antihistamines, and products containing pseudoephedrine). Verify your medications against Japan's restricted list before shipping.

**Customs certificate:** to benefit from the duty exemption on personal effects, you need documentation confirming your resident status in Japan (visa, residence card or consular letter).

## Practical Timeline

**3 months before:** request quotes from at least 3 providers. Book your sea freight slot as early as possible, especially for June-September departures (peak corporate relocation season).

**6 weeks before:** prepare a detailed inventory list (required by Japanese customs). Sort and sell or donate anything not worth the shipping cost.

**4 weeks before:** professional packing if included in your contract. Otherwise, begin packing low-priority rooms.

**On arrival:** your mover handles customs clearance, but you or an authorised representative must be present for delivery. Confirm elevator access or notify your landlord in advance for large items.

## Estimated Total Cost for Different Move Sizes

| Move size | Sea freight cost |
|-----------|-----------------|
| Studio or 1-bedroom (10 to 15 cbm) | 1,500 to 3,500 USD |
| 2-bedroom apartment (20 to 30 cbm) | 3,000 to 6,000 USD |
| Family home (40 to 60 cbm) | 5,000 to 10,000 USD |

Costs above include packing, transport, customs clearance and delivery. Insurance is typically quoted separately at 0.5 to 1% of declared value.

## What to Leave Behind

Japanese apartments are significantly smaller than European or American homes. A 3LDK (three-bedroom) Japanese apartment is approximately 75 to 90 sqm. European sofas, beds, and wardrobes often do not fit through Japanese doorways or elevators. Many expats store or sell large furniture rather than ship it.

See our [Tokyo neighbourhoods guide](/blog/tokyo-neighbourhoods-expats-guide) for typical apartment layouts by area, and our [furnished apartment guide](/blog/furnished-apartment-tokyo-no-guarantor) if you prefer to arrive and find a ready-to-live-in space.

## FAQ

**Do I need to be present in Japan for delivery?**

Generally yes. Most movers require your presence or an authorised representative to sign delivery documents and inspect for damage.

**Can I ship a car to Japan?**

Yes, but it is complex and expensive. Japan drives on the left, so right-hand drive vehicles from Australia and the UK are simpler to register. Left-hand drive vehicles require a safety inspection and often modifications.


For health coverage during your move, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment, activatable before your arrival in Japan. *(affiliate link)*
---

*See also: [Moving to Tokyo in 2026: Complete Expat Checklist](/blog/moving-to-tokyo-checklist-2026).*

*For your housing in Japan once your belongings arrive, see our [guide to finding an apartment in Tokyo](/blog/find-apartment-tokyo-foreigner) or [contact us](/contact) for a personalised apartment search.*
    `.trim(),
  },
  {
    slug: 'bringing-pets-to-japan-guide',
    locale: 'en',
    title: 'Bringing Pets to Japan: Import Guide for Cats and Dogs',
    description: 'How to bring your cat or dog to Japan without a 180-day quarantine: rabies titre test, microchip, health certificate and the exact timeline to follow in 2026.',
    date: '2026-06-21',
    readingTime: '9 min',
    content: `
## Importing Pets to Japan: Strict Rules, Manageable Process

**Quick answer:** Bringing a dog or cat to Japan takes long preparation (up to seven months ahead): microchip, rabies vaccinations, a blood titer test, then a waiting period. Skip these steps and your pet can be quarantined for up to 180 days. Notify the arrival airport in advance and follow the ministry (MAFF) rules exactly.

Japan applies one of the strictest animal import protocols in the world. The procedure is long and must be followed precisely. If any step is missed or timed incorrectly, your pet may face a mandatory 180-day quarantine in a government facility at your expense. This guide covers cats and dogs imported from Europe, Canada and Australia.

Most European countries (including France, Germany, the UK, Italy, Spain, the Netherlands and Belgium) are classified in Japan's "Zone B." This means you can avoid quarantine entirely, but only if you follow a very precise step-by-step protocol over at least 7 months before travel.

## The 8-Step Protocol (Zone B Countries)

**Step 1: ISO Microchip**

Your pet must be identified with a microchip compliant with ISO 11784 or 11785 standard. If your pet has an older non-ISO chip, a new one must be implanted before any vaccination. Microchipping must be done first.

**Step 2: First Rabies Vaccination**

Administered after the microchip is confirmed to be reading correctly. The vaccine batch number and date must be recorded in your vet's records.

**Step 3: Rabies Booster**

If your pet had no previous valid rabies vaccination, a booster is required 30 days after the primary shot.

**Step 4: Rabies Neutralising Antibody Test (FAVN or RFFIT)**

This is the most critical step. A blood sample is collected by your vet and sent to a laboratory accredited by Japan. The result must be 0.5 IU/ml or higher.

Accredited laboratories in Europe include ANSES Nancy (France), the national veterinary institute in the Netherlands (CIDC), and several others. Check the current list on Japan's Animal Quarantine Service website (maff.go.jp/aqs).

**Step 5: Wait 180 Days**

After a passing FAVN result, you must wait exactly 180 days before bringing your pet to Japan. This is the major constraint. If you are moving in 9 months, start the protocol today.

**Step 6: Official Health Certificate**

No earlier than 7 days before export, your vet (working with your national authority) issues an official export health certificate. This must be endorsed by the relevant government authority and submitted to Japan's Animal Quarantine Service.

**Step 7: Pre-Arrival Notification**

At least 40 days before arrival, submit an import notification to Japan's Animal Quarantine Service online. Without this, your pet cannot enter Japan.

**Step 8: Arrival Inspection**

At Narita or Haneda airport, your pet goes through an animal quarantine inspection (typically 1 to 3 hours if all documents are in order). If everything is correct, your pet joins you directly.

## Recommended Timeline

| Step | Time before Japan arrival |
|------|--------------------------|
| Microchip implanted | 8+ months |
| Primary rabies vaccination | 7.5 months |
| Booster vaccination (if needed) | 7 months |
| FAVN blood test sent to lab | 6.5 months |
| FAVN result received (start 180-day count) | 6 months |
| Pre-arrival notification filed | 40 days |
| Health certificate issued | 7 to 10 days |

## Flying to Japan with a Pet

**In cabin:** accepted by some airlines (Air France, Japan Airlines, ANA) for small pets under approximately 8 kg including the carrier. The carrier must fit under the seat in front. Book early as spots are strictly limited.

**In hold (cargo animal):** for larger pets. Temperature regulated, but more stressful for the animal. Some airlines refuse hold animals above certain outside temperatures. Avoid summer travel (July to August) if possible.

**Airlines accepting pets on Japan routes:** Air France, JAL, ANA, Lufthansa. Always confirm pet policy at booking as rules change.

## Complete Cost Estimate

| Item | Estimated cost |
|------|---------------|
| Microchip (if absent) | 50 to 100 EUR |
| Vaccinations (primary and booster) | 80 to 150 EUR |
| FAVN laboratory test | 150 to 300 EUR |
| Official health certificate | 80 to 250 EUR |
| In-cabin air supplement | 50 to 200 EUR |
| **Total** | **450 to 1,000 EUR** |

## Finding Pet-Friendly Housing in Tokyo

Very few standard Tokyo rental apartments accept pets. The market for pet-friendly accommodation is narrow and more expensive. Some share houses with specific "pet welcome" policies exist. The Setagaya and Nerima wards, with more low-rise residential buildings, tend to have slightly better availability.

For housing tips, our [guide to finding an apartment in Tokyo](/blog/find-apartment-tokyo-foreigner) explains how to communicate pet ownership clearly in your application and which agencies have experience placing expats with animals.

## FAQ

**Can I speed up the 180-day wait?**

No. The 180-day post-FAVN wait is non-negotiable under Japanese law. Pets arriving before the 180 days are complete will be held in quarantine for the remainder of the waiting period, at your expense (approximately 150 to 400 USD per month depending on the facility).

**Do cats and dogs follow the same rules?**

Yes. Identical rules apply to both species.

**What happens if a document is wrong at the airport?**

Your pet will be quarantined while corrections are made. This can take days or weeks. Japanese animal quarantine officers are very thorough. Having a bilingual representative who understands the protocol review your documents before travel is strongly recommended.


For health coverage during your relocation to Japan, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment. *(affiliate link)*
---

*For your relocation to Tokyo, our [complete moving checklist](/blog/moving-to-tokyo-checklist-2026) covers all administrative steps. For housing options, see our [guide to finding an apartment in Tokyo](/blog/find-apartment-tokyo-foreigner).*
    `.trim(),
  },
  {
    slug: 'best-neighbourhoods-families-tokyo-guide',
    locale: 'en',
    title: 'Best Tokyo Neighbourhoods for Expat Families (2026)',
    description: 'Setagaya, Meguro, Minato or Yokohama: guide to the best Tokyo areas for families with children, covering international schools, safety, housing costs and commute options.',
    date: '2026-06-21',
    readingTime: '9 min',
    content: `

![From a studio to a family flat: the Tokyo rent jump by ward](/tokyo-layout-gap.png "A 2LDK family flat costs about 2 to 2.8x a studio, from 528,660 real active listings")
## Choosing a Tokyo Neighbourhood as an Expat Family

**Quick answer:** The best Tokyo neighbourhoods for expat families combine proximity to international schools, green space and larger homes: Minato (Hiroo, Azabu), Setagaya, Meguro and Shibuya lead the list. They cost more but offer the family infrastructure. Choose by your children's school first, then the commute.

For a family relocating to Tokyo, neighbourhood choice involves more constraints than for a single professional. Three factors typically drive the decision: proximity to your children's international school, the amount of space you can get for your housing budget, and access to family infrastructure such as parks, supermarkets and English-speaking medical services. This guide covers the most popular areas among expat families.


![Family flat (2LDK) median rent by Tokyo ward, cheapest to priciest](/tokyo-family-rent-ward-en.png "From Adachi 161k to Minato 390k for a 2LDK, from real active listings")
## Setagaya Ward: The Classic Family Choice

Setagaya is the ward most consistently chosen by expat families. It combines residential calm, green space, larger apartment sizes and strong access to international schools.

**Space and greenery:** 3-bedroom apartments (3LDK) and detached houses (kodate) are available at reasonable prices by Tokyo standards. Large parks including Kinuta and Setagaya Park offer outdoor space rare in central Tokyo.

**Transport:** Tokyu Den-en-toshi Line, Tokyu Setagaya Line and Odakyu Line. Connections to Shibuya in 10 to 20 minutes depending on location.

**Nearby international schools:** Tokyo International School (IB), Seisen International School, Nishimachi International School.

**Typical rents:** 3LDK apartments 200,000 to 350,000 ¥/month. Detached houses 300,000 to 500,000 ¥/month.

**Recommended areas within Setagaya:** Yoga, Sangenjaya, Todoroki (near Nakameguro), Chitose-Karasuyama.

## Meguro Ward: Central, Quiet, Well-Connected

Meguro offers a central position with a residential feel despite its proximity to Shibuya (10 minutes) and Shinjuku (15 minutes).

Nakameguro and Aobadai are the most sought-after pockets within Meguro. Strong international community, bilingual daycare options and good restaurant variety.

**Nearby international schools:** British School in Tokyo (Jiyugaoka), American School in Japan (ASIJ, accessible from Jiyugaoka).

**Typical rents:** 2LDK apartments 180,000 to 280,000 ¥/month. Less space than Setagaya at equivalent prices.

## Minato Ward (Hiroo and Azabu): Premium but Convenient

Minato is Tokyo's premium residential ward, home to many embassies, Azabu-Juban and Hiroo village.

**Strengths:** the densest international community in Tokyo, proximity to foreign supermarkets (National Azabu, Hiroo Stores), English-speaking clinics and hospitals, premium childcare.

**Transport:** Hibiya Line, Namboku Line, Mita Line. Roppongi and Shibuya in under 15 minutes.

**Nearby international schools:** Nishimachi International School (Moto-Azabu), ASIJ, Tokyo International School.

**Typical rents:** significantly higher than Setagaya. 3LDK apartments 300,000 to 600,000 ¥/month depending on building and exact location.

## Yokohama: The Spacious Alternative

Yokohama is frequently overlooked by expats focused on Tokyo's 23 wards, but it deserves serious consideration. Located 25 to 40 minutes from Shibuya by direct rail, Yokohama offers apartments 15 to 25% cheaper than equivalent Tokyo areas, with more space.

**Best areas for families:** Yamate, Motomachi-Chinatown, Minato Mirai, Tsunashima.

**Nearby international schools:** Yokohama International School (YIS, IB), Saint Maur International School, Yokohama YMCA Academy.

**Typical rents:** 3LDK apartments 140,000 to 220,000 ¥/month. Detached houses 200,000 to 350,000 ¥/month.

## Summary Comparison

| Area | 3LDK rent | Character | Nearby international schools |
|------|----------|-----------|------------------------------|
| Setagaya | 200-350k ¥ | Residential, green, spacious | Seisen, TIS, Nishimachi |
| Meguro | 180-280k ¥ | Central, international | BST, ASIJ |
| Minato (Hiroo/Azabu) | 300-600k ¥ | Premium, expat hub | Nishimachi, ASIJ |
| Yokohama | 140-220k ¥ | Spacious, calmer | YIS, St Maur |

## Practical Advice for Families

**Confirm school transport coverage before signing your lease.** International schools do not have formal catchment areas, but school bus routes cover specific zones. Verify that your future address falls within the route before committing.

**Prefer buildings with outdoor space.** Many Tokyo apartment buildings have no communal outdoor areas. With young children, proximity to a park is crucial. Setagaya and Yokohama have the best park density.

**Test the school commute during rush hour.** What seems manageable at 10:00 can be very different at 07:30 with children in tow.

## FAQ

**Do Japanese landlords accept families with children?**

Generally yes. Families are often preferred to groups of young adults by landlords. Some older buildings have poor sound insulation which may concern neighbours. Our [guide to finding an apartment in Tokyo](/blog/find-apartment-tokyo-foreigner) explains how to present a family application effectively.

**Do public nurseries and kindergartens accept foreign children?**

Yes, subject to available places. Registration is via your ward office. Expect a waiting list in high-demand wards such as Minato and Setagaya. Ward offices typically have translation services available for non-Japanese-speaking families.

**Are there English-speaking paediatricians?**

Yes. Tokyo's expat hub wards (Minato, Shibuya, Meguro) have several bilingual clinics. International Medical Center at Hiroo is one of the most commonly used by English-speaking expat families.


To explore Tokyo's family-friendly neighbourhoods before your move, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) offers guided tours and family activities bookable online. *(affiliate link)*
---

*See also: [Best Tokyo Neighbourhoods for Expats: Complete Guide 2026](/blog/tokyo-neighbourhoods-expats-guide).*

*For housing search in these areas, our [guide to finding an apartment in Tokyo](/blog/find-apartment-tokyo-foreigner) covers the full process. For all administrative steps after arrival in Japan, see our [complete moving checklist](/blog/moving-to-tokyo-checklist-2026).*
    `.trim(),
  },
  {
    slug: 'tokyo-vs-osaka-expat-living-comparison',
    locale: 'en',
    title: 'Tokyo vs Osaka for Expats: Which City to Choose? (2026)',
    description: 'Cost of living, job market, housing and lifestyle: honest comparison between Tokyo and Osaka to help expats choose the right Japanese city for relocation in 2026.',
    date: '2026-06-21',
    readingTime: '8 min',
    content: `
## Tokyo vs Osaka: Choosing the Right Japanese City

**Quick answer:** Tokyo offers more international jobs, services and energy, but higher rents and an intense pace. Osaka is more affordable, warmer and more relaxed, with excellent food. For maximum career opportunities, choose Tokyo; for value and friendliness, choose Osaka.

The question comes up frequently among expats who discover that Japan is not just Tokyo. Osaka, Japan's second economic hub with 2.7 million residents in the city proper (and 19 million in the Keihanshin metropolitan area including Kobe and Kyoto), offers a genuine alternative to the capital. This comparison covers the factors that matter most for expat relocation.

## Jobs and Economy: Tokyo Has No Real Rival

For the vast majority of professional fields, Tokyo remains unmatched.

**Tokyo:** headquarters of 60% of multinationals operating in Japan, the dominant financial centre (Marunouchi, Otemachi), the tech hub (Shibuya, Minato), and the main market for media, fashion and government. The English-speaking job market is the largest in the country.

**Osaka:** strong in international trade (Osaka port is second in the Kansai region), pharmaceuticals (Takeda, Shionogi), food and beverage (Nestlé Japan, Ajinomoto), and industrial technology (Panasonic, Sharp). An English-speaking job market exists but is significantly smaller.

**Verdict:** Tokyo for finance, tech, multinationals and most senior positions. Osaka if your specific sector is well-represented there or if you are starting your own business.

## Cost of Living: Osaka is Cheaper, But Not Dramatically

| Item | Tokyo | Osaka |
|------|-------|-------|
| 1LDK apartment rent (central) | 100,000 to 180,000 ¥/month | 70,000 to 130,000 ¥/month |
| Average restaurant meal | 1,000 to 2,000 ¥ | 800 to 1,500 ¥ |
| Weekly groceries (1 person) | 5,000 to 8,000 ¥ | 4,000 to 7,000 ¥ |
| Monthly transport pass | 10,000 to 15,000 ¥ | 8,000 to 12,000 ¥ |

Osaka is generally 15 to 25% cheaper than Tokyo on housing. Food is cheaper but the gap is less dramatic.

**Osaka's specific advantage: food.** Osaka has the well-deserved reputation of being Japan's culinary capital. Street food (takoyaki, okonomiyaki) is omnipresent, restaurant prices are lower for equivalent quality, and the food culture is richer at a casual level.

## Housing: Osaka More Accessible

For a central 1LDK apartment (Namba, Shinsaibashi, Umeda), expect 70,000 to 120,000 ¥/month. The equivalent in Shibuya or Shinjuku in Tokyo runs 100,000 to 160,000 ¥/month.

Osaka also has excellent residential suburbs 30 to 45 minutes from the centre (Toyonaka, Suita, Nishinomiya) where rents drop further.

One important caveat: the supply of furnished apartments and premium share houses for expats is much less developed in Osaka than in Tokyo. The market is less structured. See our [Tokyo furnished apartment guide](/blog/furnished-apartment-tokyo-no-guarantor) for comparison.

## Transport: Both Cities Are Excellent

Both metro systems are efficient, punctual and comprehensive. Osaka is more compact than Tokyo, which makes average journey times shorter.

**Osaka:** 8 metro lines, JR network, plus private Hankyu, Hanshin, Kintetsu and Nankai lines. Getting from Namba to Umeda (Osaka station) takes 10 minutes.

**Tokyo:** more extensive metro network (13 lines), more JR lines and private railways. Longer journeys but extremely dense coverage.

**Osaka's weekend advantage:** fast access to Kyoto (15 minutes by Shinkansen or 28 minutes by Hankyu), Kobe (30 minutes) and Nara (40 minutes). Excellent if you value frequent day trips.

## Culture and Lifestyle: Very Different Atmospheres

The two cities have fundamentally different feels.

**Tokyo:** more formal, more internationally oriented, more hierarchical in social settings. Tokyoites have a reputation for being reserved with strangers, though the expat community is very large with numerous English-speaking events and networking opportunities.

**Osaka:** Osakans are considered the warmest and most straightforwardly friendly people in Japan. The local dialect (Kansai-ben) is expressive and playful. The food market culture (Kuromon Ichiba), the comedy tradition (manzai) and the merchant spirit of the city create a noticeably different atmosphere.

## Who Should Choose Which?

| Profile | Tokyo | Osaka |
|---------|-------|-------|
| Corporate executive at a multinational | Ideal | Only if sector is present |
| Entrepreneur or freelance | Strong community | Lower costs, quieter pace |
| Family with children | More international schools | Fewer options |
| Tight budget | Challenging | More accessible |
| Food and local culture priority | Good but more formal | Excellent |
| Plans frequent Kyoto weekends | 2.5h by Shinkansen | 15 min by Shinkansen |

## FAQ

**Can I commute between Tokyo and Osaka for work?**

The Tokyo-Osaka Shinkansen runs approximately every 10 minutes during business hours. Journey time: 2h25 on the Nozomi. Cost: approximately 13,000 ¥ each way. Some professionals commute weekly on a commuter Shinkansen pass. Unusual but not unheard of in certain sectors.

**Are administrative procedures the same in Osaka?**

Yes. Residence card registration, health insurance, bank account opening, and tax filing follow identical procedures anywhere in Japan. The ward office (yakusho) is your point of contact in both cities.

**Is English more widely spoken in Tokyo?**

Generally yes, though Osaka increasingly serves international business. Tokyo's Shinjuku, Shibuya and Minato wards have the highest density of English-speaking services, restaurants and medical professionals in Japan.


To experience Tokyo's food culture before making your city choice, [Arigato Travel](https://tours.arigatojapan.co.jp/?rfsn=91948) offers food tours across Tokyo's neighbourhoods led by local guides. *(affiliate link)*
---

*If Tokyo is your choice, our [guide to finding an apartment in Tokyo](/blog/find-apartment-tokyo-foreigner) helps you get started. For all administrative steps after arrival, see our [complete expat moving checklist](/blog/moving-to-tokyo-checklist-2026).*
    `.trim(),
  },
  {
    slug: 'japan-digital-nomad-visa-2026',
    locale: 'en',
    title: 'Japan Digital Nomad Visa 2026: Complete Guide for Remote Workers',
    description: 'Japan launched a digital nomad visa in March 2024. Eligibility, income requirements, application steps and housing guide for Tokyo remote workers.',
    date: '2026-06-22',
    readingTime: '8 min',
    content: `
Japan launched its first dedicated long-stay visa for remote workers in March 2024. Known officially as the Specified Activities Visa (Number 50 Activity), it allows professionals employed by companies outside Japan to live and work remotely in the country for up to six months.

**Quick answer:** Japan's digital nomad visa (Specified Activities No. 50) lets eligible remote workers stay up to six months. You must earn at least 10 million JPY per year, hold private health insurance, and be a national of an eligible country with a tax treaty or visa waiver. It is not renewable on the spot and does not grant residency.

This guide covers everything you need to know: who qualifies, how to apply, what you can and cannot do during your stay, and how to find housing in Tokyo once you arrive.

## What Is the Japan Digital Nomad Visa?

The Japan Digital Nomad Visa is a Specified Activities Visa (在留資格「特定活動」第50号) introduced in March 2024. It targets remote workers who are employees or sole proprietors working exclusively for clients or companies based outside Japan.

It is not a standard work visa. You cannot take a job with a Japanese company on this status. The visa is designed specifically for people whose income comes from abroad and who want to base themselves in Japan while continuing that work.

## Who Is Eligible?

Requirements as of 2026:

**Income**: approximately 10 million JPY per year (roughly 65,000 USD or 60,000 EUR). Japan does not accept part-time or casual income, the threshold applies to your total annual earnings from your foreign employer or clients.

**Employment type**: you must be employed by a company based outside Japan, or be self-employed with foreign clients. You cannot invoice Japanese clients.

**Health insurance**: you need private insurance that covers medical expenses in Japan for the duration of your stay. Japanese national health insurance is not available on this status.

**Eligible countries**: 50+ countries including France, the United Kingdom, the United States, Canada, Australia, Germany, Italy, Spain, the Netherlands, Belgium, Singapore, South Korea, and most EU member states. Check the Japanese embassy website for your specific country.

**Criminal record**: clean record required.

**Dependents**: the visa now allows your spouse and minor children to accompany you under certain conditions (rules vary by nationality).

## How Long Can You Stay?

Initial visa: up to **6 months**, single or multiple entry depending on your nationality agreement with Japan.

Extension: you can extend once for an additional 6 months, bringing the maximum continuous stay to **1 year**.

After 1 year, you must leave Japan. There is currently no pathway from the digital nomad visa to long-term residency directly.

## What You Can and Cannot Do

**Allowed:**
- Work remotely for your foreign employer or foreign clients
- Travel freely within Japan
- Enroll in Japanese language classes
- Open a bank account (some banks accept this status, others do not, PayPay Bank and Sony Bank are the most flexible)
- Rent an apartment or share house

**Not allowed:**
- Work for a Japanese company or Japanese clients
- Receive income from any Japanese source
- Enroll children in public schools (international schools are an option)

## Application Process

1. **Prepare your documents**: employment contract or business registration, bank statements covering the past 12 months, proof of income meeting the threshold, health insurance certificate, clean criminal record from your home country, passport valid beyond your intended stay.

2. **Apply at the Japanese embassy or consulate** in your home country before departure. Processing time is typically 5 to 10 business days.

3. **Arrive in Japan** with your visa and receive your residence card at the port of entry. Register at your local ward office within 14 days of finding accommodation.

## Housing in Tokyo as a Digital Nomad

Tokyo's rental market is generally structured around 12-month leases. For a 6-month digital nomad stay, you have three realistic options:

**Furnished monthly apartments**: the most practical choice. Properties designed for medium-term stays, usually 1 to 3 months minimum. Utilities often included. Expect 130,000 to 220,000 JPY per month for a central 1K or 1LDK. Specialist furnished apartment services and monthly mansion networks cater to this market.

**Share houses with flexible terms**: many share houses offer monthly contracts with no long-term commitment. Costs run 55,000 to 90,000 JPY per month all-in including utilities. No guarantor required. Good option for the first 1 to 2 months while you explore neighborhoods before committing to a longer stay.

**Standard unfurnished lease**: possible on a digital nomad visa, but landlords typically require 12-month minimum contracts and a guarantor. Starting with furnished or share house accommodation for the first 3 months, then transitioning to a standard lease, is a common approach for those who want to stay the full year.

See our [furnished apartment guide for expats](/blog/furnished-apartment-tokyo-expats) for a full breakdown of the monthly furnished market in Tokyo.

## Cost of Living Estimate for Digital Nomads (Tokyo)

| Expense | Monthly estimate |
|---------|-----------------|
| Furnished apartment (1K, central) | 130,000 to 200,000 JPY |
| Share house alternative | 55,000 to 90,000 JPY |
| Food | 45,000 to 70,000 JPY |
| Transport | 8,000 to 15,000 JPY |
| Phone (MVNO SIM) | 2,000 to 4,000 JPY |
| Private health insurance | 15,000 to 30,000 JPY |

Total realistic range: **250,000 to 380,000 JPY/month** if you take a furnished apartment, or **175,000 to 270,000 JPY/month** in a share house.

At current exchange rates (approximately 155 JPY/EUR as of mid-2026), the furnished apartment scenario costs roughly 1,600 to 2,400 EUR per month.

## Banks and Money

Opening a bank account in Japan on a digital nomad visa can be challenging. The most reliably accessible options:

- **PayPay Bank**: fully online, accepts various visa statuses including Specified Activities
- **Sony Bank**: online setup, multi-currency accounts available
- **Wise Japan account**: not a Japanese bank account but allows JPY transactions and card payments

For international transfers, see our [guide to sending money to Japan](/blog/send-money-to-japan-from-abroad).

## FAQ

**Can I bring my family?**

In most cases yes, your spouse and minor children may accompany you under the dependent category of the same visa. Rules vary by nationality, so confirm with the Japanese embassy in your country.

**Can I freelance for Japanese clients?**

No. The digital nomad visa explicitly prohibits any remunerated activity with Japanese companies or individuals. Violation risks visa cancellation and future entry bans.

**What happens if I overstay?**

Overstay of any Japanese visa results in deportation and a minimum 5-year entry ban. Do not overstay.

**Is Japan a good base for digital nomads?**

Infrastructure-wise, Japan is excellent: fast fiber internet everywhere, coworking spaces in most Tokyo wards, reliable public transport, very low crime. The main challenges are the high income threshold for the visa and the cost of living relative to Southeast Asia.


For health coverage as a digital nomad, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly travel and health insurance with no commitment, designed specifically for remote workers and expats. *(affiliate link)*
---

*See also: [Japan Work Visa for Foreigners: Which Type to Choose in 2026?](/blog/japan-work-visa-foreigners-guide), [Japan Working Holiday Visa 2026: Complete Guide (Eligibility & Housing)](/blog/japan-working-holiday-visa-guide-2026).*

*For housing, start with our [furnished apartment guide](/blog/furnished-apartment-tokyo-expats) or [share house overview](/blog/share-house-tokyo-guide-2026). For visa and administrative steps after arrival, see our [complete Tokyo moving checklist](/blog/moving-to-tokyo-checklist-2026).*
    `.trim(),
  },
  {
    slug: 'visa-nomade-digital-japon-2026',
    locale: 'fr',
    title: 'Visa Nomade Digital Japon 2026 : Guide Complet pour les Télétravailleurs',
    description: 'Le Japon a lancé un visa nomade digital en mars 2024. Conditions, revenus minimum, pays éligibles, démarches et guide logement pour Tokyo.',
    date: '2026-06-22',
    readingTime: '8 min',
    content: `
Le Japon a lancé en mars 2024 son premier visa dédié aux télétravailleurs étrangers. Officiellement appelé Visa Activités Spécifiques (numéro 50), il permet aux professionnels employés par des entreprises hors Japon de s'installer dans le pays jusqu'à six mois pour y exercer leur activité à distance.

**Réponse rapide :** Le visa nomade digital du Japon (Activités Spécifiques n°50) permet aux télétravailleurs éligibles de rester jusqu'à six mois. Il faut justifier d'un revenu d'au moins 10 millions JPY par an, d'une assurance santé privée, et être ressortissant d'un pays éligible (convention fiscale ou exemption de visa). Il n'est pas renouvelable sur place et ne donne pas de résidence.

Ce guide couvre tout ce que vous devez savoir : qui est éligible, comment faire la demande, ce que vous pouvez et ne pouvez pas faire, et comment trouver un logement à Tokyo une fois sur place.

## Qu'est-ce que le Visa Nomade Digital Japon ?

Le visa nomade digital japonais est un Visa Activités Spécifiques (在留資格「特定活動」第50号) introduit en mars 2024. Il cible les télétravailleurs salariés ou indépendants dont les revenus proviennent exclusivement de sources situées hors du Japon.

Ce n'est pas un visa de travail classique. Il vous est impossible de travailler pour une entreprise japonaise avec ce statut. Le visa est conçu spécifiquement pour les personnes dont les revenus viennent de l'étranger et qui souhaitent s'installer au Japon tout en poursuivant cette activité.

## Qui est Éligible ?

Les conditions en vigueur en 2026 :

**Revenus** : environ 10 millions de yens par an (environ 65 000 USD ou 60 000 EUR). Le Japon n'accepte pas les revenus partiels ou occasionnels. Le seuil s'applique à vos revenus annuels totaux provenant de votre employeur ou de vos clients étrangers.

**Type d'emploi** : vous devez être salarié d'une entreprise basée hors Japon, ou indépendant avec des clients étrangers. Il vous est interdit de facturer des clients japonais.

**Assurance maladie** : une assurance privée couvrant les frais médicaux au Japon est obligatoire pour toute la durée du séjour. L'assurance maladie nationale japonaise n'est pas accessible avec ce statut.

**Pays éligibles** : plus de 50 pays, dont la France, la Belgique, la Suisse, le Canada, le Royaume-Uni, les États-Unis, l'Australie, l'Allemagne, l'Italie, l'Espagne et la grande majorité des pays de l'Union européenne. Vérifiez la liste sur le site de l'ambassade du Japon dans votre pays.

**Casier judiciaire** : vierge obligatoire.

**Famille** : le visa permet désormais à votre conjoint et à vos enfants mineurs de vous accompagner sous certaines conditions (règles variables selon la nationalité).

## Durée du Séjour

Visa initial : jusqu'à **6 mois**, simple ou multiple entrée selon l'accord bilatéral entre le Japon et votre pays.

Extension : vous pouvez prolonger une fois pour 6 mois supplémentaires, soit un séjour continu maximum de **12 mois**.

Après 12 mois, vous devez quitter le Japon. Ce visa n'ouvre pas de voie directe vers la résidence permanente.

## Ce que Vous Pouvez et Ne Pouvez Pas Faire

**Autorisé :**
- Télétravail pour votre employeur ou vos clients étrangers
- Déplacement libre dans tout le Japon
- Cours de japonais
- Ouvrir un compte bancaire (certaines banques sont plus accessibles que d'autres avec ce statut)
- Louer un appartement ou une share house

**Interdit :**
- Travailler pour une entreprise ou des clients japonais
- Percevoir des revenus de source japonaise
- Inscrire vos enfants dans les écoles publiques (les écoles internationales sont une option)

## Démarches de Demande

1. **Préparez vos documents** : contrat de travail ou extrait Kbis/registre du commerce, relevés bancaires des 12 derniers mois, justificatif de revenus dépassant le seuil, attestation d'assurance maladie internationale, extrait de casier judiciaire, passeport valide au-delà de votre séjour prévu.

2. **Déposez votre demande à l'ambassade ou au consulat du Japon** dans votre pays avant le départ. Délai de traitement : 5 à 10 jours ouvrés en général.

3. **À l'arrivée au Japon**, vous recevez votre carte de résident au point d'entrée. Vous devez vous enregistrer à la mairie de votre quartier dans les 14 jours suivant votre installation dans votre logement.

## Logement à Tokyo pour les Nomades Digitaux

Le marché locatif tokyoïte est structuré autour de baux de 12 mois. Pour un séjour nomade digital de 6 mois, vous avez trois options réalistes :

**Appartements meublés en location mensuelle** : l'option la plus pratique. Propriétés conçues pour les séjours de moyen terme, généralement à partir de 1 à 3 mois. Charges souvent incluses. Comptez 130 000 à 220 000 JPY par mois pour un 1K ou 1LDK central. Les réseaux de monthly mansions et de logements meublés spécialisés expatriés ciblent ce marché.

**Share houses avec contrats flexibles** : la plupart des share houses proposent des contrats mensuels sans engagement long terme. Coût : 55 000 à 90 000 JPY par mois tout compris (charges incluses). Aucun garant requis. Bonne option pour les 1 à 2 premiers mois le temps d'explorer les quartiers.

**Bail classique non meublé** : possible avec un visa nomade digital, mais les propriétaires exigent généralement un bail de 12 mois minimum et un garant. Une stratégie courante : commencer en logement meublé ou share house pendant 3 mois, puis passer à un bail classique pour les 9 mois restants.

Consultez notre [guide des appartements meublés pour expatriés](/blog/appartement-meuble-tokyo-expats) pour un panorama complet du marché mensuel meublé à Tokyo.

## Estimation du Coût de la Vie (Tokyo, nomades digitaux)

| Dépense | Estimation mensuelle |
|---------|----------------------|
| Appartement meublé (1K, quartier central) | 130 000 à 200 000 JPY |
| Alternative share house | 55 000 à 90 000 JPY |
| Alimentation | 45 000 à 70 000 JPY |
| Transport | 8 000 à 15 000 JPY |
| Téléphone (SIM MVNO) | 2 000 à 4 000 JPY |
| Assurance maladie privée | 15 000 à 30 000 JPY |

Fourchette totale réaliste : **250 000 à 380 000 JPY/mois** en appartement meublé, ou **175 000 à 270 000 JPY/mois** en share house.

Aux taux de change actuels (environ 155 JPY/EUR en mi-2026), le scénario appartement meublé revient à environ 1 600 à 2 400 EUR par mois.

## Banques et Argent

Ouvrir un compte bancaire japonais avec un visa activités spécifiques peut être difficile. Les options les plus accessibles :

- **PayPay Bank** : entièrement en ligne, accepte divers statuts de visa dont les Activités Spécifiques
- **Sony Bank** : ouverture en ligne, comptes multi-devises disponibles
- **Wise Japon** : pas un compte bancaire japonais, mais permet les transactions en JPY et les paiements par carte

Pour les virements internationaux, consultez notre [guide des transferts d'argent vers le Japon](/blog/virement-international-japon-wise-revolut).

## Questions Fréquentes

**Puis-je emmener ma famille ?**

Oui, dans la plupart des cas. Votre conjoint et vos enfants mineurs peuvent vous accompagner en tant que dépendants. Les règles varient selon la nationalité. Confirmez avec l'ambassade du Japon dans votre pays.

**Puis-je travailler pour des clients japonais ?**

Non. Le visa nomade digital interdit explicitement toute activité rémunérée avec des entreprises ou des particuliers japonais. Une violation peut entraîner l'annulation du visa et une interdiction d'entrée future.

**Que se passe-t-il si je dépasse la durée autorisée ?**

Le dépassement de durée d'un visa japonais entraîne l'expulsion et une interdiction d'entrée minimale de 5 ans. Ne dépassez jamais votre date limite.

**Le Japon est-il une bonne base pour les nomades digitaux ?**

Sur le plan de l'infrastructure, oui : fibre ultra-rapide partout, espaces de coworking dans la plupart des arrondissements de Tokyo, transports en commun très fiables, criminalité très faible. Les principaux freins sont le seuil de revenus élevé pour le visa et le coût de la vie élevé par rapport à l'Asie du Sud-Est.


Pour votre couverture sante en nomade digital, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance voyage et sante mensuelle sans engagement, conçue pour les travailleurs a distance et expatries. *(lien affilie)*
---

*À lire aussi : [Visa travail au Japon pour les francophones : quel type choisir en 2026 ?](/blog/visa-travail-japon-francophone-2026), [PVT Japon 2026 : Guide Complet du Programme Vacances Travail](/blog/pvt-japon-visa-vacances-travail-2026).*

*Pour le logement, commencez par notre [guide des appartements meublés](/blog/appartement-meuble-tokyo-expats) ou notre [guide des share houses](/blog/share-house-tokyo-guide-complet). Pour les démarches administratives après l'arrivée, voir notre [checklist complète pour s'installer à Tokyo](/blog/demenager-japon-checklist-complete).*
    `.trim(),
  },
  {
    slug: 'japan-working-holiday-visa-guide-2026',
    locale: 'en',
    title: 'Japan Working Holiday Visa 2026: Complete Guide (Eligibility & Housing)',
    description: 'Japan Working Holiday Visa requirements, eligible countries, age limits, quotas, application steps and housing guide for Tokyo arrivals.',
    date: '2026-06-22',
    readingTime: '9 min',
    content: `
The Japan Working Holiday Visa (WHV) is one of the most sought-after programs for young travellers from eligible countries. It allows you to live and work in Japan for up to 12 months, with far fewer restrictions than a standard work visa.

**Quick answer:** The Japan Working Holiday Visa lets young people (usually 18 to 30) from eligible countries live and work in Japan for up to one year. You apply from your home country with proof of funds and a return plan, and you can take part-time or full-time work to support your stay. It is a flexible way to try living in Japan without an employer sponsor.

This guide covers who qualifies, how to apply, what you can do during your stay, and how to find housing in Tokyo, whether you arrive for a year of adventure or as a first step toward longer-term residency.

## What Is the Working Holiday Visa?

The Working Holiday Visa (ワーキングホリデービザ) is a bilateral agreement between Japan and a list of partner countries. It allows nationals aged 18 to 30 (or 35 for some countries) to spend up to 12 months in Japan combining travel, work, and limited study.

Unlike a work visa, it is not tied to a specific employer. You can work in any sector, change jobs freely, and work as many hours as the employer allows (with some sector-specific exceptions).

The visa cannot be renewed or extended beyond 12 months. Each person can only receive it once in their lifetime.

## Eligible Countries and Age Limits

Countries with Working Holiday agreements with Japan as of 2026:

| Country | Age limit | Annual quota |
|---------|-----------|--------------|
| Australia | 18-30 | 18,000+ |
| France | 18-30 | 6,500 |
| United Kingdom | 18-30 | 6,000 |
| Canada | 18-30 | 6,500 |
| New Zealand | 18-30 | 2,000 |
| Germany | 18-35 | 5,000 |
| Ireland | 18-30 | 1,500 |
| South Korea | 18-25 | 10,000 |
| Taiwan | 18-30 | 10,000 |
| Hong Kong | 18-30 | 2,000 |
| Denmark | 18-30 | 500 |
| Norway | 18-30 | 500 |
| Portugal | 18-30 | 500 |
| Poland | 18-30 | 400 |
| Slovakia | 18-30 | 300 |
| Hungary | 18-30 | 200 |
| Spain | 18-30 | 500 |
| Czech Republic | 18-30 | 300 |
| Argentina | 18-30 | 200 |
| Chile | 18-30 | 200 |
| Mexico | 18-30 | 200 |

Some countries have additional agreements or specific conditions. Always verify directly with the Japanese embassy in your country for the current year.

## What You Can Do on a Working Holiday Visa

**Work**: you can work legally in almost any industry. Common sectors for WHV holders include restaurants, cafes, hotels, teaching English (private tutoring and some school positions), retail, agriculture, and hospitality. Hours are generally unrestricted, though agricultural work has specific seasonal rules.

**Study**: you can study for up to **3 months** during your stay. Beyond 3 months, the primary purpose must remain holiday/work, not study.

**Travel**: free movement throughout Japan for the full 12 months.

**Change employers**: freely, without visa modification.

## What You Cannot Do

- Renew or extend the visa beyond 12 months
- Work in adult entertainment venues (explicitly excluded from WHV)
- Work primarily at a single employer's request if the role resembles a standard employment visa (in practice, most jobs are fine)

## Application Process

**Step 1,Check the quota**. Some countries (France, Germany, South Korea) have annual quotas. Applications open at the start of the calendar year. Popular countries fill up fast, apply early.

**Step 2,Prepare your documents**:
- Valid passport with at least 12 months validity beyond your intended departure
- Completed application form (download from Japanese embassy website)
- Passport-size photos
- Proof of sufficient funds: typically equivalent to 200,000 to 300,000 JPY ($1,500-$2,000 USD) in your bank account
- Return or onward travel ticket (or proof of funds to purchase one)
- For some countries: clean criminal record certificate

**Step 3,Apply at the Japanese embassy or consulate** in your country. Processing time: 2 to 4 weeks typically.

**Step 4,Arrive in Japan**. The WHV is a single-entry visa in some cases. Once in Japan, your 12-month stay begins.

**Step 5,Register at your local ward office** within 14 days of settling into accommodation.

## Housing in Tokyo on a Working Holiday Visa

Finding accommodation in Tokyo as a WHV holder is easier than finding it as a standard rental applicant, because the best options for new arrivals don't require long-term commitments or Japanese guarantors.

**Share houses (recommended first step)**: no guarantor needed, 1-month deposit, utilities typically included, monthly contracts. Cost: 55,000 to 85,000 JPY per month. Expat-specialist share house networks cover all major Tokyo lines and areas. Read our [complete share house guide](/blog/share-house-tokyo-guide-2026) for a full breakdown.

**Gaijin houses**: the most budget-conscious option. Basic private or dormitory rooms, very short-term commitment (sometimes week-by-week), all utilities included. Cost: 35,000 to 60,000 JPY per month. Lower comfort, but excellent for the first 1 to 2 months before you know which area of Tokyo suits you. See our [comparison of gaijin houses and share houses](/blog/gaijin-house-vs-share-house-tokyo).

**Standard apartments (later in your stay)**: after 3 to 6 months, once you have a Japanese employment record and income, some landlords will accept WHV holders with a rental guarantee company in place of a traditional guarantor. This opens up unfurnished apartments at more competitive rents. See our [guide to finding an apartment in Tokyo](/blog/find-apartment-tokyo-foreigner).

**Furnished short-stay apartments**: monthly mansion operators offer furnished units on monthly contracts, no guarantor needed. More expensive than share houses (100,000 to 180,000 JPY/month) but more independent.

## Finding Work in Tokyo

The most accessible sectors for WHV holders:

- **English teaching / tutoring**: private lessons, conversation schools (eikaiwa), some ALT positions
- **Hospitality**: hotels and guesthouses in Tokyo regularly hire English-speaking staff
- **Cafes and restaurants**: international chains and expat-friendly venues
- **Agriculture**: seasonal work in Hokkaido and other rural areas (excellent pay for physical work)
- **Working remotely**: if you're already working remotely for a foreign company, you can continue this on a WHV

For Japanese-speaking WHV holders, the full range of Japanese job-search portals is accessible.

## Building Toward a Longer Stay

Many people use the Working Holiday year as a foundation for longer-term residency:

- **Build work experience**: a year of Japanese employment history significantly improves your chances of employer sponsorship for a standard work visa
- **Develop Japanese language skills**: one year of immersion is the fastest path
- **Establish a rental record**: signing a lease, even a short-term one, creates a paper trail that helps future landlord applications
- **Find a sponsor**: some WHV holders are offered long-term contracts by their Japanese employer, enabling a transition to a Humanities or Engineer visa

The WHV is not a path to permanent residency by itself, but it is an excellent starting point.

## FAQ

**Can I return to Japan after my WHV year?**

Yes, on a different visa category (tourist, student, work). The WHV itself cannot be obtained a second time, but it does not affect your ability to return on another status.

**Can I work full-time?**

Yes. There is no weekly hours restriction in most WHV employment. Some sector-specific rules apply (agricultural work has its own framework).

**What if my country's quota is full?**

You cannot apply until the following year. Quotas typically reset in January. France and Australia applicants in particular should apply in January or February.

**Is it possible to extend the visa by leaving Japan and re-entering?**

No. The WHV is a once-in-a-lifetime visa. Leaving and re-entering does not reset or extend it.


For health coverage during your working holiday, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment, widely used by WHV holders for the period before enrolling in Japanese national insurance. *(affiliate link)*
---

*See also: [Japan Work Visa for Foreigners: Which Type to Choose in 2026?](/blog/japan-work-visa-foreigners-guide), [Japan Digital Nomad Visa 2026: Complete Guide for Remote Workers](/blog/japan-digital-nomad-visa-2026).*

*Arriving in Tokyo? Start with our [share house guide](/blog/share-house-tokyo-guide-2026) for your first accommodation, and our [complete moving checklist](/blog/moving-to-tokyo-checklist-2026) for all administrative steps after arrival.*
    `.trim(),
  },
  {
    slug: 'pvt-japon-visa-vacances-travail-2026',
    locale: 'fr',
    title: 'PVT Japon 2026 : Guide Complet du Programme Vacances Travail',
    description: 'Conditions, quotas, démarches, logement et conseils pratiques pour le PVT Japon. Guide complet pour les Français, Belges et Canadiens francophones.',
    date: '2026-06-22',
    readingTime: '9 min',
    content: `
Le Programme Vacances Travail (PVT) au Japon est l'un des visas les plus recherchés pour les jeunes ressortissants des pays partenaires. Il vous permet de vivre et travailler au Japon pendant 12 mois, avec beaucoup moins de contraintes qu'un visa de travail classique.

**Réponse rapide :** Le PVT (Programme Vacances Travail) permet aux jeunes de 18 à 30 ans des pays partenaires (dont la France et la Belgique) de vivre et travailler au Japon jusqu'à un an. On candidate depuis son pays avec un justificatif de fonds et un projet ; il autorise le travail à temps partiel ou plein pour financer le séjour. C'est un moyen souple de tester la vie au Japon sans employeur parrain.

Ce guide couvre tout ce que vous devez savoir : qui est éligible, comment faire la demande, ce que vous pouvez faire pendant votre séjour, et comment trouver un logement à Tokyo une fois sur place.

## Qu'est-ce que le PVT Japon ?

Le Programme Vacances Travail japonais (ワーキングホリデービザ) est un accord bilatéral entre le Japon et une liste de pays partenaires. Il permet aux ressortissants âgés de 18 à 30 ans (ou 35 ans pour certains pays) de passer jusqu'à 12 mois au Japon en combinant voyage, travail et études limitées.

Contrairement à un visa de travail classique, il n'est pas lié à un employeur spécifique. Vous pouvez travailler dans n'importe quel secteur, changer d'employeur librement, et travailler autant d'heures que l'employeur le propose.

Le visa ne peut pas être renouvelé ni prolongé au-delà de 12 mois. Chaque personne ne peut l'obtenir qu'une seule fois dans sa vie.

## Pays Éligibles et Limites d'Âge

Pays disposant d'accords PVT avec le Japon en 2026 (sélection francophone) :

| Pays | Limite d'âge | Quota annuel |
|------|--------------|--------------|
| France | 18-30 ans | 6 500 |
| Canada | 18-30 ans | 6 500 |
| Allemagne | 18-35 ans | 5 000 |
| Irlande | 18-30 ans | 1 500 |
| Danemark | 18-30 ans | 500 |
| Norvège | 18-30 ans | 500 |
| Portugal | 18-30 ans | 500 |
| Pologne | 18-30 ans | 400 |
| Hongrie | 18-30 ans | 200 |
| Espagne | 18-30 ans | 500 |
| République tchèque | 18-30 ans | 300 |
| Argentine | 18-30 ans | 200 |
| Chili | 18-30 ans | 200 |
| Mexique | 18-30 ans | 200 |

La Belgique et la Suisse ne disposent pas d'accord PVT avec le Japon à ce jour. Vérifiez toujours la liste actualisée auprès de l'ambassade du Japon dans votre pays.

## Ce que Vous Pouvez Faire avec un PVT

**Travailler** : vous pouvez travailler légalement dans presque tous les secteurs. Secteurs courants pour les titulaires de PVT francophones : restaurants et cafés, hôtels, cours d'anglais (cours privés ou dans des écoles de conversation), commerce, agriculture saisonnière, et hôtellerie. Il n'y a généralement pas de limite d'heures de travail.

**Étudier** : vous pouvez étudier pendant 3 mois maximum au cours de votre séjour. Au-delà de 3 mois, l'objectif principal doit rester vacances/travail, pas les études.

**Voyager** : déplacement libre dans tout le Japon pendant les 12 mois.

**Changer d'employeur** : librement, sans modification de visa.

## Ce que Vous Ne Pouvez Pas Faire

- Renouveler ou prolonger le visa au-delà de 12 mois
- Travailler dans des établissements de divertissement pour adultes (explicitement exclu du PVT)
- Réobtenir un PVT après usage (une seule fois dans votre vie)

## Démarches de Demande

**Étape 1,Vérifiez le quota.** Les pays comme la France ont un quota annuel de 6 500 places. Les demandes s'ouvrent au début de chaque année calendaire. Pour la France, les places partent vite : postulez dès janvier ou février.

**Étape 2,Préparez vos documents** :
- Passeport valide au moins 12 mois au-delà de votre date de retour prévue
- Formulaire de demande rempli (téléchargeable sur le site de l'ambassade du Japon)
- Photos d'identité format passeport
- Preuve de fonds suffisants : généralement l'équivalent de 200 000 à 300 000 JPY (~1 500 EUR) sur votre compte bancaire
- Billet de retour ou de continuation (ou preuve de fonds pour l'acheter)
- Pour certains pays : extrait de casier judiciaire vierge

**Étape 3,Déposez votre demande à l'ambassade ou au consulat du Japon** dans votre pays. Délai de traitement : 2 à 4 semaines.

**Étape 4,Arrivée au Japon.** Le PVT est parfois un visa à entrée unique. Une fois au Japon, votre séjour de 12 mois commence.

**Étape 5,Enregistrement à la mairie de votre arrondissement** dans les 14 jours suivant votre installation dans votre logement.

## Logement à Tokyo avec un PVT

Trouver un logement à Tokyo avec un PVT est plus facile que pour un locataire standard, car les meilleures options pour les nouveaux arrivants ne nécessitent ni engagement long terme ni garant japonais.

**Share houses (recommandé en premier)** : aucun garant requis, 1 mois de dépôt, charges généralement incluses, contrats mensuels. Coût : 55 000 à 85 000 JPY par mois. Les réseaux de share houses spécialisés expatriés couvrent toutes les grandes lignes et quartiers de Tokyo. Lisez notre [guide complet des share houses à Tokyo](/blog/share-house-tokyo-guide-complet) pour tous les détails.

**Gaijin houses** : l'option la moins chère. Chambres privées ou dortoirs basiques, engagement très court terme (parfois à la semaine), toutes charges incluses. Coût : 35 000 à 60 000 JPY par mois. Confort moindre, mais idéal pour les 1 à 2 premiers mois avant de savoir quel quartier vous convient. Voir notre [comparaison gaijin house vs share house](/blog/gaijin-house-vs-share-house-difference).

**Appartements classiques (plus tard dans le séjour)** : après 3 à 6 mois, une fois que vous avez un historique d'emploi et de revenus au Japon, certains propriétaires acceptent les titulaires de PVT avec une société de garantie à la place d'un garant traditionnel. Cela ouvre l'accès à des appartements non meublés à des loyers plus compétitifs. Voir notre [guide pour trouver un appartement à Tokyo](/blog/trouver-appartement-tokyo-etranger).

**Appartements meublés courte durée** : des opérateurs proposent des unités meublées avec contrats mensuels, sans garant requis. Plus cher que les share houses (100 000 à 180 000 JPY/mois) mais plus indépendant.

## Trouver du Travail à Tokyo

Les secteurs les plus accessibles pour les titulaires de PVT francophones :

- **Cours d'anglais et français** : cours privés, écoles de conversation, soutien scolaire
- **Hôtellerie** : les hôtels et auberges de jeunesse de Tokyo recrutent régulièrement du personnel anglophone et parfois francophone
- **Cafés et restaurants** : chaînes internationales et restaurants axés expatriés
- **Agriculture** : travail saisonnier à Hokkaido et dans d'autres régions rurales (rémunération intéressante pour du travail physique)
- **Télétravail pour l'étranger** : si vous travaillez déjà à distance pour une entreprise étrangère, vous pouvez continuer avec un PVT

## Construire Vers un Séjour Plus Long

Beaucoup de personnes utilisent l'année PVT comme base pour une résidence plus longue :

- **Expérience professionnelle japonaise** : une année d'historique d'emploi japonais améliore significativement vos chances d'obtenir un parrainage pour un visa de travail standard
- **Apprentissage du japonais** : une année d'immersion est la voie la plus rapide vers la maîtrise de la langue
- **Historique locatif** : signer un bail, même court terme, crée un dossier qui facilite les futures demandes de location
- **Trouver un employeur parrain** : certains titulaires de PVT se voient proposer des contrats long terme par leur employeur japonais, permettant une transition vers un visa Humanités ou Ingénieur

Le PVT n'est pas une voie directe vers la résidence permanente, mais c'est un excellent point de départ.

## Questions Fréquentes

**Puis-je revenir au Japon après mon année PVT ?**

Oui, sur un autre type de visa (touriste, étudiant, travail). Le PVT lui-même ne peut pas être obtenu une deuxième fois, mais il n'affecte pas votre capacité à revenir sur un autre statut.

**Puis-je travailler à temps plein ?**

Oui. Il n'y a pas de restriction d'heures hebdomadaires dans la plupart des emplois PVT. Des règles sectorielles spécifiques s'appliquent dans certains cas.

**Que faire si le quota de mon pays est épuisé ?**

Vous ne pouvez pas postuler avant l'année suivante. Les quotas se réinitialisent généralement en janvier. Les candidats français doivent postuler en janvier ou février pour maximiser leurs chances.

**Est-il possible de prolonger le visa en sortant du Japon et en ré-entrant ?**

Non. Le PVT est un visa unique dans une vie. Sortir et rentrer à nouveau ne le réinitialise pas et ne le prolonge pas.


Pour votre couverture sante pendant votre PVT, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement, populaire aupres des titulaires de PVT pour la periode avant l'assurance nationale japonaise. *(lien affilie)*
---

*À lire aussi : [Visa travail au Japon pour les francophones : quel type choisir en 2026 ?](/blog/visa-travail-japon-francophone-2026), [Visa Nomade Digital Japon 2026 : Guide Complet pour les Télétravailleurs](/blog/visa-nomade-digital-japon-2026).*

*À votre arrivée à Tokyo, commencez par notre [guide des share houses](/blog/share-house-tokyo-guide-complet) pour votre premier logement, et notre [checklist complète pour s'installer à Tokyo](/blog/demenager-japon-checklist-complete) pour toutes les démarches administratives.*
    `.trim(),
  },
  {
    slug: 'logement-etudiant-tokyo-octobre',
    locale: 'fr',
    title: 'Logement étudiant à Tokyo pour octobre : share house ou dortoir ?',
    description: 'Rentrée universitaire d\'octobre au Japon ? Comparatif complet share house vs dortoir à Tokyo, coûts réels 2026 et délais à respecter pour trouver avant d\'arriver.',
    date: '2026-06-23',
    readingTime: '7 min',
    content: `
Les programmes universitaires japonais à rentrée d'octobre se multiplient : masters en anglais, écoles de langue, programmes d'échange au second semestre. Si vous arrivez à Tokyo en octobre, la question du logement se pose dès maintenant. Les meilleures options se réservent 6 à 8 semaines à l'avance.

**Réponse rapide :** Pour une rentrée d'octobre à Tokyo, visez une share house ou un dortoir universitaire : sans garant, meublés, candidature en ligne depuis l'étranger. Cherchez dès juillet-août, car les places partent vite avant octobre. Comptez 40 000 à 80 000 JPY par mois en share house, souvent charges incluses.

Deux choix s'offrent à la grande majorité des étudiants : le dortoir universitaire, encadré mais limité, et le share house, plus flexible mais plus cher. Ce guide vous aide à choisir.

## Les dortoirs universitaires à Tokyo

Les universités japonaises proposent des résidences pour étudiants internationaux, mais les places sont rares et la concurrence est forte.

**Ce qu'ils offrent :**
- Loyer mensuel : 25 000 à 60 000 JPY, toutes charges comprises
- Chambre individuelle ou partagée selon les établissements
- Cuisine commune, salle de lavage, parfois salle d'études
- Localisation souvent sur le campus ou proche

**Les contraintes à connaître :**
- **Places limitées** : la plupart des universités ne peuvent pas loger tous leurs étudiants internationaux. Les listes d'attente existent. Ne comptez pas dessus sans confirmation écrite.
- **Règles strictes** : heure de rentrée (couvre-feu dans certaines résidences), interdiction d'invités, règles de bruit, durée maximale de séjour (souvent 1 ou 2 ans).
- **Localisation parfois excentrée** : les campus hors centre-ville impliquent 45 à 90 minutes de trajet aller-retour chaque jour.
- **Délai de candidature** : le bureau des logements accepte les demandes 3 à 4 mois avant l'entrée. Pour octobre, c'est maintenant. Certains dossiers se clôturent en juillet.

**Comment s'inscrire :**
Contactez le bureau des affaires étudiantes (International Student Office) de votre université dès que votre admission est confirmée. Demandez explicitement la liste d'attente pour le dortoir, même si les places affichées sont épuisées. Des désistements arrivent jusqu'à 3 semaines avant la rentrée.

## Les share houses à Tokyo pour étudiants

Le share house est une maison ou un appartement partagé entre plusieurs résidents : chambre privée, cuisine commune, salle de bain commune. C'est la solution la plus utilisée par les étudiants qui n'obtiennent pas de place en dortoir, ou qui préfèrent plus de liberté.

**Ce qu'ils offrent :**
- Loyer mensuel : 50 000 à 90 000 JPY, toutes charges comprises (eau, électricité, internet)
- Aucun garant japonais requis
- Durée minimale souvent 1 à 3 mois, maximum sans limite
- Disponibilité rapide : 1 à 2 semaines entre candidature et emménagement
- Environnement social : colocataires japonais et internationaux mélangés

**Ce qu'il faut comparer entre opérateurs :**
- Couverture géographique : est-ce que l'opérateur a des biens proches de votre université ?
- Type de communauté : uniquement internationaux, ou mix Japonais / étrangers ?
- Contrat : durée minimum, conditions de résiliation anticipée
- Services inclus : wifi, eau, électricité, parfois ménage des parties communes

**Les points à vérifier avant de signer :**
- Frais d'adhésion (parfois 10 000 à 20 000 JPY à l'entrée)
- Politique sur les invités
- Distance depuis votre université (toujours calculer le temps de trajet réel, pas la distance)
- Règles de nettoyage des espaces communs

## Comparatif coûts réels 2026

| | Dortoir universitaire | Share house |
|---|---|---|
| Loyer mensuel | 25 000 à 60 000 JPY | 50 000 à 90 000 JPY |
| Charges incluses | Oui | Oui |
| Frais d'entrée | 0 à 1 mois | 1 mois + frais d'adhésion |
| Disponibilité | Limitée, sur dossier | Large, réservable en ligne |
| Durée minimale | Durée du programme | 1 à 3 mois |
| Garant exigé | Non | Non |
| Invités autorisés | Rarement | Selon règlement |

**Budget mensuel réaliste à Tokyo pour un étudiant (octobre 2026) :**
- Logement (share house) : 65 000 JPY
- Nourriture : 35 000 à 50 000 JPY
- Transport (commute + sorties) : 8 000 à 15 000 JPY
- Téléphone (MVNO) : 2 000 à 3 000 JPY
- Divers : 10 000 à 15 000 JPY
- **Total : environ 120 000 à 150 000 JPY/mois**

## Quand choisir le dortoir, quand choisir le share house

**Choisissez le dortoir si :**
- Votre université vous garantit une place (confirmation écrite)
- Votre budget est très serré (moins de 60 000 JPY/mois tout compris)
- Vous arrivez sans aucun réseau et souhaitez une structure encadrée les premiers mois

**Choisissez le share house si :**
- Vous n'avez pas de place en dortoir confirmée
- Vous voulez de la flexibilité sur la durée (séjour plus long ou plus court que le programme)
- Vous préférez un environnement social mixte (Japonais + internationaux)
- Vous n'avez pas de garant japonais (le share house n'en demande pas)

## Comment trouver avant d'arriver au Japon

La recherche depuis l'étranger est possible et recommandée. Voici la démarche qui fonctionne :

**1. Candidatez au dortoir maintenant** (si votre université en propose) : envoyez un email au bureau international avec votre lettre d'admission, votre date d'arrivée et votre demande de logement.

**2. En parallèle, explorez les share houses** : les opérateurs spécialisés expatriés permettent de réserver en ligne depuis l'étranger. Payez votre premier mois à distance, les clés vous attendent à l'arrivée.

**3. Réservez dès maintenant pour octobre** : les meilleures chambres partent fin juillet et début août. Attendre septembre est le meilleur moyen de se retrouver avec le fond du catalogue.

Pour plus de détails sur la recherche depuis l'étranger, consultez notre [guide pour chercher un appartement à Tokyo depuis l'étranger](/blog/chercher-appartement-tokyo-depuis-etranger).

Si vous hésitez encore sur le type de logement, notre [guide complet des share houses à Tokyo](/blog/share-house-tokyo-guide-complet) détaille les options quartier par quartier et opérateur par opérateur.


Pour votre couverture sante en arrivant en octobre, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement, activable des votre arrivee au Japon. *(lien affilie)*
---

*À lire aussi : [Logement étudiant à Tokyo : guide complet pour francophones](/blog/logement-etudiant-tokyo-guide), [Trouver un appartement à Tokyo en septembre : ce qui change vs le printemps](/blog/appartement-tokyo-septembre-guide).*

*Votre programme commence en octobre et vous n'avez toujours pas trouvé de logement ? Consultez notre [guide logement étudiant Tokyo 2026](/blog/logement-etudiant-tokyo-2026) pour les démarches complètes, et contactez-nous directement si vous souhaitez un accompagnement personnalisé.*
    `.trim(),
  },
  {
    slug: 'student-housing-tokyo-october',
    locale: 'en',
    title: 'Student Housing in Tokyo for October Intake: Share House vs University Dorm',
    description: 'Starting university in Tokyo in October? Full comparison of share houses vs university dormitories with real 2026 costs and timelines for international students.',
    date: '2026-06-23',
    readingTime: '7 min',
    content: `
October university intakes in Japan are growing: English-language master's programs, language schools, and second-semester exchange programs. If you're arriving in Tokyo in October, housing needs to be sorted now. The best options fill up 6 to 8 weeks before arrival.

**Quick answer:** For an October intake in Tokyo, aim for a share house or university dormitory: no guarantor, furnished, with online applications from abroad. Search in July or August, as spots fill fast before October. Budget 40,000 to 80,000 JPY per month in a share house, utilities often included.

Most students face the same two choices: a university dormitory (structured, affordable, but limited) or a share house (more flexible, widely available, slightly more expensive). This guide walks you through the real comparison.

## University Dormitories in Tokyo

Japanese universities offer on-campus or nearby housing for international students, but spots are limited and competition is real.

**What they offer:**
- Monthly rent: 25,000 to 60,000 JPY, utilities included
- Single or shared rooms depending on the facility
- Common kitchen, laundry, sometimes a study room
- Often on campus or a short commute from classes

**What to know before counting on one:**
- **Limited availability:** Most universities cannot house all international students. Waitlists exist. Never assume you have a spot without written confirmation.
- **Strict rules:** Some dormitories have curfews, no overnight guests policies, and noise restrictions. Tenure is often capped at one or two years.
- **Location can be inconvenient:** Campuses outside central Tokyo mean 45 to 90 minutes of commuting each way, every day.
- **Application deadlines:** The international housing office typically accepts applications 3 to 4 months before arrival. For October, that window is now. Some offices close in July.

**How to apply:**
Email your university's International Student Office as soon as your admission is confirmed. Ask explicitly for the dormitory waitlist even if no spots appear available. Cancellations come in up until three weeks before the semester starts.

## Share Houses in Tokyo for Students

A share house is a managed property where residents have a private room and share common spaces: kitchen, bathroom, sometimes a lounge. It is the most common alternative for students who don't secure a dorm spot, or who prefer fewer restrictions.

**What they offer:**
- Monthly rent: 50,000 to 90,000 JPY, all utilities included (water, electricity, internet)
- No Japanese guarantor required
- Flexible minimum stay: typically 1 to 3 months, no maximum
- Fast turnaround: 1 to 2 weeks from application to move-in
- Social environment: Japanese and international residents mixed

**What to compare between operators:**
- Geographic coverage: does the operator have properties near your campus?
- Community mix: international-only or intentionally mixed Japanese/foreign residents?
- Contract terms: minimum stay, early exit conditions
- Services included: wifi, utilities, sometimes cleaning of common areas

**Before signing, verify:**
- Any registration fee (10,000 to 20,000 JPY at move-in is common)
- Guest policy
- Commute time to your campus (check peak-hour train times, not distance)
- Cleaning responsibilities for shared spaces

## Real Cost Comparison for October 2026

| | University Dormitory | Share House |
|---|---|---|
| Monthly rent | 25,000 to 60,000 JPY | 50,000 to 90,000 JPY |
| Utilities included | Yes | Yes |
| Move-in costs | 0 to 1 month deposit | 1 month + registration fee |
| Availability | Limited, application required | Wide, bookable online |
| Minimum stay | Length of program | 1 to 3 months |
| Guarantor required | No | No |
| Overnight guests | Rarely allowed | Depends on house rules |

**Realistic monthly budget in Tokyo as a student (October 2026):**
- Housing (share house): 65,000 JPY
- Food: 35,000 to 50,000 JPY
- Transport (commute and outings): 8,000 to 15,000 JPY
- Phone (MVNO SIM): 2,000 to 3,000 JPY
- Miscellaneous: 10,000 to 15,000 JPY
- **Total: approximately 120,000 to 150,000 JPY per month**

## When to Choose the Dorm vs the Share House

**Choose the university dormitory if:**
- Your university confirms a spot in writing before you leave home
- Your budget is very tight (under 60,000 JPY per month all-in)
- You want a structured environment for your first months in Japan

**Choose a share house if:**
- You don't have a confirmed dorm spot
- You want flexibility on duration (longer or shorter than the academic program)
- You prefer a social, mixed-nationality environment
- You have no Japanese guarantor (share houses don't require one)

## How to Find Housing Before You Leave

Searching from abroad is not only possible, it is the right move. Here is what works:

**Step 1 - Apply to the dorm now:** If your university offers one, email the international housing office today with your admission letter and requested arrival date.

**Step 2 - Search share houses in parallel:** Expat-specialist share house operators allow international bookings online. Pay your first month remotely and the keys will be ready on arrival.

**Step 3 - Book before August:** The best rooms in the best share houses are gone by late July and early August. Waiting until September means you're choosing from what's left.

For a step-by-step guide on searching from abroad, see our [Tokyo apartment hunting from abroad guide](/blog/tokyo-apartment-hunting-from-abroad).

If you're still deciding on the type of housing, our [complete Tokyo share house guide](/blog/share-house-tokyo-guide-2026) covers options by neighbourhood and operator.


For health coverage upon arrival in October, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment, activatable from day one in Japan. *(affiliate link)*
---

*See also: [Student Housing Tokyo 2026: Complete Guide for International Students](/blog/student-housing-tokyo-guide), [Finding an Apartment in Tokyo in September: What Changes vs Spring](/blog/find-apartment-tokyo-september).*

*Starting in October and haven't sorted housing yet? See our [student housing Tokyo 2026 guide](/blog/student-housing-tokyo-guide-2026) for the full process, or contact us directly if you want personalised help.*
    `.trim(),
  },
  {
    slug: 'appartement-meuble-tokyo-expats-top-5',
    locale: 'fr',
    title: 'Appartement meublé à Tokyo : les 5 meilleures options pour expatriés (2026)',
    description: 'Chercher un appartement meublé à Tokyo en 2026 ? Comparatif des 5 meilleures options pour expatriés : coûts réels, durée minimum, sans garant japonais.',
    date: '2026-06-23',
    readingTime: '7 min',
    content: `
Trouver un appartement meublé à Tokyo est une des premières urgences de tout expatrié arrivant au Japon. Vous n'avez pas encore vos meubles, vous ne voulez pas signer un bail d'un an en arrivant, et les agences classiques vous demandent un garant japonais que vous n'avez pas.

**Réponse rapide :** Pour la plupart des expatriés, la meilleure option d'appartement meublé à Tokyo est la share house (40 000-120 000 JPY/mois, sans garant, installation en une semaine). Pour plus d'intimité, le monthly mansion (80 000-200 000 JPY/mois) offre un studio privé avec une adresse utilisable pour les démarches. Pour un séjour plus long, une agence spécialisée arrange un appartement meublé complet (100 000-300 000 JPY/mois). Aucune de ces options n'exige de garant japonais.

Voici les 5 options réelles que vous avez, avec leurs coûts 2026, leurs avantages et leurs limites. Pour le panorama complet au-delà de ces cinq, voyez notre [guide complet des appartements meublés à Tokyo](/fr/blog/guide-appartements-meubles-tokyo).

> **Vu du terrain.** En gérant des meublés, je peux vous dire que les photos de l'annonce sont souvent l'appartement témoin, pas celui que vous aurez. Ce qui varie vraiment, c'est ce qui est inclus : literie, débit wifi, ménage, une cuisine utilisable. Faites lister les inclusions par écrit avant de payer une caution.

![Fourchette de loyer mensuel par type de logement à Tokyo](/tokyo-housing-rent-range-fr.png "Share house 35k-90k vs location standard 60k-250k JPY")
## 1. La share house meublée (40 000 à 120 000 JPY/mois)

La share house est la solution la plus accessible pour un expatrié qui arrive sans garant japonais. Les chambres sont entièrement meublées, les parties communes partagées, et le dépôt de garantie est minimal (zéro chez certains opérateurs).

**Ce qu'offrent les réseaux spécialisés expatriés :**
- Entrée rapide possible sous 1 semaine, réservation en ligne depuis l'étranger
- Chambres dès 42 000 JPY/mois en périphérie, jusqu'à 120 000 JPY/mois pour du premium central
- Concept communautaire : mix résidents japonais et étrangers selon l'opérateur
- Réseaux premium disponibles dans Shibuya, Shinjuku, Meguro

**Durée minimum :** 1 mois pour la plupart. Certains opérateurs acceptent 2 semaines.

**Avantage principal :** aucun garant, internet inclus, installation immédiate.

**Limite :** espace privé réduit (15-25 m²), règles de vie commune à respecter.

## 2. Le monthly mansion meublé (80 000 à 200 000 JPY/mois)

Le monthly mansion est un appartement meublé individuel en location courte durée (1 mois minimum). Vous avez votre propre cuisine, votre salle de bain, votre entrée. Aucun voisin de palier.

**Caractéristiques des monthly mansions :**
- Studios entièrement équipés (cuisine, machine à laver, TV, internet)
- Réseau national, disponibles dans tous les quartiers centraux de Tokyo
- Options premium disponibles pour cadres expatriés (Shinjuku, Minato)

**Budget réaliste à Tokyo :** comptez 100 000 à 150 000 JPY/mois pour un studio bien situé (Yamanote line).

**Avantage :** autonomie totale, adresse postale utilisable pour les démarches administratives.

**Limite :** prix plus élevé que la share house, parfois dépôt 1 mois.

## 3. L'appartement meublé via agence spécialisée (100 000 à 300 000 JPY/mois)

Certaines agences immobilières spécialisées dans la clientèle internationale proposent des appartements meublés avec baux flexibles, sans garant japonais requis.

**Agences recommandées :**
- **Fontaine Relocation** : spécialisé expatriés francophones, accompagnement complet
- **Tokyo Expat** : accès à 300+ biens meublés, accompagnement en français du dossier à la signature

**Ce qu'on négocie pour vous :** bail 3-12 mois, meubles inclus, clauses de résiliation flexibles, pas de garant humain (société de garantie acceptée).

**Avantage :** appartement classique, quartier de votre choix, surface réelle (30-60 m²).

**Limite :** processus 2-4 semaines, dépôt de garantie 1-2 mois, parfois frais d'agence.

## 4. L'airbnb et location courte durée (15 000 à 40 000 JPY/nuit)

Pour les premiers jours au Japon ou pour des séjours inférieurs à 1 mois, Airbnb reste une option simple. Mais attention : depuis la loi Minpaku de 2018, beaucoup d'appartements ont été retirés de la plateforme à Tokyo. L'offre est moins abondante qu'avant.

**Ce qui reste disponible :** des studios et appartements en zones résidentielles (Shinjuku-ku, Sumida-ku, Koto-ku), à des prix horaires élevés.

**Budget pour 1 mois complet :** 400 000 à 600 000 JPY. Très peu compétitif par rapport aux options ci-dessus.

**Quand c'est pertinent :** pour un séjour de 2-3 semaines le temps de trouver un logement permanent, ou pour des missions d'entreprise courtes.

## 5. Le logement d'entreprise (shataku) via votre employeur

Si vous êtes muté au Japon par une entreprise japonaise ou internationale, demandez à votre employeur s'il dispose d'un parc de logements shataku (appartements d'entreprise). Certaines grandes sociétés (Sony, Toyota, grandes banques) maintiennent un parc de logements pour leurs salariés expatriés.

**Avantage :** loyer souvent subventionné, aucun garant à trouver (c'est l'entreprise), appartement prêt à l'emploi.

**Comment y accéder :** demandez à votre service RH dès que la mutation est confirmée. Les places sont limitées et s'attribuent souvent 2-3 mois à l'avance.

**Limite :** vous n'avez pas le choix du quartier ni de l'appartement, et vous perdez le logement si vous quittez l'entreprise.

## Tableau comparatif

| Option | Budget mensuel | Durée min. | Sans garant | Disponibilité |
|---|---|---|---|---|
| Share house | 40-120k JPY | 1 mois | Oui | 1 semaine |
| Monthly mansion | 80-200k JPY | 1 mois | Oui | 1-2 semaines |
| Agence spécialisée | 100-300k JPY | 3 mois | Oui (hoshougaisha) | 2-4 semaines |
| Airbnb | 400-600k JPY/mois | 1 nuit | Oui | Immédiat |
| Shataku | Subventionné | Durée contrat | N/A | Via employeur |

## Comment choisir ?

**Vous arrivez dans moins de 3 semaines :** share house ou monthly mansion. Ce sont les seules options avec une entrée rapide garantie.

**Vous avez 1-2 mois pour vous installer :** appartement via agence spécialisée. Vous aurez le choix du quartier, de la surface, et pourrez signer un bail classique 6-12 mois.

**Vous venez pour moins de 3 mois :** monthly mansion ou Airbnb pour la première semaine, puis share house pour le reste du séjour.

**Vous avez un employeur japonais :** commencez par demander le shataku. C'est la solution la moins chère et la plus simple si elle est disponible.

Pour un accompagnement personnalisé dans votre recherche, [contactez-nous](/contact) : nous gérons le processus de bout en bout en français, de la définition du budget jusqu'à la signature du bail.


Pour votre couverture sante pendant votre installation, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement. Pour vos activites culturelles a Tokyo, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) propose des visites guidees reservables en ligne. *(liens affilies)*
---

*À lire aussi : [Appartement meublé Tokyo expatriés : 5 options rapides 2026](/blog/appartement-meuble-tokyo-expats).*

*Voir aussi : [trouver un appartement à Tokyo depuis l'étranger](/blog/chercher-appartement-tokyo-depuis-etranger) et [logement sans garant à Tokyo](/blog/appartement-meuble-tokyo-sans-garant).*
    `.trim(),
  },
  {
    slug: 'furnished-apartment-tokyo-top-5-expats',
    locale: 'en',
    title: 'Furnished Apartment Tokyo: 5 Best Options for Expats in 2026',
    description: 'Looking for a furnished apartment in Tokyo in 2026? Honest comparison of the 5 best options for expats: real costs, minimum stay, no Japanese guarantor needed.',
    date: '2026-06-23',
    readingTime: '7 min',
    content: `
Finding a furnished apartment in Tokyo is one of the first urgent tasks for any expat arriving in Japan. You don't have furniture yet, you may not want to commit to a year-long lease immediately, and most traditional agencies require a Japanese guarantor you simply don't have.

**Quick answer:** For most expats, the best furnished apartment option in Tokyo is a **share house** (40,000-120,000 JPY/month, no Japanese guarantor, move in within a week). For more privacy, a **monthly mansion** (80,000-200,000 JPY/month) gives you a private studio with an address usable for admin. For longer stays, a specialist agency arranges a **full furnished apartment** (100,000-300,000 JPY/month). None of these require a Japanese guarantor.

Here are the 5 real options available to you, with their 2026 costs, pros, and limits. For the full picture beyond these five, see our [complete guide to furnished apartments in Tokyo](/en/blog/furnished-apartments-tokyo-guide).

> **From the field.** Running furnished units, I can tell you the listing photos are usually the show apartment, not the one you get. What really varies is what is included: bedding, wifi speed, cleaning, a usable kitchen. Get the inclusions in writing before you pay a deposit.
## 1. Furnished Share House (40,000 to 120,000 JPY/month)

The share house is the most accessible option for expats arriving without a Japanese guarantor. Rooms are fully furnished, common areas are shared, and the deposit is minimal, zero at some operators.

**What expat-specialist networks offer:**
- Move-in possible within 1 week, online booking from abroad
- Rooms from 42,000 JPY/month, up to 120,000 JPY for premium central locations
- Community options: pure international or intentionally mixed Japanese/foreign residents
- Premium properties available in Shibuya, Shinjuku, Meguro

**Minimum stay:** 1 month for most operators. Some accept 2 weeks.

**Main advantage:** no guarantor required, internet included, immediate availability.

**Limit:** private space is small (15-25 m²), communal living rules apply.

## 2. Monthly Mansion (80,000 to 200,000 JPY/month)

A monthly mansion is a fully furnished individual apartment available for short-term rental (minimum 1 month). You have your own kitchen, bathroom, and entrance. No shared common areas.

**Monthly mansion features:**
- Fully equipped studios (kitchen, washing machine, TV, internet)
- National network, available across all central Tokyo neighbourhoods
- Premium options available for corporate expats (Shinjuku, Minato)

**Realistic budget in Tokyo:** 100,000 to 150,000 JPY/month for a well-located studio (Yamanote line area).

**Advantage:** full autonomy, postal address usable for administrative procedures (bank account, residence registration).

**Limit:** higher price than share house, sometimes requires 1 month deposit.

## 3. Furnished Apartment via Specialist Agency (100,000 to 300,000 JPY/month)

Some real estate agencies specialising in international clients offer furnished apartments with flexible leases and no Japanese guarantor required.

**Recommended agencies:**
- **Fontaine Relocation**: specialist in French-speaking expats, full relocation support
- **Tokyo Expat**: access to 300+ furnished and unfurnished properties, full support in English from application to lease signing

**What these arrangements typically include:** 3-12 month lease, furniture included, flexible break clauses, no human guarantor needed (rental guarantee company accepted).

**Advantage:** proper apartment in the neighbourhood of your choice, real floor space (30-60 m²).

**Limit:** 2-4 week process, 1-2 month deposit required, sometimes agency fees.

## 4. Airbnb and Short-Term Rentals (15,000 to 40,000 JPY/night)

For your first days in Japan or stays under 1 month, Airbnb remains a simple option. However, since the 2018 Minpaku law, many Tokyo apartments were pulled from the platform. The supply is thinner than it used to be.

**What's still available:** studios and apartments in residential areas (Shinjuku-ku, Sumida-ku, Koto-ku), at high nightly rates.

**Budget for 1 full month:** 400,000 to 600,000 JPY, not competitive compared to the options above.

**When it makes sense:** for a 2-3 week bridging period while you look for permanent housing, or for short company assignments.

## 5. Company Housing (Shataku) via Your Employer

If you're being seconded to Japan by a Japanese or international company, ask your employer whether they maintain a shataku (company housing) programme. Large corporations (Sony, Toyota, major banks) often have a portfolio of apartments reserved for expatriate employees.

**Advantage:** subsidised rent, no guarantor needed (the company acts as one), ready-to-move-in apartment.

**How to access it:** ask your HR department as soon as your transfer is confirmed. Spots are limited and usually allocated 2-3 months in advance.

**Limit:** no choice of neighbourhood or apartment, and you lose the housing if you leave the company.

## Quick Comparison

| Option | Monthly cost | Min. stay | No guarantor | Availability |
|---|---|---|---|---|
| Share house | 40-120k JPY | 1 month | Yes | Within 1 week |
| Monthly mansion | 80-200k JPY | 1 month | Yes | 1-2 weeks |
| Specialist agency | 100-300k JPY | 3 months | Yes (guarantee co.) | 2-4 weeks |
| Airbnb | 400-600k JPY equiv. | 1 night | Yes | Immediate |
| Shataku | Subsidised | Contract duration | N/A | Via employer |

## How to Choose

**Arriving in less than 3 weeks:** share house or monthly mansion. These are the only options with guaranteed quick move-in.

**You have 1-2 months to settle:** agency-sourced apartment. You'll have a real choice of neighbourhood, floor space, and can sign a 6-12 month lease.

**Coming for less than 3 months:** monthly mansion or Airbnb for the first week, then a share house for the rest of your stay.

**You have a Japanese employer:** start by asking about shataku. It's the cheapest and simplest route if available.

## Furnished apartment in Tokyo for a long stay

If you plan to stay a year or more, a furnished apartment in Tokyo still works, but the maths change. Beyond about 12 months, a monthly mansion or serviced apartment costs more than an unfurnished standard lease plus one-off furniture. The break-even is usually around 9 to 12 months. For a long-term furnished apartment, a specialist agency (option 3) is the best route: you get a 12-month furnished lease, a real apartment of 30 to 60 m2, and no Japanese guarantor, while keeping the flexibility that furniture-included brings. If you are certain you will stay two years or more, ask us about an unfurnished lease instead, as the total cost is usually lower.

## Frequently asked questions

**How much does a furnished apartment in Tokyo cost?** From around 40,000 JPY per month for a furnished share house room to 100,000 to 300,000 JPY for a private furnished apartment through an agency. A monthly mansion sits in between at 80,000 to 200,000 JPY.

**Can a foreigner rent a furnished apartment in Tokyo without a guarantor?** Yes. Share houses, monthly mansions and specialist agencies all rent to foreigners without a Japanese guarantor. A rental guarantee company is accepted where a guarantor would normally be required.

**What is the minimum stay for a furnished apartment in Tokyo?** Usually one month for a share house or a monthly mansion, and three months for an agency-sourced furnished apartment. Airbnb covers shorter bridging stays.

**Are furnished apartments in Tokyo worth it long term?** For stays under about a year, yes. Beyond 12 months, an unfurnished standard lease plus furniture is usually cheaper, so weigh the break-even before committing.

**Furnished or unfurnished in Tokyo?** Furnished wins for speed, flexibility and no guarantor, ideal on arrival. Unfurnished is cheaper monthly for long stays but needs a guarantor, a bank account and a two-year commitment.

For personalised help with your search, [contact us](/contact): we handle the full process in English, from budget planning to lease signing.


For health coverage during your relocation, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment. For cultural activities in Tokyo, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) offers guided tours bookable online. *(affiliate links)*
---

*See also: [apartment hunting in Tokyo from abroad](/blog/tokyo-apartment-hunting-from-abroad) and [furnished apartments without a guarantor](/blog/furnished-apartment-tokyo-no-guarantor), [Furnished Apartment in Tokyo for Expats: 5 Quick Options (2026)](/blog/furnished-apartment-tokyo-expats).*
    `.trim(),
  },

  // ── BRAND ATTACK PAGES ────────────────────────────────────────────────────

  {
    slug: 'remoters-alternative',
    locale: 'en',
    title: 'Remoters Alternative: Dedicated Tokyo Apartment Hunting',
    description: 'Remoters connects you with local agents but adds 20-30% fees and limited control. A dedicated Tokyo apartment hunter delivers more for less.',
    date: '2026-06-23',
    readingTime: '5 min',
    content: `
Remoters is a relocation marketplace that connects expats with local housing consultants in cities worldwide, including Tokyo. If you've come across it while searching for help finding an apartment in Japan, this guide explains how Remoters works, what it costs, and when a direct specialist is the better choice.

**Quick answer:** Remoters connects expats with local housing consultants worldwide, on a commission model. If you want a Tokyo-focused, bilingual (English and French) property hunter on a flat fee, Tokyo Expat is a direct alternative: one specialist handles the search and viewings, connects you to the right licensed partner, and supports you through to signing.

## How Remoters Works

Remoters acts as a middleman: you submit your housing requirements on the platform, and local consultants bid on your case or are matched to you algorithmically. You then work with a local agent who has registered on the Remoters platform.

The fee structure works like this: Remoters charges the consultant a commission of typically 20–30% of their service fee. This commission is either absorbed by the consultant (reducing their margin and motivation) or passed on to you as a higher total cost.

## The Limitations of the Marketplace Model

**You don't choose your consultant.** On Remoters, you're matched to whoever is available and registered, not necessarily the most experienced agent for your specific situation. Quality varies considerably between consultants on the platform.

**The intermediary layer adds friction.** Any question or issue goes through the Remoters platform before reaching your consultant. This slows communication at exactly the moments when speed matters, during a tight Tokyo rental market.

**Fee opacity.** Because Remoters takes a cut from consultants, the true cost of the service isn't always transparent upfront. The consultant quote you receive already factors in the platform margin.

**Tokyo-specific expertise varies.** Remoters operates globally across 100+ cities. Consultants registered for Tokyo range from highly experienced to very new to the market.

## Why a Direct Specialist Works Better for Tokyo

Tokyo's rental market has specific rules that matter enormously: the guarantor system, the jiko bukken disclosure requirement, the difference between agency-managed and owner-managed properties, and the seasonal supply cycles (March and September peak demand).

Working directly with a specialist who focuses exclusively on Tokyo expat housing means:

- No platform margin in the fee structure
- Direct communication, no middleman
- Access to relationships with Japanese agencies and property managers that take years to build
- Deep knowledge of which neighbourhoods suit which expat profiles

### What to Expect from a Direct Tokyo Apartment Hunt

A typical process with a direct specialist:

1. Initial call (30 min) to define budget, neighbourhood, move-in date, and must-haves
2. Shortlist of 5–10 properties within 48 hours, including off-market options
3. Viewings arranged within the week (virtual or in-person)
4. Property selected, documents compiled, guarantor arranged
5. Keys in hand within 7–14 days of first contact

Total cost is comparable to or lower than using Remoters once you factor out the platform margin.

## When Remoters Still Makes Sense

Remoters can be useful if you're relocating to multiple cities simultaneously and want a single platform to coordinate everything, or if you're researching the market before committing to a specialist. For Tokyo specifically, where the rental process is highly specific and relationship-dependent, direct expertise consistently outperforms marketplace matching.

If you're looking for a Tokyo apartment and want a direct, no-intermediary approach, [contact us here](/contact). We handle the full process in English and French, from first search to lease signing.


For health coverage during your property search in Japan, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment. *(affiliate link)*
---

*Related: [how to find an apartment in Tokyo as a foreigner](/blog/find-apartment-tokyo-foreigner) and [checklist for moving to Tokyo](/blog/moving-to-tokyo-checklist-2026).*
    `.trim(),
  },

  // ── FR TWINS ─────────────────────────────────────────────────────────────




  {
    slug: 'alternative-remoters-chasseur-tokyo',
    locale: 'fr',
    title: 'Alternative à Remoters : chasseur immobilier Tokyo dédié',
    description: 'Remoters ajoute des frais de 20-30% et un intermédiaire entre vous et l\'agent. Un chasseur immobilier dédié à Tokyo offre plus pour le même budget.',
    date: '2026-06-23',
    readingTime: '5 min',
    content: `
Remoters est une marketplace de relocation qui met en relation des expatriés avec des consultants locaux dans des villes du monde entier, dont Tokyo. Si vous avez rencontré ce service dans votre recherche d'aide pour trouver un appartement à Tokyo, ce guide explique comment fonctionne Remoters, ce que ça coûte réellement, et quand un spécialiste direct est préférable.

**Réponse rapide :** Remoters met en relation des expatriés avec des consultants locaux, sur un modèle à commission. Si vous cherchez un chasseur immobilier centré sur Tokyo, bilingue (français et anglais), à forfait fixe, Tokyo Expat est une alternative directe : un seul spécialiste gère la recherche et les visites, vous connecte au bon partenaire licencié et vous accompagne jusqu'à la signature.

## Comment fonctionne Remoters

Remoters joue le rôle d'intermédiaire : vous soumettez vos besoins sur la plateforme, et des consultants locaux vous sont proposés par l'algorithme ou par mise en relation directe. Vous travaillez ensuite avec un agent local inscrit sur la plateforme Remoters.

Le modèle économique : Remoters prélève une commission de 20 à 30 % sur les honoraires du consultant. Cette commission est soit absorbée par le consultant (ce qui réduit sa marge et sa motivation), soit répercutée sur vous sous forme de coût total plus élevé.

## Les limites du modèle marketplace

**Vous ne choisissez pas votre consultant.** Sur Remoters, vous êtes mis en relation avec qui est disponible et inscrit, pas nécessairement avec l'expert le plus qualifié pour votre situation spécifique. La qualité des consultants varie considérablement sur la plateforme.

**La couche intermédiaire ralentit tout.** Chaque question ou problème passe par la plateforme Remoters avant d'atteindre votre consultant. Cela ralentit la communication exactement aux moments où la rapidité compte.

**Manque de transparence sur les frais.** La commission Remoters est intégrée dans les devis des consultants sans être toujours clairement identifiée.

**L'expertise Tokyo varie.** Remoters couvre 100+ villes dans le monde. Les consultants inscrits pour Tokyo vont du très expérimenté au débutant.

## Pourquoi un spécialiste direct est plus efficace pour Tokyo

Le marché locatif de Tokyo a des règles spécifiques qui ont un impact direct sur votre dossier : le système du garant, la règle de divulgation jiko bukken, la différence entre propriété gérée par agence et propriété gérée par propriétaire, et les cycles saisonniers de l'offre (pic en mars et septembre).

Travailler directement avec un spécialiste focalisé exclusivement sur le logement des expatriés à Tokyo, c'est :

- Aucune marge plateforme dans la structure de frais
- Communication directe, sans intermédiaire
- Accès à des relations avec des agences et propriétaires japonais construites sur plusieurs années
- Connaissance approfondie des quartiers adaptés à chaque profil d'expatrié

### Ce à quoi ressemble une recherche directe à Tokyo

Un processus typique avec un spécialiste direct :

1. Appel initial (30 min) pour définir le budget, le quartier cible, la date d'emménagement et les critères
2. Sélection de 5 à 10 propriétés sous 48 h, incluant des biens hors marché
3. Visites organisées dans la semaine (en présentiel ou virtuel)
4. Bien sélectionné, dossier constitué, garant arrangé
5. Clés remises en 7 à 14 jours à compter du premier contact

Le coût total est comparable ou inférieur à Remoters une fois la commission plateforme exclue.

## Quand Remoters peut encore avoir du sens

Remoters est utile si vous vous relocalisez dans plusieurs villes simultanément et souhaitez une plateforme unique pour coordonner. Pour Tokyo spécifiquement, où le processus locatif est très technique et repose sur des relations, l'expertise directe surpasse systématiquement la mise en relation via marketplace.

Si vous cherchez un appartement à Tokyo et souhaitez une approche directe sans intermédiaire, [contactez-nous ici](/contact). Nous gérons le processus complet en français et en anglais, de la recherche à la signature du bail.


Pour votre couverture sante pendant la recherche de logement, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement. *(lien affilie)*
---

*À lire aussi : [trouver un appartement à Tokyo en tant qu'étranger](/blog/trouver-appartement-tokyo-etranger) et [checklist déménagement à Tokyo](/blog/demenager-japon-checklist-complete).*
    `.trim(),
  },
  {
    slug: 'tokyo-rent-by-neighborhood-2026',
    locale: 'en',
    title: 'Tokyo Rent by Neighborhood 2026: Expat Price Guide',
    description: 'Complete breakdown of Tokyo apartment rents by neighborhood in 2026. Average costs for 1K, 1LDK and 2LDK across 15 key districts for expats budgeting their move.',
    date: '2026-06-25',
    readingTime: '8 min',
    content: `
Understanding Tokyo apartment prices before you start your search is the difference between a realistic brief and weeks of wasted visits. Rents in Tokyo vary enormously by neighborhood, apartment type, and proximity to a metro station. This guide gives you benchmarks for 15 key expat districts in 2026, based on current market data for furnished and unfurnished rentals.

**Quick answer:** Tokyo rents vary widely by neighbourhood and layout. Central premium areas (Hiroo, Roppongi, Minato) run 150,000 to 300,000 JPY for a 1LDK; mid-range areas offer more space per yen; outer wards are the most affordable. Always weigh rent against commute time. See our data-backed Tokyo Rent Index for medians by ward and train line.

All prices below are monthly rent in JPY, excluding service charges and utilities unless specified. Add 15-25% for fully furnished serviced apartments. For median rent across all 23 wards by layout, see our [Tokyo Rent Index](/data), computed from 528,660 real listings.

## Tokyo Rent Comparison by Neighborhood: 2026

| Neighborhood | 1K / Studio | 1LDK | 2LDK |
|---|---|---|---|
| Hiroo / Minami-Azabu | 150,000-200,000 | 200,000-300,000 | 300,000-450,000 |
| Roppongi / Azabu | 130,000-180,000 | 180,000-280,000 | 280,000-400,000 |
| Akasaka / Nagatacho | 120,000-170,000 | 170,000-260,000 | 260,000-380,000 |
| Shibuya / Ebisu | 110,000-160,000 | 160,000-240,000 | 240,000-350,000 |
| Shinjuku (central) | 100,000-150,000 | 140,000-220,000 | 200,000-300,000 |
| Nakameguro / Daikanyama | 100,000-150,000 | 150,000-220,000 | 220,000-320,000 |
| Meguro / Gotanda | 95,000-140,000 | 140,000-210,000 | 210,000-300,000 |
| Shinagawa / Osaki | 85,000-130,000 | 130,000-200,000 | 200,000-280,000 |
| Shimokitazawa / Sangenjaya | 75,000-110,000 | 110,000-160,000 | 160,000-230,000 |
| Koenji / Nakano | 70,000-100,000 | 100,000-150,000 | 150,000-210,000 |
| Kagurazaka / Iidabashi | 100,000-145,000 | 145,000-220,000 | 220,000-310,000 |
| Akihabara / Kanda | 80,000-120,000 | 120,000-180,000 | 180,000-260,000 |
| Sumida / Ryogoku | 70,000-105,000 | 105,000-160,000 | 160,000-230,000 |
| Asakusa / Ueno | 72,000-108,000 | 108,000-165,000 | 165,000-235,000 |
| Monzen-Nakacho | 75,000-110,000 | 110,000-165,000 | 165,000-235,000 |

*Prices in JPY/month, unfurnished, standard 2-year lease. Add 15-25% for furnished. Data: 2026 market averages.*

## What Drives the Price Differences

**Proximity to the diplomatic and business corridor**

The cluster of Hiroo, Minami-Azabu, Roppongi and Akasaka commands the highest rents in Tokyo for expats. This area concentrates the largest share of foreign residents, international schools, and English-friendly services. Properties here often include amenities aimed at foreign tenants: 24-hour concierge, bilingual management, and direct access to Roppongi station.

**Line and station quality**

Properties within 5 minutes of a major hub (Shinjuku, Shibuya, Roppongi) carry a 15-25% premium over equivalent properties 10-15 minutes away. The same apartment moves from 160,000 JPY to 130,000 JPY if you are willing to walk an extra 8 minutes to the station.

**Building age and type**

Post-2010 buildings with seismic reinforcement (shin-taishin), elevator, auto-lock, and built-in appliances command a premium of 10-20% over older buildings. For expats planning a 2-3 year stay, newer buildings also reduce maintenance friction.

**Floor level**

High floors (8th and above) add 5-15% to the listed price in Tokyo. The premium is larger in buildings with panoramic views.

## Which Neighborhood Suits Which Budget

**Under 120,000 JPY/month**: Shimokitazawa, Koenji, Nakano, Sumida, Monzen-Nakacho. These neighborhoods offer good quality of life, strong metro access, and an authentic Tokyo feel. Less international-facing infrastructure (fewer English-speaking services, fewer Western restaurants), but excellent value.

**120,000-180,000 JPY/month**: Shinjuku, Meguro, Shinagawa, Nakameguro, Ebisu. The sweet spot for most expat budgets. Good infrastructure, English-friendly environments, reasonable commute times to major business districts.

**Over 180,000 JPY/month**: Hiroo, Minami-Azabu, Roppongi, Akasaka, Shibuya. Full-service expat experience: international supermarkets, school proximity, English-speaking property managers. Suitable for families or professionals with housing allowances.

## Why Budget-Only Searches Miss the Point

The cheapest apartment is rarely the best value. A 70,000 JPY studio 25 minutes from your workplace with no English-speaking property manager costs more in time and friction than a 110,000 JPY apartment that is 10 minutes away and managed in English.

For expats, the hidden cost of a mismatched apartment is measured in commute hours, isolation, and administrative difficulty. The most experienced expats start with neighborhood first, then filter by budget, not the other way around.

See: [Tokyo neighborhoods guide for expats](/blog/tokyo-neighbourhoods-expats-guide) and [how to find an apartment in Tokyo as a foreigner](/blog/find-apartment-tokyo-foreigner)

## What to Budget Beyond the Rent

When calculating your Tokyo housing budget, add:

- **Agency fee (shoukoukin)**: 1 month of rent, non-refundable
- **Security deposit (shikikin)**: 1-2 months of rent, partially refundable
- **Key money (reikin)**: 0-2 months, non-refundable (increasingly negotiable, especially for foreign-friendly landlords)
- **Guarantor fee**: 0.5-1 month of rent per year if using a guarantor company
- **Moving costs**: 50,000-150,000 JPY depending on volume and distance

Total move-in cost for a 150,000 JPY/month apartment: approximately 500,000-800,000 JPY upfront.

For furnished apartments or monthly mansions, entry costs are typically lower (1-2 months), but monthly rent is 15-30% higher.

[Contact us](/contact) to discuss your budget and identify the neighborhoods where your price range gets you the best match.


For health coverage during your apartment search, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment. To explore neighbourhoods before choosing, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) offers guided tours across Tokyo. *(affiliate links)*
---

*Read next: [furnished apartments in Tokyo with no guarantor](/blog/furnished-apartment-tokyo-no-guarantor) and [Hiroo and Minami-Azabu expat neighborhood guide](/blog/hiroo-minami-azabu-expat-neighborhood-guide), [Negotiating Rent in Tokyo: Is It Possible and How to Do It?](/blog/negotiating-rent-tokyo-tips), [7 Rental Traps to Avoid When Renting in Tokyo as a Foreigner](/blog/tokyo-rental-traps-foreigners), [Tokyo Rental Contract: 12 Things to Check Before Signing](/blog/tokyo-rental-contract-checklist), [Furnished Apartment Tokyo: 5 Best Options for Expats in 2026](/blog/furnished-apartment-tokyo-top-5-expats).*
    `.trim(),
  },
  {
    slug: 'loyers-tokyo-par-quartier-2026',
    locale: 'fr',
    title: 'Loyers à Tokyo par quartier 2026: guide pour expatriés',
    description: 'Comparatif complet des loyers à Tokyo en 2026. Prix moyens des appartements 1K, 1LDK et 2LDK dans 15 quartiers clés pour budgétiser votre installation en tant qu\'expatrié.',
    date: '2026-06-25',
    readingTime: '8 min',
    content: `
Comprendre les loyers de Tokyo avant de commencer votre recherche, c'est la différence entre un brief réaliste et des semaines de visites inutiles. Les loyers à Tokyo varient considérablement selon le quartier, le type d'appartement et la proximité des transports. Ce guide vous donne les fourchettes de prix pour 15 quartiers clés en 2026.

**Réponse rapide :** Les loyers de Tokyo varient fortement selon le quartier et le layout. Les zones centrales premium (Hiroo, Roppongi, Minato) vont de 150 000 à 300 000 JPY pour un 1LDK ; les zones intermédiaires offrent plus d'espace par yen ; les arrondissements périphériques sont les plus abordables. Arbitrez toujours loyer contre temps de trajet. Voyez notre Indice des loyers pour les médianes par arrondissement et par ligne.

Tous les prix ci-dessous sont des loyers mensuels en JPY, hors charges et utilities sauf mention contraire. Ajoutez 15 à 25% pour les appartements entièrement meublés et équipés. Pour le loyer médian dans les 23 arrondissements par layout, voyez notre [Indice des loyers de Tokyo](/data), calculé sur 528 660 annonces réelles.


![Le quartier de Tokyo le moins cher dépend de votre foyer : célibataire, couple ou famille](/tokyo-household-flip-fr.png "Célibataire : Edogawa, couple : Katsushika, famille : Adachi. Pas le même quartier.")
## Comparatif loyers Tokyo par quartier: 2026

| Quartier | 1K / Studio | 1LDK | 2LDK |
|---|---|---|---|
| Hiroo / Minami-Azabu | 150 000-200 000 | 200 000-300 000 | 300 000-450 000 |
| Roppongi / Azabu | 130 000-180 000 | 180 000-280 000 | 280 000-400 000 |
| Akasaka / Nagatacho | 120 000-170 000 | 170 000-260 000 | 260 000-380 000 |
| Shibuya / Ebisu | 110 000-160 000 | 160 000-240 000 | 240 000-350 000 |
| Shinjuku (central) | 100 000-150 000 | 140 000-220 000 | 200 000-300 000 |
| Nakameguro / Daikanyama | 100 000-150 000 | 150 000-220 000 | 220 000-320 000 |
| Meguro / Gotanda | 95 000-140 000 | 140 000-210 000 | 210 000-300 000 |
| Shinagawa / Osaki | 85 000-130 000 | 130 000-200 000 | 200 000-280 000 |
| Shimokitazawa / Sangenjaya | 75 000-110 000 | 110 000-160 000 | 160 000-230 000 |
| Koenji / Nakano | 70 000-100 000 | 100 000-150 000 | 150 000-210 000 |
| Kagurazaka / Iidabashi | 100 000-145 000 | 145 000-220 000 | 220 000-310 000 |
| Akihabara / Kanda | 80 000-120 000 | 120 000-180 000 | 180 000-260 000 |
| Sumida / Ryogoku | 70 000-105 000 | 105 000-160 000 | 160 000-230 000 |
| Asakusa / Ueno | 72 000-108 000 | 108 000-165 000 | 165 000-235 000 |
| Monzen-Nakacho | 75 000-110 000 | 110 000-165 000 | 165 000-235 000 |

*Prix en JPY/mois, non meublé, bail standard 2 ans. Ajouter 15-25% pour les meublés. Données: moyennes marché 2026.*

## Ce qui explique les différences de prix

**La proximité du couloir diplomatique et d'affaires**

Le cluster Hiroo, Minami-Azabu, Roppongi et Akasaka concentre les loyers les plus élevés de Tokyo pour les expatriés. Cette zone rassemble la plus grande densité de résidents étrangers, d'écoles internationales et de services anglophones. Les immeubles y incluent souvent des prestations orientées vers les locataires étrangers: conciergerie 24h, gestion bilingue, accès direct aux transports.

**La qualité de la ligne et de la station**

Un appartement à moins de 5 minutes d'un hub majeur (Shinjuku, Shibuya, Roppongi) est 15 à 25% plus cher qu'un appartement équivalent à 10-15 minutes. Le même appartement passe de 160 000 JPY à 130 000 JPY si vous acceptez 8 minutes de marche supplémentaires.

**L'âge et le type de l'immeuble**

Les immeubles post-2010 avec renforcement sismique (shin-taishin), ascenseur, serrure automatique et équipements intégrés sont 10 à 20% plus chers que les immeubles anciens. Pour un séjour de 2 à 3 ans, les immeubles neufs réduisent aussi les complications de maintenance.

## Quel quartier pour quel budget

**Moins de 120 000 JPY/mois**: Shimokitazawa, Koenji, Nakano, Sumida. Excellente qualité de vie, bon réseau de transports, ambiance authentiquement tokyoïte. Moins d'infrastructure internationale (moins de services anglophones), mais excellent rapport qualité-prix.

**120 000 à 180 000 JPY/mois**: Shinjuku, Meguro, Shinagawa, Nakameguro, Ebisu. Le sweet spot pour la plupart des budgets expatriés. Bonne infrastructure, environnements anglophones disponibles, temps de trajet raisonnables vers les principaux pôles d'affaires.

**Plus de 180 000 JPY/mois**: Hiroo, Minami-Azabu, Roppongi, Akasaka, Shibuya. Expérience expatriée complète: supermarchés internationaux, proximité des écoles, gestionnaires anglophones. Adapté aux familles ou aux professionnels avec enveloppe logement.

## Pourquoi chercher uniquement par prix est une erreur

L'appartement le moins cher n'est presque jamais le meilleur rapport valeur. Un studio à 70 000 JPY à 25 minutes de votre lieu de travail, sans gestionnaire anglophone, coûte plus cher en temps et en friction qu'un appartement à 110 000 JPY à 10 minutes et géré en anglais.

Pour un expatrié, le coût caché d'un mauvais appartement se mesure en heures de trajet, en isolement et en difficultés administratives. Les expatriés expérimentés choisissent le quartier en premier, le budget ensuite.

Voir: [guide des quartiers de Tokyo pour expatriés](/blog/quartiers-tokyo-expatries-guide) et [comment trouver un appartement à Tokyo en tant qu'étranger](/blog/trouver-appartement-tokyo-etranger)

## Ce qu'il faut budgétiser au-delà du loyer

En calculant votre budget logement à Tokyo, ajoutez:

- **Frais d'agence (shoukoukin)**: 1 mois de loyer, non remboursable
- **Dépôt de garantie (shikikin)**: 1 à 2 mois de loyer, partiellement remboursable
- **Reikin (clé de courtoisie)**: 0 à 2 mois, non remboursable (de plus en plus négociable)
- **Société de garantie**: 0,5 à 1 mois de loyer par an si vous n'avez pas de garant japonais
- **Déménagement**: 50 000 à 150 000 JPY selon le volume et la distance

Coût total d'entrée pour un appartement à 150 000 JPY/mois: environ 500 000 à 800 000 JPY.

[Contactez-nous](/contact) pour discuter de votre budget et identifier les quartiers où votre fourchette de prix correspond le mieux à votre profil.


Pour votre couverture sante pendant la recherche de logement, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement. Pour explorer les quartiers avant de choisir, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) propose des visites guidees a Tokyo. *(liens affilies)*
---

*À lire aussi: [appartements meublés à Tokyo sans garant](/blog/appartement-meuble-tokyo-sans-garant) et [Hiroo et Minami-Azabu: guide des quartiers expats](/blog/hiroo-minami-azabu-guide-expatries-tokyo), [Négocier son loyer à Tokyo : est-ce possible et comment s'y prendre ?](/blog/negocier-loyer-tokyo-conseils).*
    `.trim(),
  },
  {
    slug: 'renting-tokyo-entrepreneur-startup-guide',
    locale: 'en',
    title: 'Renting in Tokyo as an Entrepreneur: What You Need to Know',
    description: 'Freelancers and startup founders face specific barriers renting in Tokyo. Here is how to overcome them: guarantors, income proof alternatives and the right channels.',
    date: '2026-06-25',
    readingTime: '7 min',
    content: `
Renting an apartment in Tokyo as a freelancer, entrepreneur, or startup founder is harder than it is for a salaried employee. The Japanese rental market is built around one tenant profile: a full-time employee at a large Japanese company with regular pay slips and a stable employment contract. Everyone else is filtered out before the landlord even sees the application.

**Quick answer:** Renting in Tokyo as a freelancer or entrepreneur is harder because the market favours salaried employees with stable payslips. To succeed, use a guarantor company (which accepts self-employed applicants), show tax returns and bank statements as proof of income, or start with no-guarantor housing (share houses, furnished apartments). A bilingual agent smooths the application.

This guide explains exactly why, and what you can do about it.

## Why Entrepreneurs Are Rejected on the Traditional Market

The Japanese rental screening process is conservative by design. Landlords assess risk based on income stability, not absolute income. A freelancer earning 800,000 JPY per month may be rejected in favor of a salaried employee earning 300,000 JPY per month, simply because the employee's income is guaranteed by a company.

**What landlords look for:**
- Employment certificate from a recognized company (zaishoku shomeisho)
- Pay slips for the past 3-6 months showing consistent income
- A guarantor (hoshounin) who is a full-time Japanese employee

**What entrepreneurs cannot provide:**
- A traditional employment certificate
- Pay slips from an employer
- A Japanese guarantor with corporate employment

The result: your application is either rejected outright or never forwarded to the landlord by the agency.

## What Documents Work Instead

If you cannot provide the standard documents, substitute with the strongest alternatives available:

**For income proof:**
- 2-3 years of tax returns (kakutei shinkoku) showing stable or growing income
- Bank statements covering the last 3-6 months showing consistent cash flow
- A letter from your accountant or CPA confirming your annual income
- Client contracts or invoices demonstrating ongoing revenue

**For business proof:**
- Business registration certificate (touki jiko shomeisho) if you have an incorporated entity in Japan
- LinkedIn profile or website showing your business activity
- A client list (even partial) demonstrating continuity

**For guarantor:**
- A guarantee company (hoshougaisha) - this is the most reliable substitute. The annual fee is 0.5-1 month of rent and it eliminates the need for a personal Japanese guarantor.

## Which Market to Target

The traditional Japanese rental market will be difficult regardless of document quality. There are two segments where entrepreneurs have significantly better outcomes:

**Furnished monthly mansions and serviced apartments**: These operators are accustomed to self-employed tenants, freelancers, and international professionals. They use simplified screening and their minimum period is 1-3 months. The monthly rent is higher (15-30% above equivalent unfurnished), but the total cost is often lower when you factor in the absence of key money, lower security deposit, and no furniture purchase.

See: [Furnished apartments in Tokyo with no guarantor](/blog/furnished-apartment-tokyo-no-guarantor)

**Expat-specialist agencies**: Some agencies have built networks of landlords who have explicitly accepted non-standard employment profiles. These are not advertised but are accessible through intermediaries who work regularly with this audience.

## The Real Estate Hunter Advantage for Entrepreneurs

A real estate hunter who specializes in foreign profiles, including self-employed profiles, knows exactly which landlords and agencies accept entrepreneurs. They pre-filter based on your profile before submitting any application, dramatically reducing the rejection rate.

More importantly, they can position your profile correctly. "Freelancer" and "entrepreneur" are risky labels in Japanese real estate. A hunter who has worked with dozens of similar profiles knows how to frame income stability, present documentation in the right order, and address the landlord's concerns before they arise.

See: [Real estate hunter vs agency in Tokyo](/blog/real-estate-hunter-vs-agency-tokyo)

## Japan Startup Visa Holders: Additional Considerations

If you hold a Japan Business Manager Visa (startup visa), your application profile includes one additional complication: the visa is often tied to a specific business address, not a residential address. Some landlords and agencies are unfamiliar with this visa type and apply additional scrutiny.

The solution is the same: target furnished operators and expat-specialist channels where your visa type is understood, and use a real estate hunter who has handled startup visa profiles previously.

## Timeline and Budget Expectations

For an entrepreneur relocating to Tokyo without a standard employment setup:

- **Timeline via traditional market**: unpredictable, potentially 6-10 weeks with multiple rejections
- **Timeline via furnished operators**: 1-2 weeks
- **Timeline via hunter with specialist network**: 7-14 days for a permanent unfurnished solution

Budget: add 20-30% contingency over your listed rent target to account for entry costs (security deposit, agency fees, guarantor company).

[Contact us](/contact) for a first call. We work regularly with entrepreneurs, freelancers, and startup founders relocating to Tokyo.


For health coverage as a freelancer or entrepreneur in Japan, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment, suited for self-employed expats before national insurance enrolment. *(affiliate link)*
---

*Read next: [rental application rejected in Japan: what to do](/blog/rental-application-rejected-japan-foreigner) and [real estate hunter vs agency in Tokyo](/blog/real-estate-hunter-vs-agency-tokyo).*
    `.trim(),
  },
  {
    slug: 'appartement-tokyo-entrepreneur-freelance',
    locale: 'fr',
    title: 'Appartement à Tokyo pour entrepreneurs et freelances',
    description: 'Les entrepreneurs et freelances font face à des obstacles spécifiques pour louer à Tokyo. Causes, solutions concrètes et meilleurs canaux pour trouver rapidement.',
    date: '2026-06-25',
    readingTime: '7 min',
    content: `
Louer un appartement à Tokyo quand on est entrepreneur, freelance ou travailleur indépendant est structurellement plus difficile que pour un salarié. Le marché locatif japonais est construit autour d'un profil type: salarié d'une grande entreprise japonaise, CDI, fiche de paie stable. Tout le monde en dehors de ce profil est filtré avant même que le propriétaire voie votre dossier.

**Réponse rapide :** Louer à Tokyo en tant qu'entrepreneur ou freelance est plus difficile car le marché privilégie les salariés avec des fiches de paie stables. Pour réussir : passer par une société de garantie (qui accepte les indépendants), présenter avis d'imposition et relevés bancaires comme preuve de revenus, ou commencer par un logement sans garant (share house, meublé). Un agent bilingue facilite le dossier.

Ce guide explique exactement pourquoi, et ce que vous pouvez faire.

## Pourquoi les entrepreneurs sont refusés sur le marché traditionnel

Le processus de sélection locative japonais est conçu pour minimiser le risque. Les propriétaires évaluent la stabilité des revenus, pas leur niveau absolu. Un freelance qui gagne 800 000 JPY par mois peut être refusé en faveur d'un salarié qui gagne 300 000 JPY, uniquement parce que les revenus du salarié sont garantis par une entreprise.

**Ce que les propriétaires demandent:**
- Attestation d'emploi d'une entreprise reconnue (zaishoku shomeisho)
- Bulletins de salaire des 3 à 6 derniers mois montrant des revenus réguliers
- Un garant (hoshounin): citoyen japonais salarié à temps plein

**Ce que les entrepreneurs ne peuvent pas fournir:**
- Une attestation d'emploi classique
- Des bulletins de salaire
- Un garant japonais avec emploi stable en entreprise

Le résultat: votre dossier est soit refusé directement, soit jamais transmis au propriétaire par l'agence.

## Les documents qui fonctionnent à la place

Si vous ne pouvez pas fournir les documents standard, voici les meilleures alternatives:

**Pour justifier vos revenus:**
- 2 à 3 ans de déclarations fiscales (kakutei shinkoku) montrant des revenus stables ou en croissance
- Relevés bancaires des 3 à 6 derniers mois montrant un cash-flow régulier
- Lettre de votre expert-comptable certifiant votre revenu annuel
- Contrats clients ou factures démontrant une activité continue

**Pour prouver votre activité:**
- Extrait K-bis ou équivalent japonais (touki jiko shomeisho) si vous avez une structure incorporée au Japon
- Site professionnel ou profil LinkedIn montrant votre activité
- Références clients

**Pour le garant:**
- Une société de garantie (hoshougaisha): c'est le substitut le plus fiable. La prime annuelle est de 0,5 à 1 mois de loyer et élimine le besoin d'un garant personnel japonais.

## Quel marché cibler

Le marché traditionnel japonais restera difficile quel que soit votre dossier. Deux segments offrent de bien meilleures chances:

**Appartements meublés et monthly mansions**: Ces opérateurs sont habitués aux profils indépendants, freelances et professionnels internationaux. Ils utilisent une sélection simplifiée et leur durée minimale est de 1 à 3 mois. Le loyer mensuel est plus élevé (15 à 30% au-dessus de l'équivalent non meublé), mais le coût total est souvent inférieur quand on intègre l'absence de reikin, le dépôt réduit et l'absence d'achat de mobilier.

Voir: [Appartements meublés à Tokyo sans garant](/blog/appartement-meuble-tokyo-sans-garant)

**Agences spécialisées expatriés**: Certaines agences ont constitué des réseaux de propriétaires ayant explicitement accepté les profils non-standard. Ces réseaux ne sont pas visibles publiquement mais sont accessibles via des intermédiaires qui travaillent régulièrement avec ce type de profil.

## L'avantage du chasseur immobilier pour les entrepreneurs

Un chasseur spécialisé dans les profils étrangers, y compris les profils indépendants, sait exactement quelles agences et quels propriétaires acceptent les entrepreneurs. Il présélectionne sur la base de votre profil avant de soumettre quoi que ce soit, ce qui réduit radicalement le taux de refus.

Plus important: il peut positionner votre profil correctement. "Freelance" et "entrepreneur" sont des labels perçus comme risqués dans l'immobilier japonais. Un chasseur habitué à ces profils sait comment présenter la stabilité de vos revenus, dans quel ordre présenter les documents, et comment répondre aux objections du propriétaire avant qu'elles ne surgissent.

Voir: [Chasseur immobilier ou agence à Tokyo: comparatif](/blog/chasseur-immobilier-vs-agence-tokyo-comparatif)

## Délais et budget à prévoir

Pour un entrepreneur qui se relocalise à Tokyo sans dossier salarial classique:

- **Délai via marché traditionnel**: imprévisible, potentiellement 6 à 10 semaines avec plusieurs refus
- **Délai via opérateurs meublés**: 1 à 2 semaines
- **Délai via chasseur avec réseau spécialisé**: 7 à 14 jours pour une solution non meublée permanente

Budget: prévoyez 20 à 30% de marge au-dessus de votre loyer cible pour couvrir les frais d'entrée (dépôt, frais d'agence, société de garantie).

[Contactez-nous](/contact) pour un premier échange. Nous travaillons régulièrement avec des entrepreneurs, freelances et fondateurs de startups qui se relocalisent à Tokyo.


Pour votre couverture sante en tant qu'independant au Japon, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement, adaptee aux freelances avant l'assurance nationale japonaise. *(lien affilie)*
---

*À lire aussi: [dossier refusé à Tokyo: que faire](/blog/dossier-location-refuse-tokyo-etranger) et [chasseur immobilier ou agence à Tokyo](/blog/chasseur-immobilier-vs-agence-tokyo-comparatif).*
    `.trim(),
  },
  {
    slug: 'corporate-relocation-tokyo-hr-housing-guide',
    locale: 'en',
    title: 'Corporate Relocation to Tokyo: Housing Guide for HR Teams',
    description: 'Managing a Tokyo relocation for an employee? Complete guide for HR and mobility managers: timelines, housing types, costs and what to plan to ensure a smooth arrival.',
    date: '2026-06-25',
    readingTime: '8 min',
    content: `
Relocating an employee to Tokyo involves more complexity than most HR managers anticipate. The Japanese rental market does not operate like Western markets: there is no automated matching system, leases require specific documentation, and the timeline from "we need housing" to "keys in hand" is typically 4-8 weeks under ideal conditions.

**Quick answer:** Relocating an employee to Tokyo takes 4 to 8 weeks from brief to keys, longer than most HR teams expect. Budget move-in costs of 3 to 5 months' rent for a standard lease, or use furnished and serviced apartments for speed and flexibility. Brief a bilingual property hunter early, and plan temporary housing if the employee arrives before the lease is signed.

This guide is written for HR managers, mobility coordinators, and office managers responsible for getting a team member settled in Tokyo as efficiently as possible.


![The order of steps to settle in Tokyo: visa, residence card, bank, guarantor, lease](/tokyo-process-en.png "Your residence card unlocks everything, get it on day 1")
## The Standard Tokyo Relocation Timeline

Understanding the timeline is the most important thing you can do before triggering a relocation.

**Week 1-2: Pre-arrival preparation**
- Confirm employee's visa status and expected arrival date
- Establish the housing budget (rent + entry costs)
- Define the neighborhood priorities (proximity to office, family needs, school requirements)
- Brief a real estate hunter or relocation specialist

**Week 2-4: Property search and application**
- Property selection based on the brief
- Application submission and landlord review (3-7 business days)
- Guarantor company arranged (required for foreign employees)

**Week 4-6: Signing and setup**
- Lease signing
- Utility setup (gas, electricity, internet)
- Key handover

If your employee arrives before the lease is signed, budget for temporary accommodation: serviced apartments or hotels in Tokyo run 8,000-15,000 JPY per night for business-appropriate properties.

## Housing Types and Their Trade-offs

**Standard 2-year lease unfurnished apartment**

The lowest monthly rent for a given size, but the highest entry cost (3-5 months upfront) and the least flexibility. Suitable when the employee is staying at least 2 years and the company can absorb entry costs and furnishing.

**Furnished monthly mansion (manshu)**

20-30% higher monthly rent than unfurnished, but minimal entry cost (1-2 months), no furniture expense, and flexible lease terms from 1 month. Best for probationary periods, short assignments, or when the final assignment duration is uncertain.

**Serviced apartment / corporate apartment**

Full hotel-style services, utilities included, housekeeping available. The most expensive option per month (150,000-400,000 JPY for a 1LDK) but zero administrative friction. Best for the first 1-3 months while the employee finds a permanent solution.

## What the Company Pays vs. What the Employee Pays

The clearest way to avoid relocation friction is to be explicit about this before the employee arrives.

**Typically company-covered:**
- Entry costs (security deposit, agency fee, key money): 3-6 months of rent upfront
- Guarantor company fee (0.5-1 month of rent per year)
- Furniture and appliance budget for unfurnished apartments
- Temporary accommodation until lease signing

**Typically employee-covered:**
- Monthly rent from the agreed housing allowance
- Utilities (electricity, gas, internet): 20,000-35,000 JPY per month
- Local insurance (renters insurance: 15,000-20,000 JPY per year)

## The Guarantor Question

This is the aspect that surprises HR managers most. In Japan, most standard rental contracts require a guarantor: a Japanese citizen employed full-time who agrees to cover unpaid rent. Foreign employees almost never have this.

The solution is a guarantee company (hoshougaisha). The fee is typically 0.5-1 month of rent per year. This cost should be explicitly included in your relocation budget.

Some landlords still prefer a personal guarantor. For corporate relocations, some companies provide a corporate guarantee letter instead, which landlords in the expat-friendly segment often accept.

## Why Local Expert Knowledge Matters

The Japanese real estate market is highly local. The same apartment can be listed by 3 different agencies at 3 different prices. The best properties are often not on public portals. Negotiating entry costs requires knowing which landlords are open to it.

For a corporate relocation, partnering with a real estate hunter or relocation specialist who knows the Tokyo market shortens the timeline from 6-10 weeks to 2-3 weeks, and reduces the risk of placing the employee in an unsuitable property.

See: [How a real estate hunter works in Tokyo](/blog/how-real-estate-hunter-works-tokyo) and [real estate hunter cost and ROI](/blog/real-estate-hunter-tokyo-cost-worth-it)

## Checklist Before the Employee Arrives

- Housing budget confirmed (rent + entry costs + temporary accommodation)
- Neighborhood brief established based on office location and family needs
- Real estate hunter or relocation specialist briefed
- Company guarantee letter prepared (if not using a guarantee company)
- Temporary accommodation booked for the first 2-4 weeks
- Furniture budget confirmed if targeting unfurnished apartment

[Contact us](/contact) for a corporate relocation consultation. We work with mobility teams and HR managers handling Tokyo relocations for French and international employees.


For employee health coverage during relocation, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment, activatable before Japanese national insurance enrolment. *(affiliate link)*
---

*Read next: [Tokyo rent by neighborhood 2026](/blog/tokyo-rent-by-neighborhood-2026) and [how a real estate hunter works in Tokyo](/blog/how-real-estate-hunter-works-tokyo).*
    `.trim(),
  },
  {
    slug: 'relocation-entreprise-tokyo-guide-rh',
    locale: 'fr',
    title: 'Relocation d\'entreprise à Tokyo: guide logement pour RH',
    description: 'Vous gérez une relocalisation d\'employé à Tokyo? Guide complet pour DRH et responsables mobilité: délais, types de logements, budgets et points de vigilance.',
    date: '2026-06-25',
    readingTime: '8 min',
    content: `
Relocaliser un employé à Tokyo implique plus de complexité que la plupart des responsables RH n'anticipent. Le marché locatif japonais ne fonctionne pas comme les marchés occidentaux: pas de système de matching automatisé, des baux avec des exigences documentaires spécifiques, et un délai de 4 à 8 semaines entre "il nous faut un logement" et "remise des clés", dans les meilleures conditions.

**Réponse rapide :** Relocaliser un employé à Tokyo prend 4 à 8 semaines du brief à la remise des clés, plus long que la plupart des équipes RH ne l'anticipent. Prévoyez des frais d'entrée de 3 à 5 mois de loyer pour un bail classique, ou des appartements meublés et services pour la rapidité. Briefez tôt un chasseur bilingue, et prévoyez un logement temporaire si l'employé arrive avant la signature.

Ce guide est écrit pour les DRH, coordinateurs de mobilité et office managers qui doivent installer un collaborateur à Tokyo aussi efficacement que possible.


![L'ordre des étapes pour s'installer à Tokyo : visa, carte de séjour, banque, garant, bail](/tokyo-process-fr.png "La carte de séjour débloque tout, faites-la le jour 1")
## Le calendrier type d'une relocalisation à Tokyo

Comprendre le calendrier est la chose la plus importante à faire avant de déclencher une relocalisation.

**Semaines 1-2: Préparation avant l'arrivée**
- Confirmer le statut visa de l'employé et la date d'arrivée prévue
- Établir le budget logement (loyer + frais d'entrée)
- Définir les priorités de quartier (proximité du bureau, besoins familiaux, écoles)
- Briefer un chasseur immobilier ou un spécialiste de la relocalisation

**Semaines 2-4: Recherche de bien et dossier**
- Sélection de biens sur la base du brief
- Dépôt du dossier et étude par le propriétaire (3 à 7 jours ouvrés)
- Mise en place de la société de garantie (obligatoire pour les employés étrangers)

**Semaines 4-6: Signature et installation**
- Signature du bail
- Mise en service des utilités (gaz, électricité, internet)
- Remise des clés

Si l'employé arrive avant la signature du bail, prévoyez un hébergement temporaire: les serviced apartments ou hôtels professionnels à Tokyo coûtent 8 000 à 15 000 JPY par nuit.

## Types de logements et leurs compromis

**Bail standard non meublé 2 ans**

Le loyer mensuel le plus bas pour une surface donnée, mais le coût d'entrée le plus élevé (3 à 5 mois d'avance) et le moins de flexibilité. Adapté quand l'employé reste au moins 2 ans et que l'entreprise peut absorber les frais d'entrée et d'ameublement.

**Monthly mansion meublé**

Loyer mensuel 20 à 30% plus élevé qu'un non meublé, mais coût d'entrée minimal (1 à 2 mois), pas de mobilier à acheter, et conditions de bail flexibles à partir de 1 mois. Idéal pour les périodes probatoires, les missions courtes, ou quand la durée finale est incertaine.

**Appartement en résidence de services**

Services complets inclus, utilités payées, ménage possible. L'option la plus chère au mois (150 000 à 400 000 JPY pour un 1LDK) mais zéro friction administrative. Optimal pour les 1 à 3 premiers mois pendant que l'employé cherche une solution permanente.

## Ce que l'entreprise prend en charge vs l'employé

La façon la plus claire d'éviter les frictions à la relocalisation est d'être explicite sur ce point avant l'arrivée de l'employé.

**Généralement à la charge de l'entreprise:**
- Frais d'entrée (dépôt, frais d'agence, reikin): 3 à 6 mois de loyer en avance
- Frais de société de garantie (0,5 à 1 mois de loyer par an)
- Budget mobilier et électroménager pour les appartements non meublés
- Hébergement temporaire jusqu'à la signature du bail

**Généralement à la charge de l'employé:**
- Loyer mensuel à partir de l'enveloppe logement convenue
- Utilités (électricité, gaz, internet): 20 000 à 35 000 JPY par mois
- Assurance locataire: 15 000 à 20 000 JPY par an

## La question du garant

C'est l'aspect qui surprend le plus les responsables RH. Au Japon, la plupart des baux standard exigent un garant (hoshounin): un citoyen japonais salarié à temps plein qui accepte de couvrir les impayés. Les employés étrangers n'en ont presque jamais.

La solution: la société de garantie (hoshougaisha). La prime est généralement de 0,5 à 1 mois de loyer par an. Ce coût doit être explicitement intégré à votre budget de relocalisation.

Certains propriétaires préfèrent encore un garant personnel. Pour les relocalisations corporate, certaines entreprises fournissent une lettre de garantie d'entreprise à la place, que les propriétaires du segment expatrié acceptent souvent.

## Pourquoi la connaissance locale compte

Le marché immobilier japonais est fortement local. Le même appartement peut être listé par 3 agences à 3 prix différents. Les meilleures propriétés ne sont pas sur les portails publics. Négocier les frais d'entrée exige de savoir quels propriétaires y sont ouverts.

Pour une relocalisation corporate, travailler avec un chasseur immobilier ou un spécialiste de la relocalisation qui connaît le marché de Tokyo réduit le délai de 6 à 10 semaines à 2 à 3 semaines, et réduit le risque de placer l'employé dans un logement inadapté.

Voir: [Comment fonctionne un chasseur immobilier à Tokyo](/blog/service-chasseur-immobilier-tokyo-comment-ca-marche) et [coûts et ROI du chasseur immobilier](/blog/chasseur-immobilier-tokyo-tarifs-vaut-il-le-coup)

## Checklist avant l'arrivée de l'employé

- Budget logement confirmé (loyer + frais d'entrée + hébergement temporaire)
- Brief de quartier établi selon l'emplacement du bureau et les besoins familiaux
- Chasseur immobilier ou spécialiste de la relocalisation briefé
- Lettre de garantie d'entreprise préparée si besoin
- Hébergement temporaire réservé pour les 2 à 4 premières semaines
- Budget mobilier confirmé si appartement non meublé ciblé

[Contactez-nous](/contact) pour une consultation relocalisation corporate. Nous travaillons avec des équipes RH et des responsables mobilité gérant des relocalisations à Tokyo pour des collaborateurs français et internationaux.


Pour la couverture sante des employes en transit, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement, activable avant l'assurance nationale japonaise. *(lien affilie)*
---

*À lire aussi: [loyers à Tokyo par quartier 2026](/blog/loyers-tokyo-par-quartier-2026) et [comment fonctionne un chasseur immobilier à Tokyo](/blog/service-chasseur-immobilier-tokyo-comment-ca-marche).*
    `.trim(),
  },
  {
    slug: 'ebisu-daikanyama-nakameguro-expat-guide',
    locale: 'en',
    title: 'Ebisu, Daikanyama and Nakameguro: Expat Living Guide',
    description: 'Ebisu, Daikanyama and Nakameguro offer Tokyo expat life without the embassy-district price tag. Full guide to rents, atmosphere, commute links and daily life.',
    date: '2026-06-25',
    readingTime: '7 min',
    content: `
Ebisu, Daikanyama and Nakameguro form one of the most attractive residential clusters in Tokyo for expats who want an international, walkable, high-quality urban environment without paying Hiroo or Roppongi prices. These three neighborhoods sit on the same Hibiya Line corridor as Hiroo, are connected by the Tokyu Toyoko Line, and share a distinctive atmosphere: independently-owned cafes, tree-lined streets, boutique retail, and a visible international community.

**Quick answer:** Ebisu, Daikanyama and Nakameguro are among Tokyo's most desirable expat neighbourhoods: walkable, stylish, international, with great cafes and easy access to central offices. Rents are high (a 1LDK often runs 200,000 to 300,000 JPY), but slightly below Hiroo and Minato. Ebisu suits families and connectivity, Daikanyama the design-minded, Nakameguro the young and trendy.

This guide covers rents, atmosphere, commute, and practical life across all three.


![Median monthly rent for a 1K studio near 50 Tokyo stations (2026)](/tokyo-rent-by-station.png "Where this station sits: median 1K rent across 50 Tokyo stations, from 528,660 real active listings")
## Ebisu: The Accessible Starting Point

Ebisu is the most connected of the three neighborhoods. It sits on both the JR Yamanote Line and the Tokyo Metro Hibiya Line, giving it direct access to Shinjuku (8 minutes), Shibuya (3 minutes), Roppongi (5 minutes), and Ginza (15 minutes). For professionals with business requirements spread across multiple districts, Ebisu is often the most efficient base.

**Atmosphere**: Upscale residential mixed with commercial. Yebisu Garden Place, the redeveloped Sapporo brewery site, anchors the eastern side with restaurants, a museum, a cinema, and open plaza space. The west side is quieter, with narrow streets, independent restaurants, and a relaxed pace.

**Typical rents**:
- 1K: 110,000-160,000 JPY/month
- 1LDK: 160,000-240,000 JPY/month
- 2LDK: 240,000-350,000 JPY/month

**Expat profile**: Professionals, couples, and single expats in their 30s-40s. Strong French and European presence, partly due to the proximity to the French cultural center (Institut Franco-Japonais) nearby.

## Daikanyama: The Boutique Village

Daikanyama is 10 minutes on foot from Ebisu and has a distinct character: it is quiet, curated, and architecturally interesting. The neighborhood is known for independent design shops, concept stores, the Hillside Terrace complex, and the iconic T-Site bookstore. It has no large-scale commercial development and deliberately limits chain retail.

**Atmosphere**: Residential village feel inside a major city. Streets are narrow and low-rise, with a high density of renovated buildings and well-maintained sidewalks. Very low noise level by Tokyo standards. Popular with creative professionals, architects, and art directors.

**Typical rents**:
- 1K: 105,000-155,000 JPY/month
- 1LDK: 155,000-230,000 JPY/month
- 2LDK: 230,000-340,000 JPY/month

**Transport**: Daikanyama station on the Tokyu Toyoko Line gives direct access to Shibuya (2 minutes) and Yokohama. For Roppongi and Ginza commuters, a short walk to Ebisu is more efficient.

**Expat profile**: Creative professionals, designers, writers, long-term Japan residents who value aesthetics and neighborhood character over transit efficiency.

## Nakameguro: The Most Dynamic of the Three

Nakameguro has undergone significant transformation over the past decade. The canal (Meguro River) lined with cherry trees has made it one of the most photographed urban spaces in Tokyo. The neighborhood attracts a younger demographic than Ebisu or Daikanyama, with a dense concentration of restaurants, bars, concept stores, and a strong creative economy.

**Atmosphere**: Energetic, trendy, and increasingly expensive. The canal area is crowded on weekends and during cherry blossom season (late March to early April). Away from the canal, the residential streets are quiet and residential.

**Typical rents**:
- 1K: 100,000-150,000 JPY/month
- 1LDK: 150,000-220,000 JPY/month
- 2LDK: 220,000-320,000 JPY/month

**Transport**: Nakameguro station on both the Tokyo Metro Hibiya Line and the Tokyu Toyoko Line gives direct access to Roppongi (10 minutes), Ginza (15 minutes), and Shibuya (4 minutes).

**Expat profile**: Younger expats, freelancers, remote workers, couples without children. Strong English-speaking community. Less diplomatic, more creative.

## How These Three Compare to Hiroo

| Factor | Ebisu/Daikanyama/Nakameguro | Hiroo/Minami-Azabu |
|---|---|---|
| Rent 1LDK | 150,000-240,000 | 200,000-300,000 |
| International schools nearby | Moderate | High |
| English-speaking services | Good | Excellent |
| Transport connectivity | Excellent | Good |
| Atmosphere | Urban village | Diplomatic residential |
| International supermarket | Limited | National Azabu |

For families with children in international schools, Hiroo and Minami-Azabu remain the reference. For professionals without children, the Ebisu-Daikanyama-Nakameguro corridor typically offers better value per yen.

See: [Hiroo and Minami-Azabu expat neighborhood guide](/blog/hiroo-minami-azabu-expat-neighborhood-guide) and [Tokyo rent by neighborhood 2026](/blog/tokyo-rent-by-neighborhood-2026)

## Finding an Apartment in This Corridor

Properties in this area are popular and move quickly. The best apartments in Nakameguro and Daikanyama in particular are often rented through networks and property managers before appearing on public portals.

[Contact us](/contact) for a brief focused on the Ebisu-Daikanyama-Nakameguro corridor.


To discover the best spots in this corridor before settling in, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) offers guided tours of Tokyo and food experiences in these neighbourhoods. *(affiliate link)*
---

*Read next: [Tokyo neighborhoods guide for expats](/blog/tokyo-neighbourhoods-expats-guide) and [Tokyo rent by neighborhood 2026](/blog/tokyo-rent-by-neighborhood-2026).*
    `.trim(),
  },
  {
    slug: 'ebisu-daikanyama-nakameguro-guide-expatries',
    locale: 'fr',
    title: 'Ebisu, Daikanyama et Nakameguro: guide pour expatriés',
    description: 'Ebisu, Daikanyama et Nakameguro offrent la vie expatriée à Tokyo sans les loyers de la zone diplomatique. Guide complet: loyers, ambiance, transports et vie quotidienne.',
    date: '2026-06-25',
    readingTime: '7 min',
    content: `
Ebisu, Daikanyama et Nakameguro forment l'un des clusters résidentiels les plus attractifs de Tokyo pour les expatriés qui veulent un environnement international, walkable et de qualité, sans payer les loyers de Hiroo ou de Roppongi. Ces trois quartiers partagent la même ligne Hibiya que Hiroo, sont reliés par la ligne Tokyu Toyoko, et ont une atmosphère distinctive: cafés indépendants, rues arborées, boutiques de créateurs, et une communauté internationale visible.

**Réponse rapide :** Ebisu, Daikanyama et Nakameguro comptent parmi les quartiers expatriés les plus prisés de Tokyo : piétons, élégants, internationaux, avec de bons cafés et un accès facile au centre. Les loyers sont élevés (un 1LDK va souvent de 200 000 à 300 000 JPY), mais un peu sous Hiroo et Minato. Ebisu convient aux familles et à la connectivité, Daikanyama aux profils créatifs, Nakameguro aux jeunes tendance.

Ce guide couvre les loyers, l'ambiance, les transports et la vie pratique dans les trois quartiers.


![Loyer mensuel médian d'un studio 1K près de 50 stations de Tokyo (2026)](/tokyo-rent-by-station.png "Où se situe cette station : loyer médian 1K sur 50 stations de Tokyo, sur 528 660 annonces réelles actives")
## Ebisu: le point d'entrée le mieux connecté

Ebisu est le quartier le plus connecté des trois. Il est desservi à la fois par la ligne JR Yamanote et la ligne Tokyo Metro Hibiya, avec accès direct à Shinjuku (8 minutes), Shibuya (3 minutes), Roppongi (5 minutes) et Ginza (15 minutes). Pour les professionnels qui ont des rendez-vous répartis sur plusieurs pôles d'affaires, Ebisu est souvent la base la plus efficace.

**Ambiance**: Résidentiel haut de gamme avec une composante commerciale animée. Yebisu Garden Place, l'ancien site de la brasserie Sapporo, occupe la partie est avec des restaurants, un musée, un cinéma et une place ouverte. La partie ouest est plus calme, avec des rues étroites, des restaurants indépendants et une atmosphère posée.

**Loyers types:**
- 1K: 110 000 à 160 000 JPY/mois
- 1LDK: 160 000 à 240 000 JPY/mois
- 2LDK: 240 000 à 350 000 JPY/mois

**Profil expatrié**: Professionnels, couples et célibataires expatriés entre 30 et 45 ans. Forte présence française et européenne, en partie liée à la proximité de l'Institut Franco-Japonais.

## Daikanyama: le village-boutique

Daikanyama est à 10 minutes à pied d'Ebisu et a un caractère bien distinct: calme, curated, et architecturalement intéressant. Le quartier est connu pour ses boutiques de design indépendantes, son complexe Hillside Terrace, et la T-Site, une librairie iconique. Il n'y a pas de grand développement commercial et les chaînes nationales y sont volontairement limitées.

**Ambiance**: Village résidentiel dans une grande ville. Les rues sont étroites et peu denses, avec de nombreux bâtiments rénovés et des trottoirs bien entretenus. Niveau de bruit très bas pour Tokyo. Apprécié des professionnels créatifs, architectes, et directeurs artistiques.

**Loyers types:**
- 1K: 105 000 à 155 000 JPY/mois
- 1LDK: 155 000 à 230 000 JPY/mois
- 2LDK: 230 000 à 340 000 JPY/mois

**Transports**: La station Daikanyama sur la ligne Tokyu Toyoko donne accès direct à Shibuya (2 minutes) et Yokohama. Pour les navetteurs vers Roppongi et Ginza, une courte marche jusqu'à Ebisu est plus efficace.

**Profil expatrié**: Professionnels créatifs, designers, écrivains, résidents long terme au Japon qui valorisent l'esthétique et le caractère du quartier.

## Nakameguro: le plus dynamique des trois

Nakameguro a connu une transformation significative depuis 10 ans. Le canal (rivière Meguro) bordé de cerisiers est devenu l'un des espaces urbains les plus photographiés de Tokyo. Le quartier attire une démographie plus jeune que Ebisu ou Daikanyama, avec une forte concentration de restaurants, bars, boutiques concept et une économie créative active.

**Ambiance**: Énergique, tendance et de plus en plus cher. La zone du canal est bondée les week-ends et pendant la saison des cerisiers (fin mars à début avril). Loin du canal, les rues résidentielles sont calmes et tranquilles.

**Loyers types:**
- 1K: 100 000 à 150 000 JPY/mois
- 1LDK: 150 000 à 220 000 JPY/mois
- 2LDK: 220 000 à 320 000 JPY/mois

**Transports**: La station Nakameguro sur les lignes Hibiya et Tokyu Toyoko donne accès direct à Roppongi (10 minutes), Ginza (15 minutes) et Shibuya (4 minutes).

**Profil expatrié**: Jeunes expatriés, freelances, télétravailleurs, couples sans enfants. Forte communauté anglophone. Moins diplomatique, plus créatif.

## Comparaison avec Hiroo

| Facteur | Ebisu/Daikanyama/Nakameguro | Hiroo/Minami-Azabu |
|---|---|---|
| Loyer 1LDK | 150 000 à 240 000 | 200 000 à 300 000 |
| Écoles internationales | Modéré | Élevé |
| Services anglophones | Bon | Excellent |
| Connectivité transports | Excellent | Bon |
| Ambiance | Village urbain | Diplomatique résidentiel |
| Supermarché international | Limité | National Azabu |

Pour les familles avec enfants dans des écoles internationales, Hiroo et Minami-Azabu restent la référence. Pour les professionnels sans enfants, le couloir Ebisu-Daikanyama-Nakameguro offre généralement un meilleur rapport qualité-prix.

Voir: [Hiroo et Minami-Azabu: guide des quartiers expats](/blog/hiroo-minami-azabu-guide-expatries-tokyo) et [loyers à Tokyo par quartier 2026](/blog/loyers-tokyo-par-quartier-2026)

## Trouver un appartement dans ce couloir

Les propriétés dans ce couloir sont recherchées et partent vite. Les meilleurs appartements à Nakameguro et Daikanyama en particulier sont souvent loués via des réseaux avant d'apparaitre sur les portails publics.

[Contactez-nous](/contact) pour un brief ciblé sur le couloir Ebisu-Daikanyama-Nakameguro.


Pour decouvrir les adresses de ce couloir avant votre installation, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) propose des visites guidees de Tokyo et des experiences gastronomiques dans ces quartiers. *(lien affilie)*
---

*À lire aussi: [guide des quartiers de Tokyo pour expatriés](/blog/quartiers-tokyo-expatries-guide) et [loyers à Tokyo par quartier 2026](/blog/loyers-tokyo-par-quartier-2026).*
    `.trim(),
  },
  {
    slug: 'dossier-location-refuse-tokyo-etranger',
    locale: 'fr',
    title: 'Dossier refusé à Tokyo: solutions concrètes pour les étrangers',
    description: 'Votre dossier de location a été refusé à Tokyo. Causes les plus courantes, solutions concrètes et comment relancer votre recherche rapidement en tant qu\'étranger.',
    date: '2026-06-25',
    readingTime: '7 min',
    content: `
Le refus de dossier est l'une des expériences les plus frustrantes du parcours locatif à Tokyo. Vous avez trouvé l'appartement idéal, constitué votre dossier avec soin, et vous recevez un simple "お断りします" sans la moindre explication. Ce n'est pas une anomalie: c'est le quotidien de milliers d'étrangers qui tentent de louer en dehors des circuits spécialisés.

**Réponse rapide :** Un dossier de location refusé à Tokyo tient rarement à vous personnellement : souvent au manque de garant, à des revenus jugés instables, à la barrière de langue ou à un propriétaire réticent aux étrangers. Les solutions : passer par une société de garantie, fournir des preuves de revenus solides, viser des biens foreigner-friendly, ou passer par un agent bilingue qui rassure le propriétaire.

Comprendre pourquoi votre dossier a été refusé, et surtout comment rebondir, peut changer radicalement la suite de votre recherche.

> **Vu du terrain.** Quand un dossier est refusé, ce n'est presque jamais le locataire, c'est un trou dans le dossier que la société de garantie n'a pas pu vérifier : justificatif de revenus, durée du visa, une adresse qui ne correspond pas. Corrigez le dossier, pas vous-même. Un dossier propre et complet évite la plupart des refus avant qu'ils arrivent.

![Taux d'acceptation des locataires étrangers par voie à Tokyo](/tokyo-approval-rate-fr.png "30-45% seul vs 90-98% via une share house ou un agent bilingue")
## Les vraies raisons d'un refus de dossier à Tokyo

Les refus viennent rarement d'une intention discriminatoire explicite. Ils reflètent une gestion du risque dans un marché locatif structurellement peu protecteur pour les propriétaires japonais.

**L'absence de garant japonais (hoshounin)** reste la première cause. La quasi-totalité des baux traditionnels exigent un citoyen japonais employé à temps plein, prêt à couvrir vos impayés éventuels. Pour un étranger sans famille ni réseau japonais solide, ce critère est impossible à remplir par les voies classiques.

**La durée du visa** pose un problème concret. Un visa expirant dans moins de 12 mois dissuade les propriétaires qui signent des baux de 2 ans. Ils ne veulent pas prendre le risque qu'un locataire doive quitter le Japon avant la fin du contrat.

**Le statut professionnel atypique** est un autre obstacle courant. Les freelances, entrepreneurs et télétravailleurs étrangers ne correspondent pas au profil attendu par la majorité des propriétaires: un salarié stable d'une grande entreprise japonaise, avec fiche de paie mensuelle régulière.

**La barrière de la langue** joue enfin un rôle indirect. Certaines agences refusent de traiter des dossiers d'étrangers non-japonophones, non par mauvaise volonté, mais parce qu'elles anticipent les difficultés de communication avec le propriétaire pendant toute la durée du bail.

**L'agence elle-même** peut être en cause. Toutes les agences immobilières japonaises n'ont pas constitué de réseau de propriétaires ouverts aux étrangers. Certaines transmettent votre dossier sans mentionner votre profil, ce qui aboutit à un refus du propriétaire que l'agence présente comme une décision "du marché".

## Les solutions concrètes après un refus

**Cibler le marché adapté aux expatriés**

Il existe un segment de marché parallèle au circuit traditionnel japonais: des gestionnaires de biens meublés, des property managers anglophones, des opérateurs spécialisés dans les profils étrangers. Sur ce segment, les critères sont différents et les délais plus courts.

Voir: [Appartements meublés à Tokyo sans garant](/blog/appartement-meuble-tokyo-sans-garant)

**Intégrer une société de garantie dans votre dossier**

La hoshougaisha (société de garantie) se substitue au garant humain contre une prime annuelle d'environ 0,5 à 1 mois de loyer. Si vous ciblez un bien sur le marché traditionnel, inclure spontanément une société de garantie dans votre dossier lève le principal obstacle du propriétaire.

Voir: [Garantie de loyer pour étrangers au Japon](/blog/garantie-loyer-etranger-japon)

**Renforcer votre dossier en japonais**

Un dossier traduit en japonais, avec lettre de motivation expliquant votre situation professionnelle et vos liens avec le Japon, change la perception du risque. Cela signale au propriétaire que vous prenez la démarche au sérieux et que vous vous adaptez à ses exigences.

**Changer d'agence**

Un refus avec une agence ne ferme pas le marché. Il indique souvent que cette agence n'est pas la bonne porte d'entrée pour votre profil. D'autres agences ont constitué des réseaux de propriétaires explicitement ouverts aux étrangers.

## Pourquoi l'intervention d'un chasseur change le résultat

Un chasseur immobilier spécialisé dans les profils étrangers opère différemment d'une agence classique. Il ne soumet pas votre dossier en aveugle: il l'envoie uniquement aux agences et propriétaires avec lesquels il travaille régulièrement, sur la base d'une relation de confiance préexistante.

Cette réputation se transfère à votre dossier. Vous n'êtes plus "un étranger inconnu": vous devenez le client d'un intermédiaire connu et respecté, ce qui change fondamentalement l'évaluation du risque perçu.

Le taux de refus après intervention d'un chasseur est structurellement plus bas, non parce que les règles changent, mais parce que le dossier arrive par un canal où le profil étranger est accepté en amont.

## Le coût réel d'un refus non géré

Chaque semaine perdue a un coût concret: nuits d'hôtel ou logement temporaire sur-tarifiés, stress de l'incertitude, retards dans votre installation professionnelle. Le processus locatif japonais prend entre 2 et 6 semaines dans des conditions normales. Un refus non géré peut allonger ce délai de 3 à 4 semaines supplémentaires.

Les [pièges classiques de la location à Tokyo pour étrangers](/blog/pieges-location-tokyo-etranger) incluent précisément cette erreur: sous-estimer le temps nécessaire et entamer les démarches sans stratégie adaptée à son profil.

Si votre dossier vient d'être refusé et que votre délai est serré, l'option la plus efficace est de confier la recherche à un intermédiaire qui connaît le marché de l'intérieur. [Contactez-nous](/contact) pour une première consultation en français ou en anglais.


Pour votre couverture sante pendant les demarches, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement. Pour ameliorer votre japonais et mieux communiquer avec les agences, [iTalki](https://www.italki.com/affshare?ref=af32660342) propose des cours avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*
---

*À lire aussi: [comment trouver un appartement à Tokyo en tant qu'étranger](/blog/trouver-appartement-tokyo-etranger) et [les pièges de la location à Tokyo](/blog/pieges-location-tokyo-etranger).*
    `.trim(),
  },
  {
    slug: 'rental-application-rejected-japan-foreigner',
    locale: 'en',
    title: 'Rental Application Rejected in Japan: What to Do Next',
    description: 'Your apartment application was rejected by a Japanese landlord. Here are the real reasons why and concrete steps to find housing fast as a foreigner in Tokyo.',
    date: '2026-06-25',
    readingTime: '7 min',
    content: `
Getting your rental application rejected in Japan is one of the most frustrating experiences in your Tokyo relocation. You found the right apartment, prepared your paperwork carefully, and then received a quiet decline with no explanation. This is not an exception: it is the standard experience for many foreigners attempting to rent through traditional Japanese channels.

**Quick answer:** A rejected rental application in Japan is rarely personal: it usually comes down to the lack of a guarantor, income seen as unstable, the language barrier, or a landlord wary of foreigners. Fixes: use a guarantor company, provide solid proof of income, target foreigner-friendly properties, or work through a bilingual agent who reassures the landlord.

Understanding why applications get rejected, and what to do next, can completely change the outcome of your search.

> **From the field.** When an application bounces, it is almost never the tenant, it is a gap in the file the guarantee company could not verify: income proof, visa length, a mismatched address. Fix the file, not yourself. A clean, complete application clears most rejections before they happen.
## Why Japanese Landlords Reject Foreign Applicants

Rejections are rarely the result of explicit discrimination. They reflect a risk management logic in a rental market that offers landlords very limited legal protection in case of disputes or non-payment.

**No Japanese guarantor (hoshounin)** is the most common reason. The vast majority of traditional rental contracts require a Japanese citizen employed full-time who agrees to cover your unpaid rent if you default. For a foreigner without Japanese family or a strong local network, this requirement is impossible to meet through standard channels.

**Visa duration** creates a concrete problem. A visa expiring within 12 months discourages landlords who sign 2-year leases. They do not want to risk a tenant leaving Japan before the contract ends.

**Non-standard employment** is another common barrier. Freelancers, entrepreneurs, and remote workers do not match the expected tenant profile: a stable employee at a large Japanese company with regular monthly pay slips. Without classic income documentation, your application is systematically deprioritized.

**Language barriers** play an indirect role. Some agencies simply refuse to handle applications from non-Japanese-speaking foreigners, not out of bad intention, but because they anticipate communication difficulties with the landlord throughout the tenancy.

**The agency itself** may be the issue. Not all Japanese real estate agencies have built networks of landlords open to foreigners. Some forward your application without flagging your profile, leading to a landlord rejection the agency presents as a market-wide decision.

## Concrete Steps After a Rejection

**Target the expat-friendly rental market**

There is a parallel market to the traditional Japanese circuit: furnished apartment operators, English-speaking property managers, and specialists focused on foreign profiles. On this segment, the criteria are different and the timelines are shorter.

See: [Furnished apartments in Tokyo with no guarantor](/blog/furnished-apartment-tokyo-no-guarantor)

**Add a guarantor company to your application**

A hoshougaisha (guarantor company) substitutes for a personal guarantor at a cost of roughly 0.5 to 1 month of rent per year. If you are targeting a property on the traditional market, proactively including a guarantor company in your application removes the main obstacle.

See: [Guarantor system in Japan for foreigners](/blog/guarantor-japan-rental-foreigner)

**Strengthen your application file**

A fully translated Japanese application, with a motivation letter explaining your professional situation and your ties to Japan, changes the perceived risk profile. It signals to the landlord that you have invested time in understanding the local process.

**Switch agencies**

One rejection does not close the market. It often means this specific agency was not the right entry point for your profile. Other agencies have built networks of landlords who have explicitly accepted foreign tenants.

## Why a Real Estate Hunter Changes the Outcome

A real estate hunter specializing in foreign profiles operates differently from a standard agency. They do not submit your application blindly: they send it only to agencies and landlords they work with regularly, based on an existing relationship of trust.

That reputation transfers directly to your application. You stop being an unknown foreign applicant and become the client of a known and trusted intermediary. This fundamentally shifts the perceived risk for the landlord.

The rejection rate after a real estate hunter's involvement is structurally lower, not because the rules change, but because the application arrives through a channel where foreign profiles are already pre-accepted.

## The Real Cost of an Unmanaged Rejection

Every week lost has a real cost: overpriced temporary accommodation, uncertainty and stress, delays in your professional setup. The Japanese rental process takes between 2 and 6 weeks under normal conditions. An unmanaged rejection can add 3 to 4 weeks on top.

The [common traps in Tokyo rentals for foreigners](/blog/tokyo-rental-traps-foreigners) include exactly this mistake: underestimating the timeline and starting the process without a strategy adapted to your profile.

If your application was just rejected and your timeline is tight, the most efficient option is to hand the search to someone who knows the market from the inside. [Contact us](/contact) for an initial consultation in English or French.


For health coverage while you continue your search, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment. To improve your Japanese and communicate better with agencies, [iTalki](https://www.italki.com/affshare?ref=af32660342) offers lessons with native teachers from $10/hour. *(affiliate links)*
---

*Read next: [How to find an apartment in Tokyo as a foreigner](/blog/find-apartment-tokyo-foreigner) and [common rental traps in Tokyo](/blog/tokyo-rental-traps-foreigners), [Furnished Apartment Tokyo: 5 Best Options for Expats in 2026](/blog/furnished-apartment-tokyo-top-5-expats).*
    `.trim(),
  },
  {
    slug: 'chasseur-immobilier-tokyo-tarifs-vaut-il-le-coup',
    locale: 'fr',
    title: 'Chasseur immobilier Tokyo: tarifs et retour sur investissement',
    description: 'Combien coûte un chasseur immobilier à Tokyo? Décryptage des tarifs, de ce qui est inclus dans la prestation et du retour sur investissement réel pour un expatrié.',
    date: '2026-06-25',
    readingTime: '7 min',
    content: `
Lorsqu'un expatrié envisage de faire appel à un chasseur immobilier à Tokyo, la première question est systématiquement la même: combien ça coûte? La seconde, tout aussi légitime: est-ce que ça vaut vraiment le coup par rapport à chercher seul?

**Réponse rapide :** Un chasseur immobilier à Tokyo coûte généralement un forfait fixe (à partir de ~250 EUR pour une share house, plus pour un appartement ou une maison). Ça vaut le coup si vous manquez de temps, ne parlez pas japonais, ou risquez des refus de dossier : il gère la recherche et les visites, vous connecte au bon partenaire licencié, vous accompagne jusqu'à la signature, et vous évite des erreurs coûteuses. Avec un budget serré et du temps, chercher seul reste possible.

Voici une réponse honnête, chiffrée, basée sur la réalité du marché locatif tokyoïte.

## Comment sont structurés les honoraires d'un chasseur immobilier à Tokyo

Les chasseurs immobiliers à Tokyo travaillent sur deux modèles principaux.

**Le forfait fixe** est le modèle le plus transparent. Un montant fixe, convenu en amont, couvre l'intégralité de la mission: brief initial, recherche, sélection, organisation des visites, coordination avec le partenaire licencié, préparation du dossier, accompagnement à la signature. Ce forfait se situe généralement entre 80 000 et 150 000 JPY selon la complexité du profil et la gamme de logement recherchée.

**Le pourcentage du loyer** est moins fréquent mais existe. Il représente généralement 1 mois de loyer, parfois 1,5 mois. Pour un appartement à 150 000 JPY/mois, cela représente 150 000 à 225 000 JPY.

Dans les deux cas, les honoraires du chasseur s'ajoutent aux frais d'agence japonais classiques (qui sont à la charge du chasseur dans certains cas, ou partagés).

## Ce qui est inclus dans la prestation

Comprendre ce qui est réellement inclus est plus important que le chiffre brut des honoraires.

Un chasseur immobilier couvrant l'intégralité de la mission gère:

**La définition du brief**: appel initial pour cerner votre budget réel, le quartier adapté à votre vie quotidienne, vos contraintes de déplacement professionnel, vos préférences sur la taille et le style du logement.

**La recherche active**: accès à des biens hors marché, en dehors des portails publics. Les bonnes propriétés à Tokyo se louent souvent avant d'apparaître sur les sites grand public.

**La présélection**: vous recevez 5 à 10 biens pertinents, pas une liste de 80 annonces à trier vous-même.

**L'organisation des visites**: coordonnées avec les agences japonaises, souvent en japonais, avec traduction et accompagnement en présentiel ou à distance.

**Le dossier**: constitution d'un dossier adapté au profil étranger, présenté de façon valorisante au bon partenaire licencié.

**L'accompagnement à la signature**: lecture du contrat en japonais, explication des clauses importantes, coordination du versement du dépôt.

## Le retour sur investissement réel

La question n'est pas "combien coûte le chasseur" mais "combien coûte une recherche mal menée".

Chercher seul à Tokyo, sans réseau local, sans japonais et sans connaissance des codes du marché revient en moyenne à:

- 3 à 8 semaines de recherche active
- 2 à 4 semaines de logement temporaire (hôtel ou serviced apartment): entre 80 000 et 200 000 JPY selon les nuits
- Un ou plusieurs refus de dossier, avec les démarches à recommencer
- Des erreurs de contrat coûteuses: clauses de résiliation pénalisantes, frais cachés non identifiés

Un chasseur efficace réduit ce processus à 7 à 14 jours. L'économie sur le logement temporaire seul couvre souvent l'intégralité des honoraires. Sans compter le temps personnel économisé, la réduction du stress, et les erreurs évitées.

## Quand le recours à un chasseur est particulièrement rentable

Le chasseur immobilier est particulièrement pertinent dans ces situations:

**Relocalisation depuis l'étranger**: vous n'êtes pas encore à Tokyo et devez trouver un logement avant votre arrivée. Faire des visites virtuelles, gérer les agences japonaises à distance, constituer un dossier sans être sur place: tout cela est structurellement difficile sans intermédiaire local.

**Profil atypique**: freelance, entrepreneur, travailleur indépendant, non-japonophone. Ces profils sont systématiquement déprioritisés sur le marché traditionnel. Un chasseur qui connaît les agences et propriétaires ouverts à ces profils multiplie vos chances d'aboutir.

**Délai serré**: une prise de poste dans 3 semaines ne laisse pas le temps de tâtonner. Confier la recherche à quelqu'un qui connaît le marché de l'intérieur, c'est se donner les meilleures chances de respecter la date cible.

**Budget moyen-supérieur**: au-dessus de 150 000 JPY/mois, les propriétés de qualité sont rarement visibles sur les portails grand public. Un chasseur avec un réseau d'agences et de propriétaires directs donne accès à une offre plus pertinente.

## Ce que le chasseur ne fait pas

Il est utile de savoir ce qui n'est pas inclus pour calibrer ses attentes.

Le chasseur n'est pas un agent d'assurance habitation, ni un service de déménagement, ni un interprète juridique pour les litiges après signature. Il gère la phase de recherche et d'installation, pas la relation locative quotidienne ensuite.

Pour tout ce qui concerne les [pièges de la location à Tokyo](/blog/pieges-location-tokyo-etranger) et les [clauses du contrat de bail](/blog/checklist-bail-tokyo), la lecture attentive des documents reste de votre responsabilité, même si le chasseur vous y accompagne.

## Comment choisir son chasseur immobilier à Tokyo

Posez trois questions avant de signer:

1. Quel est votre réseau d'agences et de propriétaires? (un chasseur sans réseau est une agence classique)
2. Quelle est votre expérience avec les profils étrangers non-japonophones?
3. Quelles sont les étapes exactes de votre process, de l'appel initial à la remise des clés?

Les réponses vagues ou évasives sont un signal. Un bon chasseur décrit son process avec précision parce qu'il l'a déjà fait des dizaines de fois.

[Contactez-nous](/contact) pour un premier échange et une estimation adaptée à votre situation.


Pour votre couverture sante pendant la recherche, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement. *(lien affilie)*
---

*À lire aussi: [comment trouver un appartement à Tokyo en tant qu'étranger](/blog/trouver-appartement-tokyo-etranger) et [négocier son loyer à Tokyo](/blog/negocier-loyer-tokyo-conseils), [Chasseur immobilier ou agence à Tokyo : comparatif complet](/blog/chasseur-immobilier-vs-agence-tokyo-comparatif), [Comment fonctionne un chasseur immobilier à Tokyo](/blog/service-chasseur-immobilier-tokyo-comment-ca-marche).*
    `.trim(),
  },
  {
    slug: 'real-estate-hunter-tokyo-cost-worth-it',
    locale: 'en',
    title: 'Real Estate Hunter Tokyo: Cost and Is It Worth It',
    description: 'How much does a real estate hunter cost in Tokyo? Full breakdown of fees, what is included in the service and honest return on investment analysis for expats.',
    date: '2026-06-25',
    readingTime: '7 min',
    content: `
When considering hiring a real estate hunter in Tokyo, most expats ask two questions immediately: how much does it cost, and is it actually worth it compared to searching alone? Here is an honest, numbers-based answer grounded in how the Tokyo rental market actually works.

**Quick answer:** A Tokyo property hunter typically charges a flat fee (from ~250 EUR for a share house, more for an apartment or house). It is worth it if you are short on time, do not speak Japanese, or risk application rejections: the hunter handles the search and viewings, connects you to the right licensed partner, supports you through to signing, and prevents costly mistakes. On a tight budget with time to spare, searching alone is still possible.

## How Real Estate Hunter Fees Are Structured in Tokyo

Real estate hunters in Tokyo work under two main pricing models.

**Fixed fee** is the most transparent model. A fixed amount agreed upfront covers the entire mission: initial brief, search, selection, visit coordination, coordination with the licensed agency, application preparation, and signature support. This typically ranges from 80,000 to 150,000 JPY depending on the complexity of the profile and the target property range.

**Percentage of rent** is less common but exists. It usually represents 1 to 1.5 months of rent. For an apartment at 150,000 JPY per month, this means 150,000 to 225,000 JPY.

In both cases, the hunter's fees are in addition to standard Japanese agency fees, though some hunters absorb part of these fees or negotiate them into the package.

## What Is Actually Included in the Service

Understanding what is genuinely included matters more than the headline fee number.

A full-service real estate hunter covers:

**Initial brief**: a call to define your real budget, the right neighborhood for your daily life, commute constraints, and property preferences. This step alone prevents weeks of searching in the wrong direction.

**Active search**: access to off-market properties not visible on public portals. The best properties in Tokyo frequently rent before they appear on major listing sites.

**Pre-selection**: you receive 5 to 10 relevant properties, not a list of 80 listings to sort through yourself.

**Visit coordination**: managed with Japanese agencies, often in Japanese, with translation and on-site or remote accompaniment.

**Negotiation and application**: application built for a foreign profile, presented favorably to the landlord, with negotiation of terms where possible.

**Signature support**: lease read in Japanese, explanation of key clauses, coordination of deposit payment.

## The Real Return on Investment

The right question is not how much the hunter costs but how much a poorly managed search costs.

Searching alone in Tokyo, without a local network, without Japanese, and without knowledge of market codes typically means:

- 3 to 8 weeks of active searching
- 2 to 4 weeks of temporary accommodation (hotel or serviced apartment): between 80,000 and 200,000 JPY depending on your setup
- One or more application rejections, requiring the process to restart
- Costly contract errors: penalizing termination clauses, hidden fees not caught before signing

An efficient hunter reduces this process to 7 to 14 days from brief to keys. The savings on temporary accommodation alone often cover the entire fee. That calculation does not include the personal time saved, the stress avoided, and the contract mistakes prevented.

## When a Real Estate Hunter Is Particularly Worth It

The value is clearest in these situations:

**Relocating from abroad**: you are not yet in Tokyo and need housing before arrival. Managing virtual visits, coordinating with Japanese agencies remotely, and building an application file without being on the ground is structurally difficult without a local intermediary.

**Non-standard profile**: freelancer, entrepreneur, remote worker, non-Japanese speaker. These profiles are systematically deprioritized on the traditional market. A hunter who knows which agencies and landlords are open to these profiles dramatically increases your success rate.

**Tight timeline**: a job start in 3 weeks leaves no room for trial and error. Delegating the search to someone with inside knowledge of the market is the most reliable way to meet a fixed arrival date.

**Mid to upper budget**: above 150,000 JPY per month, quality properties are rarely visible on public portals. A hunter with agency and direct landlord networks gives access to a more relevant supply.

## What a Real Estate Hunter Does Not Cover

Setting realistic expectations is important. A hunter manages the search and installation phase: they are not a moving company, a renters insurance broker, or a legal interpreter for disputes after signing.

For everything related to [rental traps in Tokyo for foreigners](/blog/tokyo-rental-traps-foreigners) and [lease contract red flags](/blog/tokyo-rental-contract-checklist), careful reading of documents remains your responsibility, even with the hunter's guidance.

## How to Choose the Right Real Estate Hunter in Tokyo

Ask three questions before committing:

1. What is your network of agencies and landlords? (a hunter without a real network is just another agency)
2. What is your specific experience with foreign, non-Japanese-speaking profiles?
3. What are the exact steps of your process from initial call to key handover?

Vague or evasive answers are a signal. A good hunter describes the process precisely because they have done it dozens of times.

[Contact us](/contact) for an initial call and a fee estimate tailored to your situation.


For health coverage during your property search, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment. *(affiliate link)*
---

*Read next: [how to find an apartment in Tokyo as a foreigner](/blog/find-apartment-tokyo-foreigner) and [negotiating rent in Tokyo](/blog/negotiating-rent-tokyo-tips), [Real Estate Hunter vs Agency in Tokyo: Which Is Faster](/blog/real-estate-hunter-vs-agency-tokyo), [How a Real Estate Hunter Works in Tokyo: Step by Step](/blog/how-real-estate-hunter-works-tokyo).*
    `.trim(),
  },
  {
    slug: 'chasseur-immobilier-vs-agence-tokyo-comparatif',
    locale: 'fr',
    title: 'Chasseur immobilier ou agence à Tokyo: comparatif complet',
    description: 'Chasseur immobilier ou agence immobilière pour trouver un appartement à Tokyo? Comparatif des délais, coûts, taux de succès et différences clés pour les expatriés.',
    date: '2026-06-25',
    readingTime: '8 min',
    content: `
Quand un expatrié commence sa recherche de logement à Tokyo, il fait face à deux options principales: passer par une agence immobilière classique ou faire appel à un chasseur immobilier. Les deux approches donnent des résultats radicalement différents pour les profils étrangers. Voici un comparatif honnête, structuré autour des critères qui comptent vraiment.

**Réponse rapide :** Une agence immobilière classique travaille pour le propriétaire, en japonais, et vous montre surtout ses propres biens. Un chasseur immobilier travaille pour vous, côté locataire : il cherche sur tout le marché, en français et anglais, gère les visites, vous connecte au bon partenaire licencié et vous accompagne jusqu'à la signature, contre un forfait. Pour un étranger, le chasseur réduit le risque de refus et la barrière de langue.

## Comment fonctionne une agence immobilière classique à Tokyo

Une agence immobilière japonaise (fudousan) est un intermédiaire entre propriétaires et locataires. Son rôle est de présenter les biens disponibles dans son portefeuille à des candidats qui viennent la consulter.

Ce modèle présente plusieurs limites pour les étrangers:

**L'agence travaille pour le propriétaire.** Sa priorité est de louer les biens de son portefeuille. Si votre profil présente un risque perçu, elle présentera d'abord les candidats plus "standards" aux propriétaires. Votre dossier peut rester en attente sans jamais être activement défendu.

**Le portefeuille de l'agence est limité.** Chaque agence n'a accès qu'aux biens dont elle est mandatée. Pour voir une sélection large et pertinente, il faut contacter de nombreuses agences, en japonais, en comprenant les codes locaux.

**La barrière de la langue est réelle.** La plupart des agences japonaises fonctionnent exclusivement en japonais. Certaines ont des équipes anglophones mais leur portefeuille est souvent réduit aux biens explicitement étiquetés "gaijin-friendly".

**Les honoraires sont standardisés.** L'agence facture généralement 1 mois de loyer en frais d'agence (shoukoukin), que la location aboutisse en 1 semaine ou 6 mois. Ce montant n'est pas remboursable.

## Comment fonctionne un chasseur immobilier à Tokyo

Un chasseur immobilier travaille à l'inverse: il est mandaté par le locataire, pas par le propriétaire. Sa mission est de trouver le meilleur logement pour son client, en accédant au maximum de l'offre disponible.

**Il travaille avec de multiples agences.** Un chasseur avec un réseau solide contacte 10 à 20 agences pour un même mandat, accède à des biens hors marché, et présente votre dossier là où il a le plus de chances d'aboutir.

**Il défend activement votre dossier.** Là où l'agence se contente de transmettre, le chasseur argumente. Il connaît les objections classiques des propriétaires japonais face aux profils étrangers et prépare les réponses en amont.

**Il gère la barrière de la langue.** Toutes les communications avec les agences japonaises et la lecture du contrat se font avec vous, en japonais, traduction incluse.

**Il est rémunéré sur résultat.** Un bon chasseur ne vous fait payer ses honoraires que si vous signez un bail. S'il ne trouve pas, il ne facture pas.

## Comparaison par critères clés

**Délai moyen jusqu'à la signature du bail**

Agence classique pour un profil étranger: 4 à 10 semaines. Ce délai inclut les refus successifs, le temps de changer d'agence, les démarches à recommencer.

Chasseur immobilier: 7 à 21 jours. La recherche est parallélisée depuis le premier jour, le dossier est présenté uniquement là où il a une chance d'aboutir.

**Taux de refus**

Agence classique: élevé pour les profils atypiques. Le dossier est présenté sans contexte au propriétaire, qui décide sur la base de critères formels stricts.

Chasseur: structurellement plus bas. Le dossier est présenté par un intermédiaire connu du propriétaire, ce qui transfère une partie de la confiance.

**Accès à l'offre**

Agence classique: limité au portefeuille de l'agence.

Chasseur: multi-agences, y compris biens hors marché et propriétaires directs.

**Accompagnement linguistique**

Agence classique: variable selon l'agence. Souvent insuffisant pour des expatriés non-japonophones.

Chasseur: intégral. C'est une composante centrale du service, pas un bonus.

**Coût total**

Agence classique: 1 mois de loyer en frais d'agence (shoukoukin), dans tous les cas, qu'il y ait résultat ou non.

Chasseur: forfait fixe ou équivalent de 1 mois de loyer, mais sur résultat uniquement, et avec une valeur ajoutée mesurable sur le délai et l'accès à l'offre.

## Quand l'agence classique peut suffire

L'agence classique fonctionne bien dans des situations précises: vous parlez japonais, vous avez un garant japonais disponible, votre statut professionnel est standard (salarié d'une entreprise japonaise), et vous avez 6 à 8 semaines devant vous pour chercher sans contrainte de date.

Si ces conditions ne sont pas réunies, les [pièges de la location à Tokyo pour étrangers](/blog/pieges-location-tokyo-etranger) se multiplient rapidement.

## Notre position dans ce comparatif

Nous intervenons exclusivement comme chasseur: mandat locataire, multi-agences, résultat garanti ou pas de facturation. Notre réseau est constitué spécifiquement pour les profils étrangers, francophones et anglophones, avec ou sans japonais.

Pour comprendre les étapes exactes de notre process, consultez le guide [comment fonctionne un chasseur immobilier à Tokyo](/blog/service-chasseur-immobilier-tokyo-comment-ca-marche).

[Contactez-nous](/contact) pour un premier échange sans engagement.


Pour votre couverture sante pendant la recherche de logement, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement. *(lien affilie)*
---

*À lire aussi: [dossier refusé à Tokyo: que faire](/blog/dossier-location-refuse-tokyo-etranger) et [comment trouver un appartement à Tokyo en tant qu'étranger](/blog/trouver-appartement-tokyo-etranger), [Chasseur immobilier Tokyo : tarifs et retour sur investissement](/blog/chasseur-immobilier-tokyo-tarifs-vaut-il-le-coup).*
    `.trim(),
  },
  {
    slug: 'real-estate-hunter-vs-agency-tokyo',
    locale: 'en',
    title: 'Real Estate Hunter vs Agency in Tokyo: Which Is Faster',
    description: 'Real estate hunter or traditional agency to find an apartment in Tokyo? Full comparison of timelines, costs, rejection rates and key differences for expats.',
    date: '2026-06-25',
    readingTime: '8 min',
    content: `
When starting an apartment search in Tokyo, most expats face the same choice: work with a traditional Japanese real estate agency, or hire a real estate hunter. These two approaches produce radically different results for foreign profiles. Here is an honest comparison built around the criteria that actually matter.

**Quick answer:** A traditional Japanese agency works for the landlord, in Japanese, and mostly shows its own listings. A property hunter works for you, on the tenant side: searching the whole market, in English and French, handling viewings, connecting you to the right licensed partner and supporting you through to signing, for a flat fee. For a foreigner, a hunter cuts the risk of rejection and the language barrier.

## How a Traditional Real Estate Agency Works in Tokyo

A Japanese real estate agency (fudousan) acts as an intermediary between landlords and tenants. Its role is to present available properties from its portfolio to candidates who come in to consult.

This model has several structural limitations for foreign applicants:

**The agency works for the landlord.** Its priority is to lease the properties in its portfolio. If your profile carries a perceived risk, it will present standard candidates to landlords first. Your application may sit without ever being actively advocated for.

**The portfolio is limited.** Each agency only has access to properties it is mandated for. Seeing a broad and relevant selection requires contacting multiple agencies, in Japanese, with an understanding of local conventions.

**The language barrier is real.** Most Japanese agencies operate exclusively in Japanese. Some have English-speaking teams, but their portfolios are often limited to properties explicitly labeled foreigner-friendly.

**Fees are standardized regardless of outcome.** Agencies typically charge 1 month of rent as an agency fee (shoukoukin), whether the process takes one week or three months. This fee is non-refundable.

## How a Real Estate Hunter Works in Tokyo

A real estate hunter operates in reverse: they are mandated by the tenant, not the landlord. Their mission is to find the best housing for their client by accessing as much of the available supply as possible.

**They work across multiple agencies.** A hunter with a solid network contacts 10 to 20 agencies for a single mandate, accesses off-market properties, and submits your application where it has the best chance of succeeding.

**They actively advocate for your application.** Where an agency simply forwards a file, a hunter argues for it. They know the standard objections Japanese landlords have about foreign profiles and prepare responses in advance.

**They handle the language barrier.** All communication with Japanese agencies, negotiation of terms, reading of the lease: everything is managed in your name, in Japanese, with simultaneous translation for you.

**They are paid on results.** A good hunter charges their fee only when you sign a lease. If they do not find a suitable property, they do not charge.

## Side-by-Side Comparison

**Average time to lease signing**

Traditional agency for a foreign profile: 4 to 10 weeks. This timeline includes successive rejections, time to switch agencies, and restarting the process from scratch.

Real estate hunter: 7 to 21 days. The search is parallelized from day one, and the application is submitted only where it has a realistic chance of acceptance.

**Rejection rate**

Traditional agency: high for atypical profiles. The application is presented without context to the landlord, who decides based on strict formal criteria.

Hunter: structurally lower. The application is presented by an intermediary the landlord already trusts, which transfers part of that trust to the client.

**Access to supply**

Traditional agency: limited to the agency portfolio.

Hunter: multi-agency access, including off-market properties and direct landlords.

**Language support**

Traditional agency: variable. Often insufficient for non-Japanese-speaking expats.

Hunter: comprehensive. Language management is a core component of the service, not an add-on.

**Total cost**

Traditional agency: 1 month of rent as agency fee, regardless of how long the process takes.

Hunter: fixed fee or equivalent of 1 month of rent, on results only, with measurable added value in timeline and supply access.

## When a Traditional Agency Can Work

A traditional agency is effective in specific circumstances: you speak Japanese, you have a Japanese guarantor available, your employment is standard (full-time employee at a Japanese company), and you have 6 to 8 weeks to search without a fixed arrival deadline.

If these conditions are not met, the [common rental traps in Tokyo for foreigners](/blog/tokyo-rental-traps-foreigners) compound quickly.

## Where We Stand in This Comparison

We operate exclusively as a real estate hunter: tenant mandate, multi-agency approach, no fee if we do not deliver. Our network is built specifically for foreign profiles, English and French speakers, with or without Japanese.

For a full walkthrough of our process, see [how a real estate hunter works in Tokyo](/blog/how-real-estate-hunter-works-tokyo).

[Contact us](/contact) for an initial conversation with no commitment.


For health coverage during your housing search, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment. *(affiliate link)*
---

*Read next: [rental application rejected in Japan: what to do](/blog/rental-application-rejected-japan-foreigner) and [how to find an apartment in Tokyo as a foreigner](/blog/find-apartment-tokyo-foreigner), [Real Estate Hunter Tokyo: Cost and Is It Worth It](/blog/real-estate-hunter-tokyo-cost-worth-it).*
    `.trim(),
  },
  {
    slug: 'service-chasseur-immobilier-tokyo-comment-ca-marche',
    locale: 'fr',
    title: 'Comment fonctionne un chasseur immobilier à Tokyo',
    description: 'Le chasseur immobilier à Tokyo gère votre recherche d\'appartement de A à Z. Découvrez exactement comment se déroule le processus, de l\'appel initial à la remise des clés.',
    date: '2026-06-25',
    readingTime: '6 min',
    content: `
Faire appel à un chasseur immobilier à Tokyo, c'est confier l'intégralité de votre recherche de logement à un professionnel qui connaît le marché de l'intérieur. Mais concrètement, comment se déroule le processus? Qui fait quoi, à quel moment, et combien de temps cela prend-il?

**Réponse rapide :** Un chasseur immobilier à Tokyo suit un processus clair : consultation pour cerner vos besoins, sélection de biens sur tout le marché, organisation des visites (en personne ou visio), mise en relation avec le partenaire licencié, puis préparation du dossier et accompagnement à la signature, traduction incluse. Vous déléguez toute la recherche à un spécialiste bilingue, contre un forfait fixe.

Voici le déroulement exact d'une mission de chasse immobilière à Tokyo.

## Étape 1: l'appel de brief (30 minutes)

Tout commence par un appel initial, en français ou en anglais, sans engagement. Son objectif est de comprendre précisément votre situation et vos besoins.

Les questions posées lors de ce brief vont au-delà de la surface: quel est votre budget réel (incluant les charges et non pas seulement le loyer affiché)? Quelle est votre date d'emménagement cible? Avez-vous des contraintes de déplacement professionnel? Vivez-vous seul, en couple, avec des enfants? Avez-vous des préférences fortes sur le style du logement?

Ce brief permet aussi d'évaluer votre dossier: statut professionnel, durée du visa, présence ou non d'un garant. Ces éléments déterminent quels propriétaires et quelles agences seront approchés en priorité.

## Étape 2: la recherche active (48 à 72 heures)

Une fois le brief réalisé et le mandat signé, la recherche commence immédiatement.

Contrairement à une agence classique qui présente uniquement son portefeuille propre, un chasseur contacte simultanément 10 à 20 agences japonaises, en japonais, avec votre profil et vos critères. Il accède également à des biens hors marché: propriétaires directs, gestionnaires de biens qui ne publient pas leurs disponibilités sur les portails grand public.

Cette phase de recherche parallèle est ce qui différencie structurellement le chasseur de l'agence. Vous bénéficiez de l'intégralité de l'offre pertinente, pas d'un sous-ensemble limité.

## Étape 3: la sélection (présentation sous 72 heures)

Vous recevez une sélection de 5 à 10 biens, présentés avec les informations qui comptent: photos, plan, loyer total (charges incluses), distance aux transports, commentaires sur le propriétaire et l'agence, points d'attention spécifiques.

Cette présélection vous évite de passer des heures à trier des annonces inadaptées. Chaque bien proposé a été vérifié: disponible à la date cible, compatible avec votre profil, dans votre budget réel.

Vous choisissez les biens qui vous intéressent pour les visites. Vous avez aussi la possibilité d'en éliminer certains ou d'en demander d'autres sur des critères spécifiques.

## Étape 4: les visites

Les visites sont organisées en présentiel ou en virtuel selon votre situation. Si vous êtes encore à l'étranger, une visite virtuelle avec retransmission en direct est possible pour la plupart des biens.

Le chasseur vous accompagne à chaque visite: il pose les questions importantes en japonais, vérifie les points que vous n'auriez pas pensé à vérifier (état des équipements, règlement de copropriété, règles sur les animaux ou les colocataires), et note les informations pertinentes pour la suite.

Voir aussi: [checklist du contrat de bail à Tokyo](/blog/checklist-bail-tokyo) pour les points à vérifier avant de vous engager.

## Étape 5: la négociation et la constitution du dossier

Une fois que vous avez identifié le bien souhaité, le chasseur prend en charge la négociation et la constitution du dossier.

La négociation peut porter sur le montant du loyer, les conditions de l'entrée (réduction ou suppression du reikin, clé de courtoisie non remboursable), la durée du bail, ou des aménagements spécifiques. Certains propriétaires sont ouverts à la négociation, d'autres non: le chasseur connaît les marges de manoeuvre habituelles.

La constitution du dossier pour un profil étranger demande un soin particulier. Documents traduits, lettre de motivation adaptée, société de garantie arrangée si nécessaire: tout est préparé pour maximiser les chances d'acceptation.

## Étape 6: la signature et la remise des clés

La signature du bail en japonais est un moment délicat pour les non-japonophones. Le chasseur vous accompagne ou coordonne la traduction des clauses essentielles: conditions de résiliation, règles sur les rénovations, obligations de remise en état à la sortie.

La remise des clés intervient généralement 1 à 2 semaines après la validation du dossier par le propriétaire. Le délai total, de l'appel de brief à la remise des clés, est généralement de 7 à 21 jours.

Pour comparer cette approche avec le recours à une agence classique, voir: [chasseur immobilier ou agence à Tokyo: comparatif](/blog/chasseur-immobilier-vs-agence-tokyo-comparatif).

## Ce que vous n'avez pas à faire

Récapitulatif de ce que le chasseur prend en charge à votre place:

- Contacter les agences japonaises (en japonais)
- Trier les annonces et vérifier les disponibilités
- Organiser et accompagner les visites
- Négocier les conditions du bail
- Constituer et présenter le dossier locatif
- Lire et expliquer le contrat en japonais
- Coordonner le versement du dépôt et des frais d'entrée

Vous intervenez aux moments de décision: choix des biens à visiter, sélection du bien final, validation du dossier et signature.

[Contactez-nous](/contact) pour démarrer avec un appel de brief sans engagement.


Pour votre couverture sante pendant les demarches d'installation, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance mensuelle sans engagement. *(lien affilie)*
---

*À lire aussi: [chasseur immobilier ou agence à Tokyo: comparatif](/blog/chasseur-immobilier-vs-agence-tokyo-comparatif) et [comment trouver un appartement à Tokyo en tant qu'étranger](/blog/trouver-appartement-tokyo-etranger), [Chasseur immobilier Tokyo : tarifs et retour sur investissement](/blog/chasseur-immobilier-tokyo-tarifs-vaut-il-le-coup).*
    `.trim(),
  },
  {
    slug: 'how-real-estate-hunter-works-tokyo',
    locale: 'en',
    title: 'How a Real Estate Hunter Works in Tokyo: Step by Step',
    description: 'A real estate hunter in Tokyo handles your apartment search from brief to keys. Full walkthrough of the process, timeline and what you need to do at each stage.',
    date: '2026-06-25',
    readingTime: '6 min',
    content: `
Hiring a real estate hunter in Tokyo means delegating your entire apartment search to a professional who knows the market from the inside. But what exactly happens during the process? Who does what, at what point, and how long does it take?

**Quick answer:** A Tokyo property hunter follows a clear process: a consultation to define your needs, a shortlist from across the whole market, organised viewings (in person or by video), rent and terms negotiation, then application and signing, translation included. You delegate the entire search to a bilingual specialist for a flat fee.

Here is the exact walkthrough of a real estate hunting mission in Tokyo.

## Step 1: The Initial Brief Call (30 minutes)

Everything starts with an initial call in English or French, with no commitment required. Its purpose is to understand your situation and needs precisely.

The questions go beyond the surface: what is your real budget, including service charges and not just the listed rent? What is your target move-in date? Do you have commute constraints? Are you moving alone, as a couple, or with children? Do you have strong preferences about the style or layout of the apartment?

This brief also assesses your application profile: employment status, visa duration, guarantor availability. These elements determine which landlords and agencies will be approached first on your behalf.

## Step 2: Active Search (48 to 72 Hours)

Once the brief is complete and the mandate is signed, the search starts immediately.

Unlike a standard agency that only presents its own portfolio, a hunter contacts 10 to 20 Japanese agencies simultaneously, in Japanese, with your profile and criteria. They also access off-market properties: direct landlords, property managers who do not publish their availability on public portals.

This parallel search phase is what structurally separates a hunter from an agency. You get access to the full relevant supply, not a limited subset of one agency portfolio.

## Step 3: Pre-Selection (Delivered Within 72 Hours)

You receive a selection of 5 to 10 properties, presented with the information that matters: photos, floor plan, total rent including charges, distance to transport, notes on the landlord and agency, and specific points of attention.

This pre-selection saves you hours of sorting through irrelevant listings. Every property presented has been verified: available on your target date, compatible with your profile, within your actual budget.

You select the properties you want to visit. You can also remove some or request alternatives based on specific preferences.

## Step 4: Property Visits

Visits are organized in person or virtually depending on your location. If you are still abroad, a live remote visit with real-time walkthrough is possible for most properties.

The hunter accompanies you at each visit: they ask the important questions in Japanese, verify points you might not think to check (appliance condition, building rules, pet or subletting policies), and note relevant information for the next stage.

See also: [Tokyo rental contract checklist](/blog/tokyo-rental-contract-checklist) for the points to verify before committing.

## Step 5: Negotiation and Application

Once you have identified the property you want, the hunter manages negotiation and application preparation.

Negotiation can cover the rent amount, entry terms (reduction or removal of the reikin key money), lease duration, or specific arrangements. Some landlords are open to negotiation, others are not: the hunter knows the usual margins.

Building the application for a foreign profile requires specific care. Translated documents, tailored motivation letter, guarantor company arranged if needed: everything is prepared to maximize acceptance.

## Step 6: Lease Signing and Key Handover

Signing a Japanese lease is a delicate moment for non-Japanese speakers. The hunter accompanies you or coordinates the translation of key clauses: termination conditions, renovation rules, restoration obligations on exit.

Key handover typically occurs 1 to 2 weeks after the landlord validates the application. The total timeline, from brief call to key handover, is generally 7 to 21 days.

To compare this approach with using a traditional agency, see: [real estate hunter vs agency in Tokyo](/blog/real-estate-hunter-vs-agency-tokyo).

## What You Do Not Have to Handle

Summary of what the hunter manages on your behalf:

- Contacting Japanese agencies (in Japanese)
- Sorting listings and verifying availability
- Organizing and attending visits
- Negotiating lease terms
- Building and presenting the rental application
- Reading and explaining the lease in Japanese
- Coordinating deposit and entry fee payments

You participate at decision points: choosing which properties to visit, selecting the final property, validating the application, and signing.

[Contact us](/contact) to start with an initial brief call at no commitment.


For health coverage during your relocation process, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly insurance with no commitment. *(affiliate link)*
---

*Read next: [real estate hunter vs agency in Tokyo](/blog/real-estate-hunter-vs-agency-tokyo) and [how to find an apartment in Tokyo as a foreigner](/blog/find-apartment-tokyo-foreigner), [Real Estate Hunter Tokyo: Cost and Is It Worth It](/blog/real-estate-hunter-tokyo-cost-worth-it).*
    `.trim(),
  },
  {
    slug: 'hiroo-minami-azabu-guide-expatries-tokyo',
    locale: 'fr',
    title: 'Hiroo et Minami-Azabu: guide des quartiers expats à Tokyo',
    description: 'Hiroo et Minami-Azabu concentrent la plus forte densité d\'expatriés de Tokyo. Guide complet: loyers, ambiance, transports, écoles internationales et vie quotidienne.',
    date: '2026-06-25',
    readingTime: '7 min',
    content: `
Hiroo et Minami-Azabu forment le coeur historique de la communauté expatriée de Tokyo. Ambassades, écoles internationales, supermarchés anglophones, restaurants occidentaux: tout ce qui facilite la vie d'un étranger est concentré dans ce rayon de 2 kilomètres au sud de Roppongi.

**Réponse rapide :** Hiroo et Minami-Azabu forment le coeur historique de la communauté expatriée de Tokyo : ambassades, écoles internationales, supermarchés anglophones et restaurants occidentaux. C'est le quartier le plus haut de gamme (un 1LDK va souvent de 200 000 à 300 000 JPY et plus), idéal pour les familles et cadres qui veulent une infrastructure internationale complète.

Ce guide vous donne une vision complète et honnête de ces deux quartiers: ce qui en fait une valeur sûre, ce que l'on ne vous dit pas toujours, et ce à quoi s'attendre en termes de loyers et de disponibilité.


![Loyer médian d'un studio 1K par arrondissement de Tokyo, en carte (2026)](/tokyo-rent-map.png "Où se situe ce quartier : loyer médian 1K dans les 23 arrondissements, sur 528 660 annonces réelles actives")
## Hiroo: le quartier expatrié par excellence

Hiroo est probablement le quartier le plus international de Tokyo. On y trouve une densité d'ambassades étrangères (Danemark, Nouvelle-Zélande, Italie, entre autres), plusieurs grandes résidences diplomatiques, et une offre commerciale clairement orientée vers les résidents étrangers.

**Ce qui rend Hiroo attractif pour les expatriés**

Le National Azabu Supermarket, situé en face de la station Hiroo, est le repère de tous les étrangers: produits importés, épicerie européenne, rayon fromages, vins et produits frais. Le marché de la Niche de Tokyo (Tokyo French Market) s'y tient régulièrement.

Les rues autour de Hiroo sont calmes, arborées et sécurisées. Le quartier a une ambiance résidentielle rare pour Tokyo: peu de pachinko, peu d'enseignes criardes, peu de commerces de transit. On y croise beaucoup de joggers, de poussettes et de familles d'expatriés le week-end.

**Transports depuis Hiroo**

La station Hiroo est sur la ligne Hibiya, directe vers Roppongi, Ginza et Tsukiji. Comptez 10 minutes pour Roppongi, 15 pour Ginza, 20 pour Shinjuku avec une correspondance.

**Loyers à Hiroo**

Hiroo est l'un des quartiers les plus chers de Tokyo pour les étrangers. Un appartement 1LDK (chambre séparée + salon) se loue entre 180 000 et 280 000 JPY par mois selon la taille, l'étage et l'état. Un 2LDK familial dépasse souvent 300 000 JPY.

Les biens de qualité partent vite et sont souvent loués avant d'apparaître sur les portails grand public.

## Minami-Azabu: le Hiroo résidentiel version premium

Minami-Azabu est adjacent à Hiroo, situé entre Azabu-Juban et Hiroo. C'est l'un des quartiers les plus chers de tout Tokyo, avec des propriétés haut de gamme, des résidences sécurisées et une présence diplomatique encore plus forte.

**Ce qui caractérise Minami-Azabu**

C'est dans ce quartier que se trouve l'ambassade de France et plusieurs résidences diplomatiques européennes. La communauté francophone de Tokyo est particulièrement bien représentée dans ce secteur.

Les rues sont tranquilles, peu passantes, avec de grands arbres et des propriétés souvent disposant d'un garage. L'environnement est nettement plus résidentiel que central.

**Transports depuis Minami-Azabu**

Minami-Azabu ne dispose pas de station de métro propre. On accède au réseau depuis Hiroo (ligne Hibiya) ou Azabu-Juban (ligne Namboku et Oedo), à 10 à 15 minutes à pied. Pour les familles avec voiture de fonction, cela ne pose pas de problème. Pour les navetteurs quotidiens en transports en commun, c'est un point à évaluer soigneusement.

**Loyers à Minami-Azabu**

Minami-Azabu est encore plus cher que Hiroo. Un 2LDK se loue couramment entre 300 000 et 450 000 JPY par mois. Les grandes propriétés avec jardin ou les immeubles sécurisés avec accueil dépassent 600 000 JPY.

## Les écoles internationales à proximité

La présence d'écoles internationales de qualité est l'une des raisons principales pour lesquelles les familles expatriées choisissent ce secteur.

La Deutsche Schule Tokyo (école allemande), la Seoul International School (pour les Coréens notamment), et plusieurs structures bilingues se trouvent à moins de 20 minutes. Le lycée franco-japonais de Tokyo (LFJTK), sur la ligne Oedo, est accessible depuis Azabu-Juban en 15 minutes.

Pour les familles avec enfants, ce secteur reste difficile à égaler à Tokyo.

Voir aussi: [guide des quartiers de Tokyo pour familles expatriées](/blog/quartiers-tokyo-familles-expatriees-guide)

## Ce qu'on vous dit moins souvent

**La compétition est forte.** Les biens dans ces quartiers sont pris d'assaut, souvent par des entreprises qui logent leurs expatriés à prix fixe. Les bons appartements à 200 000 JPY partent en 48 à 72 heures.

**Le réseau informel fonctionne.** Beaucoup de biens dans ce secteur ne sont jamais publiés sur les portails. Ils circulent entre gestionnaires et agences qui travaillent régulièrement avec des locataires expatriés. Un intermédiaire ayant accès à ce réseau multiplie les options disponibles.

**Les alternatives proches méritent d'être considérées.** Ebisu (ligne Hibiya), Daikanyama et même certaines parties de Nishi-Azabu offrent un profil similaire à des loyers 15 à 20% inférieurs.

## Comment trouver un appartement dans ce secteur

Les agences classiques ont une présence dans ces quartiers mais leur portefeuille est limité. Les meilleurs biens passent souvent par des gestionnaires spécialisés dans les profils expatriés ou par des réseaux informels.

Un chasseur immobilier familier de ce secteur peut accéder à une offre plus large et vous éviter de passer à côté d'un bien qui correspond exactement à votre profil.

[Contactez-nous](/contact) pour un brief ciblé sur Hiroo, Minami-Azabu ou les quartiers adjacents.

Avant de vous installer, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) propose des visites guidees de Tokyo et des experiences culturelles pour decouvrir ces quartiers de l'interieur. *(lien affilie)*


Pour decouvrir la gastronomie de ces quartiers residentiels, [Arigato Travel](https://tours.arigatojapan.co.jp/?rfsn=91948) propose des food tours au coeur de Tokyo guides par des locaux, ideaux pour explorer la culture culinaire japonaise des votre arrivee. *(lien affilie)*
---

*À lire aussi : [Ebisu, Daikanyama et Nakameguro : guide pour expatriés](/blog/ebisu-daikanyama-nakameguro-guide-expatries).*

*À lire aussi: [guide des quartiers de Tokyo pour expatriés](/blog/quartiers-tokyo-expatries-guide) et [comment trouver un appartement à Tokyo en tant qu'étranger](/blog/trouver-appartement-tokyo-etranger).*
    `.trim(),
  },
  {
    slug: 'hiroo-minami-azabu-expat-neighborhood-guide',
    locale: 'en',
    title: 'Hiroo and Minami-Azabu: Tokyo Top Expat Neighborhoods',
    description: 'Hiroo and Minami-Azabu have the highest expat density in Tokyo. Full guide to rents, atmosphere, transport links, international schools and daily life for foreigners.',
    date: '2026-06-25',
    readingTime: '7 min',
    content: `
Hiroo and Minami-Azabu form the historic heart of Tokyo's expat community. Embassies, international schools, English-friendly supermarkets, Western restaurants: everything that makes daily life easier for foreigners is concentrated in this two-kilometer radius south of Roppongi.

**Quick answer:** Hiroo and Minami-Azabu are the historic heart of Tokyo's expat community: embassies, international schools, English-friendly supermarkets and Western restaurants. It is the most upscale area (a 1LDK often runs 200,000 to 300,000 JPY and up), ideal for families and executives who want complete international infrastructure.

This guide gives you a complete and honest picture of both neighborhoods: what makes them a reliable choice, what is often left unsaid, and what to expect in terms of rents and availability.


![Median 1K studio rent by Tokyo ward, mapped (2026)](/tokyo-rent-map.png "Where this area sits: median 1K rent across the 23 wards, from 528,660 real active listings")
## Hiroo: Tokyo's Most International Neighborhood

Hiroo is probably the most international neighborhood in Tokyo. It hosts a high density of foreign embassies (Denmark, New Zealand, Italy, among others), several large diplomatic residences, and a commercial offering clearly oriented toward foreign residents.

**What makes Hiroo attractive for expats**

The National Azabu Supermarket, located directly in front of Hiroo station, is the reference point for every foreign resident: imported products, European grocery, cheese section, wines and fresh produce. Several international restaurants, cafes with Western menus, and specialty import shops are within a few minutes' walk.

The streets around Hiroo are quiet, tree-lined and safe. The neighborhood has a residential feel rare for Tokyo: few pachinko parlors, few loud commercial signs, few transit-oriented retail. On weekends, you see joggers, strollers, and expat families, not commuter crowds.

**Transport from Hiroo**

Hiroo station is on the Hibiya Line, running directly to Roppongi, Ginza and Tsukiji. Allow 10 minutes to Roppongi, 15 to Ginza, 20 to Shinjuku with one transfer.

**Rents in Hiroo**

Hiroo is one of Tokyo's most expensive neighborhoods for foreigners. A 1LDK (separate bedroom plus living room) rents for between 180,000 and 280,000 JPY per month depending on size, floor and condition. A family 2LDK frequently exceeds 300,000 JPY.

Quality properties move quickly and are often rented before appearing on public portals.

## Minami-Azabu: The Premium Residential Side of the Hiroo Area

Minami-Azabu is adjacent to Hiroo, situated between Azabu-Juban and Hiroo. It is one of the most expensive neighborhoods in all of Tokyo, with high-end properties, secured residences and an even stronger diplomatic presence.

**What defines Minami-Azabu**

Several major European embassies and diplomatic residences are located in this neighborhood. The French community in Tokyo is particularly well represented in this area.

Streets are quiet, low-traffic, with large trees and properties that often include parking. The environment is markedly more residential than central.

**Transport from Minami-Azabu**

Minami-Azabu does not have its own metro station. You access the network from Hiroo (Hibiya Line) or Azabu-Juban (Namboku and Oedo Lines), each 10 to 15 minutes on foot. For families with a company car, this is not an issue. For daily commuters relying on public transport, it is worth evaluating carefully.

**Rents in Minami-Azabu**

Minami-Azabu is even more expensive than Hiroo. A 2LDK commonly rents between 300,000 and 450,000 JPY per month. Large properties with gardens or secured buildings with concierge services exceed 600,000 JPY.

## International Schools Nearby

The proximity of quality international schools is one of the main reasons expat families choose this area.

Several international structures are within 20 minutes. The French high school in Tokyo (LFJTK) is accessible from Azabu-Juban on the Oedo Line in about 15 minutes.

For families with children, this area remains difficult to match in Tokyo.

See also: [Tokyo neighborhoods guide for expat families](/blog/best-neighbourhoods-families-tokyo-guide)

## What Is Often Left Unsaid

**Competition is intense.** Properties in these neighborhoods are in high demand, often taken by companies housing their expats at fixed rates. Good apartments at 200,000 JPY move in 48 to 72 hours.

**The informal network matters.** Many properties in this area are never published on portals. They circulate between managers and agencies that work regularly with expat tenants. An intermediary with access to this network significantly expands your available options.

**Nearby alternatives are worth considering.** Ebisu (Hibiya Line), Daikanyama, and parts of Nishi-Azabu offer a similar profile at 15 to 20% lower rents.

## How to Find an Apartment in This Area

Standard agencies have a presence in these neighborhoods but their portfolios are limited. The best properties often go through property managers specializing in expat profiles or through informal networks.

A real estate hunter familiar with this area can access a broader supply and prevent you from missing a property that matches your profile exactly.

[Contact us](/contact) for a brief focused on Hiroo, Minami-Azabu or adjacent neighborhoods.

Before settling in, [GetYourGuide](https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher) offers guided tours of Tokyo and cultural experiences to discover these neighborhoods from the inside. *(affiliate link)*


To discover the food scene of these upscale residential neighbourhoods, [Arigato Travel](https://tours.arigatojapan.co.jp/?rfsn=91948) offers food tours in the heart of Tokyo led by local guides, ideal for exploring Japanese culinary culture from day one. *(affiliate link)*
---

*See also: [Ebisu, Daikanyama and Nakameguro: Expat Living Guide](/blog/ebisu-daikanyama-nakameguro-expat-guide).*

*Read next: [Tokyo neighborhoods guide for expats](/blog/tokyo-neighbourhoods-expats-guide) and [how to find an apartment in Tokyo as a foreigner](/blog/find-apartment-tokyo-foreigner).*
    `.trim(),
  },
  {
    slug: 'gaijin-house-tokyo-guide',
    locale: 'en',
    title: 'Gaijin House Tokyo: Complete Guide for Foreigners (2026)',
    description: 'What a gaijin house is, real 2026 costs, pros and cons, and how to secure a room in Tokyo with no Japanese guarantor and no key money.',
    date: '2026-06-28',
    readingTime: '6 min',
    content: `
A gaijin house is often the first home a foreigner has in Tokyo. It is cheap, flexible, and skips the obstacles that lock newcomers out of the traditional rental market. Here is exactly how it works in 2026.

**Quick answer:** A gaijin house is a shared residence in Tokyo aimed at foreigners, offering a private furnished room with shared kitchen and bathroom, no Japanese guarantor, no key money, and move-in within days. Rooms run 40,000 to 80,000 JPY/month with utilities often included. It is the fastest and cheapest legal way for a newcomer to get a Tokyo address. For more privacy than a shared house, compare it with the options in our [complete guide to furnished apartments in Tokyo](/en/blog/furnished-apartments-tokyo-guide).

> **From the field.** A gaijin house lives or dies on who runs it, not the price. The cheap ones with an absent operator empty out as fast as they fill. Before you book, notice how fast the operator answers your first email, that tells you more than the photos.

![Median 1K studio rent by Tokyo ward, mapped (2026)](/tokyo-rent-map.png "Median 1K rent across the 23 wards, from 528,660 real active listings")
## What is a gaijin house?

"Gaijin house" (外人ハウス) literally means "foreigner house." The term dates back to the 1990s, when a few operators began renting shared rooms to foreigners locked out of the standard rental market. Today the line between a gaijin house and a modern share house has blurred: both offer furnished private rooms with shared common areas, managed by a professional operator.

What still defines a gaijin house is its purpose: housing built around foreign residents who do not have a Japanese guarantor, a local bank account, or fluent Japanese. You sign in English, pay a small deposit instead of key money, and move in within days.

## How much does a gaijin house cost?

| Room type | Monthly rent | Deposit | Utilities |
|---|---|---|---|
| Dorm bed (shared room) | 30,000-45,000 JPY | minimal | usually included |
| Private room (standard) | 45,000-70,000 JPY | ~1 month | often included |
| Private room (central) | 70,000-100,000 JPY | ~1 month | often included |

Beyond rent, expect a one-time admin and cleaning fee of 10,000 to 30,000 JPY. There is no reikin (key money) and no agency commission, which is what makes a gaijin house dramatically cheaper to move into than a standard apartment, where you can pay 4 to 6 months upfront.

## Gaijin house vs share house vs apartment

- **Gaijin house / share house:** no guarantor, furnished, move in within a week, social environment, small private space. Best for newcomers and tight budgets.
- **Monthly mansion:** a private studio with your own kitchen and bathroom, no guarantor, 80,000 to 200,000 JPY/month. Best when you want privacy and a usable address for admin.
- **Standard apartment:** real floor space and a long lease, but requires a guarantor (or guarantee company), key money, and a 2 to 4 week process.

For the full comparison, see our [furnished apartment guide](/blog/furnished-apartment-tokyo-top-5-expats) and our [complete share house guide](/blog/share-house-tokyo-guide-2026).

## Who is a gaijin house for?

A gaijin house makes the most sense if you:
- are arriving in Japan within a few weeks and need a confirmed address fast,
- do not yet have a Japanese guarantor or bank account,
- want to keep your first months flexible while you learn the city,
- value meeting other residents over having a large private space.

It is less suited to families, couples wanting full privacy, or anyone planning to stay several years in one place, where a [standard apartment](/blog/trouver-appartement-tokyo-etranger) becomes more economical.

## Which Tokyo areas to look at

Gaijin houses cluster around lines with good access and younger residential districts. The wards just outside the Yamanote loop, Nakano, Koenji, Kita and Itabashi, give you the same central access for noticeably less than Shibuya or Shinjuku. Premium rooms do exist in central wards if your budget allows.

## How to secure a room

1. Decide your budget and whether you want a dorm or a private room.
2. Shortlist properties by train line and commute, not just by ward.
3. Apply online: most operators accept bookings from abroad with a passport and visa.
4. Confirm what is included (utilities, internet, bedding) before you sign.
5. Arrange move-in, many rooms are available within a week.

For a smooth arrival, line up your housing before you land, then handle your [residence card and bank account](/blog/ouvrir-compte-bancaire-japon-etranger) in your first days.

## Finding a cheap gaijin house in Tokyo

The cheapest gaijin houses in Tokyo are dorm beds in shared rooms, from around 30,000 to 45,000 JPY per month with utilities included. For a private room on a budget, look one or two stops outside the Yamanote loop (Nakano, Koenji, Kita, Itabashi, Adachi), where a private room runs 45,000 to 60,000 JPY against 70,000 JPY and up in Shibuya or Shinjuku. A longer minimum stay of three months or more often unlocks a lower monthly rate, and moving in outside the February to April peak season gives you more availability and room to negotiate.

## Frequently asked questions

**What is a gaijin house in Tokyo?** A shared residence aimed at foreign residents: a private furnished room with a shared kitchen and bathroom, no Japanese guarantor and no key money, with move-in within days.

**How much does a gaijin house in Tokyo cost?** From 30,000 to 45,000 JPY per month for a dorm bed, and 45,000 to 100,000 JPY for a private room, with utilities often included and only a small deposit.

**What is the difference between a gaijin house and a share house?** Very little today. A gaijin house is simply a share house built around foreign residents who sign in English without a Japanese guarantor. The two terms are now used almost interchangeably.

**Can you rent a gaijin house without a guarantor?** Yes. No Japanese guarantor is required. You book online with a passport and visa, pay a small deposit instead of key money, and move in within days.

**Where are the cheapest gaijin houses in Tokyo?** Just outside the Yamanote loop, in Nakano, Koenji, Kita, Itabashi and Adachi, where you get the same central access for noticeably less than in Shibuya or Shinjuku.

A gaijin house is rarely where expats stay forever, but it is the single easiest door into Tokyo. It buys you a real address, time to learn the city, and zero guarantor stress, exactly what you need in your first months.

---

*See also: [furnished apartments in Tokyo](/blog/furnished-apartment-tokyo-top-5-expats) and [how to find an apartment in Tokyo as a foreigner](/blog/find-apartment-tokyo-foreigner).*
    `.trim(),
  },
  {
    slug: 'se-loger-shibuya-quartier-guide',
    locale: 'fr',
    title: 'Se loger à Shibuya : loyers, profil du quartier et bons plans (2026)',
    description: 'Combien coûte un logement à Shibuya, à quoi ressemble le quartier et comment s\'y installer sans exploser son budget en 2026.',
    date: '2026-06-28',
    readingTime: '6 min',
    content: `
Shibuya est l'un des quartiers les plus convoités de Tokyo, et l'un des plus chers. Voici à quoi s'attendre côté logement en 2026, et comment s'y installer sans exploser son budget.

**Réponse rapide :** Se loger à Shibuya coûte cher : comptez 100 000 à 150 000 JPY/mois pour un petit 1K, davantage pour un 1LDK. Le quartier offre un accès inégalé (de nombreuses lignes), une vie nocturne et culturelle intense, mais peu d'espace pour le prix. Pour y vivre sans se ruiner, visez une share house (50 000 à 90 000 JPY) ou un quartier limitrophe mieux valorisé.


![Loyer mensuel médian d'un studio 1K près de 50 stations de Tokyo (2026)](/tokyo-rent-by-station.png "Où se situe cette station : loyer médian 1K sur 50 stations de Tokyo, sur 528 660 annonces réelles actives")
## Pourquoi choisir Shibuya ?

- Hub de transport majeur : JR Yamanote, Ginza, Hanzomon, Fukutoshin, Den-en-toshi. Vous allez partout, vite.
- Épicentre de la mode, de la culture jeune, des cafés et de la vie nocturne.
- Des poches résidentielles calmes à deux pas : Tomigaya, Shoto, Kamiyama.

## Combien coûte un logement à Shibuya ?

| Type | Loyer mensuel | Profil |
|---|---|---|
| Chambre en share house | 50 000-90 000 JPY | budget, sans garant |
| Studio 1K (20-25 m²) | 100 000-150 000 JPY | célibataire, central |
| 1LDK (30-45 m²) | 160 000-250 000 JPY | couple, confort |

Sur un bail classique, ajoutez le reikin (1 à 2 mois), le shikikin (1 à 2 mois) et les frais d'agence. Au total, l'entrée peut représenter 4 à 6 mois de loyer (voir [les frais cachés d'une location à Tokyo](/blog/frais-caches-location-tokyo)).

## Le profil du quartier

Shibuya est jeune, dense et animé. Idéal si vous aimez l'effervescence, les sorties et être au centre de tout. Moins adapté si vous cherchez le calme ou de grands espaces. Les rues derrière la gare (Tomigaya, Kamiyama) offrent un bon compromis : proximité immédiate et atmosphère résidentielle.

## Se loger à Shibuya sans se ruiner

- Visez une share house : sans garant, sans reikin, installation en quelques jours (voir [le guide gaijin house](/blog/gaijin-house-tokyo-guide)).
- Élargissez d'une station : Yoyogi-Uehara, Sasazuka ou Ikejiri-Ohashi offrent un accès comparable pour 20 à 30 % de moins.
- Pour un bail classique, préparez votre dossier et passez par une société de garantie (voir [comment trouver un appartement à Tokyo](/blog/trouver-appartement-tokyo-etranger)).

Shibuya se mérite côté budget, mais c'est l'un des meilleurs points de chute pour qui veut vivre Tokyo à 100 %. Avec une share house ou une station d'écart, on y accède sans se ruiner.

---

*À lire aussi : [appartement meublé à Tokyo](/blog/appartement-meuble-tokyo-expats-top-5) et [share house à Tokyo](/blog/share-house-tokyo-guide-complet).*
    `.trim(),
  },
  {
    slug: 'frais-caches-location-tokyo',
    locale: 'fr',
    title: 'Les frais cachés d\'une location à Tokyo (et comment les éviter)',
    description: 'Reikin, shikikin, frais d\'agence, garantie, renouvellement : tous les frais cachés d\'une location à Tokyo en 2026 et comment réduire la facture.',
    date: '2026-06-28',
    readingTime: '6 min',
    content: `
Le loyer affiché n'est que la partie visible. À Tokyo, signer un bail classique peut coûter 4 à 6 mois de loyer d'un seul coup. Voici tous les frais cachés, et comment les éviter.

**Réponse rapide :** Sur un bail classique à Tokyo, prévoyez en plus du premier loyer : le reikin (argent-clé, 0 à 2 mois, non remboursable), le shikikin (caution, 1 à 2 mois, remboursable), les frais d'agence (1 mois), la société de garantie (0,5 à 1 mois/an) et l'assurance habitation (environ 20 000 JPY pour 2 ans). Soit 4 à 6 mois de loyer au départ. Les share houses et les meublés évitent la quasi-totalité de ces frais.


![Ce que coûte réellement l'entrée dans un logement à Tokyo, poste par poste](/tokyo-movein-cost-fr.png "Environ 4,9 mois de loyer à l'entrée sur un logement à 100 000 JPY")
## Les frais à l'entrée

| Frais | Montant typique | Remboursable ? |
|---|---|---|
| Reikin (argent-clé) | 0-2 mois | Non |
| Shikikin (caution) | 1-2 mois | Oui (moins réparations) |
| Frais d'agence | 1 mois (+ taxe) | Non |
| Société de garantie | 0,5-1 mois | Non |
| Assurance habitation | ~20 000 JPY | Non |
| Changement de serrure | 15 000-25 000 JPY | Non |

## Les frais récurrents qu'on oublie

- **Frais de renouvellement (更新料 koushinryou)** : souvent 1 mois de loyer tous les 2 ans.
- **Frais de garantie annuels** : la société de garantie reprend environ 10 000 JPY ou 0,5 mois chaque année.
- **Charges communes (共益費)** : parfois facturées en plus du loyer affiché.

## Les pièges à vérifier avant de signer

- Le reikin est-il négociable ? (souvent oui sur les biens qui peinent à se louer)
- La caution couvre-t-elle un nettoyage forfaitaire imposé à la sortie ?
- Y a-t-il des frais de résiliation anticipée ?
- Demandez l'explication des points importants (重要事項説明) en anglais si nécessaire.

## Comment éviter (presque) tous ces frais

La quasi-totalité de ces frais disparaît avec une share house, un monthly mansion ou un meublé : pas de reikin, pas de frais d'agence, caution minime. C'est pourquoi ces options sont si populaires à l'arrivée (voir [le guide appartement meublé](/blog/appartement-meuble-tokyo-expats-top-5) et [le guide gaijin house](/blog/gaijin-house-tokyo-guide)).

Connaître ces frais à l'avance, c'est éviter le choc de la première facture et savoir où négocier. Pour le détail du processus, voir [comment trouver un appartement à Tokyo](/blog/trouver-appartement-tokyo-etranger).

---

*À lire aussi : [appartement meublé à Tokyo](/blog/appartement-meuble-tokyo-expats-top-5) et [gaijin house à Tokyo](/blog/gaijin-house-tokyo-guide).*
    `.trim(),
  },
  {
    slug: 'se-loger-nakano-quartier-guide',
    locale: 'fr',
    title: 'Se loger à Nakano : le bon plan à deux pas de Shinjuku (2026)',
    description: 'Loyers, profil du quartier et bons plans pour se loger à Nakano en 2026 : la centralité de Shinjuku sans le prix du centre.',
    date: '2026-06-28',
    readingTime: '5 min',
    content: `
À une station de Shinjuku mais bien plus abordable, Nakano est l'un des meilleurs rapports qualité-prix de Tokyo pour un expatrié. Voici le profil du quartier et les loyers en 2026.

**Réponse rapide :** Se loger à Nakano coûte 70 000 à 95 000 JPY/mois pour un studio 1K, soit 20 à 30 % de moins qu'à Shinjuku, à seulement 5 minutes en train. Le quartier est résidentiel mais vivant, célèbre pour Nakano Broadway et sa culture pop. Idéal pour qui veut la centralité sans le prix du centre.


![Loyer mensuel médian d'un studio 1K près de 50 stations de Tokyo (2026)](/tokyo-rent-by-station.png "Où se situe cette station : loyer médian 1K sur 50 stations de Tokyo, sur 528 660 annonces réelles actives")
## Pourquoi choisir Nakano ?

- 5 minutes de Shinjuku (ligne Chuo/Sobu), accès direct à tout Tokyo.
- Nakano Broadway : temple de la sous-culture (manga, figurines, vintage).
- Ambiance résidentielle, rues commerçantes (Sun Mall), restaurants abordables.

## Combien coûte un logement à Nakano ?

| Type | Loyer mensuel | Profil |
|---|---|---|
| Chambre en share house | 45 000-75 000 JPY | budget, sans garant |
| Studio 1K (20-25 m²) | 70 000-95 000 JPY | célibataire |
| 1LDK (30-45 m²) | 110 000-160 000 JPY | couple |

## Le profil du quartier

Nakano séduit ceux qui veulent vivre comme un local : marchés couverts, izakayas, vie de quartier authentique, tout en étant à 5 minutes du plus grand hub de Tokyo. Familles, étudiants et jeunes actifs s'y retrouvent. Plus on s'éloigne de la gare, plus c'est calme et abordable.

## Se loger à Nakano malin

- Share house : sans garant, installation rapide (voir [le guide gaijin house](/blog/gaijin-house-tokyo-guide)).
- Stations voisines encore moins chères : Higashi-Nakano, Numabukuro, Araiyakushi-mae.
- Pour un bail classique, anticipez les [frais cachés d'une location](/blog/frais-caches-location-tokyo).

Nakano, c'est le compromis gagnant : l'accès de Shinjuku, le calme d'un quartier résidentiel, et un loyer qui laisse respirer le budget.

---

*À lire aussi : [se loger à Shibuya](/blog/se-loger-shibuya-quartier-guide) et [share house à Tokyo](/blog/share-house-tokyo-guide-complet).*
    `.trim(),
  },
  {
    slug: 'se-loger-ikebukuro-quartier-guide',
    locale: 'fr',
    title: 'Se loger à Ikebukuro : grand hub, loyers abordables (2026)',
    description: 'Loyers, profil du quartier et bons plans pour se loger à Ikebukuro en 2026 : la puissance d\'un grand hub à un prix plus doux.',
    date: '2026-06-28',
    readingTime: '5 min',
    content: `
Ikebukuro est l'un des plus grands hubs de Tokyo, et l'un des plus abordables parmi les grands centres. Voici à quoi s'attendre côté logement en 2026.

**Réponse rapide :** Se loger à Ikebukuro coûte 75 000 à 105 000 JPY/mois pour un studio 1K, plus abordable que Shibuya ou Shinjuku pour une centralité comparable. Énorme gare, shopping, Sunshine City : tout est sur place. Bon choix pour qui veut un grand hub sans le budget du sud-ouest de Tokyo.


![Loyer mensuel médian d'un studio 1K près de 50 stations de Tokyo (2026)](/tokyo-rent-by-station.png "Où se situe cette station : loyer médian 1K sur 50 stations de Tokyo, sur 528 660 annonces réelles actives")
## Pourquoi choisir Ikebukuro ?

- Hub majeur : Yamanote, Marunouchi, Fukutoshin, lignes privées vers Saitama.
- Sunshine City, grands magasins, restaurants, vie nocturne.
- Réputé plus abordable que les hubs du sud (Shibuya, Shinjuku).

## Combien coûte un logement à Ikebukuro ?

| Type | Loyer mensuel | Profil |
|---|---|---|
| Chambre en share house | 48 000-80 000 JPY | budget, sans garant |
| Studio 1K (20-25 m²) | 75 000-105 000 JPY | célibataire |
| 1LDK (30-45 m²) | 120 000-180 000 JPY | couple |

## Le profil du quartier

Ikebukuro est dense, animé et pratique. Le côté ouest est commerçant et nocturne ; le côté est, autour de Sunshine City, plus familial. À mesure qu'on s'éloigne de la gare (vers Mejiro, Kanamecho, Senkawa), on gagne en calme et on baisse le loyer.

## Se loger à Ikebukuro malin

- Share house : sans garant, rapide (voir [le guide gaijin house](/blog/gaijin-house-tokyo-guide)).
- Stations voisines : Mejiro, Kanamecho, Shiinamachi, plus calmes et moins chères.
- Anticipez les [frais cachés d'une location](/blog/frais-caches-location-tokyo) sur un bail classique.

Ikebukuro offre la puissance d'un grand hub à un prix plus doux : idéal pour vivre au cœur de l'action sans le budget de Shibuya.

---

*À lire aussi : [se loger à Nakano](/blog/se-loger-nakano-quartier-guide) et [appartement meublé à Tokyo](/blog/appartement-meuble-tokyo-expats-top-5).*
    `.trim(),
  },
  {
    slug: 'se-loger-koenji-quartier-guide',
    locale: 'fr',
    title: 'Se loger à Koenji : le quartier bohème et abordable de Tokyo (2026)',
    description: 'Loyers, profil du quartier et bons plans pour se loger à Koenji en 2026 : le repaire créatif de Tokyo à petit prix.',
    date: '2026-06-28',
    readingTime: '5 min',
    content: `
Koenji est le repaire bohème de Tokyo : musique live, friperies, izakayas, et des loyers parmi les plus doux de la ligne Chuo. Voici le guide logement 2026.

**Réponse rapide :** Se loger à Koenji coûte 65 000 à 88 000 JPY/mois pour un studio 1K, un excellent rapport qualité-prix à 10 minutes de Shinjuku. Quartier jeune, créatif et convivial, célèbre pour ses friperies, sa scène musicale et ses petits restaurants. Idéal pour un budget serré sans sacrifier l'ambiance.


![Loyer médian d'un studio 1K par arrondissement de Tokyo, en carte (2026)](/tokyo-rent-map.png "Où se situe ce quartier : loyer médian 1K dans les 23 arrondissements, sur 528 660 annonces réelles actives")
## Pourquoi choisir Koenji ?

- 10 minutes de Shinjuku (ligne Chuo/Sobu).
- Capitale de la friperie, scène indie et rock, festivals de quartier (Awaodori).
- Loyers doux, vie de quartier chaleureuse, restaurants bon marché.

## Combien coûte un logement à Koenji ?

| Type | Loyer mensuel | Profil |
|---|---|---|
| Chambre en share house | 42 000-70 000 JPY | budget, sans garant |
| Studio 1K (18-23 m²) | 65 000-88 000 JPY | célibataire |
| 1LDK (28-40 m²) | 100 000-145 000 JPY | couple |

## Le profil du quartier

Koenji attire artistes, étudiants et jeunes actifs en quête d'authenticité. L'atmosphère est décontractée et créative, loin du clinquant de Shibuya. Les ruelles fourmillent de bars minuscules et de boutiques vintage. C'est l'un des quartiers les plus attachants de Tokyo.

## Se loger à Koenji malin

- Share house : sans garant, installation rapide (voir [le guide gaijin house](/blog/gaijin-house-tokyo-guide)).
- Stations voisines de la Chuo : Asagaya, Higashi-Koenji, Shin-Koenji.
- Pensez aux [frais cachés d'une location](/blog/frais-caches-location-tokyo) sur un bail classique.

Koenji, c'est l'âme de Tokyo à petit prix : du caractère, une communauté, et un loyer qui laisse de quoi en profiter.

---

*À lire aussi : [se loger à Nakano](/blog/se-loger-nakano-quartier-guide) et [share house à Tokyo](/blog/share-house-tokyo-guide-complet).*
    `.trim(),
  },
  {
    slug: 'social-apartment-tokyo-guide',
    locale: 'fr',
    title: 'Social apartment à Tokyo : le logement partagé nouvelle génération (2026)',
    description: 'Le social apartment, version premium de la share house : espaces communs design, communauté active, sans garant. Coûts, comment postuler et pour qui en 2026.',
    date: '2026-06-28',
    readingTime: '8 min',
    content: `
Le "social apartment" est une catégorie de logement partagé haut de gamme qui séduit de plus en plus d'expatriés à Tokyo. Voici ce que c'est, combien ça coûte, comment postuler, et pour qui en 2026.

**Réponse rapide :** Un social apartment est une version premium de la share house : vous louez une chambre privée meublée, mais l'immeuble est construit autour de grands espaces communs soignés (lounge, cuisine design, souvent une salle de coworking, une salle de sport, une salle de cinéma ou un toit-terrasse). Comptez 70 000 à 130 000 JPY par mois, sans garant, sans argent-clé et sans frais d'agence. C'est l'option idéale pour qui veut la vie sociale d'une share house dans un cadre plus qualitatif, proche de l'hôtel.

> **Vu du terrain.** La communauté d'un social apartment est réelle, mais elle dépend de deux choses : l'opérateur qui organise vraiment des événements, et le mélange de résidents à un moment donné. Deux immeubles de la même marque peuvent être complètement différents. Si vous pouvez, visitez à une heure creuse et voyez si les espaces communs servent vraiment.
## Qu'est-ce qu'un social apartment ?

Né au Japon dans les années 2010, le concept de social apartment mise sur la qualité de ses espaces partagés pour que les résidents se rencontrent vraiment. Contrairement à une share house basique, l'accent est mis sur le design, les équipements et une communauté active. Votre chambre reste totalement privée et fermant à clé ; tout le reste, la cuisine, le lounge, les espaces de travail et les événements, se vit ensemble. Les immeubles sont plus grands qu'une share house, de 30 à plus de 150 chambres, ce qui rend les équipements communs viables.

## Ce qui est inclus

La plupart des social apartments proposent bien plus qu'une chambre :

- Une chambre privée meublée (lit, bureau, rangements, parfois une salle d'eau privative).
- Les charges, l'eau et internet haut débit, généralement tout compris.
- Des cuisines et des salons partagés entièrement équipés.
- Des extras qu'un appartement classique n'a jamais : salle de sport, salle de cinéma, studio musique ou atelier, espace de coworking, toit-terrasse, parfois un café ou un bar.
- Le ménage des parties communes, et les fournitures de base.
- Des événements communautaires organisés par l'opérateur.

Comme tout est groupé, votre montant mensuel est proche de votre vrai coût tout compris, ce qui simplifie le budget. À comparer avec un studio privé, où vous ajoutez les frais d'entrée, les meubles, les charges et internet par-dessus (voir notre [guide du coût de la vie](/blog/cout-vie-tokyo-expatrie-2026)).

## Combien coûte un social apartment ?

| Type de chambre | Loyer mensuel | Caution |
|---|---|---|
| Chambre standard | 70 000-100 000 JPY | ~1 mois |
| Chambre premium / centrale | 100 000-130 000 JPY | ~1 mois |
| Avec salle d'eau / grande | 120 000-160 000 JPY | ~1 mois |

Pas de reikin (argent-clé), pas de frais d'agence, et généralement une caution d'environ un mois, en partie remboursable. C'est le gros avantage financier face à un bail classique, où les frais d'entrée atteignent souvent quatre à six mois de loyer. Pour le détail des frais d'entrée cachés, voir notre [guide des pièges de la location](/blog/pieges-location-tokyo-etranger).

## Social apartment vs share house vs studio privé

| | Share house | Social apartment | Studio privé |
|---|---|---|---|
| Loyer mensuel | 45 000-90 000 | 70 000-130 000 | 90 000-160 000 |
| Frais d'entrée | Très bas | Très bas | Élevés (4-6 mois) |
| Garant | Souvent aucun | Aucun | Souvent exigé |
| Communauté | Fonctionnelle | Forte, animée | Aucune |
| Intimité | Moyenne | Moyenne | Totale |

En résumé : une [share house](/blog/share-house-tokyo-guide-complet) est la porte d'entrée la moins chère, un studio privé offre une intimité totale mais le coût initial le plus lourd, et le social apartment se place entre les deux, échangeant un peu d'intimité contre du design, des équipements et un cercle social tout prêt. Si vous hésitez, notre comparatif [gaijin house vs share house](/blog/gaijin-house-vs-share-house-difference) va plus loin.

## Comment postuler (et pourquoi il n'y a pas de garant)

La candidature est bien plus légère qu'un bail japonais classique :

1. Choisissez un immeuble et une chambre disponible en ligne.
2. Envoyez votre pièce d'identité (passeport ou carte de résident) et une preuve de solvabilité.
3. Signez un contrat d'occupation simple, souvent disponible en anglais.
4. Payez le premier mois plus la petite caution, et emménagez à la date convenue.

Comme vous signez avec l'opérateur plutôt qu'avec un propriétaire individuel, il n'y a normalement pas de garant ni de passage par une société de garantie, l'obstacle qui bloque justement beaucoup de nouveaux arrivants (voir [pourquoi les propriétaires japonais refusent les étrangers](/blog/pourquoi-proprietaires-japonais-refusent-etrangers)). Les durées minimales sont en général de un à trois mois, bien plus courtes que le bail standard de deux ans : un social apartment est donc une excellente première base le temps de vous installer.

## Meilleurs quartiers pour un social apartment à Tokyo

Les opérateurs regroupent leurs immeubles autour de quartiers "lifestyle" bien desservis : Setagaya, Meguro, Shibuya, Shinjuku et le long des lignes Chuo et Yamanote. Les chambres centrales près de Shibuya ou Nakameguro sont en haut de la fourchette ; quelques stations plus loin, vers Sangenjaya, Koenji ou Nakano, vous obtenez les mêmes équipements pour nettement moins cher. Pour le contexte des quartiers, voir notre [guide des quartiers de Tokyo](/blog/quartiers-tokyo-expatries-guide).

## Pour qui ?

Le social apartment convient à ceux qui veulent rencontrer du monde tout en profitant d'un beau cadre : jeunes actifs, créatifs, travailleurs à distance et expatriés en mobilité. Il est moins adapté si vous cherchez l'intimité totale, une configuration familiale, ou un logement non meublé longue durée (dans ce cas, voir [comment trouver un appartement](/blog/trouver-appartement-tokyo-etranger)).

*Après avoir géré des locations meublées à Tokyo, les résidents les plus heureux en social apartment sont ceux qui voient les espaces communs comme l'essentiel, pas comme un bonus. Si vous savez que vous garderez votre porte fermée à rester dans votre chambre, vous payez un premium pour des équipements que vous n'utiliserez pas, et un simple studio offre un meilleur rapport qualité-prix.*

## Questions fréquentes

**Les social apartments conviennent-ils aux étrangers ?** Oui. Sans garant, avec des contrats en anglais et une communauté immédiate, c'est l'une des façons les plus simples d'atterrir à Tokyo.

**Quelle est la durée minimale ?** En général un à trois mois, contre deux ans pour un bail classique.

**Un couple peut-il vivre en social apartment ?** Certains opérateurs proposent des chambres plus grandes ou doubles pour les couples, mais beaucoup de chambres sont individuelles : à vérifier immeuble par immeuble.

**Est-ce la même chose qu'une share house ?** Non. Une share house est plus simple et moins chère ; un social apartment est un immeuble plus grand, pensé design, avec des équipements dignes d'un hôtel et une communauté animée.

Le social apartment, c'est le meilleur des deux mondes : la simplicité d'entrée et le petit budget d'une share house, avec le confort et la vie communautaire d'une résidence premium.

---

*À lire aussi : [appartements meublés à Tokyo](/blog/appartement-meuble-tokyo-expats-top-5), [guide de la share house](/blog/share-house-tokyo-guide-complet) et [gaijin house à Tokyo](/blog/gaijin-house-tokyo-guide-complet).*
    `.trim(),
  },
  {
    slug: 'virement-bancaire-japon-furikomi-guide',
    locale: 'fr',
    title: 'Faire un virement bancaire au Japon (furikomi) : guide étape par étape',
    description: 'Le furikomi expliqué : faire un virement au distributeur ou en ligne, infos nécessaires, frais et délais. Payer son loyer et ses factures au Japon.',
    date: '2026-06-28',
    readingTime: '5 min',
    content: `
Payer son loyer, rembourser un ami, régler une facture : au Japon, presque tout passe par le virement bancaire, le furikomi. Voici comment le faire, étape par étape, en 2026.

**Réponse rapide :** Le furikomi (振込) est le virement bancaire japonais. Vous pouvez le faire au distributeur (ATM), via l'application de votre banque, ou en agence. Il vous faut le nom de la banque, l'agence, le type et le numéro de compte, et le nom du bénéficiaire en katakana. Les frais vont de 0 à 880 JPY selon la banque et le mode. Un virement vers une autre banque prend de quelques heures à 1 jour ouvré.


![L'ordre des étapes pour s'installer à Tokyo : visa, carte de séjour, banque, garant, bail](/tokyo-process-fr.png "La carte de séjour débloque tout, faites-la le jour 1")
## Ce dont vous avez besoin

- Le nom de la banque et de l'agence (支店 shiten)
- Le type de compte (普通 futsuu = courant)
- Le numéro de compte (口座番号)
- Le nom du bénéficiaire en katakana

## Faire un furikomi à l'ATM

1. Insérez votre carte, choisissez 振込 (furikomi).
2. Sélectionnez la banque de destination, puis l'agence.
3. Entrez le numéro de compte et le montant.
4. Vérifiez le nom du bénéficiaire qui s'affiche.
5. Validez et conservez le reçu.

## Faire un furikomi en ligne

Les banques en ligne (Sony Bank, Rakuten) et l'application de Japan Post permettent le virement depuis le téléphone, souvent avec des frais réduits ou nuls vers les comptes internes. Pour ouvrir un compte adapté, voir [le guide compte bancaire](/blog/ouvrir-compte-bancaire-japon-etranger).

## Frais et délais à connaître

- **Virement interne** (même banque) : souvent gratuit.
- **Virement externe** : 110 à 880 JPY selon la banque et le canal (l'ATM coûte plus que le mobile).
- **Délai** : immédiat à 1 jour ouvré ; attention aux virements tard le soir ou le week-end.

Maîtriser le furikomi, c'est gérer sereinement loyer, factures et remboursements au Japon : une compétence de base de la vie quotidienne.

---

*À lire aussi : [ouvrir un compte bancaire au Japon](/blog/ouvrir-compte-bancaire-japon-etranger) et [les frais cachés d'une location](/blog/frais-caches-location-tokyo).*
    `.trim(),
  },
  {
    slug: 'assurance-sante-visa-japon-2027',
    locale: 'fr',
    title: 'Assurance santé impayée = visa en danger au Japon (règle 2027)',
    description: 'À partir de 2027, le non-paiement de l\'assurance maladie ou de la retraite pourra compliquer le renouvellement du visa au Japon. Comment rester en règle.',
    date: '2026-06-28',
    readingTime: '5 min',
    content: `
À partir de 2027, ne pas être à jour de son assurance santé ou de sa retraite pourra compliquer le renouvellement de votre visa au Japon. Voici ce qu'il faut savoir pour rester en règle.

**Réponse rapide :** Le Japon prévoit, à partir de 2027, de vérifier le paiement de l'assurance maladie nationale (kokumin kenko hoken) et de la retraite lors des demandes de renouvellement ou de changement de statut de résidence. Concrètement : un étranger qui n'a pas payé ses cotisations s'expose à un refus ou à un examen plus strict. Rester à jour devient essentiel pour sécuriser son visa.

## Ce qui change en 2027

Jusqu'ici, le paiement de l'assurance santé et de la pension n'était pas systématiquement contrôlé au renouvellement du visa. À partir de 2027, l'immigration prévoit de croiser ces données. Un historique de non-paiement pourra peser sur la décision.

## Qui est concerné ?

Tout résident étranger affilié au système national (kokumin kenko hoken + kokumin nenkin), principalement les indépendants, étudiants et personnes sans assurance d'entreprise. Les salariés couverts par le shakai hoken (prélevé sur le salaire) sont en règle par défaut.

## Comment rester en règle

- Inscrivez-vous à l'assurance dès votre arrivée à la mairie (voir [le guide assurance maladie](/blog/assurance-maladie-japon-expatrie)).
- Payez vos cotisations à temps et conservez les justificatifs.
- En cas de faibles revenus, demandez une exonération (減免 genmen) plutôt que de ne pas payer.
- Gardez vos preuves de paiement pour votre dossier de renouvellement.

## Que faire en cas de retard ?

Régularisez dès que possible et demandez un échéancier si besoin. Une exonération officielle vaut toujours mieux qu'un simple non-paiement, qui laisse une trace négative dans votre historique.

Anticiper cette règle, c'est protéger à la fois votre santé et votre droit de séjour. Mettez-vous en règle dès l'arrivée : c'est la meilleure assurance pour votre visa.

---

*À lire aussi : [assurance maladie au Japon](/blog/assurance-maladie-japon-expatrie) et [impôts sur le revenu au Japon](/blog/impots-revenus-japon-expatrie-2026).*
    `.trim(),
  },
  {
    slug: 'se-loger-asagaya-quartier-guide',
    locale: 'fr',
    title: 'Se loger à Asagaya : le calme résidentiel sur la ligne Chuo (2026)',
    description: 'Loyers, profil du quartier et bons plans pour se loger à Asagaya en 2026 : le calme d\'un quartier résidentiel avec l\'accès de la Chuo.',
    date: '2026-06-28',
    readingTime: '5 min',
    content: `
À une station de Koenji sur la ligne Chuo, Asagaya offre un calme résidentiel rare à ce niveau de prix et d'accès. Voici le guide logement 2026.

**Réponse rapide :** Se loger à Asagaya coûte 68 000 à 88 000 JPY/mois pour un studio 1K, à 12 minutes de Shinjuku. Quartier résidentiel paisible, connu pour sa scène jazz, sa rue commerçante couverte (Pearl Center) et son festival d'Awa Odori. Idéal pour qui veut le calme sans s'éloigner du centre.


![Loyer médian d'un studio 1K par arrondissement de Tokyo, en carte (2026)](/tokyo-rent-map.png "Où se situe ce quartier : loyer médian 1K dans les 23 arrondissements, sur 528 660 annonces réelles actives")
## Pourquoi choisir Asagaya ?

- 12 minutes de Shinjuku (ligne Chuo/Sobu).
- Pearl Center : longue galerie commerçante couverte, vie de quartier authentique.
- Ambiance calme et littéraire, scène jazz, festivals animés (Awa Odori en août).

## Combien coûte un logement à Asagaya ?

| Type | Loyer mensuel | Profil |
|---|---|---|
| Chambre en share house | 43 000-72 000 JPY | budget, sans garant |
| Studio 1K (20-25 m²) | 68 000-88 000 JPY | célibataire |
| 1LDK (30-45 m²) | 105 000-150 000 JPY | couple, famille |

## Le profil du quartier

Asagaya séduit ceux qui veulent une vie de quartier tranquille : cafés, restaurants familiaux et ruelles paisibles, tout en restant sur la Chuo. Apprécié des familles et de ceux qui fuient l'agitation, sans sacrifier l'accès au centre.

## Se loger à Asagaya malin

- Share house : sans garant, installation rapide (voir [le guide gaijin house](/blog/gaijin-house-tokyo-guide)).
- Stations voisines de la Chuo : Koenji, Ogikubo, Nishi-Ogikubo.
- Anticipez les [frais cachés d'une location](/blog/frais-caches-location-tokyo) sur un bail classique.

Asagaya, c'est le calme d'un quartier résidentiel avec l'accès de la Chuo : un équilibre rare pour vivre Tokyo sereinement.

---

*À lire aussi : [se loger à Koenji](/blog/se-loger-koenji-quartier-guide) et [share house à Tokyo](/blog/share-house-tokyo-guide-complet).*
    `.trim(),
  },
  {
    slug: 'se-loger-kichijoji-quartier-guide',
    locale: 'fr',
    title: 'Se loger à Kichijoji : le quartier préféré des Tokyoïtes (2026)',
    description: 'Loyers, profil du quartier et bons plans pour se loger à Kichijoji en 2026 : parc, shopping et qualité de vie à quinze minutes du centre.',
    date: '2026-06-28',
    readingTime: '5 min',
    content: `
Régulièrement élu quartier le plus agréable où vivre à Tokyo, Kichijoji combine parc, shopping et ambiance détendue. Voici le guide logement 2026.

**Réponse rapide :** Se loger à Kichijoji coûte 75 000 à 100 000 JPY/mois pour un studio 1K, à 15 minutes de Shinjuku. Adossé au parc d'Inokashira, le quartier offre verdure, boutiques, restaurants et une atmosphère très prisée des familles comme des jeunes actifs. Un peu plus cher que Koenji, mais un cadre de vie exceptionnel.


![Loyer médian d'un studio 1K par arrondissement de Tokyo, en carte (2026)](/tokyo-rent-map.png "Où se situe ce quartier : loyer médian 1K dans les 23 arrondissements, sur 528 660 annonces réelles actives")
## Pourquoi choisir Kichijoji ?

- 15 minutes de Shinjuku (ligne Chuo/Sobu) + ligne Keio Inokashira vers Shibuya.
- Parc d'Inokashira : lac, verdure et balades, l'un des plus beaux de Tokyo.
- Shopping (Sun Road, Harmonica Yokocho), restaurants, vie culturelle riche.

## Combien coûte un logement à Kichijoji ?

| Type | Loyer mensuel | Profil |
|---|---|---|
| Chambre en share house | 48 000-78 000 JPY | budget, sans garant |
| Studio 1K (20-25 m²) | 75 000-100 000 JPY | célibataire |
| 1LDK (30-45 m²) | 120 000-170 000 JPY | couple, famille |

## Le profil du quartier

Kichijoji attire ceux qui veulent un équilibre parfait entre nature, commerces et accès au centre. Très prisé des familles grâce au parc et aux écoles, mais aussi des jeunes pour ses bars et ses boutiques. La demande élevée explique des loyers un peu supérieurs aux quartiers voisins.

## Se loger à Kichijoji malin

- Share house : sans garant, rapide (voir [le guide gaijin house](/blog/gaijin-house-tokyo-guide)).
- Stations voisines plus abordables : Mitaka, Nishi-Ogikubo, Inokashira-koen.
- Anticipez les [frais cachés d'une location](/blog/frais-caches-location-tokyo).

Kichijoji, c'est la qualité de vie avant tout : un parc, des commerces, une ambiance douce, à quinze minutes du cœur de Tokyo.

---

*À lire aussi : [se loger à Nakano](/blog/se-loger-nakano-quartier-guide) et [appartement meublé à Tokyo](/blog/appartement-meuble-tokyo-expats-top-5).*
    `.trim(),
  },
  {
    slug: 'se-loger-sangenjaya-quartier-guide',
    locale: 'fr',
    title: 'Se loger à Sangenjaya : Shibuya à portée, en moins cher (2026)',
    description: 'Loyers, profil du quartier et bons plans pour se loger à Sangenjaya en 2026 : à quatre minutes de Shibuya, plein de caractère et plus abordable.',
    date: '2026-06-28',
    readingTime: '5 min',
    content: `
À une station de Shibuya mais bien plus abordable et plein de caractère, Sangenjaya est un favori des jeunes actifs. Voici le guide logement 2026.

**Réponse rapide :** Se loger à Sangenjaya coûte 80 000 à 105 000 JPY/mois pour un studio 1K, à seulement 4 minutes de Shibuya (ligne Den-en-toshi). Le quartier est animé, rempli d'izakayas et de ruelles (Sankaku Chitai), tout en gardant une vraie vie de quartier. Excellent rapport proximité/prix pour qui veut être près de Shibuya sans en payer le prix.


![Loyer mensuel médian d'un studio 1K près de 50 stations de Tokyo (2026)](/tokyo-rent-by-station.png "Où se situe cette station : loyer médian 1K sur 50 stations de Tokyo, sur 528 660 annonces réelles actives")
## Pourquoi choisir Sangenjaya ?

- 4 minutes de Shibuya (ligne Den-en-toshi).
- Sankaku Chitai : labyrinthe de petits bars et restaurants, ambiance authentique.
- Vie de quartier dynamique, marchés, cafés, prisé des jeunes actifs.

## Combien coûte un logement à Sangenjaya ?

| Type | Loyer mensuel | Profil |
|---|---|---|
| Chambre en share house | 50 000-82 000 JPY | budget, sans garant |
| Studio 1K (20-25 m²) | 80 000-105 000 JPY | célibataire |
| 1LDK (30-45 m²) | 130 000-180 000 JPY | couple |

## Le profil du quartier

Sangenjaya offre l'énergie de Shibuya à quatre minutes, mais avec une âme de quartier que le grand hub a perdue. On y trouve une scène gastronomique vivante, des bars minuscules et une communauté de jeunes professionnels. Le compromis idéal entre centralité et qualité de vie.

## Se loger à Sangenjaya malin

- Share house : sans garant, installation rapide (voir [le guide gaijin house](/blog/gaijin-house-tokyo-guide)).
- Stations voisines : Ikejiri-Ohashi, Komazawa-Daigaku, Shimokitazawa à pied.
- Anticipez les [frais cachés d'une location](/blog/frais-caches-location-tokyo).

Sangenjaya, c'est Shibuya à portée de marche, avec le charme d'un quartier vivant et des loyers plus doux.

---

*À lire aussi : [se loger à Shibuya](/blog/se-loger-shibuya-quartier-guide) et [share house à Tokyo](/blog/share-house-tokyo-guide-complet).*
    `.trim(),
  },
  {
    slug: 'living-shibuya-housing-guide',
    locale: 'en',
    title: 'Living in Shibuya: Rent, Neighbourhood Profile and Tips (2026)',
    description: 'How much housing costs in Shibuya, what the neighbourhood is like, and how to move in without blowing your budget in 2026.',
    date: '2026-06-28',
    readingTime: '5 min',
    content: `
Shibuya is one of Tokyo's most sought-after neighbourhoods, and one of the most expensive. Here is what to expect on housing in 2026, and how to live there without blowing your budget.

**Quick answer:** Living in Shibuya costs around 100,000 to 150,000 JPY/month for a small 1K, more for a 1LDK. The area offers unmatched transport access, intense nightlife and culture, but little space for the price. To live there affordably, target a share house (50,000-90,000 JPY) or a neighbouring district with better value.


![Median monthly rent for a 1K studio near 50 Tokyo stations (2026)](/tokyo-rent-by-station.png "Where this station sits: median 1K rent across 50 Tokyo stations, from 528,660 real active listings")
## Why choose Shibuya?

- A major transport hub: JR Yamanote, Ginza, Hanzomon, Fukutoshin, Den-en-toshi.
- The epicentre of fashion, youth culture, cafes and nightlife.
- Quiet residential pockets a short walk away: Tomigaya, Shoto, Kamiyama.

## How much does housing cost in Shibuya?

| Type | Monthly rent | Profile |
|---|---|---|
| Share house room | 50,000-90,000 JPY | budget, no guarantor |
| 1K studio (20-25 m²) | 100,000-150,000 JPY | single, central |
| 1LDK (30-45 m²) | 160,000-250,000 JPY | couple, comfort |

On a standard lease, add key money (1-2 months), deposit (1-2 months) and agency fees, so move-in can reach 4-6 months of rent.

## The neighbourhood profile

Shibuya is young, dense and lively. Ideal if you love the buzz and being at the centre of everything, less so if you want quiet or space. The streets behind the station (Tomigaya, Kamiyama) offer a good compromise.

## Living in Shibuya affordably

- Target a share house: no guarantor, no key money, move in within days (see our [gaijin house guide](/blog/gaijin-house-tokyo-guide)).
- Widen by one station: Yoyogi-Uehara, Sasazuka or Ikejiri-Ohashi give comparable access for 20-30% less.

Shibuya costs more, but it is one of the best bases for living Tokyo to the full. With a share house or one station out, you can reach it without overspending.

---

*See also: [furnished apartments in Tokyo](/blog/furnished-apartment-tokyo-top-5-expats) and [how to find an apartment in Tokyo as a foreigner](/blog/find-apartment-tokyo-foreigner).*
    `.trim(),
  },
  {
    slug: 'living-nakano-housing-guide',
    locale: 'en',
    title: 'Living in Nakano: Great Value One Stop from Shinjuku (2026)',
    description: 'Rent, neighbourhood profile and tips for living in Nakano in 2026: Shinjuku-level access without the central price tag.',
    date: '2026-06-28',
    readingTime: '5 min',
    content: `
One station from Shinjuku but far more affordable, Nakano is one of Tokyo's best value picks for an expat. Here is the neighbourhood profile and rents in 2026.

**Quick answer:** Living in Nakano costs 70,000 to 95,000 JPY/month for a 1K studio, around 20-30% less than Shinjuku, just 5 minutes away by train. It is residential yet lively, famous for Nakano Broadway and its pop culture. Ideal for central access without central prices.


![Median monthly rent for a 1K studio near 50 Tokyo stations (2026)](/tokyo-rent-by-station.png "Where this station sits: median 1K rent across 50 Tokyo stations, from 528,660 real active listings")
## Why choose Nakano?

- 5 minutes from Shinjuku (Chuo/Sobu line), direct access across Tokyo.
- Nakano Broadway: a temple of subculture (manga, figures, vintage).
- Residential feel, shopping streets (Sun Mall), affordable restaurants.

## How much does housing cost in Nakano?

| Type | Monthly rent | Profile |
|---|---|---|
| Share house room | 45,000-75,000 JPY | budget, no guarantor |
| 1K studio (20-25 m²) | 70,000-95,000 JPY | single |
| 1LDK (30-45 m²) | 110,000-160,000 JPY | couple |

## The neighbourhood profile

Nakano appeals to those who want to live like a local: covered markets, izakayas and a real neighbourhood feel, while being 5 minutes from Tokyo's biggest hub. The further from the station, the quieter and cheaper.

## Living in Nakano smartly

- Share house: no guarantor, quick move-in (see our [gaijin house guide](/blog/gaijin-house-tokyo-guide)).
- Cheaper nearby stations: Higashi-Nakano, Numabukuro, Araiyakushi-mae.

Nakano is the winning compromise: Shinjuku access, a calm residential feel, and rent that lets your budget breathe.

---

*See also: [furnished apartments in Tokyo](/blog/furnished-apartment-tokyo-top-5-expats) and [gaijin house in Tokyo](/blog/gaijin-house-tokyo-guide).*
    `.trim(),
  },
  {
    slug: 'living-ikebukuro-housing-guide',
    locale: 'en',
    title: 'Living in Ikebukuro: Big Hub, Affordable Rent (2026)',
    description: 'Rent, neighbourhood profile and tips for living in Ikebukuro in 2026: the power of a major hub at a gentler price than Shibuya.',
    date: '2026-06-28',
    readingTime: '5 min',
    content: `
Ikebukuro is one of Tokyo's largest hubs, and one of the most affordable among the major centres. Here is what to expect on housing in 2026.

**Quick answer:** Living in Ikebukuro costs 75,000 to 105,000 JPY/month for a 1K studio, more affordable than Shibuya or Shinjuku for comparable centrality. A huge station, shopping and Sunshine City put everything on your doorstep. A solid pick for a major hub without the south-west Tokyo budget.


![Median monthly rent for a 1K studio near 50 Tokyo stations (2026)](/tokyo-rent-by-station.png "Where this station sits: median 1K rent across 50 Tokyo stations, from 528,660 real active listings")
## Why choose Ikebukuro?

- A major hub: Yamanote, Marunouchi, Fukutoshin, private lines to Saitama.
- Sunshine City, department stores, restaurants, nightlife.
- Known to be more affordable than the southern hubs (Shibuya, Shinjuku).

## How much does housing cost in Ikebukuro?

| Type | Monthly rent | Profile |
|---|---|---|
| Share house room | 48,000-80,000 JPY | budget, no guarantor |
| 1K studio (20-25 m²) | 75,000-105,000 JPY | single |
| 1LDK (30-45 m²) | 120,000-180,000 JPY | couple |

## The neighbourhood profile

Ikebukuro is dense, lively and practical. The west side is shopping and nightlife; the east, around Sunshine City, is more family-oriented. As you move away from the station (towards Mejiro, Kanamecho, Senkawa), it gets quieter and cheaper.

## Living in Ikebukuro smartly

- Share house: no guarantor, quick (see our [gaijin house guide](/blog/gaijin-house-tokyo-guide)).
- Nearby stations: Mejiro, Kanamecho, Shiinamachi, calmer and cheaper.

Ikebukuro offers the power of a major hub at a gentler price: ideal for living at the heart of the action without the Shibuya budget.

---

*See also: [living in Nakano](/blog/living-nakano-housing-guide) and [furnished apartments in Tokyo](/blog/furnished-apartment-tokyo-top-5-expats).*
    `.trim(),
  },
  {
    slug: 'living-koenji-housing-guide',
    locale: 'en',
    title: 'Living in Koenji: Tokyo\'s Bohemian, Affordable District (2026)',
    description: 'Rent, neighbourhood profile and tips for living in Koenji in 2026: Tokyo\'s creative hideout at a small price.',
    date: '2026-06-28',
    readingTime: '5 min',
    content: `
Koenji is Tokyo's bohemian hideout: live music, vintage shops, izakayas, and some of the gentlest rents on the Chuo line. Here is the 2026 housing guide.

**Quick answer:** Living in Koenji costs 65,000 to 88,000 JPY/month for a 1K studio, excellent value 10 minutes from Shinjuku. A young, creative and friendly district famous for its vintage shops, music scene and small restaurants. Ideal for a tight budget without giving up atmosphere.


![Median 1K studio rent by Tokyo ward, mapped (2026)](/tokyo-rent-map.png "Where this area sits: median 1K rent across the 23 wards, from 528,660 real active listings")
## Why choose Koenji?

- 10 minutes from Shinjuku (Chuo/Sobu line).
- The capital of vintage clothing, an indie and rock scene, neighbourhood festivals (Awa Odori).
- Gentle rents, a warm neighbourhood feel, cheap restaurants.

## How much does housing cost in Koenji?

| Type | Monthly rent | Profile |
|---|---|---|
| Share house room | 42,000-70,000 JPY | budget, no guarantor |
| 1K studio (18-23 m²) | 65,000-88,000 JPY | single |
| 1LDK (28-40 m²) | 100,000-145,000 JPY | couple |

## The neighbourhood profile

Koenji draws artists, students and young professionals after authenticity. The vibe is relaxed and creative, far from Shibuya's gloss. The lanes are full of tiny bars and vintage shops. One of Tokyo's most endearing districts.

## Living in Koenji smartly

- Share house: no guarantor, quick move-in (see our [gaijin house guide](/blog/gaijin-house-tokyo-guide)).
- Nearby Chuo stations: Asagaya, Higashi-Koenji, Shin-Koenji.

Koenji is the soul of Tokyo on a budget: character, community, and rent that leaves you something to enjoy it with.

---

*See also: [living in Nakano](/blog/living-nakano-housing-guide) and [furnished apartments in Tokyo](/blog/furnished-apartment-tokyo-top-5-expats).*
    `.trim(),
  },
  {
    slug: 'living-asagaya-housing-guide',
    locale: 'en',
    title: 'Living in Asagaya: Quiet Residential Calm on the Chuo Line (2026)',
    description: 'Rent, neighbourhood profile and tips for living in Asagaya in 2026: residential calm with Chuo line access.',
    date: '2026-06-28',
    readingTime: '5 min',
    content: `
One station from Koenji on the Chuo line, Asagaya offers residential calm that is rare at this level of price and access. Here is the 2026 housing guide.

**Quick answer:** Living in Asagaya costs 68,000 to 88,000 JPY/month for a 1K studio, 12 minutes from Shinjuku. A peaceful residential district known for its jazz scene, its covered shopping street (Pearl Center) and its Awa Odori festival. Ideal for calm without leaving the centre behind.


![Median 1K studio rent by Tokyo ward, mapped (2026)](/tokyo-rent-map.png "Where this area sits: median 1K rent across the 23 wards, from 528,660 real active listings")
## Why choose Asagaya?

- 12 minutes from Shinjuku (Chuo/Sobu line).
- Pearl Center: a long covered shopping arcade with a genuine local feel.
- A calm, literary atmosphere, a jazz scene and lively festivals (Awa Odori in August).

## How much does housing cost in Asagaya?

| Type | Monthly rent | Profile |
|---|---|---|
| Share house room | 43,000-72,000 JPY | budget, no guarantor |
| 1K studio (20-25 m²) | 68,000-88,000 JPY | single |
| 1LDK (30-45 m²) | 105,000-150,000 JPY | couple, family |

## The neighbourhood profile

Asagaya appeals to those who want a quiet neighbourhood life: cafes, family restaurants and peaceful lanes, while staying on the Chuo line. Popular with families and anyone escaping the bustle without sacrificing central access.

## Living in Asagaya smartly

- Share house: no guarantor, quick move-in (see our [gaijin house guide](/blog/gaijin-house-tokyo-guide)).
- Nearby Chuo stations: Koenji, Ogikubo, Nishi-Ogikubo.

Asagaya is the calm of a residential district with Chuo line access: a rare balance for living Tokyo at ease.

---

*See also: [living in Koenji](/blog/living-koenji-housing-guide) and [furnished apartments in Tokyo](/blog/furnished-apartment-tokyo-top-5-expats).*
    `.trim(),
  },
  {
    slug: 'living-kichijoji-housing-guide',
    locale: 'en',
    title: 'Living in Kichijoji: Tokyoites\' Favourite Neighbourhood (2026)',
    description: 'Rent, neighbourhood profile and tips for living in Kichijoji in 2026: park, shopping and quality of life fifteen minutes from the centre.',
    date: '2026-06-28',
    readingTime: '5 min',
    content: `
Regularly voted the most pleasant place to live in Tokyo, Kichijoji combines a park, shopping and a relaxed vibe. Here is the 2026 housing guide.

**Quick answer:** Living in Kichijoji costs 75,000 to 100,000 JPY/month for a 1K studio, 15 minutes from Shinjuku. Backing onto Inokashira Park, it offers greenery, shops, restaurants and an atmosphere prized by families and young professionals alike. A little pricier than Koenji, but an exceptional setting.


![Median 1K studio rent by Tokyo ward, mapped (2026)](/tokyo-rent-map.png "Where this area sits: median 1K rent across the 23 wards, from 528,660 real active listings")
## Why choose Kichijoji?

- 15 minutes from Shinjuku (Chuo/Sobu) plus the Keio Inokashira line to Shibuya.
- Inokashira Park: a lake, greenery and walks, one of Tokyo's finest.
- Shopping (Sun Road, Harmonica Yokocho), restaurants and a rich cultural life.

## How much does housing cost in Kichijoji?

| Type | Monthly rent | Profile |
|---|---|---|
| Share house room | 48,000-78,000 JPY | budget, no guarantor |
| 1K studio (20-25 m²) | 75,000-100,000 JPY | single |
| 1LDK (30-45 m²) | 120,000-170,000 JPY | couple, family |

## The neighbourhood profile

Kichijoji draws those who want a perfect balance of nature, shops and central access. Very popular with families thanks to the park and schools, but also with young people for its bars and boutiques. High demand explains slightly higher rents than neighbouring areas.

## Living in Kichijoji smartly

- Share house: no guarantor, quick (see our [gaijin house guide](/blog/gaijin-house-tokyo-guide)).
- More affordable nearby stations: Mitaka, Nishi-Ogikubo, Inokashira-koen.

Kichijoji is about quality of life first: a park, shops and a gentle atmosphere, fifteen minutes from the heart of Tokyo.

---

*See also: [living in Nakano](/blog/living-nakano-housing-guide) and [furnished apartments in Tokyo](/blog/furnished-apartment-tokyo-top-5-expats).*
    `.trim(),
  },
  {
    slug: 'living-sangenjaya-housing-guide',
    locale: 'en',
    title: 'Living in Sangenjaya: Shibuya Within Reach, For Less (2026)',
    description: 'Rent, neighbourhood profile and tips for living in Sangenjaya in 2026: four minutes from Shibuya, full of character and more affordable.',
    date: '2026-06-28',
    readingTime: '5 min',
    content: `
One station from Shibuya yet far more affordable and full of character, Sangenjaya is a favourite of young professionals. Here is the 2026 housing guide.

**Quick answer:** Living in Sangenjaya costs 80,000 to 105,000 JPY/month for a 1K studio, just 4 minutes from Shibuya (Den-en-toshi line). The area is lively, full of izakayas and lanes (Sankaku Chitai), yet keeps a real neighbourhood feel. Excellent value for being so close to Shibuya without paying its price.


![Median monthly rent for a 1K studio near 50 Tokyo stations (2026)](/tokyo-rent-by-station.png "Where this station sits: median 1K rent across 50 Tokyo stations, from 528,660 real active listings")
## Why choose Sangenjaya?

- 4 minutes from Shibuya (Den-en-toshi line).
- Sankaku Chitai: a maze of tiny bars and restaurants, an authentic vibe.
- A dynamic neighbourhood life, markets and cafes, popular with young professionals.

## How much does housing cost in Sangenjaya?

| Type | Monthly rent | Profile |
|---|---|---|
| Share house room | 50,000-82,000 JPY | budget, no guarantor |
| 1K studio (20-25 m²) | 80,000-105,000 JPY | single |
| 1LDK (30-45 m²) | 130,000-180,000 JPY | couple |

## The neighbourhood profile

Sangenjaya offers Shibuya's energy four minutes away, but with a neighbourhood soul the big hub has lost. You will find a lively food scene, tiny bars and a community of young professionals. The ideal compromise between centrality and quality of life.

## Living in Sangenjaya smartly

- Share house: no guarantor, quick move-in (see our [gaijin house guide](/blog/gaijin-house-tokyo-guide)).
- Nearby stations: Ikejiri-Ohashi, Komazawa-Daigaku, Shimokitazawa on foot.

Sangenjaya is Shibuya within walking distance, with the charm of a lively district and gentler rents.

---

*See also: [living in Shibuya](/blog/living-shibuya-housing-guide) and [furnished apartments in Tokyo](/blog/furnished-apartment-tokyo-top-5-expats).*
    `.trim(),
  },
  {
    slug: 'social-apartments-tokyo-guide',
    locale: 'en',
    title: 'Social Apartments in Tokyo: Next-Generation Shared Living (2026)',
    description: 'The social apartment, a premium take on the share house: designed common spaces, an active community, no guarantor. Costs, how to apply and who it suits in 2026.',
    date: '2026-06-28',
    readingTime: '8 min',
    content: `
The "social apartment" is a higher-end category of shared housing that more and more expats in Tokyo are choosing. Here is what it is, what it costs, how to apply, and who it suits in 2026.

**Quick answer:** A social apartment is a premium version of the share house: you rent a private furnished room, but the building is built around large, well-designed common spaces (a lounge, a designer kitchen, often a co-working room, a gym, a theatre room or a rooftop). Expect 70,000 to 130,000 JPY per month, with no guarantor, no key money and no agency fee. It suits anyone who wants the social life of a share house in a more polished, hotel-like setting.

> **From the field.** The community in a social apartment is real, but it depends on two things: the operator actually running events, and the mix of residents at that moment. Two buildings from the same brand can feel completely different. If you can, visit at an odd hour and see whether the common spaces are actually used.
## What is a social apartment?

Born in Japan in the 2010s, the social apartment concept bets on the quality of its shared spaces to get residents to actually meet. Unlike a basic share house, the focus is on design, amenities and an active community. Your room stays fully private and lockable; everything else, the kitchen, lounge, work areas and events, is shared. Buildings are typically larger than a share house, from 30 to more than 150 rooms, which is what makes the communal facilities viable.

## What is included

Most social apartments bundle far more than a room:

- A private furnished room (bed, desk, storage, sometimes an ensuite).
- Utilities, water and high-speed internet, usually all-in.
- Fully equipped shared kitchens and dining lounges.
- Extras a normal apartment never has: gym, cinema room, music or craft studio, co-working space, rooftop terrace, sometimes a cafe or bar.
- Cleaning of the common areas, and basic supplies.
- Community events organised by the operator.

Because everything is bundled, your monthly figure is close to your true all-in cost, which makes budgeting simple. Compare that with a private studio, where you add move-in fees, furniture, utilities and internet on top (see our [cost of living guide](/blog/tokyo-expat-cost-of-living-2026)).

## How much does a social apartment cost?

| Room type | Monthly rent | Deposit |
|---|---|---|
| Standard room | 70,000-100,000 JPY | ~1 month |
| Premium / central room | 100,000-130,000 JPY | ~1 month |
| En-suite / large room | 120,000-160,000 JPY | ~1 month |

No key money (reikin), no agency fee, and usually a deposit of around one month that is partly refundable. This is the big financial advantage over a normal lease, where move-in costs often reach four to six months of rent. For the full breakdown of hidden move-in fees, see our [rental traps guide](/blog/tokyo-rental-traps-foreigners).

## Social apartment vs share house vs private studio

| | Share house | Social apartment | Private studio |
|---|---|---|---|
| Monthly rent | 45,000-90,000 | 70,000-130,000 | 90,000-160,000 |
| Move-in cost | Very low | Very low | High (4-6 months) |
| Guarantor | Usually none | None | Often required |
| Community | Functional | Strong, curated | None |
| Privacy | Medium | Medium | Full |

In short: a [share house](/blog/share-house-tokyo-guide-2026) is the cheapest way in, a private studio gives you full privacy but the heaviest upfront cost, and the social apartment sits in between, trading a little privacy for design, facilities and a ready-made social circle. If you are weighing these, our [gaijin house vs share house](/blog/gaijin-house-vs-share-house-tokyo) comparison goes deeper.

## How to apply (and why there is no guarantor)

The application is far lighter than a standard Japanese lease:

1. Pick a building and an available room online.
2. Send your ID (passport or residence card) and proof you can pay.
3. Sign a simple occupancy agreement, often available in English.
4. Pay the first month plus the small deposit, and move in on the agreed date.

Because you sign with the operator rather than an individual landlord, there is normally no guarantor and no guarantor-company screening, which is exactly the hurdle that trips up many newcomers (see [why Japanese landlords reject foreigners](/blog/why-japanese-landlords-reject-foreigners)). Minimum stays are usually one to three months, much shorter than the standard two-year lease, so a social apartment is a strong first base while you find your feet.

## Best areas for social apartments in Tokyo

Operators cluster their buildings around lifestyle wards with good transport: Setagaya, Meguro, Shibuya, Shinjuku and along the Chuo and Yamanote lines. Central rooms near Shibuya or Nakameguro sit at the top of the range; a few stops out toward Sangenjaya, Koenji or Nakano you get the same facilities for noticeably less. For neighbourhood context, see our [Tokyo neighbourhoods guide](/blog/tokyo-neighbourhoods-expats-guide).

## Who is it for?

A social apartment suits people who want to meet others while enjoying a good setting: young professionals, creatives, remote workers and expats on the move. It is less suited if you need total privacy, a family setup, or a long-term unfurnished home (in that case see [how to find an apartment](/blog/find-apartment-tokyo-foreigner)).

*From running furnished rentals in Tokyo, the residents happiest in a social apartment are the ones who treat the common spaces as the point, not a bonus. If you know you will keep your door shut and stay in your room, you are paying a premium for facilities you will not use, and a plain studio is better value.*

## Frequently asked questions

**Are social apartments good for foreigners?** Yes. No guarantor, English-friendly contracts and an instant community make them one of the easiest ways to land in Tokyo.

**What is the minimum stay?** Usually one to three months, versus two years for a standard lease.

**Can couples live in a social apartment?** Some operators offer larger or twin rooms for couples, but many rooms are single-occupancy, so check per building.

**Is it the same as a share house?** No. A share house is simpler and cheaper; a social apartment is a larger, design-led building with hotel-style facilities and a curated community.

The social apartment is the best of both worlds: the easy, low-cost entry of a share house, with the comfort and community of a premium residence.

---

*See also: [furnished apartments in Tokyo](/blog/furnished-apartment-tokyo-top-5-expats), [share house guide](/blog/share-house-tokyo-guide-2026) and [gaijin house in Tokyo](/blog/gaijin-house-tokyo-guide).*
    `.trim(),
  },
  {
    slug: 'bank-transfer-japan-furikomi-guide',
    locale: 'en',
    title: 'How to Make a Bank Transfer in Japan (Furikomi): Step by Step',
    description: 'Furikomi explained: transfer money at an ATM or online, the details you need, fees and timing. Paying rent and bills in Japan.',
    date: '2026-06-28',
    readingTime: '5 min',
    content: `
Paying rent, repaying a friend, settling a bill: in Japan almost everything goes through the bank transfer, the furikomi. Here is how to do it, step by step, in 2026.

**Quick answer:** Furikomi (振込) is the Japanese bank transfer. You can do it at an ATM, through your bank's app, or in branch. You need the bank name, the branch, the account type and number, and the recipient's name in katakana. Fees range from 0 to 880 JPY depending on the bank and method. A transfer to another bank takes from a few hours to one business day.


![The order of steps to settle in Tokyo: visa, residence card, bank, guarantor, lease](/tokyo-process-en.png "Your residence card unlocks everything, get it on day 1")
## What you need

- The bank and branch name (支店 shiten)
- The account type (普通 futsuu = ordinary)
- The account number (口座番号)
- The recipient's name in katakana

## Making a furikomi at an ATM

1. Insert your card and choose 振込 (furikomi).
2. Select the destination bank, then the branch.
3. Enter the account number and the amount.
4. Check the recipient name that appears.
5. Confirm and keep the receipt.

## Making a furikomi online

Online banks (Sony Bank, Rakuten) and the Japan Post app let you transfer from your phone, often with reduced or zero fees to internal accounts. To open a suitable account, see our [bank account guide](/blog/open-bank-account-japan-foreigner).

## Fees and timing to know

- **Internal transfer** (same bank): often free.
- **External transfer:** 110 to 880 JPY depending on the bank and channel (the ATM costs more than mobile).
- **Timing:** instant to one business day; beware of transfers late at night or at the weekend.

Mastering furikomi means handling rent, bills and repayments smoothly in Japan: a basic skill of daily life.

---

*See also: [opening a bank account in Japan](/blog/open-bank-account-japan-foreigner) and [furnished apartments in Tokyo](/blog/furnished-apartment-tokyo-top-5-expats).*
    `.trim(),
  },
  {
    slug: 'health-insurance-visa-japan-2027',
    locale: 'en',
    title: 'Unpaid Health Insurance Could Threaten Your Visa in Japan (2027 Rule)',
    description: 'From 2027, unpaid national health insurance or pension could complicate visa renewals in Japan. How to stay compliant.',
    date: '2026-06-28',
    readingTime: '5 min',
    content: `
From 2027, failing to keep up with your health insurance or pension could complicate your visa renewal in Japan. Here is what you need to know to stay compliant.

**Quick answer:** Japan plans, from 2027, to check payment of national health insurance (kokumin kenko hoken) and pension during visa renewal or status-change applications. In practice, a foreigner who has not paid their contributions risks a refusal or stricter review. Staying up to date becomes essential to secure your visa.


![The order of steps to settle in Tokyo: visa, residence card, bank, guarantor, lease](/tokyo-process-en.png "Your residence card unlocks everything, get it on day 1")
## What changes in 2027

Until now, payment of health insurance and pension was not systematically checked at visa renewal. From 2027, immigration plans to cross-reference this data. A history of non-payment could weigh on the decision.

## Who is affected?

Any foreign resident enrolled in the national system (kokumin kenko hoken + kokumin nenkin), mainly the self-employed, students and people without company insurance. Employees covered by shakai hoken (deducted from salary) are compliant by default.

## How to stay compliant

- Enrol in insurance as soon as you arrive at city hall (see our [health insurance guide](/blog/japan-health-insurance-expat-guide)).
- Pay your contributions on time and keep the receipts.
- On low income, apply for an exemption (減免 genmen) rather than not paying.
- Keep your proof of payment for your renewal file.

## What to do if you are behind

Catch up as soon as possible and ask for an instalment plan if needed. An official exemption is always better than simple non-payment, which leaves a negative mark on your record.

Anticipating this rule protects both your health and your right to stay. Get compliant on arrival: it is the best insurance for your visa.

---

*See also: [health insurance in Japan](/blog/japan-health-insurance-expat-guide) and [income tax for foreigners in Japan](/blog/japan-income-tax-foreigners-guide).*
    `.trim(),
  },
  {
    slug: 'gaijin-house-tokyo-guide-complet',
    locale: 'fr',
    title: 'Gaijin house à Tokyo : guide complet pour étrangers (2026)',
    description: 'Ce qu\'est une gaijin house, les coûts réels en 2026, avantages et limites, et comment obtenir une chambre à Tokyo sans garant ni argent-clé.',
    date: '2026-06-28',
    readingTime: '6 min',
    content: `
La gaijin house est souvent le premier logement d'un étranger à Tokyo. Économique, flexible, elle contourne les obstacles qui ferment le marché locatif classique aux nouveaux arrivants. Voici comment ça marche en 2026.

**Réponse rapide :** Une gaijin house est un logement partagé pensé pour les étrangers : chambre privée meublée, cuisine et salle de bains communes, sans garant japonais, sans argent-clé, installation en quelques jours. Comptez 40 000 à 80 000 JPY/mois, charges souvent incluses. C'est le moyen le plus rapide et le moins cher d'obtenir une adresse à Tokyo.

> **Vu du terrain.** Une gaijin house vaut ce que vaut son opérateur, pas son prix. Les moins chères, mal gérées, se vident aussi vite qu'elles se remplissent. Avant de réserver, regardez la vitesse à laquelle l'opérateur répond à votre premier email : ça en dit plus que les photos.

![Loyer médian d'un studio 1K par arrondissement de Tokyo, en carte (2026)](/tokyo-rent-map.png "Loyer médian 1K dans les 23 arrondissements, sur 528 660 annonces réelles actives")
## Qu'est-ce qu'une gaijin house ?

"Gaijin house" (外人ハウス) signifie littéralement "maison d'étrangers". Le terme remonte aux années 1990, quand quelques opérateurs ont commencé à louer des chambres partagées aux étrangers exclus du marché classique. Aujourd'hui, la frontière avec la share house moderne s'est estompée : les deux offrent des chambres privées meublées avec espaces communs, gérées par un opérateur professionnel.

Ce qui définit encore la gaijin house, c'est sa vocation : loger des résidents étrangers sans garant japonais, sans compte bancaire local ni japonais courant. On signe en anglais, on paie une petite caution au lieu de l'argent-clé, et on emménage en quelques jours.

## Combien coûte une gaijin house ?

| Type | Loyer mensuel | Caution | Charges |
|---|---|---|---|
| Lit en dortoir | 30 000-45 000 JPY | minime | souvent incluses |
| Chambre privée (standard) | 45 000-70 000 JPY | ~1 mois | souvent incluses |
| Chambre privée (centrale) | 70 000-100 000 JPY | ~1 mois | souvent incluses |

En plus du loyer, prévoyez des frais uniques d'administration et de ménage de 10 000 à 30 000 JPY. Pas de reikin (argent-clé), pas de commission d'agence : c'est ce qui rend l'entrée en gaijin house bien moins chère qu'un appartement classique, où l'on peut payer 4 à 6 mois d'avance.

## Gaijin house, share house ou appartement ?

- **Gaijin house / share house** : sans garant, meublée, emménagement en une semaine, ambiance sociale, espace privé réduit. Idéal pour les nouveaux arrivants et les petits budgets.
- **Monthly mansion** : studio privé avec cuisine et salle de bains, sans garant, 80 000 à 200 000 JPY/mois. Idéal pour l'intimité et une adresse pour les démarches.
- **Appartement classique** : vraie surface et bail long, mais garant (ou société de garantie), argent-clé et processus de 2 à 4 semaines.

Pour le détail, voir [le guide appartement meublé](/blog/appartement-meuble-tokyo-expats-top-5) et [le guide share house](/blog/share-house-tokyo-guide-complet).

## Pour qui ?

La gaijin house a le plus de sens si vous arrivez sous quelques semaines et avez besoin d'une adresse rapidement, si vous n'avez pas encore de garant ni de compte bancaire, ou si vous voulez garder vos premiers mois flexibles. Elle est moins adaptée aux familles ou à qui veut une intimité totale, pour qui un [appartement classique](/blog/trouver-appartement-tokyo-etranger) devient plus économique.

## Comment obtenir une chambre

1. Définissez votre budget et le type (dortoir ou chambre privée).
2. Sélectionnez par ligne de train et temps de trajet.
3. Candidatez en ligne : la plupart des opérateurs acceptent depuis l'étranger avec passeport et visa.
4. Vérifiez ce qui est inclus (charges, internet, literie) avant de signer.
5. Organisez l'emménagement, souvent possible en une semaine.

Pour une arrivée fluide, réservez votre logement avant d'atterrir, puis réglez votre [carte de résidence et votre compte bancaire](/blog/ouvrir-compte-bancaire-japon-etranger) les premiers jours.

La gaijin house n'est presque jamais un logement définitif, mais c'est la porte d'entrée la plus simple vers Tokyo : une vraie adresse, du temps pour apprendre la ville, et zéro stress de garant.

---

*À lire aussi : [appartement meublé à Tokyo](/blog/appartement-meuble-tokyo-expats-top-5) et [share house à Tokyo](/blog/share-house-tokyo-guide-complet).*
    `.trim(),
  },
  {
    slug: 'trouver-logement-tokyo-deux-semaines-mutation',
    locale: 'fr',
    title: 'Trouver un logement à Tokyo en 2 semaines (mutation pro)',
    description: 'Muté à Tokyo avec deux semaines devant vous ? Plan jour par jour pour décrocher un logement vite : options sans garant, budget réel et erreurs à éviter.',
    date: '2026-06-29',
    readingTime: '7 min',
    content: `
Une mutation tombe rarement avec six mois de préavis. Plus souvent, vous apprenez votre départ pour Tokyo quelques semaines avant, et le compte à rebours commence. Deux semaines pour trouver un logement dans une ville où le marché locatif ferme la porte aux nouveaux arrivants, c'est tendu, mais c'est faisable si vous attaquez par les bonnes options.

**Réponse rapide :** En deux semaines, oubliez le bail classique non meublé (4 à 6 semaines de délai). Visez un logement meublé sans garant : monthly mansion, share house ou appartement meublé court terme. Réservez avant d'atterrir, gardez 250 000 à 400 000 JPY de trésorerie pour l'entrée, et réglez carte de résidence et compte bancaire dès les premiers jours. Le bail long, vous le signerez plus tard, depuis Tokyo, sans stress.


![Délai pour trouver un logement par type à Tokyo](/tokyo-housing-time-fr.png "Share house 1-2 semaines vs location standard 4-8 semaines")
## Pourquoi deux semaines, c'est court (mais jouable)

Le bail japonais classique demande un garant (ou une société de garantie), un dossier validé par le propriétaire (3 à 7 jours ouvrés), et souvent 3 à 5 mois d'avance. Entre la sélection du bien et la remise des clés, comptez 4 à 8 semaines. Ce calendrier est incompatible avec une arrivée sous quinze jours.

La solution n'est pas d'accélérer le bail classique, c'est de le contourner pour vos premiers mois. Les logements meublés sans garant existent précisément pour ça : ils acceptent une candidature à distance, en anglais, sans compte bancaire local, avec emménagement en quelques jours.

## Le plan jour par jour

**Jours -14 à -10 (avant le départ)**
- Fixez votre budget logement réel (loyer + frais d'entrée).
- Choisissez 2 ou 3 quartiers selon le temps de trajet vers le bureau.
- Présélectionnez 5 à 8 logements meublés sans garant et envoyez vos candidatures.

**Jours -9 à -5**
- Confirmez une réservation ferme avec date d'emménagement.
- Demandez par écrit ce qui est inclus (charges, internet, literie).
- Réservez si besoin 3 ou 4 nuits d'hôtel tampon à l'arrivée.

**Jours -4 à 0 (arrivée)**
- Emménagez dans le logement meublé.
- Déclarez votre adresse à la mairie et récupérez votre carte de résidence.
- Lancez l'ouverture du compte bancaire et la carte SIM.

**Jours +1 à +14**
- Installez-vous, testez les trajets, repérez les quartiers en vrai.
- Si vous restez plus d'un an, démarrez en parallèle la recherche d'un bail long, sans pression.

## Les options qui tiennent en deux semaines

| Option | Délai d'entrée | Garant | Budget mensuel |
|---|---|---|---|
| Monthly mansion (studio meublé) | 2 à 5 jours | non | 90 000-200 000 JPY |
| Appartement meublé court terme | 3 à 7 jours | non | 120 000-250 000 JPY |
| Share house / chambre privée | 2 à 7 jours | non | 50 000-100 000 JPY |

Pour une mutation en solo, la share house ou le monthly mansion suffisent largement les premiers mois. Pour un couple ou une famille, visez l'appartement meublé. Le détail des options sans garant est dans le guide [appartement meublé sans garant](/blog/appartement-meuble-tokyo-sans-garant) et le guide [gaijin house](/blog/gaijin-house-tokyo-guide-complet).

## Le budget à prévoir

| Poste | Montant indicatif |
|---|---|
| Premier loyer + caution (meublé) | 150 000-350 000 JPY |
| Frais d'administration / ménage | 10 000-30 000 JPY |
| Hôtel tampon (3-4 nuits) | 30 000-60 000 JPY |
| Trésorerie de sécurité | garder ~100 000 JPY |

Le meublé sans garant coûte plus cher au mois que le bail classique, mais il vous évite les 4 à 6 mois d'avance et le blocage du garant. Sur deux ou trois mois, c'est le prix de la rapidité, et il est largement justifié quand votre date d'arrivée est fixe.

## Les erreurs qui font perdre des jours

- **Viser le bail classique d'emblée.** Vous perdrez votre fenêtre de deux semaines dans l'étude de dossier.
- **Arriver sans logement réservé.** Chercher sur place sans adresse, sans compte et sans japonais, c'est la pire position.
- **Sous-estimer la trésorerie d'entrée.** Beaucoup de paiements se font en liquide ou par virement local avant que votre compte japonais soit actif.
- **Négliger le temps de trajet.** Un loyer plus bas à 50 minutes du bureau coûte cher en fatigue. Arbitrez avec [le guide des loyers par quartier](/blog/loyers-tokyo-par-quartier-2026).

Si votre employeur pilote la relocalisation, partagez-lui [le guide logement pour RH](/blog/relocation-entreprise-tokyo-guide-rh) : il cadre les délais et les budgets côté entreprise.

## Et après l'emménagement

Une fois installé, réglez vite l'administratif : [ouvrir un compte bancaire](/blog/ouvrir-compte-bancaire-japon-etranger), une carte SIM, et l'assurance habitation. Si vous basculez ensuite vers un bail long, relisez [la checklist du bail](/blog/checklist-bail-tokyo) avant de signer.

Deux semaines ne suffisent pas pour un bail classique, mais elles suffisent largement pour une adresse stable, meublée et sans garant. Vous transformez l'urgence en une installation propre, et vous gardez le bail long pour quand vous connaîtrez vraiment la ville.


Pendant la transition, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) propose une assurance sante mensuelle sans engagement, activable des l'arrivee et avant votre inscription a l'assurance japonaise. Pour une ligne mobile des l'aeroport, [Sakura Mobile](https://www.sakuramobile.jp/tokyoexpat-top) propose des forfaits sans justificatif de domicile. *(liens affilies)*
---

*À lire aussi : [chercher un appartement depuis l'étranger](/blog/chercher-appartement-tokyo-depuis-etranger) et [appartement meublé sans garant](/blog/appartement-meuble-tokyo-sans-garant).*
    `.trim(),
  },
  {
    slug: 'find-housing-tokyo-two-weeks-relocation',
    locale: 'en',
    title: 'Find Housing in Tokyo in 2 Weeks: a Relocation Plan',
    description: 'Relocating to Tokyo with only two weeks? A day-by-day plan to secure housing fast: no-guarantor options, real budgets, and the mistakes that cost you days.',
    date: '2026-06-29',
    readingTime: '7 min',
    content: `
A corporate transfer rarely comes with six months' notice. More often you learn you are moving to Tokyo a few weeks out, and the clock starts. Two weeks to find housing in a city whose rental market shuts the door on newcomers is tight, but it is doable if you start with the right options.

**Quick answer:** In two weeks, forget the standard unfurnished lease (4 to 6 weeks to complete). Go for furnished, no-guarantor housing: a monthly mansion, a share house, or a short-term furnished apartment. Book before you land, keep 250,000 to 400,000 JPY of cash for move-in, and sort your residence card and bank account in the first days. You sign the long lease later, from Tokyo, with no pressure.


![Time to find housing by type in Tokyo](/tokyo-housing-time-en.png "Share house 1-2 weeks vs a standard lease 4-8 weeks")
## Why two weeks is tight (but workable)

The standard Japanese lease needs a guarantor (or a guarantor company), landlord screening (3 to 7 business days), and often 3 to 5 months upfront. Between picking a unit and getting the keys, expect 4 to 8 weeks. That timeline does not fit an arrival inside a fortnight.

The fix is not to rush the standard lease, it is to bypass it for your first months. Furnished, no-guarantor housing exists for exactly this: it accepts a remote application, in English, with no local bank account, and move-in within days.

## The day-by-day plan

**Days -14 to -10 (before you leave)**
- Set your real housing budget (rent + move-in fees).
- Pick 2 or 3 neighbourhoods by commute time to the office.
- Shortlist 5 to 8 furnished no-guarantor units and send applications.

**Days -9 to -5**
- Lock a firm booking with a move-in date.
- Get in writing what is included (utilities, internet, bedding).
- Book 3 or 4 buffer hotel nights for arrival if needed.

**Days -4 to 0 (arrival)**
- Move into the furnished unit.
- Register your address at the ward office and collect your residence card.
- Start the bank account and SIM card.

**Days +1 to +14**
- Settle in, test commutes, scout neighbourhoods for real.
- If you are staying over a year, start the long-lease search in parallel, calmly.

## Options that work in two weeks

| Option | Move-in time | Guarantor | Monthly budget |
|---|---|---|---|
| Monthly mansion (furnished studio) | 2 to 5 days | no | 90,000-200,000 JPY |
| Short-term furnished apartment | 3 to 7 days | no | 120,000-250,000 JPY |
| Share house / private room | 2 to 7 days | no | 50,000-100,000 JPY |

For a solo transfer, a share house or monthly mansion is plenty for the first months. For a couple or family, aim for the furnished apartment. The no-guarantor options are detailed in the [furnished apartment without a guarantor guide](/blog/furnished-apartment-tokyo-no-guarantor) and the [gaijin house guide](/blog/gaijin-house-tokyo-guide).

## The budget to plan for

| Item | Indicative amount |
|---|---|
| First rent + deposit (furnished) | 150,000-350,000 JPY |
| Admin / cleaning fee | 10,000-30,000 JPY |
| Buffer hotel (3-4 nights) | 30,000-60,000 JPY |
| Safety cash | keep ~100,000 JPY |

Furnished no-guarantor housing costs more per month than a standard lease, but it spares you the 4 to 6 months upfront and the guarantor hurdle. Over two or three months, that is the price of speed, and it is well worth it when your arrival date is fixed.

## Mistakes that cost you days

- **Targeting the standard lease first.** You will burn your two-week window in screening.
- **Arriving with nothing booked.** Searching on the ground with no address, no account and no Japanese is the worst position.
- **Underestimating move-in cash.** Many payments are cash or local transfer before your Japanese account is active.
- **Ignoring commute time.** Cheaper rent 50 minutes out is expensive in fatigue. Weigh it with the [rent by neighbourhood guide](/blog/tokyo-rent-by-neighborhood-2026).

If your employer is running the relocation, share the [HR housing guide](/blog/corporate-relocation-tokyo-hr-housing-guide): it frames the timeline and budget on the company side.

## After move-in

Once you are settled, clear the admin fast: [open a bank account](/blog/open-bank-account-japan-foreigner), a SIM card, and renters insurance. If you later switch to a long lease, reread the [lease checklist](/blog/tokyo-rental-contract-checklist) before signing.

Two weeks is not enough for a standard lease, but it is plenty for a stable, furnished, no-guarantor address. You turn the rush into a clean landing, and you keep the long lease for when you actually know the city.


During the transition, [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador) offers monthly health insurance with no commitment, activatable from arrival and before your Japanese insurance enrolment. For a mobile line from the airport, [Sakura Mobile](https://www.sakuramobile.jp/tokyoexpat-top) offers plans with no address proof required. *(affiliate links)*
---

*See also: [apartment hunting from abroad](/blog/tokyo-apartment-hunting-from-abroad) and [furnished apartment without a guarantor](/blog/furnished-apartment-tokyo-no-guarantor).*
    `.trim(),
  },
  {
    slug: 'demenager-tokyo-ete-juillet-aout',
    locale: 'fr',
    title: 'Déménager à Tokyo en été : timing, chaleur et coûts',
    description: 'Déménager à Tokyo en juillet-août ? Le marché locatif est plus calme et souvent moins cher qu\'au printemps. Timing, chaleur, Obon et budget : le guide complet.',
    date: '2026-06-29',
    readingTime: '7 min',
    content: `
L'été est la saison oubliée du marché locatif tokyoïte. Tout le monde parle du printemps (mars-avril, déménagements de masse) et de la rentrée d'octobre, mais juillet et août forment un creux que peu d'étrangers exploitent. Pourtant, déménager à Tokyo en plein été a de vrais avantages, à condition d'anticiper la chaleur et quelques pièges de calendrier.

**Réponse rapide :** Déménager à Tokyo en juillet-août se fait sur un marché plus calme qu'au printemps : moins de concurrence, propriétaires plus ouverts à la négociation, biens disponibles plus longtemps. Les contraintes : chaleur et humidité extrêmes (vérifiez la climatisation), la semaine d'Obon mi-août qui ralentit agences et déménageurs, et la saison des typhons qui démarre. Bien géré, l'été est un bon moment pour trouver, souvent moins cher.


![Délai pour trouver un logement par type à Tokyo](/tokyo-housing-time-fr.png "Share house 1-2 semaines vs location standard 4-8 semaines")
## Pourquoi l'été est un marché creux (et pourquoi c'est une bonne nouvelle)

Au Japon, l'essentiel des déménagements se concentre en février-avril, autour du début de l'année fiscale et scolaire. En juillet-août, la demande retombe : moins de candidats sur chaque bien, des annonces qui restent en ligne plusieurs semaines, et des propriétaires plus enclins à discuter le loyer ou les frais d'entrée pour ne pas laisser un logement vide.

Pour un étranger, c'est une fenêtre favorable. Vous avez le temps de comparer, de visiter sans pression, et une vraie marge pour [négocier le loyer](/blog/negocier-loyer-tokyo-conseils). À l'inverse, en mars, les meilleurs biens partent en 48 heures et toute négociation est illusoire.

## La chaleur : votre première priorité

L'été tokyoïte est brutal : 33 à 36 °C en journée, nuits tropicales, humidité proche de la saturation. Le logement n'est pas un détail de confort, c'est une question de vivabilité.

Points à vérifier avant de signer :
- **Climatisation** dans chaque pièce principale (l'unité doit être présente et fonctionnelle, pas seulement "possible à installer").
- **Orientation** : un appartement plein sud sans protection chauffe énormément l'après-midi.
- **Étage et ventilation** : les derniers étages sous une toiture mal isolée deviennent des fours.

Pensez aussi aux frais de mise en service de l'électricité et de l'internet dès l'emménagement, détaillés dans [le guide des utilités](/blog/internet-utilitaires-tokyo-appartement).

## Le piège du calendrier : Obon

La semaine d'Obon, autour du 13-16 août, est l'une des principales périodes de congés au Japon. Beaucoup d'agences immobilières, de sociétés de garantie et de déménageurs tournent au ralenti ou ferment. Un dossier déposé juste avant Obon peut rester bloqué une semaine.

Règle simple : si vous visez un emménagement en août, bouclez la signature et la logistique avant le 10 août, ou prévoyez un emménagement après le 20. Réservez votre déménageur tôt, les créneaux d'été partent vite malgré le creux locatif.

## Typhons : choisir un logement qui tient

La saison des typhons démarre en été et culmine de la fin août à octobre. Sans tomber dans la peur, deux réflexes utiles : évitez les rez-de-chaussée et sous-sols dans les zones basses proches des rivières, et renseignez-vous sur la carte des risques (hazard map) de l'arrondissement avant de signer. Ce n'est pas un motif pour renoncer à un quartier, juste un critère de plus, surtout au rez-de-chaussée.

## Budget : où l'été fait gagner de l'argent

| Poste | Printemps (haute saison) | Été (creux) |
|---|---|---|
| Marge de négociation | quasi nulle | réelle (frais d'entrée, 1er mois) |
| Disponibilité des biens | tendue | confortable |
| Tarif déménageur | élevé | variable, réserver tôt |

Le loyer affiché ne change pas radicalement selon la saison, mais ce que vous pouvez obtenir en plus (un mois offert, des frais réduits, du mobilier laissé) penche en votre faveur l'été. Pour situer les niveaux de loyer par zone, voyez [les loyers par quartier](/blog/loyers-tokyo-par-quartier-2026).

## Et si vous visez plutôt septembre-octobre ?

Si votre arrivée tombe à la rentrée, la dynamique change : la demande remonte avec les étudiants et les mutations d'octobre. Le détail des spécificités de la rentrée est dans [le guide de septembre](/blog/appartement-tokyo-septembre-guide). En résumé : cherchez en été pour emménager avant que la concurrence d'octobre ne reprenne.

## Checklist express pour un déménagement d'été

- Confirmez la présence et le bon fonctionnement de la climatisation dans chaque pièce.
- Vérifiez l'orientation et l'étage pour limiter la surchauffe de l'après-midi.
- Bouclez la signature et le déménageur autour d'Obon : avant le 10 ou après le 20 août.
- Consultez la carte des risques de l'arrondissement, surtout pour un rez-de-chaussée.
- Négociez : en creux estival, demandez un mois offert ou des frais d'entrée réduits.

Un dernier conseil : prévoyez de quoi rafraîchir le logement dès le premier soir. Un appartement resté fermé en plein été peut dépasser 35 °C à l'intérieur, et attendre l'installation de la climatisation n'est pas une option agréable après une journée de déménagement.

Déménager à Tokyo en été demande de gérer la chaleur et le calendrier d'Obon, mais le marché plus calme joue pour vous. C'est l'une des rares périodes où un étranger peut prendre son temps, comparer, et [trouver un appartement](/blog/trouver-appartement-tokyo-etranger) sans la frénésie du printemps.


En attendant l'installation de l'internet a domicile, [Sakura Mobile](https://www.sakuramobile.jp/tokyoexpat-top) propose des forfaits data sans justificatif de domicile, utilisables des l'arrivee au Japon. *(lien affilie)*
---

*À lire aussi : [trouver un appartement à Tokyo](/blog/trouver-appartement-tokyo-etranger) et [appartement à Tokyo en septembre](/blog/appartement-tokyo-septembre-guide).*
    `.trim(),
  },
  {
    slug: 'moving-to-tokyo-summer-july-august',
    locale: 'en',
    title: 'Moving to Tokyo in Summer: Timing, Heat and Costs',
    description: 'Moving to Tokyo in July or August? The rental market is quieter and often cheaper than spring. Timing, heat, Obon logistics and budget, all explained.',
    date: '2026-06-29',
    readingTime: '7 min',
    content: `
Summer is the forgotten season of the Tokyo rental market. Everyone talks about spring (March-April, mass moving) and the October intake, but July and August form a lull few foreigners exploit. Yet moving to Tokyo in midsummer has real upsides, as long as you plan for the heat and a few calendar traps.

**Quick answer:** Moving to Tokyo in July-August means a quieter market than spring: less competition, landlords more open to negotiation, units that stay available longer. The constraints: extreme heat and humidity (check the air conditioning), the Obon week in mid-August that slows agencies and movers, and the start of typhoon season. Handled well, summer is a good time to find a place, often cheaper.


![Time to find housing by type in Tokyo](/tokyo-housing-time-en.png "Share house 1-2 weeks vs a standard lease 4-8 weeks")
## Why summer is a market lull (and why that is good news)

In Japan, most moves cluster in February to April, around the start of the fiscal and school year. In July-August demand drops: fewer applicants per unit, listings that stay online for weeks, and landlords more willing to discuss rent or move-in fees rather than leave a place empty.

For a foreigner, that is a favourable window. You have time to compare, to view without pressure, and real room to [negotiate the rent](/blog/negotiating-rent-tokyo-tips). In March, by contrast, the best units go in 48 hours and negotiation is wishful thinking.

## Heat: your first priority

Tokyo summers are brutal: 33 to 36°C by day, tropical nights, humidity near saturation. Housing is not a comfort detail here, it is a livability question.

Check before signing:
- **Air conditioning** in every main room (the unit must be present and working, not just "possible to install").
- **Orientation:** a south-facing apartment with no shade overheats badly in the afternoon.
- **Floor and ventilation:** top floors under a poorly insulated roof turn into ovens.

Budget for electricity and internet setup fees from move-in day, detailed in the [utilities guide](/blog/setting-up-utilities-tokyo-apartment).

## The calendar trap: Obon

Obon week, around 13-16 August, is one of Japan's main holiday periods. Many real estate agencies, guarantor companies and moving firms slow down or close. An application filed just before Obon can sit untouched for a week.

Simple rule: if you target an August move-in, close the signing and logistics before 10 August, or plan to move in after the 20th. Book your mover early, summer slots fill fast despite the rental lull.

## Typhoons: choosing housing that holds up

Typhoon season starts in summer and peaks from late August to October. Without overreacting, two useful reflexes: avoid ground floors and basements in low areas near rivers, and check the ward's hazard map before signing. This is not a reason to drop a neighbourhood, just one more criterion, especially on the ground floor.

## Budget: where summer saves you money

| Item | Spring (peak) | Summer (lull) |
|---|---|---|
| Rent negotiation room | near zero | real (move-in fees, first month) |
| Unit availability | tight | comfortable |
| Mover pricing | high | varies, book early |

The advertised rent does not swing much by season, but what you can get on top (a free month, reduced fees, furniture left behind) tilts your way in summer. For rent levels by area, see [rent by neighbourhood](/blog/tokyo-rent-by-neighborhood-2026).

## What if you are aiming for September-October instead?

If your arrival lands at the autumn intake, the dynamic shifts: demand climbs with students and the October transfers. The specifics of the autumn intake are in the [September guide](/blog/find-apartment-tokyo-september). In short: search in summer to move in before the October competition returns.

## A quick checklist for a summer move

- Confirm the air conditioning is present and working in every room.
- Check orientation and floor to limit afternoon overheating.
- Time the signing and the mover around Obon: before the 10th or after the 20th of August.
- Check the ward's hazard map, especially for a ground floor.
- Negotiate: in the summer lull, ask for a free month or reduced move-in fees.

One last tip: plan to cool the place down from the first evening. An apartment left shut in midsummer can climb past 35°C inside, and waiting on the air conditioning install is no fun after a day of moving boxes.

Moving to Tokyo in summer means managing the heat and the Obon calendar, but the quieter market works for you. It is one of the rare windows where a foreigner can take their time, compare, and [find an apartment](/blog/find-apartment-tokyo-foreigner) without the spring frenzy.


While waiting for home internet setup, [Sakura Mobile](https://www.sakuramobile.jp/tokyoexpat-top) offers data plans with no address proof required, usable from day one in Japan. *(affiliate link)*
---

*See also: [finding an apartment in Tokyo](/blog/find-apartment-tokyo-foreigner) and [renting in Tokyo in September](/blog/find-apartment-tokyo-september).*
    `.trim(),
  },
  {
    slug: 'saison-typhons-tokyo-choisir-logement',
    locale: 'fr',
    title: 'Saison des typhons à Tokyo : choisir un logement sûr',
    description: 'Saison des typhons à Tokyo (août-octobre) : étage, zone inondable, cartes de risques. Comment choisir un logement sûr et ce qu\'il faut vérifier avant de signer.',
    date: '2026-06-29',
    readingTime: '6 min',
    content: `
Chaque année, de fin août à octobre, Tokyo reçoit la queue de plusieurs typhons. La plupart se traduisent par une journée de pluie battante et de vent, sans drame. Mais le choix du logement fait une vraie différence entre une saison des typhons inconfortable et une saison sans souci. Voici ce qu'un étranger devrait vérifier avant de signer.

**Réponse rapide :** Pour traverser la saison des typhons à Tokyo sereinement, évitez les rez-de-chaussée et sous-sols dans les zones basses près des rivières, consultez la carte des risques (hazard map) de l'arrondissement avant de signer, et privilégiez un immeuble en béton récent. Souscrivez une assurance habitation : elle est peu chère et couvre les dégâts des eaux. Le risque réel est l'inondation locale, pas le bâtiment lui-même.


![Quand chercher un logement à Tokyo, par saison](/tokyo-seasonality-fr.png "Fév-Avr haute saison vs le creux Mai-Août, le meilleur moment pour négocier")
## Comprendre le risque réel

Les immeubles japonais sont conçus pour résister au vent et aux séismes. Lors d'un typhon, le danger principal pour un résident n'est pas l'effondrement, mais l'eau : rivière qui déborde, remontée d'égouts, ou ruissellement dans les zones basses. Le risque dépend donc surtout de l'emplacement et de l'étage, pas de la solidité apparente du logement.

C'est une bonne nouvelle : il suffit de bien choisir où et à quelle hauteur on habite.

## Étage et type de bien

- **Évitez le rez-de-chaussée et le sous-sol** dans les zones à risque d'inondation. Un studio en demi-sous-sol bon marché peut se révéler un mauvais calcul.
- **Privilégiez le 2e étage et au-dessus** si vous habitez près d'une rivière ou en zone basse.
- **Béton (RC/SRC) plutôt que bois léger** pour le bruit, l'isolation et la tenue au vent.

Ces critères s'ajoutent à votre [checklist de bail](/blog/checklist-bail-tokyo) habituelle, ils ne la remplacent pas.

## La carte des risques (hazard map)

Chaque arrondissement de Tokyo publie une carte des risques d'inondation et de glissement de terrain. Avant de signer, cherchez la hazard map de l'arrondissement et repérez l'adresse du bien. Les zones colorées indiquent la hauteur d'eau potentielle en cas de crue majeure.

Si un logement se trouve en zone fortement colorée et au rez-de-chaussée, c'est un signal pour viser un étage plus haut ou un autre bien. Si vous hésitez entre quartiers, [le guide des quartiers](/blog/quartiers-tokyo-expatries-guide) aide à situer les zones résidentielles plus sûres.

## Au-delà de l'inondation : vent et coupures

Un typhon, ce n'est pas que de la pluie. Les rafales peuvent projeter des objets mal fixés et, plus rarement, provoquer de brèves coupures de courant. Quelques points utiles côté logement :

- **Balcon dégagé** : rentrez pots, vélos et objets légers avant le passage du typhon.
- **Fenêtres** : la plupart des appartements n'ont pas de volets ; un film anti-éclats sur une grande baie est un plus.
- **Exposition** : une chambre dont les ouvertures donnent côté abrité du vent dominant reste plus calme.

Ces détails ne se voient pas sur une annonce, mais une visite en personne ou une question à l'agence permet de les vérifier. Ils comptent surtout en hauteur, où le vent se fait davantage sentir.

## Assurance habitation : indispensable

L'assurance habitation locataire est peu coûteuse au Japon (souvent 15 000 à 20 000 JPY pour deux ans) et couvre généralement les dégâts des eaux et la responsabilité civile. Pendant la saison des typhons, c'est une protection que vous voulez avoir. Le détail des garanties est dans [le guide de l'assurance habitation](/blog/assurance-habitation-japon-locataire).

## Préparer un kit minimal

Au-delà du logement, gardez chez vous de quoi tenir 24 à 48 heures : eau, lampe, batterie externe, quelques provisions. Quand un gros typhon approche, les trains s'arrêtent par précaution et certains commerces ferment. Gardez aussi vos papiers importants et un peu de liquide accessibles : en cas de coupure, distributeurs et terminaux de paiement peuvent être indisponibles quelques heures. Ce n'est généralement qu'une journée, mais autant ne pas être pris au dépourvu.

## Faut-il fuir certains quartiers ?

Non. Tokyo entière n'est pas une zone à risque, et la plupart des quartiers résidentiels sont parfaitement sûrs à un étage correct. Le risque se concentre sur des poches précises, basses et proches de l'eau. Avec la hazard map et le bon étage, vous pouvez vivre presque partout sans souci. Pour le rapport loyer/zone, [les loyers par quartier](/blog/loyers-tokyo-par-quartier-2026) donnent les ordres de grandeur.

La saison des typhons fait partie de la vie à Tokyo, et elle se gère facilement avec quelques bons réflexes au moment de [trouver un appartement](/blog/trouver-appartement-tokyo-etranger) : un étage suffisant, une adresse hors zone basse, et une assurance habitation. Le reste, c'est surtout une journée de pluie à passer au chaud.

---

*À lire aussi : [trouver un appartement à Tokyo](/blog/trouver-appartement-tokyo-etranger) et [assurance habitation au Japon](/blog/assurance-habitation-japon-locataire).*
    `.trim(),
  },
  {
    slug: 'typhoon-season-tokyo-choosing-housing',
    locale: 'en',
    title: 'Typhoon Season in Tokyo: Choosing Safe Housing',
    description: 'Tokyo typhoon season runs August to October. Floor choice, flood zones, hazard maps: how to pick safe housing and what to check before you sign a lease.',
    date: '2026-06-29',
    readingTime: '6 min',
    content: `
Every year, from late August to October, Tokyo catches the tail of several typhoons. Most amount to a day of driving rain and wind, with no drama. But your choice of housing makes a real difference between an uncomfortable typhoon season and a worry-free one. Here is what a foreigner should check before signing.

**Quick answer:** To get through Tokyo's typhoon season calmly, avoid ground floors and basements in low areas near rivers, check the ward's hazard map before signing, and favour a recent concrete building. Take out renters insurance: it is cheap and covers water damage. The real risk is local flooding, not the building itself.


![When to look for housing in Tokyo, by season](/tokyo-seasonality-en.png "Feb-Apr peak vs the May-Aug lull, the best time to negotiate")
## Understanding the real risk

Japanese buildings are designed to withstand wind and earthquakes. During a typhoon, the main danger to a resident is not collapse but water: a river overflowing, sewers backing up, or runoff in low areas. The risk therefore depends mostly on location and floor, not on the apparent sturdiness of the unit.

That is good news: you just need to choose where and how high you live.

## Floor and building type

- **Avoid the ground floor and basement** in flood-prone areas. A cheap semi-basement studio can turn out to be a bad bet.
- **Favour the 2nd floor and above** if you live near a river or in a low area.
- **Concrete (RC/SRC) over light wood** for noise, insulation and wind resistance.

These criteria add to your usual [lease checklist](/blog/tokyo-rental-contract-checklist), they do not replace it.

## The hazard map

Every Tokyo ward publishes a flood and landslide hazard map. Before signing, find the ward's hazard map and locate the unit's address. Coloured zones show the potential water depth in a major flood.

If a unit sits in a heavily coloured zone and on the ground floor, that is a signal to aim for a higher floor or another place. If you are weighing neighbourhoods, the [neighbourhoods guide](/blog/tokyo-neighbourhoods-expats-guide) helps locate safer residential areas.

## Beyond flooding: wind and outages

A typhoon is not just rain. Gusts can throw around loose objects and, more rarely, cause brief power outages. A few useful housing points:

- **Clear balcony:** bring in pots, bikes and light objects before the typhoon arrives.
- **Windows:** most apartments have no shutters; a shatter film on a large pane is a plus.
- **Exposure:** a room whose openings face away from the prevailing wind stays calmer.

These details do not show on a listing, but an in-person viewing or a question to the agency lets you check them. They matter most on higher floors, where the wind is felt more.

## Renters insurance: essential

Renters insurance is cheap in Japan (often 15,000 to 20,000 JPY for two years) and usually covers water damage and personal liability. During typhoon season, it is protection you want in place. The cover details are in the [renters insurance guide](/blog/renters-insurance-japan-guide).

## Prepare a basic kit

Beyond housing, keep enough at home to last 24 to 48 hours: water, a light, a power bank, some food. When a large typhoon approaches, trains stop as a precaution and some shops close. Keep your important documents and some cash within reach too: during an outage, ATMs and card terminals can be unavailable for a few hours. It is usually just a day, but it pays not to be caught out.

## Should you avoid certain neighbourhoods?

No. Not all of Tokyo is a risk zone, and most residential areas are perfectly safe on a decent floor. The risk concentrates in specific low pockets near water. Even central, popular wards have both safe blocks and lower pockets, so judge the specific address rather than the district name. With the hazard map and the right floor, you can live almost anywhere without worry. For the rent-to-area trade-off, [rent by neighbourhood](/blog/tokyo-rent-by-neighborhood-2026) gives the ballpark.

Typhoon season is part of life in Tokyo, and it is easy to manage with a few good reflexes when you [find an apartment](/blog/find-apartment-tokyo-foreigner): a high enough floor, an address outside the low zones, and renters insurance. The rest is mostly a rainy day spent warm and dry indoors.

---

*See also: [finding an apartment in Tokyo](/blog/find-apartment-tokyo-foreigner) and [renters insurance in Japan](/blog/renters-insurance-japan-guide).*
    `.trim(),
  },
  {
    slug: 'rapport-loyers-tokyo-2026',
    locale: 'fr',
    title: 'Rapport des loyers de Tokyo 2026 : par arrondissement',
    description: 'Combien coûte vraiment un loyer à Tokyo en 2026 ? Loyer médian par arrondissement et layout, sur 528 660 annonces réelles : le moins et le plus cher.',
    date: '2026-06-30',
    readingTime: '6 min',
    content: `
Combien coûte vraiment un loyer à Tokyo ? La plupart des guides donnent des fourchettes vagues. Ce rapport répond avec des données : le loyer mensuel médian dans chacun des 23 arrondissements de Tokyo, par layout, calculé sur 528 660 annonces actives réelles en 2026.

**Réponse rapide :** En 2026, un studio 1K à Tokyo va d'un médian de 74 000 JPY à Edogawa (le moins cher) à 140 000 JPY à Minato (le plus cher), soit 89% d'écart. Un 1LDK (pour un couple) va de 118 000 JPY à Katsushika à 260 000 JPY à Minato. Le détail complet par arrondissement et layout est dans notre [Indice des loyers de Tokyo](/data).


![Le quartier de Tokyo le moins cher dépend de votre foyer : célibataire, couple ou famille](/tokyo-household-flip-fr.png "Célibataire : Edogawa, couple : Katsushika, famille : Adachi. Pas le même quartier.")
## Comment ce rapport est construit

Nous avons agrégé 528 660 annonces locatives actives dédupliquées dans les 23 arrondissements de Tokyo (sources : les grands portails locatifs japonais), puis calculé le loyer mensuel médian pour chaque arrondissement et layout (1R à 3LDK). Nous utilisons la médiane, pas la moyenne, car elle résiste aux valeurs extrêmes : quelques biens de luxe ne faussent pas le chiffre. Chaque montant ci-dessous reflète ce que des locataires paient réellement.

## Lire les layouts japonais

Les annonces tokyoïtes utilisent un code de surface : le chiffre indique les chambres, les lettres l'espace de vie. 1R est une pièce unique avec cuisine incluse. 1K ajoute une cuisine séparée. 1DK a un coin repas-cuisine. 1LDK ajoute un salon, le confort pour un célibataire ou un couple. 2LDK et 3LDK ajoutent des chambres pour les familles. Le loyer grimpe nettement à chaque étape.

## Les arrondissements les moins chers (studio 1K)

| Arrondissement | Loyer médian 1K |
|---|---|
| Edogawa | 74 000 JPY |
| Adachi | 76 000 JPY |
| Katsushika | 81 000 JPY |
| Nerima | 82 000 JPY |
| Suginami | 84 000 JPY |

Ces arrondissements de l'est et de la périphérie échangent un trajet plus long contre un loyer souvent 30 à 45% sous les arrondissements centraux. Pour un nouvel arrivant au budget serré, c'est la porte d'entrée intelligente. Voyez comment arbitrer trajet et loyer dans notre [guide des loyers par quartier](/blog/loyers-tokyo-par-quartier-2026).

## Les arrondissements les plus chers (studio 1K)

| Arrondissement | Loyer médian 1K |
|---|---|
| Minato | 140 000 JPY |
| Chiyoda | 137 000 JPY |
| Chuo | 130 000 JPY |
| Shibuya | 127 000 JPY |
| Shinjuku | 120 000 JPY |

Ce sont les arrondissements d'affaires et de vie centrale. Vous payez une prime pour l'adresse et le trajet court. Pour beaucoup d'expatriés, un arrondissement à une station de là offre l'essentiel des avantages à un loyer nettement plus bas.

## L'écart se creuse avec la taille

L'écart entre l'arrondissement le moins cher et le plus cher grandit avec la surface :
- Studio 1K : 74 000 à 140 000 JPY (+89%)
- 1LDK (couple) : 118 000 à 260 000 JPY (+120%)
- 2LDK (famille) : 161 000 à 390 000 JPY (+142%)

Autrement dit, plus le logement est grand, plus l'emplacement coûte cher. Une famille qui a besoin d'un 2LDK économise le plus en choisissant un arrondissement périphérique, où un 2LDK coûte à peu près le prix d'un 1LDK central.

## Ce que ça signifie pour votre installation

- **Célibataire ou étudiant :** commencez dans un arrondissement de l'est ou de la périphérie (Edogawa, Adachi, Katsushika, Nerima). Vous avez un vrai appartement pour le prix d'une chambre centrale.
- **Couple :** un 1LDK hors du centre économise 50 000 à 100 000 JPY par mois face à Minato ou Shibuya.
- **Famille :** la prime d'un 2LDK central est forte. Les arrondissements périphériques avec écoles et parcs offrent bien plus d'espace par yen.

Avant de signer, intégrez aussi les coûts d'entrée (caution, argent-clé, agence, garant). Nos guides sur [le logement sans garant](/blog/appartement-meuble-tokyo-sans-garant) et [trouver un appartement quand on est étranger](/blog/trouver-appartement-tokyo-etranger) couvrent le tableau complet.

## La médiane, pas une supposition

La plupart des articles sur le coût de la vie à Tokyo citent une moyenne unique, tirée de mémoire ou d'un petit échantillon. Deux problèmes en découlent. D'abord, une moyenne est tirée vers le haut par quelques tours de luxe : elle surestime ce qu'un locataire normal paie. Ensuite, un chiffre à l'échelle de la ville masque l'énorme écart entre arrondissements que vous venez de voir. Une médiane calculée arrondissement par arrondissement, sur des centaines de milliers d'annonces, corrige les deux. C'est le chiffre sur lequel vous pouvez réellement bâtir un budget.

## Les loyers bougent avec les saisons

Ces médianes sont un instantané du T2 2026. Les loyers montent légèrement aux pics de déménagement du printemps et de l'automne, quand la demande culmine, et se détendent l'été plus calme. Le classement des arrondissements reste stable, mais les montants absolus varient de quelques pour cent sur l'année. Nous rafraîchissons l'indice chaque trimestre pour qu'il suive le marché réel plutôt qu'une estimation figée.

## Explorez toutes les données

Ce rapport est un instantané. Le détail complet, arrondissement par arrondissement et layout par layout, vit dans notre [Indice des loyers de Tokyo](/data), mis à jour chaque trimestre. Et si vous voulez transformer ces chiffres en un vrai appartement, c'est exactement notre métier.

---

*Données : 528 660 annonces actives, 23 arrondissements de Tokyo, T2 2026. Loyer mensuel médian en JPY. Voir l'[indice complet](/data).*
    `.trim(),
  },
  {
    slug: 'tokyo-rent-report-2026',
    locale: 'en',
    title: 'Tokyo Rent Report 2026: Median Rent by Ward',
    description: 'What does rent really cost in Tokyo in 2026? Median rent by ward and layout, from 528,660 real listings: the cheapest and priciest wards, with the data.',
    date: '2026-06-30',
    readingTime: '6 min',
    content: `
How much does it really cost to rent in Tokyo? Most guides give vague ranges. This report answers with data: the median monthly rent in each of Tokyo's 23 wards, by apartment layout, computed from 528,660 real active listings in 2026.

**Quick answer:** In 2026, a 1K studio in Tokyo runs from a median of ¥74,000 in Edogawa (the cheapest ward) to ¥140,000 in Minato (the priciest), an 89% gap. A 1LDK (for a couple) ranges from ¥118,000 in Katsushika to ¥260,000 in Minato. The full breakdown by ward and layout is in our [Tokyo Rent Index](/data).


![The cheapest Tokyo ward depends on your household: single, couple or family](/tokyo-household-flip-en.png "Single: Edogawa, couple: Katsushika, family: Adachi. Not the same ward.")
## How we built this

We aggregated 528,660 deduplicated active rental listings across Tokyo's 23 special wards (sources: major Japanese rental portals), then computed the median monthly rent for each ward and layout (1R to 3LDK). We use the median, not the average, because it resists outliers: a few luxury listings do not distort the figure. Every number below reflects what real tenants actually pay.

## Reading Tokyo apartment layouts

Tokyo listings use a code for size: the number is bedrooms, the letters describe the living space. 1R is a single room with the kitchen inside it. 1K adds a separated kitchen. 1DK has a dining-kitchen. 1LDK adds a living room, the comfortable single or couple unit. 2LDK and 3LDK add bedrooms for families. Rent climbs steeply at each step.

## The cheapest wards (1K studio)

| Ward | Median 1K rent |
|---|---|
| Edogawa | ¥74,000 |
| Adachi | ¥76,000 |
| Katsushika | ¥81,000 |
| Nerima | ¥82,000 |
| Suginami | ¥84,000 |

These eastern and outer wards trade a longer commute for rent that is often 30 to 45% below the central wards. For newcomers on a budget, they are the smart entry point. See how to weigh commute versus rent in our [rent by neighbourhood guide](/blog/tokyo-rent-by-neighborhood-2026).

## The priciest wards (1K studio)

| Ward | Median 1K rent |
|---|---|
| Minato | ¥140,000 |
| Chiyoda | ¥137,000 |
| Chuo | ¥130,000 |
| Shibuya | ¥127,000 |
| Shinjuku | ¥120,000 |

These are the central business and lifestyle wards. You pay a premium for the address and the short commute. For many expats, a ward one stop out delivers most of the benefit at a meaningfully lower rent.

## The gap widens with size

The spread between the cheapest and priciest ward grows with apartment size:
- 1K studio: ¥74,000 to ¥140,000 (+89%)
- 1LDK (couple): ¥118,000 to ¥260,000 (+120%)
- 2LDK (family): ¥161,000 to ¥390,000 (+142%)

In other words, the bigger the home, the more location costs you. A family needing a 2LDK saves the most by choosing an outer ward, where a 2LDK costs roughly the price of a central 1LDK.

## What this means for your move

- **Single or student:** start in an eastern or outer ward (Edogawa, Adachi, Katsushika, Nerima). You get a real apartment for the price of a central room.
- **Couple:** a 1LDK outside the centre saves ¥50,000 to ¥100,000 a month versus Minato or Shibuya.
- **Family:** the 2LDK premium in central wards is steep. Outer wards with good schools and parks give far more space per yen.

Before you sign, factor in the move-in costs too (deposit, key money, agency fee, guarantor). Our guides on [renting without a guarantor](/blog/furnished-apartment-tokyo-no-guarantor) and [finding an apartment as a foreigner](/blog/find-apartment-tokyo-foreigner) cover the full picture.

## Why a median beats a guess

Most "cost of living in Tokyo" articles cite a single average pulled from memory or a small sample. Two problems follow. First, an average is dragged upward by a handful of luxury towers, so it overstates what a normal tenant pays. Second, a city-wide figure hides the huge ward-to-ward gap you have just seen. A median computed ward by ward, from hundreds of thousands of listings, fixes both. It is the number you can actually budget against.

## Rents move with the seasons

These medians are a Q2 2026 snapshot. Tokyo rents drift up slightly in the busy spring and autumn moving seasons, when demand peaks, and ease in the quieter summer. The ward ranking stays stable, but the absolute figures move a few percent across the year. We refresh the index each quarter so it tracks the real market rather than a frozen estimate.

## Explore the full data

This report is a snapshot. The complete, ward-by-ward, layout-by-layout breakdown lives in our [Tokyo Rent Index](/data), updated quarterly. And if you want help turning these numbers into an actual apartment, that is exactly what we do.

---

*Data: 528,660 active listings, Tokyo 23 wards, Q2 2026. Median monthly rent in JPY. See the [full index](/data).*
    `.trim(),
  },
  {
    slug: 'why-japanese-landlords-reject-foreigners',
    locale: 'en',
    title: 'Why Japanese Landlords Reject Foreign Tenants (Insider View)',
    description: 'A Tokyo rental insider explains the real reasons Japanese landlords reject foreign tenants, and the concrete steps that get your application approved.',
    date: '2026-07-02',
    readingTime: '6 min',
    content: `
If you are a foreigner hunting for an apartment in Tokyo, you will probably hear "no" before you hear "yes", and often you will not be told why. I operate rentals here myself, so I deal with guarantor companies and see tenant screening from the landlord's side, and the reasons behind those rejections are rarely what newcomers assume. Here is the honest picture from the inside, and what actually turns a "no" into a "yes".

**Quick answer:** Japanese landlords reject foreign tenants mostly out of perceived risk, not prejudice: no guarantor, communication worries, income that looks unstable, or unfamiliar paperwork. The fixes are concrete: use a guarantor company, present clean proof of income, target foreigner-friendly listings, and have your application presented properly in Japanese. Do that and most rejections disappear.


![Foreign tenant acceptance rate by route in Tokyo](/tokyo-approval-rate-en.png "30-45% alone vs 90-98% via a share house or a bilingual agent")
## It is about risk, not dislike

Most rejections are not personal. A landlord renting to a tenant they cannot easily communicate with, who has no local track record and no Japanese guarantor, sees risk. Their worst case is unpaid rent and a complicated eviction. Almost every "no" flows from that single fear.

## The number one reason I actually see

The single most common reason is not your income or your visa: it is the combination of no guarantor and communication risk. A landlord who cannot picture how they would resolve a problem with a foreign tenant, and who has no guarantor backing the rent, will default to "no". Fix those two and most of the resistance disappears.

Beyond that, a few factors come up again and again:
- **No guarantor.** Most landlords require one, and a newly arrived foreigner rarely has a Japanese person to fill the role.
- **Income that looks unstable.** Freelancers, new hires and students raise more questions than a salaried employee with payslips.
- **Communication risk.** If the agency fears they cannot resolve an issue with the tenant, they hesitate.
- **A visa or contract that looks short or uncertain.**

If your application keeps getting turned down, our guide on [what to do when your rental application is rejected](/en/blog/rental-application-rejected-japan-foreigner) walks through each fix.

## What surprises most foreigners

It is often not the landlord alone deciding. The management company and the guarantor company screen you too, and any one of them can decline, usually without giving a reason. And some buildings simply have a blanket no-foreigner policy that has nothing to do with how strong your application is. A "no" is often about which door you knocked on, not about you. This is why working from the right listings matters as much as your profile, something we cover in our [guide to finding an apartment in Tokyo as a foreigner](/en/blog/find-apartment-tokyo-foreigner).

## The pattern that gets people approved

Here is something I see constantly: the same applicant, same income, same job, gets rejected on one property and approved on another within the same week. The tenant did not change. What changed was whether a guarantor company was attached, whether the paperwork was complete, and whether the application was presented properly in Japanese to a landlord open to foreign tenants in the first place. The profile did not improve; the framing did.

If you want to skip the guarantor problem entirely at first, [furnished apartments without a Japanese guarantor](/en/blog/furnished-apartment-tokyo-no-guarantor) and share houses are the fastest way in.

## How to get approved

- **Use a guarantor company.** This removes the single biggest objection. It is normal and expected today.
- **Present income cleanly.** Tax documents, an employment letter, or bank statements reassure far more than words.
- **Target foreigner-friendly listings.** Do not waste energy on landlords who opt out.
- **Have your application presented in Japanese.** This is where many quiet "no" answers become "yes".

The Japanese rental market is not hostile, but it is opaque, and the decisions happen on a side of the table most foreigners never see. Knowing how landlords actually think is half the battle. If you would rather have someone who works inside the market handle it and get your application approved, you can [book a free 30-minute call](/en/contact).
    `.trim(),
  },
  {
    slug: 'pourquoi-proprietaires-japonais-refusent-etrangers',
    locale: 'fr',
    title: 'Pourquoi les propriétaires japonais refusent les étrangers',
    description: 'Un professionnel du marché locatif de Tokyo explique les vraies raisons des refus, et les étapes concrètes pour faire accepter votre dossier.',
    date: '2026-07-02',
    readingTime: '6 min',
    content: `
Si vous cherchez un appartement à Tokyo en tant qu'étranger, vous entendrez probablement "non" avant "oui", et souvent sans qu'on vous dise pourquoi. J'opère mes propres logements ici, donc je traite avec les sociétés de garantie et je vois la sélection des locataires du côté du bailleur, et les raisons de ces refus sont rarement celles que les nouveaux arrivants imaginent. Voici le tableau honnête, vu de l'intérieur, et ce qui transforme vraiment un "non" en "oui".

**Réponse rapide :** Les propriétaires japonais refusent les étrangers surtout par risque perçu, pas par préjugé : absence de garant, crainte de communication, revenus jugés instables, documents inconnus. Les solutions sont concrètes : passer par une société de garantie, présenter des preuves de revenus propres, cibler les biens ouverts aux étrangers, et faire présenter votre dossier correctement en japonais. Faites cela et la plupart des refus disparaissent.


![Taux d'acceptation des locataires étrangers par voie à Tokyo](/tokyo-approval-rate-fr.png "30-45% seul vs 90-98% via une share house ou un agent bilingue")
## C'est une question de risque, pas d'antipathie

La plupart des refus ne sont pas personnels. Un propriétaire qui loue à un locataire avec qui il ne peut pas communiquer facilement, sans historique local et sans garant japonais, voit un risque. Son pire scénario : loyer impayé et expulsion compliquée. Presque chaque "non" découle de cette seule peur.

## La raison numéro un que je constate vraiment

La raison la plus fréquente n'est ni vos revenus ni votre visa : c'est la combinaison de l'absence de garant et du risque de communication. Un propriétaire qui n'imagine pas comment il résoudrait un problème avec un locataire étranger, et qui n'a pas de garant pour couvrir le loyer, choisira "non" par défaut. Réglez ces deux points et l'essentiel de la résistance tombe.

Au-delà, quelques facteurs reviennent sans cesse :
- **Pas de garant.** La plupart des propriétaires en exigent un, et un étranger fraîchement arrivé a rarement un Japonais pour ce rôle.
- **Des revenus jugés instables.** Freelances, nouveaux embauchés et étudiants soulèvent plus de questions qu'un salarié avec fiches de paie.
- **Le risque de communication.** Si l'agence craint de ne pas pouvoir régler un souci avec le locataire, elle hésite.
- **Un visa ou un contrat jugé court ou incertain.**

Si votre dossier est refusé en boucle, notre guide sur [que faire quand votre dossier de location est refusé](/fr/blog/dossier-location-refuse-tokyo-etranger) détaille chaque solution.

## Ce qui surprend le plus les étrangers

Souvent, ce n'est pas le propriétaire seul qui décide. La société de gestion et la société de garantie vous évaluent aussi, et n'importe laquelle peut refuser, généralement sans donner de raison. Et certains immeubles ont simplement une politique "pas d'étrangers" qui n'a rien à voir avec la solidité de votre dossier. Un "non" tient souvent à la porte à laquelle vous avez frappé, pas à vous.

## Le schéma qui fait accepter les dossiers

Voici ce que je vois constamment : le même candidat, mêmes revenus, même emploi, est refusé sur un bien et accepté sur un autre dans la même semaine. Le locataire n'a pas changé. Ce qui a changé : la présence d'une société de garantie, un dossier complet, et une candidature présentée correctement en japonais à un propriétaire ouvert aux étrangers au départ. Le profil ne s'est pas amélioré ; la présentation, oui. Pour la méthode complète, voyez notre guide pour [trouver un appartement à Tokyo quand on est étranger](/fr/blog/trouver-appartement-tokyo-etranger).

## Comment faire accepter votre dossier

- **Passez par une société de garantie.** Cela lève l'objection la plus grande. C'est normal et attendu aujourd'hui.
- **Présentez vos revenus proprement.** Avis d'imposition, lettre d'employeur ou relevés bancaires rassurent bien plus que des mots.
- **Ciblez les biens ouverts aux étrangers.** Ne perdez pas d'énergie sur les propriétaires qui refusent par principe.
- **Faites présenter votre dossier en japonais.** C'est souvent là que des "non" silencieux deviennent des "oui".

Le marché locatif japonais n'est pas hostile, mais il est opaque, et les décisions se prennent d'un côté de la table que la plupart des étrangers ne voient jamais. Savoir comment les propriétaires raisonnent, c'est déjà la moitié du chemin. Si vous préférez confier cela à quelqu'un qui travaille dans le marché, découvrez [comment fonctionne le service de chasseur immobilier](/fr/blog/service-chasseur-immobilier-tokyo-comment-ca-marche) ou [réservez un appel gratuit de 30 minutes](/fr/contact).
    `.trim(),
  },

  {
    slug: 'cheapest-neighbourhoods-tokyo-ranked-by-rent',
    locale: 'en',
    title: 'Cheapest and Priciest Tokyo Neighbourhoods (2026 Rent Data)',
    description: 'A data-backed ranking of the cheapest and most expensive Tokyo wards and stations to rent in 2026, from 528,660 real active listings.',
    date: '2026-07-03',
    readingTime: '6 min',
    content: `
Everyone asks the same question when moving to Tokyo: where can I actually afford to live? Most guides answer with opinions. This one answers with data, from 528,660 real rental listings across Tokyo's 23 wards, updated every quarter.

**Quick answer:** The cheapest Tokyo wards for a 1K studio are Edogawa (74 000 JPY), Adachi (76 000 JPY) and Katsushika (81 000 JPY), all eastern or outer wards. The most expensive is Minato (140 000 JPY), followed by Chiyoda and Chuo. From one ward to another, the same studio can cost nearly double.


![Median 1K studio rent by Tokyo ward, mapped (2026)](/tokyo-rent-map.png "Median 1K rent across the 23 wards, from 528,660 real active listings")
## The 10 cheapest wards to live in Tokyo
Ranked by median monthly rent for a 1K studio, from 528,660 active listings:

1. **Edogawa** - 74 000 JPY
2. **Adachi** - 76 000 JPY
3. **Katsushika** - 81 000 JPY
4. **Nerima** - 82 000 JPY
5. **Suginami** - 84 000 JPY
6. **Setagaya** - 87 000 JPY
7. **Itabashi** - 88 000 JPY
8. **Nakano** - 88 000 JPY
9. **Kita** - 90 000 JPY
10. **Arakawa** - 91 000 JPY

These are mostly eastern and outer wards. They sit 20 to 40 minutes from the centre but stay fully on the train network, and your money buys a real apartment instead of a shoebox.


![The cheapest Tokyo ward depends on your household: single, couple or family](/tokyo-household-flip-en.png "Single: Edogawa, couple: Katsushika, family: Adachi. Not the same ward.")
## The most expensive wards to live in Tokyo
The other end of the scale, same 1K studio:

1. **Minato** - 140 000 JPY
2. **Chiyoda** - 137 000 JPY
3. **Chuo** - 130 000 JPY
4. **Shibuya** - 127 000 JPY
5. **Shinjuku** - 120 000 JPY
6. **Taito** - 115 000 JPY
7. **Shinagawa** - 112 000 JPY
8. **Koto** - 112 000 JPY

You pay for location, convenience and a certain lifestyle. For many relocating executives and families it is worth it, but go in knowing the premium is real.

## Rent by ward and layout (1K, 1LDK, 2LDK)
The ranking shifts with the layout you need. For a couple on a 1LDK, Katsushika (118 000 JPY) is the single cheapest ward, ahead of Adachi and Edogawa. Median monthly rent by ward, according to the Tokyo Expat rent index:

| Ward | 1K | 1LDK | 2LDK |
|---|---|---|---|
| Edogawa | 74 000 | 125 000 | 162 000 |
| Adachi | 76 000 | 125 000 | 161 000 |
| Katsushika | 81 000 | 118 000 | 162 000 |
| Nerima | 82 000 | 135 000 | 176 000 |
| Suginami | 84 000 | 159 000 | 210 000 |
| Setagaya | 87 000 | 169 000 | 235 000 |
| Itabashi | 88 000 | 143 000 | 195 000 |
| Nakano | 88 000 | 174 000 | 225 000 |
| Kita | 90 000 | 152 000 | 218 000 |
| Arakawa | 91 000 | 150 000 | 219 000 |

All figures are median monthly rent in JPY, from real recorded transactions. For the full 23 wards plus 27 train lines and 50 stations, see the [Tokyo Rent Index](/en/data).

## Cheapest stations, if you want to go granular
Ward averages hide a lot. Here are the most affordable of 50 major stations for a 1K, so you can trade a few minutes of commute for real savings:

1. **Kasai** - 76 000 JPY
2. **Shin-Koiwa** - 78 000 JPY
3. **Ayase** - 85 000 JPY
4. **Ogikubo** - 85 000 JPY
5. **Nerima** - 86 000 JPY
6. **Kita-Senju** - 86 000 JPY
7. **Akabane** - 86 000 JPY
8. **Setagaya** - 88 000 JPY

## How to actually use this ranking
- **Choose your train line and commute first, then the station.** Ten extra minutes on the right line can save you 30,000 to 50,000 JPY a month for the same apartment.
- **The cheapest wards are not "worse", just further out.** They are residential, safe and well connected.
- **Budget for the upfront bill**, not just the rent: a standard lease can ask for four to six months of rent all at once. See our [guide to renting in Tokyo as a foreigner](/en/blog/find-apartment-tokyo-foreigner).
- **Explore every ward, line and station** in our interactive [Tokyo Rent Index](/en/data).

If you would rather have someone who works inside the Tokyo market turn these numbers into an actual apartment, see [how our property hunter works](/en/blog/how-real-estate-hunter-works-tokyo) or [book a free call](/en/contact).

*Data: 528,660 active listings, Tokyo 23 wards, 2026. Median 1K rent in JPY. Updated quarterly.*
    `.trim(),
  },
  {
    slug: 'quartiers-tokyo-moins-chers-classement-loyers',
    locale: 'fr',
    title: 'Les quartiers de Tokyo les moins chers (donnees 2026)',
    description: 'Un classement chiffre des arrondissements et stations de Tokyo les moins et plus chers a louer en 2026, a partir de 528,660 annonces reelles.',
    date: '2026-07-03',
    readingTime: '6 min',
    content: `
Tout le monde se pose la meme question en s'installant a Tokyo : ou puis-je vraiment me permettre d'habiter ? La plupart des guides repondent a l'opinion. Celui-ci repond avec des donnees, a partir de 528,660 annonces locatives reelles dans les 23 arrondissements de Tokyo, mises a jour chaque trimestre.

**Reponse rapide :** Les arrondissements les moins chers pour un studio 1K sont Edogawa (74 000 JPY), Adachi (76 000 JPY) et Katsushika (81 000 JPY), tous a l'est ou en peripherie. Le plus cher est Minato (140 000 JPY), suivi de Chiyoda et Chuo. D'un arrondissement a l'autre, le meme studio peut couter pres du double.


![Loyer médian d'un studio 1K par arrondissement de Tokyo, en carte (2026)](/tokyo-rent-map.png "Loyer médian 1K dans les 23 arrondissements, sur 528 660 annonces réelles actives")
## Les 10 arrondissements les moins chers de Tokyo
Classes par loyer median d'un studio 1K, sur 528,660 annonces actives :

1. **Edogawa** - 74 000 JPY
2. **Adachi** - 76 000 JPY
3. **Katsushika** - 81 000 JPY
4. **Nerima** - 82 000 JPY
5. **Suginami** - 84 000 JPY
6. **Setagaya** - 87 000 JPY
7. **Itabashi** - 88 000 JPY
8. **Nakano** - 88 000 JPY
9. **Kita** - 90 000 JPY
10. **Arakawa** - 91 000 JPY

Ce sont surtout des arrondissements de l'est et de la peripherie. Ils sont a 20-40 minutes du centre mais restent bien desservis, et votre budget achete un vrai appartement plutot qu'une boite a chaussures.


![Le quartier de Tokyo le moins cher dépend de votre foyer : célibataire, couple ou famille](/tokyo-household-flip-fr.png "Célibataire : Edogawa, couple : Katsushika, famille : Adachi. Pas le même quartier.")
## Les arrondissements les plus chers de Tokyo
L'autre extreme, pour le meme studio 1K :

1. **Minato** - 140 000 JPY
2. **Chiyoda** - 137 000 JPY
3. **Chuo** - 130 000 JPY
4. **Shibuya** - 127 000 JPY
5. **Shinjuku** - 120 000 JPY
6. **Taito** - 115 000 JPY
7. **Shinagawa** - 112 000 JPY
8. **Koto** - 112 000 JPY

Vous payez l'emplacement, la commodite et un certain art de vivre. Pour beaucoup de cadres et de familles relocalises, ca vaut le coup, mais sachez que la prime est reelle.

## Loyer par arrondissement et type (1K, 1LDK, 2LDK)
Le classement change selon le type recherche. Pour un couple en 1LDK, Katsushika (118 000 JPY) est l'arrondissement le moins cher, devant Adachi et Edogawa. Loyer mensuel median par arrondissement, selon l'indice des loyers Tokyo Expat :

| Arrondissement | 1K | 1LDK | 2LDK |
|---|---|---|---|
| Edogawa | 74 000 | 125 000 | 162 000 |
| Adachi | 76 000 | 125 000 | 161 000 |
| Katsushika | 81 000 | 118 000 | 162 000 |
| Nerima | 82 000 | 135 000 | 176 000 |
| Suginami | 84 000 | 159 000 | 210 000 |
| Setagaya | 87 000 | 169 000 | 235 000 |
| Itabashi | 88 000 | 143 000 | 195 000 |
| Nakano | 88 000 | 174 000 | 225 000 |
| Kita | 90 000 | 152 000 | 218 000 |
| Arakawa | 91 000 | 150 000 | 219 000 |

Tous les chiffres sont des loyers mensuels medians en JPY, a partir de transactions reelles enregistrees. Pour les 23 arrondissements complets plus 27 lignes et 50 stations, voyez l'[Indice des loyers de Tokyo](/fr/data).

## Les stations les moins cheres, pour affiner
La moyenne par arrondissement cache beaucoup. Voici les stations les plus abordables parmi 50 grandes stations, pour un 1K :

1. **Kasai** - 76 000 JPY
2. **Shin-Koiwa** - 78 000 JPY
3. **Ayase** - 85 000 JPY
4. **Ogikubo** - 85 000 JPY
5. **Nerima** - 86 000 JPY
6. **Kita-Senju** - 86 000 JPY
7. **Akabane** - 86 000 JPY
8. **Setagaya** - 88 000 JPY

## Comment utiliser ce classement
- **Choisissez d'abord votre ligne et votre trajet, puis la station.** Dix minutes de plus sur la bonne ligne peuvent economiser 30 000 a 50 000 JPY/mois pour le meme appartement.
- **Les quartiers les moins chers ne sont pas "moins bien", juste plus loin.** Ils sont residentiels, surs et bien connectes.
- **Prevoyez la facture d'entree**, pas seulement le loyer : un bail classique peut demander 4 a 6 mois de loyer d'un coup. Voyez notre [guide pour louer a Tokyo](/fr/blog/trouver-appartement-tokyo-etranger).
- **Explorez chaque arrondissement, ligne et station** dans notre [Indice des loyers de Tokyo](/fr/data).

Si vous preferez confier ces chiffres a quelqu'un qui travaille dans le marche tokyoite, voyez [comment fonctionne le chasseur immobilier](/fr/blog/service-chasseur-immobilier-tokyo-comment-ca-marche) ou [reservez un appel gratuit](/fr/contact).

*Donnees : 528,660 annonces actives, 23 arrondissements de Tokyo, 2026. Loyer median 1K en JPY. Mis a jour chaque trimestre.*
    `.trim(),
  },
  {
    slug: 'tokyo-condo-price-trends',
    locale: 'en',
    title: 'How Tokyo Condo Prices Changed, 2021 to 2025 (Real Transaction Data)',
    description: 'Tokyo used-condo prices rose +29.6% per square metre from 2021 to 2025, from 103,933 real recorded sale transactions. Ward-by-ward, which areas rose most.',
    date: '2026-07-03',
    readingTime: '6 min',
    content: `
Everyone feels that Tokyo has gotten more expensive. But by how much, and where exactly? This is not an opinion piece. It is built on 103,933 actual recorded condominium sale transactions across Tokyo, from 2021 to 2025, so you see the real trend instead of a headline. These are settled sale prices, not the asking prices you find on listing sites.

**Quick answer:** The median price of a used condo in Tokyo rose from 720 000 to 933 333 JPY per square metre between 2021 and 2025, a +29.6% increase. The rise was far from even: central wards like Chuo (+60.3%) and Minato (+51.9%) climbed the most, while outer wards like Edogawa (+16.4%) rose the least. The gap between the centre and the rest widened.


![How Tokyo condo prices per m2 changed, 2021 to 2025, by ward](/tokyo-price-trends.png "Median second-hand condo price per m2, from ~100,000 recorded sale transactions")
## Tokyo condo prices, 2021 to 2025
Median transaction price per square metre, used condominiums, across all 23 wards:

- 2021: 720 000 JPY/m2
- 2025: 933 333 JPY/m2
- Change: +29.6% over 4 years

The curve is remarkably steady quarter after quarter. This is not a speculative spike, it is a sustained repricing of Tokyo real estate, driven by a weak yen, foreign demand, low interest rates and limited central supply.

## The wards that rose the most
Where the increase concentrated (median JPY per m2, 2021 vs 2025):

- **Chuo** +60.3% (1 081 176 -> 1 733 333 JPY/m2)
- **Minato** +51.9% (1 228 571 -> 1 866 666 JPY/m2)
- **Shibuya** +41.8% (1 108 391 -> 1 571 428 JPY/m2)
- **Chiyoda** +34.8% (1 236 363 -> 1 666 666 JPY/m2)
- **Koto** +33.3% (800 000 -> 1 066 666 JPY/m2)
- **Sumida** +29.8% (714 285 -> 927 272 JPY/m2)

Central and bayfront wards led. A 60 m2 apartment in Chuo went from roughly 64 870 560 to 103 999 980 JPY on these medians, a gap of tens of millions of yen in four years.

## The wards that rose the least
Prices went up almost everywhere, but the outer wards stayed far more accessible:

- **Edogawa** +16.4% (528 571 -> 615 384 JPY/m2)
- **Arakawa** +19.3% (670 588 -> 800 000 JPY/m2)
- **Bunkyo** +19.4% (1 038 181 -> 1 240 000 JPY/m2)
- **Adachi** +20.0% (461 538 -> 553 846 JPY/m2)
- **Ota** +21.6% (672 727 -> 818 181 JPY/m2)
- **Nerima** +21.6% (600 000 -> 729 411 JPY/m2)

If your budget is fixed, this is where it stretches furthest, and where the entry point into Tokyo ownership is still realistic.

## What this means if you are buying
- **The centre is pricing many buyers out.** If you want central Tokyo, the window to buy cheaply has largely closed; you are buying into a proven, liquid market at a premium.
- **The outer wards are the value play.** Lower price per m2, milder appreciation, but real rental demand and full train access.
- **Rent, then buy, is a valid strategy.** See where you can afford to rent first in our [cheapest Tokyo neighbourhoods ranking](/en/blog/cheapest-neighbourhoods-tokyo-ranked-by-rent), and explore live rents in the [Tokyo Rent Index](/en/data).
- **Median hides the mix.** These figures track the median transaction each quarter, so a shift in what sells can move the number; treat them as a market direction, not a valuation of your specific unit.

If you want someone inside the Tokyo market to turn these trends into an actual purchase or rental, see [how we work](/en/contact).

*Data: 103,933 real recorded used-condo sale transactions, Tokyo 23 wards, 2021Q1 to 2025Q3. Median settled price per m2 in JPY, not asking prices. Updated quarterly.*
    `.trim(),
  },
  {
    slug: 'evolution-prix-immobilier-tokyo',
    locale: 'fr',
    title: 'Evolution des prix immobiliers a Tokyo, 2021 a 2025 (donnees reelles)',
    description: 'Le prix des coproprietes d\'occasion a Tokyo a augmente de +29.6% au m2 de 2021 a 2025, sur 103,933 transactions reelles enregistrees. Arrondissement par arrondissement.',
    date: '2026-07-03',
    readingTime: '6 min',
    content: `
Tout le monde sent que Tokyo est devenue plus chere. Mais de combien, et ou exactement ? Ceci n'est pas un billet d'opinion. C'est bati sur 103,933 ventes reelles de coproprietes enregistrees a Tokyo, de 2021 a 2025, pour voir la vraie tendance plutot qu'un titre de presse. Ce sont des prix de vente conclus, pas les prix affiches des sites d'annonces.

**Reponse rapide :** Le prix median d'une copropriete d'occasion a Tokyo est passe de 720 000 a 933 333 JPY le metre carre entre 2021 et 2025, soit +29.6%. La hausse a ete tres inegale : les arrondissements centraux comme Chuo (+60.3%) et Minato (+51.9%) ont le plus grimpe, tandis que la peripherie comme Edogawa (+16.4%) a le moins bouge. L'ecart entre le centre et le reste s'est creuse.


![Évolution du prix des copropriétés à Tokyo au m2, 2021 à 2025, par arrondissement](/tokyo-price-map.png "Prix médian au m2 des copropriétés d'occasion, sur ~100 000 transactions réelles enregistrées")
## Les prix des coproprietes a Tokyo, 2021 a 2025
Prix median de transaction au metre carre, coproprietes d'occasion, sur les 23 arrondissements :

- 2021 : 720 000 JPY/m2
- 2025 : 933 333 JPY/m2
- Variation : +29.6% sur 4 ans

La courbe est remarquablement reguliere, trimestre apres trimestre. Ce n'est pas un pic speculatif, c'est une revalorisation durable de l'immobilier tokyoite, portee par un yen faible, la demande etrangere, des taux bas et une offre centrale limitee.

## Les arrondissements qui ont le plus augmente
La ou la hausse s'est concentree (JPY median par m2, 2021 vs 2025) :

- **Chuo** +60.3% (1 081 176 -> 1 733 333 JPY/m2)
- **Minato** +51.9% (1 228 571 -> 1 866 666 JPY/m2)
- **Shibuya** +41.8% (1 108 391 -> 1 571 428 JPY/m2)
- **Chiyoda** +34.8% (1 236 363 -> 1 666 666 JPY/m2)
- **Koto** +33.3% (800 000 -> 1 066 666 JPY/m2)
- **Sumida** +29.8% (714 285 -> 927 272 JPY/m2)

Les arrondissements centraux et de la baie sont en tete. Un appartement de 60 m2 a Chuo est passe d'environ 64 870 560 a 103 999 980 JPY sur ces medianes, un ecart de dizaines de millions de yens en quatre ans.

## Les arrondissements qui ont le moins augmente
Les prix ont monte presque partout, mais la peripherie reste bien plus accessible :

- **Edogawa** +16.4% (528 571 -> 615 384 JPY/m2)
- **Arakawa** +19.3% (670 588 -> 800 000 JPY/m2)
- **Bunkyo** +19.4% (1 038 181 -> 1 240 000 JPY/m2)
- **Adachi** +20.0% (461 538 -> 553 846 JPY/m2)
- **Ota** +21.6% (672 727 -> 818 181 JPY/m2)
- **Nerima** +21.6% (600 000 -> 729 411 JPY/m2)

Si votre budget est fixe, c'est la qu'il va le plus loin, et ou le ticket d'entree dans la propriete tokyoite reste realiste.

## Ce que cela veut dire si vous achetez
- **Le centre exclut beaucoup d'acheteurs.** Si vous visez le centre de Tokyo, la fenetre pour acheter bon marche est largement fermee ; vous entrez dans un marche liquide et eprouve, mais au prix fort.
- **La peripherie est le bon calcul.** Prix au m2 plus bas, appreciation plus douce, mais vraie demande locative et acces complet au reseau ferroviaire.
- **Louer d'abord, acheter ensuite reste une strategie valable.** Voyez ou vous pouvez vous permettre de louer dans notre [classement des quartiers les moins chers](/fr/blog/quartiers-tokyo-moins-chers-classement-loyers), et explorez les loyers en direct dans l'[Indice des loyers de Tokyo](/fr/data).
- **La mediane cache le melange.** Ces chiffres suivent la transaction mediane de chaque trimestre : un changement dans ce qui se vend peut deplacer le chiffre ; voyez-y une direction de marche, pas la valeur de votre bien precis.

Si vous voulez que quelqu'un du marche tokyoite transforme ces tendances en achat ou location reel, voyez [comment nous travaillons](/fr/contact).

*Donnees : 103,933 transactions reelles enregistrees de coproprietes d'occasion, 23 arrondissements de Tokyo, 2021Q1 a 2025Q3. Prix de vente median au m2 en JPY, pas des prix affiches. Mis a jour chaque trimestre.*
    `.trim(),
  },
  {
    slug: 'tokyo-rent-vs-world-cities',
    locale: 'en',
    title: 'Tokyo Rent vs Other World Cities (2026): Why It\'s So Cheap',
    description: 'How Tokyo rent compares to New York, London, Sydney and Hong Kong in 2026. A central Tokyo studio is often under $800, from 528,660 real listings.',
    date: '2026-07-04',
    readingTime: '8 min',
    content: `
Every time we publish Tokyo rent data, the same reaction floods in from around the world: "that is so cheap." People in Sydney, New York, London and Hong Kong look at the numbers and cannot believe a central studio can cost so little. So how does Tokyo really compare? Here is the honest picture, from 528,660 real active listings.

**Quick answer:** In 2026, a central Tokyo studio (1K) rents for roughly 90,000 to 140,000 JPY a month, which is about US$580 to US$900 at current rates. That is a fraction of what you pay for a small studio in New York (US$3,000+), London (GBP 1,600+), Sydney (A$2,600+) or Hong Kong (HK$15,000+). A weak yen makes Tokyo one of the best value major cities in the world to rent in right now.

## What a studio actually costs in Tokyo
Across Tokyo's 23 wards, the median rent for a 1K studio (one room plus a small separate kitchen, see our [layout guide](/en/blog/japanese-apartment-layouts-explained)) runs from 74,000 JPY in Edogawa to 140,000 JPY in Minato. Even the most expensive ward, right in the centre, lands near US$900 a month. You can explore every ward, line and station in our [Tokyo Rent Index](/en/data), or see the wider trend in our [Tokyo rent report](/en/blog/tokyo-rent-report-2026).

## How that stacks up against other cities
For a comparable small studio in the city core, typical monthly rents look roughly like this:
- **Tokyo:** US$580 to US$900
- **New York:** US$3,000 and up
- **London:** GBP 1,600 and up (around US$2,000)
- **Sydney:** A$2,600 and up (around US$1,700)
- **Hong Kong:** HK$15,000 and up (around US$1,900), often for a far smaller space
- **Paris:** EUR 1,000 and up

These other figures are approximate market ranges, not our data, but the gap is not subtle: Tokyo is often three to four times cheaper for a private, central home.

## What renters in other cities say
When we share these numbers, the comparisons that come back are the most telling part. A renter in Milan pointed out that a similar local salary there buys, at most, a room in a shared flat for around 850 euros, not a private studio. Someone in London described paying half their salary for an old, damp one-bed an hour from the centre. A reader in Hong Kong said the same money there gets a cramped, subdivided room in a building full of pests. Even in Seoul, where one renter noted you can still find a place for about US$500, the point stood. People in Sydney, Paris and Seoul all had versions of the same reaction: for a clean, private, central home, Tokyo is in a different league on space per dollar. These are anecdotes, not data, but they are remarkably consistent.

## But are salaries lower? The honest caveat
Yes, and this is the fair counterpoint. Tokyo's median salary is roughly US$30,000 to US$33,000, lower than New York or Sydney, so the "Tokyo is cheap" story depends on who you are:
- **If you earn abroad or remotely** (in dollars, euros or pounds), the weak yen is a straight discount and Tokyo is genuinely cheap.
- **If you earn a local yen salary**, rent is still very manageable, usually around the 30 percent of income rule of thumb, whereas many renters in New York or London now spend closer to half. Affordable relative to local pay, even if the dollar headline overstates it.

Either way, the ratio of rent to what you actually get, a private, well-connected, safe home, is hard to beat. For the full income and cost picture, see our [Tokyo cost of living guide](/en/blog/tokyo-expat-cost-of-living-2026).

## Why Tokyo is so affordable right now
Three forces stack up. First, the **weak yen**: at roughly 160 JPY to the dollar, every rent looks like a discount to foreign eyes. Second, **abundant supply**: Tokyo keeps building, which caps rents in a way supply-starved cities like London and Sydney never manage. Third, **compact, efficient units**: a Japanese studio is small but genuinely livable, so you are not overpaying for wasted space.

The catch is the upfront bill, not the monthly rent. A standard lease can ask for four to six months of rent all at once (deposit, key money, agency fee). See our [cheapest Tokyo neighbourhoods ranking](/en/blog/cheapest-neighbourhoods-tokyo-ranked-by-rent) to stretch your budget, and if you want someone inside the market to handle the search, see [how we work](/en/contact).

*Data: Tokyo figures from 528,660 active listings, 2026, median 1K rent in JPY. Other-city figures are approximate market ranges.*
    `.trim(),
  },
  {
    slug: 'loyers-tokyo-vs-grandes-villes',
    locale: 'fr',
    title: 'Loyers a Tokyo vs grandes villes mondiales (2026)',
    description: 'Comparatif des loyers de Tokyo avec New York, Londres, Sydney et Hong Kong en 2026. Un studio central a Tokyo est souvent sous les 800$, sur 528,660 annonces reelles.',
    date: '2026-07-04',
    readingTime: '8 min',
    content: `
À chaque fois que nous publions nos données de loyers à Tokyo, la même réaction arrive du monde entier : "c'est tellement pas cher". Les gens à Sydney, New York, Londres ou Hong Kong regardent les chiffres et n'en reviennent pas qu'un studio central puisse coûter si peu. Alors, comment Tokyo se compare-t-elle vraiment ? Voici le portrait honnête, sur 528,660 annonces réelles.

**Réponse rapide :** En 2026, un studio central à Tokyo (1K) se loue entre 90 000 et 140 000 JPY par mois, soit environ 580 à 900 US$ au taux actuel. C'est une fraction de ce que vous payez pour un petit studio à New York (3 000 US$ et plus), Londres (1 600 GBP et plus), Sydney (2 600 A$ et plus) ou Hong Kong (15 000 HK$ et plus). Le yen faible fait de Tokyo l'une des grandes villes au meilleur rapport qualité-prix au monde en ce moment.

## Ce que coûte vraiment un studio à Tokyo
Sur les 23 arrondissements de Tokyo, le loyer médian d'un studio 1K (une pièce plus une petite cuisine séparée, voir notre [guide des configurations](/fr/blog/types-appartements-japonais-expliques)) va de 74 000 JPY à Edogawa à 140 000 JPY à Minato. Même l'arrondissement le plus cher, en plein centre, tourne autour de 900 US$ par mois. Explorez chaque arrondissement, ligne et station dans notre [Indice des loyers de Tokyo](/fr/data), ou voyez la tendance d'ensemble dans notre [rapport sur les loyers de Tokyo](/fr/blog/rapport-loyers-tokyo-2026).

## Le comparatif avec les autres villes
Pour un petit studio comparable en centre-ville, les loyers mensuels typiques ressemblent à ceci :
- **Tokyo :** 580 à 900 US$
- **New York :** 3 000 US$ et plus
- **Londres :** 1 600 GBP et plus (environ 2 000 US$)
- **Sydney :** 2 600 A$ et plus (environ 1 700 US$)
- **Hong Kong :** 15 000 HK$ et plus (environ 1 900 US$), souvent pour bien plus petit
- **Paris :** 1 000 EUR et plus

Ces autres chiffres sont des fourchettes de marché approximatives, pas notre data, mais l'écart n'est pas subtil : Tokyo est souvent trois à quatre fois moins chère pour un logement privé et central.

## Ce que disent les locataires des autres villes
Quand nous partageons ces chiffres, ce sont les comparaisons qui reviennent qui parlent le plus. Un locataire à Milan soulignait qu'un salaire local comparable n'y paie, au mieux, qu'une chambre en colocation autour de 850 euros, pas un studio privé. Quelqu'un à Londres décrivait payer la moitié de son salaire pour un vieux une-pièce humide à une heure du centre. Un lecteur à Hong Kong racontait que la même somme y donne une chambre exiguë et subdivisée dans un immeuble infesté. À Sydney, Paris ou Séoul, la réaction était toujours la même : pour un logement propre, privé et central, Tokyo joue dans une autre catégorie de surface au dollar. Ce sont des anecdotes, pas des données, mais elles sont remarquablement constantes.

## Mais les salaires sont-ils plus bas ? La nuance honnête
Oui, et c'est le contre-argument légitime. Le salaire médian à Tokyo tourne autour de 30 000 à 33 000 US$, plus bas qu'à New York ou Sydney. Donc l'histoire du "Tokyo pas cher" dépend de qui vous êtes :
- **Si vous gagnez à l'étranger ou à distance** (en dollars, euros ou livres), le yen faible est une remise directe et Tokyo est vraiment bon marché.
- **Si vous gagnez un salaire local en yens**, le loyer reste très gérable, en général autour de la règle des 30 % du revenu, alors que beaucoup de locataires à New York ou Londres en sont aujourd'hui plus proches de la moitié. Abordable par rapport au revenu local, même si le chiffre en dollars exagère l'affaire.

Dans les deux cas, le rapport entre le loyer et ce que vous obtenez vraiment, un logement privé, bien connecté et sûr, est difficile à battre. Pour le tableau complet des revenus et du coût de la vie, voyez notre [guide du coût de la vie à Tokyo](/fr/blog/cout-vie-tokyo-expatrie-2026).

## Pourquoi Tokyo est si abordable en ce moment
Trois forces s'additionnent. D'abord le **yen faible** : à environ 160 JPY pour un dollar, chaque loyer ressemble à une remise pour un oeil étranger. Ensuite, une **offre abondante** : Tokyo continue de construire, ce qui plafonne les loyers, contrairement à Londres ou Sydney en pénurie. Enfin, des **logements compacts et efficaces** : un studio japonais est petit mais vraiment vivable, donc vous ne payez pas pour de l'espace gaspillé.

Le piège, c'est la facture d'entrée, pas le loyer mensuel. Un bail classique peut demander 4 à 6 mois de loyer d'un coup. Voyez notre [classement des quartiers les moins chers](/fr/blog/quartiers-tokyo-moins-chers-classement-loyers) pour étirer votre budget, et si vous voulez confier la recherche à quelqu'un du marché, voyez [comment nous travaillons](/fr/contact).

*Données : chiffres Tokyo sur 528,660 annonces actives, 2026, loyer médian 1K en JPY. Les chiffres des autres villes sont des fourchettes de marché approximatives.*
    `.trim(),
  },
  {
    slug: 'japanese-apartment-layouts-explained',
    locale: 'en',
    title: '1K, 1LDK, 2LDK: Japanese Apartment Layouts Explained (2026)',
    description: 'What 1R, 1K, 1DK, 1LDK and 2LDK actually mean in Japan, with typical sizes and rents. The simple guide to reading Tokyo apartment listings.',
    date: '2026-07-04',
    readingTime: '8 min',
    content: `
If you have ever looked at a Tokyo listing and wondered what "1K" or "1LDK" means, you are not alone. It is the single most common question we get. These are not sizes in square feet, they are Japanese layout codes, and once you know the system it is very easy to read.

**Quick answer:** The number is the count of rooms, and the letters describe the other spaces: R = room, K = kitchen, D = dining, L = living. So a 1K is one room plus a separate small kitchen (a studio), a 1LDK is one bedroom plus a combined living, dining and kitchen area (good for a couple), and a 2LDK adds a second bedroom (good for a family). The bathroom and toilet are always there but never appear in the code.


![What Japanese apartment layouts mean: 1K, 1DK, 1LDK and 2LDK compared](/tokyo-layouts-en.png "Median Tokyo rent by layout, from 528,660 real active listings")
## The layout codes, decoded
- **1R** (one room): a single room where the kitchen sits inside the main space, with no partition. The most compact option, often 13 to 20 square metres.
- **1K:** one room plus a separate small kitchen, divided by a door or partition. The classic single-person studio, usually 20 to 25 square metres. The "K" is often just a sink and one burner in the hallway, not a full kitchen.
- **1DK:** one room plus a dining-kitchen big enough for a small table. Around 25 to 30 square metres.
- **1LDK:** one bedroom plus a proper living-dining-kitchen. The sweet spot for couples, usually 30 to 45 square metres.
- **2LDK / 3LDK:** two or three bedrooms plus a living-dining-kitchen. Family territory.

The letters are conventionally written in the order L-D-K, so you will see "1LDK", not "1DLK". The number only counts proper rooms; it never counts the kitchen, bathroom or toilet.

## What is the "S" in 2SLDK?
An "S" stands for service room (nando): an extra enclosed space that legally cannot be called a bedroom because it fails the building code for window size and natural light. In practice it works fine as a study, walk-in closet, nursery or storage. So a 2SLDK is a two-bedroom with a bonus room that the listing is not allowed to count as a third bedroom. It is often cheaper per square metre than a true 3LDK for that reason.

## Does a Japanese apartment have a bathroom?
Yes, always. Every one of these layouts includes a bathroom and toilet; they simply are not written into the code because they are assumed. What varies is whether the bath and toilet share one room (a "unit bath", common in 1R and 1K) or are separated (more common from 1DK up), which many tenants prefer. If a listing says "BT separate" (bath and toilet betsu), they are in different rooms.

## How to read the floor plan symbols
Japanese floor plans (madori) use a few recurring marks:
- The washing-machine kanji marks the spot for your washing machine.
- **UB:** unit bath, a moulded bath-and-toilet in one.
- **CL / WCL:** closet / walk-in closet.
- **PS:** pipe space, a plumbing shaft that is not usable.
- **Genkan:** the entrance where you take off your shoes.
- **Balcony:** shown as a strip along the outside wall.
Knowing these lets you judge a place from the plan alone, before you ever visit.

## Sizes: what these codes feel like
Because the codes are not sizes, it helps to convert. A 1K at 20 to 25 square metres is roughly 215 to 270 square feet, which is studio-sized by US standards and genuinely small. Around 30 square metres (320 square feet) counts as a comfortable single apartment in Tokyo, and Japanese visitors will call it big. If you are coming from North America or Australia, set expectations early: you trade floor space for location and a low move-in cost. For how age changes this, see [does newer construction cost more](/en/blog/tokyo-rent-building-age).

## What each layout costs in Tokyo
Layout drives price as much as location. Across Tokyo, a 1K studio runs from 74,000 to 140,000 JPY, while a family 1LDK in central Minato reaches around 260,000 JPY. As a rule, moving up one layout (say 1K to 1LDK) roughly doubles the rent. You can compare exact medians by ward in our [Tokyo Rent Index](/en/data), or see the full picture in our [Tokyo rent report](/en/blog/tokyo-rent-report-2026).

## How to use this when apartment hunting
Decide your layout first, then your area, because layout sets your baseline budget. A single person almost always wants a 1K (or a share house or [social apartment](/en/blog/social-apartments-tokyo-guide) if community matters more than space). A couple should look at a 1LDK, not two 1Ks. Watch the size in square metres too: two 1LDKs at the same rent can differ by 10 square metres. For where these layouts are cheapest, see our [cheapest Tokyo neighbourhoods ranking](/en/blog/cheapest-neighbourhoods-tokyo-ranked-by-rent), or let us [handle the search](/en/contact).

## Frequently asked questions
**What does 1K mean?** One room plus a separate small kitchen: a studio, usually 20 to 25 square metres. The "1" is the room count; the "K" is the kitchen.

**Is 1K a size in square feet?** No. It is a layout code, not an area. A 1K is a floor plan, and its size is listed separately in square metres.

**What is the S in 2SLDK?** A service room (nando): an extra room that cannot legally be called a bedroom, useful as storage, an office or a nursery.

**Do Japanese apartments have bathrooms?** Yes, every layout includes a bath and toilet; they are just not written into the code.

**What is the difference between 1K and 1LDK?** A 1K is a single-person studio; a 1LDK adds a separate bedroom and a real living-dining-kitchen, suited to a couple, and costs roughly double.

*Data: layout medians from 528,660 active Tokyo listings, 2026.*
    `.trim(),
  },
  {
    slug: 'types-appartements-japonais-expliques',
    locale: 'fr',
    title: '1K, 1LDK, 2LDK : les types d\'appartements japonais expliques',
    description: 'Ce que signifient vraiment 1R, 1K, 1DK, 1LDK et 2LDK au Japon, avec surfaces et loyers typiques. Le guide simple pour lire les annonces a Tokyo.',
    date: '2026-07-04',
    readingTime: '8 min',
    content: `
Si vous avez déjà regardé une annonce à Tokyo en vous demandant ce que veut dire "1K" ou "1LDK", vous n'êtes pas seul. C'est la question la plus fréquente qu'on nous pose. Ce ne sont pas des surfaces en mètres carrés, ce sont des codes de configuration japonais, et une fois le système compris, c'est très simple à lire.

**Réponse rapide :** Le chiffre est le nombre de pièces, et les lettres décrivent les autres espaces : R = pièce, K = cuisine, D = coin repas, L = salon. Donc un 1K, c'est une pièce plus une petite cuisine séparée (un studio), un 1LDK, c'est une chambre plus un espace salon-repas-cuisine (idéal pour un couple), et un 2LDK ajoute une deuxième chambre (idéal pour une famille). La salle de bain et les toilettes sont toujours là mais n'apparaissent jamais dans le code.


![Ce que signifient les plans japonais : 1K, 1DK, 1LDK et 2LDK comparés](/tokyo-layouts-fr.png "Loyer médian à Tokyo par type, sur 528 660 annonces réelles actives")
## Les codes de configuration, décodés
- **1R** (one room) : une pièce unique où la cuisine est dans l'espace principal, sans cloison. L'option la plus compacte, souvent 13 à 20 m2.
- **1K :** une pièce plus une petite cuisine séparée par une porte ou une cloison. Le studio classique pour une personne, en général 20 à 25 m2. Le "K" est souvent juste un évier et une plaque dans le couloir, pas une vraie cuisine.
- **1DK :** une pièce plus une cuisine-repas assez grande pour une petite table. Environ 25 à 30 m2.
- **1LDK :** une chambre plus un vrai salon-repas-cuisine. Le point idéal pour un couple, en général 30 à 45 m2.
- **2LDK / 3LDK :** deux ou trois chambres plus un salon-repas-cuisine. Territoire familial.

Les lettres s'écrivent par convention dans l'ordre L-D-K, donc vous verrez "1LDK", pas "1DLK". Le chiffre ne compte que les vraies pièces ; il ne compte jamais la cuisine, la salle de bain ni les toilettes.

## Que signifie le "S" dans 2SLDK ?
Un "S" désigne une pièce de service (nando) : un espace fermé supplémentaire qui, légalement, ne peut pas être appelé "chambre" car il ne respecte pas les normes de construction sur la taille de fenêtre et la lumière naturelle. En pratique, il sert très bien de bureau, de dressing, de chambre d'enfant ou de rangement. Un 2SLDK est donc un deux-chambres avec une pièce bonus que l'annonce n'a pas le droit de compter comme troisième chambre. Il est souvent moins cher au mètre carré qu'un vrai 3LDK pour cette raison.

## Un appartement japonais a-t-il une salle de bain ?
Oui, toujours. Chacune de ces configurations inclut une salle de bain et des toilettes ; elles ne sont simplement pas écrites dans le code car elles sont sous-entendues. Ce qui varie, c'est si le bain et les toilettes partagent une même pièce (un "unit bath", fréquent en 1R et 1K) ou sont séparés (plus courant à partir du 1DK), ce que beaucoup de locataires préfèrent. Si une annonce indique バス・トイレ別 (bain et toilettes betsu), ils sont dans des pièces différentes.

## Comment lire les symboles du plan
Les plans japonais (madori) utilisent quelques marques récurrentes :
- Le kanji de la machine à laver marque l'emplacement de votre lave-linge.
- **UB :** unit bath, un bloc bain et toilettes moulé en un seul.
- **CL / WCL :** placard / dressing.
- **PS :** gaine technique, une colonne de plomberie inutilisable.
- **Genkan :** l'entrée où l'on retire ses chaussures.
- **Balcon :** représenté par une bande le long du mur extérieur.
Connaître ces symboles permet de juger un logement sur plan, avant même de le visiter.

## Les tailles : à quoi ressemblent ces codes
Comme les codes ne sont pas des surfaces, mieux vaut convertir. Un 1K de 20 à 25 m2 fait environ 215 à 270 square feet : la taille d'un studio aux normes américaines, et vraiment petit. Autour de 30 m2 (320 square feet), on parle d'un appartement confortable pour une personne à Tokyo, et des visiteurs japonais le trouveront grand. Si vous venez d'Amérique du Nord ou d'Australie, ajustez vos attentes tôt : vous échangez de la surface contre l'emplacement et des frais d'entrée faibles. Pour l'effet de l'âge du bâtiment, voir [le neuf coûte-t-il plus cher](/fr/blog/loyer-tokyo-age-batiment).

## Ce que chaque configuration coûte à Tokyo
La configuration détermine le prix autant que l'emplacement. À Tokyo, un studio 1K va de 74 000 à 140 000 JPY, tandis qu'un 1LDK familial dans Minato central atteint environ 260 000 JPY. En règle générale, monter d'une configuration (par ex. 1K à 1LDK) double à peu près le loyer. Comparez les médianes exactes par arrondissement dans notre [Indice des loyers de Tokyo](/fr/data), ou voyez le tableau complet dans notre [rapport sur les loyers de Tokyo](/fr/blog/rapport-loyers-tokyo-2026).

## Comment s'en servir pour chercher
Choisissez d'abord votre configuration, puis votre quartier, car la configuration fixe votre budget de base. Une personne seule veut presque toujours un 1K (ou une share house ou un [social apartment](/fr/blog/social-apartment-tokyo-guide) si la communauté compte plus que l'espace). Un couple devrait viser un 1LDK, pas deux 1K. Surveillez aussi la surface en m2 : deux 1LDK au même loyer peuvent différer de 10 m2. Pour savoir où ces configurations sont les moins chères, voyez notre [classement des quartiers les moins chers](/fr/blog/quartiers-tokyo-moins-chers-classement-loyers), ou laissez-nous [gérer la recherche](/fr/contact).

## Questions fréquentes
**Que veut dire 1K ?** Une pièce plus une petite cuisine séparée : un studio, en général 20 à 25 m2. Le "1" est le nombre de pièces ; le "K" est la cuisine.

**1K est-il une taille en square feet ?** Non. C'est un code de configuration, pas une surface. Un 1K est un plan, et sa taille est indiquée séparément en mètres carrés.

**Que signifie le S dans 2SLDK ?** Une pièce de service (nando) : une pièce supplémentaire qui ne peut pas légalement être appelée chambre, utile comme rangement, bureau ou chambre d'enfant.

**Les appartements japonais ont-ils une salle de bain ?** Oui, chaque configuration inclut un bain et des toilettes ; ils ne sont simplement pas écrits dans le code.

**Quelle est la différence entre 1K et 1LDK ?** Un 1K est un studio pour une personne ; un 1LDK ajoute une chambre séparée et un vrai salon-repas-cuisine, adapté à un couple, et coûte environ le double.

*Données : médianes par configuration sur 528,660 annonces actives à Tokyo, 2026.*
    `.trim(),
  },
  {
    slug: 'tokyo-rent-building-age',
    locale: 'en',
    title: 'Does Newer Construction Cost More to Rent in Tokyo? (2026)',
    description: 'How building age affects Tokyo rent: new builds command a premium, older ones are cheaper but come with trade-offs. What to check before you sign.',
    date: '2026-07-04',
    readingTime: '6 min',
    content: `
When we published median rents by station, a sharp reader pushed back: could you really get a newly built place at that median? It is a fair point. A station median blends every building age together, and building age is one of the biggest hidden drivers of Tokyo rent.

**Quick answer:** Newer construction rents at a clear premium in Tokyo, often 20 to 40 percent more than an older unit at the same station for the same layout. A median rent figure sits in the middle because it pools new and old stock, so a brand-new 2015-or-later 1K usually costs more than the headline median, while a 1980s unit costs less.

## Why age moves the price so much
Two thresholds matter. The first is **1981**, when Japan's earthquake building code was strengthened. Anything built before 1981 (kyu-taishin) is priced lower because it predates modern seismic standards. The second is simply **newness**: post-2015 buildings command a premium for modern insulation, better soundproofing, delivery boxes, and cleaner finishes.

## What you gain and give up
- **Newer (2015+):** higher rent, but modern earthquake safety, better insulation and lower running costs. Best if budget allows.
- **Mid-age (1990s to 2010s):** the value sweet spot, post-1981 safety without the new-build premium.
- **Older (pre-1981):** cheapest rent, but check the seismic standard, insulation and management fees carefully.

## How to read a median with this in mind
Treat any station or ward median as a **typical** rent across all ages, not the price of a new unit. If you want new construction, budget 20 to 40 percent above the median for that station. Our [Tokyo Rent Index](/en/data) gives you the median baseline; from there, filter by build year on listing sites, or let us [find a place](/en/contact) that matches your age and budget requirements. For a broader view, see how [prices have moved over time](/en/blog/tokyo-condo-price-trends).

*Data: based on 528,660 active Tokyo listings, 2026. Age premiums are typical market ranges.*
    `.trim(),
  },
  {
    slug: 'loyer-tokyo-age-batiment',
    locale: 'fr',
    title: 'Le neuf coute-t-il plus cher a louer a Tokyo ? (2026)',
    description: 'Comment l\'age du batiment influence le loyer a Tokyo : le neuf se paie plus cher, l\'ancien est moins cher mais avec des compromis. Ce qu\'il faut verifier.',
    date: '2026-07-04',
    readingTime: '6 min',
    content: `
Quand nous avons publie les loyers medians par station, un lecteur avise a objecte : pouvait-on vraiment avoir du neuf a ce loyer median ? La remarque est juste. Un median par station melange tous les ages de batiments, et l'age est l'un des plus gros facteurs caches du loyer a Tokyo.

**Reponse rapide :** Le neuf se loue avec une prime nette a Tokyo, souvent 20 a 40 pour cent de plus qu'un logement ancien a la meme station pour la meme configuration. Un loyer median se situe au milieu car il melange stock neuf et ancien : un 1K construit apres 2015 coute donc en general plus que le median affiche, tandis qu'un logement des annees 1980 coute moins.

## Pourquoi l'age deplace autant le prix
Deux seuils comptent. Le premier est **1981**, quand le code parasismique japonais a ete renforce. Tout ce qui est construit avant 1981 (kyu-taishin) est moins cher car anterieur aux normes sismiques modernes. Le second, c'est simplement la **nouveaute** : les batiments d'apres 2015 se paient plus cher pour l'isolation moderne, une meilleure insonorisation, les boites de livraison et des finitions plus propres.

## Ce que vous gagnez et ce que vous perdez
- **Neuf (2015+) :** loyer plus eleve, mais securite sismique moderne, meilleure isolation et couts d'usage plus bas. Le mieux si le budget suit.
- **Age intermediaire (1990-2010) :** le point d'equilibre, securite post-1981 sans la prime du neuf.
- **Ancien (avant 1981) :** loyer le moins cher, mais verifiez bien la norme sismique, l'isolation et les charges.

## Comment lire un median avec ca en tete
Considerez tout median par station ou arrondissement comme un loyer **typique** tous ages confondus, pas le prix du neuf. Si vous voulez du neuf, prevoyez 20 a 40 pour cent au-dessus du median de cette station. Notre [Indice des loyers de Tokyo](/fr/data) vous donne la base mediane ; ensuite, filtrez par annee de construction sur les sites d'annonces, ou laissez-nous [trouver un logement](/fr/contact) qui colle a vos exigences d'age et de budget. Pour une vue plus large, voyez comment [les prix ont evolue](/fr/blog/evolution-prix-immobilier-tokyo).

*Donnees : sur 528,660 annonces actives a Tokyo, 2026. Les primes d'age sont des fourchettes de marche typiques.*
    `.trim(),
  },
  {
    slug: 'tokyo-most-exclusive-neighbourhoods',
    locale: 'en',
    title: 'Tokyo\'s Most Exclusive Neighbourhoods to Rent (2026)',
    description: 'Where Tokyo\'s real top end sits: Azabu, Hiroo, Daikanyama, Nakameguro and the priciest stations. What luxury rent actually costs in the capital.',
    date: '2026-07-04',
    readingTime: '6 min',
    content: `
Whenever we rank Tokyo rents, someone points out that the true high end is missing. They are right, and it is worth explaining. Tokyo's most exclusive pockets are small and low-volume, so they do not always clear the sample size needed for a reliable station median, but that is exactly where the real luxury sits.

**Quick answer:** Tokyo's most exclusive rental areas cluster in Minato and Shibuya wards: Azabu (especially Nishi-Azabu and Azabu-Juban), Hiroo, Daikanyama, Nakameguro, Omotesando and Shoto. In these pockets a 1K can run 150,000 JPY and up, and a family 1LDK or 2LDK easily reaches 300,000 to 600,000 JPY a month. The most expensive station in our dataset, Jimbocho, already sits at 150 000 JPY for a studio.

## Where the real top end lives
- **Azabu / Hiroo (Minato):** old-money embassy district, international schools, quiet leafy streets. The benchmark for prestige.
- **Daikanyama / Nakameguro (Shibuya, Meguro):** design-led, cafe culture, boutique buildings. Fashionable rather than stuffy.
- **Omotesando / Aoyama:** flagship shopping meets residential calm just behind the avenues.
- **Shoto:** Tokyo's quiet mansion district near Shibuya, genuinely rare stock.

## Why these do not always show in the data
A reliable station median needs a healthy number of active listings. Prime pockets are small, tightly held and turn over slowly, so at any moment there may be only a handful of 1K listings, not enough for a robust median without noise. This is why our published ranking is best read as **typical** rents near major stations, not the ceiling. Minato is still the priciest ward overall at 140 000 JPY median for a 1K, with 1LDKs around 260 000 JPY.

## Renting at the top end
Luxury units are held by a smaller set of agencies and move fast, often before they are widely listed. Fluent handling of the guarantor process and building rules matters more here, not less. Explore the broader picture in our [Tokyo Rent Index](/en/data), see [how prices have climbed](/en/blog/tokyo-condo-price-trends), or if you are targeting a prime address, [tell us what you want](/en/contact).

*Data: 528,660 active Tokyo listings, 2026. Prime-pocket figures are typical ranges, since low-volume areas may not have a robust median.*
    `.trim(),
  },
  {
    slug: 'quartiers-huppes-tokyo',
    locale: 'fr',
    title: 'Les quartiers les plus huppes de Tokyo a louer (2026)',
    description: 'Ou se situe le vrai haut de gamme de Tokyo : Azabu, Hiroo, Daikanyama, Nakameguro et les stations les plus cheres. Ce que coute vraiment le luxe dans la capitale.',
    date: '2026-07-04',
    readingTime: '6 min',
    content: `
Chaque fois que nous classons les loyers de Tokyo, quelqu'un fait remarquer que le vrai haut de gamme manque. Il a raison, et ca merite une explication. Les quartiers les plus huppes de Tokyo sont petits et a faible volume : ils ne passent donc pas toujours le seuil d'echantillon necessaire a un median fiable, mais c'est justement la que se trouve le vrai luxe.

**Reponse rapide :** Les quartiers de location les plus huppes de Tokyo se concentrent dans Minato et Shibuya : Azabu (surtout Nishi-Azabu et Azabu-Juban), Hiroo, Daikanyama, Nakameguro, Omotesando et Shoto. Dans ces poches, un 1K peut depasser 150 000 JPY, et un 1LDK ou 2LDK familial atteint facilement 300 000 a 600 000 JPY par mois. La station la plus chere de notre jeu de donnees, Jimbocho, est deja a 150 000 JPY pour un studio.

## Ou se trouve le vrai sommet
- **Azabu / Hiroo (Minato) :** quartier des ambassades, ecoles internationales, rues calmes et arborees. La reference du prestige.
- **Daikanyama / Nakameguro (Shibuya, Meguro) :** design, culture cafe, immeubles boutique. Chic plutot que guinde.
- **Omotesando / Aoyama :** boutiques phares et calme residentiel juste derriere les avenues.
- **Shoto :** le quartier residentiel discret pres de Shibuya, un stock vraiment rare.

## Pourquoi ils n'apparaissent pas toujours dans la data
Un median par station fiable a besoin d'un nombre suffisant d'annonces actives. Les poches prime sont petites, gardees et tournent lentement : a un instant donne, il peut n'y avoir qu'une poignee d'annonces 1K, pas assez pour un median robuste sans bruit. C'est pourquoi notre classement se lit comme des loyers **typiques** pres des grandes stations, pas le plafond. Minato reste l'arrondissement le plus cher globalement, a 140 000 JPY de median pour un 1K, avec des 1LDK autour de 260 000 JPY.

## Louer dans le haut de gamme
Les biens de luxe sont detenus par un cercle plus restreint d'agences et partent vite, souvent avant d'etre largement diffuses. Une gestion fluide du garant et des regles d'immeuble compte encore plus ici. Explorez la vue d'ensemble dans notre [Indice des loyers de Tokyo](/fr/data), voyez [comment les prix ont grimpe](/fr/blog/evolution-prix-immobilier-tokyo), ou si vous visez une adresse prime, [dites-nous ce que vous cherchez](/fr/contact).

*Donnees : 528,660 annonces actives a Tokyo, 2026. Les chiffres des poches prime sont des fourchettes typiques, car les zones a faible volume peuvent ne pas avoir de median robuste.*
    `.trim(),
  },
  {
    slug: 'furnished-apartments-tokyo-guide',
    locale: 'en',
    title: 'Furnished Apartments in Tokyo: The Complete Guide for Foreigners (2026)',
    description: 'How to rent a furnished apartment in Tokyo as a foreigner in 2026: costs, long-term options, no guarantor, and how the process really works.',
    date: '2026-07-04',
    readingTime: '7 min',
    content: `
Finding a furnished apartment in Tokyo as a foreigner should be simple, but it rarely is. Most standard rentals are unfurnished, demand a Japanese guarantor, and ask for four to six months of rent upfront. Furnished apartments cut through all of that, which is exactly why they are the easiest way for a foreigner to move into Tokyo. Here is the complete, honest guide.

**Quick answer:** A furnished apartment in Tokyo typically rents for 80,000 to 200,000 JPY a month (about US$500 to US$1,300), bills often included, with no guarantor and no Japanese bank account required. They come in three flavours: monthly mansions (private, fully furnished), serviced apartments (hotel-like), and share houses (cheapest, from around 35,000 JPY). You can usually move in within one to two weeks.


![Median 1K studio rent by Tokyo ward, mapped (2026)](/tokyo-rent-map.png "Median 1K rent across the 23 wards, from 528,660 real active listings")
## What "furnished" actually means in Tokyo
There is no single furnished market in Tokyo, there are three:
- **Monthly mansion (manslee mansion):** a private, fully furnished apartment with a bed, kitchen, appliances and Wi-Fi, rented by the month. The best balance of privacy and flexibility, usually 80,000 to 200,000 JPY.
- **Serviced apartment:** hotel-like, with cleaning and reception, aimed at business travellers. The most expensive and the most turnkey.
- **Share house:** a private room in a shared building, all bills included, community kitchen. The cheapest entry into Tokyo, often 35,000 to 90,000 JPY.

## How much a furnished apartment costs
Furnished units carry a premium over a bare unfurnished apartment because you skip buying furniture and the huge upfront lease bill. Expect roughly:
- **Share house room:** 35,000 to 90,000 JPY a month, bills included.
- **Monthly mansion (studio):** 90,000 to 180,000 JPY.
- **Monthly mansion (1LDK for a couple):** 150,000 to 260,000 JPY.
Compare that to unfurnished rents by ward and layout in our [Tokyo Rent Index](/en/data). The furnished premium is real, but it disappears once you count the furniture and move-in costs you avoid.

## Furnished vs unfurnished: the real trade-off
An unfurnished apartment has a lower monthly rent, but the upfront bill (deposit, key money, agency fee, guarantor company, plus buying everything) can top 500,000 JPY before you sleep there one night. A furnished apartment front-loads almost nothing: you pay rent, maybe a small cleaning fee, and move in. For a stay under two years, or any time you value speed and certainty, furnished usually wins on total cost.

## Long-term furnished apartments in Tokyo
Furnished does not mean short-term only. Plenty of monthly mansions and share houses offer long-term rates that drop the longer you commit, and many foreigners live in them for years. If you want to stay one, two or three years without the guarantor and bank-account hurdles of a standard lease, a long-term furnished contract is the smoothest path in.

## How to rent one as a foreigner
This is where furnished shines. Most furnished and share-house operators are built for foreign tenants:
- **No Japanese guarantor** required.
- **No Japanese bank account** needed to start.
- **Documents are simple:** passport, visa or residence card, proof of funds.
- **Fast:** move-in in one to two weeks, not the four to eight of a standard lease.

The catch is that the best furnished units are held by a small set of operators and move quickly, often before they are widely advertised. That is where an insider helps. See our [ranking of the cheapest Tokyo neighbourhoods](/en/blog/cheapest-neighbourhoods-tokyo-ranked-by-rent) to choose an area, learn to read [Japanese apartment layouts](/en/blog/japanese-apartment-layouts-explained), and when you are ready, [tell us what you need](/en/contact) and we will find the furnished place that fits.

*Costs are typical 2026 market ranges for furnished housing in Tokyo. Unfurnished figures come from our Tokyo Rent Index.*
    `.trim(),
  },
  {
    slug: 'guide-appartements-meubles-tokyo',
    locale: 'fr',
    title: 'Appartements meubles a Tokyo : le guide complet pour etrangers (2026)',
    description: 'Comment louer un appartement meuble a Tokyo en tant qu\'etranger en 2026 : couts, longue duree, sans garant, et comment ca marche vraiment.',
    date: '2026-07-04',
    readingTime: '7 min',
    content: `
Trouver un appartement meuble a Tokyo quand on est etranger devrait etre simple, mais ca l'est rarement. La plupart des locations classiques sont vides, exigent un garant japonais et demandent 4 a 6 mois de loyer d'avance. Les appartements meubles balaient tout ca, et c'est exactement pourquoi c'est la facon la plus simple pour un etranger de s'installer a Tokyo. Voici le guide complet et honnete.

**Reponse rapide :** Un appartement meuble a Tokyo se loue en general entre 80 000 et 200 000 JPY par mois (environ 500 a 1 300 US$), charges souvent incluses, sans garant ni compte bancaire japonais. Il en existe trois types : monthly mansion (prive, entierement meuble), serviced apartment (facon hotel), et share house (le moins cher, a partir d'environ 35 000 JPY). On peut souvent emmenager en une a deux semaines.


![Loyer médian d'un studio 1K par arrondissement de Tokyo, en carte (2026)](/tokyo-rent-map.png "Loyer médian 1K dans les 23 arrondissements, sur 528 660 annonces réelles actives")
## Ce que "meuble" veut vraiment dire a Tokyo
Il n'y a pas un seul marche du meuble a Tokyo, il y en a trois :
- **Monthly mansion (mansuri manshon) :** un appartement prive entierement meuble avec lit, cuisine, electromenager et Wi-Fi, loue au mois. Le meilleur equilibre entre intimite et flexibilite, en general 80 000 a 200 000 JPY.
- **Serviced apartment :** facon hotel, avec menage et reception, pour les voyageurs d'affaires. Le plus cher et le plus cle-en-main.
- **Share house :** une chambre privee dans un immeuble partage, charges incluses, cuisine commune. L'entree la moins chere a Tokyo, souvent 35 000 a 90 000 JPY.

## Combien coute un appartement meuble
Le meuble se paie plus cher qu'un appartement vide, parce que vous evitez d'acheter des meubles et l'enorme facture d'entree d'un bail. Comptez en gros :
- **Chambre en share house :** 35 000 a 90 000 JPY par mois, charges incluses.
- **Monthly mansion (studio) :** 90 000 a 180 000 JPY.
- **Monthly mansion (1LDK pour un couple) :** 150 000 a 260 000 JPY.
Comparez avec les loyers vides par arrondissement et configuration dans notre [Indice des loyers de Tokyo](/fr/data). La prime du meuble est reelle, mais elle disparait des qu'on compte les meubles et frais d'entree evites.

## Meuble vs vide : le vrai arbitrage
Un appartement vide a un loyer mensuel plus bas, mais la facture d'entree (depot, key money, frais d'agence, societe de garantie, plus tout acheter) peut depasser 500 000 JPY avant meme d'y dormir une nuit. Un meuble ne demande presque rien d'avance : vous payez le loyer, parfois un petit frais de menage, et vous emmenagez. Pour un sejour de moins de deux ans, ou des que vous valorisez la rapidite et la certitude, le meuble gagne en general sur le cout total.

## Appartements meubles longue duree a Tokyo
Meuble ne veut pas dire seulement court terme. Beaucoup de monthly mansions et de share houses proposent des tarifs longue duree qui baissent plus vous vous engagez, et de nombreux etrangers y vivent des annees. Si vous voulez rester un, deux ou trois ans sans les obstacles du garant et du compte bancaire d'un bail classique, un contrat meuble longue duree est la voie la plus fluide.

## Comment en louer un quand on est etranger
C'est la que le meuble brille. La plupart des operateurs de meuble et de share house sont concus pour les locataires etrangers :
- **Pas de garant japonais** exige.
- **Pas de compte bancaire japonais** necessaire pour demarrer.
- **Dossier simple :** passeport, visa ou carte de resident, justificatif de fonds.
- **Rapide :** emmenagement en une a deux semaines, pas les 4 a 8 d'un bail classique.

Le piege, c'est que les meilleurs meubles sont detenus par un petit cercle d'operateurs et partent vite, souvent avant d'etre largement diffuses. C'est la qu'un insider aide. Voyez notre [classement des quartiers les moins chers](/fr/blog/quartiers-tokyo-moins-chers-classement-loyers) pour choisir un secteur, apprenez a lire les [configurations d'appartements japonais](/fr/blog/types-appartements-japonais-expliques), et quand vous etes pret, [dites-nous ce qu'il vous faut](/fr/contact) et nous trouverons le meuble qui vous correspond.

*Les couts sont des fourchettes de marche 2026 typiques pour le meuble a Tokyo. Les chiffres du vide viennent de notre Indice des loyers.*
    `.trim(),
  },
  {
    slug: 'expat-apartments-tokyo',
    locale: 'en',
    title: 'Expat Apartments in Tokyo: How to Find One in 2026',
    description: 'How to find an expat-friendly apartment in Tokyo in 2026: what "gaijin apartments" really are, real costs, no guarantor, and where to look.',
    date: '2026-07-10',
    readingTime: '7 min',
    content: `
"Expat apartments" and "gaijin apartments" are not a separate type of property; they are simply the rentals in Tokyo that actually accept foreigners, without the usual barriers. Here is what that means in 2026 and how to find one.

**Quick answer:** An expat (or gaijin) apartment in Tokyo is a rental that welcomes foreign tenants, usually furnished, with no Japanese guarantor, no key money and English-friendly paperwork. In practice that means a share house, a social apartment, a furnished monthly mansion, or a standard lease arranged through a bilingual agent. Expect 45,000 to 200,000 JPY per month depending on the type and how central you want to be.


![Monthly rent range by housing type in Tokyo](/tokyo-housing-rent-range-en.png "Share house 35k-90k vs standard rental 60k-250k JPY")
## What is an "expat" or "gaijin" apartment?

There is no legal category called a gaijin apartment. The term is shorthand for rentals set up to take foreign tenants, because the standard Japanese market puts up real barriers: a Japanese guarantor, key money, agency fees, and paperwork in Japanese. An expat apartment removes those. You sign in English (or with a bilingual agent), skip the guarantor via a guarantee company, and often move in within days.

## The four main options

**1. Share house (45,000 to 90,000 JPY).** A private furnished room with shared kitchen and bathroom, no guarantor, move in within a week. The cheapest and fastest way in. See our [gaijin house guide](/en/blog/gaijin-house-tokyo-guide).

**2. Social apartment (70,000 to 130,000 JPY).** A design-led share house with large common spaces and an active community. More privacy and comfort than a basic share house. See our [social apartment guide](/en/blog/social-apartments-tokyo-guide).

**3. Monthly mansion (80,000 to 200,000 JPY).** A fully furnished private studio with your own kitchen and bathroom, rented by the month, no guarantor. Best when you want privacy and a usable address for admin.

**4. Standard lease via a bilingual agent (from ~90,000 JPY plus move-in fees).** A normal unfurnished apartment, but arranged by an agent who handles the guarantee company and the Japanese paperwork for you. Best for long stays. See how to [find an apartment as a foreigner](/en/blog/find-apartment-tokyo-foreigner).

## What they cost in 2026

| Type | Monthly rent | Guarantor | Move-in |
|---|---|---|---|
| Share house | 45,000-90,000 | None | Within a week |
| Social apartment | 70,000-130,000 | None | 1-2 weeks |
| Monthly mansion | 80,000-200,000 | None | 1-2 weeks |
| Standard lease (agent) | 90,000+ (4-6 months upfront) | Guarantee company | 2-4 weeks |

For real median rents by ward, line and station, see our [Tokyo Rent Index](/en/data).

## Where to look

Foreigner-friendly stock clusters just outside the Yamanote loop, in wards like Nakano, Koenji, Kita and Itabashi, where you get central access for less than Shibuya or Shinjuku. For where each layout is cheapest, see our [cheapest Tokyo neighbourhoods ranking](/en/blog/cheapest-neighbourhoods-tokyo-ranked-by-rent).

Timing matters too. The February to April peak, when company transfers and students flood the market, is when availability tightens and there is almost no room to negotiate. Moving in the quieter May to August window gives you more choice and better terms, which is worth planning around if your dates are flexible.

## How to avoid the common traps

- Confirm what is included (utilities, internet, bedding) before you sign.
- Understand the layout codes so you know what you are getting: read our [Japanese apartment layouts guide](/en/blog/japanese-apartment-layouts-explained).
- Watch the upfront bill on standard leases: four to six months of rent is normal. See our [rental traps guide](/en/blog/tokyo-rental-traps-foreigners).

## Frequently asked questions

**Can a foreigner rent an apartment in Tokyo without a guarantor?** Yes. Share houses, social apartments and monthly mansions require no guarantor, and standard leases use a guarantee company instead.

**What is a gaijin apartment?** It is informal shorthand for a rental that accepts foreign tenants easily: furnished, English-friendly, no guarantor and no key money.

**How much is an apartment for an expat in Tokyo?** From around 45,000 JPY per month for a share house room to 200,000 JPY for a central furnished studio. A standard unfurnished lease is cheaper monthly but adds four to six months of upfront fees.

**What is the fastest way for an expat to get an apartment in Tokyo?** A share house or monthly mansion, both bookable from abroad with a passport and visa, with move-in within days.

Finding an expat apartment in Tokyo is mostly about knowing which door to use. Pick the type that fits your stay and budget, and if you want someone inside the market to handle it, [tell us what you need](/en/contact).

---

*See also: [furnished apartments in Tokyo](/en/blog/furnished-apartment-tokyo-top-5-expats) and [gaijin house vs share house](/en/blog/gaijin-house-vs-share-house-tokyo).*
    `.trim(),
  },
  {
    slug: 'appartements-expatries-tokyo',
    locale: 'fr',
    title: 'Appartements pour expatriés à Tokyo : comment en trouver (2026)',
    description: 'Comment trouver un appartement pour expatrié à Tokyo en 2026 : ce que sont les "appartements gaijin", les coûts réels, sans garant, et où chercher.',
    date: '2026-07-10',
    readingTime: '7 min',
    content: `
Les "appartements pour expatriés" ou "appartements gaijin" ne sont pas un type de bien à part : ce sont simplement les logements de Tokyo qui acceptent vraiment les étrangers, sans les barrières habituelles. Voici ce que ça veut dire en 2026 et comment en trouver un.

**Réponse rapide :** Un appartement pour expatrié (ou gaijin) à Tokyo est une location qui accueille les locataires étrangers, souvent meublée, sans garant japonais, sans argent-clé et avec des démarches en anglais. En pratique, c'est une share house, un social apartment, un appartement meublé au mois, ou un bail classique arrangé par un agent bilingue. Comptez 45 000 à 200 000 JPY par mois selon le type et le niveau de centralité.


![Fourchette de loyer mensuel par type de logement à Tokyo](/tokyo-housing-rent-range-fr.png "Share house 35k-90k vs location standard 60k-250k JPY")
## Qu'est-ce qu'un appartement "expatrié" ou "gaijin" ?

Il n'existe aucune catégorie légale d'appartement gaijin. Le terme désigne les locations pensées pour accueillir des étrangers, parce que le marché japonais classique dresse de vraies barrières : garant japonais, argent-clé, frais d'agence et dossier en japonais. Un appartement pour expatrié supprime tout ça. Vous signez en anglais (ou via un agent bilingue), vous évitez le garant grâce à une société de garantie, et vous emménagez souvent en quelques jours.

## Les quatre options principales

**1. Share house (45 000 à 90 000 JPY).** Une chambre privée meublée avec cuisine et salle de bain partagées, sans garant, emménagement en une semaine. Le plus rapide et le moins cher. Voir notre [guide de la gaijin house](/fr/blog/gaijin-house-tokyo-guide-complet).

**2. Social apartment (70 000 à 130 000 JPY).** Une share house au design soigné, avec de grands espaces communs et une communauté active. Plus d'intimité et de confort qu'une share house basique. Voir notre [guide du social apartment](/fr/blog/social-apartment-tokyo-guide).

**3. Appartement meublé au mois (80 000 à 200 000 JPY).** Un studio privé entièrement meublé, avec votre propre cuisine et salle de bain, loué au mois, sans garant. Idéal si vous voulez de l'intimité et une adresse utilisable pour les démarches.

**4. Bail classique via un agent bilingue (à partir de ~90 000 JPY + frais d'entrée).** Un appartement non meublé normal, mais arrangé par un agent qui gère la société de garantie et le dossier japonais pour vous. Idéal pour les longs séjours. Voir comment [trouver un appartement en tant qu'étranger](/fr/blog/trouver-appartement-tokyo-etranger).

## Ce que ça coûte en 2026

| Type | Loyer mensuel | Garant | Emménagement |
|---|---|---|---|
| Share house | 45 000-90 000 | Aucun | En une semaine |
| Social apartment | 70 000-130 000 | Aucun | 1-2 semaines |
| Meublé au mois | 80 000-200 000 | Aucun | 1-2 semaines |
| Bail classique (agent) | 90 000+ (4-6 mois d'avance) | Société de garantie | 2-4 semaines |

Pour les loyers médians réels par arrondissement, ligne et station, voir notre [Indice des loyers de Tokyo](/fr/data).

## Où chercher

Le parc adapté aux étrangers se concentre juste hors de la boucle Yamanote, dans des arrondissements comme Nakano, Koenji, Kita et Itabashi, où l'accès central coûte moins cher qu'à Shibuya ou Shinjuku. Pour savoir où chaque configuration est la moins chère, voir notre [classement des quartiers les moins chers](/fr/blog/quartiers-tokyo-moins-chers-classement-loyers).

## Comment éviter les pièges courants

- Vérifiez ce qui est inclus (charges, internet, literie) avant de signer.
- Comprenez les codes de configuration pour savoir ce que vous prenez : lisez notre [guide des configurations japonaises](/fr/blog/types-appartements-japonais-expliques).
- Surveillez la facture d'entrée des baux classiques : quatre à six mois de loyer, c'est normal. Voir notre [guide des pièges de la location](/fr/blog/pieges-location-tokyo-etranger).

## Questions fréquentes

**Un étranger peut-il louer un appartement à Tokyo sans garant ?** Oui. Les share houses, social apartments et meublés au mois ne demandent aucun garant, et les baux classiques utilisent une société de garantie à la place.

**Qu'est-ce qu'un appartement gaijin ?** C'est un terme informel pour une location qui accepte facilement les étrangers : meublée, en anglais, sans garant ni argent-clé.

**Combien coûte un appartement pour un expatrié à Tokyo ?** De 45 000 JPY par mois pour une chambre en share house à 200 000 JPY pour un studio meublé central. Un bail classique non meublé est moins cher au mois mais ajoute quatre à six mois de frais d'entrée.

**Quel est le moyen le plus rapide pour un expatrié d'avoir un appartement à Tokyo ?** Une share house ou un meublé au mois, réservables depuis l'étranger avec un passeport et un visa, avec emménagement en quelques jours.

Trouver un appartement pour expatrié à Tokyo, c'est surtout savoir quelle porte utiliser. Choisissez le type qui correspond à votre séjour et votre budget, et si vous voulez confier ça à quelqu'un du marché, [dites-nous ce qu'il vous faut](/fr/contact).

---

*À lire aussi : [appartements meublés à Tokyo](/fr/blog/appartement-meuble-tokyo-expats-top-5) et [gaijin house vs share house](/fr/blog/gaijin-house-vs-share-house-difference).*
    `.trim(),
  },
  {
    slug: 'do-foreigners-pay-more-rent-tokyo',
    locale: 'en',
    title: 'Do Foreigners Really Pay More Rent in Tokyo? (Insider View, 2026)',
    description: 'The honest answer from inside the market: the monthly rent on a given unit is the same, but foreigners often pay more in fees and get pushed toward pricier stock. Here is why.',
    date: '2026-07-18',
    readingTime: '7 min',
    content: `
Anyone moving to Tokyo eventually asks the same thing: do foreigners get charged more rent than locals? I operate rentals in Tokyo myself, so I see this from both sides of the table. The honest answer is more nuanced than a simple yes or no.

**Quick answer:** No, the monthly rent on a specific apartment is set by the property, not your nationality. A foreigner and a Japanese tenant pay the same rent for the same unit. But foreigners often pay more in practice, through mandatory guarantor company fees, higher upfront costs, and being pushed toward pricier "foreigner friendly" stock because the cheapest listings quietly refuse them.

## The rent itself does not change
Rent in Tokyo is attached to the apartment, not the tenant. From 528,660 real active listings, a 1K studio ranges from about 74,000 JPY in Edogawa to 140,000 JPY in Minato, and that figure does not move because you hold a foreign passport. You can check the going rate for any ward, line or station in our [Tokyo Rent Index](/en/data) before you ever contact an agent, so you know when a quoted rent is fair.

## Where foreigners really pay more
The premium is real, but it hides in the fees and in which doors open, not in the rent line:
- **Guarantor company fees.** Without a Japanese guarantor, you are asked to use a guarantee company, typically 50 to 100 percent of one month of rent up front plus a yearly renewal. For many foreigners this is effectively mandatory.
- **Higher upfront costs.** A standard lease can ask for four to six months of rent at once: deposit, key money, agency fee and first month. See our [furnished apartments guide](/en/blog/furnished-apartments-tokyo-guide) for lower-deposit alternatives.
- **Pushed toward pricier stock.** Rejected from the cheapest listings (here is [why landlords reject foreign tenants](/en/blog/why-japanese-landlords-reject-foreigners)), you end up in furnished flats, international agencies or share houses that cost more per month for the same space.
- **The information gap.** If you cannot read Japanese listings, you only see the slice of the market marketed to foreigners, which skews expensive.

## Why the cheaper doors close
From the landlord side, the hesitation is rarely about the rent and almost always about perceived risk: language, no local guarantor, and uncertainty about how long you will stay. Guarantor companies price that risk in, and some owners simply opt out. The result is not a higher rent, but narrower access. That distinction matters, because access is something you can fix.

## How to pay the local price, not the foreigner price
- Use a guarantee company and treat it as normal, not a penalty.
- Target listings that are open to foreigners but still priced at the market, not the "foreigner friendly" markup.
- Know your [Japanese apartment layouts](/en/blog/japanese-apartment-layouts-explained) and which [train lines are cheapest](/en/blog/cheapest-train-line-tokyo-rent), so you are comparing like for like.
- Have someone who can read the whole market, and who the agencies take seriously, run the search with you.

Foreigners do not pay a higher rent for the same Tokyo apartment. They pay more when they are boxed into a smaller, pricier part of the market. Close that gap and you pay what everyone else pays. If you want someone inside the market to run the search, [tell us what you need](/en/contact).

*Data: Tokyo rent figures from 528,660 real active listings, 2026, median 1K rent in JPY.*
    `.trim(),
  },
  {
    slug: 'etrangers-paient-plus-cher-loyer-tokyo',
    locale: 'fr',
    title: 'Les étrangers paient-ils vraiment plus cher leur loyer à Tokyo ? (2026)',
    description: 'La réponse honnête, vue de l\'intérieur du marché : le loyer d\'un même logement est identique, mais les étrangers paient souvent plus en frais et sont poussés vers un parc plus cher. Voici pourquoi.',
    date: '2026-07-18',
    readingTime: '7 min',
    content: `
Toute personne qui s'installe à Tokyo finit par poser la même question : les étrangers paient-ils un loyer plus élevé que les locaux ? J'opère moi-même des logements à Tokyo, donc je vois la situation des deux côtés de la table. La réponse honnête est plus nuancée qu'un simple oui ou non.

**Réponse rapide :** Non, le loyer mensuel d'un appartement donné est fixé par le bien, pas par votre nationalité. Un étranger et un locataire japonais paient le même loyer pour le même logement. Mais dans les faits, les étrangers paient souvent plus cher, à cause des frais de société de garantie, de coûts d'entrée plus élevés, et parce qu'ils sont poussés vers un parc plus cher "adapté aux étrangers", les annonces les moins chères les refusant discrètement.

## Le loyer lui-même ne change pas
À Tokyo, le loyer est attaché à l'appartement, pas au locataire. Sur 528 660 annonces réelles actives, un studio 1K va d'environ 74 000 JPY à Edogawa à 140 000 JPY à Minato, et ce chiffre ne bouge pas parce que vous avez un passeport étranger. Vérifiez le tarif en vigueur pour chaque arrondissement, ligne ou station dans notre [Indice des loyers de Tokyo](/fr/data) avant même de contacter une agence, pour savoir si un loyer annoncé est juste.

## Là où les étrangers paient vraiment plus
La surprime est réelle, mais elle se cache dans les frais et dans les portes qui s'ouvrent, pas dans la ligne du loyer :
- **Frais de société de garantie.** Sans garant japonais, on vous demande de passer par une société de garantie, en général 50 à 100 pour cent d'un mois de loyer à l'entrée, plus un renouvellement annuel. Pour beaucoup d'étrangers, c'est de fait obligatoire.
- **Coûts d'entrée plus élevés.** Un bail standard peut réclamer quatre à six mois de loyer d'un coup : dépôt, argent-clé, honoraires d'agence et premier mois. Voyez notre [guide des appartements meublés](/fr/blog/guide-appartements-meubles-tokyo) pour des alternatives à faible dépôt.
- **Poussés vers un parc plus cher.** Refusés sur les annonces les moins chères (voici [pourquoi les propriétaires japonais refusent les étrangers](/fr/blog/pourquoi-proprietaires-japonais-refusent-etrangers)), vous finissez dans des meublés, des agences internationales ou des share houses qui coûtent plus cher au mois pour le même espace.
- **Le fossé d'information.** Si vous ne lisez pas les annonces en japonais, vous ne voyez que la part du marché commercialisée aux étrangers, qui penche vers le cher.

## Pourquoi les portes les moins chères se ferment
Du côté du propriétaire, l'hésitation porte rarement sur le loyer et presque toujours sur le risque perçu : la langue, l'absence de garant local, l'incertitude sur la durée de votre séjour. Les sociétés de garantie facturent ce risque, et certains bailleurs préfèrent s'abstenir. Le résultat n'est pas un loyer plus élevé, mais un accès plus étroit. Cette distinction compte, parce que l'accès, lui, se corrige.

## Comment payer le prix local, pas le prix étranger
- Utilisez une société de garantie et voyez-la comme la norme, pas comme une punition. Notre [guide de la garantie de loyer](/fr/blog/garantie-loyer-etranger-japon) explique comment ça marche.
- Visez les annonces ouvertes aux étrangers mais toujours au prix du marché, pas à la surcote "adaptée aux étrangers".
- Connaissez vos [types d'appartements japonais](/fr/blog/types-appartements-japonais-expliques) et les [lignes de train les moins chères](/fr/blog/ligne-train-tokyo-loyer-moins-cher), pour comparer ce qui est comparable.
- Faites chercher avec vous quelqu'un qui lit tout le marché, et que les agences prennent au sérieux.

Les étrangers ne paient pas un loyer plus élevé pour le même appartement à Tokyo. Ils paient plus quand on les enferme dans une partie plus petite et plus chère du marché. Comblez ce fossé et vous payez ce que tout le monde paie. Si vous voulez quelqu'un de l'intérieur du marché pour mener la recherche, [dites-nous ce qu'il vous faut](/fr/contact).

*Données : chiffres de loyer à Tokyo issus de 528 660 annonces réelles actives, 2026, loyer médian d'un 1K en JPY.*
    `.trim(),
  },
  {
    slug: 'cheapest-train-line-tokyo-rent',
    locale: 'en',
    title: 'Which Tokyo Train Line Is Cheapest to Rent On? (2026 Data)',
    description: 'From 528,660 listings: the Seibu lines are the cheapest to rent on in Tokyo (around 80,000 JPY for a studio), the Ginza and Yamanote lines the priciest. The full 2026 ranking.',
    date: '2026-07-18',
    readingTime: '7 min',
    content: `
If you want the cheapest rent in Tokyo, the ward matters, but the train line matters just as much. Two lines can run through the same part of the city and still differ by 50,000 JPY a month for the same size studio. Here is the full ranking, from 528,660 real active listings.

**Quick answer:** The cheapest Tokyo train lines to rent a 1K studio on are the Seibu Ikebukuro (around 80,000 JPY, about US$500) and Seibu Shinjuku (around 82,000 JPY), followed by the Tobu Skytree and Tokyu Toyoko. The priciest are the Tokyo Metro Ginza (around 131,000 JPY, about US$820) and the JR Yamanote (around 120,000 JPY). Living one line over from a prime route is one of the easiest ways to cut your rent.


![Median monthly rent for a 1K studio by Tokyo train line (2026)](/tokyo-rent-by-line.png "Median 1K rent by line, from 528,660 real active listings")
## The cheapest lines to rent on
For a 1K studio, median monthly rent (USD at roughly 160 JPY to the dollar):
- **Seibu Ikebukuro:** 80,000 JPY (about US$500)
- **Seibu Shinjuku:** 82,000 JPY (about US$510)
- **Tobu Skytree:** 82,000 JPY (about US$510)
- **Tokyu Toyoko:** 86,000 JPY (about US$540)
- **JR Chuo:** 87,000 JPY (about US$540)
- **Keio:** 87,000 JPY (about US$540)

These lines head out through the western and northern suburbs, where space is more abundant and demand is calmer. You still reach the major hubs, just with a slightly longer ride.

## The priciest lines to rent on
- **Tokyo Metro Ginza:** 131,000 JPY (about US$820)
- **JR Yamanote:** 120,000 JPY (about US$750)
- **Toei Oedo:** 119,000 JPY (about US$740)
- **Tokyo Metro Hanzomon:** 117,000 JPY (about US$730)
- **Tokyo Metro Hibiya:** 115,000 JPY (about US$720)
- **Toei Asakusa:** 112,000 JPY (about US$700)

No surprise here: these lines thread through the central business and luxury districts, so you pay for the address and the zero-transfer commute.

## Why the gap is so wide
Central subway lines like the Ginza and Hanzomon spend most of their length under Tokyo's priciest wards, so almost every stop is expensive. Suburban lines like the Seibu routes spend most of their length in cheaper residential areas, and several run out into Saitama and Chiba where rents fall further still. The line is really a proxy for how central its stations are.

## How to use this to cut your rent
The practical move is simple: pick your hub, then live one line over from the obvious one.
- Commuting to Shinjuku? The Seibu Shinjuku and Seibu Ikebukuro lines undercut the JR options into the same station.
- Want the Yamanote lifestyle for less? The Tokyu Toyoko and JR Chuo reach the same core for tens of thousands of yen less.
- Compare like for like first: check the [layout](/en/blog/japanese-apartment-layouts-explained) so you are pricing a 1K against a 1K, and see the [cheapest wards](/en/blog/cheapest-neighbourhoods-tokyo-ranked-by-rent) for the ward-level view.

You can explore every line, ward and station in our [Tokyo Rent Index](/en/data), or see the wider picture in our [Tokyo rent report](/en/blog/tokyo-rent-report-2026). And if you would rather have someone inside the market match your budget to the right line, [tell us what you need](/en/contact).

*Data: median 1K rent by line from 528,660 real active listings, Tokyo, 2026. USD at roughly 160 JPY per USD.*
    `.trim(),
  },
  {
    slug: 'ligne-train-tokyo-loyer-moins-cher',
    locale: 'fr',
    title: 'Quelle ligne de train de Tokyo a les loyers les moins chers ? (2026)',
    description: 'À partir de 528 660 annonces : les lignes Seibu sont les moins chères de Tokyo (environ 80 000 JPY pour un studio), la Ginza et la Yamanote les plus chères. Le classement complet 2026.',
    date: '2026-07-18',
    readingTime: '7 min',
    content: `
Si vous cherchez le loyer le moins cher à Tokyo, l'arrondissement compte, mais la ligne de train compte tout autant. Deux lignes peuvent traverser la même partie de la ville et différer de 50 000 JPY par mois pour un studio de même taille. Voici le classement complet, à partir de 528 660 annonces réelles actives.

**Réponse rapide :** Les lignes de train les moins chères pour louer un studio 1K à Tokyo sont la Seibu Ikebukuro (environ 80 000 JPY, soit près de 500 USD) et la Seibu Shinjuku (environ 82 000 JPY), suivies de la Tobu Skytree et de la Tokyu Toyoko. Les plus chères sont la Tokyo Metro Ginza (environ 131 000 JPY, près de 820 USD) et la JR Yamanote (environ 120 000 JPY). Habiter une ligne à côté d'un axe prime est l'un des moyens les plus simples de réduire son loyer.


![Loyer mensuel médian d'un studio 1K par ligne de train de Tokyo (2026)](/tokyo-rent-by-line.png "Loyer médian 1K par ligne, sur 528 660 annonces réelles actives")
## Les lignes les moins chères
Pour un studio 1K, loyer mensuel médian (USD à environ 160 JPY pour un dollar) :
- **Seibu Ikebukuro :** 80 000 JPY (environ 500 USD)
- **Seibu Shinjuku :** 82 000 JPY (environ 510 USD)
- **Tobu Skytree :** 82 000 JPY (environ 510 USD)
- **Tokyu Toyoko :** 86 000 JPY (environ 540 USD)
- **JR Chuo :** 87 000 JPY (environ 540 USD)
- **Keio :** 87 000 JPY (environ 540 USD)

Ces lignes filent vers les banlieues ouest et nord, où l'espace est plus abondant et la demande plus calme. Vous atteignez toujours les grands hubs, avec un trajet un peu plus long.

## Les lignes les plus chères
- **Tokyo Metro Ginza :** 131 000 JPY (environ 820 USD)
- **JR Yamanote :** 120 000 JPY (environ 750 USD)
- **Toei Oedo :** 119 000 JPY (environ 740 USD)
- **Tokyo Metro Hanzomon :** 117 000 JPY (environ 730 USD)
- **Tokyo Metro Hibiya :** 115 000 JPY (environ 720 USD)
- **Toei Asakusa :** 112 000 JPY (environ 700 USD)

Rien d'étonnant : ces lignes traversent les quartiers d'affaires et de luxe du centre, vous payez donc l'adresse et le trajet sans correspondance.

## Pourquoi l'écart est si large
Les lignes de métro centrales comme la Ginza et la Hanzomon passent l'essentiel de leur parcours sous les arrondissements les plus chers de Tokyo, presque chaque arrêt y est cher. Les lignes de banlieue comme les Seibu passent l'essentiel de leur parcours dans des zones résidentielles moins chères, et plusieurs poussent jusqu'à Saitama et Chiba où les loyers baissent encore. La ligne est en réalité un indicateur de la centralité de ses stations.

## Comment vous en servir pour baisser votre loyer
Le geste concret est simple : choisissez votre hub, puis habitez une ligne à côté de l'évidente.
- Vous allez à Shinjuku ? Les lignes Seibu Shinjuku et Seibu Ikebukuro passent sous les options JR pour la même gare.
- Vous voulez le style de vie Yamanote pour moins cher ? La Tokyu Toyoko et la JR Chuo atteignent le même centre pour des dizaines de milliers de yens de moins.
- Comparez d'abord ce qui est comparable : vérifiez la [disposition](/fr/blog/types-appartements-japonais-expliques) pour comparer un 1K à un 1K, et voyez les [quartiers les moins chers](/fr/blog/quartiers-tokyo-moins-chers-classement-loyers) pour la vue par arrondissement.

Vous pouvez explorer chaque ligne, arrondissement et station dans notre [Indice des loyers de Tokyo](/fr/data), ou voir le tableau d'ensemble dans notre [rapport des loyers de Tokyo](/fr/blog/rapport-loyers-tokyo-2026). Et si vous préférez que quelqu'un de l'intérieur du marché associe votre budget à la bonne ligne, [dites-nous ce qu'il vous faut](/fr/contact).

*Données : loyer médian d'un 1K par ligne, à partir de 528 660 annonces réelles actives, Tokyo, 2026. USD à environ 160 JPY pour un dollar.*
    `.trim(),
  },
  {
    slug: 'cheapest-stations-tokyo-rent',
    locale: 'en',
    title: 'The Cheapest Tokyo Stations to Rent Near (2026 Rent Data)',
    description: 'From 528,660 listings: the cheapest Tokyo stations to rent a studio near are Kasai and Shin-Koiwa (under 80,000 JPY), the priciest Jimbocho and Ebisu. The full 2026 ranking.',
    date: '2026-07-18',
    readingTime: '7 min',
    content: `
Most people do not rent by ward, they rent by station: the walk to the platform is what shapes daily life in Tokyo. So which stations are actually the cheapest to live near? Here is the ranking for a studio, from 528,660 real active listings across the 23 wards.

**Quick answer:** The cheapest Tokyo stations to rent a 1K studio near are Kasai (around 76,000 JPY, about US$475) and Shin-Koiwa (around 78,000 JPY), both in the eastern wards. The most expensive are Jimbocho and Ebisu (around 150,000 JPY, about US$940), in the central districts. The gap between the cheapest and priciest station is nearly double for the same size studio.


![Median monthly rent for a 1K studio near 50 Tokyo stations (2026)](/tokyo-rent-by-station.png "Median 1K rent by station, from 528,660 real active listings")
## The cheapest stations to rent near
Median monthly rent for a 1K studio (USD at roughly 160 JPY to the dollar):
- **Kasai:** 76,000 JPY (about US$475)
- **Shin-Koiwa:** 78,000 JPY (about US$490)
- **Ayase:** 85,000 JPY (about US$530)
- **Ogikubo:** 85,000 JPY (about US$530)
- **Nerima:** 86,000 JPY (about US$540)
- **Kita-Senju:** 86,000 JPY (about US$540)
- **Akabane:** 86,000 JPY (about US$540)
- **Setagaya:** 88,000 JPY (about US$550)

Most of these sit in the eastern wards (Edogawa, Katsushika, Adachi) or on the outer edges of the western and northern wards. They are ordinary, liveable neighbourhoods with real shopping streets, not distant outposts. Kita-Senju and Akabane in particular are major transfer hubs, so cheap does not mean cut off.

## The most expensive stations to rent near
- **Jimbocho:** 150,000 JPY (about US$940)
- **Ebisu:** 149,000 JPY (about US$930)
- **Azabu-Juban:** 148,000 JPY (about US$925)
- **Shibuya:** 140,000 JPY (about US$875)
- **Kanda:** 137,000 JPY (about US$855)
- **Akihabara:** 135,000 JPY (about US$845)

These cluster in the central wards, Chiyoda, Minato and Shibuya, where you pay for a short, transfer-free commute and a prestige address.

## The pattern: east is cheap, centre is dear
The map is consistent. Rent falls as you move east across the Sumida and Arakawa rivers into Edogawa, Katsushika and Adachi, and it climbs steeply as you approach the central business and luxury districts. Two stations on the same line can differ by tens of thousands of yen a month purely because one is three stops closer to the centre.

## How to use this to cut your rent
- Move one or two stops out. The station next to a popular one is often noticeably cheaper for the same commute.
- Check the line, not just the station: some [train lines are structurally cheaper](/en/blog/cheapest-train-line-tokyo-rent) end to end.
- Compare like for like: confirm the [layout](/en/blog/japanese-apartment-layouts-explained) so you are pricing a 1K against a 1K, and see the [cheapest wards](/en/blog/cheapest-neighbourhoods-tokyo-ranked-by-rent) for the wider view.

You can explore all 50 stations, plus every ward and line, in our [Tokyo Rent Index](/en/data), or read the full [Tokyo rent report](/en/blog/tokyo-rent-report-2026). And if you would rather hand the search to someone inside the market, [tell us what you need](/en/contact).

*Data: median 1K rent by station from 528,660 real active listings, Tokyo, 2026. USD at roughly 160 JPY per USD.*
    `.trim(),
  },
  {
    slug: 'stations-tokyo-loyer-moins-cher',
    locale: 'fr',
    title: 'Les stations de Tokyo où le loyer est le moins cher (2026)',
    description: 'À partir de 528 660 annonces : les stations de Tokyo les moins chères pour louer un studio sont Kasai et Shin-Koiwa (moins de 80 000 JPY), les plus chères Jimbocho et Ebisu. Le classement 2026.',
    date: '2026-07-18',
    readingTime: '7 min',
    content: `
La plupart des gens ne louent pas par arrondissement, ils louent par station : c'est le trajet jusqu'au quai qui rythme la vie quotidienne à Tokyo. Alors, près de quelles stations le loyer est-il vraiment le moins cher ? Voici le classement pour un studio, à partir de 528 660 annonces réelles actives dans les 23 arrondissements.

**Réponse rapide :** Les stations de Tokyo les moins chères pour louer un studio 1K sont Kasai (environ 76 000 JPY, près de 475 USD) et Shin-Koiwa (environ 78 000 JPY), toutes deux dans les arrondissements de l'est. Les plus chères sont Jimbocho et Ebisu (environ 150 000 JPY, près de 940 USD), dans les quartiers centraux. L'écart entre la station la moins chère et la plus chère est presque du simple au double pour un studio de même taille.


![Loyer mensuel médian d'un studio 1K près de 50 stations de Tokyo (2026)](/tokyo-rent-by-station.png "Loyer médian 1K par station, sur 528 660 annonces réelles actives")
## Les stations les moins chères
Loyer mensuel médian pour un studio 1K (USD à environ 160 JPY pour un dollar) :
- **Kasai :** 76 000 JPY (environ 475 USD)
- **Shin-Koiwa :** 78 000 JPY (environ 490 USD)
- **Ayase :** 85 000 JPY (environ 530 USD)
- **Ogikubo :** 85 000 JPY (environ 530 USD)
- **Nerima :** 86 000 JPY (environ 540 USD)
- **Kita-Senju :** 86 000 JPY (environ 540 USD)
- **Akabane :** 86 000 JPY (environ 540 USD)
- **Setagaya :** 88 000 JPY (environ 550 USD)

La plupart se trouvent dans les arrondissements de l'est (Edogawa, Katsushika, Adachi) ou en bordure des arrondissements ouest et nord. Ce sont des quartiers ordinaires et vivables, avec de vraies rues commerçantes, pas des avant-postes isolés. Kita-Senju et Akabane, en particulier, sont de grands hubs de correspondance : pas cher ne veut pas dire coupé de tout.

## Les stations les plus chères
- **Jimbocho :** 150 000 JPY (environ 940 USD)
- **Ebisu :** 149 000 JPY (environ 930 USD)
- **Azabu-Juban :** 148 000 JPY (environ 925 USD)
- **Shibuya :** 140 000 JPY (environ 875 USD)
- **Kanda :** 137 000 JPY (environ 855 USD)
- **Akihabara :** 135 000 JPY (environ 845 USD)

Elles se concentrent dans les arrondissements centraux, Chiyoda, Minato et Shibuya, où vous payez un trajet court et sans correspondance ainsi qu'une adresse de prestige.

## Le schéma : l'est est bon marché, le centre est cher
La carte est cohérente. Le loyer baisse à mesure que l'on va vers l'est, au-delà des rivières Sumida et Arakawa, vers Edogawa, Katsushika et Adachi, et il grimpe fortement à l'approche des quartiers d'affaires et de luxe du centre. Deux stations sur une même ligne peuvent différer de dizaines de milliers de yens par mois simplement parce que l'une est trois arrêts plus près du centre.

## Comment vous en servir pour baisser votre loyer
- Décalez-vous d'un ou deux arrêts. La station voisine d'une station prisée est souvent nettement moins chère pour le même trajet.
- Regardez la ligne, pas seulement la station : certaines [lignes de train sont structurellement moins chères](/fr/blog/ligne-train-tokyo-loyer-moins-cher) d'un bout à l'autre.
- Comparez ce qui est comparable : vérifiez la [disposition](/fr/blog/types-appartements-japonais-expliques) pour comparer un 1K à un 1K, et voyez les [quartiers les moins chers](/fr/blog/quartiers-tokyo-moins-chers-classement-loyers) pour la vue d'ensemble.

Vous pouvez explorer les 50 stations, ainsi que chaque arrondissement et ligne, dans notre [Indice des loyers de Tokyo](/fr/data), ou lire le [rapport des loyers de Tokyo](/fr/blog/rapport-loyers-tokyo-2026) complet. Et si vous préférez confier la recherche à quelqu'un de l'intérieur du marché, [dites-nous ce qu'il vous faut](/fr/contact).

*Données : loyer médian d'un 1K par station, à partir de 528 660 annonces réelles actives, Tokyo, 2026. USD à environ 160 JPY pour un dollar.*
    `.trim(),
  },
  {
    slug: 'tokyo-apartment-move-in-costs',
    locale: 'en',
    title: 'How Much It Costs to Move Into a Tokyo Apartment (2026)',
    description: 'Reikin, shikikin, agency fee, guarantor, renewal: the full move-in cost of a Tokyo apartment in 2026, why it runs to four to six months of rent, and how to cut it.',
    date: '2026-07-18',
    readingTime: '6 min',
    content: `
The advertised rent is only the visible part. In Tokyo, signing a standard lease can cost four to six months of rent all at once, before you have carried a single box inside. Here is the full move-in cost breakdown for 2026, and how to shrink it.

**Quick answer:** On a standard Tokyo lease, budget on top of your first month: reikin (key money, 0 to 2 months, non-refundable), shikikin (deposit, 1 to 2 months, refundable), agency fee (1 month), guarantor company (0.5 to 1 month), and home insurance (around 20,000 JPY for two years). That is four to six months of rent up front. On a 100,000 JPY studio, that is roughly 400,000 to 600,000 JPY, about US$2,500 to US$3,750. Share houses and furnished flats avoid almost all of it.


![What it really costs to move into a Tokyo apartment, broken down by cost item](/tokyo-movein-cost-en.png "About 4.9 months of rent upfront on a 100,000 JPY apartment")
## The upfront costs
| Cost | Typical amount | Refundable? |
|---|---|---|
| Reikin (key money) | 0 to 2 months | No |
| Shikikin (deposit) | 1 to 2 months | Yes (minus repairs) |
| Agency fee | 1 month (+ tax) | No |
| Guarantor company | 0.5 to 1 month | No |
| Home insurance | ~20,000 JPY | No |
| Lock change | 15,000 to 25,000 JPY | No |

## The recurring costs people forget
- **Renewal fee (更新料 koushinryou):** often one month of rent every two years.
- **Annual guarantor fee:** the guarantee company takes roughly 10,000 JPY or 0.5 month each year.
- **Common area charges (共益費):** sometimes billed on top of the advertised rent.

## Traps to check before you sign
- Is the reikin negotiable? (often yes on units that are slow to rent)
- Does the deposit cover a mandatory move-out cleaning fee?
- Are there early-termination penalties?
- Ask for the explanation of important points (重要事項説明) in English if you need it. Our [guarantor guide](/en/blog/guarantor-japan-rental-foreigner) covers the guarantee-company side.

## How to avoid almost all of it
Nearly all of these costs disappear with a share house, a monthly mansion or a furnished flat: no reikin, no agency fee, minimal deposit. That is exactly why these options are so popular on arrival (see the [furnished apartments guide](/en/blog/furnished-apartments-tokyo-guide) and the [gaijin house guide](/en/blog/gaijin-house-tokyo-guide)).

Knowing these costs in advance is how you avoid the first-bill shock and spot where to negotiate. For the full process, see [how to find an apartment in Tokyo](/en/blog/find-apartment-tokyo-foreigner), and if you would rather have someone inside the market handle it, [tell us what you need](/en/contact).

*Figures are typical 2026 market ranges. USD at roughly 160 JPY per USD.*
    `.trim(),
  },
  {
    slug: 'ur-housing-tokyo-foreigners',
    locale: 'en',
    title: 'UR Housing in Tokyo: No Key Money, No Guarantor (2026 Guide)',
    description: 'UR rental housing in Tokyo charges no key money, no agency fee, no renewal fee and no guarantor. How the four zeros work, who qualifies as a foreigner, and the trade-offs.',
    date: '2026-07-18',
    readingTime: '7 min',
    content: `
For foreigners on a budget, the single biggest housing secret in Tokyo is UR rental housing. It removes almost every upfront fee that makes a normal Japanese lease so painful. Here is how it works and who qualifies.

**Quick answer:** UR housing (UR賃貸住宅), run by a semi-public agency, charges no key money, no agency fee and no renewal fee, and requires no guarantor. You pay a refundable deposit (usually two months) and the first rent, and that is it. Foreigners with a residence card can apply, as long as you meet an income threshold (roughly a monthly income of at least the rent times a set multiple) or qualify through savings. It is one of the cheapest, most foreigner-open ways to rent a real apartment in Tokyo.


![Move-in cost in months of rent, by housing type in Tokyo](/tokyo-housing-barrier-en.png "Share house ~1 month vs a standard lease ~5 months plus a guarantor")
## The four zeros that save you months of rent
A standard Tokyo lease can cost four to six months of rent up front (see our [move-in cost breakdown](/en/blog/tokyo-apartment-move-in-costs)). UR removes most of that:
- **No key money (reikin).** The non-refundable one-to-two-month gift to the landlord is gone.
- **No agency fee.** You rent directly from the agency, so there is no one-month brokerage charge.
- **No renewal fee.** Normal leases often charge a month every two years. UR does not.
- **No guarantor.** No guarantee company, no Japanese co-signer to find. This alone solves the biggest obstacle foreigners face (see [why landlords reject foreign tenants](/en/blog/why-japanese-landlords-reject-foreigners)).

You still pay a **deposit** (usually two months, refundable) and your first month, so move-in is typically about three months of rent instead of six.

## Who can qualify
UR is open to foreign residents, but it checks that you can afford the rent. In most cases you need one of the following:
- A **monthly income** of at least a set multiple of the rent (commonly around four times for lower rents, less for higher ones).
- Enough **savings** to satisfy a balance requirement if your income is irregular.
- Or, in some cases, the option to **prepay** up to a year of rent.

You will need your **residence card**, proof of income or savings, and to apply in person or online. There is no screening by a guarantee company, which is why approval can be faster and more predictable.

## The trade-offs to know
UR is not perfect, and being honest about it matters:
- Many UR buildings are **older, danchi-style estates**, though a large share have been renovated inside.
- Popular, central units go fast, and the **best-value stock is often a bit further out**.
- You apply on a **first-come basis** for a specific listed unit, so it suits people who can act quickly, less so those who need a very specific address on a fixed date.
- Support is **mostly in Japanese**, so the paperwork can be a hurdle without help.

## Is UR right for you?
If your priority is cutting upfront cost and avoiding the guarantor problem, UR is one of the best options in Tokyo, especially for longer stays. If you need a furnished, ready-in-days solution, a [furnished flat or share house](/en/blog/furnished-apartments-tokyo-guide) is faster. Many people start furnished, then move to UR once settled.

You can compare UR-friendly areas against market rents in our [Tokyo Rent Index](/en/data). And if you want someone who knows the market to line up your options, including the ones you would never find alone, [tell us what you need](/en/contact).

*This is general 2026 guidance. Confirm current eligibility and terms before you apply.*
    `.trim(),
  },
  {
    slug: 'logement-ur-tokyo-etrangers',
    locale: 'fr',
    title: 'Le logement UR à Tokyo : ni argent-clé ni garant (guide 2026)',
    description: 'Le logement UR à Tokyo ne demande ni argent-clé, ni frais d\'agence, ni renouvellement, ni garant. Comment fonctionnent les quatre zéros, qui est éligible, et les compromis.',
    date: '2026-07-18',
    readingTime: '7 min',
    content: `
Pour un étranger avec un budget serré, le plus grand secret du logement à Tokyo, c'est le logement UR. Il supprime presque tous les frais d'entrée qui rendent un bail japonais classique si douloureux. Voici comment ça marche et qui peut y prétendre.

**Réponse rapide :** Le logement UR (UR賃貸住宅), géré par un organisme semi-public, ne demande ni argent-clé, ni frais d'agence, ni frais de renouvellement, et n'exige pas de garant. Vous payez une caution remboursable (en général deux mois) et le premier loyer, c'est tout. Les étrangers titulaires d'une carte de résident peuvent postuler, à condition de remplir une condition de revenus (en gros un revenu mensuel au moins égal à un multiple du loyer) ou de justifier d'une épargne suffisante. C'est l'un des moyens les moins chers et les plus ouverts aux étrangers de louer un vrai appartement à Tokyo.


![Coût d'entrée en mois de loyer, par type de logement à Tokyo](/tokyo-housing-barrier-fr.png "Share house ~1 mois vs location standard ~5 mois plus un garant")
## Les quatre zéros qui économisent des mois de loyer
Un bail classique à Tokyo peut coûter 4 à 6 mois de loyer à l'entrée (voir notre [détail des frais cachés](/fr/blog/frais-caches-location-tokyo)). UR en supprime l'essentiel :
- **Pas d'argent-clé (reikin).** Le cadeau non remboursable de 1 à 2 mois au propriétaire disparaît.
- **Pas de frais d'agence.** Vous louez directement auprès de l'organisme, donc pas d'un mois de commission.
- **Pas de frais de renouvellement.** Les baux classiques facturent souvent un mois tous les deux ans. UR non.
- **Pas de garant.** Aucune société de garantie, aucun co-signataire japonais à trouver. À lui seul, ce point règle le plus gros obstacle des étrangers (voir [pourquoi les propriétaires japonais refusent les étrangers](/fr/blog/pourquoi-proprietaires-japonais-refusent-etrangers)).

Vous payez tout de même une **caution** (en général deux mois, remboursable) et votre premier loyer, donc l'entrée revient à environ trois mois de loyer au lieu de six.

## Qui peut y prétendre
UR est ouvert aux résidents étrangers, mais vérifie que vous pouvez payer le loyer. Dans la plupart des cas, il faut l'un des éléments suivants :
- Un **revenu mensuel** au moins égal à un multiple fixé du loyer (souvent environ quatre fois pour les loyers modestes, moins pour les loyers élevés).
- Une **épargne** suffisante pour satisfaire une exigence de solde si vos revenus sont irréguliers.
- Ou, dans certains cas, la possibilité de **payer d'avance** jusqu'à un an de loyer.

Il vous faudra votre **carte de résident**, un justificatif de revenus ou d'épargne, et postuler en personne ou en ligne. Il n'y a pas d'examen par une société de garantie, ce qui rend l'accord souvent plus rapide et plus prévisible.

## Les compromis à connaître
UR n'est pas parfait, et il faut être honnête là-dessus :
- Beaucoup d'immeubles UR sont d'anciens **ensembles de type danchi**, même si une large part a été rénovée à l'intérieur.
- Les logements centraux et prisés partent vite, et le **meilleur rapport qualité-prix est souvent un peu plus loin** du centre.
- Vous postulez au **premier arrivé** pour un logement précis listé, ce qui convient à qui peut agir vite, moins à qui veut une adresse très précise à une date fixe.
- L'accompagnement est **surtout en japonais**, donc la paperasse peut être un obstacle sans aide.

## UR est-il fait pour vous ?
Si votre priorité est de réduire les frais d'entrée et d'éviter le problème du garant, UR est l'une des meilleures options de Tokyo, surtout pour un séjour long. Si vous voulez une solution meublée et disponible en quelques jours, un [meublé ou une share house](/fr/blog/guide-appartements-meubles-tokyo) est plus rapide. Beaucoup commencent en meublé, puis passent à UR une fois installés.

Vous pouvez comparer les zones UR aux loyers du marché dans notre [Indice des loyers de Tokyo](/fr/data). Et si vous voulez quelqu'un qui connaît le marché pour aligner vos options, y compris celles que vous ne trouveriez jamais seul, [dites-nous ce qu'il vous faut](/fr/contact).

*Ceci est une information générale 2026. Vérifiez les conditions d'éligibilité en vigueur avant de postuler.*
    `.trim(),
  },
]

// Mapping FR slug -> EN slug (articles jumeaux pour hreflang)
export const TWIN_SLUGS: Record<string, string> = {
  'trouver-appartement-tokyo-etranger':          'find-apartment-tokyo-foreigner',
  'share-house-tokyo-guide-complet':             'share-house-tokyo-guide-2026',
  'cout-vie-tokyo-expatrie-2026':                'tokyo-expat-cost-of-living-2026',
  'quartiers-tokyo-expatries-guide':             'tokyo-neighbourhoods-expats-guide',
  'visa-travail-japon-francophone-2026':         'japan-work-visa-foreigners-guide',
  'ouvrir-compte-bancaire-japon-etranger':       'open-bank-account-japan-foreigner',
  'appartement-meuble-tokyo-sans-garant':        'furnished-apartment-tokyo-no-guarantor',
  'pieges-location-tokyo-etranger':              'tokyo-rental-traps-foreigners',
  'assurance-maladie-japon-expatrie':            'japan-health-insurance-expat-guide',
  'carte-residence-japon-zairyu-card':           'residence-card-japan-zairyu-card-guide',
  'famille-expatriee-tokyo-ecoles-internationales': 'family-expat-tokyo-international-schools',
  'negocier-loyer-tokyo-conseils':               'negotiating-rent-tokyo-tips',
  'demenager-japon-checklist-complete':          'moving-to-tokyo-checklist-2026',
  'tokyo-osaka-kyoto-ou-s-installer':            'tokyo-osaka-kyoto-which-city-to-live',
  'chercher-appartement-tokyo-depuis-etranger':  'tokyo-apartment-hunting-from-abroad',
  'garantie-loyer-etranger-japon':               'guarantor-japan-rental-foreigner',
  'assurance-habitation-japon-locataire':        'renters-insurance-japan-guide',
  'logement-etudiant-tokyo-guide':               'student-housing-tokyo-guide',
  'checklist-bail-tokyo':                        'tokyo-rental-contract-checklist',
  'gaijin-house-vs-share-house-difference':      'gaijin-house-vs-share-house-tokyo',
  'logement-etudiant-tokyo-2026':                'student-housing-tokyo-guide-2026',
  'jiko-bukken-appartements-pas-chers-tokyo':    'jiko-bukken-cheap-apartments-tokyo',
  'appartement-tokyo-septembre-guide':           'find-apartment-tokyo-september',
  'appartement-meuble-tokyo-expats':             'furnished-apartment-tokyo-expats',
  'transport-tokyo-expatrie-guide':              'tokyo-public-transport-expat-guide',
  'carte-sim-japon-etranger-2026':               'japan-sim-card-foreigners-2026',
  'impots-revenus-japon-expatrie-2026':          'japan-income-tax-foreigners-guide',
  'internet-utilitaires-tokyo-appartement':      'setting-up-utilities-tokyo-apartment',
  'travailler-tokyo-expatrie-guide-2026':        'working-in-tokyo-expat-guide-2026',
  'virement-international-japon-wise-revolut':   'send-money-to-japan-from-abroad',
  'cours-japonais-tokyo-expatries-guide':        'japanese-language-schools-tokyo-guide',
  'permis-conduire-etranger-japon-conversion':   'convert-foreign-driving-licence-japan',
  'demenageur-international-japon-guide':        'international-moving-company-japan-guide',
  'importer-animal-compagnie-japon-guide':       'bringing-pets-to-japan-guide',
  'quartiers-tokyo-familles-expatriees-guide':   'best-neighbourhoods-families-tokyo-guide',
  'tokyo-osaka-ou-vivre-expatrie-comparatif':    'tokyo-vs-osaka-expat-living-comparison',
  'visa-nomade-digital-japon-2026':             'japan-digital-nomad-visa-2026',
  'pvt-japon-visa-vacances-travail-2026':       'japan-working-holiday-visa-guide-2026',
  'logement-etudiant-tokyo-octobre':            'student-housing-tokyo-october',
  'appartement-meuble-tokyo-expats-top-5':      'furnished-apartment-tokyo-top-5-expats',
  'alternative-remoters-chasseur-tokyo':        'remoters-alternative',
  'dossier-location-refuse-tokyo-etranger':     'rental-application-rejected-japan-foreigner',
  'chasseur-immobilier-tokyo-tarifs-vaut-il-le-coup': 'real-estate-hunter-tokyo-cost-worth-it',
  'chasseur-immobilier-vs-agence-tokyo-comparatif': 'real-estate-hunter-vs-agency-tokyo',
  'service-chasseur-immobilier-tokyo-comment-ca-marche': 'how-real-estate-hunter-works-tokyo',
  'hiroo-minami-azabu-guide-expatries-tokyo':   'hiroo-minami-azabu-expat-neighborhood-guide',
  'loyers-tokyo-par-quartier-2026':             'tokyo-rent-by-neighborhood-2026',
  'appartement-tokyo-entrepreneur-freelance':   'renting-tokyo-entrepreneur-startup-guide',
  'relocation-entreprise-tokyo-guide-rh':       'corporate-relocation-tokyo-hr-housing-guide',
  'ebisu-daikanyama-nakameguro-guide-expatries': 'ebisu-daikanyama-nakameguro-expat-guide',
  'se-loger-shibuya-quartier-guide': 'living-shibuya-housing-guide',
  'se-loger-nakano-quartier-guide': 'living-nakano-housing-guide',
  'se-loger-ikebukuro-quartier-guide': 'living-ikebukuro-housing-guide',
  'se-loger-koenji-quartier-guide': 'living-koenji-housing-guide',
  'se-loger-asagaya-quartier-guide': 'living-asagaya-housing-guide',
  'se-loger-kichijoji-quartier-guide': 'living-kichijoji-housing-guide',
  'se-loger-sangenjaya-quartier-guide': 'living-sangenjaya-housing-guide',
  'social-apartment-tokyo-guide': 'social-apartments-tokyo-guide',
  'virement-bancaire-japon-furikomi-guide': 'bank-transfer-japan-furikomi-guide',
  'assurance-sante-visa-japon-2027': 'health-insurance-visa-japan-2027',
  'gaijin-house-tokyo-guide-complet': 'gaijin-house-tokyo-guide',
  'trouver-logement-tokyo-deux-semaines-mutation': 'find-housing-tokyo-two-weeks-relocation',
  'demenager-tokyo-ete-juillet-aout': 'moving-to-tokyo-summer-july-august',
  'saison-typhons-tokyo-choisir-logement': 'typhoon-season-tokyo-choosing-housing',
  'rapport-loyers-tokyo-2026': 'tokyo-rent-report-2026',
  'etrangers-paient-plus-cher-loyer-tokyo': 'do-foreigners-pay-more-rent-tokyo',
  'ligne-train-tokyo-loyer-moins-cher':      'cheapest-train-line-tokyo-rent',
  'stations-tokyo-loyer-moins-cher':          'cheapest-stations-tokyo-rent',
  'frais-caches-location-tokyo':               'tokyo-apartment-move-in-costs',
  'logement-ur-tokyo-etrangers':               'ur-housing-tokyo-foreigners',
}

export function getTwinSlug(slug: string, locale: Locale): string | undefined {
  if (locale === 'fr') return TWIN_SLUGS[slug]
  return Object.keys(TWIN_SLUGS).find((k) => TWIN_SLUGS[k] === slug)
}

export function getBlogPosts(locale: Locale): BlogPost[] {
  return blogPosts.filter((p) => p.locale === locale)
}

export function getBlogPost(slug: string, locale: Locale): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug && p.locale === locale)
}
