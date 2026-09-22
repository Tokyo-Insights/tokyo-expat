# -*- coding: utf-8 -*-
"""
ga4_daily_report.py -- Pouls QUOTIDIEN GA4 (complement du digest hebdo ga4_analytics.py).

Mesure l'impact des posts Reddit au jour le jour: sessions d'hier vs base 7j,
top pages, TOP PAYS (d'ou viennent les visiteurs), top sources, conversions email.
Reutilise la cle de service EXISTANTE (ga4-credentials.json) + property 542293344.
REST direct (pas de lib supplementaire). Telegram chaque matin.

Se desactive proprement si la cle est absente.

  python scripts/ga4_daily_report.py            # rapport d'hier -> Telegram
  python scripts/ga4_daily_report.py --print     # affiche sans envoyer
"""
import sys, io, os, json, datetime, statistics
from pathlib import Path
import requests, urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

sys.path.insert(0, str(Path(__file__).parent))
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

SCRIPT_DIR = Path(__file__).parent
CREDS_FILE = SCRIPT_DIR / "ga4-credentials.json"
PROPERTY_ID = "542293344"
API = f"https://analyticsdata.googleapis.com/v1beta/properties/{PROPERTY_ID}:runReport"


def send_telegram(msg):
    try:
        requests.post(f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
                      json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML",
                            "disable_web_page_preview": True}, timeout=15, verify=False)
    except Exception as e:
        print(f"[WARN] telegram: {e}")


def get_token():
    from google.oauth2 import service_account
    import google.auth.transport.requests as gr
    creds = service_account.Credentials.from_service_account_file(
        str(CREDS_FILE), scopes=["https://www.googleapis.com/auth/analytics.readonly"])
    s = requests.Session(); s.verify = False
    creds.refresh(gr.Request(session=s))
    return creds.token


def report(token, date_ranges, metrics, dimensions=None, order_metric=None, limit=10):
    body = {"dateRanges": date_ranges, "metrics": [{"name": m} for m in metrics], "limit": limit}
    if dimensions:
        body["dimensions"] = [{"name": d} for d in dimensions]
    if order_metric:
        body["orderBys"] = [{"metric": {"metricName": order_metric}, "desc": True}]
    r = requests.post(API, headers={"Authorization": f"Bearer {token}"}, json=body, verify=False, timeout=30)
    r.raise_for_status()
    return r.json()


def total(j, i=0):
    rows = j.get("rows", [])
    return int(rows[0]["metricValues"][i]["value"]) if rows else 0


def rows(j, n=6):
    out = []
    for r in j.get("rows", [])[:n]:
        out.append((r["dimensionValues"][0]["value"], r["metricValues"][0]["value"]))
    return out


