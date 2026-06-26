#!/usr/bin/env python3
"""
apply_internal_links.py
Injecte tous les liens internes manquants dans blog.ts en une seule passe.
Stratégie : ajoute une ligne "See also" / "À lire aussi" juste APRÈS le dernier "---"
dans chaque article (avant le CTA italic final).
Usage: python scripts/apply_internal_links.py
"""

import re
import os
import sys

BLOG_TS = os.path.join(os.path.dirname(__file__), '..', 'lib', 'blog.ts')

# Toutes les liaisons manquantes issues de l'audit
MISSING_LINKS: dict = {
    'tokyo-rental-traps-foreigners': {
        'locale': 'en',
        'links': [
            ('Negotiating Rent in Tokyo: Is It Possible and How to Do It?', 'negotiating-rent-tokyo-tips'),
            ('Tokyo Rental Contract: 12 Things to Check Before Signing', 'tokyo-rental-contract-checklist'),
            ('Tokyo Rent by Neighborhood 2026: Expat Price Guide', 'tokyo-rent-by-neighborhood-2026'),
            ('Rental Application Rejected in Japan: What to Do Next', 'rental-application-rejected-japan-foreigner'),
        ],
    },
    'appartement-meuble-tokyo-sans-garant': {
        'locale': 'fr',
        'links': [
            ('Appartement meublé Tokyo expatriés : 5 options rapides 2026', 'appartement-meuble-tokyo-expats'),
            ('Appartement meublé à Tokyo : les 5 meilleures options pour expatriés (2026)', 'appartement-meuble-tokyo-expats-top-5'),
            ('Garantie de loyer au Japon : guide complet pour étrangers', 'garantie-loyer-etranger-japon'),
        ],
    },
    'furnished-apartment-tokyo-no-guarantor': {
        'locale': 'en',
        'links': [
            ('Furnished Apartment in Tokyo for Expats: 5 Quick Options (2026)', 'furnished-apartment-tokyo-expats'),
            ('Furnished Apartment Tokyo: 5 Best Options for Expats in 2026', 'furnished-apartment-tokyo-top-5-expats'),
            ('Guarantor for Japan Rental: Complete Guide for Foreigners', 'guarantor-japan-rental-foreigner'),
        ],
    },
    'negotiating-rent-tokyo-tips': {
        'locale': 'en',
        'links': [
            ('7 Rental Traps to Avoid When Renting in Tokyo as a Foreigner', 'tokyo-rental-traps-foreigners'),
            ('Tokyo Rental Contract: 12 Things to Check Before Signing', 'tokyo-rental-contract-checklist'),
            ('Tokyo Rent by Neighborhood 2026: Expat Price Guide', 'tokyo-rent-by-neighborhood-2026'),
        ],
    },
    'find-apartment-tokyo-september': {
        'locale': 'en',
        'links': [
            ('How to Find an Apartment in Tokyo as a Foreigner (2026 Guide)', 'find-apartment-tokyo-foreigner'),
            ('How to Find an Apartment in Tokyo from Abroad (Remote Hunting Guide)', 'tokyo-apartment-hunting-from-abroad'),
            ('Student Housing in Tokyo for October Intake: Share House vs University Dorm', 'student-housing-tokyo-october'),
        ],
    },
    'tokyo-rent-by-neighborhood-2026': {
        'locale': 'en',
        'links': [
            ('Negotiating Rent in Tokyo: Is It Possible and How to Do It?', 'negotiating-rent-tokyo-tips'),
            ('7 Rental Traps to Avoid When Renting in Tokyo as a Foreigner', 'tokyo-rental-traps-foreigners'),
            ('Tokyo Rental Contract: 12 Things to Check Before Signing', 'tokyo-rental-contract-checklist'),
        ],
    },
    'find-apartment-tokyo-foreigner': {
        'locale': 'en',
        'links': [
            ('How to Find an Apartment in Tokyo from Abroad (Remote Hunting Guide)', 'tokyo-apartment-hunting-from-abroad'),
            ('Finding an Apartment in Tokyo in September: What Changes vs Spring', 'find-apartment-tokyo-september'),
        ],
    },
    'tokyo-apartment-hunting-from-abroad': {
        'locale': 'en',
        'links': [
            ('How to Find an Apartment in Tokyo as a Foreigner (2026 Guide)', 'find-apartment-tokyo-foreigner'),
            ('Finding an Apartment in Tokyo in September: What Changes vs Spring', 'find-apartment-tokyo-september'),
        ],
    },
    'logement-etudiant-tokyo-guide': {
        'locale': 'fr',
        'links': [
            ('Logement étudiant à Tokyo : share house, dortoir ou appart ? (2026)', 'logement-etudiant-tokyo-2026'),
            ('Logement étudiant à Tokyo pour octobre : share house ou dortoir ?', 'logement-etudiant-tokyo-octobre'),
        ],
    },
    'student-housing-tokyo-guide': {
        'locale': 'en',
        'links': [
            ('Student Housing in Tokyo: Share House vs University Dorm (2026 Guide)', 'student-housing-tokyo-guide-2026'),
            ('Student Housing in Tokyo for October Intake: Share House vs University Dorm', 'student-housing-tokyo-october'),
        ],
    },
    'tokyo-rental-contract-checklist': {
        'locale': 'en',
        'links': [
            ('Negotiating Rent in Tokyo: Is It Possible and How to Do It?', 'negotiating-rent-tokyo-tips'),
            ('Tokyo Rent by Neighborhood 2026: Expat Price Guide', 'tokyo-rent-by-neighborhood-2026'),
        ],
    },
    'logement-etudiant-tokyo-2026': {
        'locale': 'fr',
        'links': [
            ('Logement étudiant à Tokyo : guide complet pour francophones', 'logement-etudiant-tokyo-guide'),
            ('Logement étudiant à Tokyo pour octobre : share house ou dortoir ?', 'logement-etudiant-tokyo-octobre'),
        ],
    },
    'student-housing-tokyo-guide-2026': {
        'locale': 'en',
        'links': [
            ('Student Housing Tokyo 2026: Complete Guide for International Students', 'student-housing-tokyo-guide'),
            ('Student Housing in Tokyo for October Intake: Share House vs University Dorm', 'student-housing-tokyo-october'),
        ],
    },
    'appartement-meuble-tokyo-expats': {
        'locale': 'fr',
        'links': [
            ('Appartement meublé à Tokyo sans garant : comment trouver en 2026', 'appartement-meuble-tokyo-sans-garant'),
            ('Appartement meublé à Tokyo : les 5 meilleures options pour expatriés (2026)', 'appartement-meuble-tokyo-expats-top-5'),
        ],
    },
    'furnished-apartment-tokyo-expats': {
        'locale': 'en',
        'links': [
            ('Furnished Apartments in Tokyo With No Guarantor Required (2026)', 'furnished-apartment-tokyo-no-guarantor'),
            ('Furnished Apartment Tokyo: 5 Best Options for Expats in 2026', 'furnished-apartment-tokyo-top-5-expats'),
        ],
    },
    'japan-digital-nomad-visa-2026': {
        'locale': 'en',
        'links': [
            ('Japan Work Visa for Foreigners: Which Type to Choose in 2026?', 'japan-work-visa-foreigners-guide'),
            ('Japan Working Holiday Visa 2026: Complete Guide (Eligibility & Housing)', 'japan-working-holiday-visa-guide-2026'),
        ],
    },
    'visa-nomade-digital-japon-2026': {
        'locale': 'fr',
        'links': [
            ('Visa travail au Japon pour les francophones : quel type choisir en 2026 ?', 'visa-travail-japon-francophone-2026'),
            ('PVT Japon 2026 : Guide Complet du Programme Vacances Travail', 'pvt-japon-visa-vacances-travail-2026'),
        ],
    },
    'japan-working-holiday-visa-guide-2026': {
        'locale': 'en',
        'links': [
            ('Japan Work Visa for Foreigners: Which Type to Choose in 2026?', 'japan-work-visa-foreigners-guide'),
            ('Japan Digital Nomad Visa 2026: Complete Guide for Remote Workers', 'japan-digital-nomad-visa-2026'),
        ],
    },
    'pvt-japon-visa-vacances-travail-2026': {
        'locale': 'fr',
        'links': [
            ('Visa travail au Japon pour les francophones : quel type choisir en 2026 ?', 'visa-travail-japon-francophone-2026'),
            ('Visa Nomade Digital Japon 2026 : Guide Complet pour les Télétravailleurs', 'visa-nomade-digital-japon-2026'),
        ],
    },
    'logement-etudiant-tokyo-octobre': {
        'locale': 'fr',
        'links': [
            ('Logement étudiant à Tokyo : guide complet pour francophones', 'logement-etudiant-tokyo-guide'),
            ('Trouver un appartement à Tokyo en septembre : ce qui change vs le printemps', 'appartement-tokyo-septembre-guide'),
        ],
    },
    'student-housing-tokyo-october': {
        'locale': 'en',
        'links': [
            ('Student Housing Tokyo 2026: Complete Guide for International Students', 'student-housing-tokyo-guide'),
            ('Finding an Apartment in Tokyo in September: What Changes vs Spring', 'find-apartment-tokyo-september'),
        ],
    },
    'chasseur-immobilier-tokyo-tarifs-vaut-il-le-coup': {
        'locale': 'fr',
        'links': [
            ('Chasseur immobilier ou agence à Tokyo : comparatif complet', 'chasseur-immobilier-vs-agence-tokyo-comparatif'),
            ('Comment fonctionne un chasseur immobilier à Tokyo', 'service-chasseur-immobilier-tokyo-comment-ca-marche'),
        ],
    },
    'real-estate-hunter-tokyo-cost-worth-it': {
        'locale': 'en',
        'links': [
            ('Real Estate Hunter vs Agency in Tokyo: Which Is Faster', 'real-estate-hunter-vs-agency-tokyo'),
            ('How a Real Estate Hunter Works in Tokyo: Step by Step', 'how-real-estate-hunter-works-tokyo'),
        ],
    },
    'trouver-appartement-tokyo-etranger': {
        'locale': 'fr',
        'links': [
            ('Chercher un appartement à Tokyo depuis l\'étranger', 'chercher-appartement-tokyo-depuis-etranger'),
        ],
    },
    'share-house-tokyo-guide-complet': {
        'locale': 'fr',
        'links': [
            ('Gaijin house vs share house à Tokyo : quelle est la différence ?', 'gaijin-house-vs-share-house-difference'),
        ],
    },
    'quartiers-tokyo-expatries-guide': {
        'locale': 'fr',
        'links': [
            ('Meilleurs quartiers de Tokyo pour familles expatriées 2026', 'quartiers-tokyo-familles-expatriees-guide'),
        ],
    },
    'moving-to-tokyo-checklist-2026': {
        'locale': 'en',
        'links': [
            ('Best International Moving Companies to Japan (2026)', 'international-moving-company-japan-guide'),
        ],
    },
    'pieges-location-tokyo-etranger': {
        'locale': 'fr',
        'links': [
            ('Dossier refusé à Tokyo : solutions concrètes pour les étrangers', 'dossier-location-refuse-tokyo-etranger'),
        ],
    },
    'share-house-tokyo-guide-2026': {
        'locale': 'en',
        'links': [
            ('Gaijin House vs Share House in Tokyo: What Is the Difference?', 'gaijin-house-vs-share-house-tokyo'),
        ],
    },
    'assurance-maladie-japon-expatrie': {
        'locale': 'fr',
        'links': [
            ('Assurance habitation Japon : ce que tout locataire doit savoir', 'assurance-habitation-japon-locataire'),
        ],
    },
    'negocier-loyer-tokyo-conseils': {
        'locale': 'fr',
        'links': [
            ('Loyers à Tokyo par quartier 2026 : guide pour expatriés', 'loyers-tokyo-par-quartier-2026'),
        ],
    },
    'demenager-japon-checklist-complete': {
        'locale': 'fr',
        'links': [
            ('Déménageur international vers le Japon : guide et prix 2026', 'demenageur-international-japon-guide'),
        ],
    },
    'tokyo-osaka-kyoto-ou-s-installer': {
        'locale': 'fr',
        'links': [
            ('Tokyo ou Osaka pour vivre : comparatif expatrié 2026', 'tokyo-osaka-ou-vivre-expatrie-comparatif'),
        ],
    },
    'japan-health-insurance-expat-guide': {
        'locale': 'en',
        'links': [
            ("Renter's Insurance in Japan: What Every Tenant Should Know", 'renters-insurance-japan-guide'),
        ],
    },
    'gaijin-house-vs-share-house-tokyo': {
        'locale': 'en',
        'links': [
            ('Share House in Tokyo: Complete Guide for Foreigners (2026)', 'share-house-tokyo-guide-2026'),
        ],
    },
    'tokyo-neighbourhoods-expats-guide': {
        'locale': 'en',
        'links': [
            ('Best Tokyo Neighbourhoods for Expat Families (2026)', 'best-neighbourhoods-families-tokyo-guide'),
        ],
    },
    'chercher-appartement-tokyo-depuis-etranger': {
        'locale': 'fr',
        'links': [
            ('Comment trouver un appartement à Tokyo quand on est étranger', 'trouver-appartement-tokyo-etranger'),
        ],
    },
    'gaijin-house-vs-share-house-difference': {
        'locale': 'fr',
        'links': [
            ('Share house à Tokyo : guide complet pour expatriés (2026)', 'share-house-tokyo-guide-complet'),
        ],
    },
    'appartement-tokyo-septembre-guide': {
        'locale': 'fr',
        'links': [
            ('Logement étudiant à Tokyo pour octobre : share house ou dortoir ?', 'logement-etudiant-tokyo-octobre'),
        ],
    },
    'quartiers-tokyo-familles-expatriees-guide': {
        'locale': 'fr',
        'links': [
            ('Meilleurs quartiers de Tokyo pour les expatriés : guide complet 2026', 'quartiers-tokyo-expatries-guide'),
        ],
    },
    'tokyo-osaka-ou-vivre-expatrie-comparatif': {
        'locale': 'fr',
        'links': [
            ('Tokyo, Osaka ou Kyoto : quelle ville choisir pour s\'installer ?', 'tokyo-osaka-kyoto-ou-s-installer'),
        ],
    },
    'international-moving-company-japan-guide': {
        'locale': 'en',
        'links': [
            ('Moving to Tokyo in 2026: Complete Expat Checklist', 'moving-to-tokyo-checklist-2026'),
        ],
    },
    'best-neighbourhoods-families-tokyo-guide': {
        'locale': 'en',
        'links': [
            ('Best Tokyo Neighbourhoods for Expats: Complete Guide 2026', 'tokyo-neighbourhoods-expats-guide'),
        ],
    },
    'appartement-meuble-tokyo-expats-top-5': {
        'locale': 'fr',
        'links': [
            ('Appartement meublé Tokyo expatriés : 5 options rapides 2026', 'appartement-meuble-tokyo-expats'),
        ],
    },
    'furnished-apartment-tokyo-top-5-expats': {
        'locale': 'en',
        'links': [
            ('Furnished Apartment in Tokyo for Expats: 5 Quick Options (2026)', 'furnished-apartment-tokyo-expats'),
        ],
    },
    'loyers-tokyo-par-quartier-2026': {
        'locale': 'fr',
        'links': [
            ('Négocier son loyer à Tokyo : est-ce possible et comment s\'y prendre ?', 'negocier-loyer-tokyo-conseils'),
        ],
    },
    'chasseur-immobilier-vs-agence-tokyo-comparatif': {
        'locale': 'fr',
        'links': [
            ('Chasseur immobilier Tokyo : tarifs et retour sur investissement', 'chasseur-immobilier-tokyo-tarifs-vaut-il-le-coup'),
        ],
    },
    'real-estate-hunter-vs-agency-tokyo': {
        'locale': 'en',
        'links': [
            ('Real Estate Hunter Tokyo: Cost and Is It Worth It', 'real-estate-hunter-tokyo-cost-worth-it'),
        ],
    },
    'service-chasseur-immobilier-tokyo-comment-ca-marche': {
        'locale': 'fr',
        'links': [
            ('Chasseur immobilier Tokyo : tarifs et retour sur investissement', 'chasseur-immobilier-tokyo-tarifs-vaut-il-le-coup'),
        ],
    },
    'how-real-estate-hunter-works-tokyo': {
        'locale': 'en',
        'links': [
            ('Real Estate Hunter Tokyo: Cost and Is It Worth It', 'real-estate-hunter-tokyo-cost-worth-it'),
        ],
    },
}


