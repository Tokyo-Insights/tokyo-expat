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

## Next steps: housing and lease

Before you sign your lease, work through our complete [Tokyo rental contract checklist](/en/blog/tokyo-rental-contract-checklist) — every clause worth reviewing, hidden fees to watch for, and what you can negotiate before committing. If you are still searching from outside Japan, our guide to [finding an apartment in Tokyo from abroad](/en/blog/tokyo-apartment-hunting-from-abroad) covers remote search, virtual tours, and operators who accept international applications.

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

## Deux Options Supplémentaires à Connaître

**Visa Nomade Digital (2024)** : si vous travaillez à distance pour une entreprise basée hors Japon et gagnez plus de 10 millions JPY par an, le visa nomade digital vous permet de rester au Japon jusqu'à 6 mois (prorogeable une fois). Disponible pour les ressortissants de plus de 50 pays. Voir notre [guide complet du Visa Nomade Digital Japon](/blog/visa-nomade-digital-japon-2026).

**Programme Vacances Travail (PVT)** : pour les ressortissants de 18 à 30 ans des pays partenaires (France, Canada, Allemagne, Irlande et autres), le PVT Japon permet de rester 12 mois sans être lié à un employeur. L'option long séjour la plus accessible pour les jeunes. Voir notre [guide complet du PVT Japon](/blog/pvt-japon-visa-vacances-travail-2026).

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

## Prochaines étapes : logement et bail

