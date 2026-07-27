# -*- coding: utf-8 -*-
"""Recupere les polygones des 23 arrondissements de Tokyo (OSM Overpass) pour la
choroplethe animee des prix. Assemble les 'outer ways' en anneaux fermes.
Sauve lib/tokyoWardPolygons.json = {ward_en: [ [[lon,lat],...], ... ]}."""
import json, sys, io, time
from pathlib import Path
import requests
import urllib3
urllib3.disable_warnings()

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
OUT = Path("C:/Users/alegu/Desktop/tokyo-expat/lib/tokyoWardPolygons.json")

JP2EN = {"千代田区":"Chiyoda","中央区":"Chuo","港区":"Minato","新宿区":"Shinjuku","文京区":"Bunkyo",
 "台東区":"Taito","墨田区":"Sumida","江東区":"Koto","品川区":"Shinagawa","目黒区":"Meguro",
 "大田区":"Ota","世田谷区":"Setagaya","渋谷区":"Shibuya","中野区":"Nakano","杉並区":"Suginami",
 "豊島区":"Toshima","北区":"Kita","荒川区":"Arakawa","板橋区":"Itabashi","練馬区":"Nerima",
 "足立区":"Adachi","葛飾区":"Katsushika","江戸川区":"Edogawa"}

Q = """
[out:json][timeout:220];
relation["boundary"="administrative"]["admin_level"="7"](35.50,139.40,35.90,139.95);
out geom;
"""
ENDPOINTS = ["https://overpass.kumi.systems/api/interpreter",
             "https://overpass-api.de/api/interpreter"]
data = None
for ep in ENDPOINTS:
    try:
        print("Overpass ->", ep)
        r = requests.post(ep, data={"data": Q}, timeout=240, verify=False,
                          headers={"User-Agent": "tokyo-expat-rentmap/1.0"})
        print("  status", r.status_code, "|", len(r.content) // 1024, "ko")
        if r.status_code == 200:
            data = r.json(); break
    except Exception as e:
        print("  err", str(e)[:120])
    time.sleep(2)
if not data:
    print("ECHEC"); sys.exit(1)

def assemble(ways):
    ways = [list(w) for w in ways if len(w) >= 2]
    rings = []
    while ways:
        ring = ways.pop(0)
        changed = True
        while changed and ways:
            changed = False
            for i, w in enumerate(ways):
                if ring[-1] == w[0]:   ring += w[1:];            ways.pop(i); changed = True; break
                if ring[-1] == w[-1]:  ring += w[-2::-1];        ways.pop(i); changed = True; break
                if ring[0] == w[-1]:   ring = w[:-1] + ring;     ways.pop(i); changed = True; break
                if ring[0] == w[0]:    ring = w[:0:-1] + ring;   ways.pop(i); changed = True; break
        rings.append(ring)
    return rings

wards = {}
for e in data.get("elements", []):
    if e.get("type") != "relation":
        continue
    tags = e.get("tags", {})
    name_en = tags.get("name:en", "")
    en = None
    for jp, v in JP2EN.items():
        if tags.get("name") == jp or name_en.replace(" City", "").replace(" Ward", "").strip() == v:
            en = v; break
    if not en:
        continue
    outer = []
    for m in e.get("members", []):
        if m.get("type") == "way" and m.get("role") == "outer" and m.get("geometry"):
            outer.append([(round(g["lon"], 5), round(g["lat"], 5)) for g in m["geometry"]])
    rings = assemble(outer)
    # garder les anneaux significatifs (>= 4 points)
    wards[en] = [[[x, y] for x, y in r] for r in rings if len(r) >= 4]

OUT.write_text(json.dumps(wards, ensure_ascii=False), encoding="utf-8")
print("\nwards recuperes:", len(wards), "/ 23")
missing = set(JP2EN.values()) - set(wards)
print("manquants:", missing if missing else "AUCUN")
print("fichier:", OUT.stat().st_size // 1024, "ko")
