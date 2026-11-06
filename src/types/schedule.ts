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
  readonly sprintTime: string // e.g. 'T-02:00', 'T+00:00', 'T+12:30', 'T+24:00', 'FINALE'
  readonly trackBadge: string // e.g. 'CHECK-IN', 'KEYNOTE', 'SPRINT START', 'CHECKPOINT 01'
  readonly title: string
  readonly description: string
  readonly category: ScheduleCategory
  readonly venue?: string
  readonly isHighlight?: boolean
}

export interface ScheduleDay {
  readonly dayNumber: number
  readonly dayLabel: string
  readonly dateLabel: string
  readonly theme: string
  readonly channelLabel: string
  readonly timeRange: string
  readonly items: readonly ScheduleItem[]
}

export interface ScheduleConfig {
  readonly isScheduleFinalized: boolean
  readonly days: readonly ScheduleDay[]
}
