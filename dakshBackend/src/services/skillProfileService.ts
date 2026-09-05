import { supabase } from '../supabaseClient.js'
import type { SkillProfileInsert, SkillProfileRow } from '../types/database.js'

/* ------------------------------------------------------------------ */
/*  Get skill profile for a student                                    */
/* ------------------------------------------------------------------ */

export async function getSkillProfile(studentId: string): Promise<SkillProfileRow | null> {
  const { data, error } = await supabase
    .from('skill_profiles')
    .select('*')
    .eq('student_id', studentId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

/* ------------------------------------------------------------------ */
/*  Upsert skill profile (create or replace)                           */
/* ------------------------------------------------------------------ */

export async function saveSkillProfile(profile: SkillProfileInsert): Promise<SkillProfileRow> {
  const { data, error } = await supabase
    .from('skill_profiles')
    .upsert(profile, { onConflict: 'student_id' })
    .select()
    .single()

  if (error) throw error
  return data!
}

/* ------------------------------------------------------------------ */
/*  Delete skill profile                                               */
/* ------------------------------------------------------------------ */

export async function deleteSkillProfile(studentId: string): Promise<void> {
  const { error } = await supabase
    .from('skill_profiles')
    .delete()
    .eq('student_id', studentId)

  if (error) throw error
}
