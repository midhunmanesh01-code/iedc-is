import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import {
  Terminal as TerminalIcon,
  Copy,
  Check,
  RotateCcw,
  ArrowRight,
  Shuffle,
  Volume2,
  VolumeX,
  CornerDownLeft,
  ShieldAlert,
  Zap,
} from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/common/Button'
import { sound } from './soundEngine'

// ── 3-Stage Tactical Sprint Compiler ────────────────────────────────────────

interface TerminalOption {
  readonly key: string
  readonly label: string
  readonly flag: string
  readonly desc: string
  readonly telemetry: string
}

interface TerminalStage {
  readonly phase: string
  readonly shortName: string
  readonly cmd: string
  readonly prompt: string
  readonly options: readonly TerminalOption[]
}

const TERMINAL_STAGES: readonly TerminalStage[] = [
  {
    phase: 'STAGE 01 // STACK',
    shortName: 'ENGINE',
    cmd: 'select --build-engine',
    prompt: 'STEP 01/03: Choose your squad\'s technical engine',
    options: [
      {
        key: '1',
        label: 'Embedded Hardware & RF Mesh',
        flag: '--stack=embedded-lora',
        desc: 'Microcontrollers, analog sensor probes & 868MHz local RF mesh.',
        telemetry: 'PWR: 22mA · 8KM MESH',
      },
      {
        key: '2',
        label: 'Edge TinyML & Neural Vision',
        flag: '--stack=edge-tinyml',
        desc: 'Quantized on-device neural inference with zero cloud roundtrip.',
        telemetry: 'LATENCY: 38ms · ZERO CLOUD',
      },
      {
        key: '3',
        label: 'Offline Cryptographic PWA',
        flag: '--stack=offline-pwa',
        desc: 'Local IndexedDB caching & Web NFC peer-to-peer token ledger.',
        telemetry: 'CRYPTO: Ed25519 · ₹0 BOM',
      },
    ],
  },
  {
    phase: 'STAGE 02 // CONTINGENCY',
    shortName: 'CRISIS',
    cmd: 'inject --event "03:00_AM_CRISIS"',
    prompt: 'STEP 02/03: Campus Wi-Fi drops at 03:00 AM. Select fallback',
    options: [
      {
        key: '1',
        label: 'Peer-to-Peer LoRa Mesh Beacon',
        flag: '--protocol=mesh-rf',
        desc: 'Bypasses cellular; hops emergency packets over 868MHz nodes.',
        telemetry: 'FAILOVER: 180ms · 99% RESIL',
      },
      {
        key: '2',
        label: 'Cryptographic Offline Tokens',
        flag: '--protocol=crypto-hash',
        desc: 'Locally signed ledger hashes with zero-knowledge sync.',
        telemetry: 'DATA LOSS: 0% · IMMUTABLE',
      },
      {
        key: '3',
        label: 'Hardware GPIO Siren Relay',
        flag: '--protocol=analog-trip',
        desc: 'Analog threshold triggers opto-isolated relay & audio buzzer.',
        telemetry: 'TRIP SPEED: 12ms · 10A TRIP',
      },
    ],
  },
  {
    phase: 'STAGE 03 // CONSTRAINT',
    shortName: 'TARGET',
    cmd: 'calibrate --sprint-constraint',
    prompt: 'STEP 03/03: Select jury stress-test constraint',
    options: [
      {
        key: '1',
        label: 'Sub-₹1200 Hardware BOM',
        flag: '--target=low-cost',
        desc: 'Extreme cost democratization using commodity off-the-shelf parts.',
        telemetry: 'BOM: <₹1200 · DEMOCRATIZED',
      },
      {
        key: '2',
        label: 'Zero-Battery Micro-Harvesting',
        flag: '--target=micro-harvest',
        desc: 'Self-powers via ambient micro-solar/piezo with sleep <15µA.',
        telemetry: 'AUTONOMOUS: 6+ MO · ZERO CHARGE',
      },
      {
        key: '3',
        label: 'Deterministic Sub-50ms Latency',
        flag: '--target=sub-50ms',
        desc: 'Deterministic hard-real-time responses for critical triage or safety.',
        telemetry: 'EDGE DELTA: <40ms · 100% REALTIME',
      },
    ],
  },
]

