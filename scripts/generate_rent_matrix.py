# -*- coding: utf-8 -*-
"""tokyo-rent-matrix.png -- MATRICE loyer: 23 arrondissements x 8 tailles.

Pourquoi cette forme: toutes les munitions precedentes sont des barres/points
alignes (meme silhouette -> lassitude). Une matrice a une silhouette
COMPLETEMENT differente dans un fil Reddit, et repond a la question que se pose
vraiment le lecteur: "moi, dans MON quartier, pour MA taille de logement".
Chacun cherche sa case = moteur de partage.

Regles dataviz: magnitude sur 2 dimensions categorielles -> heatmap. Couleur
SEQUENTIELLE une seule teinte (clair->fonce), jamais d'arc-en-ciel, jamais
rouge/vert. Texte en encre neutre (blanc sur cases foncees pour le contraste).
"""
import json
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.colors import LinearSegmentedColormap, Normalize

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
DATA = ROOT / "lib" / "tokyoRentIndex.json"
OUT = ROOT / "outreach" / "tokyo-rent-matrix.png"

d = json.loads(DATA.read_text(encoding="utf-8"))
LAYOUTS = ["1R", "1K", "1DK", "1LDK", "2K", "2DK", "2LDK", "3LDK"]
PRETTY = {"1R": "1R\nstudio", "1K": "1K\nstudio", "1DK": "1DK", "1LDK": "1LDK\ncouple",
          "2K": "2K", "2DK": "2DK", "2LDK": "2LDK\nfamily", "3LDK": "3LDK"}

# retirer les colonnes trop vides (ex: 1R n'existe dans aucun ward -> colonne fantome)
_w = d["wards"]
LAYOUTS = [l for l in LAYOUTS
           if sum(1 for w in _w if w["rents"].get(l, {}).get("median")) >= len(_w) * 0.5]

wards = d["wards"]
# tri par loyer 1K (le plus universel) croissant -> le moins cher en bas
wards = sorted(wards, key=lambda w: w["rents"].get("1K", {}).get("median", 1e9), reverse=True)
names = [w["ward_en"] for w in wards]

M = np.full((len(wards), len(LAYOUTS)), np.nan)
for i, w in enumerate(wards):
    for j, lay in enumerate(LAYOUTS):
        v = w["rents"].get(lay, {}).get("median")
        if v:
            M[i, j] = v / 1000.0  # en milliers de yens

INK = "#1f2937"
MUTED = "#6b7280"
ramp = LinearSegmentedColormap.from_list(
    "rent", ["#eef3f9", "#b9d0e8", "#5b8fc9", "#1f4e88", "#0b2545"])
vals = M[~np.isnan(M)]
norm = Normalize(vmin=np.percentile(vals, 2), vmax=np.percentile(vals, 98))

fig, ax = plt.subplots(figsize=(12.5, 13.5))
ax.set_facecolor("white")

for i in range(len(wards)):
    for j in range(len(LAYOUTS)):
        v = M[i, j]
        if np.isnan(v):
            ax.add_patch(plt.Rectangle((j, i), 0.94, 0.92, facecolor="#f3f4f6",
                                       edgecolor="white", lw=2))
            ax.text(j + 0.47, i + 0.46, "–", ha="center", va="center",
                    fontsize=11, color="#c3c8cf")
            continue
        c = ramp(norm(v))
        ax.add_patch(plt.Rectangle((j, i), 0.94, 0.92, facecolor=c, edgecolor="white", lw=2))
        # encre lisible: blanc sur fond fonce, encre sombre sur fond clair
        lum = 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]
        ax.text(j + 0.47, i + 0.46, f"{v:.0f}k", ha="center", va="center",
                fontsize=11.5, fontweight="bold",
                color="white" if lum < 0.55 else INK)

ax.set_xlim(0, len(LAYOUTS)); ax.set_ylim(len(wards), 0)
ax.set_xticks([j + 0.47 for j in range(len(LAYOUTS))])
ax.set_xticklabels([PRETTY[l] for l in LAYOUTS], fontsize=12, color=INK, fontweight="bold")
ax.xaxis.set_ticks_position("top")
ax.set_yticks([i + 0.46 for i in range(len(wards))])
ax.set_yticklabels(names, fontsize=12, color=INK)
ax.tick_params(length=0)
for s in ax.spines.values():
    s.set_visible(False)

plt.subplots_adjust(top=0.876, bottom=0.045, left=0.135, right=0.985)
fig.suptitle("The entire Tokyo rent market, in one chart",
             fontsize=25, fontweight="bold", color="#0b2545", x=0.5, y=0.972)
fig.text(0.5, 0.933,
         "Median monthly rent in thousands of yen, by ward and apartment size. "
         f"{d['total_listings']:,} active listings.",
         ha="center", fontsize=12.5, color=MUTED)
fig.text(0.5, 0.911, "Find your ward, find your size. Darker = pricier.",
         ha="center", fontsize=12.5, color=MUTED)
_note = "  ·  – = too few listings" if np.isnan(M).any() else ""
fig.text(0.985, 0.014, f"Source: tokyo-expat.com/data  ·  median, not average{_note}",
         ha="right", fontsize=9.5, color="#9ca3af")

fig.savefig(OUT, dpi=150, facecolor="white")
print("Ecrit:", OUT)
print("wards:", len(wards), "| layouts:", len(LAYOUTS),
      "| cases remplies:", int((~np.isnan(M)).sum()), "/", M.size)
