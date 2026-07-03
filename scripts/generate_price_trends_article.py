# -*- coding: utf-8 -*-
"""
generate_price_trends_article.py -- Genere/MET A JOUR l'article data-backed
"evolution des prix des coproprietes a Tokyo" (FR+EN) a partir des transactions MLIT.

Idempotent: relancer = remplace les 2 articles (par slug) avec les chiffres frais.
Appele par refresh_price_trends.py -> l'article reste toujours a jour = moat auto-entretenu.
Ecrit dans lib/blog.ts + lib/faq_data.ts, avec verif d'integrite (^]$ == 1). Abort si casse.

Run: python scripts/generate_price_trends_article.py
"""
import json, re, sys, io, datetime
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
DATA = ROOT / "lib" / "tokyoPriceTrends.json"
BLOG = ROOT / "lib" / "blog.ts"
FAQ = ROOT / "lib" / "faq_data.ts"
TODAY = datetime.date.today().isoformat()

SLUG_EN = "tokyo-condo-price-trends"
SLUG_FR = "evolution-prix-immobilier-tokyo"

d = json.loads(DATA.read_text(encoding="utf-8"))
pf, pt = d["period_from"], d["period_to"]           # 2021Q1 / 2025Q3
yf, yt = pf[:4], pt[:4]
pct = d["change_pct_citywide"]
m_first, m_last = d["median_first"], d["median_last"]
total = d["total_transactions"]
wards = d["wards"]                                    # trie par pct desc
risers = wards[:6]
laggards = list(reversed(wards[-6:]))                # du moins hausse vers un peu plus

def yen(n): return f"{int(n):,}".replace(",", " ")
def sign(p): return f"+{p}" if p >= 0 else f"{p}"

# exemple concret 60 m2 sur le ward le plus haussier
top = risers[0]
ex_first = int(top["median_first"] * 60)
ex_last = int(top["median_last"] * 60)

def rise_list(lst, en=True):
    out = []
    for w in lst:
        out.append(f"- **{w['ward_en']}** {sign(w['pct'])}% ({yen(w['median_first'])} -> {yen(w['median_last'])} JPY/m2)")
    return "\n".join(out)

# ---------- EN ----------
EN_TITLE = f"How Tokyo Condo Prices Changed, {yf} to {yt} (Real Transaction Data)"
EN_DESC = (f"Tokyo used-condo prices rose {sign(pct)}% per square metre from {yf} to {yt}, "
           f"from {total:,} real MLIT transactions. Ward-by-ward, which areas rose most.")
EN = f"""
Everyone feels that Tokyo has gotten more expensive. But by how much, and where exactly? This is not an opinion piece. It is built on {total:,} actual condominium sales reported to the Japanese government (MLIT), from {yf} to {yt}, so you can see the real trend instead of a headline.

**Quick answer:** The median price of a used condo in Tokyo rose from {yen(m_first)} to {yen(m_last)} JPY per square metre between {yf} and {yt}, a {sign(pct)}% increase. The rise was far from even: central wards like {risers[0]['ward_en']} ({sign(risers[0]['pct'])}%) and {risers[1]['ward_en']} ({sign(risers[1]['pct'])}%) climbed the most, while outer wards like {laggards[0]['ward_en']} ({sign(laggards[0]['pct'])}%) rose the least. The gap between the centre and the rest widened.

## Tokyo condo prices, {yf} to {yt}
Median transaction price per square metre, used condominiums, across all 23 wards:

- {yf}: {yen(m_first)} JPY/m2
- {yt}: {yen(m_last)} JPY/m2
- Change: {sign(pct)}% over {int(yt) - int(yf)} years

The curve is remarkably steady quarter after quarter. This is not a speculative spike, it is a sustained repricing of Tokyo real estate, driven by a weak yen, foreign demand, low interest rates and limited central supply.

## The wards that rose the most
Where the increase concentrated (median JPY per m2, {yf} vs {yt}):

{rise_list(risers)}

Central and bayfront wards led. A 60 m2 apartment in {top['ward_en']} went from roughly {yen(ex_first)} to {yen(ex_last)} JPY on these medians, a gap of tens of millions of yen in four years.

## The wards that rose the least
Prices went up almost everywhere, but the outer wards stayed far more accessible:

{rise_list(laggards)}

If your budget is fixed, this is where it stretches furthest, and where the entry point into Tokyo ownership is still realistic.

## What this means if you are buying
- **The centre is pricing many buyers out.** If you want central Tokyo, the window to buy cheaply has largely closed; you are buying into a proven, liquid market at a premium.
- **The outer wards are the value play.** Lower price per m2, milder appreciation, but real rental demand and full train access.
- **Rent, then buy, is a valid strategy.** See where you can afford to rent first in our [cheapest Tokyo neighbourhoods ranking](/en/blog/cheapest-neighbourhoods-tokyo-ranked-by-rent), and explore live rents in the [Tokyo Rent Index](/en/data).
- **Median hides the mix.** These figures track the median transaction each quarter, so a shift in what sells can move the number; treat them as a market direction, not a valuation of your specific unit.

If you want someone inside the Tokyo market to turn these trends into an actual purchase or rental, see [how we work](/en/contact).

*Data: {total:,} used-condo transactions reported to MLIT (Japan Ministry of Land), Tokyo 23 wards, {pf} to {pt}. Median price per m2 in JPY. Updated as new MLIT data is released.*
""".strip()

