#!/usr/bin/env python3
"""
boost_striking_links.py
Boost de maillage interne vers les 3 pages STRIKING-DISTANCE (GSC 01/08/2026):
  - gaijin-house-tokyo-guide (EN)       3440 impr, pos 18 -> priorite 1
  - logement-etudiant-tokyo-guide (FR)  858 impr, pos 19.5
  - expat-apartments-tokyo (EN)         283 impr, pos 19.5 (intention commerciale)

Ajoute une ligne "See also / A lire aussi" (ancre = titre riche en mot-cle) depuis
des articles connexes qui ne pointent pas encore dessus. 100% ADDITIF, zero-risque.
Reutilise la logique eprouvee (build_see_also_line + inject_into_content) + controle ] .

Usage: python scripts/boost_striking_links.py [--dry-run]
"""
import os
import re
import sys

from apply_internal_links import build_see_also_line, inject_into_content

BLOG_TS = os.path.join(os.path.dirname(__file__), '..', 'lib', 'blog.ts')
DRY_RUN = '--dry-run' in sys.argv

GAIJIN = ('Gaijin House Tokyo: Complete Guide for Foreigners (2026)', 'gaijin-house-tokyo-guide')
EXPAT = ('Expat Apartments in Tokyo: How to Find One in 2026', 'expat-apartments-tokyo')
ETUDIANT = ('Logement etudiant a Tokyo : guide complet pour francophones', 'logement-etudiant-tokyo-guide')

# source slug -> locale + cibles a lier
SOURCES = {
    # EN cluster -> gaijin-house + expat-apartments
    'share-house-tokyo-guide-2026':          ('en', [GAIJIN, EXPAT]),
    'gaijin-house-vs-share-house-tokyo':     ('en', [GAIJIN]),
    'find-apartment-tokyo-foreigner':        ('en', [GAIJIN]),
    'jiko-bukken-cheap-apartments-tokyo':    ('en', [GAIJIN]),
    'tokyo-apartment-hunting-from-abroad':   ('en', [GAIJIN, EXPAT]),
    'furnished-apartment-tokyo-top-5-expats':('en', [GAIJIN, EXPAT]),
    'tokyo-rent-by-neighborhood-2026':       ('en', [GAIJIN, EXPAT]),
    'tokyo-neighbourhoods-expats-guide':     ('en', [GAIJIN, EXPAT]),
    # FR cluster -> logement-etudiant
    'appartement-tokyo-septembre-guide':       ('fr', [ETUDIANT]),
    'share-house-tokyo-guide-complet':         ('fr', [ETUDIANT]),
    'trouver-appartement-tokyo-etranger':      ('fr', [ETUDIANT]),
    'chercher-appartement-tokyo-depuis-etranger':('fr', [ETUDIANT]),
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
        content_m = re.search(r'content:\s*`([\s\S]*?)`\.trim\(\)', chunk)
        if not content_m:
            content_m = re.search(r'content:\s*`([\s\S]*?)`\s*,?\s*\n\s*readingTime', chunk)
        if not content_m:
            print(f'  WARNING: content introuvable pour {slug}', file=sys.stderr)
            continue
        old_content = content_m.group(1)
        # anti-doublon par lien: ne garder que les cibles pas deja liees
        todo = [(t, s) for (t, s) in targets if f'/blog/{s})' not in old_content]
        if not todo:
            print(f'  SKIP (deja lie): {slug}')
            continue
        see_also = build_see_also_line(todo, locale)
        new_content = inject_into_content(old_content, see_also, locale)
        if new_content == old_content:
            print(f'  SKIP (no change): {slug}')
            continue
        start_abs = pos + content_m.start(1)
        end_abs = pos + content_m.end(1)
        edits.append((start_abs, end_abs, new_content, slug, len(todo)))

    edits.sort(key=lambda x: x[0], reverse=True)
    applied = 0
    links_total = 0
    for start_abs, end_abs, new_content, slug, n in edits:
        raw = raw[:start_abs] + new_content + raw[end_abs:]
        applied += 1
        links_total += n
        print(f'  OK: {slug} (+{n} lien(s))')
    return raw, applied, links_total


def main():
    with open(BLOG_TS, encoding='utf-8') as f:
        raw = f.read()
    before = len(re.findall(r'^\]$', raw, re.MULTILINE))

    new_raw, applied, links_total = process(raw)

    after = len(re.findall(r'^\]$', new_raw, re.MULTILINE))
    backtick_bug = new_raw.count('\\`')
    print(f"\nControle: ']' seul sur sa ligne avant={before} apres={after} | backslash-backtick={backtick_bug}")
    if before != 1 or after != 1:
        print("  ABORT: structure du tableau modifiee/inattendue. Aucune ecriture.")
        return
    if backtick_bug:
        print("  ABORT: backslash-backtick detecte (casserait le build). Aucune ecriture.")
        return
    if applied == 0:
        print("Aucun changement.")
        return
    if DRY_RUN:
        print(f"[DRY-RUN] {applied} articles, {links_total} lien(s) seraient ajoutes. Aucune ecriture.")
        return
    with open(BLOG_TS, 'w', encoding='utf-8') as f:
        f.write(new_raw)
    print(f"{applied} articles mis a jour, {links_total} lien(s) internes ajoutes. blog.ts ecrit.")


if __name__ == '__main__':
    main()
