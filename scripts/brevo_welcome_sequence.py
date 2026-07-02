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

NAVY = "#0f2744"
RED = "#e84141"


def wrap(body_html: str) -> str:
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
Vous recevez cet email car vous avez telecharge un guide gratuit. {{{{ unsubscribe }}}}
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
<p>Merci d'avoir telecharge la Checklist Relocation Japon. Si vous ne l'avez pas encore ouverte, la voici a nouveau :</p>
<p>{btn("Telecharger la checklist (PDF)", "https://www.tokyo-expat.com/checklist-relocation-japon.pdf")}</p>
<p>Je suis Alessandro. Je vis a Tokyo et j'accompagne les francophones qui s'installent au Japon. Cette checklist rassemble tout ce que j'aurais aime savoir avant d'arriver : visa, carte de sejour, logement sans garant, banque, assurance sante.</p>
<p>Une question sur votre projet ? Repondez simplement a cet email, je lis tout personnellement.</p>
<p>A bientot,<br>Alessandro</p>
"""),
    },
    {
        "name": "[FR] Bienvenue 2 - L'erreur logement",
        "subject": "L'erreur que font 90% des expats sur le logement a Tokyo",
        "html": wrap(f"""
<p>Bonjour,</p>
<p>L'erreur la plus frequente quand on cherche un logement a Tokyo : croire qu'on peut signer un bail classique sans garant japonais. Resultat, des semaines perdues et des refus en chaine.</p>
<p>La realite : il existe des solutions accessibles des le depart (share houses, monthly mansions, appartements meubles) qui ne demandent ni garant ni frais d'agence caches. C'est exactement ce que je couvre ici :</p>
<p>{btn("Lire le guide logement", "https://www.tokyo-expat.com/fr/blog")}</p>
<p>Si vous preparez votre arrivee et que vous voulez un avis sur votre situation precise, repondez a cet email avec votre timing et votre budget. Je vous oriente.</p>
<p>Alessandro</p>
"""),
    },
    {
        "name": "[FR] Bienvenue 3 - Besoin d'aide",
        "subject": "Besoin d'un coup de main pour votre installation ?",
        "html": wrap(f"""
<p>Bonjour,</p>
<p>Preparer une installation au Japon a distance, c'est gerable mais chronophage : trouver le bon quartier, eviter les pieges de contrat, caler les demarches dans le bon ordre.</p>
<p>Si vous preferez deleguer ou simplement securiser vos choix, je propose un accompagnement personnalise, de la simple consultation a la recherche de logement complete.</p>
<p>{btn("Voir comment je peux aider", "https://www.tokyo-expat.com/fr/services")}</p>
<p>Et si vous avez juste une question, repondez a cet email. Toujours ravi d'aider.</p>
<p>Alessandro<br>Tokyo Expat</p>
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
<p>Any question about your move? Just reply to this email, I read everything personally.</p>
<p>Talk soon,<br>Alessandro</p>
"""),
    },
    {
        "name": "[EN] Welcome 2 - The housing mistake",
        "subject": "The mistake 90% of expats make with Tokyo housing",
        "html": wrap(f"""
<p>Hi,</p>
<p>The most common mistake when looking for housing in Tokyo: assuming you can sign a standard lease without a Japanese guarantor. The result is weeks lost and repeated rejections.</p>
<p>The reality: there are options accessible from day one (share houses, monthly mansions, furnished apartments) that require no guarantor and no hidden agency fees. That's exactly what I cover here:</p>
<p>{btn("Read the housing guide", "https://www.tokyo-expat.com/en/blog")}</p>
<p>If you are preparing your arrival and want a view on your specific situation, reply with your timing and budget. I'll point you in the right direction.</p>
<p>Alessandro</p>
"""),
    },
    {
        "name": "[EN] Welcome 3 - Need a hand",
        "subject": "Need a hand with your move to Japan?",
        "html": wrap(f"""
<p>Hi,</p>
<p>Preparing a move to Japan from abroad is doable but time-consuming: finding the right neighbourhood, avoiding contract traps, sequencing the admin in the right order.</p>
<p>If you would rather delegate or simply de-risk your choices, I offer personalised support, from a single consultation to a full housing search.</p>
<p>{btn("See how I can help", "https://www.tokyo-expat.com/en/services")}</p>
<p>And if you just have a question, reply to this email. Always happy to help.</p>
<p>Alessandro<br>Tokyo Expat</p>
"""),
    },
    # ---------------- FR (rallonge sequence, J+9/J+14/J+21) ----------------
    {
        "name": "[FR] Bienvenue 4 - Les documents",
        "subject": "Les 3 documents qui font accepter votre dossier a Tokyo",
        "html": wrap(f"""
