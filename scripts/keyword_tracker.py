"""
keyword_tracker.py — Tokyo Expat SERP Intelligence
Track les positions d'une liste de requetes (FR+EN) via DuckDuckGo.
Stocke l'historique en SQLite. Envoie rapport Telegram hebdo.

⚠️ LA LISTE SUIVIE DOIT VENIR DE LA MESURE, PAS DE L'INTUITION (pose le 18/09/2026).
Les 30 mots-cles d'origine avaient ete imagines. Croises avec la GSC, 29 sur 30
n'avaient AUCUNE impression: le tracker surveillait une carte qui n'existe pas.
Lancer `python scripts/keyword_tracker.py --audit` pour confronter la liste suivie
a la GSC courante. A relancer quand la selection date de plus d'un trimestre.

⚠️ CE SCRIPT NE MESURE PAS GOOGLE (constate le 09/09/2026).
DuckDuckGo est alimente par Bing. Le tracker donnait tokyo-expat.com #1 sur 15
mots-cles le 09/09, alors que GSC place la meme page en position 7,4 sur
"furnished apartment tokyo no guarantor" et tout le cluster meuble en position 29.
Les deux mesures sont justes: elles portent sur des moteurs differents.
Utile comme proxy Bing (Bing = ~2x nos clics Google). Jamais comme position Google.
La verite Google est dans GSC: scripts/data/gsc_latest.json (476 requetes).

Deps: pip install duckduckgo-search
Run: python scripts/keyword_tracker.py [--report]
"""

import sqlite3
import json
import time
import datetime
import sys
import os
import random
from pathlib import Path

try:
    from ddgs import DDGS
except ImportError:
    print("Install: pip install duckduckgo-search")
    sys.exit(1)

import io
import requests
import urllib3

# Windows UTF-8 console fix
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

# ── CONFIG ────────────────────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
DB_FILE = DATA_DIR / "keyword_rankings.db"

OUR_DOMAIN = "tokyo-expat.com"

# ── COMPETITORS à tracker ─────────────────────────────────────────────────────
COMPETITOR_DOMAINS = [
    "remoters.io",
    "housing.gaijinpot.com",
    "sakura-house.com",
    "tokyocheapo.com",
    "gaijinpot.com",
    "oakhouse.jp",
    "japan-guide.com",
]

# ── KEYWORDS SUIVIS ───────────────────────────────────────────────────────────
# 🚨 REMPLACES INTEGRALEMENT LE 18/09/2026. Les 30 mots-cles precedents avaient ete
# ECRITS A LA MAIN, par intuition de ce que les gens "devraient" taper. Mesure faite
# ce jour en croisant la liste avec les 481 requetes de la GSC (19/08 -> 15/09):
#
#     29 des 30 mots-cles suivis avaient ZERO impression sur Google. Un seul existait
#     vraiment: "gaijin house tokyo" (109 impressions, position 5,4).
#
# Le tracker surveillait donc une carte imaginaire, et le rapport hebdo annoncait
# chaque semaine "18 mots-cles en position 1" sans qu'aucun ne soit tape par personne.
# ⚠️ Rappel: zero impression ne prouve pas qu'on est mal classe, ca veut dire que la
# requete n'est pas tapee. Le defaut etait le CHOIX des mots-cles, pas le classement.
#
# NOUVELLE REGLE: un mot-cle n'entre ici que s'il a des impressions REELLES dans la
# GSC. Le champ `gsc_impr` est le releve du jour de la selection: il vieillit, c'est
# voulu, et `--audit` le confronte a la GSC courante pour dire quand la liste a rance.
#
# ⚠️ Le `cluster` n'est PAS stocke ici. Il est demande a cluster_verdicts.verdict() au
# moment du rapport, pour qu'il existe UNE seule carte page 1 et pas une copie qui
# derive. C'est la lecon du 17/09: une analyse juste recopiee a la main se perime.
#
# `role` dit pourquoi on suit la requete, et c'est ce que le rapport doit lire:
#   gisement  = ouvert ET deja des clics -> c'est la qu'on investit
#   carte     = volume reel, page 1 JAMAIS regardee -> a cartographier avant d'ecrire
#   temoin    = cluster ferme: on ne joue pas, on regarde si la fermeture se leve
#   concurrent = marque d'un concurrent, pour situer sa visibilite
KEYWORDS_SOURCE = "GSC 2026-08-19 -> 2026-09-15 (481 requetes), selection du 18/09/2026"

