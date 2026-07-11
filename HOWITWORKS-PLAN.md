# Plan: "How it works, in three steps" → tilted polaroids + curved connector

> Hand-off spec for refactoring the steps block. Not yet executed.

## Context
In `app/src/components/home/DidiSection.tsx`, the section renders an intro, a DIDI device diagram, and — at the bottom — a "How it works, in three steps" block. Replace **only** that steps block (currently a `md:grid-cols-3` of numbered dots on a straight `h-[2px]` line). Keep the `steps` data array and the section heading.

Stack: Vite + React 19 + Tailwind v4. Brand tokens: `brave-primary`, `brave-extra`, `cloud-light`, `night`, `blossom-*`, `skyward-*`; custom text scale `text-13/16/20/25/31`; `.text-label` utility. Reuse `Reveal` (`app/src/components/ui/Reveal.tsx`), `framer-motion` (installed), and the `.img-grain` utility (`app/src/index.css`).

Steps (keep verbatim):
- **01** "Set up in a classroom or library." / "Just press the power button."
- **02** "Connect any device." / "DIDI broadcasts a local WiFi network. Students connect with whatever phone, tablet, or laptop they already have."
- **03** "Learn." / "Students explore dozens of curated resources or ask DIDI's AI a question directly."

## Design
- **Polaroid card per step**: white (`bg-cloud-light`) frame, soft drop-shadow; photo on top (`aspect-[4/5]` or `4/3`, `object-cover`, optional `.img-grain`); a **thicker bottom chin** holding a short handwritten-feel caption (the step title) + the step number (`01`). Give each card a **slight alternating rotation** (e.g. `-2.5°`, `+1.5°`, `-1°`); straighten to `0°` on hover. Optional subtle "tape"/pin accent at top (small `blossom`/`brave` rounded rect).
- **Curved connector**: an absolutely-positioned SVG overlay **behind** the cards spanning the row, drawing a gentle cubic-bezier wave that passes each card, with a dot where it meets each polaroid. Stroke `brave-primary` low-opacity `~2px`, optionally dashed. Animate drawing in on scroll (`motion.path`/`motion.line` `pathLength` 0→1) — mirror the callout-line pattern already in `DidiSection.tsx` (`whileInView`, `viewport={{ once:true, margin:'-100px' }}`).
- **Layout**: desktop `md:grid-cols-3` with the SVG curve overlaid; cards above the curve (`z`). Alternate a vertical offset per card (`md:mt-8` on the middle one) so they ride the wave.

## Responsive
Mobile (`< md`): stack polaroids vertically, centered, reduced/zeroed rotation; replace the horizontal curve with a simple vertical dashed connector or omit it. Do **not** render the horizontal bezier on a vertical stack.

## Assets
Copy 3 real photos from `landing-page-resource/**/_files/` into `app/src/assets/images/` (rename on copy), one per step:
- **Set up** → DIDI device / classroom: `DIDI-Device-Page/…/A_BANNER_FOR_WEBSITE.png` or `DIDI_Tanzania_*.png`.
- **Connect** → students on a tablet: `More-Page/…/WhatsApp_Image_2024-11-12_*.jpg`, or reuse existing `app/src/assets/images/impact-students.jpg`.
- **Learn** → classroom scene: a `gallery-*.jpg` already in the app, or a natural `Homepage/…` shot (avoid `South_Sudan_students.png` — it has a baked-in navy tint).

## Verification
`cd app && npm run build && npm run lint` clean. `npm run dev`, screenshot desktop (1280) + mobile (420): three tilted polaroids, a curved connector that draws in on scroll and links all three, readable captions, correct photos, clean vertical mobile stack. Note: this repo's scroll-reveal animations look hazy in static headless captures — verify timing on the live dev server.

## Watch-outs
Keep rotation ≤ ~3° and the curve shallow — over-tilting + heavy dashes reads gimmicky. SVG curve sits **behind** the cards; its dots align to the polaroid edges. Captions use the brand type scale (Raleway); a "handwritten" look is optional and, if used, must be a real bundled/system font, not a broken web font.
