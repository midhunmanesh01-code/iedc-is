import React, { useState } from 'react'
import { Calendar, AlertCircle } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SCHEDULE_CONFIG } from '@/config/schedule'
import { ScheduleDay } from './ScheduleDay'

export const Schedule: React.FC = () => {
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1)

  const activeDay = SCHEDULE_CONFIG.days.find((d) => d.dayNumber === activeDayNumber) || SCHEDULE_CONFIG.days[0]

  return (
    <section
      id="schedule"
      aria-label="Event Schedule"
      className="py-16 sm:py-20 lg:py-28 relative border-b border-white/5 bg-[#0C0D0E]"
    >
      <Container size="default">
        <SectionHeading
          tag="02 // TIMELINE & ITINERARY"
          title="24 Hours. Two Critical Days."
          subtitle="A synchronized breakdown of milestones, mentor reviews, and pitch checkpoints throughout IDEA SPRINT 2026."
        />

        {/* Provisional Status Notice */}
        {!SCHEDULE_CONFIG.isScheduleFinalized && (
          <div className="mb-8 p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xs flex items-center gap-3 text-amber-200 text-xs font-mono">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>PROVISIONAL TIMELINE:</strong> Slot hours and stage distribution represent the provisional sprint schedule. Official timestamps will synchronize closer to event date.
            </span>
          </div>
        )}

        {/* Day Selector Tabs (Native Mobile Segmented Control) */}
        <div className="p-1 bg-[#131518] border border-white/10 rounded-xl grid grid-cols-2 sm:inline-flex sm:w-auto gap-1 mb-8 max-w-md">
          {SCHEDULE_CONFIG.days.map((day) => {
            const isActive = day.dayNumber === activeDayNumber

            return (
              <button
                key={day.dayNumber}
                type="button"
                onClick={() => setActiveDayNumber(day.dayNumber)}
                className={`relative px-4 py-2.5 sm:px-6 font-mono text-xs sm:text-sm uppercase tracking-wider font-bold transition-all duration-200 rounded-lg focus-visible:outline-2 focus-visible:outline-[#FF5500] flex items-center justify-center gap-2 min-h-[44px] active:scale-[0.98] ${
                  isActive
                    ? 'bg-[#FF5500] text-white shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
                aria-pressed={isActive}
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>{day.dayLabel}</span>
              </button>
            )
          })}
        </div>

        {/* Day Content */}
        {activeDay && <ScheduleDay day={activeDay} />}
      </Container>
    </section>
  )
}
