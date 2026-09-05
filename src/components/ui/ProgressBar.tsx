import { cn } from '../../lib/cn'

interface ProgressBarProps {
  value: number // 0-100
  className?: string
  tone?: 'teal' | 'gold'
  label?: string
}

export function ProgressBar({ value, className, tone = 'teal', label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="mb-1 flex items-center justify-between text-xs text-ink-soft">
          <span>{label}</span>
          <span className="tabular-nums">{clamped}%</span>
        </div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-paper-sunken">
        <div
          className={cn('h-full rounded-full', tone === 'teal' ? 'bg-teal-500' : 'bg-gold-500')}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
