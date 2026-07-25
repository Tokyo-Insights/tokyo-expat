# -*- coding: utf-8 -*-
"""Fond de carte pour le plan des loyers, via OpenStreetMap Overpass:
- rails (reseau ferroviaire), coast (trait de cote)
- water (polygones: baie + plans d'eau -> REMPLIS en bleu = distinction terre/mer)
- rivers (Sumida, Arakawa... = reperes)
- yamanote (la boucle iconique, a souligner)
Sauve scripts/data/tokyo_map_context.json."""
import json, sys, io, time
from pathlib import Path
import requests
import urllib3
urllib3.disable_warnings()

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
OUT = ROOT / "scripts" / "data" / "tokyo_map_context.json"

BB = "35.48,139.43,35.88,139.97"
BBW = "35.44,139.40,35.92,140.04"
Q = f"""
[out:json][timeout:240];
(
  way["railway"~"^(rail|subway)$"]({BB});
  way["natural"="coastline"]({BBW});
  way["natural"="water"]({BBW});
  relation["natural"="water"]({BBW});
  way["waterway"="river"]({BB});
  relation["route"="train"]["ref"="JY"];
);
out geom;
"""
ENDPOINTS = ["https://overpass.kumi.systems/api/interpreter",
             "https://overpass-api.de/api/interpreter"]

data = None
for ep in ENDPOINTS:
    try:
        print("Overpass ->", ep)
        r = requests.post(ep, data={"data": Q}, timeout=260, verify=False,
                          headers={"User-Agent": "tokyo-expat-rentmap/1.0 (contact tokyo-expat.com)"})
        print("  status", r.status_code, "| taille", len(r.content) // 1024, "ko")
        if r.status_code == 200:
            data = r.json(); break
    except Exception as e:
        print("  err", str(e)[:120])
    time.sleep(2)

if not data:
    print("ECHEC Overpass"); sys.exit(1)

def line_of(geom):
    return [[round(g["lon"], 5), round(g["lat"], 5)] for g in geom if "lon" in g]

rails, coast, water, rivers, yama = [], [], [], [], []
for e in data.get("elements", []):
    tags = e.get("tags", {})
    et = e.get("type")
    if et == "way" and e.get("geometry"):
        ln = line_of(e["geometry"])
        if len(ln) < 2:
            continue
        if tags.get("railway"):
            rails.append(ln)
        elif tags.get("natural") == "coastline":
            coast.append(ln)
        elif tags.get("natural") == "water":
            water.append(ln)          # way ferme = polygone d'eau
        elif tags.get("waterway") == "river":
            rivers.append(ln)
    elif et == "relation":
        if tags.get("natural") == "water":
            for m in e.get("members", []):
                if m.get("geometry") and m.get("role") in ("outer", ""):
                    ln = line_of(m["geometry"])
                    if len(ln) >= 3:
                        water.append(ln)
        elif tags.get("ref") == "JY":       # Yamanote
            for m in e.get("members", []):
                if m.get("type") == "way" and m.get("geometry"):
                    ln = line_of(m["geometry"])
                    if len(ln) >= 2:
                        yama.append(ln)

OUT.parent.mkdir(exist_ok=True)
OUT.write_text(json.dumps({"rails": rails, "coast": coast, "water": water,
                           "rivers": rivers, "yamanote": yama}), encoding="utf-8")
print(f"\nrails {len(rails)} | coast {len(coast)} | water {len(water)} | rivers {len(rivers)} | yamanote {len(yama)}")
print("fichier:", OUT.stat().st_size // 1024, "ko")
