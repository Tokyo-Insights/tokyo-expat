# -*- coding: utf-8 -*-
"""
generate_price_chart.py -- Munition Reddit/distribution: graphique "haltere" (dumbbell)
de l'evolution des prix des coproprietes a Tokyo par arrondissement, 2021 -> present.

Lit lib/tokyoPriceTrends.json (data prix, source gardee SECRETE -> "recorded transactions").
Ecrit outreach/tokyo-price-trends.png (style coherent avec tokyo-rent-by-station.png).

Run: python scripts/generate_price_chart.py
"""
import json
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.ticker import FuncFormatter

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
DATA = ROOT / "lib" / "tokyoPriceTrends.json"
OUT = ROOT / "outreach" / "tokyo-price-trends.png"

d = json.loads(DATA.read_text(encoding="utf-8"))
yf = d["period_from"][:4]
yt = d["period_to"][:4]
pct_city = d["change_pct_citywide"]

# tri par prix 2025 croissant -> le plus cher en haut (comme le chart loyers)
wards = sorted(d["wards"], key=lambda w: w["median_last"])
names = [w["ward_en"] for w in wards]
first = [w["median_first"] for w in wards]
last = [w["median_last"] for w in wards]
pct = [w["pct"] for w in wards]
y = list(range(len(wards)))
xmax = max(last)

NAVY = "#12263f"
GREY = "#9aa7b5"
LINE = "#d3dae2"
RED = "#e84141"

fig, ax = plt.subplots(figsize=(11, 12))

# lignes de liaison + points
for i, w in enumerate(wards):
    ax.plot([w["median_first"], w["median_last"]], [i, i], color=LINE, lw=2.5, zorder=1, solid_capstyle="round")
ax.scatter(first, y, color=GREY, s=70, zorder=2, label=yf, edgecolors="white", linewidths=0.8)
ax.scatter(last, y, color=NAVY, s=85, zorder=3, label=yt, edgecolors="white", linewidths=0.8)

# annotation % de hausse a droite de chaque ligne
for i, w in enumerate(wards):
    ax.text(w["median_last"] + xmax * 0.015, i, f"+{w['pct']:.0f}%", va="center", ha="left",
            fontsize=9.5, color=RED, fontweight="bold")

ax.set_yticks(y)
ax.set_yticklabels(names, fontsize=10.5, color="#1f2937")
ax.set_xlim(0, xmax * 1.16)
ax.xaxis.set_major_formatter(FuncFormatter(lambda x, _: f"¥{x/1e6:.1f}M" if x > 0 else "0"))
ax.set_xlabel("Median sale price per square metre (JPY)", fontsize=12.5, color="#374151", labelpad=10)
ax.tick_params(axis="x", labelsize=10.5, colors="#4b5563")

for s in ["top", "right", "left"]:
    ax.spines[s].set_visible(False)
ax.spines["bottom"].set_color("#cbd5e1")
ax.xaxis.grid(True, color="#eef1f4", lw=1)
ax.set_axisbelow(True)
ax.margins(y=0.012)

# legende (coin bas droite, zone vide)
leg = ax.legend(loc="lower right", frameon=False, fontsize=12, title="Median price / m²",
                handletextpad=0.4, labelspacing=0.6)
leg.get_title().set_fontsize(10)
leg.get_title().set_color("#6b7280")

# titre + sous-titre (style coherent)
plt.subplots_adjust(top=0.905, bottom=0.105, left=0.16, right=0.965)
fig.suptitle("Tokyo condo prices climbed for four straight years",
             fontsize=21, fontweight="bold", color=NAVY, x=0.5, y=0.965)
fig.text(0.5, 0.925,
         f"Median sale price per m² by Tokyo ward, {yf} vs {yt}, from recorded transactions.  "
         f"Citywide +{pct_city:.0f}% in four years.",
         ha="center", fontsize=11.5, color="#6b7280")
ax.set_xlabel("Median sale price per square metre (JPY)", fontsize=12.5, color="#374151", labelpad=12)
fig.text(0.965, 0.018, "Source: tokyo-expat.com/data  ·  median, not average",
         ha="right", fontsize=9, color="#9ca3af")

fig.savefig(OUT, dpi=150, facecolor="white")
print(f"Ecrit: {OUT}")
print(f"Ville +{pct_city}% | plus forte hausse: {wards[-1]['ward_en'] if False else max(wards, key=lambda w: w['pct'])['ward_en']}")
