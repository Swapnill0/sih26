import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import type { SkillProfile } from '../../../types/domain'
import { Card, CardHeader, CardBody, Badge, Button } from '../../../components/ui'
import { useSkillProfileStore } from '../../../store/skillProfileStore'

export function SkillProfileResults({ profile }: { profile: SkillProfile }) {
  const clearProfile = useSkillProfileStore((s) => s.clearProfile)

  const chartData = profile.scores.map((s) => ({
    skill: s.skill.length > 14 ? s.skill.slice(0, 13) + '…' : s.skill,
    'Your score': s.score,
    'Industry demand': s.industryDemand,
  }))

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <h2 className="font-display text-lg text-ink">Your score vs. industry demand</h2>
          </CardHeader>
          <CardBody className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData} outerRadius="72%">
                <PolarGrid stroke="#D7DCD4" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#3A4655', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#5B6B73', fontSize: 10 }} />
                <Radar name="Your score" dataKey="Your score" stroke="#1B6F63" fill="#1B6F63" fillOpacity={0.35} />
                <Radar name="Industry demand" dataKey="Industry demand" stroke="#D89B3C" fill="#D89B3C" fillOpacity={0.15} />
                <Legend />
                <Tooltip contentStyle={{ borderRadius: 8, borderColor: '#D7DCD4', fontSize: 13 }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="font-display text-base text-ink">Strengths</h3>
            </CardHeader>
            <CardBody className="flex flex-wrap gap-2">
              {profile.strengths.map((s) => (
                <Badge key={s} tone="teal">{s}</Badge>
              ))}
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="font-display text-base text-ink">Skill gaps to close</h3>
            </CardHeader>
            <CardBody className="flex flex-wrap gap-2">
              {profile.gaps.map((s) => (
                <Badge key={s} tone="rose">{s}</Badge>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h3 className="font-display text-base text-ink">Recommended roles for you right now</h3>
        </CardHeader>
        <CardBody className="flex flex-wrap gap-2">
          {profile.recommendedRoles.map((r) => (
            <Badge key={r} tone="gold">{r}</Badge>
          ))}
        </CardBody>
      </Card>

      <Button variant="secondary" size="sm" onClick={clearProfile}>
        Retake assessment
      </Button>
    </div>
  )
}
