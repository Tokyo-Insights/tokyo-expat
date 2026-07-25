# -*- coding: utf-8 -*-
"""tokyo-station-rent-map.png -- LE PLAN par station colorie par le loyer.
Silhouette geographique = format totalement neuf (ni barres, ni matrice, ni carte ward).
Repond a la demande recurrente n1 de l'audience Reddit (niveau station).
Regles dataviz: magnitude geo -> points colories, rampe SEQUENTIELLE 1 teinte
(clair->fonce), jamais rouge/vert, texte en encre neutre, labels selectifs.
"""
import json
from math import cos, radians
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
lats = [p["lat"] for p in pts]
lons = [p["lon"] for p in pts]
rents = [p["rent_1k"] for p in pts]
ctx = json.loads(CTX.read_text(encoding="utf-8")) if CTX.exists() else {"rails": [], "coast": []}

INK, MUTED = "#1f2937", "#6b7280"
ramp = LinearSegmentedColormap.from_list("rent", ["#dbe6f2", "#8fb2d6", "#3b6fa8", "#123a63", "#0b2545"])
norm = Normalize(vmin=min(rents), vmax=max(rents))

fig, ax = plt.subplots(figsize=(13, 11.5))
ax.set_facecolor("#ffffff")  # terre = blanc ; l'eau sera peinte par-dessus

# projection equirectangulaire simple (corrige l'ecrasement est-ouest a lat 35.7)
mlat = sum(lats) / len(lats)
kx = cos(radians(mlat))
X = [lo * kx for lo in lons]
Y = lats

def proj(line):
    return [(lo * kx, la) for lo, la in line]

WATER = "#cfe0f2"
# FOND, du bas vers le haut:
# 0 eau remplie (baie + plans d'eau) -> distinction terre/mer
if ctx.get("water"):
    polys = [proj(w) for w in ctx["water"] if len(w) >= 3]
    ax.add_collection(PolyCollection(polys, facecolors=WATER, edgecolors="none", zorder=0))
# 1 rivieres (Sumida, Arakawa...) = reperes
if ctx.get("rivers"):
    ax.add_collection(LineCollection([proj(l) for l in ctx["rivers"]],
                                     colors=WATER, linewidths=2.2, zorder=1))
# 2 reseau ferroviaire (gris clair, recessif)
if ctx.get("rails"):
    ax.add_collection(LineCollection([proj(l) for l in ctx["rails"]],
                                     colors="#cbd3dd", linewidths=0.5, zorder=2))
# 3 la boucle Yamanote soulignee (repere central iconique)
if ctx.get("yamanote"):
    ax.add_collection(LineCollection([proj(l) for l in ctx["yamanote"]],
                                     colors="#7fae5a", linewidths=2.6, zorder=3, alpha=0.9))

sc = ax.scatter(X, Y, c=rents, cmap=ramp, norm=norm, s=560,
                edgecolors="white", linewidths=1.8, zorder=5)

# cadrer sur les stations (le fond deborde, on le clippe) + marge
mx = (max(X) - min(X)) * 0.08
my = (max(Y) - min(Y)) * 0.08
ax.set_xlim(min(X) - mx, max(X) + mx)
ax.set_ylim(min(Y) - my, max(Y) + my)

# labels selectifs: 3 plus chers + 4 moins chers + reperes connus espaces
ranked = sorted(pts, key=lambda p: p["rent_1k"])
label_set = {p["station_en"] for p in ranked[:4] + ranked[-3:]}
label_set |= {"Shinjuku", "Shibuya", "Ikebukuro", "Nakano", "Ogikubo"}
# offsets custom pour eviter les chevauchements dans les zones denses
OFF = {"Ebisu": (0, -26), "Meguro": (0, -26), "Shibuya": (0, 14), "Jimbocho": (0, 14),
       "Shinjuku": (0, -26)}
for p in pts:
    if p["station_en"] in label_set:
        ax.annotate(f"{p['station_en']}\n{p['rent_1k']//1000}k",
                    (p["lon"] * kx, p["lat"]),
                    textcoords="offset points", xytext=OFF.get(p["station_en"], (0, 14)),
                    ha="center", fontsize=9.5, fontweight="bold", color=INK, zorder=6,
                    bbox=dict(boxstyle="round,pad=0.16", fc="white", ec="none", alpha=0.82))

# petite legende pour la boucle verte
ax.plot([], [], color="#7fae5a", lw=2.6, label="Yamanote loop")
ax.legend(loc="lower left", frameon=False, fontsize=11, handlelength=1.6)

ax.set_aspect("equal")
ax.axis("off")

# colorbar (legende de la rampe)
cb = fig.colorbar(sc, ax=ax, fraction=0.03, pad=0.03)
cb.set_label("Median rent, 1K studio (JPY/month)", fontsize=11, color=MUTED)
cb.set_ticks([80000, 100000, 120000, 140000])
cb.ax.tick_params(labelsize=10, colors=MUTED)
cb.ax.yaxis.set_major_formatter(FuncFormatter(lambda v, _: f"{int(v)//1000}k"))
cb.outline.set_visible(False)

fig.suptitle("Tokyo studio rent, mapped station by station",
             fontsize=23, fontweight="bold", color="#0b2545", x=0.5, y=0.965)
fig.text(0.5, 0.925,
         "Median monthly rent for a 1K studio near 50 major stations. "
         "Darker = pricier. Position = real location.",
         ha="center", fontsize=12.5, color=MUTED)
fig.text(0.5, 0.90,
         "Rent clusters high in the centre and falls toward the edges, most sharply to the east.",
         ha="center", fontsize=12.5, color=MUTED)
fig.text(0.985, 0.02, "Source: tokyo-expat.com/data  ·  median, not average  ·  map: OpenStreetMap",
         ha="right", fontsize=9.5, color="#9ca3af")

plt.subplots_adjust(top=0.87, bottom=0.03, left=0.02, right=0.90)
fig.savefig(OUT, dpi=150, facecolor="white")
print("Ecrit:", OUT)
print(f"points: {len(pts)} | rent {min(rents)}-{max(rents)} | bbox lat {min(lats):.3f}-{max(lats):.3f}")
