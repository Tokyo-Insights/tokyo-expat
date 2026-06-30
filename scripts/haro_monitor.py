"""
haro_monitor.py — Tokyo Expat HARO/PR Monitor
Scanne Gmail IMAP pour les digests des plateformes journalistes:
  - Qwoted (qwoted.com) — digests quotidiens
  - Featured.com — digests quotidiens
  - SOS (Source of Sources) — digest de Peter Shankman
  - ProfNet — si abonnement

Pour chaque requete pertinente (Japan, Tokyo, expat, housing, relocation),
genere un draft de reponse et envoie une alerte Telegram avec le texte pret
a copier-coller.

Run: python scripts/haro_monitor.py
Prerequisites: comptes Qwoted + Featured + SOS crees, digests envoyes a Gmail
"""

import imaplib
import email
import json
import datetime
import sys
import io
import re
import html
import requests
import urllib3
from pathlib import Path
from email.header import decode_header

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID
from blog_helpers import SUSPENDED_SOURCES

try:
    from config import GMAIL_ADDRESS, GMAIL_APP_PASSWORD
except ImportError:
    print("[ERROR] GMAIL_ADDRESS / GMAIL_APP_PASSWORD manquants dans config.py / scripts/.env")
    sys.exit(1)

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
STATE_FILE = DATA_DIR / "haro_monitor_state.json"
PENDING_FILE = DATA_DIR / "pending_actions.json"

# Expediteurs des plateformes HARO/PR
PR_SENDERS = [
    "qwoted.com",
    "connectively.us",  # ex-HARO + ex-Featured.com
    "featured.com",
    "helpablogger.com",
    "sourcebottle.com",
    "shankman.com",
    "profnet.com",
    "journorequest",
]

# Keywords qui rendent une requete pertinente pour Alessandro
RELEVANT_KEYWORDS = [
    "japan", "tokyo", "expat", "foreigner", "housing", "apartment", "relocation",
    "share house", "moving to japan", "living in japan", "real estate japan",
    "japanese", "rent in japan", "furnished apartment", "visa japan",
    "français", "french expat", "francophone",
]

# Score minimum pour envoyer une alerte
MIN_RELEVANCE_SCORE = 2

# Profil expert d'Alessandro (pour les drafts)
EXPERT_PROFILE = """Alessandro est fondateur de Tokyo Expat (tokyo-expat.com), chasseur immobilier
billingue FR/EN specialise dans la recherche de logements pour expatries a Tokyo.
Il gere un inventaire de 300+ logements (meuble, non-meuble, share house, 40k-300k JPY/mois)
et aide des dizaines d'expatries francophones et anglophones a se loger a Tokyo chaque annee."""

# Templates de reponse par categorie
RESPONSE_TEMPLATES = {
    "housing_search": """En tant que chasseur immobilier base a Tokyo specialise dans l'expatriation, voici mon experience:

[REPONSE SPECIFIQUE A LA QUESTION]

Les principaux defis pour trouver un logement a Tokyo en tant qu'etranger sont:
1. Le systeme de garant (hoshounin) - la plupart des bailleurs exigent un garant japonais
2. La barriere linguistique - la majorite des annonces sont en japonais uniquement
3. Les frais d'entree eleves (jusqu'a 5-6 mois de loyer entre caution, cle, agence)
4. Le document "jiko bukken" - appartements avec historique d'incident non declare

Solutions pratiques: agencies specialisees expatries, garant electronique (e-hoshounin),
share houses sans garant, plateformes EN comme GaijinPot Housing.

Alessandro [NOM], Tokyo Expat (tokyo-expat.com)""",

    "cost_living": """Expatrie a Tokyo depuis plusieurs annees, voici les couts reels de logement en 2026:

[REPONSE SPECIFIQUE A LA QUESTION]

Budget logement typique par profil:
- Studio (1K/1DK) Yamanote line: 80,000-120,000 JPY/mois (~500-800 EUR)
- 1LDK (couple/famille): 120,000-180,000 JPY/mois
- Share house sans garant: 50,000-80,000 JPY/mois tout inclus
- Appartement meuble pour expatrie corporate: 150,000-250,000 JPY/mois

Alessandro [NOM], chasseur immobilier, Tokyo Expat (tokyo-expat.com)""",

    "relocation": """Ayant accompagne des dizaines de families et professionnels dans leur relocation a Tokyo:

[REPONSE SPECIFIQUE A LA QUESTION]

Checklist relocation Tokyo en 8 etapes:
1. Obtenir le visa adapte (travail, conjoint, PVT, nomade digital)
2. Rechercher logement 1-3 mois avant l'arrivee (marche serrer en mars/septembre)
3. Ouvrir compte bancaire (Japan Post Bank le plus accessible pour nouveaux arrivants)
4. Obtenir la carte de residence (zairyu card) dans les 14 jours
5. Inscription mairie (jyuminhyo)
6. SIM card et internet (IIJmio, Mintsim recommandes)
7. Assurance maladie (NHI ou mutuelle privee)
8. Permis de conduire international ou conversion

Alessandro [NOM], Tokyo Expat (tokyo-expat.com)""",

    "generic": """En tant que specialiste du marche locatif de Tokyo pour les expatries:

[REPONSE SPECIFIQUE A LA QUESTION]

[AJOUTER 2-3 POINTS SPECIFIQUES A LA QUESTION]

Pour plus d'informations: tokyo-expat.com (guides bilingues FR/EN sur le logement a Tokyo)

Alessandro [NOM], fondateur Tokyo Expat""",
}


