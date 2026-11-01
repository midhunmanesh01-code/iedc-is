import React from 'react'
import { ArrowRight, Terminal, Sparkles, ShieldCheck, MapPin, Clock, Trophy, Users, CheckCircle2 } from 'lucide-react'
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
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-6 sm:py-16 lg:py-24 overflow-hidden border-b border-white/5"
    >
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Event Intel, Title & CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-8 text-left">
            {/* Organizer Tag / Identity Badge */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#131518] border border-white/10 rounded-xs">
              <span className="w-2 h-2 bg-[#FF5500]" />
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-[#FF5500] font-semibold">
                {EVENT_CONFIG.organizer} PRESENTS
              </span>
              <span className="text-white/20">|</span>
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400">
                24H HACKATHON
              </span>
            </div>

            {/* Editorial Title */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.08]">
                IDEA SPRINT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-[#FF7A1A] to-[#FFAA00]">
                  2026
                </span>
                <span className="text-[#FF5500]">.</span>
              </h1>
              <p className="text-sm sm:text-lg lg:text-xl text-zinc-300 font-normal max-w-xl leading-relaxed pt-1 sm:pt-2">
                A 24-hour sprint engineered for student builders, innovators, and thinkers to translate speculative concepts into high-impact ventures.
              </p>
            </div>

            {/* Mobile-First Adaptive Quick Intel Chips Bar */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#131518] border border-white/10 rounded-full text-xs font-mono text-zinc-300 whitespace-nowrap shrink-0">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>CEC Chengannur</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#131518] border border-white/10 rounded-full text-xs font-mono text-zinc-300 whitespace-nowrap shrink-0">
                <Clock className="w-3.5 h-3.5 text-[#FF5500]" />
                <span>24-Hour Non-Stop</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#131518] border border-white/10 rounded-full text-xs font-mono text-zinc-300 whitespace-nowrap shrink-0">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>₹50,000+ Prize Pool</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#131518] border border-white/10 rounded-full text-xs font-mono text-zinc-300 whitespace-nowrap shrink-0">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>2–4 Per Squad</span>
              </div>
            </div>

            {/* Live Countdown Component */}
            <div className="pt-1 sm:pt-2">
              <Countdown />
            </div>

            {/* Call To Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button
                variant="primary"
                size="lg"
                href="#register"
                onClick={handleRegisterClick}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto active:scale-[0.98]"
              >
                Register Your Team
              </Button>

              <Button
                variant="secondary"
                size="lg"
                href="#about"
                onClick={handleLearnMoreClick}
                className="w-full sm:w-auto active:scale-[0.98]"
              >
                Explore Sprint Details
              </Button>
            </div>

            {/* Micro Credibility Badges with Adaptive Signals */}
            <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Official IEDC CEC Event</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>Mentorship & Cash Prizes</span>
              </div>
            </div>
          </div>

          {/* Right Column: Holographic Cyber Sprint Pass */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-full max-w-md bg-[#131518] border border-white/15 p-5 sm:p-6 flex flex-col justify-between overflow-hidden group shadow-2xl rounded-xs">
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
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5500]/80" />
                  <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                    ACCESS.PASS // 2026.SYS
                  </span>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30 rounded-xs flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ADMISSION OPEN
                </span>
              </div>

              {/* Center Content: Cyber Event Credential */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto py-6 sm:py-8 text-center space-y-4">
                <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 border border-dashed border-[#FF5500]/40 group-hover:border-[#FF5500] transition-colors rounded-xs">
                  <div className="w-12 h-12 border border-[#FF5500] rotate-45 flex items-center justify-center animate-[spin_16s_linear_infinite]">
                    <div className="w-5 h-5 bg-[#FFAA00]/20 -rotate-45" />
                  </div>
                  <Sparkles className="absolute text-amber-400 w-5 h-5 animate-pulse" />
                </div>

                <div className="space-y-1">
                  <div className="font-mono text-[10px] text-amber-400 uppercase tracking-widest font-semibold">
                    COLLEGE OF ENGINEERING CHENGANNUR
                  </div>
                  <div className="font-display font-bold text-xl sm:text-2xl text-white">
                    24-HOUR SPRINT ARENA
                  </div>
                  <p className="font-mono text-xs text-zinc-400 max-w-xs mx-auto">
                    Full access pass for registered teams: Hardware workbench, mentor checkpoints, food & power desks.
                  </p>
                </div>

                {/* Key Pass Specs */}
                <div className="grid grid-cols-3 gap-2 w-full pt-2 font-mono text-center">
                  <div className="p-2 bg-[#0C0D0E] border border-white/5 rounded-xs">
                    <div className="text-[10px] text-zinc-500 uppercase">TEAMS</div>
                    <div className="text-sm font-bold text-[#FF5500]">30 SQUADS</div>
                  </div>
                  <div className="p-2 bg-[#0C0D0E] border border-white/5 rounded-xs">
                    <div className="text-[10px] text-zinc-500 uppercase">ENTRY</div>
                    <div className="text-sm font-bold text-amber-300">FREE (0 INR)</div>
                  </div>
                  <div className="p-2 bg-[#0C0D0E] border border-white/5 rounded-xs">
                    <div className="text-[10px] text-zinc-500 uppercase">STATUS</div>
                    <div className="text-sm font-bold text-emerald-400 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> VERIFIED
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Technical Footer Bar */}
              <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[10px] text-zinc-500">
                <span className="tracking-widest">ID: CEC-IS-2026-LIVE</span>
                <span className="text-[#FF5500] font-semibold">IEDC BOOTCAMP</span>
              </div>

              {/* Corner Markers */}
              <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#FF5500]" />
              <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#FF5500]" />
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#FF5500]" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#FF5500]" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
