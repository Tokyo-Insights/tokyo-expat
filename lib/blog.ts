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

La différence vient du fait que la plupart des biens sur les portails publics (Suumo, Homes) sont déjà loués au moment où vous les voyez. Les propriétés disponibles circulent dans des réseaux professionnels avant d'être listées en ligne.

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

---

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

## Qu'est-ce qu'un share house au Japon ?

Un share house (シェアハウス) est une maison ou un appartement où plusieurs résidents partagent les espaces communs : cuisine, salle de bains, salon. Chaque résident dispose d'une chambre privée, généralement de 8 à 16m2.

Contrairement à la colocation française improvisée entre amis, le share house japonais est géré par un opérateur professionnel. Il existe des centaines d'opérateurs à Tokyo, de la chambre à 40 000 JPY/mois dans un immeuble standard aux "designer share houses" à 90 000 JPY avec salle de sport et toit-terrasse.

## Combien ça coûte vraiment ?

**Loyer mensuel** : 45 000 à 90 000 JPY selon la taille de la chambre, le quartier et les équipements.

**Frais d'entrée** : généralement 1 mois de caution remboursable et frais administratifs de 10 000 à 30 000 JPY. Pas de reikin.

**Charges incluses** : eau, électricité, gaz, internet sont souvent inclus dans le loyer. Vérifiez toujours avant de signer.

**Durée minimale** : certains opérateurs acceptent des séjours à partir de 1 mois, d'autres exigent 3 mois minimum.

Budget total pour une installation en share house à Tokyo : **100 000 à 180 000 JPY** (contre 400 000 à 600 000 JPY pour un appartement standard).

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

---

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

## Le logement : le poste dominant

Le loyer représente 40 à 50% du budget total d'un expatrié à Tokyo. C'est le levier principal sur lequel vous pouvez agir.

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

---

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

Yet thousands of expats find housing in Tokyo every year. The difference between those who settle in two weeks and those who struggle for three months comes down to method.

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

---

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

---

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

## Housing: the dominant cost

Rent represents 40 to 50% of a Tokyo expat's total budget. It is also the main lever you can act on.

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

---

*Preparing your move to Tokyo? Book a free consultation to map out a realistic budget and see what is available in your range.*
    `.trim(),
  },
]

export function getBlogPosts(locale: Locale): BlogPost[] {
  return blogPosts.filter((p) => p.locale === locale)
}

export function getBlogPost(slug: string, locale: Locale): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug && p.locale === locale)
}
