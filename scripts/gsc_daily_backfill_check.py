# -*- coding: utf-8 -*-
"""
gsc_daily_backfill_check.py -- la fin de la courbe GSC ment-elle ? (17/09/2026)

POURQUOI CE SCRIPT EXISTE
-------------------------
Le 17/09/2026, la courbe GSC montrait une chute nette sur ses derniers jours
(1 879 impressions le 09/09 -> 334 le 14/09) accompagnee d'une position moyenne qui
"s'ameliore" de 23,7 a 10,3. Deux lectures, incompatibles:

  (a) la donnee des derniers jours n'est pas encore consolidee, Google la complete
      apres coup, et toute fin de courbe GSC plonge donc par construction;
  (b) les impressions se sont vraiment effondrees.

**Aucune des deux ne peut etre tranchee avec UN seul releve.** Il faut le MEME jour,
mesure DEUX fois, a quelques jours d'intervalle. Ce script garde la trace: chaque
execution enregistre les valeurs par jour AVEC la date du releve, et `--compare`
montre de combien un jour deja mesure a bouge depuis.

  python scripts/gsc_daily_backfill_check.py            # enregistre un releve
  python scripts/gsc_daily_backfill_check.py --compare  # variation depuis les releves passes

Si un jour gagne des impressions apres coup, la lecture (a) est prouvee et il ne faut
plus jamais lire les 3 derniers points d'une courbe GSC comme une tendance.
"""
import datetime as dt
import io
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

from gsc_analytics import get_token, query_gsc

SITE = "sc-domain:tokyo-expat.com"
STORE = Path(__file__).parent / "data" / "gsc_daily_snapshots.jsonl"
LOOKBACK = 21


def preleve():
    end = dt.date.today()
    start = end - dt.timedelta(days=LOOKBACK)
    j = query_gsc(get_token(), SITE, start.isoformat(), end.isoformat(),
                  ["date"], row_limit=200).json()
    return {r["keys"][0]: {"clicks": r["clicks"], "impressions": r["impressions"],
                           "position": round(r["position"], 2)}
            for r in j.get("rows", [])}


def charge():
    if not STORE.exists():
        return []
    return [json.loads(l) for l in STORE.read_text(encoding="utf-8").splitlines() if l.strip()]


def main():
    jours = preleve()
    if not jours:
        print("Aucune ligne renvoyee par la GSC.")
        return
    dernier = max(jours)
    print(f"Releve du {dt.date.today()} : {len(jours)} jours, le plus recent est le {dernier} "
          f"(retard de {(dt.date.today() - dt.date.fromisoformat(dernier)).days} jours).")

    if "--compare" in sys.argv:
        passes = charge()
        if not passes:
            print("Aucun releve anterieur enregistre: relancer ce script dans quelques jours.")
        for p in passes:
            bouges = []
            for d, v in p["jours"].items():
                now = jours.get(d)
                if now and now["impressions"] != v["impressions"]:
                    bouges.append((d, v["impressions"], now["impressions"],
                                   v["position"], now["position"]))
            print(f"\nDepuis le releve du {p['preleve_le']} : "
                  f"{len(bouges)} jour(s) ont CHANGE apres coup.")
            for d, i0, i1, p0, p1 in sorted(bouges):
                print(f"  {d}: {i0} -> {i1} impressions ({i1 - i0:+d}), "
                      f"position {p0} -> {p1}")
            if bouges:
                print("  👉 La donnee recente se remplit APRES COUP. Ne jamais lire les "
                      "derniers points d'une courbe GSC comme une tendance.")

    with io.open(STORE, "a", encoding="utf-8") as f:
        f.write(json.dumps({"preleve_le": dt.date.today().isoformat(), "jours": jours},
                           ensure_ascii=False) + "\n")
    print(f"[Enregistre dans {STORE.name}]")


if __name__ == "__main__":
    main()
