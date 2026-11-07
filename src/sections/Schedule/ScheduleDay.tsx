import React from 'react'
import { MapPin, Sparkles } from 'lucide-react'
import type { ScheduleDay as ScheduleDayType } from '@/types/schedule'

export interface ScheduleDayProps {
  readonly day: ScheduleDayType
}

export const ScheduleDay: React.FC<ScheduleDayProps> = ({ day }) => {
  return (
    <div className="relative pl-6 sm:pl-7 pt-1">
      {/* ── Continuous Timeline Vertical Spine ── */}
      <div
        className="absolute left-[7px] sm:left-[9px] top-3 bottom-3 w-px bg-gradient-to-b from-amber-400/60 via-slate-700/60 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="space-y-3.5">
        {day.items.map((item) => (
          <div key={item.id} className="relative group text-left">
            {/* Timeline Anchor Node */}
            <div
              className="absolute -left-[23px] sm:-left-[27px] top-1.5 w-4 h-4 rounded-full flex items-center justify-center bg-[#0c182c]"
              aria-hidden="true"
            >
              {item.isHighlight ? (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-amber-400/20 shadow-[0_0_8px_rgba(255,201,40,0.6)]" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-slate-500 group-hover:bg-cyan-400 transition-colors" />
              )}
            </div>

            {/* Session Item */}
            <div className="p-2.5 -mx-2.5 rounded-xl hover:bg-white/[0.03] transition-colors space-y-1">
              {/* Top Meta Line: Time + Milestone + Venue */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-xs font-bold tracking-tight ${
                      item.isHighlight ? 'text-amber-300' : 'text-slate-200'
                    }`}
                  >
                    {item.time}
                  </span>

                  {item.isHighlight && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-amber-300 font-semibold px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Milestone</span>
                    </span>
                  )}
                </div>

                {item.venue && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-cyan-300/80">
                    <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{item.venue}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h4 className="font-display font-semibold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors leading-snug">
                {item.title}
              </h4>

              {/* Concise 1-sentence description */}
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScheduleDay
