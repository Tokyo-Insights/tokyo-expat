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
  {
    slug: 'assurance-maladie-japon-expatrie',
    locale: 'fr',
    title: 'Assurance maladie au Japon pour les expatriés : guide complet 2026',
    description: 'Kokumin Kenko Hoken ou shakai hoken : comment fonctionne l\'assurance maladie au Japon, combien ça coûte et comment s\'inscrire en tant qu\'étranger.',
    date: '2026-06-19',
    readingTime: '6 min',
    content: `
Le système de santé japonais est l'un des meilleurs au monde, mais il est basé sur une couverture obligatoire que tout résident doit avoir. Comprendre comment fonctionne l'assurance maladie au Japon est essentiel avant votre arrivée.

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

## Que faire si vous tombez malade avant d'avoir votre carte ?

Si vous avez besoin d'un médecin avant d'avoir reçu votre carte d'assurance, vous payez le montant total (100%) de la consultation. Conservez tous vos reçus. Une fois votre carte reçue, vous pouvez demander le remboursement de la part prise en charge (70%) auprès de votre mairie.

---

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

---

*Votre logement à Tokyo est la première étape pour obtenir votre adresse et enregistrer votre zairyu card. Réservez une consultation gratuite pour voir les disponibilités.*
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

---

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

---

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

---

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

## What to do if you fall ill before your insurance card arrives

If you need a doctor before receiving your insurance card, you pay 100% of the consultation cost. Keep all your receipts. Once your card arrives, you can claim reimbursement of the 70% covered portion at your ward office.

---

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

---

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

---

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

---

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

---

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

---

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

## Le garant personnel (保証人 hoshounin) : l'obstacle historique

Pendant des décennies, tout locataire au Japon devait présenter un hoshounin, littéralement "personne qui garantit". Ce garant devait être japonais, résider au Japon, disposer de revenus suffisants et accepter une responsabilité solidaire sur le loyer.

Pour un expatrié qui vient d'arriver, c'est un cercle vicieux : vous n'avez pas de réseau japonais, donc vous n'avez pas de garant, donc vous ne pouvez pas louer d'appartement classique.

Quelques cas où le garant personnel reste possible :
- **Votre employeur japonais** joue le rôle de garant (courant pour les contrats d'expatriation en entreprise)
- **Un ami japonais** accepte de se porter garant (rare et engagement lourd pour lui)
- **Votre université** facilite l'accès à un garant pour les étudiants étrangers

Dans tous les autres cas, la société de garantie est devenue la norme.

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

**Appartements meublés pour étrangers :** des opérateurs comme Sakura House, Tokyo Share House ou Borderless House proposent des appartements meublés avec un processus d'entrée simplifié, sans hoshounin ni hoshougaisha. Ces logements sont plus chers au m² mais accessibles dès le premier jour. Voir notre [guide sur les appartements meublés à Tokyo](/fr/blog/appartement-meuble-tokyo-sans-garant).

**Propriétaires directs expérimentés avec les étrangers :** sur des plateformes comme GaijinPot Housing ou Suumo International, certains propriétaires ou gestionnaires acceptent les étrangers avec un processus simplifié.

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
The guarantor requirement is one of the most feared obstacles for foreigners looking for an apartment in Japan. In the traditional Japanese rental system, landlords require a personal guarantor — usually Japanese — who commits to paying rent on your behalf if you default. Without a local network, finding such a person is nearly impossible when you first arrive. The good news: the market has evolved, and concrete solutions exist.

## The personal guarantor (保証人 hoshounin): the historical barrier

For decades, every tenant in Japan had to provide a hoshounin — literally "a person who guarantees." This guarantor had to be Japanese, resident in Japan, have sufficient income, and accept joint liability for the rent.

For an expat just arriving, it's a vicious cycle: no Japanese network means no guarantor, which means no standard apartment.

A personal guarantor may still be possible when:
- **Your Japanese employer** acts as guarantor (common in corporate expat transfers)
- **A Japanese friend** agrees to act as guarantor (rare, and a heavy commitment for them)
- **Your university** facilitates access to a guarantor for international students

In all other cases, the guarantee company has become the standard solution.

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

**Foreigner-friendly furnished apartments:** operators like Sakura House, Tokyo Share House, or Borderless House offer furnished apartments with a simplified entry process — no hoshounin, no hoshougaisha. These are more expensive per sqm but accessible from day one. See our [furnished apartment guide](/en/blog/furnished-apartment-tokyo-no-guarantor).

**Direct landlords experienced with foreigners:** on platforms like GaijinPot Housing or Suumo International, some landlords or property managers accept foreigners with a simplified process.

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

---

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

## Why renter's insurance is mandatory in Japan

Japan is one of the most exposed countries in the world to natural disasters: earthquakes, typhoons, floods, and fires. In a country where residential buildings are often dense and interconnected, a single incident in one apartment can quickly affect neighbors on other floors.

This is why landlords and real estate agencies systematically require renter's insurance at lease signing. Coverage typically includes:

**Third-party liability (個人賠償責任 kojin baisho sekinin):**
If you cause water damage or a fire that spreads to the apartment above or below you, you are legally responsible for the damage to your neighbors. Without insurance, this risk falls entirely on you personally.

**Damage to the apartment (火災 kasai):**
Damage to the rental unit caused by fire — even accidental — is covered. Note: this is separate from the insurance the landlord holds on the building itself.

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
If you don't want to handle the process separately, accepting the agency's insurance is a valid option. It costs more, but everything is in order from signing day. Just verify that the policy covers third-party liability — that's the most critical coverage for a tenant.

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

---

*Setting up in Tokyo and need guidance on the paperwork required on arrival? Book a free consultation — we walk you through every step so you don't make costly mistakes.*
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

## Les résidences universitaires (学生寮 gakusei ryou)

C'est l'option la moins chère, et souvent la plus demandée. Les universités japonaises proposent des résidences internes ou partenaires pour leurs étudiants étrangers.

**Avantages :**
- Prix compétitifs : 30 000 à 60 000 JPY par mois tout compris (chambre, charges, internet)
- Emplacement souvent proche du campus
- Réseau social immédiat avec d'autres étudiants internationaux et japonais
- Processus géré en grande partie par l'université

**Inconvénients :**
- Places limitées et fortement compétitives — ce n'est pas garanti même si vous êtes accepté à l'université
- Règles de vie strictes (couvre-feu, règles sur les visiteurs, horaires de cuisine)
- Durée maximale souvent limitée à 1 an

**Comment postuler :** la demande passe par le bureau des relations internationales (kokusai kouryuu) de votre université japonaise. Faites-le en même temps que votre candidature d'admission, soit 4 à 6 mois avant votre arrivée. La compétition est forte, notamment dans les grandes universités de Tokyo (Todai, Waseda, Keio, TUJ).

## Les share houses pour étudiants

Si la résidence universitaire n'est pas disponible ou ne correspond pas à ce que vous cherchez, les share houses sont l'option la plus populaire parmi les étudiants étrangers à Tokyo.

**Prix typiques :**
- Chambre privée dans un share house standard : 40 000 à 65 000 JPY par mois
- Chambre dans un share house design / premium : 70 000 à 90 000 JPY par mois
- Charges et internet généralement inclus

**Opérateurs bien établis pour les étudiants :**
- **Sakura House** : le plus connu pour les étrangers, nombreuses propriétés, processus d'entrée simplifié, pas de garant requis
- **Oakhouse** : ambiance internationale, nombreux profils étudiants
- **Tokyo Share House** : interface en anglais, accepte les visas étudiants
- **Borderless House** : concept "mixed living" Japonais/étrangers, idéal pour progresser en japonais

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

---

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

## University dormitories (学生寮 gakusei ryou)

This is the least expensive option — and the most competitive. Japanese universities offer internal or partner dormitories for their international students.

**Advantages:**
- Competitive pricing: 30,000 to 60,000 JPY per month all-inclusive (room, utilities, internet)
- Often located near campus
- Immediate social network with other international and Japanese students
- Process largely managed by the university

**Disadvantages:**
- Limited spots and highly competitive — not guaranteed even after university acceptance
- Strict house rules (curfews, visitor policies, kitchen hours)
- Maximum stay often limited to one year

**How to apply:** applications go through the international office (kokusai kouryuu) of your Japanese university. Submit it at the same time as your admission application — 4 to 6 months before arrival. Competition is intense at top Tokyo universities (Todai, Waseda, Keio, TUJ, Sophia).

## Share houses for students

If university housing is unavailable or doesn't suit your needs, share houses are the most popular option among international students in Tokyo.

**Typical prices:**
- Private room in a standard share house: 40,000 to 65,000 JPY per month
- Room in a design/premium share house: 70,000 to 90,000 JPY per month
- Utilities and internet generally included

**Well-established operators for students:**
- **Sakura House:** the best-known for foreigners, many properties, simplified entry process, no guarantor required
- **Oakhouse:** international atmosphere, many student profiles
- **Tokyo Share House:** English interface, accepts student visas
- **Borderless House:** "mixed living" concept (Japanese + international), ideal for practicing Japanese

**Minimum stay:** typically 1 to 3 months depending on the operator — practical for a semester abroad or a full academic year.

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

---

*Preparing a study stay in Tokyo and need housing sorted before you arrive? Get in touch for a free consultation — we'll help you find the right option for your budget and visa type.*
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
Signer un bail à Tokyo en tant qu'étranger comporte des risques concrets si vous ne savez pas lire un contrat en japonais. Les mauvaises surprises les plus fréquentes — frais cachés, clause de remise en état abusive, préavis mal compris — peuvent vous coûter plusieurs centaines de milliers de yens à la sortie. Cette checklist couvre les 12 points à vérifier impérativement avant de signer.

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
- Si c'est un bail à durée fixe (定期借家契約, teiki shakka keiyaku) — dans ce cas, pas de renouvellement automatique, le propriétaire peut refuser de prolonger

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

La majorité des appartements à Tokyo est classée "禁止 (kinshi)" pour les animaux. Vérifiez explicitement si les animaux sont autorisés, et si oui, lesquels. En cas de doute, demandez une confirmation écrite — un accord verbal ne protège pas en cas de litige.

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
Signing a lease in Tokyo as a foreigner carries real risks if you can't read a contract in Japanese. The most common bad surprises — hidden fees, an aggressive restoration clause, a misunderstood notice period — can cost you hundreds of thousands of yen when you move out. This checklist covers the 12 points you must verify before signing.

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

The standard Japanese lease runs 2 years (普通借家契約 futsuu shakka keiyaku). At expiry, it can be renewed for another 2 years — sometimes with a renewal fee (koushin ryou) of 0.5 to 1 month's rent.

Verify:
- Start and end date of the lease
- Renewal fee amount
- Whether it's a fixed-term lease (定期借家契約 teiki shakka keiyaku) — in this case, no automatic renewal, and the landlord may refuse to extend

## 3. Notice period if you leave early

The standard notice period if you leave before the lease ends is 1 month, but some contracts require 2. Also check whether there's an early termination penalty (e.g., required to pay 2 months' rent if you leave within the first 6 months).

## 4. Restoration clause (原状回復 genjou kaifuku)

This is the clause that causes the most disputes between tenants and landlords in Japan. The legal principle is that tenants are only responsible for damage they caused — not for normal wear and tear. In practice, some landlords try to charge for work that falls under normal maintenance.

Explicitly verify:
- Who pays for the final cleaning? (often billed to the tenant even when debatable)
- Who pays for tatami or fusuma replacement due to normal wear?
- Is there a clause requiring tenants to repaint walls at their own expense?

The Ministry of Land, Infrastructure and Transport guidelines are clear: normal wear and tear is the landlord's responsibility. A lease that deviates significantly from these guidelines is open to negotiation.

## 5. Pet policy

The majority of apartments in Tokyo are classified as "禁止 (kinshi)" for pets. Explicitly verify whether pets are allowed, and if so, which types. If in doubt, request written confirmation — a verbal agreement provides no protection in a dispute.

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

---

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

---

*Vous cherchez un share house ou un appartement meublé à Tokyo pour votre arrivée ? Réservez une consultation gratuite pour voir les disponibilités actuelles.*
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

---

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

---

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

For a central Tokyo apartment at 120,000 JPY/month, a 25% discount saves 30,000 JPY per month — 360,000 JPY per year.

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

For everyone else: it is one of the rare levers that allows you to rent in central Tokyo at prices comparable to the suburbs — with none of the commute penalty.

---

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

**Chercher uniquement sur les portails publics.** Suumo et Homes ne montrent qu'une partie du marché. Les biens hors marché, qui circulent via les réseaux professionnels, représentent souvent les meilleures opportunités — surtout en période de plus faible demande où les propriétaires acceptent de travailler avec des intermédiaires pour éviter la vacance.

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

Une consultation de 30 minutes suffit pour faire le point sur ce qui est disponible dans votre budget et votre quartier cible — avant même votre arrivée au Japon.

---

*Vous arrivez à Tokyo en septembre ? Réservez une consultation gratuite maintenant pour voir les disponibilités actuelles et sécuriser votre logement avant d'atterrir.*
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

**Search only on public portals.** Suumo and Homes show only part of the market. Off-market properties, circulating through professional networks, often represent the best opportunities — especially in lower-demand periods when landlords accept working with intermediaries to avoid vacancy.

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

A 30-minute consultation is enough to review what is available in your budget and target neighbourhood — before you even fly to Japan.

---

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
## Trouver un appartement meublé à Tokyo rapidement : le guide pour expatriés

Vous arrivez à Tokyo en octobre — mutation professionnelle, nouveau poste, installation longue durée — et vous avez besoin d'un logement **meublé et disponible sous 48h**. Les procédures japonaises standard (garant, hanko, caution) prennent 3 à 6 semaines. Ces 5 options les contournent.

## 1. Share houses spécialisées expatriés

Les réseaux Oak House, Sakura House et Hana Sakura proposent des chambres et studios meublés disponibles sans garant japonais.

Avantages :
- Zéro garant japonais : dépôt de 1 à 2 mois
- Tout inclus : meubles, literie, wifi, eau, électricité
- Durée flexible : minimum 1 mois, renouvellement mensuel
- Couverture : toutes les lignes principales (Yamanote, Chuo, Keio, Tokyu)

Prix typiques : 45 000 à 80 000 ¥/mois selon la chambre et le quartier.

Idéal pour : premières semaines au Japon, budget serré, pas de meubles à transporter.

## 2. Monthly mansions (マンスリーマンション)

Les monthly mansions sont des appartements privés loués au mois, déjà équipés : cuisine, machine à laver, TV. Contrairement aux share houses, vous disposez de votre propre espace.

Opérateurs principaux : Weekly Mansion Tokyo, Leopalace21, Sakura House Monthly.

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

Opérateurs : Sakura Hotel & House, Weekly Mansion Tokyo, Arden Hotel Akasaka.

Avantage stratégique : vous pouvez visiter physiquement des appartements standard depuis Tokyo, ce qui améliore nettement vos chances d'obtenir un bail classique.

## 5. Appartements "gaikokujin-muke" (外国人向け)

Depuis 2020, une catégorie d'appartements conçus pour étrangers s'est développée sur Suumo et At Home, avec le filtre 「外国人可」. Ces logements peuvent être meublés ou non, mais l'agence maîtrise les démarches pour non-résidents.

Partenaires : Able, Sumifu, Leopalace21, ESR.

## Comparatif rapide

| Situation | Option recommandée | Budget mensuel |
|-----------|-------------------|----------------|
| Arrivée en urgence (moins de 7 jours) | Weekly mansion | 25 à 50k ¥/semaine |
| Installation 1 à 3 mois | Share house | 45 à 80k ¥ |
| Budget moyen, seul | Monthly mansion | 100 à 150k ¥ |
| Couple ou famille | Monthly mansion ou gaikokujin-muke | 150 à 250k ¥ |
| Mission corporate | Serviced apartment | 250k ¥ et plus |

## Le pic d'octobre : ce que les agences ne disent pas

En septembre-octobre, les mutations d'entreprises japonaises et les entrées en poste du second semestre créent une forte concurrence sur les logements disponibles. Les meilleures chambres Oak House et les studios monthly mansion partent en quelques heures après mise en ligne.

Si vous arrivez en octobre, réservez votre premier logement — même temporaire — **au moins 3 semaines avant votre arrivée**. La plupart des share houses acceptent les paiements par carte bancaire internationale à distance.

## Questions fréquentes

**Peut-on louer un appartement meublé à Tokyo sans résidence au Japon ?**

Oui, pour les share houses et monthly mansions. Le passeport suffit à l'entrée. Pour un bail standard, vous aurez besoin de votre numéro de résidence (obtenu à la mairie après votre installation).

**Faut-il un garant japonais ?**

Non pour les share houses et monthly mansions. Oui pour un bail classique. Nous pouvons vous orienter vers des appartements avec garantie alternative (J-Trust, Global Trust Networks).

**Peut-on visiter à distance avant d'arriver ?**

Oui. La majorité des share houses proposent des visites virtuelles via Zoom. Oak House et Sakura House disposent d'équipes anglophones et francophones.

---

*Vous arrivez à Tokyo prochainement ? [Contactez-nous](/contact) pour une liste des disponibilités actuelles adaptées à votre budget et quartier cible.*
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

Relocating to Tokyo — corporate transfer, new job, long-term move — means facing one of the tightest rental markets in the developed world. Standard Japanese leases require a guarantor, hanko, and 3 to 6 weeks of processing. These 5 options bypass all that.

## 1. Expat-friendly share houses

Networks like Oak House, Sakura House and Hana Sakura specialise in furnished rooms and studios for foreigners, with no Japanese guarantor required.

Key advantages:
- No Japanese guarantor: a deposit of 1 to 2 months is enough
- All-inclusive: furniture, bedding, wifi, all utilities
- Flexible terms: minimum 1 month, renewable monthly
- Coverage: all major lines (Yamanote, Chuo, Keio, Tokyu)

Typical price range: ¥45,000 to ¥80,000 per month depending on room type and location.

Best for: first weeks in Japan, tight budget, no furniture to ship.

## 2. Monthly mansions (マンスリーマンション)

Monthly mansions are private fully-equipped apartments rented by the month — kitchen, washing machine, TV all included. Unlike share houses, you have complete privacy.

Key operators: Weekly Mansion Tokyo, Leopalace21, Sakura House Monthly.

- Availability: sometimes within 24 hours of booking
- Size: typically 20 to 35 m² studios
- Price: ¥100,000 to ¥200,000 per month depending on neighbourhood
- Minimum stay: usually 7 days — useful for testing an area before committing to a long lease

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

Operators: Sakura Hotel & House, Weekly Mansion Tokyo, Arden Hotel Akasaka.

Strategic advantage: being in Tokyo lets you physically visit standard apartments, which substantially increases your chances of securing a regular lease.

## 5. Foreigner-friendly apartments (外国人向け)

Since 2020, a growing category of foreigner-ready listings has appeared on Suumo and At Home, searchable with the filter 「外国人可」. These may be furnished or unfurnished but the agency handles paperwork for non-residents.

Key partners: Able, Sumifu, Leopalace21, ESR.

## Quick comparison

| Situation | Best option | Monthly budget |
|-----------|-------------|----------------|
| Urgent arrival (under 7 days) | Weekly mansion | ¥25k to 50k per week |
| Stay of 1 to 3 months | Share house | ¥45k to 80k |
| Mid-range budget, solo | Monthly mansion | ¥100k to 150k |
| Couple or family | Monthly mansion or gaikokujin-muke | ¥150k to 250k |
| Corporate relocation | Serviced apartment | ¥250k and above |

## The October crunch: what agencies don't tell you

October and early Q4 are peak relocation periods. Japanese companies process mid-year staff transfers, and foreign executives arrive ahead of the November-March fiscal cycle. The best Oak House rooms and monthly mansion studios rent within hours of listing.

If you are arriving in October, reserve your first accommodation — even temporary — **at least 3 weeks before landing**. Most share houses accept international card payments and remote booking.

## FAQ

**Can I rent a furnished apartment in Tokyo without Japanese residency?**

Yes, for share houses and monthly mansions — your passport is enough on arrival. For a standard lease, you will need your residence registration number, obtained at your local ward office after arrival.

**Do I need a Japanese guarantor?**

Not for share houses or monthly mansions. Yes for a standard lease. We can connect you with apartments that accept alternative guarantors such as J-Trust or Global Trust Networks.

**Can I view the property before arriving?**

Yes. Most share houses offer virtual tours via Zoom. Oak House and Sakura House have English-speaking staff, and some also have French speakers.

---

*Relocating to Tokyo soon? [Contact us](/contact) for a current availability list matching your budget and target neighbourhood.*
    `.trim(),
  },
]

export function getBlogPosts(locale: Locale): BlogPost[] {
  return blogPosts.filter((p) => p.locale === locale)
}

export function getBlogPost(slug: string, locale: Locale): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug && p.locale === locale)
}
