import type { LucideIcon } from 'lucide-react'
import { Card } from './Card'
import { cn } from '../../lib/cn'

interface StatCardProps {
  label: string
  value: string
  hint?: string
  icon?: LucideIcon
  tone?: 'teal' | 'gold' | 'neutral'
}

const TONE_ICON: Record<NonNullable<StatCardProps['tone']>, string> = {
  teal: 'text-teal-600 bg-teal-50',
  gold: 'text-gold-600 bg-gold-50',
  neutral: 'text-ink-soft bg-paper-sunken',
}

export function StatCard({ label, value, hint, icon: Icon, tone = 'neutral' }: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-ink-faint">{label}</p>
          <p className="mt-1.5 font-display text-3xl text-ink">{value}</p>
          {hint && <p className="mt-1 text-xs text-ink-faint">{hint}</p>}
        </div>
        {Icon && (
          <div className={cn('rounded-md p-2', TONE_ICON[tone])}>
            <Icon size={18} strokeWidth={2} />
          </div>
        )}
      </div>
    </Card>
  )
}
