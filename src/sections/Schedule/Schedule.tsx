import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Container } from '@/components/common/Container'
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
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden border-b border-[#59d6e8]/10 bg-[#081322]"
    >
      {/* Subtle blueprint dot grid */}
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
        <div className="relative z-10 max-w-3xl mx-auto space-y-8 sm:space-y-10">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono font-medium tracking-wide uppercase">
              <span>SCHEDULE</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Two Days. 24 Hours.
            </h2>

            <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto leading-relaxed">
              The run of show for IDEA SPRINT 2026. Key milestones, mentor reviews, and jury pitches.
            </p>
          </div>

          {/* Clean Segmented Day Switcher */}
          <div className="flex justify-center">
            <div className="inline-flex p-1 rounded-xl bg-[#0e1d33] border border-[#59d6e8]/20">
              {SCHEDULE_CONFIG.days.map((day) => {
                const isActive = day.dayNumber === activeDayNumber
                return (
                  <button
                    key={day.dayNumber}
                    type="button"
                    onClick={() => setActiveDayNumber(day.dayNumber)}
                    className={`relative px-5 py-2.5 sm:px-7 sm:py-2.5 font-mono text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-200 cursor-pointer min-h-[42px] ${
                      isActive ? 'text-[#081322]' : 'text-slate-400 hover:text-white'
                    }`}
                    aria-pressed={isActive}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="scheduleActiveTab"
                        className="absolute inset-0 bg-[#ffc928] rounded-lg shadow-sm"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">
                      {day.dayLabel} <span className="opacity-75">· {day.dateLabel}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Day Schedule Content Card */}
          <div className="rounded-2xl border border-[#59d6e8]/15 bg-[#0b1a2f]/70 backdrop-blur-md p-4 sm:p-7 shadow-xl shadow-black/20">
            <AnimatePresence mode="wait">
              {activeDay && (
                <motion.div
                  key={activeDay.dayNumber}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ScheduleDay day={activeDay} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Schedule
