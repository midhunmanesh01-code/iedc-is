import React from 'react'
import { Globe, Mail, MapPin, ArrowUp } from 'lucide-react'
import { EVENT_CONFIG } from '@/config/event'
import { NAVIGATION_LINKS } from '@/config/navigation'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

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

  return (
    <footer className="relative bg-[#070809] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Decorative Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B8FF00]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Organizer Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-[#0F1217] border border-white/20">
                <span className="font-mono text-xs font-bold text-[#B8FF00]">IS</span>
              </div>
              <span className="font-['Space_Grotesk'] font-bold text-xl tracking-tight text-white">
                {EVENT_CONFIG.name}
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Organized by <strong className="text-slate-200">{EVENT_CONFIG.organizer}</strong> –{' '}
              {EVENT_CONFIG.organizerFull}. Fostering hands-on technological entrepreneurship, rapid prototyping, and student innovation.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
              <span className="font-mono text-xs text-slate-400">
                24-Hour Student Ideathon Initiative
              </span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#B8FF00] font-semibold">
              // Navigation
            </div>
            <ul className="space-y-2 font-mono text-xs">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTo(link.href)
                    }}
                    className="text-slate-400 hover:text-white hover:underline transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Campus Information */}
          <div className="lg:col-span-4 space-y-3">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#B8FF00] font-semibold">
              // Contact & Campus
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{EVENT_CONFIG.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <a
                  href={`mailto:${EVENT_CONFIG.contact.email}`}
                  className="hover:text-[#B8FF00] transition-colors"
                >
                  {EVENT_CONFIG.contact.email}
                </a>
              </li>
            </ul>

            {/* Social Channels */}
            <div className="pt-3">
              <div className="font-mono text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                Connect With IEDC CEC
              </div>
              <div className="flex items-center gap-2">
                {EVENT_CONFIG.socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2 bg-[#0F1217] border border-white/10 hover:border-[#B8FF00]/50 hover:text-[#B8FF00] text-slate-400 transition-colors rounded-xs focus-visible:outline-2 focus-visible:outline-[#B8FF00]"
                  >
                    {getSocialIcon(social.iconName)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {EVENT_CONFIG.edition} {EVENT_CONFIG.organizer}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px]">Designed for IEDC IDEA SPRINT 2026</span>
            <button
              type="button"
              onClick={handleBackToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#B8FF00] transition-colors p-1 focus-visible:outline-2 focus-visible:outline-[#B8FF00]"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
