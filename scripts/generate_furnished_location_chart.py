# -*- coding: utf-8 -*-
"""
generate_furnished_location_chart.py -- MUNITION OC r/dataisbeautiful.

L'insight: le loyer d'un studio MEUBLE ne depend presque pas du ward, alors que
celui d'un studio STANDARD, si. Conclusion contre-intuitive: plus le ward est bon
marche, plus la prime du meuble est grosse. On paie donc le plus cher exactement
la ou les gens s'installent pour economiser.

Silhouette NEUVE (on a deja fait barres, cartes, animation): nuage de points avec
diagonale de reference.
  - axe X = loyer median d'un 1K standard, par ward
  - axe Y = loyer median d'un 1K meuble, par ward, MEME echelle
  - diagonale grise pointillee = "meme prix que le standard"
  - droite de tendance bleue = beaucoup plus PLATE que la diagonale
  - le coin rouge entre les deux = ce que le meuble ajoute; il s'ouvre vers la
    GAUCHE (les wards bon marche) et c'est tout l'insight, sans explication.

Palette validee (skill dataviz, validate_palette.js --mode light):
  #3b82f6 + #e84141 -> ALL CHECKS PASS (CVD 27.2 protan, normal 34.9, contraste).
  L'encodage porte du sens: bleu = ce qu'on paie meuble, rouge = le surcout.

Sources (lecture seule, pipeline tokyo_insights, rafraichi chaque matin):
  data/processed/monthly_furnished_pool.parquet  -> le meuble / monthly
  data/processed/rents_harmonized.parquet        -> le standard (loyer + charges)
  ⚠️ MIN_FURN = 50 annonces meublees par ward. Les wards a petit echantillon
  faisaient sauter la mediane (Fernando avait releve Katsushika +107% vs +98%
  en aout, cf project_furnished_premium_data_pr) -> on les EXCLUT et on le dit
  dans la note de bas de chart. Regle: JAMAIS nommer les portails sources.

Ecrit:
  outreach/tokyo-furnished-by-location.png   (la munition)
  outreach/tokyo-furnished-by-location.csv   (data citable + article/partenaires)

  python scripts/generate_furnished_location_chart.py
"""
import io
import sys
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

TI = Path(r"C:\Users\alegu\Desktop\tokyo_insights")
HERE = Path(__file__).resolve().parent.parent
PNG = HERE / "outreach" / "tokyo-furnished-by-location.png"
CSV = HERE / "outreach" / "tokyo-furnished-by-location.csv"

LAYOUT = "1K"
MIN_FURN = 50      # annonces meublees minimum par ward
MIN_STD = 500      # le standard est toujours tres au-dessus, garde-fou seulement

BLUE = "#3b82f6"
RED = "#e84141"
INK = "#1a2433"
INK_SOFT = "#5a6b82"
INK_MUTED = "#8a97a8"
GRID = "#e6e9ee"

WARDS = {
    "千代田区": "Chiyoda", "中央区": "Chuo", "港区": "Minato", "新宿区": "Shinjuku",
    "文京区": "Bunkyo", "台東区": "Taito", "墨田区": "Sumida", "江東区": "Koto",
    "品川区": "Shinagawa", "目黒区": "Meguro", "大田区": "Ota", "世田谷区": "Setagaya",
    "渋谷区": "Shibuya", "中野区": "Nakano", "杉並区": "Suginami", "豊島区": "Toshima",
    "北区": "Kita", "荒川区": "Arakawa", "板橋区": "Itabashi", "練馬区": "Nerima",
    "足立区": "Adachi", "葛飾区": "Katsushika", "江戸川区": "Edogawa",
}

# Decalage manuel des etiquettes de ward (dx, dy en yens) pour eviter les
# collisions. Regle par lecture du PNG, pas a l'aveugle. Katsushika et Chiyoda
# n'en ont pas: leur encadre nomme deja le ward.
LABEL_OFFSET = {
    "Suginami": (-2600, 0), "Nerima": (-2600, 0), "Setagaya": (2600, 0),
    "Itabashi": (2600, 0), "Ota": (0, -3800), "Chuo": (0, 3300),
    "Toshima": (-2600, 2600), "Meguro": (0, -3800), "Shinagawa": (-2600, 0),
    "Bunkyo": (2600, -2200), "Sumida": (0, 3300), "Koto": (2600, 700),
    "Shinjuku": (2600, 0), "Taito": (0, 3300), "Shibuya": (2600, -1800),
    "Minato": (0, 4300),
}
LABEL_ALIGN = {"Suginami": "right", "Nerima": "right", "Shinagawa": "right",
               "Toshima": "right"}


