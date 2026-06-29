"""
config.py — charge les variables depuis scripts/.env (jamais committe)

Variables .env:
  TELEGRAM_BOT_TOKEN   = bot Tokyo Insights (obligatoire si pas de bot TE dedie)
  TELEGRAM_CHAT_ID     = chat ID commun
  TOKYO_EXPAT_BOT_TOKEN = bot dedie tokyo-expat (optionnel, sinon fallback TI)
  TOKYO_EXPAT_CHAT_ID  = chat ID dedie (optionnel, sinon fallback TELEGRAM_CHAT_ID)
"""
import os
from pathlib import Path

_env_file = Path(__file__).parent / '.env'
if _env_file.exists():
    with open(_env_file, encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                k, v = line.split('=', 1)
                os.environ.setdefault(k.strip(), v.strip())

# Bot Tokyo Insights (legacy fallback)
TELEGRAM_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "")

# Bot dedie Tokyo Expat (utilise par tous les scripts TE)
# Si TOKYO_EXPAT_BOT_TOKEN pas defini, on reutilise le bot TI
TE_TOKEN = os.environ.get("TOKYO_EXPAT_BOT_TOKEN") or TELEGRAM_TOKEN
TE_CHAT_ID = os.environ.get("TOKYO_EXPAT_CHAT_ID") or TELEGRAM_CHAT_ID

if not TELEGRAM_TOKEN or not TELEGRAM_CHAT_ID:
    raise RuntimeError(
        "Variables manquantes. Cree scripts/.env avec:\n"
        "TELEGRAM_BOT_TOKEN=<token BotFather>\n"
        "TELEGRAM_CHAT_ID=6474251868\n"
        "\nOptionnel (bot dedie tokyo-expat):\n"
        "TOKYO_EXPAT_BOT_TOKEN=<token nouveau bot>\n"
        "TOKYO_EXPAT_CHAT_ID=<chat id nouveau bot>"
    )

# Gmail IMAP (pour haro_monitor.py + email_reply_monitor.py)
GMAIL_ADDRESS = os.environ.get("GMAIL_ADDRESS", "")
GMAIL_APP_PASSWORD = os.environ.get("GMAIL_APP_PASSWORD", "")

# Perplexity AI (pour ai_visibility_monitor.py)
# Obtenir : perplexity.ai -> Settings -> API -> Generate
PERPLEXITY_API_KEY = os.environ.get("PERPLEXITY_API_KEY", "")

# Bing Webmaster API (pour bing_analytics.py)
BING_API_KEY = os.environ.get("BING_API_KEY", "")

# ============================================================
# JOURNAL TELEGRAM AUTOMATIQUE (patch global)
# Tout script qui importe config + envoie un message Telegram via requests.post
# est journalise dans data/telegram_log.jsonl. => Claude lit ce journal chaque
# matin pour voir 100% des alertes (l'API bot ne permet pas de relire ses envois).
# Transparent: passe tout a la fonction d'origine, ne logge que les sendMessage.
# ============================================================
import json as _json, datetime as _dt
import requests as _rq
_TG_LOG = Path(__file__).parent / "data" / "telegram_log.jsonl"
if not getattr(_rq.post, "_tg_logged", False):
    _orig_post = _rq.post
    def _logged_post(url, *args, **kwargs):
        try:
            if "api.telegram.org" in str(url) and "sendMessage" in str(url):
                payload = kwargs.get("json") or {}
                msg = payload.get("text", "")
                if msg:
                    _TG_LOG.parent.mkdir(exist_ok=True)
                    with open(_TG_LOG, "a", encoding="utf-8") as _f:
                        _f.write(_json.dumps({
                            "at": _dt.datetime.now().isoformat(timespec="seconds"),
                            "source": "auto",
                            "msg": msg,
                        }, ensure_ascii=False) + "\n")
        except Exception:
            pass
        return _orig_post(url, *args, **kwargs)
    _logged_post._tg_logged = True
    _rq.post = _logged_post
