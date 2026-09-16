"""
TEST PHOTO — instrument de mesure (lecture seule sur GA4/GSC, ecrit un seul JSON).

Question posee par Alessandro le 16/09/2026: est-ce qu'ajouter de vraies photos de
lieux sur les guides change quelque chose ? Le site n'a AUCUNE photographie
aujourd'hui (verifie le 16/09: toutes les images de public/ sont des cartes et des
graphiques, seule exception alessandro.jpg sur /about).

POURQUOI UN GROUPE DE CONTROLE.
Sans controle, un test de ce genre ne prouve rien: une mise a jour d'algorithme, la
saisonnalite ou un pic de trafic bougent TOUTES les pages en meme temps, et on
attribue a la photo ce qui vient du marche. On fige donc AUJOURD'HUI les memes
metriques sur deux groupes comparables, on ne met des photos que sur le groupe TEST,
et a J+30 on lit la difference des VARIATIONS, pas les valeurs brutes.

USAGE
  python scripts/photo_experiment.py --baseline   # fige l'etat AVANT (a lancer AVANT toute photo)
  python scripts/photo_experiment.py --report     # compare test vs controle
  python scripts/photo_experiment.py --log-photo <slug> <source> <licence> <url> --alt "<texte>"

⚠️ N'ENVOIE RIEN, NE PUBLIE RIEN, NE MODIFIE AUCUNE PAGE. Il mesure, c'est tout.
"""
import argparse
import datetime
import io
import json
import sys
from pathlib import Path

import requests
import urllib3
from google.oauth2 import service_account
import google.auth.transport.requests as google_requests

urllib3.disable_warnings()
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
CREDS_FILE = SCRIPT_DIR / "ga4-credentials.json"
STATE_FILE = DATA_DIR / "photo_experiment.json"

GA4_PROPERTY_ID = "542293344"
GA4_URL = f"https://analyticsdata.googleapis.com/v1beta/properties/{GA4_PROPERTY_ID}:runReport"
GSC_SITE = "sc-domain:tokyo-expat.com"
VERIFY_SSL = False

WINDOW_DAYS = 28  # fenetre de reference, assez longue pour absorber le bruit hebdo


# --------------------------------------------------------------------------- API
def _token(scope: str) -> str:
    creds = service_account.Credentials.from_service_account_file(str(CREDS_FILE), scopes=[scope])
    session = requests.Session()
    session.verify = VERIFY_SSL
    creds.refresh(google_requests.Request(session=session))
    return creds.token


def ga4_pages(start: str, end: str) -> dict:
    """{chemin: {sessions, engagement_rate, avg_duration_s, leads}} sur la fenetre."""
    tok = _token("https://www.googleapis.com/auth/analytics.readonly")
    body = {
        "dateRanges": [{"startDate": start, "endDate": end}],
        "dimensions": [{"name": "pagePath"}],
        "metrics": [
            {"name": "sessions"},
            {"name": "engagementRate"},
            {"name": "averageSessionDuration"},
        ],
        "limit": 500,
    }
    r = requests.post(GA4_URL, headers={"Authorization": f"Bearer {tok}"},
                      json=body, verify=VERIFY_SSL, timeout=60)
    r.raise_for_status()
    out = {}
    for row in r.json().get("rows", []):
        path = row["dimensionValues"][0]["value"]
        v = row["metricValues"]
        out[path] = {
            "sessions": int(float(v[0]["value"])),
            "engagement_rate": round(float(v[1]["value"]) * 100, 1),
            "avg_duration_s": round(float(v[2]["value"]), 1),
        }
    return out


def _gsc_query(tok: str, body: dict) -> list:
    url = ("https://searchconsole.googleapis.com/webmasters/v3/sites/"
           + requests.utils.quote(GSC_SITE, safe='') + "/searchAnalytics/query")
    r = requests.post(url, headers={"Authorization": f"Bearer {tok}"},
                      json=body, verify=VERIFY_SSL, timeout=60)
    r.raise_for_status()
    return r.json().get("rows", [])


