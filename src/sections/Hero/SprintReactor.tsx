import React, { useRef } from 'react'

export const SprintReactor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Direct DOM 3D perspective tilt (No extra glowing on touch/hover, pure tactile physical tilt)
  const applyTilt = (clientX: number, clientY: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const rawX = (clientX - rect.left) / rect.width - 0.5
    const rawY = (clientY - rect.top) / rect.height - 0.5
    const x = Math.max(-0.5, Math.min(0.5, rawX))
    const y = Math.max(-0.5, Math.min(0.5, rawY))
    el.style.transform = `perspective(1000px) rotateX(${-y * 22}deg) rotateY(${x * 22}deg)`
    el.style.transition = 'transform 0.08s ease-out'
  }

  const resetTilt = () => {
    const el = containerRef.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    applyTilt(e.clientX, e.clientY)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      applyTilt(e.touches[0].clientX, e.touches[0].clientY)
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      onTouchStart={(e) => {
        if (e.touches.length > 0) {
          applyTilt(e.touches[0].clientX, e.touches[0].clientY)
        }
      }}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetTilt}
      onTouchCancel={resetTilt}
      className="relative w-full max-w-[240px] xs:max-w-[270px] sm:max-w-[420px] lg:max-w-[550px] xl:max-w-[580px] aspect-square flex items-center justify-center select-none cursor-pointer mx-auto will-change-transform touch-none"
      style={{
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      aria-label="IEDC 24H Innovation Atom"
      role="img"
    >
      {/* Steady Ambient Radial Glows (Static Backdrop - No flaring or brightening on touch) */}
      <div
        className="absolute inset-2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,201,40,0.22)_0%,rgba(89,214,232,0.14)_42%,transparent_70%)] blur-2xl pointer-events-none -z-20"
        aria-hidden="true"
      />
      <div
        className="absolute -inset-6 rounded-full bg-[radial-gradient(circle_at_center,rgba(89,214,232,0.1)_0%,transparent_65%)] blur-3xl pointer-events-none -z-30"
        aria-hidden="true"
      />

      {/* Main Kinetic 3-Ring Atom with Continuous Organic Float & Orbital Movement */}
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
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="atom-cyan-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Nucleus Fusion Core Gradient (Deep High-Contrast Navy Base) */}
            <radialGradient id="nucleus-grad" cx="45%" cy="38%" r="60%">
              <stop offset="0%" stopColor="#1e4d8a" />
              <stop offset="60%" stopColor="#143666" />
              <stop offset="100%" stopColor="#0c2242" />
            </radialGradient>

            {/* Standard Ellipse Track Template for animateMotion (rx=225, ry=78, Center=250,250) */}
            <path
              id="atom-orbit-track"
              d="M 25,250 a 225,78 0 1,0 450,0 a 225,78 0 1,0 -450,0"
              fill="none"
            />
          </defs>

          {/* ======================================================== */}
          {/* THE 3 ATOM ORBITAL RINGS (CONTINUOUS SLOW GYROSCOPIC MOTION) */}
          {/* ======================================================== */}
          <g>
            {/* Continuous graceful 360° slow rotation of the 3 orbital planes */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 250 250"
              to="360 250 250"
              dur="36s"
              repeatCount="indefinite"
            />

            {/* --- RING 1: 30° Tilt (Drafting Gold Orbit • #ffc928) --- */}
            <g transform="rotate(30 250 250)">
              {/* Solid Continuous Orbital Ring */}
              <ellipse
                cx="250"
                cy="250"
                rx="225"
                ry="78"
                stroke="#ffc928"
                strokeOpacity="0.5"
                strokeWidth="2.4"
                filter="url(#atom-gold-glow)"
              />
              {/* Smooth Racing Gold Electron with Comet Tail */}
              <g>
                <animateMotion dur="4.4s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#atom-orbit-track" />
                </animateMotion>
                <circle cx="-22" cy="0" r="1.4" fill="#ffc928" fillOpacity="0.18" />
                <circle cx="-14" cy="0" r="2.6" fill="#ffc928" fillOpacity="0.4" />
                <circle cx="-7" cy="0" r="3.8" fill="#ffc928" fillOpacity="0.7" />
                <circle cx="0" cy="0" r="12" fill="#ffc928" fillOpacity="0.25" filter="url(#atom-gold-glow)" />
                <circle cx="0" cy="0" r="5.8" fill="#ffc928" filter="url(#atom-gold-glow)" />
                <circle cx="0" cy="0" r="2.6" fill="#ffffff" />
              </g>
            </g>

            {/* --- RING 2: 90° Vertical (Electric Cyan Orbit • #59d6e8) --- */}
            <g transform="rotate(90 250 250)">
              {/* Solid Continuous Orbital Ring */}
              <ellipse
                cx="250"
                cy="250"
                rx="225"
                ry="78"
                stroke="#59d6e8"
                strokeOpacity="0.5"
                strokeWidth="2.4"
                filter="url(#atom-cyan-glow)"
              />
              {/* Smooth Racing Cyan Electron with Comet Tail */}
              <g>
                <animateMotion dur="3.6s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#atom-orbit-track" />
                </animateMotion>
                <circle cx="-22" cy="0" r="1.4" fill="#59d6e8" fillOpacity="0.18" />
                <circle cx="-14" cy="0" r="2.6" fill="#59d6e8" fillOpacity="0.4" />
                <circle cx="-7" cy="0" r="3.8" fill="#59d6e8" fillOpacity="0.7" />
                <circle cx="0" cy="0" r="12" fill="#59d6e8" fillOpacity="0.25" filter="url(#atom-cyan-glow)" />
                <circle cx="0" cy="0" r="5.8" fill="#59d6e8" filter="url(#atom-cyan-glow)" />
                <circle cx="0" cy="0" r="2.6" fill="#ffffff" />
              </g>
            </g>

            {/* --- RING 3: 150° Tilt (Blueprint White Orbit • #ffffff) --- */}
            <g transform="rotate(150 250 250)">
              {/* Solid Continuous Orbital Ring */}
              <ellipse
                cx="250"
                cy="250"
                rx="225"
                ry="78"
                stroke="#ffffff"
                strokeOpacity="0.45"
                strokeWidth="2.2"
              />
              {/* Smooth Racing White/Gold Electron with Comet Tail */}
              <g>
                <animateMotion dur="5.2s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#atom-orbit-track" />
                </animateMotion>
                <circle cx="-22" cy="0" r="1.4" fill="#ffffff" fillOpacity="0.18" />
                <circle cx="-14" cy="0" r="2.6" fill="#ffffff" fillOpacity="0.4" />
                <circle cx="-7" cy="0" r="3.8" fill="#ffffff" fillOpacity="0.7" />
                <circle cx="0" cy="0" r="12" fill="#59d6e8" fillOpacity="0.22" filter="url(#atom-cyan-glow)" />
                <circle cx="0" cy="0" r="5.6" fill="#ffffff" filter="url(#atom-cyan-glow)" />
                <circle cx="0" cy="0" r="2.6" fill="#ffc928" />
              </g>
            </g>
          </g>

          {/* ======================================================== */}
          {/* THE RADIANT ATOMIC NUCLEUS (STATIONARY UPRIGHT CORE)     */}
          {/* ======================================================== */}
          <g>
            {/* Outer Breathing Plasma Corona Aura */}
            <circle
              cx="250"
              cy="250"
              r="54"
              fill="#ffc928"
              fillOpacity="0.14"
              filter="url(#atom-gold-glow)"
            >
              <animate attributeName="r" values="50;58;50" dur="3s" repeatCount="indefinite" />
              <animate attributeName="fillOpacity" values="0.1;0.22;0.1" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Outer Blueprint Shield Ring */}
            <circle
              cx="250"
              cy="250"
              r="42"
              fill="#163866"
              fillOpacity="0.8"
              stroke="#59d6e8"
              strokeWidth="1.4"
              strokeOpacity="0.6"
            />

            {/* Orbiting Subatomic Micro-Particles (Orbiting in Shield Ring) */}
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 250 250"
                to="360 250 250"
                dur="8s"
                repeatCount="indefinite"
              />
              <circle cx="250" cy="212" r="2.6" fill="#ffffff" fillOpacity="0.9" />
              <circle cx="283" cy="266" r="2.4" fill="#ffc928" />
              <circle cx="217" cy="266" r="2.4" fill="#59d6e8" />
            </g>

            {/* High-Contrast Core Sphere */}
            <circle
              cx="250"
              cy="250"
              r="32"
              fill="url(#nucleus-grad)"
              stroke="#ffc928"
              strokeWidth="2"
              filter="url(#atom-gold-glow)"
            />

            {/* Center Monogram Typography (IS2026 // IEDC - Stays Upright & Legible) */}
            <text
              x="250"
              y="244"
              fill="#ffffff"
              fontSize="12.5"
              fontFamily="Space Grotesk, sans-serif"
              fontWeight="800"
              textAnchor="middle"
              dominantBaseline="middle"
              letterSpacing="0.06em"
            >
              IS2026
            </text>
            <text
              x="250"
              y="258"
              fill="#ffc928"
              fontSize="8.5"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="700"
              textAnchor="middle"
              dominantBaseline="middle"
              letterSpacing="0.18em"
            >
              IEDC
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}

export default SprintReactor
