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
      className="py-20 lg:py-28 relative border-b border-white/5 bg-[#08090A]"
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

        {/* Day Selector Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4">
          {SCHEDULE_CONFIG.days.map((day) => {
            const isActive = day.dayNumber === activeDayNumber

            return (
              <button
                key={day.dayNumber}
                type="button"
                onClick={() => setActiveDayNumber(day.dayNumber)}
                className={`relative px-5 py-2.5 font-mono text-xs sm:text-sm uppercase tracking-wider font-semibold transition-all duration-200 border rounded-xs focus-visible:outline-2 focus-visible:outline-[#B8FF00] ${
                  isActive
                    ? 'bg-[#B8FF00] text-black border-[#B8FF00]'
                    : 'bg-[#0F1217] text-slate-300 border-white/10 hover:border-white/20 hover:text-white'
                }`}
                aria-pressed={isActive}
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{day.dayLabel}</span>
                </span>
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
