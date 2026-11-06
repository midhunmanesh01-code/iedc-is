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
  Sparkles,
} from 'lucide-react'
import type { RegistrationFormData, RegistrationFormErrors } from '@/types/event'
import { Button } from '@/components/common/Button'
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
    setSynthesisProgress(20)
    sound.playEnter()

    // Smoothly scroll the viewport to the top of the registration section so that by the time the ticket is issued,
    // the user is already perfectly positioned with zero scroll jumping.
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

    const receipt = `[IDEA SPRINT 2026 // SQUAD ADMISSION PASS]
TICKET NO:   #${ticketNumber}
TEAM NAME:   ${submittedTeam.teamName}
SQUAD SIZE:  ${submittedTeam.teamSize} Members
TRACK:       ${submittedTeam.primaryDomain}
TEAM LEADER: ${submittedTeam.fullName}
EMAIL:       ${submittedTeam.email}
WHATSAPP:    ${submittedTeam.phone}
COLLEGE:     ${submittedTeam.institution} (${submittedTeam.department} · ${submittedTeam.yearOfStudy})
STATUS:      CONFIRMED // 24-HOUR SPRINT PASS
VENUE:       College of Engineering Chengannur // IEDC BOOTCAMP CEC`

    navigator.clipboard
      .writeText(receipt)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2400)
      })
      .catch(() => {})
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto min-h-[460px]">
      <AnimatePresence mode="wait">
        {phase === 'synthesizing' && (
          <motion.div
            key="synthesizing-loader"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-gradient-to-b from-[#08182b] via-[#051120] to-[#030913] border border-[#59d6e8]/35 rounded-2xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(89,214,232,0.15)] text-center space-y-6 relative overflow-hidden font-mono"
          >
            {/* Cyber Sweep Glare */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,30,49,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
            <div className="absolute -top-12 left-1/4 right-1/4 h-24 bg-[#59d6e8]/10 blur-xl rounded-full pointer-events-none" />

            {/* Radar / Processing Graphic */}
            <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#59d6e8]/30 animate-ping opacity-35" />
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#ffc928]/60 animate-spin-cw-fast" />
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ffc928]/15 border border-[#ffc928] flex items-center justify-center text-[#ffc928] shadow-[0_0_15px_rgba(255,201,40,0.4)]">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            {/* Status Headers */}
            <div className="space-y-1.5 relative z-10">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#ffc928]/10 border border-[#ffc928]/30 text-[#ffc928] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffc928] animate-pulse" />
                <span>SYNTHESIZING PASS</span>
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
                Generating Squad Credentials...
              </h3>
              <p className="text-xs text-[#8aacc8] max-w-sm mx-auto font-sans">
                Assigning verified hardware benches and encoding admit tokens for{' '}
                <strong className="text-white font-mono">{submittedTeam?.teamName || 'your squad'}</strong>.
              </p>
            </div>

            {/* High-Tech Progress Bar */}
            <div className="space-y-2 relative z-10 max-w-md mx-auto">
              <div className="flex items-center justify-between text-[10px] text-[#6e94b8]">
                <span className="flex items-center gap-1.5 text-[#59d6e8]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>REGISTER: 0xCEC26</span>
                </span>
                <span className="text-[#ffc928] font-bold">{synthesisProgress}%</span>
              </div>
              <div className="h-2 w-full bg-[#030914] rounded-full border border-[#59d6e8]/20 p-0.5 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#59d6e8] via-[#ffc928] to-emerald-400 rounded-full shadow-[0_0_8px_rgba(255,201,40,0.6)]"
                  animate={{ width: `${synthesisProgress}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Live Telemetry Chips */}
            <div className="grid grid-cols-2 gap-2 text-left text-[10px] text-[#7e9bb5] bg-[#030914]/80 p-3 rounded-lg border border-[#59d6e8]/15 relative z-10">
              <div>
                <span className="text-zinc-500 block">SQUAD:</span>
                <span className="text-white font-bold truncate block">{submittedTeam?.teamName}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">TRACK:</span>
                <span className="text-[#59d6e8] font-bold truncate block">{submittedTeam?.primaryDomain}</span>
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'ticket' && submittedTeam && (
          <motion.div
            key="ticket-pass"
            id="ticket-pass"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            role="region"
            aria-live="polite"
            className="w-full flex flex-col items-center text-center space-y-6 pt-1"
          >
            {/* Ambient celebration glow */}
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 w-80 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Celebration Header */}
            <div className="space-y-2 relative z-10">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>REGISTRATION CONFIRMED // SQUAD ADMITTED</span>
              </motion.div>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                Here Is Your Squad Pass!
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
                {isTorn ? (
                  <span className="text-emerald-300 font-medium">
                    Stub successfully claimed! Keep your ticket receipt ready for on-site check-in.
                  </span>
                ) : (
                  <span>
                    Grab and drag the stub on the right to tear off your check-in pass.
                  </span>
                )}
              </p>
            </div>

            {/* The React Bits TearTicket Component */}
            <div className="w-full flex justify-center py-2 sm:py-4 overflow-visible touch-pan-y relative z-10">
              <TearTicket
                width={isMobile ? 480 : 560}
                height={isMobile ? 240 : 250}
                stubSize={isMobile ? 145 : 160}
                radius={14}
                holes={13}
                holeSize={6}
                notch={4}
                background="#0d1017"
                stubBackground="#090b0e"
                color="#ffffff"
                border={true}
                borderColor="rgba(255, 255, 255, 0.14)"
                borderWidth={1.5}
                rotate={0}
                tilt={true}
                tiltMax={5}
                tiltReach={260}
                onTear={handleTear}
                ariaLabel="Tear off the squad admit stub"
                stub={
                  /* Tear-off Stub Content */
                  <div className="h-full flex flex-col justify-between p-3.5 sm:p-4 text-left border-l border-white/10 select-none font-mono relative overflow-hidden bg-[#090b0e]">
                    {/* Top: Admit & Ticket Serial */}
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-[#ffc928] tracking-widest font-bold block uppercase">
                        ADMIT SQUAD
                      </span>
                      <div className="text-sm font-black text-white tracking-wider">
                        № {ticketNumber}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-medium tracking-tight">
                        24H PROTOTYPING
                      </div>
                    </div>

                    {/* Middle: Clean Monochrome Barcode Strip */}
                    <div className="py-1 flex flex-col items-center w-full">
                      <div className="flex items-center justify-center gap-[2.5px] h-9 w-full px-1">
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
                      <div className="text-[9px] font-mono text-zinc-500 tracking-widest mt-1 text-center font-bold">
                        CEC · {ticketNumber}
                      </div>
                    </div>

                    {/* Bottom: Tear Indicator Action */}
                    <div className="pt-2 border-t border-white/10">
                      {isTorn ? (
                        <div className="w-full py-1.5 px-2 rounded bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold flex items-center justify-center gap-1">
                          <CheckCheck className="w-3.5 h-3.5 shrink-0" />
                          <span>CLAIMED</span>
                        </div>
                      ) : (
                        <div className="w-full py-1.5 px-2 rounded bg-[#ffc928]/10 border border-[#ffc928]/40 text-[#ffc928] text-[10px] font-mono font-bold flex items-center justify-center gap-1 animate-pulse">
                          <Scissors className="w-3.5 h-3.5 shrink-0" />
                          <span>DRAG TO TEAR</span>
                        </div>
                      )}
                    </div>
                  </div>
                }
              >
                {/* Main Ticket Body Content */}
                <div className="h-full flex flex-col justify-between p-4 sm:p-5 text-left select-none relative z-10 overflow-hidden font-sans bg-[#0d1017]">
                  {/* Subtle blueprint grid overlay */}
                  <div
                    className="absolute inset-0 bg-blueprint-grid opacity-10 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Watermark stamp */}
                  <div
                    className="absolute right-3 bottom-6 text-[44px] font-black font-display text-white/[0.03] select-none pointer-events-none tracking-tighter"
                    aria-hidden="true"
                  >
                    IS26
                  </div>

                  {/* Top Header: Host & Event Title + Crew Badge */}
                  <div className="flex items-center justify-between pb-2 sm:pb-2.5 border-b border-white/10 relative z-10">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-mono text-[#ffc928] uppercase font-bold tracking-widest block">
                        IEDC BOOTCAMP CEC
                      </span>
                      <h4 className="font-display font-black text-base sm:text-lg text-white tracking-tight">
                        IDEA SPRINT 2026
                      </h4>
                    </div>

                    <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-white/5 border border-white/15 text-zinc-300 text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffc928]" />
                      <span>{submittedTeam.teamSize}-CREW SQUAD</span>
                    </div>
                  </div>

                  {/* Middle Section: Team Callsign & Innovation Track */}
                  <div className="space-y-1 sm:space-y-1.5 py-1 relative z-10">
                    <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">
                      OFFICIAL SQUAD CALLSIGN
                    </span>
                    <div className="font-display font-black text-xl sm:text-2xl text-white tracking-tight leading-tight uppercase truncate">
                      {submittedTeam.teamName}
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded bg-[#ffc928]/10 border border-[#ffc928]/30 text-[#ffc928] text-[11px] sm:text-xs font-mono font-semibold max-w-full">
                      <span className="text-[9px] sm:text-[10px] uppercase text-[#ffc928]/70">TRACK //</span>
                      <span className="truncate">{submittedTeam.primaryDomain}</span>
                    </div>
                  </div>

                  {/* Footer Section: Lead Operative & Campus Venue */}
                  <div className="pt-2 sm:pt-2.5 border-t border-white/10 flex items-center justify-between gap-3 relative z-10 text-[11px] sm:text-xs">
                    <div>
                      <span className="text-[8px] sm:text-[9px] font-mono uppercase text-zinc-500 font-semibold block">
                        LEAD OPERATIVE
                      </span>
                      <span className="text-zinc-200 font-bold block truncate max-w-[150px] sm:max-w-[170px]">
                        {submittedTeam.fullName}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] sm:text-[9px] font-mono uppercase text-zinc-500 font-semibold block">
                        CAMPUS VENUE
                      </span>
                      <span className="text-zinc-200 font-bold block truncate max-w-[150px] sm:max-w-[170px]">
                        CEC CHENGANNUR
                      </span>
                    </div>
                  </div>
                </div>
              </TearTicket>
            </div>

            {/* Action Controls */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-2 relative z-10 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleCopyReceipt}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 active:bg-white/15 text-xs font-mono uppercase tracking-wider text-white transition-colors cursor-pointer min-h-[42px] touch-manipulation flex-1 sm:flex-initial"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied Receipt</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-zinc-400" />
                    <span>Copy Ticket Receipt</span>
                  </>
                )}
              </button>

              <Button
                type="button"
                variant="secondary"
                onClick={handleReset}
                leftIcon={
                  <RotateCcw className="w-4 h-4 text-[#59d6e8] transition-all duration-300 ease-out group-hover:-rotate-90 group-hover:text-[#ffc928]" />
                }
                className="group relative overflow-hidden !rounded-full px-5 sm:px-6 py-2.5 sm:py-3 font-mono font-bold text-xs sm:text-sm border border-[#59d6e8]/40 hover:border-[#ffc928] text-white hover:text-[#ffc928] bg-[#163866]/80 hover:bg-[#163866] shadow-[0_0_15px_rgba(89,214,232,0.15)] hover:shadow-[0_0_25px_rgba(255,201,40,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-[#59d6e8]/20 before:to-transparent before:transition-transform before:duration-700 before:ease-out min-h-[42px] touch-manipulation flex-1 sm:flex-initial justify-center"
              >
                <span className="relative z-10 inline-block transition-transform duration-300 group-hover:scale-[1.02]">
                  REGISTER ANOTHER SQUAD
                </span>
              </Button>
            </div>

            <p className="text-[11px] text-zinc-500 font-mono max-w-sm mx-auto relative z-10 px-2">
              A confirmation dispatch has also been sent to{' '}
              <strong className="text-zinc-300">{submittedTeam.email}</strong>.
            </p>
          </motion.div>
        )}

        {phase === 'form' && (
          <motion.form
            key="registration-form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            noValidate
            className="w-full bg-[#061224]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-4 text-left relative overflow-hidden"
          >
      {/* Top subtle highlight gradient */}
      <div
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#59d6e8]/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Row 1: Team Name */}
        <div>
          <label
            htmlFor="reg-teamName"
            className="block text-xs font-medium text-slate-300 mb-1"
          >
            Team Name <span className="text-[#ffc928]">*</span>
          </label>
          <input
            id="reg-teamName"
            name="teamName"
            type="text"
            required
            value={formData.teamName}
            onChange={handleChange}
            placeholder="e.g. Apex Pioneers"
            className={`w-full bg-[#030914] border text-white text-sm px-3 py-2 rounded-lg transition-all placeholder:text-slate-500 focus:outline-none focus:border-white/30 ${
              errors.teamName
                ? 'border-rose-400 bg-rose-500/[0.03]'
                : 'border-white/10 hover:border-white/20'
            }`}
          />
          {errors.teamName && (
            <p className="text-xs text-rose-400 flex items-center gap-1 pt-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.teamName}</span>
            </p>
          )}
        </div>

        {/* Row 1: Squad Size */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Squad Size <span className="text-[#ffc928]">*</span>
          </label>
          <div className="grid grid-cols-3 gap-1 h-[38px] p-0.5 bg-[#030914] rounded-lg border border-white/10">
            {TEAM_SIZES.map((size) => {
              const isSelected = formData.teamSize === size
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, teamSize: size }))
                  }}
                  className={`py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#ffc928] text-[#050e1a] shadow-sm font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {size} Members
                </button>
              )
            })}
          </div>
        </div>

        {/* Row 2: Innovation Track */}
        <div className="min-w-0">
          <label
            htmlFor="reg-primaryDomain"
            className="block text-xs font-medium text-slate-300 mb-1"
          >
            Innovation Track <span className="text-[#ffc928]">*</span>
          </label>
          <div className="relative min-w-0 max-w-full">
            <select
              id="reg-primaryDomain"
              name="primaryDomain"
              value={formData.primaryDomain}
              onChange={handleChange}
              className="w-full min-w-0 max-w-full bg-[#030914] border border-white/10 text-white text-sm px-3 py-2 rounded-lg appearance-none transition-all hover:border-white/20 focus:outline-none focus:border-white/30 cursor-pointer pr-9 truncate"
            >
              {TRACKS.map((t) => (
                <option key={t} value={t} className="bg-[#030914] text-white">
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Row 2: Year of Study */}
        <div className="min-w-0">
          <label
            htmlFor="reg-yearOfStudy"
            className="block text-xs font-medium text-slate-300 mb-1"
          >
            Year of Study <span className="text-[#ffc928]">*</span>
          </label>
          <div className="relative min-w-0 max-w-full">
            <select
              id="reg-yearOfStudy"
              name="yearOfStudy"
              value={formData.yearOfStudy}
              onChange={handleChange}
              className="w-full min-w-0 max-w-full bg-[#030914] border border-white/10 text-white text-sm px-3 py-2 rounded-lg appearance-none transition-all hover:border-white/20 focus:outline-none focus:border-white/30 cursor-pointer pr-9 truncate"
            >
              {YEARS.map((y) => (
                <option key={y} value={y} className="bg-[#030914] text-white">
                  {y}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Row 3: Leader Full Name */}
        <div>
          <label
            htmlFor="reg-fullName"
            className="block text-xs font-medium text-slate-300 mb-1"
          >
            Leader Full Name <span className="text-[#ffc928]">*</span>
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
            className={`w-full bg-[#030914] border text-white text-sm px-3 py-2 rounded-lg transition-all placeholder:text-slate-500 focus:outline-none focus:border-white/30 ${
              errors.fullName
                ? 'border-rose-400 bg-rose-500/[0.03]'
                : 'border-white/10 hover:border-white/20'
            }`}
          />
          {errors.fullName && (
            <p className="text-xs text-rose-400 flex items-center gap-1 pt-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Row 3: Official Email */}
        <div>
          <label
            htmlFor="reg-email"
            className="block text-xs font-medium text-slate-300 mb-1"
          >
            Official Email <span className="text-[#ffc928]">*</span>
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
            className={`w-full bg-[#030914] border text-white text-sm px-3 py-2 rounded-lg transition-all placeholder:text-slate-500 focus:outline-none focus:border-white/30 ${
              errors.email
                ? 'border-rose-400 bg-rose-500/[0.03]'
                : 'border-white/10 hover:border-white/20'
            }`}
          />
          {errors.email && (
            <p className="text-xs text-rose-400 flex items-center gap-1 pt-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Row 4: WhatsApp Number */}
        <div>
          <label
            htmlFor="reg-phone"
            className="block text-xs font-medium text-slate-300 mb-1"
          >
            WhatsApp Number <span className="text-[#ffc928]">*</span>
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
            className={`w-full bg-[#030914] border text-white text-sm px-3 py-2 rounded-lg transition-all placeholder:text-slate-500 focus:outline-none focus:border-white/30 ${
              errors.phone
                ? 'border-rose-400 bg-rose-500/[0.03]'
                : 'border-white/10 hover:border-white/20'
            }`}
          />
          {errors.phone && (
            <p className="text-xs text-rose-400 flex items-center gap-1 pt-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* Row 4: College / Institution */}
        <div>
          <label
            htmlFor="reg-institution"
            className="block text-xs font-medium text-slate-300 mb-1"
          >
            College / Campus <span className="text-[#ffc928]">*</span>
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
            className={`w-full bg-[#030914] border text-white text-sm px-3 py-2 rounded-lg transition-all placeholder:text-slate-500 focus:outline-none focus:border-white/30 ${
              errors.institution
                ? 'border-rose-400 bg-rose-500/[0.03]'
                : 'border-white/10 hover:border-white/20'
            }`}
          />
          {errors.institution && (
            <p className="text-xs text-rose-400 flex items-center gap-1 pt-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.institution}</span>
            </p>
          )}
        </div>

        {/* Row 5: Department */}
        <div>
          <label
            htmlFor="reg-department"
            className="block text-xs font-medium text-slate-300 mb-1"
          >
            Department / Branch <span className="text-[#ffc928]">*</span>
          </label>
          <input
            id="reg-department"
            name="department"
            type="text"
            required
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g. Computer Science"
            className={`w-full bg-[#030914] border text-white text-sm px-3 py-2 rounded-lg transition-all placeholder:text-slate-500 focus:outline-none focus:border-white/30 ${
              errors.department
                ? 'border-rose-400 bg-rose-500/[0.03]'
                : 'border-white/10 hover:border-white/20'
            }`}
          />
          {errors.department && (
            <p className="text-xs text-rose-400 flex items-center gap-1 pt-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.department}</span>
            </p>
          )}
        </div>

        {/* Row 5: Project Idea (Optional) */}
        <div>
          <label
            htmlFor="reg-ideaSummary"
            className="block text-xs font-medium text-slate-300 mb-1"
          >
            Project Idea <span className="text-slate-500 font-normal">(Optional)</span>
          </label>
          <input
            id="reg-ideaSummary"
            name="ideaSummary"
            type="text"
            value={formData.ideaSummary}
            onChange={handleChange}
            placeholder="e.g. AI drone or assistive device"
            className="w-full bg-[#030914] border border-white/10 text-white text-sm px-3 py-2 rounded-lg transition-all placeholder:text-slate-500 hover:border-white/20 focus:outline-none focus:border-white/30"
          />
        </div>
      </div>

      {/* Agreement Checkbox */}
      <div className="pt-1">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            id="reg-agreedToRules"
            name="agreedToRules"
            type="checkbox"
            checked={formData.agreedToRules}
            onChange={handleChange}
            style={{ accentColor: '#ffc928' }}
            className="w-4 h-4 rounded bg-[#030914] border border-white/20 cursor-pointer shrink-0"
          />
          <span className="text-xs text-slate-300">
            We are enrolled students and agree to sprint rules and physical attendance at CEC.
          </span>
        </label>
        {errors.agreedToRules && (
          <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 pl-6">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.agreedToRules}</span>
          </p>
        )}
      </div>

      {/* Submit Action Bar */}
      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-white/[0.08]">
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Free entry · Instant digital ticket</span>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="font-bold min-h-[42px] px-6 shadow-lg shadow-[#ffc928]/10 cursor-pointer justify-center"
        >
          Generate Squad Ticket
        </Button>
      </div>
    </motion.form>
  )}
      </AnimatePresence>
    </div>
  )
}

export default RegistrationForm
