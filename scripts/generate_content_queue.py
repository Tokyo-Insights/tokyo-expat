"""
generate_content_queue.py -- Genere les queues de posts FB + LI depuis lib/blog.ts
90 articles -> 90 posts FB + 90 posts LI

Run:
  python scripts/generate_content_queue.py           # genere et sauvegarde
  python scripts/generate_content_queue.py --preview 5  # affiche les 5 premiers
  python scripts/generate_content_queue.py --stats   # compte articles restants
"""

import re
import json
import datetime
import sys
import io
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SCRIPT_DIR = Path(__file__).parent
BLOG_TS = SCRIPT_DIR.parent / "lib" / "blog.ts"
DATA_DIR = SCRIPT_DIR / "data"
QUEUE_FB = DATA_DIR / "content_queue_fb.json"
QUEUE_LI = DATA_DIR / "content_queue_li.json"

BASE_URL = "https://www.tokyo-expat.com"

HASHTAG_MAP = [
    ("apartment",     "#TokyoApartment"),
    ("appartement",   "#TokyoApartment"),
    ("share-house",   "#ShareHouseTokyo"),
    ("share_house",   "#ShareHouseTokyo"),
    ("visa",          "#JapanVisa"),
    ("nomad",         "#DigitalNomad"),
    ("nomade",        "#DigitalNomad"),
    ("student",       "#StudentTokyo"),
    ("etudiant",      "#StudentTokyo"),
    ("family",        "#FamilyExpat"),
    ("famille",       "#FamilyExpat"),
    ("bank",          "#JapanBanking"),
    ("banque",        "#JapanBanking"),
    ("cost",          "#CostOfLiving"),
    ("cout",          "#CostOfLiving"),
    ("transport",     "#TokyoTransport"),
    ("sim",           "#JapanSIM"),
    ("guarantor",     "#JapanRenting"),
    ("garant",        "#JapanRenting"),
    ("furnished",     "#FurnishedTokyo"),
    ("meuble",        "#FurnishedTokyo"),
    ("work",          "#WorkInJapan"),
    ("travail",       "#WorkInJapan"),
    ("insurance",     "#JapanInsurance"),
    ("assurance",     "#JapanInsurance"),
    ("driving",       "#JapanDriving"),
    ("permis",        "#JapanDriving"),
    ("moving",        "#MovingToJapan"),
    ("demenag",       "#MovingToJapan"),
    ("checklist",     "#ExpatChecklist"),
    ("neighbourhood", "#TokyoNeighbourhoods"),
    ("quartier",      "#TokyoNeighbourhoods"),
    ("pet",           "#PetsJapan"),
    ("animal",        "#PetsJapan"),
    ("pvt",           "#WorkingHolidayJapan"),
    ("holiday",       "#WorkingHolidayJapan"),
    ("jiko-bukken",   "#TokyoDeals"),
    ("logement",      "#LogementTokyo"),
]

BASE_TAGS_EN = "#TokyoExpat #JapanExpat #MovingToJapan"
BASE_TAGS_FR = "#TokyoExpat #JaponExpatrie #VivreAuJapon"


def slug_to_hashtags(slug: str, locale: str) -> str:
    base = BASE_TAGS_EN if locale == "en" else BASE_TAGS_FR
    extra = []
    for key, tag in HASHTAG_MAP:
        if key in slug and tag not in base and tag not in extra:
            extra.append(tag)
            if len(extra) >= 2:
                break
    return base + (" " + " ".join(extra) if extra else "")


def parse_blog_ts():
    """
    Parse lib/blog.ts et retourne (slug, locale, title, description) pour chaque article.
    Gere les apostrophes echappees (\') dans les strings TypeScript.
    """
    text = BLOG_TS.read_text(encoding="utf-8")

    # Regex pour strings TS avec apostrophes echappees
    STR = r"'((?:[^'\\]|\\.)*)'"

    articles = []
    # Chaque article commence par 'slug:'
    blocks = re.split(r"\n\s*\{\s*\n", text)

    for block in blocks:
        slug_m   = re.search(r"slug:\s*" + STR, block)
        locale_m = re.search(r"locale:\s*" + STR, block)
        title_m  = re.search(r"title:\s*" + STR, block)
        desc_m   = re.search(r"description:\s*" + STR, block)

        if not (slug_m and locale_m and title_m and desc_m):
            continue
        locale = locale_m.group(1)
        if locale not in ("fr", "en"):
            continue

        articles.append({
            "slug":        slug_m.group(1).replace("\\'", "'"),
            "locale":      locale,
            "title":       title_m.group(1).replace("\\'", "'"),
            "description": desc_m.group(1).replace("\\'", "'"),
        })

    return articles


