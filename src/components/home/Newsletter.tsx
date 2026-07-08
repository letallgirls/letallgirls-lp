import { useState, type FormEvent } from 'react'
import { Reveal } from '../ui/Reveal'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: wire up to real subscribe endpoint once form backend is decided
    setSubmitted(true)
  }

  return (
    <section className="bg-gradient-brand text-cloud-light">
      <Reveal className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h2 className="text-16 md:text-25 mb-3">Stay Updated</h2>
        <p className="text-16 opacity-90 mb-6">Join our email list to stay in the loop &amp; more.</p>

        {submitted ? (
          <p className="font-medium">Thanks for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-[10px] bg-white/15 border border-white/40 pl-5 pr-16 py-4 text-cloud-light placeholder:text-cloud-light/70 focus:outline-none focus:border-white/80 transition-colors"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="absolute right-0 top-0 h-full w-16 flex items-center justify-center text-cloud-light hover:opacity-70 transition-opacity"
            >
              <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </form>
        )}
      </Reveal>
    </section>
  )
}
