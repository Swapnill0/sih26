import { supabase } from '../supabaseClient.js'
import type { AcademicOpportunityRow } from '../types/database.js'

/* ------------------------------------------------------------------ */
/*  List academic opportunities                                        */
/* ------------------------------------------------------------------ */

export async function getOpportunities(): Promise<AcademicOpportunityRow[]> {
  const { data, error } = await supabase
    .from('academic_opportunities')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

/* ------------------------------------------------------------------ */
/*  Get opportunities filtered by type                                 */
/* ------------------------------------------------------------------ */

export async function getOpportunitiesByType(
  type: AcademicOpportunityRow['type']
): Promise<AcademicOpportunityRow[]> {
  const { data, error } = await supabase
    .from('academic_opportunities')
    .select('*')
    .eq('type', type)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}
