import { supabase } from '../supabaseClient.js'
import type { InternshipInsert, InternshipRow, ApplicationInsert, ApplicationRow } from '../types/database.js'

/* ------------------------------------------------------------------ */
/*  List internships                                                   */
/* ------------------------------------------------------------------ */

export async function getInternships(): Promise<InternshipRow[]> {
  const { data, error } = await supabase
    .from('internships')
    .select('*')
    .order('posted_on', { ascending: false })

  if (error) throw error
  return data ?? []
}

/* ------------------------------------------------------------------ */
/*  Get single internship                                              */
/* ------------------------------------------------------------------ */

export async function getInternshipById(id: string): Promise<InternshipRow | null> {
  const { data, error } = await supabase
    .from('internships')
    .select('*')
    .eq('id', id)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

/* ------------------------------------------------------------------ */
/*  Create internship (industry user)                                  */
/* ------------------------------------------------------------------ */

export async function createInternship(internship: InternshipInsert): Promise<InternshipRow> {
  const { data, error } = await supabase
    .from('internships')
    .insert(internship)
    .select()
    .single()

  if (error) throw error
  return data!
}

/* ------------------------------------------------------------------ */
/*  Apply to internship                                                */
/* ------------------------------------------------------------------ */

export async function applyToInternship(
  internshipId: string,
  studentId: string
): Promise<ApplicationRow> {
  const application: ApplicationInsert = {
    internship_id: internshipId,
    student_id: studentId,
    status: 'applied',
  }

  const { data, error } = await supabase
    .from('applications')
    .insert(application)
    .select()
    .single()

  if (error) throw error
  return data!
}

/* ------------------------------------------------------------------ */
/*  Get applications for a student                                     */
/* ------------------------------------------------------------------ */

export async function getStudentApplications(studentId: string): Promise<ApplicationRow[]> {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('student_id', studentId)
    .order('updated_on', { ascending: false })

  if (error) throw error
  return data ?? []
}

/* ------------------------------------------------------------------ */
/*  Update application status                                          */
/* ------------------------------------------------------------------ */

export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationRow['status']
): Promise<ApplicationRow> {
  const { data, error } = await supabase
    .from('applications')
    .update({ status, updated_on: new Date().toISOString() })
    .eq('id', applicationId)
    .select()
    .single()

  if (error) throw error
  return data!
}
