import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import heroPhoto from '../../assets/images/impact-students.jpg'

/* ------------------------------------------------------------------ */
/*  Inline glyph                                                       */
/* ------------------------------------------------------------------ */

/** Small circular-outlined education glyph, Klim-style. */
function EduGlyph() {
  return (
    <span className="inline-flex items-center justify-center align-middle size-[0.82em] rounded-full border-[0.06em] border-cloud-light mx-[0.15em] translate-y-[-0.05em]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="size-[0.5em]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l9-5-9-5-9 5 9 5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l6.16-3.422A12.083 12.083 0 0121 12.5c0 3-3.5 5.5-9 5.5s-9-2.5-9-5.5c0-.538.214-1.062.6-1.555L12 14z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 9v6" />
      </svg>
    </span>
  )
}

const CAPTION =
  'Every gift — a dollar, a device, or a partnership — reaches a real classroom.'

/* ------------------------------------------------------------------ */
/*  clip-path notch system                                             */
/* ------------------------------------------------------------------ */

/** Round to 2 dp so the path string stays tidy. */
const f = (v: number) => Math.round(v * 100) / 100

/**
 * Build a CSS `path()` value that describes a rounded rectangle with
 * optional concave-corner notches bitten from the top-right and/or
 * bottom-left corners.  Every transition — card corners AND notch
 * corners — is smoothly rounded via SVG arc commands.
 */
function buildNotchPath(
  W: number,
  H: number,
  cr: number, // card corner radius  (px)
  r: number, // notch corner radius (px)
  tr?: { w: number; h: number },
  bl?: { w: number; h: number },
  tl?: { w: number; h: number },
): string {
  const d: string[] = []

  if (tl) {
    /* ---- TL notch: start on left edge below the notch ---- */
    d.push(`M 0 ${f(tl.h + r)}`)
    d.push(`A ${f(r)} ${f(r)} 0 0 1 ${f(r)} ${f(tl.h)}`) // outer convex
    d.push(`L ${f(tl.w - r)} ${f(tl.h)}`) // notch bottom
    d.push(`A ${f(r)} ${f(r)} 0 0 0 ${f(tl.w)} ${f(tl.h - r)}`) // inner concave
    d.push(`L ${f(tl.w)} ${f(r)}`) // notch right wall
    d.push(`A ${f(r)} ${f(r)} 0 0 1 ${f(tl.w + r)} 0`) // outer convex
  } else {
    /* ---- normal top-left corner ---- */
    d.push(`M 0 ${f(cr)}`)
    d.push(`A ${f(cr)} ${f(cr)} 0 0 1 ${f(cr)} 0`)
  }

  if (tr) {
    /* ---- top edge → TR notch ---- */
    d.push(`L ${f(W - tr.w - r)} 0`)
    d.push(`A ${f(r)} ${f(r)} 0 0 1 ${f(W - tr.w)} ${f(r)}`) // outer convex
    d.push(`L ${f(W - tr.w)} ${f(tr.h - r)}`) // notch left wall
    d.push(`A ${f(r)} ${f(r)} 0 0 0 ${f(W - tr.w + r)} ${f(tr.h)}`) // inner concave
    d.push(`L ${f(W - r)} ${f(tr.h)}`) // notch bottom
    d.push(`A ${f(r)} ${f(r)} 0 0 1 ${f(W)} ${f(tr.h + r)}`) // outer convex
  } else {
    /* ---- normal top-right corner ---- */
    d.push(`L ${f(W - cr)} 0`)
    d.push(`A ${f(cr)} ${f(cr)} 0 0 1 ${f(W)} ${f(cr)}`)
  }

  if (bl) {
    /* ---- right edge → bottom-right corner → BL notch ---- */
    d.push(`L ${f(W)} ${f(H - cr)}`)
    d.push(`A ${f(cr)} ${f(cr)} 0 0 1 ${f(W - cr)} ${f(H)}`)
    d.push(`L ${f(bl.w + r)} ${f(H)}`)
    d.push(`A ${f(r)} ${f(r)} 0 0 1 ${f(bl.w)} ${f(H - r)}`) // outer convex
    d.push(`L ${f(bl.w)} ${f(H - bl.h + r)}`) // notch right wall
    d.push(`A ${f(r)} ${f(r)} 0 0 0 ${f(bl.w - r)} ${f(H - bl.h)}`) // inner concave
    d.push(`L ${f(r)} ${f(H - bl.h)}`) // notch top
    d.push(`A ${f(r)} ${f(r)} 0 0 1 0 ${f(H - bl.h - r)}`) // outer convex
  } else {
    /* ---- right edge → bottom-right → bottom → bottom-left ---- */
    d.push(`L ${f(W)} ${f(H - cr)}`)
    d.push(`A ${f(cr)} ${f(cr)} 0 0 1 ${f(W - cr)} ${f(H)}`)
    d.push(`L ${f(cr)} ${f(H)}`)
    d.push(`A ${f(cr)} ${f(cr)} 0 0 1 0 ${f(H - cr)}`)
  }

  d.push('Z')
  return `path('${d.join(' ')}')`
}

