#!/usr/bin/env python3
"""
boost_furnished_premium_links.py
Ajoute UN lien interne "See also / A lire aussi" vers le nouvel article
furnished-vs-unfurnished-apartment-tokyo-cost (EN) / appartement-meuble-vs-non-meuble-tokyo-cout (FR)
depuis quelques articles MANUELS du cluster location/meuble qui n'y pointent pas encore.
100% additif, idempotent (skip si deja lie), controle securite (^]$ == 1). Sources manuelles
uniquement (les liens persistent, pas ecrases par une regeneration).

Reutilise la logique eprouvee de apply_internal_links.py (comme boost_furnished_links.py).

Usage: python scripts/boost_furnished_premium_links.py [--dry-run]
"""
import os
import re
import sys

from apply_internal_links import build_see_also_line, inject_into_content

BLOG_TS = os.path.join(os.path.dirname(__file__), '..', 'lib', 'blog.ts')
DRY_RUN = '--dry-run' in sys.argv

TARGET_EN = ('Furnished vs Unfurnished Apartments in Tokyo: The Real Cost',
             'furnished-vs-unfurnished-apartment-tokyo-cost')
TARGET_FR = ('Appartement meuble ou non a Tokyo : le vrai surcout',
             'appartement-meuble-vs-non-meuble-tokyo-cout')

# slug source -> (locale, target)
SOURCES = {
    'find-apartment-tokyo-foreigner':      ('en', TARGET_EN),
    'furnished-apartment-tokyo-no-guarantor': ('en', TARGET_EN),
    'tokyo-apartment-move-in-costs':       ('en', TARGET_EN),
    'furnished-apartment-tokyo-expats':    ('en', TARGET_EN),
    'trouver-appartement-tokyo-etranger':  ('fr', TARGET_FR),
    'appartement-meuble-tokyo-sans-garant': ('fr', TARGET_FR),
    'appartement-meuble-tokyo-expats':     ('fr', TARGET_FR),
}


def process(raw: str):
    slug_re = re.compile(r"slug:\s*'([^']+)'")
    positions = [(m.start(), m.group(1)) for m in slug_re.finditer(raw)]
    edits = []
    for i, (pos, slug) in enumerate(positions):
        if slug not in SOURCES:
            continue
        locale, target = SOURCES[slug]
        end = positions[i + 1][0] if i + 1 < len(positions) else len(raw)
        chunk = raw[pos:end]
        content_m = re.search(r'content:\s*`([\s\S]*?)`\.trim\(\)', chunk)
        if not content_m:
            content_m = re.search(r'content:\s*`([\s\S]*?)`\s*,?\s*\n\s*readingTime', chunk)
        if not content_m:
            print(f'  WARNING: content introuvable pour {slug}', file=sys.stderr)
            continue
        old_content = content_m.group(1)
        if target[1] in old_content:
            print(f'  SKIP (deja lie): {slug}')
            continue
        see_also = build_see_also_line([target], locale)
        new_content = inject_into_content(old_content, see_also, locale)
        if new_content == old_content:
            print(f'  SKIP (no change): {slug}')
            continue
        start_abs = pos + content_m.start(1)
        end_abs = pos + content_m.end(1)
        edits.append((start_abs, end_abs, new_content, slug, target[1]))

    edits.sort(key=lambda x: x[0], reverse=True)
    applied = 0
    for start_abs, end_abs, new_content, slug, tslug in edits:
        raw = raw[:start_abs] + new_content + raw[end_abs:]
        applied += 1
        print(f'  OK: {slug} -> +1 lien vers {tslug}')
    return raw, applied


def main():
    with open(BLOG_TS, encoding='utf-8') as f:
        raw = f.read()
    before = len(re.findall(r'^\]$', raw, re.MULTILINE))
    new_raw, applied = process(raw)
    after = len(re.findall(r'^\]$', new_raw, re.MULTILINE))
    print(f"\nControle securite: ']' seul -> avant={before}, apres={after}")
    if after != before or before != 1:
        print("  ABORT: structure modifiee. Aucune ecriture.")
        return
    if '\\`' in new_raw:
        print("  ABORT: backslash-backtick present. Aucune ecriture.")
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
