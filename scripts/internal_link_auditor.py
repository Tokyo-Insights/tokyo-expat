#!/usr/bin/env python3
"""
internal_link_auditor.py
Tokyo Expat - Audit des liens internes manquants entre articles
Usage: python scripts/internal_link_auditor.py
Output: scripts/data/internal_link_audit.md
"""

import re
import os
from collections import defaultdict

BLOG_TS = os.path.join(os.path.dirname(__file__), '..', 'lib', 'blog.ts')
OUTPUT  = os.path.join(os.path.dirname(__file__), 'data', 'internal_link_audit.md')


def parse_articles(path: str):
    with open(path, encoding='utf-8') as f:
        raw = f.read()

    articles = []
    slug_re   = re.compile(r"slug:\s*'([^']+)'")
    locale_re = re.compile(r"locale:\s*'([^']+)'")
    title_re  = re.compile(r"title:\s*'([^']+)'")

    positions = [(m.start(), m.group(1)) for m in slug_re.finditer(raw)]

    for i, (pos, slug) in enumerate(positions):
        end   = positions[i + 1][0] if i + 1 < len(positions) else len(raw)
        chunk = raw[pos:end]

        locale_m  = locale_re.search(chunk)
        title_m   = title_re.search(chunk)
        content_m = re.search(r'content:\s*`([\s\S]*?)`\.trim\(\)', chunk)
        if not content_m:
            content_m = re.search(r'content:\s*`([\s\S]*?)`\s*,?\s*\n\s*readingTime', chunk)

        locale  = locale_m.group(1)  if locale_m  else 'fr'
        title   = title_m.group(1)   if title_m   else slug
        content = content_m.group(1) if content_m else ''

        articles.append({'slug': slug, 'locale': locale, 'title': title, 'content': content})

    return articles


def extract_links(content: str) -> set:
    """Return set of target slugs for all /blog/slug links in content."""
    pattern = re.compile(r'\]\(/(?:[a-z]{2}/)?blog/([^/)?\s"\']+)\)')
    return set(m.group(1) for m in pattern.finditer(content))


# Topic clusters: (cluster_name, [slug_keyword_fragments])
CLUSTERS = [
    ('share-house',        ['share-house', 'gaijin-house']),
    ('appartement-meuble', ['appartement-meuble', 'furnished-apartment', 'meuble-tokyo', 'furnished-tokyo']),
    ('chasseur',           ['chasseur-immobilier', 'real-estate-hunter']),
    ('visa',               ['visa-travail', 'visa-nomade', 'japan-work-visa', 'japan-digital-nomad', 'working-holiday', 'pvt-japon']),
    ('garant',             ['garantie-loyer', 'guarantor-japan', 'sans-garant', 'no-guarantor']),
    ('assurance',          ['assurance-maladie', 'assurance-habitation', 'health-insurance', 'renters-insurance']),
    ('banque',             ['compte-bancaire', 'bank-account']),
    ('quartiers',          ['quartiers-tokyo', 'tokyo-neighbourhoods', 'quartiers-familles', 'best-neighbourhoods-families']),
    ('hiroo-ebisu',        ['hiroo', 'ebisu-daikanyama']),
    ('loyers',             ['loyers-tokyo', 'tokyo-rent', 'negocier-loyer', 'negotiating-rent']),
    ('impots',             ['impots-revenus', 'income-tax']),
    ('etudiant',           ['logement-etudiant', 'student-housing']),
    ('entrepreneur',       ['entrepreneur-freelance', 'entrepreneur-startup']),
    ('corporate',          ['relocation-entreprise', 'corporate-relocation']),
    ('sim',                ['carte-sim', 'sim-card']),
    ('japonais',           ['cours-japonais', 'japanese-language']),
    ('argent',             ['virement-international', 'send-money']),
    ('famille',            ['famille-expatriee', 'family-expat']),
    ('demenagement',       ['checklist-complete', 'moving-to-tokyo', 'demenager-japon', 'demenageur-international', 'international-moving']),
    ('trouver-appart',     ['trouver-appartement', 'find-apartment', 'chercher-appartement', 'tokyo-apartment-hunting']),
    ('contrat-bail',       ['checklist-bail', 'rental-contract-checklist']),
    ('internet',           ['internet-utilitaires', 'setting-up-utilities']),
    ('transport',          ['transport-tokyo', 'tokyo-public-transport']),
    ('jiko-bukken',        ['jiko-bukken']),
    ('tokyo-osaka',        ['tokyo-osaka', 'tokyo-osaka-kyoto']),
    ('remoters',           ['remoters-alternative', 'alternative-remoters']),
    ('permis',             ['permis-conduire', 'driving-licence']),
    ('animaux',            ['animal-compagnie', 'bringing-pets']),
    ('pieges',             ['pieges-location', 'rental-traps', 'dossier-location-refuse', 'rental-application-rejected']),
    ('zairyu',             ['carte-residence', 'residence-card-japan']),
    ('septembre',          ['tokyo-septembre', 'find-apartment-tokyo-september', 'logement-etudiant-tokyo-octobre', 'student-housing-tokyo-october']),
]


