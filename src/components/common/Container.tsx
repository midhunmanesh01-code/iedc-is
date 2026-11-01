import React from 'react'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly size?: 'default' | 'narrow' | 'wide' | 'full'
  readonly withBorder?: boolean
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'default',
  withBorder = false,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1400px]',
    full: 'max-w-full',
  }

  return (
    <div
      className={`mx-auto px-4 sm:px-6 lg:px-8 w-full ${sizeClasses[size]} ${
        withBorder ? 'border-x border-white/5' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
