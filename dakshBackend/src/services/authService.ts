import { supabase } from '../supabaseClient.js'
import type { UserRole, ProfileRow, ProfileUpdate } from '../types/database.js'

/**
 * Compute initials from a full name (e.g. "Ananya Sharma" → "AS").
 */
function initials(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/* ------------------------------------------------------------------ */
/*  Sign-up                                                            */
/* ------------------------------------------------------------------ */

export async function signUp(
  email: string,
  password: string,
  role: UserRole,
  name: string,
  organization?: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        role,
        avatar_initials: initials(name),
        organization: organization ?? null,
      },
    },
  })

  if (error) throw error
  return data
}

/* ------------------------------------------------------------------ */
/*  Sign-in                                                            */
/* ------------------------------------------------------------------ */

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

/* ------------------------------------------------------------------ */
/*  Sign-out                                                           */
/* ------------------------------------------------------------------ */

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

/* ------------------------------------------------------------------ */
/*  Get current session's profile                                      */
/* ------------------------------------------------------------------ */

export async function getCurrentProfile(): Promise<ProfileRow | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) throw error
  return data
}

/* ------------------------------------------------------------------ */
/*  Get profile by ID                                                  */
/* ------------------------------------------------------------------ */

export async function getProfileById(userId: string): Promise<ProfileRow | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows
  return data
}

/* ------------------------------------------------------------------ */
/*  Update profile                                                     */
/* ------------------------------------------------------------------ */

export async function updateProfile(
  userId: string,
  updates: { name?: string; organization?: string }
) {
  const payload: ProfileUpdate = {}
  if (updates.name) {
    payload.name = updates.name
    payload.avatar_initials = initials(updates.name)
  }
  if (updates.organization !== undefined) {
    payload.organization = updates.organization
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(payload)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}