def gsc_pages(start: str, end: str, search_type: str = "web") -> dict:
    """{chemin: {impressions, clics, ctr, position}} sur la fenetre, par type de recherche."""
    tok = _token("https://www.googleapis.com/auth/webmasters.readonly")
    rows = _gsc_query(tok, {"startDate": start, "endDate": end, "searchType": search_type,
                            "dimensions": ["page"], "rowLimit": 500})
    out = {}
    for row in rows:
        full = row["keys"][0]
        path = "/" + full.split("/", 3)[3] if full.count("/") >= 3 else full
        path = "/" + path.lstrip("/").rstrip("/") if path != "/" else "/"
        out[path] = {
            "impressions": int(row.get("impressions", 0)),
            "clics": int(row.get("clicks", 0)),
            "ctr": round(row.get("ctr", 0) * 100, 2),
            "position": round(row.get("position", 0), 1),
        }
    return out


def gsc_sitewide(start: str, end: str, search_type: str) -> dict:
    """Total du SITE pour un type de recherche. C'est la mesure principale du test:
    Google Images est a ~0 aujourd'hui (4 impressions sur 90 j, mesure le 16/09/2026)
    parce que le site n'a aucune photographie. Partir de zero rend tout mouvement
    LISIBLE, la ou l'engagement d'une page a 9 sessions ne mesure que du bruit."""
    tok = _token("https://www.googleapis.com/auth/webmasters.readonly")
    rows = _gsc_query(tok, {"startDate": start, "endDate": end,
                            "searchType": search_type, "rowLimit": 1})
    if not rows:
        return {"impressions": 0, "clics": 0, "ctr": 0.0, "position": 0.0}
    d = rows[0]
    return {
        "impressions": int(d.get("impressions", 0)),
        "clics": int(d.get("clicks", 0)),
        "ctr": round(d.get("ctr", 0) * 100, 2),
        "position": round(d.get("position", 0), 1),
    }


# ------------------------------------------------------------------------- etat
def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text(encoding="utf-8"))
    return {}


def save_state(s: dict):
    DATA_DIR.mkdir(exist_ok=True)
    STATE_FILE.write_text(json.dumps(s, ensure_ascii=False, indent=2), encoding="utf-8")


def measure(paths: list[str], start: str, end: str) -> dict:
    ga, gsc = ga4_pages(start, end), gsc_pages(start, end)
    img = gsc_pages(start, end, "image")
    snap = {}
    for p in paths:
        row = {}
        row.update(ga.get(p, {"sessions": 0, "engagement_rate": 0.0, "avg_duration_s": 0.0}))
        row.update(gsc.get(p, {"impressions": 0, "clics": 0, "ctr": 0.0, "position": 0.0}))
        row["img_impressions"] = img.get(p, {}).get("impressions", 0)
        row["img_clics"] = img.get(p, {}).get("clics", 0)
        row["vu_par_ga4"] = p in ga
        row["vu_par_gsc"] = p in gsc
        snap[p] = row
    return snap


