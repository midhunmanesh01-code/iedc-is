import React, { useState } from 'react'
import { ChevronDown, MapPin, Sparkles } from 'lucide-react'
import type { ScheduleDay as ScheduleDayType, ScheduleItem } from '@/types/schedule'

export interface ScheduleDayProps {
  readonly day: ScheduleDayType
}

export const ScheduleDay: React.FC<ScheduleDayProps> = ({ day }) => {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setExpandedItemId((prev) => (prev === id ? null : id))
  }

  const renderCategoryBadge = (category: ScheduleItem['category']) => {
    switch (category) {
      case 'ceremony':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-bold rounded-xs bg-[#59d6e8]/15 text-[#59d6e8] border border-[#59d6e8]/30">
            {category}
          </span>
        )
      case 'hacking':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-bold rounded-xs bg-[#ffc928]/20 text-[#ffc928] border border-[#ffc928]/40">
            {category}
          </span>
        )
      case 'mentoring':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-bold rounded-xs bg-[#59d6e8]/20 text-[#59d6e8] border border-[#59d6e8]/35">
            {category}
          </span>
        )
      case 'workshop':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-bold rounded-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/35">
            {category}
          </span>
        )
      case 'pitch':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-bold rounded-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/35">
            {category}
          </span>
        )
      default:
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-bold rounded-xs bg-white/10 text-zinc-200 border border-white/20">
            {category}
          </span>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Day Theme Banner */}
      <div className="p-4 bg-[#163866] border border-[#59d6e8]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xs shadow-lg">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[#ffc928] font-bold">
            {day.dayLabel} // THEME:
          </span>
          <span className="ml-2 text-sm sm:text-base font-semibold text-white">
            {day.theme}
          </span>
        </div>
        <span className="font-mono text-xs text-[#a0c0e0]">
          {day.dateLabel}
        </span>
      </div>

      {/* Timeline Node Container */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#59d6e8]/30 space-y-4">
        {day.items.map((item) => {
          const isExpanded = expandedItemId === item.id

          return (
            <div key={item.id} className="relative group">
              {/* Timeline Connector Dot */}
              <div
                className={`absolute -left-[32px] sm:-left-[40px] top-4 w-3.5 h-3.5 border-2 transition-colors rounded-full ${
                  item.isHighlight
                    ? 'border-[#ffc928] bg-[#ffc928] shadow-[0_0_8px_#ffc928]'
                    : 'border-[#59d6e8] bg-[#102b52] group-hover:border-[#ffc928]'
                }`}
                aria-hidden="true"
              />

              {/* Item Card */}
              <div
                className={`bg-[#163866] border transition-all duration-200 p-4 sm:p-5 rounded-xs shadow-md ${
                  item.isHighlight
                    ? 'border-[#ffc928]/60 bg-[#1a447c]'
                    : 'border-[#59d6e8]/20 hover:border-[#ffc928]/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#ffc928]">
                      {item.time}
                    </span>
                    {renderCategoryBadge(item.category)}
                    {item.isHighlight && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono uppercase text-[#ffc928] font-bold">
                        <Sparkles className="w-3 h-3" /> Key Milestone
                      </span>
                    )}
                  </div>

                  {item.venue && (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#a0c0e0]">
                      <MapPin className="w-3.5 h-3.5 text-[#59d6e8]" />
                      <span>{item.venue}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold font-display text-white">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-[#b0c8e8] leading-relaxed font-mono">
                      {item.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isExpanded}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center text-zinc-300 hover:text-white border border-[#59d6e8]/30 hover:border-[#ffc928]/60 rounded-xs transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[#ffc928] active:scale-95 cursor-pointer"
                    aria-label={isExpanded ? 'Collapse item details' : 'Expand item details'}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-[#ffc928]' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Expandable Details Area */}
                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-[#59d6e8]/20 text-xs text-zinc-200 font-mono space-y-1.5 bg-[#102b52] p-3 rounded-xs border border-[#59d6e8]/25">
                    <div className="text-[#ffc928] font-bold">// PARTICIPANT INSTRUCTIONS:</div>
                    <div>• Please be assembled at {item.venue || 'designated hall'} 10 minutes prior.</div>
                    <div>• Laptops and hardware kits must be logged at the verification desk.</div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ScheduleDay
