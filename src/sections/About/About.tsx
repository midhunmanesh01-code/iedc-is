import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { Rocket, Target, Users, Award, Lightbulb, Zap } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SplitText } from '@/components/ui/SplitText'
import { EVENT_CONFIG } from '@/config/event'

/* ── Animated counter ── */
const AnimatedNumber: React.FC<{
  readonly value: string
  readonly color: string
}> = ({ value, color }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const num = parseInt(value, 10)
    if (isNaN(num)) {
      setDisplay(value)
      return
    }
    const duration = 1200
    const start = performance.now()
    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * num).toString())
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, value])

  return (
    <div ref={ref} className={`font-mono text-3xl sm:text-4xl lg:text-5xl font-black ${color}`}>
      {isInView ? display : '0'}
      {isInView && value.replace(/[0-9]/g, '')}
    </div>
  )
}

/* ── Pillar data ── */
const pillars = [
  {
    icon: Zap,
    title: '24-Hour Continuous Sprint',
    desc: 'A relentless pressure-cooker environment where raw hypotheses transform into defensible venture concepts through rigorous iteration cycles.',
    accent: '#ffc928',
  },
  {
    icon: Target,
    title: 'Problem-First Validation',
    desc: 'We emphasize first-principles problem identification. Ideas are scored on tangible market pain points, viability, and real-world applicability.',
    accent: '#59d6e8',
  },
  {
    icon: Users,
    title: 'Active Industry Mentorship',
    desc: 'Scheduled checkpoints with seasoned entrepreneurs, domain specialists, and CEC alumni to stress-test your architecture and pitch.',
    accent: '#59d6e8',
  },
  {
    icon: Award,
    title: 'Incubation & Seed Pathway',
    desc: 'Winning ideas receive direct support from IEDC BOOTCAMP CEC, prototype grants, and priority access to state innovation pipelines.',
    accent: '#ffc928',
  },
]

