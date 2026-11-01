export interface NavItem {
  readonly label: string
  readonly href: string
  readonly badge?: string
}

export const NAVIGATION_LINKS: readonly NavItem[] = [
  { label: 'Overview', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Idea Forge', href: '#idea-forge', badge: 'Interactive' },
  { label: 'Register', href: '#register' },
] as const

export const NAV_CONFIG = {
  brandName: 'IDEA SPRINT',
  brandSuffix: '2026',
  organizerBadge: 'IEDC CEC',
  ctaText: 'Register Now',
  ctaHref: '#register',
} as const
