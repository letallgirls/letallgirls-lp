import { Link } from 'react-router-dom'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brave-extra text-cloud-light">
      <div className="mx-auto max-w-6xl px-4 py-10 text-center">
        <small className="text-sm opacity-75">
          &copy; {year}, <Link to="/" className="hover:underline">LetAllGirls</Link> — a registered 501(c)(3) nonprofit
        </small>
      </div>
    </footer>
  )
}
