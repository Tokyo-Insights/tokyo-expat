"""
social_sharing.py - Génère des posts sociaux prêts à copier pour les nouveaux articles
Envoie via Telegram les drafts Facebook, Reddit, Expat.com formatés

Logique : compare l'ensemble des slugs actuels avec les slugs déjà partagés
(stockés dans data/shared_articles.json). Envoie uniquement les nouveaux.
"""
import sys
import io
import re
import json
import requests
import urllib3
from pathlib import Path
from datetime import datetime

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
urllib3.disable_warnings()

sys.path.insert(0, str(Path(__file__).parent))
from config import TE_TOKEN, TE_CHAT_ID

BASE_URL = "https://www.tokyo-expat.com"
BLOG_TS_PATH = Path(__file__).parent.parent / "lib" / "blog.ts"
STATE_FILE = Path(__file__).parent / "data" / "shared_articles.json"


def send_telegram(text: str, max_len: int = 4000) -> bool:
    if len(text) > max_len:
        for i in range(0, len(text), max_len):
            send_telegram(text[i:i + max_len])
        return True
    r = requests.post(
        f"https://api.telegram.org/bot{TE_TOKEN}/sendMessage",
        json={"chat_id": TE_CHAT_ID, "text": text, "parse_mode": "HTML"},
        timeout=15, verify=False
    )
    return r.json().get("ok", False)


def parse_blog_articles():
    """Extrait les articles depuis lib/blog.ts"""
    content = BLOG_TS_PATH.read_text(encoding='utf-8')
    slugs = re.findall(r"slug:\s*'([^']+)'", content)
    locales = re.findall(r"locale:\s*'([^']+)'", content)
    titles = re.findall(r"title:\s*'([^']+)'", content)
    dates = re.findall(r"date:\s*'(\d{4}-\d{2}-\d{2})'", content)
    n = min(len(slugs), len(locales), len(titles), len(dates))
    return [{"slug": slugs[i], "locale": locales[i], "title": titles[i], "date": dates[i]} for i in range(n)]


def load_shared_state() -> dict:
    """Charge la liste des slugs déjà partagés."""
    if STATE_FILE.exists():
        try:
            return json.loads(STATE_FILE.read_text(encoding='utf-8'))
        except Exception:
            pass
    return {"shared_slugs": []}


def save_shared_state(state: dict):
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    STATE_FILE.write_text(json.dumps(state, indent=2, ensure_ascii=False), encoding='utf-8')


def get_new_articles():
    """Retourne les articles non encore partagés."""
    state = load_shared_state()
    already_shared = set(state.get("shared_slugs", []))
    all_articles = parse_blog_articles()
    return [a for a in all_articles if a['slug'] not in already_shared]


def mark_as_shared(articles: list):
    state = load_shared_state()
    shared = set(state.get("shared_slugs", []))
    for a in articles:
        shared.add(a['slug'])
    state["shared_slugs"] = sorted(shared)
    state["last_run"] = datetime.now().strftime('%Y-%m-%d %H:%M')
    save_shared_state(state)


import urllib.parse


def make_reddit_url(a: dict) -> str:
    """URL 1-clic qui pre-remplit le formulaire Reddit."""
    url = f"{BASE_URL}/blog/{a['slug']}"
    title = urllib.parse.quote(a['title'])
    article_url = urllib.parse.quote(url)
    if a['locale'] == 'fr':
        sub = "JaponFR"
    else:
        sub = "movingtojapan"
    return f"https://www.reddit.com/r/{sub}/submit?type=link&title={title}&url={article_url}"


def make_facebook_share_url(a: dict) -> str:
    """URL 1-clic partage Facebook (dialog pré-rempli avec l'article)."""
    url = f"{BASE_URL}/blog/{a['slug']}"
    return f"https://www.facebook.com/sharer/sharer.php?u={urllib.parse.quote(url)}"


def build_digest_message(articles: list) -> str:
    """1 seul message Telegram condensé avec liens 1-clic pour tous les articles."""
    today = datetime.now().strftime('%d/%m/%Y')
    lines = [f"📱 <b>PARTAGE HEBDO</b> — {today}\n{len(articles)} nouvel(s) article(s)\n"]

    for a in articles:
        flag = "🇫🇷" if a['locale'] == 'fr' else "🇬🇧"
        url = f"{BASE_URL}/blog/{a['slug']}"
        reddit_url = make_reddit_url(a)
        fb_url = make_facebook_share_url(a)

        lines.append(
            f"{flag} <b>{a['title']}</b>\n"
            f"  Article: {url}\n"
            f"  Reddit 1-clic: {reddit_url}\n"
            f"  Facebook 1-clic: {fb_url}\n"
            f"  Expat.com: auto-posté\n"
        )

    lines.append(
        "\n<b>Actions requises (30 sec chacune):</b>\n"
        "Reddit: clique le lien 1-clic → Submit\n"
        "FB Groups: clique 1-clic → Publier\n"
        "Expat.com: done automatiquement"
    )

    return "\n".join(lines)


def main():
    articles = get_new_articles()
    today = datetime.now().strftime('%d/%m/%Y')

    if not articles:
        print("Aucun nouvel article à partager.")
        return

    # 1 seul message condensé
    msg = build_digest_message(articles)
    send_telegram(msg)

    mark_as_shared(articles)
    print(f"Digest envoyé pour {len(articles)} article(s).")


if __name__ == "__main__":
    main()
