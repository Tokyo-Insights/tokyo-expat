# -*- coding: utf-8 -*-
"""
generate_process_diagrams.py -- 2 schemas CONCEPT (clarifient, pas de data):
  (A) le PROCESSUS de location/installation (visa -> carte de sejour -> banque
      -> garant -> bail -> emmenagement). Clarifie l'ORDRE + la dependance
      (la carte de sejour debloque tout).
  (B) le SYSTEME du GARANT (locataire -> societe de garantie -> bailleur).
Ecrit outreach/ ET public/. Accents FR verifies.

  python scripts/generate_process_diagrams.py
"""
import io, sys
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
NAVY = "#0f2744"
BLUE = "#1e3a5f"
RED = "#e84141"
INK = "#374151"
MUTED = "#94a3b8"
LIGHT = "#e8edf3"


def _box(ax, cx, cy, w, h, title, sub, fc, tc="white", sc=None):
    ax.add_patch(FancyBboxPatch((cx - w/2, cy - h/2), w, h,
                                boxstyle="round,pad=0.02,rounding_size=0.06",
                                fc=fc, ec="white", lw=1.5, zorder=2))
    ax.text(cx, cy + h*0.12, title, ha="center", va="center", fontsize=10.5,
            fontweight="bold", color=tc, zorder=3)
    if sub:
        ax.text(cx, cy - h*0.24, sub, ha="center", va="center", fontsize=8.2,
                color=sc or "#c9d4e0", zorder=3)


def process(locale):
    is_fr = locale == "fr"
    STEPS = (
        [("Visa", "Avant de partir"), ("Carte de séjour", "Jour 1 · mairie"),
         ("Compte bancaire", "Semaine 1-2"), ("Garant", "Avant la signature"),
         ("Bail signé", "Semaine 2-4"), ("Emménagement", "C'est fait")]
        if is_fr else
        [("Visa", "Before you fly"), ("Residence card", "Day 1 · ward office"),
         ("Bank account", "Week 1-2"), ("Guarantor", "Before signing"),
         ("Lease signed", "Week 2-4"), ("Move in", "Done")]
    )
    n = len(STEPS)
    fig, ax = plt.subplots(figsize=(14, 4.4))
    plt.subplots_adjust(top=0.72, bottom=0.14, left=0.02, right=0.98)
    ax.set_xlim(0, n); ax.set_ylim(0, 1); ax.axis("off")
    w, h, cy = 0.86, 0.52, 0.5
    for i, (title, sub) in enumerate(STEPS):
        cx = i + 0.5
        fc = RED if i == 1 else BLUE
        _box(ax, cx, cy, w, h, f"{i+1}. {title}", sub, fc)
        if i < n - 1:
            ax.add_patch(FancyArrowPatch((cx + w/2, cy), (cx + 1 - w/2, cy),
                                         arrowstyle="-|>", mutation_scale=14,
                                         color=MUTED, lw=1.6, zorder=1))
    ax.annotate("" , (1.5, 0.5 + h/2), (1.5, 0.5 + h/2))
    gate = ("La carte de séjour débloque tout : banque, bail, assurance santé. Faites-la le jour 1."
            if is_fr else
            "Your residence card unlocks everything: bank, lease, health insurance. Get it on day 1.")
    ax.text(1.5, 0.5 + h/2 + 0.10, "↑ " + gate, ha="left", va="bottom", fontsize=9.5,
            color=RED, fontweight="bold")
    title = ("L'ordre des étapes pour s'installer à Tokyo" if is_fr
             else "The order of steps to settle in Tokyo")
    fig.suptitle(title, fontsize=19, fontweight="bold", color=NAVY, y=0.93)
    fig.text(0.98, 0.03, "Source: tokyo-expat.com", ha="right", fontsize=8.5, color="#9ca3af")
    for d in ("outreach", "public"):
        fig.savefig(ROOT / d / f"tokyo-process-{locale}.png", dpi=150, facecolor="white")
    plt.close(fig)
    print(f"Ecrit: tokyo-process-{locale}.png")


def guarantor(locale):
    is_fr = locale == "fr"
    fig, ax = plt.subplots(figsize=(12, 4.6))
    plt.subplots_adjust(top=0.74, bottom=0.10, left=0.03, right=0.97)
    ax.set_xlim(0, 3); ax.set_ylim(0, 1); ax.axis("off")
    w, h, cy = 0.82, 0.42, 0.6
    nodes = (
        [("Vous", "le locataire"), ("Société de garantie", "le tiers payeur"), ("Bailleur", "le propriétaire")]
        if is_fr else
        [("You", "the tenant"), ("Guarantor company", "the third party"), ("Landlord", "the property owner")]
    )
    fcs = [BLUE, RED, NAVY]
    for i, (t, s) in enumerate(nodes):
        _box(ax, i + 0.5, cy, w, h, t, s, fcs[i])
        if i < 2:
            ax.add_patch(FancyArrowPatch((i + 0.5 + w/2, cy), (i + 1.5 - w/2, cy),
                                         arrowstyle="-|>", mutation_scale=16, color=MUTED, lw=1.8))
    a1 = ("Vous payez ~0,5-1 mois\n+ renouvellement annuel" if is_fr
          else "You pay ~0.5-1 month\n+ yearly renewal")
    a2 = ("La société garantit\nvotre loyer au bailleur" if is_fr
          else "The company guarantees\nyour rent to the landlord")
    ax.text(1.0, cy + h/2 + 0.06, a1, ha="center", va="bottom", fontsize=8.8, color=INK)
    ax.text(2.0, cy + h/2 + 0.06, a2, ha="center", va="bottom", fontsize=8.8, color=INK)
    note = ("Sans garant japonais, la plupart des étrangers passent par une société de garantie. C'est normal, pas une punition."
            if is_fr else
            "Without a Japanese guarantor, most foreigners use a guarantee company. It is standard, not a penalty.")
    fig.text(0.5, 0.14, note, ha="center", fontsize=9.5, color="#6b7280")
    title = ("Comment marche le garant à Tokyo" if is_fr
             else "How the guarantor system works in Tokyo")
    fig.suptitle(title, fontsize=19, fontweight="bold", color=NAVY, y=0.93)
    fig.text(0.97, 0.02, "Source: tokyo-expat.com", ha="right", fontsize=8.5, color="#9ca3af")
    for d in ("outreach", "public"):
        fig.savefig(ROOT / d / f"tokyo-guarantor-{locale}.png", dpi=150, facecolor="white")
    plt.close(fig)
    print(f"Ecrit: tokyo-guarantor-{locale}.png")


for loc in ("en", "fr"):
    process(loc)
    guarantor(loc)
