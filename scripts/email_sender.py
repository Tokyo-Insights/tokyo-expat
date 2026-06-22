"""
email_sender.py -- Envoi automatique des emails outreach via Gmail SMTP (App Password)
Lit outreach_contacts.json, envoie aux contacts "to_contact", met a jour le statut.

SETUP :
1. Google Account -> Securite -> Validation en 2 etapes -> Mots de passe des applications
2. Cree un mot de passe pour "Mail" (16 caracteres)
   !! Ce n'est PAS ton mot de passe Gmail. C'est un code separe, revocable a tout moment.
3. Dans scripts/.env :
   GMAIL_ADDRESS=info.tokyoinsights@gmail.com
   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   (espaces OK, ils sont supprimes auto)

Run: python scripts/email_sender.py              # envoie les 2 prochains contacts to_contact
     python scripts/email_sender.py --preview    # affiche les emails SANS envoyer
     python scripts/email_sender.py --domain savvytokyo.com  # envoie a ce domaine uniquement
"""

import json
import datetime
import smtplib
import sys
import io
import os
import time
import requests
import urllib3
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

_env = Path(__file__).parent / '.env'
if _env.exists():
    for line in _env.read_text(encoding='utf-8').splitlines():
        if '=' in line and not line.startswith('#'):
            k, v = line.split('=', 1)
            os.environ.setdefault(k.strip(), v.strip())

from config import TE_TOKEN, TE_CHAT_ID

GMAIL_ADDRESS = os.environ.get('GMAIL_ADDRESS', '')
GMAIL_APP_PASSWORD = os.environ.get('GMAIL_APP_PASSWORD', '').replace(' ', '')

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
CONTACTS_FILE = DATA_DIR / "outreach_contacts.json"
LOG_FILE = DATA_DIR / "email_sent_log.json"

MAX_PER_RUN = 2  # Max 2 emails par run pour eviter le spam flag Gmail

