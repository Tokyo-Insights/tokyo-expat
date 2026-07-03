# -*- coding: utf-8 -*-
"""
generate_neighborhoods_article.py -- Genere/MET A JOUR l'article data-backed
"quartiers les moins/plus chers de Tokyo" (FR+EN) a partir de l'Indice des loyers.

Idempotent: relancer = remplace les 2 articles (par slug) avec les chiffres frais.
A relancer apres refresh_rent_index.py (trimestriel) -> l'article reste toujours a jour.
Ecrit dans lib/blog.ts + lib/faq_data.ts, avec verif d'integrite (^]$ == 1). Abort si casse.

Run: python scripts/generate_neighborhoods_article.py
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

SLUG_EN = "cheapest-neighbourhoods-tokyo-ranked-by-rent"
SLUG_FR = "quartiers-tokyo-moins-chers-classement-loyers"

d = json.loads(INDEX.read_text(encoding="utf-8"))
total = d["total_listings"]
wards = [w for w in d["wards"] if w.get("rents", {}).get("1K")]
wards.sort(key=lambda w: w["rents"]["1K"]["median"])
stations = [s for s in d.get("stations", []) if s.get("rents", {}).get("1K")]
stations.sort(key=lambda s: s["rents"]["1K"]["median"])

def yen(n): return f"{n:,}".replace(",", " ")  # 74 000

cheap_wards = wards[:10]
exp_wards = list(reversed(wards[-8:]))
cheap_st = stations[:8]

# ---------- EN ----------
def ol_wards(lst):
    return "\n".join(f"{i+1}. **{w['ward_en']}** - {yen(w['rents']['1K']['median'])} JPY" for i, w in enumerate(lst))
def ol_st(lst):
    return "\n".join(f"{i+1}. **{s['station_en']}** - {yen(s['rents']['1K']['median'])} JPY" for i, s in enumerate(lst))

cw = cheap_wards
ew = exp_wards
EN_TITLE = "Cheapest and Priciest Tokyo Neighbourhoods (2026 Rent Data)"
EN_DESC = f"A data-backed ranking of the cheapest and most expensive Tokyo wards and stations to rent in 2026, from {total:,} real active listings."
EN = f"""
Everyone asks the same question when moving to Tokyo: where can I actually afford to live? Most guides answer with opinions. This one answers with data, from {total:,} real rental listings across Tokyo's 23 wards, updated every quarter.

**Quick answer:** The cheapest Tokyo wards for a 1K studio are {cw[0]['ward_en']} ({yen(cw[0]['rents']['1K']['median'])} JPY), {cw[1]['ward_en']} ({yen(cw[1]['rents']['1K']['median'])} JPY) and {cw[2]['ward_en']} ({yen(cw[2]['rents']['1K']['median'])} JPY), all eastern or outer wards. The most expensive is {ew[0]['ward_en']} ({yen(ew[0]['rents']['1K']['median'])} JPY), followed by {ew[1]['ward_en']} and {ew[2]['ward_en']}. From one ward to another, the same studio can cost nearly double.

## The 10 cheapest wards to live in Tokyo
Ranked by median monthly rent for a 1K studio, from {total:,} active listings:

{ol_wards(cw)}

These are mostly eastern and outer wards. They sit 20 to 40 minutes from the centre but stay fully on the train network, and your money buys a real apartment instead of a shoebox.

## The most expensive wards to live in Tokyo
The other end of the scale, same 1K studio:

{ol_wards(ew)}

You pay for location, convenience and a certain lifestyle. For many relocating executives and families it is worth it, but go in knowing the premium is real.

## Cheapest stations, if you want to go granular
Ward averages hide a lot. Here are the most affordable of 50 major stations for a 1K, so you can trade a few minutes of commute for real savings:

{ol_st(cheap_st)}

