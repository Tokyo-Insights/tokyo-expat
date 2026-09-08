# -*- coding: utf-8 -*-
"""bing_backlinks.py -- QUI NOUS LIE VRAIMENT (la metrique-phare, enfin mesuree).

Le master plan designe les DOMAINES REFERENTS comme l'indicateur avance, et jusqu'ici
aucun script ne les comptait: la section "backlinks" du rapport hebdo lit du TRAFIC de
reference GA4, ou un lien d'autorite n'apparait jamais. Le registre etait tenu a la main.

Bing Webmaster expose les liens entrants par son API, et la cle est deja en place
(scripts/.env, BING_API_KEY, la meme que bing_analytics.py). On s'en sert ici pour:
  1. compter les DOMAINES referents reels,
  2. decouvrir ceux qu'on ne connait pas (ex: dailytokyo.news, origine jamais elucidee),
  3. reperer les liens perdus d'un run a l'autre.

Sortie: scripts/data/backlinks_bing.json (etat courant + historique des apparitions).

  python scripts/bing_backlinks.py           # liste et enregistre
  python scripts/bing_backlinks.py --telegram  # + resume Telegram si du NOUVEAU
"""
import datetime as dt
import io
import json
import sys
from pathlib import Path
from urllib.parse import urlparse

import requests
import urllib3

urllib3.disable_warnings()
sys.path.insert(0, str(Path(__file__).resolve().parent))
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

SCRIPT_DIR = Path(__file__).resolve().parent
OUT = SCRIPT_DIR / "data" / "backlinks_bing.json"
SITE = "https://tokyo-expat.com/"
API = "https://ssl.bing.com/webmaster/api.svc/json"

KEY = None
for line in (SCRIPT_DIR / ".env").read_text(encoding="utf-8").splitlines():
    if line.startswith("BING_API_KEY="):
        KEY = line.split("=", 1)[1].strip()


def call(method, site=SITE, **params):
    params["apikey"] = KEY
    params["siteUrl"] = site
    return requests.get(f"{API}/{method}", params=params, verify=False, timeout=60)


def properties():
    """Les proprietes tokyo-expat verifiees dans le compte Bing.

    ⚠️ CONSTAT DU 08/09/2026: le compte ne contient que l'APEX
    `https://tokyo-expat.com/`, alors que le site sert sur **www** (l'apex renvoie un 308
    vers www) et que les 4 backlinks connus pointent tous vers `https://www.tokyo-expat.com/`.
    Bing regarde donc un hostname que personne ne lie. En iterant sur les proprietes du
    compte, ce script prendra automatiquement la propriete www le jour ou elle sera ajoutee,
    sans qu'il faille le modifier.
    """
    try:
        r = requests.get(f"{API}/GetUserSites", params={"apikey": KEY}, verify=False, timeout=45)
        sites = [s.get("Url") for s in r.json().get("d", []) if s.get("IsVerified")]
    except Exception as e:
        print(f"[WARN] GetUserSites: {e}")
        return [SITE]
    keep = [s for s in sites if s and "tokyo-expat" in s]
    return keep or [SITE]


def domain(url):
    try:
        h = urlparse(url).netloc.lower()
        return h[4:] if h.startswith("www.") else h
    except Exception:
        return ""


OURS = {"tokyo-expat.com", "tokyo-insights.com"}


def fetch_links():
    """Retourne {domaine: [urls sources]} ou None si l'API n'a pas repondu.

    On essaie les deux methodes exposees par Bing Webmaster; les noms ont change
    selon les versions de l'API, donc on ne suppose rien et on rapporte ce qu'on voit.
    """
    found = {}
    repondu = False
    for site in properties():
        print(f"[propriete] {site}")
        for method in ("GetLinkCounts", "GetConnectedPages"):
            try:
                r = call(method, site=site, **({"page": 0} if method == "GetLinkCounts" else {}))
            except Exception as e:
                print(f"  [WARN] {method}: {e}")
                continue
            if r.status_code != 200:
                print(f"  [WARN] {method} -> HTTP {r.status_code} {r.text[:120]}")
                continue
            repondu = True
            try:
                payload = r.json().get("d")
            except Exception:
                print(f"  [WARN] {method}: reponse illisible")
                continue
            rows = payload if isinstance(payload, list) else (payload or {}).get("Links", []) or []
            for row in rows:
                url = (row.get("Url") or row.get("AnchorUrl") or "") if isinstance(row, dict) else str(row)
                d = domain(url)
                if d and d not in OURS:
                    found.setdefault(d, []).append(url)
            print(f"  [OK] {method}: {len(rows)} ligne(s)")
    return found if repondu else None


def main():
    if not KEY:
        print("BING_API_KEY manquante dans scripts/.env")
        return
    today = dt.date.today().isoformat()

    state = {}
    if OUT.exists():
        try:
            state = json.loads(OUT.read_text(encoding="utf-8"))
        except Exception:
            state = {}
    known = state.get("domains", {})

    found = fetch_links()
    if found is None:
        print("\nAucune methode de liens n'a repondu. La cle est peut-etre limitee a "
              "l'API trafic, ou l'endpoint a change de nom.\n"
              "Repli manuel: Bing Webmaster Tools > Backlinks > Referring domains.")
        return

    nouveaux = sorted(set(found) - set(known))
    perdus = sorted(set(known) - set(found))

    for d, urls in found.items():
        e = known.setdefault(d, {"first_seen": today, "urls": []})
        e["last_seen"] = today
        e["urls"] = sorted(set(e.get("urls", []) + urls))[:20]

    state.update({"updated": today, "domains": known,
                  "current_count": len(found), "current": sorted(found)})
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"\n=== DOMAINES REFERENTS (Bing, {today}) : {len(found)} ===")
    for d in sorted(found):
        mark = " 🆕" if d in nouveaux else ""
        print(f"  {d}{mark}  ({len(found[d])} lien(s))")
    if perdus:
        print(f"\n⚠️ Plus vus depuis le dernier run : {', '.join(perdus)}")
    print(f"\n-> {OUT}")

    if "--telegram" in sys.argv and (nouveaux or perdus):
        try:
            from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID
            msg = f"🔗 <b>Domaines referents : {len(found)}</b>"
            if nouveaux:
                msg += "\n🆕 " + ", ".join(nouveaux)
            if perdus:
                msg += "\n⚠️ perdus : " + ", ".join(perdus)
            requests.post(f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
                          json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML"},
                          verify=False, timeout=15)
        except Exception as e:
            print("TG fail:", e)


if __name__ == "__main__":
    main()
