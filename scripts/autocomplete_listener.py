# -*- coding: utf-8 -*-
"""
autocomplete_listener.py -- CE QUE LES GENS TAPENT, et qu'on ne peut pas voir.

Le trou structurel: la Search Console ne montre que les requetes ou le site est
DEJA classe. Tout ce que les gens cherchent et ou on n'apparait pas est, par
construction, invisible. L'autocompletion Google, elle, ne depend pas de notre
classement: elle reflete ce qui est reellement tape.

Ce script moissonne les suggestions autour de termes-souches (EN + FR), y compris
la longue traine (souche + a..z) et les formes interrogatives, puis croise avec
`lib/blog.ts` pour dire lesquelles n'ont AUCUN article chez nous.

⚠️ LECTURE SEULE. N'ecrit rien sur le site.
Sortie: rapport console + scripts/data/autocomplete_<date>.json (comparer les passes).

  python scripts/autocomplete_listener.py
  python scripts/autocomplete_listener.py --lang fr --deep
"""
import argparse
import datetime as dt
import io
import json
import os
import re
import string
import sys
import time
import urllib.parse
import warnings

import requests

warnings.filterwarnings("ignore")
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

HERE = os.path.dirname(os.path.abspath(__file__))
BLOG = os.path.join(os.path.dirname(HERE), "lib", "blog.ts")
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36")
ENDPOINT = "https://suggestqueries.google.com/complete/search"
SLEEP = 0.4

SEEDS = {
    "en": ["apartment tokyo foreigner", "rent tokyo", "share house tokyo",
           "guarantor japan", "moving to tokyo", "furnished apartment tokyo",
           "gaijin house", "key money japan", "student housing tokyo",
           "no guarantor apartment japan"],
    "fr": ["logement tokyo", "appartement tokyo", "louer appartement japon",
           "garant japon", "s'installer au japon", "colocation tokyo",
           "logement etudiant japon", "appartement meuble tokyo"],
}
# Formes interrogatives: la ou l'intention est la plus explicite.
PREFIX = {
    "en": ["how to", "why", "can i", "is it", "what is", "where to", "best"],
    "fr": ["comment", "pourquoi", "peut-on", "ou ", "quel", "combien"],
}


def suggest(q, lang):
    try:
        r = requests.get(ENDPOINT, params={"client": "firefox", "hl": lang, "q": q},
                         headers={"User-Agent": UA}, verify=False, timeout=15)
        if r.status_code != 200:
            return None
        return [s for s in json.loads(r.text)[1] if isinstance(s, str)]
    except Exception:
        return None


def load_blog_text():
    try:
        with open(BLOG, encoding="utf-8") as f:
            return f.read().lower()
    except Exception:
        print("[WARN] blog.ts illisible: le croisement 'a-t-on un article ?' sera saute.")
        return None


STOPW = set("""the a an to of in on at for and or is it my your how what why can i do does
le la les un une des du de a au aux en et est il on ou que qui quoi pour dans avec""".split())


def covered(sugg, blog):
    """Heuristique volontairement PRUDENTE: on considere couvert si au moins deux
    mots distinctifs de la suggestion apparaissent dans blog.ts. Mieux vaut sous-
    estimer le trou que crier au manque sur un sujet deja traite."""
    if blog is None:
        return None
    toks = [w for w in re.findall(r"[a-zà-ÿ']{3,}", sugg.lower()) if w not in STOPW]
    if not toks:
        return True
    hits = sum(1 for w in toks if w in blog)
    return hits >= max(2, len(toks) - 1)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--lang", default="en,fr")
    ap.add_argument("--deep", action="store_true",
                    help="ajoute la traine souche+a..z (beaucoup plus lent, bien plus riche)")
    a = ap.parse_args()

    langs = [x.strip() for x in a.lang.split(",") if x.strip()]
    blog = load_blog_text()
    results = {}
    calls = ok = 0

    for lang in langs:
        found = {}
        queries = list(SEEDS.get(lang, []))
        queries += [f"{p} {s}" for p in PREFIX.get(lang, []) for s in SEEDS.get(lang, [])[:4]]
        if a.deep:
            queries += [f"{s} {c}" for s in SEEDS.get(lang, [])[:5] for c in string.ascii_lowercase]

        for i, q in enumerate(queries):
            if i:
                time.sleep(SLEEP)
            calls += 1
            sug = suggest(q, lang)
            if sug is None:
                continue
            ok += 1
            for s in sug:
                if s.lower() != q.lower():
                    found.setdefault(s, 0)
                    found[s] += 1
        results[lang] = found
        print(f"[{lang}] {len(queries)} souches interrogees -> {len(found)} suggestions uniques.")

    cover = 100 * ok / calls if calls else 0
    print(f"\nCouverture des appels: {ok}/{calls} ({cover:.0f}%).")
    if cover < 70:
        print("🚨 Couverture faible: Google a limite le debit. Resultats partiels,")
        print("   ne pas conclure a une absence. Relancer plus tard.")

    payload = {"generated": dt.datetime.now(dt.timezone.utc).isoformat(),
               "coverage_pct": round(cover, 1), "langs": {}}

    for lang, found in results.items():
        if not found:
            continue
        gaps = [(s, n) for s, n in found.items() if covered(s, blog) is False]
        gaps.sort(key=lambda x: -x[1])
        print("\n" + "=" * 76)
        print(f"{lang.upper()} — {len(found)} suggestions, dont {len(gaps)} SANS article chez nous")
        print("=" * 76)
        if gaps:
            print("Ce que les gens tapent et qu'on ne traite pas:")
            for s, n in gaps[:30]:
                print(f"  [{n:2d}x] {s}")
        else:
            print("Aucun trou detecte (ou blog.ts illisible).")

        # Signal transversal: les suffixes qui reviennent le plus.
        tail = {}
        for s in found:
            for w in re.findall(r"[a-zà-ÿ']{4,}", s.lower()):
                if w not in STOPW:
                    tail[w] = tail.get(w, 0) + 1
        top = sorted(tail.items(), key=lambda x: -x[1])[:18]
        print("\nMots qui reviennent le plus dans les suggestions:")
        print("  " + " · ".join(f"{w} ({n})" for w, n in top))

        payload["langs"][lang] = {
            "total": len(found),
            "gaps": [{"q": s, "n": n} for s, n in gaps[:80]],
            "all": [{"q": s, "n": n} for s, n in sorted(found.items(), key=lambda x: -x[1])[:200]],
        }

    stamp = dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%d")
    out = os.path.join(HERE, "data", f"autocomplete_{stamp}.json")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    print(f"\nTrace ecrite: {out}")
    print("⚠️ Une suggestion n'est PAS un volume: Google ne dit pas combien de gens")
    print("   la tapent. C'est un signal de FORMULATION, pas une estimation de trafic.")


if __name__ == "__main__":
    main()
