# -*- coding: utf-8 -*-
"""
demand_listener.py -- ECOUTER la demande au lieu d'y repondre.

`reddit_japanlife_watch.py` sert a trouver des fils OU REPONDRE (un par un).
Celui-ci lit les MEMES sources mais ne produit aucun draft: il COMPTE. Il
repond a "de quoi les gens se plaignent vraiment, avec quels mots, a quel
moment de leur parcours, et combien ca leur coute".

Pourquoi c'est utile: le site est ecrit avec un vocabulaire SEO, la demande
s'exprime avec le sien. L'ecart entre les deux est invisible depuis la Search
Console, qui ne montre que les requetes ou on est DEJA classe.

⚠️ LECTURE SEULE. N'ecrit ni dans la file du watcher, ni sur Reddit.
Sortie: rapport console + scripts/data/demand_listen_<date>.json (pour comparer
les passes dans le temps, une mesure isolee ne vaut rien).

  python scripts/demand_listener.py
  python scripts/demand_listener.py --sub japanlife --top 25
"""
import argparse
import collections
import datetime as dt
import html
import io
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ATOM = "{http://www.w3.org/2005/Atom}"
import xml.etree.ElementTree as ET

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36")
HERE = os.path.dirname(os.path.abspath(__file__))
SLEEP = 5.0   # Reddit limite search.rss: 1,5 s donnait 6% de reussite (11/09/2026)

DEFAULT_SUBS = "japanlife,movingtojapan,japanresidents"
QUERIES = ["apartment", "guarantor", "housing", "landlord", "key money",
           "share house", "rent contract", "deposit", "real estate agency",
           "moving to tokyo", "rejected"]

# --- Les axes de comptage -------------------------------------------------
# Chaque theme = ce qui bloque REELLEMENT quelqu'un. Volontairement plus fin
# que le filtre "housing" du watcher: ici on veut la repartition, pas le tri.
THEMES = {
    "garant / hosho":        r"guarantor|hosho|保証|co-?signer",
    "refus / discrimination": r"reject|refus|denied|turned down|no foreigner|gaijin.{0,12}(not|no)|discriminat",
    "argent-cle / reikin":   r"key ?money|reikin|礼金",
    "depot / shikikin":      r"deposit|shikikin|敷金",
    "etat des lieux/sortie": r"move ?out|moving out|restoration|genjou|cleaning fee|damage|deduct",
    "frais d'agence":        r"agency fee|agent fee|brokerage|chukai",
    "share house":           r"share ?house|sharehouse|guest ?house|gaijin house",
    "meuble / court terme":  r"furnished|monthly|short.?term|weekly mansion|serviced",
    "renouvellement":        r"renew|koushin|update fee|2.?year contract",
    "chercher a distance":   r"from abroad|before (i )?arriv|overseas|remotely|not in japan yet",
    "budget / cherte":       r"expensive|afford|too much|budget|cheap",
    "langue / paperasse":    r"japanese (language|only)|translat|paperwork|documents|fill (in|out)",
    "visa / statut":         r"visa|residence card|zairyu|working holiday|student visa",
    "animaux":               r"\bpet\b|\bdog\b|\bcat\b|pet.?friendly",
}

# Verbes de douleur: ce qui distingue une question d'une galere.
PAIN = r"stuck|desperate|struggl|nightmare|scam|ripped off|unfair|frustrat|help|no idea|lost|panic|urgent"

# Moment du parcours: qui parle ? (avant / juste arrive / deja installe)
STAGE = {
    "avant l'arrivee":  r"moving to|before (i )?arriv|from abroad|not in japan yet|planning to move|will arrive",
    "juste arrive":     r"just arrived|arrived last|first month|new here|landed",
    "deja installe":    r"my landlord|my apartment|renew|move ?out|current (apartment|place)|been here",
}

MONEY = re.compile(r"(?:¥|JPY|yen)\s?([0-9][0-9,\.]{2,9})|([0-9][0-9,\.]{2,9})\s?(?:yen|JPY|¥)", re.I)
STOP = set("""the a an and or but if then than that this these those is are was were be been being
to of in on at for with from by as it its it's i you he she they we my your his her their our
have has had do does did not no yes so very just really about into out up down over under again
can could should would will shall may might must im ive dont doesnt didnt cant wont what when
where who how why which there here all any some more most other such only own same too also
get got go going went make made know think see want need like one two get""".split())
TAG = re.compile(r"<[^>]+>")


