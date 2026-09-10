# -*- coding: utf-8 -*-
"""
generate_entry_cost_by_ward_chart.py -- MUNITION OC r/dataisbeautiful.

Le vrai cout d'entree (敷金 depot + 礼金 key money) ward par ward, MESURE sur les
annonces actives, pas une convention de marche. Personne ne publie ce chiffre.

Deux panneaux, MEME ordre de wards, et c'est tout l'interet:
  - gauche  : ce qu'on paie a l'entree (depot + key money), decroissant
  - droite  : la part des annonces qui ne demandent AUCUN depot
Les barres retrecissent vers le bas, les points grossissent vers le bas. La
composition PROUVE l'insight sans qu'on ait a l'expliquer.

Palette validee (skill dataviz, validate_palette.js --mode light):
  #3b82f6 + #e84141 -> ALL CHECKS PASS (bande L, chroma, CVD 27.2 protan,
  normal 34.9, contraste). L'encodage porte du sens: bleu = remboursable,
  rouge = perdu.

Source: tokyo_insights/data/processed/rents_harmonized.parquet
  ⚠️ Seules les collectes portant les colonnes Deposit/Gratuity comptent
  (patch scrapers 04/09/2026, suumo + athome). Un tiret dans l'annonce = ZERO
  exige, PAS une donnee manquante: les zeros sont donc de VRAIS zeros.

Ecrit:
  outreach/tokyo-entry-cost-by-ward.png   (la munition)
  outreach/tokyo-entry-cost-by-ward.csv   (article Fernando + tableau client)

  python scripts/generate_entry_cost_by_ward_chart.py
"""
import io
import sys
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.patches import Patch

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
PARQUET = Path("C:/Users/alegu/Desktop/tokyo_insights/data/processed/rents_harmonized.parquet")

NAVY = "#0f2744"
BLUE = "#3b82f6"    # depot: remboursable
RED = "#e84141"     # key money: perdu
INK = "#374151"
MUTED = "#94a3b8"
GRID = "#f1f5f9"
TRACK = "#dbeafe"   # rail du lollipop, meme teinte que BLUE en clair

WARDS_EN = {
    "千代田区": "Chiyoda", "中央区": "Chuo", "港区": "Minato", "新宿区": "Shinjuku",
    "文京区": "Bunkyo", "台東区": "Taito", "墨田区": "Sumida", "江東区": "Koto",
    "品川区": "Shinagawa", "目黒区": "Meguro", "大田区": "Ota", "世田谷区": "Setagaya",
    "渋谷区": "Shibuya", "中野区": "Nakano", "杉並区": "Suginami", "豊島区": "Toshima",
    "北区": "Kita", "荒川区": "Arakawa", "板橋区": "Itabashi", "練馬区": "Nerima",
    "足立区": "Adachi", "葛飾区": "Katsushika", "江戸川区": "Edogawa",
}


def load():
    """Medianes par ward, sur les seules lignes qui portent reellement la donnee."""
    df = pd.read_parquet(
        PARQUET,
        columns=["Prefecture", "Ward", "RentJPY", "DepositJPY", "GratuityJPY"],
    )
    d = df[df["DepositJPY"].notna() & df["GratuityJPY"].notna() & df["RentJPY"].notna()]
    d = d[d["Prefecture"].astype(str).str.contains("東京", na=False)]
    d = d[d["Ward"].isin(WARDS_EN)].copy()

    # Garde-fous: loyers aberrants et frais d'entree impossibles (saisies fausses).
    d = d[(d["RentJPY"] > 20_000) & (d["RentJPY"] < 2_000_000)]
    d["Upfront"] = d["DepositJPY"] + d["GratuityJPY"]
    d = d[d["Upfront"] / d["RentJPY"] < 12]

    g = d.groupby("Ward").agg(
        n=("RentJPY", "size"),
        rent_med=("RentJPY", "median"),
        dep_med=("DepositJPY", "median"),
        key_med=("GratuityJPY", "median"),
        upfront_med=("Upfront", "median"),
        zero_dep=("DepositJPY", lambda s: (s == 0).mean() * 100),
        zero_key=("GratuityJPY", lambda s: (s == 0).mean() * 100),
    )
    g["ward_en"] = [WARDS_EN[w] for w in g.index]
    # On trie sur la quantite REELLEMENT dessinee (somme des deux medianes), sinon
    # les barres ne decroissent pas franchement et la composition perd son sens.
    g["bar_total"] = g["dep_med"] + g["key_med"]
    g = g.sort_values("bar_total", ascending=False)
    return d, g


