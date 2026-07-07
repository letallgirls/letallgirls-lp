export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gradient-blue text-blue-fg">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm opacity-75">
        <small>
          &copy; {year}, <a href="/" className="hover:underline">LetAllGirls</a>
        </small>
      </div>
    </footer>
  )
}
