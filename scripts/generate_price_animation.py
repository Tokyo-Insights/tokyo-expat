# -*- coding: utf-8 -*-
"""tokyo-price-heatmap[-mobile].mp4 -- choroplethe ANIMEE des prix Tokyo 2021-2025.
Style heatwave/FT: rampe inferno (CVD-safe), trimestre defilant, labels ward +
montants dynamiques, barre de progression, flash final des hausses. Source jamais
nommee. Genere desktop (carre) + mobile (4:5). QA via frames PNG (video non lisible)."""
import json
from math import cos, radians
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.animation as animation
import matplotlib.patheffects as pe
from matplotlib.patches import Polygon
from matplotlib.lines import Line2D
from matplotlib.colors import Normalize
from matplotlib.cm import ScalarMappable, get_cmap

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
polys = json.loads((ROOT / "lib" / "tokyoWardPolygons.json").read_text(encoding="utf-8"))
hist = json.loads((ROOT / "lib" / "tokyoPriceHistory.json").read_text(encoding="utf-8"))
Q = hist["quarters"]; PRICES = hist["prices"]

allpts = [p for w in polys.values() for ring in w for p in ring]
mlat = sum(y for x, y in allpts) / len(allpts); kx = cos(radians(mlat))
def pj(ring): return [(x * kx, y) for x, y in ring]
def shoelace(r):
    s = 0
    for i in range(len(r) - 1):
        s += r[i][0] * r[i + 1][1] - r[i + 1][0] * r[i][1]
    return abs(s) / 2

cmap = get_cmap("inferno"); vmin, vmax = 400, 2000; norm = Normalize(vmin=vmin, vmax=vmax)
TXT, MUT, ACCENT = "#f2f2f5", "#9a9aa5", "#ffcf6b"
STROKE = [pe.withStroke(linewidth=2.4, foreground="#141418")]
SMALL = {"Chiyoda", "Taito", "Arakawa", "Bunkyo", "Nakano", "Toshima"}
pct = {w: (PRICES[w][-1] / PRICES[w][0] - 1) * 100 for w in PRICES}
SUB_NORMAL = "Median resale price per m2, ward by ward, from recorded transactions."
SUB_FLASH = (f"Over four years: Minato +{pct['Minato']:.0f}%, Shibuya +{pct['Shibuya']:.0f}%, "
             f"while Adachi rose only +{pct['Adachi']:.0f}%.")
K = 6; NF = (len(Q) - 1) * K + 1

def price_at(w, pos):
    i = min(int(pos), len(Q) - 2); t = pos - i
    return PRICES[w][i] * (1 - t) + PRICES[w][i + 1] * t

