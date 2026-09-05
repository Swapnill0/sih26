import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'
import { Card, CardHeader, CardBody } from '../../components/ui'
import { DEMAND_TREND, DEPARTMENT_READINESS } from '../../features/dashboard/institution/analytics'

export function AnalyticsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <h3 className="font-display text-base text-ink">Industry skill-demand index</h3>
        </CardHeader>
        <CardBody className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={DEMAND_TREND} margin={{ left: -12 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7EAE4" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#5B6B73', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#5B6B73', fontSize: 11 }} axisLine={false} tickLine={false} domain={[40, 90]} />
              <Tooltip contentStyle={{ borderRadius: 8, borderColor: '#D7DCD4', fontSize: 13 }} />
              <Line type="monotone" dataKey="demandIndex" stroke="#D89B3C" strokeWidth={2.5} dot={{ r: 3, fill: '#D89B3C' }} />
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-display text-base text-ink">Placement readiness by department</h3>
        </CardHeader>
        <CardBody className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DEPARTMENT_READINESS} margin={{ left: -12 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7EAE4" vertical={false} />
              <XAxis dataKey="department" tick={{ fill: '#5B6B73', fontSize: 10 }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
              <YAxis tick={{ fill: '#5B6B73', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: 8, borderColor: '#D7DCD4', fontSize: 13 }} />
              <Bar dataKey="readiness" fill="#1B6F63" radius={[4, 4, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  )
}
