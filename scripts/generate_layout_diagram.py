# -*- coding: utf-8 -*-
"""
generate_layout_diagram.py -- Schema des layouts japonais (1K / 1DK / 1LDK / 2LDK)
avec la MEDIANE REELLE de loyer par layout depuis lib/tokyoRentIndex.json.
Repond a la confusion n1 de l'audience internationale ("c'est quoi un 1K ?").

Ecrit outreach/tokyo-layouts-en.png et outreach/tokyo-layouts-fr.png

  python scripts/generate_layout_diagram.py
"""
import json, io, sys, statistics
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, FancyBboxPatch

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
INDEX = ROOT / "lib" / "tokyoRentIndex.json"
NAVY = "#0f2744"
RED = "#e84141"
ROOM = "#1e3a5f"
SERVICE = "#c9d4e0"
GREY = "#6b7280"

d = json.loads(INDEX.read_text(encoding="utf-8"))

def median_for(layout):
    vals = [w["rents"][layout]["median"] for w in d["wards"] if w.get("rents", {}).get(layout)]
    return int(statistics.median(vals)) if vals else None

# (code, taille m2, taille sqft, description EN, description FR)
LAYOUTS = [
    ("1K",   "20-25 m2",  "215-270 sq ft", "One room + a small separate kitchen", "Une pièce + une petite cuisine séparée"),
    ("1DK",  "25-30 m2",  "270-320 sq ft", "One room + a dining-kitchen",         "Une pièce + une cuisine-repas"),
    ("1LDK", "35-45 m2",  "375-485 sq ft", "One room + living-dining-kitchen",    "Une pièce + salon-cuisine-repas"),
    ("2LDK", "55-70 m2",  "590-750 sq ft", "Two rooms + living-dining-kitchen",   "Deux pièces + salon-cuisine-repas"),
]

# plans schematiques : liste de (x, y, w, h, label, is_service)
PLANS = {
    "1K":   [(0.06, 0.06, 0.88, 0.58, "ROOM", False), (0.06, 0.68, 0.88, 0.26, "K", True)],
    "1DK":  [(0.06, 0.06, 0.88, 0.52, "ROOM", False), (0.06, 0.62, 0.88, 0.32, "DK", True)],
    "1LDK": [(0.06, 0.06, 0.88, 0.42, "ROOM", False), (0.06, 0.52, 0.88, 0.42, "LDK", True)],
    "2LDK": [(0.06, 0.06, 0.42, 0.42, "ROOM", False), (0.52, 0.06, 0.42, 0.42, "ROOM", False),
             (0.06, 0.52, 0.88, 0.42, "LDK", True)],
}


def build(locale):
    is_fr = locale == "fr"
    fig, axes = plt.subplots(1, 4, figsize=(13.5, 6.8))
    plt.subplots_adjust(top=0.62, bottom=0.16, left=0.03, right=0.97, wspace=0.16)

    for ax, (code, m2, sqft, desc_en, desc_fr) in zip(axes, LAYOUTS):
        ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis("off")
        ax.add_patch(FancyBboxPatch((0.03, 0.03), 0.94, 0.94,
                                    boxstyle="round,pad=0.005,rounding_size=0.03",
                                    fc="white", ec="#cbd5e1", lw=1.6, zorder=1))
        for (x, y, w, h, label, is_service) in PLANS[code]:
            ax.add_patch(Rectangle((x, y), w, h, fc=SERVICE if is_service else ROOM,
                                   ec="white", lw=2.2, zorder=2))
            ax.text(x + w / 2, y + h / 2, label, ha="center", va="center", zorder=3,
                    fontsize=10.5 if not is_service else 11,
                    color="white" if not is_service else NAVY, fontweight="bold")

        med = median_for(code)
        ax.text(0.5, 1.24, code, ha="center", va="center", fontsize=22,
                fontweight="bold", color=NAVY, transform=ax.transAxes)
        ax.text(0.5, 1.14, desc_fr if is_fr else desc_en, ha="center", va="center",
                fontsize=9.5, color=GREY, transform=ax.transAxes)
        ax.text(0.5, 1.06, f"{m2}  ({sqft})", ha="center", va="center",
                fontsize=9, color="#94a3b8", transform=ax.transAxes)
        if med:
            usd = round(med / 160 / 10) * 10
            ax.text(0.5, -0.11, f"{med/1000:.0f}k JPY   ~\\${usd:,.0f}", ha="center", va="center",
                    fontsize=12.5, fontweight="bold", color=RED, transform=ax.transAxes)

    title = ("Ce que signifient vraiment les plans japonais" if is_fr
             else "What Japanese apartment layouts actually mean")
    sub = ("Loyer mensuel médian à Tokyo par type, sur 528 660 annonces réelles actives. USD à ~160 JPY."
           if is_fr else
           "Median monthly rent in Tokyo by layout, from 528,660 real active listings. USD at ~160 JPY.")
    note = ("K = cuisine  ·  D = coin repas  ·  L = salon  ·  le chiffre = nombre de pièces"
            if is_fr else
            "K = kitchen  ·  D = dining area  ·  L = living area  ·  the number = how many rooms")
    fig.suptitle(title, fontsize=20.5, fontweight="bold", color=NAVY, y=0.965)
    fig.text(0.5, 0.905, sub, ha="center", fontsize=11.5, color=GREY)
    fig.text(0.5, 0.858, note, ha="center", fontsize=10, color="#94a3b8")
    fig.text(0.97, 0.025, "Source: tokyo-expat.com/data  ·  median, not average",
             ha="right", fontsize=8.5, color="#9ca3af")

    out = ROOT / "outreach" / f"tokyo-layouts-{locale}.png"
    fig.savefig(out, dpi=150, facecolor="white")
    plt.close(fig)
    print(f"Ecrit: {out}")


for loc in ("en", "fr"):
    build(loc)
print("Medianes utilisees:", {c: median_for(c) for c, *_ in LAYOUTS})
