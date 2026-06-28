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


if __name__ == "__main__":
    # mode lecture: affiche les alertes du jour
    for e in read_today():
        print(f"[{e['at']}] ({e.get('source','')}) {e['msg'][:120]}")
