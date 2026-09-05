import { BookOpenCheck, Users2, FlaskConical } from 'lucide-react'
import { StatCard, Card, CardHeader, CardBody, Badge } from '../../components/ui'
import { MOCK_ACADEMIC_OPPORTUNITIES } from '../../features/dashboard/academician/opportunities'

export function AcademicianOverviewPage() {
  const openSeats = MOCK_ACADEMIC_OPPORTUNITIES.reduce((sum, o) => sum + o.seats, 0)

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Open opportunities" value={String(MOCK_ACADEMIC_OPPORTUNITIES.length)} icon={BookOpenCheck} tone="teal" />
        <StatCard label="Total seats available" value={String(openSeats)} icon={Users2} tone="gold" />
        <StatCard label="Research partners" value="3 companies" icon={FlaskConical} />
      </div>

      <Card>
        <CardHeader>
          <h3 className="font-display text-base text-ink">Closing soon</h3>
        </CardHeader>
        <CardBody className="divide-y divide-line p-0">
          {MOCK_ACADEMIC_OPPORTUNITIES.slice(0, 3).map((o) => (
            <div key={o.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-medium text-ink">{o.title}</p>
                <p className="text-sm text-ink-faint">{o.partnerCompany} · {o.window}</p>
              </div>
              <Badge tone="teal">{o.type}</Badge>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  )
}
