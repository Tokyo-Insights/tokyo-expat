# -*- coding: utf-8 -*-
"""
telegram_shim.py — journal + mode silencieux des envois Telegram.

POURQUOI CE FICHIER EXISTE (09/09/2026)
Ce code vivait dans `config.py`, qui est dans le `.gitignore` parce qu'il porte
les secrets. Consequence: le journal Telegram et le mode silencieux — dont depend
toute la chaine du mercredi — n'etaient sauvegardes NULLE PART. `backup_env.py`
sauvegarde `.env`, pas `config.py`. Une perte de disque, et la chaine du mercredi
redevenait une avalanche d'une vingtaine d'alertes, sans que rien ne le signale.
Ici, il n'y a aucun secret: le fichier est versionne, et `config.py` ne garde plus
que les identifiants.

CE QUE FAIT LE PATCH
Tout script qui importe `config` et envoie un message Telegram via `requests.post`
est journalise dans `data/telegram_log.jsonl`. L'API bot ne permet pas de relire
ses propres envois: ce journal est la seule trace complete.

MODE SILENCIEUX
Si `TE_TELEGRAM_SILENT=1`, le message est JOURNALISE mais PAS envoye. C'est ce qui
permet a la chaine hebdo de tourner sans faire sonner le telephone vingt fois,
alors que le rapport consolide reprend deja tout. Rien n'est perdu: le journal
reste complet, donc `notify.py --digest` et `weekly_report.py` voient tout.
"""
import datetime as _dt
import json as _json
import os as _os
import sys as _sys
from pathlib import Path as _Path

import requests as _rq

_TG_LOG = _Path(__file__).parent / "data" / "telegram_log.jsonl"
_PAUSE = _Path(__file__).parent / "data" / "pause_mode.json"


def pause_active():
    """Date de fin (str) si la pause est en cours, sinon None. Pour les scripts qui
    doivent SUSPENDRE leur etat, pas seulement se taire (echeances_reminder)."""
    try:
        cfg = _json.loads(_PAUSE.read_text(encoding="utf-8"))
        return cfg["until"] if _dt.date.today() < _dt.date.fromisoformat(cfg["until"]) else None
    except Exception:
        return None


def _pause_bloque(msg):
    """MODE PAUSE (25/09/2026): Alessandro fait une pause jusqu'a la date `until`.

    Pendant la pause, seuls passent les messages qui exigent une action humaine:
    un script de `allow` (site casse) ou un message contenant un motif de
    `allow_if_contains` (un partenaire a repondu). Tout le reste est JOURNALISE
    mais pas envoye, comme en mode silencieux: rien n'est perdu, le journal reste
    complet pour la reprise. Les leads du formulaire ne passent PAS par ici (ils
    partent du serveur Vercel), ils sonnent donc toujours.
    Fichier absent, illisible ou date depassee -> aucun effet.
    """
    try:
        cfg = _json.loads(_PAUSE.read_text(encoding="utf-8"))
        if _dt.date.today() >= _dt.date.fromisoformat(cfg["until"]):
            return False
        script = _Path(_sys.argv[0]).name if _sys.argv and _sys.argv[0] else ""
        if script in cfg.get("allow", []):
            return False
        if any(m in msg for m in cfg.get("allow_if_contains", [])):
            return False
        return True
    except Exception:
        return False


class SilencedResponse:
    """Reponse factice, qui doit ressembler a une vraie reponse `requests`.

    ⚠️ La premiere version n'exposait que `status_code`, `text` et `json()`.
    `google_alerts_monitor` teste `r.ok` et affichait donc
    "[WARN] Telegram error: '_SilencedResponse' object has no attribute 'ok'":
    le silence transformait un envoi reussi en erreur affichee. Un bouchon doit
    imiter l'objet qu'il remplace, sinon il deplace la panne au lieu de la taire.
    Tout ce que les scripts du parc lisent sur une reponse est couvert ici.
    """
    status_code = 200
    ok = True
    reason = "OK"
    text = '{"ok":true,"silenced":true}'
    content = b'{"ok":true,"silenced":true}'
    encoding = "utf-8"
    headers = {"Content-Type": "application/json"}
    url = "https://api.telegram.org/silenced"

    def json(self):
        return {"ok": True, "silenced": True, "result": {"message_id": 0}}

    def raise_for_status(self):
        return None

    def __bool__(self):
        return True


def installer():
    """Pose le patch une seule fois, quel que soit le nombre d'imports."""
    if getattr(_rq.post, "_tg_logged", False):
        return
    _orig_post = _rq.post

    def _logged_post(url, *args, **kwargs):
        is_tg = "api.telegram.org" in str(url) and "sendMessage" in str(url)
        silent = _os.environ.get("TE_TELEGRAM_SILENT", "") == "1"
        paused = False
        try:
            if is_tg:
                payload = kwargs.get("json") or {}
                msg = payload.get("text", "")
                if not silent and msg and _pause_bloque(msg):
                    paused = True
                if msg:
                    _TG_LOG.parent.mkdir(exist_ok=True)
                    with open(_TG_LOG, "a", encoding="utf-8") as _f:
                        _f.write(_json.dumps({
                            "at": _dt.datetime.now().isoformat(timespec="seconds"),
                            "source": "silenced" if silent else ("paused" if paused else "auto"),
                            "msg": msg,
                        }, ensure_ascii=False) + "\n")
        except Exception:
            pass
        if is_tg and (silent or paused):
            return SilencedResponse()
        return _orig_post(url, *args, **kwargs)

    _logged_post._tg_logged = True
    _rq.post = _logged_post