KEYWORDS = [
    # ── GISEMENT: jiko bukken. 7 des 8 requetes qui produisent un clic sur tout le
    # site sont ici. C'est le seul cluster a la fois ouvert et deja converti.
    {"kw": "jiko bukken", "lang": "en", "priority": "high", "role": "gisement", "gsc_impr": 240},
    {"kw": "jiko bukken for sale", "lang": "en", "priority": "high", "role": "gisement", "gsc_impr": 61},
    {"kw": "jikobukken map", "lang": "en", "priority": "high", "role": "gisement", "gsc_impr": 176},
    {"kw": "jiko bukken map google maps", "lang": "en", "priority": "medium", "role": "gisement", "gsc_impr": 33},
    {"kw": "jiko bukken tokyo", "lang": "en", "priority": "medium", "role": "gisement", "gsc_impr": 63},
    {"kw": "jiko bukken japan", "lang": "en", "priority": "low", "role": "gisement", "gsc_impr": 21},

    # ── A CARTOGRAPHIER: du volume reel, et personne n'a jamais regarde leur page 1.
    # "inconnu" n'est pas un feu vert, c'est une page 1 a ouvrir dans un navigateur.
    {"kw": "no guarantor apartments tokyo", "lang": "en", "priority": "high", "role": "carte", "gsc_impr": 442},
    {"kw": "tokyo furnished", "lang": "en", "priority": "medium", "role": "carte", "gsc_impr": 348},
    # Grappe ETUDIANT: ~2 000 impressions cumulees, positions 29-40, zero clic, et
    # aucune page 1 cartographiee. Saisonnier: l'entree d'avril 2027 se joue jusqu'a
    # fin octobre 2026 (cf reference_student_housing_calendar_japan).
    {"kw": "rental for international students in tokyo", "lang": "en", "priority": "high", "role": "carte", "gsc_impr": 204},
    {"kw": "tokyo apartments for students", "lang": "en", "priority": "high", "role": "carte", "gsc_impr": 160},
    {"kw": "student accommodation tokyo", "lang": "en", "priority": "high", "role": "carte", "gsc_impr": 153},
    {"kw": "student housing tokyo", "lang": "en", "priority": "medium", "role": "carte", "gsc_impr": 122},
    {"kw": "dormitory for international students tokyo", "lang": "en", "priority": "medium", "role": "carte", "gsc_impr": 104},

    # ── TEMOINS de clusters fermes. ⛔ NE PAS y investir d'article: c'est le code
    # (cluster_verdicts) qui le dit, ne pas le contredire a la main. On les suit pour
    # voir si la fermeture se leve, pas pour la contourner.
    # 📅 "cheap gaijin house in tokyo" est LE temoin a relire le 05/10: position 4,6
    # avec 704 impressions et zero clic, un apercu IA repond au-dessus.
    {"kw": "cheap gaijin house in tokyo", "lang": "en", "priority": "high", "role": "temoin", "gsc_impr": 704},
    {"kw": "tokyo gaijin house", "lang": "en", "priority": "high", "role": "temoin", "gsc_impr": 709},
    {"kw": "gaijin house tokyo", "lang": "en", "priority": "medium", "role": "temoin", "gsc_impr": 109},
    {"kw": "expat apartments tokyo", "lang": "en", "priority": "medium", "role": "temoin", "gsc_impr": 400},
    {"kw": "furnished apartments tokyo", "lang": "en", "priority": "medium", "role": "temoin", "gsc_impr": 205},

    # ── CONCURRENT: situer Oak House, qu'on voit aussi passer dans competitor_watch.
    {"kw": "oak house tokyo", "lang": "en", "priority": "low", "role": "concurrent", "gsc_impr": 265},
    {"kw": "oak house japan", "lang": "en", "priority": "low", "role": "concurrent", "gsc_impr": 184},

    # ── FILON FRANCAIS (levier n2 de la doctrine). 44 requetes FR portent 1 775
    # impressions et zero clic. ⚠️ Beaucoup ont une syntaxe de traduction automatique
    # ("partager la maison"): les garder TELLES QUELLES, c'est la forme reellement
    # tapee, pas celle qu'on aurait ecrite.
    {"kw": "appartement social tokyo", "lang": "fr", "priority": "high", "role": "gisement", "gsc_impr": 66},
    {"kw": "appartements à tokyo pour les étrangers", "lang": "fr", "priority": "high", "role": "gisement", "gsc_impr": 57},
    {"kw": "prix location appartement tokyo", "lang": "fr", "priority": "high", "role": "gisement", "gsc_impr": 56},
    {"kw": "loyer appartement tokyo", "lang": "fr", "priority": "medium", "role": "gisement", "gsc_impr": 54},
    {"kw": "appartements meublés tokyo", "lang": "fr", "priority": "medium", "role": "gisement", "gsc_impr": 50},
    {"kw": "sharehouse tokyo pour les étudiants internationaux", "lang": "fr", "priority": "high", "role": "carte", "gsc_impr": 58},
    {"kw": "dortoir pour les étudiants internationaux tokyo", "lang": "fr", "priority": "medium", "role": "carte", "gsc_impr": 50},
    {"kw": "hébergement étudiant tokyo", "lang": "fr", "priority": "medium", "role": "carte", "gsc_impr": 49},
    {"kw": "logement étudiant tokyo", "lang": "fr", "priority": "medium", "role": "carte", "gsc_impr": 34},
]

