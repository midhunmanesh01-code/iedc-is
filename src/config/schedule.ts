import type { ScheduleConfig } from '@/types/schedule'

/**
 * Schedule Configuration
 * 
 * IMPORTANT: Exact slot times and speakers are provisional placeholders
 * until the timeline is officially ratified.
 */
export const SCHEDULE_CONFIG: ScheduleConfig = {
  isScheduleFinalized: false,
  days: [
    {
      dayNumber: 1,
      dayLabel: 'Day 01',
      dateLabel: 'Date TBA (Morning to Late Night)',
      theme: 'Ideation, Prototyping & Problem Validation',
      items: [
        {
          id: 'd1-checkin',
          time: '09:00 AM - 10:00 AM',
          title: 'Check-in & Team Verification',
          description: 'Participant credential validation, kit distribution, and workstation setup.',
          category: 'ceremony',
          venue: 'Registration Desk & Main Arena',
        },
        {
          id: 'd1-opening',
          time: '10:00 AM - 11:00 AM',
          title: 'Opening Ceremony & Track Briefing',
          description: 'Official inauguration by IEDC BOOTCAMP CEC, problem statement unveiling, and rubric explanation.',
          category: 'ceremony',
          isHighlight: true,
          venue: 'Main Auditorium',
        },
        {
          id: 'd1-hack-start',
          time: '11:00 AM',
          title: 'Sprint Clock Starts (24H Timer)',
          description: 'Official commencement of the 24-hour ideation sprint.',
          category: 'hacking',
          isHighlight: true,
          venue: 'Innovation Workspace',
        },
        {
          id: 'd1-mentoring-1',
          time: '03:00 PM - 05:30 PM',
          title: 'Mentorship Checkpoint 01: Concept Validation',
          description: 'Industry mentors review initial idea scope, viability, target user segment, and technical feasibility.',
          category: 'mentoring',
          venue: 'Mentorship Pods',
        },
        {
          id: 'd1-midnight-review',
          time: '11:30 PM - 01:00 AM',
          title: 'Midnight Pitch Readiness Check',
          description: 'Peer reviews and mentor progress checks to refine pitch narratives before morning.',
          category: 'mentoring',
          venue: 'Innovation Workspace',
        },
      ],
    },
    {
      dayNumber: 2,
      dayLabel: 'Day 02',
      dateLabel: 'Date TBA (Early Morning to Valedictory)',
      theme: 'Pitch Preparation, Jury Evaluation & Awards',
      items: [
        {
          id: 'd2-hack-stop',
          time: '11:00 AM',
          title: 'Sprint Clock Stops & Submission Lock',
          description: 'Final deck and prototype submission deadline. All repositories and presentations locked.',
          category: 'hacking',
          isHighlight: true,
          venue: 'Innovation Workspace',
        },
        {
          id: 'd2-pitching',
          time: '11:30 AM - 02:30 PM',
          title: 'Grand Pitching Arena: Jury Presentations',
          description: 'Teams deliver 5-minute pitches followed by 3-minute jury Q&A sessions.',
          category: 'pitch',
          isHighlight: true,
          venue: 'Main Auditorium',
        },
        {
          id: 'd2-valedictory',
          time: '03:30 PM - 05:00 PM',
          title: 'Valedictory Ceremony & Prize Distribution',
          description: 'Keynote, winner announcements, prize distribution, and closing remarks.',
          category: 'ceremony',
          isHighlight: true,
          venue: 'Main Auditorium',
        },
      ],
    },
  ],
} as const
