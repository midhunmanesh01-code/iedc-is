import React from 'react'
import { Clock, AlertCircle, Calendar, ArrowRight } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/common/Button'
import { useCountdown } from '@/hooks/useCountdown'
import { EVENT_CONFIG } from '@/config/event'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

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
      className="relative py-16 sm:py-20 lg:py-24 border-b border-[#59d6e8]/20 bg-[#0d1e38] overflow-hidden rounded-t-[32px] sm:rounded-t-[48px] border-t border-[#59d6e8]/30 shadow-[0_-30px_70px_rgba(0,0,0,0.9)]"
    >
      {/* Background Technical Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-[0.06] pointer-events-none" aria-hidden="true" />

      {/* Ambient Radial Accent Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-r from-[#ffc928]/8 via-[#59d6e8]/6 to-transparent blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default">
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Section Heading */}
          <SectionHeading
            tag="OFFICIAL TIMELOCK"
            title="Countdown to Launch."
            subtitle="The 24-hour innovation clock is synchronized with the official kickoff. Stay primed for deployment."
            align="center"
            className="mb-8 sm:mb-10"
          />

          {/* Status Badge Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-4 py-2 mb-6 sm:mb-8 bg-[#163866]/80 border border-[#59d6e8]/30 rounded-full font-mono text-xs shadow-md">
            <div className="flex items-center gap-2">
              {isPending ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#ffc928] animate-pulse shadow-[0_0_8px_#ffc928]" />
                  <span className="uppercase tracking-widest text-[#ffc928] font-semibold">
                    Official Date TBA // Timer Standby
                  </span>
                </>
              ) : isCompleted ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#ffc928] animate-ping" />
                  <span className="uppercase tracking-widest text-[#ffc928] font-bold">
                    Sprint Active // 24H Clock Running
                  </span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#59d6e8] animate-pulse shadow-[0_0_8px_#59d6e8]" />
                  <span className="uppercase tracking-widest text-[#59d6e8] font-semibold">
                    T-Minus to Sprint Kickoff
                  </span>
                </>
              )}
            </div>

            <span className="text-[#59d6e8]/30 hidden sm:inline">|</span>

            <div className="flex items-center gap-1.5 text-[#59d6e8]">
              <Clock className="w-3.5 h-3.5" />
              <span className="tracking-wider">24H TIMELOCK</span>
            </div>
          </div>

          {/* Large Technical Countdown Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 w-full mb-6">
            {timeUnits.map((unit) => (
              <div
                key={unit.label}
                className="relative group p-5 sm:p-7 lg:p-8 bg-[#163866]/70 border border-[#59d6e8]/30 hover:border-[#ffc928]/60 rounded-xl transition-all duration-300 shadow-xl shadow-black/30 flex flex-col items-center justify-center transform-gpu hover:-translate-y-1"
              >
                {/* Corner Technical Accent Marks */}
                <span className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#ffc928]/60 group-hover:border-[#ffc928] transition-colors" />
                <span className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#ffc928]/60 group-hover:border-[#ffc928] transition-colors" />
                <span className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#ffc928]/60 group-hover:border-[#ffc928] transition-colors" />
                <span className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#ffc928]/60 group-hover:border-[#ffc928] transition-colors" />

                {/* Numerical Digits */}
                <div className="font-mono text-4xl sm:text-5xl lg:text-6xl font-black text-white group-hover:text-[#ffc928] tracking-tight transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                  {unit.value}
                </div>

                {/* Unit Label */}
                <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#a0c4e8] mt-2 group-hover:text-white transition-colors">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>

          {/* Explanatory notice when date is pending */}
          {isPending && (
            <div className="flex items-center justify-center gap-2.5 text-xs sm:text-sm font-mono text-[#c4daf2] bg-[#163866]/60 border border-[#59d6e8]/30 px-4 py-2.5 rounded-lg max-w-xl mx-auto shadow-sm">
              <AlertCircle className="w-4 h-4 text-[#ffc928] shrink-0" />
              <span>
                Target schedule is under final review by IEDC CEC. Countdown initializes upon date announcement.
              </span>
            </div>
          )}

          {!isPending && EVENT_CONFIG.startDate && (
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono text-zinc-300 bg-[#163866]/60 border border-[#59d6e8]/30 px-4 py-2.5 rounded-lg">
              <Calendar className="w-4 h-4 text-[#ffc928]" />
              <span>Sprint Date: {new Date(EVENT_CONFIG.startDate).toLocaleDateString()}</span>
            </div>
          )}

          {/* Action CTA below countdown */}
          <div className="mt-8 flex justify-center">
            <Button
              variant="primary"
              size="md"
              href="#register"
              onClick={handleRegisterClick}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="!rounded-md px-6 py-2.5 font-mono text-xs uppercase tracking-wider font-bold"
            >
              REGISTER YOUR SQUAD &gt;
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default CountdownSection
