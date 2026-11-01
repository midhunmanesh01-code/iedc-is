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
          <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold rounded-xs bg-amber-500/15 text-amber-300 border border-amber-500/30">
            {category}
          </span>
        )
      case 'hacking':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold rounded-xs bg-[#FF5500]/15 text-[#FF5500] border border-[#FF5500]/35">
            {category}
          </span>
        )
      case 'mentoring':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold rounded-xs bg-sky-500/15 text-sky-300 border border-sky-500/30">
            {category}
          </span>
        )
      case 'workshop':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold rounded-xs bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            {category}
          </span>
        )
      case 'pitch':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold rounded-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            {category}
          </span>
        )
      default:
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold rounded-xs bg-white/5 text-zinc-300 border border-white/10">
            {category}
          </span>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Day Theme Banner */}
      <div className="p-4 bg-[#131518] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xs">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[#FF5500] font-semibold">
            {day.dayLabel} // THEME:
          </span>
          <span className="ml-2 text-sm sm:text-base font-semibold text-white">
            {day.theme}
          </span>
        </div>
        <span className="font-mono text-xs text-zinc-400">
          {day.dateLabel}
        </span>
      </div>

      {/* Timeline Node Container */}
      <div className="relative pl-6 sm:pl-8 border-l border-white/15 space-y-4">
        {day.items.map((item) => {
          const isExpanded = expandedItemId === item.id

          return (
            <div key={item.id} className="relative group">
              {/* Timeline Connector Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-4 w-3.5 h-3.5 border-2 transition-colors ${
                  item.isHighlight
                    ? 'border-[#FF5500] bg-[#FF5500]'
                    : 'border-white/30 bg-[#0C0D0E] group-hover:border-[#FF5500]'
                }`}
                aria-hidden="true"
              />

              {/* Item Card */}
              <div
                className={`bg-[#131518] border transition-all duration-200 p-4 sm:p-5 rounded-xs ${
                  item.isHighlight
                    ? 'border-[#FF5500]/40 bg-[#171A20]'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#FF5500]">
                      {item.time}
                    </span>
                    {renderCategoryBadge(item.category)}
                    {item.isHighlight && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono uppercase text-amber-300">
                        <Sparkles className="w-3 h-3" /> Key Milestone
                      </span>
                    )}
                  </div>

                  {item.venue && (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{item.venue}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold font-display text-white">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isExpanded}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xs transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[#FF5500] active:scale-95"
                    aria-label={isExpanded ? 'Collapse item details' : 'Expand item details'}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-[#FF5500]' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Expandable Details Area */}
                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-white/10 text-xs text-zinc-300 font-mono space-y-1.5 bg-black/30 p-3 rounded-xs">
                    <div className="text-amber-400 font-semibold">// PARTICIPANT INSTRUCTIONS:</div>
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
