import React from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export interface PageLayoutProps {
  readonly children: React.ReactNode
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#0C0D0E] text-zinc-100 flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-[#FF5500] selection:text-white">
      {/* Accessibility: Skip to Content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#FF5500] text-white font-mono text-xs font-semibold uppercase tracking-wider outline-none ring-2 ring-white shadow-lg"
      >
        Skip to main content
      </a>

      {/* Subtle Background Tech Grid Overlay */}
      <div
        className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-40 z-0"
        aria-hidden="true"
      />

      {/* Ambient Radial Accent Gradients (Subtle & Controlled) */}
      <div
        className="fixed -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#FF5500]/5 blur-[120px] rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />

      <Navbar />

      <main id="main-content" className="flex-1 relative z-10 pt-16 sm:pt-20">
        {children}
      </main>

      <Footer />
    </div>
  )
}
