import React, { useEffect, useState } from 'react'

export interface PreloaderProps {
  readonly onComplete?: () => void
  readonly minDisplayTime?: number
}

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  minDisplayTime = 800,
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, minDisplayTime)

    const hideTimer = setTimeout(() => {
      setIsVisible(false)
      if (onComplete) {
        onComplete()
      }
    }, minDisplayTime + 400)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [minDisplayTime, onComplete])

  if (!isVisible) return null

  return (
    <div
      role="status"
      aria-label="Loading IDEA SPRINT 2026 experience"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08090A] transition-opacity duration-400 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Minimalist Tech Monogram / Pulse */}
        <div className="relative flex items-center justify-center w-16 h-16 border border-white/10 mb-6 bg-[#0F1217]">
          <div className="w-8 h-8 border border-[#B8FF00] animate-spin" style={{ animationDuration: '3s' }} />
          <span className="absolute font-mono text-xs font-bold text-[#B8FF00]">IS</span>
          {/* Decorative Corner Markers */}
          <span className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-[#B8FF00]" />
          <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-[#B8FF00]" />
        </div>

        <div className="text-center">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#B8FF00] mb-1 font-semibold">
            IEDC BOOTCAMP CEC
          </div>
          <div className="text-xl font-bold tracking-tight text-white font-['Space_Grotesk']">
            IDEA SPRINT 2026
          </div>
        </div>

        {/* Minimal Loading Bar */}
        <div className="w-48 h-0.5 bg-white/10 mt-6 overflow-hidden">
          <div className="w-full h-full bg-[#B8FF00] origin-left animate-pulse" />
        </div>
      </div>
    </div>
  )
}
