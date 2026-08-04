'use client'

import { useEffect, useRef, useState } from 'react'

type Station = { n: string; x: number; y: number; k: number; l: number | null; t: number | null; s: number; f: string; L: string[] }
type Ward = { n: string; d: string; cx: number; cy: number }
type Rail = { c: string; col: string; d: string }
type LineOpt = { c: string; n: string }
type MapData = {
  w: number; h: number; rmin: number; rmax: number; grad: string[]
  wards: Ward[]; railsBg: string; rails: Rail[]; lines: LineOpt[]; stations: Station[]
}

const CSS = `
.rm-stage{position:relative;max-width:1120px;margin:0 auto;background:#fbfdff;border:1px solid #e3e9f1;border-radius:16px;padding:8px;box-shadow:0 1px 3px rgba(15,39,68,.06);overflow:hidden;user-select:none;-webkit-user-select:none;-moz-user-select:none;}
.rm-vp{transform-origin:0 0;cursor:grab;touch-action:none;}
.rm-vp.rm-grab{cursor:grabbing;}
.rm-vp svg{width:100%;height:auto;display:block;background:#fbfdff;pointer-events:none;}
.rm-wards path{fill:#eef2f7;stroke:#d6dfea;stroke-width:1.3;stroke-linejoin:round;}
.rm-wl text{fill:#8492a6;font-size:22px;font-weight:700;letter-spacing:2px;text-anchor:middle;text-transform:uppercase;}
.rm-railbg{fill:none;stroke:#aeb9c8;stroke-width:2;stroke-linejoin:round;stroke-linecap:round;opacity:.31;}
.rm-rail{fill:none;stroke-width:2.6;stroke-linejoin:round;stroke-linecap:round;opacity:.45;transition:opacity .15s,stroke-width .15s;}
.rm-rails.rm-filtered .rm-rail,.rm-rails.rm-filtered .rm-railbg{opacity:.1;}
.rm-rails.rm-filtered .rm-rail.rm-hot{opacity:1;stroke-width:4.6;}
circle.rm-st{stroke:#fff;stroke-width:1.1;pointer-events:auto;cursor:pointer;}
circle.rm-st.rm-dim{opacity:.08;}
.rm-lbl{fill:#0f2744;font-size:30px;font-weight:700;text-anchor:middle;paint-order:stroke;stroke:#fbfdff;stroke-width:6px;stroke-linejoin:round;pointer-events:none;}
.rm-zoom{position:absolute;top:14px;right:14px;display:flex;flex-direction:column;gap:6px;z-index:5;}
.rm-zoom button{width:38px;height:38px;border:1px solid #e3e9f1;background:#fff;color:#0f2744;border-radius:10px;font-size:20px;font-weight:700;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.1);line-height:1;display:flex;align-items:center;justify-content:center;}
.rm-zoom button:hover{background:#f4f7fb;}
.rm-legend{position:absolute;left:14px;bottom:12px;background:#fff;border:1px solid #e3e9f1;border-radius:12px;padding:9px 12px;font-size:12px;color:#5b6b82;box-shadow:0 1px 3px rgba(0,0,0,.06);z-index:5;}
.rm-legend .rm-bar{width:190px;height:10px;border-radius:6px;margin:6px 0 4px;}
.rm-legend .rm-ends{display:flex;justify-content:space-between;font-weight:700;color:#0f2744;font-variant-numeric:tabular-nums;}
.rm-legend .rm-cap{font-weight:700;letter-spacing:.04em;text-transform:uppercase;font-size:10.5px;}
.rm-tip{position:absolute;pointer-events:none;opacity:0;transform:translate(-50%,-125%);text-align:left;background:#0f2744;color:#fff;padding:9px 12px;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.28);transition:opacity .1s;min-width:150px;z-index:6;font-size:14px;}
.rm-tip b{font-weight:800;font-variant-numeric:tabular-nums;}
`