interface CompiledBlueprint {
  readonly codename: string
  readonly track: string
  readonly title: string
  readonly mission: string
  readonly mvp: string
  readonly stack: readonly string[]
  readonly stats: { readonly label: string; readonly val: string }[]
  readonly crisisResolution: string
}

const BLUEPRINT_RESULTS: Record<string, CompiledBlueprint> = {
  '1-1-1': {
    codename: 'OP: CRYOCACHE-868',
    track: 'CLEAN ENERGY // OFFLINE SENSORS',
    title: 'Solar Cold-Chain Guardian',
    mission: 'Preventing rural clinic vaccine spoilage with decentralized LoRa temperature telemetry.',
    mvp: 'Dual breadboard sensor nodes broadcasting live temperatures over LoRa to an offline dashboard with breach alert.',
    stack: ['ESP32-C3', 'DS18B20 Temp Probe', 'SX1262 LoRa 868MHz', 'SQLite Edge'],
    stats: [
      { label: 'Rigor', val: '96%' },
      { label: 'Resilience', val: '99%' },
      { label: 'BOM Target', val: '<₹1200' },
      { label: 'Jury Impact', val: '98%' },
    ],
    crisisResolution: '03:14 AM — PHC generator fails. ESP32 wakes from sleep and beacons emergency thermal breach over 868MHz in 2.1s.',
  },
  '1-1-2': {
    codename: 'OP: HYDRO-GRID',
    track: 'CIVIC RESILIENCE // FLOOD SENSORS',
    title: 'River Basin Flash-Flood Telemetry Link',
    mission: 'Bridge-mounted ultrasonic rangefinder nodes warning downstream panchayats autonomously.',
    mvp: 'Ultrasonic sensor triggering a simulated village alarm when water level crosses threshold distance.',
    stack: ['JSN-SR04T Waterproof', 'ATmega328P', 'Ebyte LoRa 1W', 'Siren Relay'],
    stats: [
      { label: 'Impact', val: '98%' },
      { label: 'Auto-Run', val: '6+ Mo' },
      { label: 'BOM Target', val: '<₹1500' },
      { label: 'Jury Impact', val: '99%' },
    ],
    crisisResolution: '02:58 AM — Cloudburst detected. Node hops emergency siren beacon downstream 11.2km away in 340ms.',
  },
  '1-2-1': {
    codename: 'OP: SILOCURE-FFT',
    track: 'AGRITECH // BIO-ACOUSTICS',
    title: 'Sub-₹500 Grain Infestation Sensor',
    mission: 'Piezo contact microphone detecting insect larvae vibrations inside silos before spoilage begins.',
    mvp: 'Piezo sensor picking up mock grain scratching with live FFT spike detection displayed on an offline web UI.',
    stack: ['Piezo Contact Disc', 'LM358 OpAmp', 'ESP32 ADC', 'FFT Binning'],
    stats: [
      { label: 'Democracy', val: '99%' },
      { label: 'Warning', val: '7 Days' },
      { label: 'BOM Target', val: '<₹500' },
      { label: 'Jury Impact', val: '97%' },
    ],
    crisisResolution: '03:22 AM — Heavy monsoon rain rejected by 1.2kHz bandpass filter; 64-bin FFT isolates larval clicks.',
  },
  '2-3-3': {
    codename: 'OP: PULSENET-S3',
    track: 'HEALTHTECH // ON-DEVICE TINYML',
    title: 'Deterministic Cardiac Valve Classifier',
    mission: 'Sub-50ms acoustic murmur detection turning standard stethoscopes into triage tools.',
    mvp: 'On-device 1D-CNN running on ESP32-S3 lighting a triage indicator for normal vs abnormal valve audio.',
    stack: ['ESP32-S3', 'INMP441 MEMS Mic', 'TFLite Micro', 'Edge Impulse'],
    stats: [
      { label: 'Latency', val: '38ms' },
      { label: 'Accuracy', val: '94%' },
      { label: 'Cloud Roundtrip', val: '0ms' },
      { label: 'Jury Impact', val: '99%' },
    ],
    crisisResolution: '03:05 AM — Cellular towers blackout. Full neural inference executes in on-chip SRAM with zero cloud roundtrip.',
  },
  '2-1-3': {
    codename: 'OP: SPECTER-GUARD',
    track: 'EDGE AI // MACHINE SAFETY',
    title: 'Optical Workshop Safety Interlock',
    mission: 'Computer vision sentinel that hardware-cuts machinery relays before human hands reach blades.',
    mvp: 'Webcam feed simulating machine emergency brake trip whenever hands cross a virtual danger perimeter.',
    stack: ['Grove Vision AI v2', 'YOLOv8-nano INT8', 'Opto-Relay 10A', 'WebRTC'],
    stats: [
      { label: 'Latency', val: '41ms' },
      { label: 'Coverage', val: '100%' },
      { label: 'False Positives', val: '<1%' },
      { label: 'Jury Impact', val: '96%' },
    ],
    crisisResolution: '02:50 AM — Maker stock slips toward blade; on-chip INT8 model trips hardware contactor in 41ms.',
  },
  '3-2-1': {
    codename: 'OP: VOUCHER-MESH',
    track: 'FINTECH // TRUSTLESS COMMERCE',
    title: 'Zero-Connectivity Voucher Exchange',
    mission: 'Cryptographic airplane-mode token transfers operating during floods and cellular blackouts.',
    mvp: 'Two phones in Airplane Mode trading digital vouchers over QR/NFC with local signature verification.',
    stack: ['Web NFC API', 'Ed25519 Crypto', 'IndexedDB Storage', 'Next.js PWA'],
    stats: [
      { label: 'Network Need', val: '0%' },
      { label: 'Security', val: 'Ed25519' },
      { label: 'Hardware Cost', val: '₹0' },
      { label: 'Jury Impact', val: '95%' },
    ],
    crisisResolution: '03:12 AM — UPI gateways down. Asymmetric Ed25519 token verified and logged in IndexedDB vault in 80ms.',
  },
}