# ── DB ────────────────────────────────────────────────────────────────────────

def init_db():
    DATA_DIR.mkdir(exist_ok=True)
    conn = sqlite3.connect(DB_FILE)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS rankings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            keyword TEXT,
            lang TEXT,
            domain TEXT,
            position INTEGER,
            url TEXT
        )
    """)
    conn.execute("CREATE INDEX IF NOT EXISTS idx_date ON rankings(date)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_kw ON rankings(keyword)")
    conn.commit()
    return conn


def save_result(conn, date: str, keyword: str, lang: str, domain: str, position: int, url: str):
    conn.execute(
        "INSERT INTO rankings (date, keyword, lang, domain, position, url) VALUES (?,?,?,?,?,?)",
        (date, keyword, lang, domain, position, url),
    )


def get_previous(conn, domain: str, days: int = 7) -> dict:
    """Récupère les positions d'il y a N jours pour un domaine."""
    past = (datetime.date.today() - datetime.timedelta(days=days)).isoformat()
    rows = conn.execute(
        "SELECT keyword, position FROM rankings WHERE domain=? AND date>=? ORDER BY date ASC",
        (domain, past),
    ).fetchall()
    return {row[0]: row[1] for row in rows}

# ── SERP SEARCH ───────────────────────────────────────────────────────────────

def search_ddg(keyword: str, max_results: int = 20) -> list[dict]:
    """Cherche via DuckDuckGo, retourne liste de {url, title}."""
    results = []
    try:
        with DDGS() as ddgs:
            for r in ddgs.text(keyword, max_results=max_results):
                results.append({"url": r.get("href", ""), "title": r.get("title", "")})
        time.sleep(random.uniform(3, 6))
    except Exception as e:
        print(f"  [WARN] DDG error for '{keyword}': {e}")
        time.sleep(10)
    return results


def find_domain_position(results: list[dict], domain: str) -> tuple[int, str]:
    """Trouve la position d'un domaine dans les résultats."""
    for i, r in enumerate(results, 1):
        if domain in r.get("url", ""):
            return i, r["url"]
    return 0, ""

# ── MAIN TRACKING ─────────────────────────────────────────────────────────────

def run_tracking(conn):
    today = datetime.date.today().isoformat()
    all_domains = [OUR_DOMAIN] + COMPETITOR_DOMAINS
    results_summary = {}

    # Check si déjà tracké aujourd'hui
    already_today = conn.execute(
        "SELECT COUNT(*) FROM rankings WHERE date=? AND domain=?", (today, OUR_DOMAIN)
    ).fetchone()[0]

    if already_today > 0:
        print(f"Already tracked today ({today}). Use --force to override.")
        return

    print(f"\nTracking {len(KEYWORDS)} keywords across {len(all_domains)} domains...")
    print(f"ETA: ~{len(KEYWORDS) * 5 // 60}min {len(KEYWORDS) * 5 % 60}s\n")

    for i, kw_data in enumerate(KEYWORDS, 1):
        kw = kw_data["kw"]
        lang = kw_data["lang"]
        priority = kw_data["priority"]

        print(f"[{i:2d}/{len(KEYWORDS)}] {kw[:50]:<50} ", end="", flush=True)
        results = search_ddg(kw)

        our_pos, our_url = find_domain_position(results, OUR_DOMAIN)
        pos_str = f"#{our_pos}" if our_pos else "—"
        print(f"TE:{pos_str}", end="")

        for domain in all_domains:
            pos, url = find_domain_position(results, domain)
            save_result(conn, today, kw, lang, domain, pos, url)
            if domain != OUR_DOMAIN and pos > 0:
                print(f" | {domain.split('.')[0]}:#{pos}", end="")

        print()
        conn.commit()

    print(f"\n✅ Tracking complete for {today}")

