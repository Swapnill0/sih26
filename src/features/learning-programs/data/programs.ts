import type { LearningProgram } from '../../../types/domain'

export const MOCK_PROGRAMS: LearningProgram[] = [
  {
    id: 'lp-1',
    title: 'Cloud Practitioner Bootcamp',
    provider: 'Harbor & Cole Systems',
    format: 'Cohort',
    durationWeeks: 4,
    skillsCovered: ['Cloud Fundamentals'],
    level: 'Beginner',
  },
  {
    id: 'lp-2',
    title: 'Applied SQL for Analysts',
    provider: 'Fieldstone Retail',
    format: 'Self-paced',
    durationWeeks: 3,
    skillsCovered: ['SQL & Databases', 'Problem Solving'],
    level: 'Intermediate',
  },
  {
    id: 'lp-3',
    title: 'Frontend Systems Workshop',
    provider: 'Northwind Analytics',
    format: 'Workshop',
    durationWeeks: 2,
    skillsCovered: ['Frontend Development', 'Version Control (Git)'],
    level: 'Intermediate',
  },
  {
    id: 'lp-4',
    title: 'Engineering Communication Mentorship',
    provider: 'Meridian Health',
    format: 'Mentorship',
    durationWeeks: 6,
    skillsCovered: ['Communication', 'Teamwork'],
    level: 'Beginner',
  },
]
