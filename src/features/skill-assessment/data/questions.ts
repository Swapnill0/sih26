export type QuestionCategory = 'technical' | 'soft'

export interface AssessmentQuestion {
  id: string
  skill: string
  category: QuestionCategory
  prompt: string
}

/**
 * A short questionnaire standing in for the real assessment engine.
 * Each answer is a 1–5 self-rating that later gets scaled to a 0–100 skill score.
 */
export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  { id: 'q1', skill: 'Data Structures & Algorithms', category: 'technical', prompt: 'I can choose an appropriate data structure and explain its time complexity.' },
  { id: 'q2', skill: 'Version Control (Git)', category: 'technical', prompt: 'I can manage branches, resolve merge conflicts, and review a pull request.' },
  { id: 'q3', skill: 'SQL & Databases', category: 'technical', prompt: 'I can write joins, aggregations, and design a normalized schema.' },
  { id: 'q4', skill: 'Cloud Fundamentals', category: 'technical', prompt: 'I understand core cloud services (compute, storage, deployment basics).' },
  { id: 'q5', skill: 'Frontend Development', category: 'technical', prompt: 'I can build a responsive, accessible UI with a modern framework.' },
  { id: 'q6', skill: 'Communication', category: 'soft', prompt: 'I can explain a technical decision clearly to a non-technical audience.' },
  { id: 'q7', skill: 'Teamwork', category: 'soft', prompt: 'I collaborate effectively in cross-functional, deadline-driven teams.' },
  { id: 'q8', skill: 'Problem Solving', category: 'soft', prompt: 'I break ambiguous problems into a workable plan before coding.' },
]

/** Current market weight for each skill, used to compute gaps (0–100). */
export const INDUSTRY_DEMAND: Record<string, number> = {
  'Data Structures & Algorithms': 88,
  'Version Control (Git)': 82,
  'SQL & Databases': 79,
  'Cloud Fundamentals': 85,
  'Frontend Development': 74,
  Communication: 90,
  Teamwork: 86,
  'Problem Solving': 92,
}
