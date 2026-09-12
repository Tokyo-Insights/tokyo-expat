#!/usr/bin/env python3
"""
reddit_japanlife_watch.py
Lecture SEULE des fils logement de r/japanlife (et subs voisins) via le flux RSS
public de Reddit (aucune auth, aucun cookie, aucun risque pour le compte).

+ FILE PERSISTANTE (data/reddit_housing_queue.json): chaque fil surface est
memorise avec un statut. Rien de bon n'est jamais perdu silencieusement.
Statuts: new (a traiter) / drafted (reponse redigee, pas encore postee) /
posted (poste) / skipped (hors filon) / expired (trop vieux, auto).

⚠️ Reddit limite tres fort le RSS: mesure le 12/09/2026, une requete passe puis tout
le reste prend un 429. Le script joue donc peu de mots-cles par passage, espaces d'une
minute, en ROTATION, et il DIT quand une requete a echoue. Une file qui ne bouge pas
peut vouloir dire "Reddit a refuse de repondre", jamais "personne ne parle logement".

Usage:
    python reddit_japanlife_watch.py                       # japanlife+movingtojapan, fetch
    python reddit_japanlife_watch.py --sub japanlife --days 4
    python reddit_japanlife_watch.py --queries 6 --sleep 90  # passage plus large, plus lent
    python reddit_japanlife_watch.py --queue               # file seule, SANS reseau
    python reddit_japanlife_watch.py --check               # scanne les fils drafted/posted:
                                                           #   auto-marque posted + remonte les reponses
    python reddit_japanlife_watch.py --mark 1v53c67 posted # forcer un statut

On LIT ici. On ne poste JAMAIS par script (presence humaine = Alessandro a la main).
"""
import re
import os
import sys
import html
import json
import time
import argparse
import datetime as dt
import xml.etree.ElementTree as ET

import requests
import urllib3
urllib3.disable_warnings()

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

ATOM = "{http://www.w3.org/2005/Atom}"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36")

HERE = os.path.dirname(os.path.abspath(__file__))
QUEUE_PATH = os.path.join(HERE, "data", "reddit_housing_queue.json")
EXPIRE_DAYS = 12
ACTIONABLE = ("new", "drafted")
DEFAULT_SUBS = "japanlife,movingtojapan"
USERNAME = "Salty-Technician4002"   # compte d'Alessandro (detection posts/reponses)

# Throttle Reddit, MESURE le 12/09/2026: a 1,5 s d'intervalle, la 1re requete passe
# (25 fils) et les 11 suivantes prennent un 429. Soit 1 requete utile sur 24 quand on
# balaie 12 mots-cles sur 2 subs, sans que rien ne le signale. D'ou:
#   - une pause d'une minute entre deux requetes,
#   - un seul reessai apres un 429,
#   - et surtout 3 mots-cles par passage au lieu de 12, pris en ROTATION.
SLEEP = 60.0                         # pause entre deux requetes
RETRY_WAIT = 90.0                    # attente avant le reessai apres un 429
MAX_TRIES = 2                        # tentatives par requete
QUERIES_PER_RUN = 3                  # mots-cles joues par passage (rotation persistante)

QUERIES = [
    "apartment", "guarantor", "rejected foreigner", "housing",
    "landlord", "key money", "rent contract", "moving apartment",
    "share house", "real estate agency", "deposit refund", "leaving apartment",
]

# Inclusion: le fil parle logement/bail/location
HOUSING = re.compile(
    r"apart|apato|mansion|\brent|rental|guarantor|hosho|landlord|lease|"
    r"housing|deposit|key\s*money|reikin|shikikin|agency|real estate|"
    r"chintai|share ?house|gaijin house|leopalace|\bUR\b|evict|tenant|"
    r"move (in|out)|moving|renew|contract",
    re.I,
)
# Veto: sujets "dans un appart" mais hors filon (bruit recurrent). Reduit le tri manuel.
EXCLUDE = re.compile(
    r"cockroach|roach|\bpest\b|water ?filter|\bwifi\b|\bvdsl\b|internet|"
    r"\bsmell\b|washlet|move-?in gift|seishain|\bsalary\b|heat ?tip|\baircon\b",
    re.I,
)
TAG = re.compile(r"<[^>]+>")
ID_RE = re.compile(r"/comments/([a-z0-9]+)/", re.I)


