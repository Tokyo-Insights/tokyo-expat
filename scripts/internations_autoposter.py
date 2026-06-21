"""
internations_autoposter.py - Poste automatiquement sur Internations.org
Forums cibles: Tokyo group + Japan group

Credentials dans scripts/.env:
  INTERNATIONS_EMAIL=...
  INTERNATIONS_PASSWORD=...

Strategie: 1 post par semaine maximum, contenu utile logement/vie Tokyo.
Liens vers tokyo-expat.com : acceptes sur Internations (site communautaire, pas de
moderation pre-publication comme Expat.com).
"""
import sys
import io
import os
import re
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

INTERNATIONS_EMAIL = os.environ.get('INTERNATIONS_EMAIL', '')
INTERNATIONS_PASSWORD = os.environ.get('INTERNATIONS_PASSWORD', '')

STATE_FILE = Path(__file__).parent / 'data' / 'internations_posted.json'
BLOG_TS_PATH = Path(__file__).parent.parent / 'lib' / 'blog.ts'
BASE_URL = "https://www.tokyo-expat.com"
SCREENSHOT_DIR = Path('c:/tmp')

# Max 1 post par semaine pour rester naturel
MAX_POSTS_PER_RUN = 1
MIN_DAYS_BETWEEN_POSTS = 6

# Groupes Internations cibles (Tokyo + Japan)
GROUPS = [
    {
        'name': 'Internations Tokyo',
        'url': 'https://www.internations.org/tokyo-expats',
        'locale': 'en',
    },
    {
        'name': 'Internations Japan',
        'url': 'https://www.internations.org/japan-expats',
        'locale': 'en',
    },
]


def send_telegram(text: str) -> bool:
    r = requests.post(
        f"https://api.telegram.org/bot{TE_TOKEN}/sendMessage",
        json={"chat_id": TE_CHAT_ID, "text": text, "parse_mode": "HTML"},
        timeout=15, verify=False
    )
    return r.json().get("ok", False)


def load_state() -> dict:
    if STATE_FILE.exists():
        try:
            return json.loads(STATE_FILE.read_text(encoding='utf-8'))
        except Exception:
            pass
    return {"posted": [], "last_post_date": None, "total_posts": 0}


def save_state(state: dict):
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    STATE_FILE.write_text(json.dumps(state, indent=2, ensure_ascii=False), encoding='utf-8')


def can_post_today(state: dict) -> bool:
    last = state.get('last_post_date')
    if not last:
        return True
    try:
        last_dt = datetime.strptime(last, '%Y-%m-%d')
        return (datetime.now() - last_dt).days >= MIN_DAYS_BETWEEN_POSTS
    except Exception:
        return True


def get_unposted_articles(state: dict) -> list:
    """Retourne les articles EN pas encore postés sur Internations."""
    content = BLOG_TS_PATH.read_text(encoding='utf-8')
    slugs = re.findall(r"slug:\s*'([^']+)'", content)
    locales = re.findall(r"locale:\s*'([^']+)'", content)
    titles = re.findall(r"title:\s*'([^']+)'", content)

    posted = set(state.get('posted', []))
    result = []
    n = min(len(slugs), len(locales), len(titles))
    for i in range(n):
        if locales[i] == 'en' and slugs[i] not in posted:
            result.append({'slug': slugs[i], 'locale': locales[i], 'title': titles[i]})
    return result


