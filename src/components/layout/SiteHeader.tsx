import { Link } from 'react-router-dom'
import { Button } from '../ui'

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <DakshMark />
          <span className="font-display text-lg text-ink">Daksh</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-ink-soft sm:flex">
          <a href="/#pillars" className="hover:text-ink">Platform</a>
          <a href="/#roles" className="hover:text-ink">Who it's for</a>
          <a href="/#pathway" className="hover:text-ink">How it works</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to="/login">
            <Button variant="primary" size="sm">Get started</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export function DakshMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 16c2-4 5-6 9-6s7 2 9 6" stroke="#1B6F63" strokeWidth="2" strokeLinecap="round" />
      <circle cx="3.5" cy="17" r="1.6" fill="#D89B3C" />
      <circle cx="20.5" cy="17" r="1.6" fill="#D89B3C" />
    </svg>
  )
}