export default function RentMap({ locale }: { locale: string }) {
  const fr = locale === 'fr'
  const [data, setData] = useState<MapData | null>(null)
  const [line, setLine] = useState('')
  const [query, setQuery] = useState('')
  const [count, setCount] = useState('')

  const svgRef = useRef<SVGSVGElement>(null)
  const vpRef = useRef<HTMLDivElement>(null)
  const railsRef = useRef<SVGGElement>(null)
  const dynRef = useRef<SVGGElement>(null)
  const tipRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const view = useRef({ k: 1, tx: 0, ty: 0 })
  const filt = useRef({ line: '', query: '' })

  useEffect(() => {
    let ok = true
    fetch('/rentMapData.json').then(r => r.json()).then((d: MapData) => { if (ok) setData(d) }).catch(() => {})
    return () => { ok = false }
  }, [])

  useEffect(() => {
    if (!data) return
    const svg = svgRef.current!, vp = vpRef.current!, dyn = dynRef.current!, tip = tipRef.current!
    const stage = stageRef.current!, rails = railsRef.current!
    const circles = Array.from(svg.querySelectorAll<SVGCircleElement>('circle.rm-st'))
    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v)
    let match: Station[] = []
    let raf = 0
    let pinned = false
    let idleTimer: ReturnType<typeof setTimeout> | undefined
    const wcActive = () => { clearTimeout(idleTimer); vp.style.willChange = 'transform' }
    const wcIdle = (ms: number) => { clearTimeout(idleTimer); idleTimer = setTimeout(() => { vp.style.willChange = 'auto' }, ms) }
    // geometrie (en px ecran) mise en cache -> AUCUN getBoundingClientRect dans la boucle
    let natW = vp.clientWidth, natH = vp.clientHeight, originL = 0, originT = 0
    const refreshGeom = () => {
      const rb = vp.getBoundingClientRect()
      originL = rb.left - view.current.tx
      originT = rb.top - view.current.ty
      natW = vp.clientWidth
      natH = vp.clientHeight
    }

    // --- transform sur le DIV (couche GPU garantie) ; 1 rendu/frame ---
    const setTransform = () => {
      const { k, tx, ty } = view.current
      vp.style.transform = `translate(${tx}px, ${ty}px) scale(${k})`
    }
    const scheduleDraw = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; setTransform() }) }
    const zoomAt = (f: number, mx: number, my: number) => {
      const v = view.current
      const nk = clamp(v.k * f, 1, 9)
      v.tx = clamp(mx - (mx - v.tx) * (nk / v.k), natW * (1 - nk), 0)
      v.ty = clamp(my - (my - v.ty) * (nk / v.k), natH * (1 - nk), 0)
      v.k = nk
      scheduleDraw()
    }

    // --- labels (dans le SVG, suivent le zoom du div), calcules 1x/filtre ---
    const overlap = (a: number[], b: number[]) => !(a[2] < b[0] || a[0] > b[2] || a[3] < b[1] || a[1] > b[3])
    const placeLabels = () => {
      while (dyn.firstChild) dyn.removeChild(dyn.firstChild)
      if (!match.length) return
      const boxes: number[][] = []
      let placed = 0
      for (let i = 0; i < match.length && placed < 70; i++) {
        const d = match[i], w = d.n.length * 16 + 12, hh = 17, off = 8 + hh + 6
        const cands = [[0, -off], [0, off], [w / 2 + 16, 0], [-(w / 2 + 16), 0], [0, -off - 34], [0, off + 34]]
        for (const [dx, dy] of cands) {
          const cx = d.x + dx, cy = d.y + dy
          const box = [cx - w / 2, cy - hh, cx + w / 2, cy + hh]
          if (!boxes.some(bb => overlap(box, bb))) {
            boxes.push(box)
            const t = document.createElementNS('http://www.w3.org/2000/svg', 'text')
            t.setAttribute('class', 'rm-lbl'); t.setAttribute('x', String(cx)); t.setAttribute('y', String(cy + 10))
            t.textContent = d.n; dyn.appendChild(t); placed++; break
          }
        }
      }
    }
    const apply = () => {
      const code = filt.current.line, q = filt.current.query.toLowerCase()
      const active = !!code || !!q
      let hits = 0
      circles.forEach(c => {
        const n = (c.getAttribute('data-n') || '').toLowerCase()
        const ls = ',' + (c.getAttribute('data-lines') || '') + ','
        const okc = (!code || ls.indexOf(',' + code + ',') >= 0) && (!q || n.indexOf(q) >= 0)
        c.classList.toggle('rm-dim', active && !okc)
        if (active && okc) hits++
      })
      rails.classList.toggle('rm-filtered', !!code)
      rails.querySelectorAll<SVGPathElement>('.rm-rail').forEach(p => p.classList.toggle('rm-hot', !!code && p.getAttribute('data-line') === code))
      setCount(active ? `${hits} ${hits === 1 ? 'station' : 'stations'}` : `${circles.length} stations`)
      match = active ? data.stations.filter(d => (!code || d.L.indexOf(code) >= 0) && (!q || d.n.toLowerCase().indexOf(q) >= 0)).sort((a, b) => b.s - a.s) : []
      placeLabels()
    }
    ;(svg as unknown as { _apply?: () => void })._apply = apply

    // --- tooltip (hover desktop + tap mobile) ---
    let moved = false, panning = false, pinch = false
    const showTip = (el: SVGCircleElement, cx: number, cy: number) => {
      const n = el.getAttribute('data-n'), a = el.getAttribute('data-k')
      const l = el.getAttribute('data-l'), t = el.getAttribute('data-t'), s = el.getAttribute('data-s')
      let r = `1K <b>&yen;${a}</b>`
      if (l) r += `<br>1LDK <b>&yen;${l}</b>`
      if (t) r += `<br>2LDK <b>&yen;${t}</b>`
      tip.innerHTML = `<div style="font-weight:800;font-size:15px;margin-bottom:3px">${n}</div><div style="line-height:1.5">${r}</div><div style="font-size:11px;opacity:.7;margin-top:3px">${s} listings</div>`
      const rb = stage.getBoundingClientRect()
      tip.style.left = (cx - rb.left) + 'px'; tip.style.top = (cy - rb.top) + 'px'; tip.style.opacity = '1'
    }
    const hideTip = () => { tip.style.opacity = '0' }
    circles.forEach(el => {
      el.addEventListener('mousemove', e => { if (!panning && !pinch && !pinned) showTip(el, (e as MouseEvent).clientX, (e as MouseEvent).clientY) })
      el.addEventListener('mouseleave', () => { if (!pinned) hideTip() })
      el.addEventListener('click', () => { if (!moved) { pinned = true; const b = el.getBoundingClientRect(); showTip(el, b.left + b.width / 2, b.top + b.height / 2) } })
    })

    // --- pan + pinch (pointer events, coords px ecran) ---
    const pts = new Map<number, { x: number; y: number }>()
    let panTx = 0, panTy = 0, panX = 0, panY = 0, lastDist = 0
    const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y)
    const onDown = (e: PointerEvent) => {
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY })
      vp.setPointerCapture(e.pointerId)
      moved = false
      refreshGeom()
      if (pts.size === 1) { panning = true; pinch = false; pinned = false; panTx = view.current.tx; panTy = view.current.ty; panX = e.clientX; panY = e.clientY; vp.classList.add('rm-grab'); hideTip(); wcActive() }
      else if (pts.size === 2) { panning = false; pinch = true; const [p1, p2] = Array.from(pts.values()); lastDist = dist(p1, p2); wcActive() }
    }
    const onMove = (e: PointerEvent) => {
      if (!pts.has(e.pointerId)) return
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (pinch && pts.size >= 2) {
        const [p1, p2] = Array.from(pts.values())
        const d = dist(p1, p2)
        if (lastDist > 0) zoomAt(d / lastDist, (p1.x + p2.x) / 2 - originL, (p1.y + p2.y) / 2 - originT)
        lastDist = d; moved = true
      } else if (panning) {
        if (Math.abs(e.clientX - panX) + Math.abs(e.clientY - panY) > 4) moved = true
        const k = view.current.k
        view.current.tx = clamp(panTx + (e.clientX - panX), natW * (1 - k), 0)
        view.current.ty = clamp(panTy + (e.clientY - panY), natH * (1 - k), 0)
        scheduleDraw()
      }
    }
    const onUp = (e: PointerEvent) => {
      pts.delete(e.pointerId)
      if (pts.size < 2) { pinch = false; lastDist = 0 }
      if (pts.size === 1) { const [p] = Array.from(pts.values()); panning = true; panTx = view.current.tx; panTy = view.current.ty; panX = p.x; panY = p.y }
      if (pts.size === 0) { panning = false; vp.classList.remove('rm-grab'); wcIdle(120) }
    }
    const onWheel = (e: WheelEvent) => { e.preventDefault(); wcActive(); refreshGeom(); zoomAt(e.deltaY < 0 ? 1.18 : 1 / 1.18, e.clientX - originL, e.clientY - originT); wcIdle(240) }
    vp.addEventListener('pointerdown', onDown)
    vp.addEventListener('pointermove', onMove)
    vp.addEventListener('pointerup', onUp)
    vp.addEventListener('pointercancel', onUp)
    vp.addEventListener('wheel', onWheel, { passive: false })

    ;(svg as unknown as { _zin?: () => void })._zin = () => { wcActive(); refreshGeom(); zoomAt(1.4, natW / 2, natH / 2); wcIdle(240) }
    ;(svg as unknown as { _zout?: () => void })._zout = () => { wcActive(); refreshGeom(); zoomAt(1 / 1.4, natW / 2, natH / 2); wcIdle(240) }
    ;(svg as unknown as { _zreset?: () => void })._zreset = () => { wcActive(); view.current = { k: 1, tx: 0, ty: 0 }; setTransform(); wcIdle(240) }

    setTransform()
    apply()
    return () => {
      if (raf) cancelAnimationFrame(raf)
      clearTimeout(idleTimer)
      vp.removeEventListener('pointerdown', onDown)
      vp.removeEventListener('pointermove', onMove)
      vp.removeEventListener('pointerup', onUp)
      vp.removeEventListener('pointercancel', onUp)
      vp.removeEventListener('wheel', onWheel)
    }
  }, [data])

  useEffect(() => {
    filt.current = { line, query }
    const svg = svgRef.current as unknown as { _apply?: () => void } | null
    svg?._apply?.()
  }, [line, query])

  const zcall = (name: '_zin' | '_zout' | '_zreset') => {
    const svg = svgRef.current as unknown as Record<string, (() => void) | undefined> | null
    svg?.[name]?.()
  }

  if (!data) {
    return (
      <div style={{ maxWidth: 1120, margin: '0 auto', height: 420, borderRadius: 16, border: '1px solid #e3e9f1', background: '#fbfdff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8492a6' }}>
        {fr ? 'Chargement de la carte des loyers…' : 'Loading rent map…'}
      </div>
    )
  }

  const g = data.grad
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div style={{ maxWidth: 1120, margin: '0 auto 12px', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <label style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em', color: '#5b6b82', fontWeight: 700 }}>
          {fr ? 'Ligne' : 'Line'}{' '}
          <select value={line} onChange={e => setLine(e.target.value)} style={{ font: 'inherit', fontSize: 14, color: '#0f2744', background: '#f4f7fb', border: '1px solid #e3e9f1', borderRadius: 10, padding: '8px 12px', marginLeft: 6 }}>
            <option value="">{fr ? 'Toutes les lignes' : 'All lines'}</option>
            {data.lines.map(l => <option key={l.c} value={l.c}>{l.n}</option>)}
          </select>
        </label>
        <label style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em', color: '#5b6b82', fontWeight: 700 }}>
          {fr ? 'Chercher une station' : 'Find a station'}{' '}
          <input value={query} onChange={e => setQuery(e.target.value)} type="search" placeholder={fr ? 'ex. Nakano' : 'e.g. Nakano'} autoComplete="off" style={{ font: 'inherit', fontSize: 14, color: '#0f2744', background: '#f4f7fb', border: '1px solid #e3e9f1', borderRadius: 10, padding: '8px 12px', marginLeft: 6, minWidth: 180 }} />
        </label>
        <button type="button" onClick={() => { setLine(''); setQuery('') }} style={{ cursor: 'pointer', border: '1px solid #e3e9f1', background: '#fff', color: '#e84141', borderRadius: 10, padding: '8px 12px', fontWeight: 700, fontSize: 14 }}>{fr ? 'Réinitialiser' : 'Reset'}</button>
        <span style={{ fontSize: 14, color: '#5b6b82', fontWeight: 600 }}>{count}</span>
      </div>

      <div className="rm-stage" ref={stageRef}>
        <div className="rm-zoom">
          <button type="button" aria-label="Zoom in" onClick={() => zcall('_zin')}>+</button>
          <button type="button" aria-label="Zoom out" onClick={() => zcall('_zout')}>&minus;</button>
          <button type="button" aria-label="Reset view" onClick={() => zcall('_zreset')}>&#8635;</button>
        </div>
        <div className="rm-vp" ref={vpRef}>
          <svg ref={svgRef} viewBox={`0 0 ${data.w} ${data.h}`} role="img" aria-label="Interactive Tokyo rent map by station and line">
            <g className="rm-wards">{data.wards.map(w => <path key={w.n} d={w.d} />)}</g>
            <g className="rm-wl">{data.wards.map(w => <text key={w.n} x={w.cx} y={w.cy}>{w.n}</text>)}</g>
            <g className="rm-rails" ref={railsRef}>
              <path className="rm-railbg" d={data.railsBg} />
              {data.rails.map(r => <path key={r.c} className="rm-rail" data-line={r.c} d={r.d} stroke={r.col} />)}
            </g>
            <g>
              {data.stations.map((s, i) => (
                <circle key={i} className="rm-st" cx={s.x} cy={s.y} r={8} fill={s.f}
                  data-n={s.n} data-k={s.k.toLocaleString()} data-l={s.l ? s.l.toLocaleString() : ''} data-t={s.t ? s.t.toLocaleString() : ''} data-s={s.s.toLocaleString()} data-lines={s.L.join(',')} />
              ))}
            </g>
            <g className="rm-lbls" ref={dynRef} />
          </svg>
        </div>
        <div className="rm-legend">
          <div className="rm-cap">{fr ? 'Loyer médian 1K' : 'Median 1K rent'}</div>
          <div className="rm-bar" style={{ background: `linear-gradient(90deg, ${g[0]}, ${g[1]}, ${g[2]}, ${g[3]}, ${g[4]})` }} />
          <div className="rm-ends"><span>&yen;{Math.round(data.rmin / 1000)}k</span><span>&yen;{Math.round(data.rmax / 1000)}k</span></div>
        </div>
        <div className="rm-tip" ref={tipRef} />
      </div>
    </div>
  )
}
