# -*- coding: utf-8 -*-
"""
generate_movein_cost_chart.py -- Le choc n1 des etrangers: le loyer affiche n'est
pas ce qu'on paie pour entrer. Barres horizontales par poste de cout, encodees sur
2 couleurs SEULEMENT (remboursable vs non) = lisible + l'encodage porte du sens.

Palette validee (skill dataviz, validate_palette.js, mode light): #3b82f6 + #e84141
ALL CHECKS PASS (bande de luminosite, chroma, CVD 27.2 protan, contraste).

Ecrit outreach/tokyo-movein-cost-en.png et -fr.png

  python scripts/generate_movein_cost_chart.py
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
BLUE = "#3b82f6"   # remboursable
RED = "#e84141"    # non remboursable
INK = "#374151"
MUTED = "#94a3b8"

RENT = 100_000
# (label EN, label FR, montant, remboursable)
ITEMS = [
    ("First month rent",   "Premier mois de loyer",        100_000, False),
    ("Deposit (shikikin)", "Dépôt de garantie (shikikin)", 100_000, True),
    ("Key money (reikin)", "Argent-clé (reikin)",          100_000, False),
    ("Agency fee",         "Frais d'agence",               100_000, False),
    ("Guarantor company",  "Société de garantie",           50_000, False),
    ("Home insurance",     "Assurance habitation",          20_000, False),
    ("Lock change",        "Changement de serrure",         20_000, False),
]
TOTAL = sum(x[2] for x in ITEMS)


def fmt(n, is_fr):
    """Nombre formate: espace insecable fine en FR, virgule en EN."""
    return f"{n:,}".replace(",", " ") if is_fr else f"{n:,}"


def build(locale):
    is_fr = locale == "fr"
    labels = [(f if is_fr else e) for e, f, _, _ in ITEMS]
    vals = [v for _, _, v, _ in ITEMS]
    refund = [r for _, _, _, r in ITEMS]

    order = sorted(range(len(vals)), key=lambda i: vals[i])  # petit -> grand (bas -> haut)
    labels = [labels[i] for i in order]
    vals = [vals[i] for i in order]
    refund = [refund[i] for i in order]
    y = list(range(len(vals)))

    fig, ax = plt.subplots(figsize=(11.5, 6.4))
    plt.subplots_adjust(top=0.80, bottom=0.13, left=0.29, right=0.95)

    ax.barh(y, vals, height=0.62, color=[BLUE if r else RED for r in refund],
            edgecolor="white", linewidth=2)
    for i, v in enumerate(vals):
        usd = round(v / 160 / 10) * 10
        ax.text(v + TOTAL * 0.008, i, f"{fmt(v, is_fr)} JPY   ~\\${usd:,.0f}",
                va="center", ha="left", fontsize=10, color=INK, fontweight="bold")

    ax.set_yticks(y)
    ax.set_yticklabels(labels, fontsize=10.5, color="#1f2937")
    ax.set_xlim(0, max(vals) * 1.42)
    ax.xaxis.set_major_formatter(lambda x, _: f"{int(x/1000)}k" if x else "0")
    ax.tick_params(axis="x", labelsize=9.5, colors=MUTED)
    for s in ["top", "right", "left"]:
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_color("#e5e7eb")
    ax.xaxis.grid(True, color="#f1f5f9", lw=1)
    ax.set_axisbelow(True)

    leg = [Patch(facecolor=RED, label="Non-refundable" if not is_fr else "Non remboursable"),
           Patch(facecolor=BLUE, label="Refundable (you get it back)" if not is_fr else "Remboursable (vous le récupérez)")]
    ax.legend(handles=leg, loc="lower right", frameon=False, fontsize=10.5, handlelength=1.2)

    hero_usd = round(TOTAL / 160 / 10) * 10
    months = f"{TOTAL/RENT:.1f}".replace(".", ",") if is_fr else f"{TOTAL/RENT:.1f}"
    if is_fr:
        title = "Le loyer affiché n'est pas ce que vous payez pour entrer"
        sub = (f"Coût réel d'entrée dans un logement à {fmt(RENT, True)} JPY/mois à Tokyo. "
               f"Valeurs typiques 2026, USD à ~160 JPY.")
        hero = (f"≈ {fmt(TOTAL, True)} JPY à l'entrée  ·  environ {months} mois de loyer  "
                f"·  ~{fmt(hero_usd, True)} USD")
    else:
        title = "The advertised rent is not what you pay to move in"
        sub = (f"What it actually costs to move into a {fmt(RENT, False)} JPY/month Tokyo apartment. "
               f"Typical 2026 figures, USD at ~160 JPY.")
        hero = (f"≈ {fmt(TOTAL, False)} JPY upfront  ·  about {months} months of rent  "
                f"·  ~US\\${fmt(hero_usd, False)}")

    fig.suptitle(title, fontsize=19, fontweight="bold", color=NAVY, y=0.975)
    fig.text(0.5, 0.915, sub, ha="center", fontsize=11, color="#6b7280")
    fig.text(0.5, 0.855, hero, ha="center", fontsize=14, fontweight="bold", color=RED)
    fig.text(0.95, 0.03, "Source: tokyo-expat.com", ha="right", fontsize=8.5, color="#9ca3af")

    out = ROOT / "outreach" / f"tokyo-movein-cost-{locale}.png"
    fig.savefig(out, dpi=150, facecolor="white")
    plt.close(fig)
    print(f"Ecrit: {out}")


for loc in ("en", "fr"):
    build(loc)
print(f"Total: {TOTAL:,} JPY = {TOTAL/RENT:.1f} mois")
