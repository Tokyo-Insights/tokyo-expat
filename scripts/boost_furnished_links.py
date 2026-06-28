#!/usr/bin/env python3
"""
boost_furnished_links.py
Ajoute UN lien interne "See also" vers la page cible
furnished-apartment-tokyo-top-5-expats (461 impressions GSC, pos ~35)
depuis 3 articles du cluster "apartment for foreigners in tokyo" qui n'y
pointent pas encore. Action 100% additive (zero-risque SEO).

Reutilise la logique d'injection eprouvee de apply_internal_links.py
+ controle de securite (] exactement 1 fois).

Usage: python scripts/boost_furnished_links.py [--dry-run]
"""
import os
import re
import sys

from apply_internal_links import build_see_also_line, inject_into_content

BLOG_TS = os.path.join(os.path.dirname(__file__), '..', 'lib', 'blog.ts')
DRY_RUN = '--dry-run' in sys.argv

TARGET = ('Furnished Apartment Tokyo: 5 Best Options for Expats in 2026',
          'furnished-apartment-tokyo-top-5-expats')

# Source articles (EN cluster) -> ajoutent un lien vers TARGET
SOURCES = {
    'find-apartment-tokyo-foreigner':    'en',
    'tokyo-apartment-hunting-from-abroad': 'en',
    'jiko-bukken-cheap-apartments-tokyo': 'en',
    'tokyo-rental-traps-foreigners': 'en',
    'tokyo-rent-by-neighborhood-2026': 'en',
    'guarantor-japan-rental-foreigner': 'en',
    'rental-application-rejected-japan-foreigner': 'en',
    'share-house-tokyo-guide-2026': 'en',
}


def process(raw: str):
    slug_re = re.compile(r"slug:\s*'([^']+)'")
    positions = [(m.start(), m.group(1)) for m in slug_re.finditer(raw)]
    edits = []
    for i, (pos, slug) in enumerate(positions):
        if slug not in SOURCES:
            continue
        end = positions[i + 1][0] if i + 1 < len(positions) else len(raw)
        chunk = raw[pos:end]
        content_m = re.search(r'content:\s*`([\s\S]*?)`\.trim\(\)', chunk)
        if not content_m:
            content_m = re.search(r'content:\s*`([\s\S]*?)`\s*,?\s*\n\s*readingTime', chunk)
        if not content_m:
            print(f'  WARNING: content introuvable pour {slug}', file=sys.stderr)
            continue
        old_content = content_m.group(1)
        # garde anti-doublon : si la cible est deja liee, on saute
        if TARGET[1] in old_content:
            print(f'  SKIP (deja lie): {slug}')
            continue
        see_also = build_see_also_line([TARGET], SOURCES[slug])
        new_content = inject_into_content(old_content, see_also, SOURCES[slug])
        if new_content == old_content:
            print(f'  SKIP (no change): {slug}')
            continue
        start_abs = pos + content_m.start(1)
        end_abs = pos + content_m.end(1)
        edits.append((start_abs, end_abs, new_content, slug))

    edits.sort(key=lambda x: x[0], reverse=True)
    applied = 0
    for start_abs, end_abs, new_content, slug in edits:
        raw = raw[:start_abs] + new_content + raw[end_abs:]
        applied += 1
        print(f'  OK: {slug} -> +1 lien vers {TARGET[1]}')
    return raw, applied


def main():
    with open(BLOG_TS, encoding='utf-8') as f:
        raw = f.read()
    before_brackets = len(re.findall(r'^\]$', raw, re.MULTILINE))

    new_raw, applied = process(raw)

    after_brackets = len(re.findall(r'^\]$', new_raw, re.MULTILINE))
    print(f"\nControle securite: ']' seul sur sa ligne -> avant={before_brackets}, apres={after_brackets}")
    if after_brackets != before_brackets or before_brackets != 1:
        print("  ABORT: structure du tableau modifiee ou inattendue. Aucune ecriture.")
        return
    if applied == 0:
        print("Aucun changement.")
        return
    if DRY_RUN:
        print(f"[DRY-RUN] {applied} lien(s) seraient ajoutes. Aucune ecriture.")
        return
    with open(BLOG_TS, 'w', encoding='utf-8') as f:
        f.write(new_raw)
    print(f"{applied} lien(s) ajoutes. blog.ts ecrit.")


if __name__ == '__main__':
    main()
