import React from 'react'
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
}> = ({ value, label, isPending }) => {
  const top = value[0] ?? '-'
  const bottom = value[1] ?? '-'

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      {/* Digit card */}
      <div className="relative w-[72px] sm:w-[100px] lg:w-[130px] h-[88px] sm:h-[120px] lg:h-[150px]">
        {/* Top half */}
        <div className="absolute inset-x-0 top-0 h-[calc(50%-1px)] bg-gradient-to-b from-[#122d55] to-[#0f2445] rounded-t-lg sm:rounded-t-xl overflow-hidden border border-b-0 border-[#59d6e8]/15">
          <div className="absolute inset-0 flex items-end justify-center pb-0">
            <span className={`font-mono font-black text-5xl sm:text-7xl lg:text-8xl leading-none translate-y-[48%] ${isPending ? 'text-[#59d6e8]/30' : 'text-[#f5f7fa]'} transition-colors`}>
              {top}{bottom}
            </span>
          </div>
        </div>

        {/* Center line */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-px h-[2px] z-10 bg-[#0a1a30]" />
        <div className="absolute left-0 top-1/2 -translate-y-px w-1.5 h-1.5 rounded-full bg-[#0a1a30] -translate-x-[3px] z-20" />
        <div className="absolute right-0 top-1/2 -translate-y-px w-1.5 h-1.5 rounded-full bg-[#0a1a30] translate-x-[3px] z-20" />

        {/* Bottom half */}
        <div className="absolute inset-x-0 bottom-0 h-[calc(50%-1px)] bg-gradient-to-b from-[#0d1f3d] to-[#0b1933] rounded-b-lg sm:rounded-b-xl overflow-hidden border border-t-0 border-[#59d6e8]/15">
          <div className="absolute inset-0 flex items-start justify-center pt-0">
            <span className={`font-mono font-black text-5xl sm:text-7xl lg:text-8xl leading-none -translate-y-[52%] ${isPending ? 'text-[#59d6e8]/30' : 'text-[#e8edf4]'} transition-colors`}>
              {top}{bottom}
            </span>
          </div>
        </div>

        {/* Inner glow when active */}
        {!isPending && (
          <div className="absolute inset-0 rounded-lg sm:rounded-xl shadow-[inset_0_0_30px_rgba(89,214,232,0.06)] pointer-events-none" />
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
  <div className="flex flex-col items-center gap-2.5 sm:gap-3.5 pt-4 sm:pt-6 lg:pt-8 self-start">
    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ffc928] shadow-[0_0_10px_rgba(255,201,40,0.5)] animate-pulse" />
    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ffc928] shadow-[0_0_10px_rgba(255,201,40,0.5)] animate-pulse" />
  </div>
)

export const CountdownSection: React.FC = () => {
  const { days, hours, minutes, seconds, isPending, isCompleted } = useCountdown(
    EVENT_CONFIG.isDateAnnounced ? EVENT_CONFIG.startDate : null
  )
  const { scrollTo } = useSmoothScroll()

  const formatDigit = (value: number) => value.toString().padStart(2, '0')

  const timeUnits = [
    { label: 'Days', value: isPending ? '--' : formatDigit(days) },
    { label: 'Hours', value: isPending ? '--' : formatDigit(hours) },
    { label: 'Minutes', value: isPending ? '--' : formatDigit(minutes) },
    { label: 'Seconds', value: isPending ? '--' : formatDigit(seconds) },
  ]

  const handleRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollTo('#register')
  }

  return (
    <section
      id="countdown"
      aria-label="Event Countdown"
      className="relative py-20 sm:py-28 lg:py-36 border-b border-[#59d6e8]/10 bg-[#0a1628] overflow-hidden"
    >
      {/* Subtle radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(89,214,232,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Gold accent line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#ffc928]/60 to-transparent" aria-hidden="true" />

      <Container size="default">
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Minimal tag */}
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <Zap className="w-3.5 h-3.5 text-[#ffc928]" />
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#ffc928] font-bold">
              {isCompleted ? 'Sprint is Live' : isPending ? 'Date Pending' : 'Launching In'}
            </span>
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

          <p className="text-sm sm:text-base text-[#8aacc8] max-w-md mb-10 sm:mb-14 leading-relaxed">
            {isCompleted
              ? 'The 24-hour innovation marathon has begun. Build, iterate, ship.'
              : isPending
              ? 'The official date is being finalized. Timer activates upon announcement.'
              : '24 hours of non-stop building. The clock is ticking.'}
          </p>

          {/* Flip-clock style countdown */}
          <div className="flex items-start gap-2 sm:gap-4 lg:gap-5 mb-10 sm:mb-14">
            <CountdownDigit value={timeUnits[0].value} label={timeUnits[0].label} isPending={isPending} />
            <ColonSeparator />
            <CountdownDigit value={timeUnits[1].value} label={timeUnits[1].label} isPending={isPending} />
            <ColonSeparator />
            <CountdownDigit value={timeUnits[2].value} label={timeUnits[2].label} isPending={isPending} />
            <ColonSeparator />
            <CountdownDigit value={timeUnits[3].value} label={timeUnits[3].label} isPending={isPending} />
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
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Register Your Squad
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default CountdownSection