## How to actually use this ranking
- **Choose your train line and commute first, then the station.** Ten extra minutes on the right line can save you 30,000 to 50,000 JPY a month for the same apartment.
- **The cheapest wards are not "worse", just further out.** They are residential, safe and well connected.
- **Budget for the upfront bill**, not just the rent: a standard lease can ask for four to six months of rent all at once. See our [guide to renting in Tokyo as a foreigner](/en/blog/find-apartment-tokyo-foreigner).
- **Explore every ward, line and station** in our interactive [Tokyo Rent Index](/en/data).

If you would rather have someone who works inside the Tokyo market turn these numbers into an actual apartment, see [how our property hunter works](/en/blog/how-real-estate-hunter-works-tokyo) or [book a free call](/en/contact).

*Data: {total:,} active listings, Tokyo 23 wards, 2026. Median 1K rent in JPY. Updated quarterly.*
""".strip()

# ---------- FR ----------
def ol_wards_fr(lst):
    return "\n".join(f"{i+1}. **{w['ward_en']}** - {yen(w['rents']['1K']['median'])} JPY" for i, w in enumerate(lst))
FR_TITLE = "Les quartiers de Tokyo les moins chers (donnees 2026)"
FR_DESC = f"Un classement chiffre des arrondissements et stations de Tokyo les moins et plus chers a louer en 2026, a partir de {total:,} annonces reelles."
FR = f"""
Tout le monde se pose la meme question en s'installant a Tokyo : ou puis-je vraiment me permettre d'habiter ? La plupart des guides repondent a l'opinion. Celui-ci repond avec des donnees, a partir de {total:,} annonces locatives reelles dans les 23 arrondissements de Tokyo, mises a jour chaque trimestre.

**Reponse rapide :** Les arrondissements les moins chers pour un studio 1K sont {cw[0]['ward_en']} ({yen(cw[0]['rents']['1K']['median'])} JPY), {cw[1]['ward_en']} ({yen(cw[1]['rents']['1K']['median'])} JPY) et {cw[2]['ward_en']} ({yen(cw[2]['rents']['1K']['median'])} JPY), tous a l'est ou en peripherie. Le plus cher est {ew[0]['ward_en']} ({yen(ew[0]['rents']['1K']['median'])} JPY), suivi de {ew[1]['ward_en']} et {ew[2]['ward_en']}. D'un arrondissement a l'autre, le meme studio peut couter pres du double.

## Les 10 arrondissements les moins chers de Tokyo
Classes par loyer median d'un studio 1K, sur {total:,} annonces actives :

{ol_wards_fr(cw)}

Ce sont surtout des arrondissements de l'est et de la peripherie. Ils sont a 20-40 minutes du centre mais restent bien desservis, et votre budget achete un vrai appartement plutot qu'une boite a chaussures.

## Les arrondissements les plus chers de Tokyo
L'autre extreme, pour le meme studio 1K :

{ol_wards_fr(ew)}

Vous payez l'emplacement, la commodite et un certain art de vivre. Pour beaucoup de cadres et de familles relocalises, ca vaut le coup, mais sachez que la prime est reelle.

## Les stations les moins cheres, pour affiner
La moyenne par arrondissement cache beaucoup. Voici les stations les plus abordables parmi 50 grandes stations, pour un 1K :

{ol_st(cheap_st)}

## Comment utiliser ce classement
- **Choisissez d'abord votre ligne et votre trajet, puis la station.** Dix minutes de plus sur la bonne ligne peuvent economiser 30 000 a 50 000 JPY/mois pour le meme appartement.
- **Les quartiers les moins chers ne sont pas "moins bien", juste plus loin.** Ils sont residentiels, surs et bien connectes.
- **Prevoyez la facture d'entree**, pas seulement le loyer : un bail classique peut demander 4 a 6 mois de loyer d'un coup. Voyez notre [guide pour louer a Tokyo](/fr/blog/trouver-appartement-tokyo-etranger).
- **Explorez chaque arrondissement, ligne et station** dans notre [Indice des loyers de Tokyo](/fr/data).

