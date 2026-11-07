import React, { useState, useRef, useEffect, useCallback } from 'react'
import { AlertCircle, Calendar, ArrowRight, Zap } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'
import { useCountdown } from '@/hooks/useCountdown'
import { EVENT_CONFIG } from '@/config/event'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

const CountdownDigit: React.FC<{
  readonly value: string
  readonly label: string
  readonly isPending: boolean
  readonly glitchSignal: number
  readonly glitchDelayMs: number
}> = ({ value, label, isPending, glitchSignal, glitchDelayMs }) => {
  const [scramble, setScramble] = useState<string | null>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<number | null>(null)

  // Clean up any interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Smooth number scramble on cursor touch / scroll entry - NO vibration, NO color change, perfectly steady
  const triggerScramble = useCallback(() => {
    if (isPending) return
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    let count = 0
    const maxCount = 10

    intervalRef.current = window.setInterval(() => {
      count++
      // Rapid clean 2-digit scramble in exact same original white font
      setScramble(Math.floor(Math.random() * 90 + 10).toString())

      if (count >= maxCount) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = null
        setScramble(null)
      }
    }, 45)
  }, [isPending])

  // Auto-trigger glitch when section enters viewport
  useEffect(() => {
    if (glitchSignal === 0 || isPending) return

    const timer = window.setTimeout(() => {
      triggerScramble()
    }, glitchDelayMs)

    return () => clearTimeout(timer)
  }, [glitchSignal, glitchDelayMs, isPending, triggerScramble])

  // Smooth 3D tilt following cursor (~11 deg: noticeable and tactile, but tasteful)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotX = Math.max(-11, Math.min(11, ((y - rect.height / 2) / (rect.height / 2)) * -11))
    const rotY = Math.max(-11, Math.min(11, ((x - rect.width / 2) / (rect.width / 2)) * 11))
    setTilt({ x: rotX, y: rotY })
  }

  const handleMouseEnter = () => {
    triggerScramble()
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const display = scramble ?? value
  const top = display[0] ?? '-'
  const bottom = display[1] ?? '-'

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={triggerScramble}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          triggerScramble()
        }
      }}
      aria-label={`${label}: ${value}`}
      className="flex flex-col items-center gap-2 sm:gap-3 group select-none cursor-pointer focus-visible:outline-none"
    >
      {/* Digit card with smooth 3D tilt + subtle refined cyan glow on hover */}
      <div
        className="relative w-[72px] sm:w-[100px] lg:w-[130px] h-[88px] sm:h-[120px] lg:h-[150px] rounded-lg sm:rounded-xl transition-all duration-200 ease-out group-hover:shadow-[0_0_22px_rgba(89,214,232,0.18)]"
        style={{
          transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.12s ease-out, box-shadow 0.3s ease-out',
        }}
      >
        {/* Top half */}
        <div className="absolute inset-x-0 top-0 h-[calc(50%-1px)] bg-gradient-to-b from-[#122d55] to-[#0f2445] rounded-t-lg sm:rounded-t-xl overflow-hidden border border-b-0 border-[#59d6e8]/15 group-hover:border-[#59d6e8]/45 transition-colors duration-200">
          <div className="absolute inset-0 flex items-end justify-center pb-0">
            <span
              className={`font-mono font-black text-5xl sm:text-7xl lg:text-8xl leading-none translate-y-[48%] ${
                isPending ? 'text-[#59d6e8]/30' : 'text-[#f5f7fa]'
              }`}
            >
              {top}{bottom}
            </span>
          </div>
        </div>

        {/* Center line */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-px h-[2px] z-10 bg-[#0a1a30]" />
        <div className="absolute left-0 top-1/2 -translate-y-px w-1.5 h-1.5 rounded-full bg-[#0a1a30] -translate-x-[3px] z-20 group-hover:bg-[#59d6e8]/60 transition-colors duration-200" />
        <div className="absolute right-0 top-1/2 -translate-y-px w-1.5 h-1.5 rounded-full bg-[#0a1a30] translate-x-[3px] z-20 group-hover:bg-[#59d6e8]/60 transition-colors duration-200" />

        {/* Bottom half */}
        <div className="absolute inset-x-0 bottom-0 h-[calc(50%-1px)] bg-gradient-to-b from-[#0d1f3d] to-[#0b1933] rounded-b-lg sm:rounded-b-xl overflow-hidden border border-t-0 border-[#59d6e8]/15 group-hover:border-[#59d6e8]/45 transition-colors duration-200">
          <div className="absolute inset-0 flex items-start justify-center pt-0">
            <span
              className={`font-mono font-black text-5xl sm:text-7xl lg:text-8xl leading-none -translate-y-[52%] ${
                isPending ? 'text-[#59d6e8]/30' : 'text-[#e8edf4]'
              }`}
            >
              {top}{bottom}
            </span>
          </div>
        </div>

        {/* Subtle inner ambient glow on hover */}
        {!isPending && (
          <div className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_20px_rgba(89,214,232,0.08)] pointer-events-none" />
        )}
      </div>

      {/* Label */}
      <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#7ba3c9] font-medium">
        {label}
      </span>
    </div>
  )
}

