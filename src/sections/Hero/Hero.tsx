import React from 'react'
import { ArrowRight, Terminal, Sparkles, ShieldCheck } from 'lucide-react'
import { EVENT_CONFIG } from '@/config/event'
import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { Countdown } from './Countdown'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

export const Hero: React.FC = () => {
  const { scrollTo } = useSmoothScroll()

  const handleRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollTo('#register')
  }

  const handleLearnMoreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollTo('#about')
  }

  return (
    <section
      id="hero"
      aria-label="Hero section"
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-16 lg:py-24 overflow-hidden border-b border-white/5"
    >
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Event Intel, Title & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            {/* Organizer Tag / Identity Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0F1217] border border-white/10 rounded-xs">
              <span className="w-2 h-2 bg-[#B8FF00]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#B8FF00] font-semibold">
                {EVENT_CONFIG.organizer} PRESENTS
              </span>
              <span className="text-white/20">|</span>
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                24H HACKATHON
              </span>
            </div>

            {/* Editorial Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white font-['Space_Grotesk'] leading-[1.05]">
                IDEA SPRINT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-400">
                  2026
                </span>
                <span className="text-[#B8FF00]">.</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-xl leading-relaxed pt-2">
                A 24-hour sprint engineered for student builders, innovators, and thinkers to translate speculative concepts into high-impact ventures.
              </p>
            </div>

            {/* Live Countdown Component */}
            <div className="pt-2">
              <Countdown />
            </div>

            {/* Call To Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                href="#register"
                onClick={handleRegisterClick}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Register Your Team
              </Button>

              <Button
                variant="secondary"
                size="lg"
                href="#about"
                onClick={handleLearnMoreClick}
              >
                Explore Sprint Details
              </Button>
            </div>

            {/* Micro Credibility Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B8FF00]" />
                <span>Official IEDC CEC Event</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#B8FF00]" />
                <span>Mentorship & Cash Prizes</span>
              </div>
            </div>
          </div>

          {/* Right Column: Future Custom Animated Visual Centerpiece Container */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square bg-[#0D1015] border border-white/10 p-6 flex flex-col justify-between overflow-hidden group">
              {/* Technical Grid Overlay Inside Card */}
              <div
                className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none"
                aria-hidden="true"
              />

              {/* Decorative Header Bar */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#B8FF00]/80" />
                  <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                    CORE.SYS // 2026.RAD
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#B8FF00] bg-[#B8FF00]/10 px-2 py-0.5 border border-[#B8FF00]/20">
                  CENTERPIECE SLOT
                </span>
              </div>

              {/* Center Content Placeholder: Prepared for 3D Canvas / Custom Shader / Particle Node */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto py-8 text-center space-y-4">
                <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 border border-dashed border-white/20 group-hover:border-[#B8FF00]/50 transition-colors">
                  <div className="w-14 h-14 border border-[#B8FF00] rotate-45 flex items-center justify-center animate-[spin_12s_linear_infinite]">
                    <div className="w-6 h-6 bg-[#B8FF00]/20 -rotate-45" />
                  </div>
                  <Sparkles className="absolute text-[#B8FF00] w-6 h-6 animate-pulse" />
                </div>

                <div className="space-y-1">
                  <div className="font-['Space_Grotesk'] font-bold text-lg text-white">
                    Interactive Visual Centerpiece
                  </div>
                  <p className="font-mono text-xs text-slate-400 max-w-xs">
                    Reserved architectural container for custom 3D web-GL / SVG particle accelerator in Stage 2.
                  </p>
                </div>
              </div>

              {/* Decorative Technical Footer Bar */}
              <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[10px] text-slate-500">
                <span>FPS: 60 LOCKED</span>
                <span>STATUS: READY FOR STAGE 02</span>
              </div>

              {/* Corner Markers */}
              <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#B8FF00]" />
              <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#B8FF00]" />
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#B8FF00]" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#B8FF00]" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
