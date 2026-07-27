# -*- coding: utf-8 -*-
"""tokyo-price-heatmap.mp4 -- choroplethe ANIMEE des prix immobiliers de Tokyo,
trimestre par trimestre 2021->2025. Style heatwave/FT: rampe chaude (inferno,
CVD-safe), trimestre defilant, insight titre. Source jamais nommee.
Sauve aussi 2 frames PNG (1er/dernier trimestre) pour QA visuel (video non lisible)."""
import json
from math import cos, radians
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.animation as animation
import matplotlib.patheffects as pe
from matplotlib.patches import Polygon
from matplotlib.colors import Normalize
from matplotlib.cm import ScalarMappable, get_cmap

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
polys = json.loads((ROOT / "lib" / "tokyoWardPolygons.json").read_text(encoding="utf-8"))
hist = json.loads((ROOT / "lib" / "tokyoPriceHistory.json").read_text(encoding="utf-8"))
Q = hist["quarters"]; PRICES = hist["prices"]
OUT_MP4 = ROOT / "outreach" / "tokyo-price-heatmap.mp4"
OUT_GIF = ROOT / "outreach" / "tokyo-price-heatmap.gif"

# projection
allpts = [p for w in polys.values() for ring in w for p in ring]
mlat = sum(y for x, y in allpts) / len(allpts)
kx = cos(radians(mlat))
def pj(ring): return [(x * kx, y) for x, y in ring]

cmap = get_cmap("inferno")
vmin, vmax = 400, 2000
norm = Normalize(vmin=vmin, vmax=vmax)

fig, ax = plt.subplots(figsize=(10.5, 10.6))
fig.patch.set_facecolor("#0e0e12"); ax.set_facecolor("#0e0e12")

ward_patches = {}
centroids = {}
def shoelace(r):
    s = 0
    for i in range(len(r) - 1):
        s += r[i][0] * r[i + 1][1] - r[i + 1][0] * r[i][1]
    return abs(s) / 2
for w, rings in polys.items():
    pl = []
    for ring in rings:
        poly = Polygon(pj(ring), closed=True, edgecolor="#3a3a44", linewidth=0.6)
        ax.add_patch(poly); pl.append(poly)
    ward_patches[w] = pl
    big = max(rings, key=shoelace)  # plus grand anneau pour poser le label
    centroids[w] = (sum(p[0] * kx for p in big) / len(big), sum(p[1] for p in big) / len(big))

xs = [x * kx for x, y in allpts]; ys = [y for x, y in allpts]
mx = (max(xs) - min(xs)) * 0.03
ax.set_xlim(min(xs) - mx, max(xs) + mx)
ax.set_ylim(min(ys) - mx, max(ys) + mx * 3.2)  # marge haute pour le titre
ax.set_aspect("equal"); ax.axis("off")

# textes
TXT = "#f2f2f5"; MUT = "#9a9aa5"
fig.text(0.5, 0.955, "Four years of Tokyo condo prices", ha="center", fontsize=25,
         fontweight="bold", color=TXT)
fig.text(0.5, 0.918, "Median resale price per m2, ward by ward, from recorded transactions. The centre pulls away.",
         ha="center", fontsize=12.5, color=MUT)
qtext = ax.text(0.03, 0.965, Q[0], transform=ax.transAxes, fontsize=30, fontweight="bold",
                color=TXT, va="top")
citytext = ax.text(0.03, 0.905, "", transform=ax.transAxes, fontsize=13, color=MUT, va="top")
fig.text(0.985, 0.02, "Source: tokyo-expat.com/data  ·  recorded transactions  ·  median, not average",
         ha="right", fontsize=9.5, color=MUT)

# colorbar
sm = ScalarMappable(norm=norm, cmap=cmap); sm.set_array([])
cb = fig.colorbar(sm, ax=ax, fraction=0.03, pad=0.01)
cb.set_label("Median price per m2 (million yen)", color=MUT, fontsize=11)
cb.set_ticks([500, 1000, 1500, 2000])
cb.ax.set_yticklabels(["0.5M", "1.0M", "1.5M", "2.0M"], color=MUT, fontsize=10)
cb.outline.set_visible(False); cb.ax.tick_params(colors=MUT)

# labels par ward: nom (fixe) + montant (dynamique), avec contour pour lisibilite
STROKE = [pe.withStroke(linewidth=2.4, foreground="#141418")]
ward_amount = {}
# les tres petits wards du centre: nom masque (place insuffisante), montant garde
SMALL = {"Chiyoda", "Taito", "Arakawa", "Bunkyo", "Nakano", "Toshima"}
for w, (cx, cy) in centroids.items():
    if w not in SMALL:
        ax.text(cx, cy + 0.0016, w, ha="center", va="bottom", fontsize=7.3,
                fontweight="bold", color="#ffffff", zorder=8, path_effects=STROKE)
    t = ax.text(cx, cy - 0.0012, "", ha="center", va="top", fontsize=8.2,
                fontweight="bold", color="#ffffff", zorder=8, path_effects=STROKE)
    ward_amount[w] = t

plt.subplots_adjust(top=0.9, bottom=0.02, left=0.02, right=0.9)

K = 6  # sous-frames interpolees (plus = plus fluide)
NF = (len(Q) - 1) * K + 1
def price_at(w, pos):
    i = min(int(pos), len(Q) - 2); t = pos - i
    a, b = PRICES[w][i], PRICES[w][i + 1]
    return a * (1 - t) + b * t

def draw(frame):
    pos = frame / K
    qi = round(pos)
    vals = []
    for w, pls in ward_patches.items():
        v = price_at(w, pos); vals.append(v)
        c = cmap(norm(v))
        for p in pls:
            p.set_facecolor(c)
        ward_amount[w].set_text(f"{v/1000:.1f}M")
    qtext.set_text(Q[qi])
    citytext.set_text(f"citywide median  {sorted(vals)[len(vals)//2]/1000:.2f}M / m2")
    return []

# pauses au debut et a la fin pour lire les etats cles
seq = [0] * 12 + list(range(NF)) + [NF - 1] * 18
anim = animation.FuncAnimation(fig, draw, frames=seq, interval=100, blit=False)

# QA: 2 frames PNG (debut / fin)
draw(0); fig.savefig(ROOT / "outreach" / "_qa_first.png", dpi=90, facecolor=fig.get_facecolor())
draw(NF - 1); fig.savefig(ROOT / "outreach" / "_qa_last.png", dpi=90, facecolor=fig.get_facecolor())

# export MP4 (+ GIF)
try:
    anim.save(str(OUT_MP4), writer=animation.FFMpegWriter(fps=9, bitrate=2600),
              savefig_kwargs={"facecolor": fig.get_facecolor()})
    print("MP4 ecrit:", OUT_MP4.name, OUT_MP4.stat().st_size // 1024, "ko")
except Exception as e:
    print("MP4 echec:", str(e)[:150])
try:
    anim.save(str(OUT_GIF), writer=animation.PillowWriter(fps=9),
              savefig_kwargs={"facecolor": fig.get_facecolor()})
    print("GIF ecrit:", OUT_GIF.name, OUT_GIF.stat().st_size // 1024, "ko")
except Exception as e:
    print("GIF echec:", str(e)[:150])
print("frames:", NF)