# Personalisation par domaine : page de LEUR site la plus pertinente + notre article le plus pertinent
DOMAIN_DATA: dict[str, dict[str, str]] = {
    'savvytokyo.com': {
        'their_page': 'savvytokyo.com/category/living',
        'their_section': 'Living section',
        'our_url': 'https://www.tokyo-expat.com/en/blog/find-apartment-tokyo-foreigner',
        'our_topic': 'finding an apartment in Tokyo as a foreigner',
    },
    'tokyocheapo.com': {
        'their_page': 'tokyocheapo.com/living/accommodation/',
        'their_section': 'accommodation guide',
        'our_url': 'https://www.tokyo-expat.com/en/blog/share-house-tokyo-guide-2026',
        'our_topic': 'share houses vs apartments for budget-conscious expats',
    },
    'blog.gaijinpot.com': {
        'their_page': 'blog.gaijinpot.com/category/living-in-japan',
        'their_section': 'Living in Japan section',
        'our_url': 'https://www.tokyo-expat.com/en/blog/furnished-apartment-tokyo-no-guarantor',
        'our_topic': 'furnished apartments without a Japanese guarantor',
    },
    'japantoday.com': {
        'their_page': 'japantoday.com/category/community',
        'their_section': 'Community section',
        'our_url': 'https://www.tokyo-expat.com/en/blog/tokyo-expat-cost-of-living-2026',
        'our_topic': 'real cost of living in Tokyo for expats in 2026',
    },
    'tofugu.com': {
        'their_page': 'tofugu.com/japan/moving-to-japan',
        'their_section': 'Moving to Japan guide',
        'our_url': 'https://www.tokyo-expat.com/en/blog/find-apartment-tokyo-foreigner',
        'our_topic': 'renting an apartment in Tokyo step-by-step',
    },
    'japanpropertycentral.com': {
        'their_page': 'japanpropertycentral.com',
        'their_section': 'property market coverage',
        'our_url': 'https://www.tokyo-expat.com/en/blog/find-apartment-tokyo-foreigner',
        'our_topic': 'the rental side of Tokyo real estate for foreigners',
    },
    'timeoutjapan.net': {
        'their_page': 'timeout.com/tokyo/things-to-do/moving-to-tokyo',
        'their_section': 'Moving to Tokyo guide',
        'our_url': 'https://www.tokyo-expat.com/en/blog/tokyo-neighbourhoods-expats-guide',
        'our_topic': 'best Tokyo neighbourhoods for expats and their housing tradeoffs',
    },
    'expatica.com': {
        'their_page': 'expatica.com/jp/housing',
        'their_section': 'Japan housing guide',
        'our_url': 'https://www.tokyo-expat.com/en/blog/find-apartment-tokyo-foreigner',
        'our_topic': 'renting in Tokyo as a foreigner (guarantor, contracts, deposits)',
    },
    'japaninsiders.com': {
        'their_page': 'japaninsiders.com/living-in-japan',
        'their_section': 'Living in Japan section',
        'our_url': 'https://www.tokyo-expat.com/en/blog/share-house-tokyo-guide-2026',
        'our_topic': 'share houses in Tokyo as an entry option for new arrivals',
    },
    'realestate.co.jp': {
        'their_page': 'realestate.co.jp/en/blog',
        'their_section': 'expat blog',
        'our_url': 'https://www.tokyo-expat.com/en/blog/tokyo-rental-traps-foreigners',
        'our_topic': 'common rental traps foreigners fall into in Tokyo',
    },
    'cotoacademy.com': {
        'their_page': 'cotoacademy.com/life-in-japan',
        'their_section': 'Life in Japan resources',
        'our_url': 'https://www.tokyo-expat.com/en/blog/find-apartment-tokyo-foreigner',
        'our_topic': 'housing in Tokyo',
    },
    'isij.com': {
        'their_page': 'isij.com/japan-life',
        'their_section': 'Life in Japan section',
        'our_url': 'https://www.tokyo-expat.com/en/blog/share-house-tokyo-guide-2026',
        'our_topic': 'share houses in Tokyo',
    },
    'berlitz.co.jp': {
        'their_page': 'berlitz.co.jp/en/about/corporate',
        'their_section': 'corporate relocation resources',
        'our_url': 'https://www.tokyo-expat.com/en/blog/find-apartment-tokyo-foreigner',
        'our_topic': 'Tokyo housing for corporate relocations',
    },
    'japanswitch.com': {
        'their_page': 'japanswitch.com/life-in-japan',
        'their_section': 'Japan Life guide',
        'our_url': 'https://www.tokyo-expat.com/en/blog/find-apartment-tokyo-foreigner',
        'our_topic': 'housing in Tokyo for language students',
    },
    'crownrelo.com': {
        'their_page': 'crownrelo.com/japan',
        'their_section': 'Japan relocation services',
        'our_url': 'https://www.tokyo-expat.com/en/blog/moving-to-tokyo-checklist-2026',
        'our_topic': 'housing search in Tokyo',
    },
    'asiantigers-japan.com': {
        'their_page': 'asiantigers-japan.com',
        'their_section': 'Japan relocation',
        'our_url': 'https://www.tokyo-expat.com/en/blog/moving-to-tokyo-checklist-2026',
        'our_topic': 'finding housing in Tokyo',
    },
    'nipponexpress.com': {
        'their_page': 'nipponexpress.com/service/moving/private-moving',
        'their_section': 'private moving guides',
        'our_url': 'https://www.tokyo-expat.com/en/blog/moving-to-tokyo-checklist-2026',
        'our_topic': 'apartment hunting in Tokyo before you land',
    },
    'fr.ambafrance-jp.org': {
        'their_page': "ambafrance-jp.org/spip.php?rubrique2",
        'their_section': "section 'S'installer au Japon'",
        'our_url': 'https://www.tokyo-expat.com/fr/blog/trouver-appartement-tokyo-etranger',
        'our_topic': "la location d'appartement à Tokyo pour les ressortissants français",
    },
    'ccifj.or.jp': {
        'their_page': 'ccifj.or.jp/membres',
        'their_section': 'ressources membres',
        'our_url': 'https://www.tokyo-expat.com/fr/blog/cout-vie-tokyo-expatrie-2026',
        'our_topic': 'le logement à Tokyo pour les expatriés d\'entreprise',
    },
    'michaelpage.co.jp': {
        'their_page': 'michaelpage.co.jp/en/candidate-services/relocation-japan',
        'their_section': 'Japan relocation guide',
        'our_url': 'https://www.tokyo-expat.com/en/blog/find-apartment-tokyo-foreigner',
        'our_topic': 'Tokyo housing for international candidates being placed in Japan',
    },
    'tokyointernationalschool.ac.jp': {
        'their_page': 'tokyointernationalschool.ac.jp/admissions',
        'their_section': 'admissions and new family resources',
        'our_url': 'https://www.tokyo-expat.com/en/blog/best-neighbourhoods-families-tokyo-guide',
        'our_topic': 'best Tokyo neighbourhoods for international families',
    },
    'britishschoolintokyo.ac.jp': {
        'their_page': 'britishschoolintokyo.ac.jp/admissions/moving-to-tokyo',
        'their_section': 'Moving to Tokyo page',
        'our_url': 'https://www.tokyo-expat.com/en/blog/best-neighbourhoods-families-tokyo-guide',
        'our_topic': 'best neighbourhoods and housing options for families near international schools',
    },
    'wise.com': {
        'their_page': 'wise.com/gb/blog/living-in-japan',
        'their_section': 'Japan expat guides',
        'our_url': 'https://www.tokyo-expat.com/en/blog/send-money-to-japan-from-abroad',
        'our_topic': 'transferring money to Japan and setting up finances as an expat',
    },
}


