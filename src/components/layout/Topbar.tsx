import { useAuthStore } from '../../store/authStore'
import { ROLE_TAGLINE } from '../../config/roles'

export function Topbar({ title }: { title: string }) {
  const user = useAuthStore((s) => s.user)
  if (!user) return null

  return (
    <div className="flex h-16 items-center justify-between border-b border-line bg-paper-raised px-6">
      <div>
        <h1 className="font-display text-xl text-ink">{title}</h1>
        <p className="text-xs text-ink-faint">{ROLE_TAGLINE[user.role]}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-ink">{user.name}</p>
          <p className="text-xs text-ink-faint">{user.organization ?? user.email}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500 text-sm font-medium text-white">
          {user.avatarInitials}
        </div>
      </div>
    </div>
  )
}
