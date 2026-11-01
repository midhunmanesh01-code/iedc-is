import React from 'react'

export type BadgeVariant = 'accent' | 'neutral' | 'outline' | 'warning'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  readonly variant?: BadgeVariant
  readonly icon?: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  icon,
  className = '',
  ...props
}) => {
  const variantClasses: Record<BadgeVariant, string> = {
    accent: 'bg-[#FF5500]/15 text-[#FF5500] border-[#FF5500]/35 font-semibold',
    neutral: 'bg-white/5 text-slate-300 border-white/10',
    outline: 'bg-transparent text-slate-400 border-white/15',
    warning: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase tracking-wider border rounded-xs ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </span>
  )
}