# ── REPORT ────────────────────────────────────────────────────────────────────

def send_telegram(msg: str) -> None:
    try:
        requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
            json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10,
            verify=VERIFY_SSL,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def generate_report(conn):
    """Génère rapport hebdomadaire comparant notre position vs concurrents."""
    today = datetime.date.today().isoformat()
    week_ago = (datetime.date.today() - datetime.timedelta(days=7)).isoformat()

    lines = [f"📊 <b>KEYWORD REPORT — DUCKDUCKGO</b> — {today}",
             "<i>⚠️ Source = DuckDuckGo (proxy Bing), PAS Google. "
             "Pour nos vraies positions Google, voir GSC dans le rapport hebdo.</i>\n"]

    # Nos positions actuelles
    our_current = dict(conn.execute(
        "SELECT keyword, position FROM rankings WHERE domain=? AND date=? AND position>0",
        (OUR_DOMAIN, today)
    ).fetchall())

    our_prev = dict(conn.execute(
        "SELECT keyword, position FROM rankings WHERE domain=? AND date>=? AND date<? AND position>0",
        (OUR_DOMAIN, week_ago, today)
    ).fetchall())

    # Top rankings
    # ⚠️ 18/09/2026: on affiche SYSTEMATIQUEMENT le contrepoint Google a cote de la
    # position DuckDuckGo. Le 17/09, ce rapport annoncait 18 mots-cles "en position 1"
    # et 17 d'entre eux n'avaient AUCUNE impression Google: un #1 sans volume se lisait
    # comme une victoire. Une position n'a de sens qu'a cote du volume qu'elle capte.
    gsc_rows = _load_gsc_queries()
    if our_current:
        ranked = sorted(our_current.items(), key=lambda x: x[1])
        lines.append(f"<b>Nos positions DuckDuckGo ({len(ranked)} keywords rankés):</b>")
        if gsc_rows:
            lines.append("<i>ddg = DuckDuckGo · G = Google (impressions / position GSC)</i>")
        for kw, pos in ranked[:10]:
            prev = our_prev.get(kw, 0)
            trend = ""
            if prev and prev != pos:
                diff = prev - pos
                trend = f" (↑{diff})" if diff > 0 else f" (↓{abs(diff)})"
            g = gsc_rows.get(kw.strip().lower())
            if g:
                reel = f" · G {g['impressions']} impr, pos {g['position']:.0f}"
            elif gsc_rows:
                reel = " · G <b>0 impression</b>"
            else:
                reel = ""
            lines.append(f"  ddg #{pos}{trend} — {kw[:42]}{reel}")
        muets = sum(1 for kw, _ in ranked if kw.strip().lower() not in gsc_rows) if gsc_rows else 0
        if muets:
            lines.append(f"\n⚠️ {muets}/{len(ranked)} sans aucune impression Google: "
                         f"bien classe sur une requete que personne ne tape.")
    else:
        lines.append("Aucune position trouvée aujourd'hui.")

    # Concurrents sur nos keywords high priority
    high_priority = [k["kw"] for k in KEYWORDS if k["priority"] == "high"]
    lines.append(f"\n<b>Concurrents sur keywords prioritaires:</b>")

    for kw in high_priority[:5]:
        our_pos = our_current.get(kw, 0)
        our_str = f"#{our_pos}" if our_pos else "—"
        comp_positions = []
        for domain in COMPETITOR_DOMAINS:
            pos = conn.execute(
                "SELECT position FROM rankings WHERE domain=? AND keyword=? AND date=? AND position>0",
                (domain, kw, today)
            ).fetchone()
            if pos:
                comp_positions.append(f"{domain.split('.')[0]}:#{pos[0]}")
        comp_str = ", ".join(comp_positions[:3]) if comp_positions else "non rankés"
        lines.append(f"  <i>{kw[:40]}</i>\n  TE:{our_str} | {comp_str}")

    lines.append(f"\n<a href='https://search.google.com/search-console'>→ Search Console</a>")

    send_telegram("\n".join(lines))
    print("\n✅ Weekly report sent to Telegram")


# ── AUDIT DE LA LISTE SUIVIE ──────────────────────────────────────────────────

