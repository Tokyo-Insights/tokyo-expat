"""
blog_helpers.py - Helpers partages par les scripts d'intelligence.
But: ne JAMAIS re-proposer un article deja publie, ni surfacer des plateformes suspendues.
"""
import re
from pathlib import Path

BLOG_TS = Path(__file__).parent.parent / "lib" / "blog.ts"

# Plateformes HARO dont le compte est suspendu = pitchs impossibles = ne pas surfacer.
# Si un compte est reactive un jour, retirer sa source de ce set.
SUSPENDED_SOURCES = {"qwoted.com", "connectively.us"}

# Tokens trop generiques pour distinguer un sujet (evite les faux "deja publie").
_STOP = {
    "tokyo", "japan", "japon", "guide", "the", "to", "in", "of", "and", "for",
    "pour", "les", "des", "une", "avec", "sur", "est", "par", "que", "qui",
    "comment", "votre", "vos", "expat", "expatrie", "etranger",
}


def existing_slugs() -> list[str]:
    """Tous les slugs d'articles presents dans blog.ts (FR + EN), en minuscules."""
    if not BLOG_TS.exists():
        return []
    content = BLOG_TS.read_text(encoding="utf-8")
    return [s.lower() for s in re.findall(r"slug:\s*['\"]([^'\"]+)['\"]", content)]


def article_already_published(keywords, title: str = "", slugs=None) -> bool:
    """
    True si un article couvrant ce sujet existe deja dans blog.ts.
    Matching robuste: pour une phrase (keyword ou titre), on extrait ses tokens
    distinctifs (len>3, hors stopwords) et on considere le sujet couvert si TOUS
    ces tokens apparaissent dans un meme slug existant.
    """
    if slugs is None:
        slugs = existing_slugs()
    if not slugs:
        return False
    phrases = [p for p in (list(keywords) + ([title] if title else [])) if p]
    for ph in phrases:
        toks = [t for t in re.split(r"[^a-z0-9]+", ph.lower()) if len(t) > 3 and t not in _STOP]
        # Exiger >=2 tokens distinctifs: un seul token generique ("cost", "guide")
        # matcherait trop d'articles et produirait des faux "deja publie".
        if len(toks) < 2:
            continue
        if any(all(t in slug for t in toks) for slug in slugs):
            return True
    return False
