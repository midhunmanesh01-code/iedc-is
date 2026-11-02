import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { SprintReactor } from './SprintReactor'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

export interface HeroProps {
  /** Triggered once the page preloader has faded out */
  readonly isReady?: boolean
}

export const Hero: React.FC<HeroProps> = ({ isReady = false }) => {
  const { scrollTo } = useSmoothScroll()
  const [hasStarted, setHasStarted] = useState(isReady)

  useEffect(() => {
    if (isReady) {
      setHasStarted(true)
    } else {
      // Fallback in case preloader is disabled or standalone testing
      const timer = setTimeout(() => {
        setHasStarted(true)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [isReady])

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
          {/* Left Column: Authentic Blueprint Editorial Title, Details & CTAs */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={hasStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#163866]/80 border border-[#59d6e8]/30 rounded-full backdrop-blur-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#ffc928] shadow-[0_0_8px_#ffc928] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#59d6e8] font-bold">
                IEDC BOOTCAMP CEC • 24H SPRINT
              </span>
            </motion.div>

            {/* Kinetic Stacked Headline styled after PRODDEC */}
            <div className="space-y-3">
              <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[5.6rem] xl:text-[7.2rem] 2xl:text-[8.4rem] leading-[0.88] font-black uppercase tracking-tighter">
                <div className="overflow-hidden py-1">
                  <motion.div
                    initial={{ y: '125%', opacity: 0, skewY: 3 }}
                    animate={hasStarted ? { y: 0, opacity: 1, skewY: 0 } : { y: '125%', opacity: 0, skewY: 3 }}
                    transition={{ duration: 1.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="block whitespace-nowrap select-none origin-bottom-left"
                  >
                    <span className="text-[#ffc928] hover:brightness-110 transition-all">Draft</span>{' '}
                    <span className="text-white hover:text-white/90 transition-all">Build</span>
                  </motion.div>
                </div>
                <div className="overflow-hidden py-1">
                  <motion.div
                    initial={{ y: '125%', opacity: 0, skewY: 3 }}
                    animate={hasStarted ? { y: 0, opacity: 1, skewY: 0 } : { y: '125%', opacity: 0, skewY: 3 }}
                    transition={{ duration: 1.5, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className="block whitespace-nowrap select-none origin-bottom-left"
                  >
                    <span className="text-outline-white hover:text-white/20 transition-all duration-300">Pitch</span>{' '}
                    <span className="text-[#ffc928] hover:brightness-110 transition-all">Startup</span>
                  </motion.div>
                </div>
              </h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={hasStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-xs sm:text-sm lg:text-base text-[#c4daf2] font-normal max-w-xl leading-relaxed pt-2"
              >
                From initial sketch to viable prototype. A 24-hour innovation sprint where teams draft, build, and pitch ideas to mentors and a live jury.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hasStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1.1, delay: 0.88, ease: [0.22, 1, 0.36, 1] }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                href="#register"
                onClick={handleRegisterClick}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto active:scale-[0.98] !rounded-full px-7 py-3.5 font-mono font-bold text-sm tracking-wider shadow-[0_0_20px_rgba(255,201,40,0.3)] hover:shadow-[0_0_25px_rgba(255,201,40,0.5)] transition-shadow"
              >
                JOIN THE SPRINT &gt;
              </Button>

              <Button
                variant="secondary"
                size="lg"
                href="#schedule"
                onClick={handleScheduleClick}
                className="w-full sm:w-auto active:scale-[0.98] !rounded-full px-7 py-3.5 font-mono font-bold text-sm border-white/60 hover:border-[#ffc928] text-white"
              >
                VIEW SCHEDULE
              </Button>
            </motion.div>
          </div>

          {/* Right Column: 24H Sprint Reactor Gyroscope (Organic, Borderless) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={hasStarted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
            transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end mt-6 lg:mt-0 relative"
          >
            <SprintReactor />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
