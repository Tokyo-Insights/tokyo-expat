# -*- coding: utf-8 -*-
"""
generate_layout_gap_chart.py -- Munition Reddit: l'ecart de loyer studio (1K) -> familial (2LDK)
par arrondissement de Tokyo. Dumbbell 1K -> 2LDK, depuis lib/tokyoRentIndex.json.
Ecrit outreach/tokyo-layout-gap.png. Source data secrete (compiled from listings).

  python scripts/generate_layout_gap_chart.py
"""
import json, io, sys
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
INDEX = ROOT / "lib" / "tokyoRentIndex.json"
OUT = ROOT / "outreach" / "tokyo-layout-gap.png"
NAVY = "#12263f"
GREY = "#9aa7b5"
LINE = "#d3dae2"
RED = "#e84141"

d = json.loads(INDEX.read_text(encoding="utf-8"))
rows = []
for w in d["wards"]:
    r = w.get("rents", {})
    if r.get("1K") and r.get("2LDK"):
        rows.append((w["ward_en"], r["1K"]["median"], r["2LDK"]["median"]))
rows.sort(key=lambda x: x[2])                       # par 2LDK croissant (bas -> haut)
names = [x[0] for x in rows]
studio = [x[1] for x in rows]
family = [x[2] for x in rows]
y = list(range(len(rows)))
xmax = max(family)

fig, ax = plt.subplots(figsize=(11, 11))
for i, (_, s, f) in enumerate(rows):
    ax.plot([s, f], [i, i], color=LINE, lw=2.5, zorder=1, solid_capstyle="round")
ax.scatter(studio, y, color=GREY, s=70, zorder=2, label="1K studio (single)", edgecolors="white", linewidths=0.8)
ax.scatter(family, y, color=NAVY, s=85, zorder=3, label="2LDK (family)", edgecolors="white", linewidths=0.8)
for i, (_, s, f) in enumerate(rows):
    mult = f / s
    usd = round(f / 160 / 10) * 10
    ax.text(s - xmax * 0.012, i, f"{s/1000:.0f}k", va="center", ha="right",
            fontsize=8.5, color=GREY)
    ax.text(f + xmax * 0.012, i, f"{f/1000:.0f}k  ~\\${usd:,.0f}   x{mult:.1f}",
            va="center", ha="left", fontsize=9.5, color=RED, fontweight="bold")

ax.set_yticks(y)
ax.set_yticklabels(names, fontsize=10.5, color="#1f2937")
ax.set_xlim(0, xmax * 1.40)
ax.xaxis.set_major_formatter(lambda x, _: f"{int(x/1000)}k" if x else "0")
ax.set_xlabel("Median monthly rent (JPY)", fontsize=12.5, color="#374151", labelpad=12)
ax.tick_params(axis="x", labelsize=10.5, colors="#4b5563")
for spine in ["top", "right", "left"]:
    ax.spines[spine].set_visible(False)
ax.spines["bottom"].set_color("#cbd5e1")
ax.xaxis.grid(True, color="#eef1f4", lw=1)
ax.set_axisbelow(True)
ax.margins(y=0.012)
leg = ax.legend(loc="lower right", frameon=False, fontsize=11.5, handletextpad=0.4, labelspacing=0.6)

plt.subplots_adjust(top=0.895, bottom=0.105, left=0.16, right=0.965)
fig.suptitle("From a studio to a family flat: the Tokyo rent jump", fontsize=20.5,
             fontweight="bold", color=NAVY, x=0.5, y=0.975)
fig.text(0.5, 0.94,
         "Median rent, 1K studio vs 2LDK family flat, by Tokyo ward (2026). "
         "xN = how many times more the family flat costs.",
         ha="center", fontsize=11.5, color="#6b7280")
fig.text(0.5, 0.917,
         "A 1K is a studio (one room + kitchen). A 2LDK is a two-bedroom family flat. "
         "USD at ~160 JPY per USD.",
         ha="center", fontsize=10, color="#94a3b8")
fig.text(0.965, 0.02, "Source: tokyo-expat.com/data  ·  median, not average",
         ha="right", fontsize=9, color="#9ca3af")

fig.savefig(OUT, dpi=150, facecolor="white")
print(f"Ecrit: {OUT} | {len(rows)} wards | multiplicateur {min(f/s for _,s,f in rows):.1f}-{max(f/s for _,s,f in rows):.1f}x")