/**
 * Measures an element via ResizeObserver and returns a reactive
 * `clipPath` style that carves rounded notches out of it.
 * On mobile (< 768 px) the clip is removed so Tailwind's
 * `rounded-[…]` handles the corners.
 */
function useNotchClip(config: {
  tr?: { wRem: number; hRem: number }
  bl?: { wRem: number; hRem: number }
  tl?: { wRem: number; hRem: number }
  crRem?: number
  rRem?: number
}) {
  const { tr, bl, tl, crRem = 2.5, rRem = 1.5 } = config
  const ref = useRef<HTMLDivElement>(null)
  const [cp, setCp] = useState<string>()

  // Flatten object deps so the effect doesn't re-fire on every render.
  const trW = tr?.wRem,
    trH = tr?.hRem
  const blW = bl?.wRem,
    blH = bl?.hRem
  const tlW = tl?.wRem,
    tlH = tl?.hRem

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function update() {
      if (window.innerWidth < 768) {
        setCp(undefined)
        return
      }
      const { width: W, height: H } = el!.getBoundingClientRect()
      const fs = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      )
      const cr = crRem * fs
      const r = rRem * fs
      const trPx =
        trW != null && trH != null
          ? { w: trW * fs, h: trH * fs }
          : undefined
      const blPx =
        blW != null && blH != null
          ? { w: blW * fs, h: blH * fs }
          : undefined
      const tlPx =
        tlW != null && tlH != null
          ? { w: tlW * fs, h: tlH * fs }
          : undefined
      setCp(buildNotchPath(W, H, cr, r, trPx, blPx, tlPx))
    }

    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [trW, trH, blW, blH, tlW, tlH, crRem, rRem])

  return { ref, style: cp ? ({ clipPath: cp } as React.CSSProperties) : {} }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function HelpHero() {
  const topClip = useNotchClip({
    tl: { wRem: 15, hRem: 5 },
  })

  const bottomClip = useNotchClip({
    tr: { wRem: 26, hRem: 7 },
    bl: { wRem: 13, hRem: 6 },
  })

  return (
    <section className="px-4 md:px-6 pt-6 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* "HOW TO HELP" label floating in the TL notch blank space */}
          <div className="hidden md:flex absolute top-0 left-0 w-[15rem] h-[5rem] items-center justify-center">
            <p className="text-13 text-label font-semibold uppercase tracking-[0.25em] text-night/50">
              How to Help
            </p>
          </div>

          <motion.div
            ref={topClip.ref}
            style={topClip.style}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brave-extra text-cloud-light rounded-[1.75rem] md:rounded-[2.5rem] px-6 md:px-12 py-10 md:py-12 md:min-h-[20rem] flex items-end"
          >
            {/* Mobile-only label (inside the card since there's no notch on mobile) */}
            <p className="md:hidden text-13 text-label font-semibold uppercase tracking-[0.25em] text-cloud-light/70 mb-4">
              How to Help
            </p>
            <h1 className="mt-0 text-31 md:text-49 font-semibold leading-[1.05] tracking-tight text-cloud-light max-w-3xl">
              Turn your support <EduGlyph />{' '}
              <br className="hidden md:block" />
              into a real classroom.
            </h1>
          </motion.div>
        </div>


        {/* ── Bottom card ── */}
        <div className="relative mt-4 md:mt-5">
          <motion.div
            ref={bottomClip.ref}
            style={bottomClip.style}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="img-grain rounded-[1.75rem] md:rounded-[2.5rem] overflow-hidden"
          >
            <img
              src={heroPhoto}
              alt="Students learning together on a tablet connected to DIDI"
              className="w-full h-56 md:h-[24rem] object-cover object-[center_35%]"
              fetchPriority="high"
            />
          </motion.div>

          {/* Caption in the transparent top-right pocket (desktop) */}
          <div className="hidden md:flex absolute top-0 right-0 w-[26rem] h-[7rem] items-center pl-8 pr-6">
            <p className="text-16 text-night/70 leading-[1.5] font-medium">
              {CAPTION}
            </p>
          </div>

          {/* Caption below the photo (mobile) */}
          <p className="md:hidden mt-4 text-16 text-night/70 leading-[1.55] font-medium">
            {CAPTION}
          </p>
        </div>
      </div>
    </section>
  )
}