# ---------- FR ----------
FR_TITLE = f"Evolution des prix immobiliers a Tokyo, {yf} a {yt} (donnees reelles)"
FR_DESC = (f"Le prix des coproprietes d'occasion a Tokyo a augmente de {sign(pct)}% au m2 de {yf} a {yt}, "
           f"sur {total:,} transactions MLIT reelles. Arrondissement par arrondissement.")
FR = f"""
Tout le monde sent que Tokyo est devenue plus chere. Mais de combien, et ou exactement ? Ceci n'est pas un billet d'opinion. C'est bati sur {total:,} ventes reelles de coproprietes declarees au gouvernement japonais (MLIT), de {yf} a {yt}, pour voir la vraie tendance plutot qu'un titre de presse.

**Reponse rapide :** Le prix median d'une copropriete d'occasion a Tokyo est passe de {yen(m_first)} a {yen(m_last)} JPY le metre carre entre {yf} et {yt}, soit {sign(pct)}%. La hausse a ete tres inegale : les arrondissements centraux comme {risers[0]['ward_en']} ({sign(risers[0]['pct'])}%) et {risers[1]['ward_en']} ({sign(risers[1]['pct'])}%) ont le plus grimpe, tandis que la peripherie comme {laggards[0]['ward_en']} ({sign(laggards[0]['pct'])}%) a le moins bouge. L'ecart entre le centre et le reste s'est creuse.

## Les prix des coproprietes a Tokyo, {yf} a {yt}
Prix median de transaction au metre carre, coproprietes d'occasion, sur les 23 arrondissements :

- {yf} : {yen(m_first)} JPY/m2
- {yt} : {yen(m_last)} JPY/m2
- Variation : {sign(pct)}% sur {int(yt) - int(yf)} ans

La courbe est remarquablement reguliere, trimestre apres trimestre. Ce n'est pas un pic speculatif, c'est une revalorisation durable de l'immobilier tokyoite, portee par un yen faible, la demande etrangere, des taux bas et une offre centrale limitee.

## Les arrondissements qui ont le plus augmente
La ou la hausse s'est concentree (JPY median par m2, {yf} vs {yt}) :

{rise_list(risers)}

Les arrondissements centraux et de la baie sont en tete. Un appartement de 60 m2 a {top['ward_en']} est passe d'environ {yen(ex_first)} a {yen(ex_last)} JPY sur ces medianes, un ecart de dizaines de millions de yens en quatre ans.

## Les arrondissements qui ont le moins augmente
Les prix ont monte presque partout, mais la peripherie reste bien plus accessible :

{rise_list(laggards)}

Si votre budget est fixe, c'est la qu'il va le plus loin, et ou le ticket d'entree dans la propriete tokyoite reste realiste.

## Ce que cela veut dire si vous achetez
- **Le centre exclut beaucoup d'acheteurs.** Si vous visez le centre de Tokyo, la fenetre pour acheter bon marche est largement fermee ; vous entrez dans un marche liquide et eprouve, mais au prix fort.
- **La peripherie est le bon calcul.** Prix au m2 plus bas, appreciation plus douce, mais vraie demande locative et acces complet au reseau ferroviaire.
- **Louer d'abord, acheter ensuite reste une strategie valable.** Voyez ou vous pouvez vous permettre de louer dans notre [classement des quartiers les moins chers](/fr/blog/quartiers-tokyo-moins-chers-classement-loyers), et explorez les loyers en direct dans l'[Indice des loyers de Tokyo](/fr/data).
- **La mediane cache le melange.** Ces chiffres suivent la transaction mediane de chaque trimestre : un changement dans ce qui se vend peut deplacer le chiffre ; voyez-y une direction de marche, pas la valeur de votre bien precis.

Si vous voulez que quelqu'un du marche tokyoite transforme ces tendances en achat ou location reel, voyez [comment nous travaillons](/fr/contact).

*Donnees : {total:,} transactions de coproprietes d'occasion declarees au MLIT (ministere japonais du Territoire), 23 arrondissements de Tokyo, {pf} a {pt}. Prix median au m2 en JPY. Mis a jour a chaque nouvelle publication MLIT.*
""".strip()

# ---------- write helpers ----------
def q(s):  # escape pour chaine single-quote (title/desc peuvent contenir des apostrophes FR)
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
    end += len("\n  },")
    return text[:start] + text[end:]

