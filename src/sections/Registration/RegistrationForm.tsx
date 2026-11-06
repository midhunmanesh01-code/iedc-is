import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  ChevronDown,
  Copy,
  Check,
  Scissors,
  CheckCheck,
} from 'lucide-react'
import type { RegistrationFormData, RegistrationFormErrors } from '@/types/event'
import { TearTicket } from '@/components/ui/TearTicket'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { sound } from '@/sections/Interactive/soundEngine'

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

type FormPhase = 'form' | 'synthesizing' | 'ticket'

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<RegistrationFormErrors>({})
  const [phase, setPhase] = useState<FormPhase>('form')
  const [synthesisProgress, setSynthesisProgress] = useState(0)
  const [submittedTeam, setSubmittedTeam] = useState<RegistrationFormData | null>(null)
  const [ticketNumber, setTicketNumber] = useState<string>('')
  const [isTorn, setIsTorn] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 640
  })
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
      newErrors.email = 'Please enter a valid email address.'
    }

    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (!formData.phone.trim() || phoneDigits.length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit WhatsApp number.'
    }

    if (!formData.institution.trim()) {
      newErrors.institution = 'Please enter your college or institution name.'
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Please enter your department or branch.'
    }

    if (!formData.agreedToRules) {
      newErrors.agreedToRules = 'Please accept the event guidelines to continue.'
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

    const randomNum = Math.floor(100000 + Math.random() * 900000).toString()
    setTicketNumber(randomNum)
    setSubmittedTeam({ ...formData })
    setPhase('synthesizing')
    setSynthesisProgress(25)
    sound.playEnter()

    scrollTo('#register', window.innerWidth < 768 ? -40 : -60)

    const timer1 = setTimeout(() => setSynthesisProgress(65), 220)
    const timer2 = setTimeout(() => setSynthesisProgress(95), 500)
    const doneTimer = setTimeout(() => {
      setSynthesisProgress(100)
      setPhase('ticket')
      setIsTorn(false)
      setFormData(INITIAL_FORM_DATA)
      sound.playSuccess()
    }, 800)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(doneTimer)
    }
  }

  const handleTear = () => {
    setIsTorn(true)
  }

  const handleReset = () => {
    setPhase('form')
    setSubmittedTeam(null)
    setErrors({})
    setIsTorn(false)
    setCopied(false)
    setSynthesisProgress(0)
    scrollTo('#register', window.innerWidth < 768 ? -40 : -60)
  }

  const handleCopyReceipt = () => {
    if (!submittedTeam) return

    const receipt = `[IDEA SPRINT 2026 - ADMISSION PASS]
Ticket No:   #${ticketNumber}
Team Name:   ${submittedTeam.teamName}
Team Size:   ${submittedTeam.teamSize} Members
Track:       ${submittedTeam.primaryDomain}
Team Leader: ${submittedTeam.fullName}
Email:       ${submittedTeam.email}
WhatsApp:    ${submittedTeam.phone}
Institution: ${submittedTeam.institution} (${submittedTeam.department}, ${submittedTeam.yearOfStudy})
Status:      Confirmed (Free 24-Hour Pass)
Venue:       College of Engineering Chengannur`

    navigator.clipboard
      .writeText(receipt)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2400)
      })
      .catch(() => {})
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto min-h-[460px]">
      <AnimatePresence mode="wait">
        {phase === 'synthesizing' && (
          <motion.div
            key="synthesizing-loader"
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full bg-[#0a1322] border border-slate-800 rounded-2xl p-8 sm:p-12 shadow-2xl text-center space-y-6 max-w-md mx-auto"
          >
            {/* Clean Minimal Spinner */}
            <div className="w-12 h-12 mx-auto rounded-full border-2 border-slate-800 border-t-amber-400 animate-spin" />

            <div className="space-y-1.5">
              <h3 className="font-sans font-semibold text-xl text-white tracking-tight">
                Generating Admission Pass
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Registering <span className="text-white font-medium">{submittedTeam?.teamName || 'your team'}</span> for Idea Sprint 2026...
              </p>
            </div>

            {/* Clean Progress Bar */}
            <div className="space-y-2 max-w-xs mx-auto">
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-amber-400 rounded-full"
                  animate={{ width: `${synthesisProgress}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {synthesisProgress}%
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'ticket' && submittedTeam && (
          <motion.div
            key="ticket-pass"
            id="ticket-pass"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="region"
            aria-live="polite"
            className="w-full flex flex-col items-center text-center space-y-6"
          >
            {/* Header Badge & Title */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Registration Confirmed</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                Your Team Admission Pass
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                {isTorn ? (
                  <span className="text-emerald-400 font-medium">
                    Ticket claimed! Keep your ticket number ready for check-in at CEC.
                  </span>
                ) : (
                  <span>
                    Drag the ticket stub on the right to claim your check-in pass.
                  </span>
                )}
              </p>
            </div>

            {/* The TearTicket Component */}
            <div className="w-full flex justify-center py-2 sm:py-3 overflow-visible touch-pan-y relative z-10">
              <TearTicket
                width={isMobile ? 480 : 560}
                height={isMobile ? 240 : 250}
                stubSize={isMobile ? 145 : 160}
                radius={14}
                holes={13}
                holeSize={6}
                notch={4}
                background="#0d1424"
                stubBackground="#080e1a"
                color="#ffffff"
                border={true}
                borderColor="rgba(255, 255, 255, 0.12)"
                borderWidth={1}
                rotate={0}
                tilt={true}
                tiltMax={5}
                tiltReach={260}
                onTear={handleTear}
                ariaLabel="Tear off the admission ticket stub"
                stub={
                  /* Ticket Stub */
                  <div className="h-full flex flex-col justify-between p-3.5 sm:p-4 text-left border-l border-white/10 select-none bg-[#080e1a]">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-amber-400 font-semibold tracking-wider block uppercase">
                        ADMIT TEAM
                      </span>
                      <div className="text-sm font-bold text-white tracking-wider font-mono">
                        № {ticketNumber}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        24h Prototyping
                      </div>
                    </div>

                    {/* Barcode Strip */}
                    <div className="py-1 flex flex-col items-center w-full">
                      <div className="flex items-center justify-center gap-[2.5px] h-8 w-full px-1">
                        <div className="w-[3px] h-full bg-white rounded-[1px]" />
                        <div className="w-[1px] h-full bg-white/70" />
                        <div className="w-[4px] h-full bg-white rounded-[1px]" />
                        <div className="w-[1.5px] h-full bg-white/60" />
                        <div className="w-[2px] h-full bg-white" />
                        <div className="w-[5px] h-full bg-white rounded-[1px]" />
                        <div className="w-[1px] h-full bg-white/70" />
                        <div className="w-[3px] h-full bg-white" />
                        <div className="w-[2px] h-full bg-white/60" />
                        <div className="w-[4px] h-full bg-white rounded-[1px]" />
                        <div className="w-[1.5px] h-full bg-white" />
                        <div className="w-[3px] h-full bg-white/80" />
                        <div className="w-[2px] h-full bg-white" />
                      </div>
                      <div className="text-[9px] font-mono text-slate-400 tracking-wider mt-1 text-center">
                        CEC · {ticketNumber}
                      </div>
                    </div>

                    {/* Tear Action Button */}
                    <div className="pt-2 border-t border-white/10">
                      {isTorn ? (
                        <div className="w-full py-1.5 px-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-medium flex items-center justify-center gap-1">
                          <CheckCheck className="w-3.5 h-3.5 shrink-0" />
                          <span>CLAIMED</span>
                        </div>
                      ) : (
                        <div className="w-full py-1.5 px-2 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[10px] font-medium flex items-center justify-center gap-1">
                          <Scissors className="w-3.5 h-3.5 shrink-0" />
                          <span>DRAG TO TEAR</span>
                        </div>
                      )}
                    </div>
                  </div>
                }
              >
                {/* Main Ticket Body */}
                <div className="h-full flex flex-col justify-between p-4 sm:p-5 text-left select-none relative z-10 bg-[#0d1424]">
                  {/* Top Header */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                    <div>
                      <span className="text-[10px] text-amber-400 uppercase font-semibold tracking-wider block">
                        IEDC BOOTCAMP CEC
                      </span>
                      <h4 className="font-display font-bold text-base sm:text-lg text-white tracking-tight">
                        IDEA SPRINT 2026
                      </h4>
                    </div>

                    <div className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">
                      {submittedTeam.teamSize} Members
                    </div>
                  </div>

                  {/* Middle Section: Team Name & Track */}
                  <div className="space-y-1 py-1">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium block">
                      TEAM NAME
                    </span>
                    <div className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight uppercase truncate">
                      {submittedTeam.teamName}
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs text-amber-300/90 font-medium">
                      <span className="text-slate-400">Track:</span>
                      <span className="truncate">{submittedTeam.primaryDomain}</span>
                    </div>
                  </div>

                  {/* Footer Section: Team Lead & Venue */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-medium block">
                        TEAM LEADER
                      </span>
                      <span className="text-slate-200 font-semibold block truncate max-w-[150px] sm:max-w-[170px]">
                        {submittedTeam.fullName}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase text-slate-400 font-medium block">
                        VENUE
                      </span>
                      <span className="text-slate-200 font-semibold block truncate max-w-[150px] sm:max-w-[170px]">
                        CE CHENGANNUR
                      </span>
                    </div>
                  </div>
                </div>
              </TearTicket>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleCopyReceipt}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-white transition-colors cursor-pointer min-h-[40px] flex-1 sm:flex-initial"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied Pass Details</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy Pass Details</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700 bg-transparent hover:bg-white/5 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer min-h-[40px] flex-1 sm:flex-initial"
              >
                <RotateCcw className="w-4 h-4 text-slate-400" />
                <span>Register Another Team</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              A confirmation email has also been sent to{' '}
              <strong className="text-slate-200 font-medium">{submittedTeam.email}</strong>.
            </p>
          </motion.div>
        )}

        {phase === 'form' && (
          <motion.form
            key="registration-form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12, scale: 0.99 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onSubmit={handleSubmit}
            noValidate
            className="w-full bg-[#09111e] border border-slate-800/90 rounded-2xl p-6 sm:p-8 lg:p-9 shadow-xl shadow-black/40 space-y-6 sm:space-y-7 text-left relative"
          >
            {/* Top Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-800/80">
              <div>
                <h3 className="text-lg font-semibold text-white tracking-tight">
                  Team Registration
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Complete the fields below to claim your team admission pass.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 self-start sm:self-auto px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Free Entry · 24h Pass</span>
              </div>
            </div>

            {/* ── SECTION 01: TEAM DETAILS ── */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-800/60">
                Team Details
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Team Name */}
                <div>
                  <label
                    htmlFor="reg-teamName"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Team Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="reg-teamName"
                    name="teamName"
                    type="text"
                    required
                    value={formData.teamName}
                    onChange={handleChange}
                    placeholder="e.g. Apex Pioneers"
                    className={`w-full bg-[#050b14] border text-white text-sm px-3.5 py-2.5 rounded-lg transition-colors placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 ${
                      errors.teamName
                        ? 'border-rose-500/80 bg-rose-500/[0.04]'
                        : 'border-slate-700/80 hover:border-slate-600'
                    }`}
                  />
                  {errors.teamName && (
                    <p className="text-xs text-rose-400 flex items-center gap-1.5 pt-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.teamName}</span>
                    </p>
                  )}
                </div>

                {/* Team Size */}
                <div>
                  <span className="block text-xs font-medium text-slate-300 mb-1.5">
                    Team Size <span className="text-amber-400">*</span>
                  </span>
                  <div className="grid grid-cols-3 gap-1 h-[42px] p-1 bg-[#050b14] rounded-lg border border-slate-700/80">
                    {TEAM_SIZES.map((size) => {
                      const isSelected = formData.teamSize === size
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, teamSize: size }))
                          }}
                          className={`py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {size} Members
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Innovation Track */}
                <div className="min-w-0">
                  <label
                    htmlFor="reg-primaryDomain"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Innovation Track <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative min-w-0 max-w-full">
                    <select
                      id="reg-primaryDomain"
                      name="primaryDomain"
                      value={formData.primaryDomain}
                      onChange={handleChange}
                      className="w-full bg-[#050b14] border border-slate-700/80 text-white text-sm px-3.5 py-2.5 rounded-lg appearance-none transition-colors hover:border-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 cursor-pointer pr-10 truncate"
                    >
                      {TRACKS.map((t) => (
                        <option key={t} value={t} className="bg-[#09111e] text-white">
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Project Idea (Optional) */}
                <div>
                  <label
                    htmlFor="reg-ideaSummary"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Project Idea <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="reg-ideaSummary"
                    name="ideaSummary"
                    type="text"
                    value={formData.ideaSummary}
                    onChange={handleChange}
                    placeholder="e.g. Smart assistive hardware or IoT system"
                    className="w-full bg-[#050b14] border border-slate-700/80 text-white text-sm px-3.5 py-2.5 rounded-lg transition-colors placeholder:text-slate-500 hover:border-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20"
                  />
                </div>
              </div>
            </div>

            {/* ── SECTION 02: TEAM LEADER CONTACT ── */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-800/60">
                Team Leader Contact
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="reg-fullName"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Full Name <span className="text-amber-400">*</span>
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
                    className={`w-full bg-[#050b14] border text-white text-sm px-3.5 py-2.5 rounded-lg transition-colors placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 ${
                      errors.fullName
                        ? 'border-rose-500/80 bg-rose-500/[0.04]'
                        : 'border-slate-700/80 hover:border-slate-600'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-400 flex items-center gap-1.5 pt-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="reg-email"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="reg-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. maya@example.com"
                    className={`w-full bg-[#050b14] border text-white text-sm px-3.5 py-2.5 rounded-lg transition-colors placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 ${
                      errors.email
                        ? 'border-rose-500/80 bg-rose-500/[0.04]'
                        : 'border-slate-700/80 hover:border-slate-600'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-400 flex items-center gap-1.5 pt-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* WhatsApp Phone */}
                <div>
                  <label
                    htmlFor="reg-phone"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    WhatsApp Number <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="reg-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit number"
                    className={`w-full bg-[#050b14] border text-white text-sm px-3.5 py-2.5 rounded-lg transition-colors placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 ${
                      errors.phone
                        ? 'border-rose-500/80 bg-rose-500/[0.04]'
                        : 'border-slate-700/80 hover:border-slate-600'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-400 flex items-center gap-1.5 pt-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── SECTION 03: ACADEMIC DETAILS ── */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-800/60">
                Academic Details
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                {/* College / Institution */}
                <div>
                  <label
                    htmlFor="reg-institution"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    College / Institution <span className="text-amber-400">*</span>
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
                    className={`w-full bg-[#050b14] border text-white text-sm px-3.5 py-2.5 rounded-lg transition-colors placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 ${
                      errors.institution
                        ? 'border-rose-500/80 bg-rose-500/[0.04]'
                        : 'border-slate-700/80 hover:border-slate-600'
                    }`}
                  />
                  {errors.institution && (
                    <p className="text-xs text-rose-400 flex items-center gap-1.5 pt-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.institution}</span>
                    </p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <label
                    htmlFor="reg-department"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Department / Branch <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="reg-department"
                    name="department"
                    type="text"
                    required
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science"
                    className={`w-full bg-[#050b14] border text-white text-sm px-3.5 py-2.5 rounded-lg transition-colors placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 ${
                      errors.department
                        ? 'border-rose-500/80 bg-rose-500/[0.04]'
                        : 'border-slate-700/80 hover:border-slate-600'
                    }`}
                  />
                  {errors.department && (
                    <p className="text-xs text-rose-400 flex items-center gap-1.5 pt-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.department}</span>
                    </p>
                  )}
                </div>

                {/* Year of Study */}
                <div className="min-w-0">
                  <label
                    htmlFor="reg-yearOfStudy"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Year of Study <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative min-w-0 max-w-full">
                    <select
                      id="reg-yearOfStudy"
                      name="yearOfStudy"
                      value={formData.yearOfStudy}
                      onChange={handleChange}
                      className="w-full bg-[#050b14] border border-slate-700/80 text-white text-sm px-3.5 py-2.5 rounded-lg appearance-none transition-colors hover:border-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 cursor-pointer pr-10 truncate"
                    >
                      {YEARS.map((y) => (
                        <option key={y} value={y} className="bg-[#09111e] text-white">
                          {y}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-3 cursor-pointer select-none group">
                <input
                  id="reg-agreedToRules"
                  name="agreedToRules"
                  type="checkbox"
                  checked={formData.agreedToRules}
                  onChange={handleChange}
                  className="w-4 h-4 mt-0.5 rounded border-slate-700 bg-[#050b14] text-amber-400 focus:ring-amber-400/20 focus:ring-offset-0 cursor-pointer shrink-0"
                  style={{ accentColor: '#ffc928' }}
                />
                <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                  I confirm that all team members are enrolled students and agree to the event guidelines and physical on-site participation at College of Engineering Chengannur.
                </span>
              </label>
              {errors.agreedToRules && (
                <p className="mt-2 text-xs text-rose-400 flex items-center gap-1.5 pl-7">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.agreedToRules}</span>
                </p>
              )}
            </div>

            {/* Submit Action Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-slate-800/80">
              <p className="text-xs text-slate-400">
                Your admission ticket pass is generated immediately upon registration.
              </p>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-semibold text-sm transition-colors cursor-pointer shadow-sm shrink-0"
              >
                <span>Register Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default RegistrationForm