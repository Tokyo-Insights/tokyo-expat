"""
outreach_tracker.py — Tokyo Expat Outreach CRM
CRM complet pour gérer tous les contacts backlinks, partenariats, B2B.
Pré-peuplé avec 40+ contacts priorisés.

Run: python scripts/outreach_tracker.py              # digest + stats
     python scripts/outreach_tracker.py --list        # liste tous les contacts
     python scripts/outreach_tracker.py --email DOMAIN  # template email
     python scripts/outreach_tracker.py --update DOMAIN STATUS [--note "texte"]
"""

import json
import datetime
import sys
import io
import argparse
import requests
import urllib3
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
CONTACTS_FILE = DATA_DIR / "outreach_contacts.json"

STATUSES = ["to_contact", "emailed", "followed_up", "responded", "link_obtained", "declined", "skip"]
STATUS_ICONS = {
    "to_contact": "📋",
    "emailed": "📧",
    "followed_up": "🔁",
    "responded": "💬",
    "link_obtained": "✅",
    "declined": "❌",
    "skip": "⏭️",
}

# ── BASE DE CONTACTS ──────────────────────────────────────────────────────────
CONTACTS_DB = [
    # ─── TIER 1 : BACKLINKS ÉDITORIAUX ───────────────────────────────────────
    {
        "domain": "savvytokyo.com", "name": "Savvy Tokyo",
        "type": "backlink_t1", "email": "editor@savvytokyo.com",
        "approach": "guest_post", "da_est": 45, "priority": "high",
        "pitch": "Guest post sur trouver un appartement à Tokyo ou budget expatrie",
        "notes": "Magazine lifestyle Tokyo feminin, section 'Living' bien fournie, acceptent contributions",
    },
    {
        "domain": "tokyocheapo.com", "name": "Tokyo Cheapo",
        "type": "backlink_t1", "email": "info@tokyocheapo.com",
        "approach": "resource_link", "da_est": 55, "priority": "high",
        "pitch": "Ajout lien tokyo-expat.com dans section 'Housing in Tokyo'",
        "notes": "Section Living tres bien classee sur Google, facile d'obtenir un lien ressource",
    },
    {
        "domain": "blog.gaijinpot.com", "name": "GaijinPot Blog",
        "type": "backlink_t1", "email": "editorial@gplusmedia.com",
        "approach": "guest_post", "da_est": 60, "priority": "high",
        "pitch": "Guest post sur share house Tokyo ou logement meuble sans garant",
        "notes": "Acceptent guest posts, audience expat EN tres large",
    },
    {
        "domain": "japantoday.com", "name": "Japan Today",
        "type": "backlink_t1", "email": "editorial@japantoday.com",
        "approach": "guest_post", "da_est": 70, "priority": "high",
        "pitch": "Article data/opinion sur marche locatif Tokyo pour expatries 2026",
        "notes": "Grand media JP EN, section Community + Real Estate, forte DA",
    },
    {
        "domain": "tofugu.com", "name": "Tofugu",
        "type": "backlink_t1", "email": "hello@tofugu.com",
        "approach": "resource_link", "da_est": 65, "priority": "medium",
        "pitch": "Lien dans guide 'Moving to Japan' ou 'Living in Japan'",
        "notes": "Blog JP culture tres cite, section Living in Japan existante",
    },
    {
        "domain": "japanpropertycentral.com", "name": "Japan Property Central",
        "type": "backlink_t1", "email": "info@japanpropertycentral.com",
        "approach": "content_partnership", "da_est": 40, "priority": "high",
        "pitch": "Partenariat editorial: ils couvrent achat, nous couvrons locatif",
        "notes": "Complementaires, pas concurrents directs, partenariat naturel",
    },
    {
        "domain": "timeoutjapan.net", "name": "Time Out Tokyo",
        "type": "backlink_t1", "email": "editorial@timeout.com",
        "approach": "resource_link", "da_est": 80, "priority": "high",
        "pitch": "Lien ressource dans section 'Living in Tokyo'",
        "notes": "DA tres fort, difficile mais tres haute valeur si obtenu",
    },
    {
        "domain": "expatica.com", "name": "Expatica",
        "type": "backlink_t1", "email": "partnerships@expatica.com",
        "approach": "content_partnership", "da_est": 70, "priority": "high",
        "pitch": "Partenariat editorial section Japan (logement + relocation)",
        "notes": "Grand portail expat EU, section Japan existante, DA fort",
    },
    {
        "domain": "japaninsiders.com", "name": "Japan Insiders",
        "type": "backlink_t1", "email": "contact@japaninsiders.com",
        "approach": "resource_link", "da_est": 30, "priority": "medium",
        "pitch": "Lien ressource logement/expat dans leur guide",
        "notes": "Guide expat mid-size, audience tres pertinente",
    },
    {
        "domain": "realestate.co.jp", "name": "Real Estate Japan (GaijinPot)",
        "type": "backlink_t1", "email": "info@gplusmedia.com",
        "approach": "resource_link", "da_est": 55, "priority": "medium",
        "pitch": "Lien guide logement complementaire dans leur blog",
        "notes": "Portail listing immobilier EN, section blog peu fournie",
    },
    # ─── TIER 2 : ECOLES DE LANGUES ──────────────────────────────────────────
    {
        "domain": "cotoacademy.com", "name": "Coto Academy",
        "type": "language_school", "email": "info@cotoacademy.com",
        "approach": "partnership", "da_est": 35, "priority": "high",
        "pitch": "Partenariat logement: leurs etudiants cherchent appartement, on peut les aider",
        "notes": "Ecole japonais connue Tokyo, etudiants etrangers nombreux",
    },
    {
        "domain": "isij.com", "name": "ISI Language School",
        "type": "language_school", "email": "info@isij.com",
        "approach": "partnership", "da_est": 30, "priority": "high",
        "pitch": "Lien dans section 'Life in Japan' ou 'Accommodation' pour etudiants",
        "notes": "ISI a plusieurs ecoles JP, section housing souvent vide",
    },
    {
        "domain": "berlitz.co.jp", "name": "Berlitz Japan",
        "type": "language_school", "email": "info@berlitz.co.jp",
        "approach": "partnership", "da_est": 50, "priority": "medium",
        "pitch": "Ressource logement pour apprenants corporate relocalisés",
        "notes": "Focus corporate, audience B2B premium",
    },
    {
        "domain": "akamonkai.ac.jp", "name": "Akamonkai",
        "type": "language_school", "email": "info@akamonkai.ac.jp",
        "approach": "partnership", "da_est": 25, "priority": "medium",
        "pitch": "Partenariat logement pour etudiants internationaux",
        "notes": "Ecole langues populaire Tokyo, etudiants occidentaux + asiatiques",
    },
    {
        "domain": "japanswitch.com", "name": "Japan Switch",
        "type": "language_school", "email": "hello@japanswitch.com",
        "approach": "resource_link", "da_est": 30, "priority": "medium",
        "pitch": "Lien dans guide logement de leur section 'Japan Life'",
        "notes": "Plateforme cours japonais en ligne, section ressources bien fournie",
    },
    {
        "domain": "nihongocenter.co.jp", "name": "Nihongo Center",
        "type": "language_school", "email": "info@nihongocenter.co.jp",
        "approach": "partnership", "da_est": 25, "priority": "low",
        "pitch": "Partenariat logement etudiants pour leur expansion Tokyo",
        "notes": "Base Kyoto, extension Tokyo en cours",
    },
    # ─── TIER 2 : DEMENAGEURS INTERNATIONAUX ─────────────────────────────────
    {
        "domain": "crownrelo.com", "name": "Crown Relocations Japan",
        "type": "moving_company", "email": "japan@crownrelo.com",
        "approach": "partnership", "da_est": 45, "priority": "high",
        "pitch": "Cross-referral: ils font le demenagement, on trouve le logement",
        "notes": "Leader demenagement international vers JP, audience cible parfaite",
    },
    {
        "domain": "asiantigers-japan.com", "name": "Asian Tigers Japan",
        "type": "moving_company", "email": "info@asiantigers-japan.com",
        "approach": "partnership", "da_est": 35, "priority": "high",
        "pitch": "Partenariat complementaire: demenagement + logement",
        "notes": "2e acteur international JP, partenariat naturel",
    },
    {
        "domain": "nipponexpress.com", "name": "Nippon Express International",
        "type": "moving_company", "email": "intl@nipponexpress.com",
        "approach": "resource_link", "da_est": 50, "priority": "medium",
        "pitch": "Lien ressource logement dans leur section 'Moving to Japan'",
        "notes": "Grand operateur, guide relocation peu mis a jour",
    },
    # ─── TIER 2 : AMBASSADES / GOUVERNEMENT ──────────────────────────────────
    {
        "domain": "fr.ambafrance-jp.org", "name": "Ambassade France Tokyo",
        "type": "government", "email": "contact@ambafrance-jp.org",
        "approach": "resource_link", "da_est": 75, "priority": "high",
        "pitch": "Ajout dans section 'S'installer au Japon' / ressources pour expatries",
        "notes": "DA tres fort, lien difficile mais transformateur. Angle: service prive FR",
    },
    {
        "domain": "jetro.go.jp", "name": "JETRO",
        "type": "government", "email": "pr@jetro.go.jp",
        "approach": "resource_link", "da_est": 70, "priority": "medium",
        "pitch": "Lien dans section 'Life in Japan' pour expatries d'affaires",
        "notes": "Japan External Trade Org., section Living in Japan existante",
    },
    # ─── TIER 2 : CHAMBRES DE COMMERCE ───────────────────────────────────────
    {
        "domain": "ccifj.or.jp", "name": "CCIFJ",
        "type": "chamber_commerce", "email": "contact@ccifj.or.jp",
        "approach": "partnership", "da_est": 40, "priority": "high",
        "pitch": "Adhesion membres + lien ressource logement employes FR relocalises JP",
        "notes": "Chambre Commerce Franco-Japonaise, audience parfaite",
    },
    {
        "domain": "bccj.com", "name": "BCCJ",
        "type": "chamber_commerce", "email": "info@bccj.com",
        "approach": "resource_link", "da_est": 40, "priority": "medium",
        "pitch": "Lien dans section 'Relocation Guide' pour membres",
        "notes": "British Chamber of Commerce Japan, guide relocation",
    },
    {
        "domain": "accj.or.jp", "name": "ACCJ",
        "type": "chamber_commerce", "email": "info@accj.or.jp",
        "approach": "resource_link", "da_est": 45, "priority": "medium",
        "pitch": "Ressource logement section membres / candidats US",
        "notes": "American Chamber of Commerce Japan, audience US expats premium",
    },
    # ─── TIER 2 : ECOLES INTERNATIONALES ─────────────────────────────────────
    {
        "domain": "tokyointernationalschool.ac.jp", "name": "Tokyo International School",
        "type": "intl_school", "email": "info@tokyointernationalschool.ac.jp",
        "approach": "resource_link", "da_est": 30, "priority": "medium",
        "pitch": "Guide logement pour nouvelles familles dans section 'Moving to Tokyo'",
        "notes": "Familles expatriees cherchent logement lors de l'inscription",
    },
    {
        "domain": "britishschoolintokyo.ac.jp", "name": "British School in Tokyo",
        "type": "intl_school", "email": "info@britishschoolintokyo.ac.jp",
        "approach": "resource_link", "da_est": 35, "priority": "medium",
        "pitch": "Lien guide logement pour parents dans section 'New Families'",
        "notes": "BST, nombreuses familles UK relocalisees chaque annee",
    },
    {
        "domain": "seisen.com", "name": "Seisen International School",
        "type": "intl_school", "email": "admissions@seisen.com",
        "approach": "resource_link", "da_est": 30, "priority": "low",
        "pitch": "Guide logement pour familles expatriees",
        "notes": "Ecole internationale Tokyo Sud, bonne reputation",
    },
    # ─── TIER 2 : RECRUTEMENT ────────────────────────────────────────────────
    {
        "domain": "michaelpage.co.jp", "name": "Michael Page Japan",
        "type": "recruitment", "email": "japan@michaelpage.com",
        "approach": "resource_link", "da_est": 60, "priority": "medium",
        "pitch": "Lien ressource logement dans guide 'Relocation to Japan'",
        "notes": "Recrutement cadres expats, guide relocation souvent incomplet",
    },
    {
        "domain": "robertwalters.co.jp", "name": "Robert Walters Japan",
        "type": "recruitment", "email": "japan@robertwalters.com",
        "approach": "resource_link", "da_est": 55, "priority": "medium",
        "pitch": "Guide logement pour candidats internationaux relocalisés",
        "notes": "Recrutement executifs, audience expats premium",
    },
    {
        "domain": "rgf-professional.jp", "name": "RGF Professional",
        "type": "recruitment", "email": "info@rgf-professional.jp",
        "approach": "resource_link", "da_est": 35, "priority": "low",
        "pitch": "Ressource logement Tokyo pour profils internationaux",
        "notes": "Cabinet recrutement specialise JP, profils tech et finance",
    },
    # ─── TIER 3 : B2B MULTINATIONALES FRANÇAISES ─────────────────────────────
    {
        "domain": "airfrancejapan.com", "name": "Air France Japan (RH)",
        "type": "b2b_corporate", "email": "rh.japon@airfrance.fr",
        "approach": "b2b_outreach", "da_est": 0, "priority": "high",
        "pitch": "Service logement B2B pour salaries Air France relocalisés Tokyo",
        "notes": "Personnel navigant + admin au Japon, relocalisations regulieres",
    },
    {
        "domain": "totalenergies.co.jp", "name": "TotalEnergies Japan (RH)",
        "type": "b2b_corporate", "email": "rh.japan@totalenergies.com",
        "approach": "b2b_outreach", "da_est": 0, "priority": "high",
        "pitch": "Gestion logement expatries TotalEnergies Tokyo - offre B2B",
        "notes": "Presence JP via partenariats energie, relocalise experts FR",
    },
    {
        "domain": "lvmhjapan.com", "name": "LVMH Japan (RH)",
        "type": "b2b_corporate", "email": "hr.japan@lvmh.com",
        "approach": "b2b_outreach", "da_est": 0, "priority": "high",
        "pitch": "Logement premium pour cadres LVMH relocalises Tokyo",
        "notes": "Nombreuses marques JP (LV, Dior, Givenchy), profils premium",
    },
    {
        "domain": "bnpparibas.co.jp", "name": "BNP Paribas Japan (RH)",
        "type": "b2b_corporate", "email": "hr.tokyo@bnpparibas.com",
        "approach": "b2b_outreach", "da_est": 0, "priority": "high",
        "pitch": "Logement pour banquiers et cadres BNP Paribas Tokyo",
        "notes": "Grande presence bancaire FR, expatries premium bien remuneres",
    },
    {
        "domain": "renault-japan.co.jp", "name": "Renault Japan (RH)",
        "type": "b2b_corporate", "email": "hr@renault-japan.co.jp",
        "approach": "b2b_outreach", "da_est": 0, "priority": "medium",
        "pitch": "Logement pour ingénieurs / cadres Renault-Nissan relocalises",
        "notes": "Alliance Renault-Nissan, nombreux expatries FR vers JP",
    },
    {
        "domain": "airbus.co.jp", "name": "Airbus Japan (RH)",
        "type": "b2b_corporate", "email": "hr.japan@airbus.com",
        "approach": "b2b_outreach", "da_est": 0, "priority": "medium",
        "pitch": "Service relocation pour ingenieurs Airbus Tokyo",
        "notes": "Bureau Airbus Tokyo, sales + technical staff",
    },
    {
        "domain": "edf.co.jp", "name": "EDF Japan (RH)",
        "type": "b2b_corporate", "email": "contact.japan@edf.fr",
        "approach": "b2b_outreach", "da_est": 0, "priority": "medium",
        "pitch": "Logement experts EDF au Japon (nucleaire + ENR)",
        "notes": "EDF presente au Japon via partenariats nucleaires",
    },
    {
        "domain": "thales.co.jp", "name": "Thales Japan (RH)",
        "type": "b2b_corporate", "email": "hr.japan@thalesgroup.com",
        "approach": "b2b_outreach", "da_est": 0, "priority": "medium",
        "pitch": "Logement ingenieurs Thales defense/aeronautique Tokyo",
        "notes": "Bureau Tokyo, profils engineers + commerciaux",
    },
    # ─── TIER 3 : FINTECH ────────────────────────────────────────────────────
    {
        "domain": "wise.com", "name": "Wise Japan Blog",
        "type": "fintech", "email": "partnerships@wise.com",
        "approach": "content_partnership", "da_est": 85, "priority": "high",
        "pitch": "Mention dans article blog Wise Japan + lien guide expatries Tokyo",
        "notes": "Blog Japan tres bien ranke, audience identique a la notre",
    },
    {
        "domain": "revolut.com", "name": "Revolut Blog Japan",
        "type": "fintech", "email": "content@revolut.com",
        "approach": "content_partnership", "da_est": 80, "priority": "medium",
        "pitch": "Guest post 'moving to Japan financial checklist' avec lien",
        "notes": "Revolut JP en croissance, blog actif sur vie pratique JP",
    },
    # ─── TIER 3 : ASSURANCES ────────────────────────────────────────────────
    {
        "domain": "axa.co.jp", "name": "AXA Japan",
        "type": "insurance", "email": "info@axa.co.jp",
        "approach": "partnership", "da_est": 50, "priority": "medium",
        "pitch": "Cross-referral: assurance habitation pour nos clients, guide logement pour les leurs",
        "notes": "AXA presente JP, produits expat insurance",
    },
    {
        "domain": "cigna.co.jp", "name": "Cigna Japan",
        "type": "insurance", "email": "info@cigna.co.jp",
        "approach": "partnership", "da_est": 45, "priority": "medium",
        "pitch": "Partenariat sante expat <-> guide logement, audiences communes",
        "notes": "Specialise sante expat international",
    },
    # ─── TIER 3 : COMMUNAUTÉS EXPATS ────────────────────────────────────────
    {
        "domain": "expatforum.com", "name": "Expat Forum",
        "type": "community", "email": "contact@expatforum.com",
        "approach": "resource_link", "da_est": 50, "priority": "medium",
        "pitch": "Lien ressource logement Tokyo dans section Japan",
        "notes": "Forum expat global, section JP bien frequentee",
    },
]


