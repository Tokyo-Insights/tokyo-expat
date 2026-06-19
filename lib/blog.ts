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
  {
    slug: 'visa-travail-japon-francophone-2026',
    locale: 'fr',
    title: 'Visa travail au Japon pour les francophones : quel type choisir en 2026 ?',
    description: 'Visa ingénieur, travailleur hautement qualifié, working holiday : les options de visa pour travailler au Japon expliquées pour les ressortissants français et belges.',
    date: '2026-06-19',
    readingTime: '8 min',
    content: `
Travailler au Japon en tant que francophone est tout à fait possible, mais le système de visas japonais est complexe et mal documenté en français. Voici les principales catégories de visas pour les ressortissants français, belges et suisses, avec les conditions réelles pour chacune.

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
L'un des plus grands obstacles pour un étranger qui cherche un appartement à Tokyo est le garant japonais (hoshounin). La bonne nouvelle : il existe un marché entier de logements meublés conçus spécifiquement pour les étrangers, sans garant obligatoire.

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

---

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

---

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

---

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
The Japanese guarantor requirement is the single biggest barrier for foreigners renting in Tokyo. The good news: an entire segment of the market exists specifically for foreigners who need furnished housing without a Japanese guarantor.

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

---

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

Japan Post Bank (ゆうちょ銀行) is the most foreigner-friendly option for recent arrivals. It operates through post office branches across Japan — thousands of locations nationwide.

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

---

*Relocating to Tokyo and want housing ready before you arrive? Book a free 30-minute consultation to start the remote search process.*
    `.trim(),
  },
]

export function getBlogPosts(locale: Locale): BlogPost[] {
  return blogPosts.filter((p) => p.locale === locale)
}

export function getBlogPost(slug: string, locale: Locale): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug && p.locale === locale)
}
