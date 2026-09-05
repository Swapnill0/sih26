import { NavLink } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { DakshMark } from './SiteHeader'
import { ROLE_LABEL, ROLE_NAV } from '../../config/roles'
import { useAuthStore } from '../../store/authStore'
import { cn } from '../../lib/cn'

export function Sidebar() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  if (!user) return null

  const items = ROLE_NAV[user.role]

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-line bg-paper-raised">
      <div className="flex h-16 items-center gap-2 border-b border-line px-5">
        <DakshMark size={20} />
        <span className="font-display text-base text-ink">Daksh</span>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-ink-faint">
          {ROLE_LABEL[user.role]}
        </p>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to.split('/').length <= 3}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 rounded px-2.5 py-2 text-sm transition-colors',
                isActive ? 'bg-teal-50 text-teal-700 font-medium' : 'text-ink-soft hover:bg-paper-sunken hover:text-ink',
              )
            }
          >
            <item.icon size={17} strokeWidth={2} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-line p-3">
        <button
          onClick={logout}
          className="flex w-full items-center gap-2.5 rounded px-2.5 py-2 text-sm text-ink-soft transition-colors hover:bg-paper-sunken hover:text-ink"
        >
          <LogOut size={17} strokeWidth={2} />
          Log out
        </button>
      </div>
    </aside>
  )
}
