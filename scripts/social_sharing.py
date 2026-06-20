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


def facebook_draft(a: dict) -> str:
    url = f"{BASE_URL}/blog/{a['slug']}"
    if a['locale'] == 'fr':
        return (
            "== FACEBOOK (Francophones au Japon / Expatriés à Tokyo) ==\n\n"
            f"Nouvel article sur tokyo-expat.com : {a['title']}\n\n"
            f"{url}\n\n"
            "Si vous préparez votre installation à Tokyo, cet article répond "
            "à beaucoup de questions pratiques. Dites-moi si ça vous a aidé."
        )
    return (
        "== FACEBOOK (Expats in Tokyo / Foreigners in Japan) ==\n\n"
        f"Just published on tokyo-expat.com: {a['title']}\n\n"
        f"{url}\n\n"
        "If you're planning a move to Tokyo, this covers the practical details "
        "most expat guides skip. Happy to answer questions below."
    )


def reddit_draft(a: dict) -> str:
    url = f"{BASE_URL}/blog/{a['slug']}"
    warning = "[REGLE STRICTE : NE JAMAIS mentionner 'tokyo-expat.com' dans le texte. Colle l'URL seule. Utilise 'je'/'I'.]"
    if a['locale'] == 'fr':
        return (
            "== REDDIT (r/JaponFR ou r/movingtojapan) ==\n"
            f"{warning}\n\n"
            "Titre du post: (copie le titre de l'article)\n\n"
            "Type de post: LINK POST (pas text post)\n"
            f"URL à coller: {url}"
        )
    return (
        "== REDDIT (r/movingtojapan ou r/japanlife) ==\n"
        f"{warning}\n\n"
        "Post title: (copy the article title)\n\n"
        "Post type: LINK POST (not text post)\n"
        f"URL to paste: {url}"
    )


def expatcom_draft(a: dict) -> str:
    url = f"{BASE_URL}/blog/{a['slug']}"
    if a['locale'] == 'fr':
        return (
            "== EXPAT.COM (Forum Tokyo + Japan) ==\n"
            "URL forum: expat.com/forum/en/japan/tokyo\n\n"
            f"Titre: {a['title']}\n\n"
            "Texte:\n"
            "Bonjour à tous,\n\n"
            "J'ai rédigé un guide pratique sur un sujet qui revient souvent ici. "
            f"Vous pouvez le lire ici : {url}\n\n"
            "N'hésitez pas à poser vos questions ci-dessous."
        )
    return (
        "== EXPAT.COM (Forum Tokyo + Japan) ==\n"
        "URL: expat.com/forum/en/japan/tokyo\n\n"
        f"Title: {a['title']}\n\n"
        "Body:\n"
        "Hi everyone,\n\n"
        "I put together a practical guide on a topic that comes up regularly here. "
        f"You can read it here: {url}\n\n"
        "Happy to answer questions below."
    )


def main():
    articles = get_new_articles()
    today = datetime.now().strftime('%d/%m/%Y')

    if not articles:
        send_telegram(f"📱 Social Sharing {today}: aucun article des {DAYS_LOOKBACK} derniers jours. Rien à partager.")
        print("Aucun article récent.")
        return

    send_telegram(
        f"📱 <b>SOCIAL SHARING DRAFTS</b> — {today}\n"
        f"{len(articles)} article(s) à partager\n\n"
        "Copies les textes ci-dessous et colle-les sur chaque plateforme."
    )

    for a in articles:
        flag = "🇫🇷" if a['locale'] == 'fr' else "🇬🇧"
        url = f"{BASE_URL}/blog/{a['slug']}"
        send_telegram(f"\n{flag} <b>{a['title']}</b>\nPublié le {a['date']}\n{url}")

        for draft_fn in (facebook_draft, reddit_draft, expatcom_draft):
            send_telegram(f"<pre>{draft_fn(a)}</pre>")

    send_telegram(
        "📋 <b>MODE D'EMPLOI RAPIDE</b>\n\n"
        "<b>Facebook</b>\n"
        "1. Ouvre l'app Facebook\n"
        "2. Cherche le groupe (ex: 'Expats in Tokyo')\n"
        "3. Clique 'Ecrire quelque chose'\n"
        "4. Colle le texte du draft\n"
        "5. Publie\n\n"
        "<b>Reddit</b>\n"
        "1. Va sur reddit.com/r/movingtojapan\n"
        "2. Clique 'Create Post'\n"
        "3. Choisis l'onglet 'Link'\n"
        "4. Colle l'URL de l'article\n"
        "5. Titre = titre de l'article\n"
        "6. Submit\n\n"
        "<b>Expat.com</b>\n"
        "1. Va sur expat.com/forum/en/japan/tokyo\n"
        "2. Clique 'New topic'\n"
        "3. Colle titre + texte du draft\n"
        "4. Publie\n\n"
        "Temps total : 10-15 min pour les 3 plateformes."
    )

    mark_as_shared(articles)
    print(f"Drafts envoyés pour {len(articles)} article(s).")


if __name__ == "__main__":
    main()
