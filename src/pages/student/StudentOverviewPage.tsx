import { Link } from 'react-router-dom'
import { ClipboardList, Briefcase, FolderGit2, ArrowRight } from 'lucide-react'
import { StatCard, Card, CardHeader, CardBody, Badge, Button } from '../../components/ui'
import { useSkillProfileStore } from '../../store/skillProfileStore'
import { MOCK_INTERNSHIPS, computeMatchScore } from '../../features/internships/data/internships'
import { MOCK_PORTFOLIO } from '../../features/portfolio/data/portfolio'

export function StudentOverviewPage() {
  const profile = useSkillProfileStore((s) => s.profile)
  const strong = profile?.scores.filter((s) => s.score >= 65).map((s) => s.skill) ?? []

  const recommended = [...MOCK_INTERNSHIPS]
    .map((i) => ({ ...i, matchScore: computeMatchScore(i.requiredSkills, strong) }))
    .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
    .slice(0, 3)

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Skill profile"
          value={profile ? `${profile.scores.length} skills mapped` : 'Not started'}
          hint={profile ? `${profile.gaps.length} gaps identified` : 'Takes about 3 minutes'}
          icon={ClipboardList}
          tone="teal"
        />
        <StatCard label="Open matches" value={String(MOCK_INTERNSHIPS.length)} hint="Internships posted this week" icon={Briefcase} tone="gold" />
        <StatCard label="Portfolio items" value={String(MOCK_PORTFOLIO.length)} hint={`${MOCK_PORTFOLIO.filter((p) => p.verified).length} verified`} icon={FolderGit2} />
      </div>

      {!profile && (
        <Card className="border-teal-100 bg-teal-50/50">
          <CardBody className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-display text-lg text-ink">Start with your skill assessment</h3>
              <p className="mt-1 text-sm text-ink-soft">Everything else — matches, recommendations — gets sharper once we know your skill profile.</p>
            </div>
            <Link to="/app/student/skill-assessment">
              <Button>Take the assessment</Button>
            </Link>
          </CardBody>
        </Card>
      )}

      <Card>
        <CardHeader className="flex items-center justify-between">
          <h3 className="font-display text-base text-ink">
            {profile ? 'Internships matched to your skills' : 'Recently posted internships'}
          </h3>
          <Link to="/app/student/internships" className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700">
            View all <ArrowRight size={14} />
          </Link>
        </CardHeader>
        <CardBody className="divide-y divide-line p-0">
          {recommended.map((i) => (
            <div key={i.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-medium text-ink">{i.title}</p>
                <p className="text-sm text-ink-faint">{i.company} · {i.location} · {i.mode}</p>
              </div>
              {profile && <Badge tone={i.matchScore! >= 60 ? 'teal' : 'neutral'}>{i.matchScore}% match</Badge>}
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  )
}
