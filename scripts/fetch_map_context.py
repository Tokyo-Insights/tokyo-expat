# -*- coding: utf-8 -*-
"""Recupere le FOND de carte pour le plan des loyers: reseau ferroviaire + trait de cote
(baie de Tokyo), via OpenStreetMap Overpass. Rend la carte RECONNAISSABLE comme Tokyo.
Sauve scripts/data/tokyo_map_context.json = {rails:[[ (lon,lat),... ]], coast:[...]}."""
import json, sys, io, time
from pathlib import Path
import requests
import urllib3
urllib3.disable_warnings()

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
OUT = ROOT / "scripts" / "data" / "tokyo_map_context.json"

# bbox un peu plus large que les stations pour le contexte
BB = "35.48,139.43,35.88,139.97"
Q = f"""
[out:json][timeout:180];
(
  way["railway"~"^(rail|subway)$"]({BB});
  way["natural"="coastline"](35.40,139.40,35.95,140.05);
);
out geom;
"""
ENDPOINTS = ["https://overpass.kumi.systems/api/interpreter",
             "https://overpass-api.de/api/interpreter"]

data = None
for ep in ENDPOINTS:
    try:
        print("Overpass ->", ep)
        r = requests.post(ep, data={"data": Q}, timeout=200, verify=False,
                          headers={"User-Agent": "tokyo-expat-rentmap/1.0 (contact tokyo-expat.com)"})
        print("  status", r.status_code, "| taille", len(r.content) // 1024, "ko")
        if r.status_code == 200:
            data = r.json(); break
    except Exception as e:
        print("  err", str(e)[:120])
    time.sleep(2)

if not data:
    print("ECHEC Overpass"); sys.exit(1)

rails, coast = [], []
for e in data.get("elements", []):
    geom = e.get("geometry")
    if not geom:
        continue
    line = [[round(g["lon"], 5), round(g["lat"], 5)] for g in geom]
    if len(line) < 2:
        continue
    tags = e.get("tags", {})
    if tags.get("natural") == "coastline":
        coast.append(line)
    else:
        rails.append(line)

OUT.parent.mkdir(exist_ok=True)
OUT.write_text(json.dumps({"rails": rails, "coast": coast}), encoding="utf-8")
print(f"\nrails: {len(rails)} segments | coast: {len(coast)} segments")
print("taille fichier:", OUT.stat().st_size // 1024, "ko")
