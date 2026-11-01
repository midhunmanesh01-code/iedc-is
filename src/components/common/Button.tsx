import React from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface BaseButtonProps {
  readonly variant?: ButtonVariant
  readonly size?: ButtonSize
  readonly leftIcon?: React.ReactNode
  readonly rightIcon?: React.ReactNode
  readonly isLoading?: boolean
  readonly disabled?: boolean
  readonly className?: string
  readonly children?: React.ReactNode
}

export type ButtonProps = BaseButtonProps & (
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & {
      readonly href?: undefined
      readonly onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      readonly href: string
      readonly onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
    })
)

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  leftIcon,
  rightIcon,
  isLoading = false,
  className = '',
  disabled,
  onClick,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-mono font-medium tracking-wide uppercase transition-all duration-200 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5500] disabled:cursor-not-allowed disabled:opacity-50'

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 rounded-xs tracking-wider',
    md: 'text-xs md:text-sm px-5 py-2.5 gap-2 rounded-xs tracking-wider',
    lg: 'text-sm md:text-base px-7 py-3.5 gap-2.5 rounded-xs tracking-wider font-semibold',
  }

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-[#FF5500] text-white font-semibold hover:bg-[#FF6B1A] active:translate-y-[1px] shadow-[0_0_18px_rgba(255,85,0,0.35)] hover:shadow-[0_0_26px_rgba(255,85,0,0.5)]',
    secondary:
      'bg-[#131518] text-white border border-white/10 hover:border-[#FF5500]/50 hover:bg-[#1A1D22] active:translate-y-[1px]',
    outline:
      'bg-transparent text-[#FF5500] border border-[#FF5500]/60 hover:bg-[#FF5500] hover:text-white active:translate-y-[1px]',
    ghost:
      'bg-transparent text-slate-300 hover:text-[#FF5500] hover:bg-white/5 active:translate-y-[1px]',
  }

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

  const content = (
    <>
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </>
  )

  if (href !== undefined) {
    const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a
        href={href}
        className={combinedClasses}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={onClick as (e: React.MouseEvent<HTMLAnchorElement>) => void}
        {...anchorProps}
      >
        {content}
      </a>
    )
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      onClick={onClick as (e: React.MouseEvent<HTMLButtonElement>) => void}
      {...buttonProps}
    >
      {content}
    </button>
  )
}
