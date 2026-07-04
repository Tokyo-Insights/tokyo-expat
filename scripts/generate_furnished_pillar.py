# -*- coding: utf-8 -*-
"""
generate_furnished_pillar.py -- Pilier SEO conversion "furnished apartments in Tokyo".
Cible le cluster GSC ~2000 impressions (furnished apartment tokyo, long term, expat apartments)
ou tokyo-expat ranke page 2-3. Public HAUTE INTENTION = gens qui cherchent a louer.
Oriente conversion (positionne le service: meuble, sans garant, foreigner-friendly).

Idempotent. Ecrit lib/blog.ts + lib/faq_data.ts avec verif ^]$==1.
Run: python scripts/generate_furnished_pillar.py
"""
import re, sys, io, datetime
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
BLOG = ROOT / "lib" / "blog.ts"
FAQ = ROOT / "lib" / "faq_data.ts"
TODAY = datetime.date.today().isoformat()

SLUG_EN = "furnished-apartments-tokyo-guide"
SLUG_FR = "guide-appartements-meubles-tokyo"

EN_TITLE = "Furnished Apartments in Tokyo: The Complete Guide for Foreigners (2026)"
EN_DESC = "How to rent a furnished apartment in Tokyo as a foreigner in 2026: costs, long-term options, no guarantor, and how the process really works."
EN = """
Finding a furnished apartment in Tokyo as a foreigner should be simple, but it rarely is. Most standard rentals are unfurnished, demand a Japanese guarantor, and ask for four to six months of rent upfront. Furnished apartments cut through all of that, which is exactly why they are the easiest way for a foreigner to move into Tokyo. Here is the complete, honest guide.

**Quick answer:** A furnished apartment in Tokyo typically rents for 80,000 to 200,000 JPY a month (about US$500 to US$1,300), bills often included, with no guarantor and no Japanese bank account required. They come in three flavours: monthly mansions (private, fully furnished), serviced apartments (hotel-like), and share houses (cheapest, from around 35,000 JPY). You can usually move in within one to two weeks.

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
""".strip()

FR_TITLE = "Appartements meubles a Tokyo : le guide complet pour etrangers (2026)"
FR_DESC = "Comment louer un appartement meuble a Tokyo en tant qu'etranger en 2026 : couts, longue duree, sans garant, et comment ca marche vraiment."
FR = """
Trouver un appartement meuble a Tokyo quand on est etranger devrait etre simple, mais ca l'est rarement. La plupart des locations classiques sont vides, exigent un garant japonais et demandent 4 a 6 mois de loyer d'avance. Les appartements meubles balaient tout ca, et c'est exactement pourquoi c'est la facon la plus simple pour un etranger de s'installer a Tokyo. Voici le guide complet et honnete.

**Reponse rapide :** Un appartement meuble a Tokyo se loue en general entre 80 000 et 200 000 JPY par mois (environ 500 a 1 300 US$), charges souvent incluses, sans garant ni compte bancaire japonais. Il en existe trois types : monthly mansion (prive, entierement meuble), serviced apartment (facon hotel), et share house (le moins cher, a partir d'environ 35 000 JPY). On peut souvent emmenager en une a deux semaines.

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
""".strip()

