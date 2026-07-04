# -*- coding: utf-8 -*-
"""
generate_reddit_gold_articles.py -- Genere 4 articles (EN+FR) inspires des commentaires
Reddit (demande validee par l'audience): (1) Tokyo vs villes mondiales, (2) layouts JP
expliques, (3) loyer par age de batiment, (4) quartiers huppes de Tokyo.

Idempotent (remplace par slug). Ecrit lib/blog.ts + lib/faq_data.ts avec verif ^]$==1.
Chiffres Tokyo lus depuis lib/tokyoRentIndex.json (restent frais).

Run: python scripts/generate_reddit_gold_articles.py
"""
import json, re, sys, io, datetime
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
INDEX = ROOT / "lib" / "tokyoRentIndex.json"
BLOG = ROOT / "lib" / "blog.ts"
FAQ = ROOT / "lib" / "faq_data.ts"
TODAY = datetime.date.today().isoformat()

d = json.loads(INDEX.read_text(encoding="utf-8"))
total = d["total_listings"]
wards = sorted([w for w in d["wards"] if w.get("rents", {}).get("1K")], key=lambda w: w["rents"]["1K"]["median"])
cheap_w, exp_w = wards[0], wards[-1]
minato_1ldk = next((w["rents"].get("1LDK", {}).get("median") for w in d["wards"] if w["ward_en"] == "Minato"), 260000)


def y(n):
    return f"{int(n):,}".replace(",", " ")


# ============ articles: (slug_en, slug_fr, title_en, desc_en, en, title_fr, desc_fr, fr, faq_en, faq_fr) ============
ARTICLES = []

