"""
proactive_analysis.py - Analyse proactive de toutes les donnees collectees
Lit : content_gaps.json, keyword_rankings.db, pricing_cache.json, competitor_reviews.json
Produit : rapport d'action immediat envoye via Telegram
Run: python scripts/proactive_analysis.py
"""
import sqlite3
import json
import datetime
import sys
import io
import re
import requests
import urllib3
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

from config import TE_TOKEN, TE_CHAT_ID

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"

DB_FILE = DATA_DIR / "keyword_rankings.db"
GAPS_FILE = DATA_DIR / "content_gaps.json"
PRICING_FILE = DATA_DIR / "pricing_cache.json"
REVIEWS_FILE = DATA_DIR / "competitor_reviews.json"
VULN_FILE = DATA_DIR / "vulnerabilities.json"
TRENDS_FILE = DATA_DIR / "trends_history.json"
CACHE_FILE = DATA_DIR / "competitor_cache.json"
DEDUP_FILE = DATA_DIR / "alert_dedup.json"

OUR_DOMAIN = "tokyo-expat.com"
PROACTIVE_TTL_DAYS = 7  # envoyer le meme rapport au max 1x/semaine


def load_dedup() -> dict:
    if DEDUP_FILE.exists():
        try:
            with open(DEDUP_FILE, encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, ValueError):
            pass
    return {}


def save_dedup(seen: dict) -> None:
    with open(DEDUP_FILE, "w", encoding="utf-8") as f:
        json.dump(seen, f, indent=2, ensure_ascii=False)


def is_fresh_alert(key: str, seen: dict, ttl_days: int = PROACTIVE_TTL_DAYS) -> bool:
    if key not in seen:
        return True
    entry = seen[key]
    if isinstance(entry, dict) and entry.get("dismissed"):
        return False
    last_sent = entry if isinstance(entry, str) else entry.get("date", "")
    if not last_sent:
        return True
    return (datetime.date.today() - datetime.date.fromisoformat(last_sent)).days >= ttl_days


