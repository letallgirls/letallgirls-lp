"use client";

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '../ui/Reveal'
import { Globe, type MapLocation } from '../ui/Globe'
import {
  EDU_POWER_YOUTH_FOUNDATION_URL,
  HORIZON_INTERNATIONAL_URL,
  SUPPORTIVE_PILLAR_ORGANISATION_URL,
  GIRLS_FOUNDATION_OF_TANZANIA_URL,
  EXTERNAL_LINK_PROPS,
} from '../../constants/links'

const partners = [
  { country: 'South Sudan', devices: '2 deployed', org: 'Edu Power Youth Foundation', orgUrl: EDU_POWER_YOUTH_FOUNDATION_URL },
  { country: 'South Africa', devices: '2 committed · Summer 2026', org: 'Horizon International', orgUrl: HORIZON_INTERNATIONAL_URL },
  { country: 'Malawi', devices: '2 committed · Summer 2026', org: 'Supportive Pillar Organisation', orgUrl: SUPPORTIVE_PILLAR_ORGANISATION_URL },
  { country: 'Tanzania', devices: '1 committed · Summer 2026', org: 'The Girls Foundation of Tanzania', orgUrl: GIRLS_FOUNDATION_OF_TANZANIA_URL },
]

const countryCoordinates: Record<string, { lat: number; lng: number }> = {
  'South Sudan': { lat: 6.877, lng: 31.307 },
  'South Africa': { lat: -30.5595, lng: 22.9375 },
  'Malawi': { lat: -13.2543, lng: 34.3015 },
  'Tanzania': { lat: -6.369, lng: 34.8888 },
}

const mapLocations: MapLocation[] = partners.map(p => ({
  id: p.country,
  label: p.country,
  lat: countryCoordinates[p.country]?.lat || 0,
  lng: countryCoordinates[p.country]?.lng || 0,
}))

export function WhereWeWorkSection() {
  const [activeCountry, setActiveCountry] = useState<string | null>(null)

  return (
    <section id="where-we-work" className="py-32 px-6 bg-brave-light border-y border-brave-primary/10">
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-3xl mb-16">
          <span className="text-13 text-label font-semibold text-brave-primary uppercase tracking-widest">
            Where We Work
          </span>
          <h2 className="text-39 md:text-49 font-semibold mt-4 leading-[1.1] tracking-tight">
            A growing network of schools and community partners.
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          {/* Partner list — mobile reuses the EdgeAiSection-style hairline 2x2 grid
              (dividers + left accent bar on hover), desktop is four full-width
              stacked rows (dividers + hover tint + a hover-nudge arrow). */}
          <Reveal delay={0.1}>
            <ul className="grid grid-cols-2 md:grid-cols-1">
              {partners.map((p, i) => {
                const isActive = activeCountry === p.country;
                return (
                  <li key={p.country}>
                    <motion.div
                      onHoverStart={() => setActiveCountry(p.country)}
                      onHoverEnd={() => setActiveCountry(null)}
                      onClick={() => setActiveCountry(isActive ? null : p.country)}
                      className={`group relative h-full cursor-pointer p-5 md:-mx-4 md:px-4 md:py-6 border-brave-primary/10 transition-colors flex md:items-center md:justify-between gap-3 ${
                        i % 2 === 0 ? 'border-r' : ''
                      } ${i < partners.length - 2 ? 'border-b' : ''} md:border-0 md:border-t ${
                        i === partners.length - 1 ? 'md:border-b' : ''
                      } ${isActive ? 'md:bg-brave-primary/[0.06]' : ''}`}
                    >
                      {/* mobile-only left accent bar, matching EdgeAiSection's principle cards */}
                      <span
                        className={`md:hidden absolute left-0 top-0 bottom-0 w-0.5 origin-center bg-brave-primary transition-transform duration-300 ${
                          isActive ? 'scale-y-100' : 'scale-y-0'
                        }`}
                      />

                      <div>
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <h3 className={`text-16 md:text-25 font-semibold transition-colors duration-300 ${isActive ? 'text-brave-primary' : 'text-night group-hover:text-brave-primary/80'}`}>
                            {p.country}
                          </h3>
                          <span className="text-13 text-label font-semibold uppercase tracking-wider text-brave-primary/80">
                            {p.devices}
                          </span>
                        </div>
                        <p className="mt-1 text-13 md:text-16 text-night/60 group-hover:text-night/80 transition-colors">
                          with{' '}
                          <a
                            href={p.orgUrl}
                            {...EXTERNAL_LINK_PROPS}
                            onClick={(e) => e.stopPropagation()}
                            className="underline decoration-night/20 hover:decoration-current transition-colors"
                          >
                            {p.org}
                          </a>
                        </p>
                      </div>

                      <div className="hidden md:flex relative items-center justify-center size-8 shrink-0">
                        <svg
                          className={`absolute inset-0 size-6 text-brave-primary shrink-0 transition-transform duration-300 ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1 opacity-50 group-hover:opacity-100'}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="relative w-full flex items-center justify-center">
            <Globe locations={mapLocations} activeLocationId={activeCountry} />
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <p className="mt-12 text-night/60 font-medium">
            Additional partners and relationships in{' '}
            <span className="text-night">Pakistan, Bangladesh, Grenada, and Colombia.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