# ---------- 1. Tokyo vs world cities ----------
ARTICLES.append(dict(
    slug_en="tokyo-rent-vs-world-cities", slug_fr="loyers-tokyo-vs-grandes-villes",
    title_en="Tokyo Rent vs Other World Cities (2026): Why It's So Cheap",
    desc_en=f"How Tokyo rent compares to New York, London, Sydney and Hong Kong in 2026. A central Tokyo studio is often under $800, from {total:,} real listings.",
    title_fr="Loyers a Tokyo vs grandes villes mondiales (2026)",
    desc_fr=f"Comparatif des loyers de Tokyo avec New York, Londres, Sydney et Hong Kong en 2026. Un studio central a Tokyo est souvent sous les 800$, sur {total:,} annonces reelles.",
    en=f"""
Every time we publish Tokyo rent data, the same reaction floods in from around the world: "that is so cheap." People in Sydney, New York, London and Hong Kong look at the numbers and cannot believe a central studio can cost so little. So how does Tokyo really compare? Here is the honest picture, from {total:,} real active listings.

**Quick answer:** In 2026, a central Tokyo studio (1K) rents for roughly 90,000 to 140,000 JPY a month, which is about US$580 to US$900 at current rates. That is a fraction of what you pay for a small studio in New York (US$3,000+), London (GBP 1,600+), Sydney (A$2,600+) or Hong Kong (HK$15,000+). A weak yen makes Tokyo one of the best value major cities in the world to rent in right now.

## What a studio actually costs in Tokyo
Across Tokyo's 23 wards, the median rent for a 1K studio runs from {y(cheap_w['rents']['1K']['median'])} JPY in {cheap_w['ward_en']} to {y(exp_w['rents']['1K']['median'])} JPY in {exp_w['ward_en']}. Even the most expensive ward, right in the centre, lands near US$900 a month. You can explore every ward, line and station in our [Tokyo Rent Index](/en/data).

## How that stacks up against other cities
For a comparable small studio in the city core, typical monthly rents look roughly like this:
- **Tokyo:** US$580 to US$900
- **New York:** US$3,000 and up
- **London:** GBP 1,600 and up (around US$2,000)
- **Sydney:** A$2,600 and up (around US$1,700)
- **Hong Kong:** HK$15,000 and up (around US$1,900), often for a far smaller space
- **Paris:** EUR 1,000 and up

These other figures are approximate market ranges, not our data, but the gap is not subtle: Tokyo is often three to four times cheaper for a private, central home.

## Why Tokyo is so affordable right now
Three forces stack up. First, the **weak yen**: at roughly 160 JPY to the dollar, every rent looks like a discount to foreign eyes. Second, **abundant supply**: Tokyo keeps building, which caps rents in a way supply-starved cities like London and Sydney never manage. Third, **compact, efficient units**: a Japanese studio is small but genuinely livable, so you are not overpaying for wasted space.

The catch is the upfront bill, not the monthly rent. A standard lease can ask for four to six months of rent all at once (deposit, key money, agency fee). See our [cheapest Tokyo neighbourhoods ranking](/en/blog/cheapest-neighbourhoods-tokyo-ranked-by-rent) to stretch your budget, and if you want someone inside the market to handle the search, see [how we work](/en/contact).

*Data: Tokyo figures from {total:,} active listings, 2026, median 1K rent in JPY. Other-city figures are approximate market ranges.*
""".strip(),
    fr=f"""
A chaque fois que nous publions nos donnees de loyers a Tokyo, la meme reaction arrive du monde entier : "c'est tellement pas cher". Les gens a Sydney, New York, Londres ou Hong Kong regardent les chiffres et n'en reviennent pas qu'un studio central puisse couter si peu. Alors, comment Tokyo se compare-t-elle vraiment ? Voici le portrait honnete, sur {total:,} annonces reelles.

**Reponse rapide :** En 2026, un studio central a Tokyo (1K) se loue entre 90 000 et 140 000 JPY par mois, soit environ 580 a 900 US$ au taux actuel. C'est une fraction de ce que vous payez pour un petit studio a New York (3 000 US$ et plus), Londres (1 600 GBP et plus), Sydney (2 600 A$ et plus) ou Hong Kong (15 000 HK$ et plus). Le yen faible fait de Tokyo l'une des grandes villes au meilleur rapport qualite-prix au monde en ce moment.

## Ce que coute vraiment un studio a Tokyo
Sur les 23 arrondissements de Tokyo, le loyer median d'un studio 1K va de {y(cheap_w['rents']['1K']['median'])} JPY a {cheap_w['ward_en']} a {y(exp_w['rents']['1K']['median'])} JPY a {exp_w['ward_en']}. Meme l'arrondissement le plus cher, en plein centre, tourne autour de 900 US$ par mois. Explorez chaque arrondissement, ligne et station dans notre [Indice des loyers de Tokyo](/fr/data).

## Le comparatif avec les autres villes
Pour un petit studio comparable en centre-ville, les loyers mensuels typiques ressemblent a ceci :
- **Tokyo :** 580 a 900 US$
- **New York :** 3 000 US$ et plus
- **Londres :** 1 600 GBP et plus (environ 2 000 US$)
- **Sydney :** 2 600 A$ et plus (environ 1 700 US$)
- **Hong Kong :** 15 000 HK$ et plus (environ 1 900 US$), souvent pour bien plus petit
- **Paris :** 1 000 EUR et plus

Ces autres chiffres sont des fourchettes de marche approximatives, pas notre data, mais l'ecart n'est pas subtil : Tokyo est souvent trois a quatre fois moins chere pour un logement prive et central.

## Pourquoi Tokyo est si abordable en ce moment
Trois forces s'additionnent. D'abord le **yen faible** : a environ 160 JPY pour un dollar, chaque loyer ressemble a une remise pour un oeil etranger. Ensuite, une **offre abondante** : Tokyo continue de construire, ce qui plafonne les loyers, contrairement a Londres ou Sydney en penurie. Enfin, des **logements compacts et efficaces** : un studio japonais est petit mais vraiment vivable, donc vous ne payez pas pour de l'espace gaspille.

Le piege, c'est la facture d'entree, pas le loyer mensuel. Un bail classique peut demander 4 a 6 mois de loyer d'un coup. Voyez notre [classement des quartiers les moins chers](/fr/blog/quartiers-tokyo-moins-chers-classement-loyers) pour etirer votre budget, et si vous voulez confier la recherche a quelqu'un du marche, voyez [comment nous travaillons](/fr/contact).

*Donnees : chiffres Tokyo sur {total:,} annonces actives, 2026, loyer median 1K en JPY. Les chiffres des autres villes sont des fourchettes de marche approximatives.*
""".strip(),
    faq_en=[
        ("Is Tokyo really cheaper than New York or London?", f"Yes, by a wide margin for renting. A central Tokyo studio runs about US$580 to US$900, versus US$3,000+ in New York and around US$2,000 in London. The weak yen and abundant supply are the main reasons."),
        ("How much is rent in Tokyo in US dollars?", f"A 1K studio ranges from about US$480 (outer wards like {cheap_w['ward_en']}) to US$900 (central Minato) at roughly 160 JPY per dollar, based on {total:,} active listings."),
        ("Why is Tokyo rent so cheap right now?", "Three reasons: a very weak yen (about 160 to the dollar), Tokyo's steady new construction keeping supply high, and compact but efficient apartment layouts."),
    ],
    faq_fr=[
        ("Tokyo est-elle vraiment moins chere que New York ou Londres ?", "Oui, de loin, pour louer. Un studio central a Tokyo coute environ 580 a 900 US$, contre plus de 3 000 US$ a New York et environ 2 000 US$ a Londres. Le yen faible et l'offre abondante en sont les causes."),
        ("Combien coute un loyer a Tokyo en dollars ?", f"Un studio 1K va d'environ 480 US$ (peripherie comme {cheap_w['ward_en']}) a 900 US$ (Minato central) au taux d'environ 160 JPY par dollar, sur {total:,} annonces actives."),
        ("Pourquoi les loyers de Tokyo sont-ils si bas en ce moment ?", "Trois raisons : un yen tres faible (environ 160 pour un dollar), la construction neuve continue qui maintient l'offre haute, et des logements compacts mais efficaces."),
    ],
))