def assign_clusters(slug: str) -> list:
    result = []
    for name, keywords in CLUSTERS:
        for kw in keywords:
            if kw in slug:
                result.append(name)
                break
    return result


def run_audit():
    print(f"Parsing {BLOG_TS} ...")
    articles = parse_articles(BLOG_TS)
    print(f"Articles trouves: {len(articles)}")

    by_slug = {a['slug']: a for a in articles}

    for a in articles:
        a['links_out'] = extract_links(a['content'])
        a['clusters']  = assign_clusters(a['slug'])

    # cluster -> [slugs]
    cluster_map: dict = defaultdict(list)
    for a in articles:
        for c in a['clusters']:
            cluster_map[c].append(a['slug'])

    # Find missing links
    results = []
    for a in articles:
        missing = []
        seen = set()
        for c in a['clusters']:
            for peer_slug in cluster_map[c]:
                if peer_slug == a['slug'] or peer_slug in seen:
                    continue
                seen.add(peer_slug)
                peer = by_slug.get(peer_slug, {})
                # Only suggest same-locale links (cross-locale = hreflang, not body links)
                if peer.get('locale') == a['locale'] and peer_slug not in a['links_out']:
                    missing.append({
                        'cluster': c,
                        'slug': peer_slug,
                        'title': peer.get('title', peer_slug),
                    })
        if missing:
            results.append({
                'slug': a['slug'],
                'locale': a['locale'],
                'title': a['title'],
                'n': len(missing),
                'existing': sorted(a['links_out']),
                'missing': missing,
            })

    results.sort(key=lambda x: -x['n'])

    # ─── Write report ────────────────────────────────────────────────────────
    lines = [
        '# Audit liens internes manquants — Tokyo Expat',
        '',
        f'**Articles analyses:** {len(articles)}  |  **Articles avec liens manquants:** {len(results)}',
        '',
        '> Priorite: articles avec le plus grand nombre de liens manquants vers d\'autres articles du meme cluster thematique et meme locale.',
        '',
        '---',
        '',
    ]

    for r in results[:50]:
        lines.append(f"## [{r['locale'].upper()}] {r['title']}")
        lines.append(f"**/blog/{r['slug']}** — {r['n']} lien(s) manquant(s)")
        if r['existing']:
            lines.append(f"Liens existants: `{'`, `'.join(r['existing'][:6])}`")
        lines.append('')
        lines.append('**Liens a ajouter (par priorite):**')
        for m in r['missing'][:8]:
            lines.append(f"- [{m['title']}](/blog/{m['slug']}) *(cluster: {m['cluster']})*")
        lines.append('')
        lines.append('---')
        lines.append('')

    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    with open(OUTPUT, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

    print(f"\nRapport: {OUTPUT}")
    print(f"\nTop 10 articles prioritaires:")
    for r in results[:10]:
        print(f"  [{r['locale'].upper()}] {r['slug']}: {r['n']} liens manquants")

    return results


if __name__ == '__main__':
    run_audit()
