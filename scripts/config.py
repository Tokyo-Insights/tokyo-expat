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
