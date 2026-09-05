import { Questionnaire } from '../../features/skill-assessment/components/Questionnaire'
import { SkillProfileResults } from '../../features/skill-assessment/components/SkillProfileResults'
import { useSkillProfileStore } from '../../store/skillProfileStore'

export function SkillAssessmentPage() {
  const profile = useSkillProfileStore((s) => s.profile)

  return (
    <div>
      {!profile ? (
        <>
          <p className="mb-8 max-w-prose text-ink-soft">
            Answer eight quick questions. We'll generate a skill profile — strengths, gaps against
            current industry demand, and roles worth applying to first.
          </p>
          <Questionnaire />
        </>
      ) : (
        <SkillProfileResults profile={profile} />
      )}
    </div>
  )
}