# ---------- 2. Japanese layouts explained ----------
ARTICLES.append(dict(
    slug_en="japanese-apartment-layouts-explained", slug_fr="types-appartements-japonais-expliques",
    title_en="1K, 1LDK, 2LDK: Japanese Apartment Layouts Explained (2026)",
    desc_en="What 1R, 1K, 1DK, 1LDK and 2LDK actually mean in Japan, with typical sizes and rents. The simple guide to reading Tokyo apartment listings.",
    title_fr="1K, 1LDK, 2LDK : les types d'appartements japonais expliques",
    desc_fr="Ce que signifient vraiment 1R, 1K, 1DK, 1LDK et 2LDK au Japon, avec surfaces et loyers typiques. Le guide simple pour lire les annonces a Tokyo.",
    en=f"""
If you have ever looked at a Tokyo listing and wondered what "1K" or "1LDK" means, you are not alone. It is the single most common question we get. These are not sizes in square feet, they are Japanese layout codes, and once you know the system it is very easy to read.

**Quick answer:** The number is the count of rooms, and the letters describe the other spaces: R = room, K = kitchen, D = dining, L = living. So a 1K is one room plus a separate small kitchen (a studio), a 1LDK is one bedroom plus a combined living, dining and kitchen area (good for a couple), and a 2LDK adds a second bedroom (good for a family).

## The layout codes, decoded
- **1R** (one room): a single room where the kitchen is inside the main space. The most compact option, often 13 to 20 square metres.
- **1K:** one room plus a separate small kitchen, divided by a door or partition. The classic single-person studio, usually 20 to 25 square metres.
- **1DK:** one room plus a dining-kitchen big enough for a small table. Around 25 to 30 square metres.
- **1LDK:** one bedroom plus a proper living-dining-kitchen. The sweet spot for couples, usually 30 to 45 square metres.
- **2LDK / 3LDK:** two or three bedrooms plus a living-dining-kitchen. Family territory.

## What each one costs in Tokyo
Layout drives price as much as location. Across Tokyo, a 1K studio runs from {y(cheap_w['rents']['1K']['median'])} to {y(exp_w['rents']['1K']['median'])} JPY, while a family 1LDK in central Minato reaches around {y(minato_1ldk)} JPY. As a rule, moving up one layout (say 1K to 1LDK) roughly doubles the rent. You can compare exact medians by ward in our [Tokyo Rent Index](/en/data).

## How to use this when apartment hunting
Decide your layout first, then your area, because layout sets your baseline budget. A single person almost always wants a 1K. A couple should look at 1LDK, not two 1Ks. Watch the size in square metres too: two 1LDKs at the same rent can differ by 10 square metres. For where these layouts are cheapest, see our [cheapest Tokyo neighbourhoods ranking](/en/blog/cheapest-neighbourhoods-tokyo-ranked-by-rent), or let us [handle the search](/en/contact).

*Data: layout medians from {total:,} active Tokyo listings, 2026.*
""".strip(),
    fr=f"""
Si vous avez deja regarde une annonce a Tokyo en vous demandant ce que veut dire "1K" ou "1LDK", vous n'etes pas seul. C'est la question la plus frequente qu'on nous pose. Ce ne sont pas des surfaces en metres carres, ce sont des codes de configuration japonais, et une fois le systeme compris, c'est tres simple a lire.

**Reponse rapide :** Le chiffre est le nombre de pieces, et les lettres decrivent les autres espaces : R = piece, K = cuisine, D = coin repas, L = salon. Donc un 1K, c'est une piece plus une petite cuisine separee (un studio), un 1LDK, c'est une chambre plus un espace salon-repas-cuisine (ideal pour un couple), et un 2LDK ajoute une deuxieme chambre (ideal pour une famille).

## Les codes de configuration, decodes
- **1R** (one room) : une piece unique ou la cuisine est dans l'espace principal. L'option la plus compacte, souvent 13 a 20 m2.
- **1K :** une piece plus une petite cuisine separee par une porte ou une cloison. Le studio classique pour une personne, en general 20 a 25 m2.
- **1DK :** une piece plus une cuisine-repas assez grande pour une petite table. Environ 25 a 30 m2.
- **1LDK :** une chambre plus un vrai salon-repas-cuisine. Le point ideal pour un couple, en general 30 a 45 m2.
- **2LDK / 3LDK :** deux ou trois chambres plus un salon-repas-cuisine. Territoire familial.

## Ce que chacun coute a Tokyo
La configuration determine le prix autant que l'emplacement. A Tokyo, un studio 1K va de {y(cheap_w['rents']['1K']['median'])} a {y(exp_w['rents']['1K']['median'])} JPY, tandis qu'un 1LDK familial dans Minato central atteint environ {y(minato_1ldk)} JPY. En regle generale, monter d'une configuration (par ex. 1K a 1LDK) double a peu pres le loyer. Comparez les medianes exactes par arrondissement dans notre [Indice des loyers de Tokyo](/fr/data).

## Comment s'en servir pour chercher
Choisissez d'abord votre configuration, puis votre quartier, car la configuration fixe votre budget de base. Une personne seule veut presque toujours un 1K. Un couple devrait viser un 1LDK, pas deux 1K. Surveillez aussi la surface en m2 : deux 1LDK au meme loyer peuvent differer de 10 m2. Pour savoir ou ces configurations sont les moins cheres, voyez notre [classement des quartiers les moins chers](/fr/blog/quartiers-tokyo-moins-chers-classement-loyers), ou laissez-nous [gerer la recherche](/fr/contact).

*Donnees : medianes par configuration sur {total:,} annonces actives a Tokyo, 2026.*
""".strip(),
    faq_en=[
        ("What does 1K mean in a Japanese apartment?", "1K means one room plus a separate small kitchen (the K). It is essentially a studio, usually around 20 to 25 square metres, designed for one person."),
        ("What is the difference between 1K and 1LDK?", "A 1K is one room with a small separate kitchen (single person). A 1LDK adds a proper combined living, dining and kitchen area alongside the bedroom, which suits a couple and costs roughly double."),
        ("What layout is best for a couple in Tokyo?", "A 1LDK is the sweet spot for a couple: one bedroom plus a real living-dining-kitchen, usually 30 to 45 square metres."),
    ],
    faq_fr=[
        ("Que signifie 1K dans un appartement japonais ?", "1K signifie une piece plus une petite cuisine separee (le K). C'est essentiellement un studio, en general 20 a 25 m2, concu pour une personne."),
        ("Quelle est la difference entre 1K et 1LDK ?", "Un 1K, c'est une piece avec une petite cuisine separee (une personne). Un 1LDK ajoute un vrai espace salon-repas-cuisine a cote de la chambre, ideal pour un couple, et coute environ le double."),
        ("Quelle configuration pour un couple a Tokyo ?", "Un 1LDK est ideal pour un couple : une chambre plus un vrai salon-repas-cuisine, en general 30 a 45 m2."),
    ],
))