Si vous preferez confier ces chiffres a quelqu'un qui travaille dans le marche tokyoite, voyez [comment fonctionne le chasseur immobilier](/fr/blog/service-chasseur-immobilier-tokyo-comment-ca-marche) ou [reservez un appel gratuit](/fr/contact).

*Donnees : {total:,} annonces actives, 23 arrondissements de Tokyo, 2026. Loyer median 1K en JPY. Mis a jour chaque trimestre.*
""".strip()

# ---------- write helpers ----------
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

blog = BLOG.read_text(encoding="utf-8")
blog = remove_article(blog, SLUG_EN)
blog = remove_article(blog, SLUG_FR)
new_objs = article_obj(SLUG_EN, "en", EN_TITLE, EN_DESC, EN) + article_obj(SLUG_FR, "fr", FR_TITLE, FR_DESC, FR)
# insert avant la fermeture ^]$
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
BLOG.write_text(blog, encoding="utf-8")
print(f"blog.ts OK: ^]$={n_close}, slugs en/fr=1/1, em-dash total fichier={n_emdash}")

# ---------- FAQ ----------
def esc(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")
def faq_block(slug, qas):
    items = "".join(f"    {{\n      question: '{esc(q)}',\n      answer:\n        '{esc(a)}',\n    }},\n" for q, a in qas)
    return f"  '{slug}': [\n{items}  ],\n\n"

faq_en = [
    ("What is the cheapest ward to live in Tokyo?",
     f"For a 1K studio, the cheapest wards are {cw[0]['ward_en']} ({yen(cw[0]['rents']['1K']['median'])} JPY median), {cw[1]['ward_en']} and {cw[2]['ward_en']}, all eastern or outer wards but fully on the train network."),
    ("What is the most expensive ward in Tokyo?",
     f"{ew[0]['ward_en']} is the most expensive for a 1K studio ({yen(ew[0]['rents']['1K']['median'])} JPY median), followed by {ew[1]['ward_en']} and {ew[2]['ward_en']}."),
    ("Which Tokyo stations have the cheapest rent?",
     f"Among 50 major stations, the cheapest for a 1K are {cheap_st[0]['station_en']} ({yen(cheap_st[0]['rents']['1K']['median'])} JPY), {cheap_st[1]['station_en']} and {cheap_st[2]['station_en']}."),
    ("Is this ranking based on real data?",
     f"Yes. It uses the median 1K rent from {total:,} active rental listings across Tokyo, updated quarterly. Median, not average, so a few luxury units do not skew it."),
]
faq_fr = [
    ("Quel est l'arrondissement le moins cher de Tokyo ?",
     f"Pour un studio 1K, les moins chers sont {cw[0]['ward_en']} ({yen(cw[0]['rents']['1K']['median'])} JPY median), {cw[1]['ward_en']} et {cw[2]['ward_en']}, a l'est ou en peripherie mais bien desservis."),
    ("Quel est l'arrondissement le plus cher de Tokyo ?",
     f"{ew[0]['ward_en']} est le plus cher pour un studio 1K ({yen(ew[0]['rents']['1K']['median'])} JPY median), suivi de {ew[1]['ward_en']} et {ew[2]['ward_en']}."),
    ("Quelles stations de Tokyo ont les loyers les moins chers ?",
     f"Parmi 50 grandes stations, les moins cheres pour un 1K sont {cheap_st[0]['station_en']} ({yen(cheap_st[0]['rents']['1K']['median'])} JPY), {cheap_st[1]['station_en']} et {cheap_st[2]['station_en']}."),
    ("Ce classement est-il base sur des donnees reelles ?",
     f"Oui. Il utilise le loyer median 1K de {total:,} annonces actives a Tokyo, mis a jour chaque trimestre. Mediane et non moyenne, pour ne pas etre fausse par quelques biens de luxe."),
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
    # avaler la ligne vide suivante si presente
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
print("\nGENERE. Slugs:", SLUG_EN, "|", SLUG_FR, "| cheapest ward:", cw[0]['ward_en'], "| priciest:", ew[0]['ward_en'])
