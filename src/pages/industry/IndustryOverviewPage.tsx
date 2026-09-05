import { useState, useEffect } from 'react'
import { Briefcase, Users, TrendingUp } from 'lucide-react'
import { StatCard, Card, CardHeader, CardBody, Badge } from '../../components/ui'
import { api } from '../../lib/api'
import type { Internship, JobOpening } from '../../types/domain'

export function IndustryOverviewPage() {
  const [postings, setPostings] = useState<(Internship | JobOpening)[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api.fetchInternships(), api.fetchJobs()]).then(([internshipsData, jobsData]) => {
      setPostings([...internshipsData, ...jobsData])
      setLoading(false)
    })
  }, [])

  const totalApplicants = postings.reduce((sum, p) => sum + p.applicants, 0)

  if (loading) return <div className="p-8 text-ink-faint">Loading overview...</div>

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Active postings" value={String(postings.length)} icon={Briefcase} tone="teal" />
        <StatCard label="Total applicants" value={totalApplicants.toLocaleString('en-IN')} icon={Users} tone="gold" />
        <StatCard label="Avg. match quality" value="71%" hint="Based on required-skill overlap" icon={TrendingUp} />
      </div>

      <Card>
        <CardHeader>
          <h3 className="font-display text-base text-ink">Your most recent postings</h3>
        </CardHeader>
        <CardBody className="divide-y divide-line p-0">
          {postings.slice(0, 3).map((p) => (
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
