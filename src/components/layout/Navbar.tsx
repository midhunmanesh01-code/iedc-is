import React, { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { NAVIGATION_LINKS, NAV_CONFIG } from '@/config/navigation'
import { Button } from '@/components/common/Button'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import iedcLogo from '@/assets/logos/iedc-logo-2.png'

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [clickedHref, setClickedHref] = useState<string | null>(null)
  const [isFooterLogoInView, setIsFooterLogoInView] = useState(false)
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          setIsScrolled((prev) => {
            // Hysteresis dead-zone to prevent boundary jittering on mobile/touch scroll:
            // Shrinks when scrolled past 48px, expands back only above 20px
            if (!prev && scrollY > 48) return true
            if (prev && scrollY < 20) return false
            return prev
          })
          ticking = false
        })
        ticking = true
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Listen for footer logo intersection event for zero-latency morph coordination
    const handleFooterEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ inView: boolean }>
      setIsFooterLogoInView(customEvent.detail.inView)
    }
    window.addEventListener('iedc:footer-logo-in-view', handleFooterEvent)

    // Fallback IntersectionObserver for mobile footer docking
    const footerEl = document.getElementById('footer-brand') || document.getElementById('contact')
    let observer: IntersectionObserver | null = null
    if (footerEl) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsFooterLogoInView(entry.isIntersecting)
        },
        { threshold: 0.1 }
      )
      observer.observe(footerEl)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('iedc:footer-logo-in-view', handleFooterEvent)
      if (observer) observer.disconnect()
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (href === '#schedule') {
      window.dispatchEvent(new CustomEvent('iedc:open-schedule'))
    }
    if (isMobileMenuOpen) {
      setClickedHref(href)
      setTimeout(() => {
        setIsMobileMenuOpen(false)
        scrollTo(href)
        setTimeout(() => setClickedHref(null), 350)
      }, 150)
    } else {
      scrollTo(href)
    }
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none pt-2.5 sm:pt-4 px-3.5 sm:px-6 lg:px-8 transform-gpu">
      <div
        className={`pointer-events-auto relative w-full transition-[max-width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled ? 'max-w-3xl' : 'max-w-7xl'
        }`}
      >
        <nav
          aria-label="Main navigation"
          className={`relative mx-auto flex flex-col transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[32px] ${
            isScrolled
              ? 'py-2 px-3.5 sm:px-5'
              : 'py-2.5 sm:py-3.5 px-3 sm:px-5'
          }`}
        >
          {/* Desktop Glassmorphic Capsule Background: visible on desktop when scrolled */}
          <div
            className={`hidden md:block absolute inset-0 rounded-[inherit] -z-10 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled
                ? 'opacity-100 bg-[#131518]/60 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/40'
                : 'opacity-0'
            }`}
            aria-hidden="true"
          />

          {/* Top Navbar Row: 3-column balanced grid */}
          <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center w-full">
            {/* Left Column: Brand Logo & Identifier (Restored to exact original position aligned with page content) */}
            <div className="flex items-center justify-start min-w-0">
              <a
                href="#hero"
                onClick={(e) => handleNavClick(e, '#hero')}
                className={`flex items-center group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc928] p-1 rounded-xs shrink-0 transition-[gap,opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isScrolled ? 'gap-0' : 'gap-2.5 sm:gap-3'
                } ${
                  isFooterLogoInView
                    ? 'max-md:opacity-0 max-md:translate-y-6 max-md:scale-75 max-md:pointer-events-none'
                    : 'opacity-100 translate-y-0 scale-100'
                }`}
                aria-label="IDEA SPRINT 2026 by IEDC BOOTCAMP CEC"
              >
                <img
                  src={iedcLogo}
                  alt="IEDC BOOTCAMP CEC Logo"
                  className={`w-auto object-contain transition-all duration-300 ease-out group-hover:scale-105 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] ${
                    isScrolled ? 'h-9 sm:h-9 md:h-8.5' : 'h-11 sm:h-11 md:h-10'
                  }`}
                />

                {/* Brand text: collapses away on scroll so the navbar shrinks cleanly without any box on mobile */}
                <div
                  className={`flex flex-col -space-y-0.5 transition-[max-width,opacity,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden will-change-[max-width,opacity,transform] ${
                    isScrolled
                      ? 'max-w-0 opacity-0 -translate-x-2 pointer-events-none'
                      : 'max-w-[240px] opacity-100 translate-x-0'
                  }`}
                  aria-hidden={isScrolled}
                >
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-zinc-100 transition-colors">
                      {NAV_CONFIG.brandName}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#ffc928]">
                      '{NAV_CONFIG.brandSuffix.slice(-2)}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400 whitespace-nowrap">
                    {NAV_CONFIG.organizerBadge}
                  </span>
                </div>
              </a>
            </div>

            {/* Center Column: Desktop Navigation Links (Pinned to True Center) */}
            <div className="hidden md:flex items-center justify-center space-x-1 lg:space-x-1.5">
              {NAVIGATION_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-zinc-300 hover:text-white transition-all duration-300 group whitespace-nowrap"
                >
                  <span className="inline-block transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:text-[#ffc928] group-hover:drop-shadow-[0_0_8px_rgba(255,201,40,0.4)]">
                    {link.label}
                  </span>
                  {link.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-mono tracking-tight bg-[#ffc928]/15 text-[#ffc928] border border-[#ffc928]/30 rounded-xs transition-transform duration-200 group-hover:scale-105">
                      {link.badge}
                    </span>
                  )}
                  <span className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-[#ffc928] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
                </a>
              ))}
            </div>

            {/* Right Column: Action CTA & Mobile Hamburger */}
            <div className="flex items-center justify-end gap-2.5">
              {/* Desktop-only Action CTA */}
              <div className="hidden md:flex items-center">
                <Button
                  variant="primary"
                  size="sm"
                  href={NAV_CONFIG.ctaHref}
                  onClick={(e) => handleNavClick(e, NAV_CONFIG.ctaHref)}
                  rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
                  className="!rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-wider font-semibold shadow-lg shadow-[#ffc928]/20 hover:shadow-[#ffc928]/40 whitespace-nowrap"
                >
                  {NAV_CONFIG.ctaText}
                </Button>
              </div>

              {/* Mobile Menu Toggle Button */}
              <div className="md:hidden">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-navigation"
                  aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  className="text-white p-2.5 rounded-full bg-white/10 hover:bg-[#ffc928]/15 hover:text-[#ffc928] border border-white/10 hover:border-[#ffc928]/40 active:bg-white/30 transition-all duration-200 focus:outline-none flex items-center justify-center overflow-hidden relative w-12 h-12 cursor-pointer shrink-0"
                >
                  <div
                    className={`absolute transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
                    }`}
                  >
                    <X className="w-6 h-6" />
                  </div>
                  <div
                    className={`absolute transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isMobileMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
                    }`}
                  >
                    <Menu className="w-6 h-6" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Dropdown Box with Full Opening & Closing ("Going Back") Animation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                id="mobile-navigation"
                key="mobile-drawer"
                initial={{ opacity: 0, height: 0, y: -12, scale: 0.97 }}
                animate={{
                  opacity: 1,
                  height: 'auto',
                  y: 0,
                  scale: 1,
                  transition: {
                    height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                    y: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                    scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.25, ease: 'easeOut' },
                  },
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  y: -14,
                  scale: 0.97,
                  transition: {
                    height: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                    y: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                    scale: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.28, ease: 'easeInOut' },
                  },
                }}
                style={{ transformOrigin: 'top center' }}
                className="overflow-hidden md:hidden mt-2 rounded-[24px] bg-[#131518]/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60 origin-top"
              >
                <div className="flex flex-col space-y-1.5 p-3.5">
                  {NAVIGATION_LINKS.map((link) => {
                    const isSelected = clickedHref === link.href
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`group flex items-center justify-between px-3.5 py-2.5 font-mono text-sm uppercase tracking-wider rounded-xl transition-all duration-200 border cursor-pointer active:scale-[0.99] ${
                          isSelected
                            ? 'bg-[#ffc928]/15 border-[#ffc928]/50 text-[#ffc928] shadow-[0_0_16px_rgba(255,201,40,0.2)]'
                            : 'border-transparent text-zinc-300 hover:text-[#ffc928] hover:bg-[#ffc928]/10 hover:border-[#ffc928]/30 hover:shadow-[0_0_16px_rgba(255,201,40,0.12)] active:bg-[#ffc928]/15 active:text-[#ffc928] active:border-[#ffc928]/40'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{link.label}</span>
                          {link.badge && (
                            <span className="px-1.5 py-0.5 text-[10px] font-mono tracking-tight bg-[#ffc928]/15 text-[#ffc928] border border-[#ffc928]/30 rounded-xs">
                              {link.badge}
                            </span>
                          )}
                        </div>
                        <ArrowRight
                          className={`w-4 h-4 transition-all duration-200 ${
                            isSelected
                              ? 'text-[#ffc928] translate-x-1'
                              : 'text-zinc-500 group-hover:text-[#ffc928] group-active:text-[#ffc928] group-hover:translate-x-1 group-active:translate-x-1'
                          }`}
                        />
                      </a>
                    )
                  })}

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="md"
                      href={NAV_CONFIG.ctaHref}
                      onClick={(e) => handleNavClick(e, NAV_CONFIG.ctaHref)}
                      className="w-full justify-center !rounded-xl"
                      rightIcon={<ArrowUpRight className="w-4 h-4" />}
                    >
                      {NAV_CONFIG.ctaText}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
