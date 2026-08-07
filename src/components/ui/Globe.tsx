'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { geoOrthographic, geoPath, geoGraticule, geoDistance, geoCentroid } from 'd3-geo'
import { feature } from 'topojson-client'
import type { FeatureCollection, Geometry } from 'geojson'

export interface MapLocation {
  lat: number
  lng: number
  label?: string
  id?: string
  org?: string
  orgUrl?: string
}

// Africa is our focus — tinted stronger than the rest of the world's land.
// Names match the world-atlas (Natural Earth) `name` property.
const AFRICA = new Set([
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cameroon',
  'Central African Rep.', 'Chad', 'Comoros', 'Congo', "Côte d'Ivoire", 'Dem. Rep. Congo',
  'Djibouti', 'Egypt', 'Eq. Guinea', 'Eritrea', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana',
  'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi',
  'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria',
  'Rwanda', 'Senegal', 'Sierra Leone', 'Somalia', 'Somaliland', 'South Africa', 'S. Sudan',
  'Sudan', 'eSwatini', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'W. Sahara', 'Zambia', 'Zimbabwe',
])

const AFRICA_CENTER: [number, number] = [20, 3] // [lng, lat]
const SIZE = 400
const ZOOM_SCALE = 1.7

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

export function Globe({
  locations = [],
  activeLocationId = null,
  zoomedLocationId = null,
  onCloseZoom,
  onLocationClick,
  className = 'w-full aspect-square max-w-[30rem] mx-auto',
  labelPosition = 'bottom',
}: {
  locations?: MapLocation[]
  activeLocationId?: string | null
  /** When set, the globe zooms in on this location and shows a floating info
   *  card anchored to its marker. Distinct from `activeLocationId` so hover
   *  can keep doing the light tint/center preview without triggering the
   *  bigger zoom+card move — that's reserved for a deliberate selection. */
  zoomedLocationId?: string | null
  onCloseZoom?: () => void
  onLocationClick?: (id: string) => void
  onLocationHover?: (id: string | null) => void
  className?: string
  labelPosition?: 'bottom' | 'top'
}) {
  const [geographies, setGeographies] = useState<any[]>([])
  const [rotation, setRotation] = useState<[number, number]>([-AFRICA_CENTER[0], -AFRICA_CENTER[1]])
  const [zoom, setZoom] = useState(1)
  const [inView, setInView] = useState(true)
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  const partnerNames = useMemo(() => new Set(locations.map((l) => l.id || l.label)), [locations])
  const activeLoc = useMemo(
    () => locations.find((l) => (l.id || l.label) === activeLocationId) || null,
    [locations, activeLocationId],
  )
  const zoomedLoc = useMemo(
    () => locations.find((l) => (l.id || l.label) === zoomedLocationId) || null,
    [locations, zoomedLocationId],
  )

  useEffect(() => {
    let cancelled = false
    fetch('/countries-110m.json')
      .then((r) => r.json())
      .then((topo) => {
        if (cancelled) return
        const { features } = feature(topo, topo.objects.countries) as unknown as FeatureCollection<
          Geometry,
          { name?: string }
        >
        setGeographies(features)
      })
      .catch((e) => console.error('Globe: failed to load topology', e))
    return () => {
      cancelled = true
    }
  }, [])

  // Only animate while the globe is actually on screen — saves CPU/battery on
  // low-end devices (it sits near the bottom of a long page).
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '150px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Animation loop: eases the rotation toward its target — the active country,
  // or the Africa "home" view when nothing is selected — and the zoom toward
  // its target, then freezes once both have settled. An idle globe costs
  // nothing (no auto-spin), but it always eases back to the home position after
  // a selection clears rather than freezing wherever it happened to stop.
  const rot = useRef(rotation)
  rot.current = rotation
  const zoomRef = useRef(zoom)
  zoomRef.current = zoom
  useEffect(() => {
    if (!inView) return
    let raf = 0
    let last = performance.now()
    const FRAME = 1000 / 60 // cap at 60fps for smoother animation, saving CPU on 120hz displays
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (now - last < FRAME) return
      last = now

      const targetLng = activeLoc ? -activeLoc.lng : -AFRICA_CENTER[0]
      const targetPhi = activeLoc ? -activeLoc.lat : -AFRICA_CENTER[1]
      const zoomTarget = zoomedLoc ? ZOOM_SCALE : 1

      let [lam, phi] = rot.current
      let dl = targetLng - lam
      while (dl > 180) dl -= 360
      while (dl < -180) dl += 360

      const rotSettled = Math.abs(dl) < 0.04 && Math.abs(targetPhi - phi) < 0.04
      const zoomSettled = Math.abs(zoomRef.current - zoomTarget) < 0.001
      if (rotSettled && zoomSettled) return // settled at target — freeze

      // reduced-motion: snap instead of easing.
      const ease = reduced ? 1 : activeLoc ? 0.1 : 0.08
      lam += dl * ease
      phi += (targetPhi - phi) * ease

      if (lam > 180) lam -= 360
      else if (lam < -180) lam += 360

      const z = reduced ? zoomTarget : zoomRef.current + (zoomTarget - zoomRef.current) * 0.08
      setZoom(z)
      setRotation([lam, phi])
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [activeLoc, zoomedLoc, reduced, inView])

  const projection = useMemo(
    () =>
      geoOrthographic()
        .translate([SIZE / 2, SIZE / 2])
        .scale((SIZE / 2 - 6) * zoom)
        .rotate([rotation[0], rotation[1]])
        .clipAngle(90),
    [rotation, zoom],
  )
  const path = useMemo(() => geoPath(projection), [projection])
  const graticule = useMemo(() => geoGraticule().step([20, 20])(), [])
  const center: [number, number] = [-rotation[0], -rotation[1]]

  // Where the zoomed-in marker actually lands on screen, so the floating
  // card can anchor to it. Null while off-screen (shouldn't normally happen
  // since we rotate to center it) or before the marker has a location.
  const zoomedMarkerPos = useMemo(() => {
    if (!zoomedLoc) return null
    if (geoDistance([zoomedLoc.lng, zoomedLoc.lat], center) > Math.PI / 2 - 0.02) return null
    return projection([zoomedLoc.lng, zoomedLoc.lat])
  }, [zoomedLoc, projection, center])

  // Precomputed once per data load (not per frame) — lets the render loop skip
  // running the path generator on countries that are fully back-facing, which
  // is the bulk of the per-frame cost at 60fps.
  const centroids = useMemo(() => geographies.map((g) => geoCentroid(g)), [geographies])
  // Generous buffer past the true 90° horizon so large countries near the limb
  // (whose centroid is just past-back but whose shape still pokes into view)
  // never visibly pop in/out.
  const BACK_FACE_CUTOFF = Math.PI / 2 + Math.PI / 12

  return (
    <div
      ref={wrapRef}
      className={`relative ${className}`}
    >
      {/* soft glow behind the sphere */}
      <div className="pointer-events-none absolute inset-[8%] rounded-full bg-skyward-accent/20 blur-3xl" />

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="relative w-full h-full select-none rounded-[2.5rem] drop-shadow-[0_25px_35px_rgba(36,36,126,0.18)]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="globe-ocean" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#eef3fc" />
            <stop offset="60%" stopColor="#d3ddf4" />
            <stop offset="100%" stopColor="#b7c6ea" />
          </radialGradient>
        </defs>

        {/* ocean sphere */}
        <path d={path({ type: 'Sphere' }) || ''} fill="url(#globe-ocean)" />
        {/* graticule */}
        <path d={path(graticule) || ''} fill="none" stroke="#3a51aa" strokeOpacity={0.08} strokeWidth={0.5} />

        {/* land */}
        {geographies.map((geo, i) => {
          if (geoDistance(centroids[i], center) > BACK_FACE_CUTOFF) return null
          const raw = geo.properties?.name as string | undefined
          const name = raw === 'S. Sudan' ? 'South Sudan' : raw
          const isPartner = name != null && partnerNames.has(name)
          const isActive = name === activeLocationId
          const isAfrica = (raw != null && AFRICA.has(raw)) || isPartner

          let fill = '#cdd8ee' // world land
          if (isAfrica) fill = '#9fb4e4' // Africa highlight
          if (isPartner) fill = '#3a51aa' // partner (brave-primary)
          if (isActive) fill = '#24247e' // active (brave-extra)

          return (
            <path
              key={`c-${i}`}
              d={path(geo) || ''}
              fill={fill}
              stroke="#fbf8fa"
              strokeWidth={0.4}
              className={`transition-[fill] duration-300 ${isPartner ? 'cursor-pointer' : ''}`}
              onMouseDown={() => {
                if (isPartner && name && onLocationClick) onLocationClick(name)
              }}
              onTouchStart={() => {
                if (isPartner && name && onLocationClick) onLocationClick(name)
              }}
            />
          )
        })}

        {/* rim */}
        <path d={path({ type: 'Sphere' }) || ''} fill="none" stroke="#3a51aa" strokeOpacity={0.15} strokeWidth={1} />

        {/* markers (front hemisphere only) */}
        {locations.map((loc) => {
          if (geoDistance([loc.lng, loc.lat], center) > Math.PI / 2 - 0.02) return null
          const p = projection([loc.lng, loc.lat])
          if (!p) return null
          const id = loc.id || loc.label || null
          const isActive = id === activeLocationId
          return (
            <g
              key={id}
              transform={`translate(${p[0]}, ${p[1]})`}
              className="cursor-pointer"
              onMouseDown={() => {
                if (id && onLocationClick) onLocationClick(id)
              }}
              onTouchStart={() => {
                if (id && onLocationClick) onLocationClick(id)
              }}
            >
              {/* invisible large hit area for easier clicking */}
              <circle r={20} fill="transparent" style={{ pointerEvents: 'all' }} />
              {isActive && (
                <circle r={8} fill="#8eebfc" fillOpacity={0.45} className="animate-marker-pulse" />
              )}
              <circle
                r={isActive ? 4.5 : 3}
                fill={isActive ? '#8eebfc' : '#24247e'}
                stroke="#fbf8fa"
                strokeWidth={1.3}
              />
            </g>
          )
        })}

        {/* floating info card for the zoomed/selected country — anchored to
            its marker via foreignObject, so it tracks the same projection
            math as the dot itself (rotation + zoom) for free. Partner org
            name + link only for now; a photo slot can slot in here later. */}
        {zoomedLoc && zoomedMarkerPos && (
          <foreignObject
            x={Math.min(Math.max(zoomedMarkerPos[0] - 64, 4), SIZE - 128)}
            y={Math.max(zoomedMarkerPos[1] - 92, 4)}
            width={128}
            height={68}
          >
            <div
              {...{ xmlns: 'http://www.w3.org/1999/xhtml' }}
              className="relative rounded-[24px] bg-night text-cloud-light shadow-xl px-4 py-3"
            >
              {onCloseZoom && (
                <button
                  type="button"
                  onClick={onCloseZoom}
                  aria-label="Close"
                  className="absolute top-2 right-3 text-cloud-light/50 hover:text-cloud-light text-[11px] leading-none"
                >
                  ×
                </button>
              )}
              <p className="text-[10px] font-semibold pr-3">{zoomedLoc.label}</p>
              {zoomedLoc.orgUrl && (
                <a
                  href={zoomedLoc.orgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 block text-[9px] text-skyward-accent underline decoration-skyward-accent/40"
                >
                  {zoomedLoc.org}
                </a>
              )}
            </div>
          </foreignObject>
        )}
      </svg>

      {/* active-country label — suppressed while the floating card is
          showing the same name, so they don't both appear at once */}
      <div
        className={`pointer-events-none absolute ${labelPosition === 'top' ? 'top-4' : 'bottom-2'} left-1/2 -translate-x-1/2 rounded-xl bg-night px-4 py-2 text-13 font-semibold text-cloud-light shadow-xl transition-all duration-300 ${
          activeLoc && !zoomedLoc ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        {activeLoc?.label}
      </div>
    </div>
  )
}
