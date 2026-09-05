import { supabase } from '../supabaseClient.js'
import type { LearningProgramRow } from '../types/database.js'

/* ------------------------------------------------------------------ */
/*  List learning programs                                             */
/* ------------------------------------------------------------------ */

export async function getPrograms(): Promise<LearningProgramRow[]> {
  const { data, error } = await supabase
    .from('learning_programs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

/* ------------------------------------------------------------------ */
/*  Get programs matching specific skills                              */
/* ------------------------------------------------------------------ */

export async function getProgramsBySkills(skills: string[]): Promise<LearningProgramRow[]> {
  const { data, error } = await supabase
    .from('learning_programs')
    .select('*')
    .overlaps('skills_covered', skills)

  if (error) throw error
  return data ?? []
}
