import React from 'react'
import { MapPin, Sparkles } from 'lucide-react'
import type { ScheduleDay as ScheduleDayType, ScheduleCategory } from '@/types/schedule'

export interface ScheduleDayProps {
  readonly day: ScheduleDayType
}

const CATEGORY_LABELS: Record<ScheduleCategory, string> = {
  ceremony: 'Ceremony',
  hacking: 'Sprint',
  mentoring: 'Mentorship',
  workshop: 'Workshop',
  pitch: 'Pitching',
  break: 'Fuel & Rest',
}

export const ScheduleDay: React.FC<ScheduleDayProps> = ({ day }) => {
  return (
    <div className="relative pl-6 sm:pl-7 pt-2">
      {/* ── Continuous Timeline Vertical Rail ── */}
      <div
        className="absolute left-[7px] sm:left-[9px] top-4 bottom-4 w-px bg-gradient-to-b from-amber-400/60 via-slate-700/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="space-y-4 sm:space-y-5">
        {day.items.map((item) => (
          <div key={item.id} className="relative group text-left">
            {/* Timeline Node Marker */}
            <div
              className={`absolute -left-[23px] sm:-left-[27px] top-1.5 w-4 h-4 rounded-full flex items-center justify-center ${
                item.isHighlight
                  ? 'bg-[#0e1d35]'
                  : 'bg-[#091426]'
              }`}
              aria-hidden="true"
            >
              {item.isHighlight ? (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-amber-400/20 shadow-[0_0_8px_rgba(255,201,40,0.6)]" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-slate-500 group-hover:bg-cyan-400 transition-colors" />
              )}
            </div>

            {/* Session Card / Row */}
            <div
              className={`p-3 sm:p-3.5 rounded-xl border transition-all duration-200 ${
                item.isHighlight
                  ? 'bg-amber-400/[0.04] border-amber-400/25 group-hover:border-amber-400/40'
                  : 'bg-white/[0.02] border-white/5 group-hover:border-white/10 group-hover:bg-white/[0.04]'
              }`}
            >
              {/* Meta Header: Time, Category, Milestone Pill & Venue */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  {/* Time Badge */}
                  <span
                    className={`font-mono text-xs font-bold tracking-tight ${
                      item.isHighlight ? 'text-amber-300' : 'text-slate-200'
                    }`}
                  >
                    {item.time}
                  </span>

                  {/* Category Tag */}
                  <span className="text-[10px] font-mono uppercase tracking-wider font-medium px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                    {CATEGORY_LABELS[item.category]}
                  </span>

                  {/* Milestone Pill */}
                  {item.isHighlight && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-amber-300 font-semibold px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Milestone</span>
                    </span>
                  )}
                </div>

                {/* Venue Tag */}
                {item.venue && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                    <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{item.venue}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h4 className="font-display font-semibold text-sm sm:text-base text-white leading-snug group-hover:text-amber-300 transition-colors">
                {item.title}
              </h4>

              {/* Concise Description */}
              <p className="mt-1 text-xs text-slate-300 leading-relaxed font-sans">
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
