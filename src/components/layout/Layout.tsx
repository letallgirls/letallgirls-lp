import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

/**
 * React Router doesn't scroll to `#hash` targets on navigation, so nav links
 * like `/#didi` clicked from another page land at the top. This restores the
 * expected behaviour: scroll to the hash element when present, otherwise scroll
 * to the top on a plain page change.
 */
function useScrollBehaviour() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Defer to let the target section mount before we scroll to it.
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      })
      return
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])
}

export function Layout() {
  useScrollBehaviour()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
