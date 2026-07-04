# -*- coding: utf-8 -*-
"""
gsc_opportunity_miner.py -- BOUCLE VERTUEUSE recherche->article (jumeau SEO du harvester Reddit).

Mine Google Search Console: quelles requetes te trouvent, et OU tu rankes mal ?
Priorise les "opportunites": grosses impressions + position en zone de frappe (page 2-3,
proche du top mais pas encore gagnee) = un article optimise peut capturer ce trafic.
Public de recherche = HAUTE INTENTION (gens qui cherchent a louer = vrais clients),
contrairement aux data-lovers de Reddit.

Sortie: liste d'opportunites d'articles a ecrire/optimiser. Claude ecrit les articles.
Utilise la meme cle que GA4 (ga4-credentials.json, scope webmasters.readonly).

  python scripts/gsc_opportunity_miner.py            # top opportunites -> Telegram + print
  python scripts/gsc_opportunity_miner.py --print     # print seulement
"""
import requests, urllib3, io, sys, datetime, re
from pathlib import Path
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

sys.path.insert(0, str(Path(__file__).parent))
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

CREDS = Path(__file__).parent / "ga4-credentials.json"
SITE = "sc-domain:tokyo-expat.com"
DAYS = 90
MIN_IMPRESSIONS = 15          # ignorer le bruit
STRIKE_LOW, STRIKE_HIGH = 8, 30   # zone de frappe: page 2-3, gagnable avec un bon article


def send_telegram(msg):
    try:
        requests.post(f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
                      json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML",
                            "disable_web_page_preview": True}, timeout=15, verify=False)
    except Exception as e:
        print(f"[WARN] telegram: {e}")


def is_junk(q):
    # requetes avec operateurs/quotes/site: = bruit de scraper, pas une vraie recherche
    return bool(re.search(r'["\-]|site:|\bOR\b', q)) or len(q) < 4


def get_queries():
    from google.oauth2 import service_account
    import google.auth.transport.requests as gr
    creds = service_account.Credentials.from_service_account_file(
        str(CREDS), scopes=["https://www.googleapis.com/auth/webmasters.readonly"])
    s = requests.Session(); s.verify = False
    creds.refresh(gr.Request(session=s))
    end = datetime.date.today()
    start = end - datetime.timedelta(days=DAYS)
    url = (f"https://searchconsole.googleapis.com/webmasters/v3/sites/"
           f"{requests.utils.quote(SITE, safe='')}/searchAnalytics/query")
    body = {"startDate": start.isoformat(), "endDate": end.isoformat(),
            "dimensions": ["query"], "rowLimit": 250}
    r = requests.post(url, headers={"Authorization": f"Bearer {creds.token}"},
                      json=body, verify=False, timeout=30)
    r.raise_for_status()
    return r.json().get("rows", [])


def opportunity_score(impr, pos):
    """Grosses impressions + position gagnable = score haut. Page 1 (pos<8) = deja bien."""
    if pos < STRIKE_LOW:
        return impr * 0.2            # deja en page 1, faible marge
    if STRIKE_LOW <= pos <= STRIKE_HIGH:
        return impr * 1.0            # zone de frappe = prioritaire
    return impr * 0.45              # page 4+ = plus dur mais du volume


STOPWORDS = {"tokyo", "japan", "in", "the", "a", "an", "of", "for", "to", "near", "my",
             "is", "are", "best", "and", "with", "how", "what", "you", "your", "on"}
BLOG_PATH = Path(__file__).parent.parent / "lib" / "blog.ts"


def sig(q):
    """Signature d'une requete = ses mots-cles distinctifs (singularises)."""
    words = [w[:-1] if w.endswith("s") and len(w) > 4 else w
             for w in re.findall(r"[a-z]+", q.lower()) if w not in STOPWORDS and len(w) > 2]
    return frozenset(words)


def article_word_sets():
    """Mots-cles des titres d'articles existants -> savoir si un cluster est deja couvert."""
    try:
        txt = BLOG_PATH.read_text(encoding="utf-8")
    except Exception:
        return []
    titles = re.findall(r"title:\s*'([^']+)'", txt)
    return [set(re.findall(r"[a-z]+", t.lower())) for t in titles]


def covered(core, art_sets):
    """Un article couvre-t-il deja ce cluster ? (>=2 mots-cles en commun)"""
    return any(len(core & a) >= 2 for a in art_sets)


def main():
    do_print = "--print" in sys.argv
    rows = get_queries()
    art_sets = article_word_sets()

    # regrouper les requetes par signature (cluster) -> une opportunite = un cluster, pas 10 lignes
    clusters = {}
    for row in rows:
        q = row["keys"][0]
        impr = int(row["impressions"])
        if impr < MIN_IMPRESSIONS or is_junk(q):
            continue
        s = sig(q)
        if not s:
            continue
        c = clusters.setdefault(s, {"impr": 0, "clicks": 0, "queries": [], "wpos": 0.0})
        c["impr"] += impr
        c["clicks"] += int(row["clicks"])
        c["wpos"] += row["position"] * impr           # position ponderee par impressions
        c["queries"].append((q, impr, row["position"]))

    ranked = []
    for s, c in clusters.items():
        avg_pos = c["wpos"] / c["impr"] if c["impr"] else 99
        score = opportunity_score(c["impr"], avg_pos)
        ranked.append((score, s, c["impr"], c["clicks"], avg_pos, c["queries"]))
    ranked.sort(reverse=True)

    print(f"BOUCLE RECHERCHE->ARTICLE | {len(ranked)} CLUSTERS d'opportunites ({DAYS}j)")
    lines = []
    for score, s, impr, clicks, pos, queries in ranked[:12]:
        zone = "🎯" if STRIKE_LOW <= pos <= STRIKE_HIGH else "  "
        action = "OPTIMISER (article existe)" if covered(s, art_sets) else "ECRIRE (nouveau)"
        top_q = max(queries, key=lambda x: x[1])[0]
        variants = len(queries)
        label = " ".join(sorted(s))
        print(f"{zone} {impr:>4} impr | pos {pos:>4.1f} | {variants:>2} variantes | {action}")
        print(f"       theme: {label[:60]}  (ex: \"{top_q}\")")
        lines.append(f"{zone} {impr} impr, pos {pos:.0f}, {variants} variantes -> {action}\n   \"{top_q}\"")

    if not do_print and ranked:
        top = "\n".join(lines[:8])
        send_telegram(
            f"\U0001F50D <b>SEO - clusters d'opportunites</b> ({DAYS}j)\n"
            f"Themes haute intention ou tu rankes mal (🎯 = gagnable, page 2-3):\n\n{top}\n\n"
            f"-> Demande a Claude d'ECRIRE/OPTIMISER pour les 🎯.")
        print("\n[Telegram envoye]")


if __name__ == "__main__":
    main()
