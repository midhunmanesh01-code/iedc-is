import type { EventConfig } from '@/types/event'

/**
 * Centralized Event Configuration
 * 
 * IMPORTANT: Exact date, venue timing, contact details, and external links are
 * marked as placeholders until finalized by the organizing committee.
 * The UI components gracefully handle unset dates and placeholder states.
 */
export const EVENT_CONFIG: EventConfig = {
  name: 'IDEA SPRINT 2026',
  acronym: 'IS26',
  edition: '2026',
  tagLine: '24 Hours of Disruptive Student Innovation',
  organizer: 'IEDC BOOTCAMP CEC',
  organizerFull: 'Innovation and Entrepreneurship Development Centre, College of Engineering Chengannur',

  // Date and timing configuration
  isDateAnnounced: true,
  startDate: '2026-12-15T09:00:00+05:30',
  endDate: '2026-12-16T09:00:00+05:30',
  durationHours: 24,

  // Venue configuration
  venue: 'College of Engineering Chengannur (CEC)', // [PLACEHOLDER: Hall/Auditorium details TBA]

  // Registration configuration
  registrationStatus: 'upcoming', // 'upcoming' | 'open' | 'closed' | 'waitlist'
  registrationUrl: null, // [PLACEHOLDER: External portal or Google Form URL if applicable]

  // Contact details (Placeholders)
  contact: {
    email: 'iedc@ceconline.edu', // [PLACEHOLDER]
    phone: '+91 00000 00000',    // [PLACEHOLDER]
    address: 'College of Engineering Chengannur, Alappuzha, Kerala - 689121',
    locationName: 'CEC Campus, Chengannur',
  },

  // Social media channels
  socials: [
    {
      id: 'instagram',
      label: 'Instagram',
      url: 'https://instagram.com/iedcbootcampcec', // [PLACEHOLDER]
      iconName: 'instagram',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://linkedin.com/company/iedc-bootcamp-cec', // [PLACEHOLDER]
      iconName: 'linkedin',
    },
    {
      id: 'twitter',
      label: 'X (Twitter)',
      url: 'https://twitter.com/iedcbootcampcec', // [PLACEHOLDER]
      iconName: 'twitter',
    },
    {
      id: 'website',
      label: 'IEDC CEC Website',
      url: 'https://ceconline.edu', // [PLACEHOLDER]
      iconName: 'globe',
    },
  ],
} as const
