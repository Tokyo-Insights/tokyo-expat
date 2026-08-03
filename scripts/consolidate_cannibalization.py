#!/usr/bin/env python3
"""
consolidate_cannibalization.py
Anti-cannibalisation (deep analytics 03/08): concentre le signal de maillage sur
la page CANONIQUE de chaque cluster commercial, pour que Google cesse de repartir
le classement entre 2 pages concurrentes.

Canoniques renforcees (celles qui rankent MIEUX mais sont sous-liees):
- expat-apartments-tokyo (pos 14, 6 liens entrants) <- cluster "expat apartments tokyo"
- furnished-apartments-tokyo-guide (pos 25) <- cluster "furnished apartments tokyo (long term)"
(gaijin-house-tokyo-guide deja a 29 liens = ok.)

Ancre = titre (riche en mot-cle). Additif, anti-doublon, controle ^]$ / backtick.
Usage: python scripts/consolidate_cannibalization.py [--dry-run]
"""
import os, re, sys
from apply_internal_links import build_see_also_line, inject_into_content

BLOG_TS = os.path.join(os.path.dirname(__file__), '..', 'lib', 'blog.ts')
DRY = '--dry-run' in sys.argv

EXPAT = ('Expat Apartments in Tokyo: How to Find One in 2026', 'expat-apartments-tokyo')
FURN = ('Furnished Apartments in Tokyo: The Complete Guide for Foreigners (2026)',
        'furnished-apartments-tokyo-guide')

# source -> (locale, cibles canoniques). anti-doublon filtre celles deja liees.
SOURCES = {
    'tokyo-rental-traps-foreigners':          ('en', [EXPAT, FURN]),
    'guarantor-japan-rental-foreigner':       ('en', [EXPAT]),
    'furnished-apartment-tokyo-no-guarantor': ('en', [EXPAT]),
    'share-house-tokyo-guide-2026':           ('en', [FURN]),
    'tokyo-rent-by-neighborhood-2026':        ('en', [FURN]),
    'tokyo-neighbourhoods-expats-guide':      ('en', [FURN]),
}


def process(raw):
    slug_re = re.compile(r"slug:\s*'([^']+)'")
    positions = [(m.start(), m.group(1)) for m in slug_re.finditer(raw)]
    edits = []
    for i, (pos, slug) in enumerate(positions):
        if slug not in SOURCES:
            continue
        locale, targets = SOURCES[slug]
        end = positions[i + 1][0] if i + 1 < len(positions) else len(raw)
        chunk = raw[pos:end]
        cm = re.search(r'content:\s*`([\s\S]*?)`\.trim\(\)', chunk) or \
             re.search(r'content:\s*`([\s\S]*?)`\s*,?\s*\n\s*readingTime', chunk)
        if not cm:
            print(f'  WARNING content introuvable: {slug}', file=sys.stderr); continue
        old = cm.group(1)
        todo = [(t, s) for (t, s) in targets if f'/blog/{s})' not in old]
        if not todo:
            print(f'  SKIP (deja lie): {slug}'); continue
        see = build_see_also_line(todo, locale)
        new = inject_into_content(old, see, locale)
        if new == old:
            print(f'  SKIP (no change): {slug}'); continue
        edits.append((pos + cm.start(1), pos + cm.end(1), new, slug, len(todo)))

    edits.sort(key=lambda x: x[0], reverse=True)
    n = links = 0
    for a, b, new, slug, k in edits:
        raw = raw[:a] + new + raw[b:]; n += 1; links += k
        print(f'  OK: {slug} (+{k})')
    return raw, n, links


def main():
    with open(BLOG_TS, encoding='utf-8') as f:
        raw = f.read()
    before = len(re.findall(r'^\]$', raw, re.MULTILINE))
    new_raw, n, links = process(raw)
    after = len(re.findall(r'^\]$', new_raw, re.MULTILINE))
    bt = new_raw.count('\\`')
    print(f"\nControle: ']'={before}->{after} | backslash-backtick={bt}")
    if before != 1 or after != 1 or bt:
        print("  ABORT."); return
    if n == 0:
        print("Aucun changement."); return
    if DRY:
        print(f"[DRY-RUN] {n} pages, {links} liens."); return
    with open(BLOG_TS, 'w', encoding='utf-8') as f:
        f.write(new_raw)
    print(f"{n} pages, {links} liens de consolidation ajoutes. blog.ts ecrit.")


if __name__ == '__main__':
    main()
