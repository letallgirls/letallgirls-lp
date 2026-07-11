'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { geoOrthographic, geoPath, geoGraticule, geoDistance } from 'd3-geo'
import { feature } from 'topojson-client'
import type { FeatureCollection, Geometry } from 'geojson'

export interface MapLocation {
  lat: number
  lng: number
  label?: string
  id?: string
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
}: {
  locations?: MapLocation[]
  activeLocationId?: string | null
}) {
  const [geographies, setGeographies] = useState<any[]>([])
  const [rotation, setRotation] = useState<[number, number]>([-AFRICA_CENTER[0], -AFRICA_CENTER[1]])
  const [hovered, setHovered] = useState(false)
  const reduced = usePrefersReducedMotion()

  const partnerNames = useMemo(() => new Set(locations.map((l) => l.id || l.label)), [locations])
  const activeLoc = useMemo(
    () => locations.find((l) => (l.id || l.label) === activeLocationId) || null,
    [locations, activeLocationId],
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

  // Animation loop: auto-spin when idle, ease to the active country on hover.
  const rot = useRef(rotation)
  rot.current = rotation
  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50)
      last = now
      let [lam, phi] = rot.current

      if (activeLoc) {
        let dl = -activeLoc.lng - lam
        while (dl > 180) dl -= 360
        while (dl < -180) dl += 360
        lam += dl * 0.1
        phi += (-activeLoc.lat - phi) * 0.1
      } else if (hovered || reduced) {
        let dl = -AFRICA_CENTER[0] - lam
        while (dl > 180) dl -= 360
        while (dl < -180) dl += 360
        lam += dl * 0.08
        phi += (-AFRICA_CENTER[1] - phi) * 0.08
      } else {
        lam -= dt * 0.008 // gentle spin ~8°/s
        phi += (-8 - phi) * 0.05
      }

      if (lam > 180) lam -= 360
      else if (lam < -180) lam += 360

      setRotation([lam, phi])
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [activeLoc, reduced, hovered])

  const projection = useMemo(
    () =>
      geoOrthographic()
        .translate([SIZE / 2, SIZE / 2])
        .scale(SIZE / 2 - 6)
        .rotate([rotation[0], rotation[1]])
        .clipAngle(90),
    [rotation],
  )
  const path = useMemo(() => geoPath(projection), [projection])
  const graticule = useMemo(() => geoGraticule().step([20, 20])(), [])
  const center: [number, number] = [-rotation[0], -rotation[1]]

  return (
    <div
      className="relative w-full aspect-square max-w-[30rem] mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* soft glow behind the sphere */}
      <div className="pointer-events-none absolute inset-[8%] rounded-full bg-skyward-accent/20 blur-3xl" />

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="relative w-full h-full select-none drop-shadow-[0_25px_35px_rgba(36,36,126,0.18)]"
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
              className="transition-[fill] duration-300"
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
            <g key={id} transform={`translate(${p[0]}, ${p[1]})`}>
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
      </svg>

      {/* active-country label */}
      <div
        className={`pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-xl bg-night px-4 py-2 text-13 font-semibold text-cloud-light shadow-xl transition-all duration-300 ${
          activeLoc ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        {activeLoc?.label}
      </div>
    </div>
  )
}
