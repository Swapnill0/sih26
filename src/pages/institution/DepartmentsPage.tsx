import { Card, CardBody } from '../../components/ui'
import { ProgressBar } from '../../components/ui'
import { DEPARTMENT_READINESS } from '../../features/dashboard/institution/analytics'

export function DepartmentsPage() {
  return (
    <Card>
      <CardBody className="divide-y divide-line p-0">
        {DEPARTMENT_READINESS.map((d) => (
          <div key={d.department} className="px-5 py-4">
            <div className="flex items-center justify-between">
              <p className="font-medium text-ink">{d.department}</p>
              <span className="text-sm text-ink-faint">{d.readiness}% ready</span>
            </div>
            <ProgressBar value={d.readiness} className="mt-2" tone={d.readiness >= 70 ? 'teal' : 'gold'} />
          </div>
        ))}
      </CardBody>
    </Card>
  )
}
