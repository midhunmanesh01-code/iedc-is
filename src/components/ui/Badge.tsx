import React from 'react'

export type BadgeVariant = 'accent' | 'neutral' | 'outline' | 'warning' | 'cyan'

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
    accent: 'bg-[#ffc928]/15 text-[#ffc928] border-[#ffc928]/40 font-semibold',
    cyan: 'bg-[#59d6e8]/15 text-[#59d6e8] border-[#59d6e8]/40 font-semibold',
    neutral: 'bg-[#102b52]/80 text-[#f5f7fa] border-[#59d6e8]/25',
    outline: 'bg-transparent text-[#59d6e8] border-[#59d6e8]/35',
    warning: 'bg-amber-500/15 text-[#ffc928] border-[#ffc928]/40',
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
