/**
 * Seed script — populates the Supabase database with all mock data from the
 * frontend, so the demo works immediately after running the migration.
 *
 * Usage:  npm run seed
 */

import { supabase } from '../supabaseClient.js'
import type {
  InternshipInsert,
  JobOpeningInsert,
  LearningProgramInsert,
  AcademicOpportunityInsert,
  DemandTrendInsert,
  PlacementFunnelInsert,
  DepartmentReadinessInsert,
} from '../types/database.js'

// --------------------------------------------------------------------------
//  Mock data (mirrors the frontend's features/[domain]/data/[file].ts files)
// --------------------------------------------------------------------------

const INTERNSHIPS: InternshipInsert[] = [
  {
    title: 'Frontend Engineering Intern',
    company: 'Northwind Analytics',
    location: 'Bengaluru',
    mode: 'Hybrid',
    stipend: '₹25,000/mo',
    duration_weeks: 12,
    required_skills: ['Frontend Development', 'Version Control (Git)', 'Teamwork'],
    posted_on: '2026-08-18',
    applicants: 64,
  },
  {
    title: 'Data Analytics Intern',
    company: 'Fieldstone Retail',
    location: 'Remote',
    mode: 'Remote',
    stipend: '₹20,000/mo',
    duration_weeks: 8,
    required_skills: ['SQL & Databases', 'Problem Solving', 'Communication'],
    posted_on: '2026-08-22',
    applicants: 41,
  },
  {
    title: 'Cloud Infrastructure Intern',
    company: 'Harbor & Cole Systems',
    location: 'Pune',
    mode: 'On-site',
    stipend: '₹30,000/mo',
    duration_weeks: 16,
    required_skills: ['Cloud Fundamentals', 'Data Structures & Algorithms'],
    posted_on: '2026-08-10',
    applicants: 29,
  },
  {
    title: 'Product Management Intern',
    company: 'Meridian Health',
    location: 'Hyderabad',
    mode: 'Hybrid',
    stipend: '₹22,000/mo',
    duration_weeks: 10,
    required_skills: ['Communication', 'Problem Solving', 'Teamwork'],
    posted_on: '2026-08-27',
    applicants: 53,
  },
  {
    title: 'Backend Development Intern',
    company: 'Northwind Analytics',
    location: 'Remote',
    mode: 'Remote',
    stipend: '₹24,000/mo',
    duration_weeks: 12,
    required_skills: ['Data Structures & Algorithms', 'SQL & Databases', 'Version Control (Git)'],
    posted_on: '2026-08-30',
    applicants: 37,
  },
]

const JOBS: JobOpeningInsert[] = [
  {
    title: 'Graduate Software Engineer',
    company: 'Northwind Analytics',
    location: 'Bengaluru',
    type: 'Full-time',
    ctc_range: '₹9–12 LPA',
    required_skills: ['Data Structures & Algorithms', 'Frontend Development'],
    min_eligibility: 'B.Tech, CGPA ≥ 7.0',
    posted_on: '2026-08-15',
    applicants: 212,
  },
  {
    title: 'Junior Data Analyst',
    company: 'Fieldstone Retail',
    location: 'Remote',
    type: 'Full-time',
    ctc_range: '₹6–8 LPA',
    required_skills: ['SQL & Databases', 'Communication'],
    min_eligibility: 'Any discipline, CGPA ≥ 6.5',
    posted_on: '2026-08-20',
    applicants: 158,
  },
  {
    title: 'Cloud Support Engineer (Intern-to-hire)',
    company: 'Harbor & Cole Systems',
    location: 'Pune',
    type: 'Internship-to-hire',
    ctc_range: '₹7–9 LPA on conversion',
    required_skills: ['Cloud Fundamentals', 'Problem Solving'],
    min_eligibility: 'B.Tech/M.Tech, CGPA ≥ 7.0',
    posted_on: '2026-08-24',
    applicants: 96,
  },
]

const PROGRAMS: LearningProgramInsert[] = [
  {
    title: 'Cloud Practitioner Bootcamp',
    provider: 'Harbor & Cole Systems',
    format: 'Cohort',
    duration_weeks: 4,
    skills_covered: ['Cloud Fundamentals'],
    level: 'Beginner',
  },
  {
    title: 'Applied SQL for Analysts',
    provider: 'Fieldstone Retail',
    format: 'Self-paced',
    duration_weeks: 3,
    skills_covered: ['SQL & Databases', 'Problem Solving'],
    level: 'Intermediate',
  },
  {
    title: 'Frontend Systems Workshop',
    provider: 'Northwind Analytics',
    format: 'Workshop',
    duration_weeks: 2,
    skills_covered: ['Frontend Development', 'Version Control (Git)'],
    level: 'Intermediate',
  },
  {
    title: 'Engineering Communication Mentorship',
    provider: 'Meridian Health',
    format: 'Mentorship',
    duration_weeks: 6,
    skills_covered: ['Communication', 'Teamwork'],
    level: 'Beginner',
  },
]

