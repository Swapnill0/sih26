import { supabase } from '../supabaseClient.js'
import type { PortfolioItemInsert, PortfolioItemRow } from '../types/database.js'

/* ------------------------------------------------------------------ */
/*  Get portfolio items for a student                                  */
/* ------------------------------------------------------------------ */

export async function getPortfolio(studentId: string): Promise<PortfolioItemRow[]> {
  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('student_id', studentId)
    .order('date', { ascending: false })

  if (error) throw error
  return data ?? []
}

/* ------------------------------------------------------------------ */
/*  Add a portfolio item                                               */
/* ------------------------------------------------------------------ */

export async function addPortfolioItem(item: PortfolioItemInsert): Promise<PortfolioItemRow> {
  const { data, error } = await supabase
    .from('portfolio_items')
    .insert(item)
    .select()
    .single()

  if (error) throw error
  return data!
}

/* ------------------------------------------------------------------ */
/*  Delete a portfolio item                                            */
/* ------------------------------------------------------------------ */

export async function deletePortfolioItem(itemId: string): Promise<void> {
  const { error } = await supabase
    .from('portfolio_items')
    .delete()
    .eq('id', itemId)

  if (error) throw error
}
