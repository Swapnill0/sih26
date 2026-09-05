import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const VARIANT_STYLES: Record<Variant, string> = {
  primary: 'bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700',
  secondary: 'bg-transparent text-ink border border-line-strong hover:border-ink hover:bg-paper-sunken',
  ghost: 'bg-transparent text-ink-soft hover:bg-paper-sunken hover:text-ink',
  danger: 'bg-rose-500 text-white hover:bg-rose-600',
}

const SIZE_STYLES: Record<Size, string> = {
  sm: 'text-sm px-3 py-1.5 gap-1.5',
  md: 'text-sm px-4 py-2.5 gap-2',
  lg: 'text-base px-5 py-3 gap-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded font-medium transition-colors',
          'disabled:cursor-not-allowed disabled:opacity-50',
          VARIANT_STYLES[variant],
          SIZE_STYLES[size],
          className,
        )}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'
