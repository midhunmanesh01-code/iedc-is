import React from 'react'
import { motion } from 'motion/react'
import { MapPin, Sparkles } from 'lucide-react'
import type { ScheduleDay as ScheduleDayType } from '@/types/schedule'

export interface ScheduleDayProps {
  readonly day: ScheduleDayType
}

export const ScheduleDay: React.FC<ScheduleDayProps> = ({ day }) => {
  return (
    <div className="relative">
      {/* Subtle vertical connector rail on desktop */}
      <div
        className="hidden sm:block absolute left-[118px] top-6 bottom-6 w-px bg-gradient-to-b from-[#ffc928]/40 via-[#59d6e8]/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="divide-y divide-[#59d6e8]/10">
        {day.items.map((item, index) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: index * 0.03 }}
              className={`py-5 sm:py-6 first:pt-1 last:pb-1 group transition-colors rounded-xl px-3 sm:px-4 -mx-3 sm:-mx-4 ${
                item.isHighlight ? 'hover:bg-[#ffc928]/[0.03]' : 'hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-7">
                {/* Time Column (Left on sm+, top on mobile) */}
                <div className="flex items-center justify-between sm:justify-end sm:w-[96px] shrink-0 pt-0.5">
                  <span
                    className={`font-mono text-xs sm:text-sm font-semibold tracking-tight ${
                      item.isHighlight ? 'text-[#ffc928]' : 'text-slate-300'
                    }`}
                  >
                    {item.time}
                  </span>

                  {/* Mobile Venue tag */}
                  {item.venue && (
                    <span className="sm:hidden flex items-center gap-1 text-[11px] font-mono text-slate-400">
                      <MapPin className="w-3 h-3 text-[#59d6e8]" />
                      <span>{item.venue}</span>
                    </span>
                  )}
                </div>

                {/* Timeline Dot (sm+ only) */}
                <div
                  className="hidden sm:flex items-center justify-center w-5 h-5 shrink-0 relative mt-0.5"
                  aria-hidden="true"
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-transform duration-200 group-hover:scale-125 ${
                      item.isHighlight
                        ? 'bg-[#ffc928] ring-4 ring-[#ffc928]/25 shadow-[0_0_8px_rgba(255,201,40,0.6)]'
                        : 'bg-[#59d6e8]/60 group-hover:bg-[#59d6e8]'
                    }`}
                  />
                </div>

                {/* Content Column */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <h4
                      className={`text-sm sm:text-base font-display font-semibold transition-colors ${
                        item.isHighlight
                          ? 'text-white group-hover:text-[#ffc928]'
                          : 'text-slate-200 group-hover:text-white'
                      }`}
                    >
                      {item.title}
                    </h4>

                    {/* Desktop Venue tag + Highlight badge */}
                    <div className="hidden sm:flex items-center gap-2 shrink-0">
                      {item.isHighlight && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-[#ffc928]/10 text-[#ffc928] border border-[#ffc928]/25">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Milestone</span>
                        </span>
                      )}
                      {item.venue && (
                        <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
                          <MapPin className="w-3 h-3 text-[#59d6e8]" />
                          <span>{item.venue}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default ScheduleDay
