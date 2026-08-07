import { Seo } from '../components/Seo'
import { Reveal } from '../components/ui/Reveal'

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <Reveal className="mx-auto max-w-3xl px-4 py-32 min-h-[50vh] flex flex-col items-center justify-center text-center">
      <Seo
        title={`${title} | LetAllGirls`}
        description="The page you're looking for isn't here. Head back to LetAllGirls to explore our offline AI education work."
        path="/404"
        noindex
      />
      <h1 className="text-3xl md:text-4xl text-night mb-4">{title}</h1>
      <p className="text-night/70">Content coming soon.</p>
    </Reveal>
  )
}
