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
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div className="flex items-center gap-2">
          {isPending ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[#ffc928] animate-pulse shadow-[0_0_8px_#ffc928]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#ffc928] font-semibold">
                Official Date TBA // Timer Standby
              </span>
            </>
          ) : isCompleted ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[#ffc928] animate-ping" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#ffc928] font-bold">
                Sprint Active // 24H Clock Running
              </span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-[#59d6e8] animate-pulse shadow-[0_0_8px_#59d6e8]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#59d6e8] font-semibold">
                T-Minus to Sprint Kickoff
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[#59d6e8]/80 text-xs font-mono">
          <Clock className="w-3.5 h-3.5 text-[#59d6e8]" />
          <span>24H TIMELOCK</span>
        </div>
      </div>

      {/* Blueprint Numerical Counter Grid */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 bg-[#163866] border border-[#59d6e8]/30 p-2 sm:p-3 rounded-xs shadow-lg">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center p-2 sm:p-2.5 bg-[#102b52] border border-[#59d6e8]/20 relative group hover:border-[#ffc928]/60 transition-colors"
          >
            <div className="font-mono text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-[#ffc928] transition-colors">
              {unit.value}
            </div>
            <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#a0c0e0] mt-0.5">
              {unit.label}
            </div>

            {/* Corner Tech Accents */}
            <span className="absolute top-0 left-0 w-1 h-1 bg-[#59d6e8]/40" />
            <span className="absolute bottom-0 right-0 w-1 h-1 bg-[#59d6e8]/40" />
          </div>
        ))}
      </div>

      {/* Explanatory notice when date is pending */}
      {isPending && (
        <div className="mt-2.5 flex items-start gap-2 text-xs font-mono text-[#a0c0e0] bg-[#163866]/50 border border-[#59d6e8]/20 px-3 py-1.5 rounded-xs">
          <AlertCircle className="w-3.5 h-3.5 text-[#ffc928] shrink-0 mt-0.5" />
          <span>
            Target schedule is under final review by IEDC CEC. Countdown initializes upon date announcement.
          </span>
        </div>
      )}

      {!isPending && EVENT_CONFIG.startDate && (
        <div className="mt-2.5 flex items-center gap-2 text-xs font-mono text-zinc-300">
          <Calendar className="w-3.5 h-3.5 text-[#ffc928]" />
          <span>Sprint Date: {new Date(EVENT_CONFIG.startDate).toLocaleDateString()}</span>
        </div>
      )}
    </div>
  )
}

export default Countdown
