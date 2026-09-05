import { supabase } from '../supabaseClient.js'
import type {
  DemandTrendRow,
  PlacementFunnelRow,
  DepartmentReadinessRow,
} from '../types/database.js'

/* ------------------------------------------------------------------ */
/*  Demand trend                                                       */
/* ------------------------------------------------------------------ */

export async function getDemandTrend(institutionId?: string): Promise<DemandTrendRow[]> {
  let query = supabase.from('demand_trends').select('*')

  if (institutionId) {
    query = query.eq('institution_id', institutionId)
  }

  const { data, error } = await query.order('month')
  if (error) throw error
  return data ?? []
}

/* ------------------------------------------------------------------ */
/*  Placement funnel                                                   */
/* ------------------------------------------------------------------ */

export async function getPlacementFunnel(institutionId?: string): Promise<PlacementFunnelRow[]> {
  let query = supabase.from('placement_funnel').select('*')

  if (institutionId) {
    query = query.eq('institution_id', institutionId)
  }

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

/* ------------------------------------------------------------------ */
/*  Department readiness                                               */
/* ------------------------------------------------------------------ */

export async function getDepartmentReadiness(institutionId?: string): Promise<DepartmentReadinessRow[]> {
  let query = supabase.from('department_readiness').select('*')

  if (institutionId) {
    query = query.eq('institution_id', institutionId)
  }

  const { data, error } = await query.order('readiness', { ascending: false })
  if (error) throw error
  return data ?? []
}
