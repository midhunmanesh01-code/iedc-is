import React from 'react'

export interface SectionHeadingProps {
  readonly tag?: string
  readonly title: string
  readonly subtitle?: string
  readonly align?: 'left' | 'center'
  readonly className?: string
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  tag,
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  const isCentered = align === 'center'

  return (
    <div className={`mb-8 sm:mb-12 md:mb-16 ${isCentered ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${className}`}>
      {tag && (
        <div className={`flex items-center gap-2 mb-2.5 sm:mb-3.5 ${isCentered ? 'justify-center' : ''}`}>
          <span className="inline-block w-2 h-2 bg-[#FF5500]" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5500] font-semibold">
            {tag}
          </span>
        </div>
      )}

      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display leading-[1.12]">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-400 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
