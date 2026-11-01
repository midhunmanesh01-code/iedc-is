import React, { useState, useEffect } from 'react'
import { Sparkles, Target, Calendar, Flame, ArrowUpRight } from 'lucide-react'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

interface NavItem {
  readonly id: string
  readonly href: string
  readonly label: string
  readonly icon: React.ReactNode
}

export const MobileBottomNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero')
  const { scrollTo } = useSmoothScroll()

  const navItems: NavItem[] = [
    {
      id: 'hero',
      href: '#hero',
      label: 'Sprint',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: 'about',
      href: '#about',
      label: 'Intel',
      icon: <Target className="w-4 h-4" />,
    },
    {
      id: 'schedule',
      href: '#schedule',
      label: 'Timeline',
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: 'idea-forge',
      href: '#idea-forge',
      label: 'Forge',
      icon: <Flame className="w-4 h-4" />,
    },
  ]

  // Track active section via IntersectionObserver for instant mobile feedback
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'schedule', 'idea-forge', 'register']
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        { rootMargin: '-30% 0px -50% 0px', threshold: 0.1 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    scrollTo(href, -60)
  }

  return (
    <nav
      aria-label="Mobile Bottom Quick Navigation"
      className="md:hidden fixed bottom-3 left-3 right-3 z-40 max-w-md mx-auto"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="bg-[#131518]/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.85)] p-1.5 flex items-center justify-between gap-1 ring-1 ring-white/5">
        {/* Navigation Tabs */}
        <div className="flex items-center flex-1 justify-around">
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl min-w-[54px] min-h-[44px] transition-all duration-200 active:scale-90 ${
                  isActive
                    ? 'text-[#FF5500] bg-white/[0.08]'
                    : 'text-zinc-400 hover:text-zinc-200 active:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="relative">
                  {item.icon}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#FF5500] shadow-[0_0_8px_#FF5500]" />
                  )}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-tight mt-1 font-medium">
                  {item.label}
                </span>
              </a>
            )
          })}
        </div>

        {/* Floating High-Contrast Register Button */}
        <a
          href="#register"
          onClick={(e) => handleNavClick(e, '#register')}
          className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md shrink-0 min-h-[44px] ${
            activeSection === 'register'
              ? 'bg-[#FF5500] text-white ring-2 ring-white shadow-[0_0_20px_rgba(255,85,0,0.6)]'
              : 'bg-[#FF5500] text-white hover:bg-[#FF6B1A]'
          }`}
          aria-label="Register Squad for Idea Sprint 2026"
        >
          <span>Register</span>
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </a>
      </div>
    </nav>
  )
}
