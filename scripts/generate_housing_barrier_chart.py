# -*- coding: utf-8 -*-
"""
generate_housing_barrier_chart.py -- LA barriere d'entree par type de logement:
combien de MOIS de loyer il faut a l'entree, + garant requis ou non. Repond au
choix n1 de l'audience (quel type de logement quand on arrive).

Barres horizontales = mois de loyer a l'entree. 2 COULEURS = garant requis (rouge)
vs pas de garant (bleu). Palette validee skill dataviz (#3b82f6 + #e84141 = ALL PASS).
Ecrit outreach/ ET public/ (servi + pas de copie manuelle a oublier).

  python scripts/generate_housing_barrier_chart.py
"""
import io, sys
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
NAVY = "#0f2744"
BLUE = "#3b82f6"   # pas de garant
RED = "#e84141"    # garant requis
INK = "#374151"
MUTED = "#94a3b8"

# (label EN, label FR, mois d'entree (milieu de fourchette), garant requis, detail EN, detail FR)
ITEMS = [
    ("Share house",       "Share house",          1.0, False, "no deposit",          "sans dépôt"),
    ("Monthly mansion",   "Appartement meublé",   1.5, False, "furnished",           "meublé"),
    ("UR rental",         "Logement UR",          3.0, False, "2mo deposit",         "2 mois de dépôt"),
    ("Standard lease",    "Location standard",    5.0, True,  "deposit + key money", "dépôt + clé"),
]


def build(locale):
    is_fr = locale == "fr"
    labels = [(f if is_fr else e) for e, f, *_ in ITEMS]
    months = [i[2] for i in ITEMS]
    guar = [i[3] for i in ITEMS]
    details = [(i[5] if is_fr else i[4]) for i in ITEMS]

    order = sorted(range(len(months)), key=lambda i: months[i])
    labels = [labels[i] for i in order]
    months = [months[i] for i in order]
    guar = [guar[i] for i in order]
    details = [details[i] for i in order]
    y = list(range(len(months)))

    fig, ax = plt.subplots(figsize=(11, 5.6))
    plt.subplots_adjust(top=0.78, bottom=0.14, left=0.24, right=0.965)

    ax.barh(y, months, height=0.62, color=[RED if g else BLUE for g in guar],
            edgecolor="white", linewidth=2)
    for i, m in enumerate(months):
        mtxt = (f"{m:.0f}".replace(".0", "") if m == int(m) else f"{m:.1f}".replace(".", ","))
        unit = "mois" if is_fr else ("months" if m >= 2 else "month")
        ax.text(m + 0.08, i, f"~{mtxt} {unit}   ·   {details[i]}", va="center", ha="left",
                fontsize=9.5, color=INK)

    ax.set_yticks(y)
    ax.set_yticklabels(labels, fontsize=11, color="#1f2937", fontweight="bold")
    ax.set_xlim(0, 8.6)
    ax.set_xlabel("Months of rent needed to move in" if not is_fr else "Mois de loyer nécessaires à l'entrée",
                  fontsize=11.5, color="#374151", labelpad=10)
    ax.set_xticks([0, 1, 2, 3, 4, 5, 6])
    ax.tick_params(axis="x", labelsize=10, colors=MUTED)
    for s in ["top", "right", "left"]:
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_color("#e5e7eb")
    ax.xaxis.grid(True, color="#f1f5f9", lw=1)
    ax.set_axisbelow(True)

    leg = [Patch(facecolor=RED, label="Guarantor required" if not is_fr else "Garant requis"),
           Patch(facecolor=BLUE, label="No guarantor" if not is_fr else "Sans garant")]
    ax.legend(handles=leg, loc="lower right", frameon=False, fontsize=10.5, handlelength=1.2)

    title = ("La vraie barrière d'entrée : le type de logement" if is_fr
             else "The real barrier to entry is the type of housing")
    sub = ("Coût d'entrée en mois de loyer, par type de logement à Tokyo. Les alternatives évitent le garant."
           if is_fr else
           "Move-in cost in months of rent, by housing type in Tokyo. The alternatives skip the guarantor.")
    fig.suptitle(title, fontsize=18.5, fontweight="bold", color=NAVY, y=0.965)
    fig.text(0.5, 0.865, sub, ha="center", fontsize=11, color="#6b7280")
    fig.text(0.965, 0.02, "Source: tokyo-expat.com", ha="right", fontsize=8.5, color="#9ca3af")

    for outdir in ("outreach", "public"):
        out = ROOT / outdir / f"tokyo-housing-barrier-{locale}.png"
        fig.savefig(out, dpi=150, facecolor="white")
    plt.close(fig)
    print(f"Ecrit: outreach/ + public/ tokyo-housing-barrier-{locale}.png")


for loc in ("en", "fr"):
    build(loc)