def make_fb_text(a: dict) -> str:
    url = f"{BASE_URL}/{a['locale']}/blog/{a['slug']}"
    tags = slug_to_hashtags(a["slug"], a["locale"])
    return f"{a['title']}\n\n{a['description']}\n\nFull guide: {url}\n\n{tags}"


def make_li_text(a: dict) -> str:
    url = f"{BASE_URL}/{a['locale']}/blog/{a['slug']}"
    return f"{a['title']}\n\n{a['description']}\n\n{url}"


def build_queue(articles, text_fn):
    return [
        {
            "slug":        a["slug"],
            "locale":      a["locale"],
            "title":       a["title"],
            "text":        text_fn(a),
            "posted":      False,
            "posted_date": None,
        }
        for a in articles
    ]


def merge_with_existing(new_queue: list, existing_path: Path) -> list:
    """Preserve le statut posted des items deja dans la queue."""
    if not existing_path.exists():
        return new_queue
    try:
        existing = json.loads(existing_path.read_text(encoding="utf-8"))
        by_slug = {item["slug"]: item for item in existing.get("queue", [])}
        for item in new_queue:
            if item["slug"] in by_slug:
                item["posted"]      = by_slug[item["slug"]]["posted"]
                item["posted_date"] = by_slug[item["slug"]]["posted_date"]
    except Exception:
        pass
    return new_queue


def save_queue(path: Path, queue: list):
    posted = sum(1 for i in queue if i["posted"])
    data = {
        "generated_at": datetime.date.today().isoformat(),
        "total":         len(queue),
        "posted_count":  posted,
        "remaining":     len(queue) - posted,
        "queue":         queue,
    }
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    return data


def main():
    DATA_DIR.mkdir(exist_ok=True)
    args = sys.argv[1:]

    preview_n = 0
    if "--preview" in args:
        idx = args.index("--preview")
        try:
            preview_n = int(args[idx + 1])
        except (IndexError, ValueError):
            preview_n = 3

    stats_only = "--stats" in args

    print(f"Parsing {BLOG_TS}...")
    articles = parse_blog_ts()
    print(f"  {len(articles)} articles trouves ({sum(1 for a in articles if a['locale']=='fr')} FR, {sum(1 for a in articles if a['locale']=='en')} EN)")

    if stats_only:
        for path, label in [(QUEUE_FB, "FB"), (QUEUE_LI, "LI")]:
            if path.exists():
                data = json.loads(path.read_text(encoding="utf-8"))
                r = data.get("remaining", data["total"] - data["posted_count"])
                weeks = r
                print(f"  Queue {label}: {r}/{data['total']} restants (~{weeks} semaines de posts)")
            else:
                print(f"  Queue {label}: pas encore generee")
        return

    fb_queue = merge_with_existing(build_queue(articles, make_fb_text), QUEUE_FB)
    li_queue = merge_with_existing(build_queue(articles, make_li_text), QUEUE_LI)

    if preview_n:
        print(f"\n--- FB preview ({preview_n} premiers) ---")
        for item in fb_queue[:preview_n]:
            print(f"\n[{item['locale'].upper()}] {item['slug']}")
            print(item["text"])
            print("-" * 60)
        return

    fb_data = save_queue(QUEUE_FB, fb_queue)
    li_data = save_queue(QUEUE_LI, li_queue)

    print(f"\nQueue FB : {fb_data['remaining']}/{fb_data['total']} posts restants")
    print(f"Queue LI : {li_data['remaining']}/{li_data['total']} posts restants")
    cadence = fb_data["remaining"]
    print(f"\nA 1 post/semaine : {cadence} semaines de contenu FB (~{cadence // 12} ans)")
    print(f"\nFichiers sauvegardes :")
    print(f"  {QUEUE_FB}")
    print(f"  {QUEUE_LI}")
    print(f"\nPour regenerer apres ajout d'articles : relancer ce script.")


if __name__ == "__main__":
    main()
