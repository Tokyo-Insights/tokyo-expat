"""
config.py — charge les variables depuis scripts/.env (jamais committé)
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

TELEGRAM_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "")

if not TELEGRAM_TOKEN or not TELEGRAM_CHAT_ID:
    raise RuntimeError(
        "Variables manquantes. Cree scripts/.env avec:\n"
        "TELEGRAM_BOT_TOKEN=<nouveau token BotFather>\n"
        "TELEGRAM_CHAT_ID=6474251868"
    )
