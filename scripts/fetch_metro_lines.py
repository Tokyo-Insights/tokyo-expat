# -*- coding: utf-8 -*-
"""Recupere les LIGNES de metro/train (relations route) avec leur COULEUR officielle
+ trace, via OpenStreetMap. Remplace le fouillis de 13000 rails bruts par ~30 lignes
propres = look 'plan de metro'. Sauve scripts/data/tokyo_metro_lines.json."""
import json, sys, io, time
from pathlib import Path
import requests
import urllib3
urllib3.disable_warnings()

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
OUT = ROOT / "scripts" / "data" / "tokyo_metro_lines.json"

# bbox resserree sur la zone des 50 stations (centre Tokyo) -> lignes pertinentes
BB = "35.55,139.58,35.83,139.92"
Q = f"""
[out:json][timeout:200];
relation["route"~"^(subway|train|light_rail|monorail)$"]["colour"]({BB});
out geom;
"""
ENDPOINTS = ["https://overpass.kumi.systems/api/interpreter",
             "https://overpass-api.de/api/interpreter"]

data = None
for ep in ENDPOINTS:
    try:
        print("Overpass ->", ep)
        r = requests.post(ep, data={"data": Q}, timeout=220, verify=False,
                          headers={"User-Agent": "tokyo-expat-rentmap/1.0 (contact tokyo-expat.com)"})
        print("  status", r.status_code, "| taille", len(r.content) // 1024, "ko")
        if r.status_code == 200:
            data = r.json(); break
    except Exception as e:
        print("  err", str(e)[:120])
    time.sleep(2)

if not data:
    print("ECHEC Overpass"); sys.exit(1)

# dedup par (nom de ligne, couleur): plusieurs relations = memes lignes (sens A/B, variantes)
lines = {}
for e in data.get("elements", []):
    if e.get("type") != "relation":
        continue
    tags = e.get("tags", {})
    col = tags.get("colour", "")
    name = tags.get("ref") or tags.get("name", "")
    key = (name, col)
    segs = lines.setdefault(key, {"name": name, "colour": col, "segments": []})
    for m in e.get("members", []):
        if m.get("type") == "way" and m.get("geometry"):
            ln = [[round(g["lon"], 5), round(g["lat"], 5)] for g in m["geometry"] if "lon" in g]
            if len(ln) >= 2:
                segs["segments"].append(ln)

out = [v for v in lines.values() if v["segments"] and v["colour"].startswith("#")]
OUT.parent.mkdir(exist_ok=True)
OUT.write_text(json.dumps(out, ensure_ascii=False), encoding="utf-8")
print(f"\nlignes distinctes (avec couleur hex): {len(out)}")
for v in sorted(out, key=lambda x: -len(x["segments"]))[:15]:
    print(f"  {v['name']:8} {v['colour']:8} {sum(len(s) for s in v['segments'])} pts")
print("fichier:", OUT.stat().st_size // 1024, "ko")