def build_post_body(article: dict) -> dict:
    """Construit le titre et corps du post Internations a partir d'un article."""
    url = f"{BASE_URL}/blog/{article['slug']}"
    title = article['title']

    # Templates selon le sujet de l'article
    slug = article['slug']

    if 'transport' in slug or 'subway' in slug or 'train' in slug:
        subject = f"Tokyo Transport Guide: Subway, JR Lines and IC Cards Explained"
        body = (
            f"One of the most common questions I see from newcomers in Tokyo is how to navigate "
            f"the train and subway system. The combination of Tokyo Metro, Toei, and JR lines can "
            f"look overwhelming at first.\n\n"
            f"I put together a practical guide covering the key lines, how the Suica card works, "
            f"the best apps, and how to choose your neighbourhood based on your commute:\n\n"
            f"{url}\n\n"
            f"Happy to answer questions if you have specific commute scenarios."
        )
    elif 'sim' in slug or 'phone' in slug or 'mobile' in slug:
        subject = f"Japan SIM Cards for Expats: What Actually Works in 2026"
        body = (
            f"Finding the right phone plan when you first arrive in Japan can be surprisingly "
            f"confusing. Airport SIMs, MVNOs, eSIMs, sub-brands from the big operators - "
            f"there are a lot of options at very different price points.\n\n"
            f"I wrote a comparison of the main options for residents vs. short-term stays:\n\n"
            f"{url}\n\n"
            f"The short version: IIJmio for budget-conscious residents, ahamo if you want "
            f"simplicity at 20GB. Happy to discuss if you have specific needs."
        )
    elif 'tax' in slug or 'income' in slug or 'impot' in slug:
        subject = f"Income Tax in Japan for Expats: What You Need to Know"
        body = (
            f"Tax season in Japan (February-March) catches a lot of expats off guard. "
            f"The rules are different depending on how long you've been here, and the "
            f"non-permanent resident status most of us start with has specific implications.\n\n"
            f"I put together a plain-language guide covering the brackets, the March 15 deadline, "
            f"how MyPortal filing works, and what the juminzei (local tax) actually is:\n\n"
            f"{url}\n\n"
            f"Not tax advice - but should help you understand what to expect and when to "
            f"talk to a tax professional."
        )
    elif 'utilit' in slug or 'internet' in slug or 'electric' in slug:
        subject = f"Setting Up Electricity, Gas and Internet in Your Tokyo Apartment"
        body = (
            f"When you get the keys to your new Tokyo apartment, the first thing most people "
            f"don't realise is that utilities aren't automatically set up - you need to contact "
            f"TEPCO for electricity and Tokyo Gas separately.\n\n"
            f"I wrote a step-by-step guide covering all four services (electricity, gas, water, "
            f"and fibre internet), with the actual phone numbers and online forms:\n\n"
            f"{url}\n\n"
            f"The main takeaway: electricity is instant online, gas needs a technician visit "
            f"(3-7 days), and fibre internet takes 2-6 weeks - order it first."
        )
    elif 'work' in slug or 'job' in slug or 'employ' in slug or 'visa' in slug:
        subject = f"Working in Tokyo as an Expat: Culture, Salaries and What to Expect"
        body = (
            f"Starting work at a Japanese company or in Tokyo's international business environment "
            f"comes with a few culture shocks that nobody really prepares you for.\n\n"
            f"I compiled a practical guide covering work visa types, the nemawashi (pre-meeting "
            f"consensus building) culture, typical salary ranges by sector, and the documents "
            f"you need ready before your first day:\n\n"
            f"{url}\n\n"
            f"Would love to hear from others about their experience working here - "
            f"especially the overtime culture differences."
        )
    elif 'apartment' in slug or 'housing' in slug or 'rent' in slug or 'find' in slug:
        subject = f"Finding an Apartment in Tokyo as a Foreigner: Practical Guide"
        body = (
            f"Renting an apartment in Tokyo as a non-Japanese speaker requires navigating "
            f"guarantors, key money, agency fees, and landlords who may reject foreign applicants. "
            f"But it's very doable with the right approach.\n\n"
            f"Guide here with the full process: {url}\n\n"
            f"Happy to answer questions about specific situations - guarantor alternatives, "
            f"areas with foreigner-friendly landlords, etc."
        )
    elif 'share' in slug or 'gaijin' in slug:
        subject = f"Share Houses vs Regular Apartments in Tokyo: Which is Right for You?"
        body = (
            f"Share houses are often the fastest and cheapest way to land in Tokyo without a "
            f"guarantor or large upfront fees. But they're not right for everyone.\n\n"
            f"Wrote up a practical comparison: {url}\n\n"
            f"The main points: share houses are great for 1-6 months, especially if you're "
            f"still figuring out which neighbourhood suits your commute."
        )
    else:
        # Generic template for any other article
        subject = title[:80]
        body = (
            f"Sharing a practical guide for expats settling in Tokyo that might be useful "
            f"for people in this group:\n\n"
            f"{url}\n\n"
            f"Open to questions or additions from people with more experience on the ground here."
        )

    return {'subject': subject, 'body': body}


