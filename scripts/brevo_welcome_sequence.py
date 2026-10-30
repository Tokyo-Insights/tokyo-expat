"""
brevo_welcome_sequence.py -- Cree/met a jour les templates email de la sequence
de bienvenue Tokyo Expat (lead magnet checklist) dans Brevo via API.

Cree 6 templates : 3 FR + 3 EN.
Apres execution, configurer l'automation dans le dashboard Brevo :
  Trigger = contact ajoute a la liste 3 -> envoie Email 1, attend 2j -> Email 2,
  attend 3j -> Email 3. (Voir recipe en bas du fichier.)

Run: python scripts/brevo_welcome_sequence.py
"""
import os
import sys
import io
import requests
import urllib3
from pathlib import Path

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# Load BREVO_API_KEY from .env
ENV = Path(__file__).parent / ".env"
API_KEY = None
for line in ENV.read_text(encoding='utf-8').splitlines():
    if line.startswith('BREVO_API_KEY='):
        API_KEY = line.split('=', 1)[1].strip()
        break
if not API_KEY:
    print("BREVO_API_KEY introuvable dans .env")
    sys.exit(1)

SENDER = {"name": "Alessandro - Tokyo Expat", "email": "contact@tokyo-expat.com"}
HEADERS = {"api-key": API_KEY, "Content-Type": "application/json", "accept": "application/json"}
TEMPLATES_URL = "https://api.brevo.com/v3/smtp/templates"

# Offre v3 (strategie/offre_particuliers_v3_2026_10.md) : page devis du Diagnostic, bouton -> lien Wise 15 000 JPY.
DIAG_FR = "https://www.tokyo-expat.com/devis/diagnostic"
DIAG_EN = "https://www.tokyo-expat.com/devis/diagnostic?locale=en"

NAVY = "#0f2744"
RED = "#e84141"


FOOTER = {
    "fr": "Vous recevez cet email car vous avez téléchargé un guide gratuit.",
    "en": "You are receiving this email because you downloaded a free guide.",
}


def wrap(body_html: str, lang: str = "fr") -> str:
    return f"""<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:24px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;">
<tr><td style="background:{NAVY};padding:20px 32px;">
<span style="color:#ffffff;font-size:18px;font-weight:bold;">Tokyo Expat</span>
</td></tr>
<tr><td style="padding:32px;color:#1a1a1a;font-size:15px;line-height:1.6;">
{body_html}
</td></tr>
<tr><td style="padding:20px 32px;background:#f4f4f4;color:#888;font-size:12px;">
Tokyo Expat &middot; <a href="https://www.tokyo-expat.com" style="color:{NAVY};">tokyo-expat.com</a><br>
{FOOTER[lang]} {{{{ unsubscribe }}}}
</td></tr>
</table></td></tr></table></body></html>"""


def btn(label: str, url: str) -> str:
    return (f'<a href="{url}" style="display:inline-block;background:{RED};color:#fff;'
            f'text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:bold;">{label}</a>')


