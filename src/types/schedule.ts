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
  readonly title: string
  readonly description: string
  readonly category: ScheduleCategory
  readonly isHighlight?: boolean
  readonly venue?: string
}

export interface ScheduleDay {
  readonly dayNumber: number
  readonly dayLabel: string
  readonly dateLabel: string
  readonly theme: string
  readonly items: readonly ScheduleItem[]
}

export interface ScheduleConfig {
  readonly isScheduleFinalized: boolean
  readonly days: readonly ScheduleDay[]
}