blog = BLOG.read_text(encoding="utf-8")
blog = remove_article(blog, SLUG_EN)
blog = remove_article(blog, SLUG_FR)
new_objs = article_obj(SLUG_EN, "en", EN_TITLE, EN_DESC, EN) + article_obj(SLUG_FR, "fr", FR_TITLE, FR_DESC, FR)
m = re.search(r"\n\]\s*\n", blog)
assert m, "fermeture ] introuvable"
blog = blog[:m.start()] + "\n" + new_objs + blog[m.start()+1:]

# INTEGRITE
n_close = len(re.findall(r"^\]$", blog, re.M))
n_en = blog.count(f"slug: '{SLUG_EN}'")
n_fr = blog.count(f"slug: '{SLUG_FR}'")
n_emdash = blog.count("—")
assert n_close == 1, f"ABORT: ^]$ = {n_close} (attendu 1)"
assert n_en == 1 and n_fr == 1, f"ABORT: slugs en={n_en} fr={n_fr}"
assert n_emdash == 0, f"ABORT: em-dash detecte = {n_emdash}"
BLOG.write_text(blog, encoding="utf-8")
print(f"blog.ts OK: ^]$={n_close}, slugs en/fr=1/1, em-dash={n_emdash}")

# ---------- FAQ ----------
def esc(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")
def faq_block(slug, qas):
    items = "".join(f"    {{\n      question: '{esc(q)}',\n      answer:\n        '{esc(a)}',\n    }},\n" for q, a in qas)
    return f"  '{slug}': [\n{items}  ],\n\n"

faq_en = [
    ("How much have Tokyo condo prices risen?",
     f"The median used-condo price in Tokyo rose {sign(pct)}% per square metre, from {yen(m_first)} to {yen(m_last)} JPY/m2, between {yf} and {yt}, based on {total:,} real MLIT transactions."),
    ("Which Tokyo ward's prices rose the most?",
     f"{risers[0]['ward_en']} led with {sign(risers[0]['pct'])}%, followed by {risers[1]['ward_en']} ({sign(risers[1]['pct'])}%) and {risers[2]['ward_en']} ({sign(risers[2]['pct'])}%). Central and bayfront wards rose fastest."),
    ("Where are Tokyo condos still most affordable?",
     f"The outer wards rose least and stay most accessible, led by {laggards[0]['ward_en']} ({sign(laggards[0]['pct'])}%) and {laggards[1]['ward_en']} ({sign(laggards[1]['pct'])}%), with real rental demand and full train access."),
    ("Is this price data reliable?",
     f"It uses {total:,} actual transactions reported to Japan's MLIT (the official government source), not asking prices. We track the quarterly median, which reflects the mix of what sold, so read it as market direction."),
]
faq_fr = [
    ("De combien les prix des coproprietes a Tokyo ont-ils augmente ?",
     f"Le prix median d'une copropriete d'occasion a Tokyo a augmente de {sign(pct)}% au m2, de {yen(m_first)} a {yen(m_last)} JPY/m2, entre {yf} et {yt}, sur {total:,} transactions MLIT reelles."),
    ("Quel arrondissement de Tokyo a le plus augmente ?",
     f"{risers[0]['ward_en']} en tete avec {sign(risers[0]['pct'])}%, suivi de {risers[1]['ward_en']} ({sign(risers[1]['pct'])}%) et {risers[2]['ward_en']} ({sign(risers[2]['pct'])}%). Les arrondissements centraux et de la baie ont le plus grimpe."),
    ("Ou les coproprietes de Tokyo restent-elles les plus abordables ?",
     f"La peripherie a le moins augmente et reste la plus accessible, menee par {laggards[0]['ward_en']} ({sign(laggards[0]['pct'])}%) et {laggards[1]['ward_en']} ({sign(laggards[1]['pct'])}%), avec une vraie demande locative et un acces ferroviaire complet."),
    ("Ces donnees de prix sont-elles fiables ?",
     f"Elles utilisent {total:,} transactions reelles declarees au MLIT japonais (source officielle), pas des prix affiches. Nous suivons la mediane trimestrielle, qui reflete le melange de ce qui s'est vendu : a lire comme une direction de marche."),
]

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
faq = remove_faq(faq, SLUG_EN)
faq = remove_faq(faq, SLUG_FR)
anchor = "export const faqData: Record<string, FaqItem[]> = {\n\n"
i = faq.find(anchor) + len(anchor)
faq = faq[:i] + faq_block(SLUG_EN, faq_en) + faq_block(SLUG_FR, faq_fr) + faq[i:]
FAQ.write_text(faq, encoding="utf-8")
print(f"faq_data.ts OK: FAQ ajoutees pour {SLUG_EN} + {SLUG_FR}")
print("\nGENERE. Slugs:", SLUG_EN, "|", SLUG_FR, f"| ville {sign(pct)}% | top {risers[0]['ward_en']}")
