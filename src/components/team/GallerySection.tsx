import { motion } from 'framer-motion'
import { Reveal } from '../ui/Reveal'

// Placeholder tiles until real field photography is supplied. The `.img-grain`
// utility lays the brand's pixely grain ON the image area only (per brand guide
// + stakeholder feedback), rather than on section chrome. Swap the gradient
// placeholder for an <img> later and keep the `img-grain` wrapper.
const tiles = [
  { caption: 'Classroom in South Sudan', span: 'sm:col-span-2 sm:row-span-2' },
  { caption: 'Students with DIDI' },
  { caption: 'On the ground' },
  { caption: 'Teacher training' },
  { caption: 'Deployment day' },
]

export function GallerySection() {
  return (
    <section id="gallery" className="py-24 px-6 bg-brave-light border-t border-brave-primary/10">
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-3xl mb-12">
          <span className="text-13 text-label font-semibold text-brave-primary uppercase tracking-widest">
            Gallery
          </span>
          <h2 className="text-31 md:text-39 font-semibold mt-4 leading-[1.1] tracking-tight">
            Moments from the field.
          </h2>
          <p className="mt-3 text-lg text-night/60 font-medium">
            Photography coming soon — placeholders shown below.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[10rem] sm:auto-rows-[12rem] gap-4">
          {tiles.map((tile, i) => (
            <Reveal
              key={tile.caption}
              delay={i * 0.06}
              className={tile.span ?? ''}
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="img-grain h-full w-full rounded-2xl overflow-hidden border border-brave-primary/10 bg-gradient-to-br from-brave-neutral/40 to-harmonica-accent/40 flex items-end p-4"
              >
                <span className="relative z-10 text-13 text-label font-semibold text-cloud-light drop-shadow">
                  {tile.caption}
                </span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
