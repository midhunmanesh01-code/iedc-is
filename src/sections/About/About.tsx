import React from 'react'
import { Rocket, Target, Users, Award, Lightbulb, Zap } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { EVENT_CONFIG } from '@/config/event'

export const About: React.FC = () => {
  const highlights = [
    {
      icon: <Zap className="w-5 h-5 text-[#FF5500]" />,
      number: '01',
      title: '24-Hour Continuous Sprint',
      description:
        'A relentless pressure-cooker environment where raw hypotheses transform into defensible venture concepts through rigorous cycles.',
      tag: 'SPEED & INTENSITY',
      tagColor: 'text-[#FF5500]',
    },
    {
      icon: <Target className="w-5 h-5 text-sky-400" />,
      number: '02',
      title: 'Problem-First Validation',
      description:
        'We emphasize first-principles problem identification. Ideas are scored on tangible market pain points, viability, and real-world applicability.',
      tag: 'METHODOLOGY',
      tagColor: 'text-sky-400',
    },
    {
      icon: <Users className="w-5 h-5 text-indigo-400" />,
      number: '03',
      title: 'Active Industry Mentorship',
      description:
        'Scheduled checkpoints with seasoned entrepreneurs, domain specialists, and CEC alumni to stress-test your architecture and pitch.',
      tag: 'GUIDANCE',
      tagColor: 'text-indigo-400',
    },
    {
      icon: <Award className="w-5 h-5 text-amber-400" />,
      number: '04',
      title: 'Incubation & Seed Pathway',
      description:
        'Winning ideas receive direct support from IEDC BOOTCAMP CEC, prototype grants, and priority access to state innovation pipelines.',
      tag: 'POST-SPRINT',
      tagColor: 'text-amber-400',
    },
  ]

  return (
    <section
      id="about"
      aria-label="About IDEA SPRINT 2026"
      className="py-16 sm:py-20 lg:py-28 relative border-b border-white/5 bg-[#0C0D0E]"
    >
      <Container size="default">
        {/* Section Header */}
        <SectionHeading
          tag="01 // MISSION INTEL"
          title="Fostering the Next Wave of Breakthrough Concepts."
          subtitle={`Organized by ${EVENT_CONFIG.organizer}, IDEA SPRINT 2026 is engineered to challenge student thinkers to bridge the gap between academic theory and practical startup ventures.`}
        />

        {/* Vision & Purpose Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7 bg-[#131518] border border-white/10 p-6 sm:p-8 flex flex-col justify-between rounded-xs">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="accent">PURPOSE & VISION</Badge>
                <span className="font-mono text-xs text-zinc-500">// CEC INCUBATION HUB</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4">
                Why IDEA SPRINT 2026 matters.
              </h3>
              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base mb-4">
                College ideathons are often reduced to slide presentations with no technological feasibility. IDEA SPRINT 2026 recalibrates this standard. Teams spend 24 continuous hours breaking down problems, consulting domain specialists, iterating value propositions, and crafting realistic prototypes.
              </p>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Whether you are engineering IoT devices, AI solutions, sustainable clean-tech, or community platforms, your concept will be pushed beyond surface-level assumptions.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-4 font-mono text-center sm:text-left">
              <div className="bg-[#0C0D0E] sm:bg-transparent p-2 sm:p-0 rounded-xs border sm:border-0 border-white/5">
                <div className="text-xl sm:text-2xl font-bold text-[#FF5500]">24H</div>
                <div className="text-[10px] sm:text-xs text-zinc-400 uppercase">Non-Stop Sprint</div>
              </div>
              <div className="bg-[#0C0D0E] sm:bg-transparent p-2 sm:p-0 rounded-xs border sm:border-0 border-white/5">
                <div className="text-xl sm:text-2xl font-bold text-amber-400">100%</div>
                <div className="text-[10px] sm:text-xs text-zinc-400 uppercase">Student Led</div>
              </div>
              <div className="bg-[#0C0D0E] sm:bg-transparent p-2 sm:p-0 rounded-xs border sm:border-0 border-white/5">
                <div className="text-xl sm:text-2xl font-bold text-sky-400">CEC</div>
                <div className="text-[10px] sm:text-xs text-zinc-400 uppercase">Chengannur</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            <Card className="flex-1 flex flex-col justify-center" withCrosshairs>
              <div className="flex items-center gap-3 mb-3">
                <Rocket className="w-5 h-5 text-amber-400" />
                <h4 className="font-display font-bold text-lg text-white">
                  From Campus to Market
                </h4>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                We believe some of the most impactful solutions originate in student labs and dorm rooms. Our goal is to provide the critical initial catalyst.
              </p>
            </Card>

            <Card className="flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <Lightbulb className="w-5 h-5 text-[#FF5500]" />
                <h4 className="font-display font-bold text-lg text-white">
                  Multi-Disciplinary Synergy
                </h4>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Engineers, designers, problem solvers, and business strategists unite to form balanced squads capable of executing fast.
              </p>
            </Card>
          </div>
        </div>

        {/* 4 Pillars / Highlights */}
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center gap-2">
            <span>// SPRINT PILLARS & HIGHLIGHTS</span>
            <div className="flex-1 h-[1px] bg-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {highlights.map((item) => (
              <Card key={item.number} hoverEffect className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-white/5 border border-white/10 rounded-xs">
                      {item.icon}
                    </div>
                    <span className="font-mono text-xs font-bold text-zinc-500">
                      {item.number}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold font-display text-white mb-2">
                    {item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10">
                  <span className={`font-mono text-[10px] tracking-wider uppercase ${item.tagColor}`}>
                    {item.tag}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
