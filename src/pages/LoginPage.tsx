import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SiteHeader } from '../components/layout'
import { Button, Card, CardBody, Label, Input, Select } from '../components/ui'
import { useAuthStore } from '../store/authStore'
import { ROLE_LABEL } from '../config/roles'
import type { UserRole } from '../types/domain'

const ROLES: UserRole[] = ['student', 'industry', 'academician', 'institution']

export function LoginPage() {
  const [params] = useSearchParams()
  const initialRole = (params.get('role') as UserRole) ?? 'student'
  const [role, setRole] = useState<UserRole>(ROLES.includes(initialRole) ? initialRole : 'student')
  const [name, setName] = useState('')
  const [organization, setOrganization] = useState('')
  const loginAs = useAuthStore((s) => s.loginAs)
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    loginAs(role, name, organization)
    navigate(`/app/${role}`)
  }

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <div className="container-page flex min-h-[calc(100vh-64px)] items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardBody className="p-7">
            <h1 className="font-display text-2xl text-ink">Continue to Daksh</h1>
            <p className="mt-1.5 text-sm text-ink-soft">
              This is a hackathon prototype — pick a role to preview its dashboard.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="role">I am a</Label>
                <Select id="role" value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{ROLE_LABEL[r]}</option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" placeholder="e.g. Ananya Sharma" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="org">{role === 'student' ? 'College / University' : 'Organization'}</Label>
                <Input
                  id="org"
                  placeholder={role === 'student' ? 'e.g. NIT Jamshedpur' : 'e.g. Northwind Analytics'}
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Enter dashboard
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
