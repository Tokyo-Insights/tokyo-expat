# -*- coding: utf-8 -*-
"""
generate_furnished_premium_article.py -- Genere/MET A JOUR l'article data-backed
"furnished vs unfurnished a Tokyo: le vrai surcout" (EN+FR) depuis lib/furnishedPremium.json.

Idempotent (remplace par slug). A relancer APRES generate_furnished_premium.py.
Ecrit lib/blog.ts + lib/faq_data.ts avec verif integrite (^]$ == 1). Abort si casse.
Regles: zero tiret long, accents FR, source = "tokyo-expat.com"/"real listings" (jamais LIFULL/AtHome),
titres/desc SANS apostrophe (single-quoted), contenu sans backtick ni ${.

Run: python scripts/generate_furnished_premium_article.py
"""
import json, re, sys, io, datetime
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
FP = ROOT / "lib" / "furnishedPremium.json"
BLOG = ROOT / "lib" / "blog.ts"
FAQ = ROOT / "lib" / "faq_data.ts"
TODAY = datetime.date.today().isoformat()

SLUG_EN = "furnished-vs-unfurnished-apartment-tokyo-cost"
SLUG_FR = "appartement-meuble-vs-non-meuble-tokyo-cout"

d = json.loads(FP.read_text(encoding="utf-8"))
w = sorted(d["wards"], key=lambda x: x["premium"])   # ascending premium
low, high = w[0], w[-1]
lowp, highp = round(low["premium"] * 100), round(high["premium"] * 100)
low5, high5 = w[:5], list(reversed(w[-5:]))

def yen(n): return f"{round(n):,}".replace(",", " ")   # 144 000
def pct(x): return round(x["premium"] * 100)
def li_en(x): return f"- **{x['ward']}**: {yen(x['std'])} JPY unfurnished, {yen(x['furn'])} JPY furnished (+{pct(x)}%)"
def li_fr(x): return f"- **{x['ward']}** : {yen(x['std'])} JPY non meuble, {yen(x['furn'])} JPY meuble (+{pct(x)}%)"

low_en = "\n".join(li_en(x) for x in low5)
high_en = "\n".join(li_en(x) for x in high5)
low_fr = "\n".join(li_fr(x) for x in low5)
high_fr = "\n".join(li_fr(x) for x in high5)

# ---------- EN ----------
EN_TITLE = "Furnished vs Unfurnished Apartments in Tokyo: The Real Cost"
EN_DESC = f"A data-backed look at how much more furnished apartments cost than unfurnished ones in Tokyo, by ward, and when the furnished route is worth the premium."
EN = f"""
Moving to Tokyo, one of the first real decisions is furnished or unfurnished. It sounds small, but it changes your monthly rent, your move-in bill and how fast you can settle in. Here is the honest, data-backed answer, from real rental listings across Tokyo's 23 wards, updated every quarter.

**Quick answer:** A furnished or monthly 1K studio in Tokyo costs roughly {lowp}% to {highp}% more per month than a standard unfurnished one, and the premium is biggest in the cheaper outer wards. Furnished makes sense for a short or uncertain stay, or a fast arrival with no guarantor. Unfurnished wins for a long, committed stay where the lower monthly rent pays off.

## How much more does furnished cost in Tokyo?
Comparing the median rent of a furnished 1K studio to a standard one in the same ward, the gap runs from about +{lowp}% in the most central wards to +{highp}% in the cheapest. The smallest premiums:

{low_en}

And the biggest premiums, all in cheaper outer wards:

{high_en}

Two things drive this gap. A furnished or monthly place bundles convenience: furniture, appliances, often no key money, no guarantor and a flexible term. And it lets you move in within days instead of weeks. You are not only paying for a sofa, you are paying to skip the hardest parts of the Japanese rental system.

## Why the premium is biggest in the cheapest wards
This is the counter-intuitive part. In an expensive central ward like {low['ward']}, a furnished studio is only about +{lowp}%, because the standard rent is already high. In a cheaper outer ward like {high['ward']}, the same furnished convenience can nearly double the rent, because the standard base is so low. In short, the cheaper the neighbourhood, the more the furnished route costs you in relative terms. If your budget is tight and you were counting on a cheap outer ward, going furnished can quietly erase that saving.

## When furnished is worth it, and when it is not
Choose furnished or monthly if you are arriving soon and need a home within days, if you do not have a Japanese guarantor or a local income record yet, if your stay is short or uncertain, or if you want to avoid the four-to-five-months-of-rent upfront bill of a standard lease.

Choose unfurnished if you are staying two years or more and want the lowest monthly rent, if you can cover the upfront move-in costs and a guarantor company, or if you want more space for the money, especially in the cheaper wards where the furnished premium is steepest.

For many newcomers the smartest play is to start furnished for the arrival, then move to an unfurnished lease once they have a residence card, a bank account and a feel for the city. Just remember the move-in costs are paid again on the second move, so this two-step only pays off on longer stays.

## How to decide with real numbers
- Check the furnished premium for your target ward in our [Tokyo Rent Index](/en/data), then weigh it against the standard rent.
- Budget the full upfront bill, not just the rent. Our [guide to renting in Tokyo as a foreigner](/en/blog/find-apartment-tokyo-foreigner) breaks down deposit, key money, agency and guarantor fees.
- If you want someone inside the market to run the search and handle the furnished-or-unfurnished trade-off for you, see [how our property hunter works](/en/blog/how-real-estate-hunter-works-tokyo) or [book a free call](/en/contact).

*Data: median furnished or monthly rent versus median standard rent for a 1K studio, Tokyo 23 wards, 2026. Updated quarterly. The two cheapest wards have smaller furnished samples, so read those as indicative.*
""".strip()

