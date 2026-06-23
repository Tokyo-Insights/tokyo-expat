"""
backup_env.py -- Sauvegarde chiffree de scripts/.env vers OneDrive
Chiffrement Fernet (AES-128-CBC + HMAC). La cle est LOCALE (AppData),
le fichier chiffre va sur OneDrive. Sans la cle locale, le backup est inutilisable.

Usage:
  python scripts/backup_env.py           # backup + rapport
  python scripts/backup_env.py --restore # restaure le dernier backup

Cron: ajouter dans run_weekly_intelligence.bat (1 appel suffit)
"""
import sys
import io
import os
import json
import datetime
import shutil
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

try:
    from cryptography.fernet import Fernet
except ImportError:
    print("[ERROR] cryptography non installe. Lancer: pip install cryptography")
    sys.exit(1)

# Chemins
SCRIPT_DIR = Path(__file__).parent
ENV_FILE = SCRIPT_DIR / ".env"
KEY_DIR = Path(os.environ.get("APPDATA", Path.home())) / "tokyo-expat"
KEY_FILE = KEY_DIR / "backup.key"
ONEDRIVE = Path.home() / "OneDrive"
BACKUP_DIR = ONEDRIVE / "Documents" / "tokyo-expat-backups"
MAX_BACKUPS = 10  # garder les 10 derniers


def get_or_create_key() -> bytes:
    KEY_DIR.mkdir(parents=True, exist_ok=True)
    if KEY_FILE.exists():
        return KEY_FILE.read_bytes()
    key = Fernet.generate_key()
    KEY_FILE.write_bytes(key)
    os.chmod(KEY_FILE, 0o600)
    print(f"[NEW] Cle de chiffrement creee : {KEY_FILE}")
    print("  IMPORTANT: Ne jamais partager ou supprimer ce fichier.")
    print("  Sans lui, les backups sur OneDrive sont illisibles.")
    return key


def backup():
    if not ENV_FILE.exists():
        print(f"[ERROR] {ENV_FILE} introuvable")
        return False

    if not ONEDRIVE.exists():
        print(f"[WARN] OneDrive introuvable ({ONEDRIVE}). Backup annule.")
        return False

    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    key = get_or_create_key()
    f = Fernet(key)

    plaintext = ENV_FILE.read_bytes()
    encrypted = f.encrypt(plaintext)

    ts = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    out = BACKUP_DIR / f".env.{ts}.enc"
    out.write_bytes(encrypted)
    print(f"[OK] Backup : {out.name} ({len(encrypted)} bytes)")

    # Metadata lisible (pas sensible)
    meta = {
        "date": ts,
        "size_original": len(plaintext),
        "lines": plaintext.decode("utf-8", errors="replace").count("\n"),
        "key_location": str(KEY_FILE),
    }
    (BACKUP_DIR / f".env.{ts}.meta.json").write_text(
        json.dumps(meta, indent=2), encoding="utf-8"
    )

    # Rotation : garder MAX_BACKUPS fichiers .enc
    enc_files = sorted(BACKUP_DIR.glob(".env.*.enc"))
    for old in enc_files[:-MAX_BACKUPS]:
        old.unlink(missing_ok=True)
        meta_old = old.with_suffix("").with_suffix(".meta.json")
        meta_old.unlink(missing_ok=True)
        print(f"  [ROTATE] Supprime ancien backup : {old.name}")

    backups = sorted(BACKUP_DIR.glob(".env.*.enc"))
    print(f"[INFO] {len(backups)} backup(s) disponibles dans {BACKUP_DIR}")
    return True


def restore(target: Path = None):
    if not KEY_FILE.exists():
        print(f"[ERROR] Cle introuvable : {KEY_FILE}")
        print("  Impossible de restaurer sans la cle de chiffrement.")
        return False

    if not BACKUP_DIR.exists():
        print(f"[ERROR] Dossier backup introuvable : {BACKUP_DIR}")
        return False

    enc_files = sorted(BACKUP_DIR.glob(".env.*.enc"))
    if not enc_files:
        print("[ERROR] Aucun backup trouve.")
        return False

    src = target or enc_files[-1]
    print(f"[INFO] Restauration depuis : {src.name}")

    key = KEY_FILE.read_bytes()
    f = Fernet(key)
    try:
        plaintext = f.decrypt(src.read_bytes())
    except Exception as e:
        print(f"[ERROR] Dechiffrement echoue : {e}")
        return False

    # Sauvegarde de l'existant avant ecrasement
    if ENV_FILE.exists():
        bak = ENV_FILE.with_suffix(".bak")
        shutil.copy2(ENV_FILE, bak)
        print(f"  [SAFE] .env actuel sauvegarde en {bak.name}")

    ENV_FILE.write_bytes(plaintext)
    print(f"[OK] .env restaure ({len(plaintext)} bytes)")
    return True


if __name__ == "__main__":
    if "--restore" in sys.argv:
        restore()
    else:
        backup()
