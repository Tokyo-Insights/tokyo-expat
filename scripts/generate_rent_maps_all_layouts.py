# -*- coding: utf-8 -*-
"""
generate_rent_maps_all_layouts.py -- Une carte choroplethe par TYPOLOGIE (layout),
sur le modele exact de generate_rent_map.py (qui ne fait que le 1K).

Sort 7 PNG dans outreach/rent-maps/ : 1K, 1DK, 1LDK, 2K, 2DK, 2LDK, 3LDK.

⚠️ N'ECRIT JAMAIS dans public/. `public/tokyo-rent-map.png` est HOTLINKE par le code
d'embed de /data (URL absolue distribuee a des tiers): le renommer ou le deplacer
casserait toutes les reprises externes. Ce script ne le touche pas, et le 1K sort
sous un nom distinct (tokyo-rent-map-1k.png).

ECHELLE DE COULEUR: chaque carte a SA PROPRE echelle, comme la carte 1K d'origine.
Les medianes vont de ¥65k (2K) a ¥620k (3LDK): une echelle commune ecraserait les
petites typologies dans une seule teinte. Consequence assumee: on lit chaque carte
pour elle-meme, on NE compare PAS deux cartes a la couleur. Passer --echelle-commune
pour l'inverse (comparables entre elles, mais chaque carte moins contrastee).

  python scripts/generate_rent_maps_all_layouts.py
  python scripts/generate_rent_maps_all_layouts.py --layouts 1LDK,2LDK
  python scripts/generate_rent_maps_all_layouts.py --echelle-commune
"""
import json, io, sys, argparse
from pathlib import Path
import geopandas as gpd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.ticker import FuncFormatter

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
DATA = ROOT / "lib" / "tokyoRentIndex.json"
GEO = Path("C:/Users/alegu/Desktop/tokyo_insights/data/boundaries/n03/N03-20_200101.geojson")
OUTDIR = ROOT / "outreach" / "rent-maps"

WARDS = {
    '千代田区': 'Chiyoda', '中央区': 'Chuo', '港区': 'Minato', '新宿区': 'Shinjuku',
    '文京区': 'Bunkyo', '台東区': 'Taito', '墨田区': 'Sumida', '江東区': 'Koto',
    '品川区': 'Shinagawa', '目黒区': 'Meguro', '大田区': 'Ota', '世田谷区': 'Setagaya',
    '渋谷区': 'Shibuya', '中野区': 'Nakano', '杉並区': 'Suginami', '豊島区': 'Toshima',
    '北区': 'Kita', '荒川区': 'Arakawa', '板橋区': 'Itabashi', '練馬区': 'Nerima',
    '足立区': 'Adachi', '葛飾区': 'Katsushika', '江戸川区': 'Edogawa',
}
NAVY = "#12263f"

# Libelles: (nom court pour le titre, glose pour le sous-titre)
LAYOUTS = {
    "1K":   ("1K studio",        "one room + separate kitchen"),
    "1DK":  ("1DK flat",         "one room + dining-kitchen"),
    "1LDK": ("1LDK flat",        "one bedroom + living-dining-kitchen"),
    "2K":   ("2K flat",          "two rooms + separate kitchen"),
    "2DK":  ("2DK flat",         "two rooms + dining-kitchen"),
    "2LDK": ("2LDK flat",        "two bedrooms + living-dining-kitchen"),
    "3LDK": ("3LDK flat",        "three bedrooms + living-dining-kitchen"),
}

# Deux paliers d'echantillon. On ne masque JAMAIS un ward (un trou dans une
# choroplethe se lit comme un bug), on le dit en pied de carte.
#   MIN_N   : en dessous, la mediane du ward tient sur trop peu d'annonces -> on le NOMME.
#   SOFT_N  : si un tiers des wards passent dessous, ce n'est plus un ward fragile,
#             c'est la TYPOLOGIE qui est rare -> avertissement global (cas du 2K:
#             13/23 wards sous 600 annonces).
MIN_N = 200
SOFT_N = 600

# Paires ou la 2e typologie est strictement meilleure que la 1re (meme nombre de
# pieces, plus de sejour): son loyer median DOIT etre superieur. Une inversion est
# le signe d'un echantillon trop mince ou d'un etiquetage douteux a la source.
COHERENCE = [("1K", "1DK"), ("1DK", "1LDK"), ("2K", "2DK"), ("2DK", "2LDK")]


def check_coherence(d):
    """Avertit en console AVANT publication. N'ecrit rien sur les images."""
    problems = []
    for lo, hi in COHERENCE:
        for w in d["wards"]:
            a = w.get("rents", {}).get(lo)
            b = w.get("rents", {}).get(hi)
            if isinstance(a, dict) and isinstance(b, dict) and a.get("median") and b.get("median"):
                if a["median"] > b["median"]:
                    problems.append((lo, hi, w["ward_en"], a["median"], a.get("count"),
                                     b["median"], b.get("count")))
    if not problems:
        print("Coherence des typologies: OK, aucune inversion.\n")
        return
    print(f"⚠️  COHERENCE: {len(problems)} inversion(s) -- une typologie superieure coute MOINS cher:")
    for lo, hi, ward, ma, na, mb, nb in sorted(problems, key=lambda t: -(t[3] - t[5])):
        print(f"    {ward:12s} {lo} ¥{ma:,} (n={na:,}) > {hi} ¥{mb:,} (n={nb:,})  ecart +¥{ma-mb:,}")
    print("    -> a arbitrer AVANT de diffuser la carte concernee.\n")


