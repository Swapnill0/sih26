import type { SkillProfile, SkillScore } from '../../../types/domain'
import { ASSESSMENT_QUESTIONS, INDUSTRY_DEMAND } from './questions'

/** answers: questionId -> 1..5 self rating */
export function buildSkillProfile(studentId: string, answers: Record<string, number>): SkillProfile {
  const scores: SkillScore[] = ASSESSMENT_QUESTIONS.map((q) => ({
    skill: q.skill,
    category: q.category,
    score: Math.round(((answers[q.id] ?? 3) / 5) * 100),
    industryDemand: INDUSTRY_DEMAND[q.skill] ?? 70,
  }))

  const ranked = [...scores].sort((a, b) => b.score - a.score)
  const strengths = ranked.slice(0, 3).map((s) => s.skill)

  const gaps = [...scores]
    .filter((s) => s.industryDemand - s.score >= 15)
    .sort((a, b) => b.industryDemand - b.score - (a.industryDemand - a.score))
    .map((s) => s.skill)

  const recommendedRoles = deriveRoles(scores)

  return {
    studentId,
    generatedOn: new Date().toISOString(),
    scores,
    strengths,
    gaps: gaps.length ? gaps : ranked.slice(-2).map((s) => s.skill),
    recommendedRoles,
  }
}

function deriveRoles(scores: SkillScore[]): string[] {
  const byName = Object.fromEntries(scores.map((s) => [s.skill, s.score]))
  const roles: { role: string; weight: number }[] = [
    { role: 'Software Development Intern', weight: (byName['Data Structures & Algorithms'] ?? 0) + (byName['Version Control (Git)'] ?? 0) },
    { role: 'Data Analyst Trainee', weight: (byName['SQL & Databases'] ?? 0) * 1.5 },
    { role: 'Frontend Engineer Intern', weight: (byName['Frontend Development'] ?? 0) * 1.5 },
    { role: 'Cloud & DevOps Intern', weight: (byName['Cloud Fundamentals'] ?? 0) * 1.5 },
    { role: 'Product Associate', weight: ((byName['Communication'] ?? 0) + (byName['Problem Solving'] ?? 0)) },
  ]
  return roles
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map((r) => r.role)
}
