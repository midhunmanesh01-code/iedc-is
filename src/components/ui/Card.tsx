import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly hoverEffect?: boolean
  readonly withCrosshairs?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  withCrosshairs = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`relative bg-[#0F1217] border border-white/10 p-6 transition-all duration-200 ${
        hoverEffect ? 'hover:border-[#B8FF00]/40 hover:bg-[#141820]' : ''
      } ${className}`}
      {...props}
    >
      {/* Optional Technical Corner Crosshairs */}
      {withCrosshairs && (
        <>
          <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#B8FF00]/60 pointer-events-none" />
          <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#B8FF00]/60 pointer-events-none" />
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#B8FF00]/60 pointer-events-none" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#B8FF00]/60 pointer-events-none" />
        </>
      )}

      {children}
    </div>
  )
}