def yen(v):
    return f"¥{v/1000:,.0f}k"


def build(g, totals):
    n_rows = len(g)
    ward = list(g["ward_en"])[::-1]          # matplotlib empile du bas vers le haut
    dep = list(g["dep_med"])[::-1]
    key = list(g["key_med"])[::-1]
    zero = list(g["zero_dep"])[::-1]
    y = range(n_rows)

    fig, (axL, axR) = plt.subplots(
        1, 2, figsize=(13.6, 9.6), sharey=True,
        gridspec_kw={"width_ratios": [1.62, 1], "wspace": 0.06},
    )
    plt.subplots_adjust(top=0.815, bottom=0.105, left=0.093, right=0.975)

    # --- Panneau gauche : ce qu'on sort a l'entree -------------------------
    xmax = max(d + k for d, k in zip(dep, key))
    gap = xmax * 0.004  # espace de surface 2px entre les deux segments

    axL.barh(y, dep, height=0.66, color=BLUE, zorder=3)
    axL.barh(y, key, left=[d + gap for d in dep], height=0.66, color=RED, zorder=3)

    for i, (d_, k_) in enumerate(zip(dep, key)):
        # Depot median a zero: sans le dire, la barre sans bleu passe pour un bug.
        note = "  key money only" if d_ == 0 else ""
        axL.text(d_ + k_ + xmax * 0.018, i, yen(d_ + k_) + note, va="center", ha="left",
                 fontsize=9.6, color=INK, fontweight="bold")

    axL.set_xlim(0, xmax * 1.20)
    axL.set_ylim(-0.7, n_rows - 0.3)
    axL.set_yticks(list(y))
    axL.set_yticklabels(ward, fontsize=10.6, color="#1f2937")
    axL.xaxis.set_major_formatter(lambda v, _: "0" if v == 0 else f"¥{int(v/1000)}k")
    axL.tick_params(axis="x", labelsize=9.3, colors=MUTED)
    axL.tick_params(axis="y", length=0)
    axL.xaxis.grid(True, color=GRID, lw=1, zorder=0)
    axL.set_axisbelow(True)
    for s in ("top", "right", "left"):
        axL.spines[s].set_visible(False)
    axL.spines["bottom"].set_color("#e5e7eb")
    axL.set_title("What you hand over to move in", fontsize=12.6, fontweight="bold",
                  color=NAVY, pad=13, loc="left")

    axL.legend(
        handles=[Patch(facecolor=BLUE, label="Deposit (shikikin) — refundable"),
                 Patch(facecolor=RED, label="Key money (reikin) — gone for good")],
        loc="lower right", frameon=False, fontsize=10.2, handlelength=1.15,
        borderaxespad=1.1,
    )

    # --- Panneau droite : combien d'annonces ne demandent RIEN ------------
    axR.hlines(list(y), 0, zero, color=TRACK, lw=3.4, zorder=2)
    axR.plot(zero, list(y), "o", ms=9.5, color=BLUE, mec="white", mew=2, zorder=3)
    for i, z in enumerate(zero):
        axR.text(z + 1.7, i, f"{z:.0f}%", va="center", ha="left",
                 fontsize=9.6, color=INK, fontweight="bold")

    axR.set_xlim(0, 72)
    axR.xaxis.set_major_formatter(lambda v, _: f"{int(v)}%")
    axR.tick_params(axis="x", labelsize=9.3, colors=MUTED)
    axR.tick_params(axis="y", length=0)
    axR.xaxis.grid(True, color=GRID, lw=1, zorder=0)
    axR.set_axisbelow(True)
    for s in ("top", "right", "left"):
        axR.spines[s].set_visible(False)
    axR.spines["bottom"].set_color("#e5e7eb")
    axR.set_title("Share of listings asking for no deposit at all",
                  fontsize=12.6, fontweight="bold", color=NAVY, pad=13, loc="left")

    # --- Habillage editorial ----------------------------------------------
    fig.suptitle(
        "Tokyo's cheapest wards ask for less up front, and often for nothing at all",
        fontsize=20.5, fontweight="bold", color=NAVY, y=0.972, x=0.093, ha="left",
    )
    fig.text(
        0.093, 0.925,
        "Median deposit plus median key money, and the share of landlords waiving "
        "the deposit entirely, across Tokyo's 23 wards.",
        ha="left", fontsize=11.6, color="#6b7280",
    )
    fig.text(
        0.093, 0.879,
        f"{totals['zero_dep']:.0f}% of all Tokyo listings ask for no deposit  ·  "
        f"in Adachi it is {g.loc['足立区', 'zero_dep']:.0f}%, in Minato {g.loc['港区', 'zero_dep']:.0f}%",
        ha="left", fontsize=13.4, fontweight="bold", color=RED,
    )
    fig.text(
        0.093, 0.045,
        f"Source: {totals['n']:,} active rental listings across Tokyo's 23 wards, September 2026 "
        f"(n = {int(g['n'].min()):,} to {int(g['n'].max()):,} per ward).",
        ha="left", fontsize=8.8, color="#9ca3af",
    )
    fig.text(
        0.093, 0.022,
        "Medians; each segment is a median in its own right. Agency and guarantor fees are never "
        "published in listings and are excluded.",
        ha="left", fontsize=8.8, color="#9ca3af",
    )
    fig.text(0.975, 0.033, "tokyo-expat.com", ha="right", fontsize=9.2, color="#9ca3af")

    out = ROOT / "outreach" / "tokyo-entry-cost-by-ward.png"
    fig.savefig(out, dpi=150, facecolor="white")
    plt.close(fig)
    print(f"Ecrit: {out}")
    return out