const ColonSeparator: React.FC = () => (
  <div
    className="h-[88px] sm:h-[120px] lg:h-[150px] flex flex-col items-center justify-center gap-3 sm:gap-4 lg:gap-5 px-0.5 sm:px-1 shrink-0 select-none"
    aria-hidden="true"
  >
    <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full bg-[#ffc928] shadow-[0_0_10px_rgba(255,201,40,0.9),0_0_20px_rgba(255,201,40,0.5)]" />
    <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full bg-[#ffc928] shadow-[0_0_10px_rgba(255,201,40,0.9),0_0_20px_rgba(255,201,40,0.5)]" />
  </div>
)

export const CountdownSection: React.FC = () => {
  const { days, hours, minutes, seconds, isPending, isCompleted } = useCountdown(
    EVENT_CONFIG.isDateAnnounced ? EVENT_CONFIG.startDate : null
  )
  const { scrollTo } = useSmoothScroll()
  const clockRef = useRef<HTMLDivElement>(null)
  const [glitchSignal, setGlitchSignal] = useState(0)
  const hasExitedRef = useRef(true)

  // IntersectionObserver attached directly to the clock container
  // Triggers glitch when the clock numbers enter the viewport (both scrolling forward & backward, desktop & mobile)
  useEffect(() => {
    const el = clockRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          if (hasExitedRef.current) {
            hasExitedRef.current = false
            setGlitchSignal((prev) => prev + 1)
          }
        } else if (!entry.isIntersecting || entry.intersectionRatio <= 0.05) {
          hasExitedRef.current = true
        }
      },
      {
        threshold: [0, 0.05, 0.3],
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const formatDigit = (value: number) => value.toString().padStart(2, '0')

  const timeUnits = [
    { label: 'Days', value: isPending ? '--' : formatDigit(days), delay: 0 },
    { label: 'Hours', value: isPending ? '--' : formatDigit(hours), delay: 40 },
    { label: 'Minutes', value: isPending ? '--' : formatDigit(minutes), delay: 80 },
    { label: 'Seconds', value: isPending ? '--' : formatDigit(seconds), delay: 120 },
  ]

  const handleRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollTo('#register')
  }

  return (
    <section
      id="countdown"
      aria-label="Event Countdown"
      className="relative py-16 sm:py-24 lg:py-28 border-b border-[#59d6e8]/15 bg-gradient-to-b from-[#0e264a] via-[#0c203d] to-[#0b1a30] overflow-hidden"
    >
      {/* ── Ambient Radial Atmosphere (Seamless Cyan & Gold Glows) ── */}
      <div
        className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[550px] sm:w-[700px] h-[350px] bg-[#59d6e8]/7 rounded-full blur-[130px] pointer-events-none transform-gpu"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-[500px] sm:w-[650px] h-[320px] bg-[#ffc928]/6 rounded-full blur-[130px] pointer-events-none transform-gpu"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-gradient-to-r from-[#59d6e8]/4 via-[#ffc928]/4 to-transparent rounded-full blur-[100px] pointer-events-none transform-gpu"
        aria-hidden="true"
      />

      <Container size="default">
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Section Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold tracking-wide uppercase mb-4 sm:mb-5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{isCompleted ? 'Sprint is Live' : isPending ? 'Date Pending' : 'Launching In'}</span>
          </div>

          {/* Big title */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#f5f7fa] mb-3 sm:mb-4 leading-[1.1]">
            {isCompleted ? (
              <>The Sprint is <span className="text-[#ffc928]">Live.</span></>
            ) : isPending ? (
              <>Stay <span className="text-[#59d6e8]">Tuned.</span></>
            ) : (
              <>Every Second <span className="text-[#ffc928]">Counts.</span></>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#8aacc8] max-w-md mb-8 sm:mb-12 leading-relaxed">
            {isCompleted
              ? 'The 24-hour innovation marathon has begun. Build, iterate, ship.'
              : isPending
              ? 'The official date is being finalized. Timer activates upon announcement.'
              : '24 hours of non-stop building. The clock is ticking.'}
          </p>

          {/* Flip-clock countdown - clean direct row, zero outer box */}
          <div
            ref={clockRef}
            className="flex items-start gap-2 sm:gap-4 lg:gap-5 mb-8 sm:mb-12"
          >
            <CountdownDigit
              value={timeUnits[0].value}
              label={timeUnits[0].label}
              isPending={isPending}
              glitchSignal={glitchSignal}
              glitchDelayMs={timeUnits[0].delay}
            />
            <ColonSeparator />
            <CountdownDigit
              value={timeUnits[1].value}
              label={timeUnits[1].label}
              isPending={isPending}
              glitchSignal={glitchSignal}
              glitchDelayMs={timeUnits[1].delay}
            />
            <ColonSeparator />
            <CountdownDigit
              value={timeUnits[2].value}
              label={timeUnits[2].label}
              isPending={isPending}
              glitchSignal={glitchSignal}
              glitchDelayMs={timeUnits[2].delay}
            />
            <ColonSeparator />
            <CountdownDigit
              value={timeUnits[3].value}
              label={timeUnits[3].label}
              isPending={isPending}
              glitchSignal={glitchSignal}
              glitchDelayMs={timeUnits[3].delay}
            />
          </div>

          {/* Date info / pending notice */}
          {isPending && (
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-[#c4daf2]/80 mb-8">
              <AlertCircle className="w-4 h-4 text-[#ffc928] shrink-0" />
              <span>Countdown initializes upon official date announcement.</span>
            </div>
          )}

          {!isPending && EVENT_CONFIG.startDate && (
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-[#8aacc8] mb-8">
              <Calendar className="w-4 h-4 text-[#ffc928]" />
              <span>
                {new Date(EVENT_CONFIG.startDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          )}

          {/* CTA */}
          <Button
            variant="primary"
            size="lg"
            href="#register"
            onClick={handleRegisterClick}
            rightIcon={
              <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
            }
            className="group relative overflow-hidden w-full sm:w-auto max-w-xs sm:max-w-none rounded-xs px-7 py-3.5 font-mono font-bold text-sm tracking-wider shadow-[0_0_20px_rgba(255,201,40,0.35)] hover:shadow-[0_0_35px_rgba(255,201,40,0.7)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent before:transition-transform before:duration-700 before:ease-out"
          >
            <span className="relative z-10 inline-block transition-transform duration-300 group-hover:scale-[1.02]">
              REGISTER YOUR SQUAD
            </span>
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default CountdownSection
