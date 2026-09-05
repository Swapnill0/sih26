import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BaseUser, UserRole } from '../types/domain'
import { ROLE_LABEL } from '../config/roles'

interface AuthState {
  user: BaseUser | null
  /** Mocked "login": in a real build this calls the auth API and stores a token instead. */
  loginAs: (role: UserRole, name?: string, organization?: string) => void
  logout: () => void
}

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loginAs: (role, name, organization) => {
        const displayName = name?.trim() || `${ROLE_LABEL[role]} User`
        set({
          user: {
            id: `${role}-${Date.now()}`,
            name: displayName,
            email: `${displayName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
            role,
            avatarInitials: initials(displayName),
            organization,
          },
        })
      },
      logout: () => set({ user: null }),
    }),
    { name: 'bridge-auth' },
  ),
)
