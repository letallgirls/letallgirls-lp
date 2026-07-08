import { Reveal } from '../components/ui/Reveal'

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <Reveal className="mx-auto max-w-3xl px-4 py-32 min-h-[50vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl md:text-4xl text-night mb-4">{title}</h1>
      <p className="text-night/70">Content coming soon.</p>
    </Reveal>
  )
}
