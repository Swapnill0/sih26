import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { useAuthStore } from '../../store/authStore'
import type { UserRole } from '../../types/domain'

const ROUTE_TITLES: Record<string, string> = {
  '/app/student': 'Overview',
  '/app/student/skill-assessment': 'Skill assessment',
  '/app/student/internships': 'Internships',
  '/app/student/learning': 'Learning programs',
  '/app/student/portfolio': 'Digital portfolio',
  '/app/industry': 'Overview',
  '/app/industry/postings': 'Postings',
  '/app/industry/candidates': 'Candidates',
  '/app/academician': 'Overview',
  '/app/academician/opportunities': 'Opportunities',
  '/app/institution': 'Overview',
  '/app/institution/analytics': 'Analytics',
  '/app/institution/departments': 'Institutions',
}

export function DashboardShell() {
  const location = useLocation()
  const title = ROUTE_TITLES[location.pathname] ?? 'Daksh'

  return (
    <div className="flex h-screen overflow-hidden bg-paper">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-6xl px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

/** Redirects unauthenticated users, and users of the wrong role, back to login. */
export function RequireRole({ role }: { role: UserRole }) {
  const user = useAuthStore((s) => s.user)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  if (user.role !== role) {
    return <Navigate to={`/app/${user.role}`} replace />
  }
  return <Outlet />
}
