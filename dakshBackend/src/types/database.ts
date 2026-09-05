/**
 * Hand-written TypeScript types matching the Supabase schema.
 * In a production project you'd generate these with `supabase gen types typescript`.
 *
 * NOTE: We use `type` aliases (not `interface`) deliberately — TypeScript interfaces
 * don't carry implicit index signatures, which breaks the `GenericSchema` conditional
 * in @supabase/supabase-js when it checks `Database['public'] extends GenericSchema`.
 */

/* ------------------------------------------------------------------ */
/*  Enums / literal unions (matching CHECK constraints)               */
/* ------------------------------------------------------------------ */

export type UserRole = 'student' | 'industry' | 'academician' | 'institution'
export type InternshipMode = 'Remote' | 'Hybrid' | 'On-site'
export type ApplicationStatus = 'saved' | 'applied' | 'shortlisted' | 'interviewing' | 'offered' | 'rejected'
export type JobType = 'Full-time' | 'Internship-to-hire'
export type ProgramFormat = 'Self-paced' | 'Cohort' | 'Workshop' | 'Mentorship'
export type ProgramLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type PortfolioItemType = 'Certification' | 'Project' | 'Internship' | 'Achievement'
export type AcademicOpportunityType = 'Faculty Development Program' | 'Industrial Training' | 'Consultancy' | 'Collaborative Research'

/* ------------------------------------------------------------------ */
/*  Skill score shape stored inside jsonb                              */
/* ------------------------------------------------------------------ */

export type SkillScoreJson = {
  skill: string
  category: 'technical' | 'soft'
  score: number
  industryDemand: number
}

/* ------------------------------------------------------------------ */
/*  Per-table Row / Insert / Update types                              */
/* ------------------------------------------------------------------ */

// ---- profiles ----
export type ProfileRow = {
  id: string
  name: string
  email: string
  role: UserRole
  avatar_initials: string
  organization: string | null
  created_at: string
}
export type ProfileInsert = {
  id: string
  name: string
  email: string
  role: UserRole
  avatar_initials?: string
  organization?: string | null
}
export type ProfileUpdate = {
  name?: string
  email?: string
  role?: UserRole
  avatar_initials?: string
  organization?: string | null
}

// ---- skill_profiles ----
export type SkillProfileRow = {
  id: string
  student_id: string
  generated_on: string
  scores: SkillScoreJson[]
  strengths: string[]
  gaps: string[]
  recommended_roles: string[]
  created_at: string
}
export type SkillProfileInsert = {
  student_id: string
  generated_on?: string
  scores: SkillScoreJson[]
  strengths: string[]
  gaps: string[]
  recommended_roles: string[]
}
export type SkillProfileUpdate = {
  scores?: SkillScoreJson[]
  strengths?: string[]
  gaps?: string[]
  recommended_roles?: string[]
  generated_on?: string
}

// ---- internships ----
export type InternshipRow = {
  id: string
  title: string
  company: string
  location: string
  mode: InternshipMode
  stipend: string | null
  duration_weeks: number
  required_skills: string[]
  posted_on: string
  applicants: number
  posted_by: string | null
  created_at: string
}
export type InternshipInsert = {
  title: string
  company: string
  location: string
  mode: InternshipMode
  stipend?: string | null
  duration_weeks: number
  required_skills?: string[]
  posted_on?: string
  applicants?: number
  posted_by?: string | null
}
export type InternshipUpdate = {
  title?: string
  company?: string
  location?: string
  mode?: InternshipMode
  stipend?: string | null
  duration_weeks?: number
  required_skills?: string[]
  applicants?: number
}

// ---- applications ----
export type ApplicationRow = {
  id: string
  internship_id: string
  student_id: string
  status: ApplicationStatus
  updated_on: string
  created_at: string
}
export type ApplicationInsert = {
  internship_id: string
  student_id: string
  status?: ApplicationStatus
}
export type ApplicationUpdate = {
  status?: ApplicationStatus
  updated_on?: string
}

