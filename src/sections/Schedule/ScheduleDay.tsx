import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, MapPin, Sparkles } from 'lucide-react'
import type { ScheduleDay as ScheduleDayType, ScheduleItem } from '@/types/schedule'

export interface ScheduleDayProps {
  readonly day: ScheduleDayType
}

const CATEGORY_COLOR: Record<ScheduleItem['category'], string> = {
  ceremony: 'text-[#ffc928] bg-[#ffc928]/10 border-[#ffc928]/20',
  hacking: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  mentoring: 'text-[#59d6e8] bg-[#59d6e8]/10 border-[#59d6e8]/20',
  workshop: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  pitch: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  break: 'text-zinc-400 bg-white/5 border-white/10',
}

export const ScheduleDay: React.FC<ScheduleDayProps> = ({ day }) => {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setExpandedItemId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="space-y-6">
      {/* Day header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-[#102b52] border border-[#59d6e8]/15 rounded-lg">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-[#ffc928] font-bold">
            {day.dayLabel} —
          </span>
          <span className="text-sm sm:text-base font-display font-semibold text-white">
            {day.theme}
          </span>
        </div>
        <span className="font-mono text-xs text-[#6e94b8]">{day.dateLabel}</span>
      </div>

      {/* Timeline */}
      <div className="relative pl-7 sm:pl-9">
        {/* Vertical line */}
        <div
          className="absolute left-[9px] sm:left-[13px] top-2 bottom-2 w-px bg-[#59d6e8]/15"
          aria-hidden="true"
        />

        <div className="space-y-4">
          {day.items.map((item, i) => {
            const isExpanded = expandedItemId === item.id

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="relative group"
              >
                {/* Dot */}
                <div className="absolute -left-[22px] sm:-left-[28px] top-5" aria-hidden="true">
                  {item.isHighlight ? (
                    <div className="w-3.5 h-3.5 rounded-full bg-[#ffc928] shadow-[0_0_8px_rgba(255,201,40,0.5)]" />
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-[#59d6e8]/30 bg-[#0b1a30] group-hover:border-[#ffc928] transition-colors" />
                  )}
                </div>

                {/* Card */}
                <div
                  className={`p-4 sm:p-5 rounded-lg border transition-colors duration-200 ${
                    item.isHighlight
                      ? 'bg-[#122848] border-[#ffc928]/15 hover:border-[#ffc928]/30'
                      : 'bg-[#0f2240] border-[#59d6e8]/8 hover:border-[#59d6e8]/20'
                  }`}
                >
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-[#ffc928]">
                      {item.time}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-bold rounded border ${CATEGORY_COLOR[item.category]}`}
                    >
                      {item.category}
                    </span>
                    {item.isHighlight && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono uppercase text-[#ffc928] font-bold">
                        <Sparkles className="w-3 h-3" /> Milestone
                      </span>
                    )}
                    {item.venue && (
                      <span className="ml-auto hidden sm:flex items-center gap-1 text-[11px] font-mono text-[#6e94b8]">
                        <MapPin className="w-3 h-3" />
                        {item.venue}
                      </span>
                    )}
                  </div>

                  {/* Title + expand */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-[15px] sm:text-base font-display font-bold text-[#f5f7fa] leading-snug">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-[#7fa3c4] leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isExpanded}
                      className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg border border-[#59d6e8]/10 text-[#6e94b8] hover:text-white hover:border-[#ffc928]/30 transition-colors cursor-pointer shrink-0"
                      aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>
                  </div>

                  {/* Expandable details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-[#59d6e8]/8 text-xs text-[#7fa3c4] font-mono space-y-1">
                          <p>• Be at {item.venue || 'designated hall'} 10 min before.</p>
                          <p>• Laptops & kits must be logged at verification.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ScheduleDay
