"""
competitor_radar.py -- Art de la Guerre : detection anticipee des nouveaux concurrents
Surveille les SERP chaque semaine. Quand un nouveau domaine apparait sur nos keywords :
- Alerte immediate
- Plan d'action defensif automatique (contenu, backlinks, liens internes)
Principe : ils sont deja perdants avant meme d'avoir commence.

Run: python scripts/competitor_radar.py
"""

import sqlite3
import json
import datetime
import sys
import io
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
STATE_FILE = DATA_DIR / "competitor_radar_state.json"
VULN_FILE = DATA_DIR / "vulnerabilities.json"

OUR_DOMAIN = "tokyo-expat.com"

# Domaines deja connus (a ignorer, pas des "nouveaux")
KNOWN_DOMAINS = {
    "remoters.io", "housing.gaijinpot.com", "sakura-house.com",
    "tokyocheapo.com", "gaijinpot.com", "oakhouse.jp", "japan-guide.com",
    "savvytokyo.com", "japanpropertycentral.com", "google.com",
    "youtube.com", "reddit.com", "wikipedia.org", "amazon.com",
}

# Pour chaque keyword, notre article qui le couvre
KEYWORD_TO_OUR_ARTICLE = {
    "trouver appartement tokyo etranger":    "/fr/blog/trouver-appartement-tokyo-etranger",
    "share house tokyo guide":               "/fr/blog/share-house-tokyo-guide-complet",
    "find apartment tokyo foreigner":        "/en/blog/find-apartment-tokyo-foreigner",
    "share house tokyo guide 2026":          "/en/blog/share-house-tokyo-guide-2026",
    "furnished apartment tokyo no guarantor":"/en/blog/furnished-apartment-tokyo-no-guarantor",
    "moving to tokyo guide 2026":            "/en/blog/moving-to-tokyo-checklist-2026",
    "tokyo expat housing":                   "/en/blog/find-apartment-tokyo-foreigner",
    "rent tokyo expat 2026":                 "/en/blog/tokyo-expat-cost-of-living-2026",
    "tokyo neighbourhoods expats guide":     "/en/blog/tokyo-neighbourhoods-expats-guide",
    "student housing tokyo guide":           "/en/blog/student-housing-tokyo-guide-2026",
    "guarantor japan rental foreigner":      "/en/blog/guarantor-japan-rental-foreigner",
    "tokyo rental contract checklist":       "/en/blog/tokyo-rental-contract-checklist",
    "japan health insurance expat":          "/en/blog/japan-health-insurance-expat-guide",
    "open bank account japan foreigner":     "/en/blog/open-bank-account-japan-foreigner",
    "tokyo apartment hunting abroad":        "/en/blog/tokyo-apartment-hunting-from-abroad",
    # --- batch session 8: Art de la Guerre ---
    "rental application rejected japan":     "/en/blog/rental-application-rejected-japan-foreigner",
    "dossier location refuse tokyo":         "/fr/blog/dossier-location-refuse-tokyo-etranger",
    "real estate hunter tokyo cost":         "/en/blog/real-estate-hunter-tokyo-cost-worth-it",
    "chasseur immobilier tokyo tarifs":      "/fr/blog/chasseur-immobilier-tokyo-tarifs-vaut-il-le-coup",
    "real estate hunter vs agency tokyo":    "/en/blog/real-estate-hunter-vs-agency-tokyo",
    "chasseur immobilier vs agence tokyo":   "/fr/blog/chasseur-immobilier-vs-agence-tokyo-comparatif",
    "how real estate hunter works tokyo":    "/en/blog/how-real-estate-hunter-works-tokyo",
    "hiroo expat neighborhood tokyo":        "/en/blog/hiroo-minami-azabu-expat-neighborhood-guide",
    "hiroo minami azabu expatries":          "/fr/blog/hiroo-minami-azabu-guide-expatries-tokyo",
    "real estate hunter tokyo":              "/en/blog/real-estate-hunter-vs-agency-tokyo",
    "chasseur immobilier tokyo":             "/fr/blog/service-chasseur-immobilier-tokyo-comment-ca-marche",
    "japan apartment rejection foreigner":   "/en/blog/rental-application-rejected-japan-foreigner",
}


def load_state() -> dict:
    DATA_DIR.mkdir(exist_ok=True)
    if STATE_FILE.exists():
        try:
            with open(STATE_FILE, encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {"known_domains": list(KNOWN_DOMAINS), "last_run": ""}


def save_state(state: dict):
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2, ensure_ascii=False)


