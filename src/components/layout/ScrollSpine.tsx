import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent } from 'motion/react'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

export const ScrollSpine: React.FC = () => {
  const { scrollYProgress, scrollY } = useScroll()
  const [hasScroll, setHasScroll] = useState(false)
  const [height, setHeight] = useState(0)
  const [isVisible, setIsVisible] = useState(() => typeof window !== 'undefined' && window.scrollY > 40)
  const [isHovered, setIsHovered] = useState(false)
  const [scrubPercent, setScrubPercent] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const { scrollTo } = useSmoothScroll()

  // Season of Code spring configuration
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Measure dynamic 70% viewport height and track scrollable document
  useEffect(() => {
    const update = () => {
      setHasScroll(document.documentElement.scrollHeight > window.innerHeight)
      setHeight(window.innerHeight * 0.7)
    }

    update()
    window.addEventListener('resize', update)

    const resizeObs = new ResizeObserver(() => update())
    resizeObs.observe(document.body)

    return () => {
      window.removeEventListener('resize', update)
      resizeObs.disconnect()
    }
  }, [])

  // Fade in on scroll past 40px, fade out at top
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!isVisible && latest > 40) setIsVisible(true)
    if (isVisible && latest <= 40) setIsVisible(false)
  })

  // Handle clicking or dragging along spine to navigate to any section
  const handleScrollToRatio = useCallback((clientY: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height))
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetY = ratio * maxScroll

    scrollTo(targetY, { duration: 0.8, offset: 0 })
    setScrubPercent(Math.round(ratio * 100))
  }, [scrollTo])

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true
    handleScrollToRatio(e.clientY)

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (isDraggingRef.current) {
        handleScrollToRatio(moveEvent.clientY)
      }
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
      setScrubPercent(null)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    setScrubPercent(Math.round(ratio * 100))
  }

  if (!hasScroll || height <= 0) return null

  // Season of Code circuit board path with 45-degree doglegs
  const d = `
    M 18 0 
    V ${height * 0.15} 
    l -12 12 
    V ${height * 0.4} 
    l 12 12 
    V ${height * 0.7} 
    l -14 14 
    V ${height}
  `.replace(/\s+/g, ' ').trim()

  return (
    <motion.div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        if (!isDraggingRef.current) setScrubPercent(null)
      }}
      className="hidden md:block fixed top-1/2 -translate-y-1/2 right-2 sm:right-3 w-7 z-[100] py-4 select-none cursor-pointer group"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      aria-label="Scroll controller"
      title="Click or drag to scroll"
    >
      <div className="relative flex justify-end">
        {/* Tooltip percentage on hover/scrub */}
        {isHovered && scrubPercent !== null && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none px-2 py-0.5 rounded bg-[#071526]/90 border border-[#59d6e8]/40 backdrop-blur-md shadow-[0_0_12px_rgba(89,214,232,0.3)]">
            <span className="font-mono text-[10px] font-bold text-[#ffc928]">
              {scrubPercent}%
            </span>
          </div>
        )}

        <svg
          viewBox={`0 0 20 ${height}`}
          width="20"
          height={height}
          className="block overflow-visible"
          aria-hidden="true"
        >
          <defs>
            {/* Season of Code glowing gradient adapted to IEDC gold and cyan */}
            <linearGradient id="soc-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffc928" />
              <stop offset="35%" stopColor="#59d6e8" />
              <stop offset="65%" stopColor="#ffc928" />
              <stop offset="100%" stopColor="#59d6e8" />
            </linearGradient>

            <filter id="soc-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Muted Circuit Spine */}
          <path
            d={d}
            fill="none"
            stroke="rgba(89, 214, 232, 0.16)"
            strokeWidth="1.5"
            className="transition-colors duration-300 group-hover:stroke-rgba(89,214,232,0.35)"
          />

          {/* Animated Glowing Fill Circuit Spine */}
          <motion.path
            d={d}
            fill="none"
            stroke="url(#soc-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#soc-glow)"
            style={{ pathLength }}
          />
        </svg>
      </div>
    </motion.div>
  )
}

export default ScrollSpine
