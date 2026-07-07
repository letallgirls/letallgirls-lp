import { useState } from 'react'
import videoPoster from '../../assets/images/video-poster.jpg'
import { Reveal } from '../ui/Reveal'

const YOUTUBE_ID = 'H3iZdm2MpwU'

export function VideoSection() {
  const [playing, setPlaying] = useState(false)

  return (
    <Reveal className="mx-auto max-w-[130rem] px-6 md:px-10 lg:px-28 py-16">
      <h2 className="text-3xl md:text-4xl text-scheme1-fg text-center mb-6">
        Learn More about LetAllGirls:
      </h2>
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
        {playing ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1`}
            title="Learn More about LetAllGirls"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full group"
            aria-label="Load video"
          >
            <img
              src={videoPoster}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <span className="flex items-center justify-center h-16 w-16 rounded-full bg-white/90 group-hover:bg-white transition-colors">
                <svg width="20" height="24" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.48177 0.814643C0.81532 0.448245 0 0.930414 0 1.69094V12.2081C0 12.991 0.858787 13.4702 1.52503 13.0592L10.5398 7.49813C11.1918 7.09588 11.1679 6.13985 10.4965 5.77075L1.48177 0.814643Z"
                    fill="#2850AA"
                  />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
    </Reveal>
  )
}
