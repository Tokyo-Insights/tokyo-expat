"""
competitor_jobs_monitor.py — Tokyo Expat Intelligence
Surveille les offres d'emploi publiees par les concurrents sur Indeed JP.
Signaux detectes:
  - "Content Writer / SEO" = ils vont accelerer leur production de contenu
  - "Property Consultant" = ils recrutent cote commercial (expansion)
  - "Developer / Engineer" = refonte technique en cours
  - "Marketing Manager" = nouveau push acquisition prevu

Run: python scripts/competitor_jobs_monitor.py
"""

import requests
import json
import datetime
import sys
import io
import re
import time
import urllib3
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
VERIFY_SSL = False

from config import TELEGRAM_TOKEN, TELEGRAM_CHAT_ID

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR / "data"
CACHE_FILE = DATA_DIR / "jobs_cache.json"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}

# Concurrents a surveiller + leur nom exact pour la recherche Indeed
COMPETITORS = {
    "Sakura House":    "Sakura House",
    "Oak House":       "Oak House Japan",
    "GaijinPot":       "GaijinPot",
    "Remoters":        "Remoters",
    "Fontaine":        "Fontaine Relocation",
    "Crown Relo JP":   "Crown Relocations Japan",
    "Asian Tigers JP": "Asian Tigers Japan",
}

# Signaux d'alerte par type de poste
JOB_SIGNALS = {
    "content": {
        "keywords": ["content writer", "seo", "blog", "copywriter", "content manager", "editorial"],
        "label": "CONTENU/SEO",
        "priority": "HIGH",
        "action": "Ils renforcent leur production de contenu. Accelerer notre cadence d'articles.",
    },
    "commercial": {
        "keywords": ["property consultant", "agent", "sales", "relocation consultant", "housing advisor"],
        "label": "COMMERCIAL",
        "priority": "HIGH",
        "action": "Ils recrutent cote vente. Surveiller leur expansion de services.",
    },
    "tech": {
        "keywords": ["developer", "engineer", "frontend", "backend", "fullstack", "product manager"],
        "label": "TECH",
        "priority": "MEDIUM",
        "action": "Refonte technique probable. Attendre leur nouveau site et adapter.",
    },
    "marketing": {
        "keywords": ["marketing", "growth", "acquisition", "social media", "ads", "paid"],
        "label": "MARKETING",
        "priority": "HIGH",
        "action": "Push acquisition prevu. Renforcer notre SEO avant qu'ils lancent leurs campagnes.",
    },
}


def search_indeed_jobs(company: str) -> list[dict]:
    """Scrape Indeed.co.jp pour les offres d'une entreprise."""
    jobs = []
    url = "https://jp.indeed.com/jobs"
    params = {"q": f'"{company}"', "l": "Tokyo", "sort": "date"}
    try:
        r = requests.get(url, params=params, headers=HEADERS, timeout=15, verify=VERIFY_SSL)
        if not r.ok:
            return jobs

        # Extraire les titres de postes via regex sur le HTML
        titles = re.findall(
            r'<span[^>]*class="[^"]*jobTitle[^"]*"[^>]*>\s*<span[^>]*>([^<]+)</span>',
            r.text
        )
        companies_found = re.findall(
            r'<span[^>]*class="[^"]*companyName[^"]*"[^>]*>([^<]+)</span>',
            r.text
        )
        dates = re.findall(
            r'<span[^>]*class="[^"]*date[^"]*"[^>]*>([^<]+)</span>',
            r.text
        )

        for i, title in enumerate(titles[:20]):
            title_clean = re.sub(r'<[^>]+>', '', title).strip()
            company_found = companies_found[i].strip() if i < len(companies_found) else ""
            date_str = dates[i].strip() if i < len(dates) else ""
            if title_clean:
                jobs.append({
                    "title": title_clean,
                    "company_found": company_found,
                    "date": date_str,
                })
    except Exception as e:
        print(f"  [WARN] Indeed fetch failed for {company}: {e}")
    return jobs


def classify_job(title: str) -> tuple[str, dict] | tuple[None, None]:
    """Classe un titre de poste selon les signaux d'alerte."""
    title_lower = title.lower()
    for signal_type, signal in JOB_SIGNALS.items():
        if any(kw in title_lower for kw in signal["keywords"]):
            return signal_type, signal
    return None, None


def load_cache() -> dict:
    DATA_DIR.mkdir(exist_ok=True)
    if CACHE_FILE.exists():
        with open(CACHE_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_cache(cache: dict) -> None:
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2, ensure_ascii=False)


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
    print(f"\n{'='*60}")
    print(f"COMPETITOR JOBS MONITOR - {datetime.date.today()}")
    print(f"{'='*60}\n")

    cache = load_cache()
    today = datetime.date.today().isoformat()
    alerts = []

    for competitor_key, company_name in COMPETITORS.items():
        print(f"Scanning jobs for {competitor_key}...")
        jobs = search_indeed_jobs(company_name)
        print(f"  {len(jobs)} offres trouvees")
        time.sleep(2)

        cache_key = f"jobs_{competitor_key}"
        prev_titles = set(cache.get(cache_key, []))
        current_titles = {j["title"] for j in jobs}
        new_titles = current_titles - prev_titles

        for title in new_titles:
            signal_type, signal = classify_job(title)
            if signal_type:
                alert = (
                    f"JOB SIGNAL [{signal['priority']}]: <b>{competitor_key}</b>\n"
                    f"Poste: <b>{title}</b> ({signal['label']})\n"
                    f"Action: {signal['action']}"
                )
                alerts.append(alert)
                print(f"  !! SIGNAL {signal['label']}: {title}")

        cache[cache_key] = list(current_titles)
        cache[f"last_scan_{competitor_key}"] = today

    save_cache(cache)

    if alerts:
        msg = f"<b>COMPETITOR JOBS INTEL</b> — {today}\n\n" + "\n\n".join(alerts)
        send_telegram(msg)
        print(f"\n{len(alerts)} signaux emploi envoyes")
    else:
        print("\nAucun nouveau signal emploi detecte")


if __name__ == "__main__":
    main()
