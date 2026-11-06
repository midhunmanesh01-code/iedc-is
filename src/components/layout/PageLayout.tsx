import React from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export interface PageLayoutProps {
  readonly children: React.ReactNode
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-[100dvh] bg-[#102b52] text-[#f5f7fa] flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-[#ffc928] selection:text-[#102b52] overflow-x-clip">
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

      <Navbar />

      <main id="main-content" className="flex-1 relative z-10 pt-16 sm:pt-20">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default PageLayout