# ---------- FR ----------
FR_TITLE = "Appartement meuble ou non a Tokyo : le vrai surcout"
FR_DESC = f"Combien un appartement meuble coute de plus par rapport au non meuble a Tokyo, par arrondissement, et quand la voie meublee en vaut vraiment la peine."
FR = f"""
En s'installant a Tokyo, l'une des premieres vraies decisions est : meuble ou non meuble ? Ca parait anodin, mais ca change votre loyer mensuel, votre facture d'entree et la vitesse a laquelle vous vous installez. Voici la reponse honnete et chiffree, a partir d'annonces locatives reelles dans les 23 arrondissements de Tokyo, mise a jour chaque trimestre.

**Reponse rapide :** Un studio 1K meuble ou monthly coute environ {lowp}% a {highp}% de plus par mois qu'un studio standard non meuble, et le surcout est le plus eleve dans les arrondissements les moins chers. Le meuble a du sens pour un sejour court ou incertain, ou une arrivee rapide sans garant. Le non meuble l'emporte pour un long sejour ou le loyer mensuel plus bas finit par payer.

## Combien coute le meuble en plus a Tokyo ?
En comparant le loyer median d'un studio 1K meuble a celui d'un standard dans le meme arrondissement, l'ecart va d'environ +{lowp}% dans les arrondissements les plus centraux a +{highp}% dans les moins chers. Les plus petits surcouts :

{low_fr}

Et les plus gros surcouts, tous dans des arrondissements peripheriques moins chers :

{high_fr}

Deux choses expliquent cet ecart. Un logement meuble ou monthly regroupe le confort : meubles, electromenager, souvent pas de key money, pas de garant et une duree flexible. Et il permet d'emmenager en quelques jours au lieu de plusieurs semaines. Vous ne payez pas seulement un canape, vous payez pour eviter les parties les plus dures du systeme locatif japonais.

## Pourquoi le surcout est le plus eleve dans les quartiers les moins chers
C'est le point contre-intuitif. Dans un arrondissement central et cher comme {low['ward']}, un studio meuble n'est que d'environ +{lowp}%, parce que le loyer standard est deja eleve. Dans un arrondissement peripherique moins cher comme {high['ward']}, le meme confort meuble peut presque doubler le loyer, parce que la base standard est tres basse. Autrement dit, plus le quartier est bon marche, plus la voie meublee vous coute en proportion. Si votre budget est serre et que vous comptiez sur un quartier peripherique pas cher, passer au meuble peut effacer discretement cette economie.

## Quand le meuble en vaut la peine, et quand non
Choisissez le meuble ou monthly si vous arrivez bientot et avez besoin d'un logement en quelques jours, si vous n'avez pas encore de garant japonais ou de revenus locaux, si votre sejour est court ou incertain, ou si vous voulez eviter la facture d'entree de quatre a cinq mois de loyer d'un bail classique.

Choisissez le non meuble si vous restez deux ans ou plus et voulez le loyer mensuel le plus bas, si vous pouvez couvrir les frais d'entree et une societe de garant, ou si vous voulez plus d'espace pour votre argent, surtout dans les quartiers moins chers ou le surcout du meuble est le plus fort.

Pour beaucoup de nouveaux arrivants, le plus malin est de commencer meuble pour l'arrivee, puis de passer a un bail non meuble une fois la carte de resident, le compte bancaire et la connaissance de la ville acquis. Rappelez-vous simplement que les frais d'entree se paient de nouveau au second demenagement, donc ce plan en deux temps ne paie que sur les longs sejours.

## Comment decider avec de vrais chiffres
- Verifiez le surcout du meuble pour votre arrondissement cible dans notre [Indice des loyers de Tokyo](/fr/data), puis pesez-le face au loyer standard.
- Budgetez toute la facture d'entree, pas seulement le loyer. Notre [guide pour louer a Tokyo](/fr/blog/trouver-appartement-tokyo-etranger) detaille depot, key money, frais d'agence et de garant.
- Si vous preferez confier la recherche et l'arbitrage meuble ou non a quelqu'un qui travaille dans le marche, voyez [comment fonctionne le chasseur immobilier](/fr/blog/service-chasseur-immobilier-tokyo-comment-ca-marche) ou [reservez un appel gratuit](/fr/contact).

*Donnees : loyer median meuble ou monthly contre loyer median standard pour un studio 1K, 23 arrondissements de Tokyo, 2026. Mis a jour chaque trimestre. Les deux arrondissements les moins chers ont de plus petits echantillons meubles, a lire comme indicatif.*
""".strip()