function getBlueprint(choices: readonly string[]): CompiledBlueprint {
  const key = choices.join('-')
  if (BLUEPRINT_RESULTS[key]) return BLUEPRINT_RESULTS[key]

  const p = choices[0] || '1'
  if (p === '2') return BLUEPRINT_RESULTS['2-3-3']
  if (p === '3') return BLUEPRINT_RESULTS['3-2-1']
  return BLUEPRINT_RESULTS['1-1-1']
}

export const IdeaForge: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  // Triggers strictly when user scrolls into the Idea Forge section (15% in view)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  // Detect when full-screen preloader has completed and unmounted
  const [isPreloaderGone, setIsPreloaderGone] = useState<boolean>(() => {
    if (typeof document === 'undefined') return true
    return document.querySelector('[role="status"]') === null
  })

  useEffect(() => {
    if (isPreloaderGone) return

    const poll = setInterval(() => {
      if (document.querySelector('[role="status"]') === null) {
        setIsPreloaderGone(true)
      }
    }, 100)

    const fallback = setTimeout(() => {
      setIsPreloaderGone(true)
    }, 2800)

    return () => {
      clearInterval(poll)
      clearTimeout(fallback)
    }
  }, [isPreloaderGone])

  // Gated: ONLY starts when user arrives at Idea Forge AND preloader is clear
  const canAnimate = isInView && isPreloaderGone
  const hasBootedRef = useRef(false)
  const terminalPanelRef = useRef<HTMLDivElement>(null)

  const [stepIndex, setStepIndex] = useState<number>(0)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [isDone, setIsDone] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(sound.muted)
  const [stressSimulated, setStressSimulated] = useState<boolean>(false)

  // Smooth mobile viewport adaptation: keeps active prompt / result perfectly in view
  const adaptMobileViewport = useCallback((offset = 68) => {
    if (typeof window === 'undefined' || window.innerWidth >= 768) return

    requestAnimationFrame(() => {
      if (!terminalPanelRef.current) return
      const rect = terminalPanelRef.current.getBoundingClientRect()
      const targetScrollY = window.scrollY + rect.top - offset

      // If top of terminal is noticeably displaced from viewport top under navbar
      if (Math.abs(rect.top - offset) > 16) {
        window.scrollTo({
          top: Math.max(0, targetScrollY),
          behavior: 'smooth',
        })
      }
    })
  }, [])

  // Typing effect state for terminal command execution
  const [typedCmd, setTypedCmd] = useState<string>('')
  const [isTyping, setIsTyping] = useState<boolean>(true)

  const activeStage = TERMINAL_STAGES[stepIndex]

  // Play terminal boot sound ONLY when user arrives at Idea Forge
  useEffect(() => {
    if (canAnimate && !hasBootedRef.current) {
      hasBootedRef.current = true
      sound.playBoot()
    }
  }, [canAnimate])

  // Terminal Natural Human Typing Animation Effect on step transition
  useEffect(() => {
    if (!canAnimate || isDone || !activeStage) return

    const target = activeStage.cmd
    let charIdx = 0
    let timeoutId: ReturnType<typeof setTimeout>

    const typeNextChar = () => {
      charIdx++
      setTypedCmd(target.slice(0, charIdx))
      sound.playKeyClack()

      if (charIdx < target.length) {
        // Natural typing rhythm: slightly longer pause on spaces and dashes
        const nextChar = target[charIdx]
        const delay =
          nextChar === ' ' ? 110 : nextChar === '-' ? 85 : 65 + (Math.random() * 18 - 9)
        timeoutId = setTimeout(typeNextChar, delay)
      } else {
        // Natural beat before pressing Enter
        timeoutId = setTimeout(() => {
          setIsTyping(false)
          sound.playEnter()
        }, 220)
      }
    }

    // Brief initial hesitation before starting to type
    timeoutId = setTimeout(typeNextChar, 140)

    return () => clearTimeout(timeoutId)
  }, [canAnimate, stepIndex, isDone, activeStage])

  // Handle choice selection: updates state immediately and adapts mobile view
  const handleSelectOption = useCallback(
    (opt: TerminalOption) => {
      sound.playEnter()
      const nextKeys = [...selectedKeys.slice(0, stepIndex), opt.key]
      setSelectedKeys(nextKeys)

      if (stepIndex + 1 < TERMINAL_STAGES.length) {
        setTypedCmd('')
        setIsTyping(true)
        setStepIndex((prev) => prev + 1)
      } else {
        setIsDone(true)
        sound.playSuccess()
      }

      adaptMobileViewport()
    },
    [selectedKeys, stepIndex, adaptMobileViewport]
  )

  // Jump to specific step from pipeline stepper
  const handleJumpToStep = (idx: number) => {
    sound.playKeyClack()
    setTypedCmd('')
    setIsTyping(true)
    setStepIndex(idx)
    setIsDone(false)
    adaptMobileViewport()
  }

  // Handle Reset
  const handleReset = () => {
    sound.playKeyClack()
    setTypedCmd('')
    setIsTyping(true)
    setStepIndex(0)
    setSelectedKeys([])
    setIsDone(false)
    setCopied(false)
    setStressSimulated(false)
    adaptMobileViewport()
  }

  // Handle Instant Auto-Roll
  const handleInstantRoll = () => {
    sound.playEnter()
    const randomChoices = TERMINAL_STAGES.map((s) =>
      String(Math.floor(Math.random() * s.options.length) + 1)
    )
    setSelectedKeys(randomChoices)
    setStepIndex(2)
    setIsDone(true)
    sound.playSuccess()
    adaptMobileViewport()
  }

  // Trigger 03:00 AM Stress Test
  const handleSimulateStress = () => {
    sound.playAlarm()
    setStressSimulated(true)
    setTimeout(() => {
      sound.playSuccess()
    }, 1400)
  }

  // Keyboard navigation: 1, 2, 3 to select, R to reset, M to mute
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return

      if (e.key.toLowerCase() === 'r') {
        handleReset()
        return
      }

      if (e.key.toLowerCase() === 'm') {
        const nextM = sound.toggleMute()
        setIsMuted(nextM)
        return
      }

      if (!isDone && activeStage) {
        if (isTyping && (e.code === 'Space' || e.key === 'Enter')) {
          setIsTyping(false)
          setTypedCmd(activeStage.cmd)
          return
        }

        const matching = activeStage.options.find((o) => o.key === e.key)
        if (matching) {
          setIsTyping(false)
          setTypedCmd(activeStage.cmd)
          handleSelectOption(matching)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [stepIndex, isDone, activeStage, isTyping, handleSelectOption])

  const result = getBlueprint(selectedKeys)

  // Copy to clipboard
  const handleCopy = () => {
    sound.playEnter()
    const text = `[IEDC BOOTCAMP CEC // IDEA SPRINT 2026 // SPECIFICATION]
CODENAME:    ${result.codename}
TRACK:       ${result.track}
TITLE:       ${result.title}
MISSION:     ${result.mission}
MVP TARGET:  ${result.mvp}
STACK:       ${result.stack.join(' • ')}
FAILOVER:    ${result.crisisResolution}
Compiled at IEDC IDEA FORGE // Verified for 24H Sprint Build`

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2400)
      })
      .catch(() => {})
  }

  return (
    <section
      ref={sectionRef}
      id="idea-forge"
      aria-label="Idea Forge Terminal"
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden border-b border-[#59d6e8]/15 bg-[#050e1a]"
    >
      {/* Background blueprint subtle scanlines */}
      <div
        className="absolute inset-0 bg-blueprint-grid opacity-25 pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default">
        {/* ======================================================== */}
        {/* SECTION HEADING & QUICK CONTROLS                         */}
        {/* ======================================================== */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <SectionHeading
            tag="TACTICAL TERMINAL"
            title="The Idea Forge"
            subtitle="The 24-hour sprint compiler. Pass tactical parameters via interactive CLI or tap command lines to synthesize your squad's verified engineering blueprint."
            className="mb-0 max-w-2xl"
          />

          {/* Quick Toolbar */}
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto font-mono text-xs">
            {/* Audio Mute/Unmute */}
            <button
              type="button"
              onClick={() => {
                const nextM = sound.toggleMute()
                setIsMuted(nextM)
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xs border border-[#59d6e8]/25 hover:border-[#ffc928] bg-[#091829] text-[#8aacc8] hover:text-white transition-colors cursor-pointer min-h-[42px]"
              title={isMuted ? 'Unmute terminal clacks (Key: M)' : 'Mute terminal clacks (Key: M)'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden sm:inline text-rose-300">SFX OFF</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#ffc928]" />
                  <span className="hidden sm:inline text-[#ffc928]">SFX ON</span>
                </>
              )}
            </button>

            {/* Auto Roll */}
            <button
              type="button"
              onClick={handleInstantRoll}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xs border border-[#ffc928]/40 hover:border-[#ffc928] bg-[#ffc928]/10 hover:bg-[#ffc928]/20 text-[#ffc928] font-bold tracking-wider uppercase transition-colors cursor-pointer min-h-[42px]"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Auto Roll [🎲]</span>
            </button>

            {/* Reset */}
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xs border border-[#59d6e8]/25 hover:border-[#59d6e8]/60 text-[#8aacc8] hover:text-white transition-colors cursor-pointer min-h-[42px]"
              title="Reset terminal (Press 'r')"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset [R]</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ADAPTIVE TACTICAL TERMINAL PANEL                         */}
        {/* ======================================================== */}
        <div
          ref={terminalPanelRef}
          className="relative z-10 border border-[#59d6e8]/30 rounded-xs bg-[#040b14]/98 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm text-[#d4e4f5]"
        >
          {/* Subtle CRT Phosphor Scanline Overlay */}
          <div
            className="absolute inset-0 bg-[linear-gradient(rgba(18,30,49,0)_50%,rgba(0,0,0,0.32)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40 z-20"
            aria-hidden="true"
          />

          {/* Terminal Titlebar */}
          <div className="relative z-30 bg-[#081524] border-b border-[#59d6e8]/20 px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between select-none">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <TerminalIcon className="w-3.5 h-3.5 text-[#ffc928] shrink-0" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-bold text-[#8aacc8] tracking-wider uppercase truncate">
                guest@iedc-is26:~ / idea-forge-shell
              </span>
            </div>

            {/* Stage indicator */}
            <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] shrink-0">
              <span className="text-[#6e94b8] hidden sm:inline">
                STATUS: {isDone ? 'COMPILED' : `STEP 0${stepIndex + 1}/03`}
              </span>
              <span className="text-emerald-400 font-bold">READY</span>
            </div>
          </div>

          {/* Terminal Interactive Stepper Breadcrumb Header */}
          <div className="relative z-20 px-3 sm:px-7 py-2 sm:py-2.5 bg-[#061220] border-b border-[#59d6e8]/15 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none touch-pan-x select-none">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
              <span className="text-[#6e94b8] text-[9px] sm:text-[10px] uppercase font-bold tracking-wider shrink-0">
                PIPELINE:
              </span>
              {TERMINAL_STAGES.map((stg, idx) => {
                const isCompleted = idx < selectedKeys.length
                const isCurrent = idx === stepIndex && !isDone
                const selKey = selectedKeys[idx]
                const selOpt = selKey ? stg.options.find((o) => o.key === selKey) : null

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleJumpToStep(idx)}
                    className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-xs border text-[10px] sm:text-[11px] transition-all cursor-pointer shrink-0 touch-manipulation min-h-[30px] sm:min-h-0 ${
                      isCurrent
                        ? 'border-[#ffc928] bg-[#ffc928]/15 text-[#ffc928] font-bold'
                        : isCompleted
                        ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:border-emerald-400'
                        : 'border-[#59d6e8]/15 text-[#6e94b8] opacity-60'
                    }`}
                  >
                    <span className="text-[9px] sm:text-[10px]">0{idx + 1}</span>
                    <span>{selOpt ? selOpt.label.split(' ')[0] : stg.shortName}</span>
                    {isCompleted && <Check className="w-3 h-3 text-emerald-400" />}
                  </button>
                )
              })}
            </div>

            {isDone && (
              <button
                type="button"
                onClick={() => handleJumpToStep(0)}
                className="text-[10px] text-[#ffc928] hover:underline uppercase shrink-0 font-bold touch-manipulation"
              >
                [Edit Options]
              </button>
            )}
          </div>

          {/* Terminal Body: Adaptive Height (Zero Scroll Jumping!) */}
          <div className="relative z-10 p-3.5 sm:p-7 space-y-3.5 sm:space-y-4">
            <AnimatePresence mode="wait">
              {!isDone && activeStage ? (
                /* ── STEP SELECTION VIEW ── */
                <motion.div
                  key={stepIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  {/* Terminal Prompt Line with Realistic Typing Effect */}
                  <div className="space-y-1.5 select-none" onClick={() => setIsTyping(false)}>
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <span className="text-[#59d6e8] font-bold">guest@iedc-is26:~$</span>
                      <span className="text-[#ffc928] font-bold tracking-wide">
                        {typedCmd}
                      </span>
                      <span
                        className={`inline-block w-2 h-4 bg-[#ffc928] ${
                          isTyping ? 'opacity-100' : 'animate-pulse'
                        }`}
                      />
                    </div>

                    {/* Subtitle Prompt - emerges after command finishes typing */}
                    <AnimatePresence>
                      {!isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.16 }}
                          className="text-[#8aacc8] text-xs pl-4 font-semibold"
                        >
                          {activeStage.prompt}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* 3 Modular Terminal Boxes (Appear strictly after typing completes) */}
                  <AnimatePresence>
                    {!isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="space-y-3"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
                          {activeStage.options.map((opt) => (
                            <motion.button
                              key={opt.key}
                              type="button"
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleSelectOption(opt)}
                              className="group relative flex flex-col justify-between text-left p-3.5 sm:p-4 rounded-xs border border-[#59d6e8]/25 hover:border-[#ffc928] bg-[#071829]/70 hover:bg-[#0c243f] active:bg-[#0c243f] transition-all duration-150 cursor-pointer min-h-[124px] sm:min-h-[142px] focus:outline-none focus:ring-1 focus:ring-[#ffc928] touch-manipulation"
                            >
                              {/* Top Corner Technical Accent Crosshair */}
                              <span className="absolute top-1.5 right-1.5 font-mono text-[10px] text-[#59d6e8]/40 group-hover:text-[#ffc928] transition-colors pointer-events-none select-none">
                                +
                              </span>

                              {/* Top Header Strip: Key Badge + Flag */}
                              <div className="space-y-2">
                                <div className="flex items-center justify-between pb-2 border-b border-[#59d6e8]/15 select-none">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:bg-[#ffc928] transition-colors" />
                                    <span className="font-mono text-[11px] font-bold text-[#ffc928] tracking-wider uppercase">
                                      [KEY {opt.key}]
                                    </span>
                                  </div>
                                  <span className="font-mono text-[10px] text-[#59d6e8] group-hover:text-white transition-colors">
                                    {opt.flag}
                                  </span>
                                </div>

                                {/* Option Title & Concise Description */}
                                <div className="space-y-1">
                                  <h4 className="font-display font-bold text-sm sm:text-[15px] text-white group-hover:text-[#ffc928] transition-colors leading-snug">
                                    {opt.label}
                                  </h4>
                                  <p className="text-xs text-[#8aacc8] group-hover:text-[#d4e4f5] transition-colors leading-relaxed line-clamp-2">
                                    {opt.desc}
                                  </p>
                                </div>
                              </div>

                              {/* Bottom Telemetry Strip */}
                              <div className="pt-2.5 mt-2.5 border-t border-[#59d6e8]/10 flex items-center justify-between font-mono text-[10px]">
                                <span className="text-[#6e94b8] group-hover:text-[#59d6e8] transition-colors tracking-tight">
                                  {opt.telemetry}
                                </span>
                                <CornerDownLeft className="w-3.5 h-3.5 text-[#59d6e8]/40 group-hover:text-[#ffc928] transition-colors shrink-0" />
                              </div>
                            </motion.button>
                          ))}
                        </div>

                        <div className="text-[11px] text-[#6e94b8] pl-1 pt-1 flex items-center gap-1.5 select-none">
                          <CornerDownLeft className="w-3.5 h-3.5 text-[#ffc928]" />
                          <span>Click any box or press [1, 2, 3] on your keyboard.</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                /* ── COMPILED BLUEPRINT VIEW (COMPACT, HIGH-SIGNAL, NO WORDY FLUFF) ── */
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Master Blueprint Dossier Box */}
                  <div className="p-3.5 sm:p-6 bg-[#030912] border border-[#59d6e8]/30 rounded-xs space-y-3.5 sm:space-y-4">
                    {/* Header Strip: Codename, Track, Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 pb-3 border-b border-[#59d6e8]/20">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffc928] animate-pulse shrink-0" />
                        <span className="font-display text-lg sm:text-2xl font-black text-white uppercase tracking-tight break-words">
                          {result.codename}
                        </span>
                        <span className="text-[#59d6e8] text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-xs bg-[#59d6e8]/10 border border-[#59d6e8]/25 shrink-0">
                          {result.track}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono shrink-0">
                        <span className="text-[#ffc928] font-bold bg-[#ffc928]/10 border border-[#ffc928]/30 px-2 py-0.5 rounded-xs">
                          {result.stats.find((s) => s.label.includes('BOM'))?.val || '<₹1200'}
                        </span>
                        <span className="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-xs">
                          24H READY
                        </span>
                      </div>
                    </div>

                    {/* Mission Title & Clean 1-Liner */}
                    <div className="space-y-1">
                      <h3 className="font-display text-base sm:text-xl font-bold text-white">
                        {result.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#b8d4f0] italic leading-relaxed">
                        "{result.mission}"
                      </p>
                    </div>

                    {/* 2-Column Split: 24H Deliverable + Verified Stack */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      {/* MVP Scope */}
                      <div className="p-3 bg-[#07192d] border-l-3 border-emerald-400 rounded-xs space-y-1">
                        <span className="text-emerald-400 font-mono font-bold text-[10px] uppercase tracking-wider block">
                          24H MVP DELIVERABLE
                        </span>
                        <p className="text-xs text-[#e2edf8] leading-relaxed">
                          {result.mvp}
                        </p>
                      </div>

                      {/* Stack Chips */}
                      <div className="p-3 bg-[#07192d] border-l-3 border-[#59d6e8] rounded-xs space-y-1.5">
                        <span className="text-[#59d6e8] font-mono font-bold text-[10px] uppercase tracking-wider block">
                          VERIFIED STACK
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {result.stack.map((item) => (
                            <span
                              key={item}
                              className="px-2 py-0.5 bg-[#0f2744] border border-[#59d6e8]/30 text-[#59d6e8] rounded-xs font-mono text-[11px] font-bold"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 4-Metric Telemetry Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-center">
                      {result.stats.map((s, idx) => (
                        <div key={idx} className="p-2 bg-[#061525] rounded-xs border border-[#59d6e8]/15">
                          <div className="text-[10px] text-[#7e9bb5] uppercase">{s.label}</div>
                          <div className="text-sm sm:text-base font-bold text-[#ffc928] mt-0.5">
                            {s.val}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Compact 03:00 AM Crisis Failover Bar */}
                    <div className="p-2.5 bg-[#0b1828] border border-rose-500/30 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                      <div className="flex items-start sm:items-center gap-2">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5 sm:mt-0" />
                        <span className="text-[#c4daf2] text-[11px] leading-tight">
                          {result.crisisResolution}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleSimulateStress}
                        className={`shrink-0 px-2.5 py-1.5 sm:py-1 rounded-xs text-[10px] font-bold uppercase cursor-pointer transition-colors touch-manipulation min-h-[36px] sm:min-h-0 flex items-center justify-center ${
                          stressSimulated
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-300 hover:text-white border border-rose-500/40 active:bg-rose-500/30'
                        }`}
                      >
                        {stressSimulated ? (
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-emerald-400" />
                            <span>TEST PASSED ✓</span>
                          </span>
                        ) : (
                          'RUN TEST ⚠️'
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 pt-1">
                    <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 bg-[#0f243c] hover:bg-[#163860] active:bg-[#163860] border border-[#59d6e8]/30 rounded-xs text-xs font-mono uppercase tracking-wider text-white transition-colors cursor-pointer min-h-[44px] touch-manipulation"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#59d6e8]" />
                            <span>$ copy --stdout</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleJumpToStep(0)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2.5 bg-[#09091f] hover:bg-[#102b52] active:bg-[#102b52] border border-[#59d6e8]/20 rounded-xs text-xs font-mono uppercase text-[#8aacc8] hover:text-white transition-colors cursor-pointer min-h-[44px] touch-manipulation"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Re-calibrate</span>
                      </button>
                    </div>

                    <Button
                      variant="primary"
                      size="md"
                      href="#register"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      className="font-bold cursor-pointer justify-center min-h-[44px] touch-manipulation w-full sm:w-auto"
                    >
                      $ sudo register --squad
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Terminal Bottom Status Bar */}
          <div className="bg-[#081524] border-t border-[#59d6e8]/20 px-3.5 sm:px-4 py-2 text-[10px] sm:text-[11px] text-[#6e94b8] flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 select-none">
            <div className="flex items-center gap-2">
              <span className="text-[#ffc928] font-bold">TTY_SESSION: #2026-CEC</span>
              <span>•</span>
              <span>VT-100 UTF-8</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline">CONTROLS: [1,2,3] SELECT · [R] RESET · [M] MUTE</span>
              <span className="text-emerald-400 font-bold">24H PROTOTYPE COMPILER</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default IdeaForge