def load():
    """Mediane du 1K meuble et du 1K standard, par ward."""
    def strip(w):
        return str(w).replace("東京都", "")

    furn = pd.read_parquet(TI / "data/processed/monthly_furnished_pool.parquet")
    furn["W"] = furn["Ward"].map(strip)
    furn = furn[(furn.Layout == LAYOUT) & (furn.W.isin(WARDS))]

    std = pd.read_parquet(
        TI / "data/processed/rents_harmonized.parquet",
        columns=["Ward", "Layout", "RentJPY", "MgmtFeeJPY"],
    )
    std["W"] = std["Ward"].map(strip)
    std["tot"] = std.RentJPY.fillna(0) + std.MgmtFeeJPY.fillna(0)
    std = std[(std.Layout == LAYOUT) & (std.W.isin(WARDS)) & (std.tot > 0)]

    rows = []
    for jp, en in WARDS.items():
        f = furn[furn.W == jp]["RentTotalJPY_mo"].dropna()
        s = std[std.W == jp]["tot"].dropna()
        if len(s) < MIN_STD:
            continue
        rows.append({
            "ward": en,
            "standard": float(s.median()),
            "furnished": float(f.median()) if len(f) else np.nan,
            "n_furnished": int(len(f)),
            "n_standard": int(len(s)),
        })
    d = pd.DataFrame(rows)
    d["premium_pct"] = (d.furnished / d.standard - 1) * 100
    return d.sort_values("standard").reset_index(drop=True)


def chart(kept, dropped, slope, intercept):
    # Echelles IDENTIQUES sur les deux axes: la diagonale "meme prix" doit etre
    # une vraie diagonale a 45 degres, sinon la reference est trompeuse.
    # figsize choisie pour que la zone de traçage soit DEJA carree, sinon
    # set_aspect('equal') laisse du vide et l'axe X descend sur le pied de page.
    lo, hi = 76_000, 200_000
    fig, ax = plt.subplots(figsize=(11, 12.65), dpi=125)
    fig.patch.set_facecolor("white")
    ax.set_facecolor("white")

    # --- coin rouge: entre "meme prix" et la tendance reelle du meuble
    xs = np.linspace(kept.standard.min() - 2_500, kept.standard.max() + 2_500, 200)
    trend = slope * xs + intercept
    ax.fill_between(xs, xs, trend, color=RED, alpha=0.12, zorder=1, lw=0)

    # --- diagonale de reference
    ax.plot([lo, hi], [lo, hi], color=INK_MUTED, ls=(0, (5, 4)), lw=1.6, zorder=2)
    ax.text(183_000, 186_000, "if a furnished studio cost the same\nas a standard one",
            fontsize=11, color=INK_MUTED, ha="center", va="bottom",
            rotation=45, rotation_mode="anchor", linespacing=1.35)

    # --- tendance du meuble
    ax.plot(xs, trend, color=BLUE, lw=2.6, zorder=3)

    # --- les wards
    ax.scatter(kept.standard, kept.furnished, s=115, color=BLUE,
               edgecolors="white", linewidths=2, zorder=5)
    for r in kept.itertuples():
        if r.ward not in LABEL_OFFSET:
            continue
        dx, dy = LABEL_OFFSET[r.ward]
        ha = LABEL_ALIGN.get(r.ward, "left" if dx > 0 else "center")
        ax.annotate(r.ward, (r.standard + dx, r.furnished + dy),
                    fontsize=11.5, color=INK, ha=ha, va="center", zorder=6)

    # --- les deux bouts de l'histoire
    cheap = kept.iloc[0]
    rich = kept.iloc[-1]
    ax.annotate(
        f"{cheap.ward}, the cheapest ward here\n¥{cheap.standard/1000:.0f}k standard  "
        f"→  ¥{cheap.furnished/1000:.0f}k furnished\n+{cheap.premium_pct:.0f}%",
        xy=(cheap.standard, cheap.furnished), xytext=(96_000, 196_000),
        fontsize=12, color=RED, fontweight="bold", ha="center", va="top",
        linespacing=1.6,
        arrowprops=dict(arrowstyle="-", color=RED, lw=1.3,
                        connectionstyle="arc3,rad=0.25", shrinkA=8, shrinkB=10),
        zorder=7)
    ax.annotate(
        f"{rich.ward}, the priciest\n¥{rich.standard/1000:.0f}k standard  →  "
        f"¥{rich.furnished/1000:.0f}k furnished\n+{rich.premium_pct:.0f}%",
        xy=(rich.standard, rich.furnished), xytext=(172_000, 158_000),
        fontsize=12, color=INK, fontweight="bold", ha="center", va="top",
        linespacing=1.6,
        arrowprops=dict(arrowstyle="-", color=INK_SOFT, lw=1.3,
                        connectionstyle="arc3,rad=-0.25", shrinkA=8, shrinkB=10),
        zorder=7)

    # --- legende du coin rouge, posee DANS le coin
    ax.text(120_000, 126_000, "what furnishing adds", fontsize=13.5,
            color=RED, style="italic", ha="center", rotation=45)

    # --- le triangle vide sous la diagonale EST le message
    ax.text(153_000, 100_000, "No ward sits below the line:\nnowhere in Tokyo is a "
            "furnished\nstudio cheaper than a standard one.",
            fontsize=11.5, color=INK_SOFT, ha="center", va="center", linespacing=1.6)

    ax.set_xlim(lo, hi)
    ax.set_ylim(lo, hi)
    ax.set_aspect("equal")
    ticks = [80_000, 100_000, 120_000, 140_000, 160_000, 180_000, 200_000]
    ax.set_xticks(ticks)
    ax.set_yticks(ticks)
    ax.set_xticklabels([f"¥{t//1000}k" for t in ticks], fontsize=11.5, color=INK_SOFT)
    ax.set_yticklabels([f"¥{t//1000}k" for t in ticks], fontsize=11.5, color=INK_SOFT)
    ax.set_xlabel("Median rent for a STANDARD 1K studio", fontsize=13,
                  color=INK_SOFT, labelpad=12)
    ax.set_ylabel("Median rent for a FURNISHED 1K studio", fontsize=13,
                  color=INK_SOFT, labelpad=12)
    ax.grid(True, color=GRID, lw=1, zorder=0)
    ax.set_axisbelow(True)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    for s in ("left", "bottom"):
        ax.spines[s].set_color(GRID)

    fig.suptitle("A furnished studio in Tokyo costs much the same wherever you live.\n"
                 "A standard one does not.",
                 x=0.5, y=0.991, fontsize=20, fontweight="bold", color=INK,
                 ha="center", linespacing=1.3)
    ax.set_title(
        "Median monthly rent for a 1K studio, by ward (2026). Each dot is one Tokyo ward.\n"
        f"Move to a ward where the standard rent is ¥10,000 higher and the furnished "
        f"rent rises only about ¥{slope*10_000:,.0f}.",
        fontsize=12.5, color=INK_SOFT, pad=10, linespacing=1.55)

    fig.text(0.5, 0.055, "Rent includes monthly management fees. "
             f"{len(dropped)} of Tokyo's 23 wards are left out, with fewer than "
             f"{MIN_FURN} furnished listings each,", ha="center", fontsize=10,
             color=INK_MUTED)
    fig.text(0.5, 0.038, f"too few for a stable median ({', '.join(dropped.ward)}).",
             ha="center", fontsize=10, color=INK_MUTED)
    fig.text(0.5, 0.018, "Source: tokyo-expat.com", ha="center", fontsize=10,
             color=INK_MUTED)

    plt.subplots_adjust(left=0.095, right=0.975, top=0.895, bottom=0.13)
    plt.savefig(PNG, facecolor="white")
    plt.close()


