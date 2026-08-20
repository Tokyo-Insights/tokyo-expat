# -*- coding: utf-8 -*-
"""
Chart VERTICAL pour le short M7 "furnished premium" (EN + FR).
Lit lib/furnishedPremium.json (data EXISTANTE, on ne recalcule rien, on ne touche pas
a l'asset live). Selectionne un sous-ensemble de wards CONTRASTES (les plus chers = faible
surcoût vs les moins chers = fort surcoût) pour rester lisible en 9:16 sur mobile.
Sort: outreach/furnished-premium-short-en.png + -fr.png
Regle design: 1 teinte navy (couleur ENCODE le loyer standard), titre = l'insight, source cachee.
"""
import json, io, sys
from pathlib import Path
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

HERE = Path(__file__).resolve().parent.parent   # tokyo-expat/
JSON = HERE / "lib" / "furnishedPremium.json"
NAVY = '#0f2744'
ACCENT = '#e84141'

TXT = {
    "en": {
        "title": "Furnished costs the MOST where rent is CHEAPEST",
        "sub": "Extra monthly cost of a furnished 1K studio vs a standard one, by ward",
        "foot": "Bar colour: darker = pricier ward.   Source: tokyo-expat.com",
        "out": "furnished-premium-short-en.png",
    },
    "fr": {
        "title": "Le meublé coûte le PLUS cher là où le loyer est le MOINS cher",
        "sub": "Surcoût mensuel d'un studio 1K meublé vs standard, par arrondissement",
        "foot": "Couleur des barres : plus foncé = arrondissement plus cher.   Source : tokyo-expat.com",
        "out": "furnished-premium-short-fr.png",
    },
}


def pick(wards):
    """3 wards les moins chers en premium (chers) + 4 plus fort premium (bon marche) = contraste."""
    ws = sorted(wards, key=lambda w: w["premium"])
    low = ws[:3]                 # Minato, Chiyoda, Shibuya... (faible surcoût)
    high = ws[-4:]               # les 4 plus forts surcoûts (wards bon marche)
    sel = low + high
    # dedupe en gardant l'ordre, tri final par premium croissant
    seen, out = set(), []
    for w in sel:
        if w["ward"] not in seen:
            seen.add(w["ward"]); out.append(w)
    return sorted(out, key=lambda w: w["premium"])


def render(lang, wards):
    t = TXT[lang]
    d = pick(wards)
    prem = np.array([w["premium"] * 100 for w in d])
    std = np.array([w["std"] for w in d])
    names = [w["ward"] for w in d]
    cmap = LinearSegmentedColormap.from_list('navy', ['#a9bcd4', '#3d5c82', NAVY])
    norm = (std - std.min()) / (std.max() - std.min() + 1e-9)
    colors = [cmap(x) for x in norm]

    fig, ax = plt.subplots(figsize=(9.6, 10.8), dpi=130)   # ~portrait pour le 9:16
    fig.patch.set_facecolor('white'); ax.set_facecolor('white')
    y = np.arange(len(d))
    ax.barh(y, prem, color=colors, height=0.68, zorder=3)
    ax.set_yticks(y); ax.set_yticklabels(names, fontsize=20, color=NAVY)
    for i, w in enumerate(d):
        p = w["premium"] * 100
        col = ACCENT if p >= 70 else NAVY   # accent rouge sur les gros surcoûts (le "piege")
        ax.text(p + 1.5, i, f"+{p:.0f}%", va='center', ha='left',
                fontsize=19, fontweight='bold', color=col)
        ax.text(-3, i, f"{w['std']/1000:.0f}k → {w['furn']/1000:.0f}k", va='center', ha='right',
                fontsize=13, color='#7c8aa0')
    ax.set_xlim(-42, max(prem) + 16); ax.set_xticks([])
    for s in ['top', 'right', 'bottom', 'left']: ax.spines[s].set_visible(False)
    ax.invert_yaxis()
    fig.suptitle(t["title"], x=0.5, y=0.985, fontsize=22, fontweight='bold', color=NAVY, ha='center', wrap=True)
    ax.set_title(t["sub"], fontsize=13.5, color='#5a6b82', pad=60, wrap=True)
    fig.text(0.5, 0.03, t["foot"], ha='center', fontsize=12, color='#8a97a8')
    plt.subplots_adjust(left=0.24, right=0.93, top=0.80, bottom=0.09)
    out = HERE / "outreach" / t["out"]
    plt.savefig(out, facecolor='white', bbox_inches='tight')
    plt.close()
    print(f"  {lang} -> {out}  ({len(d)} wards, +{prem.min():.0f}% a +{prem.max():.0f}%)")


def main():
    data = json.loads(JSON.read_text(encoding='utf-8'))
    wards = data["wards"]
    print(f"Chart short furnished premium ({len(wards)} wards dispo):")
    for lang in ("en", "fr"):
        render(lang, wards)


if __name__ == "__main__":
    main()