def main():
    do_print = "--print" in sys.argv
    force = "--force" in sys.argv
    if not CREDS_FILE.exists():
        print(f"[INACTIF] {CREDS_FILE.name} absent.")
        return
    # garde-fou: 1 seul envoi Telegram par jour (meme si le PC redemarre plusieurs fois)
    marker = SCRIPT_DIR / "data" / "ga4_daily_last.txt"
    today = datetime.date.today().isoformat()
    if not do_print and not force and marker.exists() and marker.read_text(encoding="utf-8").strip() == today:
        print("[SKIP] rapport GA4 deja envoye aujourd'hui.")
        return
    token = get_token()
    yest = {"startDate": "yesterday", "endDate": "yesterday"}
    prior = {"startDate": "8daysAgo", "endDate": "2daysAgo"}

    # FIX 2026-07-09: un seul runReport avec 2 dateRanges NE garantit PAS l'ordre
    # des lignes (GA4 les renvoyait triees par sessions desc), donc trows[0]/trows[1]
    # inversaient "hier" et "base 7j" -> faux "151 sessions hier (+4705%)".
    # Solution: 2 rapports SEPARES, sans ambiguite d'ordre.
    y = report(token, [yest], ["sessions", "activeUsers", "screenPageViews"])
    y_sess = total(y, 0)
    y_users = total(y, 1)
    y_views = total(y, 2)

    # CORRIGE 2026-09-20. La base etait une MOYENNE sur 7 jours (p_sess / 7), donc UN
    # seul jour aberrant la deplacait pendant une semaine entiere.
    # Cas reel: le 17/09/2026, 416 sessions (dont 385 depuis Singapour, 394 en Direct
    # sans referent, ~4,7 s d'engagement par session, aucune page au-dela de 6 vues:
    # une ferme de bots en datacenter) ont porte la base a ~102 sessions/jour. Le 19/09,
    # 53 sessions -- un samedi parfaitement ordinaire, les deux precedents faisaient 54
    # et 57 -- ont donc ete annoncees "-48 % 📉". Une fausse alerte fabriquee de bout en
    # bout par l'instrument, pas par le trafic.
    # La MEDIANE ignore par construction un jour aberrant sur sept. On garde le jour
    # aberrant VISIBLE au lieu de le taire: un pic de bots est une information.
    p = report(token, [prior], ["sessions"], ["date"], None, 30)
    par_jour = {r["dimensionValues"][0]["value"]: int(r["metricValues"][0]["value"])
                for r in p.get("rows", [])}
    jours = sorted(par_jour.values())
    base = statistics.median(jours) if jours else 0
    delta = ((y_sess - base) / base * 100) if base else 0
    aberrants = [v for v in jours if base and v >= 3 * base]

    pages = report(token, [yest], ["screenPageViews"], ["pagePath"], "screenPageViews", 5)
    countries = report(token, [yest], ["activeUsers"], ["country"], "activeUsers", 6)
    # limite portee de 4 a 20: l'affichage n'en montre toujours que 4, mais le calcul
    # de l'organique ci-dessous a besoin de TOUTES les lignes, pas des 4 premieres.
    sources = report(token, [yest], ["sessions"], ["sessionDefaultChannelGroup"], "sessions", 20)

    # --- SESSIONS ORGANIQUES, A COTE DU TOTAL (ajoute 2026-09-20) ---
    # Le total est falsifiable: le 17/09/2026, 385 des 416 sessions venaient d'une ferme
    # de datacenter a Singapour, en Direct / (none), ~4,7 s d'engagement par session,
    # aucune page au-dela de 6 vues. Le trafic organique, lui, est valide par Google en
    # amont: une ferme de datacenter ne fabrique pas une session Organic Search.
    # ⛔ On ne filtre PAS par pays. Singapour est un vrai pays avec de vrais visiteurs,
    # et une liste de pays a exclure se perimerait en silence, exactement comme la liste
    # HORS_JAPON de content_gap.py. On affiche les DEUX chiffres: c'est l'ECART entre eux
    # qui signale la contamination, sans avoir a nommer qui que ce soit.
    ORGANIQUE = "Organic Search"
    y_org = sum(int(r["metricValues"][0]["value"]) for r in sources.get("rows", [])
                if r["dimensionValues"][0]["value"] == ORGANIQUE)
    p_can = report(token, [prior], ["sessions"],
                   ["date", "sessionDefaultChannelGroup"], None, 500)
    # ⚠️ Un jour SANS session organique ne rend aucune ligne. Partir des lignes seules
    # calculerait la mediane sur un denominateur ampute, donc trop haut. On part des
    # jours vus au total et on y pose zero par defaut.
    org_par_jour = {d: 0 for d in par_jour}
    for r in p_can.get("rows", []):
        if r["dimensionValues"][1]["value"] == ORGANIQUE:
            org_par_jour[r["dimensionValues"][0]["value"]] = int(r["metricValues"][0]["value"])
    org_jours = sorted(org_par_jour.values())
    base_org = statistics.median(org_jours) if org_jours else 0
    delta_org = ((y_org - base_org) / base_org * 100) if base_org else 0
    part_org = (y_org / y_sess * 100) if y_sess else 0

    # ================================================================================
    # AJOUTE 2026-09-22 -- L'ORGANIQUE D'HIER N'EST PAS UN FAIT ETABLI.
    # ================================================================================
    # GA4 revise l'organique A LA HAUSSE pendant ~3 jours. Mesure du 22/09/2026, en
    # comparant ce que ce script a ENVOYE (telegram_log.jsonl) a la valeur relue plus
    # tard pour le meme jour:
    #     19/09 annonce 6  -> vaut 7   (+1)
    #     20/09 annonce 4  -> vaut 7   (+3, soit +75 %)
    #     18/09 annonce <=4 (hors top-4 des sources) -> vaut 11
    # Ce biais a failli couter un dossier: le 21/09 a ete lu "9" et compare a un seuil
    # de sortie de 10 ecrit pour une valeur FINALE. Le "4 du 20/09, plus bas des 35
    # jours", qui portait tout le raisonnement, n'a simplement jamais existe.
    # ⚠️ C'est l'INVERSE de la GSC, dont on a prouve le 20/09 qu'elle ne se remplit PAS
    # apres coup. Les deux instruments ont des comportements opposes: ne pas transposer.
    # Le script mesure donc sa propre revision au lieu de la supposer, et annonce
    # desormais DEUX chiffres: hier (provisoire) et J-3 (stable).
    FENETRE = [{"startDate": "40daysAgo", "endDate": "yesterday"}]
    h_tot = report(token, FENETRE, ["sessions"], ["date"], None, 100)
    h_can = report(token, FENETRE, ["sessions"], ["date", "sessionDefaultChannelGroup"], None, 1000)
    org_hist = {r["dimensionValues"][0]["value"]: 0 for r in h_tot.get("rows", [])}
    for r in h_can.get("rows", []):
        if r["dimensionValues"][1]["value"] == ORGANIQUE:
            org_hist[r["dimensionValues"][0]["value"]] = int(r["metricValues"][0]["value"])

    def as_date(s):
        return datetime.date(int(s[:4]), int(s[4:6]), int(s[6:]))

    # Journal des lectures: on garde la PREMIERE valeur vue (et a quel age) pour pouvoir
    # chiffrer la revision plus tard. Ecriture atomique: un plantage d'encodage ne doit
    # pas laisser un fichier vide derriere lui.
    HIST = SCRIPT_DIR / "data" / "ga4_organic_history.json"
    try:
        seen = json.loads(HIST.read_text(encoding="utf-8"))
    except Exception:
        seen = {}
    auj = datetime.date.today()
    for d, v in org_hist.items():
        rec = seen.setdefault(d, {})
        if "first" not in rec:
            rec["first"] = v
            rec["first_age"] = (auj - as_date(d)).days
        rec["last"] = v
        rec["last_at"] = today
    HIST.parent.mkdir(exist_ok=True)
    tmp = HIST.with_suffix(".tmp")
    tmp.write_text(json.dumps(seen, ensure_ascii=False, indent=1, sort_keys=True), encoding="utf-8")
    os.replace(tmp, HIST)

    # Revision observee: uniquement les jours lus pour la premiere fois a J+1 et
    # aujourd'hui assez murs (>= J+3) pour que la valeur soit stabilisee.
    revisions = [rec["last"] - rec["first"] for d, rec in seen.items()
                 if rec.get("first_age") == 1 and (auj - as_date(d)).days >= 3]
    rev_med = statistics.median(revisions) if revisions else None

    # Le point STABLE (J-3), compare au MEME JOUR DE SEMAINE.
    # Une mediane 7j melange ouvrable et week-end: comparer un dimanche a une base
    # majoritairement ouvrable exagere la chute (lecon du 21/09/2026, organique median
    # lun-ven = 15 contre sam-dim = 10).
    JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]
    d_stable = auj - datetime.timedelta(days=3)
    k_stable = d_stable.strftime("%Y%m%d")
    org_stable = org_hist.get(k_stable)
    dow = d_stable.weekday()
    memes_jours = [v for k, v in org_hist.items() if as_date(k).weekday() == dow and k != k_stable]
    base_dow = statistics.median(memes_jours) if len(memes_jours) >= 3 else None
    # Loop 2 (GEO): detecter les visites venues des IA = mesure de la citation par les IA
    ai_r = report(token, [yest], ["sessions"], ["sessionSource"], "sessions", 30)
    AI_PAT = ("chatgpt", "openai", "perplexity", "gemini", "bard", "copilot", "claude",
              "ai assistant", "you.com", "phind", "poe.com", "bing chat")
    ai_rows = [(s, v) for s, v in rows(ai_r, 30) if any(p in (s or "").lower() for p in AI_PAT)]
    ai_total = sum(int(v) for _, v in ai_rows)
    ev = report(token, [yest], ["eventCount"], ["eventName"], "eventCount", 25)
    events = {r["dimensionValues"][0]["value"]: int(r["metricValues"][0]["value"]) for r in ev.get("rows", [])}
    signups = events.get("form_submit", 0) + events.get("generate_lead", 0)

    arrow = "\U0001F4C8" if delta >= 0 else "\U0001F4C9"
    L = [
        "\U0001F4CA <b>GA4 - hier</b>",
        f"Sessions: <b>{y_sess}</b> ({'+' if delta>=0 else ''}{delta:.0f}% vs mediane 7j = {base:.0f}) {arrow}",
        f"↳ dont <b>organique: {y_org}</b> ⏳ <i>PROVISOIRE</i> ({'+' if delta_org>=0 else ''}{delta_org:.0f}% "
        f"vs mediane 7j = {base_org:.0f}) = {part_org:.0f}% du total",
    ]
    if rev_med is not None:
        L.append(f"   ⚠️ GA4 revise a la HAUSSE: <b>{'+' if rev_med>=0 else ''}{rev_med:.0f}</b> en median "
                 f"entre J+1 et J+3 ({len(revisions)} jours mesures). <b>Ne rien conclure sur ce chiffre.</b>")
    else:
        L.append("   ⚠️ Valeur non stabilisee (GA4 revise a la hausse pendant ~3 j). "
                 "Pas encore assez de jours mesures pour chiffrer la revision.")
    if org_stable is not None and base_dow:
        d_st = (org_stable - base_dow) / base_dow * 100
        L.append(f"   ✅ <b>Point STABLE</b> ({JOURS[dow]} {d_stable.strftime('%d/%m')}): <b>{org_stable}</b> "
                 f"vs mediane des {JOURS[dow]}s = {base_dow:.0f} "
                 f"({'+' if d_st>=0 else ''}{d_st:.0f}%) -- <i>c'est CE chiffre qui se lit</i>")
    L += [
        f"Utilisateurs: {y_users} | Vues: {y_views}",
        "",
        "<b>Top pays</b>: " + ", ".join(f"{c} ({v})" for c, v in rows(countries)),
        "<b>Top sources</b>: " + ", ".join(f"{s} ({v})" for s, v in rows(sources, 4)),
    ]
    if aberrants:
        L.append(f"⚠️ <b>{len(aberrants)} jour(s) aberrant(s)</b> dans les 7 derniers "
                 f"({', '.join(str(v) for v in aberrants)} sessions, mediane {base:.0f}) "
                 f"-- verifier le pays et la source avant d'y lire une tendance.")
    if ai_total:
        L.append(f"\U0001F916 <b>IA (GEO)</b>: {ai_total} session(s) via " + ", ".join(f"{s}" for s, _ in ai_rows[:4]))
    L += ["", "<b>Top pages</b>:"]
    for p, v in rows(pages, 5):
        L.append(f"  {p[:38]} ({v})")
    if signups:
        L.append(f"\n\U0001F4E9 Inscriptions email: <b>{signups}</b>")
    msg = "\n".join(L)

    print(msg.replace("<b>", "").replace("</b>", ""))
    if not do_print:
        send_telegram(msg)
        marker.parent.mkdir(exist_ok=True)
        marker.write_text(today, encoding="utf-8")
        print("\n[Telegram envoye]")


if __name__ == "__main__":
    main()
