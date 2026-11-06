import type { ScheduleConfig } from '@/types/schedule'

/**
 * Technical Blueprint Flight Manifest for IDEA SPRINT 2026
 * 24-Hour Continuous Engineering Sprint
 * IEDC BOOTCAMP CEC • College of Engineering Chengannur
 */
export const SCHEDULE_CONFIG: ScheduleConfig = {
  isScheduleFinalized: false,
  days: [
    {
      dayNumber: 1,
      dayLabel: 'Day 01',
      dateLabel: 'Tuesday, 15 Dec 2026',
      theme: 'Ideation, Architecture & Problem Validation',
      channelLabel: 'CH-01 // 15 DEC',
      timeRange: '09:00 AM → 01:30 AM',
      items: [
        {
          id: 'd1-checkin',
          time: '09:00 AM',
          sprintTime: 'T-02:00',
          trackBadge: 'CHECK-IN',
          title: 'Squad Verification & Workstation Allocation',
          description:
            'Biometric validation, campus ID verification, Wi-Fi credentials issuance, and desk allocation in the main arena.',
          venue: 'Arena Foyer',
          category: 'ceremony',
        },
        {
          id: 'd1-opening',
          time: '10:00 AM',
          sprintTime: 'T-01:00',
          trackBadge: 'KEYNOTE',
          title: 'Inauguration & Problem Statement Release',
          description:
            'Official briefing by IEDC BOOTCAMP CEC mentors. Problem statements, rubric weights, and mentor allocation revealed.',
          venue: 'APJ Auditorium',
          category: 'ceremony',
          isHighlight: true,
        },
        {
          id: 'd1-hack-start',
          time: '11:00 AM',
          sprintTime: 'T+00:00',
          trackBadge: 'SPRINT START',
          title: '24-Hour Sprint Clock Initiated',
          description:
            'The official 24-hour countdown timer begins. Repositories unlocked, problem statements open, and hacking commences.',
          venue: 'Central Innovation Labs',
          category: 'hacking',
          isHighlight: true,
        },
        {
          id: 'd1-lunch',
          time: '01:30 PM',
          sprintTime: 'T+02:30',
          trackBadge: 'FUEL DROP',
          title: 'Squad Lunch & Architecture Sync',
          description:
            'Catered buffet lunch. Squads pause to finalize target personas, user journeys, and technical stack choices.',
          venue: 'Campus Dining Pavilion',
          category: 'break',
        },
        {
          id: 'd1-mentoring-1',
          time: '03:30 PM',
          sprintTime: 'T+04:30',
          trackBadge: 'CHECKPOINT 01',
          title: 'Mentorship Audit: Problem-Solution Fit',
          description:
            'Mandatory 1-on-1 review with industry founders and alumni. Teams validate core pain points and market defensibility.',
          venue: 'Mentorship Pods A & B',
          category: 'mentoring',
          isHighlight: true,
        },
        {
          id: 'd1-dinner',
          time: '08:30 PM',
          sprintTime: 'T+09:30',
          trackBadge: 'FUEL DROP',
          title: 'Dinner & 24/7 Caffeine Counter Armed',
          description:
            'Hot dinner served. Arena unlocks continuous coffee, tea, and energy snack distribution for the overnight build.',
          venue: 'Campus Dining Pavilion',
          category: 'break',
        },
        {
          id: 'd1-midnight-review',
          time: '11:30 PM',
          sprintTime: 'T+12:30',
          trackBadge: 'CHECKPOINT 02',
          title: 'Midnight Technical & Prototype Audit',
          description:
            'Technical architects review code repositories, hardware breadboards, and live API endpoints to sanity-test MVP progress.',
          venue: 'Central Innovation Labs',
          category: 'mentoring',
          isHighlight: true,
        },
      ],
    },
    {
      dayNumber: 2,
      dayLabel: 'Day 02',
      dateLabel: 'Wednesday, 16 Dec 2026',
      theme: 'Code Freeze, Stage Pitches & Incubation Awards',
      channelLabel: 'CH-02 // 16 DEC',
      timeRange: '07:30 AM → 05:00 PM',
      items: [
        {
          id: 'd2-breakfast',
          time: '07:30 AM',
          sprintTime: 'T+20:30',
          trackBadge: 'FUEL DROP',
          title: 'Power Breakfast & Pitch Deck Staging',
          description:
            'Morning buffet served. Final 3-hour polish begins: slide design refinements, demo screencasts, and verbal pitch rehearsal.',
          venue: 'Campus Dining Pavilion',
          category: 'break',
        },
        {
          id: 'd2-hack-stop',
          time: '10:30 AM',
          sprintTime: 'T+23:30',
          trackBadge: 'REPO LOCK',
          title: 'Submission Buffer & Code Lock',
          description:
            'Final submission window. Git commit hashes, demo links, and presentation slide decks must be uploaded to the portal.',
          venue: 'Central Innovation Labs',
          category: 'hacking',
          isHighlight: true,
        },
        {
          id: 'd2-clock-stop',
          time: '11:00 AM',
          sprintTime: 'T+24:00',
          trackBadge: 'SPRINT ZERO',
          title: 'Sprint Clock Stops — 24 Hours Complete',
          description:
            'Pencils down! The 24-hour countdown clock strikes zero. All portal submissions locked. Arena celebrates 24 hours of build.',
          venue: 'All Workspaces',
          category: 'hacking',
          isHighlight: true,
        },
        {
          id: 'd2-pitching',
          time: '11:30 AM',
          sprintTime: 'FINALE',
          trackBadge: 'STAGE PITCH',
          title: 'Grand Pitching Arena: Jury Presentations',
          description:
            'Top squads deliver 5-minute onstage pitches followed by 3-minute jury cross-examination with venture investors and domain leaders.',
          venue: 'APJ Auditorium',
          category: 'pitch',
          isHighlight: true,
        },
        {
          id: 'd2-deliberation',
          time: '02:30 PM',
          sprintTime: 'FINALE',
          trackBadge: 'NETWORKING',
          title: 'Jury Deliberation & Networking High Tea',
          description:
            'Scores tallied across innovation, execution, and viability while squads network with fellow founders and guests.',
          venue: 'Executive Council Lounge',
          category: 'break',
        },
        {
          id: 'd2-valedictory',
          time: '03:30 PM',
          sprintTime: 'AWARDS',
          trackBadge: 'GRAND FINALE',
          title: 'Valedictory Ceremony & Incubation Grants',
          description:
            'Champion announcements, cash awards, KSUM pre-incubation grants, mentor felicitations, and closing address.',
          venue: 'APJ Auditorium',
          category: 'ceremony',
          isHighlight: true,
        },
      ],
    },
  ],
} as const
