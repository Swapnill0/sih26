import { type HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Tone = 'neutral' | 'teal' | 'gold' | 'rose'

const TONE_STYLES: Record<Tone, string> = {
  neutral: 'bg-paper-sunken text-ink-soft border-line',
  teal: 'bg-teal-50 text-teal-700 border-teal-100',
  gold: 'bg-gold-50 text-gold-600 border-gold-100',
  rose: 'bg-rose-50 text-rose-600 border-rose-100',
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

export function Badge({ className, tone = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium',
        TONE_STYLES[tone],
        className,
      )}
      {...props}
    />
  )
}
