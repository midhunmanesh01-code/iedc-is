import React, { useState } from 'react'

export const SprintReactor: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: x * 14, y: -y * 14 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[520px] aspect-square flex items-center justify-center select-none cursor-crosshair mx-auto"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      aria-label="24H Sprint Reactor Gyroscope"
      role="img"
    >
      {/* Seamless Ambient Radial Glows (No Box, Blends with Canvas) */}
      <div
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,201,40,0.18)_0%,rgba(89,214,232,0.1)_40%,transparent_70%)] blur-2xl pointer-events-none -z-10 animate-core-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute -inset-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(89,214,232,0.1)_0%,transparent_65%)] blur-3xl pointer-events-none -z-20"
        aria-hidden="true"
      />

      {/* Main Vector Gyroscope */}
      <div className="relative w-full h-full flex items-center justify-center animate-reactor-float">
        <svg
          viewBox="0 0 540 540"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Core Gold Glow */}
            <filter id="reactor-gold-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Cyan Filament Glow */}
            <filter id="reactor-cyan-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Core Gradient */}
            <radialGradient id="fusion-core-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#ffc928" />
              <stop offset="75%" stopColor="#d99b10" />
              <stop offset="100%" stopColor="#163866" />
            </radialGradient>

            {/* Track Subtle Gradient */}
            <linearGradient id="orbit-grad-cyan" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#59d6e8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#59d6e8" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#59d6e8" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Background Blueprint Coordinate Grid Filaments (Seamless Fade) */}
          <g stroke="#59d6e8" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="3 6">
            <line x1="270" y1="20" x2="270" y2="520" />
            <line x1="20" y1="270" x2="520" y2="270" />
            <circle cx="270" cy="270" r="260" strokeDasharray="2 8" />
          </g>

          {/* ======================================================== */}
          {/* RING 1: Outermost Telemetry Track (Clockwise Slow)       */}
          {/* ======================================================== */}
          <g className="animate-spin-cw-slow" style={{ transformOrigin: '270px 270px' }}>
            {/* Base Dashed Telemetry Ring */}
            <circle
              cx="270"
              cy="270"
              r="235"
              stroke="#59d6e8"
              strokeOpacity="0.3"
              strokeWidth="1.2"
              strokeDasharray="4 8"
            />

            {/* Corner Framing Brackets */}
            <path
              d="M 270 35 A 235 235 0 0 1 370 57"
              stroke="#59d6e8"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#reactor-cyan-glow)"
            />
            <path
              d="M 270 505 A 235 235 0 0 1 170 483"
              stroke="#59d6e8"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#reactor-cyan-glow)"
            />

            {/* Cardinal Coordinate Markers */}
            <text x="270" y="26" fill="#59d6e8" fontSize="9" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="0.2em" opacity="0.8">
              [00:00H • SPRINT_START]
            </text>
            <text x="515" y="274" fill="#59d6e8" fontSize="9" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="0.2em" opacity="0.8">
              [06:00H]
            </text>
            <text x="270" y="522" fill="#59d6e8" fontSize="9" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="0.2em" opacity="0.8">
              [12:00H • MIDPOINT]
            </text>
            <text x="25" y="274" fill="#59d6e8" fontSize="9" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="0.2em" opacity="0.8">
              [18:00H]
            </text>
          </g>

          {/* ======================================================== */}
          {/* RING 2: 24H Sprint Milestones Orbit (Counter-Clockwise) */}
          {/* ======================================================== */}
          <g className="animate-spin-ccw-slow" style={{ transformOrigin: '270px 270px' }}>
            {/* Gold Orbit Track */}
            <circle
              cx="270"
              cy="270"
              r="188"
              stroke="#ffc928"
              strokeOpacity="0.4"
              strokeWidth="1.5"
              strokeDasharray="14 6 4 6"
            />

            {/* Secondary Concentric Track */}
            <circle
              cx="270"
              cy="270"
              r="180"
              stroke="#59d6e8"
              strokeOpacity="0.2"
              strokeWidth="1"
              strokeDasharray="2 6"
            />

            {/* --- Node 1: DRAFT (Top: 0°) --- */}
            <g transform="translate(270, 82)">
              <circle cx="0" cy="0" r="10" fill="#102b52" stroke="#ffc928" strokeWidth="2" filter="url(#reactor-gold-glow)" />
              <circle cx="0" cy="0" r="4" fill="#ffc928" />
              <rect x="-35" y="-24" width="70" height="15" rx="3" fill="#163866" stroke="#ffc928" strokeWidth="1" opacity="0.9" />
              <text x="0" y="-13" fill="#ffc928" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="bold">
                0H • DRAFT
              </text>
            </g>

            {/* --- Node 2: BUILD (Right: 90°) --- */}
            <g transform="translate(458, 270)">
              <circle cx="0" cy="0" r="10" fill="#102b52" stroke="#ffffff" strokeWidth="2" />
              <circle cx="0" cy="0" r="4" fill="#ffffff" />
              <rect x="-35" y="12" width="70" height="15" rx="3" fill="#163866" stroke="#ffffff" strokeWidth="1" opacity="0.9" />
              <text x="0" y="23" fill="#ffffff" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="bold">
                8H • BUILD
              </text>
            </g>

            {/* --- Node 3: TEST (Bottom: 180°) --- */}
            <g transform="translate(270, 458)">
              <circle cx="0" cy="0" r="10" fill="#102b52" stroke="#59d6e8" strokeWidth="2" filter="url(#reactor-cyan-glow)" />
              <circle cx="0" cy="0" r="4" fill="#59d6e8" />
              <rect x="-35" y="12" width="70" height="15" rx="3" fill="#163866" stroke="#59d6e8" strokeWidth="1" opacity="0.9" />
              <text x="0" y="23" fill="#59d6e8" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="bold">
                16H • TEST
              </text>
            </g>

            {/* --- Node 4: PITCH / STARTUP (Left: 270°) --- */}
            <g transform="translate(82, 270)">
              <circle cx="0" cy="0" r="10" fill="#102b52" stroke="#ffc928" strokeWidth="2" filter="url(#reactor-gold-glow)" />
              <circle cx="0" cy="0" r="4" fill="#ffc928" />
              <rect x="-38" y="-24" width="76" height="15" rx="3" fill="#163866" stroke="#ffc928" strokeWidth="1" opacity="0.9" />
              <text x="0" y="-13" fill="#ffc928" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="bold">
                24H • PITCH
              </text>
            </g>
          </g>

          {/* ======================================================== */}
          {/* RING 3: Engineering Calibration Dial (Clockwise Fast)    */}
          {/* ======================================================== */}
          <g className="animate-spin-cw-fast" style={{ transformOrigin: '270px 270px' }}>
            <circle
              cx="270"
              cy="270"
              r="138"
              stroke="#59d6e8"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              strokeDasharray="45 15 20 15 65 25"
            />
            {/* Calibration Degree Markers */}
            <circle cx="270" cy="132" r="3" fill="#59d6e8" />
            <circle cx="408" cy="270" r="3" fill="#59d6e8" />
            <circle cx="270" cy="408" r="3" fill="#59d6e8" />
            <circle cx="132" cy="270" r="3" fill="#59d6e8" />
            <line x1="270" y1="135" x2="270" y2="148" stroke="#59d6e8" strokeWidth="2" />
            <line x1="405" y1="270" x2="392" y2="270" stroke="#59d6e8" strokeWidth="2" />
            <line x1="270" y1="405" x2="270" y2="392" stroke="#59d6e8" strokeWidth="2" />
            <line x1="135" y1="270" x2="148" y2="270" stroke="#59d6e8" strokeWidth="2" />
          </g>

          {/* ======================================================== */}
          {/* RING 4: Inner Quantum Gimbal (Counter-Clockwise Fast)    */}
          {/* ======================================================== */}
          <g className="animate-spin-ccw-fast" style={{ transformOrigin: '270px 270px' }}>
            <circle
              cx="270"
              cy="270"
              r="92"
              stroke="#ffc928"
              strokeOpacity="0.6"
              strokeWidth="1.5"
              strokeDasharray="8 6"
              filter="url(#reactor-gold-glow)"
            />
            <path
              d="M 270 178 A 92 92 0 0 1 350 220"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 270 362 A 92 92 0 0 1 190 320"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>

          {/* ======================================================== */}
          {/* CENTER: 24H Innovation Fusion Core                       */}
          {/* ======================================================== */}
          <g style={{ transformOrigin: '270px 270px' }} className="animate-core-pulse">
            {/* Outer Energy Corona */}
            <circle
              cx="270"
              cy="270"
              r="62"
              fill="#ffc928"
              fillOpacity="0.08"
              stroke="#ffc928"
              strokeOpacity="0.3"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {/* Glowing Aura Ring */}
            <circle
              cx="270"
              cy="270"
              r="48"
              fill="#163866"
              stroke="#59d6e8"
              strokeWidth="1.5"
              filter="url(#reactor-cyan-glow)"
            />

            {/* Radiant Solid Gold Core */}
            <circle
              cx="270"
              cy="270"
              r="36"
              fill="url(#fusion-core-grad)"
              stroke="#ffc928"
              strokeWidth="2"
              filter="url(#reactor-gold-glow)"
            />

            {/* Central Precision Crosshairs */}
            <line x1="250" y1="270" x2="290" y2="270" stroke="#102b52" strokeWidth="2" strokeLinecap="round" />
            <line x1="270" y1="250" x2="270" y2="290" stroke="#102b52" strokeWidth="2" strokeLinecap="round" />

            {/* Center Monogram / Text */}
            <text
              x="270"
              y="274"
              fill="#102b52"
              fontSize="12"
              fontFamily="Space Grotesk, sans-serif"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="0.05em"
            >
              IS26
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}

export default SprintReactor
