import React, { useRef } from 'react'

export const SprintReactor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Direct DOM 3D perspective tilt & responsive light flare (0 React re-renders)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg)`
    el.style.setProperty('--flare-x', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--flare-y', `${(y + 0.5) * 100}%`)
    el.style.transition = 'transform 0.08s ease-out'
  }

  const handleMouseLeave = () => {
    const el = containerRef.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    el.style.setProperty('--flare-x', '50%')
    el.style.setProperty('--flare-y', '50%')
    el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full max-w-[310px] sm:max-w-[420px] lg:max-w-[480px] aspect-square flex items-center justify-center select-none cursor-crosshair mx-auto will-change-transform"
      style={{
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      aria-label="IEDC 24H Innovation Atom"
      role="img"
    >
      {/* Seamless Ambient Radial Glows */}
      <div
        className="absolute inset-6 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,201,40,0.22)_0%,rgba(89,214,232,0.12)_42%,transparent_70%)] blur-2xl pointer-events-none -z-20 animate-core-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute -inset-4 rounded-full bg-[radial-gradient(circle_at_center,rgba(89,214,232,0.08)_0%,transparent_65%)] blur-3xl pointer-events-none -z-30"
        aria-hidden="true"
      />

      {/* Dynamic Cursor Light Flare */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none opacity-35 group-hover:opacity-55 transition-opacity duration-300 -z-10"
        style={{
          background:
            'radial-gradient(circle 150px at var(--flare-x, 50%) var(--flare-y, 50%), rgba(255, 201, 40, 0.25), rgba(89, 214, 232, 0.1) 40%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Main Kinetic Innovation Atom */}
      <div className="relative w-full h-full flex items-center justify-center animate-reactor-float">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Luminous Glow Filters */}
            <filter id="atom-gold-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="atom-cyan-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Nucleus Fusion Core Gradient */}
            <radialGradient id="nucleus-gradient" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#fff0a0" />
              <stop offset="50%" stopColor="#ffc928" />
              <stop offset="78%" stopColor="#d98f0d" />
              <stop offset="100%" stopColor="#163866" />
            </radialGradient>

            {/* Standard Ellipse Track Template for animateMotion (rx=195, ry=68) */}
            <path
              id="atom-orbit-track"
              d="M 55,250 a 195,68 0 1,0 390,0 a 195,68 0 1,0 -390,0"
              fill="none"
            />
          </defs>

          {/* ======================================================== */}
          {/* THE 3 CLASSIC SYMMETRICAL ATOM ORBITAL SHELLS (60° APART) */}
          {/* ======================================================== */}

          {/* --- ORBITAL 1: 30° Tilt (Drafting Gold Orbit) --- */}
          <g transform="rotate(30 250 250)">
            {/* Solid Continuous Orbital Ring */}
            <ellipse
              cx="250"
              cy="250"
              rx="195"
              ry="68"
              stroke="#ffc928"
              strokeOpacity="0.42"
              strokeWidth="1.8"
              filter="url(#atom-gold-glow)"
            />
            {/* Smooth Racing Gold Electron */}
            <g>
              <animateMotion dur="4.4s" repeatCount="indefinite" rotate="auto">
                <mpath href="#atom-orbit-track" />
              </animateMotion>
              <circle cx="-18" cy="0" r="1.2" fill="#ffc928" fillOpacity="0.18" />
              <circle cx="-11" cy="0" r="2.2" fill="#ffc928" fillOpacity="0.4" />
              <circle cx="-5" cy="0" r="3.2" fill="#ffc928" fillOpacity="0.7" />
              <circle cx="0" cy="0" r="10" fill="#ffc928" fillOpacity="0.22" filter="url(#atom-gold-glow)" />
              <circle cx="0" cy="0" r="5" fill="#ffc928" filter="url(#atom-gold-glow)" />
              <circle cx="0" cy="0" r="2.2" fill="#ffffff" />
            </g>
          </g>

          {/* --- ORBITAL 2: 90° Vertical Tilt (Electric Cyan Orbit) --- */}
          <g transform="rotate(90 250 250)">
            {/* Solid Continuous Orbital Ring */}
            <ellipse
              cx="250"
              cy="250"
              rx="195"
              ry="68"
              stroke="#59d6e8"
              strokeOpacity="0.45"
              strokeWidth="1.8"
              filter="url(#atom-cyan-glow)"
            />
            {/* Smooth Racing Cyan Electron */}
            <g>
              <animateMotion dur="3.5s" repeatCount="indefinite" rotate="auto">
                <mpath href="#atom-orbit-track" />
              </animateMotion>
              <circle cx="-18" cy="0" r="1.2" fill="#59d6e8" fillOpacity="0.18" />
              <circle cx="-11" cy="0" r="2.2" fill="#59d6e8" fillOpacity="0.4" />
              <circle cx="-5" cy="0" r="3.2" fill="#59d6e8" fillOpacity="0.7" />
              <circle cx="0" cy="0" r="10" fill="#59d6e8" fillOpacity="0.22" filter="url(#atom-cyan-glow)" />
              <circle cx="0" cy="0" r="5" fill="#59d6e8" filter="url(#atom-cyan-glow)" />
              <circle cx="0" cy="0" r="2.2" fill="#ffffff" />
            </g>
          </g>

          {/* --- ORBITAL 3: 150° Tilt (Blueprint White Orbit) --- */}
          <g transform="rotate(150 250 250)">
            {/* Solid Continuous Orbital Ring */}
            <ellipse
              cx="250"
              cy="250"
              rx="195"
              ry="68"
              stroke="#ffffff"
              strokeOpacity="0.38"
              strokeWidth="1.6"
            />
            {/* Smooth Racing White/Gold Electron */}
            <g>
              <animateMotion dur="5.0s" repeatCount="indefinite" rotate="auto">
                <mpath href="#atom-orbit-track" />
              </animateMotion>
              <circle cx="-18" cy="0" r="1.2" fill="#ffffff" fillOpacity="0.18" />
              <circle cx="-11" cy="0" r="2.2" fill="#ffffff" fillOpacity="0.4" />
              <circle cx="-5" cy="0" r="3.2" fill="#ffffff" fillOpacity="0.7" />
              <circle cx="0" cy="0" r="10" fill="#59d6e8" fillOpacity="0.2" filter="url(#atom-cyan-glow)" />
              <circle cx="0" cy="0" r="4.8" fill="#ffffff" filter="url(#atom-cyan-glow)" />
              <circle cx="0" cy="0" r="2.2" fill="#ffc928" />
            </g>
          </g>

          {/* ======================================================== */}
          {/* THE RADIANT ATOMIC NUCLEUS (LUMINOUS ENERGY CORE)        */}
          {/* ======================================================== */}
          <g>
            {/* Outer Breathing Plasma Aura */}
            <circle
              cx="250"
              cy="250"
              r="40"
              fill="#ffc928"
              fillOpacity="0.12"
              filter="url(#atom-gold-glow)"
            >
              <animate attributeName="r" values="36;44;36" dur="3s" repeatCount="indefinite" />
              <animate attributeName="fillOpacity" values="0.08;0.18;0.08" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Dense Solid Gold Nucleus Singularity */}
            <circle
              cx="250"
              cy="250"
              r="26"
              fill="url(#nucleus-gradient)"
              stroke="#ffc928"
              strokeWidth="1.8"
              filter="url(#atom-gold-glow)"
            />

            {/* Subatomic Particle Cluster Orbiting inside Nucleus */}
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 250 250"
                to="360 250 250"
                dur="8s"
                repeatCount="indefinite"
              />
              <circle cx="242" cy="244" r="3.5" fill="#ffffff" fillOpacity="0.9" />
              <circle cx="258" cy="245" r="3.2" fill="#ffc928" />
              <circle cx="249" cy="258" r="3.2" fill="#59d6e8" />
            </g>

            {/* Central Precision Spark */}
            <circle cx="250" cy="250" r="1.5" fill="#ffffff" />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default SprintReactor
