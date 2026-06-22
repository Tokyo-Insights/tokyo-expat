"""
expatcom_replier.py - Repond automatiquement aux sujets existants du forum Tokyo Expat.com
- Trouve 2-3 sujets recents (pas crees par nous)
- Repond avec du contenu utile sur le logement a Tokyo (sans liens)
- Max 2 reponses par semaine pour rester naturel
- Execute par run_weekly_intelligence.bat apres expatcom_autoposter

Credentials dans scripts/.env: EXPATCOM_EMAIL / EXPATCOM_PASSWORD
"""
import sys
import io
import os
import json
import time
import random
import requests
import urllib3
from pathlib import Path
from datetime import datetime, timedelta

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
urllib3.disable_warnings()

sys.path.insert(0, str(Path(__file__).parent))
from config import TE_TOKEN, TE_CHAT_ID

_env = Path(__file__).parent / '.env'
if _env.exists():
    for line in _env.read_text(encoding='utf-8').splitlines():
        if '=' in line and not line.startswith('#'):
            k, v = line.split('=', 1)
            os.environ.setdefault(k.strip(), v.strip())

EXPATCOM_EMAIL = os.environ.get('EXPATCOM_EMAIL', '')
EXPATCOM_PASSWORD = os.environ.get('EXPATCOM_PASSWORD', '')

STATE_FILE = Path(__file__).parent / 'data' / 'expatcom_replies.json'
FORUM_URL = 'https://www.expat.com/en/forum/asia/japan/tokyo/'
OUR_NAME = 'Tokyo Expat'
MAX_REPLIES_PER_RUN = 2

# Reponses thematiques utiles (sans lien)
REPLY_TEMPLATES = {
    'furnished': [
        "Good question! Furnished options in Tokyo fall into 3 main categories: monthly mansions (short-term, all-included but pricey ~100k+ JPY/month), share houses (cheapest, from 50k JPY, social vibe), and regular apartments rented furnished from platforms like Sakura House or OYO. If you're staying 1-3 months, monthly mansions are worth the premium for simplicity. 3+ months, look at unfurnished + buy secondhand furniture from Mercari — it's often cheaper long-term.",
        "For furnished apartments in Tokyo, the key distinction is contract length. Monthly mansions work best for 1-3 months (no guarantor needed, bills included). For longer stays, serviced apartments in areas like Shinjuku or Akihabara start around 150-200k JPY/month all-in. Share houses are the budget option — check Sakura House or Tokyo Cheap House, rooms from 50k JPY including utilities.",
    ],
    'rent': [
        "Rent in Tokyo varies a lot by ward. As a rough guide for 1-room (1K/1DK): Shinjuku/Shibuya 80-120k JPY, Sumida/Koto 55-75k JPY, Adachi/Edogawa 45-65k JPY. Add 20-30% for furnished. The outer Yamanote stops (Nishi-Nippori, Jujo, Itabashi) give the best price/commute ratio in my experience.",
        "The 'true cost' of renting in Tokyo includes: rent + kyoeki-hi (building maintenance, 3-10k JPY/month) + internet + utilities. Budget about 15-20% on top of the listed rent for total monthly cost. Also factor in initial fees — typically 1-2 months deposit + 1 month agency fee = 3 months rent upfront.",
    ],
    'neighborhood': [
        "For expats new to Tokyo, I'd suggest looking at stations on the JR Yamanote Line or Chuo Line first — maximum connectivity, you can get anywhere in 20-30 min. Nakameguro, Shimokitazawa and Koenji have a strong expat community and good English support. For more budget-friendly options with still good transit, Kita-Senju (TX/Hibiya) and Musashi-Koyama (Meguro Line) are underrated.",
        "The ward you choose in Tokyo matters more than people think. 23 wards, very different vibes and prices. Minato/Shibuya/Shinjuku = expensive, very international. Suginami/Setagaya = quieter residential, mid-range. Sumida/Koto/Arakawa = best value with good subway access. If your company is in Marunouchi or Shinjuku, living along the Sobu or Chuo Line gives a direct commute.",
    ],
    'sharehouse': [
        "Share houses in Tokyo are a great entry point — no Japanese guarantor, usually just 1 month deposit, utilities included. Main networks: Sakura House (300+ properties, English support), Tokyo Cheap House (budget), OakHouse (more premium, events). Expect 45-80k JPY/month for a private room. The catch: rooms fill fast, especially September-October when corporate transfers happen.",
        "Share houses work really well for the first 3-6 months in Tokyo while you find your feet. You don't need a hanko, no complex paperwork, often week-to-week or month-to-month. The social aspect is genuinely useful — housemates often share local tips, secondhand furniture, and sometimes help with Japanese bureaucracy. Just research the noise policy if you work early shifts.",
    ],
    'visa': [
        "For renting in Tokyo on a work visa, most agencies require: a valid residence card (zairyu card), proof of employment (employment certificate in Japanese), and either a Japanese guarantor or a rental guarantee company (hoshogaisha). Guarantor companies charge ~0.5-1 month rent upfront, renewable annually. Worth it to avoid the guarantor hassle.",
        "Finding an apartment in Tokyo without Japanese takes some effort but it's very doable. Use agencies with English service: Suumo has English filters, Real Estate Tokyo and Tokyo Room Finder are fully English-operated. If you're working for a company, HR often has preferred partner agencies with pre-negotiated no-key-money deals.",
    ],
    'general': [
        "The biggest mistake I see expats make with Tokyo housing is signing up for an expensive monthly mansion for 6 months 'to take their time looking.' You can realistically find and sign a regular apartment in 1-2 weeks if you prepare your documents in advance (income proof, employment certificate, residence card). The secondhand market on Mercari + Facebook Marketplace makes furnishing for under 50k JPY very feasible.",
        "One thing that trips people up: Tokyo apartments listed on major platforms often get taken within 24-48 hours. If you're relocating, do a scouting trip 4-6 weeks before your start date, not 1 week. Also, some landlords still don't accept foreign tenants — filtering by 'foreigner OK' (外国人可) on Japanese sites will save you wasted visits.",
    ],
}


