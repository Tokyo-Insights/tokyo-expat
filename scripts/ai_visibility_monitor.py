"""
ai_visibility_monitor.py - Moniteur de visibilite dans les IA (Perplexity, etc.)
Teste 10 requetes cibles chaque semaine et detecte si tokyo-expat.com est cite.
Compare avec la semaine precedente. Envoie rapport Telegram.

Prerequis: PERPLEXITY_API_KEY dans scripts/.env
Obtenir cle: perplexity.ai -> Settings -> API -> Generate

Run: python scripts/ai_visibility_monitor.py
"""

import json
import datetime
import time
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
STATE_FILE = DATA_DIR / "ai_visibility.json"
OUR_DOMAIN = "tokyo-expat.com"

# 10 requetes cibles a tester chaque semaine
TARGET_QUERIES = [
    "best housing service for expats moving to Tokyo",
    "how to find apartment in Tokyo as a foreigner",
    "Tokyo expat housing guide recommendation 2025",
    "best site to find furnished apartment Tokyo foreigner",
    "share house Tokyo foreigners best option",
    "Japan relocation housing service expats",
    "Tokyo rental apartment guide English speaking",
    "how to rent apartment Japan without guarantor foreigner",
    "meilleur site location appartement Tokyo expatrie",
    "guide logement Tokyo etranger francais",
]

PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions"
PERPLEXITY_MODEL = "sonar"  # modele gratuit, bon pour questions factuelles
SLEEP_BETWEEN_QUERIES = 3   # secondes entre requetes pour eviter rate-limit


def get_perplexity_key() -> str:
    try:
        from config import PERPLEXITY_API_KEY
        return PERPLEXITY_API_KEY
    except ImportError:
        pass
    import os
    return os.environ.get("PERPLEXITY_API_KEY", "")


def query_perplexity(query: str, api_key: str) -> dict:
    """Interroge Perplexity AI et retourne la reponse brute."""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": PERPLEXITY_MODEL,
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are a helpful assistant. Answer the question concisely. "
                    "If you reference websites, include their domain names."
                ),
            },
            {"role": "user", "content": query},
        ],
        "max_tokens": 800,
        "return_citations": True,
    }
    try:
        r = requests.post(
            PERPLEXITY_API_URL,
            headers=headers,
            json=payload,
            timeout=30,
            verify=VERIFY_SSL,
        )
        r.raise_for_status()
        return r.json()
    except Exception as e:
        return {"error": str(e)}


def extract_answer_text(response: dict) -> str:
    """Extrait le texte de la reponse Perplexity."""
    try:
        return response["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError):
        return ""


def extract_citations(response: dict) -> list[str]:
    """Extrait les URLs/domaines cites par Perplexity."""
    urls = []
    try:
        citations = response.get("citations", [])
        for c in citations:
            if isinstance(c, str):
                urls.append(c)
            elif isinstance(c, dict):
                urls.append(c.get("url", ""))
    except Exception:
        pass
    return [u for u in urls if u]


def is_cited(answer_text: str, citations: list[str]) -> tuple[bool, str]:
    """
    Retourne (cited, context).
    cited=True si tokyo-expat.com apparait dans la reponse ou les citations.
    context = extrait du texte autour de la mention.
    """
    # Verifier dans le texte de la reponse
    text_lower = answer_text.lower()
    if OUR_DOMAIN in text_lower:
        # Trouver le contexte autour de la mention
        idx = text_lower.find(OUR_DOMAIN)
        start = max(0, idx - 80)
        end = min(len(answer_text), idx + len(OUR_DOMAIN) + 80)
        context = "..." + answer_text[start:end].strip() + "..."
        return True, context

    # Verifier dans les citations
    for url in citations:
        if OUR_DOMAIN in url.lower():
            return True, f"Cite comme source : {url}"

    return False, ""


def load_state() -> dict:
    if STATE_FILE.exists():
        try:
            with open(STATE_FILE, encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, ValueError):
            pass
    return {"history": []}


def save_state(state: dict) -> None:
    DATA_DIR.mkdir(exist_ok=True)
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2, ensure_ascii=False)


def get_last_run(state: dict) -> dict | None:
    history = state.get("history", [])
    return history[-1] if history else None


