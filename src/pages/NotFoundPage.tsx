import { Link } from 'react-router-dom'
import { Button } from '../components/ui'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <p className="font-display text-5xl text-ink">404</p>
      <p className="mt-3 text-ink-soft">This page doesn't exist, or you don't have access to it.</p>
      <Link to="/" className="mt-6">
        <Button variant="secondary">Back to home</Button>
      </Link>
    </div>
  )
}
