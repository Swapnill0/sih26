import { Card, CardBody, Badge } from '../../components/ui'

const CANDIDATES = [
  { name: 'Riya Kapoor', college: 'NIT Jamshedpur', role: 'Frontend Engineering Intern', match: 88, skills: ['Frontend Development', 'Version Control (Git)'] },
  { name: 'Aditya Verma', college: 'BIT Mesra', role: 'Data Analytics Intern', match: 81, skills: ['SQL & Databases', 'Communication'] },
  { name: 'Sneha Ghosh', college: 'IIT (ISM) Dhanbad', role: 'Cloud Infrastructure Intern', match: 76, skills: ['Cloud Fundamentals'] },
  { name: 'Mohit Rana', college: 'NIT Jamshedpur', role: 'Backend Development Intern', match: 69, skills: ['Data Structures & Algorithms'] },
]

export function CandidatesPage() {
  return (
    <div className="space-y-4">
      {CANDIDATES.map((c) => (
        <Card key={c.name}>
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-lg text-ink">{c.name}</p>
              <p className="text-sm text-ink-faint">{c.college} · Applied to {c.role}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {c.skills.map((s) => (
                  <Badge key={s} tone="teal">{s}</Badge>
                ))}
              </div>
            </div>
            <Badge tone={c.match >= 80 ? 'teal' : 'gold'} className="shrink-0 self-start sm:self-center">
              {c.match}% match
            </Badge>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
