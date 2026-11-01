import React, { useEffect, useState } from 'react'
import { MagicRings } from '@/components/ui/MagicRings'

export interface PreloaderProps {
  readonly onComplete?: () => void
  /** Total animation duration in ms before exit transition starts (default: 1800ms) */
  readonly duration?: number
  /** Legacy alias for duration */
  readonly minDisplayTime?: number
}

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  duration,
  minDisplayTime = 1800,
}) => {
  const activeDuration = duration ?? minDisplayTime

  const [isUnmounted, setIsUnmounted] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })

  const [isEntered, setIsEntered] = useState(false)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    if (isUnmounted) {
      onComplete?.()
      return
    }

    // Trigger initial entrance transition
    const enterTimer = setTimeout(() => {
      setIsEntered(true)
    }, 60)

    // Ending transition (untouched)
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, activeDuration)

    const unmountTimer = setTimeout(() => {
      setIsUnmounted(true)
      onComplete?.()
    }, activeDuration + 600)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(fadeTimer)
      clearTimeout(unmountTimer)
    }
  }, [activeDuration, isUnmounted, onComplete])

  if (isUnmounted) return null

  return (
    <div
      role="status"
      aria-label="Loading IDEA SPRINT 2026"
      className={`fixed inset-0 w-full h-[100dvh] z-[9999] flex items-center justify-center bg-[#0C0D0E] pointer-events-none select-none overflow-hidden touch-none overscroll-none transition-all duration-600 ease-out will-change-[transform,opacity] ${
        isFading ? 'opacity-0 scale-105 filter blur-xs' : 'opacity-100 scale-100'
      }`}
    >
      {/* Fullscreen MagicRings Canvas with Luminous Solar Amber Rings */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <MagicRings
          color="#FFD166"
          colorTwo="#FF9E2C"
          ringCount={7}
          motion="pulse"
          speed={1.05}
          lineThickness={1.8}
          glow={1.3}
          baseRadius={0.40}
          radiusStep={0.075}
          expansion={0.06}
          taper={1.15}
          tilt={0}
          spin={0.10}
          dispersion={0}
          grain={0}
          opacity={0.94}
          interactive={false}
          followMouse={false}
          clickBurst={false}
          intro={true}
          theme="dark"
          maxDevicePixelRatio={1.5}
        />
      </div>

      {/* Subtle Cinematic Vignette for Center Contrast */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(12,13,14,0.7)_100%)]"
        aria-hidden="true"
      />

      {/* Center Content: Optically Balanced for Mobile & Desktop in Orbitron */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4 max-w-[90vw]">
        <div
          className={`flex flex-col items-center justify-center text-center loader-glow-container transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isEntered
              ? 'opacity-100 scale-100 blur-0 translate-y-0'
              : 'opacity-0 scale-90 blur-sm translate-y-2'
          }`}
        >
          {/* IDEA SPRINT with calibrated mobile sizing and optical centering */}
          <span
            className="loader-text-shimmer text-xl xs:text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-[0.16em] pl-[0.16em] leading-tight select-none"
            style={{ fontFamily: '"Orbitron", sans-serif' }}
          >
            IDEA SPRINT
          </span>

          {/* 2026 in luminous warm gold-to-amber transition */}
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] via-[#FFB800] to-[#FFD54F] text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-black tracking-[0.2em] pl-[0.2em] drop-shadow-[0_0_30px_rgba(255,184,0,0.65)] mt-1.5 sm:mt-2 leading-none select-none"
            style={{ fontFamily: '"Orbitron", sans-serif' }}
          >
            2026
          </span>
        </div>
      </div>
    </div>
  )
}

export default Preloader
