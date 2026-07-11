"use client";

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '../ui/Reveal'
import { Globe, type MapLocation } from '../ui/Globe'

const partners = [
  { country: 'South Sudan', devices: '2 deployed', org: 'Eta Power Youth Foundation' },
  { country: 'South Africa', devices: '2 committed · Summer 2026', org: 'Future Horizons' },
  { country: 'Malawi', devices: '2 committed · Summer 2026', org: 'Supportive Pillow Organization' },
  { country: 'Tanzania', devices: '1 committed · Summer 2026', org: "Girls' Foundation of Tanzania" },
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
          <ul className="flex flex-col">
            {partners.map((p, i) => {
              const isActive = activeCountry === p.country;
              return (
                <Reveal as="li" key={p.country} delay={i * 0.08}>
                  <motion.div
                    onHoverStart={() => setActiveCountry(p.country)}
                    onHoverEnd={() => setActiveCountry(null)}
                    onClick={() => setActiveCountry(isActive ? null : p.country)}
                    className={`cursor-pointer py-6 md:py-8 border-b border-brave-primary/10 border-l-2 pl-4 -ml-4 rounded-r-lg transition-all flex items-center justify-between gap-6 group ${i === 0 ? 'border-t' : ''} ${isActive ? 'border-l-brave-primary bg-brave-primary/[0.04]' : 'border-l-transparent'}`}
                  >
                    <div>
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <h3 className={`text-25 font-semibold transition-colors duration-300 ${isActive ? 'text-brave-primary' : 'text-night group-hover:text-brave-primary/80'}`}>
                          {p.country}
                        </h3>
                        <span className={`text-13 text-label font-semibold uppercase tracking-wider px-2 py-1 rounded-full transition-colors duration-300 ${isActive ? 'bg-brave-primary text-white' : 'text-brave-primary bg-brave-light'}`}>
                          {p.devices}
                        </span>
                      </div>
                      <p className="mt-2 text-night/60 font-medium group-hover:text-night/80 transition-colors">
                        with {p.org}
                      </p>
                    </div>
                    
                    <div className="relative flex items-center justify-center size-8">
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
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={0.2} className="relative w-full flex items-center justify-center">
            <Globe locations={mapLocations} activeLocationId={activeCountry} />
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <p className="mt-12 text-night/60 font-medium">
            Additional partners and relationships in{' '}
            <span className="text-night">Pakistan, Bangladesh, Grenada, and Colombia</span> — with
            more reaching out as awareness of DIDI grows.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