FAQ_EN = [
    ("How much is a furnished apartment in Tokyo?", "A furnished apartment in Tokyo typically costs 80,000 to 200,000 JPY a month (about US$500 to US$1,300), often with bills included. Share house rooms start around 35,000 JPY."),
    ("Can I rent a furnished apartment in Tokyo without a guarantor?", "Yes. Most furnished apartments, monthly mansions and share houses do not require a Japanese guarantor or a Japanese bank account, which is why they are the easiest option for foreigners."),
    ("Are there long-term furnished apartments in Tokyo?", "Yes. Many monthly mansions and share houses offer long-term rates that fall the longer you commit, and plenty of foreigners live in them for years."),
    ("Is a furnished apartment cheaper than unfurnished in Tokyo?", "The monthly rent is higher, but a furnished apartment avoids the 4 to 6 months of upfront costs and the furniture bill of a standard lease, so for stays under two years it is usually cheaper overall."),
]
FAQ_FR = [
    ("Combien coute un appartement meuble a Tokyo ?", "Un appartement meuble a Tokyo coute en general 80 000 a 200 000 JPY par mois (environ 500 a 1 300 US$), souvent charges incluses. Les chambres en share house demarrent vers 35 000 JPY."),
    ("Peut-on louer un meuble a Tokyo sans garant ?", "Oui. La plupart des meubles, monthly mansions et share houses n'exigent ni garant japonais ni compte bancaire japonais, ce qui en fait l'option la plus simple pour les etrangers."),
    ("Existe-t-il des meubles longue duree a Tokyo ?", "Oui. Beaucoup de monthly mansions et de share houses proposent des tarifs longue duree qui baissent avec l'engagement, et de nombreux etrangers y vivent des annees."),
    ("Un meuble est-il moins cher qu'un vide a Tokyo ?", "Le loyer mensuel est plus eleve, mais le meuble evite les 4 a 6 mois de frais d'entree et l'achat de meubles d'un bail classique : pour un sejour de moins de deux ans, c'est en general moins cher au total."),
]

# ---------- write (pattern eprouve) ----------
def q(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")
def article_obj(slug, locale, title, desc, content):
    return (f"  {{\n    slug: '{slug}',\n    locale: '{locale}',\n"
            f"    title: '{q(title)}',\n    description: '{q(desc)}',\n"
            f"    date: '{TODAY}',\n    readingTime: '7 min',\n    content: `\n{content}\n    `.trim(),\n  }},\n")
def remove_article(text, slug):
    pos = text.find(f"slug: '{slug}'")
    if pos == -1:
        return text
    start = text.rfind("\n  {", 0, pos); end = text.find("\n  },", pos)
    if start == -1 or end == -1:
        return text
    return text[:start] + text[end + len("\n  },"):]

blog = BLOG.read_text(encoding="utf-8")
blog = remove_article(blog, SLUG_EN); blog = remove_article(blog, SLUG_FR)
new = article_obj(SLUG_EN, "en", EN_TITLE, EN_DESC, EN) + article_obj(SLUG_FR, "fr", FR_TITLE, FR_DESC, FR)
m = re.search(r"\n\]\s*\n", blog); assert m
blog = blog[:m.start()] + "\n" + new + blog[m.start()+1:]
assert len(re.findall(r"^\]$", blog, re.M)) == 1, "ABORT ^]$"
assert blog.count("—") == 0, "ABORT em-dash"
assert blog.count(f"slug: '{SLUG_EN}'") == 1 and blog.count(f"slug: '{SLUG_FR}'") == 1, "ABORT slug"
BLOG.write_text(blog, encoding="utf-8")
print("blog.ts OK: ^]$=1, em-dash=0, pilier furnished insere")

def esc(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")
def faq_block(slug, qas):
    items = "".join(f"    {{\n      question: '{esc(qq)}',\n      answer:\n        '{esc(aa)}',\n    }},\n" for qq, aa in qas)
    return f"  '{slug}': [\n{items}  ],\n\n"
def remove_faq(text, slug):
    key = f"  '{slug}': ["; pos = text.find(key)
    if pos == -1:
        return text
    end = text.find("\n  ],", pos)
    if end == -1:
        return text
    end += len("\n  ],")
    while end < len(text) and text[end] == "\n":
        end += 1
    return text[:pos] + text[end:]

faq = FAQ.read_text(encoding="utf-8")
faq = remove_faq(faq, SLUG_EN); faq = remove_faq(faq, SLUG_FR)
anchor = "export const faqData: Record<string, FaqItem[]> = {\n\n"
i = faq.find(anchor) + len(anchor)
faq = faq[:i] + faq_block(SLUG_EN, FAQ_EN) + faq_block(SLUG_FR, FAQ_FR) + faq[i:]
FAQ.write_text(faq, encoding="utf-8")
print("faq_data.ts OK")
print("GENERE:", SLUG_EN, "|", SLUG_FR)
