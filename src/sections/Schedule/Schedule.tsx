import React, { useState, useRef } from 'react'
import { Calendar, ChevronDown, Clock, Bell, ArrowRight } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SCHEDULE_CONFIG } from '@/config/schedule'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { ScheduleDay } from './ScheduleDay'

export const Schedule: React.FC = () => {
  const { scrollTo } = useSmoothScroll()

  // Track open state for Day 1 and Day 2 independently
  const [openDays, setOpenDays] = useState<Record<number, boolean>>({
    1: false,
    2: false,
  })

  // Refs for each card so closing keeps the viewport anchored on the Schedule
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)

  const toggleDay = (dayNumber: number) => {
    const isClosing = Boolean(openDays[dayNumber])
    const cardEl = dayNumber === 1 ? card1Ref.current : card2Ref.current

    // If closing from the header and user has scrolled down into the card,
    // anchor back to the card header smoothly
    if (isClosing && cardEl) {
      const rect = cardEl.getBoundingClientRect()
      if (rect.top < 80) {
        scrollTo(cardEl, -90)
      }
    }

    setOpenDays((prev) => ({
      ...prev,
      [dayNumber]: !prev[dayNumber],
    }))
  }

  // Smooth collapse from the bottom link: anchors viewport to card header and closes
  const handleBottomCollapse = (dayNumber: number) => {
    const cardEl = dayNumber === 1 ? card1Ref.current : card2Ref.current
    if (cardEl) {
      const rect = cardEl.getBoundingClientRect()
      if (rect.top < 80) {
        scrollTo(cardEl, -90)
      }
    }
    setOpenDays((prev) => ({ ...prev, [dayNumber]: false }))
  }

  const day1 = SCHEDULE_CONFIG.days[0]
  const day2 = SCHEDULE_CONFIG.days[1]

  return (
    <section
      id="schedule"
      aria-label="Event Schedule"
      className="py-16 sm:py-24 lg:py-32 relative border-b border-[#59d6e8]/15 bg-[#07101f] min-h-[580px]"
    >
      {/* Background Subtle Ambient Glows */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[400px] bg-[#59d6e8]/5 rounded-full blur-3xl pointer-events-none transform-gpu"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[350px] bg-[#ffc928]/5 rounded-full blur-3xl pointer-events-none transform-gpu"
        aria-hidden="true"
      />

      <Container size="default">
        {/* ── Centered Section Header ── */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-14 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold tracking-wide uppercase">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>EVENT TIMELINE</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Two Days. 24 Hours.
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
            Milestones, mentor checkpoints, and stage presentations throughout the sprint at College of Engineering Chengannur.
          </p>
        </div>

        {/* ── Desktop: Day 1 on Left, Day 2 on Right (Side by Side) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-start relative z-10 max-w-5xl mx-auto">
          {[day1, day2].map((day) => {
            if (!day) return null
            const isOpen = Boolean(openDays[day.dayNumber])
            const cardRef = day.dayNumber === 1 ? card1Ref : card2Ref

            const previewHighlights =
              day.dayNumber === 1
                ? ['Check-in', '24H Sprint Start', 'Mentorship Reviews']
                : ['Breakfast', 'Code Freeze', 'Stage Pitches']

            return (
              <div
                key={day.dayNumber}
                ref={cardRef}
                className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0c182c] border-amber-400/40 shadow-xl shadow-black/40'
                    : 'bg-[#091426]/85 border-slate-800/90 hover:border-slate-700/80 hover:bg-[#0b172a]'
                }`}
              >
                {/* ── Notification Trigger Header ── */}
                <button
                  type="button"
                  onClick={() => toggleDay(day.dayNumber)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 select-none"
                >
                  {/* Top Notification Bar */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 shrink-0">
                        <Bell className="w-3 h-3 text-amber-400" />
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-amber-300">
                        {day.dayLabel} Schedule
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5 shrink-0">
                      {day.dateLabel}
                    </span>
                  </div>

                  {/* Main Theme & Timing */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {day.theme}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{day.timeRange}</span>
                      </div>
                    </div>

                    {/* Smooth Rotating Chevron Indicator */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen
                          ? 'bg-amber-400 text-slate-950 shadow-[0_0_12px_rgba(255,201,40,0.35)] rotate-180'
                          : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white rotate-0'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Collapsed Highlights Preview Strip */}
                  {!isOpen && (
                    <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1.5 overflow-hidden pr-2">
                        {previewHighlights.map((hl, hIdx) => (
                          <span
                            key={hIdx}
                            className="inline-flex items-center text-[11px] font-mono text-slate-300 bg-white/[0.03] px-2 py-0.5 rounded border border-white/5 whitespace-nowrap"
                          >
                            {hl}
                          </span>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-1 text-amber-300 font-mono text-[11px] font-semibold shrink-0 group-hover:translate-x-0.5 transition-transform">
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  )}
                </button>

                {/* ── Refined Hardware-Accelerated Expansion & Dissolve on Close ── */}
                <div
                  className="grid overflow-hidden"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: isOpen
                      ? 'grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                      : 'grid-template-rows 0.28s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div
                      className={`p-4 sm:p-5 pt-3 border-t border-white/[0.08] ${
                        isOpen
                          ? 'opacity-100 translate-y-0 transition-all duration-300 delay-75 ease-out'
                          : 'opacity-0 -translate-y-2 transition-all duration-150 ease-in pointer-events-none'
                      }`}
                    >
                      <ScheduleDay day={day} />

                      {/* Bottom Collapse Button */}
                      <div className="pt-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleBottomCollapse(day.dayNumber)}
                          className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-amber-300 transition-colors cursor-pointer py-1 px-3 rounded-full hover:bg-white/5"
                        >
                          <span>Collapse {day.dayLabel}</span>
                          <span>↑</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default Schedule