export const About: React.FC = () => {
  const pillarsRef = useRef<HTMLDivElement>(null)
  const isPillarsInView = useInView(pillarsRef, { once: true, margin: '-40px' })

  return (
    <section
      id="about"
      aria-label="About IDEA SPRINT 2026"
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden border-b border-[#59d6e8]/10"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-[#0b1a30]" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 15% 10%, rgba(89,214,232,0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 85% 90%, rgba(255,201,40,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 40% 30% at 50% 50%, rgba(89,214,232,0.04) 0%, transparent 60%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle 1px, rgba(89,214,232,0.8) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none" aria-hidden="true">
        <span className="font-display font-black text-[20vw] sm:text-[18vw] lg:text-[14vw] text-[#59d6e8]/[0.02] leading-none tracking-tighter">
          IS26
        </span>
      </div>

      <Container size="default">
        <div className="relative z-10">

          {/* ── Section header ── */}
          <div className="mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-px bg-[#ffc928]" />
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#ffc928] font-bold">
                Mission & Vision
              </span>
              <div className="flex-1 h-px bg-[#ffc928]/10 hidden sm:block" />
            </motion.div>

            <SplitText
              text="Fostering the Next Wave of Breakthrough Concepts."
              tag="h2"
              className="text-3xl sm:text-4xl lg:text-[3.4rem] font-display font-extrabold text-[#f5f7fa] tracking-tight leading-[1.1] max-w-4xl"
              effect="rise"
              splitType="words"
              delay={60}
              duration={0.9}
              textAlign="left"
              rootMargin="-60px"
            />
          </div>

          {/* ── Mission & Vision cards (ISQIP-style solid dual-layer opposing tilt & hover) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 mb-16 sm:mb-24 py-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="relative cursor-pointer group h-full"
            >
              {/* Solid Accent Backdrop Plate - tightly calibrated tilt */}
              <div
                className="absolute inset-0 transition-all duration-300 transform rounded-2xl bg-[#ffc928] shadow-md rotate-[0.4deg] sm:rotate-[0.6deg] group-hover:rotate-[0.8deg] sm:group-hover:rotate-[1.2deg] group-hover:shadow-[0_12px_32px_rgba(255,201,40,0.22)] pointer-events-none"
                aria-hidden="true"
              />

              {/* Solid Foreground Card - counter-rotates and fills 100% height */}
              <div
                className="relative rounded-2xl p-6 sm:p-8 lg:p-10 bg-[#0b1b32] border border-[#ffc928]/30 transition-all duration-300 transform -rotate-[0.4deg] sm:-rotate-[0.6deg] group-hover:-rotate-[0.8deg] sm:group-hover:-rotate-[1.2deg] group-hover:border-[#ffc928]/60 shadow-xl group-hover:shadow-2xl h-full flex flex-col justify-between"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#ffc928]/10 border border-[#ffc928]/25 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Rocket className="w-5 h-5 text-[#ffc928]" />
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#ffc928] font-bold">Our Mission</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#f5f7fa] mb-4 leading-snug">
                    Build the launchpad student ideas deserve.
                  </h3>
                  <p className="text-sm sm:text-[15px] text-[#9bbad6] leading-relaxed mb-3">
                    To create a high-intensity environment where student ideas are stress-tested, refined, and transformed into ventures that matter — all within 24 hours of non-stop building.
                  </p>
                  <p className="text-xs sm:text-sm text-[#6e94b8] leading-relaxed">
                    Organized by {EVENT_CONFIG.organizer}, we provide the critical initial catalyst that bridges academic theory and real-world execution.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative cursor-pointer group h-full"
            >
              {/* Solid Accent Backdrop Plate - tightly calibrated tilt */}
              <div
                className="absolute inset-0 transition-all duration-300 transform rounded-2xl bg-[#59d6e8] shadow-md -rotate-[0.4deg] sm:-rotate-[0.6deg] group-hover:-rotate-[0.8deg] sm:group-hover:-rotate-[1.2deg] group-hover:shadow-[0_12px_32px_rgba(89,214,232,0.22)] pointer-events-none"
                aria-hidden="true"
              />

              {/* Solid Foreground Card - counter-rotates and fills 100% height */}
              <div
                className="relative rounded-2xl p-6 sm:p-8 lg:p-10 bg-[#0b1b32] border border-[#59d6e8]/30 transition-all duration-300 transform rotate-[0.4deg] sm:rotate-[0.6deg] group-hover:rotate-[0.8deg] sm:group-hover:rotate-[1.2deg] group-hover:border-[#59d6e8]/60 shadow-xl group-hover:shadow-2xl h-full flex flex-col justify-between"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#59d6e8]/10 border border-[#59d6e8]/25 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Lightbulb className="w-5 h-5 text-[#59d6e8]" />
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#59d6e8] font-bold">Our Vision</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#f5f7fa] mb-4 leading-snug">
                    Every student deserves a shot at building something real.
                  </h3>
                  <p className="text-sm sm:text-[15px] text-[#9bbad6] leading-relaxed">
                    A future where every engineering student has the tools, mentorship, and confidence to turn bold ideas into working prototypes — regardless of their background or branch.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Stats strip ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-20 mb-16 sm:mb-24 py-8 sm:py-10"
          >
            {[
              { value: '24', suffix: 'H', label: 'Non-Stop Sprint', color: 'text-[#ffc928]' },
              { value: '100', suffix: '%', label: 'Student Led', color: 'text-[#59d6e8]' },
              { value: '∞', suffix: '', label: 'Ideas Welcome', color: 'text-[#f5f7fa]' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-baseline justify-center gap-0.5">
                  <AnimatedNumber value={stat.value} color={stat.color} />
                  {stat.suffix && (
                    <span className={`font-mono text-lg sm:text-xl font-bold ${stat.color}`}>
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#6e94b8] mt-1.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── Sprint Pillars — editorial vertical list with timeline ── */}
          <div ref={pillarsRef}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-10 sm:mb-14"
            >
              <div className="w-10 h-px bg-[#59d6e8]" />
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#59d6e8] font-bold">
                Sprint Pillars
              </span>
              <div className="flex-1 h-px bg-[#59d6e8]/10 hidden sm:block" />
            </motion.div>

            <div className="space-y-0">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon
                const isGold = pillar.accent === '#ffc928'
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isPillarsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
                    className="group relative grid grid-cols-[auto_1fr] sm:grid-cols-[auto_auto_1fr] items-start gap-x-4 sm:gap-x-6 lg:gap-x-10"
                  >
                    {/* Timeline line + dot */}
                    <div className="relative flex flex-col items-center self-stretch">
                      <div
                        className="w-3 h-3 rounded-full border-2 shrink-0 mt-1 z-10 transition-all duration-300 group-hover:scale-125"
                        style={{
                          borderColor: pillar.accent,
                          backgroundColor: 'transparent',
                          boxShadow: `0 0 0 3px ${pillar.accent}15`,
                        }}
                      />
                      {i < pillars.length - 1 && (
                        <div className="w-px flex-1 bg-gradient-to-b from-[#59d6e8]/20 to-[#59d6e8]/5" />
                      )}
                    </div>

                    {/* Large number — hidden on small mobile, visible sm+ */}
                    <div className="hidden sm:block">
                      <span
                        className="font-mono text-6xl lg:text-7xl font-black leading-none tracking-tighter transition-colors duration-300"
                        style={{ color: `${pillar.accent}15` }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Content */}
                    <div className={`pb-10 sm:pb-14 ${i === pillars.length - 1 ? 'pb-0 sm:pb-0' : ''}`}>
                      <div className="flex items-center gap-3 mb-2.5">
                        <div
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: `${pillar.accent}12`, border: `1px solid ${pillar.accent}20` }}
                        >
                          <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" style={{ color: pillar.accent }} />
                        </div>
                        <h4 className="font-display font-bold text-lg sm:text-xl lg:text-2xl text-[#f5f7fa] group-hover:text-white transition-colors leading-tight">
                          {pillar.title}
                        </h4>
                      </div>

                      <p className="text-sm sm:text-[15px] text-[#7fa3c4] leading-relaxed max-w-xl group-hover:text-[#9bbad6] transition-colors pl-11 sm:pl-12">
                        {pillar.desc}
                      </p>

                      {/* Accent tag */}
                      <div className="mt-3 pl-11 sm:pl-12">
                        <span
                          className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded-full border transition-all duration-300 group-hover:border-opacity-50"
                          style={{
                            color: pillar.accent,
                            borderColor: `${pillar.accent}20`,
                            backgroundColor: `${pillar.accent}08`,
                          }}
                        >
                          {isGold ? (i === 0 ? 'Speed & Intensity' : 'Post-Sprint') : (i === 1 ? 'Methodology' : 'Guidance')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* ── Bottom CTA banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="mt-16 sm:mt-24 relative rounded-xl overflow-hidden"
          >
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, #132b50 0%, #0f2240 40%, #122a4d 100%)' }}
            />
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 80% at 0% 50%, rgba(255,201,40,0.08) 0%, transparent 60%)' }}
            />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 p-6 sm:p-8 lg:p-10">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ffc928]/20 to-[#ffc928]/5 border border-[#ffc928]/20 flex items-center justify-center">
                <Rocket className="w-7 h-7 text-[#ffc928]" />
              </div>

              <div className="flex-1">
                <h4 className="font-display font-bold text-lg sm:text-xl text-[#f5f7fa] mb-1.5">
                  From Campus to Market
                </h4>
                <p className="text-sm text-[#8aacc8] leading-relaxed">
                  Engineers, designers, and strategists unite to form balanced squads. Winning teams receive direct support from {EVENT_CONFIG.organizer}, prototype grants, and priority access to state innovation pipelines.
                </p>
              </div>

              {/* Pipeline — desktop only */}
              <div className="shrink-0 hidden lg:flex items-center gap-3">
                {[
                  { icon: Lightbulb, label: 'Ideate', color: '#59d6e8' },
                  { icon: Zap, label: 'Build', color: '#ffc928' },
                  { icon: Target, label: 'Launch', color: '#59d6e8' },
                ].map((step, i) => (
                  <React.Fragment key={step.label}>
                    {i > 0 && (
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-[#59d6e8]/30" />
                        <div className="w-4 h-px bg-[#59d6e8]/20" />
                        <div className="w-1 h-1 rounded-full bg-[#59d6e8]/30" />
                      </div>
                    )}
                    <div className="text-center">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-1.5"
                        style={{ backgroundColor: `${step.color}10`, border: `1px solid ${step.color}15` }}
                      >
                        <step.icon className="w-4 h-4" style={{ color: step.color }} />
                      </div>
                      <span className="font-mono text-[10px] text-[#6e94b8] uppercase tracking-wider">{step.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default About
