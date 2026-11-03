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
      className="group relative w-full max-w-[310px] sm:max-w-[430px] lg:max-w-[490px] aspect-square flex items-center justify-center select-none cursor-crosshair mx-auto will-change-transform"
      style={{
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      aria-label="IEDC 24H Innovation Atom Model"
      role="img"
    >
      {/* Blueprint Ambient Radial Glows (Blends naturally into #102b52 canvas) */}
      <div
        className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,201,40,0.2)_0%,rgba(89,214,232,0.12)_42%,transparent_70%)] blur-2xl pointer-events-none -z-20 animate-core-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute -inset-6 rounded-full bg-[radial-gradient(circle_at_center,rgba(89,214,232,0.08)_0%,transparent_65%)] blur-3xl pointer-events-none -z-30"
        aria-hidden="true"
      />

      {/* Dynamic Cursor Light Flare */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"
        style={{
          background:
            'radial-gradient(circle 160px at var(--flare-x, 50%) var(--flare-y, 50%), rgba(255, 201, 40, 0.25), rgba(89, 214, 232, 0.1) 40%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Main Vector Innovation Atom */}
      <div className="relative w-full h-full flex items-center justify-center animate-reactor-float">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Blueprint Glow Filters */}
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
            <radialGradient id="nucleus-grad" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#fff0a0" />
              <stop offset="55%" stopColor="#ffc928" />
              <stop offset="80%" stopColor="#d98f0d" />
              <stop offset="100%" stopColor="#163866" />
            </radialGradient>

            {/* Ellipse Track Template for animateMotion (rx=195, ry=68, Center=250,250) */}
            <path
              id="atom-orbit-track"
              d="M 55,250 a 195,68 0 1,0 390,0 a 195,68 0 1,0 -390,0"
              fill="none"
            />
          </defs>

          {/* ======================================================== */}
          {/* LAYER 1: Blueprint Drafting Grid & Technical Coordinates */}
          {/* ======================================================== */}
          {/* Continuous Blueprint Axis Lines */}
          <g stroke="#59d6e8" strokeOpacity="0.1" strokeWidth="1">
            <line x1="250" y1="30" x2="250" y2="470" />
            <line x1="30" y1="250" x2="470" y2="250" />
            <circle cx="250" cy="250" r="230" strokeOpacity="0.06" />
          </g>

          {/* Blueprint Corner Reticle Crosshairs (+) */}
          <g stroke="#59d6e8" strokeOpacity="0.4" strokeWidth="1.2">
            {/* Top-Left Crosshair */}
            <line x1="42" y1="46" x2="50" y2="46" />
            <line x1="46" y1="42" x2="46" y2="50" />

            {/* Top-Right Crosshair */}
            <line x1="450" y1="46" x2="458" y2="46" />
            <line x1="454" y1="42" x2="454" y2="50" />

            {/* Bottom-Left Crosshair */}
            <line x1="42" y1="454" x2="50" y2="454" />
            <line x1="46" y1="450" x2="46" y2="458" />

            {/* Bottom-Right Crosshair */}
            <line x1="450" y1="454" x2="458" y2="454" />
            <line x1="454" y1="450" x2="454" y2="458" />
          </g>

          {/* Blueprint Technical Annotations (Matching Site Theme) */}
          <text
            x="58"
            y="48"
            fill="#59d6e8"
            fontSize="7"
            fontFamily="JetBrains Mono, monospace"
            opacity="0.5"
            letterSpacing="0.12em"
          >
            FIG.01 // INNOVATION ATOM
          </text>
          <text
            x="442"
            y="457"
            fill="#59d6e8"
            fontSize="6.5"
            fontFamily="JetBrains Mono, monospace"
            textAnchor="end"
            opacity="0.45"
            letterSpacing="0.08em"
          >
            9.3173° N, 76.6149° E // CEC
          </text>
          <text
            x="58"
            y="457"
            fill="#ffc928"
            fontSize="6.5"
            fontFamily="JetBrains Mono, monospace"
            opacity="0.55"
            letterSpacing="0.1em"
          >
            24H SPRINT // IEDC
          </text>

          {/* ======================================================== */}
          {/* LAYER 2: The 3 Brand Orbital Shells (Gold, Cyan, White)  */}
          {/* ======================================================== */}

          {/* --- ORBITAL 1: 30° Tilt (Drafting Gold Orbit • #ffc928) --- */}
          <g transform="rotate(30 250 250)">
            {/* Solid Continuous Orbital Ring */}
            <ellipse
              cx="250"
              cy="250"
              rx="195"
              ry="68"
              stroke="#ffc928"
              strokeOpacity="0.45"
              strokeWidth="1.8"
              filter="url(#atom-gold-glow)"
            />
            {/* Racing Gold Electron with Comet Trail */}
            <g>
              <animateMotion dur="4.4s" repeatCount="indefinite" rotate="auto">
                <mpath href="#atom-orbit-track" />
              </animateMotion>
              <circle cx="-16" cy="0" r="1.2" fill="#ffc928" fillOpacity="0.2" />
              <circle cx="-10" cy="0" r="2.0" fill="#ffc928" fillOpacity="0.4" />
              <circle cx="-5" cy="0" r="3.0" fill="#ffc928" fillOpacity="0.7" />
              <circle cx="0" cy="0" r="9" fill="#ffc928" fillOpacity="0.25" filter="url(#atom-gold-glow)" />
              <circle cx="0" cy="0" r="4.6" fill="#ffc928" filter="url(#atom-gold-glow)" />
              <circle cx="0" cy="0" r="2.0" fill="#ffffff" />
            </g>
          </g>

          {/* --- ORBITAL 2: 90° Vertical (Electric Cyan Orbit • #59d6e8) --- */}
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
            {/* Racing Cyan Electron with Comet Trail */}
            <g>
              <animateMotion dur="3.6s" repeatCount="indefinite" rotate="auto">
                <mpath href="#atom-orbit-track" />
              </animateMotion>
              <circle cx="-16" cy="0" r="1.2" fill="#59d6e8" fillOpacity="0.2" />
              <circle cx="-10" cy="0" r="2.0" fill="#59d6e8" fillOpacity="0.4" />
              <circle cx="-5" cy="0" r="3.0" fill="#59d6e8" fillOpacity="0.7" />
              <circle cx="0" cy="0" r="9" fill="#59d6e8" fillOpacity="0.25" filter="url(#atom-cyan-glow)" />
              <circle cx="0" cy="0" r="4.6" fill="#59d6e8" filter="url(#atom-cyan-glow)" />
              <circle cx="0" cy="0" r="2.0" fill="#ffffff" />
            </g>
          </g>

          {/* --- ORBITAL 3: 150° Tilt (Blueprint White Orbit • #ffffff) --- */}
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
            {/* Racing White Electron with Cyan Glow */}
            <g>
              <animateMotion dur="5.0s" repeatCount="indefinite" rotate="auto">
                <mpath href="#atom-orbit-track" />
              </animateMotion>
              <circle cx="-16" cy="0" r="1.2" fill="#ffffff" fillOpacity="0.2" />
              <circle cx="-10" cy="0" r="2.0" fill="#ffffff" fillOpacity="0.4" />
              <circle cx="-5" cy="0" r="3.0" fill="#ffffff" fillOpacity="0.7" />
              <circle cx="0" cy="0" r="9" fill="#59d6e8" fillOpacity="0.22" filter="url(#atom-cyan-glow)" />
              <circle cx="0" cy="0" r="4.4" fill="#ffffff" filter="url(#atom-cyan-glow)" />
              <circle cx="0" cy="0" r="2.0" fill="#ffc928" />
            </g>
          </g>

          {/* ======================================================== */}
          {/* LAYER 3: The IEDC Innovation Nucleus Core                */}
          {/* ======================================================== */}
          <g>
            {/* Outer Breathing Energy Corona */}
            <circle
              cx="250"
              cy="250"
              r="42"
              fill="#ffc928"
              fillOpacity="0.12"
              filter="url(#atom-gold-glow)"
            >
              <animate attributeName="r" values="38;45;38" dur="3s" repeatCount="indefinite" />
              <animate attributeName="fillOpacity" values="0.08;0.18;0.08" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Inner Blueprint Shield Ring */}
            <circle
              cx="250"
              cy="250"
              r="32"
              fill="#163866"
              stroke="#59d6e8"
              strokeWidth="1.4"
              strokeOpacity="0.6"
            />

            {/* Dense Solid Gold Singularity Core */}
            <circle
              cx="250"
              cy="250"
              r="24"
              fill="url(#nucleus-grad)"
              stroke="#ffc928"
              strokeWidth="1.8"
              filter="url(#atom-gold-glow)"
            />

            {/* Subatomic Particle Cluster (Orbiting inside Core) */}
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 250 250"
                to="360 250 250"
                dur="8s"
                repeatCount="indefinite"
              />
              <circle cx="243" cy="244" r="3.2" fill="#ffffff" fillOpacity="0.9" />
              <circle cx="257" cy="245" r="3" fill="#ffc928" />
              <circle cx="249" cy="257" r="3" fill="#59d6e8" />
            </g>

            {/* Central Precision Monogram (IS26) */}
            <text
              x="250"
              y="251"
              fill="#102b52"
              fontSize="9"
              fontFamily="Space Grotesk, sans-serif"
              fontWeight="900"
              textAnchor="middle"
              dominantBaseline="middle"
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
