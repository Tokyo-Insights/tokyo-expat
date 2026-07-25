# -*- coding: utf-8 -*-
"""tokyo-station-rent-map.png -- LE plan des loyers par station, version complete.
Chaque point = 1 station: sa COULEUR + son PRIX (dans le point) + son NOM (label
place par un moteur anti-collision maison + ligne de rappel). Fond OSM: eau
remplie (baie), rivieres, reseau ferroviaire, boucle Yamanote soulignee.
Regles dataviz: rampe SEQUENTIELLE 1 teinte (jamais rouge/vert pour l'encodage),
texte en encre neutre, fond recessif. Vert = couleur REELLE de la Yamanote (repere).
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
DATA = ROOT / "lib" / "stationCoords.json"
CTX = ROOT / "scripts" / "data" / "tokyo_map_context.json"
OUT = ROOT / "outreach" / "tokyo-station-rent-map.png"

pts = json.loads(DATA.read_text(encoding="utf-8"))
ctx = json.loads(CTX.read_text(encoding="utf-8")) if CTX.exists() else {}

lats = [p["lat"] for p in pts]
lons = [p["lon"] for p in pts]
rents = [p["rent_1k"] for p in pts]
mlat = sum(lats) / len(lats)
kx = cos(radians(mlat))

def proj(line):
    return [(lo * kx, la) for lo, la in line]

INK, MUTED, WATER = "#1f2937", "#6b7280", "#cfe0f2"
ramp = LinearSegmentedColormap.from_list("rent", ["#dbe6f2", "#8fb2d6", "#3b6fa8", "#123a63", "#0b2545"])
norm = Normalize(vmin=min(rents), vmax=max(rents))

fig, ax = plt.subplots(figsize=(16, 15))
ax.set_facecolor("#ffffff")

# ---- FOND (du bas vers le haut) ----
if ctx.get("water"):
    ax.add_collection(PolyCollection([proj(w) for w in ctx["water"] if len(w) >= 3],
                                     facecolors=WATER, edgecolors="none", zorder=0))
if ctx.get("rivers"):
    ax.add_collection(LineCollection([proj(l) for l in ctx["rivers"]],
                                     colors=WATER, linewidths=2.4, zorder=1))
if ctx.get("rails"):
    ax.add_collection(LineCollection([proj(l) for l in ctx["rails"]],
                                     colors="#cdd5df", linewidths=0.5, zorder=2))
if ctx.get("yamanote"):
    ax.add_collection(LineCollection([proj(l) for l in ctx["yamanote"]],
                                     colors="#7fae5a", linewidths=2.8, zorder=3, alpha=0.95))

X = [p["lon"] * kx for p in pts]
Y = [p["lat"] for p in pts]
sc = ax.scatter(X, Y, c=rents, cmap=ramp, norm=norm, s=560,
                edgecolors="white", linewidths=1.8, zorder=5)

# prix DANS chaque point (encre adaptee a la luminosite du fond)
for p in pts:
    c = ramp(norm(p["rent_1k"]))
    lum = 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]
    ax.text(p["lon"] * kx, p["lat"], f"{p['rent_1k'] // 1000}", ha="center", va="center",
            fontsize=8, fontweight="bold", color="white" if lum < 0.6 else INK, zorder=6)

# ---- MOTEUR DE PLACEMENT DES 50 NOMS (glouton anti-collision) ----
def overlap(a, b):
    return not (a[2] < b[0] or a[0] > b[2] or a[3] < b[1] or a[1] > b[3])

PR = 0.0052          # demi-taille d'un point (obstacle), en unites data
LAB_H = 0.0030       # hauteur d'un label
placed = []          # boites deja occupees (points + labels)
for p in pts:
    px, py = p["lon"] * kx, p["lat"]
    placed.append([px - PR, py - PR, px + PR, py + PR])

# placer d'abord les stations les plus cheres (positions prioritaires)
CAND = [270, 90, 0, 180, 315, 225, 45, 135]
DIST = [0.0085, 0.0135, 0.0195, 0.0265, 0.034]
for p in sorted(pts, key=lambda z: -z["rent_1k"]):
    name = p["station_en"]
    w = max(0.0065, len(name) * 0.00092)
    px, py = p["lon"] * kx, p["lat"]
    best = None
    for dist in DIST:
        for ang in CAND:
            cx, cy = px + dist * cos(radians(ang)), py + dist * sin(radians(ang))
            box = [cx - w / 2, cy - LAB_H / 2, cx + w / 2, cy + LAB_H / 2]
            if not any(overlap(box, o) for o in placed):
                best = (cx, cy, box); break
        if best:
            break
    if not best:  # dernier recours: sous le point
        cx, cy = px, py - 0.011
        best = (cx, cy, [cx - w / 2, cy - LAB_H / 2, cx + w / 2, cy + LAB_H / 2])
    cx, cy, box = best
    placed.append(box)
    if hypot(cx - px, cy - py) > PR + 0.004:  # ligne de rappel si eloigne
        ax.plot([px, cx], [py, cy], color="#9aa7b5", lw=0.6, zorder=4)
    ax.text(cx, cy, name, ha="center", va="center", fontsize=8, fontweight="bold",
            color=INK, zorder=7,
            bbox=dict(boxstyle="round,pad=0.13", fc="white", ec="none", alpha=0.9))

# cadrage sur les labels+points (marge large pour ne rien couper)
allx = [b[0] for b in placed] + [b[2] for b in placed]
ally = [b[1] for b in placed] + [b[3] for b in placed]
mx = (max(allx) - min(allx)) * 0.03
my = (max(ally) - min(ally)) * 0.03
ax.set_xlim(min(allx) - mx, max(allx) + mx)
ax.set_ylim(min(ally) - my, max(ally) + my)
ax.set_aspect("equal")
ax.axis("off")

# legende Yamanote
ax.plot([], [], color="#7fae5a", lw=2.8, label="Yamanote loop")
ax.legend(loc="lower left", frameon=False, fontsize=13, handlelength=1.6)

# colorbar
cb = fig.colorbar(sc, ax=ax, fraction=0.03, pad=0.02)
cb.set_label("Median rent, 1K studio (JPY/month)", fontsize=12, color=MUTED)
cb.set_ticks([80000, 100000, 120000, 140000])
cb.ax.tick_params(labelsize=11, colors=MUTED)
cb.ax.yaxis.set_major_formatter(FuncFormatter(lambda v, _: f"{int(v) // 1000}k"))
cb.outline.set_visible(False)

fig.suptitle("Tokyo studio rent, mapped station by station",
             fontsize=27, fontweight="bold", color="#0b2545", x=0.5, y=0.965)
fig.text(0.5, 0.930,
         "Median monthly rent for a 1K studio near 50 major stations. Darker = pricier. "
         "The number in each dot is the rent in thousands of yen.",
         ha="center", fontsize=13.5, color=MUTED)
fig.text(0.5, 0.907,
         "Rent clusters high inside the Yamanote loop and falls toward the edges, most sharply to the east.",
         ha="center", fontsize=13.5, color=MUTED)
fig.text(0.985, 0.017, "Source: tokyo-expat.com/data  ·  median, not average  ·  map: OpenStreetMap",
         ha="right", fontsize=10.5, color="#9ca3af")

plt.subplots_adjust(top=0.885, bottom=0.02, left=0.02, right=0.9)
fig.savefig(OUT, dpi=150, facecolor="white")
print("Ecrit:", OUT, "| stations nommees:", len(pts))