// ---- job_openings ----
export type JobOpeningRow = {
  id: string
  title: string
  company: string
  location: string
  type: JobType
  ctc_range: string | null
  required_skills: string[]
  min_eligibility: string
  posted_on: string
  applicants: number
  posted_by: string | null
  created_at: string
}
export type JobOpeningInsert = {
  title: string
  company: string
  location: string
  type: JobType
  ctc_range?: string | null
  required_skills?: string[]
  min_eligibility: string
  posted_on?: string
  applicants?: number
  posted_by?: string | null
}
export type JobOpeningUpdate = {
  title?: string
  company?: string
  location?: string
  type?: JobType
  ctc_range?: string | null
  required_skills?: string[]
  min_eligibility?: string
  applicants?: number
}

// ---- learning_programs ----
export type LearningProgramRow = {
  id: string
  title: string
  provider: string
  format: ProgramFormat
  duration_weeks: number
  skills_covered: string[]
  level: ProgramLevel
  created_at: string
}
export type LearningProgramInsert = {
  title: string
  provider: string
  format: ProgramFormat
  duration_weeks: number
  skills_covered?: string[]
  level: ProgramLevel
}

// ---- portfolio_items ----
export type PortfolioItemRow = {
  id: string
  student_id: string
  type: PortfolioItemType
  title: string
  issuer: string
  date: string
  verified: boolean
  created_at: string
}
export type PortfolioItemInsert = {
  student_id: string
  type: PortfolioItemType
  title: string
  issuer: string
  date: string
  verified?: boolean
}

// ---- academic_opportunities ----
export type AcademicOpportunityRow = {
  id: string
  title: string
  type: AcademicOpportunityType
  partner_company: string
  window: string
  seats: number
  description: string
  created_at: string
}
export type AcademicOpportunityInsert = {
  title: string
  type: AcademicOpportunityType
  partner_company: string
  window: string
  seats: number
  description?: string
}

// ---- demand_trends ----
export type DemandTrendRow = {
  id: string
  institution_id: string | null
  month: string
  demand_index: number
}
export type DemandTrendInsert = {
  institution_id?: string | null
  month: string
  demand_index: number
}

// ---- placement_funnel ----
export type PlacementFunnelRow = {
  id: string
  institution_id: string | null
  stage: string
  count: number
}
export type PlacementFunnelInsert = {
  institution_id?: string | null
  stage: string
  count: number
}

// ---- department_readiness ----
export type DepartmentReadinessRow = {
  id: string
  institution_id: string | null
  department: string
  readiness: number
}
export type DepartmentReadinessInsert = {
  institution_id?: string | null
  department: string
  readiness: number
}

/* ------------------------------------------------------------------ */
/*  Top-level Database type for createClient<Database>()               */
/*  Must satisfy GenericSchema: Tables + Views + Functions             */
/* ------------------------------------------------------------------ */

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow
        Insert: ProfileInsert
        Update: ProfileUpdate
        Relationships: []
      }
      skill_profiles: {
        Row: SkillProfileRow
        Insert: SkillProfileInsert
        Update: SkillProfileUpdate
        Relationships: []
      }
      internships: {
        Row: InternshipRow
        Insert: InternshipInsert
        Update: InternshipUpdate
        Relationships: []
      }
      applications: {
        Row: ApplicationRow
        Insert: ApplicationInsert
        Update: ApplicationUpdate
        Relationships: []
      }
      job_openings: {
        Row: JobOpeningRow
        Insert: JobOpeningInsert
        Update: JobOpeningUpdate
        Relationships: []
      }
      learning_programs: {
        Row: LearningProgramRow
        Insert: LearningProgramInsert
        Update: Record<string, unknown>
        Relationships: []
      }
      portfolio_items: {
        Row: PortfolioItemRow
        Insert: PortfolioItemInsert
        Update: Record<string, unknown>
        Relationships: []
      }
      academic_opportunities: {
        Row: AcademicOpportunityRow
        Insert: AcademicOpportunityInsert
        Update: Record<string, unknown>
        Relationships: []
      }
      demand_trends: {
        Row: DemandTrendRow
        Insert: DemandTrendInsert
        Update: Record<string, unknown>
        Relationships: []
      }
      placement_funnel: {
        Row: PlacementFunnelRow
        Insert: PlacementFunnelInsert
        Update: Record<string, unknown>
        Relationships: []
      }
      department_readiness: {
        Row: DepartmentReadinessRow
        Insert: DepartmentReadinessInsert
        Update: Record<string, unknown>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
