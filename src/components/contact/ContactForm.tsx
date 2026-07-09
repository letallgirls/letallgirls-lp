import { useState, type FormEvent } from 'react'

const TOPICS = [
  'General inquiry',
  'Donate / Sponsor a device',
  'Donate computers',
  'Corporate sponsorship',
  'Become a partner',
]

const FIELD_CLASS =
  'w-full rounded-xl border border-brave-primary/20 bg-cloud-light px-4 py-3 text-16 text-night placeholder:text-night/40 focus:outline-none focus:border-brave-primary focus:ring-2 focus:ring-brave-primary/20 transition-colors'
const LABEL_CLASS = 'block text-13 text-label font-semibold text-night/70 mb-2'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    topic: TOPICS[0],
    message: '',
  })

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    // TODO: wire up to a real endpoint (Formspree, a serverless function, or an
    // email service). For now this only shows a local confirmation.
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="h-full rounded-3xl bg-brave-light border border-brave-primary/10 p-10 flex flex-col items-start justify-center">
        <div className="size-12 rounded-full bg-brave-primary/10 flex items-center justify-center mb-5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-6 text-brave-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-25 font-semibold">Thanks — message received.</h3>
        <p className="mt-3 text-night/60 font-medium leading-[1.5] max-w-md">
          We'll get back to you at <span className="text-night">{form.email || 'your email'}</span> as
          soon as we can. In the meantime, feel free to explore how DIDI works.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-13 text-label font-semibold text-brave-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-cloud-light border border-brave-primary/10 p-6 md:p-10">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={LABEL_CLASS}>
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Your name"
            className={FIELD_CLASS}
          />
        </div>
        <div>
          <label htmlFor="email" className={LABEL_CLASS}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@example.com"
            className={FIELD_CLASS}
          />
        </div>
      </div>

      <div className="mt-5 grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="organization" className={LABEL_CLASS}>
            Organization <span className="text-night/40 font-normal">(optional)</span>
          </label>
          <input
            id="organization"
            type="text"
            value={form.organization}
            onChange={(e) => update('organization', e.target.value)}
            placeholder="School, company, or foundation"
            className={FIELD_CLASS}
          />
        </div>
        <div>
          <label htmlFor="topic" className={LABEL_CLASS}>
            What's this about?
          </label>
          <select
            id="topic"
            value={form.topic}
            onChange={(e) => update('topic', e.target.value)}
            className={FIELD_CLASS}
          >
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={LABEL_CLASS}>
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Tell us a little about what you have in mind…"
          className={`${FIELD_CLASS} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-brave-primary text-cloud-light px-8 py-3.5 font-semibold hover:bg-brave-extra transition-colors"
      >
        Send message
      </button>
    </form>
  )
}
