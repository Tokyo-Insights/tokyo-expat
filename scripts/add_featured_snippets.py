#!/usr/bin/env python3
"""
add_featured_snippets.py
Ajoute des blocs "featured snippet" (reponse directe en H2-question + tableaux)
sur 4 pages existantes pour voler la position 0 aux concurrents (alerte 03/08).
100% additif, zero nom de concurrent, prix = donnees marche. Insere juste APRES
le bloc "Quick answer:" de chaque page. Anti-doublon + controle ^]$ / backtick.

Usage: python scripts/add_featured_snippets.py [--dry-run]
"""
import os, re, sys

BLOG_TS = os.path.join(os.path.dirname(__file__), '..', 'lib', 'blog.ts')
DRY = '--dry-run' in sys.argv

SNIPPETS = {
    'furnished-apartment-tokyo-no-guarantor': (
        "## Can foreigners rent in Tokyo without a guarantor?",
        """## Can foreigners rent in Tokyo without a guarantor?

Yes. Foreigners can rent in Tokyo without a Japanese guarantor by choosing furnished monthly mansions, serviced apartments, or share houses, which accept a passport and visa instead. Many standard unfurnished rentals also accept a paid guarantor company (hosho gaisha) in place of a personal guarantor, usually for around half a month of rent.
"""),
    'tokyo-rent-by-neighborhood-2026': (
        "## How much does it cost to rent in Tokyo by apartment type?",
        """## How much does it cost to rent in Tokyo by apartment type?

| Apartment type | Typical monthly rent | Deposit | Guarantor needed |
|---|---|---|---|
| Share house (private room) | 40,000 to 90,000 JPY | 1 month or none | No |
| Monthly mansion (furnished studio) | 90,000 to 200,000 JPY | Often none | No |
| 1K unfurnished (standard lease) | 80,000 to 140,000 JPY | 1 to 2 months | Usually yes |
| 1LDK unfurnished | 150,000 to 300,000 JPY | 1 to 2 months | Usually yes |

Figures are indicative Tokyo ranges from current market listings; central wards sit at the top of each band.
"""),
    'share-house-tokyo-guide-2026': (
        "## Tokyo share house prices at a glance",
        """## Tokyo share house prices at a glance

| Room type | Typical monthly rent | Deposit | Minimum stay | Guarantor |
|---|---|---|---|---|
| Dormitory bed | 30,000 to 50,000 JPY | Low or none | 1 month | No |
| Small private room | 45,000 to 65,000 JPY | 1 month or none | 1 month | No |
| Standard private room | 60,000 to 80,000 JPY | 1 month or none | 1 month | No |
| Private room with ensuite | 80,000 to 110,000 JPY | 1 month or none | 1 month | No |

Utilities are often bundled into the monthly rent. Prices vary by ward and distance to a station.
"""),
    'furnished-apartment-tokyo-top-5-expats': (
        "## Short-term apartment options in Tokyo at a glance",
        """## Short-term apartment options in Tokyo at a glance

| Option | Minimum stay | Typical price | Guarantor |
|---|---|---|---|
| Airbnb or short stay | 1 night | 15,000 to 40,000 JPY/night | No |
| Share house (private room) | 1 month | 40,000 to 120,000 JPY/month | No |
| Monthly mansion (furnished studio) | 1 month | 80,000 to 200,000 JPY/month | No |
| Serviced furnished apartment | 1 to 3 months | 100,000 to 300,000 JPY/month | No |

None of these require a Japanese guarantor; a passport and visa are enough.
"""),
}

QA = re.compile(r"(\*\*Quick answer:\*\*[^\n]*\n)")


def process(raw):
    slug_re = re.compile(r"slug:\s*'([^']+)'")
    positions = [(m.start(), m.group(1)) for m in slug_re.finditer(raw)]
    edits = []
    for i, (pos, slug) in enumerate(positions):
        if slug not in SNIPPETS:
            continue
        marker, block = SNIPPETS[slug]
        end = positions[i + 1][0] if i + 1 < len(positions) else len(raw)
        chunk = raw[pos:end]
        cm = re.search(r'content:\s*`([\s\S]*?)`\.trim\(\)', chunk) or \
             re.search(r'content:\s*`([\s\S]*?)`\s*,?\s*\n\s*readingTime', chunk)
        if not cm:
            print(f'  WARNING content introuvable: {slug}', file=sys.stderr); continue
        old = cm.group(1)
        if marker in old:
            print(f'  SKIP (deja present): {slug}'); continue
        qm = QA.search(old)
        if not qm:
            print(f'  SKIP (pas de Quick answer): {slug}'); continue
        ins = qm.end()
        new = old[:ins] + "\n" + block + old[ins:]
        edits.append((pos + cm.start(1), pos + cm.end(1), new, slug))

    edits.sort(key=lambda x: x[0], reverse=True)
    n = 0
    for a, b, new, slug in edits:
        raw = raw[:a] + new + raw[b:]
        n += 1
        print(f'  OK: {slug}')
    return raw, n


def main():
    with open(BLOG_TS, encoding='utf-8') as f:
        raw = f.read()
    before = len(re.findall(r'^\]$', raw, re.MULTILINE))
    new_raw, n = process(raw)
    after = len(re.findall(r'^\]$', new_raw, re.MULTILINE))
    bt = new_raw.count('\\`')
    print(f"\nControle: ']'={before}->{after} | backslash-backtick={bt}")
    if before != 1 or after != 1 or bt:
        print("  ABORT: controle echoue, aucune ecriture."); return
    if n == 0:
        print("Aucun changement."); return
    if DRY:
        print(f"[DRY-RUN] {n} pages seraient modifiees."); return
    with open(BLOG_TS, 'w', encoding='utf-8') as f:
        f.write(new_raw)
    print(f"{n} pages modifiees. blog.ts ecrit.")


if __name__ == '__main__':
    main()
