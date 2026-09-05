import { useState } from 'react'
import { Card, CardBody, Badge, Button } from '../../components/ui'
import { MOCK_ACADEMIC_OPPORTUNITIES } from '../../features/dashboard/academician/opportunities'
import type { AcademicOpportunity } from '../../types/domain'
import { cn } from '../../lib/cn'

const TYPES: (AcademicOpportunity['type'] | 'All')[] = [
  'All',
  'Faculty Development Program',
  'Industrial Training',
  'Consultancy',
  'Collaborative Research',
]

export function OpportunitiesPage() {
  const [filter, setFilter] = useState<(typeof TYPES)[number]>('All')
  const [expressed, setExpressed] = useState<Set<string>>(new Set())

  const opportunities =
    filter === 'All' ? MOCK_ACADEMIC_OPPORTUNITIES : MOCK_ACADEMIC_OPPORTUNITIES.filter((o) => o.type === filter)

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm transition-colors',
              filter === t ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-line-strong text-ink-soft hover:border-ink',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {opportunities.map((o) => {
          const isExpressed = expressed.has(o.id)
          return (
            <Card key={o.id}>
              <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg text-ink">{o.title}</h3>
                    <Badge tone="gold">{o.type}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-ink-faint">{o.partnerCompany} · {o.window} · {o.seats} seats</p>
                  <p className="mt-2 max-w-prose text-sm text-ink-soft">{o.description}</p>
                </div>
                <Button
                  variant={isExpressed ? 'secondary' : 'primary'}
                  size="sm"
                  className="shrink-0"
                  disabled={isExpressed}
                  onClick={() => setExpressed((prev) => new Set(prev).add(o.id))}
                >
                  {isExpressed ? 'Interest sent' : 'Express interest'}
                </Button>
              </CardBody>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
