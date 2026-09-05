import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BaseUser, UserRole } from '../types/domain'
import { ROLE_LABEL } from '../config/roles'
import { supabase } from '../lib/supabase'
import { api } from '../lib/api'

interface AuthState {
  user: BaseUser | null
  loginAs: (role: UserRole, name?: string, organization?: string) => Promise<void>
  logout: () => Promise<void>
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
      loginAs: async (role, name, organization) => {
        const displayName = name?.trim() || `${ROLE_LABEL[role]} User`
        const email = `${displayName.toLowerCase().replace(/[^a-z0-9]/g, '.')}@demo.com`
        const password = 'demoPassword123!' // default for all demo users
        
        // 1. Try to sign up, or sign in if already exists
        let authResult = await supabase.auth.signUp({ email, password })
        if (authResult.error?.message.includes('already registered')) {
          authResult = await supabase.auth.signInWithPassword({ email, password })
        }
        
        if (authResult.error) {
          console.error('Supabase auth failed:', authResult.error)
          throw authResult.error
        }
        
        const userId = authResult.data.user!.id
        
        // 2. Ensure profile exists in our custom table
        await api.ensureProfile(userId, email, displayName, role, organization)

        // 3. Update local state
        set({
          user: {
            id: userId,
            name: displayName,
            email,
            role,
            avatarInitials: initials(displayName),
            organization,
          },
        })
      },
      logout: async () => {
        await supabase.auth.signOut()
        set({ user: null })
      },
    }),
    { name: 'bridge-auth' },
  ),
)
