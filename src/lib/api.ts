import { supabase } from './supabase'
import type { Database } from 'daksh-backend'
import type {
  Internship,
  JobOpening,
  LearningProgram,
  AcademicOpportunity,
  PortfolioItem,
  Application,
  SkillProfile,
  PlacementFunnelStage,
  DemandTrendPoint
} from '../types/domain'

// ------------------------------------------------------------------
// Mappers (Database snake_case -> Domain camelCase)
// ------------------------------------------------------------------

function mapInternship(row: Database['public']['Tables']['internships']['Row']): Internship {
  return {
    id: row.id,
    title: row.title,
    company: row.company,
    location: row.location,
    mode: row.mode,
    stipend: row.stipend || undefined,
    durationWeeks: row.duration_weeks,
    requiredSkills: row.required_skills,
    postedOn: row.posted_on,
    applicants: row.applicants,
  }
}

function mapJobOpening(row: Database['public']['Tables']['job_openings']['Row']): JobOpening {
  return {
    id: row.id,
    title: row.title,
    company: row.company,
    location: row.location,
    type: row.type,
    ctcRange: row.ctc_range || undefined,
    requiredSkills: row.required_skills,
    minEligibility: row.min_eligibility,
    postedOn: row.posted_on,
    applicants: row.applicants,
  }
}

function mapLearningProgram(row: Database['public']['Tables']['learning_programs']['Row']): LearningProgram {
  return {
    id: row.id,
    title: row.title,
    provider: row.provider,
    format: row.format,
    durationWeeks: row.duration_weeks,
    skillsCovered: row.skills_covered,
    level: row.level,
  }
}

function mapAcademicOpportunity(row: Database['public']['Tables']['academic_opportunities']['Row']): AcademicOpportunity {
  return {
    id: row.id,
    title: row.title,
    type: row.type,
    partnerCompany: row.partner_company,
    window: row.window,
    seats: row.seats,
    description: row.description,
  }
}

function mapPortfolioItem(row: Database['public']['Tables']['portfolio_items']['Row']): PortfolioItem {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    issuer: row.issuer,
    date: row.date,
    verified: row.verified,
  }
}

// ------------------------------------------------------------------
// API Functions
// ------------------------------------------------------------------

export const api = {
  // Internships
  async fetchInternships(): Promise<Internship[]> {
    const { data, error } = await supabase
      .from('internships')
      .select('*')
      .order('posted_on', { ascending: false })
    if (error) throw error
    return data.map(mapInternship)
  },

  async applyToInternship(internshipId: string, studentId: string): Promise<void> {
    const { error } = await supabase
      .from('applications')
      .insert({ internship_id: internshipId, student_id: studentId, status: 'applied' })
    if (error) throw error
  },

  // Jobs
  async fetchJobs(): Promise<JobOpening[]> {
    const { data, error } = await supabase
      .from('job_openings')
      .select('*')
      .order('posted_on', { ascending: false })
    if (error) throw error
    return data.map(mapJobOpening)
  },

  // Learning Programs
  async fetchLearningPrograms(): Promise<LearningProgram[]> {
    const { data, error } = await supabase
      .from('learning_programs')
      .select('*')
    if (error) throw error
    return data.map(mapLearningProgram)
  },

  // Academic Opportunities
  async fetchAcademicOpportunities(): Promise<AcademicOpportunity[]> {
    const { data, error } = await supabase
      .from('academic_opportunities')
      .select('*')
    if (error) throw error
    return data.map(mapAcademicOpportunity)
  },

  // Portfolio
  async fetchPortfolio(studentId: string): Promise<PortfolioItem[]> {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .eq('student_id', studentId)
      .order('date', { ascending: false })
    if (error) throw error
    return data.map(mapPortfolioItem)
  },

  // Profiles & Auth handling
  async ensureProfile(
    userId: string,
    email: string,
    name: string,
    role: string,
    organization?: string
  ) {
    // Upsert the profile to make sure it matches our demo session
    const { error } = await supabase.from('profiles').upsert({
      id: userId,
      email,
      name,
      role: role as Database['public']['Tables']['profiles']['Insert']['role'],
      organization,
      avatar_initials: name.substring(0, 2).toUpperCase()
    }, { onConflict: 'id' })
    if (error) throw error
  }
}

/** Naive overlap-based match score against a set of a student's stronger skills. */
export function computeMatchScore(required: string[], strongSkills: string[]): number {
  if (required.length === 0) return 0
  const hits = required.filter((s) => strongSkills.includes(s)).length
  return Math.round((hits / required.length) * 100)
}
