"""
bing_analytics.py -- Stats Bing Webmaster (impressions/clics) pour tokyo-expat.
Complement de gsc_analytics.py. ChatGPT utilise l'index Bing -> suivre Bing = suivre
sa visibilite vers ChatGPT. Envoie un digest Telegram.

Cle: BING_API_KEY dans scripts/.env (Bing Webmaster > Settings > API access).
Run: python scripts/bing_analytics.py
Output: data/bing_latest.json
"""
import sys, io, json, datetime, requests, urllib3
from pathlib import Path
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
    try:
        from notify import notify
        notify(msg, source="bing_analytics",
               token=TELEGRAM_TOKEN if HAVE_TG else None,
               chat_id=TELEGRAM_CHAT_ID if HAVE_TG else None)
    except Exception as e:
        print("TG fail:", e)


def call(method, **params):
    params["apikey"] = KEY
    params["siteUrl"] = SITE
    r = requests.get(f"{API}/{method}", params=params, verify=False, timeout=30)
    return r


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

    # 2. Top requetes (si dispo)
    queries = []
    rq = call("GetQueryStats")
    if rq.status_code == 200:
        for q in (rq.json().get("d", []) or [])[:15]:
            queries.append({
                "query": q.get("Query",""),
                "impressions": q.get("Impressions",0),
                "clicks": q.get("Clicks",0),
                "position": q.get("AvgImpressionPosition",0),
            })

    out = {
        "generated_at": datetime.date.today().isoformat(),
        "site": SITE,
        "totals": {"impressions": total_impr, "clicks": total_clk},
        "points": len(data),
        "top_queries": queries,
    }
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Saved {OUT}")
    print(f"Bing: {total_impr} impressions, {total_clk} clics ({len(data)} points)")

    lines = [f"<b>BING (tokyo-expat)</b>",
             f"Impressions: {total_impr} | Clics: {total_clk}"]
    if queries:
        lines.append("\n<b>Top requetes Bing:</b>")
        for q in sorted(queries, key=lambda x:x["impressions"], reverse=True)[:8]:
            lines.append(f"- {q['query']}: {q['impressions']} impr, pos {round(q['position'],1)}")
    tg("\n".join(lines))
    print("Telegram envoye.")


if __name__ == "__main__":
    main()
