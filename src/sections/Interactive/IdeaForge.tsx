import React, { useState } from 'react'
import { Sparkles, RefreshCw, Cpu, Flame, Target, ArrowRight, Copy, Check } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/ui/Card'

interface IdeaSeed {
  readonly id: string
  readonly domain: string
  readonly title: string
  readonly problemStatement: string
  readonly targetAudience: string
  readonly constraint: string
}

const PRESET_SEEDS: readonly IdeaSeed[] = [
  {
    id: 'seed-1',
    domain: 'CleanTech & Energy',
    title: 'Microgrid Load Redistribution for Campuses',
    problemStatement:
      'Institutions encounter unpredictable energy spikes during peak lab hours, resulting in excessive diesel generator backups.',
    targetAudience: 'University facility managers & sustainability officers',
    constraint: 'Must work with existing submetering infrastructure without expensive IoT overhauls.',
  },
  {
    id: 'seed-2',
    domain: 'Healthcare & Assistive',
    title: 'Offline-First Emergency Triage Coordinator',
    problemStatement:
      'Rural healthcare posts lose data synchronization during connectivity blackouts, delaying urgent ambulance routing.',
    targetAudience: 'First responders and primary health workers',
    constraint: 'Zero cellular dependency during active disaster triage mode.',
  },
  {
    id: 'seed-3',
    domain: 'AI & Machine Learning',
    title: 'Autonomous Lab Equipment Safety Sentinel',
    problemStatement:
      'Undergraduate prototyping labs suffer from unattended machinery overheating and safety guideline oversights.',
    targetAudience: 'College makerspaces and fabrication labs',
    constraint: 'Local edge compute processing to respect privacy.',
  },
  {
    id: 'seed-4',
    domain: 'Fintech & Open Commerce',
    title: 'Micro-Credit Ledger for Student Enterprises',
    problemStatement:
      'Student innovators lack credit records to access micro-grants or hardware vendor deferred payments.',
    targetAudience: 'Student founders and verified vendor consortiums',
    constraint: 'Must provide non-custodial cryptographic audit trails.',
  },
]

