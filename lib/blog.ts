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
    title: 'Comment trouver un appartement a Tokyo quand on est etranger',
    description: 'Le marche locatif tokyoite est ferme aux etrangers par defaut. Garant, langue, dossier: voici exactement comment contourner chaque obstacle.',
    date: '2026-06-19',
    readingTime: '8 min',
    content: `
Le marche locatif japonais est l'un des plus fermes au monde pour les etrangers. Pas de residency permanente, pas de garant japonais, pas de compte bancaire local: la plupart des agences refusent d'instruire votre dossier avant meme de vous rencontrer.

Pourtant, des milliers d'expatries trouvent un logement a Tokyo chaque annee. La difference entre ceux qui y arrivent en 2 semaines et ceux qui galèrent 3 mois: la methode.

## Le probleme du garant (hoshounin)

La quasi-totalite des proprietes traditionnelles japonaises exigent un **hoshounin** (garant personnel): un citoyen japonais qui accepte de payer votre loyer si vous devenez defaillant. Pour un etranger sans famille japonaise, c'est un mur.

Il existe trois solutions:

**1. Les societes de garantie (hoshougaisha)**
Ces societes se substituent au garant humain, moyennant une prime annuelle de 0.5 a 1 mois de loyer. La plupart des proprietes modernes acceptent ce systeme. Cout: environ 50 000 JPY pour un appartement a 100 000 JPY/mois.

**2. Le logement meuble sans garant**
Certains operateurs de logements meubles, ciblant specifiquement les etrangers, proposent des baux sans garant. Les conditions d'eligibilite sont plus souples: un visa valide et un contrat de travail suffisent souvent. C'est la voie la plus rapide pour une installation immediate.

**3. Le logement d'entreprise (shataku)**
Si votre employeur japonais vous prend en charge, il peut louer directement en son nom. Le garant est l'entreprise elle-meme. Cette option est tres courante dans les grandes societes.

## La barriere de la langue

Meme en parlant anglais couramment, vous aurez du mal. La plupart des agences immobilieres japonaises ne parlent pas anglais. Les contrats de bail (yakkan) font 20 a 30 pages en japonais dense.

Les erreurs classiques des etrangers:
- Signer un contrat sans en comprendre les clauses de resiliation
- Ignorer le "reikin" (cle de courtoisie) payable a l'entree, non remboursable
- Ne pas savoir que certains baux interdisent les colocataires, les animaux ou le travail a domicile

Un chasseur trilingue lit chaque clause avec vous avant signature.

## Le "reikin" et les frais d'entree

Au Japon, s'installer dans un appartement standard coute environ 4 a 6 mois de loyer en frais d'entree:

- **Shikikin** (depot de garantie): 1 a 2 mois, remboursable
- **Reikin** (cle de courtoisie): 1 a 2 mois, non remboursable, payable au proprietaire
- **Frais d'agence**: 1 mois HT (legalement plafonné)
- **Prime de garantie**: 0.5 a 1 mois

Pour un appartement a 100 000 JPY/mois, comptez 400 000 a 600 000 JPY d'entree. Les logements meubles sans reikin existent et permettent de diviser cette somme par deux.

## Le delai realiste

Chercher seul, sans reseau ni japonais: **6 a 10 semaines** en moyenne.

Avec un chasseur qui acces a un inventaire immediat: **7 a 14 jours** entre le premier contact et la remise des cles.

La difference vient du fait que la plupart des biens sur les portails publics (Suumo, Homes) sont deja loues au moment ou vous les voyez. Les proprietes disponibles circulent dans des reseaux professionnels avant d'etre listees en ligne.

## Les quartiers pour les expatries

Tokyo est une megalopole de 14 millions d'habitants. Choisir le mauvais quartier coute cher en temps de transport et en qualite de vie.

Les zones les plus demandees par les francophones et anglophones:

**Shinjuku / Shin-Okubo**: acces au consulat de France, communaute internationale importante, loyers moderes par rapport au centre.

**Shibuya / Ebisu / Daikanyama**: quartiers branche, anglophiles, proches des grandes lignes. Loyers eleves (120 000 a 200 000 JPY pour un 1K).

**Minato-ku (Roppongi, Azabu, Hiroo)**: zone historique des expatries, ecoles internationales, supermarchés etrangers. Le plus cher.

**Koto-ku / Sumida-ku**: emergents, bien connectes, loyers 20 a 30% moins chers qu'en zone centrale. Attire les jeunes actifs.

## Les types de logement

**1K / 1DK**: studio avec cuisine separee, 25 a 40m2. Pour une personne, budget 80 000 a 130 000 JPY/mois en zone centrale.

**1LDK**: salon-cuisine separe de la chambre, 40 a 55m2. Couple ou personne avec besoin d'espace bureau. 120 000 a 200 000 JPY.

**Share house**: chambre privee dans une maison partagee, cuisine et salle de bains communes. La solution la moins chere (50 000 a 80 000 JPY/mois), ideale pour une installation rapide ou un sejour de moins de 12 mois.

**Maison individuelle (kodate)**: rare en zone centrale, plus accessible en banlieue. Pour les familles.

## Ce que fait un chasseur immobilier

Le role d'un chasseur immobilier a Tokyo est fondamentalement different de celui d'un agent traditionnel. L'agent represent le proprietaire. Le chasseur travaille exclusivement pour vous.

Concretement:
1. Entretien initial pour cerner vos criteres (budget, zone, type, duree)
2. Acces a des proprietes hors marche public
3. Pre-selection et visite a votre place si vous n'etes pas encore au Japon
4. Traduction integrale du contrat avant signature
5. Negociation du reikin et des conditions d'entree
6. Suivi jusqu'a la remise des cles

Pour une installation reussie a Tokyo, c'est le levier le plus efficace que vous puissiez activer.

---

*Vous avez un projet d'installation a Tokyo? Reservez une consultation gratuite de 30 minutes pour evaluer votre situation.*
    `.trim(),
  },
  {
    slug: 'share-house-tokyo-guide-complet',
    locale: 'fr',
    title: 'Share house a Tokyo: guide complet pour expatries (2026)',
    description: 'Prix, regles, meilleurs quartiers, comment candidater: tout ce que vous devez savoir avant de louer une chambre en share house a Tokyo.',
    date: '2026-06-19',
    readingTime: '6 min',
    content: `
Le share house est la porte d'entree la plus accessible au marche locatif tokyoite pour un etranger. Pas de reikin, pas de garant, installation en quelques jours. Mais le modele a ses regles et ses pieges.

## Qu'est-ce qu'un share house au Japon?

Un share house (シェアハウス) est une maison ou un appartement ou plusieurs residents partagent les espaces communs: cuisine, salle de bains, salon. Chaque resident dispose d'une chambre privee, generalement de 8 a 16m2.

Contrairement a la colocation francaise improvisee entre amis, le share house japonais est gere par un operateur professionnel. Il existe des centaines d'operateurs a Tokyo, de la chambre a 40 000 JPY/mois dans un immeuble standard aux "designer share houses" a 90 000 JPY avec salle de sport et toit-terrasse.

## Combien ca coute vraiment?

**Loyer mensuel**: 45 000 a 90 000 JPY selon la taille de la chambre, le quartier et les equipements.

**Frais d'entree**: generalement 1 mois de caution remboursable + frais administratifs de 10 000 a 30 000 JPY. Pas de reikin.

**Charges incluses**: eau, electricite, gaz, internet sont souvent inclus dans le loyer. Verifiez toujours avant de signer.

**Duree minimale**: certains operateurs acceptent des sejours a partir de 1 mois, d'autres exigent 3 mois minimum.

Budget total pour une installation en share house a Tokyo: **100 000 a 180 000 JPY** (contre 400 000 a 600 000 JPY pour un appartement standard).

## Les meilleurs quartiers pour un share house

**Ikebukuro**: tres connecte (3 lignes de metro), ambiance internationale, nombreux share houses de bonne qualite entre 50 000 et 70 000 JPY.

**Shinjuku / Nakano**: acces direct a la JR Chuo Line, quartiers vivants, offre abondante.

**Shimokitazawa**: atmosphere village dans la ville, prisee des jeunes creatifs. Attention: moins bien desservi en transport.

**Koenji / Asagaya**: moins connues des etrangers, tres accessibles, communaute artistique. Share houses de caractere.

**Saitama / Banlieue nord**: si votre budget est serre (moins de 50 000 JPY), des options existent en banlieue proche avec 30 a 45 min de trajet vers le centre.

## Les regles de vie

Le share house japonais a ses codes. Les transgresser peut valoir un avertissement ou une expulsion:

**Bruit**: les murs sont fins. La regle implicite est "pas de bruit audible depuis le couloir apres 22h".

**Cuisine**: nettoyer immediatement apres usage. La vaisselle qui seche sur l'egouttoir est tolerable une heure. Pas une nuit.

**Invites**: la plupart des share houses interdisent ou limitent strictement les invites. Certains interdisent toute visite dans les chambres. Lisez le reglement.

**Poubelles**: le tri selectif est obligatoire au Japon. Plastique, verre, papier, restes alimentaires: chaque categorie a son jour de collecte. L'operateur vous explique les regles de la commune.

## Comment candidater depuis l'etranger

La majorite des share houses acceptent les candidatures en ligne. Le processus:

1. Visite virtuelle ou photos sur le site de l'operateur
2. Formulaire de candidature: nom, nationalite, profession, date d'arrivee, duree prevue
3. Entretien video (souvent en japonais basique ou anglais)
4. Confirmation et virement de la caution

Le delai entre candidature et confirmation est generalement de 3 a 7 jours.

**Ce que les operateurs regardent**: la stabilite financiere (revenus ou lettre d'employeur), la duree du sejour prevu, et la "compatibilite" avec les residents actuels.

## Share house vs appartement: comment choisir?

Le share house est le bon choix si:
- Vous arrivez pour moins de 18 mois
- Vous voulez rencontrer des gens et pratiquer le japonais
- Votre budget est inferieur a 80 000 JPY/mois
- Vous n'avez pas encore de garant ni de compte bancaire japonais

L'appartement est preferable si:
- Vous prevoyez de rester plus de 2 ans
- Vous avez besoin d'espace (famille, teletravail intensif)
- La vie privee est une priorite absolue

---

*Besoin d'aide pour trouver un share house a Tokyo? Je selectionne les meilleures options disponibles selon vos criteres, sans frais d'agence supplementaires.*
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
]

export function getBlogPosts(locale: Locale): BlogPost[] {
  return blogPosts.filter((p) => p.locale === locale)
}

export function getBlogPost(slug: string, locale: Locale): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug && p.locale === locale)
}
