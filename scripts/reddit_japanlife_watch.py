#!/usr/bin/env python3
"""
reddit_japanlife_watch.py
Lecture SEULE des fils logement de r/japanlife (et subs voisins) via le flux RSS
public de Reddit (aucune auth, aucun cookie, aucun risque pour le compte).

+ FILE PERSISTANTE (data/reddit_housing_queue.json): chaque fil surface est
memorise avec un statut. Rien de bon n'est jamais perdu silencieusement.
Statuts: new (a traiter) / drafted (reponse redigee, pas encore postee) /
posted (poste) / skipped (hors filon) / expired (trop vieux, auto).

Usage:
    python reddit_japanlife_watch.py                       # japanlife+movingtojapan, fetch
    python reddit_japanlife_watch.py --sub japanlife --days 4
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
SLEEP = 1.5                          # pause polie entre requetes (Reddit RSS throttle)

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


def _get_rss(url):
    try:
        r = requests.get(url, headers={"User-Agent": UA}, verify=False, timeout=25)
        if r.status_code != 200:
            return None
        return ET.fromstring(r.content)
    except Exception:
        return None


def fetch_search(sub, query):
    url = (f"https://www.reddit.com/r/{sub}/search.rss"
           f"?q={requests.utils.quote(query)}&restrict_sr=on&sort=new&t=month")
    root = _get_rss(url)
    if root is None:
        return []
    out = []
    for e in root.findall(f"{ATOM}entry"):
        link_el = e.find(f"{ATOM}link")
        link = link_el.get("href") if link_el is not None else ""
        a = e.find(f"{ATOM}author")
        author = (a.findtext(f"{ATOM}name") or "").strip() if a is not None else ""
        out.append({
            "title": (e.findtext(f"{ATOM}title") or "").strip(),
            "link": link,
            "author": author,
            "body": strip_html(e.findtext(f"{ATOM}content") or ""),
        })
    return out


def fetch_comments(sub, tid):
    """Flux RSS des commentaires d'un fil -> liste {author, updated, snippet, link}."""
    root = _get_rss(f"https://www.reddit.com/r/{sub}/comments/{tid}/.rss?sort=new")
    if root is None:
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
    rows.sort(key=lambda x: x[1].get("first_seen", ""), reverse=True)
    if not rows:
        print("File: aucun fil ACTIONNABLE (new/drafted) en attente.")
        return
    print(f"\n=== FILE ACTIONNABLE : {len(rows)} fils (new/drafted) ===")
    for tid, t in rows:
        a = age_days(t.get("first_seen", ""))
        age = f"vu il y a {a}j" if a is not None else ""
        flag = "[DRAFTED, a poster]" if t["status"] == "drafted" else "[NEW]"
        print(f"\n{flag} ({tid}) r/{t.get('sub','?')}  {age}")
        print(f"  {t.get('title','')}")
        print(f"  par u/{t.get('author','')}  |  {t.get('link','')}")
        snip = (t.get("body") or "")[:220]
        if snip:
            print(f"  {snip}...")


def do_check(q):
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
            time.sleep(SLEEP)
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
    ap.add_argument("--days", type=int, default=7)
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
        do_check(q)
        return

    if args.queue:
        save_queue(q)
        print_actionable(q)
        return

    subs = [s.strip() for s in args.sub.split(",") if s.strip()]
    total_seen, added = 0, 0
    for si, sub in enumerate(subs):
        seen_ids = set()
        for qi, query in enumerate(QUERIES):
            if si or qi:
                time.sleep(SLEEP)
            for it in fetch_search(sub, query):
                tid = thread_id(it["link"])
                if tid in seen_ids:
                    continue
                seen_ids.add(tid)
                blob = f"{it['title']} {it['body']}"
                if not HOUSING.search(blob) or EXCLUDE.search(blob):
                    continue
                if tid in q["threads"]:
                    q["threads"][tid]["last_seen"] = now_utc().isoformat()
                else:
                    q["threads"][tid] = {
                        "title": it["title"], "link": it["link"],
                        "author": it["author"], "body": it["body"][:400],
                        "sub": sub, "status": "new",
                        "first_seen": now_utc().isoformat(),
                        "last_seen": now_utc().isoformat(),
                    }
                    added += 1
        total_seen += len(seen_ids)
        print(f"r/{sub}: {len(seen_ids)} fils vus.")
    save_queue(q)

    if not total_seen:
        print("Aucun fil recupere (Reddit RSS a peut-etre limite; relancer plus "
              "tard). La file existante est preservee.")
    else:
        print(f"Total: {total_seen} fils vus, {added} NOUVEAUX ajoutes a la file.")
    print_actionable(q, subs=subs)


if __name__ == "__main__":
    main()
