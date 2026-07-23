# -*- coding: utf-8 -*-
"""tokyo-price-growth.png -- version REDDIT du chart prix: lecture immediate.

Pourquoi un 2e chart et pas une modif du dumbbell:
  - dumbbell (generate_price_chart.py) = pour l'ARTICLE (montre niveau ET evolution,
    le lecteur a le temps).
  - barres classees (ici) = pour REDDIT (une seule variable, l'oeil comprend en 1s).
Regles dataviz appliquees: forme choisie par le job (magnitude/rang -> barres),
couleur SEQUENTIELLE 1 seule teinte claire->foncee (jamais d'arc-en-ciel, jamais
rouge/vert = 8% des hommes ne les distinguent pas), texte en encre neutre (jamais
la couleur de la serie), grille recessive.
"""
import json
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.ticker import FuncFormatter
from matplotlib.colors import LinearSegmentedColormap, Normalize

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "lib" / "tokyoPriceTrends.json"  # meme source que le dumbbell
OUT = ROOT / "outreach" / "tokyo-price-growth.png"

d = json.loads(DATA.read_text(encoding="utf-8"))
yf, yt = d["period_from"][:4], d["period_to"][:4]
pct_city = d["change_pct_citywide"]

# tri par HAUSSE (c'est l'histoire), la plus forte en haut
wards = sorted(d["wards"], key=lambda w: w["pct"])
names = [w["ward_en"] for w in wards]
pcts = [w["pct"] for w in wards]

INK = "#1f2937"
MUTED = "#6b7280"
# rampe SEQUENTIELLE une seule teinte (clair -> rouge profond de la marque)
ramp = LinearSegmentedColormap.from_list("heat", ["#fde2dd", "#f7a08e", "#e84141", "#8c1c13"])
norm = Normalize(vmin=min(pcts) * 0.85, vmax=max(pcts))
colors = [ramp(norm(p)) for p in pcts]

fig, ax = plt.subplots(figsize=(11, 10))
bars = ax.barh(range(len(wards)), pcts, color=colors, height=0.72, zorder=2)

for i, p in enumerate(pcts):
    ax.text(p + max(pcts) * 0.012, i, f"+{p:.0f}%", va="center", ha="left",
            fontsize=11, color=INK, fontweight="bold")

ax.set_yticks(range(len(wards)))
ax.set_yticklabels(names, fontsize=11.5, color=INK)
ax.set_xlim(0, max(pcts) * 1.12)
ax.xaxis.set_major_formatter(FuncFormatter(lambda x, _: f"+{x:.0f}%" if x > 0 else "0"))
ax.set_xlabel(f"Change in median sale price per m², {yf} to {yt}", fontsize=12.5,
              color="#374151", labelpad=10)
ax.tick_params(axis="x", labelsize=10.5, colors="#4b5563")
for s in ["top", "right", "left"]:
    ax.spines[s].set_visible(False)
ax.spines["bottom"].set_color("#cbd5e1")
ax.xaxis.grid(True, color="#eef1f4", lw=1)
ax.set_axisbelow(True)
ax.margins(y=0.012)

plt.subplots_adjust(top=0.872, bottom=0.10, left=0.155, right=0.965)
fig.suptitle("Tokyo condo prices rose in every ward, but far from equally",
             fontsize=21, fontweight="bold", color="#12263f", x=0.5, y=0.977)
fig.text(0.5, 0.922,
         f"Median sale price per m² by Tokyo ward, {yf} vs {yt}, from recorded transactions.",
         ha="center", fontsize=11.5, color=MUTED)
fig.text(0.5, 0.896, f"Citywide +{pct_city:.0f}%. Darker bar = bigger rise.",
         ha="center", fontsize=11.5, color=MUTED)
fig.text(0.965, 0.017, "Source: tokyo-expat.com/data  ·  median, not average",
         ha="right", fontsize=9, color="#9ca3af")

fig.savefig(OUT, dpi=150, facecolor="white")
print("Ecrit:", OUT)
print(f"min +{min(pcts):.0f}% | max +{max(pcts):.0f}% | ville +{pct_city:.1f}%")
