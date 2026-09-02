"""
bing_analytics.py -- Stats Bing Webmaster (impressions/clics) pour tokyo-expat.
Complement de gsc_analytics.py. ChatGPT utilise l'index Bing -> suivre Bing = suivre
sa visibilite vers ChatGPT. Envoie un digest Telegram.

Cle: BING_API_KEY dans scripts/.env (Bing Webmaster > Settings > API access).
Run: python scripts/bing_analytics.py
Output: data/bing_latest.json
"""
import sys, io, json, re, datetime, requests, urllib3
from pathlib import Path

STRIKE_POS_MIN, STRIKE_POS_MAX = 3, 12   # visible sur Bing mais pas en tete
STRIKE_MIN_IMPR = 8                      # sous ce volume, le zero clic n'est pas un signal
QUIET = "--quiet" in sys.argv            # --quiet = pas d'alerte Telegram (re-runs, tests)
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8','utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SCRIPT_DIR = Path(__file__).parent
OUT = SCRIPT_DIR / "data" / "bing_latest.json"
SITE = "https://tokyo-expat.com/"   # propriete Bing (telle qu'importee de GSC)
API = "https://ssl.bing.com/webmaster/api.svc/json"

KEY = None
for line in (SCRIPT_DIR / ".env").read_text(encoding="utf-8").splitlines():
    if line.startswith("BING_API_KEY="):
        KEY = line.split("=",1)[1].strip()
try:
    from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID
    HAVE_TG = True
except Exception:
    HAVE_TG = False


def tg(msg):
    if not HAVE_TG: return
    try:
        requests.post(f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
                      json={"chat_id":TELEGRAM_CHAT_ID,"text":msg,"parse_mode":"HTML"},
                      verify=False, timeout=15)
    except Exception as e:
        print("TG fail:", e)


def call(method, **params):
    params["apikey"] = KEY
    params["siteUrl"] = SITE
    r = requests.get(f"{API}/{method}", params=params, verify=False, timeout=40)
    return r


def iso_date(raw):
    """Bing rend les dates au format /Date(1783062000000-0700)/."""
    m = re.search(r"/Date\((-?\d+)", str(raw))
    if not m:
        return None
    return datetime.datetime.utcfromtimestamp(int(m.group(1)) / 1000).date().isoformat()


def period_range(points):
    dates = [d for d in (iso_date(p.get("Date")) for p in points) if d]
    return {"from": min(dates), "to": max(dates), "days": len(set(dates))} if dates else {}


def aggregate(resp):
    """Regroupe les lignes (libelle, date) par libelle. Position = moyenne PONDEREE
    par les impressions (une moyenne simple donnerait le meme poids a une ligne
    a 1 impression qu'a une ligne a 200)."""
    if resp.status_code != 200:
        print(f"  [WARN] {resp.status_code} sur une methode secondaire, ignoree")
        return []
    acc = {}
    for row in (resp.json().get("d", []) or []):
        label = (row.get("Query") or "").strip()
        if not label:
            continue
        impr = row.get("Impressions", 0) or 0
        a = acc.setdefault(label, {"label": label, "impressions": 0, "clicks": 0, "_pos_w": 0})
        a["impressions"] += impr
        a["clicks"] += row.get("Clicks", 0) or 0
        a["_pos_w"] += (row.get("AvgImpressionPosition", 0) or 0) * impr
    out = []
    for a in acc.values():
        impr = a["impressions"]
        out.append({
            "query": a["label"],
            "impressions": impr,
            "clicks": a["clicks"],
            "position": round(a["_pos_w"] / impr, 1) if impr else 0,
            "ctr_pct": round(100 * a["clicks"] / impr, 2) if impr else 0,
        })
    out.sort(key=lambda x: x["impressions"], reverse=True)
    return out


def main():
    if not KEY:
        print("BING_API_KEY manquante dans .env"); return
    print("Bing Analytics starting...")

    # 1. Stats rang & trafic (serie temporelle impressions/clics)
    r = call("GetRankAndTrafficStats")
    if r.status_code != 200:
        print(f"Erreur {r.status_code}: {r.text[:200]}")
        tg(f"⚠️ Bing API erreur {r.status_code}. Verifier la cle / propriete.")
        return
    data = r.json().get("d", []) or []
    # data = liste de points {Date, Impressions, Clicks, ...}
    total_impr = sum(p.get("Impressions",0) for p in data)
    total_clk = sum(p.get("Clicks",0) for p in data)

    # 2. Requetes ET pages -- AGREGEES
    # ⚠️ BUG CORRIGE 02/09/2026: l'API rend UNE LIGNE PAR (requete, date), soit 851 lignes
    # pour 802 requetes distinctes et 354 lignes pour 93 pages. L'ancien code prenait
    # `[:15]` sur la liste BRUTE, non triee et non regroupee -> les "top requetes" affichees
    # cumulaient 23 impressions sur les 7266 du site. Il faut REGROUPER par libelle.
    queries = aggregate(call("GetQueryStats"))
    pages = aggregate(call("GetPageStats"))

    # Striking distance Bing: visible mais jamais clique = titre/description a retravailler.
    striking = [q for q in queries
                if STRIKE_POS_MIN <= q["position"] <= STRIKE_POS_MAX
                and q["impressions"] >= STRIKE_MIN_IMPR and q["clicks"] == 0][:15]

    period = period_range(data)
    out = {
        "generated_at": datetime.date.today().isoformat(),
        "site": SITE,
        "totals": {"impressions": total_impr, "clicks": total_clk},
        "points": len(data),
        "top_queries": queries[:25],
        # --- ajouts 02/09/2026 (additif: les cles ci-dessus ne changent pas) ---
        "period": period,
        "ctr_pct": round(100 * total_clk / total_impr, 2) if total_impr else 0,
        "queries_total": len(queries),
        "pages_total": len(pages),
        "top_pages": pages[:20],
        "striking_distance": striking,
        "daily": [{"date": iso_date(p.get("Date")),
                   "impressions": p.get("Impressions", 0),
                   "clicks": p.get("Clicks", 0)} for p in data],
    }
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Saved {OUT}")
    print(f"Bing: {total_impr} impressions, {total_clk} clics ({len(data)} points)")

    ctr = out["ctr_pct"]
    print(f"Requetes distinctes: {len(queries)} | Pages distinctes: {len(pages)} | CTR {ctr}%")
    if period:
        print(f"Periode: {period['from']} -> {period['to']} ({period['days']} releves)")

    lines = ["<b>BING (tokyo-expat)</b>",
             f"Impressions: {total_impr} | Clics: {total_clk} | CTR {ctr}%"]
    if queries:
        lines.append("\n<b>Top requetes Bing:</b>")
        for q in queries[:8]:
            lines.append(f"- {q['query']}: {q['impressions']} impr, pos {q['position']}")
    if striking:
        lines.append("\n<b>Visible mais zero clic (titre/desc a revoir):</b>")
        for q in striking[:5]:
            lines.append(f"- {q['query']}: {q['impressions']} impr, pos {q['position']}")
    if QUIET:
        print("Telegram SAUTE (--quiet).")
    else:
        tg("\n".join(lines))
        print("Telegram envoye.")


if __name__ == "__main__":
    main()