templates = [
    # ---------------- FR ----------------
    {
        "name": "[FR] Bienvenue 1 - Checklist + qui je suis",
        "subject": "Votre checklist relocation Japon est ici",
        "html": wrap(f"""
<p>Bonjour,</p>
<p>Merci d'avoir téléchargé la Checklist Relocation Japon. Si vous ne l'avez pas encore ouverte, la voici à nouveau :</p>
<p>{btn("Télécharger la checklist (PDF)", "https://www.tokyo-expat.com/checklist-relocation-japon.pdf")}</p>
<p>Je suis Alessandro. Je vis à Tokyo et j'accompagne les francophones qui s'installent au Japon. Cette checklist rassemble tout ce que j'aurais aimé savoir avant d'arriver : visa, carte de séjour, logement sans garant, banque, assurance santé.</p>
<p>Dans les trois semaines qui viennent, je vous envoie cinq emails courts sur le logement à Tokyo. Ils sont utiles même si vous faites tout vous-même. Deux d'entre eux présenteront aussi mon accompagnement payant : vous saurez à quoi il sert, et vous n'aurez jamais à le prendre.</p>
<p><strong>Une question, si vous avez trente secondes</strong> : qu'est-ce qui vous bloque le plus en ce moment dans votre projet ? Répondez-moi en une phrase. Je lis tout moi-même.</p>
<p>À bientôt,<br>Alessandro</p>
"""),
    },
    {
        "name": "[FR] Bienvenue 2 - L'erreur logement",
        "subject": "Sans garant japonais, vous pouvez quand même louer à Tokyo",
        "html": wrap(f"""
<p>Bonjour,</p>
<p>C'est l'idée reçue qui fait perdre le plus de temps : croire qu'il faut un garant japonais pour louer à Tokyo. On attend, on cherche un garant qu'on n'aura jamais, et les refus s'enchaînent.</p>
<p>En réalité, presque tous les baux passent aujourd'hui par une société de garantie, et il existe des logements accessibles dès votre arrivée (share houses, meublés au mois) sans garant ni frais d'agence cachés. Tout est expliqué ici :</p>
<p>{btn("Louer à Tokyo sans garant : le guide", "https://www.tokyo-expat.com/fr/blog/garantie-loyer-etranger-japon")}</p>
<p>Si vous voulez un avis sur votre situation, répondez avec vos dates et votre budget.</p>
<p>Alessandro</p>
"""),
    },
    {
        "name": "[FR] Bienvenue 3 - Besoin d'aide",
        "subject": "Ce qui arrive quand on cherche un logement trop tard",
        "html": wrap(f"""
<p>Bonjour,</p>
<p>Beaucoup de personnes qui arrivent à Tokyo commencent à chercher un logement quelques semaines avant le départ. C'est souvent trop tard.</p>
<p>Les biens qui acceptent les étrangers partent en quelques jours, chaque dossier refusé fait perdre une semaine, et entre janvier et mars, quand tout le Japon déménage, la concurrence est à son maximum. On finit dans un logement temporaire hors de prix, ou loin de son travail, en se disant qu'on déménagera plus tard.</p>
<p>Ce qui change tout, c'est de savoir avant de visiter quels logements acceptent vraiment votre situation, et ce que chacun vous coûtera au total. Le loyer affiché n'est presque jamais le total : charges, internet, société de garantie et frais de sortie s'y ajoutent.</p>
<p>C'est ce que contient mon Diagnostic logement, livré par écrit sous 48 heures : ce qui vous est ouvert et fermé, 3 à 5 logements réels libres à vos dates avec leur coût total sur votre séjour, les clauses à vérifier avant de signer, et votre calendrier. Il coûte 15 000 ¥, remboursé si le rapport arrive en retard ou si aucun logement n'accepte votre situation dans votre budget.</p>
<p>{btn("Voir le Diagnostic logement", DIAG_FR)}</p>
<p>Pas encore prêt ? Répondez à cet email avec vos dates et votre budget, je vous dis ce qui est réaliste.</p>
<p>Alessandro</p>
"""),
    },
    # ---------------- EN ----------------
    {
        "name": "[EN] Welcome 1 - Checklist + who I am",
        "subject": "Your Japan relocation checklist is here",
        "html": wrap(f"""
<p>Hi,</p>
<p>Thanks for downloading the Japan Relocation Checklist. In case you have not opened it yet, here it is again:</p>
<p>{btn("Download the checklist (PDF)", "https://www.tokyo-expat.com/japan-relocation-checklist.pdf")}</p>
<p>I'm Alessandro. I live in Tokyo and I help foreigners settle in Japan. This checklist gathers everything I wish I had known before arriving: visa, residence card, housing without a guarantor, banking, health insurance.</p>
<p>Over the next three weeks, I will send you five short emails about housing in Tokyo. They are useful even if you do everything yourself. Two of them will also present my paid support: you will know what it is for, and you will never have to take it.</p>
<p><strong>One question, if you have thirty seconds</strong>: what is blocking you most in your move right now? Reply in one sentence. I read everything myself.</p>
<p>Talk soon,<br>Alessandro</p>
""", "en"),
    },
    {
        "name": "[EN] Welcome 2 - The housing mistake",
        "subject": "No Japanese guarantor? You can still rent in Tokyo",
        "html": wrap(f"""
<p>Hi,</p>
<p>This is the belief that wastes the most time: thinking you need a Japanese guarantor to rent in Tokyo. People wait, look for a guarantor they will never have, and the rejections pile up.</p>
<p>In reality, almost every lease now goes through a guarantor company, and there are homes you can access as soon as you arrive (share houses, monthly furnished apartments) with no guarantor and no hidden agency fees. It is all explained here:</p>
<p>{btn("Renting in Tokyo without a guarantor", "https://www.tokyo-expat.com/en/blog/guarantor-japan-rental-foreigner")}</p>
<p>If you would like a view on your situation, reply with your dates and your budget.</p>
<p>Alessandro</p>
""", "en"),
    },
    {
        "name": "[EN] Welcome 3 - Need a hand",
        "subject": "What happens when you start your Tokyo housing search too late",
        "html": wrap(f"""
<p>Hi,</p>
<p>Many people moving to Tokyo start looking for housing a few weeks before they leave. That is often too late.</p>
<p>Homes that accept foreigners go within days, each rejected application costs a week, and between January and March, when all of Japan moves, competition is at its peak. People end up in overpriced temporary housing, or far from work, telling themselves they will move again later.</p>
<p>What changes everything is knowing, before you view anything, which homes will actually accept your situation and what each one will cost you in total. The advertised rent is almost never the total: fees, internet, the guarantor company and exit costs come on top.</p>
<p>That is what my Housing Check gives you, in writing within 48 hours: what is open and closed to you, 3 to 5 real homes available on your dates with their total cost over your stay, the contract points to check before signing, and your timeline. It costs 15,000 yen, refunded if the report is late or if no home accepts your situation within your budget.</p>
<p>{btn("See the Housing Check", DIAG_EN)}</p>
<p>Not ready yet? Reply to this email with your dates and budget, and I will tell you what is realistic.</p>
<p>Alessandro</p>
""", "en"),
    },
    # ---------------- FR (rallonge sequence, J+9/J+14/J+21) ----------------
    {
        "name": "[FR] Bienvenue 4 - Les documents",
        "subject": "Les 3 documents qui font accepter votre dossier à Tokyo",
        "html": wrap(f"""
<p>Bonjour,</p>
<p>Quand un propriétaire japonais hésite, ce n'est presque jamais personnel : c'est une question de risque perçu. Trois documents suffisent souvent à lever ce doute :</p>
<p><strong>1.</strong> L'accord d'une société de garantie (à la place d'un garant japonais).<br>
<strong>2.</strong> Une preuve de revenus (fiche de paie, avis d'imposition ou relevé bancaire).<br>
<strong>3.</strong> Carte de séjour et passeport, avec un dossier complet présenté en japonais.</p>
<p>Avec ces trois éléments bien préparés, beaucoup de refus disparaissent.</p>
<p>{btn("Voir le guide complet", "https://www.tokyo-expat.com/fr/blog/pourquoi-proprietaires-japonais-refusent-etrangers")}</p>
<p>Alessandro</p>
"""),
    },
    {
        "name": "[FR] Bienvenue 5 - Vu du cote proprietaire",
        "subject": "Pourquoi les propriétaires disent non (vu de l'intérieur)",
        "html": wrap(f"""
<p>Bonjour,</p>
<p>Je travaille dans le marché locatif de Tokyo au quotidien, et je vois passer les dossiers du côté des bailleurs. La vérité surprend souvent : le propriétaire ne décide pas seul. La société de gestion et la société de garantie évaluent aussi, et n'importe laquelle peut refuser, sans donner de raison.</p>
<p>Autre surprise : le même profil peut être refusé sur un bien et accepté sur un autre la même semaine. Ce qui change, c'est rarement le locataire. C'est la façon dont le dossier est présenté.</p>
<p>{btn("Lire l'article complet", "https://www.tokyo-expat.com/fr/blog/pourquoi-proprietaires-japonais-refusent-etrangers")}</p>
<p>Alessandro</p>
"""),
    },
    {
        "name": "[FR] Bienvenue 6 - Quand se faire aider",
        "subject": "« Je peux le faire seul », et les 3 autres raisons d'hésiter",
        "html": wrap(f"""
<p>Bonjour,</p>
<p>Je vous ai promis de vous présenter mon accompagnement. Voici les raisons qu'on me donne pour ne pas le prendre, et ce que j'y réponds honnêtement.</p>
<p><strong>« Je peux le faire seul. »</strong> Souvent, oui. Si vous avez du temps, un budget souple et un peu de japonais, faites-le : les guides de ces emails suffisent. L'accompagnement sert quand le temps manque ou que les refus s'accumulent.</p>
<p><strong>« Ce n'est pas encore le moment, je n'ai pas mes dates. »</strong> C'est justement le meilleur moment pour préparer le dossier : c'est lui qui fait gagner les semaines, pas la visite.</p>
<p><strong>« L'agence, c'est gratuit. »</strong> Elle ne l'est qu'en apparence : elle est payée à la signature, en général un mois de loyer, et seulement si vous signez chez elle. Mon Diagnostic est payé par vous seul, et il compare aussi les logements où il n'y a aucun frais d'agence. La location reste signée avec une agence agréée ; mon rôle est le conseil, en français.</p>
<p><strong>« Et si ça ne donne rien ? »</strong> Si le rapport n'arrive pas sous 48 heures, ou si aucun logement n'accepte votre situation dans votre budget, vous êtes remboursé intégralement.</p>
<p>Concrètement : le Diagnostic logement coûte 15 000 ¥, tout se fait par écrit, sans appel. Si vous me confiez ensuite la suite jusqu'à la remise des clés, ces 15 000 ¥ sont déduits du forfait.</p>
<p>{btn("Lancer mon Diagnostic logement", DIAG_FR)}</p>
<p>Alessandro</p>
"""),
    },
    # ---------------- EN (sequence extension, J+9/J+14/J+21) ----------------
    {
        "name": "[EN] Welcome 4 - The documents",
        "subject": "The 3 documents that get your Tokyo rental approved",
        "html": wrap(f"""
<p>Hi,</p>
<p>When a Japanese landlord hesitates, it is almost never personal: it is about perceived risk. Three documents are often enough to remove that doubt:</p>
<p><strong>1.</strong> Approval from a guarantor company (in place of a Japanese guarantor).<br>
<strong>2.</strong> Proof of income (payslip, tax document or bank statement).<br>
<strong>3.</strong> Residence card and passport, with a complete application presented in Japanese.</p>
<p>With those three prepared well, many rejections disappear.</p>
<p>{btn("Read the full guide", "https://www.tokyo-expat.com/en/blog/why-japanese-landlords-reject-foreigners")}</p>
<p>Alessandro</p>
""", "en"),
    },
    {
        "name": "[EN] Welcome 5 - From the landlord side",
        "subject": "Why landlords say no (from inside the market)",
        "html": wrap(f"""
<p>Hi,</p>
<p>I work inside the Tokyo rental market every day, and I see applications from the landlord side. The truth often surprises people: it is not the landlord alone who decides. The management company and the guarantor company screen you too, and any one of them can decline, without giving a reason.</p>
<p>Another surprise: the same profile can be rejected on one property and approved on another the same week. What changes is rarely the tenant. It is how the application is presented.</p>
<p>{btn("Read the full article", "https://www.tokyo-expat.com/en/blog/why-japanese-landlords-reject-foreigners")}</p>
<p>Alessandro</p>
""", "en"),
    },
    {
        "name": "[EN] Welcome 6 - When to get help",
        "subject": "\"I can do it myself\", and 3 other reasons to hesitate",
        "html": wrap(f"""
<p>Hi,</p>
<p>I promised to present my support. Here are the reasons people give me for not taking it, and my honest answer to each.</p>
<p><strong>"I can do it myself."</strong> Often, yes. If you have time, a flexible budget and some Japanese, go for it: the guides in these emails are enough. Support is worth it when time is short or the rejections pile up.</p>
<p><strong>"It's not the right time, I don't have my dates yet."</strong> That is exactly the best time to prepare your application: the file is what saves you weeks, not the viewing.</p>
<p><strong>"The agency is free."</strong> It only looks free: it is paid when you sign, usually one month's rent, and only if you sign through it. My Housing Check is paid by you alone, and it also compares homes with no agency fee at all. The lease is still signed with a licensed agency; my role is advice, in English.</p>
<p><strong>"What if it leads nowhere?"</strong> If the report does not reach you within 48 hours, or if no home accepts your situation within your budget, you get a full refund.</p>
<p>In practice: the Housing Check costs 15,000 yen, done entirely in writing, no call needed. If you then ask me to handle everything up to the keys, the 15,000 yen is deducted from that fee.</p>
<p>{btn("Start my Housing Check", DIAG_EN)}</p>
<p>Alessandro</p>
""", "en"),
    },
]