def send_telegram(text: str) -> bool:
    r = requests.post(
        f"https://api.telegram.org/bot{TE_TOKEN}/sendMessage",
        json={"chat_id": TE_CHAT_ID, "text": text, "parse_mode": "HTML"},
        timeout=15, verify=False
    )
    return r.json().get("ok", False)


def load_replies_state() -> dict:
    if STATE_FILE.exists():
        try:
            return json.loads(STATE_FILE.read_text(encoding='utf-8'))
        except Exception:
            pass
    return {"replied_threads": [], "last_run": None, "total_replies": 0}


def save_replies_state(state: dict):
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    STATE_FILE.write_text(json.dumps(state, indent=2, ensure_ascii=False), encoding='utf-8')


def pick_reply(title: str, body_preview: str = '') -> str:
    text = (title + ' ' + body_preview).lower()
    if any(k in text for k in ['furnished', 'meuble', 'meublee', 'furniture']):
        return random.choice(REPLY_TEMPLATES['furnished'])
    if any(k in text for k in ['share house', 'sharehouse', 'coloc', 'roommate', 'flatmate']):
        return random.choice(REPLY_TEMPLATES['sharehouse'])
    if any(k in text for k in ['neighborhood', 'area', 'quartier', 'ward', 'district', 'arrondissement']):
        return random.choice(REPLY_TEMPLATES['neighborhood'])
    if any(k in text for k in ['rent', 'loyer', 'prix', 'price', 'cost', 'budget', 'affordable', 'cheap']):
        return random.choice(REPLY_TEMPLATES['rent'])
    if any(k in text for k in ['visa', 'guarantor', 'garant', 'hoshogaisha', 'contract', 'contrat']):
        return random.choice(REPLY_TEMPLATES['visa'])
    return random.choice(REPLY_TEMPLATES['general'])