def strip_html(s):
    s = html.unescape(s or "")
    return re.sub(r"\s+", " ", TAG.sub(" ", s)).strip()


def thread_id(url):
    m = ID_RE.search(url or "")
    return m.group(1) if m else url


def now_utc():
    return dt.datetime.now(dt.timezone.utc)


def parse_dt(s):
    try:
        return dt.datetime.fromisoformat((s or "").replace("Z", "+00:00"))
    except Exception:
        return None


def age_days(iso):
    d = parse_dt(iso)
    return max(0, (now_utc() - d).days) if d else None


def load_queue():
    try:
        with open(QUEUE_PATH, encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {"threads": {}}


def save_queue(q):
    os.makedirs(os.path.dirname(QUEUE_PATH), exist_ok=True)
    with open(QUEUE_PATH, "w", encoding="utf-8") as f:
        json.dump(q, f, ensure_ascii=False, indent=2)


def expire_old(q):
    for t in q["threads"].values():
        if t.get("status") in ACTIONABLE:
            a = age_days(t.get("first_seen", ""))
            if a is not None and a > EXPIRE_DAYS:
                t["status"] = "expired"


def _get_rss(url, tries=MAX_TRIES):
    """Retourne (root, err): err vaut None si la requete a abouti, sinon la raison.
    Un echec n'est JAMAIS avale en silence, sinon un 429 ressemble a 'rien de neuf'."""
    err = "jamais tente"
    for attempt in range(1, tries + 1):
        try:
            r = requests.get(url, headers={"User-Agent": UA}, verify=False, timeout=25)
        except Exception as ex:
            err = type(ex).__name__
        else:
            if r.status_code == 200:
                try:
                    return ET.fromstring(r.content), None
                except ET.ParseError as ex:
                    return None, f"XML illisible ({ex})"
            err = f"HTTP {r.status_code}"
            if r.status_code != 429:
                break
        if attempt < tries:
            print(f"      {err}, reessai dans {RETRY_WAIT:.0f}s")
            time.sleep(RETRY_WAIT)
    return None, err


def fetch_search(sub, query, max_age_days=None):
    """Retourne (fils, err). Les fils plus vieux que max_age_days sont ecartes:
    au-dela de quelques jours un fil ne recoit plus de commentaires."""
    url = (f"https://www.reddit.com/r/{sub}/search.rss"
           f"?q={requests.utils.quote(query)}&restrict_sr=on&sort=new&t=month")
    root, err = _get_rss(url)
    if root is None:
        return [], err
    cutoff = now_utc() - dt.timedelta(days=max_age_days) if max_age_days else None
    out = []
    for e in root.findall(f"{ATOM}entry"):
        published = (e.findtext(f"{ATOM}published")
                     or e.findtext(f"{ATOM}updated") or "").strip()
        d = parse_dt(published)
        if cutoff and d and d < cutoff:
            continue
        link_el = e.find(f"{ATOM}link")
        link = link_el.get("href") if link_el is not None else ""
        a = e.find(f"{ATOM}author")
        author = (a.findtext(f"{ATOM}name") or "").strip() if a is not None else ""
        out.append({
            "title": (e.findtext(f"{ATOM}title") or "").strip(),
            "link": link,
            "author": author,
            "published": published,
            "body": strip_html(e.findtext(f"{ATOM}content") or ""),
        })
    return out, None


def fetch_comments(sub, tid):
    """Flux RSS des commentaires d'un fil -> liste {author, updated, snippet, link}."""
    root, err = _get_rss(f"https://www.reddit.com/r/{sub}/comments/{tid}/.rss?sort=new")
    if root is None:
        print(f"      lecture des commentaires impossible ({err})")
        return None  # None = echec reseau (distinct de [] = fil sans commentaire)
    out = []
    for e in root.findall(f"{ATOM}entry"):
        a = e.find(f"{ATOM}author")
        author = (a.findtext(f"{ATOM}name") or "").strip() if a is not None else ""
        author = author.lstrip("/").replace("u/", "")
        link_el = e.find(f"{ATOM}link")
        out.append({
            "author": author,
            "updated": e.findtext(f"{ATOM}updated") or "",
            "snippet": strip_html(e.findtext(f"{ATOM}content") or "")[:200],
            "link": link_el.get("href") if link_el is not None else "",
        })
    return out


def print_actionable(q, subs=None):
    rows = [(tid, t) for tid, t in q["threads"].items()
            if t.get("status") in ACTIONABLE
            and (not subs or t.get("sub") in subs)]
    rows.sort(key=lambda x: x[1].get("published") or x[1].get("first_seen", ""),
              reverse=True)
    if not rows:
        print("File: aucun fil ACTIONNABLE (new/drafted) en attente.")
        return
    fresh = sum(1 for _, t in rows
                if (age_days(t.get("published") or t.get("first_seen", "")) or 99) <= 3)
    print(f"\n=== FILE ACTIONNABLE : {len(rows)} fils (new/drafted), "
          f"dont {fresh} de moins de 3 jours ===")
    if not fresh:
        print("    Aucun fil frais: repondre a un fil de plus de 3 jours ne sert a rien,")
        print("    les commentaires n'y sont plus lus. Ce n'est PAS une file de travail.")
    for tid, t in rows:
        # age REEL du fil (date de publication), pas la date ou le script l'a vu:
        # les deux ont longtemps ete confondues a l'affichage.
        a = age_days(t.get("published") or t.get("first_seen", ""))
        age = f"publie il y a {a}j" if a is not None else ""
        if t.get("published") is None:
            v = age_days(t.get("first_seen", ""))
            age = f"vu il y a {v}j (date de publication inconnue)" if v is not None else ""
        flag = "[DRAFTED, a poster]" if t["status"] == "drafted" else "[NEW]"
        print(f"\n{flag} ({tid}) r/{t.get('sub','?')}  {age}")
        print(f"  {t.get('title','')}")
        print(f"  par u/{t.get('author','')}  |  {t.get('link','')}")
        snip = (t.get("body") or "")[:220]
        if snip:
            print(f"  {snip}...")


def do_check(q, sleep=SLEEP):
    """Scanne les fils drafted/posted: auto-marque posted si Alessandro a commente,
    et remonte les reponses des autres (candidats a follow-up)."""
    targets = [(tid, t) for tid, t in q["threads"].items()
               if t.get("status") in ("drafted", "posted")]
    if not targets:
        print("Aucun fil drafted/posted a verifier.")
        return
    print(f"=== CHECK : {len(targets)} fils drafted/posted ===")
    for i, (tid, t) in enumerate(targets):
        if i:
            time.sleep(sleep)
        comments = fetch_comments(t.get("sub", "japanlife"), tid)
        if comments is None:
            print(f"\n({tid}) {t.get('title','')}\n  [reseau limite, reessayer]")
            continue
        mine = [c for c in comments if c["author"].lower() == USERNAME.lower()]
        others = [c for c in comments if c["author"].lower() != USERNAME.lower()]

        if mine and t["status"] == "drafted":
            t["status"] = "posted"
            print(f"\n({tid}) {t.get('title','')}\n  -> AUTO-DETECTE poste, statut drafted -> posted")
        elif t["status"] == "drafted":
            print(f"\n({tid}) {t.get('title','')}\n  [pas encore vu ta reponse dans le flux]")
        else:
            print(f"\n({tid}) {t.get('title','')}")

        # Reponses posterieures a la tienne (candidats follow-up)
        cand = others
        if mine:
            mt = max((parse_dt(c["updated"]) for c in mine
                      if parse_dt(c["updated"])), default=None)
            if mt:
                cand = [c for c in others if (parse_dt(c["updated"]) or now_utc()) > mt]
        if cand:
            print(f"  {len(cand)} reponse(s) posterieure(s) a verifier:")
            for c in cand[:5]:
                print(f"    - u/{c['author']}: {c['snippet']}")
        else:
            print("  Aucune reponse posterieure detectee.")
    save_queue(q)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sub", default=DEFAULT_SUBS,
                    help="sub(s) separes par virgule (defaut: japanlife,movingtojapan)")
    ap.add_argument("--days", type=int, default=7,
                    help="ne garder que les fils publies dans les N derniers jours "
                         "(etait ignore avant le 12/09/2026)")
    ap.add_argument("--queries", type=int, default=QUERIES_PER_RUN,
                    help=f"mots-cles joues par passage, en rotation "
                         f"(defaut {QUERIES_PER_RUN} sur {len(QUERIES)})")
    ap.add_argument("--sleep", type=float, default=SLEEP,
                    help=f"pause entre deux requetes, en secondes (defaut {SLEEP:.0f})")
    ap.add_argument("--queue", action="store_true", help="afficher la file sans reseau")
    ap.add_argument("--check", action="store_true",
                    help="scanner drafted/posted: auto-marque posted + remonte les reponses")
    ap.add_argument("--mark", nargs=2, metavar=("ID", "STATUS"))
    args = ap.parse_args()

    q = load_queue()

    if args.mark:
        tid, status = args.mark
        if tid in q["threads"]:
            q["threads"][tid]["status"] = status
            save_queue(q)
            print(f"OK: {tid} -> {status}")
        else:
            print(f"Introuvable dans la file: {tid}")
        return

    expire_old(q)

    if args.check:
        do_check(q, args.sleep)
        return

    if args.queue:
        save_queue(q)
        print_actionable(q)
        return

    subs = [s.strip() for s in args.sub.split(",") if s.strip()]

    # Rotation: on ne joue que quelques mots-cles par passage, en repartant la ou
    # le passage precedent s'etait arrete. Les 12 mots-cles sont couverts en 4 passages
    # au lieu d'etre tous refuses en un seul.
    meta = q.setdefault("meta", {})
    n = max(1, min(args.queries, len(QUERIES)))
    cursor = int(meta.get("query_cursor", 0)) % len(QUERIES)
    picked = [QUERIES[(cursor + i) % len(QUERIES)] for i in range(n)]
    planned = len(picked) * len(subs)
    print(f"Mots-cles de ce passage ({n}/{len(QUERIES)}, rotation): {', '.join(picked)}")
    print(f"Fenetre: {args.days} jours. {planned} requetes espacees de {args.sleep:.0f}s.\n")

    total_seen, added, ok_calls = 0, 0, 0
    failures = []
    first = True
    for sub in subs:
        seen_ids = set()
        for query in picked:
            if not first:
                time.sleep(args.sleep)
            first = False
            items, err = fetch_search(sub, query, args.days)
            if err:
                failures.append(f"r/{sub} '{query}': {err}")
                print(f"  r/{sub} '{query}': ECHEC ({err})")
                continue
            ok_calls += 1
            print(f"  r/{sub} '{query}': {len(items)} fils dans la fenetre")
            for it in items:
                tid = thread_id(it["link"])
                if tid in seen_ids:
                    continue
                seen_ids.add(tid)
                blob = f"{it['title']} {it['body']}"
                if not HOUSING.search(blob) or EXCLUDE.search(blob):
                    continue
                if tid in q["threads"]:
                    q["threads"][tid]["last_seen"] = now_utc().isoformat()
                    q["threads"][tid].setdefault("published", it["published"])
                else:
                    q["threads"][tid] = {
                        "title": it["title"], "link": it["link"],
                        "author": it["author"], "body": it["body"][:400],
                        "sub": sub, "status": "new",
                        "published": it["published"],
                        "first_seen": now_utc().isoformat(),
                        "last_seen": now_utc().isoformat(),
                    }
                    added += 1
        total_seen += len(seen_ids)
    meta["query_cursor"] = (cursor + n) % len(QUERIES)
    meta["last_run"] = now_utc().isoformat()
    meta["last_run_ok_calls"] = ok_calls
    meta["last_run_planned_calls"] = planned
    save_queue(q)

    print()
    if ok_calls == 0:
        print(f"🚨 AUCUNE des {planned} requetes n'a abouti: LE SCAN N'A PAS EU LIEU.")
        print("   Ne pas lire la file ci-dessous comme 'rien de neuf sur Reddit':")
        print("   on n'a rien demande a Reddit qui ait recu une reponse.")
        for f in failures:
            print(f"   - {f}")
    elif failures:
        print(f"⚠️ SCAN PARTIEL: {ok_calls}/{planned} requetes ont abouti.")
        for f in failures:
            print(f"   - {f}")
        print(f"   {total_seen} fils vus, {added} NOUVEAUX ajoutes a la file.")
    else:
        print(f"✅ Scan complet: {planned}/{planned} requetes, "
              f"{total_seen} fils vus, {added} NOUVEAUX ajoutes a la file.")
    print_actionable(q, subs=subs)


if __name__ == "__main__":
    main()
