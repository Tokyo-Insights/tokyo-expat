# -*- coding: utf-8 -*-
"""
generate_price_map.py -- Munition Reddit: CARTE CHOROPLETHE du prix/m2 des coproprietes
par arrondissement de Tokyo (le public r/dataisbeautiful reclame des cartes).

Frontieres officielles N03 (MLIT boundaries, deja dans tokyo_insights) + prix/m2
depuis lib/tokyoPriceTrends.json. Source data gardee SECRETE (recorded transactions).
Ecrit outreach/tokyo-price-map.png.

  python scripts/generate_price_map.py
"""
import json, io, sys
from pathlib import Path
import geopandas as gpd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.ticker import FuncFormatter

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
DATA = ROOT / "lib" / "tokyoPriceTrends.json"
GEO = Path("C:/Users/alegu/Desktop/tokyo_insights/data/boundaries/n03/N03-20_200101.geojson")
OUT = ROOT / "outreach" / "tokyo-price-map.png"

WARDS = {
    '千代田区': 'Chiyoda', '中央区': 'Chuo', '港区': 'Minato', '新宿区': 'Shinjuku',
    '文京区': 'Bunkyo', '台東区': 'Taito', '墨田区': 'Sumida', '江東区': 'Koto',
    '品川区': 'Shinagawa', '目黒区': 'Meguro', '大田区': 'Ota', '世田谷区': 'Setagaya',
    '渋谷区': 'Shibuya', '中野区': 'Nakano', '杉並区': 'Suginami', '豊島区': 'Toshima',
    '北区': 'Kita', '荒川区': 'Arakawa', '板橋区': 'Itabashi', '練馬区': 'Nerima',
    '足立区': 'Adachi', '葛飾区': 'Katsushika', '江戸川区': 'Edogawa',
}
NAVY = "#12263f"

# prix/m2 2025 par ward EN
d = json.loads(DATA.read_text(encoding="utf-8"))
price = {w["ward_en"]: w["median_last"] for w in d["wards"]}
yt = d["period_to"][:4]

# charge UNIQUEMENT Tokyo (filtre SQL au chargement -> leger)
g = gpd.read_file(GEO, engine="pyogrio", where="N03_001='東京都'")
g = g[g["N03_004"].astype(str).str.endswith("区")].copy()   # 23 wards speciaux
g["ward_en"] = g["N03_004"].map(WARDS)
g = g[g["ward_en"].notna()]
g = g.dissolve(by="ward_en", as_index=False)                 # fusionne multi-polygones
g["price"] = g["ward_en"].map(price)
g = g[g["price"].notna()]
print(f"Wards mappes: {len(g)} | prix {int(g['price'].min()):,}-{int(g['price'].max()):,} JPY/m2")

fig, ax = plt.subplots(figsize=(11, 11))
g.plot(column="price", cmap="YlOrRd", linewidth=0.7, edgecolor="white", ax=ax,
       legend=True, legend_kwds={
           "shrink": 0.5, "label": "Median sale price per m² (JPY)",
           "orientation": "vertical", "format": FuncFormatter(lambda x, _: f"¥{x/1e6:.1f}M")})

# labels: nom du ward + prix au centre de chaque arrondissement
for _, r in g.iterrows():
    pt = r.geometry.representative_point()
    ax.annotate(f"{r['ward_en']}\n¥{r['price']/1e6:.2f}M", (pt.x, pt.y),
                ha="center", va="center", fontsize=7.5, color="#1a1a1a",
                fontweight="bold", linespacing=1.1)

ax.axis("off")
plt.subplots_adjust(top=0.90, bottom=0.04, left=0.02, right=0.98)
fig.suptitle("Tokyo condo prices per m², mapped by ward (2025)",
             fontsize=21, fontweight="bold", color=NAVY, x=0.5, y=0.965)
fig.text(0.5, 0.925,
         "Median recorded sale price per square metre, used condominiums, by Tokyo ward.",
         ha="center", fontsize=12, color="#6b7280")
fig.text(0.98, 0.02, "Source: tokyo-expat.com/data  ·  median, not average",
         ha="right", fontsize=9, color="#9ca3af")

fig.savefig(OUT, dpi=150, facecolor="white")
print(f"Ecrit: {OUT}")
