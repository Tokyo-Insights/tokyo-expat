"""
expatcom_autoposter.py - Poste automatiquement sur les forums Expat.com
Forums ciblés: Tokyo (ID 204) et Japan (ID 54)

Credentials dans scripts/.env:
  EXPATCOM_EMAIL=...
  EXPATCOM_PASSWORD=...
"""
import sys
import io
import os
import json
import time
import requests
import urllib3
from pathlib import Path
from datetime import datetime

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
urllib3.disable_warnings()

sys.path.insert(0, str(Path(__file__).parent))
from config import TE_TOKEN, TE_CHAT_ID

# Credentials
_env = Path(__file__).parent / '.env'
if _env.exists():
    for line in _env.read_text(encoding='utf-8').splitlines():
        if '=' in line and not line.startswith('#'):
            k, v = line.split('=', 1)
            os.environ.setdefault(k.strip(), v.strip())

EXPATCOM_EMAIL = os.environ.get('EXPATCOM_EMAIL', '')
EXPATCOM_PASSWORD = os.environ.get('EXPATCOM_PASSWORD', '')

STATE_FILE = Path(__file__).parent / 'data' / 'expatcom_posted.json'
BLOG_TS_PATH = Path(__file__).parent.parent / 'lib' / 'blog.ts'
BASE_URL = "https://www.tokyo-expat.com"

# Forums Expat.com
FORUMS = {
    'en': [
        {'name': 'Expat Tokyo (EN)', 'url': 'https://www.expat.com/forum/viewforum.php?id=204'},
        {'name': 'Japan (EN)', 'url': 'https://www.expat.com/forum/viewforum.php?id=54'},
    ],
    'fr': [
        {'name': 'Tokyo francophone', 'url': 'https://www.expat.com/forum/viewforum.php?id=204'},
    ]
}


def send_telegram(text: str) -> bool:
    r = requests.post(
        f"https://api.telegram.org/bot{TE_TOKEN}/sendMessage",
        json={"chat_id": TE_CHAT_ID, "text": text, "parse_mode": "HTML"},
        timeout=15, verify=False
    )
    return r.json().get("ok", False)


def load_posted_state() -> dict:
    if STATE_FILE.exists():
        try:
            return json.loads(STATE_FILE.read_text(encoding='utf-8'))
        except Exception:
            pass
    return {"posted": []}


def save_posted_state(state: dict):
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    STATE_FILE.write_text(json.dumps(state, indent=2, ensure_ascii=False), encoding='utf-8')


def get_unposted_articles(shared_state: dict) -> list:
    """Retourne les articles du shared_articles.json pas encore postés sur Expat.com."""
    import re
    content = BLOG_TS_PATH.read_text(encoding='utf-8')
    slugs = re.findall(r"slug:\s*'([^']+)'", content)
    locales = re.findall(r"locale:\s*'([^']+)'", content)
    titles = re.findall(r"title:\s*'([^']+)'", content)
    dates = re.findall(r"date:\s*'(\d{4}-\d{2}-\d{2})'", content)

    # Slugs à partager = ceux dans shared_articles mais pas encore postés sur Expat.com
    shared_slugs_file = Path(__file__).parent / 'data' / 'shared_articles.json'
    shared_slugs = set()
    if shared_slugs_file.exists():
        try:
            shared_slugs = set(json.loads(shared_slugs_file.read_text(encoding='utf-8')).get('shared_slugs', []))
        except Exception:
            pass

    posted = set(shared_state.get('posted', []))
    n = min(len(slugs), len(locales), len(titles), len(dates))
    result = []
    for i in range(n):
        slug = slugs[i]
        if slug in shared_slugs and slug not in posted:
            result.append({'slug': slug, 'locale': locales[i], 'title': titles[i], 'date': dates[i]})
    return result