def _load_gsc_queries() -> dict:
    """Requetes Google reelles, indexees en minuscules. {} si la GSC n'a pas tourne.

    Rend un dictionnaire VIDE plutot que de lever: le rapport doit continuer a partir
    meme sans GSC, mais il ne doit alors afficher AUCUN contrepoint Google, sinon
    l'absence de donnee se lirait comme "zero impression".
    """
    f = DATA_DIR / "gsc_latest.json"
    if not f.exists():
        return {}
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        return {q["query"].strip().lower(): q for q in data.get("top_queries", [])}
    except Exception as e:
        print(f"  [WARN] gsc_latest.json illisible: {e}")
        return {}


def audit_keywords():
    """La liste suivie decrit-elle encore ce que les gens tapent ?

    Ne va sur aucun reseau: confronte simplement KEYWORDS aux requetes de la GSC.
    Existe parce qu'une liste ecrite a la main se perime SANS BRUIT: le tracker
    continue de rendre des positions impeccables sur des requetes que plus personne
    ne tape, et rien dans son rapport ne le signale.
    """
    gsc_file = DATA_DIR / "gsc_latest.json"
    if not gsc_file.exists():
        print("[STOP] gsc_latest.json absent. Lancer gsc_analytics.py d'abord.")
        return
    gsc = json.loads(gsc_file.read_text(encoding="utf-8"))
    G = _load_gsc_queries()
    if not G:
        print("[STOP] aucune requete lisible dans gsc_latest.json.")
        return

    print(f"\n{'='*78}")
    print(f"AUDIT DE LA LISTE SUIVIE")
    print(f"  selection : {KEYWORDS_SOURCE}")
    print(f"  GSC lue   : {gsc.get('period')} ({len(G)} requetes)")
    print(f"{'='*78}\n")

    try:
        import cluster_verdicts as cv
    except Exception:
        cv = None

    morts, vivants = [], []
    print(f"{'REQUETE SUIVIE':<50}{'impr':>7}{'pos':>7}  {'ROLE':<11}CLUSTER")
    print("-" * 95)
    for k in KEYWORDS:
        g = G.get(k["kw"].strip().lower())
        clu = cv.verdict(k["kw"])[0] if cv else "?"
        if g:
            vivants.append(k)
            print(f"{k['kw'][:49]:<50}{g['impressions']:>7}{g['position']:>7.1f}  "
                  f"{k.get('role','?'):<11}{clu}")
        else:
            morts.append(k)
            print(f"{k['kw'][:49]:<50}{'0':>7}{'-':>7}  {k.get('role','?'):<11}{clu}  <== PLUS D'IMPRESSION")

    print("-" * 95)
    n = len(KEYWORDS)
    print(f"\nSuivis: {n} | avec impressions reelles: {len(vivants)} "
          f"| sans aucune impression: {len(morts)} ({100*len(morts)//n} %)")

    # Ce que la GSC contient et que la liste ignore: les candidats au remplacement.
    suivis = {k["kw"].strip().lower() for k in KEYWORDS}
    manques = [q for q in gsc.get("top_queries", [])
               if q["query"].strip().lower() not in suivis and q["impressions"] >= 100]
    if manques:
        print(f"\nRequetes a >= 100 impressions NON suivies ({len(manques)}), "
              f"les 15 plus grosses:")
        for q in sorted(manques, key=lambda x: -x["impressions"])[:15]:
            clu = cv.verdict(q["query"])[0] if cv else "?"
            print(f"  {q['impressions']:>5} impr  pos {q['position']:>5.1f}  "
                  f"{clu:<12} {q['query'][:46]}")

    if len(morts) > n // 3:
        print(f"\n⚠️ Plus d'un tiers de la liste ne recoit plus d'impression: "
              f"la selection a rance, la refaire depuis la GSC.")
    else:
        print(f"\n✅ La liste decrit encore des requetes reellement tapees.")


# ── ENTRYPOINT ────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    report_only = "--report" in sys.argv
    force = "--force" in sys.argv

    if "--audit" in sys.argv:
        audit_keywords()
        sys.exit(0)

    conn = init_db()

    if report_only:
        generate_report(conn)
    else:
        if force:
            today = datetime.date.today().isoformat()
            conn.execute("DELETE FROM rankings WHERE date=?", (today,))
            conn.commit()
        run_tracking(conn)
        if "--with-report" in sys.argv:
            generate_report(conn)

    conn.close()