def get_response_template(query_text: str) -> str:
    """Selectionne le meilleur template selon la requete."""
    query_lower = query_text.lower()
    if any(kw in query_lower for kw in ["find apartment", "trouver appartement", "housing search", "share house"]):
        return RESPONSE_TEMPLATES["housing_search"]
    if any(kw in query_lower for kw in ["cost", "budget", "price", "how much", "cout", "prix"]):
        return RESPONSE_TEMPLATES["cost_living"]
    if any(kw in query_lower for kw in ["relocation", "moving", "demenag", "checklist", "arrive"]):
        return RESPONSE_TEMPLATES["relocation"]
    return RESPONSE_TEMPLATES["generic"]


def decode_header_value(value: str) -> str:
    parts = decode_header(value)
    result = []
    for part, encoding in parts:
        if isinstance(part, bytes):
            result.append(part.decode(encoding or "utf-8", errors="replace"))
        else:
            result.append(str(part))
    return "".join(result)


def get_email_body(msg) -> str:
    """Extrait le corps texte d'un email."""
    body = ""
    if msg.is_multipart():
        for part in msg.walk():
            ct = part.get_content_type()
            if ct == "text/plain":
                try:
                    body = part.get_payload(decode=True).decode(
                        part.get_content_charset() or "utf-8", errors="replace"
                    )
                    break
                except Exception:
                    pass
            elif ct == "text/html" and not body:
                try:
                    raw = part.get_payload(decode=True).decode(
                        part.get_content_charset() or "utf-8", errors="replace"
                    )
                    body = re.sub(r'<[^>]+>', ' ', raw)
                    body = html.unescape(body)
                    body = re.sub(r'\s+', ' ', body)
                except Exception:
                    pass
    else:
        try:
            body = msg.get_payload(decode=True).decode(
                msg.get_content_charset() or "utf-8", errors="replace"
            )
        except Exception:
            pass
    return body[:8000]


def score_relevance(text: str) -> tuple[int, list[str]]:
    """Score de pertinence et keywords trouves."""
    text_lower = text.lower()
    found = [kw for kw in RELEVANT_KEYWORDS if kw in text_lower]
    return len(found), found


def extract_queries_from_digest(body: str, source: str) -> list[dict]:
    """
    Tente d'extraire les requetes individuelles du digest.
    Chaque plateforme a un format different.
    """
    queries = []

    # Patterns communs dans les digests HARO-like
    # Qwoted: sections separees par "--- " ou numbered
    # Featured: questions numerotees
    # SOS: format libre

    # Pattern 1: sections separees par --- ou ===
    sections = re.split(r'(?m)^[-=]{3,}$', body)

    # Pattern 2: si sections trop grandes, chercher des blocs "Category:" + "Query:"
    if len(sections) <= 2:
        # Chercher des questions individuelles par keyword
        query_blocks = re.findall(
            r'(?:Category|Topic|Subject|Question)[:\s]+([^\n]{10,200})',
            body, re.IGNORECASE
        )
        if query_blocks:
            for block in query_blocks:
                queries.append({"text": block.strip(), "source": source})
            return queries

    for section in sections:
        section = section.strip()
        if len(section) < 50:
            continue
        score, found_kw = score_relevance(section)
        if score >= MIN_RELEVANCE_SCORE:
            # Extraire le titre/sujet du bloc
            first_line = section.split('\n')[0][:200]
            queries.append({
                "text": first_line,
                "context": section[:400],
                "source": source,
                "keywords": found_kw,
                "score": score,
            })

    # Si aucune structure, scorer le corps entier
    if not queries:
        score, found_kw = score_relevance(body)
        if score >= MIN_RELEVANCE_SCORE:
            queries.append({
                "text": body[:200],
                "context": body[:500],
                "source": source,
                "keywords": found_kw,
                "score": score,
            })

    return queries


