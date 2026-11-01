import React, { useState } from 'react'
import { ChevronDown, MapPin, Sparkles } from 'lucide-react'
import type { ScheduleDay as ScheduleDayType, ScheduleItem } from '@/types/schedule'
import { Badge } from '@/components/ui/Badge'

export interface ScheduleDayProps {
  readonly day: ScheduleDayType
}

export const ScheduleDay: React.FC<ScheduleDayProps> = ({ day }) => {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setExpandedItemId((prev) => (prev === id ? null : id))
  }

  const getCategoryBadgeVariant = (category: ScheduleItem['category']) => {
    switch (category) {
      case 'ceremony':
        return 'accent' as const
      case 'hacking':
        return 'warning' as const
      case 'workshop':
      case 'mentoring':
      case 'pitch':
        return 'neutral' as const
      default:
        return 'outline' as const
    }
  }

  return (
    <div className="space-y-6">
      {/* Day Theme Banner */}
      <div className="p-4 bg-[#0F1217] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[#B8FF00] font-semibold">
            {day.dayLabel} // THEME:
          </span>
          <span className="ml-2 text-sm sm:text-base font-semibold text-white">
            {day.theme}
          </span>
        </div>
        <span className="font-mono text-xs text-slate-400">
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
                    ? 'border-[#B8FF00] bg-[#B8FF00]'
                    : 'border-white/30 bg-[#08090A] group-hover:border-[#B8FF00]'
                }`}
                aria-hidden="true"
              />

              {/* Item Card */}
              <div
                className={`bg-[#0F1217] border transition-all duration-200 p-4 sm:p-5 rounded-xs ${
                  item.isHighlight
                    ? 'border-[#B8FF00]/40 bg-[#12161E]'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#B8FF00]">
                      {item.time}
                    </span>
                    <Badge variant={getCategoryBadgeVariant(item.category)}>
                      {item.category}
                    </Badge>
                    {item.isHighlight && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono uppercase text-amber-300">
                        <Sparkles className="w-3 h-3" /> Key Milestone
                      </span>
                    )}
                  </div>

                  {item.venue && (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.venue}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold font-['Space_Grotesk'] text-white">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isExpanded}
                    className="p-1.5 text-slate-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xs transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[#B8FF00]"
                    aria-label={isExpanded ? 'Collapse item details' : 'Expand item details'}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-[#B8FF00]' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Expandable Details Area (Architecturally Prepared) */}
                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-300 font-mono space-y-1.5 bg-black/20 p-3 rounded-xs">
                    <div className="text-[#B8FF00] font-semibold">// PARTICIPANT INSTRUCTIONS:</div>
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
