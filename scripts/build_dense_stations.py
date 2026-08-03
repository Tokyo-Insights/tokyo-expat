# -*- coding: utf-8 -*-
"""Construit un dataset DENSE station->loyer+coords (au lieu des 50 whitelistees).
Agrege TOUTES les stations avec assez d'annonces (parquet tokyo_insights) + matche
par nom JP au cache Overpass (898 gares). Sortie: lib/stationRentDense.json.
"""
import json, sys, io, os, unicodedata
from pathlib import Path
import pandas as pd
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

PIPE = Path(r"C:\Users\alegu\Desktop\tokyo_insights")
SITE = Path(r"C:\Users\alegu\Desktop\tokyo-expat")
SRC = [PIPE / "data" / "lifull_rents_clean.parquet", PIPE / "data" / "athome_rents_clean.parquet"]
OVERPASS = SITE / "scripts" / "data" / "overpass_stations_raw.json"
OUT = SITE / "lib" / "stationRentDense.json"

WARDS = ['千代田区','中央区','港区','新宿区','文京区','台東区','墨田区','江東区','品川区','目黒区',
         '大田区','世田谷区','渋谷区','中野区','杉並区','豊島区','北区','荒川区','板橋区','練馬区',
         '足立区','葛飾区','江戸川区']
MIN_SAMPLE = 50      # total annonces pour publier une station
MIN_LAYOUT = 20      # pour publier une mediane de layout
COLS = ['Ward/City', 'Station 1', 'Layout', 'Rent_JPY']

def nfkc(x): return unicodedata.normalize("NFKC", str(x)).strip()

# --- 1. agregation loyers par station JP ---
frames = [pd.read_parquet(f, columns=COLS) for f in SRC if f.exists()]
df = pd.concat(frames, ignore_index=True)
df = df[df['Rent_JPY'].between(20000, 2000000)]
df = df[df['Ward/City'].astype(str).map(lambda x: any(w in x for w in WARDS))]
df['st'] = df['Station 1'].map(nfkc)
df = df[df['st'].str.len() > 0]

agg = {}
for jp, sub in df.groupby('st'):
    if len(sub) < MIN_SAMPLE:
        continue
    rents = {}
    for L in ('1K', '1LDK', '2LDK'):
        s = sub[sub['Layout'] == L]
        if len(s) >= MIN_LAYOUT:
            rents[L] = int(s['Rent_JPY'].median())
    if '1K' in rents:  # 1K = metrique couleur, obligatoire
        agg[jp] = {'rents': rents, 'sample': int(len(sub))}
print("stations agregees (>=%d annonces, 1K present): %d" % (MIN_SAMPLE, len(agg)))

# --- 2. index Overpass par nom JP ---
data = json.loads(OVERPASS.read_text(encoding="utf-8"))
osm = {}
for e in data.get("elements", []):
    t = e.get("tags", {})
    if not t.get("name"):
        continue
    lat = e.get("lat") or (e.get("center") or {}).get("lat")
    lon = e.get("lon") or (e.get("center") or {}).get("lon")
    if lat is None:
        continue
    key = nfkc(t["name"])
    en = t.get("name:en") or t.get("name:en-Latn") or t.get("name")
    osm.setdefault(key, (en, lat, lon))

# --- 3. match ---
out, missing = [], []
for jp, info in agg.items():
    hit = osm.get(jp)
    if not hit:
        missing.append(jp); continue
    r = info['rents']
    out.append({
        "station_en": hit[0], "lat": round(hit[1], 5), "lon": round(hit[2], 5),
        "rent_1k": r['1K'], "rent_1ldk": r.get('1LDK'), "rent_2ldk": r.get('2LDK'),
        "sample": info['sample'],
    })
# dedupe par (station_en) si plusieurs JP mappent au meme (garder le plus gros sample)
best = {}
for s in out:
    k = s["station_en"]
    if k not in best or s["sample"] > best[k]["sample"]:
        best[k] = s
out = sorted(best.values(), key=lambda x: x["rent_1k"])
OUT.write_text(json.dumps(out, ensure_ascii=False), encoding="utf-8")
print("MATCHES: %d | non-matches: %d" % (len(out), len(missing)))
print("Ecrit:", OUT, "(%.0f KB)" % (OUT.stat().st_size / 1024))
print("range 1K: %d -> %d | avec 1LDK: %d, avec 2LDK: %d" % (
    out[0]["rent_1k"], out[-1]["rent_1k"],
    sum(1 for s in out if s["rent_1ldk"]), sum(1 for s in out if s["rent_2ldk"])))
