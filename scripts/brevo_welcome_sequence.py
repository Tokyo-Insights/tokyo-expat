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
]


def main():
    created = []
    for t in templates:
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
