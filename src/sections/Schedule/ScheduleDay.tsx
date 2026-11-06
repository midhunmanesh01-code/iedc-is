import React from 'react'
import { motion } from 'motion/react'
import { MapPin, Sparkles, Zap, Flame, Clock } from 'lucide-react'
import type { ScheduleDay as ScheduleDayType, ScheduleCategory } from '@/types/schedule'
import { sound } from '@/sections/Interactive/soundEngine'

export interface ScheduleDayProps {
  readonly day: ScheduleDayType
}

const CATEGORY_STYLES: Record<
  ScheduleCategory,
  { label: string; badge: string; icon: React.FC<{ className?: string }> }
> = {
  ceremony: {
    label: 'Ceremony',
    badge: 'text-[#ffc928] bg-[#ffc928]/10 border-[#ffc928]/30',
    icon: Sparkles,
  },
  hacking: {
    label: 'Sprint Build',
    badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    icon: Zap,
  },
  mentoring: {
    label: 'Audit Checkpoint',
    badge: 'text-[#59d6e8] bg-[#59d6e8]/10 border-[#59d6e8]/30',
    icon: Flame,
  },
  workshop: {
    label: 'Workshop',
    badge: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    icon: Clock,
  },
  pitch: {
    label: 'Stage Pitch',
    badge: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    icon: Sparkles,
  },
  break: {
    label: 'Catering & Fuel',
    badge: 'text-slate-300 bg-white/5 border-white/10',
    icon: Clock,
  },
}

export const ScheduleDay: React.FC<ScheduleDayProps> = ({ day }) => {
  return (
    <div className="relative">
      {/* ── Continuous Illuminated Conduit Rail ── */}
      <div
        className="absolute left-[19px] sm:left-[23px] md:left-[148px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#ffc928]/70 via-[#59d6e8]/40 to-[#102b52] pointer-events-none"
        aria-hidden="true"
      />

      <div className="space-y-4 sm:space-y-6">
        {day.items.map((item, index) => {
          const categoryMeta = CATEGORY_STYLES[item.category]
          const CategoryIcon = categoryMeta.icon

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: index * 0.04 }}
              className="relative group"
              onMouseEnter={() => {
                if (item.isHighlight) sound.playKeyClack()
              }}
            >
              {/* ── Desktop Left Time & Sprint Hour Column (md+) ── */}
              <div className="hidden md:flex flex-col items-end absolute left-0 top-3.5 w-[128px] text-right pr-4 select-none">
                <span className="font-mono text-base font-bold text-white tracking-tight group-hover:text-[#ffc928] transition-colors">
                  {item.time}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#ffc928] bg-[#ffc928]/10 px-2 py-0.5 rounded border border-[#ffc928]/25 mt-1 tracking-wider">
                  {item.sprintTime}
                </span>
              </div>

              {/* ── Timeline Node Marker ── */}
              <div
                className={`absolute left-[9px] sm:left-[13px] md:left-[138px] top-4 z-10 w-[22px] h-[22px] rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-125 ${
                  item.isHighlight
                    ? 'bg-[#ffc928] text-[#102b52] ring-4 ring-[#ffc928]/25 shadow-[0_0_14px_rgba(255,201,40,0.7)]'
                    : 'bg-[#081528] border-2 border-[#59d6e8]/80 text-[#59d6e8] ring-2 ring-[#59d6e8]/20 group-hover:border-[#ffc928]'
                }`}
                aria-hidden="true"
              >
                {item.isHighlight ? (
                  <span className="w-2 h-2 rounded-full bg-[#102b52]" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#59d6e8]" />
                )}
              </div>

              {/* ── Engineering Card (Right of Rail) ── */}
              <div className="pl-11 sm:pl-14 md:pl-[180px]">
                <div
                  className={`relative rounded-xl border p-4 sm:p-5 transition-all duration-200 backdrop-blur-md overflow-hidden ${
                    item.isHighlight
                      ? 'bg-[#0e213d]/90 border-[#ffc928]/35 shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:border-[#ffc928]/70 hover:shadow-[0_0_28px_rgba(255,201,40,0.12)]'
                      : 'bg-[#0a182c]/80 border-[#59d6e8]/15 shadow-[0_4px_18px_rgba(0,0,0,0.25)] hover:border-[#59d6e8]/35 hover:bg-[#0d1f38]'
                  }`}
                >
                  {/* Blueprint Technical Top Hairline */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] ${
                      item.isHighlight
                        ? 'bg-gradient-to-r from-[#ffc928] via-[#59d6e8] to-transparent'
                        : 'bg-gradient-to-r from-[#59d6e8]/40 to-transparent'
                    }`}
                  />

                  {/* Corner Technical Crosshairs */}
                  <span className="absolute top-1 left-1 font-mono text-[9px] text-[#59d6e8]/30 select-none">
                    +
                  </span>
                  <span className="absolute top-1 right-1 font-mono text-[9px] text-[#59d6e8]/30 select-none">
                    +
                  </span>

                  {/* Meta Strip: Time (Mobile), Track Badge, Category, Venue */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {/* Mobile Time Pill */}
                      <span className="md:hidden inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#ffc928]/10 border border-[#ffc928]/25 font-mono text-xs font-bold text-[#ffc928]">
                        <span>{item.time}</span>
                        <span className="text-[#59d6e8]">• {item.sprintTime}</span>
                      </span>

                      {/* Track Badge */}
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                        {item.trackBadge}
                      </span>

                      {/* Category Badge */}
                      <span
                        className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded border font-mono text-[10px] font-bold uppercase tracking-wider ${categoryMeta.badge}`}
                      >
                        <CategoryIcon className="w-2.5 h-2.5" />
                        <span>{categoryMeta.label}</span>
                      </span>
                    </div>

                    {/* Venue Chip */}
                    {item.venue && (
                      <div className="inline-flex items-center gap-1 text-[11px] font-mono text-[#8eb0d4] bg-[#102b52]/80 px-2 py-0.5 rounded border border-[#59d6e8]/20 shrink-0">
                        <MapPin className="w-3 h-3 text-[#ffc928]" />
                        <span>{item.venue}</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-display font-bold text-white tracking-tight leading-snug group-hover:text-[#ffc928] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
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