def build_see_also_line(links: list, locale: str) -> str:
    parts = ', '.join(f'[{title}](/blog/{slug})' for title, slug in links)
    if locale == 'fr':
        return f'*À lire aussi : {parts}.*'
    return f'*See also: {parts}.*'


def inject_into_content(content: str, see_also: str, locale: str) -> str:
    """
    Inject see_also line into article content.
    Priority:
    1. If there is an existing À lire aussi / See also / Read next italic line, extend it.
    2. Else insert after the last ---  separator (before any trailing CTA).
    3. Else append at the end.
    """
    # Check for existing see-also line
    patterns = [r'\*(À lire aussi\s*:)([^*]+)\*', r'\*(See also\s*:)([^*]+)\*', r'\*(Read next\s*:)([^*]+)\*']
    for p in patterns:
        m = re.search(p, content)
        if m:
            # Extend existing line: remove trailing period and append new links
            existing_end = m.end()
            old_line = m.group(0)
            # Strip trailing period
            inner = m.group(2).rstrip()
            if inner.endswith('.'):
                inner = inner[:-1]
            # Build new links from see_also (extract just the link part)
            new_links_str = re.sub(r'^\*(?:[^:]+:)\s*', '', see_also).rstrip('.*')
            new_line = f'*{m.group(1)}{inner}, {new_links_str}.*'
            return content[:m.start()] + new_line + content[m.end():]

    # No existing see-also: insert after last --- separator
    last_sep = content.rfind('\n---\n')
    if last_sep != -1:
        insert_after = last_sep + len('\n---\n')
        return content[:insert_after] + '\n' + see_also + '\n' + content[insert_after:]

    # No --- separator either: append at end
    return content.rstrip() + '\n\n' + see_also


