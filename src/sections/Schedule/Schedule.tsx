import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Calendar, AlertCircle } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SCHEDULE_CONFIG } from '@/config/schedule'
import { ScheduleDay } from './ScheduleDay'

export const Schedule: React.FC = () => {
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1)

  const activeDay =
    SCHEDULE_CONFIG.days.find((d) => d.dayNumber === activeDayNumber) ||
    SCHEDULE_CONFIG.days[0]

  return (
    <section
      id="schedule"
      aria-label="Event Schedule"
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden border-b border-[#59d6e8]/10 bg-[#0b1a30]"
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle 1px, rgba(89,214,232,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <Container size="default">
        <div className="relative z-10">
          <SectionHeading
            tag="TIMELINE & ITINERARY"
            title="24 Hours. Two Critical Days."
            subtitle="Milestones, mentor reviews, and pitch checkpoints throughout IDEA SPRINT 2026."
          />

          {/* Provisional notice */}
          {!SCHEDULE_CONFIG.isScheduleFinalized && (
            <div className="mb-8 p-3.5 bg-[#102b52] border border-[#ffc928]/20 rounded-lg flex items-center gap-3 text-xs font-mono text-[#ffc928]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                <strong>PROVISIONAL:</strong> Times are tentative. Final schedule drops closer to the event.
              </span>
            </div>
          )}

          {/* Day tabs */}
          <div className="inline-flex p-1 bg-[#102b52] border border-[#59d6e8]/15 rounded-xl mb-10">
            {SCHEDULE_CONFIG.days.map((day) => {
              const isActive = day.dayNumber === activeDayNumber
              return (
                <button
                  key={day.dayNumber}
                  type="button"
                  onClick={() => setActiveDayNumber(day.dayNumber)}
                  className={`relative px-5 py-2.5 sm:px-7 sm:py-3 font-mono text-xs sm:text-sm uppercase tracking-wider font-bold rounded-lg flex items-center gap-2 min-h-[44px] cursor-pointer transition-colors duration-200 ${
                    isActive ? 'text-[#102b52]' : 'text-[#6e94b8] hover:text-white'
                  }`}
                  aria-pressed={isActive}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#ffc928] rounded-lg"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Calendar className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{day.dayLabel}</span>
                </button>
              )
            })}
          </div>

          {/* Day content */}
          <AnimatePresence mode="wait">
            {activeDay && (
              <motion.div
                key={activeDay.dayNumber}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ScheduleDay day={activeDay} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}

export default Schedule
