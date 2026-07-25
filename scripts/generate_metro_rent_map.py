# -*- coding: utf-8 -*-
"""tokyo-station-rent-map.png -- plan des loyers, STYLE PLAN DE METRO (v5).
Les vraies lignes dessinees proprement dans leurs COULEURS officielles (fini le
fouillis de rails gris), stations en pastilles colorees par loyer + prix + nom.
Baie en fond leger pour le contexte. Rampe loyer = bleu->navy (sequentielle).
"""
import json
from math import cos, radians, hypot, sin
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap, Normalize
from matplotlib.ticker import FuncFormatter
from matplotlib.collections import LineCollection, PolyCollection

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
pts = json.loads((ROOT / "lib" / "stationCoords.json").read_text(encoding="utf-8"))
ctx = json.loads((ROOT / "scripts" / "data" / "tokyo_map_context.json").read_text(encoding="utf-8"))
lines = json.loads((ROOT / "scripts" / "data" / "tokyo_metro_lines.json").read_text(encoding="utf-8"))
OUT = ROOT / "outreach" / "tokyo-station-rent-map.png"

lats = [p["lat"] for p in pts]; lons = [p["lon"] for p in pts]; rents = [p["rent_1k"] for p in pts]
mlat = sum(lats) / len(lats); kx = cos(radians(mlat))
def proj(line): return [(lo * kx, la) for lo, la in line]

INK, MUTED, WATER = "#1f2937", "#6b7280", "#dce9f5"
ramp = LinearSegmentedColormap.from_list("rent", ["#eaf0f7", "#9fc0e0", "#4f86c6", "#1d4e89", "#0b2545"])
norm = Normalize(vmin=min(rents), vmax=max(rents))

fig, ax = plt.subplots(figsize=(16, 15))
ax.set_facecolor("#ffffff")

# baie / eau en fond leger (contexte, sans les rivieres pour ne pas surcharger)
if ctx.get("water"):
    ax.add_collection(PolyCollection([proj(w) for w in ctx["water"] if len(w) >= 3],
                                     facecolors=WATER, edgecolors="none", zorder=0))

# LIGNES de metro dans leurs couleurs officielles (1 fois par ref), tracees proprement
seen = set()
for L in sorted(lines, key=lambda x: -sum(len(s) for s in x["segments"])):
    ref = L["name"]
    if ref in seen:
        continue
    seen.add(ref)
    col = L["colour"]
    ax.add_collection(LineCollection([proj(s) for s in L["segments"]], colors=col,
                                     linewidths=3.4, alpha=0.7, zorder=2, capstyle="round"))

X = [p["lon"] * kx for p in pts]; Y = [p["lat"] for p in pts]
sc = ax.scatter(X, Y, c=rents, cmap=ramp, norm=norm, s=430,
                edgecolors="white", linewidths=2.6, zorder=5)
for p in pts:
    c = ramp(norm(p["rent_1k"])); lum = 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]
    ax.text(p["lon"] * kx, p["lat"], f"{p['rent_1k'] // 1000}", ha="center", va="center",
            fontsize=7.5, fontweight="bold", color="white" if lum < 0.6 else INK, zorder=6)

# --- placement anti-collision des 50 noms (glouton) + ligne de rappel ---
def overlap(a, b): return not (a[2] < b[0] or a[0] > b[2] or a[3] < b[1] or a[1] > b[3])
PR, LAB_H = 0.0048, 0.0029
placed = [[p["lon"] * kx - PR, p["lat"] - PR, p["lon"] * kx + PR, p["lat"] + PR] for p in pts]
CAND = [270, 90, 0, 180, 315, 225, 45, 135]; DIST = [0.008, 0.0128, 0.0185, 0.025, 0.033]
for p in sorted(pts, key=lambda z: -z["rent_1k"]):
    name = p["station_en"]; w = max(0.006, len(name) * 0.00088)
    px, py = p["lon"] * kx, p["lat"]; best = None
    for dist in DIST:
        for ang in CAND:
            cx, cy = px + dist * cos(radians(ang)), py + dist * sin(radians(ang))
            box = [cx - w / 2, cy - LAB_H / 2, cx + w / 2, cy + LAB_H / 2]
            if not any(overlap(box, o) for o in placed):
                best = (cx, cy, box); break
        if best: break
    if not best:
        cx, cy = px, py - 0.010; best = (cx, cy, [cx - w / 2, cy - LAB_H / 2, cx + w / 2, cy + LAB_H / 2])
    cx, cy, box = best; placed.append(box)
    if hypot(cx - px, cy - py) > PR + 0.004:
        ax.plot([px, cx], [py, cy], color="#aab4c0", lw=0.6, zorder=4)
    ax.text(cx, cy, name, ha="center", va="center", fontsize=7.8, fontweight="bold",
            color=INK, zorder=7, bbox=dict(boxstyle="round,pad=0.12", fc="white", ec="none", alpha=0.92))

allx = [b[0] for b in placed] + [b[2] for b in placed]
ally = [b[1] for b in placed] + [b[3] for b in placed]
ax.set_xlim(min(allx) - 0.004, max(allx) + 0.004)
ax.set_ylim(min(ally) - 0.004, max(ally) + 0.004)
ax.set_aspect("equal"); ax.axis("off")

cb = fig.colorbar(sc, ax=ax, fraction=0.03, pad=0.02)
cb.set_label("Median rent, 1K studio (JPY/month)", fontsize=12, color=MUTED)
cb.set_ticks([80000, 100000, 120000, 140000]); cb.ax.tick_params(labelsize=11, colors=MUTED)
cb.ax.yaxis.set_major_formatter(FuncFormatter(lambda v, _: f"{int(v) // 1000}k")); cb.outline.set_visible(False)

fig.suptitle("Tokyo studio rent, station by station", fontsize=28, fontweight="bold",
             color="#0b2545", x=0.5, y=0.965)
fig.text(0.5, 0.930, "Median monthly rent for a 1K studio near 50 major stations, on the real rail network. "
         "Each dot's number is the rent in thousands of yen; darker = pricier.",
         ha="center", fontsize=13.5, color=MUTED)
fig.text(0.5, 0.907, "Rail lines in their official colours. Rent clusters in the centre and falls toward the edges.",
         ha="center", fontsize=13.5, color=MUTED)
fig.text(0.985, 0.017, "Source: tokyo-expat.com/data  ·  median, not average  ·  map: OpenStreetMap",
         ha="right", fontsize=10.5, color="#9ca3af")

plt.subplots_adjust(top=0.885, bottom=0.02, left=0.02, right=0.9)
fig.savefig(OUT, dpi=150, facecolor="white")
print("Ecrit:", OUT, "| lignes dessinees:", len(seen), "| stations:", len(pts))