export const IdeaForge: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<string>('All')
  const [selectedSeedIndex, setSelectedSeedIndex] = useState<number>(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const domains = ['All', 'CleanTech & Energy', 'Healthcare & Assistive', 'AI & Machine Learning', 'Fintech & Open Commerce']

  const filteredSeeds = activeDomain === 'All'
    ? PRESET_SEEDS
    : PRESET_SEEDS.filter((s) => s.domain === activeDomain)

  const currentSeed = filteredSeeds[selectedSeedIndex % filteredSeeds.length] || PRESET_SEEDS[0]

  const getDomainStyle = (domain: string) => {
    switch (domain) {
      case 'CleanTech & Energy':
        return {
          active: 'bg-emerald-500 text-black border-emerald-400 font-bold shadow-sm',
          badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
        }
      case 'Healthcare & Assistive':
        return {
          active: 'bg-rose-500 text-white border-rose-400 font-bold shadow-sm',
          badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
        }
      case 'AI & Machine Learning':
        return {
          active: 'bg-sky-500 text-black border-sky-400 font-bold shadow-sm',
          badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
        }
      case 'Fintech & Open Commerce':
        return {
          active: 'bg-amber-500 text-black border-amber-400 font-bold shadow-sm',
          badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        }
      default:
        return {
          active: 'bg-[#FF5500] text-white border-[#FF5500] font-bold shadow-sm',
          badge: 'bg-[#FF5500]/15 text-[#FF5500] border-[#FF5500]/30',
        }
    }
  }

  const handleRandomize = () => {
    setIsSpinning(true)
    setTimeout(() => {
      setSelectedSeedIndex((prev) => (prev + 1) % (filteredSeeds.length || 1))
      setIsSpinning(false)
    }, 300)
  }

  const handleCopy = () => {
    const textToCopy = `[IDEA SPRINT 2026 - Idea Seed]\nTitle: ${currentSeed.title}\nDomain: ${currentSeed.domain}\nProblem: ${currentSeed.problemStatement}\nTarget: ${currentSeed.targetAudience}\nConstraint: ${currentSeed.constraint}`
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }).catch(() => {})
  }

  return (
    <section
      id="idea-forge"
      aria-label="Idea Forge Interactive Experience"
      className="py-16 sm:py-20 lg:py-28 relative border-b border-white/5 bg-[#0C0D0E]"
    >
      <Container size="default">
        <SectionHeading
          tag="03 // INTERACTIVE LAB"
          title="IDEA FORGE: Spark Your Direction."
          subtitle="A dedicated ideation workbench. Explore sample problem hooks, stress constraints, and spark initial brainstorm vectors for your sprint team."
        />

        {/* Workbench Container */}
        <div className="bg-[#131518] border border-white/10 p-4 sm:p-8 lg:p-10 relative overflow-hidden rounded-xs">
          {/* Top Workbench Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FF5500]/15 border border-[#FF5500]/30 rounded-xs shrink-0">
                <Flame className="w-5 h-5 text-[#FF5500]" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  Sprint Seed Generator
                </h3>
                <span className="font-mono text-xs text-zinc-400 block sm:inline">
                  Interactive brainstorming catalyst for prospective teams
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleRandomize}
              isLoading={isSpinning}
              leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />}
              className="w-full sm:w-auto justify-center min-h-[44px] active:scale-[0.98]"
            >
              Roll New Seed
            </Button>
          </div>

          {/* Domain Filter Pills: Adaptive Color Coding on Mobile & Desktop */}
          <div className="pt-5 flex flex-nowrap overflow-x-auto scrollbar-none pb-2 gap-2 items-center -mx-4 px-4 sm:mx-0 sm:px-0">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 shrink-0 mr-1 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#FF5500]" /> Domain:
            </span>
            {domains.map((domain) => {
              const isActive = activeDomain === domain
              const style = getDomainStyle(domain)

              return (
                <button
                  key={domain}
                  type="button"
                  onClick={() => {
                    setActiveDomain(domain)
                    setSelectedSeedIndex(0)
                  }}
                  className={`px-3.5 py-2 text-xs font-mono rounded-full border transition-all shrink-0 min-h-[38px] active:scale-95 ${
                    isActive
                      ? style.active
                      : 'bg-white/5 text-zinc-300 border-white/10 hover:text-white hover:border-white/20'
                  }`}
                >
                  {domain}
                </button>
              )
            })}
          </div>

          {/* Seed Display Area */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase tracking-wider border rounded-xs font-semibold ${
                      getDomainStyle(currentSeed.domain).badge
                    }`}
                  >
                    <Cpu className="w-3 h-3" />
                    <span>{currentSeed.domain}</span>
                  </span>
                  <h4 className="text-xl sm:text-3xl font-bold font-display text-white">
                    {currentSeed.title}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 rounded-xs text-xs font-mono text-zinc-300 hover:text-white transition-colors shrink-0 self-start sm:self-auto min-h-[38px]"
                  title="Copy seed brief"
                  aria-label="Copy seed brief to clipboard"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Copy Brief</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-[#0C0D0E] border border-white/10 rounded-xs">
                  <div className="font-mono text-xs text-[#FF5500] uppercase font-semibold mb-1">
                    [1] The Core Problem Vector:
                  </div>
                  <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
                    {currentSeed.problemStatement}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#0C0D0E] border border-white/10 rounded-xs">
                    <div className="font-mono text-xs text-sky-400 uppercase font-semibold mb-1">
                      [2] Target Cohort:
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300">
                      {currentSeed.targetAudience}
                    </p>
                  </div>

                  <div className="p-4 bg-[#0C0D0E] border border-white/10 rounded-xs">
                    <div className="font-mono text-xs text-amber-400 uppercase font-semibold mb-1">
                      [3] Real-World Constraint:
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300">
                      {currentSeed.constraint}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar / Future Feature Reservation */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <Card className="bg-[#0C0D0E]" withCrosshairs>
                <div className="flex items-center gap-2 mb-2 font-mono text-xs text-amber-400 font-semibold">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>FUTURE EXPANSION</span>
                </div>
                <h5 className="font-display font-bold text-white text-base mb-1">
                  AI Brainstorm Engine
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  In Stage 2, Idea Forge will connect to an interactive prompt generator with custom evaluation rubrics for registered participants.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  href="#register"
                  className="w-full justify-between min-h-[44px] active:scale-[0.98]"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Register To Ideate
                </Button>
              </Card>

              <div className="p-4 border border-dashed border-white/15 bg-white/[0.01] rounded-xs text-xs font-mono text-zinc-500">
                <span>SLOT: EXPERIMENTATION POD // CEC-IS26</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
