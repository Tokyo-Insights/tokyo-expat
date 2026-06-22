"""
facebook_page_autoposter.py -- Poste sur la page Facebook Tokyo Expat (sans API)
Utilise Selenium (browser visible, pas headless) car Facebook detecte headless.
Page : facebook.com/profile.php?id=61591352422178

IMPORTANT : Facebook detecte les bots. En cas de CAPTCHA, resoudre manuellement
dans la fenetre du browser qui s'ouvre. Le script attend jusqu'a 120s.

Credentials dans scripts/.env:
  FACEBOOK_EMAIL=ton_email
  FACEBOOK_PASSWORD=ton_mot_de_passe

Run: python scripts/facebook_page_autoposter.py
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

FACEBOOK_EMAIL = os.environ.get('FACEBOOK_EMAIL', '')
FACEBOOK_PASSWORD = os.environ.get('FACEBOOK_PASSWORD', '')
PAGE_URL = "https://www.facebook.com/profile.php?id=61591352422178"
PAGE_ID_LABEL = "61591352422178"

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
STATE_FILE = DATA_DIR / "facebook_posted.json"
SHARED_ARTICLES_FILE = DATA_DIR / "shared_articles.json"

# Contenu des posts FB (rotation, max 1 post par semaine)
POST_TEMPLATES = [
    (
        "Finding an apartment in Tokyo as a foreigner — the honest guide.\n\n"
        "After helping dozens of expats secure housing in Tokyo, here are the 3 things "
        "most people get wrong before they even start:\n\n"
        "1. Starting the search too late (6-8 weeks minimum needed)\n"
        "2. Ignoring share houses as a first step\n"
        "3. Not knowing about rental guarantee companies (removes the guarantor problem)\n\n"
        "Full guide on the site. Link in bio.\n\n"
        "#TokyoExpat #TokyoApartment #MovingToJapan #JapanExpat #TokyoHousing"
    ),
    (
        "The cost of living in Tokyo in 2025 — real numbers, not tourist estimates.\n\n"
        "Single expat, working remotely or salaried:\n"
        "Housing: 65,000-120,000 JPY (ward matters enormously)\n"
        "Food: 40,000-70,000 JPY\n"
        "Transport: 8,000-15,000 JPY\n"
        "Health insurance: 10,000-20,000 JPY\n"
        "Phone: 2,000-4,000 JPY (MVNO)\n\n"
        "Total realistic range: 150,000-250,000 JPY/month.\n"
        "Tokyo is expensive — but less than London, Paris, or Sydney for equivalent quality.\n\n"
        "#TokyoCostOfLiving #TokyoExpat #JapanExpat #MovingToJapan"
    ),
    (
        "Share house vs apartment in Tokyo — which one should you choose first?\n\n"
        "Share house pros:\n"
        "No guarantor needed, 1 month deposit only, utilities included, flexible terms\n\n"
        "Regular apartment pros:\n"
        "More privacy, cheaper long-term, build a rental history in Japan\n\n"
        "My recommendation for first-time arrivals: 3-6 months in a share house "
        "while you learn which ward/neighbourhood actually fits your lifestyle. "
        "Then move to your own apartment with confidence.\n\n"
        "#TokyoShareHouse #TokyoHousing #JapanExpat #TokyoLife"
    ),
    (
        "You can find and sign a Tokyo apartment BEFORE you land. Here's how.\n\n"
        "Most expat-friendly operators now accept:\n"
        "Video calls instead of in-person visits\n"
        "International bank transfers for deposits\n"
        "Digital signature for contracts\n\n"
        "The key: start 6-8 weeks before your arrival date. "
        "The best properties don't wait 3 weeks for you to 'think about it.'\n\n"
        "DM me if you want to know which agencies work remotely with foreign applicants.\n\n"
        "#MovingToTokyo #TokyoApartment #JapanRelocation #ExpatsInJapan"
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
    return {"posted": [], "last_post_date": "", "post_count": 0}


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


def main():
    if not FACEBOOK_EMAIL or not FACEBOOK_PASSWORD:
        print("Credentials manquants dans scripts/.env (FACEBOOK_EMAIL / FACEBOOK_PASSWORD)")
        return

    state = load_state()
    today = datetime.date.today().isoformat()

    # Max 1 post par semaine
    last_post = state.get("last_post_date", "")
    if last_post:
        try:
            days_since = (datetime.date.today() - datetime.date.fromisoformat(last_post)).days
            if days_since < 6:
                print(f"Post deja fait il y a {days_since} jours. Prochain post dans {6-days_since} jours.")
                return
        except Exception:
            pass

    try:
        from selenium import webdriver
        from selenium.webdriver.common.by import By
        from selenium.webdriver.chrome.options import Options
        from selenium.webdriver.support.ui import WebDriverWait
        from selenium.webdriver.support import expected_conditions as EC
    except ImportError:
        print("Selenium non installe: pip install selenium")
        return

    # IMPORTANT: PAS headless — Facebook detecte headless aggressivement
    opts = Options()
    opts.add_argument("--window-size=1280,900")
    opts.add_argument("--disable-blink-features=AutomationControlled")
    opts.add_experimental_option("excludeSwitches", ["enable-automation"])
    opts.add_experimental_option("useAutomationExtension", False)

    driver = webdriver.Chrome(options=opts)
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

    try:
        post_text = pick_post(state)

        # Login
        print("Connexion a Facebook...")
        driver.get("https://www.facebook.com/")
        time.sleep(4)

        try:
            driver.find_element(By.ID, "email").send_keys(FACEBOOK_EMAIL)
            driver.find_element(By.ID, "pass").send_keys(FACEBOOK_PASSWORD)
            driver.find_element(By.NAME, "login").click()
            time.sleep(6)
        except Exception as e:
            print(f"Erreur login: {e}")
            driver.quit()
            return

        if "login" in driver.current_url.lower():
            print("Login echoue ou CAPTCHA. Resoudre manuellement dans la fenetre...")
            input("Appuie sur Entree apres avoir valide le login manuellement: ")

        # Naviguer vers la page
        print(f"Navigation vers la page {PAGE_ID_LABEL}...")
        driver.get(PAGE_URL)
        time.sleep(5)

        # Chercher le champ "Ecrire quelque chose"
        post_box = None
        selectors = [
            "[aria-label='Write something...']",
            "[aria-label='Ecrire quelque chose...']",
            "[aria-label='Create a post']",
            "div[role='button'][tabindex='0']",
        ]

        for sel in selectors:
            try:
                elements = driver.find_elements(By.CSS_SELECTOR, sel)
                for el in elements:
                    if el.is_displayed():
                        post_box = el
                        break
                if post_box:
                    break
            except Exception:
                continue

        if not post_box:
            # Essayer de cliquer sur "Create post" button
            try:
                create_btns = [b for b in driver.find_elements(By.TAG_NAME, 'div')
                               if 'create' in (b.text or '').lower() and b.is_displayed()]
                if create_btns:
                    post_box = create_btns[0]
            except Exception:
                pass

        if not post_box:
            print("Champ de post introuvable. Capture d'ecran -> c:/tmp/fb_debug.png")
            driver.save_screenshot("c:/tmp/fb_debug.png")
            driver.quit()
            return

        driver.execute_script("arguments[0].click();", post_box)
        time.sleep(3)

        # Trouver le textarea de composition
        compose_area = None
        compose_selectors = [
            "div[contenteditable='true'][role='textbox']",
            "div[contenteditable='true']",
        ]
        for sel in compose_selectors:
            els = driver.find_elements(By.CSS_SELECTOR, sel)
            if els:
                compose_area = els[-1]
                break

        if not compose_area:
            print("Zone de composition introuvable.")
            driver.save_screenshot("c:/tmp/fb_compose_debug.png")
            driver.quit()
            return

        compose_area.click()
        time.sleep(1)
        compose_area.send_keys(post_text)
        time.sleep(2)

        # Soumettre
        submit_btn = None
        for b in driver.find_elements(By.TAG_NAME, 'div'):
            txt = (b.text or '').lower().strip()
            if txt in ['post', 'publier', 'share', 'partager'] and b.is_displayed():
                submit_btn = b
                break

        if not submit_btn:
            btns = driver.find_elements(By.CSS_SELECTOR, 'div[aria-label="Post"], div[aria-label="Publier"]')
            if btns:
                submit_btn = btns[0]

        if not submit_btn:
            print("Bouton Post introuvable. Post a soumettre manuellement.")
            input("Appuie sur Entree apres avoir soumis manuellement: ")
        else:
            driver.execute_script("arguments[0].click();", submit_btn)
            time.sleep(5)

        # Verifier succes
        print("Post soumis (ou soumis manuellement).")
        state["posted"].append({"date": today, "text": post_text[:100]})
        state["last_post_date"] = today
        state["post_count"] = state.get("post_count", 0) + 1
        save_state(state)

        send_telegram(
            f"<b>FACEBOOK PAGE</b> — {today}\n"
            f"Post publie sur la page Tokyo Expat ({PAGE_ID_LABEL}).\n"
            f"Total posts : {state['post_count']}"
        )
        print("Telegram envoye.")

    finally:
        time.sleep(3)
        driver.quit()


if __name__ == "__main__":
    main()
