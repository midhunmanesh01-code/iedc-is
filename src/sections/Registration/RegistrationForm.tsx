import React, { useState } from 'react'
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  ChevronDown,
  Copy,
  Check,
  Shield,
} from 'lucide-react'
import type { RegistrationFormData, RegistrationFormErrors } from '@/types/event'
import { Button } from '@/components/common/Button'

const INITIAL_FORM_DATA: RegistrationFormData = {
  fullName: '',
  email: '',
  phone: '',
  institution: '',
  department: '',
  yearOfStudy: '3rd Year',
  teamName: '',
  teamSize: 3,
  primaryDomain: 'AI & Machine Learning',
  ideaSummary: '',
  agreedToRules: false,
}

const TRACKS = [
  'AI & Machine Learning',
  'CleanTech & Energy',
  'Healthcare & Assistive',
  'Fintech & Open Commerce',
  'Open Innovation & Smart Hardware',
] as const

const YEARS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'Postgraduate',
] as const

const TEAM_SIZES = [2, 3, 4] as const

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<RegistrationFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submittedTeam, setSubmittedTeam] = useState<RegistrationFormData | null>(null)
  const [ticketId, setTicketId] = useState<string>('')
  const [copied, setCopied] = useState<boolean>(false)

  const validate = (): boolean => {
    const newErrors: RegistrationFormErrors = {}

    if (!formData.teamName.trim() || formData.teamName.trim().length < 2) {
      newErrors.teamName = 'Please enter a team name (min 2 characters).'
    }

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = "Please enter team leader's full name."
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.'
    }

    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (!formData.phone.trim() || phoneDigits.length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit WhatsApp number.'
    }

    if (!formData.institution.trim()) {
      newErrors.institution = 'Please enter your college / institution name.'
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Please enter your department or branch.'
    }

    if (!formData.agreedToRules) {
      newErrors.agreedToRules = 'Please accept the event guidelines to register.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }))

    if (errors[name as keyof RegistrationFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    // Generate unique serial code
    const randomCode = Math.floor(1000 + Math.random() * 9000)
    const generatedId = `IS26-${randomCode}`

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTicketId(generatedId)
      setSubmittedTeam({ ...formData })
      setFormData(INITIAL_FORM_DATA)
    }, 700)
  }

  const handleReset = () => {
    setIsSuccess(false)
    setSubmittedTeam(null)
    setErrors({})
    setCopied(false)
  }

  const handleCopyReceipt = () => {
    if (!submittedTeam) return

    const text = `[IDEA SPRINT 2026 // SQUAD REGISTRATION PASS]
TICKET REF:  #${ticketId}
TEAM NAME:   ${submittedTeam.teamName}
MEMBERS:     ${submittedTeam.teamSize} Members
TRACK:       ${submittedTeam.primaryDomain}
TEAM LEADER: ${submittedTeam.fullName}
EMAIL:       ${submittedTeam.email}
PHONE:       ${submittedTeam.phone}
COLLEGE:     ${submittedTeam.institution} (${submittedTeam.department})
STATUS:      CONFIRMED // 24-HOUR SPRINT ADMIT
College of Engineering Chengannur // IEDC BOOTCAMP CEC`

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2400)
      })
      .catch(() => {})
  }

  const activeTeamName = isSuccess && submittedTeam ? submittedTeam.teamName : formData.teamName
  const activeLeaderName = isSuccess && submittedTeam ? submittedTeam.fullName : formData.fullName
  const activeTrack = isSuccess && submittedTeam ? submittedTeam.primaryDomain : formData.primaryDomain
  const activeSize = isSuccess && submittedTeam ? submittedTeam.teamSize : formData.teamSize
  const activeCollege = isSuccess && submittedTeam ? submittedTeam.institution : formData.institution

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10 text-left">
      {/* ======================================================== */}
      {/* LEFT COLUMN: THE REGISTRATION FORM                       */}
      {/* ======================================================== */}
      <div className="lg:col-span-7">
        {isSuccess && submittedTeam ? (
          /* Confirmation Success Card */
          <div className="bg-[#071526]/90 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
              <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  Registration Confirmed!
                </h3>
                <p className="text-xs text-emerald-300 mt-0.5">
                  Your team ticket #{ticketId} has been verified and registered.
                </p>
              </div>
            </div>

            <p className="text-sm text-[#b8d4f0] leading-relaxed">
              Congratulations! Team <strong className="text-white">"{submittedTeam.teamName}"</strong> is officially registered for IDEA SPRINT 2026. A detailed confirmation and checklist have been dispatched to <strong className="text-[#ffc928]">{submittedTeam.email}</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopyReceipt}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#59d6e8]/30 bg-[#0f243c] hover:bg-[#163860] text-xs font-medium text-white transition-colors cursor-pointer min-h-[42px]"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#59d6e8]" />
                    <span>Copy Ticket Receipt</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-white/15 bg-[#071322] hover:bg-[#0c1e36] text-xs font-medium text-[#8aacc8] hover:text-white transition-colors cursor-pointer min-h-[42px]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Register Another Squad</span>
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Form */
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-[#071526]/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6"
          >
            {/* Form Header */}
            <div className="border-b border-white/10 pb-4">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                Team Application
              </h3>
              <p className="text-xs text-[#8aacc8] mt-1">
                Enter your squad details below to generate your official event pass.
              </p>
            </div>

            {/* ── Section: Squad Identity ── */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Team Name */}
                <div>
                  <label htmlFor="reg-teamName" className="block text-xs font-semibold text-[#c5ddf5] mb-1.5 uppercase tracking-wide">
                    Team Name *
                  </label>
                  <input
                    id="reg-teamName"
                    name="teamName"
                    type="text"
                    required
                    value={formData.teamName}
                    onChange={handleChange}
                    placeholder="e.g. Apex Pioneers"
                    className={`w-full bg-[#030914] border text-white text-sm px-3.5 py-2.5 rounded-lg transition-colors placeholder:text-[#425d7d] focus:outline-none focus:ring-1 focus:ring-[#ffc928] ${
                      errors.teamName ? 'border-rose-400' : 'border-white/15 hover:border-white/30'
                    }`}
                  />
                  {errors.teamName && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span>{errors.teamName}</span>
                    </p>
                  )}
                </div>

                {/* Team Size Switcher */}
                <div>
                  <label className="block text-xs font-semibold text-[#c5ddf5] mb-1.5 uppercase tracking-wide">
                    Team Size *
                  </label>
                  <div className="flex bg-[#030914] p-1 rounded-lg border border-white/15">
                    {TEAM_SIZES.map((size) => {
                      const isSelected = formData.teamSize === size
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, teamSize: size }))}
                          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#ffc928] text-[#050e1a] shadow-sm'
                              : 'text-[#8aacc8] hover:text-white'
                          }`}
                        >
                          {size} Members
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Innovation Track */}
                <div className="sm:col-span-2">
                  <label htmlFor="reg-primaryDomain" className="block text-xs font-semibold text-[#c5ddf5] mb-1.5 uppercase tracking-wide">
                    Innovation Track *
                  </label>
                  <div className="relative">
                    <select
                      id="reg-primaryDomain"
                      name="primaryDomain"
                      value={formData.primaryDomain}
                      onChange={handleChange}
                      className="w-full bg-[#030914] border border-white/15 text-white text-sm px-3.5 py-2.5 rounded-lg appearance-none transition-colors hover:border-white/30 focus:outline-none focus:ring-1 focus:ring-[#ffc928] cursor-pointer pr-10"
                    >
                      {TRACKS.map((t) => (
                        <option key={t} value={t} className="bg-[#030914] text-white">
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#8aacc8] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle Divider */}
            <div className="border-t border-white/10" />

            {/* ── Section: Team Leader Details ── */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#ffc928]">
                Team Leader Details
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="reg-fullName" className="block text-xs font-medium text-[#b0c8e8] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="reg-fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Maya Chen"
                    className={`w-full bg-[#030914] border text-white text-sm px-3.5 py-2.5 rounded-lg transition-colors placeholder:text-[#425d7d] focus:outline-none focus:ring-1 focus:ring-[#ffc928] ${
                      errors.fullName ? 'border-rose-400' : 'border-white/15 hover:border-white/30'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="reg-email" className="block text-xs font-medium text-[#b0c8e8] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="reg-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. maya@ceconline.edu"
                    className={`w-full bg-[#030914] border text-white text-sm px-3.5 py-2.5 rounded-lg transition-colors placeholder:text-[#425d7d] focus:outline-none focus:ring-1 focus:ring-[#ffc928] ${
                      errors.email ? 'border-rose-400' : 'border-white/15 hover:border-white/30'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* WhatsApp Phone */}
                <div>
                  <label htmlFor="reg-phone" className="block text-xs font-medium text-[#b0c8e8] mb-1.5">
                    WhatsApp Number *
                  </label>
                  <input
                    id="reg-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full bg-[#030914] border text-white text-sm px-3.5 py-2.5 rounded-lg transition-colors placeholder:text-[#425d7d] focus:outline-none focus:ring-1 focus:ring-[#ffc928] ${
                      errors.phone ? 'border-rose-400' : 'border-white/15 hover:border-white/30'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* College / Institution */}
                <div>
                  <label htmlFor="reg-institution" className="block text-xs font-medium text-[#b0c8e8] mb-1.5">
                    College / Institution *
                  </label>
                  <input
                    id="reg-institution"
                    name="institution"
                    type="text"
                    autoComplete="organization"
                    required
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="e.g. CE Chengannur"
                    className={`w-full bg-[#030914] border text-white text-sm px-3.5 py-2.5 rounded-lg transition-colors placeholder:text-[#425d7d] focus:outline-none focus:ring-1 focus:ring-[#ffc928] ${
                      errors.institution ? 'border-rose-400' : 'border-white/15 hover:border-white/30'
                    }`}
                  />
                  {errors.institution && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span>{errors.institution}</span>
                    </p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <label htmlFor="reg-department" className="block text-xs font-medium text-[#b0c8e8] mb-1.5">
                    Department / Branch *
                  </label>
                  <input
                    id="reg-department"
                    name="department"
                    type="text"
                    required
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science"
                    className={`w-full bg-[#030914] border text-white text-sm px-3.5 py-2.5 rounded-lg transition-colors placeholder:text-[#425d7d] focus:outline-none focus:ring-1 focus:ring-[#ffc928] ${
                      errors.department ? 'border-rose-400' : 'border-white/15 hover:border-white/30'
                    }`}
                  />
                  {errors.department && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span>{errors.department}</span>
                    </p>
                  )}
                </div>

                {/* Year of Study */}
                <div>
                  <label htmlFor="reg-yearOfStudy" className="block text-xs font-medium text-[#b0c8e8] mb-1.5">
                    Year of Study *
                  </label>
                  <div className="relative">
                    <select
                      id="reg-yearOfStudy"
                      name="yearOfStudy"
                      value={formData.yearOfStudy}
                      onChange={handleChange}
                      className="w-full bg-[#030914] border border-white/15 text-white text-sm px-3.5 py-2.5 rounded-lg appearance-none transition-colors hover:border-white/30 focus:outline-none focus:ring-1 focus:ring-[#ffc928] cursor-pointer pr-10"
                    >
                      {YEARS.map((y) => (
                        <option key={y} value={y} className="bg-[#030914] text-white">
                          {y}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#8aacc8] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle Divider */}
            <div className="border-t border-white/10" />

            {/* ── Section: Project Concept (Optional) ── */}
            <div>
              <label htmlFor="reg-ideaSummary" className="block text-xs font-medium text-[#b0c8e8] mb-1.5">
                Project Concept or Problem Statement <span className="text-[#59789c]">(Optional)</span>
              </label>
              <textarea
                id="reg-ideaSummary"
                name="ideaSummary"
                rows={2}
                value={formData.ideaSummary}
                onChange={handleChange}
                placeholder="Briefly state what your team aims to prototype during the 24 hours..."
                className="w-full bg-[#030914] border border-white/15 text-white text-sm px-3.5 py-2.5 rounded-lg transition-colors placeholder:text-[#425d7d] hover:border-white/30 focus:outline-none focus:ring-1 focus:ring-[#ffc928] resize-y"
              />
            </div>

            {/* ── Agreement Checkbox ── */}
            <div className="pt-1">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  id="reg-agreedToRules"
                  name="agreedToRules"
                  type="checkbox"
                  checked={formData.agreedToRules}
                  onChange={handleChange}
                  style={{ accentColor: '#ffc928' }}
                  className="w-4 h-4 mt-0.5 rounded-sm bg-[#030914] border border-white/20 focus:ring-1 focus:ring-[#ffc928]"
                />
                <span className="text-xs text-[#9ebad6] leading-relaxed">
                  I confirm that all squad members are active college students and agree to abide by the event code of conduct and physical presence protocol.
                </span>
              </label>
              {errors.agreedToRules && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 pl-7">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.agreedToRules}</span>
                </p>
              )}
            </div>

            {/* ── Submit Action ── */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <span className="text-xs text-[#6e94b8] flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero registration fee · 100% free entry</span>
              </span>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto font-bold justify-center min-h-[46px]"
              >
                Claim Squad Ticket
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* ======================================================== */}
      {/* RIGHT COLUMN: LIVE INTERACTIVE EVENT TICKET PASS         */}
      {/* ======================================================== */}
      <div className="lg:col-span-5 sticky top-24">
        {/* The Digital Squad Pass Card */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#0c233f] via-[#07172c] to-[#040c18] border border-white/15 p-6 sm:p-7 shadow-2xl overflow-hidden transition-all duration-300">
          {/* Subtle Ambient Glow behind Ticket */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#ffc928]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-44 h-44 bg-[#59d6e8]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Ticket Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10 relative z-10">
            <div>
              <span className="font-mono text-[10px] text-[#ffc928] tracking-widest uppercase font-bold block">
                OFFICIAL SQUAD PASS
              </span>
              <h4 className="font-display font-black text-lg text-white tracking-tight">
                IDEA SPRINT 2026
              </h4>
            </div>

            {/* Live Indicator or Verified Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider ${
                isSuccess
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                  : 'bg-[#ffc928]/10 text-[#ffc928] border border-[#ffc928]/30'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isSuccess ? 'bg-emerald-400' : 'bg-[#ffc928] animate-pulse'
                }`}
              />
              {isSuccess ? 'SEAT CONFIRMED' : 'LIVE PREVIEW'}
            </span>
          </div>

          {/* Ticket Body: Dynamic Reactive Data */}
          <div className="py-6 space-y-5 relative z-10">
            {/* Squad Name */}
            <div>
              <span className="text-[10px] font-mono uppercase text-[#6e94b8] tracking-wider block">
                REGISTERED SQUAD
              </span>
              <div className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight break-words mt-0.5 min-h-[36px]">
                {activeTeamName ? activeTeamName : (
                  <span className="text-[#3a5573] italic font-normal text-xl sm:text-2xl">
                    Your Team Name...
                  </span>
                )}
              </div>
            </div>

            {/* Track & Squad Size Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[#59d6e8]/10 border border-[#59d6e8]/30 text-[#59d6e8] text-xs font-mono font-bold">
                {activeTrack}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[#d4e4f5] text-xs font-mono">
                {activeSize} Operatives
              </span>
            </div>

            {/* Leader & Institution Details */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#6e94b8] block">
                  Squad Leader
                </span>
                <span className="text-white font-medium block truncate mt-0.5">
                  {activeLeaderName ? activeLeaderName : <span className="text-[#405c7d]">—</span>}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#6e94b8] block">
                  Campus / College
                </span>
                <span className="text-[#c4daf2] font-medium block truncate mt-0.5">
                  {activeCollege ? activeCollege : <span className="text-[#405c7d]">—</span>}
                </span>
              </div>
            </div>
          </div>

          {/* Ticket Tear Perforation Strip */}
          <div className="relative py-2 -mx-6 sm:-mx-7 flex items-center justify-between">
            {/* Punch-hole cutout left */}
            <div className="w-4 h-6 bg-[#030914] rounded-r-full border-r border-t border-b border-white/15" />
            {/* Dashed perforation line */}
            <div className="flex-1 border-b border-dashed border-white/20 mx-2" />
            {/* Punch-hole cutout right */}
            <div className="w-4 h-6 bg-[#030914] rounded-l-full border-l border-t border-b border-white/15" />
          </div>

          {/* Ticket Footer: Barcode & Venue */}
          <div className="pt-4 flex items-center justify-between relative z-10">
            <div>
              <span className="text-[10px] font-mono text-[#6e94b8] block">
                VENUE & SPRINT
              </span>
              <span className="text-[11px] font-medium text-white block mt-0.5">
                CE CHENGANNUR · 24H
              </span>
            </div>

            {/* Stylized Barcode Graphic */}
            <div className="flex items-center gap-1 opacity-70">
              <span className="w-0.5 h-7 bg-white" />
              <span className="w-1.5 h-7 bg-white" />
              <span className="w-0.5 h-7 bg-white" />
              <span className="w-1 h-7 bg-white" />
              <span className="w-2 h-7 bg-white" />
              <span className="w-0.5 h-7 bg-white" />
              <span className="w-1.5 h-7 bg-white" />
              <span className="w-0.5 h-7 bg-white" />
              <span className="w-1 h-7 bg-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationForm
