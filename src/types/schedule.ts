export interface ScheduleItem {
  readonly id: string
  readonly time: string
  readonly title: string
  readonly description: string
  readonly venue: string
  readonly isHighlight?: boolean
}

export interface ScheduleDay {
  readonly dayNumber: number
  readonly dayLabel: string
  readonly dateLabel: string
  readonly theme: string
  readonly timeRange: string
  readonly items: readonly ScheduleItem[]
}

export interface ScheduleConfig {
  readonly isScheduleFinalized: boolean
  readonly days: readonly ScheduleDay[]
}