def load_contacts() -> list[dict]:
    DATA_DIR.mkdir(exist_ok=True)
    if CONTACTS_FILE.exists():
        with open(CONTACTS_FILE, encoding="utf-8") as f:
            return json.load(f)
    # Initialisation depuis la DB master
    contacts = []
    for c in CONTACTS_DB:
        contacts.append({
            **c,
            "status": "to_contact",
            "last_contact": None,
            "response": None,
            "link_obtained": False,
            "added": datetime.date.today().isoformat(),
        })
    save_contacts(contacts)
    return contacts


def save_contacts(contacts: list[dict]) -> None:
    with open(CONTACTS_FILE, "w", encoding="utf-8") as f:
        json.dump(contacts, f, indent=2, ensure_ascii=False)


def get_stats(contacts: list[dict]) -> dict:
    stats = {s: 0 for s in STATUSES}
    for c in contacts:
        stats[c.get("status", "to_contact")] = stats.get(c.get("status", "to_contact"), 0) + 1
    return stats


def get_weekly_targets(contacts: list[dict], limit: int = 5) -> list[dict]:
    """Top N contacts à traiter en priorité cette semaine."""
    todo = [c for c in contacts if c.get("status") == "to_contact"]
    todo.sort(key=lambda x: (0 if x.get("priority") == "high" else 1, -x.get("da_est", 0)))
    return todo[:limit]


