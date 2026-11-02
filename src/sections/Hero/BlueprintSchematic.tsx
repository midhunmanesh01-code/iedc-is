import React from 'react'

export const BlueprintSchematic: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg lg:max-w-xl mx-auto flex flex-col items-center select-none group">
      {/* Blueprint Drawing Container with Subtle Technical Border */}
      <div className="relative w-full aspect-[540/460] bg-[#163866]/40 backdrop-blur-xs border border-[#59d6e8]/30 rounded-xs p-2 overflow-hidden shadow-2xl">
        {/* Fine Technical Grid inside Schematic */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-50 pointer-events-none" aria-hidden="true" />

        {/* Technical Corner Crosshairs */}
        <span className="absolute top-1 left-1 font-mono text-[10px] text-[#59d6e8]/60 leading-none pointer-events-none">+</span>
        <span className="absolute top-1 right-1 font-mono text-[10px] text-[#59d6e8]/60 leading-none pointer-events-none">+</span>
        <span className="absolute bottom-1 left-1 font-mono text-[10px] text-[#59d6e8]/60 leading-none pointer-events-none">+</span>
        <span className="absolute bottom-1 right-1 font-mono text-[10px] text-[#59d6e8]/60 leading-none pointer-events-none">+</span>

        {/* Blueprint Vector Graphic */}
        <svg
          viewBox="0 0 540 440"
          className="w-full h-full relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Technical blueprint schematic of the Idea Sprint lightbulb concept"
          role="img"
        >
          <defs>
            {/* Glow Filter for Drafting Gold Core */}
            <filter id="gold-core-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Cyan Glow Filter */}
            <filter id="cyan-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Dimension Marker Arrows */}
            <marker id="arrow-up" viewBox="0 0 10 10" refX="5" refY="2" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 6 L 5 0 L 10 6 z" fill="#59d6e8" />
            </marker>
            <marker id="arrow-down" viewBox="0 0 10 10" refX="5" refY="8" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 2 L 5 8 L 10 2 z" fill="#59d6e8" />
            </marker>
            <marker id="arrow-left" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 6 0 L 0 5 L 6 10 z" fill="#59d6e8" />
            </marker>
            <marker id="arrow-right" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 2 0 L 8 5 L 2 10 z" fill="#59d6e8" />
            </marker>
          </defs>

          {/* Blueprint Axis Guide Lines */}
          <line x1="270" y1="20" x2="270" y2="420" stroke="#59d6e8" strokeWidth="1" strokeDasharray="6 4" strokeOpacity="0.4" />
          <line x1="60" y1="180" x2="480" y2="180" stroke="#59d6e8" strokeWidth="1" strokeDasharray="6 4" strokeOpacity="0.3" />

          {/* Radiating Energy Rays from Drafting Gold Filament */}
          <g stroke="#ffc928" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.85">
            <line x1="270" y1="120" x2="270" y2="80" />
            <line x1="310" y1="130" x2="340" y2="100" />
            <line x1="230" y1="130" x2="200" y2="100" />
            <line x1="330" y1="160" x2="370" y2="150" />
            <line x1="210" y1="160" x2="170" y2="150" />
            <line x1="335" y1="195" x2="375" y2="205" />
            <line x1="205" y1="195" x2="165" y2="205" />
          </g>

          {/* Vertical Dimension Line on Left (100+ MINDS) */}
          <g className="text-cyan-400">
            <line x1="170" y1="110" x2="205" y2="110" stroke="#59d6e8" strokeWidth="1" strokeOpacity="0.7" />
            <line x1="170" y1="270" x2="205" y2="270" stroke="#59d6e8" strokeWidth="1" strokeOpacity="0.7" />
            <line x1="185" y1="112" x2="185" y2="268" stroke="#59d6e8" strokeWidth="1.5" markerStart="url(#arrow-up)" markerEnd="url(#arrow-down)" />
            <text
              x="-190"
              y="177"
              transform="rotate(-90)"
              fill="#59d6e8"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="0.16em"
              textAnchor="middle"
              className="font-bold"
            >
              100+ MINDS
            </text>
          </g>

          {/* Horizontal Dimension Line at Base (O 280 = 24 HRS) */}
          <g>
            <line x1="210" y1="315" x2="210" y2="350" stroke="#59d6e8" strokeWidth="1" strokeOpacity="0.7" />
            <line x1="330" y1="315" x2="330" y2="350" stroke="#59d6e8" strokeWidth="1" strokeOpacity="0.7" />
            <line x1="212" y1="340" x2="328" y2="340" stroke="#59d6e8" strokeWidth="1.5" markerStart="url(#arrow-left)" markerEnd="url(#arrow-right)" />
            <text
              x="270"
              y="358"
              fill="#59d6e8"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="0.12em"
              textAnchor="middle"
              className="font-bold"
            >
              O 280 = 24 HRS
            </text>
          </g>

          {/* Filament Conductor Leads */}
          <line x1="258" y1="190" x2="258" y2="280" stroke="#ffc928" strokeWidth="2.5" />
          <line x1="282" y1="190" x2="282" y2="280" stroke="#ffc928" strokeWidth="2.5" />

          {/* Incandescent Lightbulb Glass Envelope Contour */}
          <path
            d="M 270 95
               A 85 85 0 0 1 345 220
               C 345 245 320 262 312 280
               L 228 280
               C 220 262 195 245 195 220
               A 85 85 0 0 1 270 95 Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
          />

          {/* Inner Lightbulb Glass Reflection Line */}
          <path
            d="M 230 130
               A 70 70 0 0 1 270 110"
            fill="none"
            stroke="#59d6e8"
            strokeWidth="1.8"
            strokeOpacity="0.6"
            strokeLinecap="round"
          />

          {/* Drafting Gold Filament Core Emitter */}
          <circle
            cx="270"
            cy="180"
            r="32"
            fill="#ffc928"
            filter="url(#gold-core-glow)"
            className="animate-pulse"
          />
          <circle
            cx="270"
            cy="180"
            r="26"
            fill="#ffe58f"
            opacity="0.8"
          />

          {/* Screw Thread Base (Ribbed Contacts) */}
          <g stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Thread 1 */}
            <path d="M 232 288 Q 270 293 308 288" />
            {/* Thread 2 */}
            <path d="M 234 298 Q 270 303 306 298" />
            {/* Thread 3 */}
            <path d="M 238 308 Q 270 313 302 308" />
            {/* Tapered Contact Terminal */}
            <polygon points="244,316 270,328 296,316" fill="#163866" stroke="#ffffff" strokeWidth="2.5" />
          </g>

          {/* Engineering Callout Leader Lines & Badges */}
          {/* Callout A: (A) PROBLEM */}
          <g className="cursor-pointer group/callout transition-transform">
            <line x1="335" y1="130" x2="415" y2="130" stroke="#ffc928" strokeWidth="1.5" />
            <circle cx="425" cy="130" r="10" stroke="#ffc928" strokeWidth="1.5" fill="#102b52" />
            <text x="425" y="134" fill="#ffc928" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">
              A
            </text>
            <text x="445" y="134" fill="#ffffff" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold" letterSpacing="0.08em">
              PROBLEM
            </text>
          </g>

          {/* Callout B: (B) TEAM */}
          <g className="cursor-pointer group/callout">
            <line x1="342" y1="180" x2="415" y2="180" stroke="#ffc928" strokeWidth="1.5" />
            <circle cx="425" cy="180" r="10" stroke="#ffc928" strokeWidth="1.5" fill="#102b52" />
            <text x="425" y="184" fill="#ffc928" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">
              B
            </text>
            <text x="445" y="184" fill="#ffffff" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold" letterSpacing="0.08em">
              TEAM
            </text>
          </g>

          {/* Callout C: (C) PROTOTYPE */}
          <g className="cursor-pointer group/callout">
            <line x1="324" y1="240" x2="415" y2="240" stroke="#ffc928" strokeWidth="1.5" />
            <circle cx="425" cy="240" r="10" stroke="#ffc928" strokeWidth="1.5" fill="#102b52" />
            <text x="425" y="244" fill="#ffc928" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">
              C
            </text>
            <text x="445" y="244" fill="#ffffff" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold" letterSpacing="0.08em">
              PROTOTYPE
            </text>
          </g>

          {/* Callout D: (D) PITCH */}
          <g className="cursor-pointer group/callout">
            <line x1="300" y1="300" x2="415" y2="300" stroke="#ffc928" strokeWidth="1.5" />
            <circle cx="425" cy="300" r="10" stroke="#ffc928" strokeWidth="1.5" fill="#102b52" />
            <text x="425" y="304" fill="#ffc928" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">
              D
            </text>
            <text x="445" y="304" fill="#ffffff" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold" letterSpacing="0.08em">
              PITCH
            </text>
          </g>
        </svg>

        {/* Blueprint Title Block (Bottom-Right Engineering Specification Stamp) */}
        <div className="absolute bottom-2 right-2 z-20 bg-[#102b52]/90 border border-[#59d6e8]/50 p-2 sm:p-2.5 rounded-xs font-mono text-[9px] sm:text-[10px] text-zinc-300 max-w-[210px] sm:max-w-[240px] shadow-lg">
          <div className="text-[#59d6e8] uppercase tracking-wider font-bold border-b border-[#59d6e8]/30 pb-0.5 mb-1 flex items-center justify-between">
            <span>PROJECT SPEC</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffc928] animate-pulse" />
          </div>
          <div className="text-white font-bold tracking-tight uppercase truncate">
            IEDC IDEA SPRINT 2026
          </div>
          <div className="flex justify-between text-[#a0c0e0] text-[8px] sm:text-[9px] pt-0.5">
            <span>DATE: [TBA 2026]</span>
            <span className="text-[#ffc928] font-bold">[CEC CAMPUS]</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlueprintSchematic
