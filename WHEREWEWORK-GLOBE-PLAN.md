# Plan: "Where We Work" flat map card → 3D-ish globe

> Hand-off spec. Not yet executed.

## Context
`app/src/components/home/WhereWeWorkSection.tsx` renders a partner **list** (left) synced with a **flat `WorldMap`** card (right, `app/src/components/ui/Map.tsx`). Hovering/clicking a partner sets `activeCountry` state, which highlights that country on the map. Four partners with lat/lng already exist in the file:
- South Sudan `{6.877, 31.307}`, South Africa `{-30.56, 22.94}`, Malawi `{-13.25, 34.30}`, Tanzania `{-6.37, 34.89}`.

Goal: replace the flat map **card** with a **3D-ish globe** centered on Africa, with Africa (and especially the 4 partner countries) highlighted, keeping the existing `activeCountry` hover-sync (hovering a partner brightens its marker and rotates it to the front).

Stack: Vite + React 19 + Tailwind v4. Brand: `brave-primary #3a51aa`, `brave-extra #24247e`, `brave-neutral`, `brave-light`, `cloud-light`, `skyward-accent`, `night`. Reuse `Reveal`, `framer-motion`.

## Recommended approach — d3-geo orthographic SVG globe (no WebGL)
Create `app/src/components/ui/Globe.tsx` exporting `<Globe locations={MapLocation[]} activeLocationId={string|null} />` (same prop shape the current `WorldMap` uses, so the section barely changes — swap the `<WorldMap .../>` for `<Globe .../>` in `WhereWeWorkSection.tsx`).

Deps: `d3-geo` (projection/path), `topojson-client` (decode), and a world dataset (`world-atlas` → `countries-110m.json`). All small; no three.js.

Implementation:
- **Projection**: `geoOrthographic()` fitted to the container circle → gives the globe look. Render with `geoPath()` to SVG `<path>`s.
- **Sphere & styling** (the "3d-ish"): a base circle filled with a radial gradient (light `skyward`/`brave-light` → deeper `brave-neutral`) for a lit sphere; a faint `geoGraticule()` grid; a soft outer glow/drop-shadow; optional inner shadow on the rim. Ocean = brand-light tint, land = `brave-neutral/40`.
- **Highlight Africa**: fill all African countries a shade darker/brand-tinted; fill the **4 partner countries** in `brave-primary` (brighter). Filter African countries by the dataset's region/continent property (or a hard-coded ISO list) — Africa-only is fine since the whole section is Africa-focused.
- **Markers**: at each partner lat/lng, a dot (project via the projection; hide when on the back hemisphere using the projection's clip/`geoDistance` test). Active marker = larger + `skyward-accent` ring + pulse (reuse the `.animate-marker-pulse` pattern from `DidiSection.tsx`).
- **Rotation**: auto-rotate slowly via `requestAnimationFrame` updating `projection.rotate([lambda, phi])`. On `activeLocationId` change, **animate rotation** so that country faces front (tween `rotate` to `[-lng, -lat]`). Respect `prefers-reduced-motion` (no auto-spin).
- Center the initial view on Africa (`rotate([-20, -5])`-ish).

## Alternative approaches
- **`cobe`** (~5kb WebGL): easiest, beautiful dotted globe with glowing markers; auto-rotate + spin-to-marker. Downside: cannot fill Africa as a *shape* — only glowing dots at the 4 countries. Pick this if "dots on a globe" is enough.
- **`react-globe.gl`** (three.js + GeoJSON): truest 3D; color Africa's polygons, highlight partners, labels, rotate-to-country. Downside: heavy bundle (~150kb+). Pick if you want the richest 3D and accept the weight.

## Integration
Keep `partners`, `countryCoordinates`, `mapLocations`, and the `activeCountry` state/list exactly as-is. Only swap the right-column card's `<WorldMap>` for `<Globe>`. Keep it inside the existing `Reveal` wrapper; the globe can drop the card chrome (`bg-cloud-light`/border) so it reads as a floating globe rather than a boxed map, or keep a subtle container — designer's call.

## Responsive & perf
- Mobile: smaller globe, auto-rotate only (no drag needed); ensure the canvas/SVG scales to container (`ResizeObserver` like the existing `useNotchClip` pattern).
- Lazy-load the world dataset (dynamic `import()`), show a lightweight placeholder (or the current flat map) until loaded, so it doesn't block first paint.
- Cap the RAF work; pause rotation when off-screen (IntersectionObserver) for battery.

## Verification
`cd app && npm run build && npm run lint` clean. `npm run dev`, screenshot desktop (1280) + mobile (420): globe reads as 3D (shading/glow), Africa highlighted, 4 partner countries brighter with markers, hovering a partner in the list rotates the globe to that country and brightens its marker, back-hemisphere markers hidden, clean mobile scale. Note: scroll-reveal animations look hazy in static headless captures — verify interaction on the live dev server.

## Watch-outs
Keep it on-brand (blues/creams, not a photoreal earth). Hide markers on the far side of the sphere. Debounce rotation tween so rapid hover changes don't jitter. If bundle size matters, prefer the d3-geo SVG route over three.js.