# ---------- 3. Building age ----------
ARTICLES.append(dict(
    slug_en="tokyo-rent-building-age", slug_fr="loyer-tokyo-age-batiment",
    title_en="Does Newer Construction Cost More to Rent in Tokyo? (2026)",
    desc_en="How building age affects Tokyo rent: new builds command a premium, older ones are cheaper but come with trade-offs. What to check before you sign.",
    title_fr="Le neuf coute-t-il plus cher a louer a Tokyo ? (2026)",
    desc_fr="Comment l'age du batiment influence le loyer a Tokyo : le neuf se paie plus cher, l'ancien est moins cher mais avec des compromis. Ce qu'il faut verifier.",
    en=f"""
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

*Data: based on {total:,} active Tokyo listings, 2026. Age premiums are typical market ranges.*
""".strip(),
    fr=f"""
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

*Donnees : sur {total:,} annonces actives a Tokyo, 2026. Les primes d'age sont des fourchettes de marche typiques.*
""".strip(),
    faq_en=[
        ("Does newer construction cost more in Tokyo?", "Yes. A newly built (post-2015) apartment typically rents 20 to 40 percent above an older unit at the same station for the same layout."),
        ("What is the 1981 rule for Japanese apartments?", "1981 is when Japan strengthened its earthquake building code. Buildings from before 1981 (kyu-taishin) predate modern seismic standards and rent for less, so check the standard carefully."),
        ("Why is the median rent lower than new-build prices?", "A median pools all building ages together. New construction sits above the median, older stock below it, so treat the median as a typical rent, not the price of a new unit."),
    ],
    faq_fr=[
        ("Le neuf coute-t-il plus cher a Tokyo ?", "Oui. Un appartement neuf (apres 2015) se loue en general 20 a 40 pour cent au-dessus d'un logement ancien a la meme station pour la meme configuration."),
        ("C'est quoi la regle de 1981 pour les appartements japonais ?", "1981, c'est l'annee ou le Japon a renforce son code parasismique. Les batiments d'avant 1981 (kyu-taishin) sont anterieurs aux normes modernes et se louent moins cher : verifiez bien la norme."),
        ("Pourquoi le loyer median est-il plus bas que le neuf ?", "Un median melange tous les ages de batiments. Le neuf est au-dessus du median, l'ancien en dessous : voyez le median comme un loyer typique, pas le prix du neuf."),
    ],
))

