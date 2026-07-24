# -*- coding: utf-8 -*-
"""Recupere les coordonnees GPS des stations de l'indice loyers via OpenStreetMap
(Overpass API, gratuit, sans cle). Matche les 50 stations d'Alessandro aux nodes OSM.
Sauve lib/stationCoords.json = [{station_en, lat, lon, rent_1k, matched_name}].
Une SEULE requete Overpass (politesse). Relancer rarement (les gares ne bougent pas)."""
import json, sys, io, re, time
from pathlib import Path
import requests
import urllib3
urllib3.disable_warnings()  # env d'Alessandro = inspection SSL (cf NODE_TLS_REJECT_UNAUTHORIZED=0 pour Vercel)

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
RENT = ROOT / "lib" / "tokyoRentIndex.json"
OUT = ROOT / "lib" / "stationCoords.json"
RAW = ROOT / "scripts" / "data" / "overpass_stations_raw.json"

d = json.loads(RENT.read_text(encoding="utf-8"))
stations = [(s["station_en"], s["rents"].get("1K", {}).get("median"))
            for s in d["stations"] if s["rents"].get("1K", {}).get("median")]
print(f"stations a geolocaliser : {len(stations)}")

def norm(x):
    x = x.lower()
    x = x.replace("-", "").replace(" ", "").replace("'", "")
    x = re.sub(r"(station|eki|駅)$", "", x)
    return x

# Overpass: toutes les gares dans la bbox Tokyo (une requete)
Q = """
[out:json][timeout:120];
(
  node["railway"="station"](35.50,139.45,35.86,139.95);
  node["railway"="halt"](35.50,139.45,35.86,139.95);
);
out center;
"""
ENDPOINTS = ["https://overpass-api.de/api/interpreter",
             "https://overpass.kumi.systems/api/interpreter"]

data = None
for ep in ENDPOINTS:
    try:
        print("Overpass ->", ep)
        r = requests.post(ep, data={"data": Q}, timeout=180, verify=False,
                          headers={"User-Agent": "tokyo-expat-rentmap/1.0 (contact tokyo-expat.com)"})
        if r.status_code == 200:
            data = r.json()
            break
        print("  status", r.status_code)
    except Exception as e:
        print("  err", str(e)[:120])
    time.sleep(2)

if not data:
    print("ECHEC Overpass sur tous les endpoints."); sys.exit(1)

RAW.parent.mkdir(exist_ok=True)
RAW.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
elts = data.get("elements", [])
print(f"nodes OSM recuperes : {len(elts)}")

# index par nom normalise (name:en prioritaire, sinon name romaji)
osm = {}
for e in elts:
    tags = e.get("tags", {})
    lat = e.get("lat") or (e.get("center") or {}).get("lat")
    lon = e.get("lon") or (e.get("center") or {}).get("lon")
    if lat is None or lon is None:
        continue
    for key in ("name:en", "name:en-Latn", "int_name", "name:ja-Latn"):
        if tags.get(key):
            osm.setdefault(norm(tags[key]), (tags[key], lat, lon))
    # aussi le name brut (parfois romaji)
    if tags.get("name") and re.search(r"[A-Za-z]", tags["name"]):
        osm.setdefault(norm(tags["name"]), (tags["name"], lat, lon))

out, missing = [], []
for name, rent in stations:
    key = norm(name)
    hit = osm.get(key)
    if not hit:
        # fallback: contient / commence par
        for k, v in osm.items():
            if k.startswith(key) or key.startswith(k) or key in k:
                hit = v; break
    if hit:
        out.append({"station_en": name, "lat": round(hit[1], 5), "lon": round(hit[2], 5),
                    "rent_1k": rent, "matched": hit[0]})
    else:
        missing.append(name)

out.sort(key=lambda x: x["rent_1k"])
OUT.write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"\nMATCHES : {len(out)} / {len(stations)}")
print("NON MATCHES :", missing if missing else "AUCUN")
