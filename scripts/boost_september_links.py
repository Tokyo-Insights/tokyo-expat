#!/usr/bin/env python3
"""
boost_september_links.py
Ajoute UN lien interne "See also / A lire aussi" vers les articles de saison septembre
(find-apartment-tokyo-september EN / appartement-tokyo-septembre-guide FR) depuis les
guides location du cluster, pour capter le trafic de la rentree (pic sept, imminent).
100% additif, idempotent, controle securite (^]$ == 1). Sources manuelles.

Usage: python scripts/boost_september_links.py [--dry-run]
"""
import os, re, sys
from apply_internal_links import build_see_also_line, inject_into_content

BLOG_TS = os.path.join(os.path.dirname(__file__), '..', 'lib', 'blog.ts')
DRY_RUN = '--dry-run' in sys.argv

TARGET_EN = ('Finding an Apartment in Tokyo in September: What Changes vs Spring',
             'find-apartment-tokyo-september')
TARGET_FR = ('Trouver un appartement a Tokyo en septembre : ce qui change vs le printemps',
             'appartement-tokyo-septembre-guide')

SOURCES = {
    'find-apartment-tokyo-foreigner':     ('en', TARGET_EN),
    'tokyo-apartment-move-in-costs':      ('en', TARGET_EN),
    'trouver-appartement-tokyo-etranger': ('fr', TARGET_FR),
    'quartiers-tokyo-expatries-guide':    ('fr', TARGET_FR),
}


def process(raw):
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
        old = content_m.group(1)
        if target[1] in old:
            print(f'  SKIP (deja lie): {slug}')
            continue
        new = inject_into_content(old, build_see_also_line([target], locale), locale)
        if new == old:
            print(f'  SKIP (no change): {slug}')
            continue
        edits.append((pos + content_m.start(1), pos + content_m.end(1), new, slug, target[1]))
    edits.sort(key=lambda x: x[0], reverse=True)
    applied = 0
    for s, e, new, slug, tslug in edits:
        raw = raw[:s] + new + raw[e:]
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
    if after != before or before != 1 or '\\`' in new_raw:
        print("  ABORT: structure modifiee ou backslash-backtick. Aucune ecriture.")
        return
    if applied == 0:
        print("Aucun changement.")
        return
    if DRY_RUN:
        print(f"[DRY-RUN] {applied} lien(s) seraient ajoutes.")
        return
    with open(BLOG_TS, 'w', encoding='utf-8') as f:
        f.write(new_raw)
    print(f"{applied} lien(s) ajoutes. blog.ts ecrit.")


if __name__ == '__main__':
    main()
