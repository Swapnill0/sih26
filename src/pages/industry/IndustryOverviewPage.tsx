import { Briefcase, Users, TrendingUp } from 'lucide-react'
import { StatCard, Card, CardHeader, CardBody, Badge } from '../../components/ui'
import { MOCK_INTERNSHIPS } from '../../features/internships/data/internships'
import { MOCK_JOBS } from '../../features/placements/data/jobs'

export function IndustryOverviewPage() {
  const totalApplicants = [...MOCK_INTERNSHIPS, ...MOCK_JOBS].reduce((sum, p) => sum + p.applicants, 0)

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Active postings" value={String(MOCK_INTERNSHIPS.length + MOCK_JOBS.length)} icon={Briefcase} tone="teal" />
        <StatCard label="Total applicants" value={totalApplicants.toLocaleString('en-IN')} icon={Users} tone="gold" />
        <StatCard label="Avg. match quality" value="71%" hint="Based on required-skill overlap" icon={TrendingUp} />
      </div>

      <Card>
        <CardHeader>
          <h3 className="font-display text-base text-ink">Your most recent postings</h3>
        </CardHeader>
        <CardBody className="divide-y divide-line p-0">
          {[...MOCK_INTERNSHIPS.slice(0, 2), ...MOCK_JOBS.slice(0, 1)].map((p) => (
            <div key={p.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-medium text-ink">{p.title}</p>
                <p className="text-sm text-ink-faint">{p.location} · Posted {new Date(p.postedOn).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</p>
              </div>
              <Badge tone="gold">{p.applicants} applicants</Badge>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  )
}