def main():
    d, g = load()
    totals = {
        "n": len(d),
        "zero_dep": (d["DepositJPY"] == 0).mean() * 100,
        "zero_key": (d["GratuityJPY"] == 0).mean() * 100,
        "upfront_med": d["Upfront"].median(),
    }
    print(f"n = {totals['n']:,} lignes | {len(g)} wards | "
          f"depot a zero {totals['zero_dep']:.1f}% | key money a zero {totals['zero_key']:.1f}%")

    csv = ROOT / "outreach" / "tokyo-entry-cost-by-ward.csv"
    (g.reset_index()
       .rename(columns={"Ward": "ward_jp", "n": "listings",
                        "rent_med": "median_rent_jpy",
                        "dep_med": "median_deposit_jpy",
                        "key_med": "median_key_money_jpy",
                        "upfront_med": "median_upfront_jpy",
                        "zero_dep": "pct_no_deposit",
                        "zero_key": "pct_no_key_money"})
       [["ward_en", "ward_jp", "listings", "median_rent_jpy", "median_deposit_jpy",
         "median_key_money_jpy", "median_upfront_jpy", "pct_no_deposit", "pct_no_key_money"]]
       .round(1)
       .to_csv(csv, index=False, encoding="utf-8-sig"))
    print(f"Ecrit: {csv}")

    build(g, totals)


if __name__ == "__main__":
    main()
