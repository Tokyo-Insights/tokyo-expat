# -*- coding: utf-8 -*-
"""Precalcule les donnees de la carte metro-loyer pour le composant React /data.
Sortie: public/rentMapData.json (leger, geometrie decimee + coords projetees +
appartenance ligne + fills navy-de-marque). Le composant se contente de rendre."""
import json, io, sys
from math import cos, radians
from pathlib import Path
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = Path(r"C:\Users\alegu\Desktop\tokyo-expat")
pts = json.loads((ROOT / "lib" / "stationRentDense.json").read_text(encoding="utf-8"))
lines = json.loads((ROOT / "scripts" / "data" / "tokyo_metro_lines.json").read_text(encoding="utf-8"))
wards = json.loads((ROOT / "lib" / "tokyoWardPolygons.json").read_text(encoding="utf-8"))
OUT = ROOT / "public" / "rentMapData.json"

CURATED = {
    'JY':'JR Yamanote','JC':'JR Chuo (Rapid)','JB':'JR Chuo-Sobu (Local)','JK':'JR Keihin-Tohoku',
    'JA':'JR Saikyo','JO':'JR Sobu (Rapid)','JJ':'JR Joban','JE':'JR Keiyo','JM':'JR Musashino',
    'G':'Ginza','M':'Marunouchi','H':'Hibiya','T':'Tozai','C':'Chiyoda','Y':'Yurakucho',
    'Z':'Hanzomon','N':'Namboku','F':'Fukutoshin','A':'Toei Asakusa','I':'Toei Mita',
    'S':'Toei Shinjuku','E':'Toei Oedo','TY':'Tokyu Toyoko','DT':'Tokyu Den-en-toshi',
    'MG':'Tokyu Meguro','KO':'Keio','OH':'Odakyu Odawara','SI':'Seibu Ikebukuro',
    'SS':'Seibu Shinjuku','TJ':'Tobu Tojo','TS':'Tobu Skytree','TX':'Tsukuba Express',
}

lats=[p["lat"] for p in pts]; mlat=sum(lats)/len(lats); kx=cos(radians(mlat))
xs=[p["lon"]*kx for p in pts]; ys=[p["lat"] for p in pts]
minx,maxx,miny,maxy=min(xs),max(xs),min(ys),max(ys)
padx=(maxx-minx)*0.05; pady=(maxy-miny)*0.05
minx-=padx; maxx+=padx; miny-=pady; maxy+=pady
W=2000.0; H=W*(maxy-miny)/(maxx-minx)
def sx(lo,la): return round((lo*kx-minx)/(maxx-minx)*W,1)
def sy(lo,la): return round((maxy-la)/(maxy-miny)*H,1)
def ix(lo,la): return int(round((lo*kx-minx)/(maxx-minx)*W))
def iy(lo,la): return int(round((maxy-la)/(maxy-miny)*H))

STOPS=[(0.0,(238,242,247)),(0.25,(185,198,216)),(0.5,(123,148,179)),(0.75,(61,92,130)),(1.0,(15,39,68))]
rents=[p["rent_1k"] for p in pts]; rmin,rmax=min(rents),max(rents)
def ramp(v):
    t=(v-rmin)/(rmax-rmin)
    for i in range(len(STOPS)-1):
        a,b=STOPS[i],STOPS[i+1]
        if t<=b[0]:
            f=0 if b[0]==a[0] else (t-a[0])/(b[0]-a[0])
            c=[round(a[1][j]+(b[1][j]-a[1][j])*f) for j in range(3)]
            return "#%02x%02x%02x"%tuple(c)
    return "#0f2744"

THR2=0.0019**2
lp={}
for L in lines:
    if L.get("name") in CURATED:
        pp=lp.setdefault(L["name"],[])
        for seg in L.get("segments",[]):
            for k,(lo,la) in enumerate(seg):
                if k%3 and k!=len(seg)-1: continue
                pp.append((lo*kx,la))
mem={}
for idx,p in enumerate(pts):
    px,py=p["lon"]*kx,p["lat"]; s=[]
    for code,pp in lp.items():
        for lx,ly in pp:
            if (px-lx)**2+(py-ly)**2<THR2: s.append(code); break
    mem[idx]=sorted(s)
lines_present=[c for c in CURATED if c in lp]

def ring_path(ring):
    ipn,last=[],None
    for k,(lo,la) in enumerate(ring):
        if k%2 and k!=len(ring)-1: continue
        x,y=ix(lo,la),iy(lo,la)
        if (x,y)!=last: ipn.append((x,y)); last=(x,y)
    return ipn
wards_out=[]
for name,rings in wards.items():
    dparts,apx,apy=[],[],[]
    for ring in rings:
        ipn=ring_path(ring)
        for x,y in ipn: apx.append(x); apy.append(y)
        if len(ipn)>=3: dparts.append("M"+" L".join("%d %d"%p for p in ipn)+" Z")
    if dparts:
        wards_out.append({"n":name,"d":" ".join(dparts),"cx":sum(apx)//len(apx),"cy":sum(apy)//len(apy)})

def seg_path(seg):
    ipn,last=[],None
    for k,(lo,la) in enumerate(seg):
        if k%2 and k!=len(seg)-1: continue
        x,y=ix(lo,la),iy(lo,la)
        if (x,y)!=last: ipn.append((x,y)); last=(x,y)
    return "M"+" L".join("%d %d"%p for p in ipn) if len(ipn)>=2 else None
cur_paths,other,cur_col={},[],{}
for L in lines:
    code=L.get("name"); col=L.get("colour") or "#9aa5b1"
    ds=[d for d in (seg_path(s) for s in L.get("segments",[])) if d]
    if not ds: continue
    if code in CURATED: cur_paths.setdefault(code,[]).extend(ds); cur_col[code]=col
    else: other.extend(ds)
rails=[{"c":code,"col":cur_col[code],"d":" ".join(ds)} for code,ds in cur_paths.items()]

stations=[]
for i,q in enumerate(pts):
    stations.append({"n":q["station_en"],"x":sx(q["lon"],q["lat"]),"y":sy(q["lon"],q["lat"]),
        "k":q["rent_1k"],"l":q.get("rent_1ldk"),"t":q.get("rent_2ldk"),"s":q["sample"],
        "f":ramp(q["rent_1k"]),"L":mem[i]})

data={"w":int(W),"h":int(H),"rmin":rmin,"rmax":rmax,
      "grad":["#eef2f7","#b9c6d8","#7b94b3","#3d5c82","#0f2744"],
      "wards":wards_out,"railsBg":" ".join(other),"rails":rails,
      "lines":[{"c":c,"n":CURATED[c]} for c in lines_present],"stations":stations}
OUT.write_text(json.dumps(data,ensure_ascii=False,separators=(",",":")),encoding="utf-8")
print("Ecrit:",OUT,"| %.0f KB | %d stations | %d lignes | %d wards"%(OUT.stat().st_size/1024,len(stations),len(lines_present),len(wards_out)))
