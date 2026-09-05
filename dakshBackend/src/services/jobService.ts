import { supabase } from '../supabaseClient.js'
import type { JobOpeningInsert, JobOpeningRow } from '../types/database.js'

/* ------------------------------------------------------------------ */
/*  List job openings                                                  */
/* ------------------------------------------------------------------ */

export async function getJobs(): Promise<JobOpeningRow[]> {
  const { data, error } = await supabase
    .from('job_openings')
    .select('*')
    .order('posted_on', { ascending: false })

  if (error) throw error
  return data ?? []
}

/* ------------------------------------------------------------------ */
/*  Get single job opening                                             */
/* ------------------------------------------------------------------ */

export async function getJobById(id: string): Promise<JobOpeningRow | null> {
  const { data, error } = await supabase
    .from('job_openings')
    .select('*')
    .eq('id', id)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

/* ------------------------------------------------------------------ */
/*  Create job opening (industry user)                                 */
/* ------------------------------------------------------------------ */

export async function createJob(job: JobOpeningInsert): Promise<JobOpeningRow> {
  const { data, error } = await supabase
    .from('job_openings')
    .insert(job)
    .select()
    .single()

  if (error) throw error
  return data!
}
