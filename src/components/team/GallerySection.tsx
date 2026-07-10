import { Reveal } from '../ui/Reveal'
import g1 from '../../assets/images/gallery-1.jpg'
import g3 from '../../assets/images/gallery-3.jpg'
import g4 from '../../assets/images/gallery-4.jpg'
import g5 from '../../assets/images/gallery-5.jpg'
import g6 from '../../assets/images/gallery-6.jpg'

// One large feature tile + four supporting tiles. These spans tile a 4x2 grid
// (and a 2x4 grid on mobile) with no gaps, so the layout stays intentional
// rather than ragged. g1 is the wide group shot, so it leads as the feature.
const tiles = [
  { src: g1, span: 'col-span-2 row-span-2' },
  { src: g3, span: '' },
  { src: g4, span: '' },
  { src: g5, span: '' },
  { src: g6, span: '' },
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
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[10rem] sm:auto-rows-[13rem] gap-3 sm:gap-4">
          {tiles.map((tile, i) => (
            <Reveal key={i} delay={i * 0.05} className={`group ${tile.span}`}>
              <div className="img-grain h-full w-full rounded-2xl overflow-hidden">
                <img
                  src={tile.src}
                  alt="LetAllGirls in the field"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
