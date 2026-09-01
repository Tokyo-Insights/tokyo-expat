# -*- coding: utf-8 -*-
"""
generate_center_premium_chart.py -- Munition Reddit "center-premium-over-time".

Serie temporelle: prix median des coproprietes au m2, centre de Tokyo (5 wards)
vs les 18 autres wards, 2021 Q1 -> 2025 Q3. Montre que l'ecart se creuse.

Lit lib/tokyoPriceHistory.json (milliers de yen / m2, source gardee SECRETE
-> formuler "recorded transactions", JAMAIS nommer la source officielle).
Ecrit outreach/tokyo-center-premium.png

⚠️ Les medianes trimestrielles brutes sont bruitees (ex: centre 1778 en 2025 Q2
puis 1667 en Q3). Sur r/dataisbeautiful, une conclusion tiree de 2 points bruts
est indefendable -> on trace la MOYENNE MOBILE 4 TRIMESTRES (annoncee dans le
sous-titre) et le titre ne dit que ce que la courbe lissee prouve.

Palette validee (validate_palette.js, mode light, ALL CHECKS PASS):
  centre #2f6fb0 / peripherie #c9762d -- separation CVD dE 21.7 (protan).
  Le navy #12263f reste une couleur de TEXTE, pas une couleur de serie
  (il echoue la bande de luminosite et le plancher de chroma).

Run: python scripts/generate_center_premium_chart.py
"""
import json
import statistics as st
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.ticker import FuncFormatter

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
DATA = ROOT / "lib" / "tokyoPriceHistory.json"
OUT = ROOT / "outreach" / "tokyo-center-premium.png"

# 都心5区 -- definition conventionnelle, annoncee en sous-titre pour rester defendable
CENTRAL_5 = ["Chiyoda", "Chuo", "Minato", "Shinjuku", "Shibuya"]
WINDOW = 4  # trimestres

INK = "#12263f"
INK_SOFT = "#6b7280"
CENTRE = "#2f6fb0"
OUTER = "#c9762d"
GAP_FILL = "#e9eef3"
GRID = "#eef1f4"

d = json.loads(DATA.read_text(encoding="utf-8"))
quarters = d["quarters"]
prices = d["prices"]
outer_wards = [w for w in prices if w not in CENTRAL_5]

centre_raw = [st.median([prices[w][i] for w in CENTRAL_5]) for i in range(len(quarters))]
outer_raw = [st.median([prices[w][i] for w in outer_wards]) for i in range(len(quarters))]


def rolling(values, k=WINDOW):
    """Moyenne mobile a k trimestres; les k-1 premiers points sont vides."""
    return [None if i < k - 1 else sum(values[i - k + 1:i + 1]) / k for i in range(len(values))]


centre_s = rolling(centre_raw)
outer_s = rolling(outer_raw)

start = WINDOW - 1
x = list(range(len(quarters)))[start:]
labels = quarters[start:]
c = centre_s[start:]
o = outer_s[start:]

gap_first, gap_last = c[0] - o[0], c[-1] - o[-1]
ratio_first, ratio_last = c[0] / o[0], c[-1] / o[-1]
growth_c = (c[-1] / c[0] - 1) * 100
growth_o = (o[-1] / o[0] - 1) * 100

fig, ax = plt.subplots(figsize=(12, 7))

# la zone entre les deux courbes EST le sujet du graphique
ax.fill_between(x, o, c, color=GAP_FILL, zorder=1)

ax.plot(x, c, color=CENTRE, lw=2.6, zorder=3, solid_capstyle="round")
ax.plot(x, o, color=OUTER, lw=2.6, zorder=3, solid_capstyle="round")
# marqueurs aux extremites uniquement (pas un point sur chaque trimestre)
for xs, ys, col in ((x[0], c[0], CENTRE), (x[-1], c[-1], CENTRE),
                    (x[0], o[0], OUTER), (x[-1], o[-1], OUTER)):
    ax.scatter([xs], [ys], s=90, color=col, zorder=4, edgecolors="white", linewidths=2)

