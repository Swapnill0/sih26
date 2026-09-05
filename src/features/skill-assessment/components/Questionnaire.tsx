import { useState } from 'react'
import { ASSESSMENT_QUESTIONS } from '../data/questions'
import { buildSkillProfile } from '../data/scoring'
import { Button, ProgressBar } from '../../../components/ui'
import { useSkillProfileStore } from '../../../store/skillProfileStore'
import { useAuthStore } from '../../../store/authStore'
import { cn } from '../../../lib/cn'

const RATING_LABELS = ['Not confident', 'Basic', 'Comfortable', 'Strong', 'Expert']

export function Questionnaire() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const setProfile = useSkillProfileStore((s) => s.setProfile)
  const user = useAuthStore((s) => s.user)

  const question = ASSESSMENT_QUESTIONS[step]
  const isLast = step === ASSESSMENT_QUESTIONS.length - 1
  const progress = Math.round(((step + (answers[question.id] ? 1 : 0)) / ASSESSMENT_QUESTIONS.length) * 100)

  function selectRating(value: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
  }

  function next() {
    if (isLast) {
      const profile = buildSkillProfile(user?.id ?? 'demo-student', answers)
      setProfile(profile)
      return
    }
    setStep((s) => s + 1)
  }

  return (
    <div className="max-w-xl">
      <ProgressBar value={progress} label={`Question ${step + 1} of ${ASSESSMENT_QUESTIONS.length}`} />

      <div className="mt-8">
        <p className="text-xs font-medium uppercase tracking-wide text-teal-600">{question.category === 'technical' ? 'Technical skill' : 'Soft skill'}</p>
        <h2 className="mt-1.5 font-display text-xl text-ink">{question.skill}</h2>
        <p className="mt-2 text-ink-soft">{question.prompt}</p>

        <div className="mt-6 space-y-2">
          {RATING_LABELS.map((label, i) => {
            const value = i + 1
            const selected = answers[question.id] === value
            return (
              <button
                key={value}
                onClick={() => selectRating(value)}
                className={cn(
                  'flex w-full items-center justify-between rounded border px-4 py-3 text-left text-sm transition-colors',
                  selected ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-line-strong text-ink hover:border-ink',
                )}
              >
                {label}
                <span className={cn('text-xs', selected ? 'text-teal-600' : 'text-ink-faint')}>{value}/5</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Button variant="ghost" size="sm" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
          Back
        </Button>
        <Button size="sm" disabled={!answers[question.id]} onClick={next}>
          {isLast ? 'See my skill profile' : 'Next'}
        </Button>
      </div>
    </div>
  )
}