def post_to_expatcom_selenium(articles: list) -> list:
    """Post automatique via Selenium. Retourne la liste des slugs postés avec succès."""
    if not EXPATCOM_EMAIL or not EXPATCOM_PASSWORD:
        return []

    try:
        from selenium import webdriver
        from selenium.webdriver.common.by import By
        from selenium.webdriver.chrome.options import Options
        from selenium.webdriver.support.ui import WebDriverWait
        from selenium.webdriver.support import expected_conditions as EC
    except ImportError:
        send_telegram("expatcom_autoposter: selenium non installé. Run: pip install selenium")
        return []

    opts = Options()
    opts.add_argument('--headless')
    opts.add_argument('--no-sandbox')
    opts.add_argument('--disable-dev-shm-usage')

    posted_slugs = []

    try:
        driver = webdriver.Chrome(options=opts)
        wait = WebDriverWait(driver, 15)

        # Login
        driver.get("https://www.expat.com/login/")
        time.sleep(2)
        driver.find_element(By.NAME, "login").send_keys(EXPATCOM_EMAIL)
        driver.find_element(By.NAME, "password").send_keys(EXPATCOM_PASSWORD)
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        time.sleep(3)

        if "logout" not in driver.page_source.lower() and "mon compte" not in driver.page_source.lower():
            send_telegram("Expat.com: echec login. Verifie EXPATCOM_EMAIL/EXPATCOM_PASSWORD dans .env")
            driver.quit()
            return []

        for a in articles:
            article_url = f"{BASE_URL}/blog/{a['slug']}"
            locale = a['locale']
            title = a['title']

            if locale == 'fr':
                body = (
                    f"Bonjour à tous,\n\n"
                    f"J'ai rédigé un guide pratique sur ce sujet : {article_url}\n\n"
                    f"N'hésitez pas à poser vos questions ci-dessous."
                )
            else:
                body = (
                    f"Hi everyone,\n\n"
                    f"I put together a practical guide on this topic: {article_url}\n\n"
                    f"Happy to answer questions below."
                )

            forums = FORUMS.get(locale, FORUMS['en'])
            for forum in forums:
                try:
                    driver.get(forum['url'])
                    time.sleep(2)
                    new_topic_btn = driver.find_elements(By.XPATH, "//*[contains(text(),'New topic') or contains(text(),'Nouveau sujet')]")
                    if not new_topic_btn:
                        continue
                    new_topic_btn[0].click()
                    time.sleep(2)
                    driver.find_element(By.NAME, "subject").send_keys(title)
                    body_field = driver.find_elements(By.NAME, "message") or driver.find_elements(By.ID, "message")
                    if body_field:
                        body_field[0].send_keys(body)
                    submit = driver.find_element(By.CSS_SELECTOR, "button[type='submit'], input[type='submit']")
                    submit.click()
                    time.sleep(3)
                    print(f"Posté sur {forum['name']}: {title}")
                except Exception as e:
                    print(f"Erreur post {forum['name']}: {e}")

            posted_slugs.append(a['slug'])
            time.sleep(5)

        driver.quit()

    except Exception as e:
        send_telegram(f"Expat.com autoposter erreur: {e}")

    return posted_slugs


def main():
    state = load_posted_state()
    articles = get_unposted_articles(state)

    if not articles:
        print("Aucun article à poster sur Expat.com.")
        return

    print(f"Articles à poster: {len(articles)}")

    if not EXPATCOM_EMAIL or not EXPATCOM_PASSWORD:
        send_telegram(
            "⚠️ Expat.com autoposter: credentials manquants.\n"
            "Ajoute dans scripts/.env:\n"
            "EXPATCOM_EMAIL=ton@email.com\n"
            "EXPATCOM_PASSWORD=tonmotdepasse"
        )
        print("Credentials manquants - config requise.")
        return

    posted = post_to_expatcom_selenium(articles)

    if posted:
        state['posted'].extend(posted)
        state['last_run'] = datetime.now().strftime('%Y-%m-%d %H:%M')
        save_posted_state(state)

        titles = [a['title'] for a in articles if a['slug'] in posted]
        send_telegram(
            f"Expat.com: {len(posted)} article(s) posté(s) automatiquement:\n"
            + "\n".join(f"  - {t}" for t in titles)
        )
        print(f"Postés: {len(posted)} articles")
    else:
        print("Aucun article posté (erreur ou aucun forum accessible).")


if __name__ == "__main__":
    main()