# Boilerplate que Reddit colle dans CHAQUE entree RSS. Sans ce nettoyage,
# "link comments" ressort en tete du vocabulaire avec autant d'occurrences que
# de fils, et "thanks submitted" juste derriere: on mesure le flux, pas les gens.
BOILER = re.compile(
    r"submitted by\s*/?u/[A-Za-z0-9_\-]+|\[link\]|\[comments\]|"
    r"\bthanks?\b\s+submitted|https?://\S+",
    re.I)


def strip_html(s):
    s = TAG.sub(" ", html.unescape(s or ""))
    s = BOILER.sub(" ", s)
    return re.sub(r"\s+", " ", s).strip()


def get_rss(url, tries=4):
    """Reddit limite AGRESSIVEMENT search.rss: sans backoff, ~90% des requetes
    echouent et on obtient un echantillon minuscule qu'on prend pour une mesure.
    Constate le 11/09/2026: 31 echecs sur 33 appels."""
    delay = 4.0
    for attempt in range(1, tries + 1):
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        try:
            raw = urllib.request.urlopen(req, timeout=30).read()
            return ET.fromstring(raw)
        except urllib.error.HTTPError as e:
            if e.code in (429, 403, 503) and attempt < tries:
                time.sleep(delay)
                delay *= 2
                continue
            print(f"  [ECHEC] HTTP {e.code} apres {attempt} essai(s): {url[:66]}")
            return None
        except Exception as e:
            print(f"  [ECHEC] {type(e).__name__}: {url[:66]}")
            return None
    return None


def fetch(sub, query):
    url = (f"https://www.reddit.com/r/{sub}/search.rss"
           f"?q={urllib.parse.quote(query)}&restrict_sr=on&sort=new&t=month")
    root = get_rss(url)
    if root is None:
        return []
    out = []
    for e in root.findall(f"{ATOM}entry"):
        link_el = e.find(f"{ATOM}link")
        out.append({
            "title": (e.findtext(f"{ATOM}title") or "").strip(),
            "body": strip_html(e.findtext(f"{ATOM}content") or ""),
            "link": link_el.get("href") if link_el is not None else "",
            "updated": e.findtext(f"{ATOM}updated") or "",
        })
    return out


