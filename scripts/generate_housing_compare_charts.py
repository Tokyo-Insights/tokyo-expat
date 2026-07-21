# -*- coding: utf-8 -*-
"""
generate_housing_compare_charts.py -- 2 visuels de comparaison par type de logement:
  (2) fourchette de LOYER mensuel par type (barres flottantes min-max)
  (3) DELAI pour trouver + concurrence par type
Completent la "barriere d'entree" (#1). Data domaine (lib/listings + /data).
Ecrit outreach/ ET public/ (self-contained). Accents FR verifies.

  python scripts/generate_housing_compare_charts.py
"""
import io, sys
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
NAVY = "#0f2744"
BAR = "#1e3a5f"
RED = "#e84141"
INK = "#374151"
MUTED = "#94a3b8"

# ordre: du plus accessible (bas) au plus exigeant (haut)
# (label EN, label FR, loyer_min, loyer_max, semaines_min, semaines_max, concurrence EN, concurrence FR)
TYPES = [
    ("Share house",     "Share house",         35000,  90000, 1, 2, "Low to moderate",           "Faible à modérée"),
    ("Monthly mansion", "Appartement meublé",  80000, 200000, 2, 4, "Moderate",                  "Modérée"),
    ("Standard lease",  "Location standard",   60000, 250000, 4, 8, "High: guarantor + bank",    "Élevée : garant + banque"),
]


def _base(ax, labels):
    ax.set_yticks(range(len(labels)))
    ax.set_yticklabels(labels, fontsize=11, color="#1f2937", fontweight="bold")
    for s in ["top", "right", "left"]:
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_color("#e5e7eb")
    ax.xaxis.grid(True, color="#f1f5f9", lw=1)
    ax.set_axisbelow(True)
    ax.tick_params(axis="x", labelsize=10, colors=MUTED)


def rent_range(locale):
    is_fr = locale == "fr"
    labels = [(f if is_fr else e) for e, f, *_ in TYPES]
    y = range(len(TYPES))
    fig, ax = plt.subplots(figsize=(11, 5.2))
    plt.subplots_adjust(top=0.80, bottom=0.14, left=0.20, right=0.965)
    for i, ty in enumerate(TYPES):
        lo, hi = ty[2], ty[3]
        ax.barh(i, hi - lo, left=lo, height=0.5, color=BAR, edgecolor="white")
        ax.text(lo - 3000, i, f"{lo//1000}k", va="center", ha="right", fontsize=9.5, color=MUTED)
        usd_lo, usd_hi = round(lo/160/10)*10, round(hi/160/10)*10
        ax.text(hi + 5000, i, f"{hi//1000}k JPY   (~\\${usd_lo:,}-{usd_hi:,})", va="center", ha="left",
                fontsize=9.5, color=INK, fontweight="bold")
    _base(ax, labels)
    ax.set_xlim(0, 360000)
    ax.xaxis.set_major_formatter(lambda x, _: f"{int(x/1000)}k" if x else "0")
    ax.set_xlabel("Median monthly rent range (JPY)" if not is_fr else "Fourchette de loyer mensuel (JPY)",
                  fontsize=11.5, color="#374151", labelpad=10)
    title = ("Combien coûte chaque type de logement" if is_fr
             else "What each type of housing costs")
    sub = ("Fourchette de loyer mensuel par type de logement à Tokyo. USD à ~160 JPY."
           if is_fr else
           "Monthly rent range by housing type in Tokyo. USD at ~160 JPY.")
    fig.suptitle(title, fontsize=18.5, fontweight="bold", color=NAVY, y=0.965)
    fig.text(0.5, 0.87, sub, ha="center", fontsize=11, color="#6b7280")
    fig.text(0.965, 0.02, "Source: tokyo-expat.com", ha="right", fontsize=8.5, color="#9ca3af")
    for d in ("outreach", "public"):
        fig.savefig(ROOT / d / f"tokyo-housing-rent-range-{locale}.png", dpi=150, facecolor="white")
    plt.close(fig)
    print(f"Ecrit: tokyo-housing-rent-range-{locale}.png")


def time_to_find(locale):
    is_fr = locale == "fr"
    labels = [(f if is_fr else e) for e, f, *_ in TYPES]
    comp = [(ty[7] if is_fr else ty[6]) for ty in TYPES]
    y = range(len(TYPES))
    fig, ax = plt.subplots(figsize=(11, 5.2))
    plt.subplots_adjust(top=0.80, bottom=0.14, left=0.20, right=0.965)
    for i, ty in enumerate(TYPES):
        lo, hi = ty[4], ty[5]
        ax.barh(i, hi - lo, left=lo, height=0.5, color=BAR, edgecolor="white")
        wk = "semaines" if is_fr else "weeks"
        ax.text(hi + 0.15, i, f"{lo}-{hi} {wk}   ·   {comp[i]}", va="center", ha="left",
                fontsize=9.5, color=INK)
    _base(ax, labels)
    ax.set_xlim(0, 13.5)
    ax.set_xticks([0, 2, 4, 6, 8])
    ax.set_xlabel("Weeks to find housing" if not is_fr else "Semaines pour trouver un logement",
                  fontsize=11.5, color="#374151", labelpad=10)
    title = ("Combien de temps pour trouver, par type de logement" if is_fr
             else "How long it takes to find, by housing type")
    sub = ("Delai typique et concurrence par type de logement à Tokyo."
           if is_fr else
           "Typical time to find and competition, by housing type in Tokyo.")
    if is_fr:
        sub = "Délai typique et concurrence par type de logement à Tokyo."
    fig.suptitle(title, fontsize=18.5, fontweight="bold", color=NAVY, y=0.965)
    fig.text(0.5, 0.87, sub, ha="center", fontsize=11, color="#6b7280")
    fig.text(0.965, 0.02, "Source: tokyo-expat.com", ha="right", fontsize=8.5, color="#9ca3af")
    for d in ("outreach", "public"):
        fig.savefig(ROOT / d / f"tokyo-housing-time-{locale}.png", dpi=150, facecolor="white")
    plt.close(fig)
    print(f"Ecrit: tokyo-housing-time-{locale}.png")


for loc in ("en", "fr"):
    rent_range(loc)
    time_to_find(loc)