def generate_email_template(contact: dict) -> str:
    approach = contact.get("approach", "resource_link")
    name = contact.get("name", "")
    pitch = contact.get("pitch", "")

    if approach == "guest_post":
        return f"""Subject: Guest post proposal — Tokyo housing guide

Hi {name} team,

I'm Alessandro, a real estate hunter specialising in expat housing in Tokyo.
I run tokyo-expat.com, a practical guide for foreigners finding accommodation in Japan.

I'd love to contribute a guest post on {pitch.lower()} for {name}.
Our audiences overlap almost exactly.

A few article ideas:
- How to find an apartment in Tokyo without a Japanese guarantor
- The complete share house guide for Tokyo newcomers
- Real cost of living in Tokyo 2026: honest budget breakdown

Do you have a guest post submission process?

Best,
Alessandro
www.tokyo-expat.com"""

    elif approach == "partnership":
        return f"""Subject: Partnership opportunity — Tokyo Expat x {name}

Hi {name} team,

I'm Alessandro from tokyo-expat.com, a housing guide for expats moving to Tokyo.

{pitch}

I think a partnership makes sense: your clients need housing when they arrive in Tokyo, and our readers are actively looking for services like yours.

A simple starting point:
- Mutual links in our respective resource sections
- Or a mention in our guides and newsletters

Would this be of interest?

Best,
Alessandro
www.tokyo-expat.com"""

    elif approach == "b2b_outreach":
        return f"""Subject: Housing support for employees relocating to Japan

Hi,

I'm Alessandro, a property finder specialised in expat housing in Tokyo.

Through tokyo-expat.com, I help international executives and engineers find the right apartment in Tokyo — furnished, unfurnished, share houses, and family-sized units, from ¥80,000 to ¥300,000/month.

{pitch}

I offer dedicated B2B packages for corporate partners, including priority service and bilingual support.

Would you be open to a 15-minute call?

Best regards,
Alessandro
Tokyo Expat — www.tokyo-expat.com"""

    elif approach == "content_partnership":
        return f"""Subject: Content partnership — Tokyo Expat x {name}

Hi {name} team,

I run tokyo-expat.com, a housing guide for expats relocating to Tokyo (58 articles, EN + FR).

{pitch}

Our content is complementary to yours — we cover practical relocation, you cover [their topic]. An editorial partnership (mutual mentions, co-authored content, or link exchange) could benefit both audiences.

Interested in exploring this?

Best,
Alessandro
www.tokyo-expat.com"""

    else:  # resource_link
        return f"""Subject: Resource suggestion for your Japan readers

Hi {name} team,

I noticed your Japan section doesn't yet include a practical housing guide for expats.

I've built tokyo-expat.com covering exactly this: finding apartments in Tokyo, navigating the guarantor system, setting up utilities, and managing the full relocation process.

{pitch}

This could add real value for your readers.

Best,
Alessandro
www.tokyo-expat.com"""


