"""
linkedin_autoposter.py -- Poste sur LinkedIn (profil Alessandro / Page Tokyo Expat)
Selenium visible (non headless) -- 1 post par semaine, templates rotatifs.

LinkedIn tolere l'automation mieux que Facebook mais reste sensible.
Ne pas lancer trop souvent.

Credentials dans scripts/.env:
  LINKEDIN_EMAIL=ton_email
  LINKEDIN_PASSWORD=ton_mot_de_passe

Run: python scripts/linkedin_autoposter.py
"""

import json
import datetime
import time
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

LINKEDIN_EMAIL = os.environ.get('LINKEDIN_EMAIL', '')
LINKEDIN_PASSWORD = os.environ.get('LINKEDIN_PASSWORD', '')

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
STATE_FILE = DATA_DIR / "linkedin_posted.json"

# 5 templates rotatifs -- ton professionnel, niche logement/relocation Tokyo
POST_TEMPLATES = [
    {
        "text": (
            "3 things foreigners don't know before renting in Tokyo:\n\n"
            "1. Reikin (key money) -- a non-refundable fee paid directly to the landlord, "
            "separate from the deposit. Still common in older buildings. "
            "New constructions skip it more often.\n\n"
            "2. The guarantor requirement -- most landlords need a Japanese guarantor. "
            "Rental guarantee companies solve this for about 0.5 months rent per year.\n\n"
            "3. The apartment is unfurnished -- no curtain rails, no light fixtures, "
            "just bare walls and floors. Budget 150,000 to 300,000 JPY for initial furnishing.\n\n"
            "Planning a Tokyo move? Happy to answer specific questions in the comments.\n\n"
            "#TokyoExpat #JapanExpat #MovingToJapan #TokyoHousing #ExpatLife"
        ),
    },
    {
        "text": (
            "Tokyo rental market update (2026):\n\n"
            "Share house vacancy rates are below 5% in Shinjuku and Shibuya wards. "
            "The best properties are taken within 24 to 48 hours of listing.\n\n"
            "What this means for expats planning a move:\n"
            "Start your housing search 6 to 8 weeks before arrival -- not 2 weeks.\n\n"
            "The foreigners who secure the best apartments aren't the ones with the "
            "strongest dossier. They're the ones who apply first.\n\n"
            "Full apartment hunting guide: www.tokyo-expat.com/en/blog/tokyo-apartment-hunting-from-abroad\n\n"
            "#TokyoRealEstate #JapanHousing #TokyoExpat #ExpatJapan"
        ),
    },
    {
        "text": (
            "Japan launched a Digital Nomad Visa in March 2024. Key details for remote workers:\n\n"
            "Duration: up to 6 months (extendable once)\n"
            "Income floor: ~10 million JPY/year ($65,000 USD)\n"
            "Rule: you must work remotely for a company based OUTSIDE Japan\n"
            "Eligible: 50+ countries including France, UK, USA, Canada, Australia\n\n"
            "The housing reality: furnished apartments on monthly contracts are the practical choice. "
            "Demand is high and the best units go fast.\n\n"
            "Visa + housing guide: www.tokyo-expat.com/en/blog/japan-digital-nomad-visa-2026\n\n"
            "#DigitalNomad #RemoteWork #JapanVisa #TokyoExpat #WorkFromJapan"
        ),
    },
    {
        "text": (
            "Share house vs apartment in Tokyo -- which to choose as a first-time expat?\n\n"
            "Share house:\n"
            "No guarantor, 1 month deposit, utilities included, 1 month minimum term\n"
            "Cost: 55,000 to 90,000 JPY/month all-in\n\n"
            "Regular apartment:\n"
            "More privacy, cheaper per sqm long-term, builds Japanese rental history\n"
            "Cost: 80,000 to 130,000 JPY/month unfurnished (central wards)\n\n"
            "My recommendation for arrivals with no Japan rental history:\n"
            "3 to 6 months share house while you learn which ward fits your life, "
            "then move to your own apartment with context.\n\n"
            "#TokyoShareHouse #TokyoHousing #JapanExpat"
        ),
    },
    {
        "text": (
            "Realistic Tokyo cost of living for a single expat (2026):\n\n"
            "Rent 1K central ward: 80,000 to 130,000 JPY\n"
            "Share house all-in: 55,000 to 90,000 JPY\n"
            "Food (home cook + 3x restaurant/week): 45,000 to 65,000 JPY\n"
            "Transport IC card: 8,000 to 15,000 JPY\n"
            "National health insurance: 10,000 to 20,000 JPY\n"
            "Phone MVNO: 2,000 to 4,000 JPY\n\n"
            "Total range: 150,000 to 250,000 JPY/month\n\n"
            "Tokyo is expensive by Asian standards. "
            "But compared to London, Paris or Sydney for equivalent quality of life -- "
            "it's surprisingly close.\n\n"
            "#TokyoCostOfLiving #ExpatTokyo #JapanExpat"
        ),
    },
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


def pick_post(state: dict) -> dict:
    used = state.get("posted_indices", [])
    available = [i for i in range(len(POST_TEMPLATES)) if i not in used]
    if not available:
        state["posted_indices"] = []
        available = list(range(len(POST_TEMPLATES)))
    idx = random.choice(available)
    state.setdefault("posted_indices", []).append(idx)
    return POST_TEMPLATES[idx]


def type_multiline(compose, text: str, driver):
    """Type multiline text dans un contenteditable LinkedIn."""
    # Essayer clipboard d'abord
    try:
        import pyperclip
        from selenium.webdriver.common.keys import Keys
        pyperclip.copy(text)
        compose.click()
        time.sleep(0.5)
        compose.send_keys(Keys.CONTROL, 'v')
        return
    except Exception:
        pass

    # Fallback : injecter via JavaScript + dispatch input event
    safe_text = text.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
    driver.execute_script("""
        var el = arguments[0];
        var text = arguments[1];
        el.focus();
        el.textContent = text;
        el.dispatchEvent(new Event('input', {bubbles: true}));
        el.dispatchEvent(new Event('change', {bubbles: true}));
    """, compose, text)


def main():
    if not LINKEDIN_EMAIL or not LINKEDIN_PASSWORD:
        send_telegram("<b>LINKEDIN</b> — credentials manquants dans scripts/.env\n(LINKEDIN_EMAIL + LINKEDIN_PASSWORD)")
        print("Credentials manquants.")
        return

    state = load_state()
    today = datetime.date.today().isoformat()

    last_post = state.get("last_post_date", "")
    if last_post:
        try:
            days_since = (datetime.date.today() - datetime.date.fromisoformat(last_post)).days
            if days_since < 6:
                print(f"Post fait il y a {days_since}j. Prochain dans {6 - days_since}j.")
                return
        except Exception:
            pass

    try:
        from selenium import webdriver
        from selenium.webdriver.common.by import By
        from selenium.webdriver.chrome.options import Options
        from selenium.webdriver.support.ui import WebDriverWait
        from selenium.webdriver.support import expected_conditions as EC
        from selenium.webdriver.common.keys import Keys
    except ImportError:
        print("pip install selenium")
        return

    opts = Options()
    opts.add_argument("--window-size=1280,900")
    opts.add_argument("--disable-blink-features=AutomationControlled")
    opts.add_experimental_option("excludeSwitches", ["enable-automation"])
    opts.add_experimental_option("useAutomationExtension", False)
    opts.add_argument("--disable-notifications")

    driver = webdriver.Chrome(options=opts)
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

    try:
        post = pick_post(state)
        post_text = post["text"]

        print("Connexion a LinkedIn...")
        driver.get("https://www.linkedin.com/login")
        time.sleep(3)

        try:
            driver.find_element(By.ID, "username").send_keys(LINKEDIN_EMAIL)
            driver.find_element(By.ID, "password").send_keys(LINKEDIN_PASSWORD)
            driver.find_element(By.CSS_SELECTOR, "button[data-litms-control-urn='login-submit']").click()
        except Exception:
            driver.find_element(By.ID, "password").send_keys(Keys.RETURN)
        time.sleep(6)

        if "checkpoint" in driver.current_url or "challenge" in driver.current_url:
            print("Verification LinkedIn requise. Completer dans la fenetre...")
            input("Appuie sur Entree apres verification : ")

        driver.get("https://www.linkedin.com/feed/")
        time.sleep(4)

        # Bouton "Start a post"
        post_box = None
        for selector in [
            "button[aria-label='Start a post, try a video or a photo']",
            "button[aria-label='Start a post']",
            ".share-box-feed-entry__trigger",
            "[data-control-name='share_via_feed']",
        ]:
            try:
                el = driver.find_element(By.CSS_SELECTOR, selector)
                if el.is_displayed():
                    post_box = el
                    break
            except Exception:
                continue

        if not post_box:
            for b in driver.find_elements(By.TAG_NAME, "button"):
                if "start a post" in (b.text or "").lower() and b.is_displayed():
                    post_box = b
                    break

        if not post_box:
            driver.save_screenshot("c:/tmp/li_debug.png")
            send_telegram(f"<b>LINKEDIN</b> — bouton Start a post introuvable. Screenshot: c:/tmp/li_debug.png")
            driver.quit()
            return

        driver.execute_script("arguments[0].click();", post_box)
        time.sleep(3)

        # Zone de composition
        compose = None
        for selector in [
            "div.ql-editor[contenteditable='true']",
            "div.editor-content div[contenteditable='true']",
            "div[contenteditable='true'][role='textbox']",
            "div[contenteditable='true']",
        ]:
            els = driver.find_elements(By.CSS_SELECTOR, selector)
            if els:
                compose = els[0]
                break

        if not compose:
            driver.save_screenshot("c:/tmp/li_compose_debug.png")
            send_telegram("<b>LINKEDIN</b> — zone de composition introuvable.")
            driver.quit()
            return

        type_multiline(compose, post_text, driver)
        time.sleep(2)

        # Bouton Post
        submit_btn = None
        for selector in [
            "button.share-actions__primary-action",
            "button[aria-label='Post']",
            "button[data-control-name='share.post']",
        ]:
            try:
                btns = driver.find_elements(By.CSS_SELECTOR, selector)
                for b in btns:
                    if b.is_displayed() and b.is_enabled():
                        submit_btn = b
                        break
                if submit_btn:
                    break
            except Exception:
                continue

        if not submit_btn:
            for b in driver.find_elements(By.TAG_NAME, "button"):
                if b.text.strip().lower() in ["post", "publier"] and b.is_displayed() and b.is_enabled():
                    submit_btn = b
                    break

        if not submit_btn:
            print("Bouton Post introuvable. Soumettre manuellement.")
            input("Appuie sur Entree apres soumission manuelle : ")
        else:
            driver.execute_script("arguments[0].click();", submit_btn)
            time.sleep(5)

        state["posted"].append({"date": today, "text": post_text[:80]})
        state["last_post_date"] = today
        state["post_count"] = state.get("post_count", 0) + 1
        save_state(state)

        send_telegram(
            f"<b>LINKEDIN</b> -- {today}\n"
            f"Post publie. Total : {state['post_count']}\n"
            f"<i>{post_text[:80]}...</i>"
        )
        print("Post LinkedIn soumis. Telegram envoye.")

    finally:
        time.sleep(3)
        driver.quit()


if __name__ == "__main__":
    main()
