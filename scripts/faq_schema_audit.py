#!/usr/bin/env python3
"""
faq_schema_audit.py -- Le schema FAQ dit-il la meme chose que l'article ?

🔑 POURQUOI (incident du 12/09/2026):
`lib/faq_data.ts` est un SECOND reservoir de faits, parallele aux articles, que rien ne
synchronise. La page gaijin-house portait six enonces de prix contradictoires, et le plus
dommageable n'etait PAS dans l'article: il vivait dans le schema FAQ. Or **le JSON-LD est ce
que Google et les apercus IA parsent en machine**, pas la prose. Un chiffre faux la-dedans
pese plus lourd qu'ailleurs, et une source qui se contredit sur le fait demande n'est pas
citable.

Ce que le script signale, par ordre de gravite:
  ORPHELIN    une entree FAQ dont le slug n'existe plus dans blog.ts (schema servi dans le vide)
  INVENTE     un montant affirme par la FAQ que l'article ne mentionne NULLE PART
  SANS CHIFFRE une FAQ qui parle prix/cout sans donner un seul montant

Lecture SEULE. Ne corrige rien: les faux positifs sont possibles (un article peut arrondir),
c'est a l'humain de trancher.

Usage:
    python scripts/faq_schema_audit.py
    python scripts/faq_schema_audit.py --slug gaijin-house-tokyo-guide
"""
import argparse
import io
import re
import sys
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = Path(__file__).parent.parent
BLOG = ROOT / "lib" / "blog.ts"
FAQ = ROOT / "lib" / "faq_data.ts"

# 80,000 / 80 000 / 80000 / 80 000 (espace insecable) -> 80000
MONTANT = re.compile(r"\b(\d{1,3}(?:[,   ]\d{3})+|\d{4,7})\b")
MOTS_PRIX = re.compile(r"prix|cost|cout|coût|combien|how much|price|rent|loyer|budget|fee|frais",
                       re.I)


def montants(texte):
    out = set()
    for m in MONTANT.finditer(texte or ""):
        brut = re.sub(r"[,   ]", "", m.group(1))
        try:
            v = int(brut)
        except ValueError:
            continue
        if 1000 <= v <= 9_999_999:      # sous 1000 = pourcentages, m2, annees
            out.add(v)
    return out


def articles():
    """slug -> texte complet (titre + description + contenu) depuis blog.ts."""
    src = BLOG.read_text(encoding="utf-8")
    # Chaque post commence par "slug: '...'". On decoupe sur ces ancres.
    ancres = [(m.group(1), m.start()) for m in re.finditer(r"slug:\s*'([^']+)'", src)]
    out = {}
    for i, (slug, pos) in enumerate(ancres):
        fin = ancres[i + 1][1] if i + 1 < len(ancres) else len(src)
        out.setdefault(slug, "")
        out[slug] += src[pos:fin]
    return out


def faqs():
    """slug -> [(question, reponse)] depuis faq_data.ts."""
    src = FAQ.read_text(encoding="utf-8")
    out = {}
    # Cle de premier niveau: "  'slug': ["
    ancres = [(m.group(1), m.start()) for m in re.finditer(r"^\s{2}'([^']+)':\s*\[", src, re.M)]
    for i, (slug, pos) in enumerate(ancres):
        fin = ancres[i + 1][1] if i + 1 < len(ancres) else len(src)
        bloc = src[pos:fin]
        paires = []
        for q in re.finditer(r"question:\s*'((?:[^'\\]|\\.)*)'\s*,\s*answer:\s*\n?\s*'((?:[^'\\]|\\.)*)'",
                             bloc):
            paires.append((q.group(1), q.group(2)))
        out[slug] = paires
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--slug", help="n'auditer qu'un article")
    args = ap.parse_args()

    arts = articles()
    fq = faqs()
    if args.slug:
        fq = {k: v for k, v in fq.items() if k == args.slug}

    n_faq = sum(len(v) for v in fq.values())
    print(f"{len(fq)} articles portent une FAQ, {n_faq} questions au total.")
    print(f"{len(arts)} articles lus dans blog.ts.\n")

    orphelins, inventes, sans_chiffre = [], [], []

    for slug, paires in sorted(fq.items()):
        if slug not in arts:
            orphelins.append(slug)
            continue
        art_m = montants(arts[slug])
        for question, reponse in paires:
            faq_m = montants(reponse)
            absents = sorted(faq_m - art_m)
            if absents:
                inventes.append((slug, question, absents, sorted(art_m)[:8]))
            elif not faq_m and MOTS_PRIX.search(question):
                sans_chiffre.append((slug, question))

    print("=" * 72)
    if orphelins:
        print(f"🔴 ORPHELINS : {len(orphelins)} FAQ servies pour un slug absent de blog.ts")
        for s in orphelins:
            print(f"    {s}")
    else:
        print("✅ ORPHELINS : aucun. Chaque FAQ correspond a un article existant.")

    print()
    if inventes:
        print(f"🟠 MONTANTS QUE L'ARTICLE NE DIT PAS : {len(inventes)} reponses")
        print("   (le schema affirme un chiffre introuvable dans l'article)\n")
        for slug, question, absents, exemples in inventes:
            print(f"  [{slug}]")
            print(f"    Q: {question[:82]}")
            print(f"    absents de l'article : {absents}")
            print(f"    l'article dit plutot : {exemples}")
            print()
    else:
        print("✅ Aucun montant de FAQ absent de son article.")

    if sans_chiffre:
        print(f"\n🟡 QUESTIONS DE PRIX SANS AUCUN MONTANT : {len(sans_chiffre)}")
        print("   (occasion manquee: un moteur de reponse cite ce qui est chiffre)")
        for slug, question in sans_chiffre[:25]:
            print(f"    [{slug}] {question[:76]}")
        if len(sans_chiffre) > 25:
            print(f"    ... et {len(sans_chiffre) - 25} autres")

    print("\n" + "=" * 72)
    print(f"BILAN : {len(orphelins)} orphelins · {len(inventes)} montants a verifier · "
          f"{len(sans_chiffre)} questions de prix sans chiffre")
    print("Rien n'a ete modifie. Les faux positifs sont possibles (arrondis, fourchettes).")


if __name__ == "__main__":
    main()