def process(raw: str) -> tuple[str, int]:
    slug_re = re.compile(r"slug:\s*'([^']+)'")
    positions = [(m.start(), m.group(1)) for m in slug_re.finditer(raw)]

    # Collect all edits first (as absolute byte offsets), then apply in REVERSE
    # so that earlier positions are not shifted by later insertions.
    edits: list[tuple[int, int, str, str]] = []  # (start_abs, end_abs, new_content, slug)

    for i, (pos, slug) in enumerate(positions):
        if slug not in MISSING_LINKS:
            continue
        info = MISSING_LINKS[slug]
        locale = info['locale']
        links  = info['links']

        end   = positions[i + 1][0] if i + 1 < len(positions) else len(raw)
        chunk = raw[pos:end]

        # Try both content patterns used across sessions
        content_m = re.search(r'content:\s*`([\s\S]*?)`\.trim\(\)', chunk)
        if not content_m:
            content_m = re.search(r'content:\s*`([\s\S]*?)`\s*,?\s*\n\s*readingTime', chunk)
        if not content_m:
            print(f'  WARNING: content not found for {slug}', file=sys.stderr)
            continue

        old_content = content_m.group(1)
        see_also    = build_see_also_line(links, locale)
        new_content = inject_into_content(old_content, see_also, locale)

        if new_content == old_content:
            print(f'  SKIP (no change): {slug}')
            continue

        start_abs = pos + content_m.start(1)
        end_abs   = pos + content_m.end(1)
        edits.append((start_abs, end_abs, new_content, slug, len(links)))

    # Apply edits in REVERSE order (highest offset first) so positions stay valid
    edits.sort(key=lambda x: x[0], reverse=True)
    applied = 0
    for start_abs, end_abs, new_content, slug, n_links in edits:
        raw = raw[:start_abs] + new_content + raw[end_abs:]
        applied += 1
        print(f'  OK: {slug} (+{n_links} link(s))')

    return raw, applied


def main():
    print(f'Reading {BLOG_TS} ...')
    with open(BLOG_TS, encoding='utf-8') as f:
        raw = f.read()

    raw_modified, applied = process(raw)

    # Safety check: ] must appear exactly once
    closing_count = len(re.findall(r'^\]$', raw_modified, re.MULTILINE))
    if closing_count != 1:
        print(f'ERROR: ] appears {closing_count} times (expected 1). Aborting.', file=sys.stderr)
        sys.exit(1)

    with open(BLOG_TS, 'w', encoding='utf-8') as f:
        f.write(raw_modified)

    print(f'\nDone. {applied} articles updated.')
    print(f'] bracket count: {closing_count} (OK)')


if __name__ == '__main__':
    main()
