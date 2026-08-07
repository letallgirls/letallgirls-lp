import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../constants/site'

interface SeoProps {
  /** Full page title (already includes the brand suffix). */
  title: string
  description: string
  /** Route path, e.g. "/our-story". Used for the canonical + og:url. */
  path: string
  /** Optional per-page share image (path or absolute URL). Defaults to the site image. */
  image?: string
  /** Set on pages that shouldn't be indexed (e.g. the 404). */
  noindex?: boolean
}

/**
 * Per-page document metadata. Relies on React 19's native hoisting: the tags
 * rendered here are lifted into <head> automatically. Google renders JS so it
 * sees these; the static index.html carries site-level defaults for non-JS
 * social scrapers.
 */
export function Seo({ title, description, path, image = DEFAULT_OG_IMAGE, noindex }: SeoProps) {
  const url = `${SITE_URL}${path}`
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  )
}
