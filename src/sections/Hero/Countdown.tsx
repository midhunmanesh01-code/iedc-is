import React from 'react'
import { Calendar, Clock, AlertCircle } from 'lucide-react'
import { useCountdown } from '@/hooks/useCountdown'
import { EVENT_CONFIG } from '@/config/event'

export const Countdown: React.FC = () => {
  const { days, hours, minutes, seconds, isPending, isCompleted } = useCountdown(
    EVENT_CONFIG.isDateAnnounced ? EVENT_CONFIG.startDate : null
  )

  const formatDigit = (value: number) => value.toString().padStart(2, '0')

  const timeUnits = [
    { label: 'Days', value: isPending ? '--' : formatDigit(days) },
    { label: 'Hours', value: isPending ? '--' : formatDigit(hours) },
    { label: 'Minutes', value: isPending ? '--' : formatDigit(minutes) },
    { label: 'Seconds', value: isPending ? '--' : formatDigit(seconds) },
  ]

  return (
    <div className="w-full max-w-xl mx-auto lg:mx-0">
      {/* Status Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          {isPending ? (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-amber-300/90 font-medium">
                Official Date TBA // Sprint Timer Standby
              </span>
            </>
          ) : isCompleted ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-ping" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#B8FF00] font-medium">
                Sprint Active // 24H Clock Running
              </span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#B8FF00] font-medium">
                T-Minus to Sprint Kickoff
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-mono">
          <Clock className="w-3.5 h-3.5" />
          <span>24H SPRINT</span>
        </div>
      </div>

      {/* Numerical Counter Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 bg-[#0F1217] border border-white/10 p-3 sm:p-4 rounded-xs">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 bg-[#08090A] border border-white/5 relative group"
          >
            <div className="font-mono text-2xl sm:text-4xl font-bold tracking-tight text-white group-hover:text-[#B8FF00] transition-colors">
              {unit.value}
            </div>
            <div className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mt-1">
              {unit.label}
            </div>

            {/* Corner Tech Accents */}
            <span className="absolute top-0 left-0 w-1 h-1 bg-white/20" />
            <span className="absolute bottom-0 right-0 w-1 h-1 bg-white/20" />
          </div>
        ))}
      </div>

      {/* Explanatory notice when date is pending */}
      {isPending && (
        <div className="mt-3 flex items-start gap-2 text-xs font-mono text-slate-400 bg-white/[0.02] border border-white/5 px-3 py-2 rounded-xs">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <span>
            Target schedule is currently under final review by the organizing committee. Countdown initiates upon date announcement.
          </span>
        </div>
      )}

      {!isPending && EVENT_CONFIG.startDate && (
        <div className="mt-3 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Calendar className="w-3.5 h-3.5 text-[#B8FF00]" />
          <span>Sprint Date: {new Date(EVENT_CONFIG.startDate).toLocaleDateString()}</span>
        </div>
      )}
    </div>
  )
}
