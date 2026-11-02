import React from 'react'
import { Globe, Mail, MapPin, ArrowUp, ExternalLink, Heart, ArrowRight } from 'lucide-react'
import { EVENT_CONFIG } from '@/config/event'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import iedcLogo from '@/assets/logos/iedc-logo-2.png'

const FOOTER_NAV_LEFT = [
  { label: 'Overview', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Schedule', href: '#schedule' },
] as const

const FOOTER_NAV_RIGHT = [
  { label: 'Idea Forge', href: '#idea-forge' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Register', href: '#register' },
] as const

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
          <div className="lg:col-span-4 space-y-5">
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
              Organized by <strong className="text-zinc-100 font-semibold">{EVENT_CONFIG.organizer}</strong>, College of Engineering Chengannur. Fostering student innovation and rapid prototyping.
            </p>

            {/* Social Channels with Animated Micro-Interactions */}
            <div className="pt-1">
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

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-4 space-y-4">
            <div className="font-mono text-sm uppercase tracking-[0.2em] text-[#ffc928] font-bold flex items-center gap-2.5">
              <span className="w-2 h-2 bg-[#ffc928] rounded-full" />
              <span>NAVIGATION</span>
            </div>

            <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8">
              <ul>
                {FOOTER_NAV_LEFT.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollTo(link.href)
                      }}
                      className="group flex items-center justify-between py-2.5 sm:py-3 border-b border-white/10 hover:border-[#ffc928]/40 transition-all duration-200 cursor-pointer"
                    >
                      <span className="font-sans font-medium text-sm sm:text-base text-zinc-200 group-hover:text-[#ffc928] tracking-tight transition-colors">
                        {link.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#ffc928] transition-all duration-200 group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>

              <ul>
                {FOOTER_NAV_RIGHT.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollTo(link.href)
                      }}
                      className="group flex items-center justify-between py-2.5 sm:py-3 border-b border-white/10 hover:border-[#ffc928]/40 transition-all duration-200 cursor-pointer"
                    >
                      <span className="font-sans font-medium text-sm sm:text-base text-zinc-200 group-hover:text-[#ffc928] tracking-tight transition-colors">
                        {link.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#ffc928] transition-all duration-200 group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Venue & Map Location */}
          <div className="lg:col-span-4 space-y-4">
            <div className="font-mono text-sm uppercase tracking-[0.2em] text-[#ffc928] font-bold flex items-center gap-2.5">
              <span className="w-2 h-2 bg-[#ffc928] rounded-full" />
              <span>VENUE & LOCATION</span>
            </div>

            <div className="flex items-start gap-3 text-sm text-zinc-400 font-mono">
              <div className="p-1.5 rounded-md bg-white/[0.04] border border-white/10 text-[#59d6e8] shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="leading-relaxed text-zinc-300">
                {EVENT_CONFIG.contact.address}
              </span>
            </div>

            {/* Compact Embedded Map */}
            <div className="relative rounded-xl overflow-hidden border border-white/10 group bg-zinc-950 shadow-inner">
              <iframe
                title="College of Engineering Chengannur Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.845899452777!2d76.61519907487224!3d9.317274790737225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0622667d8a6b19%3A0x334fb9e831622bde!2sCollege%20of%20Engineering%20Chengannur!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                className="w-full h-32 sm:h-36 border-0 opacity-80 contrast-125 invert-[0.9] hue-rotate-180 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://maps.google.com/?q=College+of+Engineering+Chengannur"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/85 hover:bg-[#ffc928] text-zinc-300 hover:text-black border border-white/20 hover:border-[#ffc928] font-mono text-xs font-semibold backdrop-blur-xs transition-all duration-200 cursor-pointer shadow-sm"
                aria-label="Open College of Engineering Chengannur in Google Maps"
              >
                <span>DIRECTIONS</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Interactive Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {EVENT_CONFIG.edition} {EVENT_CONFIG.organizer}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-zinc-400 font-mono inline-flex items-center gap-1.5">
              <span>Built with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline shrink-0" aria-label="love" />
              <span>by</span>
              <span className="text-zinc-200 font-medium hover:text-[#ffc928] transition-colors">
                Midhun Manesh
              </span>
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
