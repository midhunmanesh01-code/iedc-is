import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useSpring } from 'motion/react'
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
  const num = parseInt(value, 10)
  const isNumeric = !isNaN(num)

  // Trigger when entering view, only reset when completely off-screen so user never sees it snap
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [display, setDisplay] = useState<string>(() => (isNumeric ? '0' : value))

  useEffect(() => {
    if (!isNumeric) {
      setDisplay(value)
      return
    }

    if (!isInView) {
      setDisplay('0')
      return
    }

    const duration = 1200
    let rafId: number
    const start = performance.now()
    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * num).toString())
      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      }
    }
    rafId = requestAnimationFrame(step)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isInView, isNumeric, num, value])

  return (
    <div ref={ref} className={`font-mono text-3xl sm:text-4xl lg:text-5xl font-black ${color}`}>
      {isNumeric ? (isInView ? display : '0') : value}
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

/* ── Pillar Row with Scroll-Triggered Illumination ── */
interface PillarRowProps {
  readonly pillar: (typeof pillars)[number]
  readonly index: number
  readonly isLast: boolean
  readonly dotRef: React.RefObject<HTMLDivElement | null>
}

const PillarRow: React.FC<PillarRowProps> = ({ pillar, index, isLast, dotRef }) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const isRowInCenter = useInView(rowRef, { margin: '0px 0px -50% 0px' })
  const Icon = pillar.icon
  const isGold = pillar.accent === '#ffc928'

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative grid grid-cols-[20px_auto_1fr] items-start gap-x-3.5 sm:gap-x-6 lg:gap-x-10"
    >
      {/* Node column - centered horizontally on 20px so line passes through center */}
      <div className="relative flex justify-center self-stretch">
        <div
          ref={dotRef}
          className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 mt-1.5 z-10 transition-all duration-300 ${
            isRowInCenter ? 'scale-125' : 'group-hover:scale-125'
          }`}
          style={{
            borderColor: isRowInCenter ? pillar.accent : `${pillar.accent}50`,
            backgroundColor: isRowInCenter ? pillar.accent : '#081526',
            boxShadow: isRowInCenter
              ? `0 0 14px ${pillar.accent}, 0 0 28px ${pillar.accent}60`
              : `0 0 0 3px ${pillar.accent}15`,
          }}
        />
      </div>

      {/* Standalone number — visible on both mobile and desktop (scaled proportionally) */}
      <div className="block pt-0.5 sm:pt-0">
        <span
          className={`font-mono text-3xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tighter transition-all duration-300 select-none block ${
            isRowInCenter ? 'opacity-70 drop-shadow-[0_0_15px_rgba(89,214,232,0.3)]' : 'opacity-20'
          }`}
          style={{ color: pillar.accent }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div className={`pb-10 sm:pb-14 ${isLast ? 'pb-0 sm:pb-0' : ''}`}>
        <div className="flex items-center gap-3 mb-2.5">
          {/* Symbol icon box: visible on desktop, removed on mobile */}
          <div
            className={`hidden sm:flex w-8 h-8 sm:w-9 sm:h-9 rounded-lg items-center justify-center transition-all duration-300 ${
              isRowInCenter ? 'scale-105' : 'group-hover:scale-110'
            }`}
            style={{
              backgroundColor: `${pillar.accent}15`,
              border: `1px solid ${isRowInCenter ? pillar.accent : `${pillar.accent}30`}`,
              boxShadow: isRowInCenter ? `0 0 15px ${pillar.accent}25` : 'none',
            }}
          >
            <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" style={{ color: pillar.accent }} />
          </div>
          <h4
            className={`font-display font-bold text-lg sm:text-xl lg:text-2xl leading-tight transition-colors duration-300 ${
              isRowInCenter ? 'text-white' : 'text-[#f5f7fa] group-hover:text-white'
            }`}
          >
            {pillar.title}
          </h4>
        </div>

        <p className="text-sm sm:text-[15px] text-[#7fa3c4] leading-relaxed max-w-xl group-hover:text-[#9bbad6] transition-colors sm:pl-12">
          {pillar.desc}
        </p>

        {/* Accent tag */}
        <div className="mt-3 sm:pl-12">
          <span
            className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded-full border transition-all duration-300 group-hover:border-opacity-50"
            style={{
              color: pillar.accent,
              borderColor: isRowInCenter ? `${pillar.accent}60` : `${pillar.accent}20`,
              backgroundColor: isRowInCenter ? `${pillar.accent}18` : `${pillar.accent}08`,
            }}
          >
            {isGold ? (index === 0 ? 'Speed & Intensity' : 'Post-Sprint') : (index === 1 ? 'Methodology' : 'Guidance')}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Sprint Pillars Timeline with Season-of-Code Scroll Spine ── */
const SprintPillars: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const dot0Ref = useRef<HTMLDivElement>(null)
  const dot1Ref = useRef<HTMLDivElement>(null)
  const dot2Ref = useRef<HTMLDivElement>(null)
  const dot3Ref = useRef<HTMLDivElement>(null)
  const dotRefs = [dot0Ref, dot1Ref, dot2Ref, dot3Ref]

  const [lineMetrics, setLineMetrics] = useState({ top: 10, height: 0 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 350,
    damping: 35,
    restDelta: 0.001,
  })

  useEffect(() => {
    const updateMetrics = () => {
      const container = containerRef.current
      const first = dot0Ref.current
      const last = dot3Ref.current
      if (!container || !first || !last) return

      const cRect = container.getBoundingClientRect()
      const fRect = first.getBoundingClientRect()
      const lRect = last.getBoundingClientRect()

      const top = fRect.top - cRect.top + fRect.height / 2
      const bottom = lRect.top - cRect.top + lRect.height / 2
      setLineMetrics({
        top,
        height: Math.max(0, bottom - top),
      })
    }

    updateMetrics()
    window.addEventListener('resize', updateMetrics)
    return () => window.removeEventListener('resize', updateMetrics)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* Background Muted Spine Track (runs from center of first dot to center of last dot) */}
      <div
        className="absolute left-[10px] w-[2px] -translate-x-1/2 bg-[#59d6e8]/15 rounded-full"
        style={{
          top: `${lineMetrics.top}px`,
          height: `${lineMetrics.height}px`,
        }}
        aria-hidden="true"
      />

      {/* Animated Glowing Fill Line (Season of Code style scroll-scrubbed line) */}
      <motion.div
        className="absolute left-[10px] w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#ffc928] via-[#59d6e8] to-[#ffc928] rounded-full shadow-[0_0_12px_rgba(89,214,232,0.8)]"
        style={{
          top: `${lineMetrics.top}px`,
          height: `${lineMetrics.height}px`,
          scaleY,
          transformOrigin: 'top',
        }}
        aria-hidden="true"
      />

      {/* Rows */}
      <div className="space-y-0">
        {pillars.map((pillar, i) => (
          <PillarRow
            key={pillar.title}
            pillar={pillar}
            index={i}
            isLast={i === pillars.length - 1}
            dotRef={dotRefs[i]!}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Campus to Market Pipeline Steps (Ideate -> Build -> Launch) ── */
interface PipelineStepItem {
  readonly icon: React.FC<{ className?: string; style?: React.CSSProperties }>
  readonly label: string
  readonly color: string
}

const PIPELINE_STEPS: readonly PipelineStepItem[] = [
  { icon: Lightbulb, label: 'Ideate', color: '#59d6e8' },
  { icon: Zap, label: 'Build', color: '#ffc928' },
  { icon: Target, label: 'Launch', color: '#59d6e8' },
]

const PipelineFlow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: '-60px 0px -60px 0px', amount: 0.2 })
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (!isInView) {
      setActiveStep(0)
      return
    }

    // Natural snappy rhythm: Ideate (0) -> Build (1) -> Launch (2) every 600ms
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3)
    }, 600)

    return () => clearInterval(interval)
  }, [isInView])

  return (
    <div ref={containerRef} className="shrink-0 flex items-center gap-3 select-none">
      {PIPELINE_STEPS.map((step, i) => {
        const Icon = step.icon
        const isGlow = isInView && activeStep === i

        return (
          <React.Fragment key={step.label}>
            {i > 0 && (
              <div className="flex items-center gap-1">
                <div
                  className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                    isInView && activeStep >= i ? 'bg-[#59d6e8]/60' : 'bg-[#59d6e8]/25'
                  }`}
                />
                <div
                  className={`w-4 h-px transition-colors duration-300 ${
                    isInView && activeStep >= i ? 'bg-[#59d6e8]/50' : 'bg-[#59d6e8]/15'
                  }`}
                />
                <div
                  className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                    isInView && activeStep >= i ? 'bg-[#59d6e8]/60' : 'bg-[#59d6e8]/25'
                  }`}
                />
              </div>
            )}

            <div className="text-center">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-1.5 transition-all duration-300 ease-out"
                style={{
                  backgroundColor: isGlow ? `${step.color}1e` : `${step.color}0a`,
                  border: `1px solid ${isGlow ? `${step.color}80` : `${step.color}18`}`,
                  boxShadow: isGlow
                    ? `0 0 14px ${step.color}50, 0 0 28px ${step.color}20`
                    : 'none',
                  transform: isGlow ? 'scale(1.06)' : 'scale(1)',
                }}
              >
                <Icon
                  className="w-4 h-4 transition-all duration-300 ease-out"
                  style={{
                    color: step.color,
                    filter: isGlow ? `drop-shadow(0 0 6px ${step.color})` : 'none',
                  }}
                />
              </div>
              <span
                className="block font-mono text-[10px] uppercase tracking-wider transition-colors duration-300 select-none"
                style={{
                  color: isGlow ? '#f5f7fa' : '#6e94b8',
                  fontWeight: isGlow ? 700 : 500,
                }}
              >
                {step.label}
              </span>
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export const About: React.FC = () => {

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
            viewport={{ once: false, amount: 0.2 }}
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

          {/* ── Sprint Pillars — editorial vertical list with Season-of-Code style scroll timeline ── */}
          <div>
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

            <SprintPillars />
          </div>

          {/* ── Bottom CTA banner (Desktop view; completely removed in mobile view) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="hidden md:block mt-16 sm:mt-24 relative rounded-xl overflow-hidden"
          >
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, #132b50 0%, #0f2240 40%, #122a4d 100%)' }}
            />
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 80% at 0% 50%, rgba(255,201,40,0.08) 0%, transparent 60%)' }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 p-6 md:p-8 lg:p-10">
              <div className="flex items-center gap-5 sm:gap-6 flex-1 min-w-0 pr-2 lg:pr-6">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ffc928]/20 to-[#ffc928]/5 border border-[#ffc928]/20 flex items-center justify-center">
                  <Rocket className="w-7 h-7 text-[#ffc928]" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-bold text-lg sm:text-xl text-[#f5f7fa] mb-1.5">
                    From Campus to Market
                  </h4>
                  <p className="text-sm text-[#8aacc8] leading-relaxed">
                    Engineers, designers, and strategists unite to form balanced squads. Winning teams receive direct support from {EVENT_CONFIG.organizer}, prototype grants, and priority access to state innovation pipelines.
                  </p>
                </div>
              </div>

              {/* Pipeline — Ideate, Build, Launch glow sequentially */}
              <PipelineFlow />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default About