# ---------- 4. Exclusive neighborhoods ----------
ARTICLES.append(dict(
    slug_en="tokyo-most-exclusive-neighbourhoods", slug_fr="quartiers-huppes-tokyo",
    title_en="Tokyo's Most Exclusive Neighbourhoods to Rent (2026)",
    desc_en="Where Tokyo's real top end sits: Azabu, Hiroo, Daikanyama, Nakameguro and the priciest stations. What luxury rent actually costs in the capital.",
    title_fr="Les quartiers les plus huppes de Tokyo a louer (2026)",
    desc_fr="Ou se situe le vrai haut de gamme de Tokyo : Azabu, Hiroo, Daikanyama, Nakameguro et les stations les plus cheres. Ce que coute vraiment le luxe dans la capitale.",
    en=f"""
Whenever we rank Tokyo rents, someone points out that the true high end is missing. They are right, and it is worth explaining. Tokyo's most exclusive pockets are small and low-volume, so they do not always clear the sample size needed for a reliable station median, but that is exactly where the real luxury sits.

**Quick answer:** Tokyo's most exclusive rental areas cluster in Minato and Shibuya wards: Azabu (especially Nishi-Azabu and Azabu-Juban), Hiroo, Daikanyama, Nakameguro, Omotesando and Shoto. In these pockets a 1K can run 150,000 JPY and up, and a family 1LDK or 2LDK easily reaches 300,000 to 600,000 JPY a month. The most expensive station in our dataset, {[s for s in sorted(d['stations'], key=lambda x: -x['rents'].get('1K',{}).get('median',0)) if s['rents'].get('1K')][0]['station_en']}, already sits at {y([s for s in sorted(d['stations'], key=lambda x: -x['rents'].get('1K',{}).get('median',0)) if s['rents'].get('1K')][0]['rents']['1K']['median'])} JPY for a studio.

## Where the real top end lives
- **Azabu / Hiroo (Minato):** old-money embassy district, international schools, quiet leafy streets. The benchmark for prestige.
- **Daikanyama / Nakameguro (Shibuya, Meguro):** design-led, cafe culture, boutique buildings. Fashionable rather than stuffy.
- **Omotesando / Aoyama:** flagship shopping meets residential calm just behind the avenues.
- **Shoto:** Tokyo's quiet mansion district near Shibuya, genuinely rare stock.

## Why these do not always show in the data
A reliable station median needs a healthy number of active listings. Prime pockets are small, tightly held and turn over slowly, so at any moment there may be only a handful of 1K listings, not enough for a robust median without noise. This is why our published ranking is best read as **typical** rents near major stations, not the ceiling. Minato is still the priciest ward overall at {y(exp_w['rents']['1K']['median'])} JPY median for a 1K, with 1LDKs around {y(minato_1ldk)} JPY.

## Renting at the top end
Luxury units are held by a smaller set of agencies and move fast, often before they are widely listed. Fluent handling of the guarantor process and building rules matters more here, not less. Explore the broader picture in our [Tokyo Rent Index](/en/data), see [how prices have climbed](/en/blog/tokyo-condo-price-trends), or if you are targeting a prime address, [tell us what you want](/en/contact).

*Data: {total:,} active Tokyo listings, 2026. Prime-pocket figures are typical ranges, since low-volume areas may not have a robust median.*
""".strip(),
    fr=f"""
Chaque fois que nous classons les loyers de Tokyo, quelqu'un fait remarquer que le vrai haut de gamme manque. Il a raison, et ca merite une explication. Les quartiers les plus huppes de Tokyo sont petits et a faible volume : ils ne passent donc pas toujours le seuil d'echantillon necessaire a un median fiable, mais c'est justement la que se trouve le vrai luxe.

**Reponse rapide :** Les quartiers de location les plus huppes de Tokyo se concentrent dans Minato et Shibuya : Azabu (surtout Nishi-Azabu et Azabu-Juban), Hiroo, Daikanyama, Nakameguro, Omotesando et Shoto. Dans ces poches, un 1K peut depasser 150 000 JPY, et un 1LDK ou 2LDK familial atteint facilement 300 000 a 600 000 JPY par mois. La station la plus chere de notre jeu de donnees, {[s for s in sorted(d['stations'], key=lambda x: -x['rents'].get('1K',{}).get('median',0)) if s['rents'].get('1K')][0]['station_en']}, est deja a {y([s for s in sorted(d['stations'], key=lambda x: -x['rents'].get('1K',{}).get('median',0)) if s['rents'].get('1K')][0]['rents']['1K']['median'])} JPY pour un studio.

## Ou se trouve le vrai sommet
- **Azabu / Hiroo (Minato) :** quartier des ambassades, ecoles internationales, rues calmes et arborees. La reference du prestige.
- **Daikanyama / Nakameguro (Shibuya, Meguro) :** design, culture cafe, immeubles boutique. Chic plutot que guinde.
- **Omotesando / Aoyama :** boutiques phares et calme residentiel juste derriere les avenues.
- **Shoto :** le quartier residentiel discret pres de Shibuya, un stock vraiment rare.

## Pourquoi ils n'apparaissent pas toujours dans la data
Un median par station fiable a besoin d'un nombre suffisant d'annonces actives. Les poches prime sont petites, gardees et tournent lentement : a un instant donne, il peut n'y avoir qu'une poignee d'annonces 1K, pas assez pour un median robuste sans bruit. C'est pourquoi notre classement se lit comme des loyers **typiques** pres des grandes stations, pas le plafond. Minato reste l'arrondissement le plus cher globalement, a {y(exp_w['rents']['1K']['median'])} JPY de median pour un 1K, avec des 1LDK autour de {y(minato_1ldk)} JPY.

## Louer dans le haut de gamme
Les biens de luxe sont detenus par un cercle plus restreint d'agences et partent vite, souvent avant d'etre largement diffuses. Une gestion fluide du garant et des regles d'immeuble compte encore plus ici. Explorez la vue d'ensemble dans notre [Indice des loyers de Tokyo](/fr/data), voyez [comment les prix ont grimpe](/fr/blog/evolution-prix-immobilier-tokyo), ou si vous visez une adresse prime, [dites-nous ce que vous cherchez](/fr/contact).

*Donnees : {total:,} annonces actives a Tokyo, 2026. Les chiffres des poches prime sont des fourchettes typiques, car les zones a faible volume peuvent ne pas avoir de median robuste.*
""".strip(),
    faq_en=[
        ("What are the most exclusive neighbourhoods in Tokyo?", "Azabu (Nishi-Azabu, Azabu-Juban), Hiroo, Daikanyama, Nakameguro, Omotesando and Shoto, mostly in Minato and Shibuya wards, are Tokyo's most prestigious rental areas."),
        ("How much does luxury rent cost in Tokyo?", "In prime pockets a 1K can exceed 150,000 JPY and a family 1LDK or 2LDK reaches 300,000 to 600,000 JPY a month. Minato is the priciest ward overall."),
        ("Why are wealthy areas missing from rent rankings?", "Prime areas are low-volume and turn over slowly, so they often lack enough active listings for a reliable median. Rankings show typical rents near major stations, not the top."),
    ],
    faq_fr=[
        ("Quels sont les quartiers les plus huppes de Tokyo ?", "Azabu (Nishi-Azabu, Azabu-Juban), Hiroo, Daikanyama, Nakameguro, Omotesando et Shoto, surtout dans Minato et Shibuya, sont les quartiers de location les plus prestigieux de Tokyo."),
        ("Combien coute une location de luxe a Tokyo ?", "Dans les poches prime, un 1K peut depasser 150 000 JPY et un 1LDK ou 2LDK familial atteint 300 000 a 600 000 JPY par mois. Minato est l'arrondissement le plus cher."),
        ("Pourquoi les quartiers riches manquent dans les classements ?", "Les zones prime sont a faible volume et tournent lentement : elles manquent souvent d'assez d'annonces pour un median fiable. Les classements montrent des loyers typiques pres des grandes stations, pas le sommet."),
    ],
))