def login_expatcom(driver) -> bool:
    from selenium.webdriver.common.by import By
    driver.get("https://www.expat.com/")
    time.sleep(4)
    buttons = driver.find_elements(By.TAG_NAME, 'button')
    login_btn = next((b for b in buttons if b.text.strip() == 'Login'), None)
    if not login_btn:
        return False
    login_btn.click()
    time.sleep(3)
    driver.find_element(By.NAME, 'login_username').send_keys(EXPATCOM_EMAIL)
    driver.find_element(By.NAME, 'login_password').send_keys(EXPATCOM_PASSWORD)
    buttons = driver.find_elements(By.TAG_NAME, 'button')
    log_in_btn = next((b for b in buttons if b.text.strip() == 'LOG IN'), None)
    if not log_in_btn:
        return False
    log_in_btn.click()
    time.sleep(4)
    return any(x in driver.page_source.lower() for x in ['sign out', 'logout', 'my profile', 'my account'])


def get_forum_topics(driver) -> list:
    """Retourne la liste des topics visibles sur la page forum (titre + URL)."""
    from selenium.webdriver.common.by import By
    topics = []
    driver.get(FORUM_URL)
    time.sleep(4)
    links = driver.find_elements(By.CSS_SELECTOR, 'a[href*="/forum/"]')
    for link in links:
        href = link.get_attribute('href') or ''
        text = link.text.strip()
        if (text and len(text) > 15
                and '/forum/asia/japan/tokyo/' in href
                and not href.endswith('/tokyo/')
                and 'viewforum' not in href
                and 'search' not in href):
            topics.append({'title': text, 'url': href})
    seen = set()
    dedup = []
    for t in topics:
        if t['url'] not in seen:
            seen.add(t['url'])
            dedup.append(t)
    return dedup


def reply_to_topic(driver, topic_url: str, reply_text: str) -> bool:
    """Repond a un sujet existant. Retourne True si succes."""
    from selenium.webdriver.common.by import By
    from selenium.webdriver.common.keys import Keys

    driver.get(topic_url)
    time.sleep(4)

    driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.ESCAPE)
    time.sleep(1)

    msg_divs = driver.find_elements(By.CSS_SELECTOR, "div[contenteditable='true']")
    if not msg_divs:
        buttons = driver.find_elements(By.TAG_NAME, 'button')
        reply_btn = next(
            (b for b in buttons if any(k in b.text.lower() for k in ['reply', 'repondre', 'answer'])),
            None
        )
        if reply_btn:
            driver.execute_script("arguments[0].click();", reply_btn)
            time.sleep(3)
            msg_divs = driver.find_elements(By.CSS_SELECTOR, "div[contenteditable='true']")

    if not msg_divs:
        print(f"Champ message non trouve: {topic_url}")
        return False

    driver.execute_script("arguments[0].click();", msg_divs[0])
    time.sleep(0.5)
    msg_divs[0].send_keys(Keys.CONTROL + 'a')
    msg_divs[0].send_keys(reply_text)

    # Chercher le bouton submit avec plusieurs strategies
    submit_btn = None

    # Strategie 1 : texte du bouton contient submit/send/post/reply
    for b in driver.find_elements(By.TAG_NAME, 'button'):
        txt = b.text.lower().strip()
        if any(k in txt for k in ['submit', 'send', 'post', 'reply', 'repondre', 'envoyer', 'publier']):
            submit_btn = b
            break

    # Strategie 2 : type="submit"
    if not submit_btn:
        btns = driver.find_elements(By.CSS_SELECTOR, 'button[type="submit"], input[type="submit"]')
        if btns:
            submit_btn = btns[0]

    # Strategie 3 : classe CSS contenant "submit" ou "send" ou "post"
    if not submit_btn:
        for b in driver.find_elements(By.TAG_NAME, 'button'):
            cls = (b.get_attribute('class') or '').lower()
            if any(k in cls for k in ['submit', 'send', 'post', 'reply']):
                submit_btn = b
                break

    # Strategie 4 : JS form.submit() en dernier recours
    if not submit_btn:
        try:
            driver.execute_script(
                "var forms = document.querySelectorAll('form'); "
                "for(var f of forms){ if(f.contains(arguments[0])){ f.submit(); break; } }",
                msg_divs[0]
            )
            time.sleep(5)
            return True
        except Exception:
            pass
        print(f"Submit non trouve: {topic_url}")
        return False

    driver.execute_script("arguments[0].click();", submit_btn)
    time.sleep(5)
    return True


