# -*- coding: utf-8 -*-
"""Agrege les transactions Tokyo en prix median/m2 par arrondissement x trimestre,
forward-fill les trous, sauve lib/tokyoPriceHistory.json. LECTURE SEULE de
tokyo_insights (comme refresh_price_trends). Source jamais nommee."""
import csv, io, sys, glob, re, statistics, json
from collections import defaultdict
from pathlib import Path
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SRC = "C:/Users/alegu/Desktop/tokyo_insights/data/raw/listings"
OUT = Path("C:/Users/alegu/Desktop/tokyo-expat/lib/tokyoPriceHistory.json")
WARD = {"13101":"Chiyoda","13102":"Chuo","13103":"Minato","13104":"Shinjuku","13105":"Bunkyo",
 "13106":"Taito","13107":"Sumida","13108":"Koto","13109":"Shinagawa","13110":"Meguro",
 "13111":"Ota","13112":"Setagaya","13113":"Shibuya","13114":"Nakano","13115":"Suginami",
 "13116":"Toshima","13117":"Kita","13118":"Arakawa","13119":"Itabashi","13120":"Nerima",
 "13121":"Adachi","13122":"Katsushika","13123":"Edogawa"}

def qkey(s):
    m = re.search(r'(\d{4})\D+([1-4])', s or "")
    return (int(m.group(1)), int(m.group(2))) if m else None

data = defaultdict(list)
for fp in sorted(glob.glob(SRC + "/Tokyo_*.csv")):
    rows = None
    for enc in ("cp932", "utf-8-sig"):
        try:
            rows = list(csv.reader(open(fp, encoding=enc))); break
        except Exception:
            pass
    if not rows:
        continue
    for r in rows[1:]:
        if len(r) < 19 or r[2] not in WARD:
            continue
        try:
            p, a = float(r[8]), float(r[10])
            if a <= 0 or p <= 0:
                continue
        except ValueError:
            continue
        qk = qkey(r[18])
        if qk:
            data[(WARD[r[2]], qk)].append(p / a)

med = {k: statistics.median(v) for k, v in data.items() if len(v) >= 5}
quarters = sorted({k[1] for k in med})
qlabels = [f"{y} Q{q}" for y, q in quarters]

prices = {}
for w in WARD.values():
    series, last = [], None
    for q in quarters:
        v = med.get((w, q))
        if v is None:
            v = last  # forward-fill
        else:
            last = v
        series.append(round(v / 1000) if v else None)
    # back-fill le debut si None
    fill = next((x for x in series if x is not None), 0)
    series = [x if x is not None else fill for x in series]
    prices[w] = series

OUT.write_text(json.dumps({"quarters": qlabels, "prices": prices,
                           "unit": "1000 JPY per m2"}, ensure_ascii=False), encoding="utf-8")
allv = [x for s in prices.values() for x in s]
print(f"trimestres: {len(quarters)} ({qlabels[0]} -> {qlabels[-1]})")
print(f"wards: {len(prices)} | prix/m2 (k): min {min(allv)} max {max(allv)}")
print("sauve:", OUT.name)