<p>Bonjour,</p>
<p>Quand un proprietaire japonais hesite, ce n'est presque jamais personnel : c'est une question de risque percu. Et trois documents suffisent souvent a lever ce doute :</p>
<p><strong>1.</strong> Une societe de garantie (a la place d'un garant japonais).<br>
<strong>2.</strong> Une preuve de revenus propre (fiche de paie, avis d'imposition ou releve bancaire).<br>
<strong>3.</strong> Carte de sejour et passeport, dossier complet et presente en japonais.</p>
<p>Avec ces trois elements bien prepares, la plupart des refus disparaissent.</p>
<p>{btn("Voir le guide complet", "https://www.tokyo-expat.com/fr/blog/pourquoi-proprietaires-japonais-refusent-etrangers")}</p>
<p>Alessandro</p>
"""),
    },
    {
        "name": "[FR] Bienvenue 5 - Vu du cote proprietaire",
        "subject": "Pourquoi les proprietaires disent non (vu de l'interieur)",
        "html": wrap(f"""
<p>Bonjour,</p>
<p>Je travaille dans le marche locatif de Tokyo au quotidien, et je vois passer les dossiers du cote proprietaire. La verite surprend souvent : ce n'est pas le proprietaire seul qui decide. La societe de gestion et la societe de garantie evaluent aussi, et n'importe laquelle peut refuser, sans donner de raison.</p>
<p>Autre surprise : le meme profil peut etre refuse sur un bien et accepte sur un autre la meme semaine. Ce qui change, c'est rarement le locataire. C'est la facon dont le dossier est presente.</p>
<p>{btn("Lire l'article complet", "https://www.tokyo-expat.com/fr/blog/pourquoi-proprietaires-japonais-refusent-etrangers")}</p>
<p>Alessandro</p>
"""),
    },
    {
        "name": "[FR] Bienvenue 6 - Quand se faire aider",
        "subject": "Quand ca vaut le coup de se faire aider (et quand non)",
        "html": wrap(f"""
<p>Bonjour,</p>
<p>Soyons honnetes : si vous avez du temps, un budget serre et un peu de patience, vous pouvez trouver un logement a Tokyo par vous-meme. Beaucoup y arrivent.</p>
<p>Se faire aider vaut le coup quand : vous manquez de temps, vous ne parlez pas japonais, vous risquez des refus de dossier, ou vous voulez simplement eviter les erreurs couteuses. Dans ce cas, je gere la recherche, les visites, la negociation et le contrat, en francais.</p>
<p>Si votre situation entre dans ce cadre, parlons-en : un appel de 30 minutes, gratuit et sans engagement.</p>
<p>{btn("Reserver un appel gratuit", "https://www.tokyo-expat.com/fr/contact")}</p>
<p>Alessandro<br>Tokyo Expat</p>
"""),
    },
    # ---------------- EN (sequence extension, J+9/J+14/J+21) ----------------
    {
        "name": "[EN] Welcome 4 - The documents",
        "subject": "The 3 documents that get your Tokyo rental approved",
        "html": wrap(f"""
<p>Hi,</p>
<p>When a Japanese landlord hesitates, it is almost never personal: it is about perceived risk. And three documents are often enough to remove that doubt:</p>
<p><strong>1.</strong> A guarantor company (in place of a Japanese guarantor).<br>
<strong>2.</strong> Clean proof of income (payslip, tax document or bank statement).<br>
<strong>3.</strong> Residence card and passport, a complete application presented in Japanese.</p>
<p>With those three prepared well, most rejections disappear.</p>
<p>{btn("Read the full guide", "https://www.tokyo-expat.com/en/blog/why-japanese-landlords-reject-foreigners")}</p>
<p>Alessandro</p>
"""),
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
"""),
    },
    {
        "name": "[EN] Welcome 6 - When to get help",
        "subject": "When it's worth getting help (and when it's not)",
        "html": wrap(f"""
<p>Hi,</p>
<p>Let's be honest: if you have time, a tight budget and some patience, you can find housing in Tokyo yourself. Plenty of people do.</p>
<p>Getting help is worth it when: you are short on time, you do not speak Japanese, you risk application rejections, or you simply want to avoid costly mistakes. In that case, I handle the search, viewings, negotiation and the contract, in English.</p>
<p>If that sounds like your situation, let's talk: a 30-minute call, free and with no obligation.</p>
<p>{btn("Book a free call", "https://www.tokyo-expat.com/en/contact")}</p>
<p>Alessandro<br>Tokyo Expat</p>
"""),
    },
]


def main():
    # Idempotent: ne (re)cree PAS les templates deja existants (par nom).
    existing = set()
    try:
        rr = requests.get(TEMPLATES_URL + "?limit=200", headers=HEADERS, verify=False, timeout=30)
        if rr.status_code == 200:
            existing = {t.get("name") for t in rr.json().get("templates", [])}
    except Exception as e:
        print(f"[WARN] liste templates existants indisponible: {e}")

    created = []
    for t in templates:
        if t["name"] in existing:
            print(f"SKIP (existe deja) {t['name']}")
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