# --------------------------------------------------------------------- commandes
def cmd_baseline(state: dict):
    if not state.get("test") or not state.get("control"):
        print("⛔ Renseigne d'abord les listes 'test' et 'control' dans", STATE_FILE.name)
        return
    if state.get("baseline"):
        print(f"⛔ Une reference existe deja ({state['baseline_date']}). "
              "La re-figer detruirait le point de comparaison. Supprime-la a la main si c'est voulu.")
        return

    end = datetime.date.today() - datetime.timedelta(days=3)   # GSC a ~3j de decalage
    start = end - datetime.timedelta(days=WINDOW_DAYS - 1)
    paths = state["test"] + state["control"]
    print(f"Fenetre de reference: {start} -> {end} ({WINDOW_DAYS} j), {len(paths)} pages\n")

    state["baseline"] = measure(paths, str(start), str(end))
    state["baseline_date"] = str(datetime.date.today())
    state["baseline_window"] = {"start": str(start), "end": str(end), "days": WINDOW_DAYS}

    # MESURE PRINCIPALE: le site entier dans Google Images, sur 90 j.
    end90 = end
    start90 = end90 - datetime.timedelta(days=89)
    state["baseline_sitewide"] = {
        "fenetre": {"start": str(start90), "end": str(end90), "days": 90},
        "web": gsc_sitewide(str(start90), str(end90), "web"),
        "image": gsc_sitewide(str(start90), str(end90), "image"),
    }
    save_state(state)

    sw = state["baseline_sitewide"]
    print("=== MESURE PRINCIPALE — le site dans Google Images (90 j) ===")
    print(f"  WEB    {sw['web']['impressions']:>7} impr · {sw['web']['clics']:>4} clics · pos {sw['web']['position']}")
    print(f"  IMAGES {sw['image']['impressions']:>7} impr · {sw['image']['clics']:>4} clics · pos {sw['image']['position']}")
    print("  -> Plancher quasi nul: toute valeur franchement superieure sera un SIGNAL,")
    print("     pas du bruit. C'est la seule mesure lisible a l'echelle de trafic du site.\n")

    for grp in ("test", "control"):
        print(f"--- {grp.upper()} ---")
        for p in state[grp]:
            b = state["baseline"][p]
            flag = "" if b["vu_par_ga4"] else "  ⚠️ ABSENTE de GA4 (0 session mesuree)"
            print(f"  {p}")
            print(f"     {b['sessions']:>4} sess · engagement {b['engagement_rate']:>5}% · "
                  f"{b['avg_duration_s']:>6}s · {b['impressions']:>5} impr · {b['clics']:>3} clics · "
                  f"pos {b['position']}{flag}")
    print(f"\n✅ Reference figee dans {STATE_FILE.name}. Les photos peuvent etre ajoutees.")


def _delta(after: dict, before: dict, key: str):
    a, b = after.get(key, 0), before.get(key, 0)
    return a - b