def send_telegram(msg: str) -> None:
    try:
        requests.post(
            f"https://api.telegram.org/bot{TE_TOKEN}/sendMessage",
            json={"chat_id": TE_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10,
            verify=VERIFY_SSL,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def main():
    today = datetime.date.today().isoformat()
    print(f"\n{'='*60}")
    print(f"AI VISIBILITY MONITOR - {today}")
    print(f"{'='*60}\n")

    api_key = get_perplexity_key()
    if not api_key:
        msg = (
            f"<b>AI VISIBILITY MONITOR</b> - {today}\n\n"
            f"Cle Perplexity manquante.\n"
            f"1. Va sur perplexity.ai -> Settings -> API\n"
            f"2. Ajoute PERPLEXITY_API_KEY=ta_cle dans scripts/.env"
        )
        send_telegram(msg)
        print("[WARN] PERPLEXITY_API_KEY manquant. Ajoute-la dans scripts/.env")
        print("       Obtenir cle gratuite : perplexity.ai -> Settings -> API")
        return

    state = load_state()
    last_run = get_last_run(state)

    print(f"Testing {len(TARGET_QUERIES)} queries on Perplexity ({PERPLEXITY_MODEL})...\n")

    results = []
    cited_count = 0

    for i, query in enumerate(TARGET_QUERIES, 1):
        print(f"[{i}/{len(TARGET_QUERIES)}] {query[:60]}...")
        response = query_perplexity(query, api_key)

        if "error" in response:
            print(f"  ERROR: {response['error']}")
            results.append({
                "query": query,
                "cited": False,
                "context": "",
                "citations": [],
                "error": response["error"],
            })
        else:
            answer = extract_answer_text(response)
            citations = extract_citations(response)
            cited, context = is_cited(answer, citations)

            if cited:
                cited_count += 1
                print(f"  CITE: {context[:80]}")
            else:
                print(f"  Non cite. Citations: {len(citations)} sources")

            results.append({
                "query": query,
                "cited": cited,
                "context": context,
                "citations": citations[:5],
            })

        if i < len(TARGET_QUERIES):
            time.sleep(SLEEP_BETWEEN_QUERIES)

    # Comparer avec la semaine precedente
    prev_cited = last_run["cited_count"] if last_run else None
    delta = None
    if prev_cited is not None:
        delta = cited_count - prev_cited

    # Sauvegarder
    run_entry = {
        "date": today,
        "cited_count": cited_count,
        "total_queries": len(TARGET_QUERIES),
        "results": results,
    }
    state.setdefault("history", []).append(run_entry)
    # Garder 12 semaines max
    state["history"] = state["history"][-12:]
    save_state(state)

    print(f"\nRESULTAT: cite dans {cited_count}/{len(TARGET_QUERIES)} requetes")
    if delta is not None:
        print(f"Vs semaine derniere: {'+' if delta >= 0 else ''}{delta}")

    # Rapport Telegram
    score_pct = round(cited_count / len(TARGET_QUERIES) * 100)
    if score_pct >= 50:
        emoji = "🟢"
    elif score_pct >= 20:
        emoji = "🟡"
    else:
        emoji = "🔴"

    delta_str = ""
    if delta is not None:
        sign = "+" if delta >= 0 else ""
        delta_str = f" ({sign}{delta} vs semaine derniere)"

    lines = [
        f"<b>AI VISIBILITY MONITOR</b> - {today}",
        f"\n{emoji} <b>Cite dans {cited_count}/{len(TARGET_QUERIES)} requetes ({score_pct}%)</b>{delta_str}\n",
        "<b>Detail par requete :</b>",
    ]

    for r in results:
        icon = "✅" if r["cited"] else "❌"
        short_q = r["query"][:55]
        lines.append(f"{icon} {short_q}")
        if r.get("cited") and r.get("context"):
            lines.append(f"   {r['context'][:100]}")

    if cited_count == 0:
        lines.append(
            "\n<b>Actions pour ameliorer la visibilite IA :</b>\n"
            "1. Ajouter FAQ schema sur les 5 articles les plus vus\n"
            "2. Creer la page /data avec des stats uniques Tokyo 2026\n"
            "3. Commencer chaque article par une reponse directe en 2-3 phrases\n"
            "4. Etre mentionne sur Wikipedia, Quora, Reddit (backlinks semantiques)"
        )
    elif cited_count >= len(TARGET_QUERIES) // 2:
        lines.append(
            "\n<b>Bon score, maintenir :</b>\n"
            "- Continuer a publier des stats exclusives\n"
            "- Verifier que les pages /contact et /about mentionnent l'expertise"
        )

    send_telegram("\n".join(lines))
    print("Rapport Telegram envoye.")


if __name__ == "__main__":
    main()
