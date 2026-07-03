# -*- coding: utf-8 -*-
"""
generate_rent_station_chart.py -- Munition Reddit VIRALE (182K vues): loyer 1K median par
STATION de Tokyo (50 stations, du moins cher au plus cher). Recree le generateur perdu.
Barres horizontales, depuis lib/tokyoRentIndex.json. Ecrit outreach/tokyo-rent-by-station.png.
Source data gardee secrete (active listings, jamais 'scraped'/portails).

  python scripts/generate_rent_station_chart.py
"""
import json, io, sys
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.colors import Normalize

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
INDEX = ROOT / "lib" / "tokyoRentIndex.json"
OUT = ROOT / "outreach" / "tokyo-rent-by-station.png"
NAVY = "#12263f"

d = json.loads(INDEX.read_text(encoding="utf-8"))
total = d.get("total_listings", 0)
stations = [(s["station_en"], s["rents"]["1K"]["median"]) for s in d["stations"] if s.get("rents", {}).get("1K")]
stations.sort(key=lambda x: x[1])            # moins cher -> plus cher (bas -> haut)
names = [x[0] for x in stations]
vals = [x[1] for x in stations]
y = list(range(len(stations)))

norm = Normalize(vmin=min(vals), vmax=max(vals))
colors = [plt.cm.RdYlGn_r(norm(v)) for v in vals]

fig, ax = plt.subplots(figsize=(11, 16))
ax.barh(y, vals, color=colors, edgecolor="white", height=0.8)
for i, v in enumerate(vals):
    ax.text(v + max(vals) * 0.006, i, f"{v/1000:.0f}k", va="center", ha="left",
            fontsize=8.5, color="#333")
ax.set_yticks(y)
ax.set_yticklabels(names, fontsize=9.5, color="#1f2937")
ax.set_ylim(-0.6, len(stations) - 0.4)
ax.set_xlim(0, max(vals) * 1.1)
ax.set_xlabel("Median monthly rent for a 1K studio (JPY)", fontsize=13, color="#374151", labelpad=10)
ax.xaxis.set_major_formatter(lambda x, _: f"{int(x/1000)}k" if x else "0")
ax.tick_params(axis="x", labelsize=11, colors="#4b5563")
for spine in ["top", "right", "left"]:
    ax.spines[spine].set_visible(False)
ax.spines["bottom"].set_color("#cbd5e1")
ax.xaxis.grid(True, color="#eef1f4", lw=1)
ax.set_axisbelow(True)

plt.subplots_adjust(top=0.925, bottom=0.055, left=0.19, right=0.965)
fig.suptitle("The cost of a Tokyo studio, station by station", fontsize=23, fontweight="bold",
             color=NAVY, x=0.5, y=0.985)
fig.text(0.5, 0.952,
         f"Median 1K (studio) rent near {len(stations)} major Tokyo stations, cheapest to priciest, "
         f"from {total:,} active rental listings, 2026.",
         ha="center", fontsize=12.5, color="#6b7280")
fig.text(0.965, 0.008, "Source: tokyo-expat.com/data  ·  median, not average",
         ha="right", fontsize=9.5, color="#9ca3af")

fig.savefig(OUT, dpi=150, facecolor="white")
print(f"Ecrit: {OUT} | {len(stations)} stations | {min(vals):,}-{max(vals):,} JPY")