def cmd_report(state: dict):
    if not state.get("baseline"):
        print("⛔ Aucune reference figee. Lance --baseline AVANT d'ajouter des photos.")
        return

    end = datetime.date.today() - datetime.timedelta(days=3)
    start = end - datetime.timedelta(days=WINDOW_DAYS - 1)
    paths = state["test"] + state["control"]
    now = measure(paths, str(start), str(end))

    posees = {p: state.get("photos", {}).get(p, []) for p in state["test"]}
    n_photos = sum(len(v) for v in posees.values())
    jours = (datetime.date.today() - datetime.date.fromisoformat(state["baseline_date"])).days

    print(f"TEST PHOTO — J+{jours} (reference du {state['baseline_date']})")
    print(f"Fenetre actuelle: {start} -> {end}")
    print(f"Photos posees: {n_photos}\n")

    if n_photos == 0:
        print("⚠️ AUCUNE photo posee: ce rapport ne mesure rien d'autre que le bruit du marche.\n")

    # --- MESURE PRINCIPALE ---
    sw0 = state.get("baseline_sitewide")
    if sw0:
        e90 = end
        s90 = e90 - datetime.timedelta(days=89)
        img_now = gsc_sitewide(str(s90), str(e90), "image")
        web_now = gsc_sitewide(str(s90), str(e90), "web")
        i0, w0 = sw0["image"], sw0["web"]
        print("=== MESURE PRINCIPALE — Google Images, site entier (90 j) ===")
        print(f"  IMAGES  {i0['impressions']:>6} -> {img_now['impressions']:<6} impr "
              f"({img_now['impressions'] - i0['impressions']:+d})   "
              f"clics {i0['clics']} -> {img_now['clics']} ({img_now['clics'] - i0['clics']:+d})")
        print(f"  (temoin) WEB {w0['impressions']:>6} -> {web_now['impressions']:<6} impr "
              f"({web_now['impressions'] - w0['impressions']:+d})")
        print("  -> Si IMAGES monte franchement pendant que WEB reste stable, les photos ont")
        print("     ouvert une surface qui n'existait pas. Si les DEUX montent, c'est le site")
        print("     qui progresse, pas les photos: ne pas s'attribuer le merite.\n")

    resume = {}
    for grp in ("test", "control"):
        print(f"--- {grp.upper()} ---")
        agg = {"sessions": 0, "eng": [], "impressions": 0, "clics": 0}
        for p in state[grp]:
            b, a = state["baseline"][p], now[p]
            ds = _delta(a, b, "sessions")
            de = round(a["engagement_rate"] - b["engagement_rate"], 1)
            di = _delta(a, b, "impressions")
            dc = _delta(a, b, "clics")
            k = len(posees.get(p, [])) if grp == "test" else 0
            tag = f" [{k} photo(s)]" if grp == "test" else ""
            print(f"  {p}{tag}")
            print(f"     sess {b['sessions']:>4} -> {a['sessions']:<4} ({ds:+d}) · "
                  f"engagement {b['engagement_rate']:>5}% -> {a['engagement_rate']:<5}% ({de:+}) · "
                  f"impr {di:+d} · clics {dc:+d}")
            agg["sessions"] += ds
            agg["eng"].append(de)
            agg["impressions"] += di
            agg["clics"] += dc
        moy = round(sum(agg["eng"]) / len(agg["eng"]), 1) if agg["eng"] else 0.0
        resume[grp] = {"sessions": agg["sessions"], "engagement_moyen": moy,
                       "impressions": agg["impressions"], "clics": agg["clics"]}
        print()

    t, c = resume["test"], resume["control"]
    print("=== LECTURE: la difference des VARIATIONS, pas les valeurs brutes ===")
    print(f"  engagement   TEST {t['engagement_moyen']:+} pts  vs  CONTROLE {c['engagement_moyen']:+} pts"
          f"   ->  ecart {round(t['engagement_moyen'] - c['engagement_moyen'], 1):+} pts")
    print(f"  sessions     TEST {t['sessions']:+d}          vs  CONTROLE {c['sessions']:+d}")
    print(f"  impressions  TEST {t['impressions']:+d}       vs  CONTROLE {c['impressions']:+d}")
    print(f"  clics        TEST {t['clics']:+d}             vs  CONTROLE {c['clics']:+d}")
    print("\n⚠️ A ces volumes (quelques dizaines de sessions par page), un ecart de quelques")
    print("   points n'est PAS un signal. Ne conclure que sur un ecart FRANC et repete.")
    print("⚠️ L'engagement peut monter simplement parce qu'une image ralentit le chargement")
    print("   ou allonge la page. Verifier que les clics suivent, sinon ce n'est pas de l'interet.")


def cmd_log_photo(state: dict, slug: str, source: str, licence: str, url: str, alt: str):
    state.setdefault("photos", {}).setdefault(slug, []).append({
        "source": source, "licence": licence, "url_origine": url,
        "alt": alt, "ajoutee_le": str(datetime.date.today()),
    })
    save_state(state)
    print(f"✅ Photo consignee pour {slug} ({source}, {licence}).")
    print(f"   Total sur cette page: {len(state['photos'][slug])}")


def main():
    ap = argparse.ArgumentParser(description="Test photo: mesure test vs controle.")
    ap.add_argument("--baseline", action="store_true", help="fige l'etat AVANT photos")
    ap.add_argument("--report", action="store_true", help="compare test vs controle")
    ap.add_argument("--log-photo", nargs=4, metavar=("SLUG", "SOURCE", "LICENCE", "URL"))
    ap.add_argument("--alt", default="", help="texte alternatif de la photo")
    a = ap.parse_args()

    state = load_state()
    if a.baseline:
        cmd_baseline(state)
    elif a.report:
        cmd_report(state)
    elif a.log_photo:
        cmd_log_photo(state, *a.log_photo, alt=a.alt)
    else:
        ap.print_help()


if __name__ == "__main__":
    main()
