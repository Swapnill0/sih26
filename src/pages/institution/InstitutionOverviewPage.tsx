import { Users, GraduationCap, Award } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'
import { StatCard, Card, CardHeader, CardBody } from '../../components/ui'
import { PLACEMENT_FUNNEL } from '../../features/dashboard/institution/analytics'

export function InstitutionOverviewPage() {
  const registered = PLACEMENT_FUNNEL[0].count
  const offered = PLACEMENT_FUNNEL[PLACEMENT_FUNNEL.length - 1].count
  const rate = Math.round((offered / registered) * 100)

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Students registered" value={registered.toLocaleString('en-IN')} icon={Users} tone="teal" />
        <StatCard label="Offers extended" value={offered.toLocaleString('en-IN')} icon={Award} tone="gold" />
        <StatCard label="Placement rate" value={`${rate}%`} hint="Registered to offered" icon={GraduationCap} />
      </div>

      <Card>
        <CardHeader>
          <h3 className="font-display text-base text-ink">This year's placement funnel</h3>
        </CardHeader>
        <CardBody className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={PLACEMENT_FUNNEL} layout="vertical" margin={{ left: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7EAE4" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#5B6B73', fontSize: 11 }} />
              <YAxis type="category" dataKey="stage" width={90} tick={{ fill: '#3A4655', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 8, borderColor: '#D7DCD4', fontSize: 13 }} />
              <Bar dataKey="count" fill="#1B6F63" radius={[0, 4, 4, 0]} barSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  )
}
