import React, { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { NAVIGATION_LINKS, NAV_CONFIG } from '@/config/navigation'
import { Button } from '@/components/common/Button'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import iedcLogo from '@/assets/logos/iedc-logo-2.png'

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    scrollTo(href)
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none pt-3 sm:pt-4 px-4 sm:px-6 lg:px-8">
      <div
        className={`pointer-events-auto relative w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled ? 'max-w-3xl' : 'max-w-7xl'
        }`}
      >
        <nav
          aria-label="Main navigation"
          className={`mx-auto flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled || isMobileMenuOpen
              ? 'bg-[#131518]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 py-2 px-4 sm:px-5'
              : 'bg-transparent border-transparent py-3 sm:py-4 px-0'
          } ${
            isMobileMenuOpen ? 'rounded-[24px]' : 'rounded-[32px]'
          }`}
        >
          {/* Top Navbar Row: 3-column balanced grid */}
          <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center w-full">
            {/* Left Column: Brand Logo & Identifier (Restored to exact original position aligned with page content) */}
            <div className="flex items-center justify-start min-w-0">
              <a
                href="#hero"
                onClick={(e) => handleNavClick(e, '#hero')}
                className={`flex items-center group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500] p-1 rounded-xs shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isScrolled ? 'gap-0' : 'gap-3'
                }`}
                aria-label="IDEA SPRINT 2026 by IEDC BOOTCAMP CEC"
              >
                <img
                  src={iedcLogo}
                  alt="IEDC BOOTCAMP CEC Logo"
                  className={`w-auto object-contain transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] ${
                    isScrolled ? 'h-7 sm:h-8' : 'h-8 sm:h-9 md:h-10'
                  }`}
                />

                {/* Brand text: collapses away on scroll so the capsule stays compact */}
                <div
                  className={`flex flex-col -space-y-0.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
                    isScrolled
                      ? 'max-w-0 opacity-0 -translate-x-2 pointer-events-none'
                      : 'max-w-[220px] opacity-100 translate-x-0'
                  }`}
                  aria-hidden={isScrolled}
                >
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-zinc-100 transition-colors">
                      {NAV_CONFIG.brandName}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#FF5500]">
                      '{NAV_CONFIG.brandSuffix.slice(-2)}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 whitespace-nowrap">
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
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-mono tracking-tight bg-[#FF5500]/15 text-[#FF5500] border border-[#FF5500]/30 rounded-xs">
                      {link.badge}
                    </span>
                  )}
                  <span className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-[#FF5500] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
                </a>
              ))}
            </div>

            {/* Right Column: Action CTA & Mobile Hamburger */}
            <div className="flex items-center justify-end gap-2.5">
              <div className="hidden md:flex items-center">
                <Button
                  variant="primary"
                  size="sm"
                  href={NAV_CONFIG.ctaHref}
                  onClick={(e) => handleNavClick(e, NAV_CONFIG.ctaHref)}
                  rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
                  className="!rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-wider font-semibold shadow-lg shadow-[#FF5500]/20 hover:shadow-[#FF5500]/40 whitespace-nowrap"
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
                  className="text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none flex items-center justify-center overflow-hidden relative w-8 h-8"
                >
                  <div
                    className={`absolute transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
                    }`}
                  >
                    <X className="w-4 h-4 text-white" />
                  </div>
                  <div
                    className={`absolute transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isMobileMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
                    }`}
                  >
                    <Menu className="w-4 h-4 text-white" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          <div
            id="mobile-navigation"
            className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
              isMobileMenuOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
            }`}
          >
            <div className="overflow-hidden">
              <div className="flex flex-col space-y-1 pt-3 pb-2 border-t border-white/10">
                {NAVIGATION_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block px-3.5 py-2 font-mono text-sm uppercase tracking-wider text-zinc-300 hover:text-[#FF5500] hover:bg-white/5 rounded-xl transition-all duration-200"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] font-mono tracking-tight bg-[#FF5500]/15 text-[#FF5500] border border-[#FF5500]/30 rounded-xs">
                        {link.badge}
                      </span>
                    )}
                  </a>
                ))}

                <div className="pt-2 px-1">
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
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
