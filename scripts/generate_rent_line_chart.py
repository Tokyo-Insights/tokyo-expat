# -*- coding: utf-8 -*-
"""
generate_rent_line_chart.py -- Munition Reddit: loyer 1K median par LIGNE de train de Tokyo.
Barres horizontales (style coherent avec tokyo-rent-by-station), depuis lib/tokyoRentIndex.json.
Ecrit outreach/tokyo-rent-by-line.png.  Source data gardee secrete (compiled from listings).

  python scripts/generate_rent_line_chart.py
"""
import json, io, sys
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.cm import ScalarMappable
from matplotlib.colors import Normalize

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
INDEX = ROOT / "lib" / "tokyoRentIndex.json"
OUT = ROOT / "outreach" / "tokyo-rent-by-line.png"
NAVY = "#12263f"

d = json.loads(INDEX.read_text(encoding="utf-8"))
lines = [(l["line_en"], l["rents"]["1K"]["median"]) for l in d["lines"] if l.get("rents", {}).get("1K")]
lines.sort(key=lambda x: x[1])            # moins cher -> plus cher (bas -> haut)
names = [x[0] for x in lines]
vals = [x[1] for x in lines]
y = list(range(len(lines)))

norm = Normalize(vmin=min(vals), vmax=max(vals))
colors = [plt.cm.RdYlGn_r(norm(v)) for v in vals]

fig, ax = plt.subplots(figsize=(11, 11))
ax.barh(y, vals, color=colors, edgecolor="white", height=0.78)
for i, v in enumerate(vals):
    ax.text(v + max(vals) * 0.008, i, f"{v/1000:.0f}k", va="center", ha="left",
            fontsize=9.5, color="#333")
ax.set_yticks(y)
ax.set_yticklabels(names, fontsize=10.5, color="#1f2937")
ax.set_xlim(0, max(vals) * 1.1)
ax.set_xlabel("Median monthly rent for a 1K studio (JPY)", fontsize=12.5, color="#374151", labelpad=10)
ax.xaxis.set_major_formatter(lambda x, _: f"{int(x/1000)}k" if x else "0")
ax.tick_params(axis="x", labelsize=10.5, colors="#4b5563")
for s in ["top", "right", "left"]:
    ax.spines[s].set_visible(False)
ax.spines["bottom"].set_color("#cbd5e1")
ax.xaxis.grid(True, color="#eef1f4", lw=1)
ax.set_axisbelow(True)
ax.margins(y=0.01)

plt.subplots_adjust(top=0.905, bottom=0.075, left=0.28, right=0.965)
fig.suptitle("The cost of a Tokyo studio, by train line", fontsize=21, fontweight="bold",
             color=NAVY, x=0.5, y=0.965)
fig.text(0.5, 0.925, f"Median 1K (studio) rent along {len(lines)} major Tokyo train lines, 2026.",
         ha="center", fontsize=12, color="#6b7280")
fig.text(0.965, 0.02, "Source: tokyo-expat.com/data  ·  median, not average",
         ha="right", fontsize=9, color="#9ca3af")

fig.savefig(OUT, dpi=150, facecolor="white")
print(f"Ecrit: {OUT} | {len(lines)} lignes | {min(vals):,}-{max(vals):,} JPY")
