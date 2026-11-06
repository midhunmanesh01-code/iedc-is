import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Container } from '@/components/common/Container'
import { SCHEDULE_CONFIG } from '@/config/schedule'
import { sound } from '@/sections/Interactive/soundEngine'
import { ScheduleDay } from './ScheduleDay'

export const Schedule: React.FC = () => {
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1)

  const activeDay =
    SCHEDULE_CONFIG.days.find((d) => d.dayNumber === activeDayNumber) ||
    SCHEDULE_CONFIG.days[0]

  const handleDaySelect = (dayNum: number) => {
    sound.playKeyClack()
    setActiveDayNumber(dayNum)
  }

  return (
    <section
      id="schedule"
      aria-label="Event Schedule"
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden border-b border-[#59d6e8]/15 bg-[#06101e]"
    >
      {/* Background Blueprint Grid Layer */}
      <div
        className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle Ambient Radial Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#59d6e8]/5 rounded-full blur-3xl pointer-events-none transform-gpu"
        aria-hidden="true"
      />

      <Container size="default">
        <div className="relative z-10 max-w-4xl mx-auto space-y-10 sm:space-y-12">
          {/* ── Section Header ── */}
          <div className="text-center space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102b52]/90 border border-[#59d6e8]/30 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-[#ffc928] shadow-[0_0_8px_#ffc928] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#59d6e8] font-bold">
                TIMELINE • 24H SPRINT MANIFEST
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight font-black">
              Two Days. <span className="text-[#ffc928]">24 Hours.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-sans leading-relaxed">
              Every milestone engineered. Follow the sprint chronometer from T-02:00 check-in through the midnight code audits to the grand stage finale.
            </p>
          </div>

          {/* ── Dual Channel Selector (Aerospace / Blueprint Instrument Switcher) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 bg-[#081528]/90 border border-[#59d6e8]/25 rounded-2xl backdrop-blur-md shadow-xl">
            {SCHEDULE_CONFIG.days.map((day) => {
              const isActive = day.dayNumber === activeDayNumber

              return (
                <button
                  key={day.dayNumber}
                  type="button"
                  onClick={() => handleDaySelect(day.dayNumber)}
                  className={`relative p-3.5 sm:p-4 rounded-xl text-left transition-all duration-200 cursor-pointer min-h-[70px] flex flex-col justify-between overflow-hidden border ${
                    isActive
                      ? 'bg-[#102544] border-[#ffc928]/60 shadow-[0_0_20px_rgba(255,201,40,0.12)] text-white'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/[0.03]'
                  }`}
                  aria-pressed={isActive}
                >
                  {/* Subtle active glow backdrop */}
                  {isActive && (
                    <motion.div
                      layoutId="activeScheduleChannel"
                      className="absolute inset-0 bg-gradient-to-r from-[#ffc928]/15 via-[#59d6e8]/5 to-transparent pointer-events-none"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}

                  {/* Channel Top Row */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span
                      className={`font-mono text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                        isActive
                          ? 'bg-[#ffc928] text-[#0b1a30] shadow-[0_0_8px_rgba(255,201,40,0.5)]'
                          : 'bg-white/5 text-[#7ea5cb]'
                      }`}
                    >
                      {day.channelLabel}
                    </span>
                    <span className="font-mono text-[11px] text-[#7ea5cb]">
                      {day.timeRange}
                    </span>
                  </div>

                  {/* Channel Theme Title */}
                  <div className="relative z-10 pt-2">
                    <h3 className="font-display text-sm sm:text-base font-bold text-white tracking-tight">
                      {day.theme}
                    </h3>
                  </div>
                </button>
              )
            })}
          </div>

          {/* ── Active Day Timeline Stream ── */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {activeDay && (
                <motion.div
                  key={activeDay.dayNumber}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
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