def bar(n, total, width=34):
    if not total:
        return ""
    return "#" * max(1, round(width * n / total)) if n else ""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sub", default=DEFAULT_SUBS)
    ap.add_argument("--top", type=int, default=20, help="nb d'expressions a lister")
    a = ap.parse_args()

    subs = [s.strip() for s in a.sub.split(",") if s.strip()]
    posts, seen = [], set()
    calls = ok_calls = 0

    for si, sub in enumerate(subs):
        before = len(posts)
        for qi, query in enumerate(QUERIES):
            if si or qi:
                time.sleep(SLEEP)
            calls += 1
            got = fetch(sub, query)
            if got:
                ok_calls += 1
            for it in got:
                key = it["link"]
                if key in seen:
                    continue
                seen.add(key)
                it["sub"] = sub
                posts.append(it)
        print(f"r/{sub}: {len(posts) - before} fils uniques.")

    # 🔑 La couverture conditionne la lecture du reste. Une repartition calculee
    # sur 2 requetes sur 33 n'est pas une repartition, c'est un accident.
    cover = 100 * ok_calls / calls if calls else 0
    print(f"\nCouverture des appels: {ok_calls}/{calls} ({cover:.0f}%).")
    if cover < 60:
        print("🚨 COUVERTURE TROP FAIBLE: Reddit a limite le debit. Les comptages")
        print("   ci-dessous portent sur un echantillon non representatif.")
        print("   NE PAS en tirer de conclusion. Relancer dans quelques heures.")
    if not posts:
        print("\nAucun fil recupere.")
        print("⚠️ Ne PAS lire ce vide comme 'les gens ne parlent pas de logement'.")
        return

    print(f"{len(posts)} fils analyses au total.\n")

    # --- Themes -----------------------------------------------------------
    theme_hits = collections.Counter()
    theme_examples = collections.defaultdict(list)
    for p in posts:
        blob = f"{p['title']} {p['body']}"
        for name, pat in THEMES.items():
            if re.search(pat, blob, re.I):
                theme_hits[name] += 1
                if len(theme_examples[name]) < 3:
                    theme_examples[name].append(p["title"][:96])

    print("=" * 76)
    print("CE QUI BLOQUE, PAR FREQUENCE")
    print("=" * 76)
    for name, n in theme_hits.most_common():
        print(f"{n:4d}  {name:24s} {bar(n, len(posts))}")

    # --- Moment du parcours ----------------------------------------------
    stage_hits = collections.Counter()
    for p in posts:
        blob = f"{p['title']} {p['body']}"
        for name, pat in STAGE.items():
            if re.search(pat, blob, re.I):
                stage_hits[name] += 1
    print("\n" + "=" * 76)
    print("A QUEL MOMENT DE LEUR PARCOURS ILS PARLENT")
    print("=" * 76)
    for name, n in stage_hits.most_common():
        print(f"{n:4d}  {name:24s} {bar(n, len(posts))}")
    print("(un fil peut compter dans plusieurs lignes)")

    # --- Douleur ----------------------------------------------------------
    painful = [p for p in posts if re.search(PAIN, f"{p['title']} {p['body']}", re.I)]
    print(f"\n{len(painful)} fils sur {len(posts)} emploient un mot de detresse "
          f"({100*len(painful)//len(posts)}%). Les 8 plus recents:")
    for p in sorted(painful, key=lambda x: x["updated"], reverse=True)[:8]:
        print(f"  r/{p['sub']:16s} {p['title'][:88]}")

    # --- Vocabulaire reel -------------------------------------------------
    words = collections.Counter()
    bigrams = collections.Counter()
    for p in posts:
        toks = [w for w in re.findall(r"[a-z']{3,}", f"{p['title']} {p['body']}".lower())
                if w not in STOP]
        words.update(toks)
        bigrams.update(zip(toks, toks[1:]))
    print("\n" + "=" * 76)
    print("LEURS MOTS (pas les notres)")
    print("=" * 76)
    print("Expressions:")
    for (w1, w2), n in bigrams.most_common(a.top):
        print(f"  {n:4d}  {w1} {w2}")

    # --- Argent -----------------------------------------------------------
    amounts = []
    for p in posts:
        for m in MONEY.finditer(f"{p['title']} {p['body']}"):
            raw = (m.group(1) or m.group(2) or "").replace(",", "").replace(".", "")
            if raw.isdigit():
                v = int(raw)
                if 10_000 <= v <= 3_000_000:
                    amounts.append(v)
    if amounts:
        amounts.sort()
        med = amounts[len(amounts) // 2]
        print("\n" + "=" * 76)
        print("MONTANTS CITES")
        print("=" * 76)
        print(f"{len(amounts)} montants entre 10k et 3M JPY | median {med:,} | "
              f"min {amounts[0]:,} | max {amounts[-1]:,}")

    # --- Trace pour comparer dans le temps --------------------------------
    stamp = dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%d")
    out = os.path.join(HERE, "data", f"demand_listen_{stamp}.json")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8") as f:
        json.dump({
            "generated": dt.datetime.now(dt.timezone.utc).isoformat(),
            "subs": subs, "posts_analysed": len(posts),
            "themes": dict(theme_hits), "stages": dict(stage_hits),
            "painful_pct": round(100 * len(painful) / len(posts), 1),
            "top_bigrams": [{"phrase": f"{a_} {b_}", "n": n}
                            for (a_, b_), n in bigrams.most_common(60)],
            "amounts_median": (sorted(amounts)[len(amounts)//2] if amounts else None),
        }, f, ensure_ascii=False, indent=2)
    print(f"\nTrace ecrite: {out}")
    print("⚠️ Une passe isolee ne vaut rien. C'est la COMPARAISON entre passes qui")
    print("   dira si un sujet monte. Relancer toutes les 2 a 4 semaines.")


if __name__ == "__main__":
    main()