def send_telegram(msg: str) -> None:
    try:
        requests.post(
            f"https://api.telegram.org/bot{TE_TOKEN}/sendMessage",
            json={"chat_id": TE_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10, verify=VERIFY_SSL,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def split_and_send(messages: list[str]) -> None:
    """Envoie plusieurs messages Telegram (evite la limite de 4096 chars)."""
    for msg in messages:
        send_telegram(msg)


# ── ANALYSE 1 : Content gaps ────────────────────────────────────────────────

def analyze_gaps() -> dict:
    if not GAPS_FILE.exists():
        return {"available": False}
    with open(GAPS_FILE, encoding='utf-8') as f:
        gaps = json.load(f)
    top3 = gaps[:3]
    return {
        "available": True,
        "total": len(gaps),
        "top3": [{"topic": g["topic"], "score": g["score"], "competitors": g.get("competitors", [])} for g in top3],
    }


# ── ANALYSE 2 : Keyword rankings ─────────────────────────────────────────────

def analyze_keywords() -> dict:
    if not DB_FILE.exists():
        return {"available": False}
    conn = sqlite3.connect(DB_FILE)
    dates = [r[0] for r in conn.execute("SELECT DISTINCT date FROM rankings ORDER BY date DESC LIMIT 2").fetchall()]
    if not dates:
        conn.close()
        return {"available": False, "reason": "DB vide"}

    latest = dates[0]
    our_ranked = conn.execute(
        "SELECT keyword, position FROM rankings WHERE domain=? AND date=? AND position>0 ORDER BY position",
        (OUR_DOMAIN, latest)
    ).fetchall()

    # Combien de keywords ont au moins 1 concurrent en top 5?
    top5_dominated = 0
    for kw, _ in our_ranked:
        dominated = conn.execute(
            "SELECT COUNT(*) FROM rankings WHERE keyword=? AND date=? AND position<=5 AND domain!=?",
            (kw, latest, OUR_DOMAIN)
        ).fetchone()[0]
        if dominated > 0:
            top5_dominated += 1

    # Nos keywords les plus prometteurs (position 11-20 = page 2, faciles a faire monter)
    page2 = [(kw, pos) for kw, pos in our_ranked if 11 <= pos <= 20]

    conn.close()
    return {
        "available": True,
        "latest_date": latest,
        "total_ranked": len(our_ranked),
        "best": our_ranked[:5],
        "page2_opportunities": page2[:5],
        "top5_dominated_count": top5_dominated,
    }


# ── ANALYSE 3 : Pricing intelligence ─────────────────────────────────────────

def analyze_pricing() -> dict:
    if not PRICING_FILE.exists():
        return {"available": False}
    with open(PRICING_FILE, encoding='utf-8') as f:
        cache = json.load(f)

    # Extraire les prix detectes des concurrents
    competitor_prices = {}
    for key, val in cache.items():
        if key.startswith("prices_"):
            name = key.replace("prices_", "")
            competitor_prices[name] = val

    # Detecter les commissions Remoters (15%/20% - confirme)
    remoters_prices = competitor_prices.get("Remoters Tokyo", []) + competitor_prices.get("Remoters Homepage", [])
    commission_rates = [p for p in remoters_prices if "%" in str(p)]

    return {
        "available": True,
        "competitor_prices": competitor_prices,
        "remoters_commissions": commission_rates[:5],
        "insight": "Remoters charge 15-20% de commission. Notre avantage: tarif fixe transparent.",
    }


# ── ANALYSE 4 : Competitor size & content ────────────────────────────────────

def analyze_competitors() -> dict:
    if not CACHE_FILE.exists():
        return {"available": False}
    with open(CACHE_FILE, encoding='utf-8') as f:
        cache = json.load(f)

    sizes = {}
    for key, val in cache.items():
        if key.startswith("urls_"):
            domain = key.replace("urls_", "")
            sizes[domain] = len(val)

    return {
        "available": True,
        "sizes": dict(sorted(sizes.items(), key=lambda x: x[1], reverse=True)),
        "total_competitor_urls": sum(sizes.values()),
    }


# ── ANALYSE 5 : Vulnerabilites recentes ─────────────────────────────────────

def analyze_vulnerabilities() -> dict:
    if not VULN_FILE.exists():
        return {"available": False, "reason": "Pas encore genere (lance vulnerability_detector.py)"}
    with open(VULN_FILE, encoding='utf-8') as f:
        vulns = json.load(f)
    return {"available": True, "total": len(vulns), "top3": vulns[:3]}


# ── ANALYSE 6 : Saisonnalite ─────────────────────────────────────────────────

def analyze_seasonality() -> dict:
    today = datetime.date.today()
    peaks = [
        {"date": datetime.date(today.year, 2, 1), "name": "Annonces mutations pro", "publish_by": datetime.date(today.year, 12, 15)},
        {"date": datetime.date(today.year, 3, 15), "name": "Pic demenagements mars", "publish_by": datetime.date(today.year, 1, 31)},
        {"date": datetime.date(today.year, 4, 1), "name": "Debut annee fiscale", "publish_by": datetime.date(today.year, 2, 15)},
        {"date": datetime.date(today.year, 7, 15), "name": "Pre-rentree univ", "publish_by": datetime.date(today.year, 6, 1)},
        {"date": datetime.date(today.year, 9, 1), "name": "Rentree sept", "publish_by": datetime.date(today.year, 7, 15)},
        {"date": datetime.date(today.year, 12, 15), "name": "Planif nouvel an", "publish_by": datetime.date(today.year, 11, 1)},
    ]

    for p in peaks:
        if p["date"] <= today:
            try:
                p["date"] = p["date"].replace(year=today.year + 1)
                p["publish_by"] = p["publish_by"].replace(year=today.year + 1)
            except ValueError:
                pass

    upcoming = sorted([p for p in peaks if p["date"] > today], key=lambda x: x["date"])
    if not upcoming:
        return {"available": False}

    next_peak = upcoming[0]
    days_to_peak = (next_peak["date"] - today).days
    days_to_deadline = (next_peak["publish_by"] - today).days
    in_window = days_to_deadline <= 0 or days_to_deadline <= 21

    return {
        "available": True,
        "next_peak": next_peak["name"],
        "peak_date": next_peak["date"].isoformat(),
        "publish_by": next_peak["publish_by"].isoformat(),
        "days_to_peak": days_to_peak,
        "days_to_deadline": days_to_deadline,
        "in_window": in_window,
    }


# ── RAPPORT FINAL ─────────────────────────────────────────────────────────────

def main():
    today = datetime.date.today().isoformat()
    print(f"\n{'='*60}")
    print(f"ANALYSE PROACTIVE COMPLETE - {today}")
    print(f"{'='*60}\n")

    gaps = analyze_gaps()
    keywords = analyze_keywords()
    pricing = analyze_pricing()
    competitors = analyze_competitors()
    vulns = analyze_vulnerabilities()
    season = analyze_seasonality()

    print("Donnees chargees:")
    for name, d in [("Gaps", gaps), ("Keywords", keywords), ("Pricing", pricing),
                    ("Competitors", competitors), ("Vulns", vulns), ("Saison", season)]:
        status = "OK" if d.get("available") else f"N/A ({d.get('reason', 'non genere')})"
        print(f"  {name:<12}: {status}")

    # ── MESSAGE 1 : Etat general ─────────────────────────────────────────────
    msg1_lines = [
        f"<b>ANALYSE INTELLIGENCE TOKYO-EXPAT</b>",
        f"Date: {today}\n",
    ]

    if keywords.get("available"):
        msg1_lines.append(f"<b>Nos rankings :</b> {keywords['total_ranked']} keywords rankés ({keywords['latest_date']})")
        if keywords.get("best"):
            msg1_lines.append("Meilleures positions :")
            for kw, pos in keywords["best"][:3]:
                msg1_lines.append(f"  #{pos} - {kw[:45]}")
        if keywords.get("page2_opportunities"):
            msg1_lines.append("\nOPPORTUNITES page 2 -> page 1 (boost interne !) :")
            for kw, pos in keywords["page2_opportunities"][:3]:
                msg1_lines.append(f"  #{pos} - {kw[:45]}")
    else:
        msg1_lines.append("Rankings: premiere semaine de tracking en cours.")

    if competitors.get("available"):
        total = competitors["total_competitor_urls"]
        sizes = competitors["sizes"]
        biggest = list(sizes.items())[0] if sizes else ("?", 0)
        msg1_lines.append(f"\n<b>Ecosysteme concurrent :</b> {total:,} URLs trackees")
        msg1_lines.append(f"Dominant: {biggest[0]} ({biggest[1]:,} pages)")

    if pricing.get("available") and pricing.get("remoters_commissions"):
        msg1_lines.append(f"\n<b>Pricing Remoters :</b> {', '.join(pricing['remoters_commissions'][:3])} commission")
        msg1_lines.append(f"Notre avantage : tarif transparent vs commission opaque")

    # ── MESSAGE 2 : 3 articles a ecrire MAINTENANT ──────────────────────────
    msg2_lines = [f"<b>TOP 3 ARTICLES A ECRIRE MAINTENANT</b>\n"]

    article_queue = []

    # 1) Saisonnalite
    if season.get("available") and (season.get("in_window") or season.get("days_to_deadline", 999) <= 45):
        article_queue.append({
            "priority": 1,
            "title": "Guide mutation pro Tokyo : trouver un logement en 2 semaines",
            "why": f"Pic '{season['next_peak']}' dans {season['days_to_peak']}j - publier MAINTENANT",
            "keywords": ["mutation tokyo logement", "find apartment tokyo april", "appartement tokyo expatrie"],
        })

    # 2) Meilleur content gap
    if gaps.get("available") and gaps.get("top3"):
        g = gaps["top3"][0]
        article_queue.append({
            "priority": 2 if not article_queue else len(article_queue) + 1,
            "title": f"Article sur : {g['topic'].replace('-', ' ')}",
            "why": f"Score gap {g['score']}/100 - {', '.join(g['competitors'][:2])} couvrent ce topic, pas nous",
            "keywords": [g["topic"].replace("-", " ")],
        })

    # 3) Jiko bukken (gap specifique detecte - toujours valide)
    article_queue.append({
        "priority": len(article_queue) + 1,
        "title": "Jiko bukken : louer moins cher a Tokyo (appartements \"a incident\")",
        "why": "Keyword longtail FR inexistant, fort potentiel SEO, angle unique",
        "keywords": ["jiko bukken tokyo", "appartement pas cher tokyo astuce", "cheap apartment tokyo secret"],
    })

    # 4) Page 2 keyword le plus prometteur
    if keywords.get("available") and keywords.get("page2_opportunities"):
        kw, pos = keywords["page2_opportunities"][0]
        article_queue.append({
            "priority": len(article_queue) + 1,
            "title": f"Boost SEO : article optimise pour '{kw}'",
            "why": f"On est #{pos} sur ce keyword - un bon article interne peut le faire passer en page 1",
            "keywords": [kw],
        })

    for i, art in enumerate(article_queue[:3], 1):
        msg2_lines.append(
            f"<b>{i}. {art['title'][:60]}</b>"
            f"\nPourquoi maintenant : {art['why'][:80]}"
            f"\nKeywords : {', '.join(art['keywords'][:2])}"
            f"\n"
        )

    # ── MESSAGE 3 : Plan 30 jours ────────────────────────────────────────────
    msg3_lines = [f"<b>PLAN D'ACTION 30 JOURS</b>\n"]

    msg3_lines.append("<b>Semaine 1 (maintenant) :</b>")
    if article_queue:
        msg3_lines.append(f"  Ecrire : {article_queue[0]['title'][:55]}")
    msg3_lines.append("  Partager sur Facebook Expats Tokyo + r/movingtojapan")
    msg3_lines.append("  Poster sur Expat.com (profil + 1 reponse utile)")

    msg3_lines.append("\n<b>Semaine 2 :</b>")
    if len(article_queue) > 1:
        msg3_lines.append(f"  Ecrire : {article_queue[1]['title'][:55]}")
    msg3_lines.append("  Commenter sur r/JapanFinance (zero promo, valeur pure)")
    msg3_lines.append("  Republier article S1 sur LinkedIn")

    msg3_lines.append("\n<b>Semaines 3-4 :</b>")
    if len(article_queue) > 2:
        msg3_lines.append(f"  Ecrire : {article_queue[2]['title'][:55]}")
    msg3_lines.append("  Backlinks : repondre sur Quora Japan housing")
    msg3_lines.append("  Check Search Console : quels articles progressent?")

    if vulns.get("available") and vulns.get("total", 0) > 0:
        msg3_lines.append(f"\n<b>Opportunites vulnerabilites ({vulns['total']}) :</b>")
        for v in vulns["top3"][:2]:
            msg3_lines.append(f"  {v['domain'].split('.')[0]} chute sur '{v['keyword'][:35]}' -> attaquer ce keyword")

    msg3_lines.append("\n<b>Objectif 30j :</b> 3 nouveaux articles + 10 backlinks naturels")

    # Dedup : ne pas re-envoyer le meme rapport si rien de nouveau
    seen = load_dedup()
    today_str = datetime.date.today().isoformat()

    # Fingerprint base sur : top keywords + top gap + top vuln
    kw_sig = ",".join(str(k) for k in (keywords.get("best", [])[:2] if keywords.get("available") else []))
    gap_sig = gaps["top3"][0].get("slug", gaps["top3"][0].get("topic", "")) if gaps.get("available") and gaps.get("top3") else ""
    vuln_sig = f"{vulns['top3'][0]['domain']}:{vulns['top3'][0]['keyword']}" if vulns.get("available") and vulns.get("top3") else ""
    fingerprint = f"proactive:{kw_sig}|{gap_sig}|{vuln_sig}"

    if not is_fresh_alert(fingerprint, seen):
        print(f"\n[DEDUP] Rapport identique envoye il y a moins de {PROACTIVE_TTL_DAYS}j. Skip Telegram.")
        return

    # Envoyer les 3 messages
    print("\nEnvoi rapport Telegram (3 messages)...")
    split_and_send([
        "\n".join(msg1_lines),
        "\n".join(msg2_lines),
        "\n".join(msg3_lines),
    ])
    print("Rapport proactif envoye.")

    seen[fingerprint] = today_str
    save_dedup(seen)


if __name__ == "__main__":
    main()
