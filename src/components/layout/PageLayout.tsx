import React from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export interface PageLayoutProps {
  readonly children: React.ReactNode
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-[100dvh] bg-[#102b52] text-[#f5f7fa] flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-[#ffc928] selection:text-[#102b52] overflow-x-hidden">
      {/* Accessibility: Skip to Content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#ffc928] text-[#102b52] font-mono text-xs font-bold uppercase tracking-wider outline-none ring-2 ring-white shadow-xl rounded-xs"
      >
        Skip to main content
      </a>

      {/* Precision Engineering Blueprint Grid Overlay */}
      <div
        className="fixed inset-0 pointer-events-none bg-blueprint-grid opacity-75 z-0"
        aria-hidden="true"
      />

      {/* Subtle Blueprint Radial Lighting Accent (Drafting Gold & Cyan) */}
      <div
        className="fixed -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#59d6e8]/10 blur-[130px] rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="fixed top-1/3 -right-40 w-[600px] h-[500px] bg-[#ffc928]/5 blur-[140px] rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Outer Technical Blueprint Frame Guides */}
      <div className="fixed inset-2 sm:inset-4 pointer-events-none border border-[#59d6e8]/25 z-40" aria-hidden="true">
        {/* Corner registration crosses */}
        <span className="absolute -top-1.5 -left-1.5 w-3 h-3 text-[#59d6e8]/60 font-mono text-[10px] leading-none">+</span>
        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 text-[#59d6e8]/60 font-mono text-[10px] leading-none">+</span>
        <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 text-[#59d6e8]/60 font-mono text-[10px] leading-none">+</span>
        <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 text-[#59d6e8]/60 font-mono text-[10px] leading-none">+</span>

        {/* Blueprint coordinate markers */}
        <span className="absolute top-1 left-2 font-mono text-[9px] uppercase tracking-widest text-[#59d6e8]/40 hidden md:inline">
          IDEA SPRINT · 2026
        </span>
        <span className="absolute top-1 right-2 font-mono text-[9px] uppercase tracking-widest text-[#ffc928]/50 hidden md:inline">
          IEDC BOOTCAMP · CEC
        </span>
      </div>

      <Navbar />

      <main id="main-content" className="flex-1 relative z-10 pt-16 sm:pt-20">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default PageLayout