def main(dry_run: bool = False):
    if not EXPATCOM_EMAIL or not EXPATCOM_PASSWORD:
        print("Credentials manquants dans scripts/.env")
        return

    if dry_run:
        print("[DRY-RUN] Mode draft actif -- aucune reponse ne sera soumise.")

    state = load_replies_state()
    replied_set = set(state.get('replied_threads', []))

    try:
        from selenium import webdriver
        from selenium.webdriver.chrome.options import Options
    except ImportError:
        print("Selenium non installe")
        return

    opts = Options()
    opts.add_argument('--headless')
    opts.add_argument('--no-sandbox')
    opts.add_argument('--disable-dev-shm-usage')
    opts.add_argument('--window-size=1280,900')

    try:
        driver = webdriver.Chrome(options=opts)
        if not login_expatcom(driver):
            print("Login Expat.com echec")
            driver.quit()
            return
        print("Login OK")

        topics = get_forum_topics(driver)
        print(f"Topics trouves: {len(topics)}")

        targets = [t for t in topics
                   if t['url'] not in replied_set
                   and OUR_NAME.lower() not in t['title'].lower()][:MAX_REPLIES_PER_RUN]

        if not targets:
            print("Aucun nouveau sujet a repondre.")
            driver.quit()
            return

        replied_count = 0
        replied_titles = []

        if dry_run:
            # Mode draft : generer les reponses et envoyer sur Telegram sans poster
            drafts = []
            for t in targets:
                reply = pick_reply(t['title'])
                drafts.append(f"<b>{t['title'][:60]}</b>\n{t['url']}\n\n<i>{reply[:200]}...</i>")
            driver.quit()
            msg = (
                f"<b>EXPAT.COM REPLIER -- DRAFTS A RELIRE</b>\n"
                f"{len(drafts)} reponse(s) prete(s) -- a poster manuellement :\n\n"
                + "\n\n---\n\n".join(drafts)
            )
            send_telegram(msg)
            print(f"[DRY-RUN] {len(drafts)} drafts envoyes sur Telegram. Aucune soumission.")
            return

        for t in targets:
            reply = pick_reply(t['title'])
            ok = reply_to_topic(driver, t['url'], reply)
            if ok:
                replied_set.add(t['url'])
                replied_count += 1
                replied_titles.append(t['title'])
                print(f"Repondu a: {t['title']}")
                time.sleep(random.randint(15, 30))
            else:
                print(f"Echec reponse: {t['title']}")

        driver.quit()

        state['replied_threads'] = list(replied_set)
        state['last_run'] = datetime.now().strftime('%Y-%m-%d %H:%M')
        state['total_replies'] = state.get('total_replies', 0) + replied_count
        save_replies_state(state)

        if replied_count > 0:
            send_telegram(
                f"Expat.com: {replied_count} reponse(s) automatique(s):\n"
                + "\n".join(f"  - {t}" for t in replied_titles)
                + f"\nTotal reponses: {state['total_replies']}"
            )
        print(f"Reponses postees: {replied_count}")

    except Exception as e:
        send_telegram(f"Expat.com replier erreur: {e}")
        print(f"Erreur: {e}")


if __name__ == "__main__":
    dry = "--dry-run" in sys.argv
    main(dry_run=dry)
