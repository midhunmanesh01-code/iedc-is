export type ScheduleCategory =
  | 'ceremony'
  | 'hacking'
  | 'workshop'
  | 'mentoring'
  | 'pitch'
  | 'break'

export interface ScheduleItem {
  readonly id: string
  readonly time: string
  readonly duration?: string
  readonly title: string
  readonly description: string
  readonly category: ScheduleCategory
  readonly isHighlight?: boolean
  readonly venue?: string
  readonly deliverables?: readonly string[]
  readonly requirements?: readonly string[]
  readonly note?: string
}

export interface ScheduleDay {
  readonly dayNumber: number
  readonly dayLabel: string
  readonly dateLabel: string
  readonly theme: string
  readonly phaseBadge?: string
  readonly items: readonly ScheduleItem[]
}

export interface ScheduleConfig {
  readonly isScheduleFinalized: boolean
  readonly days: readonly ScheduleDay[]
}

