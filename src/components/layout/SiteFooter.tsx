import { DakshMark } from './SiteHeader'

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-4 py-8 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <DakshMark size={16} />
          <span>Daksh — Academia–Industry Collaboration Portal</span>
        </div>
        <p>Built for a campus placement &amp; skilling hackathon.</p>
      </div>
    </footer>
  )
}