# ============ write helpers (pattern eprouve) ============
def q(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")

def article_obj(slug, locale, title, desc, content):
    return (f"  {{\n    slug: '{slug}',\n    locale: '{locale}',\n"
            f"    title: '{q(title)}',\n    description: '{q(desc)}',\n"
            f"    date: '{TODAY}',\n    readingTime: '6 min',\n    content: `\n{content}\n    `.trim(),\n  }},\n")

def remove_article(text, slug):
    pos = text.find(f"slug: '{slug}'")
    if pos == -1:
        return text
    start = text.rfind("\n  {", 0, pos)
    end = text.find("\n  },", pos)
    if start == -1 or end == -1:
        return text
    return text[:start] + text[end + len("\n  },"):]

blog = BLOG.read_text(encoding="utf-8")
new_objs = ""
all_slugs = []
for a in ARTICLES:
    blog = remove_article(blog, a["slug_en"])
    blog = remove_article(blog, a["slug_fr"])
    new_objs += article_obj(a["slug_en"], "en", a["title_en"], a["desc_en"], a["en"])
    new_objs += article_obj(a["slug_fr"], "fr", a["title_fr"], a["desc_fr"], a["fr"])
    all_slugs += [a["slug_en"], a["slug_fr"]]

m = re.search(r"\n\]\s*\n", blog)
assert m, "fermeture ] introuvable"
blog = blog[:m.start()] + "\n" + new_objs + blog[m.start()+1:]

n_close = len(re.findall(r"^\]$", blog, re.M))
n_emdash = blog.count("—")
assert n_close == 1, f"ABORT: ^]$ = {n_close}"
assert n_emdash == 0, f"ABORT: em-dash = {n_emdash}"
for s in all_slugs:
    assert blog.count(f"slug: '{s}'") == 1, f"ABORT: slug {s} x{blog.count(chr(39)+'slug: '+chr(39))}"
BLOG.write_text(blog, encoding="utf-8")
print(f"blog.ts OK: ^]$={n_close}, em-dash={n_emdash}, {len(all_slugs)} articles inseres")

# ============ FAQ ============
def esc(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")
def faq_block(slug, qas):
    items = "".join(f"    {{\n      question: '{esc(qq)}',\n      answer:\n        '{esc(aa)}',\n    }},\n" for qq, aa in qas)
    return f"  '{slug}': [\n{items}  ],\n\n"

faq = FAQ.read_text(encoding="utf-8")
def remove_faq(text, slug):
    key = f"  '{slug}': ["
    pos = text.find(key)
    if pos == -1:
        return text
    end = text.find("\n  ],", pos)
    if end == -1:
        return text
    end += len("\n  ],")
    while end < len(text) and text[end] == "\n":
        end += 1
    return text[:pos] + text[end:]

for a in ARTICLES:
    faq = remove_faq(faq, a["slug_en"])
    faq = remove_faq(faq, a["slug_fr"])
anchor = "export const faqData: Record<string, FaqItem[]> = {\n\n"
i = faq.find(anchor) + len(anchor)
blocks = ""
for a in ARTICLES:
    blocks += faq_block(a["slug_en"], a["faq_en"]) + faq_block(a["slug_fr"], a["faq_fr"])
faq = faq[:i] + blocks + faq[i:]
FAQ.write_text(faq, encoding="utf-8")
print(f"faq_data.ts OK: FAQ ajoutees pour {len(all_slugs)} articles")
print("\nGENERE:", ", ".join(all_slugs))
