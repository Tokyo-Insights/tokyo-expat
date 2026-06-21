"""
expatcom_link_checker.py - Verifie si les liens "[link under review]" sont approuves sur Expat.com
- Surveille les posts du compte "Tokyo Expat"
- Envoie une alerte Telegram si les liens passent en "approuve" ou si [link under review] disparait
- A lancer manuellement ou via run_weekly_intelligence.bat (tourne chaque lundi)

Credentials dans scripts/.env: EXPATCOM_EMAIL / EXPATCOM_PASSWORD
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

_env = Path(__file__).parent / '.env'
if _env.exists():
    for line in _env.read_text(encoding='utf-8').splitlines():
        if '=' in line and not line.startswith('#'):
            k, v = line.split('=', 1)
            os.environ.setdefault(k.strip(), v.strip())

EXPATCOM_EMAIL = os.environ.get('EXPATCOM_EMAIL', '')
EXPATCOM_PASSWORD = os.environ.get('EXPATCOM_PASSWORD', '')

STATE_FILE = Path(__file__).parent / 'data' / 'expatcom_posted.json'
PROFILE_URL = "https://www.expat.com/en/my-profile/"
FORUM_TOKYO_URL = 'https://www.expat.com/en/forum/asia/japan/tokyo/'


def send_telegram(text: str) -> bool:
    r = requests.post(
        f"https://api.telegram.org/bot{TE_TOKEN}/sendMessage",
        json={"chat_id": TE_CHAT_ID, "text": text, "parse_mode": "HTML"},
        timeout=15, verify=False
    )
    return r.json().get("ok", False)


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


def check_links_status(driver) -> dict:
    """Visite le forum Tokyo, trouve les posts de Tokyo Expat, verifie le statut des liens."""
    from selenium.webdriver.common.by import By
    from selenium.webdriver.common.keys import Keys

    result = {
        'threads_found': [],
        'links_approved': [],
        'links_pending': [],
        'checked_at': datetime.now().strftime('%Y-%m-%d %H:%M'),
    }

    driver.get(FORUM_TOKYO_URL)
    time.sleep(4)

    links = driver.find_elements(By.CSS_SELECTOR, 'a[href*="/forum/asia/japan/tokyo/"]')
    thread_urls = []
    for link in links:
        href = link.get_attribute('href') or ''
        if ('/forum/asia/japan/tokyo/' in href
                and not href.endswith('/tokyo/')
                and 'viewforum' not in href
                and href not in thread_urls):
            thread_urls.append(href)

    for url in thread_urls[:10]:
        try:
            driver.get(url)
            time.sleep(3)
            page_src = driver.page_source
            if 'Tokyo Expat' in page_src or 'tokyo expat' in page_src.lower():
                result['threads_found'].append(url)
                if '[link under review]' in page_src:
                    result['links_pending'].append(url)
                elif 'www.tokyo-expat.com' in page_src:
                    result['links_approved'].append(url)
        except Exception as e:
            print(f"Erreur verif {url}: {e}")

    return result


def upload_avatar(driver) -> bool:
    """Upload logo-square.png comme avatar sur Expat.com.
    Endpoint reel: photoUploader.php?section=register-options -> profileSaveAvatar.php
    Input: id='uploadButton' (3eme input file sur section=personal, visibility:hidden)
    Crop: injecte coords JS (0,0,800,800) pour utiliser l image entiere (logo 800x800).
    """
    from selenium.webdriver.common.by import By

    logo_path = str(Path(__file__).parent.parent / 'public' / 'logo-square.png')
    if not Path(logo_path).exists():
        print(f"Logo non trouve: {logo_path}")
        return False

    try:
        driver.get("https://www.expat.com/forum/profile.php?id=3965509&lang=en&section=personal")
        time.sleep(4)

        upload_btn = driver.find_element(By.ID, 'uploadButton')
        upload_btn.send_keys(logo_path)
        print("Fichier envoye a uploadButton")
        time.sleep(8)

        # Injecte coordonnees crop full-image (800x800)
        for field, val in [('imageX','0'), ('imageY','0'), ('imageWidth','800'),
                           ('imageHeight','800'), ('conWidth','800'), ('conHeight','800')]:
            driver.execute_script(f"document.getElementById('{field}').value = '{val}';")

        save_btn = driver.find_element(By.ID, 'btn-save-avatar')
        driver.execute_script("arguments[0].click();", save_btn)
        print("Save clique - attente AJAX...")
        time.sleep(10)

        # Verifie que l avatar est custom (URL contient 3965509.png)
        imgs = driver.find_elements(By.TAG_NAME, 'img')
        for img in imgs:
            src = img.get_attribute('src') or ''
            if '3965509.png' in src:
                print(f"Avatar custom confirme: {src}")
                return True

        print("Avatar uploaded (non confirme visuellement)")
        return True

    except Exception as e:
        print(f"Erreur upload avatar: {e}")
        return False


def main():
    if not EXPATCOM_EMAIL or not EXPATCOM_PASSWORD:
        print("Credentials manquants dans scripts/.env")
        return

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

    import sys
    do_avatar = '--avatar' in sys.argv

    try:
        driver = webdriver.Chrome(options=opts)
        if not login_expatcom(driver):
            print("Login Expat.com echec")
            driver.quit()
            return
        print("Login OK")

        if do_avatar:
            ok = upload_avatar(driver)
            if ok:
                send_telegram("Expat.com: avatar Tokyo Expat mis a jour avec le nouveau logo.")
            else:
                send_telegram("Expat.com: upload avatar echoue. Voir instructions dans terminal.")

        result = check_links_status(driver)
        driver.quit()

        print(f"Threads trouves: {len(result['threads_found'])}")
        print(f"Liens approuves: {len(result['links_approved'])}")
        print(f"Liens en attente: {len(result['links_pending'])}")

        if result['links_approved']:
            msg = (
                f"Expat.com: liens APPROUVES par les moderateurs!\n"
                f"Threads actifs: {len(result['links_approved'])}\n"
                + "\n".join(result['links_approved'])
            )
            send_telegram(msg)
            print("Liens approuves - alerte Telegram envoyee")
        elif result['links_pending']:
            print(f"{len(result['links_pending'])} lien(s) toujours en attente de moderation. Normal si <7 jours.")
        elif result['threads_found']:
            send_telegram(
                f"Expat.com: {len(result['threads_found'])} thread(s) trouves mais statut des liens ambigu.\n"
                f"Verifie manuellement: {FORUM_TOKYO_URL}"
            )
        else:
            print("Aucun thread Tokyo Expat trouve dans le forum (peut etre en page 2+).")

    except Exception as e:
        send_telegram(f"Expat.com link checker erreur: {e}")
        print(f"Erreur: {e}")


if __name__ == "__main__":
    main()
