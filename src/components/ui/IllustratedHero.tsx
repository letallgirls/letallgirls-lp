import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface IllustratedHeroProps {
  eyebrow: string
  headline: ReactNode
  body: ReactNode
  media: ReactNode
  caption?: string
  captionAlign?: 'left' | 'right'
  ctas: ReactNode
}

export function IllustratedHero({
  eyebrow,
  headline,
  body,
  media,
  caption,
  captionAlign = 'left',
  ctas,
}: IllustratedHeroProps) {
  return (
    <section className="relative pt-20 pb-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
        <div className="lg:col-span-7">
          <Reveal as="p" direction="right" delay={0} className="text-13 text-label font-semibold text-brave-primary uppercase tracking-[0.25em]">
            {eyebrow}
          </Reveal>
          <Reveal direction="right" distance={40} delay={0.1} className="mt-5">
            <h1 className="text-39 md:text-61 font-semibold leading-[1.05] tracking-tight text-night">
              {headline}
            </h1>
          </Reveal>
          <div className="mt-8 space-y-5 text-16 text-night/75 leading-[1.55] font-medium max-w-2xl">
            {body}
          </div>
          <Reveal direction="up" distance={16} delay={0.6} className="mt-10 flex flex-wrap gap-4">
            {ctas}
          </Reveal>
        </div>

        <Reveal
          as="figure"
          direction="left"
          distance={48}
          duration={1.1}
          delay={0.25}
          className="lg:col-span-5 relative mx-auto w-full max-w-md"
        >
          {media}
          {caption && (
            <figcaption
              className={`mt-4 text-13 text-label uppercase tracking-[0.28em] text-night/55 font-medium ${
                captionAlign === 'right'
                  ? 'text-right pr-2 border-r border-night/30'
                  : 'pl-2 border-l border-night/30'
              }`}
            >
              {caption}
            </figcaption>
          )}
        </Reveal>
      </div>
    </section>
  )
}
