import React, { useState } from 'react'
import { Globe, Mail, MapPin, ArrowUp, ChevronRight, Check, Copy } from 'lucide-react'
import { EVENT_CONFIG } from '@/config/event'
import { NAVIGATION_LINKS } from '@/config/navigation'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import iedcLogo from '@/assets/logos/iedc-logo-2.png'

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const TwitterXIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export const Footer: React.FC = () => {
  const { scrollTo } = useSmoothScroll()
  const [copiedEmail, setCopiedEmail] = useState(false)

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'instagram':
        return <InstagramIcon className="w-4 h-4" />
      case 'linkedin':
        return <LinkedinIcon className="w-4 h-4" />
      case 'twitter':
        return <TwitterXIcon className="w-4 h-4" />
      case 'mail':
        return <Mail className="w-4 h-4" />
      case 'globe':
      default:
        return <Globe className="w-4 h-4" />
    }
  }

  const handleBackToTop = () => {
    scrollTo('#hero', -100)
  }

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(EVENT_CONFIG.contact.email).then(() => {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    }).catch(() => {})
  }

  return (
    <footer
      id="contact"
      aria-label="Site Footer"
      className="relative bg-black text-zinc-100 pt-16 sm:pt-20 pb-12 overflow-hidden border-t border-white/10"
    >
      {/* Animated Glowing Top Border Beam */}
      <div className="absolute top-0 left-0 right-0 h-[2px] footer-glow-line pointer-events-none z-10" aria-hidden="true" />

      {/* Subtle Technical Blueprint Watermark Pattern */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-[0.08] pointer-events-none" aria-hidden="true" />

      {/* Ambient Radial Core Light Pulse */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-[#ffc928]/8 via-[#59d6e8]/5 to-transparent blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Large Artistic Background Typographic Watermark */}
      <div
        className="absolute -bottom-6 sm:-bottom-10 left-1/2 -translate-x-1/2 select-none pointer-events-none text-white/[0.025] font-display font-black text-6xl sm:text-8xl md:text-[11rem] tracking-[0.16em] uppercase whitespace-nowrap will-change-transform"
        aria-hidden="true"
      >
        IDEA SPRINT
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 sm:pb-16 border-b border-white/10">
          {/* Column 1: Brand & Organizer Identity */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3 group cursor-pointer w-fit" onClick={handleBackToTop}>
              <img
                src={iedcLogo}
                alt="IEDC BOOTCAMP CEC Logo"
                className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 ease-out group-hover:scale-105 drop-shadow-[0_4px_16px_rgba(255,201,40,0.2)]"
              />
              <div className="flex flex-col -space-y-0.5">
                <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-white group-hover:text-[#ffc928] transition-colors">
                  {EVENT_CONFIG.name}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#59d6e8]">
                  IEDC BOOTCAMP • CEC
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed font-mono">
              Organized by <strong className="text-zinc-100 font-semibold">{EVENT_CONFIG.organizer}</strong> –{' '}
              {EVENT_CONFIG.organizerFull}. Fostering hands-on technological entrepreneurship, rapid prototyping, and student innovation.
            </p>

            {/* Live Beacon Status Indicator */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#ffc928]/40 transition-colors">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffc928] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ffc928] shadow-[0_0_10px_#ffc928]" />
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-300 font-medium">
                24H SPRINT • ADMISSION STANDBY
              </span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#ffc928] font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#ffc928] rounded-full" />
              <span>NAVIGATION</span>
            </div>

            <ul className="space-y-2.5 font-mono text-xs">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTo(link.href)
                    }}
                    className="group inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-all duration-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#59d6e8] opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span className="group-hover:translate-x-0.5 group-hover:text-[#ffc928] transition-all duration-200">
                      {link.label}
                    </span>
                    {link.badge && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-mono tracking-tight bg-[#ffc928]/15 text-[#ffc928] border border-[#ffc928]/30 rounded-xs">
                        {link.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact, Venue & Social Channels */}
          <div className="lg:col-span-4 space-y-4">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#ffc928] font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#ffc928] rounded-full" />
              <span>CONTACT & VENUE</span>
            </div>

            <ul className="space-y-3 text-xs text-zinc-400 font-mono">
              <li className="flex items-start gap-3">
                <div className="p-1.5 rounded-md bg-white/[0.04] border border-white/10 text-[#59d6e8] shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="leading-relaxed">{EVENT_CONFIG.contact.address}</span>
              </li>

              <li className="flex items-center gap-3">
                <div className="p-1.5 rounded-md bg-white/[0.04] border border-white/10 text-[#59d6e8] shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${EVENT_CONFIG.contact.email}`}
                    className="hover:text-[#ffc928] transition-colors font-medium text-zinc-300"
                  >
                    {EVENT_CONFIG.contact.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1 rounded text-zinc-500 hover:text-white transition-colors"
                    title="Copy Email"
                    aria-label="Copy Email address"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </li>
            </ul>

            {/* Social Channels with Animated Micro-Interactions */}
            <div className="pt-2">
              <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-2.5">
                Connect With IEDC CEC
              </div>
              <div className="flex items-center gap-2.5">
                {EVENT_CONFIG.socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group relative min-w-[42px] min-h-[42px] flex items-center justify-center bg-white/[0.04] hover:bg-[#ffc928]/10 border border-white/10 hover:border-[#ffc928]/60 text-zinc-300 hover:text-[#ffc928] rounded-xl transition-all duration-300 transform-gpu hover:-translate-y-1 hover:shadow-[0_8px_20px_-4px_rgba(255,201,40,0.3)] active:scale-95 focus-visible:outline-2 focus-visible:outline-[#ffc928] cursor-pointer"
                  >
                    {getSocialIcon(social.iconName)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Interactive Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {EVENT_CONFIG.edition} {EVENT_CONFIG.organizer}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-zinc-500 hidden sm:inline">
              Engineered for Student Builders
            </span>
            <button
              type="button"
              onClick={handleBackToTop}
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-[#ffc928]/15 border border-white/10 hover:border-[#ffc928]/50 text-xs font-mono text-zinc-300 hover:text-[#ffc928] transition-all duration-300 active:scale-95 cursor-pointer shadow-sm focus-visible:outline-2 focus-visible:outline-[#ffc928]"
              aria-label="Back to top"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
