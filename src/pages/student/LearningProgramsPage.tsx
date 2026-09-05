import { Card, CardBody, Badge, Button } from '../../components/ui'
import { MOCK_PROGRAMS } from '../../features/learning-programs/data/programs'
import { useSkillProfileStore } from '../../store/skillProfileStore'

export function LearningProgramsPage() {
  const profile = useSkillProfileStore((s) => s.profile)
  const gapSet = new Set(profile?.gaps ?? [])

  const sorted = [...MOCK_PROGRAMS].sort((a, b) => {
    const aGap = a.skillsCovered.some((s) => gapSet.has(s)) ? 1 : 0
    const bGap = b.skillsCovered.some((s) => gapSet.has(s)) ? 1 : 0
    return bGap - aGap
  })

  return (
    <div>
      {!profile && (
        <p className="mb-6 text-sm text-ink-soft">
          Take the skill assessment to see programs ranked against your specific skill gaps.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {sorted.map((p) => {
          const closesGap = p.skillsCovered.some((s) => gapSet.has(s))
          return (
            <Card key={p.id} className={closesGap ? 'border-teal-200' : undefined}>
              <CardBody>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg text-ink">{p.title}</h3>
                  {closesGap && <Badge tone="teal">Closes your gap</Badge>}
                </div>
                <p className="mt-1 text-sm text-ink-faint">
                  {p.provider} · {p.format} · {p.durationWeeks} weeks · {p.level}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.skillsCovered.map((s) => (
                    <Badge key={s} tone={gapSet.has(s) ? 'gold' : 'neutral'}>{s}</Badge>
                  ))}
                </div>
                <Button variant="secondary" size="sm" className="mt-4">Enroll</Button>
              </CardBody>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