def login_internations(driver) -> bool:
    """Login sur Internations.org."""
    from selenium.webdriver.common.by import By
    from selenium.webdriver.common.keys import Keys

    driver.get("https://www.internations.org/login")
    time.sleep(5)

    # Accepter les cookies si popup
    try:
        btns = driver.find_elements(By.TAG_NAME, 'button')
        for b in btns:
            if any(k in b.text.lower() for k in ['accept', 'agree', 'ok', 'allow', 'accepter']):
                driver.execute_script("arguments[0].click();", b)
                time.sleep(2)
                break
    except Exception:
        pass

    # Remplir email
    try:
        email_field = driver.find_element(By.CSS_SELECTOR, 'input[type="email"], input[name="email"], input[id*="email"]')
        email_field.clear()
        email_field.send_keys(INTERNATIONS_EMAIL)
    except Exception as e:
        print(f"Champ email non trouve: {e}")
        return False

    # Remplir password
    try:
        pw_field = driver.find_element(By.CSS_SELECTOR, 'input[type="password"]')
        pw_field.clear()
        pw_field.send_keys(INTERNATIONS_PASSWORD)
    except Exception as e:
        print(f"Champ password non trouve: {e}")
        return False

    # Submit
    try:
        pw_field.send_keys(Keys.RETURN)
    except Exception:
        try:
            submit = driver.find_element(By.CSS_SELECTOR, 'button[type="submit"], input[type="submit"]')
            driver.execute_script("arguments[0].click();", submit)
        except Exception as e:
            print(f"Submit non trouve: {e}")
            return False

    time.sleep(6)

    logged_in = any(x in driver.page_source.lower() for x in [
        'logout', 'sign out', 'my profile', 'dashboard', 'activity',
        'internations.org/my', 'account', 'profile'
    ])

    if not logged_in:
        SCREENSHOT_DIR.mkdir(exist_ok=True)
        driver.save_screenshot(str(SCREENSHOT_DIR / 'internations_login.png'))
        print(f"Login echec. Screenshot: {SCREENSHOT_DIR}/internations_login.png")

    return logged_in


def post_to_group(driver, group: dict, post: dict) -> bool:
    """Poste une discussion dans un groupe Internations. Retourne True si succes."""
    from selenium.webdriver.common.by import By
    from selenium.webdriver.common.keys import Keys

    driver.get(group['url'])
    time.sleep(5)

    # Screenshot debug
    SCREENSHOT_DIR.mkdir(exist_ok=True)
    driver.save_screenshot(str(SCREENSHOT_DIR / 'internations_group.png'))

    # Cherche le bouton "Start a Discussion" / "New Post" / "Write something"
    post_triggers = []
    for selector in [
        'a[href*="discussion"]', 'a[href*="post"]', 'button[class*="post"]',
        'button[class*="discussion"]', 'a[class*="new-post"]',
        '[data-testid*="post"]', '[data-testid*="discussion"]',
    ]:
        post_triggers.extend(driver.find_elements(By.CSS_SELECTOR, selector))

    # Cherche aussi par texte
    all_btns = driver.find_elements(By.TAG_NAME, 'button')
    all_links = driver.find_elements(By.TAG_NAME, 'a')
    for el in all_btns + all_links:
        txt = el.text.strip().lower()
        if any(k in txt for k in ['start a discussion', 'new discussion', 'post', 'write', 'share', 'create']):
            post_triggers.append(el)

    if not post_triggers:
        print(f"Bouton de post non trouve sur {group['url']}")
        driver.save_screenshot(str(SCREENSHOT_DIR / 'internations_nobutton.png'))
        return False

    # Clique le premier bouton valide
    for trigger in post_triggers[:3]:
        try:
            driver.execute_script("arguments[0].scrollIntoView(true);", trigger)
            time.sleep(0.5)
            driver.execute_script("arguments[0].click();", trigger)
            time.sleep(3)

            # Cherche le champ titre
            title_field = None
            for sel in ['input[name*="title"]', 'input[placeholder*="title"]',
                        'input[placeholder*="subject"]', 'input[type="text"]']:
                fields = driver.find_elements(By.CSS_SELECTOR, sel)
                if fields:
                    title_field = fields[0]
                    break

            # Cherche le champ body
            body_field = None
            for sel in ["div[contenteditable='true']", 'textarea', 'div[role="textbox"]']:
                fields = driver.find_elements(By.CSS_SELECTOR, sel)
                if fields:
                    body_field = fields[0]
                    break

            if not body_field:
                continue

            # Remplit titre si disponible
            if title_field:
                title_field.clear()
                title_field.send_keys(post['subject'])
                time.sleep(0.5)

            # Remplit corps
            driver.execute_script("arguments[0].click();", body_field)
            time.sleep(0.5)
            body_field.send_keys(Keys.CONTROL + 'a')
            time.sleep(0.2)
            body_field.send_keys(post['body'])
            time.sleep(1)

            driver.save_screenshot(str(SCREENSHOT_DIR / 'internations_before_submit.png'))

            # Submit
            submit_btns = []
            for sel in ['button[type="submit"]', 'input[type="submit"]']:
                submit_btns.extend(driver.find_elements(By.CSS_SELECTOR, sel))
            for b in driver.find_elements(By.TAG_NAME, 'button'):
                if any(k in b.text.lower() for k in ['post', 'submit', 'publish', 'share', 'send']):
                    submit_btns.append(b)

            if not submit_btns:
                print("Submit non trouve")
                return False

            driver.execute_script("arguments[0].click();", submit_btns[0])
            time.sleep(6)

            driver.save_screenshot(str(SCREENSHOT_DIR / 'internations_after_submit.png'))

            # Verifie succes (URL change ou confirmation message)
            success_indicators = ['discussion', 'post', 'success', 'merci', 'thank']
            if any(x in driver.current_url.lower() or x in driver.page_source.lower()
                   for x in success_indicators):
                return True

        except Exception as e:
            print(f"Erreur tentative post: {e}")
            continue

    return False


