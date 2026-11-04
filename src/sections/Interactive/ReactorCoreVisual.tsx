import React from 'react'
import { motion } from 'motion/react'

interface ReactorCoreVisualProps {
  readonly isFusing: boolean
  readonly domainColor: string
  readonly onTriggerFuse: () => void
  readonly statusText: string
  readonly activeDomainTag: string
  readonly activeConstraintTag: string
}

export const ReactorCoreVisual: React.FC<ReactorCoreVisualProps> = ({
  isFusing,
  domainColor,
  onTriggerFuse,
  statusText,
  activeDomainTag,
  activeConstraintTag,
}) => {
  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* Reactor Housing */}
      <div
        onClick={onTriggerFuse}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onTriggerFuse()
          }
        }}
        aria-label="Initiate Idea Reactor Fusion"
        className="relative group cursor-pointer w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#ffc928] rounded-full transition-transform active:scale-95"
      >
        {/* Glow ambient background */}
        <div
          className="absolute inset-0 rounded-full blur-2xl transition-all duration-700 pointer-events-none"
          style={{
            backgroundColor: isFusing ? domainColor : '#59d6e8',
            opacity: isFusing ? 0.45 : 0.12,
            transform: isFusing ? 'scale(1.2)' : 'scale(1)',
          }}
          aria-hidden="true"
        />

        {/* SVG Gyroscope & Fusion Core */}
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="core-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="reactor-metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e467e" />
              <stop offset="50%" stopColor="#122f59" />
              <stop offset="100%" stopColor="#0b1a30" />
            </linearGradient>
          </defs>

          {/* Outer Technical Calibration Ring */}
          <circle
            cx="150"
            cy="150"
            r="140"
            stroke="#59d6e8"
            strokeWidth="1.2"
            strokeOpacity="0.3"
            strokeDasharray="4 6"
          />

          {/* Crosshair alignment markers */}
          <line x1="150" y1="2" x2="150" y2="16" stroke="#ffc928" strokeWidth="1.5" />
          <line x1="150" y1="284" x2="150" y2="298" stroke="#ffc928" strokeWidth="1.5" />
          <line x1="2" y1="150" x2="16" y2="150" stroke="#ffc928" strokeWidth="1.5" />
          <line x1="284" y1="150" x2="298" y2="150" stroke="#ffc928" strokeWidth="1.5" />

          {/* Outer Rotating Plasma Ring */}
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 150 150"
              to="360 150 150"
              dur={isFusing ? '2.5s' : '22s'}
              repeatCount="indefinite"
            />
            <circle
              cx="150"
              cy="150"
              r="124"
              stroke="#59d6e8"
              strokeWidth={isFusing ? '2.5' : '1.5'}
              strokeOpacity={isFusing ? '0.9' : '0.45'}
              strokeDasharray="28 14 60 14"
            />
            {/* Orbiting particle 1 */}
            <circle cx="150" cy="26" r="3.5" fill="#ffc928" filter="url(#core-glow-filter)" />
            <circle cx="150" cy="274" r="3.5" fill="#59d6e8" filter="url(#core-glow-filter)" />
          </g>

          {/* Counter-Rotating Middle Ring (Domain Track Energy) */}
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360 150 150"
              to="0 150 150"
              dur={isFusing ? '1.8s' : '16s'}
              repeatCount="indefinite"
            />
            <circle
              cx="150"
              cy="150"
              r="98"
              stroke={domainColor}
              strokeWidth={isFusing ? '2.8' : '1.8'}
              strokeOpacity={isFusing ? '0.95' : '0.6'}
              strokeDasharray="16 8 8 8"
            />
            <circle cx="248" cy="150" r="4" fill={domainColor} filter="url(#core-glow-filter)" />
            <circle cx="52" cy="150" r="3" fill="#ffffff" />
          </g>

          {/* Inner Fast Gyro Ring */}
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 150 150"
              to="360 150 150"
              dur={isFusing ? '0.8s' : '9s'}
              repeatCount="indefinite"
            />
            <circle
              cx="150"
              cy="150"
              r="72"
              stroke="#ffc928"
              strokeWidth="2"
              strokeOpacity={isFusing ? '0.9' : '0.4'}
              strokeDasharray="40 25"
            />
          </g>

          {/* Central Reactor Core Mass */}
          <circle
            cx="150"
            cy="150"
            r={isFusing ? '48' : '44'}
            fill="url(#reactor-metal-grad)"
            stroke={isFusing ? '#ffc928' : '#59d6e8'}
            strokeWidth="2.5"
            className="transition-all duration-300"
            filter="url(#core-glow-filter)"
          />

          {/* Center Atomic Core Symbol */}
          <g className="pointer-events-none">
            {/* Core Heart Pulse */}
            <circle
              cx="150"
              cy="150"
              r={isFusing ? '28' : '22'}
              fill={domainColor}
              fillOpacity={isFusing ? '0.5' : '0.22'}
              className="transition-all duration-300"
            />
            <circle
              cx="150"
              cy="150"
              r="10"
              fill={isFusing ? '#ffffff' : '#ffc928'}
              filter="url(#core-glow-filter)"
            />
          </g>
        </svg>

        {/* Center Hover / Status Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <motion.div
            animate={isFusing ? { scale: [1, 1.15, 1] } : { scale: 1 }}
            transition={{ repeat: isFusing ? Infinity : 0, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#ffc928] font-bold">
              {isFusing ? 'SYNTHESIZING' : 'REACTOR CORE'}
            </span>
            <span className="font-display font-extrabold text-white text-xs sm:text-sm tracking-wider mt-0.5 group-hover:text-[#ffc928] transition-colors">
              {isFusing ? 'FUSING...' : 'TAP TO FUSE'}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Real-time Telemetry HUD readout */}
      <div className="mt-3 flex items-center justify-center gap-3 font-mono text-[11px] text-[#9bbad6]">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#122f59]/80 border border-[#59d6e8]/20 rounded-full">
          <span
            className={`w-2 h-2 rounded-full ${
              isFusing ? 'bg-[#ffc928] animate-ping' : 'bg-emerald-400 animate-pulse'
            }`}
          />
          <span className="text-[#f5f7fa] font-bold text-[10px] tracking-wider uppercase">
            {statusText}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[10px] text-[#6e94b8]">
          <span className="text-[#59d6e8]">{activeDomainTag}</span>
          <span>•</span>
          <span className="text-[#ffc928]">{activeConstraintTag}</span>
        </div>
      </div>
    </div>
  )
}
