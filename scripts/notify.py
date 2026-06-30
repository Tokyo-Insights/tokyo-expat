"""
notify.py -- Helper central d'alerte Telegram + JOURNAL local.
Envoie le message ET l'enregistre dans data/telegram_log.jsonl.
=> Claude peut lire le journal chaque matin pour voir TOUTES les alertes envoyees
   (l'API Telegram ne permet pas de relire les messages envoyes par le bot).

Usage dans un script:
    from notify import notify
    notify(msg, source="gsc", token=TOKEN, chat_id=CHAT_ID)
"""
import json, datetime, requests, urllib3
from pathlib import Path
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

LOG = Path(__file__).parent / "data" / "telegram_log.jsonl"


def notify(msg: str, source: str = "", token: str = None, chat_id=None) -> None:
    # 1. journaliser (toujours, meme si l'envoi echoue)
    try:
        LOG.parent.mkdir(exist_ok=True)
        with open(LOG, "a", encoding="utf-8") as f:
            f.write(json.dumps({
                "at": datetime.datetime.now().isoformat(timespec="seconds"),
                "source": source,
                "msg": msg,
            }, ensure_ascii=False) + "\n")
    except Exception:
        pass
    # 2. envoyer
    if token and chat_id:
        try:
            requests.post(
                f"https://api.telegram.org/bot{token}/sendMessage",
                json={"chat_id": chat_id, "text": msg, "parse_mode": "HTML"},
                verify=False, timeout=15,
            )
        except Exception:
            pass


def read_today(limit: int = 50):
    """Lit les alertes du jour (pour la routine matin)."""
    if not LOG.exists():
        return []
    today = datetime.date.today().isoformat()
    out = []
    for line in LOG.read_text(encoding="utf-8").splitlines()[-500:]:
        try:
            e = json.loads(line)
            if e.get("at", "").startswith(today):
                out.append(e)
        except Exception:
            pass
    return out[-limit:]


def _classify(msg: str):
    """Categorie + tag de triage a partir du contenu du message."""
    m = msg.upper()
    if "REDDIT" in m:
        return ("reddit", "🟢 ACTIONNABLE")
    if "BACKLINK RELANCES" in m or "RELANCE DUE" in m:
        return ("relance", "🔄 AUTO (watcher, draft pret)")
    if "HARO" in m:
        return ("haro", "🔴 SKIP (plateforme suspendue)")
    if "COMPETITOR" in m:
        return ("competitor", "⚪ INFO (veille)")
    if "CALENDRIER" in m or "SAISONNIER" in m:
        return ("seasonal", "⚪ INFO (calendrier)")
    if "ARTICLES A ECRIRE" in m or "INTELLIGENCE" in m or "PROACTIVE" in m:
        return ("proactive", "🟡 A LIRE (suggestions)")
    if "GSC" in m or "SEARCH CONSOLE" in m or "BING" in m or "GA4" in m or "RANKING" in m or "KEYWORD" in m:
        return ("metrics", "⚪ INFO (metriques)")
    if "OUTREACH" in m or "BACKLINK" in m:
        return ("outreach", "🟡 A LIRE (outreach)")
    return ("autre", "⚪ INFO")


def _first_line(msg: str) -> str:
    import re
    txt = re.sub(r"<[^>]+>", " ", msg)
    txt = re.sub(r"\s+", " ", txt).strip()
    return txt[:90]


def digest(days: int = 1):
    """Digest auto-trie des alertes des N derniers jours (1=aujourd'hui)."""
    if not LOG.exists():
        print("(journal vide)")
        return
    import datetime as _dt
    cutoff = (_dt.date.today() - _dt.timedelta(days=days - 1)).isoformat()
    entries = []
    for line in LOG.read_text(encoding="utf-8").splitlines()[-800:]:
        try:
            e = json.loads(line)
            if e.get("at", "")[:10] >= cutoff:
                entries.append(e)
        except Exception:
            pass
    if not entries:
        print(f"Aucune alerte depuis {cutoff}.")
        return
    buckets = {}
    for e in entries:
        cat, tag = _classify(e.get("msg", ""))
        buckets.setdefault(tag, []).append(e)
    order = ["🟢 ACTIONNABLE", "🟡 A LIRE (suggestions)", "🟡 A LIRE (outreach)",
             "🔄 AUTO (watcher, draft pret)", "⚪ INFO (veille)", "⚪ INFO (calendrier)",
             "⚪ INFO (metriques)", "⚪ INFO", "🔴 SKIP (plateforme suspendue)"]
    print(f"=== DIGEST TELEGRAM (depuis {cutoff}) -- {len(entries)} alertes ===")
    for tag in order:
        if tag in buckets:
            print(f"\n{tag} ({len(buckets[tag])}):")
            for e in buckets[tag]:
                print(f"  [{e.get('at','')[11:16]}] {_first_line(e.get('msg',''))}")
    # autres tags non listes
    for tag, items in buckets.items():
        if tag not in order:
            print(f"\n{tag} ({len(items)}):")
            for e in items:
                print(f"  [{e.get('at','')[11:16]}] {_first_line(e.get('msg',''))}")


if __name__ == "__main__":
    import sys, io
    if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    if "--digest" in sys.argv:
        days = 1
        for a in sys.argv:
            if a.isdigit():
                days = int(a)
        digest(days=days)
    else:
        for e in read_today():
            print(f"[{e['at']}] ({e.get('source','')}) {e['msg'][:120]}")