def main():
    if not INTERNATIONS_EMAIL or not INTERNATIONS_PASSWORD:
        print("Credentials manquants dans scripts/.env (INTERNATIONS_EMAIL / INTERNATIONS_PASSWORD)")
        return

    state = load_state()

    if not can_post_today(state):
        last = state.get('last_post_date', 'inconnue')
        print(f"Post Internations deja fait il y a moins de {MIN_DAYS_BETWEEN_POSTS} jours (dernier: {last}). Skip.")
        return

    articles = get_unposted_articles(state)
    if not articles:
        print("Aucun article EN a poster sur Internations (tous deja partages).")
        return

    try:
        from selenium import webdriver
        from selenium.webdriver.chrome.options import Options
    except ImportError:
        print("Selenium non installe: pip install selenium")
        return

    opts = Options()
    opts.add_argument('--headless')
    opts.add_argument('--no-sandbox')
    opts.add_argument('--disable-dev-shm-usage')
    opts.add_argument('--window-size=1280,900')
    opts.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

    posted_slugs = []

    try:
        driver = webdriver.Chrome(options=opts)

        if not login_internations(driver):
            send_telegram("Internations: echec login. Verifie INTERNATIONS_EMAIL/PASSWORD dans .env")
            driver.quit()
            return

        print("Login Internations OK")

        # Prend le premier article non poste
        article = articles[0]
        post = build_post_body(article)

        print(f"Post a publier: {post['subject']}")

        # Essaie chaque groupe jusqu'au premier succes
        posted = False
        for group in GROUPS:
            ok = post_to_group(driver, group, post)
            if ok:
                posted_slugs.append(article['slug'])
                print(f"Post OK dans {group['name']}: {article['slug']}")
                posted = True
                break
            else:
                print(f"Echec dans {group['name']}, essai suivant...")
                time.sleep(random.randint(5, 10))

        driver.quit()

        if posted:
            state['posted'].append(article['slug'])
            state['last_post_date'] = datetime.now().strftime('%Y-%m-%d')
            state['total_posts'] = state.get('total_posts', 0) + 1
            save_state(state)

            send_telegram(
                f"Internations: post publie\n"
                f"Titre: {post['subject']}\n"
                f"Article: {BASE_URL}/blog/{article['slug']}\n"
                f"Total posts: {state['total_posts']}"
            )
        else:
            send_telegram(
                f"Internations: echec de publication. Screenshots dans c:/tmp/\n"
                f"Article tente: {article['slug']}\n"
                f"-> Post manuel requis sur internations.org"
            )

    except Exception as e:
        send_telegram(f"Internations autoposter erreur: {e}")
        print(f"Erreur: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()
