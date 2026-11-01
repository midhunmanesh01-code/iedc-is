export type RegistrationStatus = 'upcoming' | 'open' | 'closed' | 'waitlist'

export interface SocialLink {
  readonly id: string
  readonly label: string
  readonly url: string
  readonly iconName: 'twitter' | 'instagram' | 'linkedin' | 'github' | 'globe' | 'mail'
}

export interface ContactInfo {
  readonly email: string
  readonly phone?: string
  readonly address: string
  readonly locationName: string
  readonly coordinates?: {
    readonly lat: number
    readonly lng: number
  }
}

export interface EventConfig {
  readonly name: string
  readonly acronym: string
  readonly edition: string
  readonly tagLine: string
  readonly organizer: string
  readonly organizerFull: string
  readonly isDateAnnounced: boolean
  /** Target start date in ISO 8601 string or null if unannounced */
  readonly startDate: string | null
  readonly endDate: string | null
  readonly durationHours: number
  readonly venue: string
  readonly registrationStatus: RegistrationStatus
  readonly registrationUrl: string | null
  readonly contact: ContactInfo
  readonly socials: readonly SocialLink[]
}

export interface RegistrationFormData {
  fullName: string
  email: string
  phone: string
  institution: string
  department: string
  yearOfStudy: string
  teamName: string
  teamSize: number
  primaryDomain: string
  ideaSummary?: string
  agreedToRules: boolean
}

export type RegistrationFormErrors = Partial<Record<keyof RegistrationFormData, string>>
