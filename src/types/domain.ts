/**
 * Shared domain types for the Academia–Industry Collaboration Portal ("Daksh").
 * These model the four problem-statement pillars: Skill Development, Internships,
 * Placements, and cross-cutting collaboration/analytics features.
 */

export type UserRole = 'student' | 'industry' | 'academician' | 'institution'

export interface BaseUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatarInitials: string
  organization?: string // company name, institute name, etc.
}

/* ---------------------------------- Skill development ---------------------------------- */

export type SkillCategory = 'technical' | 'soft'

export interface SkillScore {
  skill: string
  category: SkillCategory
  /** 0–100 self/assessed proficiency */
  score: number
  /** 0–100 how much industry currently demands this skill */
  industryDemand: number
}

export interface SkillProfile {
  studentId: string
  generatedOn: string
  scores: SkillScore[]
  strengths: string[]
  gaps: string[]
  recommendedRoles: string[]
}

export interface LearningProgram {
  id: string
  title: string
  provider: string
  format: 'Self-paced' | 'Cohort' | 'Workshop' | 'Mentorship'
  durationWeeks: number
  skillsCovered: string[]
  level: 'Beginner' | 'Intermediate' | 'Advanced'
}

/* -------------------------------------- Internships -------------------------------------- */

export type ApplicationStatus = 'saved' | 'applied' | 'shortlisted' | 'interviewing' | 'offered' | 'rejected'

export interface Internship {
  id: string
  title: string
  company: string
  location: string
  mode: 'Remote' | 'Hybrid' | 'On-site'
  stipend?: string
  durationWeeks: number
  requiredSkills: string[]
  postedOn: string
  applicants: number
  matchScore?: number // computed against a given student's skill profile
}

export interface Application {
  id: string
  internshipId: string
  studentId: string
  status: ApplicationStatus
  updatedOn: string
}

/* --------------------------------------- Placements --------------------------------------- */

export interface JobOpening {
  id: string
  title: string
  company: string
  location: string
  type: 'Full-time' | 'Internship-to-hire'
  ctcRange?: string
  requiredSkills: string[]
  minEligibility: string
  postedOn: string
  applicants: number
}

/* ------------------------------------ Academia collaboration ------------------------------------ */

export interface AcademicOpportunity {
  id: string
  title: string
  type: 'Faculty Development Program' | 'Industrial Training' | 'Consultancy' | 'Collaborative Research'
  partnerCompany: string
  window: string
  seats: number
  description: string
}

/* ------------------------------------------ Portfolio ------------------------------------------ */

export interface PortfolioItem {
  id: string
  type: 'Certification' | 'Project' | 'Internship' | 'Achievement'
  title: string
  issuer: string
  date: string
  verified: boolean
}

/* ------------------------------------------ Analytics ------------------------------------------ */

export interface DemandTrendPoint {
  month: string
  demandIndex: number
}

export interface PlacementFunnelStage {
  stage: string
  count: number
}
