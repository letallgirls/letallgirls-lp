import { useState } from 'react'
import videoPoster from '../../assets/images/video-poster.jpg'
import { Reveal } from '../ui/Reveal'

// Original homepage video (from the old site's "Learn More about LetAllGirls" section)
const VIDEO_ID = 'H3iZdm2MpwU'

function PlayIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 5.14v13.72c0 .86.94 1.39 1.68.95l11.5-6.86a1.1 1.1 0 000-1.9L9.68 4.2A1.1 1.1 0 008 5.14z" fill="currentColor" />
    </svg>
  )
}

export function VideoSection() {
  const [playing, setPlaying] = useState(false)

  return (
    <Reveal className="mx-auto max-w-5xl px-6 md:px-10 pb-16 md:pb-20">
      {/* Bento card container */}
      <div className="rounded-[2rem] md:rounded-[2.5rem] bg-cloud-light p-4 md:p-6">
        <h2 className="text-16 md:text-25 text-night text-center mb-4 md:mb-6 pt-4">
          Learn More about LetAllGirls
        </h2>

        <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] aspect-video bg-night">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="LetAllGirls"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play video: Learn More about LetAllGirls"
              className="group absolute inset-0 h-full w-full"
            >
              <img
                src={videoPoster}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute inset-0 bg-night/30 transition-colors duration-200 group-hover:bg-night/40" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-cloud-light text-brave-primary shadow-2xl transition-transform duration-200 ease-[var(--ease-out-slow)] group-hover:scale-110">
                  <PlayIcon />
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </Reveal>
  )
}
