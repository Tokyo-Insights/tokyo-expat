# -*- coding: utf-8 -*-
"""APERCU HTML interactif carte metro-loyer DENSE, version OUTIL v2:
carte CLAIRE (verrouillee, le degrade fonce=cher a besoin d'un fond clair) +
ZOOM/PAN (boutons +/-, molette, glisser) + SELECTEUR DE LIGNE + RECHERCHE STATION
+ labels ANTI-COLLISION. Contours+noms des 23 wards. Survol=1K/1LDK/2LDK+annonces."""
import json, io, sys
from math import cos, radians
from pathlib import Path
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = Path(r"C:\Users\alegu\Desktop\tokyo-expat")
pts = json.loads((ROOT / "lib" / "stationRentDense.json").read_text(encoding="utf-8"))
lines = json.loads((ROOT / "scripts" / "data" / "tokyo_metro_lines.json").read_text(encoding="utf-8"))
wards = json.loads((ROOT / "lib" / "tokyoWardPolygons.json").read_text(encoding="utf-8"))
OUT = ROOT / "outreach" / "metro-map-preview.html"

CURATED = {
    'JY':'JR Yamanote','JC':'JR Chuo (Rapid)','JB':'JR Chuo-Sobu (Local)','JK':'JR Keihin-Tohoku',
    'JA':'JR Saikyo','JO':'JR Sobu (Rapid)','JJ':'JR Joban','JE':'JR Keiyo','JM':'JR Musashino',
    'G':'Ginza','M':'Marunouchi','H':'Hibiya','T':'Tozai','C':'Chiyoda','Y':'Yurakucho',
    'Z':'Hanzomon','N':'Namboku','F':'Fukutoshin','A':'Toei Asakusa','I':'Toei Mita',
    'S':'Toei Shinjuku','E':'Toei Oedo','TY':'Tokyu Toyoko','DT':'Tokyu Den-en-toshi',
    'MG':'Tokyu Meguro','KO':'Keio','OH':'Odakyu Odawara','SI':'Seibu Ikebukuro',
    'SS':'Seibu Shinjuku','TJ':'Tobu Tojo','TS':'Tobu Skytree','TX':'Tsukuba Express',
}

lats = [p["lat"] for p in pts]; mlat = sum(lats) / len(lats); kx = cos(radians(mlat))
xs = [p["lon"]*kx for p in pts]; ys = [p["lat"] for p in pts]
minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)
padx = (maxx-minx)*0.05; pady = (maxy-miny)*0.05
minx -= padx; maxx += padx; miny -= pady; maxy += pady
W = 2000.0; H = W*(maxy-miny)/(maxx-minx)
def sx(lo, la): return (lo*kx-minx)/(maxx-minx)*W
def sy(lo, la): return (maxy-la)/(maxy-miny)*H

STOPS = [(0.0,(234,240,247)),(0.25,(159,192,224)),(0.5,(79,134,198)),(0.75,(29,78,137)),(1.0,(11,37,69))]
rents = [p["rent_1k"] for p in pts]; rmin, rmax = min(rents), max(rents)
def ramp(v):
    t = (v-rmin)/(rmax-rmin)
    for i in range(len(STOPS)-1):
        a, b = STOPS[i], STOPS[i+1]
        if t <= b[0]:
            f = 0 if b[0]==a[0] else (t-a[0])/(b[0]-a[0])
            c = [round(a[1][j]+(b[1][j]-a[1][j])*f) for j in range(3)]
            return "#%02x%02x%02x" % tuple(c)
    return "#0b2545"

THR2 = 0.0019 ** 2
line_pts = {}
for L in lines:
    if L.get("name") in CURATED:
        pp = line_pts.setdefault(L["name"], [])
        for seg in L.get("segments", []):
            for k, (lo, la) in enumerate(seg):
                if k % 3 and k != len(seg)-1: continue
                pp.append((lo*kx, la))
