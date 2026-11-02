import React, { useRef } from 'react'

export const SprintReactor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  // High-efficiency 60/120fps direct DOM tilt (0 React re-renders on mousemove)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateX(${-y * 15}deg) rotateY(${x * 15}deg)`
  }

  const handleMouseLeave = () => {
    const el = containerRef.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[430px] sm:max-w-[470px] lg:max-w-[510px] aspect-square flex items-center justify-center select-none cursor-crosshair mx-auto will-change-transform"
      style={{
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      aria-label="24H Sprint Reactor Gyroscope"
      role="img"
    >
      {/* Seamless Ambient Radial Glows (No Box, Blends naturally into #102b52 canvas) */}
      <div
        className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,201,40,0.18)_0%,rgba(89,214,232,0.1)_40%,transparent_70%)] blur-2xl pointer-events-none -z-10 animate-core-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute -inset-8 rounded-full bg-[radial-gradient(circle_at_center,rgba(89,214,232,0.1)_0%,transparent_65%)] blur-3xl pointer-events-none -z-20"
        aria-hidden="true"
      />

      {/* Main Kinetic Gyroscope Rig */}
      <div className="relative w-full h-full flex items-center justify-center animate-reactor-float">
        <svg
          viewBox="0 0 540 540"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Lightweight High-Efficiency Glow Filter */}
            <filter id="reactor-gold-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="reactor-cyan-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Radiant Fusion Core Gradient */}
            <radialGradient id="fusion-core-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#ffc928" />
              <stop offset="70%" stopColor="#d99b10" />
              <stop offset="100%" stopColor="#163866" />
            </radialGradient>
          </defs>

          {/* Blueprint Axis Guide Lines & Crosshairs (Stationary) */}
          <g stroke="#59d6e8" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="3 6">
            <line x1="270" y1="20" x2="270" y2="520" />
            <line x1="20" y1="270" x2="520" y2="270" />
            <circle cx="270" cy="270" r="255" strokeDasharray="2 8" />
          </g>

          {/* ======================================================== */}
          {/* RING 1: Outermost Telemetry Orbit (Clockwise Slow)       */}
          {/* ======================================================== */}
          <g className="animate-spin-cw-slow" style={{ transformOrigin: '270px 270px' }}>
            <circle
              cx="270"
              cy="270"
              r="234"
              stroke="#59d6e8"
              strokeOpacity="0.25"
              strokeWidth="1.2"
              strokeDasharray="4 8"
            />
            {/* Cardinal Framing Brackets */}
            <path
              d="M 270 36 A 234 234 0 0 1 360 56"
              stroke="#59d6e8"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#reactor-cyan-glow)"
            />
            <path
              d="M 270 504 A 234 234 0 0 1 180 484"
              stroke="#59d6e8"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#reactor-cyan-glow)"
            />
            <path
              d="M 36 270 A 234 234 0 0 1 56 180"
              stroke="#59d6e8"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 504 270 A 234 234 0 0 1 484 360"
              stroke="#59d6e8"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* ======================================================== */}
          {/* RING 2: 24H Sprint Milestone Track (Counter-Clockwise)   */}
          {/* ======================================================== */}
          <g className="animate-spin-ccw-slow" style={{ transformOrigin: '270px 270px' }}>
            <circle
              cx="270"
              cy="270"
              r="188"
              stroke="#ffc928"
              strokeOpacity="0.4"
              strokeWidth="1.5"
              strokeDasharray="14 6 4 6"
            />
            <circle
              cx="270"
              cy="270"
              r="180"
              stroke="#59d6e8"
              strokeOpacity="0.18"
              strokeWidth="1"
              strokeDasharray="2 6"
            />

            {/* Orbiting Milestone Nodes (Clean Glowing Markers) */}
            {/* 00H Node (Top) */}
            <g transform="translate(270, 82)">
              <circle cx="0" cy="0" r="10" fill="#102b52" stroke="#ffc928" strokeWidth="2" filter="url(#reactor-gold-glow)" />
              <circle cx="0" cy="0" r="4" fill="#ffc928" />
            </g>

            {/* 08H Node (Right) */}
            <g transform="translate(458, 270)">
              <circle cx="0" cy="0" r="10" fill="#102b52" stroke="#ffffff" strokeWidth="2" />
              <circle cx="0" cy="0" r="4" fill="#ffffff" />
            </g>

            {/* 16H Node (Bottom) */}
            <g transform="translate(270, 458)">
              <circle cx="0" cy="0" r="10" fill="#102b52" stroke="#59d6e8" strokeWidth="2" filter="url(#reactor-cyan-glow)" />
              <circle cx="0" cy="0" r="4" fill="#59d6e8" />
            </g>

            {/* 24H Node (Left) */}
            <g transform="translate(82, 270)">
              <circle cx="0" cy="0" r="10" fill="#102b52" stroke="#ffc928" strokeWidth="2" filter="url(#reactor-gold-glow)" />
              <circle cx="0" cy="0" r="4" fill="#ffc928" />
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

            {/* Center Monogram */}
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
