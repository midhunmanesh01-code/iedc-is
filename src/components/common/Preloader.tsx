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

    // Ending transition: fade preloader out
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, activeDuration)

    // Notify ready once the screen has cleared sufficiently (250ms into fade)
    const readyTimer = setTimeout(() => {
      onComplete?.()
    }, activeDuration + 250)

    const unmountTimer = setTimeout(() => {
      setIsUnmounted(true)
    }, activeDuration + 600)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(fadeTimer)
      clearTimeout(readyTimer)
      clearTimeout(unmountTimer)
    }
  }, [activeDuration, isUnmounted, onComplete])

  if (isUnmounted) return null

  return (
    <div
      role="status"
      aria-label="Loading IDEA SPRINT 2026"
      className={`fixed inset-0 w-full h-[100dvh] z-[9999] flex items-center justify-center bg-[#102b52] pointer-events-none select-none overflow-hidden touch-none overscroll-none transition-all duration-600 ease-out will-change-[transform,opacity] ${
        isFading ? 'opacity-0 scale-105 filter blur-xs' : 'opacity-100 scale-100'
      }`}
    >
      {/* Precision Blueprint Grid in Loader */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-40 pointer-events-none" aria-hidden="true" />

      {/* Fullscreen MagicRings Canvas with Blueprint Drafting Gold & Cyan Rings */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <MagicRings
          color="#ffc928"
          colorTwo="#59d6e8"
          ringCount={7}
          motion="pulse"
          speed={1.05}
          lineThickness={1.8}
          glow={1.3}
          baseRadius={0.4}
          radiusStep={0.075}
          expansion={0.06}
          taper={1.15}
          tilt={0}
          spin={0.1}
          dispersion={0}
          grain={0}
          opacity={0.92}
          interactive={false}
          followMouse={false}
          clickBurst={false}
          intro={true}
          theme="dark"
          maxDevicePixelRatio={1.5}
        />
      </div>

      {/* Center Vignette */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_35%,rgba(16,43,82,0.85)_100%)]"
        aria-hidden="true"
      />

      {/* Center Content: Balanced Orbitron Blueprint Branding */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4 max-w-[96vw]">
        <div
          className={`flex flex-col items-center justify-center text-center loader-glow-container transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isEntered
              ? 'opacity-100 scale-100 blur-0 translate-y-0'
              : 'opacity-0 scale-90 blur-sm translate-y-2'
          }`}
        >
          <span
            className="loader-text-shimmer text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.12em] sm:tracking-[0.14em] pl-[0.12em] sm:pl-[0.14em] leading-tight select-none whitespace-nowrap"
            style={{ fontFamily: '"Orbitron", sans-serif' }}
          >
            IDEA SPRINT
          </span>

          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffc928] via-[#ffd766] to-[#59d6e8] text-5xl sm:text-6xl md:text-7xl font-black tracking-[0.14em] sm:tracking-[0.16em] pl-[0.14em] sm:pl-[0.16em] drop-shadow-[0_0_30px_rgba(255,201,40,0.65)] mt-1.5 sm:mt-2 leading-none select-none whitespace-nowrap"
            style={{ fontFamily: '"Orbitron", sans-serif' }}
          >
            2026
          </span>

          <span className="font-mono text-xs uppercase tracking-widest text-[#59d6e8] mt-3">
            IEDC BOOTCAMP · CEC
          </span>
        </div>
      </div>
    </div>
  )
}

export default Preloader