def build(mobile):
    fig, ax = plt.subplots(figsize=((9, 11.25) if mobile else (10.5, 10.6)))
    fig.patch.set_facecolor("#0e0e12"); ax.set_facecolor("#0e0e12")
    ward_patches, centroids = {}, {}
    for w, rings in polys.items():
        pl = []
        for ring in rings:
            poly = Polygon(pj(ring), closed=True, edgecolor="#3a3a44", linewidth=0.6)
            ax.add_patch(poly); pl.append(poly)
        ward_patches[w] = pl
        big = max(rings, key=shoelace)
        centroids[w] = (sum(p[0] * kx for p in big) / len(big), sum(p[1] for p in big) / len(big))

    xs = [x * kx for x, y in allpts]; ys = [y for x, y in allpts]
    mx = (max(xs) - min(xs)) * 0.03
    ax.set_xlim(min(xs) - mx, max(xs) + mx)
    ax.set_ylim(min(ys) - mx, max(ys) + mx * 3.2)
    ax.set_aspect("equal"); ax.axis("off")

    ts = 1.0 if not mobile else 0.94
    fig.text(0.5, 0.955, "Watch central Tokyo heat up", ha="center",
             fontsize=25 * ts, fontweight="bold", color=TXT)
    subtitle = fig.text(0.5, 0.918, SUB_NORMAL, ha="center", fontsize=12.5 * ts, color=MUT)
    qtext = ax.text(0.03, 0.965, Q[0], transform=ax.transAxes, fontsize=30 * ts,
                    fontweight="bold", color=TXT, va="top")
    citytext = ax.text(0.03, 0.905, "", transform=ax.transAxes, fontsize=13 * ts, color=MUT, va="top")
    fig.text(0.985, 0.02, "Source: tokyo-expat.com/data  ·  recorded transactions  ·  median",
             ha="right", fontsize=9.5, color=MUT)

    ward_amount = {}
    for w, (cx, cy) in centroids.items():
        if w not in SMALL:
            ax.text(cx, cy + 0.0016, w, ha="center", va="bottom", fontsize=7.3,
                    fontweight="bold", color="#fff", zorder=8, path_effects=STROKE)
        ward_amount[w] = ax.text(cx, cy - 0.0012, "", ha="center", va="top", fontsize=8.2,
                                 fontweight="bold", color="#fff", zorder=8, path_effects=STROKE)

    sm = ScalarMappable(norm=norm, cmap=cmap); sm.set_array([])
    cb = fig.colorbar(sm, ax=ax, fraction=0.03, pad=0.01)
    cb.set_label("Median price per m2 (million yen)", color=MUT, fontsize=11)
    cb.set_ticks([500, 1000, 1500, 2000]); cb.ax.set_yticklabels(["0.5M", "1.0M", "1.5M", "2.0M"], color=MUT, fontsize=10)
    cb.outline.set_visible(False); cb.ax.tick_params(colors=MUT)

    # barre de progression temporelle (coords figure, bande basse propre)
    bx0, bx1, by = 0.12, 0.52, 0.05
    fig.add_artist(Line2D([bx0, bx1], [by, by], transform=fig.transFigure, color="#4a4a55", lw=2))
    marker = Line2D([bx0], [by], transform=fig.transFigure, marker="o", color="#fff",
                    markersize=8, markeredgecolor="#0e0e12")
    fig.add_artist(marker)
    fig.text(bx0, by + 0.022, "2021", ha="center", fontsize=9.5, color=MUT)
    fig.text(bx1, by + 0.022, "2025", ha="center", fontsize=9.5, color=MUT)

    plt.subplots_adjust(top=0.9, bottom=0.11, left=0.02, right=0.9)

    def draw(item):
        frame, flash = item
        pos = frame / K; vals = []
        for w, pls in ward_patches.items():
            v = price_at(w, pos); vals.append(v); c = cmap(norm(v))
            for p in pls:
                p.set_facecolor(c)
            ward_amount[w].set_text(f"{v/1000:.1f}M")
        qtext.set_text(Q[round(pos)])
        citytext.set_text(f"citywide median  {sorted(vals)[len(vals)//2]/1000:.2f}M / m2")
        marker.set_xdata([bx0 + (pos / (len(Q) - 1)) * (bx1 - bx0)])
        subtitle.set_text(SUB_FLASH if flash else SUB_NORMAL)
        subtitle.set_color(ACCENT if flash else MUT)
        subtitle.set_fontweight("bold" if flash else "normal")
        return []

    seq = [(0, False)] * 12 + [(f, False) for f in range(NF)] + [(NF - 1, True)] * 22
    anim = animation.FuncAnimation(fig, draw, frames=seq, interval=110, blit=False)

    suf = "-mobile" if mobile else ""
    draw((0, False)); fig.savefig(ROOT / "outreach" / f"_qa_first{suf}.png", dpi=85, facecolor=fig.get_facecolor())
    draw((NF - 1, True)); fig.savefig(ROOT / "outreach" / f"_qa_last{suf}.png", dpi=85, facecolor=fig.get_facecolor())
    mp4 = ROOT / "outreach" / f"tokyo-price-heatmap{suf}.mp4"
    anim.save(str(mp4), writer=animation.FFMpegWriter(fps=9, bitrate=2600),
              savefig_kwargs={"facecolor": fig.get_facecolor()})
    print(f"MP4{suf}:", mp4.stat().st_size // 1024, "ko")
    if not mobile:
        gif = ROOT / "outreach" / "tokyo-price-heatmap.gif"
        anim.save(str(gif), writer=animation.PillowWriter(fps=9), savefig_kwargs={"facecolor": fig.get_facecolor()})
        print("GIF:", gif.stat().st_size // 1024, "ko")
    plt.close(fig)

build(False)
build(True)
print("frames:", NF, "| hausses: Minato +%.0f%%  Shibuya +%.0f%%  Adachi +%.0f%%" % (pct['Minato'], pct['Shibuya'], pct['Adachi']))
