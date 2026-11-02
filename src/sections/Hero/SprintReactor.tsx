import React, { useRef } from 'react'

export const SprintReactor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  // High-efficiency 60/120fps direct DOM 3D tilt & dynamic light flare (0 React re-renders)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateX(${-y * 18}deg) rotateY(${x * 18}deg)`
    el.style.setProperty('--flare-x', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--flare-y', `${(y + 0.5) * 100}%`)
  }

  const handleMouseLeave = () => {
    const el = containerRef.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    el.style.setProperty('--flare-x', '50%')
    el.style.setProperty('--flare-y', '50%')
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[520px] aspect-square flex items-center justify-center select-none cursor-crosshair mx-auto will-change-transform"
      style={{
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      aria-label="Quantum Blueprint Atom Model"
      role="img"
    >
      {/* Seamless Ambient Radial Glows (No Box, Blends naturally into canvas) */}
      <div
        className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,201,40,0.22)_0%,rgba(89,214,232,0.12)_42%,transparent_70%)] blur-2xl pointer-events-none -z-20 animate-core-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute -inset-8 rounded-full bg-[radial-gradient(circle_at_center,rgba(89,214,232,0.1)_0%,transparent_65%)] blur-3xl pointer-events-none -z-30"
        aria-hidden="true"
      />

      {/* Dynamic Cursor Light Flare */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none opacity-25 transition-opacity duration-300 -z-10"
        style={{
          background:
            'radial-gradient(circle 140px at var(--flare-x, 50%) var(--flare-y, 50%), rgba(255, 201, 40, 0.25), transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* Main Vector Quantum Atom */}
      <div className="relative w-full h-full flex items-center justify-center animate-reactor-float">
        <svg
          viewBox="0 0 540 540"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Lightweight High-Efficiency Glow Filters */}
            <filter id="atom-gold-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="atom-cyan-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Nucleus Fusion Core Gradient */}
            <radialGradient id="nucleus-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#ffc928" />
              <stop offset="65%" stopColor="#d99b10" />
              <stop offset="100%" stopColor="#163866" />
            </radialGradient>

            {/* Orbit Path Templates for animateMotion */}
            {/* Standard ellipse centered at (270, 270) with rx=210, ry=76 */}
            <path
              id="ellipse-track"
              d="M 60,270 a 210,76 0 1,0 420,0 a 210,76 0 1,0 -420,0"
              fill="none"
            />
          </defs>

          {/* ======================================================== */}
          {/* LAYER 1: Blueprint Coordinate Grid & Quantum Probability  */}
          {/* ======================================================== */}
          <g stroke="#59d6e8" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="3 6">
            <line x1="270" y1="15" x2="270" y2="525" />
            <line x1="15" y1="270" x2="525" y2="270" />
            <circle cx="270" cy="270" r="255" strokeDasharray="2 8" />
            <circle cx="270" cy="270" r="140" strokeDasharray="3 9" strokeOpacity="0.08" />
          </g>

          {/* Precision Corner Reticle Brackets */}
          <g stroke="#59d6e8" strokeOpacity="0.3" strokeWidth="1">
            <path d="M 85 85 L 95 85 M 85 85 L 85 95" />
            <path d="M 455 85 L 445 85 M 455 85 L 455 95" />
            <path d="M 85 455 L 95 455 M 85 455 L 85 445" />
            <path d="M 455 455 L 445 455 M 455 455 L 455 445" />
          </g>

          {/* ======================================================== */}
          {/* LAYER 2: Outer Valence Boundary Stator (Stationary)      */}
          {/* ======================================================== */}
          <g>
            <circle cx="270" cy="270" r="236" stroke="#59d6e8" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="4 8" />

            {/* Stator Calibration Ticks */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 15 * Math.PI) / 180
              const x1 = 270 + 236 * Math.cos(angle)
              const y1 = 270 + 236 * Math.sin(angle)
              const x2 = 270 + (i % 2 === 0 ? 228 : 231) * Math.cos(angle)
              const y2 = 270 + (i % 2 === 0 ? 228 : 231) * Math.sin(angle)
              return (
                <line
                  key={`valence-tick-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#59d6e8"
                  strokeOpacity={i % 6 === 0 ? '0.45' : '0.18'}
                  strokeWidth={i % 6 === 0 ? '1.5' : '0.8'}
                />
              )
            })}

            {/* Cardinal Quantum Shell Markers */}
            <text x="270" y="24" fill="#59d6e8" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle" letterSpacing="0.2em" opacity="0.75">
              ORBITAL // N=1
            </text>
            <text x="516" y="273" fill="#59d6e8" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle" letterSpacing="0.2em" opacity="0.75">
              ψ²(r)
            </text>
            <text x="270" y="524" fill="#59d6e8" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle" letterSpacing="0.2em" opacity="0.75">
              QUANTUM CORE
            </text>
            <text x="24" y="273" fill="#59d6e8" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle" letterSpacing="0.2em" opacity="0.75">
              24H SPRINT
            </text>
          </g>

          {/* ======================================================== */}
          {/* LAYER 3: The 3 Atomic Orbital Shells & Orbiting Electrons*/}
          {/* (Iconic 3-axis Rutherford-Bohr atom at 30°, 90°, 150°)    */}
          {/* ======================================================== */}

          {/* --- ORBITAL 1: 30° Tilt (Drafting Gold Primary Shell) --- */}
          <g transform="rotate(30 270 270)">
            {/* Base Dashed Blueprint Track */}
            <ellipse
              cx="270"
              cy="270"
              rx="210"
              ry="76"
              stroke="#ffc928"
              strokeOpacity="0.3"
              strokeWidth="1.4"
              strokeDasharray="14 6 4 6"
            />
            {/* Glowing Accent Arc */}
            <ellipse
              cx="270"
              cy="270"
              rx="210"
              ry="76"
              stroke="#ffc928"
              strokeOpacity="0.6"
              strokeWidth="2"
              strokeDasharray="40 180"
              strokeDashoffset="20"
              filter="url(#atom-gold-glow)"
            />
            {/* Electron 1 Particle Racing along Orbit 1 */}
            <g>
              <animateMotion dur="4.6s" repeatCount="indefinite">
                <mpath href="#ellipse-track" />
              </animateMotion>
              <circle cx="0" cy="0" r="10" fill="#ffc928" fillOpacity="0.15" />
              <circle cx="0" cy="0" r="5.5" fill="#ffc928" filter="url(#atom-gold-glow)" />
              <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
            </g>
          </g>

          {/* --- ORBITAL 2: 90° Tilt (Vertical Electric Cyan Shell) --- */}
          <g transform="rotate(90 270 270)">
            {/* Base Dashed Blueprint Track */}
            <ellipse
              cx="270"
              cy="270"
              rx="210"
              ry="76"
              stroke="#59d6e8"
              strokeOpacity="0.3"
              strokeWidth="1.4"
              strokeDasharray="14 6 4 6"
            />
            {/* Glowing Accent Arc */}
            <ellipse
              cx="270"
              cy="270"
              rx="210"
              ry="76"
              stroke="#59d6e8"
              strokeOpacity="0.65"
              strokeWidth="2"
              strokeDasharray="50 170"
              strokeDashoffset="90"
              filter="url(#atom-cyan-glow)"
            />
            {/* Electron 2 Particle Racing along Orbit 2 */}
            <g>
              <animateMotion dur="3.6s" repeatCount="indefinite">
                <mpath href="#ellipse-track" />
              </animateMotion>
              <circle cx="0" cy="0" r="10" fill="#59d6e8" fillOpacity="0.15" />
              <circle cx="0" cy="0" r="5.5" fill="#59d6e8" filter="url(#atom-cyan-glow)" />
              <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
            </g>
          </g>

          {/* --- ORBITAL 3: 150° Tilt (White/Cyan Counter Shell) --- */}
          <g transform="rotate(150 270 270)">
            {/* Base Dashed Blueprint Track */}
            <ellipse
              cx="270"
              cy="270"
              rx="210"
              ry="76"
              stroke="#ffffff"
              strokeOpacity="0.25"
              strokeWidth="1.4"
              strokeDasharray="14 6 4 6"
            />
            {/* Glowing Accent Arc */}
            <ellipse
              cx="270"
              cy="270"
              rx="210"
              ry="76"
              stroke="#59d6e8"
              strokeOpacity="0.55"
              strokeWidth="2"
              strokeDasharray="45 175"
              strokeDashoffset="140"
              filter="url(#atom-cyan-glow)"
            />
            {/* Electron 3 Particle Racing along Orbit 3 */}
            <g>
              <animateMotion dur="5.4s" repeatCount="indefinite">
                <mpath href="#ellipse-track" />
              </animateMotion>
              <circle cx="0" cy="0" r="10" fill="#ffc928" fillOpacity="0.15" />
              <circle cx="0" cy="0" r="5" fill="#ffc928" filter="url(#atom-gold-glow)" />
              <circle cx="0" cy="0" r="2.2" fill="#ffffff" />
            </g>
          </g>

          {/* --- ORBITAL 4: Horizontal Equatorial Shell (Subtle 0°) --- */}
          <g>
            <ellipse
              cx="270"
              cy="270"
              rx="210"
              ry="76"
              stroke="#59d6e8"
              strokeOpacity="0.16"
              strokeWidth="1.2"
              strokeDasharray="6 8"
            />
            {/* Electron 4 Particle Racing along Equatorial Orbit */}
            <g>
              <animateMotion dur="6.2s" repeatCount="indefinite">
                <mpath href="#ellipse-track" />
              </animateMotion>
              <circle cx="0" cy="0" r="4.5" fill="#ffffff" filter="url(#atom-cyan-glow)" />
              <circle cx="0" cy="0" r="2" fill="#59d6e8" />
            </g>
          </g>

          {/* ======================================================== */}
          {/* LAYER 4: Nuclear Probability Shell & Micro Orbitals      */}
          {/* ======================================================== */}
          <g className="animate-spin-cw-fast" style={{ transformOrigin: '270px 270px' }}>
            <circle
              cx="270"
              cy="270"
              r="105"
              stroke="#59d6e8"
              strokeOpacity="0.25"
              strokeWidth="1.2"
              strokeDasharray="20 10 5 10"
            />
            <circle cx="270" cy="165" r="3" fill="#59d6e8" />
            <circle cx="375" cy="270" r="3" fill="#59d6e8" />
            <circle cx="270" cy="375" r="3" fill="#59d6e8" />
            <circle cx="165" cy="270" r="3" fill="#59d6e8" />
          </g>

          {/* Counter-Rotating Micro Gimbal */}
          <g className="animate-spin-ccw-fast" style={{ transformOrigin: '270px 270px' }}>
            <circle
              cx="270"
              cy="270"
              r="76"
              stroke="#ffc928"
              strokeOpacity="0.45"
              strokeWidth="1.4"
              strokeDasharray="8 6"
              filter="url(#atom-gold-glow)"
            />
          </g>

          {/* ======================================================== */}
          {/* LAYER 5: The Radiant Atomic Nucleus Core                 */}
          {/* ======================================================== */}
          <g style={{ transformOrigin: '270px 270px' }} className="animate-core-pulse">
            {/* Radiating Quantum Energy Rays */}
            <g stroke="#ffc928" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="2 4">
              <line x1="270" y1="195" x2="270" y2="215" />
              <line x1="270" y1="325" x2="270" y2="345" />
              <line x1="195" y1="270" x2="215" y2="270" />
              <line x1="325" y1="270" x2="345" y2="270" />
            </g>

            {/* Outer Proton-Neutron Binding Aura */}
            <circle
              cx="270"
              cy="270"
              r="58"
              fill="#ffc928"
              fillOpacity="0.08"
              stroke="#ffc928"
              strokeOpacity="0.35"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />

            {/* Inner Shield Ring */}
            <circle
              cx="270"
              cy="270"
              r="46"
              fill="#163866"
              stroke="#59d6e8"
              strokeWidth="1.5"
              filter="url(#atom-cyan-glow)"
            />

            {/* Dense Solid Gold Nucleus Singularity */}
            <circle
              cx="270"
              cy="270"
              r="34"
              fill="url(#nucleus-grad)"
              stroke="#ffc928"
              strokeWidth="2"
              filter="url(#atom-gold-glow)"
            />

            {/* Subatomic Particle Cluster Nodes orbiting inside Nucleus */}
            <circle cx="260" cy="262" r="5" fill="#ffffff" fillOpacity="0.8" />
            <circle cx="280" cy="265" r="4.5" fill="#ffc928" />
            <circle cx="268" cy="278" r="4.5" fill="#59d6e8" />

            {/* Central Precision Crosshairs */}
            <line x1="250" y1="270" x2="290" y2="270" stroke="#102b52" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="270" y1="250" x2="270" y2="290" stroke="#102b52" strokeWidth="1.8" strokeLinecap="round" />

            {/* Center Monogram */}
            <text
              x="270"
              y="274"
              fill="#102b52"
              fontSize="11"
              fontFamily="Space Grotesk, sans-serif"
              fontWeight="900"
              textAnchor="middle"
              dominantBaseline="middle"
              letterSpacing="0.06em"
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
