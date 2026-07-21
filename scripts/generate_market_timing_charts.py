# -*- coding: utf-8 -*-
"""
generate_market_timing_charts.py -- 2 visuels data (source /data):
  (A) TAUX D'ACCEPTATION des etrangers par voie (30-45% seul -> 90-98% share house)
  (B) SAISONNALITE du marche locatif (quand chercher / negocier)
Ecrit outreach/ ET public/. Accents FR verifies.

  python scripts/generate_market_timing_charts.py
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
RED = "#e84141"
AMBER = "#d99a00"
GREEN = "#1f9d55"
GREY = "#9aa7b5"
INK = "#374151"
MUTED = "#94a3b8"


def approval(locale):
    is_fr = locale == "fr"
    # (label EN, label FR, min%, max%) du plus dur (bas) au plus facile (haut)
    ROWS = [
        ("Without a bilingual agent", "Sans agent bilingue",      30, 45),
        ("With a bilingual agent",    "Avec un agent bilingue",   70, 80),
        ("Share house / furnished",   "Share house / meublé",     90, 98),
    ]
    labels = [(f if is_fr else e) for e, f, *_ in ROWS]
    mids = [(r[2] + r[3]) / 2 for r in ROWS]
    colors = [RED, AMBER, GREEN]
    y = range(len(ROWS))
    fig, ax = plt.subplots(figsize=(11, 5.0))
    plt.subplots_adjust(top=0.80, bottom=0.14, left=0.28, right=0.965)
    for i, r in enumerate(ROWS):
        ax.barh(i, mids[i], height=0.58, color=colors[i], edgecolor="white")
        ax.text(mids[i] + 1.5, i, f"{r[2]}-{r[3]}%", va="center", ha="left",
                fontsize=12, fontweight="bold", color=colors[i])
    ax.set_yticks(y)
    ax.set_yticklabels(labels, fontsize=11, color="#1f2937", fontweight="bold")
    ax.set_xlim(0, 112)
    ax.set_xticks([0, 25, 50, 75, 100])
    ax.xaxis.set_major_formatter(lambda x, _: f"{int(x)}%")
    ax.tick_params(axis="x", labelsize=10, colors=MUTED)
    for s in ["top", "right", "left"]:
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_color("#e5e7eb")
    ax.xaxis.grid(True, color="#f1f5f9", lw=1)
    ax.set_axisbelow(True)
    title = ("Vos chances d'être accepté comme locataire étranger" if is_fr
             else "Your odds of being accepted as a foreign tenant")
    sub = ("Taux d'acceptation estimé selon la voie choisie, marché locatif de Tokyo."
           if is_fr else
           "Estimated acceptance rate by route, Tokyo rental market.")
    fig.suptitle(title, fontsize=18, fontweight="bold", color=NAVY, y=0.965)
    fig.text(0.5, 0.865, sub, ha="center", fontsize=11, color="#6b7280")
    fig.text(0.965, 0.02, "Source: tokyo-expat.com", ha="right", fontsize=8.5, color="#9ca3af")
    for d in ("outreach", "public"):
        fig.savefig(ROOT / d / f"tokyo-approval-rate-{locale}.png", dpi=150, facecolor="white")
    plt.close(fig)
    print(f"Ecrit: tokyo-approval-rate-{locale}.png")


def seasonality(locale):
    is_fr = locale == "fr"
    # (periode, niveau_demande 1-3, note EN, note FR, couleur)
    ROWS = [
        ("Feb - Apr", "Fév - Avr", 3, "Peak: transfers + universities", "Haute: mutations + universités",       RED),
        ("Sep - Oct", "Sep - Oct", 2, "Active: foreign arrivals",       "Active: arrivées étrangères",          AMBER),
        ("Nov - Jan", "Nov - Jan", 1, "Year-end slowdown",              "Ralentissement de fin d'année",        GREEN),
        ("May - Aug", "Mai - Août", 1, "Quiet: best time to negotiate",  "Basse: meilleur moment pour négocier", GREEN),
    ]
    labels = [(f if is_fr else e) for e, f, *_ in ROWS]
    notes = [(r[4] if is_fr else r[3]) for r in ROWS]
    vals = [r[2] for r in ROWS]
    colors = [r[5] for r in ROWS]
    y = range(len(ROWS))
    fig, ax = plt.subplots(figsize=(11, 5.0))
    plt.subplots_adjust(top=0.80, bottom=0.10, left=0.14, right=0.965)
    for i, r in enumerate(ROWS):
        ax.barh(i, vals[i], height=0.6, color=colors[i], edgecolor="white")
        ax.text(vals[i] + 0.06, i, notes[i], va="center", ha="left", fontsize=10, color=INK)
    ax.set_yticks(y)
    ax.set_yticklabels(labels, fontsize=11.5, color="#1f2937", fontweight="bold")
    ax.set_xlim(0, 7.2)
    ax.set_xticks([1, 2, 3])
    lvl = (["Basse", "Moyenne", "Haute"] if is_fr else ["Low", "Medium", "High"])
    ax.set_xticklabels(lvl)
    ax.tick_params(axis="x", labelsize=9.5, colors=MUTED)
    for s in ["top", "right", "left"]:
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_color("#e5e7eb")
    ax.xaxis.grid(True, color="#f1f5f9", lw=1)
    ax.set_axisbelow(True)
    leg = [Patch(facecolor=RED, label="Forte demande (dur)" if is_fr else "High demand (hard)"),
           Patch(facecolor=GREEN, label="Faible demande (facile)" if is_fr else "Low demand (easy)")]
    ax.legend(handles=leg, loc="upper right", frameon=False, fontsize=10)
    title = ("Quand chercher un logement à Tokyo" if is_fr
             else "When to look for housing in Tokyo")
    sub = ("Intensité de la demande locative par période. Le creux Mai-Août est le meilleur moment pour négocier."
           if is_fr else
           "Rental demand intensity by period. The May-Aug lull is the best time to negotiate.")
    fig.suptitle(title, fontsize=18.5, fontweight="bold", color=NAVY, y=0.965)
    fig.text(0.5, 0.865, sub, ha="center", fontsize=10.5, color="#6b7280")
    fig.text(0.965, 0.02, "Source: tokyo-expat.com", ha="right", fontsize=8.5, color="#9ca3af")
    for d in ("outreach", "public"):
        fig.savefig(ROOT / d / f"tokyo-seasonality-{locale}.png", dpi=150, facecolor="white")
    plt.close(fig)
    print(f"Ecrit: tokyo-seasonality-{locale}.png")


for loc in ("en", "fr"):
    approval(loc)
    seasonality(loc)