def build(layout, gdf, d, vmin=None, vmax=None):
    short, gloss = LAYOUTS[layout]
    yt = str(d.get("generated", "2026"))[:4]
    total = d.get("total_listings")

    rent, counts = {}, {}
    for w in d["wards"]:
        v = w.get("rents", {}).get(layout)
        if isinstance(v, dict) and v.get("median"):
            rent[w["ward_en"]] = v["median"]
            counts[w["ward_en"]] = v.get("count")

    g = gdf.copy()
    g["rent"] = g["ward_en"].map(rent)
    g = g[g["rent"].notna()]
    if g.empty:
        print(f"[SKIP] {layout}: aucune donnee")
        return None

    mapped = set(g["ward_en"])
    thin = sorted(w for w, n in counts.items()
                  if isinstance(n, (int, float)) and n < MIN_N and w in mapped)
    soft = [w for w, n in counts.items()
            if isinstance(n, (int, float)) and n < SOFT_N and w in mapped]
    rare = len(soft) >= len(mapped) / 3

    fig, ax = plt.subplots(figsize=(11, 11))
    g.plot(column="rent", cmap="YlOrRd", linewidth=0.7, edgecolor="white", ax=ax,
           legend=True, vmin=vmin, vmax=vmax, legend_kwds={
               "shrink": 0.5, "label": f"Median {short} rent (JPY / month)",
               "orientation": "vertical",
               "format": FuncFormatter(lambda x, _: f"¥{x/1000:.0f}k")})

    for _, r in g.iterrows():
        pt = r.geometry.representative_point()
        ax.annotate(f"{r['ward_en']}\n¥{r['rent']/1000:.0f}k", (pt.x, pt.y),
                    ha="center", va="center", fontsize=7.5, color="#1a1a1a",
                    fontweight="bold", linespacing=1.1)

    ax.axis("off")
    plt.subplots_adjust(top=0.90, bottom=0.04, left=0.02, right=0.98)
    fig.suptitle(f"Tokyo {short} rent, mapped by ward ({yt})",
                 fontsize=21, fontweight="bold", color=NAVY, x=0.5, y=0.965)
    fig.text(0.5, 0.925,
             f"Median monthly rent for a {short} ({gloss}), by Tokyo ward.",
             ha="center", fontsize=12, color="#6b7280")

    n_txt = f"{total:,} active listings" if isinstance(total, int) else "active listings"
    fig.text(0.98, 0.02,
             f"Source: tokyo-expat.com/data  ·  {n_txt}  ·  median, not average",
             ha="right", fontsize=9, color="#9ca3af")
    notes = []
    if thin:
        notes.append(f"Thin sample (<{MIN_N} listings): " + ", ".join(thin))
    if rare:
        notes.append(f"{short} is a rare layout here: {len(soft)} of {len(mapped)} wards "
                     f"rest on fewer than {SOFT_N} listings. Read this map as indicative.")
    for i, note in enumerate(notes):
        fig.text(0.02, 0.02 + i * 0.018, note, ha="left", fontsize=8.5, color="#b45309")

    OUTDIR.mkdir(parents=True, exist_ok=True)
    out = OUTDIR / f"tokyo-rent-map-{layout.lower()}.png"
    fig.savefig(out, dpi=150, facecolor="white")
    plt.close(fig)

    lo, hi = int(g["rent"].min()), int(g["rent"].max())
    nmin = min((n for n in counts.values() if isinstance(n, (int, float))), default=None)
    print(f"{layout:5s} {len(g):2d} wards | ¥{lo:,}-¥{hi:,} | n min {nmin:,} | "
          f"{'echantillon mince: ' + ', '.join(thin) if thin else 'aucun ward mince'}")
    print(f"      -> {out}")
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--layouts", default=",".join(LAYOUTS),
                    help="liste separee par des virgules (defaut: tous)")
    ap.add_argument("--echelle-commune", action="store_true", dest="commune",
                    help="une seule echelle de couleur pour toutes les cartes")
    a = ap.parse_args()

    d = json.loads(DATA.read_text(encoding="utf-8"))
    print(f"Indice genere le {d.get('generated')} | {d.get('total_listings'):,} annonces\n")
    check_coherence(d)

    g = gpd.read_file(GEO, engine="pyogrio", where="N03_001='東京都'")
    g = g[g["N03_004"].astype(str).str.endswith("区")].copy()
    g["ward_en"] = g["N03_004"].map(WARDS)
    g = g[g["ward_en"].notna()]
    g = g.dissolve(by="ward_en", as_index=False)

    wanted = [x.strip().upper() for x in a.layouts.split(",") if x.strip()]
    unknown = [x for x in wanted if x not in LAYOUTS]
    if unknown:
        sys.exit(f"Layout inconnu: {unknown}. Connus: {list(LAYOUTS)}")

    vmin = vmax = None
    if a.commune:
        vals = [v["median"] for w in d["wards"] for lay, v in w.get("rents", {}).items()
                if lay in wanted and isinstance(v, dict) and v.get("median")]
        vmin, vmax = min(vals), max(vals)
        print(f"Echelle COMMUNE: ¥{vmin:,} - ¥{vmax:,}\n")

    for lay in wanted:
        build(lay, g, d, vmin, vmax)


if __name__ == "__main__":
    main()