def main():
    # Idempotent: ne (re)cree PAS les templates deja existants (par nom).
    # ⚠️ CONSEQUENCE (constatee 02/09/2026): modifier le HTML ci-dessus et relancer le script
    # ne changeait RIEN chez Brevo, tout etait "SKIP". Pour propager une correction de contenu
    # il faut --update, qui fait un PUT sur le template existant (retrouve par NOM).
    #   python scripts/brevo_welcome_sequence.py --update --dry-run   (montre le diff, n'envoie rien)
    #   python scripts/brevo_welcome_sequence.py --update             (met a jour chez Brevo)
    update_mode = "--update" in sys.argv
    dry_run = "--dry-run" in sys.argv
    # --only "3,6" ou --only "Bienvenue 3" : ne reecrire QUE ces templates.
    # Sans filtre, --update repousse les 12, dont 10 inchangees = ecritures inutiles
    # sur des emails en production.
    only = ""
    if "--only" in sys.argv:
        i = sys.argv.index("--only")
        only = sys.argv[i + 1] if i + 1 < len(sys.argv) else ""
    only_terms = [s.strip().lower() for s in only.split(",") if s.strip()]

    existing = set()
    by_name = {}
    try:
        rr = requests.get(TEMPLATES_URL + "?limit=200", headers=HEADERS, verify=False, timeout=30)
        if rr.status_code == 200:
            for t in rr.json().get("templates", []):
                existing.add(t.get("name"))
                by_name[t.get("name")] = t
    except Exception as e:
        print(f"[WARN] liste templates existants indisponible: {e}")

    created = []
    for t in templates:
        if t["name"] in existing:
            if not update_mode:
                print(f"SKIP (existe deja) {t['name']}")
                continue
            live = by_name.get(t["name"], {})
            tid = live.get("id")
            # Un terme NUMERIQUE ne matche que l'id (sinon "6" attrape aussi
            # "[FR] Bienvenue 6" via le nom, constate au dry-run du 02/09).
            if only_terms and not any(s == str(tid) if s.isdigit() else s in t["name"].lower()
                                      for s in only_terms):
                continue
            same_subject = live.get("subject") == t["subject"]
            # Brevo ne rend pas toujours le htmlContent dans la liste: on compare ce qu'on peut
            # et on annonce la mise a jour explicitement plutot que de la faire en silence.
            print(f"UPDATE id={tid}  {t['name']}"
                  f"{'' if same_subject else '  [SUJET MODIFIE]'}")
            if dry_run:
                print(f"       (dry-run, aucun appel) longueur html={len(t['html'])}")
                continue
            ru = requests.put(f"{TEMPLATES_URL}/{tid}", headers=HEADERS, verify=False, timeout=30,
                              json={"templateName": t["name"], "subject": t["subject"],
                                    "htmlContent": t["html"], "sender": SENDER, "isActive": True})
            print("       OK" if ru.status_code in (200, 204)
                  else f"       FAIL {ru.status_code} -> {ru.text[:200]}")
            continue
        payload = {
            "templateName": t["name"],
            "subject": t["subject"],
            "htmlContent": t["html"],
            "sender": SENDER,
            "isActive": True,
        }
        r = requests.post(TEMPLATES_URL, headers=HEADERS, json=payload, verify=False)
        if r.status_code in (200, 201):
            tid = r.json().get("id")
            print(f"OK  id={tid}  {t['name']}")
            created.append((tid, t["name"]))
        else:
            print(f"FAIL {r.status_code}  {t['name']}  -> {r.text[:200]}")

    print("\n=== Template IDs ===")
    for tid, name in created:
        print(f"  {tid}  {name}")

    print("""
=== RECIPE AUTOMATION BREVO (dashboard, 5 min) ===
1. Brevo > Automations > Create a workflow > "Welcome message" (ou Custom).
2. Entry point: "A contact is added to a list" -> Liste ID 3.
3. Condition (optionnel) sur l'attribut langue si dispo, sinon envoyer les 2 langues
   ou choisir FR par defaut.
4. Action: Send an email -> choisir template [FR] Bienvenue 1 (ou EN).
5. Wait 2 days -> Send email [FR] Bienvenue 2.
6. Wait 3 days -> Send email [FR] Bienvenue 3.
7. Activer le workflow.
""")


if __name__ == "__main__":
    main()
