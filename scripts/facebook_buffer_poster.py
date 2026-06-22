"""
facebook_buffer_poster.py -- Poste sur Facebook via Buffer API (SANS partager ses credentials Facebook)
Buffer gere l'authentification Facebook ; le script envoie seulement dans la queue Buffer.

SETUP (une seule fois, 5 minutes) :
1. buffer.com -> cree un compte gratuit
2. "Connect a channel" -> choisir Facebook Page -> autoriser la page Tokyo Expat
3. buffer.com/developers -> cree une app -> copie l'Access Token
4. Dans Buffer: va sur ta page connectee -> l'URL contient ton profile_id (ex: 5f9abc123...)
   Sinon : GET https://api.bufferapp.com/1/profiles.json?access_token=TON_TOKEN
5. Ajoute dans scripts/.env :
   BUFFER_ACCESS_TOKEN=xxx
   BUFFER_FB_PROFILE_ID=xxx

Run: python scripts/facebook_buffer_poster.py
"""

import json
import datetime
import sys
import io
import os
import random
import requests
import urllib3
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

_env = Path(__file__).parent / '.env'
if _env.exists():
    for line in _env.read_text(encoding='utf-8').splitlines():
        if '=' in line and not line.startswith('#'):
            k, v = line.split('=', 1)
            os.environ.setdefault(k.strip(), v.strip())

from config import TE_TOKEN, TE_CHAT_ID

BUFFER_TOKEN = os.environ.get('BUFFER_ACCESS_TOKEN', '')
BUFFER_PROFILE_ID = os.environ.get('BUFFER_FB_PROFILE_ID', '')
BUFFER_API = "https://api.bufferapp.com/1"

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
STATE_FILE = DATA_DIR / "facebook_buffer_posted.json"

POST_TEMPLATES = [
    (
        "Finding an apartment in Tokyo as a foreigner -- the honest guide.\n\n"
        "After helping dozens of expats secure housing in Tokyo, here are the 3 things "
        "most people get wrong before they even start:\n\n"
        "1. Starting the search too late (6-8 weeks minimum)\n"
        "2. Ignoring share houses as a first step\n"
        "3. Not knowing about rental guarantee companies (removes the guarantor problem)\n\n"
        "Full guide on the site. Link in bio.\n\n"
        "#TokyoExpat #TokyoApartment #MovingToJapan #JapanExpat #TokyoHousing"
    ),
    (
        "Tokyo cost of living in 2026 -- real numbers for expats:\n\n"
        "Rent (1K, central ward): 80,000-130,000 JPY\n"
        "Share house all-in: 55,000-90,000 JPY\n"
        "Food: 40,000-65,000 JPY\n"
        "Transport: 8,000-15,000 JPY\n"
        "Health insurance: 10,000-20,000 JPY\n"
        "Phone MVNO: 2,000-4,000 JPY\n\n"
        "Total: 150,000-250,000 JPY/month depending on lifestyle.\n"
        "Expensive by Asian standards -- competitive vs London, Paris, Sydney.\n\n"
        "#TokyoCostOfLiving #JapanExpat #MovingToJapan"
    ),
    (
        "Japan Digital Nomad Visa 2024 -- what remote workers need to know:\n\n"
        "Duration: up to 6 months (extendable once = up to 1 year)\n"
        "Income: ~10 million JPY/year ($65,000 USD)\n"
        "Rule: work remotely for a company based OUTSIDE Japan\n"
        "Countries: 50+ including France, UK, USA, Canada, Australia\n\n"
        "For housing: furnished apartments on monthly contracts are the right choice.\n"
        "Full guide: www.tokyo-expat.com/en/blog/japan-digital-nomad-visa-2026\n\n"
        "#DigitalNomad #RemoteWork #JapanVisa #TokyoExpat"
    ),
    (
        "Share house vs apartment in Tokyo -- which to choose first?\n\n"
        "Share house: no guarantor, 1 month deposit, utilities included, flexible terms\n"
        "Regular apartment: more privacy, cheaper long-term, builds rental history\n\n"
        "My recommendation for first-time arrivals:\n"
        "3-6 months share house while you learn the city, then your own apartment.\n\n"
        "#TokyoShareHouse #TokyoHousing #JapanExpat #TokyoLife"
    ),
]


