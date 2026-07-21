# -*- coding: utf-8 -*-
"""
generate_household_charts.py -- 2 visuels data (lib/tokyoRentIndex.json):
  (A) LE FLIP: le quartier le moins cher change selon le foyer (celibataire 1K /
      couple 1LDK / famille 2LDK). Prouve la stat-titre n2 du Rent Report.
  (B) Loyer FAMILIAL (2LDK) par arrondissement, classe (23 wards).
Ecrit outreach/ ET public/. Accents FR verifies.

  python scripts/generate_household_charts.py
"""
import io, sys, json
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.colors import Normalize

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
INDEX = ROOT / "lib" / "tokyoRentIndex.json"
NAVY = "#0f2744"
BAR = "#1e3a5f"
GREEN = "#1f9d55"
INK = "#374151"
MUTED = "#94a3b8"

d = json.loads(INDEX.read_text(encoding="utf-8"))


def cheapest(layout, n=5):
    r = [(w["ward_en"], w["rents"][layout]["median"]) for w in d["wards"] if w.get("rents", {}).get(layout)]
    r.sort(key=lambda x: x[1])
    return r[:n]


def usdlab(v):
    return f"{v/1000:.0f}k  ~\\${round(v/160/10)*10:,}"


def flip(locale):
    is_fr = locale == "fr"
    groups = [
        (("Célibataire (1K)" if is_fr else "Single (1K)"), "1K"),
        (("Couple (1LDK)" if is_fr else "Couple (1LDK)"), "1LDK"),
        (("Famille (2LDK)" if is_fr else "Family (2LDK)"), "2LDK"),
    ]
    fig, axes = plt.subplots(3, 1, figsize=(10.5, 8.6))
    plt.subplots_adjust(top=0.86, bottom=0.06, left=0.24, right=0.80, hspace=0.42)
    for ax, (label, layout) in zip(axes, groups):
        rows = cheapest(layout, 5)
        rows = rows[::-1]  # le moins cher en haut
        names = [r[0] for r in rows]
        vals = [r[1] for r in rows]
        y = range(len(rows))
        colors = [GREEN if i == len(rows) - 1 else BAR for i in range(len(rows))]  # #1 (haut) en vert
        ax.barh(y, vals, height=0.62, color=colors, edgecolor="white")
        for i, v in enumerate(vals):
            ax.text(v + max(vals) * 0.012, i, usdlab(v), va="center", ha="left", fontsize=9, color=INK)
        ax.set_yticks(y); ax.set_yticklabels(names, fontsize=10, color="#1f2937")
        ax.set_xlim(0, max(vals) * 1.32)
        ax.set_xticks([])
        for s in ["top", "right", "bottom"]:
            ax.spines[s].set_visible(False)
        ax.spines["left"].set_color("#cbd5e1")
        ax.set_title(label, loc="left", fontsize=12.5, fontweight="bold", color=NAVY, pad=6)
    title = ("Le quartier le moins cher dépend de votre foyer" if is_fr
             else "The cheapest ward depends on your household")
    sub = ("Les 5 arrondissements les moins chers, par type de foyer. Le n°1 change à chaque fois."
           if is_fr else
           "The 5 cheapest wards, by household type. The number one changes each time.")
    fig.suptitle(title, fontsize=18.5, fontweight="bold", color=NAVY, y=0.965)
    fig.text(0.5, 0.905, sub, ha="center", fontsize=11, color="#6b7280")
    fig.text(0.80, 0.02, "Source: tokyo-expat.com  ·  ~160 JPY / USD", ha="right", fontsize=8.5, color="#9ca3af")
    for dd in ("outreach", "public"):
        fig.savefig(ROOT / dd / f"tokyo-household-flip-{locale}.png", dpi=150, facecolor="white")
    plt.close(fig)
    print(f"Ecrit: tokyo-household-flip-{locale}.png")


def family_map(locale):
    is_fr = locale == "fr"
    rows = [(w["ward_en"], w["rents"]["2LDK"]["median"]) for w in d["wards"] if w.get("rents", {}).get("2LDK")]
    rows.sort(key=lambda x: x[1])
    names = [r[0] for r in rows]
    vals = [r[1] for r in rows]
    y = range(len(rows))
    norm = Normalize(vmin=min(vals), vmax=max(vals))
    colors = [plt.cm.RdYlGn_r(norm(v)) for v in vals]
    fig, ax = plt.subplots(figsize=(11, 9.8))
    plt.subplots_adjust(top=0.885, bottom=0.09, left=0.20, right=0.965)
    ax.barh(y, vals, color=colors, edgecolor="white", height=0.78)
    for i, v in enumerate(vals):
        ax.text(v + max(vals) * 0.008, i, usdlab(v), va="center", ha="left", fontsize=9.5, color="#333")
    ax.set_yticks(y); ax.set_yticklabels(names, fontsize=10.5, color="#1f2937")
    ax.set_xlim(0, max(vals) * 1.26)
    ax.xaxis.set_major_formatter(lambda x, _: f"{int(x/1000)}k" if x else "0")
    ax.tick_params(axis="x", labelsize=10, colors=MUTED)
    for s in ["top", "right", "left"]:
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_color("#cbd5e1")
    ax.xaxis.grid(True, color="#eef1f4", lw=1); ax.set_axisbelow(True)
    ax.set_xlabel("Median monthly rent, 2LDK family flat (JPY)" if not is_fr
                  else "Loyer mensuel médian, appartement familial 2LDK (JPY)",
                  fontsize=12, color="#374151", labelpad=10)
    title = ("Loyer d'un appartement familial (2LDK) par arrondissement" if is_fr
             else "Family flat (2LDK) rent by Tokyo ward")
    sub = ("Loyer mensuel médian d'un 2LDK dans les 23 arrondissements de Tokyo, 2026. USD à ~160 JPY."
           if is_fr else
           "Median monthly rent for a 2LDK across Tokyo's 23 wards, 2026. USD at ~160 JPY.")
    fig.suptitle(title, fontsize=19, fontweight="bold", color=NAVY, x=0.5, y=0.975)
    fig.text(0.5, 0.925, sub, ha="center", fontsize=11.5, color="#6b7280")
    fig.text(0.965, 0.012, "Source: tokyo-expat.com  ·  median, not average", ha="right", fontsize=9, color="#9ca3af")
    for dd in ("outreach", "public"):
        fig.savefig(ROOT / dd / f"tokyo-family-rent-ward-{locale}.png", dpi=150, facecolor="white")
    plt.close(fig)
    print(f"Ecrit: tokyo-family-rent-ward-{locale}.png")


for loc in ("en", "fr"):
    flip(loc)
    family_map(loc)
