import React, { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { NAVIGATION_LINKS, NAV_CONFIG } from '@/config/navigation'
import { Button } from '@/components/common/Button'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    scrollTo(href)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08090A]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Identifier */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF00] p-1"
            aria-label="IDEA SPRINT 2026 by IEDC BOOTCAMP CEC"
          >
            {/* Tech Logo Mark */}
            <div className="relative flex items-center justify-center w-9 h-9 bg-[#0F1217] border border-white/15 group-hover:border-[#B8FF00] transition-colors">
              <span className="font-mono text-xs font-bold text-white group-hover:text-[#B8FF00] transition-colors">
                IS
              </span>
              <span className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-[#B8FF00]" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-['Space_Grotesk'] font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-slate-100 transition-colors">
                  {NAV_CONFIG.brandName}
                </span>
                <span className="font-mono text-xs font-semibold text-[#B8FF00]">
                  '{NAV_CONFIG.brandSuffix.slice(-2)}
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                {NAV_CONFIG.organizerBadge}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main navigation">
            {NAVIGATION_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-slate-300 hover:text-white transition-colors group"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-mono tracking-tight bg-[#B8FF00]/10 text-[#B8FF00] border border-[#B8FF00]/25 rounded-xs">
                    {link.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-3.5 right-3.5 h-[1.5px] bg-[#B8FF00] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
              </a>
            ))}
          </nav>

          {/* Action CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              href={NAV_CONFIG.ctaHref}
              onClick={(e) => handleNavClick(e, NAV_CONFIG.ctaHref)}
              rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
              className="hidden sm:inline-flex"
            >
              {NAV_CONFIG.ctaText}
            </Button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF00]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden border-b border-white/10 bg-[#08090A]/95 backdrop-blur-xl px-4 pt-4 pb-6 mt-2"
        >
          <nav className="flex flex-col space-y-2" aria-label="Mobile navigation">
            {NAVIGATION_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center justify-between px-3 py-2.5 font-mono text-sm uppercase tracking-wider text-slate-200 hover:text-[#B8FF00] hover:bg-white/5 border-l-2 border-transparent hover:border-[#B8FF00] transition-colors"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-mono tracking-tight bg-[#B8FF00]/10 text-[#B8FF00] border border-[#B8FF00]/30 rounded-xs">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}

            <div className="pt-3 border-t border-white/10 mt-2">
              <Button
                variant="primary"
                size="md"
                href={NAV_CONFIG.ctaHref}
                onClick={(e) => handleNavClick(e, NAV_CONFIG.ctaHref)}
                className="w-full justify-center"
                rightIcon={<ArrowUpRight className="w-4 h-4" />}
              >
                {NAV_CONFIG.ctaText}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