def main():
    d = load()
    kept = d[d.n_furnished >= MIN_FURN].copy().reset_index(drop=True)
    dropped = d[d.n_furnished < MIN_FURN].copy()

    slope, intercept = np.polyfit(kept.standard, kept.furnished, 1)
    r = np.corrcoef(kept.standard, kept.furnished)[0, 1]
    r_prem = np.corrcoef(kept.standard, kept.premium_pct)[0, 1]

    d.to_csv(CSV, index=False, encoding="utf-8")
    chart(kept, dropped, slope, intercept)

    print(f"OK: {len(kept)} wards retenus (>= {MIN_FURN} annonces meublees), "
          f"{len(dropped)} exclus: {', '.join(dropped.ward)}")
    print(f"  pente meuble ~ standard = {slope:.3f}  -> +10 000 yen standard = "
          f"+{slope*10_000:,.0f} yen meuble")
    print(f"  r(standard, meuble)  = {r:.2f}")
    print(f"  r(standard, premium) = {r_prem:.2f}")
    print(f"  standard : {kept.standard.min():,.0f} -> {kept.standard.max():,.0f} "
          f"(x{kept.standard.max()/kept.standard.min():.2f})")
    print(f"  meuble   : {kept.furnished.min():,.0f} -> {kept.furnished.max():,.0f} "
          f"(x{kept.furnished.max()/kept.furnished.min():.2f})")
    print(f"  premium  : +{kept.premium_pct.min():.0f}% -> +{kept.premium_pct.max():.0f}%")
    print(f"  n meuble total = {kept.n_furnished.sum():,} | "
          f"n standard total = {kept.n_standard.sum():,}")
    print(f"  PNG -> {PNG}")
    print(f"  CSV -> {CSV}")


if __name__ == "__main__":
    main()