def load_state() -> dict:
    DATA_DIR.mkdir(exist_ok=True)
    if STATE_FILE.exists():
        try:
            with open(STATE_FILE, encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {"posted": [], "last_post_date": "", "post_count": 0, "posted_indices": []}


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


def pick_post(state: dict) -> str:
    used = state.get("posted_indices", [])
    available = [i for i in range(len(POST_TEMPLATES)) if i not in used]
    if not available:
        state["posted_indices"] = []
        available = list(range(len(POST_TEMPLATES)))
    idx = random.choice(available)
    state.setdefault("posted_indices", []).append(idx)
    return POST_TEMPLATES[idx]


def get_profiles(token: str) -> list:
    """Liste les profiles Buffer connectes."""
    try:
        r = requests.get(
            f"{BUFFER_API}/profiles.json",
            params={"access_token": token},
            timeout=10,
        )
        return r.json() if isinstance(r.json(), list) else []
    except Exception:
        return []


def post_to_buffer(text: str, profile_id: str, token: str) -> dict:
    """Envoie le post dans la queue Buffer (sans date = maintenant ou prochain creneau)."""
    try:
        resp = requests.post(
            f"{BUFFER_API}/updates/create.json",
            data={
                "text": text,
                "profile_ids[]": profile_id,
                "now": "true",
            },
            headers={"Authorization": f"Bearer {token}"},
            timeout=15,
        )
        return resp.json()
    except Exception as e:
        return {"error": str(e)}


def main():
    if not BUFFER_TOKEN or not BUFFER_PROFILE_ID:
        msg = (
            "<b>FACEBOOK (Buffer)</b> -- Configuration requise\n\n"
            "Alternative sans partager tes credentials Facebook :\n\n"
            "1. buffer.com -> compte gratuit\n"
            "2. Connect a channel -> Facebook Page -> Tokyo Expat\n"
            "3. buffer.com/developers -> Access Token\n"
            "4. GET /profiles.json pour trouver ton profile_id\n"
            "5. Dans scripts/.env :\n"
            "   BUFFER_ACCESS_TOKEN=xxx\n"
            "   BUFFER_FB_PROFILE_ID=xxx\n\n"
            "<i>Setup unique, 5 minutes. Ensuite tout est automatique.</i>"
        )
        send_telegram(msg)
        print("Buffer credentials manquants. Instructions envoyees sur Telegram.")
        return

    state = load_state()
    today = datetime.date.today().isoformat()

    last_post = state.get("last_post_date", "")
    if last_post:
        try:
            days_since = (datetime.date.today() - datetime.date.fromisoformat(last_post)).days
            if days_since < 6:
                print(f"Post fait il y a {days_since}j. Skip.")
                return
        except Exception:
            pass

    post_text = pick_post(state)
    print(f"Envoi dans Buffer (profile {BUFFER_PROFILE_ID[:8]}...)...")

    result = post_to_buffer(post_text, BUFFER_PROFILE_ID, BUFFER_TOKEN)

    success = result.get("success") or bool(result.get("updates"))
    if success:
        state["posted"].append({"date": today, "text": post_text[:80]})
        state["last_post_date"] = today
        state["post_count"] = state.get("post_count", 0) + 1
        save_state(state)

        send_telegram(
            f"<b>FACEBOOK via Buffer</b> -- {today}\n"
            f"Post ajoute dans la queue. Total : {state['post_count']}\n"
            f"<i>{post_text[:60]}...</i>"
        )
        print("Post envoye dans la queue Buffer.")
    else:
        error = result.get("message") or result.get("error") or str(result)
        send_telegram(f"<b>FACEBOOK Buffer ERREUR</b> -- {today}\n{error[:200]}")
        print(f"Erreur Buffer: {error}")


if __name__ == "__main__":
    import sys as _sys
    # Mode diagnostic : affiche les profiles connectes
    if "--profiles" in _sys.argv:
        if BUFFER_TOKEN:
            profiles = get_profiles(BUFFER_TOKEN)
            for p in profiles:
                print(f"ID: {p.get('id')} | {p.get('service')} | {p.get('formatted_service_type')} | {p.get('service_username')}")
        else:
            print("BUFFER_ACCESS_TOKEN manquant dans .env")
    else:
        main()