# ---------- write helpers (identiques a generate_neighborhoods_article) ----------
def article_obj(slug, locale, title, desc, content):
    return (f"  {{\n    slug: '{slug}',\n    locale: '{locale}',\n"
            f"    title: '{title}',\n    description: '{desc}',\n"
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

# garde-fous contenu
for name, c in (("EN", EN), ("FR", FR)):
    assert "`" not in c, f"{name}: backtick interdit dans le contenu"
    assert "${" not in c, f"{name}: template-literal ${{ interdit"
    assert "\u2014" not in c, f"{name}: tiret long interdit"
for name, s in (("EN_TITLE", EN_TITLE), ("EN_DESC", EN_DESC), ("FR_TITLE", FR_TITLE), ("FR_DESC", FR_DESC)):
    assert "'" not in s, f"{name}: apostrophe interdite (single-quoted)"

blog = BLOG.read_text(encoding="utf-8")
blog = remove_article(blog, SLUG_EN)
blog = remove_article(blog, SLUG_FR)
new_objs = article_obj(SLUG_EN, "en", EN_TITLE, EN_DESC, EN) + article_obj(SLUG_FR, "fr", FR_TITLE, FR_DESC, FR)
m = re.search(r"\n\]\s*\n", blog)
assert m, "fermeture ] introuvable"
blog = blog[:m.start()] + "\n" + new_objs + blog[m.start()+1:]

n_close = len(re.findall(r"^\]$", blog, re.M))
n_en = blog.count(f"slug: '{SLUG_EN}'")
n_fr = blog.count(f"slug: '{SLUG_FR}'")
assert n_close == 1, f"ABORT: ^]$ = {n_close} (attendu 1)"
assert n_en == 1 and n_fr == 1, f"ABORT: slugs en={n_en} fr={n_fr}"
assert "\\`" not in blog, "ABORT: backslash-backtick present"
BLOG.write_text(blog, encoding="utf-8")
print(f"blog.ts OK: ^]$={n_close}, slugs en/fr=1/1")

# ---------- FAQ ----------
def esc(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")
def faq_block(slug, qas):
    items = "".join(f"    {{\n      question: '{esc(q)}',\n      answer:\n        '{esc(a)}',\n    }},\n" for q, a in qas)
    return f"  '{slug}': [\n{items}  ],\n\n"

faq_en = [
    ("How much more does a furnished apartment cost in Tokyo?",
     f"A furnished or monthly 1K studio costs about {lowp}% to {highp}% more per month than a standard unfurnished one, based on real listings across the 23 wards. The premium is smallest in central wards like {low['ward']} (+{lowp}%) and biggest in cheaper wards like {high['ward']} (+{highp}%)."),
    ("Is it cheaper to rent furnished or unfurnished in Tokyo?",
     "Unfurnished is cheaper per month, but furnished skips the guarantor, most of the key money and weeks of setup. For a stay under a year or a fast arrival, furnished usually works out better overall; for a long committed stay, unfurnished wins."),
    ("Why is the furnished premium higher in cheaper Tokyo wards?",
     f"Because the standard rent is already low there, so the fixed cost of furniture and convenience is a bigger share of it. In a cheap ward the furnished route can nearly double the rent, while in an expensive central ward it adds only around {lowp}%."),
    ("Is this based on real data?",
     "Yes. It compares the median furnished or monthly rent to the median standard rent for a 1K studio in each Tokyo ward, 2026, updated quarterly."),
]
faq_fr = [
    ("Combien coute un appartement meuble en plus a Tokyo ?",
     f"Un studio 1K meuble ou monthly coute environ {lowp}% a {highp}% de plus par mois qu'un standard non meuble, sur des annonces reelles dans les 23 arrondissements. Le surcout est le plus faible dans les arrondissements centraux comme {low['ward']} (+{lowp}%) et le plus fort dans les moins chers comme {high['ward']} (+{highp}%)."),
    ("Est-ce moins cher de louer meuble ou non meuble a Tokyo ?",
     "Le non meuble est moins cher au mois, mais le meuble evite le garant, l'essentiel du key money et des semaines de demarches. Pour un sejour de moins d'un an ou une arrivee rapide, le meuble est souvent plus avantageux au total ; pour un long sejour engage, le non meuble l'emporte."),
    ("Pourquoi le surcout du meuble est-il plus eleve dans les quartiers moins chers ?",
     f"Parce que le loyer standard y est deja bas, donc le cout fixe des meubles et du confort en represente une part plus grande. Dans un quartier bon marche, la voie meublee peut presque doubler le loyer, alors que dans un arrondissement central cher elle n'ajoute qu'environ {lowp}%."),
    ("Est-ce base sur des donnees reelles ?",
     "Oui. On compare le loyer median meuble ou monthly au loyer median standard pour un studio 1K dans chaque arrondissement de Tokyo, 2026, mis a jour chaque trimestre."),
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
print(f"\nGENERE. Premium {lowp}% ({low['ward']}) -> {highp}% ({high['ward']}). Slugs: {SLUG_EN} | {SLUG_FR}")
