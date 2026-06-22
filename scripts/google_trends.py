"""
google_trends.py - Early warning via Google Trends
Detecte les keywords en spike avant que les concurrents ne les remarquent.
Deps: pip install pytrends
Run: python scripts/google_trends.py
"""
import sys
import io
import json
import time
import datetime
import requests
import urllib3
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

# Fix urllib3 >= 2.0 compatibility with pytrends (method_whitelist -> allowed_methods)
try:
    from urllib3.util.retry import Retry
    _orig_retry_init = Retry.__init__
    def _patched_retry_init(self, *args, **kwargs):
        if "method_whitelist" in kwargs:
            kwargs["allowed_methods"] = kwargs.pop("method_whitelist")
        _orig_retry_init(self, *args, **kwargs)
    Retry.__init__ = _patched_retry_init
except Exception:
    pass

try:
    from pytrends.request import TrendReq
except ImportError:
    print("Install: pip install pytrends")
    sys.exit(1)

from config import TE_TOKEN, TE_CHAT_ID

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
TRENDS_FILE = DATA_DIR / "trends_history.json"

SPIKE_THRESHOLD = 30  # % de hausse pour alerter

# Keywords groupes par 5 (limite pytrends)
KEYWORD_GROUPS = [
    ["tokyo apartment rent", "move to japan", "japan expat housing", "tokyo relocation", "furnished apartment tokyo"],
    ["share house tokyo", "japan visa work", "tokyo foreigner rent", "gaijin house", "japan moving guide"],
    ["tokyo housing cost 2026", "tokyo expat cost of living", "find apartment tokyo", "tokyo rental no guarantor", "japan property foreigner"],
    ["logement tokyo", "appartement tokyo expatrie", "s installer au japon", "visa travail japon", "louer tokyo"],
]

GEO_CODES = {
    "global": "",
    "france": "FR",
    "us": "US",
    "japan": "JP",
}


def load_history() -> dict:
    DATA_DIR.mkdir(exist_ok=True)
    if TRENDS_FILE.exists():
        with open(TRENDS_FILE, encoding='utf-8') as f:
            return json.load(f)
    return {}


def save_history(history: dict) -> None:
    with open(TRENDS_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2, ensure_ascii=False)


def send_telegram(msg: str) -> None:
    try:
        requests.post(
            f"https://api.telegram.org/bot{TE_TOKEN}/sendMessage",
            json={"chat_id": TE_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10, verify=VERIFY_SSL,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def get_trend_scores(pytrends, keywords: list, geo: str = "") -> dict[str, int]:
    """Recupere les scores de tendance pour un groupe de keywords."""
    try:
        pytrends.build_payload(keywords, cat=0, timeframe="now 4-w", geo=geo, gprop="")
        time.sleep(2)
        data = pytrends.interest_over_time()
        if data.empty:
            return {}
        result = {}
        for kw in keywords:
            if kw in data.columns:
                values = data[kw].tolist()
                if len(values) >= 2:
                    recent = sum(values[-2:]) / 2
                    old = sum(values[:2]) / 2 if values[:2] else 0
                    result[kw] = {"recent": int(recent), "old": int(old) if old else 1}
        return result
    except Exception as e:
        print(f"  [WARN] pytrends error: {e}")
        time.sleep(10)
        return {}


def calc_spike(recent: float, old: float) -> float:
    if old <= 0:
        return 0
    return ((recent - old) / old) * 100


def main():
    today = datetime.date.today().isoformat()
    print(f"\n{'='*60}")
    print(f"GOOGLE TRENDS EARLY WARNING - {today}")
    print(f"{'='*60}\n")

    history = load_history()
    spikes = []

    try:
        pytrends = TrendReq(hl='en-US', tz=360, timeout=(10, 25), retries=2, backoff_factor=0.5)
    except Exception as e:
        print(f"Erreur init pytrends: {e}")
        return

    for i, group in enumerate(KEYWORD_GROUPS, 1):
        print(f"Groupe {i}/{len(KEYWORD_GROUPS)}: {', '.join(group[:3])}...")

        # Focus global + FR pour maximiser la pertinence expat
        for geo_name, geo_code in [("global", ""), ("france", "FR")]:
            scores = get_trend_scores(pytrends, group, geo=geo_code)
            time.sleep(3)

            for kw, data in scores.items():
                key = f"{kw}_{geo_name}"
                spike_pct = calc_spike(data["recent"], data["old"])
                old_score = history.get(key, {}).get("score", data["old"])
                old_from_history = history.get(key, {}).get("recent", data["old"])
                history_spike = calc_spike(data["recent"], old_from_history)

                print(f"  [{geo_name}] {kw[:45]:<45} score:{data['recent']} "
                      f"spike:{spike_pct:+.0f}%")

                history[key] = {
                    "keyword": kw,
                    "geo": geo_name,
                    "recent": data["recent"],
                    "old": data["old"],
                    "spike_pct": round(spike_pct, 1),
                    "last_updated": today,
                }

                if spike_pct >= SPIKE_THRESHOLD and data["recent"] >= 10:
                    spikes.append({
                        "keyword": kw,
                        "geo": geo_name,
                        "score": data["recent"],
                        "spike_pct": round(spike_pct, 1),
                        "action": f"Publier ou booster un article sur '{kw}' MAINTENANT - tendance en hausse",
                    })

        time.sleep(5)

    save_history(history)
    print(f"\nHistorique sauvegarde ({len(history)} entrees)")

    if not spikes:
        print("Aucun spike detecte cette semaine.")
        spikes_summary = "Aucun spike detecte (tous sous +30%)"
        msg = f"<b>GOOGLE TRENDS</b> - {today}\n\n{spikes_summary}"
        send_telegram(msg)
        return

    spikes.sort(key=lambda x: x["spike_pct"], reverse=True)
    print(f"\n{len(spikes)} SPIKES DETECTES :")
    for s in spikes:
        print(f"  +{s['spike_pct']}% [{s['geo']}] {s['keyword']}")

    # Telegram
    top = spikes[:5]
    lines = [
        f"<b>GOOGLE TRENDS SPIKE</b> - {today}",
        f"{len(spikes)} keywords en hausse (seuil: +{SPIKE_THRESHOLD}%)\n",
        "<b>OPPORTUNITES :</b>",
    ]
    for s in top:
        lines.append(
            f"\n<b>+{s['spike_pct']}%</b> [{s['geo']}] <i>{s['keyword']}</i>"
            f"\n   Score: {s['score']}/100"
            f"\n   Action: {s['action'][:80]}"
        )
    lines.append("\nPublie un article AVANT que les concurrents ne reagissent.")
    send_telegram("\n".join(lines))
    print("Telegram envoye.")


if __name__ == "__main__":
    main()
