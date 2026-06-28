"""
content_gap_detector.py -- ART DE LA GUERRE
Analyse les URLs des concurrents (competitor_cache.json) et les compare a nos
articles (lib/blog.ts) pour sortir les SUJETS qu'ils couvrent et pas nous.
100% gratuit (donnees deja en cache). Niche: logement/relocation/expat Japon.

Usage: python scripts/content_gap_detector.py
"""
import json, re, io, sys
from pathlib import Path
from collections import Counter

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SCRIPT_DIR = Path(__file__).parent
CACHE = SCRIPT_DIR / "data" / "competitor_cache.json"
BLOG = SCRIPT_DIR.parent / "lib" / "blog.ts"

# Mots-ancre de la niche tokyo-expat (un slug doit en contenir 1 pour etre pertinent)
NICHE = {
    "apartment","apartments","house","housing","rent","rental","lease","guarantor",
    "sharehouse","share","gaijin","furnished","mansion","dorm","dormitory","deposit",
    "reikin","shikikin","move","moving","movers","relocate","relocation","visa","residence",
    "bank","banking","insurance","health","pension","tax","taxes","sim","phone","internet",
    "utilities","number","ward","neighbourhood","neighborhood","district","expat","foreigner",
    "foreigners","student","students","family","school","schools","minpaku","jiko","bukken",
    "monthly","studio","accommodation","real-estate","property","landlord","tenant","contract",
}
# Concurrents NON pertinents pour la niche Japon (a exclure)
EXCLUDE_COMP = {"Remoters"}
# Bruit a ignorer (mots generiques + hors-sujet)
STOP = {
    "the","in","to","a","of","for","and","your","how","what","why","best","top","guide","2024",
    "2025","2026","tokyo","japan","japanese","jp","cn","thai","en","fr","de","building","place","event",
    "events","with","you","is","are","on","at","an","from","blog","com","www","https","http",
    "vs","or","i","my","it","this","that","new","get","all","about","do","can","2","3","4","5",
    "than","less","know","things","year","one","need","should","as","like","day","week","tweet",
    "festival","exhibition","ghibli","erica","solo","kimono","mental","education","elementary",
    "opening","heights","village","terrace","car","part","system","understanding","japans","tokyos",
    "five","ten","more","cool","life","dark","side","reveals","didnt","could","sneak","avoid","staying",
    "teach","teaching","english","speak","foreigners","what","whats","not","be","by","buy","stop",
}


def slug_words(url: str):
    # dernier segment significatif
    path = re.sub(r"https?://[^/]+/", "", url).strip("/")
    seg = path.split("/")[-1] if path else ""
    seg = re.sub(r"\.(html|php|htm)$", "", seg)
    words = re.split(r"[-_]+", seg.lower())
    return [w for w in words if w and w not in STOP and not w.isdigit()]


def main():
    cache = json.loads(CACHE.read_text(encoding="utf-8"))
    blog = BLOG.read_text(encoding="utf-8")
    our_slugs = re.findall(r"slug:\s*'([^']+)'", blog)
    our_words = set()
    for s in our_slugs:
        for w in re.split(r"[-_]+", s.lower()):
            if w and w not in STOP:
                our_words.add(w)

    # Collecte URLs concurrents pertinentes
    comp_topics = Counter()          # mot-cle -> frequence chez concurrents
    examples = {}                    # mot-cle -> liste d'URLs exemple
    relevant_slugs = []              # (competitor, url, words)
    for key, urls in cache.items():
        if not key.startswith("urls_"):
            continue
        comp = key[5:]
        if comp in EXCLUDE_COMP or not isinstance(urls, list):
            continue
        for u in urls:
            words = slug_words(u)
            if not any(w in NICHE for w in words):
                continue
            relevant_slugs.append((comp, u, words))
            for w in words:
                comp_topics[w] += 1
                examples.setdefault(w, [])
                if len(examples[w]) < 3 and u not in examples[w]:
                    examples[w].append(u)

    print(f"URLs concurrents pertinentes (niche logement/expat): {len(relevant_slugs)}")
    print(f"Nos articles: {len(our_slugs)}\n")

    # GAPS: mots-cles frequents chez concurrents, ABSENTS chez nous
    gaps = []
    for w, freq in comp_topics.items():
        if freq >= 4 and w not in our_words and w not in NICHE:
            gaps.append((freq, w))
    gaps.sort(reverse=True)

    print("=== TOP SUJETS qu'ils couvrent et PAS nous (mot-cle | freq concurrents) ===\n")
    for freq, w in gaps[:40]:
        ex = examples.get(w, [""])[0]
        print(f"  {freq:>4}x  {w:<22}  ex: {ex}")

    # Articles concurrents entiers sans equivalent evident chez nous (echantillon)
    print("\n=== ARTICLES CONCURRENTS pertinents sans recoupement fort avec nos slugs (echantillon) ===\n")
    seen = set()
    shown = 0
    for comp, u, words in relevant_slugs:
        core = [w for w in words if w not in NICHE]
        if not core:
            continue
        overlap = sum(1 for w in core if w in our_words)
        if overlap == 0:  # aucun de leurs mots distinctifs chez nous
            sig = tuple(sorted(core))[:3]
            if sig in seen:
                continue
            seen.add(sig)
            print(f"  [{comp}] {u}")
            shown += 1
            if shown >= 30:
                break


if __name__ == "__main__":
    main()