def append_pending_action(action: dict) -> None:
    """Sauvegarde une opportunite dans pending_actions.json pour analyse avec Claude."""
    try:
        DATA_DIR.mkdir(exist_ok=True)
        data = {"actions": []}
        if PENDING_FILE.exists():
            data = json.loads(PENDING_FILE.read_text(encoding="utf-8"))
        existing_ids = {a.get("id") for a in data.get("actions", [])}
        if action.get("id") not in existing_ids:
            data.setdefault("actions", []).append(action)
            data["actions"] = data["actions"][-200:]
        PENDING_FILE.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    except Exception as e:
        print(f"[WARN] pending_actions save error: {e}")


def load_state() -> dict:
    DATA_DIR.mkdir(exist_ok=True)
    if STATE_FILE.exists():
        with open(STATE_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {"seen_uids": []}


def save_state(state: dict) -> None:
    state["seen_uids"] = state["seen_uids"][-500:]
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2)


def send_telegram(msg: str) -> None:
    try:
        requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
            json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=15, verify=VERIFY_SSL,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def main():
    print(f"\n{'='*60}")
    print(f"HARO MONITOR - {datetime.date.today()}")
    print(f"{'='*60}\n")

    state = load_state()
    seen_uids = set(state.get("seen_uids", []))
    new_opportunities = []

    try:
        mail = imaplib.IMAP4_SSL("imap.gmail.com")
        mail.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
        mail.select("INBOX")
    except Exception as e:
        print(f"[ERROR] Gmail IMAP: {e}")
        return

    # Chercher emails des plateformes PR des 7 derniers jours
    since_date = (datetime.date.today() - datetime.timedelta(days=7)).strftime("%d-%b-%Y")

    for sender_domain in PR_SENDERS:
        # Sauter les plateformes au compte suspendu (pitchs impossibles = bruit).
        if sender_domain in SUSPENDED_SOURCES:
            print(f"  {sender_domain}: SKIP (compte suspendu)")
            continue
        try:
            _, data = mail.search(None, f'(FROM "{sender_domain}" SINCE "{since_date}")')
            uids = data[0].split() if data[0] else []
            print(f"  {sender_domain}: {len(uids)} emails trouves")

            for uid in uids:
                uid_str = uid.decode()
                if uid_str in seen_uids:
                    continue

                _, msg_data = mail.fetch(uid, "(RFC822)")
                if not msg_data or not msg_data[0]:
                    continue

                msg = email.message_from_bytes(msg_data[0][1])
                subject = decode_header_value(msg.get("Subject", ""))
                body = get_email_body(msg)

                print(f"    Processing: {subject[:60]}")
                queries = extract_queries_from_digest(body, sender_domain)

                for q in queries:
                    new_opportunities.append(q)
                    print(f"      MATCH [{q.get('score', 0)}]: {q['text'][:80]}")

                seen_uids.add(uid_str)

        except Exception as e:
            print(f"  [WARN] {sender_domain}: {e}")

    mail.logout()

    state["seen_uids"] = list(seen_uids)
    save_state(state)

    # Ne garder que les opportunites reellement pertinentes (le parsing "Pattern 2"
    # peut produire des blocs sans score -> on les ecarte ici).
    new_opportunities = [o for o in new_opportunities if o.get("score", 0) >= MIN_RELEVANCE_SCORE]

    if new_opportunities:
        # Trier par score de pertinence
        new_opportunities.sort(key=lambda x: x.get("score", 0), reverse=True)

        for opp in new_opportunities[:5]:
            template = get_response_template(opp.get("context", opp["text"]))
            kw_str = ", ".join(opp.get("keywords", []))

            msg = (
                f"<b>HARO OPPORTUNITY</b> [{opp.get('score', 0)} pts]\n"
                f"Source: {opp['source']}\n"
                f"Query: <b>{opp['text'][:200]}</b>\n"
                f"Keywords: {kw_str}\n\n"
                f"<b>Draft reponse:</b>\n<pre>{template[:800]}</pre>"
            )
            send_telegram(msg)
            append_pending_action({
                "type":     "haro",
                "date":     datetime.date.today().isoformat(),
                "source":   opp["source"],
                "query":    opp["text"][:300],
                "context":  opp.get("context", "")[:600],
                "keywords": opp.get("keywords", []),
                "score":    opp.get("score", 0),
                "draft":    template[:800],
                "acted":    False,
                "id":       f"haro_{datetime.date.today()}_{abs(hash(opp['text'])) % 100000}",
            })

        print(f"\n{len(new_opportunities)} opportunites trouvees, {min(len(new_opportunities), 5)} alertes envoyees")
    else:
        print("\nAucune opportunite PR pertinente trouvee")


if __name__ == "__main__":
    main()