def update_contact(contacts: list[dict], domain: str, new_status: str, note: str = "") -> bool:
    for c in contacts:
        if c["domain"] == domain:
            c["status"] = new_status
            c["last_contact"] = datetime.date.today().isoformat()
            if note:
                c["response"] = note
            if new_status == "link_obtained":
                c["link_obtained"] = True
            return True
    return False


def send_telegram(msg: str) -> None:
    try:
        requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
            json={"chat_id": TELEGRAM_CHAT_ID, "text": msg, "parse_mode": "HTML"},
            timeout=10, verify=VERIFY_SSL,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


def main():
    parser = argparse.ArgumentParser(description="Outreach CRM — Tokyo Expat")
    parser.add_argument("--digest", action="store_true", help="Envoyer digest Telegram uniquement")
    parser.add_argument("--update", nargs=2, metavar=("DOMAIN", "STATUS"))
    parser.add_argument("--note", default="", help="Note pour --update")
    parser.add_argument("--email", metavar="DOMAIN", help="Afficher template email")
    parser.add_argument("--list", action="store_true")
    args = parser.parse_args()

    contacts = load_contacts()

    if args.update:
        domain, status = args.update
        if status not in STATUSES:
            print(f"Statuts valides: {', '.join(STATUSES)}")
            return
        if update_contact(contacts, domain, status, args.note):
            save_contacts(contacts)
            print(f"OK: {domain} -> {status}")
        else:
            print(f"Domaine non trouvé: {domain}")
        return

    if args.email:
        contact = next((c for c in contacts if c["domain"] == args.email), None)
        if contact:
            print(generate_email_template(contact))
        else:
            print(f"Non trouvé: {args.email}")
        return

    if args.list:
        print(f"\n{'DOMAIN':<45} {'TYPE':<18} {'PRIORITY':<8} {'STATUS':<15} {'DA':>4}")
        print("-" * 100)
        for c in sorted(contacts, key=lambda x: (x.get("priority", "z"), -x.get("da_est", 0))):
            icon = STATUS_ICONS.get(c.get("status", "to_contact"), "•")
            print(f"{icon} {c['domain']:<43} {c['type']:<18} {c.get('priority',''):8} {c.get('status',''):15} {c.get('da_est', 0):>4}")
        print(f"\nTotal: {len(contacts)} contacts")
        return

    # Stats + digest
    stats = get_stats(contacts)
    targets = get_weekly_targets(contacts)
    links_obtained = sum(1 for c in contacts if c.get("link_obtained"))

    print(f"\n{'='*60}")
    print(f"OUTREACH TRACKER — {datetime.date.today()}")
    print(f"{'='*60}")
    print(f"Total: {len(contacts)} | A contacter: {stats.get('to_contact',0)} | "
          f"Emails: {stats.get('emailed',0)} | Réponses: {stats.get('responded',0)} | "
          f"Liens: {links_obtained}")
    print(f"\nCibles cette semaine:")
    for t in targets:
        print(f"  -> {t['domain']} ({t['type']}, DA:{t['da_est']}) — {t['pitch'][:70]}...")
    print(f"\nEmail template: python scripts/outreach_tracker.py --email DOMAIN")
    print(f"Mise à jour: python scripts/outreach_tracker.py --update DOMAIN emailed")

    # Telegram digest
    msg = (
        f"📊 <b>OUTREACH TRACKER</b> — {datetime.date.today()}\n\n"
        f"Total contacts: <b>{len(contacts)}</b>\n"
        f"A contacter: <b>{stats.get('to_contact', 0)}</b> | "
        f"Emails: <b>{stats.get('emailed', 0)}</b> | "
        f"Liens obtenus: <b>{links_obtained}</b>\n\n"
        f"<b>Cibles cette semaine :</b>\n"
    )
    approach_icons = {
        "guest_post": "✍️", "partnership": "🤝",
        "resource_link": "🔗", "b2b_outreach": "💼",
        "content_partnership": "📝",
    }
    for t in targets:
        icon = approach_icons.get(t.get("approach", ""), "📌")
        msg += f"{icon} <b>{t['name']}</b> (DA:{t['da_est']})\n   {t['pitch'][:65]}...\n"
    msg += f"\n<i>python scripts/outreach_tracker.py --email DOMAIN</i>"
    send_telegram(msg)


if __name__ == "__main__":
    main()