def send_telegram(msg: str):
    try:
        requests.post(
            f"https://api.telegram.org/bot{TE_TOKEN}/sendMessage",
            json={"chat_id": TE_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10, verify=VERIFY_SSL,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def load_contacts() -> list:
    if CONTACTS_FILE.exists():
        try:
            with open(CONTACTS_FILE, encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return []


def save_contacts(contacts: list):
    with open(CONTACTS_FILE, "w", encoding="utf-8") as f:
        json.dump(contacts, f, indent=2, ensure_ascii=False)


def load_log() -> list:
    if LOG_FILE.exists():
        try:
            with open(LOG_FILE, encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return []


def save_log(log: list):
    DATA_DIR.mkdir(exist_ok=True)
    with open(LOG_FILE, "w", encoding="utf-8") as f:
        json.dump(log, f, indent=2, ensure_ascii=False)


def build_email(contact: dict) -> tuple[str, str]:
    """Retourne (subject, body_texte) pour ce contact."""
    domain = contact.get("domain", "")
    name = contact.get("name", domain)
    contact_name = contact.get("contact_name", "")
    greeting = f"Hi {contact_name}" if contact_name else "Hi"
    approach = contact.get("approach", "resource_link")
    ctype = contact.get("type", "backlink_t1")

    d = DOMAIN_DATA.get(domain, {})
    their_page = d.get("their_page", "")
    their_section = d.get("their_section", "your website")
    our_url = d.get("our_url", "https://www.tokyo-expat.com/en/blog/find-apartment-tokyo-foreigner")
    our_topic = d.get("our_topic", "finding housing in Tokyo as a foreigner")

    # ---- GUEST POST (editorial sites: GaijinPot, Savvy Tokyo, Japan Today) ----
    if approach == "guest_post":
        subject = f"Guest post — {our_topic.capitalize()}"
        their_ref = f" (saw your {their_section})" if their_section else ""
        body = (
            f"{greeting},\n\n"
            f"I noticed your {their_section}{' — great practical content' if their_page else ''}. "
            f"Your audience and mine overlap: foreigners navigating daily life in Japan.\n\n"
            f"I run Tokyo Expat (tokyo-expat.com), a housing and relocation guide in English and French. "
            f"I'd love to contribute a guest article on {our_topic}.\n\n"
            "Three angles I could develop for your readers:\n"
            "- The Japanese guarantor system: what foreigners need to know (and the 3 legal workarounds)\n"
            "- Share house vs furnished apartment: the real cost comparison for 2026\n"
            "- How to find a Tokyo apartment before you land: a step-by-step remote search guide\n\n"
            "All original content, 1,000-1,500 words, not published elsewhere.\n\n"
            "Happy to send a draft outline first if that makes it easier to say yes.\n\n"
            "Alessandro\n"
            "Tokyo Expat | www.tokyo-expat.com"
        )

    # ---- BROKEN LINK ----
    elif approach == "broken_link":
        dead_url = contact.get("dead_url", "")
        link_url = contact.get("our_url", our_url)
        subject = f"Broken link on {name} — replacement available"
        body = (
            f"{greeting},\n\n"
            f"I came across your {their_section or 'website'} and noticed a link that's returning a 404:\n"
            f"{dead_url}\n\n"
            f"I've published an up-to-date guide that covers the same topic:\n"
            f"{link_url}\n\n"
            "Happy to write a short custom intro paragraph for your page if that helps with the swap.\n\n"
            "Alessandro\n"
            "Tokyo Expat | www.tokyo-expat.com"
        )

    # ---- LANGUAGE SCHOOLS (student housing partnership) ----
    elif ctype == "language_school":
        subject = "Housing resource for your students in Tokyo"
        body = (
            f"{greeting},\n\n"
            f"Many students arriving at {name} face the same first challenge: finding housing in Tokyo "
            "before they're even familiar with the city. The guarantor requirement, furnished vs unfurnished, "
            "short-term vs standard leases — it's a lot to navigate without local support.\n\n"
            "I run Tokyo Expat (tokyo-expat.com), a housing service for foreigners in Tokyo. "
            "I help students find share houses and furnished apartments — no Japanese guarantor required, "
            "in English and French.\n\n"
            "A simple referral arrangement could work well for both of us: "
            "I mention your school to clients looking for Japanese lessons, you mention us to students asking about housing. "
            "No formal contract, just a mutual resource mention.\n\n"
            "Would that be worth a quick conversation?\n\n"
            "Alessandro\n"
            "Tokyo Expat | www.tokyo-expat.com"
        )

    # ---- MOVING COMPANIES (cross-referral) ----
    elif ctype == "moving_company":
        subject = "Cross-referral opportunity — Tokyo housing + international moving"
        body = (
            f"{greeting},\n\n"
            "When someone relocates internationally to Tokyo, two things need to be sorted: the move itself, "
            "and the apartment they're moving into.\n\n"
            f"I run Tokyo Expat (tokyo-expat.com) and specialise in finding housing for expats arriving in Tokyo "
            "— share houses, furnished apartments, family homes. No overlap with international moving services.\n\n"
            "The fit seems natural: you handle the move, I handle the apartment. "
            "A mutual referral arrangement would be low-effort and high-value for both sides.\n\n"
            "Would you be open to a brief call to explore this?\n\n"
            "Alessandro\n"
            "Tokyo Expat | www.tokyo-expat.com"
        )

    # ---- GOVERNMENTS & EMBASSIES (resource link, often FR) ----
    elif ctype == "government":
        is_fr = "ambafrance" in domain or "ccifj" in domain
        subject = ("Ressource logement Tokyo pour vos ressortissants" if is_fr
                   else "Housing resource for expats — Tokyo Expat")
        if is_fr:
            body = (
                f"{greeting},\n\n"
                f"Je gère Tokyo Expat (tokyo-expat.com), un guide pratique du logement à Tokyo pour les expatriés, "
                f"publié en français et en anglais.\n\n"
                f"J'ai remarqué votre {their_section or 'section pour les ressortissants'}. "
                f"Mes guides couvrent en détail le système de location japonais, la garantie locative, "
                f"les share houses, les appartements meublés — spécifiquement orientés vers les arrivants francophones.\n\n"
                f"Seriez-vous ouverts à ajouter un lien vers nos ressources dans votre section dédiée ?\n"
                f"Notre guide principal : {our_url}\n\n"
                f"Cordialement,\n"
                f"Alessandro\n"
                f"Tokyo Expat | www.tokyo-expat.com"
            )
        else:
            body = (
                f"{greeting},\n\n"
                f"I manage Tokyo Expat (tokyo-expat.com), a practical housing guide for foreigners moving to Tokyo, "
                f"published in English and French.\n\n"
                f"I noticed your {their_section or 'resources for expats'} — it covers many of the same topics "
                f"my guides do, and I think a link could be useful for your visitors.\n\n"
                f"Our most comprehensive guide for new arrivals: {our_url}\n\n"
                f"Would you consider adding it as a reference?\n\n"
                "Alessandro\n"
                "Tokyo Expat | www.tokyo-expat.com"
            )

    # ---- CHAMBERS OF COMMERCE ----
    elif ctype == "chamber_commerce":
        is_fr = "ccifj" in domain
        subject = ("Ressource logement pour vos membres expatriés à Tokyo" if is_fr
                   else "Housing resource for your expat members in Tokyo")
        if is_fr:
            body = (
                f"{greeting},\n\n"
                f"Je gère Tokyo Expat (tokyo-expat.com), un service de chasseur immobilier pour expatriés à Tokyo.\n\n"
                f"Beaucoup de vos membres relocalisent des collaborateurs à Tokyo et ont besoin d'un soutien "
                f"logement concret : appartement sans garant japonais, accompagnement en français, logements "
                f"disponibles rapidement.\n\n"
                f"Je serais heureux d'offrir des conditions préférentielles aux membres de la CCIFJ. "
                f"Pourriez-vous envisager un lien ressource vers notre site dans vos supports membres ?\n\n"
                f"Cordialement,\n"
                f"Alessandro\n"
                f"Tokyo Expat | www.tokyo-expat.com"
            )
        else:
            body = (
                f"{greeting},\n\n"
                f"I run Tokyo Expat (tokyo-expat.com), a property hunting service for expats relocating to Tokyo.\n\n"
                f"Many of your members relocate staff to Tokyo and need practical housing support — finding apartments, "
                "dealing with the Japanese guarantor system, managing applications in English. "
                "I offer a dedicated service for exactly this.\n\n"
                "I'd be happy to offer preferential rates for your members, and could be listed as a recommended "
                "housing resource in your relocation guide.\n\n"
                "Alessandro\n"
                "Tokyo Expat | www.tokyo-expat.com"
            )

    # ---- INTERNATIONAL SCHOOLS (families) ----
    elif ctype == "intl_school":
        subject = f"Housing guide for new families joining {name}"
        body = (
            f"{greeting},\n\n"
            f"Families relocating to Tokyo to join {name} often arrive without a clear picture of housing: "
            "which neighbourhoods are close to school, how the Japanese rental system works, "
            "what 'guarantor required' means for foreign families.\n\n"
            "I've written detailed guides on this at tokyo-expat.com — in English and French:\n"
            f"- {our_url}\n"
            f"- https://www.tokyo-expat.com/en/blog/best-neighbourhoods-families-tokyo-guide\n\n"
            "Would you consider adding these as resources on your admissions or 'New Families' page? "
            "No cost, just practical references for incoming families.\n\n"
            "Alessandro\n"
            "Tokyo Expat | www.tokyo-expat.com"
        )

    # ---- RECRUITMENT AGENCIES ----
    elif ctype == "recruitment":
        subject = "Tokyo housing resource for candidates you're placing in Japan"
        body = (
            f"{greeting},\n\n"
            "When candidates accept a Japan posting, housing is usually one of their first questions — "
            "and one of the main sticking points. The guarantor system, furnished vs unfurnished, "
            "realistic budgets by ward — it's a lot to navigate without local knowledge.\n\n"
            "I've built a practical guide at tokyo-expat.com that covers exactly this, in English and French. "
            f"It could be a useful reference for candidates you're placing:\n"
            f"{our_url}\n\n"
            "Would you consider adding it to your Japan relocation resources?\n\n"
            "Alessandro\n"
            "Tokyo Expat | www.tokyo-expat.com"
        )

    # ---- RESOURCE LINK (content/media sites: default) ----
    else:
        page_ref = f"your {their_section}" if their_section else name
        topic_ref = f"about {our_topic}" if our_topic else "on Tokyo housing for expats"
        subject = f"Resource link for your {their_section or 'Tokyo guide'}"
        body = (
            f"{greeting},\n\n"
            f"I came across {page_ref} — solid resource for anyone moving to Tokyo.\n\n"
            f"I've published a detailed guide {topic_ref} that might be a useful addition for your readers:\n"
            f"{our_url}\n\n"
            "Would you consider adding it as a reference? No reciprocity expected — just flagging it if it fits.\n\n"
            "Alessandro\n"
            "Tokyo Expat | www.tokyo-expat.com"
        )

    return subject, body


def send_email(to_address: str, subject: str, body: str) -> bool:
    """Envoie via Gmail SMTP SSL. Retourne True si succes."""
    msg = MIMEMultipart("alternative")
    msg["From"] = f"Alessandro | Tokyo Expat <{GMAIL_ADDRESS}>"
    msg["To"] = to_address
    msg["Subject"] = subject

    body_html = (
        "<html><body>"
        "<p style='font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#333;'>"
        + body.replace("\n\n", "</p><p style='font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#333;'>")
            .replace("\n", "<br>")
        + "</p></body></html>"
    )

    msg.attach(MIMEText(body, "plain", "utf-8"))
    msg.attach(MIMEText(body_html, "html", "utf-8"))

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
            smtp.sendmail(GMAIL_ADDRESS, to_address, msg.as_string())
        return True
    except smtplib.SMTPAuthenticationError:
        print("SMTP Auth erreur: verifier GMAIL_APP_PASSWORD dans .env")
        return False
    except Exception as e:
        print(f"SMTP erreur: {e}")
        return False


def main():
    args = sys.argv[1:]
    preview = "--preview" in args
    target_domain = None
    if "--domain" in args:
        idx = args.index("--domain")
        if idx + 1 < len(args):
            target_domain = args[idx + 1].lower()

    if not preview and (not GMAIL_ADDRESS or not GMAIL_APP_PASSWORD):
        msg = (
            "<b>EMAIL SENDER</b> -- Configuration requise\n\n"
            "1. Google Compte > Securite > Mots de passe des applications\n"
            "2. Cree un mot de passe pour 'Mail' (16 chars)\n"
            "   Ce n'est PAS ton mot de passe Gmail normal.\n"
            "3. Dans scripts/.env :\n"
            "   GMAIL_ADDRESS=info.tokyoinsights@gmail.com\n"
            "   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx"
        )
        send_telegram(msg)
        print("Gmail App Password manquant.")
        return

    contacts = load_contacts()
    log = load_log()
    logged_domains = {e["domain"] for e in log}

    PRIORITY = {"high": 0, "medium": 1, "low": 2}
    eligible = [
        c for c in contacts
        if c.get("status", "to_contact") == "to_contact"
        and c.get("domain", "") not in logged_domains
        and c.get("email", "")
        and (target_domain is None or target_domain in c.get("domain", "").lower())
    ]
    eligible.sort(key=lambda x: (PRIORITY.get(x.get("priority", "low"), 2), -x.get("da_est", 0)))

    to_send = eligible[:1] if target_domain else eligible[:MAX_PER_RUN]

    if not to_send:
        print("Aucun contact eligible (to_contact + email connu + pas encore envoye).")
        return

    sent_ok = []
    for contact in to_send:
        domain = contact.get("domain", "")
        email = contact.get("email", "")
        subject, body = build_email(contact)

        print(f"\n{'='*55}")
        print(f"TO      : {email}")
        print(f"SUBJECT : {subject}")
        print(f"BODY    :\n{body}")
        print(f"{'='*55}")

        if not preview:
            ok = send_email(email, subject, body)
            if ok:
                contact["status"] = "emailed"
                contact["emailed_date"] = datetime.date.today().isoformat()
                log.append({
                    "domain": domain,
                    "email": email,
                    "date": datetime.date.today().isoformat(),
                    "subject": subject,
                })
                sent_ok.append(f"{domain}")
                print(f"Envoye a {email}")
                time.sleep(30)  # Pause anti-spam entre emails
            else:
                print(f"Echec pour {email}")
        else:
            sent_ok.append(f"[PREVIEW] {domain}")

    if not preview and sent_ok:
        save_contacts(contacts)
        save_log(log)
        send_telegram(
            f"<b>OUTREACH EMAILS</b> -- {datetime.date.today()}\n"
            f"Envoyes : {', '.join(sent_ok)}\n"
            f"Reponses attendues dans 3-7 jours.\n"
            f"Mise a jour statut : <code>python scripts/outreach_tracker.py --update DOMAIN replied</code>"
        )
    elif preview:
        print(f"\n[PREVIEW] Seraient envoyes : {', '.join(sent_ok)}")


if __name__ == "__main__":
    main()