mem = {}
for idx, p in enumerate(pts):
    px, py = p["lon"]*kx, p["lat"]; s = set()
    for code, pp in line_pts.items():
        for (lx, ly) in pp:
            if (px-lx)**2+(py-ly)**2 < THR2: s.add(code); break
    mem[idx] = s
lines_present = [c for c in CURATED if c in line_pts]

ward_svg, ward_lbl = [], []
for name, rings in wards.items():
    dparts, apx, apy = [], [], []
    for ring in rings:
        ip, last = [], None
        for k, (lo, la) in enumerate(ring):
            if k % 2 and k != len(ring)-1: continue
            x = int(round(sx(lo, la))); y = int(round(sy(lo, la)))
            if (x, y) != last: ip.append((x, y)); apx.append(x); apy.append(y); last=(x, y)
        if len(ip) >= 3: dparts.append("M"+" L".join("%d %d"%p for p in ip)+" Z")
    if dparts:
        ward_svg.append('<path d="%s"/>'%" ".join(dparts))
        ward_lbl.append('<text x="%d" y="%d">%s</text>'%(sum(apx)//len(apx), sum(apy)//len(apy), name))

def seg_path(seg):
    ip, last = [], None
    for k, (lo, la) in enumerate(seg):
        if k % 2 and k != len(seg)-1: continue
        x = int(round(sx(lo, la))); y = int(round(sy(lo, la)))
        if (x, y) != last: ip.append((x, y)); last=(x, y)
    return "M"+" L".join("%d %d"%p for p in ip) if len(ip) >= 2 else None
cur_paths, other, cur_colour = {}, [], {}
for L in lines:
    code = L.get("name"); col = L.get("colour") or "#9aa5b1"
    ds = [d for d in (seg_path(s) for s in L.get("segments", [])) if d]
    if not ds: continue
    if code in CURATED: cur_paths.setdefault(code, []).extend(ds); cur_colour[code] = col
    else: other.extend(ds)
rails_svg = ['<path class="rail-bg" d="%s"/>' % " ".join(other)] if other else []
for code, ds in cur_paths.items():
    rails_svg.append('<path class="rail" data-line="%s" d="%s" stroke="%s"/>' % (code, " ".join(ds), cur_colour[code]))
rails_svg = "\n".join(rails_svg)

def money(v): return "{:,}".format(v) if v else ""
st_svg, jsdata = [], []
for p in sorted(range(len(pts)), key=lambda i: pts[i]["rent_1k"]):
    q = pts[p]; x, y = sx(q["lon"], q["lat"]), sy(q["lon"], q["lat"])
    st_svg.append('<circle class="st" tabindex="0" cx="%.1f" cy="%.1f" r="8" fill="%s" '
        'data-n="%s" data-k="%s" data-l="%s" data-t="%s" data-s="%s" data-lines="%s"/>' % (
        x, y, ramp(q["rent_1k"]), q["station_en"].replace('"',''), money(q["rent_1k"]),
        money(q.get("rent_1ldk")), money(q.get("rent_2ldk")), money(q["sample"]), ",".join(sorted(mem[p]))))
for i, q in enumerate(pts):
    jsdata.append({"n": q["station_en"], "x": round(sx(q["lon"], q["lat"]), 1),
                   "y": round(sy(q["lon"], q["lat"]), 1), "s": q["sample"], "L": sorted(mem[i])})
st_svg = "\n".join(st_svg)
opts = "".join('<option value="%s">%s</option>' % (c, CURATED[c]) for c in lines_present)
cheap = min(pts, key=lambda z: z["rent_1k"]); pricey = max(pts, key=lambda z: z["rent_1k"])

HTML = '''<style>
:root{
  --bg:#f4f7fb;--panel:#fff;--ink:#0b2545;--muted:#5b6b82;--line:#e3e9f1;--accent:#1d4e89;--field:#f4f7fb;
  /* carte VERROUILLEE en clair (le degrade fonce=cher exige un fond clair) */
  --map:#fbfdff;--wfill:#eef3f9;--wline:#d7e0ec;--wlabel:#8494a9;--rail-op:.45;--stroke:#fff;--halo:#fbfdff;--mapink:#0b2545;
  --grad:linear-gradient(90deg,#eaf0f7,#9fc0e0,#4f86c6,#1d4e89,#0b2545);}
@media (prefers-color-scheme:dark){:root{--bg:#0a111f;--panel:#111a2b;--ink:#eaf0f7;--muted:#93a3bd;--line:#1e2b44;--accent:#7fb0e6;--field:#0a111f;}}
:root[data-theme="dark"]{--bg:#0a111f;--panel:#111a2b;--ink:#eaf0f7;--muted:#93a3bd;--line:#1e2b44;--accent:#7fb0e6;--field:#0a111f;}
:root[data-theme="light"]{--bg:#f4f7fb;--panel:#fff;--ink:#0b2545;--muted:#5b6b82;--line:#e3e9f1;--accent:#1d4e89;--field:#f4f7fb;}
*{box-sizing:border-box}
.wrap{font-family:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--ink);background:var(--bg);min-height:100vh;padding:clamp(16px,3vw,32px);}
.head{max-width:1300px;margin:0 auto 14px;}
.eyebrow{font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);font-weight:700;margin:0 0 6px;}
h1{font-size:clamp(1.5rem,4vw,2.4rem);line-height:1.05;margin:0 0 8px;text-wrap:balance;font-weight:800;letter-spacing:-.01em;}
.sub{color:var(--muted);font-size:clamp(.95rem,1.6vw,1.05rem);margin:0;max-width:64ch;line-height:1.5;}
.tools{max-width:1300px;margin:0 auto 10px;display:flex;gap:12px;flex-wrap:wrap;align-items:center;}
.tools label{font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);font-weight:700;margin-right:6px;}
select,input{font:inherit;font-size:.92rem;color:var(--ink);background:var(--field);border:1px solid var(--line);border-radius:10px;padding:8px 12px;min-width:190px;}
select:focus,input:focus{outline:2px solid var(--accent);outline-offset:1px;}
.count{font-size:.85rem;color:var(--muted);font-weight:600;}
.reset{cursor:pointer;border:1px solid var(--line);background:var(--panel);color:var(--accent);border-radius:10px;padding:8px 12px;font-weight:700;font-size:.85rem;}
.stage{position:relative;max-width:1120px;margin:0 auto;background:var(--map);border:1px solid var(--line);border-radius:16px;padding:8px;box-shadow:0 1px 3px rgba(11,37,69,.06);overflow:hidden;}
svg{width:100%;height:auto;display:block;touch-action:none;cursor:grab;background:var(--map);}
svg.grab{cursor:grabbing;}
.wards path{fill:var(--wfill);stroke:var(--wline);stroke-width:1.3;stroke-linejoin:round;}
.wardlabels text{fill:var(--wlabel);font-size:22px;font-weight:700;letter-spacing:2px;text-anchor:middle;text-transform:uppercase;}
.rail-bg{fill:none;stroke:#aeb9c8;stroke-width:2;stroke-linejoin:round;stroke-linecap:round;opacity:calc(var(--rail-op)*.7);}
.rail{fill:none;stroke-width:2.6;stroke-linejoin:round;stroke-linecap:round;opacity:var(--rail-op);transition:opacity .15s,stroke-width .15s;}
.rails.filtered .rail,.rails.filtered .rail-bg{opacity:.10;}
.rails.filtered .rail.hot{opacity:1;stroke-width:4.6;}
circle.st{stroke:var(--stroke);stroke-width:1.1;cursor:pointer;}
circle.st:hover,circle.st:focus{stroke-width:2.6;outline:none;}
circle.st.dim{opacity:.08;}
.stlabel{fill:var(--mapink);font-size:15px;font-weight:700;text-anchor:middle;paint-order:stroke;stroke:var(--halo);stroke-width:3.6px;stroke-linejoin:round;pointer-events:none;}
.zoomctl{position:absolute;top:16px;right:16px;display:flex;flex-direction:column;gap:6px;z-index:5;}
.zoomctl button{width:38px;height:38px;border:1px solid var(--line);background:var(--panel);color:var(--ink);border-radius:10px;font-size:20px;font-weight:700;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.1);line-height:1;display:flex;align-items:center;justify-content:center;}
.zoomctl button:hover{background:var(--field);}
.legend{position:absolute;left:16px;bottom:14px;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:9px 12px;font-size:.75rem;color:var(--muted);box-shadow:0 1px 3px rgba(0,0,0,.06);}
.legend .bar{width:200px;height:10px;border-radius:6px;background:var(--grad);margin:6px 0 4px;}
.legend .ends{display:flex;justify-content:space-between;font-variant-numeric:tabular-nums;font-weight:700;color:var(--ink);}
.legend .cap{font-weight:700;letter-spacing:.04em;text-transform:uppercase;font-size:.66rem;}
.tip{position:absolute;pointer-events:none;opacity:0;transform:translate(-50%,-125%);text-align:left;background:#0b2545;color:#fff;padding:9px 12px;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.28);transition:opacity .1s;min-width:150px;z-index:6;}
.tip .tn{font-weight:800;font-size:.95rem;margin-bottom:3px;}
.tip .tr{font-size:.82rem;font-variant-numeric:tabular-nums;line-height:1.5;}
.tip .tr b{font-weight:800;} .tip .ts{font-size:.7rem;opacity:.7;margin-top:3px;}
.foot{max-width:1300px;margin:12px auto 0;color:var(--muted);font-size:.76rem;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;}
</style>
<div class="wrap">
  <div class="head">
    <p class="eyebrow">Tokyo Expat &middot; rent data</p>
    <h1>Tokyo rent, station by station</h1>
    <p class="sub">Median 1K studio rent at <b>%NST% stations</b> across Tokyo's 23 wards. Pick a line or search a station to reveal rents; zoom with the buttons, wheel or drag; hover any dot for its 1K / 1LDK / 2LDK.</p>
  </div>
  <div class="tools">
    <span><label for="lineSel">Line</label><select id="lineSel"><option value="">All lines</option>%OPTS%</select></span>
    <span><label for="stSearch">Find a station</label><input id="stSearch" type="search" placeholder="e.g. Nakano" autocomplete="off"></span>
    <button class="reset" id="reset" type="button">Reset</button>
    <span class="count" id="count">%NST% stations</span>
  </div>
  <div class="stage">
    <div class="zoomctl"><button id="zin" aria-label="Zoom in">+</button><button id="zout" aria-label="Zoom out">&minus;</button><button id="zreset" aria-label="Reset view">&#8635;</button></div>
    <svg id="map" viewBox="0 0 %WVB% %HVB%" role="img" aria-label="Interactive Tokyo rent map by station and line">
      <g id="vp">
        <g class="wards">%WARDS%</g>
        <g class="wardlabels">%WARDLBL%</g>
        <g class="rails" id="rails">%RAILS%</g>
        <g id="stations">%STATIONS%</g>
      </g>
      <g class="stlabels" id="dynlabels"></g>
    </svg>
    <div class="legend"><div class="cap">Median 1K rent</div><div class="bar"></div>
      <div class="ends"><span>&yen;%RMIN%k</span><span>&yen;%RMAX%k</span></div></div>
    <div class="tip" id="tip"></div>
  </div>
  <div class="foot"><span>Cheapest %CHEAP_N% &yen;%CHEAP_R% &middot; priciest %PRICEY_N% &yen;%PRICEY_R% &middot; median, real active listings.</span><span>Boundaries &amp; map: OpenStreetMap &middot; tokyo-expat.com</span></div>
</div>
<script>
(function(){
  var VBW=%WVB%, VBH=%HVB%;
  var DATA=%JSDATA%;
  var svg=document.getElementById('map'), vp=document.getElementById('vp');
  var rails=document.getElementById('rails'), dyn=document.getElementById('dynlabels');
  var tip=document.getElementById('tip'), stage=document.querySelector('.stage');
  var lineSel=document.getElementById('lineSel'), search=document.getElementById('stSearch'), countEl=document.getElementById('count');
  var circles=[].slice.call(document.querySelectorAll('circle.st'));
  var SVGNS='http://www.w3.org/2000/svg';
  var k=1, tx=0, ty=0, curMatch=null;

  // ---------- tooltip ----------
  function tipHTML(el){var n=el.getAttribute('data-n'),a=el.getAttribute('data-k'),l=el.getAttribute('data-l'),t=el.getAttribute('data-t'),s=el.getAttribute('data-s');
    var r='1K <b>&yen;'+a+'</b>';if(l)r+='<br>1LDK <b>&yen;'+l+'</b>';if(t)r+='<br>2LDK <b>&yen;'+t+'</b>';
    return '<div class="tn">'+n+'</div><div class="tr">'+r+'</div><div class="ts">'+s+' listings</div>';}
  function at(cx,cy){var rb=stage.getBoundingClientRect();tip.style.left=(cx-rb.left)+'px';tip.style.top=(cy-rb.top)+'px';tip.style.opacity=1;}
  circles.forEach(function(el){
    el.addEventListener('mousemove',function(e){if(dragging)return;tip.innerHTML=tipHTML(el);at(e.clientX,e.clientY);});
    el.addEventListener('mouseleave',function(){tip.style.opacity=0;});
    el.addEventListener('focus',function(){tip.innerHTML=tipHTML(el);var b=el.getBoundingClientRect();at(b.left+b.width/2,b.top+b.height/2);});
    el.addEventListener('blur',function(){tip.style.opacity=0;});
  });

  // ---------- zoom / pan ----------
  function applyT(){vp.setAttribute('transform','translate('+tx+' '+ty+') scale('+k+')');placeLabels();}
  function clamp(v,a,b){return v<a?a:(v>b?b:v);}
  function toVB(clientX,clientY){var rb=svg.getBoundingClientRect();return [ (clientX-rb.left)/rb.width*VBW, (clientY-rb.top)/rb.height*VBH ];}
  function zoomAt(f,vx,vy){var nk=clamp(k*f,1,9);tx=vx-(vx-tx)*(nk/k);ty=vy-(vy-ty)*(nk/k);k=nk;
    // garde-fou pan (ne pas sortir la carte)
    tx=clamp(tx,VBW-VBW*k,0);ty=clamp(ty,VBH-VBH*k,0);applyT();}
  document.getElementById('zin').onclick=function(){zoomAt(1.4,VBW/2,VBH/2);};
  document.getElementById('zout').onclick=function(){zoomAt(1/1.4,VBW/2,VBH/2);};
  document.getElementById('zreset').onclick=function(){k=1;tx=0;ty=0;applyT();};
  svg.addEventListener('wheel',function(e){e.preventDefault();var p=toVB(e.clientX,e.clientY);zoomAt(e.deltaY<0?1.18:1/1.18,p[0],p[1]);},{passive:false});
  var dragging=false,sxp=0,syp=0,stx=0,sty=0;
  svg.addEventListener('pointerdown',function(e){dragging=true;svg.classList.add('grab');sxp=e.clientX;syp=e.clientY;stx=tx;sty=ty;svg.setPointerCapture(e.pointerId);tip.style.opacity=0;});
  svg.addEventListener('pointermove',function(e){if(!dragging)return;var rb=svg.getBoundingClientRect();
    tx=clamp(stx+(e.clientX-sxp)/rb.width*VBW,VBW-VBW*k,0);ty=clamp(sty+(e.clientY-syp)/rb.height*VBH,VBH-VBH*k,0);applyT();});
  function endDrag(){dragging=false;svg.classList.remove('grab');}
  svg.addEventListener('pointerup',endDrag);svg.addEventListener('pointercancel',endDrag);

  // ---------- filtre + labels anti-collision ----------
  function place(box,boxes){for(var i=0;i<boxes.length;i++){var b=boxes[i];if(!(box[2]<b[0]||box[0]>b[2]||box[3]<b[1]||box[1]>b[3]))return false;}return true;}
  function placeLabels(){
    while(dyn.firstChild)dyn.removeChild(dyn.firstChild);
    if(!curMatch)return;
    var set={};curMatch.forEach(function(n){set[n]=1;});
    var cand=DATA.filter(function(d){return set[d.n];}).sort(function(a,b){return b.s-a.s;});
    var boxes=[],placed=0;
    for(var i=0;i<cand.length&&placed<60;i++){
      var d=cand[i];var X=tx+k*d.x, Y=ty+k*d.y;
      if(X<0||X>VBW||Y<0||Y>VBH)continue;
      var w=d.n.length*8.4+8;
      var cands=[[0,-16],[0,20],[0,-32],[0,34]];
      for(var c=0;c<cands.length;c++){
        var cx=X+cands[c][0], cy=Y+cands[c][1];
        var box=[cx-w/2,cy-11,cx+w/2,cy+11];
        if(place(box,boxes)){boxes.push(box);
          var t=document.createElementNS(SVGNS,'text');t.setAttribute('class','stlabel');t.setAttribute('x',cx);t.setAttribute('y',cy+5);t.textContent=d.n;dyn.appendChild(t);placed++;break;}
      }
    }
  }
  function apply(){
    var code=lineSel.value, q=(search.value||'').trim().toLowerCase();
    var active=!!code||!!q, hits=[];
    circles.forEach(function(c){
      var n=c.getAttribute('data-n').toLowerCase(), ls=(','+c.getAttribute('data-lines')+',');
      var ok=(!code||ls.indexOf(','+code+',')>=0)&&(!q||n.indexOf(q)>=0);
      c.classList.toggle('dim',active&&!ok);
      if(active&&ok)hits.push(c.getAttribute('data-n'));
    });
    rails.classList.toggle('filtered',!!code);
    [].forEach.call(rails.querySelectorAll('.rail'),function(p){p.classList.toggle('hot',code&&p.getAttribute('data-line')===code);});
    curMatch=active?hits:null;placeLabels();
    countEl.textContent=active?(hits.length+' station'+(hits.length===1?'':'s')):(circles.length+' stations');
  }
  lineSel.addEventListener('change',apply);
  search.addEventListener('input',apply);
  document.getElementById('reset').addEventListener('click',function(){lineSel.value='';search.value='';apply();});
})();
</script>'''

import json as _j
HTML = (HTML.replace("%WVB%", str(int(W))).replace("%HVB%", str(int(H)))
    .replace("%WARDS%", "\n".join(ward_svg)).replace("%WARDLBL%", "\n".join(ward_lbl))
    .replace("%RAILS%", rails_svg).replace("%STATIONS%", st_svg)
    .replace("%OPTS%", opts).replace("%JSDATA%", _j.dumps(jsdata, ensure_ascii=False))
    .replace("%NST%", str(len(pts))).replace("%RMIN%", str(rmin//1000)).replace("%RMAX%", str(rmax//1000))
    .replace("%CHEAP_N%", cheap["station_en"]).replace("%CHEAP_R%", money(cheap["rent_1k"]))
    .replace("%PRICEY_N%", pricey["station_en"]).replace("%PRICEY_R%", money(pricey["rent_1k"])))
OUT.write_text(HTML, encoding="utf-8")
print("Ecrit:", OUT, "| %.0f KB | %d stations | %d lignes | wards %d" % (
    len(HTML.encode("utf-8"))/1024, len(pts), len(lines_present), len(ward_svg)))
