import { useState, useEffect } from 'react'
import { BadgeCheck, FileClock } from 'lucide-react'
import { Card, CardBody, Badge, Button } from '../../components/ui'
import { api } from '../../lib/api'
import { useAuthStore } from '../../store/authStore'
import type { PortfolioItem } from '../../types/domain'

export function PortfolioPage() {
  const user = useAuthStore((s) => s.user)
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.id) {
      api.fetchPortfolio(user.id).then(data => {
        setPortfolio(data)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [user?.id])

  if (loading) return <div className="p-8 text-ink-faint">Loading portfolio...</div>

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="max-w-prose text-ink-soft">
          Certifications, projects, internships, and achievements in one verified record recruiters can trust.
        </p>
        <Button size="sm">Add item</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {portfolio.map((item) => (
          <Card key={item.id}>
            <CardBody className="flex items-start justify-between gap-3">
              <div>
                <Badge tone="neutral" className="mb-2">{item.type}</Badge>
                <h3 className="font-display text-lg text-ink">{item.title}</h3>
                <p className="mt-1 text-sm text-ink-faint">{item.issuer} · {new Date(item.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</p>
              </div>
              {item.verified ? (
                <span className="flex items-center gap-1 text-xs font-medium text-teal-600">
                  <BadgeCheck size={16} /> Verified
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-medium text-ink-faint">
                  <FileClock size={16} /> Pending
                </span>
              )}
            </CardBody>
          </Card>
        ))}
        {portfolio.length === 0 && (
          <div className="col-span-full py-8 text-center text-ink-faint">
            No portfolio items found.
          </div>
        )}
      </div>
    </div>
  )
}
