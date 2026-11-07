import type { ScheduleConfig } from '@/types/schedule'

/**
 * Event Schedule Configuration for IDEA SPRINT 2026
 * Concise, high-signal itinerary for both sprint days.
 */
export const SCHEDULE_CONFIG: ScheduleConfig = {
  isScheduleFinalized: false,
  days: [
    {
      dayNumber: 1,
      dayLabel: 'Day 01',
      dateLabel: 'Tuesday, Dec 15',
      theme: 'Ideation & Problem Validation',
      timeRange: '09:00 AM – 01:00 AM',
      items: [
        {
          id: 'd1-checkin',
          time: '09:00 AM – 10:00 AM',
          title: 'Check-in & Station Allocation',
          description: 'Credential verification, Wi-Fi onboarding, and squad workstation allocation.',
          venue: 'Main Arena Foyer',
        },
        {
          id: 'd1-opening',
          time: '10:00 AM – 11:00 AM',
          title: 'Inauguration & Problem Statement Release',
          description: 'Official track briefing by IEDC CEC, problem domains unlocked, and rubric unveiled.',
          venue: 'APJ Auditorium',
          isHighlight: true,
        },
        {
          id: 'd1-hack-start',
          time: '11:00 AM',
          title: '24-Hour Sprint Commences',
          description: 'Official 24-hour countdown begins. Repositories open and ideation kicks off.',
          venue: 'Central Innovation Labs',
          isHighlight: true,
        },
        {
          id: 'd1-lunch',
          time: '01:30 PM – 02:30 PM',
          title: 'Lunch Break & Strategy Sync',
          description: 'Buffet lunch provided for squads to align technical scope and architecture.',
          venue: 'Campus Dining Hall',
        },
        {
          id: 'd1-mentoring-1',
          time: '03:30 PM – 06:00 PM',
          title: 'Mentorship Checkpoint 01: Concept Fit',
          description: '1-on-1 reviews with industry mentors to evaluate problem-solution fit and viability.',
          venue: 'Mentorship Pods',
          isHighlight: true,
        },
        {
          id: 'd1-dinner',
          time: '08:30 PM – 09:30 PM',
          title: 'Dinner & Midnight Fuel',
          description: 'Hot dinner served. 24/7 tea, coffee, and refreshment counter active through the night.',
          venue: 'Campus Dining Hall',
        },
        {
          id: 'd1-midnight-review',
          time: '11:30 PM – 01:00 AM',
          title: 'Mentorship Checkpoint 02: Code Audit',
          description: 'Technical reviews to test MVP progress, API stability, and hardware breadboards.',
          venue: 'Central Innovation Labs',
          isHighlight: true,
        },
      ],
    },
    {
      dayNumber: 2,
      dayLabel: 'Day 02',
      dateLabel: 'Wednesday, Dec 16',
      theme: 'Final Build & Grand Pitching',
      timeRange: '07:30 AM – 05:00 PM',
      items: [
        {
          id: 'd2-breakfast',
          time: '07:30 AM – 08:30 AM',
          title: 'Breakfast & Pitch Rehearsal',
          description: 'Buffet breakfast and final sprint phase for slide staging and demo dry runs.',
          venue: 'Campus Dining Hall',
        },
        {
          id: 'd2-hack-stop',
          time: '10:30 AM – 11:00 AM',
          title: 'Submission Buffer & Code Freeze',
          description: 'Final code commits and presentation slide deck upload deadline on the portal.',
          venue: 'Central Innovation Labs',
          isHighlight: true,
        },
        {
          id: 'd2-clock-stop',
          time: '11:00 AM',
          title: 'Sprint Clock Stops (24 Hours Complete)',
          description: 'Pencils down! The 24-hour countdown clock concludes. All submissions frozen.',
          venue: 'All Workspaces',
          isHighlight: true,
        },
        {
          id: 'd2-pitching',
          time: '11:30 AM – 02:30 PM',
          title: 'Grand Pitching Arena: Jury Presentations',
          description: '5-minute onstage squad presentations followed by 3-minute jury cross-examination.',
          venue: 'APJ Auditorium',
          isHighlight: true,
        },
        {
          id: 'd2-deliberation',
          time: '02:30 PM – 03:30 PM',
          title: 'Jury Deliberation & High Tea',
          description: 'Score collation across tracks while participants network with guest founders.',
          venue: 'Executive Council Lounge',
        },
        {
          id: 'd2-valedictory',
          time: '03:30 PM – 05:00 PM',
          title: 'Valedictory Ceremony & Incubation Grants',
          description: 'Winner announcements, cash awards, KSUM incubation offers, and closing photo.',
          venue: 'APJ Auditorium',
          isHighlight: true,
        },
      ],
    },
  ],
} as const
