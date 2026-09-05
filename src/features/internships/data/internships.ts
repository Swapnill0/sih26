import type { Internship } from '../../../types/domain'

export const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: 'int-1',
    title: 'Frontend Engineering Intern',
    company: 'Northwind Analytics',
    location: 'Bengaluru',
    mode: 'Hybrid',
    stipend: '₹25,000/mo',
    durationWeeks: 12,
    requiredSkills: ['Frontend Development', 'Version Control (Git)', 'Teamwork'],
    postedOn: '2026-08-18',
    applicants: 64,
  },
  {
    id: 'int-2',
    title: 'Data Analytics Intern',
    company: 'Fieldstone Retail',
    location: 'Remote',
    mode: 'Remote',
    stipend: '₹20,000/mo',
    durationWeeks: 8,
    requiredSkills: ['SQL & Databases', 'Problem Solving', 'Communication'],
    postedOn: '2026-08-22',
    applicants: 41,
  },
  {
    id: 'int-3',
    title: 'Cloud Infrastructure Intern',
    company: 'Harbor & Cole Systems',
    location: 'Pune',
    mode: 'On-site',
    stipend: '₹30,000/mo',
    durationWeeks: 16,
    requiredSkills: ['Cloud Fundamentals', 'Data Structures & Algorithms'],
    postedOn: '2026-08-10',
    applicants: 29,
  },
  {
    id: 'int-4',
    title: 'Product Management Intern',
    company: 'Meridian Health',
    location: 'Hyderabad',
    mode: 'Hybrid',
    stipend: '₹22,000/mo',
    durationWeeks: 10,
    requiredSkills: ['Communication', 'Problem Solving', 'Teamwork'],
    postedOn: '2026-08-27',
    applicants: 53,
  },
  {
    id: 'int-5',
    title: 'Backend Development Intern',
    company: 'Northwind Analytics',
    location: 'Remote',
    mode: 'Remote',
    stipend: '₹24,000/mo',
    durationWeeks: 12,
    requiredSkills: ['Data Structures & Algorithms', 'SQL & Databases', 'Version Control (Git)'],
    postedOn: '2026-08-30',
    applicants: 37,
  },
]

/** Naive overlap-based match score against a set of a student's stronger skills. */
export function computeMatchScore(required: string[], strongSkills: string[]): number {
  if (required.length === 0) return 0
  const hits = required.filter((s) => strongSkills.includes(s)).length
  return Math.round((hits / required.length) * 100)
}
