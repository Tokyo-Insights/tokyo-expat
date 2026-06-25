"""
facebook_buffer_poster.py -- Poste sur Facebook ET LinkedIn via Buffer (GraphQL API)
Tourne chaque lundi (step 20 du bat). Facebook: 1x/semaine mercredi 18h Tokyo.
LinkedIn: 1x/semaine (slot separe configurable sur buffer.com).

SETUP (une seule fois) :
1. developers.buffer.com -> Personal Keys -> + New Key -> BUFFER_ACCESS_TOKEN
2. buffer.com -> Connect channels -> Facebook Page + LinkedIn Page
3. python scripts/facebook_buffer_poster.py --channels -> copier les IDs
4. Dans scripts/.env : BUFFER_FB_PROFILE_ID + BUFFER_LI_PROFILE_ID

Commandes :
  python scripts/facebook_buffer_poster.py              # poste FB + LI
  python scripts/facebook_buffer_poster.py --preview    # affiche sans poster
  python scripts/facebook_buffer_poster.py --channels   # liste les channels
  python scripts/facebook_buffer_poster.py --fb-only    # Facebook uniquement
  python scripts/facebook_buffer_poster.py --li-only    # LinkedIn uniquement
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
BUFFER_FB_ID = os.environ.get('BUFFER_FB_PROFILE_ID', '')
BUFFER_LI_ID = os.environ.get('BUFFER_LI_PROFILE_ID', '')
BUFFER_API = "https://api.buffer.com"
ORG_ID = "6a391594712e9cd1277e3307"

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
FB_STATE = DATA_DIR / "facebook_buffer_posted.json"
LI_STATE = DATA_DIR / "linkedin_buffer_posted.json"
QUEUE_FB_FILE = DATA_DIR / "content_queue_fb.json"
QUEUE_LI_FILE = DATA_DIR / "content_queue_li.json"

# ---------------------------------------------------------------------------
# TEMPLATES FACEBOOK (conversationnel, hashtags, 150-250 mots)
# ---------------------------------------------------------------------------
FB_TEMPLATES = [
    (
        "Finding an apartment in Tokyo as a foreigner -- the honest guide.\n\n"
        "After helping expats secure housing in Tokyo, here are the 3 things "
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
        "Japan Digital Nomad Visa -- what remote workers need to know:\n\n"
        "Duration: up to 6 months (extendable once = up to 1 year)\n"
        "Income requirement: around 10 million JPY/year (~65,000 USD)\n"
        "Rule: work remotely for a company based outside Japan\n"
        "Countries eligible: 50+ including France, UK, USA, Canada, Australia\n\n"
        "For housing: furnished apartments on monthly contracts are the right fit.\n"
        "Full guide: www.tokyo-expat.com/en/blog/japan-digital-nomad-visa-2026\n\n"
        "#DigitalNomad #RemoteWork #JapanVisa #TokyoExpat"
    ),
    (
        "Share house vs apartment in Tokyo -- which to choose first?\n\n"
        "Share house: no guarantor, 1 month deposit, utilities included, flexible terms\n"
        "Regular apartment: more privacy, cheaper long-term, builds rental history\n\n"
        "Recommendation for first-time arrivals:\n"
        "3-6 months share house while you learn the city, then your own apartment.\n\n"
        "#TokyoShareHouse #TokyoHousing #JapanExpat #TokyoLife"
    ),
    (
        "The Japanese guarantor system explained for foreigners:\n\n"
        "Most Japanese landlords require a guarantor (hoshogaisha) before signing.\n"
        "As a foreigner you usually don't have one -- so what do you do?\n\n"
        "3 options that work:\n"
        "1. Rental guarantee company (~0.5-1 month rent upfront)\n"
        "2. Company-sponsored housing (if your employer is Japanese)\n"
        "3. 'Foreigner OK' properties with no guarantor required\n\n"
        "Share houses skip this problem entirely.\n\n"
        "#JapanRenting #TokyoExpat #JapanHousing #MovingToJapan"
    ),
]

# ---------------------------------------------------------------------------
# TEMPLATES LINKEDIN (professionnel, pas de hashtag spam, 100-200 mots)
# ---------------------------------------------------------------------------
LI_TEMPLATES = [
    (
        "Most expats moving to Tokyo spend weeks searching for housing after they arrive. "
        "The ones who sort it out before landing do it differently.\n\n"
        "Three things that change the outcome:\n\n"
        "1. Starting 6-8 weeks before the move date, not 2\n"
        "2. Using rental guarantee companies -- removes the guarantor requirement that blocks most foreigners\n"
        "3. Treating share houses as a 3-month bridge, not a compromise\n\n"
        "Tokyo's rental market is fast. Properties at the right price are gone within days.\n\n"
        "If you or someone on your team is relocating to Tokyo, I'm happy to answer specific questions.\n\n"
        "www.tokyo-expat.com"
    ),
    (
        "Tokyo housing costs in 2026, for professionals being relocated:\n\n"
        "1K apartment (central ward): 80,000-130,000 JPY/month\n"
        "2LDK (family): 150,000-250,000 JPY/month\n"
        "Share house (furnished, all-in): 55,000-90,000 JPY/month\n\n"
        "The gap between share house and apartment is significant. "
        "For short assignments (3-12 months), share houses are often the better financial choice. "
        "For families or multi-year postings, a dedicated apartment makes sense.\n\n"
        "Happy to share a more detailed breakdown for your specific situation.\n\n"
        "www.tokyo-expat.com"
    ),
    (
        "Japan launched its Digital Nomad Visa in 2024. "
        "Two years in, here is what actually matters for professionals considering it:\n\n"
        "Income threshold: ~10M JPY/year (approximately 65,000 USD)\n"
        "Duration: 6 months, extendable once to 12 months\n"
        "Key rule: your employer must be based outside Japan\n\n"
        "The housing question comes up immediately after the visa is approved. "
        "Monthly furnished apartments are the right format -- no long-term lease, "
        "no guarantor required, and all utilities included.\n\n"
        "Guide with full details: www.tokyo-expat.com/en/blog/japan-digital-nomad-visa-2026"
    ),
    (
        "The part of relocating to Tokyo that HR guides usually miss:\n\n"
        "Japanese rental contracts require a guarantor. "
        "For foreign nationals without a Japanese cosigner, this blocks most standard apartments.\n\n"
        "Three practical solutions:\n"
        "1. Rental guarantee companies (hoshogaisha) -- most common, costs 0.5-1 month rent upfront\n"
        "2. Company-sponsored housing -- landlord contracts directly with the employer\n"
        "3. Share houses and serviced apartments -- no guarantor required\n\n"
        "Knowing this in advance saves 2-3 weeks of lost time during onboarding.\n\n"
        "www.tokyo-expat.com"
    ),
    (
        "Professionals relocating to Tokyo often ask: which neighbourhood?\n\n"
        "The honest answer depends on three things: commute destination, budget, and lifestyle.\n\n"
        "For most central office locations:\n"
        "Shinjuku and Shibuya: high convenience, higher cost\n"
        "Koenji, Nakameguro, Sangenjaya: slightly lower cost, strong community feel\n"
        "Suginami, Setagaya: quieter, good for families, strong train access\n\n"
        "Proximity to a major train line matters more than the ward name. "
        "Tokyo's train network means 3-4 stops can change both the price and the feel of a neighbourhood significantly.\n\n"
        "I publish a guide covering this in detail: www.tokyo-expat.com/en/blog/tokyo-neighbourhoods-expats-guide"
    ),
]

# ---------------------------------------------------------------------------
# GraphQL
# ---------------------------------------------------------------------------
ORG_QUERY = """
query {
    account {
        organizations {
            id
            name
        }
    }
}
"""

CHANNELS_QUERY = """
query GetChannels($orgId: OrganizationId!) {
    channels(input: { organizationId: $orgId }) {
        id
        name
        displayName
        service
        isQueuePaused
    }
}
"""

CREATE_POST_MUTATION = """
mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
        ... on PostActionSuccess {
            post {
                id
                status
            }
        }
        ... on MutationError {
            message
        }
    }
}
"""


def graphql(query: str, variables: dict | None = None) -> dict:
    payload: dict = {"query": query}
    if variables:
        payload["variables"] = variables
    r = requests.post(
        BUFFER_API,
        json=payload,
        headers={"Authorization": f"Bearer {BUFFER_TOKEN}", "Content-Type": "application/json"},
        timeout=20, verify=VERIFY_SSL,
    )
    if not r.ok:
        return {"errors": [{"message": f"HTTP {r.status_code}: {r.text[:300]}"}]}
    return r.json()


def send_telegram(msg: str):
    try:
        requests.post(
            f"https://api.telegram.org/bot{TE_TOKEN}/sendMessage",
            json={"chat_id": TE_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10, verify=VERIFY_SSL,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def load_state(path: Path) -> dict:
    DATA_DIR.mkdir(exist_ok=True)
    if path.exists():
        try:
            return json.loads(path.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {"posted": [], "last_post_date": "", "post_count": 0, "posted_indices": []}


def save_state(path: Path, state: dict):
    path.write_text(json.dumps(state, indent=2, ensure_ascii=False), encoding="utf-8")


def pick(templates: list, state: dict) -> str:
    used = state.get("posted_indices", [])
    available = [i for i in range(len(templates)) if i not in used]
    if not available:
        state["posted_indices"] = []
        available = list(range(len(templates)))
    idx = random.choice(available)
    state.setdefault("posted_indices", []).append(idx)
    return templates[idx]


def pick_from_queue(queue_path: Path) -> str | None:
    """
    Retourne le prochain post non-poste de la queue generee par generate_content_queue.py.
    Reset auto quand tous les posts ont ete envoyes.
    Retourne None si le fichier n'existe pas (fallback vers les templates hardcodes).
    """
    if not queue_path.exists():
        return None
    try:
        data = json.loads(queue_path.read_text(encoding="utf-8"))
        queue = data.get("queue", [])
        if not queue:
            return None
        unposted = [i for i, item in enumerate(queue) if not item.get("posted")]
        if not unposted:
            for item in queue:
                item["posted"] = False
                item["posted_date"] = None
            unposted = list(range(len(queue)))
        idx = unposted[0]
        text = queue[idx]["text"]
        queue[idx]["posted"] = True
        queue[idx]["posted_date"] = datetime.date.today().isoformat()
        data["posted_count"] = sum(1 for item in queue if item.get("posted"))
        data["remaining"] = len(queue) - data["posted_count"]
        queue_path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
        return text
    except Exception as e:
        print(f"[WARN] Queue read error: {e}")
        return None


def too_recent(state: dict, min_days: int = 6) -> bool:
    last = state.get("last_post_date", "")
    if not last:
        return False
    try:
        return (datetime.date.today() - datetime.date.fromisoformat(last)).days < min_days
    except Exception:
        return False


def post_to_channel(text: str, channel_id: str, service: str) -> dict:
    variables: dict = {
        "input": {
            "text": text,
            "channelId": channel_id,
            "schedulingType": "automatic",
            "mode": "addToQueue",
        }
    }
    if service == "facebook":
        variables["input"]["metadata"] = {"facebook": {"type": "post"}}

    result = graphql(CREATE_POST_MUTATION, variables)
    errors = result.get("errors")
    if errors:
        return {"ok": False, "error": errors[0].get("message", str(errors))}
    post_data = result.get("data", {}).get("createPost", {})
    if post_data.get("message"):
        return {"ok": False, "error": post_data["message"]}
    post = post_data.get("post", {})
    return {"ok": True, "id": post.get("id", "?"), "status": post.get("status", "?")}


def run_facebook(preview: bool = False):
    if not BUFFER_FB_ID:
        print("[FB] BUFFER_FB_PROFILE_ID manquant dans .env")
        return
    state = load_state(FB_STATE)
    if too_recent(state) and not preview:
        print(f"[FB] Post trop recent ({state['last_post_date']}). Skip.")
        return
    text = pick_from_queue(QUEUE_FB_FILE) or pick(FB_TEMPLATES, state)
    if preview:
        print(f"\n[FB PREVIEW]\n{text}\n")
        return
    r = post_to_channel(text, BUFFER_FB_ID, "facebook")
    today = datetime.date.today().isoformat()
    if r["ok"]:
        state["posted"].append({"date": today, "text": text[:80], "id": r["id"]})
        state["last_post_date"] = today
        state["post_count"] = state.get("post_count", 0) + 1
        save_state(FB_STATE, state)
        send_telegram(f"<b>Facebook Buffer</b> -- {today}\nStatus: {r['status']} | ID: {r['id']}\n<i>{text[:60]}...</i>")
        print(f"[FB] OK -- ID {r['id']} | {r['status']}")
    else:
        send_telegram(f"<b>Facebook Buffer ERREUR</b> -- {today}\n{r['error'][:200]}")
        print(f"[FB] Erreur: {r['error']}")


def run_linkedin(preview: bool = False):
    if not BUFFER_LI_ID:
        print("[LI] BUFFER_LI_PROFILE_ID manquant dans .env")
        return
    state = load_state(LI_STATE)
    if too_recent(state) and not preview:
        print(f"[LI] Post trop recent ({state['last_post_date']}). Skip.")
        return
    text = pick_from_queue(QUEUE_LI_FILE) or pick(LI_TEMPLATES, state)
    if preview:
        print(f"\n[LI PREVIEW]\n{text}\n")
        return
    r = post_to_channel(text, BUFFER_LI_ID, "linkedin")
    today = datetime.date.today().isoformat()
    if r["ok"]:
        state["posted"].append({"date": today, "text": text[:80], "id": r["id"]})
        state["last_post_date"] = today
        state["post_count"] = state.get("post_count", 0) + 1
        save_state(LI_STATE, state)
        send_telegram(f"<b>LinkedIn Buffer</b> -- {today}\nStatus: {r['status']} | ID: {r['id']}\n<i>{text[:60]}...</i>")
        print(f"[LI] OK -- ID {r['id']} | {r['status']}")
    else:
        send_telegram(f"<b>LinkedIn Buffer ERREUR</b> -- {today}\n{r['error'][:200]}")
        print(f"[LI] Erreur: {r['error']}")


def cmd_channels():
    if not BUFFER_TOKEN:
        print("BUFFER_ACCESS_TOKEN manquant dans .env")
        return
    org = graphql(ORG_QUERY)
    orgs = org.get("data", {}).get("account", {}).get("organizations", [])
    if not orgs:
        print("Aucune organisation. Verifie le token.")
        return
    org_id = orgs[0]["id"]
    result = graphql(CHANNELS_QUERY, {"orgId": org_id})
    channels = result.get("data", {}).get("channels", [])
    print(f"\n{len(channels)} channel(s) connecte(s) :\n")
    for c in channels:
        paused = " [PAUSED]" if c.get("isQueuePaused") else ""
        print(f"  Service : {c.get('service')}")
        print(f"  Name    : {c.get('displayName') or c.get('name')}")
        print(f"  ID      : {c.get('id')}{paused}\n")


if __name__ == "__main__":
    args = sys.argv[1:]
    preview = "--preview" in args

    if "--channels" in args:
        cmd_channels()
    elif "--fb-only" in args:
        run_facebook(preview)
    elif "--li-only" in args:
        run_linkedin(preview)
    else:
        run_facebook(preview)
        run_linkedin(preview)