Avant de signer votre contrat de location, parcourez notre [checklist complète du bail à Tokyo](/fr/blog/checklist-bail-tokyo) — toutes les clauses à vérifier, les frais cachés à débusquer et les points de négociation avant de vous engager. Si vous êtes encore en France et que vous cherchez à distance, notre guide pour [trouver un appartement à Tokyo depuis l'étranger](/fr/blog/chercher-appartement-tokyo-depuis-etranger) couvre la recherche à distance, les visites virtuelles et les opérateurs qui acceptent les candidatures internationales.

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

## Two Additional Options Worth Knowing

**Digital Nomad Visa (2024)**: if you work remotely for a company based outside Japan and earn above approximately 10 million JPY per year, Japan's digital nomad visa allows you to stay for up to 6 months (extendable once). No need to quit your current job. Available to nationals of 50+ countries. See our [complete Japan Digital Nomad Visa guide](/blog/japan-digital-nomad-visa-2026).

**Working Holiday Visa**: for nationals aged 18-30 from eligible countries (France, UK, Australia, Canada, Germany and others), the working holiday visa allows 12 months in Japan with no employer restriction. The most accessible long-stay option for young people. See our [complete Working Holiday Visa guide](/blog/japan-working-holiday-visa-guide-2026).

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
  {
    slug: 'transport-tokyo-expatrie-guide',
    locale: 'fr',
    title: 'Transport à Tokyo : guide complet pour expatriés 2026',
    description: 'Métro, JR, carte Suica et applications : tout ce que les expatriés doivent savoir pour se déplacer à Tokyo et choisir leur quartier selon leur trajet.',
    date: '2026-06-21',
    readingTime: '8 min',
    content: `
## Transports à Tokyo : métro, JR et tout ce qu'il faut savoir

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

You do not need a car in Tokyo. The public transport network runs on average less than 60 seconds late, covers virtually every corner of the city, and costs a fraction of equivalent trips in other major capitals. The layered system of operators and lines looks complicated at first. This guide cuts through it.

## Two metro systems, one IC card

Tokyo has two separate metro networks run by different operators.

**Tokyo Metro** operates 9 lines: Ginza, Marunouchi, Hibiya, Namboku, Fukutoshin, Chiyoda, Yurakucho, Hanzomon, and Tozai. It covers most of the central wards and connects the major employment hubs.

**Toei Subway** operates 4 lines: Asakusa, Mita, Shinjuku, and Oedo. The Oedo line is particularly useful for reaching Roppongi, Shiodome, and Shinjuku.

Both networks use the same Suica or Pasmo IC cards. Cross-operator transfers cost slightly more than staying on one network. Peak frequency: 2 to 5 minutes. Operating hours: approximately 5:00 AM to 12:30 AM.

## JR Lines: the backbone of the city

**JR Yamanote Line**: the circular loop connecting Tokyo's 30 most important stations — Shinjuku, Shibuya, Harajuku, Ebisu, Osaki, Shinagawa, Tokyo, Akihabara, Ueno, Ikebukuro. If you understand this single line, you understand Tokyo's geography.

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
| Cours en ligne (iTalki) | 10 000 à 20 000 ¥ | Flexible |

## FAQ

**Dois-je apprendre le japonais pour vivre à Tokyo ?**

Non, c'est possible sans. Mais les expatriés qui apprennent, même à un niveau basique, rapportent une expérience de vie beaucoup plus riche et moins stressante. La barrière administrative est réelle.

**Quelle option si je travaille 5 jours sur 7 ?**

Coto Academy pour les cours du soir en groupe, et iTalki pour des cours particuliers flexibles le weekend.

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
## Organiser son déménagement international vers le Japon

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
## Choisir son quartier à Tokyo quand on a des enfants

Pour une famille expatriée, le choix du quartier est plus contraignant qu'pour un célibataire. Trois facteurs dominent la décision : la proximité de l'école internationale des enfants, la surface disponible pour le loyer payé, et l'accès aux équipements familiaux (parcs, supermarchés, hôpitaux). Ce guide passe en revue les zones les plus plébiscitées par les familles étrangères résidant à Tokyo.

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

---

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

---

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
| Online tutors (iTalki) | 10,000 to 20,000 ¥ | Flexible |

## FAQ

**Is Japanese necessary to live in Tokyo?**

Not strictly. But expats who learn, even at a basic level, report a significantly richer and less stressful experience. Administrative barriers are real in Japan.

**Does knowing Japanese help find an apartment?**

Definitely. Even basic phrases help with agency visits and understanding contract terms. Our [guide to finding an apartment in Tokyo](/blog/find-apartment-tokyo-foreigner) explains the full rental process step by step.

**Which option if I work five days a week?**

Coto Academy for group evening classes, and iTalki for flexible weekend private lessons.

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

---

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
## Choosing a Tokyo Neighbourhood as an Expat Family

For a family relocating to Tokyo, neighbourhood choice involves more constraints than for a single professional. Three factors typically drive the decision: proximity to your children's international school, the amount of space you can get for your housing budget, and access to family infrastructure such as parks, supermarkets and English-speaking medical services. This guide covers the most popular areas among expat families.

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

---

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

This guide covers everything you need to know: who qualifies, how to apply, what you can and cannot do during your stay, and how to find housing in Tokyo once you arrive.

## What Is the Japan Digital Nomad Visa?

The Japan Digital Nomad Visa is a Specified Activities Visa (在留資格「特定活動」第50号) introduced in March 2024. It targets remote workers who are employees or sole proprietors working exclusively for clients or companies based outside Japan.

It is not a standard work visa. You cannot take a job with a Japanese company on this status. The visa is designed specifically for people whose income comes from abroad and who want to base themselves in Japan while continuing that work.

## Who Is Eligible?

Requirements as of 2026:

**Income**: approximately 10 million JPY per year (roughly 65,000 USD or 60,000 EUR). Japan does not accept part-time or casual income — the threshold applies to your total annual earnings from your foreign employer or clients.

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
- Open a bank account (some banks accept this status, others do not — PayPay Bank and Sony Bank are the most flexible)
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

**Furnished monthly apartments**: the most practical choice. Properties designed for medium-term stays, usually 1 to 3 months minimum. Utilities often included. Expect 130,000 to 220,000 JPY per month for a central 1K or 1LDK. Operators such as Sakura House Monthly, Oak House, and specialist furnished apartment services cater to this market.

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

In most cases yes — your spouse and minor children may accompany you under the dependent category of the same visa. Rules vary by nationality, so confirm with the Japanese embassy in your country.

**Can I freelance for Japanese clients?**

No. The digital nomad visa explicitly prohibits any remunerated activity with Japanese companies or individuals. Violation risks visa cancellation and future entry bans.

**What happens if I overstay?**

Overstay of any Japanese visa results in deportation and a minimum 5-year entry ban. Do not overstay.

**Is Japan a good base for digital nomads?**

Infrastructure-wise, Japan is excellent: fast fiber internet everywhere, coworking spaces in most Tokyo wards, reliable public transport, very low crime. The main challenges are the high income threshold for the visa and the cost of living relative to Southeast Asia.

---

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

**Appartements meublés en location mensuelle** : l'option la plus pratique. Propriétés conçues pour les séjours de moyen terme, généralement à partir de 1 à 3 mois. Charges souvent incluses. Comptez 130 000 à 220 000 JPY par mois pour un 1K ou 1LDK central. Des opérateurs comme Sakura House Monthly, Oak House et des services d'appartements meublés spécialisés ciblent ce marché.

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

---

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

This guide covers who qualifies, how to apply, what you can do during your stay, and how to find housing in Tokyo — whether you arrive for a year of adventure or as a first step toward longer-term residency.

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

**Step 1 — Check the quota**. Some countries (France, Germany, South Korea) have annual quotas. Applications open at the start of the calendar year. Popular countries fill up fast — apply early.

**Step 2 — Prepare your documents**:
- Valid passport with at least 12 months validity beyond your intended departure
- Completed application form (download from Japanese embassy website)
- Passport-size photos
- Proof of sufficient funds: typically equivalent to 200,000 to 300,000 JPY ($1,500-$2,000 USD) in your bank account
- Return or onward travel ticket (or proof of funds to purchase one)
- For some countries: clean criminal record certificate

**Step 3 — Apply at the Japanese embassy or consulate** in your country. Processing time: 2 to 4 weeks typically.

**Step 4 — Arrive in Japan**. The WHV is a single-entry visa in some cases. Once in Japan, your 12-month stay begins.

**Step 5 — Register at your local ward office** within 14 days of settling into accommodation.

## Housing in Tokyo on a Working Holiday Visa

Finding accommodation in Tokyo as a WHV holder is easier than finding it as a standard rental applicant, because the best options for new arrivals don't require long-term commitments or Japanese guarantors.

**Share houses (recommended first step)**: no guarantor needed, 1-month deposit, utilities typically included, monthly contracts. Cost: 55,000 to 85,000 JPY per month. Major operators like Sakura House, Oak House and Borderless House have dedicated networks for international residents. Read our [complete share house guide](/blog/share-house-tokyo-guide-2026) for a full breakdown.

**Gaijin houses**: the most budget-conscious option. Basic private or dormitory rooms, very short-term commitment (sometimes week-by-week), all utilities included. Cost: 35,000 to 60,000 JPY per month. Lower comfort, but excellent for the first 1 to 2 months before you know which area of Tokyo suits you. See our [comparison of gaijin houses and share houses](/blog/gaijin-house-vs-share-house-tokyo).

**Standard apartments (later in your stay)**: after 3 to 6 months, once you have a Japanese employment record and income, some landlords will accept WHV holders with a rental guarantee company in place of a traditional guarantor. This opens up unfurnished apartments at more competitive rents. See our [guide to finding an apartment in Tokyo](/blog/find-apartment-tokyo-foreigner).

**Furnished short-stay apartments**: operators like Weekly Mansion and Sakura House Monthly offer furnished units on monthly contracts, no guarantor needed. More expensive than share houses (100,000 to 180,000 JPY/month) but more independent.

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

The WHV is not a path to permanent residency by itself — but it is an excellent starting point.

## FAQ

**Can I return to Japan after my WHV year?**

Yes, on a different visa category (tourist, student, work). The WHV itself cannot be obtained a second time, but it does not affect your ability to return on another status.

**Can I work full-time?**

Yes. There is no weekly hours restriction in most WHV employment. Some sector-specific rules apply (agricultural work has its own framework).

**What if my country's quota is full?**

You cannot apply until the following year. Quotas typically reset in January. France and Australia applicants in particular should apply in January or February.

**Is it possible to extend the visa by leaving Japan and re-entering?**

No. The WHV is a once-in-a-lifetime visa. Leaving and re-entering does not reset or extend it.

---

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

**Étape 1 — Vérifiez le quota.** Les pays comme la France ont un quota annuel de 6 500 places. Les demandes s'ouvrent au début de chaque année calendaire. Pour la France, les places partent vite : postulez dès janvier ou février.

**Étape 2 — Préparez vos documents** :
- Passeport valide au moins 12 mois au-delà de votre date de retour prévue
- Formulaire de demande rempli (téléchargeable sur le site de l'ambassade du Japon)
- Photos d'identité format passeport
- Preuve de fonds suffisants : généralement l'équivalent de 200 000 à 300 000 JPY (~1 500 EUR) sur votre compte bancaire
- Billet de retour ou de continuation (ou preuve de fonds pour l'acheter)
- Pour certains pays : extrait de casier judiciaire vierge

**Étape 3 — Déposez votre demande à l'ambassade ou au consulat du Japon** dans votre pays. Délai de traitement : 2 à 4 semaines.

**Étape 4 — Arrivée au Japon.** Le PVT est parfois un visa à entrée unique. Une fois au Japon, votre séjour de 12 mois commence.

**Étape 5 — Enregistrement à la mairie de votre arrondissement** dans les 14 jours suivant votre installation dans votre logement.

## Logement à Tokyo avec un PVT

Trouver un logement à Tokyo avec un PVT est plus facile que pour un locataire standard, car les meilleures options pour les nouveaux arrivants ne nécessitent ni engagement long terme ni garant japonais.

**Share houses (recommandé en premier)** : aucun garant requis, 1 mois de dépôt, charges généralement incluses, contrats mensuels. Coût : 55 000 à 85 000 JPY par mois. Les grands opérateurs comme Sakura House, Oak House et Borderless House ont des réseaux dédiés aux résidents internationaux. Lisez notre [guide complet des share houses à Tokyo](/blog/share-house-tokyo-guide-complet) pour tous les détails.

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

---

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

**Les opérateurs reconnus à Tokyo :**
- **Oak House** : le plus grand réseau de share houses au Japon, plus de 300 maisons à Tokyo
- **Sakura House** : orienté internationaux, bon rapport qualité-prix
- **Borderless House** : mix Japonais / étrangers volontaire, idéal pour apprendre la langue
- **Global Agents** : biens modernes, design, un peu plus chers

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

**2. En parallèle, explorez les share houses** : les sites de Oak House, Sakura House et Borderless House permettent de réserver en ligne depuis l'étranger. Payez votre premier mois à distance, les clés vous attendent à l'arrivée.

**3. Réservez dès maintenant pour octobre** : les meilleures chambres partent fin juillet et début août. Attendre septembre est le meilleur moyen de se retrouver avec le fond du catalogue.

Pour plus de détails sur la recherche depuis l'étranger, consultez notre [guide pour chercher un appartement à Tokyo depuis l'étranger](/blog/chercher-appartement-tokyo-depuis-etranger).

Si vous hésitez encore sur le type de logement, notre [guide complet des share houses à Tokyo](/blog/share-house-tokyo-guide-complet) détaille les options quartier par quartier et opérateur par opérateur.

---

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

**The main operators in Tokyo:**
- **Oak House:** Japan's largest share house network, 300+ properties in Tokyo alone
- **Sakura House:** well-known internationally, strong value for money
- **Borderless House:** intentionally mixed Japanese and foreign residents, good for language practice
- **Global Agents:** modern, design-oriented properties, slightly more expensive

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

**Step 2 - Search share houses in parallel:** Oak House, Sakura House, and Borderless House all allow international bookings online. Pay your first month remotely and the keys will be ready on arrival.

**Step 3 - Book before August:** The best rooms in the best share houses are gone by late July and early August. Waiting until September means you're choosing from what's left.

For a step-by-step guide on searching from abroad, see our [Tokyo apartment hunting from abroad guide](/blog/tokyo-apartment-hunting-from-abroad).

If you're still deciding on the type of housing, our [complete Tokyo share house guide](/blog/share-house-tokyo-guide-2026) covers options by neighbourhood and operator.

---

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

Voici les 5 options réelles que vous avez, avec leurs coûts 2026, leurs avantages et leurs limites.

## 1. La share house meublée (40 000 à 120 000 JPY/mois)

La share house est la solution la plus accessible pour un expatrié qui arrive sans garant japonais. Les chambres sont entièrement meublées, les parties communes partagées, et le dépôt de garantie est minimal (zéro chez certains opérateurs).

**Les opérateurs principaux à Tokyo :**
- **Oak House** : plus de 200 résidences, entrée rapide possible sous 1 semaine, à partir de 55 000 JPY/mois
- **Sakura House** : spécialisé internationaux, 5 villes JP, chambres dès 42 000 JPY/mois
- **Borderless House** : concept colocation mixte JP/étranger, idéal pour apprendre la langue
- **Global Agents** : share houses premium dans Shibuya, Shinjuku, Meguro (80 000-120 000 JPY)

**Durée minimum :** 1 mois pour la plupart. Certains opérateurs acceptent 2 semaines.

**Avantage principal :** aucun garant, internet inclus, installation immédiate.

**Limite :** espace privé réduit (15-25 m²), règles de vie commune à respecter.

## 2. Le monthly mansion meublé (80 000 à 200 000 JPY/mois)

Le monthly mansion est un appartement meublé individuel en location courte durée (1 mois minimum). Vous avez votre propre cuisine, votre salle de bain, votre entrée. Aucun voisin de palier.

**Opérateurs connus :**
- **Monthly.com** (anciennement Leo Palace 21) : réseau national, appartements studios meublés
- **Sakura House monthly** : variante solo pour les séjours 1-6 mois
- **Maison Marchais** (Shinjuku) : appartements haut de gamme pour cadres expatriés

**Budget réaliste à Tokyo :** comptez 100 000 à 150 000 JPY/mois pour un studio bien situé (Yamanote line).

**Avantage :** autonomie totale, adresse postale utilisable pour les démarches administratives.

**Limite :** prix plus élevé que la share house, parfois dépôt 1 mois.

## 3. L'appartement meublé via agence spécialisée (100 000 à 300 000 JPY/mois)

Certaines agences immobilières spécialisées dans la clientèle internationale proposent des appartements meublés avec baux flexibles, sans garant japonais requis.

**Agences recommandées :**
- **Real Estate Japan (GaijinPot)** : listings filtrés "foreigner-friendly", section meublé
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

**Vous arrivez dans moins de 3 semaines :** share house (Oak House ou Sakura House) ou monthly mansion. Ce sont les seules options avec une entrée rapide garantie.

**Vous avez 1-2 mois pour vous installer :** appartement via agence spécialisée. Vous aurez le choix du quartier, de la surface, et pourrez signer un bail classique 6-12 mois.

**Vous venez pour moins de 3 mois :** monthly mansion ou Airbnb pour la première semaine, puis share house pour le reste du séjour.

**Vous avez un employeur japonais :** commencez par demander le shataku. C'est la solution la moins chère et la plus simple si elle est disponible.

Pour un accompagnement personnalisé dans votre recherche, [contactez-nous](/contact) : nous gérons le processus de bout en bout en français, de la définition du budget jusqu'à la signature du bail.

---

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

Here are the 5 real options available to you, with their 2026 costs, pros, and limits.

## 1. Furnished Share House (40,000 to 120,000 JPY/month)

The share house is the most accessible option for expats arriving without a Japanese guarantor. Rooms are fully furnished, common areas are shared, and the deposit is minimal — zero at some operators.

**Main operators in Tokyo:**
- **Oak House**: 200+ residences across Tokyo, move-in possible within 1 week, from 55,000 JPY/month
- **Sakura House**: specialist in international residents, available in 5 Japanese cities, rooms from 42,000 JPY/month
- **Borderless House**: mixed JP/foreign flatshare concept, ideal for language immersion
- **Global Agents**: premium share houses in Shibuya, Shinjuku, Meguro (80,000-120,000 JPY)

**Minimum stay:** 1 month for most operators. Some accept 2 weeks.

**Main advantage:** no guarantor required, internet included, immediate availability.

**Limit:** private space is small (15-25 m²), communal living rules apply.

## 2. Monthly Mansion (80,000 to 200,000 JPY/month)

A monthly mansion is a fully furnished individual apartment available for short-term rental (minimum 1 month). You have your own kitchen, bathroom, and entrance. No shared common areas.

**Known operators:**
- **Monthly.com** (formerly Leo Palace 21): national network, furnished studio apartments
- **Sakura House monthly**: solo option for 1-6 month stays
- **Maison Marchais** (Shinjuku): premium apartments for corporate expats

**Realistic budget in Tokyo:** 100,000 to 150,000 JPY/month for a well-located studio (Yamanote line area).

**Advantage:** full autonomy, postal address usable for administrative procedures (bank account, residence registration).

**Limit:** higher price than share house, sometimes requires 1 month deposit.

## 3. Furnished Apartment via Specialist Agency (100,000 to 300,000 JPY/month)

Some real estate agencies specialising in international clients offer furnished apartments with flexible leases and no Japanese guarantor required.

**Recommended agencies:**
- **Real Estate Japan (GaijinPot)**: filtered "foreigner-friendly" listings including furnished options
- **Fontaine Relocation**: specialist in French-speaking expats, full relocation support
- **Tokyo Expat**: access to 300+ furnished and unfurnished properties, full support in English from application to lease signing

**What gets negotiated on your behalf:** 3-12 month lease, furniture included, flexible break clauses, no human guarantor needed (rental guarantee company accepted).

**Advantage:** proper apartment in the neighbourhood of your choice, real floor space (30-60 m²).

**Limit:** 2-4 week process, 1-2 month deposit required, sometimes agency fees.

## 4. Airbnb and Short-Term Rentals (15,000 to 40,000 JPY/night)

For your first days in Japan or stays under 1 month, Airbnb remains a simple option. However, since the 2018 Minpaku law, many Tokyo apartments were pulled from the platform. The supply is thinner than it used to be.

**What's still available:** studios and apartments in residential areas (Shinjuku-ku, Sumida-ku, Koto-ku), at high nightly rates.

**Budget for 1 full month:** 400,000 to 600,000 JPY — not competitive compared to the options above.

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

**Arriving in less than 3 weeks:** share house (Oak House or Sakura House) or monthly mansion. These are the only options with guaranteed quick move-in.

**You have 1-2 months to settle:** agency-sourced apartment. You'll have a real choice of neighbourhood, floor space, and can sign a 6-12 month lease.

**Coming for less than 3 months:** monthly mansion or Airbnb for the first week, then a share house for the rest of your stay.

**You have a Japanese employer:** start by asking about shataku. It's the cheapest and simplest route if available.

For personalised help with your search, [contact us](/contact): we handle the full process in English, from budget planning to lease signing.

---

*See also: [apartment hunting in Tokyo from abroad](/blog/tokyo-apartment-hunting-from-abroad) and [furnished apartments without a guarantor](/blog/furnished-apartment-tokyo-no-guarantor).*
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
