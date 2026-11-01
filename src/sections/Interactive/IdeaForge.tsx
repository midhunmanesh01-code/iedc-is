import React, { useState } from 'react'
import { Sparkles, RefreshCw, Cpu, Flame, Target, ArrowRight } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/ui/Badge'
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

  const domains = ['All', 'CleanTech & Energy', 'Healthcare & Assistive', 'AI & Machine Learning', 'Fintech & Open Commerce']

  const filteredSeeds = activeDomain === 'All'
    ? PRESET_SEEDS
    : PRESET_SEEDS.filter((s) => s.domain === activeDomain)

  const currentSeed = filteredSeeds[selectedSeedIndex % filteredSeeds.length] || PRESET_SEEDS[0]

  const handleRandomize = () => {
    setIsSpinning(true)
    setTimeout(() => {
      setSelectedSeedIndex((prev) => (prev + 1) % (filteredSeeds.length || 1))
      setIsSpinning(false)
    }, 300)
  }

  return (
    <section
      id="idea-forge"
      aria-label="Idea Forge Interactive Experience"
      className="py-20 lg:py-28 relative border-b border-white/5 bg-[#0A0C10]"
    >
      <Container size="default">
        <SectionHeading
          tag="03 // INTERACTIVE LAB"
          title="IDEA FORGE: Spark Your Direction."
          subtitle="A dedicated ideation workbench. Explore sample problem hooks, stress constraints, and spark initial brainstorm vectors for your sprint team."
        />

        {/* Workbench Container */}
        <div className="bg-[#0F1217] border border-white/10 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          {/* Top Workbench Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#B8FF00]/10 border border-[#B8FF00]/25 rounded-xs">
                <Flame className="w-5 h-5 text-[#B8FF00]" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-['Space_Grotesk'] text-white">
                  Sprint Seed Generator
                </h3>
                <span className="font-mono text-xs text-slate-400">
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
            >
              Roll New Seed
            </Button>
          </div>

          {/* Domain Filter Pills */}
          <div className="pt-6 flex flex-wrap gap-2 items-center">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#B8FF00]" /> Domain:
            </span>
            {domains.map((domain) => (
              <button
                key={domain}
                type="button"
                onClick={() => {
                  setActiveDomain(domain)
                  setSelectedSeedIndex(0)
                }}
                className={`px-3 py-1 text-xs font-mono rounded-xs border transition-colors ${
                  activeDomain === domain
                    ? 'bg-[#B8FF00]/15 text-[#B8FF00] border-[#B8FF00]/50 font-semibold'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>

          {/* Seed Display Area */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <Badge variant="accent" icon={<Cpu className="w-3 h-3" />}>
                  {currentSeed.domain}
                </Badge>
                <h4 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-white">
                  {currentSeed.title}
                </h4>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-[#08090A] border border-white/10 rounded-xs">
                  <div className="font-mono text-xs text-[#B8FF00] uppercase font-semibold mb-1">
                    [1] The Core Problem Vector:
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {currentSeed.problemStatement}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#08090A] border border-white/10 rounded-xs">
                    <div className="font-mono text-xs text-slate-400 uppercase font-semibold mb-1">
                      [2] Target Cohort:
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300">
                      {currentSeed.targetAudience}
                    </p>
                  </div>

                  <div className="p-4 bg-[#08090A] border border-white/10 rounded-xs">
                    <div className="font-mono text-xs text-amber-300 uppercase font-semibold mb-1">
                      [3] Real-World Constraint:
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300">
                      {currentSeed.constraint}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar / Future Feature Reservation */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <Card className="bg-[#08090A]" withCrosshairs>
                <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#B8FF00] font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>FUTURE EXPANSION</span>
                </div>
                <h5 className="font-['Space_Grotesk'] font-bold text-white text-base mb-1">
                  AI Brainstorm Engine
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  In Stage 2, Idea Forge will connect to an interactive prompt generator with custom evaluation rubrics for registered participants.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  href="#register"
                  className="w-full justify-between"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Register To Ideate
                </Button>
              </Card>

              <div className="p-4 border border-dashed border-white/15 bg-white/[0.01] rounded-xs text-xs font-mono text-slate-500">
                <span>SLOT: EXPERIMENTATION POD // CEC-IS26</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