# etiquettes directes (identite jamais portee par la couleur seule)
ax.text(x[-1] - 0.25, c[-1] + 62, "Central 5 wards", color=CENTRE, fontsize=13,
        fontweight="bold", ha="right", va="bottom")
ax.text(x[-1] - 0.25, o[-1] - 70, "The other 18 wards", color=OUTER, fontsize=13,
        fontweight="bold", ha="right", va="top")

# l'ecart, chiffre aux deux extremites
for xs, lo, hi, gap, side in ((x[0], o[0], c[0], gap_first, 1), (x[-1], o[-1], c[-1], gap_last, -1)):
    ax.annotate("", xy=(xs, hi), xytext=(xs, lo),
                arrowprops=dict(arrowstyle="<->", color="#94a3b8", lw=1.4, shrinkA=0, shrinkB=0))
    ax.text(xs + 0.22 * side, (hi + lo) / 2, f"gap\n¥{gap/1000:.2f}M/m²",
            ha="left" if side > 0 else "right", va="center",
            fontsize=11, color="#475569", fontweight="bold", linespacing=1.35)

ax.set_xticks(x[::2])
ax.set_xticklabels(labels[::2], fontsize=10.5, color="#4b5563")
ax.yaxis.set_major_formatter(FuncFormatter(lambda v, _: f"¥{v/1000:.1f}M"))
ax.tick_params(axis="y", labelsize=10.5, colors="#4b5563")
ax.set_ylabel("Median sale price per square metre (JPY)", fontsize=12, color="#374151", labelpad=10)
ax.set_xlim(x[0] - 0.9, x[-1] + 0.9)
ax.set_ylim(min(o) - 190, max(c) + 190)

for s in ["top", "right", "left"]:
    ax.spines[s].set_visible(False)
ax.spines["bottom"].set_color("#cbd5e1")
ax.yaxis.grid(True, color=GRID, lw=1)
ax.set_axisbelow(True)

# legende presente en plus des etiquettes directes (regle >= 2 series)
handles = [plt.Line2D([], [], color=CENTRE, lw=2.6,
                      label="Central 5 (Chiyoda, Chuo, Minato, Shinjuku, Shibuya)"),
           plt.Line2D([], [], color=OUTER, lw=2.6, label="Other 18 wards")]
ax.legend(handles=handles, loc="upper left", frameon=False, fontsize=10, labelspacing=0.5)

# ⚠️ verifie visuellement: en top=0.855 / y=0.968 le titre CHEVAUCHE le sous-titre.
# Garder de l'air entre les 3 lignes (titre 0.955, sous-titres 0.895 et 0.858).
plt.subplots_adjust(top=0.805, bottom=0.105, left=0.088, right=0.975)
fig.suptitle("Tokyo's centre is pulling away from the rest of the city",
             fontsize=20, fontweight="bold", color=INK, x=0.5, y=0.955)
fig.text(0.5, 0.895,
         "Median condo sale price per m², central 5 wards vs the other 18, "
         "4-quarter rolling average, from recorded transactions.",
         ha="center", fontsize=11.5, color=INK_SOFT)
fig.text(0.5, 0.858,
         f"The gap nearly doubled in four years: ¥{gap_first/1000:.2f}M to "
         f"¥{gap_last/1000:.2f}M per m² ({ratio_first:.2f}x to {ratio_last:.2f}x). "
         f"Centre +{growth_c:.0f}%, the rest +{growth_o:.0f}%.",
         ha="center", fontsize=11.5, color=INK_SOFT)
fig.text(0.975, 0.018, "Source: tokyo-expat.com/data  ·  medians, not averages",
         ha="right", fontsize=9, color="#9ca3af")

fig.savefig(OUT, dpi=150, facecolor="white")
print(f"Ecrit: {OUT}")
print(f"Periode lissee: {labels[0]} -> {labels[-1]}")
print(f"gap {gap_first:.0f} -> {gap_last:.0f} (x{gap_last/gap_first:.2f}) | "
      f"ratio {ratio_first:.2f} -> {ratio_last:.2f}")
print(f"centre +{growth_c:.1f}% | outer +{growth_o:.1f}%")