def send_telegram(msg: str):
    try:
        requests.post(
            f"https://api.telegram.org/bot{TE_TOKEN}/sendMessage",
            json={"chat_id": TE_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10, verify=VERIFY_SSL,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def get_this_week_domains(conn) -> dict[str, list[str]]:
    """Retourne {domaine: [keywords ou ils apparaissent]} pour la semaine courante."""
    today = datetime.date.today().isoformat()
    week_ago = (datetime.date.today() - datetime.timedelta(days=8)).isoformat()

    rows = conn.execute(
        "SELECT DISTINCT domain, keyword FROM rankings "
        "WHERE date >= ? AND date <= ? AND position > 0 AND position <= 20",
        (week_ago, today)
    ).fetchall()

    domain_keywords: dict[str, list[str]] = {}
    for domain, keyword in rows:
        if domain == OUR_DOMAIN:
            continue
        domain_keywords.setdefault(domain, []).append(keyword)
    return domain_keywords


def score_threat(domain: str, keywords: list[str]) -> int:
    """Score de menace 0-100 d'un nouveau concurrent."""
    score = 0
    domain_lower = domain.lower()

    # Pertinence niche
    for kw in ["japan", "tokyo", "expat", "housing", "apartment", "foreigner", "living"]:
        if kw in domain_lower:
            score += 20

    # Nombre de keywords couverts
    score += min(len(keywords) * 5, 30)

    # Keywords haute priorite
    high_priority = ["find apartment", "share house", "furnished", "guarantor", "student housing"]
    for kw in keywords:
        if any(hp in kw for hp in high_priority):
            score += 10

    return min(score, 100)


def generate_moat_actions(domain: str, keywords: list[str]) -> list[str]:
    """Genere les actions defensives pour bloquer ce concurrent."""
    actions = []

    # Action 1 : articles a renforcer
    our_articles = set()
    for kw in keywords:
        if kw in KEYWORD_TO_OUR_ARTICLE:
            our_articles.add(KEYWORD_TO_OUR_ARTICLE[kw])

    if our_articles:
        for art in list(our_articles)[:3]:
            actions.append(f"Renforce '{art}' : ajoute 200 mots + liens internes")

    # Action 2 : backlinks a capturer en premier
    actions.append(f"PRIORITE OUTREACH : contacte Savvy Tokyo + Tokyo Cheapo CETTE SEMAINE avant que {domain} les approche")

    # Action 3 : content gap
    for kw in keywords[:2]:
        if kw not in KEYWORD_TO_OUR_ARTICLE:
            actions.append(f"Publie article sur '{kw}' — pas encore couvert, {domain} attaque ce keyword")

    # Action 4 : surveillance
    actions.append(f"Surveille {domain} : ajoute a competitor_watch.py si persistant")

    return actions


def main():
    today = datetime.date.today()
    print(f"\n{'='*60}")
    print(f"COMPETITOR RADAR -- {today}")
    print(f"{'='*60}\n")

    if not DB_FILE.exists():
        print("keyword_rankings.db introuvable. Lance keyword_tracker.py d'abord.")
        return

    state = load_state()
    known_domains: set[str] = set(state.get("known_domains", [])) | KNOWN_DOMAINS

    conn = sqlite3.connect(DB_FILE)
    this_week = get_this_week_domains(conn)
    conn.close()

    print(f"Domaines vus cette semaine dans les SERP : {len(this_week)}")
    print(f"Domaines deja connus : {len(known_domains)}")

    # Detecter les nouveaux
    new_competitors: list[dict] = []
    for domain, keywords in this_week.items():
        if domain in known_domains:
            continue
        threat_score = score_threat(domain, keywords)
        actions = generate_moat_actions(domain, keywords)
        new_competitors.append({
            "domain": domain,
            "keywords": keywords,
            "threat_score": threat_score,
            "actions": actions,
        })
        print(f"  NOUVEAU: {domain} (score:{threat_score}) sur {len(keywords)} keywords")

    # Trier par menace decroissante
    new_competitors.sort(key=lambda x: x["threat_score"], reverse=True)

    # Mettre a jour l'etat : ajouter tous les domaines vus comme "connus"
    all_seen = known_domains | set(this_week.keys())
    state["known_domains"] = sorted(all_seen)
    state["last_run"] = today.isoformat()
    save_state(state)

    # Telegram
    if not new_competitors:
        msg = f"<b>COMPETITOR RADAR</b> — {today}\nAucun nouveau concurrent detecte cette semaine."
        print("Aucun nouveau concurrent.")
        send_telegram(msg)
        return

    lines = [
        f"<b>ART DE LA GUERRE</b> — {today}",
        f"{len(new_competitors)} NOUVEAU(X) CONCURRENT(S) DETECTE(S)\n",
    ]

    for nc in new_competitors[:5]:
        threat_emoji = "🔴" if nc["threat_score"] >= 50 else "🟡"
        lines.append(
            f"{threat_emoji} <b>{nc['domain']}</b> (menace:{nc['threat_score']}/100)\n"
            f"   Keywords : {', '.join(nc['keywords'][:3])}\n"
            f"   <b>Actions :</b>"
        )
        for action in nc["actions"][:3]:
            lines.append(f"   • {action}")
        lines.append("")

    lines.append("<i>Agis MAINTENANT pendant qu'ils sont encore en phase de decouverte.</i>")
    send_telegram("\n".join(lines))
    print(f"\nTelegram envoye. {len(new_competitors)} nouveaux concurrents.")


if __name__ == "__main__":
    main()
