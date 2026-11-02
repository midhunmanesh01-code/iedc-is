import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { Countdown } from './Countdown'
import { BlueprintSchematic } from './BlueprintSchematic'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

export const Hero: React.FC = () => {
  const { scrollTo } = useSmoothScroll()

  const handleRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollTo('#register')
  }

  const handleScheduleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollTo('#schedule')
  }

  return (
    <section
      id="hero"
      aria-label="Hero section"
      className="relative min-h-[calc(100dvh-4.5rem)] flex items-center justify-center py-8 sm:py-14 lg:py-18 overflow-hidden border-b border-[#59d6e8]/20"
    >
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Authentic Blueprint Editorial Title, Details & CTAs from Theme.jpeg */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#163866]/80 border border-[#59d6e8]/30 rounded-xs">
              <span className="w-2 h-2 rounded-full bg-[#ffc928] shadow-[0_0_8px_#ffc928]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#59d6e8] font-bold">
                IEDC BOOTCAMP CEC • 24H SPRINT
              </span>
            </div>

            {/* Headline from Theme.jpeg: "From napkin sketch to real startup." */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[4.2rem] font-black tracking-tight text-white font-display leading-[1.08]">
                From napkin sketch <br />
                <span className="relative inline-block text-[#ffc928] mt-1">
                  to real startup.
                  {/* Blueprint Underline Bar from Theme.jpeg */}
                  <span className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-[3px] sm:h-[4px] bg-[#ffc928] rounded-full shadow-[0_0_12px_rgba(255,201,40,0.5)]" />
                </span>
              </h1>

              {/* Subtitle from Theme.jpeg */}
              <p className="font-mono text-xs sm:text-sm lg:text-base text-[#c4daf2] font-normal max-w-xl leading-relaxed pt-2">
                A 24-hour innovation sprint where teams draft, build and pitch ideas to mentors and a live jury. Bring a problem.
              </p>
            </div>

            {/* CTAs from Theme.jpeg */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button
                variant="primary"
                size="lg"
                href="#register"
                onClick={handleRegisterClick}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto active:scale-[0.98] !rounded-md px-6 py-3 font-mono font-bold text-sm tracking-wider"
              >
                JOIN THE SPRINT &gt;
              </Button>

              <Button
                variant="secondary"
                size="lg"
                href="#schedule"
                onClick={handleScheduleClick}
                className="w-full sm:w-auto active:scale-[0.98] !rounded-md px-6 py-3 font-mono font-bold text-sm border-white/60 hover:border-[#ffc928] text-white"
              >
                VIEW SCHEDULE
              </Button>
            </div>

            {/* Stats Bar from Theme.jpeg */}
            <div className="pt-3 border-t border-[#59d6e8]/20 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 font-mono">
              <div className="p-2 sm:p-2.5 bg-[#163866]/60 border border-[#59d6e8]/20 rounded-xs">
                <div className="text-xl sm:text-2xl font-black text-[#ffc928]">24H</div>
                <div className="text-[10px] sm:text-xs text-[#a0c4e8] uppercase">non-stop build</div>
              </div>
              <div className="p-2 sm:p-2.5 bg-[#163866]/60 border border-[#59d6e8]/20 rounded-xs">
                <div className="text-xl sm:text-2xl font-black text-[#ffc928]">100+</div>
                <div className="text-[10px] sm:text-xs text-[#a0c4e8] uppercase">innovators</div>
              </div>
              <div className="p-2 sm:p-2.5 bg-[#163866]/60 border border-[#59d6e8]/20 rounded-xs">
                <div className="text-xl sm:text-2xl font-black text-[#ffc928]">5</div>
                <div className="text-[10px] sm:text-xs text-[#a0c4e8] uppercase">idea tracks</div>
              </div>
              <div className="p-2 sm:p-2.5 bg-[#163866]/60 border border-[#59d6e8]/20 rounded-xs">
                <div className="text-xl sm:text-2xl font-black text-[#ffc928]">[₹50K+]</div>
                <div className="text-[10px] sm:text-xs text-[#a0c4e8] uppercase">prize pool</div>
              </div>
            </div>

            {/* SPRINT PROGRESS Milestone Tracker from Theme.jpeg */}
            <div className="pt-2">
              <div className="font-mono text-[10px] sm:text-xs text-[#59d6e8] uppercase tracking-widest font-bold mb-2">
                SPRINT PROGRESS
              </div>
              <div className="relative flex items-center justify-between max-w-lg">
                {/* Background Line */}
                <div className="absolute left-3 right-3 top-2.5 h-[2px] bg-[#59d6e8]/30 -z-0" />
                {/* Active Progress Line (from SKETCH to BUILD) */}
                <div className="absolute left-3 w-1/3 top-2.5 h-[2px] bg-[#ffc928] -z-0 shadow-[0_0_8px_#ffc928]" />

                {/* Step 1: SKETCH */}
                <div className="flex flex-col items-center relative z-10">
                  <span className="w-5 h-5 rounded-full bg-[#ffc928] border-2 border-[#102b52] flex items-center justify-center shadow-[0_0_10px_#ffc928]">
                    <span className="w-2 h-2 rounded-full bg-[#102b52]" />
                  </span>
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#ffc928] font-bold mt-1">
                    SKETCH
                  </span>
                </div>

                {/* Step 2: BUILD */}
                <div className="flex flex-col items-center relative z-10">
                  <span className="w-5 h-5 rounded-full bg-[#ffc928] border-2 border-[#102b52] flex items-center justify-center shadow-[0_0_10px_#ffc928]">
                    <span className="w-2 h-2 rounded-full bg-[#102b52]" />
                  </span>
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#ffc928] font-bold mt-1">
                    BUILD
                  </span>
                </div>

                {/* Step 3: TEST */}
                <div className="flex flex-col items-center relative z-10">
                  <span className="w-5 h-5 rounded-full bg-[#163866] border-2 border-[#59d6e8] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#59d6e8]/50" />
                  </span>
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#a0c4e8] mt-1">
                    TEST
                  </span>
                </div>

                {/* Step 4: PITCH */}
                <div className="flex flex-col items-center relative z-10">
                  <span className="w-5 h-5 rounded-full bg-[#163866] border-2 border-[#59d6e8] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#59d6e8]/50" />
                  </span>
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#a0c4e8] mt-1">
                    PITCH
                  </span>
                </div>
              </div>
            </div>

            {/* Countdown Integration */}
            <div className="pt-2">
              <Countdown />
            </div>
          </div>

          {/* Right Column: Engineering Blueprint Lightbulb Schematic from Theme.jpeg */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0">
            <BlueprintSchematic />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
