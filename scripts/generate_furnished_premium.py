# -*- coding: utf-8 -*-
"""
generate_furnished_premium.py -- Asset data "Tokyo furnished premium".
Compare le loyer median d'un 1K MEUBLE (monthly_furnished_pool) au 1K STANDARD
(rents_harmonized) par ward (23 wards Tokyo) -> premium %, et genere un chart
au format de marque (1 teinte navy, titre=insight, source cachee).

Lit la data du pipeline tokyo_insights (lecture seule). Sort:
  - outreach/tokyo-furnished-premium.png  (munition Reddit / visuel)
  - lib/furnishedPremium.json             (data pour une future section /data)
Regenerable a chaque refresh de la data loyers. Regle: JAMAIS nommer LIFULL/AtHome
(source = "tokyo-expat.com" / "real listings"). Voir feedback_secret_data_sources.
"""
import sys, io, json
from pathlib import Path
import pandas as pd, numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf8'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

TI = Path(r"C:\Users\alegu\Desktop\tokyo_insights")
HERE = Path(__file__).resolve().parent.parent   # tokyo-expat/
PNG = HERE / "outreach" / "tokyo-furnished-premium.png"
JSON = HERE / "lib" / "furnishedPremium.json"
NAVY = '#0f2744'

WARDS = {
 '千代田区':'Chiyoda','中央区':'Chuo','港区':'Minato','新宿区':'Shinjuku','文京区':'Bunkyo',
 '台東区':'Taito','墨田区':'Sumida','江東区':'Koto','品川区':'Shinagawa','目黒区':'Meguro',
 '大田区':'Ota','世田谷区':'Setagaya','渋谷区':'Shibuya','中野区':'Nakano','杉並区':'Suginami',
 '豊島区':'Toshima','北区':'Kita','荒川区':'Arakawa','板橋区':'Itabashi','練馬区':'Nerima',
 '足立区':'Adachi','葛飾区':'Katsushika','江戸川区':'Edogawa'}
def nw(w): return str(w).replace('東京都', '')


def compute(layout='1K', min_furn=10, min_std=30):
    fp = pd.read_parquet(TI / "data" / "processed" / "monthly_furnished_pool.parquet")
    fp['W'] = fp['Ward'].map(nw)
    fp = fp[(fp.Layout == layout) & (fp.W.isin(WARDS))]
    std = pd.read_parquet(TI / "data" / "processed" / "rents_harmonized.parquet",
                          columns=['Ward', 'Layout', 'RentJPY', 'MgmtFeeJPY'])
    std['W'] = std['Ward'].map(nw)
    std['tot'] = std.RentJPY.fillna(0) + std.MgmtFeeJPY.fillna(0)
    std = std[(std.Layout == layout) & (std.W.isin(WARDS)) & (std.tot > 0)]
    rows = []
    for w in WARDS:
        f = fp[fp.W == w]['RentTotalJPY_mo'].dropna()
        s = std[std.W == w]['tot'].dropna()
        if len(f) >= min_furn and len(s) >= min_std:
            fm, sm = float(f.median()), float(s.median())
            rows.append({'ward': WARDS[w], 'std': sm, 'furn': fm,
                         'premium': fm / sm - 1, 'n_furn': int(len(f))})
    return pd.DataFrame(rows).sort_values('premium')


def chart(d):
    cmap = LinearSegmentedColormap.from_list('navy', ['#a9bcd4', '#3d5c82', NAVY])
    norm = (d['std'] - d['std'].min()) / (d['std'].max() - d['std'].min())
    colors = [cmap(x) for x in norm]
    fig, ax = plt.subplots(figsize=(11, 8.5), dpi=130)
    fig.patch.set_facecolor('white'); ax.set_facecolor('white')
    y = np.arange(len(d))
    ax.barh(y, d['premium'] * 100, color=colors, height=0.72, zorder=3)
    ax.set_yticks(y); ax.set_yticklabels(d['ward'], fontsize=13, color=NAVY)
    for i, r in enumerate(d.itertuples()):
        ax.text(r.premium * 100 + 1.2, i, f"+{r.premium*100:.0f}%", va='center', ha='left',
                fontsize=12, fontweight='bold', color=NAVY)
        ax.text(-2, i, f"{r.std/1000:.0f}k \u2192 {r.furn/1000:.0f}k", va='center', ha='right',
                fontsize=9.5, color='#7c8aa0')
    ax.set_xlim(-30, max(d.premium * 100) + 12); ax.set_xticks([])
    for s in ['top', 'right', 'bottom', 'left']: ax.spines[s].set_visible(False)
    ax.invert_yaxis()
    fig.suptitle("A furnished studio costs far more, most of all in Tokyo's cheaper wards",
                 x=0.5, y=0.975, fontsize=18, fontweight='bold', color=NAVY, ha='center')
    ax.set_title("Extra monthly cost of a furnished 1K studio versus a standard one, by ward (2026)",
                 fontsize=12.5, color='#5a6b82', pad=26)
    fig.text(0.5, 0.045, "Left label: standard rent \u2192 furnished rent per month.  Bar colour: darker = pricier ward.",
             ha='center', fontsize=9.5, color='#8a97a8')
    fig.text(0.5, 0.02, "Source: tokyo-expat.com", ha='center', fontsize=9.5, color='#8a97a8')
    plt.subplots_adjust(left=0.20, right=0.94, top=0.86, bottom=0.10)
    plt.savefig(PNG, facecolor='white', bbox_inches='tight')
    plt.close()


def main():
    d = compute()
    JSON.parent.mkdir(exist_ok=True)
    json.dump({'layout': '1K', 'wards': d.to_dict(orient='records')},
              open(JSON, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
    chart(d)
    print(f"OK: {len(d)} wards | premium {d.premium.min()*100:.0f}% to {d.premium.max()*100:.0f}%")
    print(f"  PNG  -> {PNG}")
    print(f"  JSON -> {JSON}")


if __name__ == "__main__":
    main()