const ACADEMIC_OPPORTUNITIES: AcademicOpportunityInsert[] = [
  {
    title: 'Faculty Development Program — Applied Machine Learning',
    type: 'Faculty Development Program',
    partner_company: 'Harbor & Cole Systems',
    window: '14–18 Sept 2026',
    seats: 30,
    description: 'A one-week intensive on applying ML in industry pipelines, co-run with practicing engineers.',
  },
  {
    title: 'Industrial Training — Cloud Platform Engineering',
    type: 'Industrial Training',
    partner_company: 'Harbor & Cole Systems',
    window: '2 weeks, rolling intake',
    seats: 15,
    description: 'Hands-on training for faculty to bring current cloud practice back into the classroom.',
  },
  {
    title: 'Consultancy — Retail Demand Forecasting',
    type: 'Consultancy',
    partner_company: 'Fieldstone Retail',
    window: 'Ongoing, 6-month engagement',
    seats: 2,
    description: 'Short-term consultancy applying forecasting research to live retail data.',
  },
  {
    title: 'Collaborative Research — Human-Centred Health AI',
    type: 'Collaborative Research',
    partner_company: 'Meridian Health',
    window: 'Proposal deadline: 30 Sept 2026',
    seats: 4,
    description: 'Joint research grant on interpretable models for clinical decision support.',
  },
]

const DEMAND_TRENDS: DemandTrendInsert[] = [
  { month: 'Mar', demand_index: 58 },
  { month: 'Apr', demand_index: 61 },
  { month: 'May', demand_index: 65 },
  { month: 'Jun', demand_index: 63 },
  { month: 'Jul', demand_index: 70 },
  { month: 'Aug', demand_index: 76 },
]

const PLACEMENT_FUNNEL: PlacementFunnelInsert[] = [
  { stage: 'Registered', count: 1240 },
  { stage: 'Assessed', count: 980 },
  { stage: 'Applied', count: 710 },
  { stage: 'Shortlisted', count: 340 },
  { stage: 'Offered', count: 205 },
]

const DEPARTMENT_READINESS: DepartmentReadinessInsert[] = [
  { department: 'Computer Science', readiness: 82 },
  { department: 'Electronics', readiness: 68 },
  { department: 'Mechanical', readiness: 54 },
  { department: 'Information Tech', readiness: 79 },
  { department: 'Civil', readiness: 47 },
]

/* ------------------------------------------------------------------ */
/*  Seed runner                                                        */
/* ------------------------------------------------------------------ */

async function seed() {
  console.log('🌱 Seeding Daksh database...\n')

  // 1. Internships
  const { error: intErr } = await supabase.from('internships').insert(INTERNSHIPS)
  if (intErr) console.error('❌ internships:', intErr.message)
  else console.log(`  ✅ internships — ${INTERNSHIPS.length} rows`)

  // 2. Job openings
  const { error: jobErr } = await supabase.from('job_openings').insert(JOBS)
  if (jobErr) console.error('❌ job_openings:', jobErr.message)
  else console.log(`  ✅ job_openings — ${JOBS.length} rows`)

  // 3. Learning programs
  const { error: lpErr } = await supabase.from('learning_programs').insert(PROGRAMS)
  if (lpErr) console.error('❌ learning_programs:', lpErr.message)
  else console.log(`  ✅ learning_programs — ${PROGRAMS.length} rows`)

  // 4. Academic opportunities
  const { error: aoErr } = await supabase.from('academic_opportunities').insert(ACADEMIC_OPPORTUNITIES)
  if (aoErr) console.error('❌ academic_opportunities:', aoErr.message)
  else console.log(`  ✅ academic_opportunities — ${ACADEMIC_OPPORTUNITIES.length} rows`)

  // 5. Demand trends
  const { error: dtErr } = await supabase.from('demand_trends').insert(DEMAND_TRENDS)
  if (dtErr) console.error('❌ demand_trends:', dtErr.message)
  else console.log(`  ✅ demand_trends — ${DEMAND_TRENDS.length} rows`)

  // 6. Placement funnel
  const { error: pfErr } = await supabase.from('placement_funnel').insert(PLACEMENT_FUNNEL)
  if (pfErr) console.error('❌ placement_funnel:', pfErr.message)
  else console.log(`  ✅ placement_funnel — ${PLACEMENT_FUNNEL.length} rows`)

  // 7. Department readiness
  const { error: drErr } = await supabase.from('department_readiness').insert(DEPARTMENT_READINESS)
  if (drErr) console.error('❌ department_readiness:', drErr.message)
  else console.log(`  ✅ department_readiness — ${DEPARTMENT_READINESS.length} rows`)

  console.log('\n🎉 Seeding complete!')
}

seed().catch((err) => {
  console.error('Fatal seed error:', err)
  process.exit(1)
})
