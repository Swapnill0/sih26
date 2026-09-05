import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SkillProfile } from '../types/domain'

interface SkillProfileState {
  profile: SkillProfile | null
  setProfile: (profile: SkillProfile) => void
  clearProfile: () => void
}

export const useSkillProfileStore = create<SkillProfileState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: null }),
    }),
    { name: 'bridge-skill-profile' },
  ),
)
