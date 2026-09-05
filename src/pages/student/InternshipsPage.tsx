import { useMemo, useState } from 'react'
import { Card, CardBody, Badge, Button } from '../../components/ui'
import { MOCK_INTERNSHIPS, computeMatchScore } from '../../features/internships/data/internships'
import { useSkillProfileStore } from '../../store/skillProfileStore'
import { cn } from '../../lib/cn'

export function InternshipsPage() {
  const profile = useSkillProfileStore((s) => s.profile)
  const [applied, setApplied] = useState<Set<string>>(new Set())
  const [modeFilter, setModeFilter] = useState<'All' | 'Remote' | 'Hybrid' | 'On-site'>('All')

  const strong = profile?.scores.filter((s) => s.score >= 65).map((s) => s.skill) ?? []

  const internships = useMemo(() => {
    const withScores = MOCK_INTERNSHIPS.map((i) => ({ ...i, matchScore: computeMatchScore(i.requiredSkills, strong) }))
    const filtered = modeFilter === 'All' ? withScores : withScores.filter((i) => i.mode === modeFilter)
    return filtered.sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
  }, [modeFilter, strong])

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {(['All', 'Remote', 'Hybrid', 'On-site'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setModeFilter(m)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm transition-colors',
              modeFilter === m ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-line-strong text-ink-soft hover:border-ink',
            )}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {internships.map((i) => {
          const isApplied = applied.has(i.id)
          return (
            <Card key={i.id}>
              <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg text-ink">{i.title}</h3>
                    {profile && <Badge tone={i.matchScore >= 60 ? 'teal' : 'neutral'}>{i.matchScore}% match</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-ink-faint">
                    {i.company} · {i.location} · {i.mode} · {i.durationWeeks} weeks {i.stipend ? `· ${i.stipend}` : ''}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {i.requiredSkills.map((s) => (
                      <Badge key={s} tone={strong.includes(s) ? 'teal' : 'neutral'}>{s}</Badge>
                    ))}
                  </div>
                </div>
                <Button
                  variant={isApplied ? 'secondary' : 'primary'}
                  size="sm"
                  className="shrink-0"
                  onClick={() => setApplied((prev) => new Set(prev).add(i.id))}
                  disabled={isApplied}
                >
                  {isApplied ? 'Applied' : 'Apply'}
                </Button>
              </CardBody>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
