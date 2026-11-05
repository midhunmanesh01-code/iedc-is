import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Terminal as TerminalIcon,
  Copy,
  Check,
  RotateCcw,
  ArrowRight,
  Shuffle,
  Volume2,
  VolumeX,
  Flame,
  CornerDownLeft,
} from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/common/Button'
import { sound } from './soundEngine'

// ── Step Definitions ────────────────────────────────────────────────────────

interface StepOption {
  readonly key: string
  readonly label: string
  readonly flag: string
  readonly desc: string
  readonly spec: string
}

interface StepQuestion {
  readonly cmd: string
  readonly prompt: string
  readonly options: readonly StepOption[]
}

const TERMINAL_STEPS: readonly StepQuestion[] = [
  {
    cmd: 'select --build-engine',
    prompt: 'STEP 01/03: Select your squad’s primary technical engine',
    options: [
      {
        key: '1',
        label: 'Embedded Hardware & RF Mesh',
        flag: '--stack=embedded-lora',
        desc: 'Microcontrollers, analog sensor probes, and 868MHz local RF mesh.',
        spec: 'BOM: <₹1200 | RF: 868MHz | Net: Zero Cloud',
      },
      {
        key: '2',
        label: 'Edge TinyML & Machine Vision',
        flag: '--stack=edge-tinyml',
        desc: 'On-device quantized neural inference with zero cloud roundtrip.',
        spec: 'Latency: <40ms | Inference: SRAM | Cloud: 0ms',
      },
      {
        key: '3',
        label: 'Offline-First Cryptographic PWA',
        flag: '--stack=offline-pwa',
        desc: 'Local IndexedDB caching, Web NFC, and peer-to-peer audio links.',
        spec: 'Crypto: Ed25519 | Storage: Local | BOM: ₹0',
      },
    ],
  },
  {
    cmd: 'inject --event "03:00_AM_CRISIS"',
    prompt: 'STEP 02/03: Campus Wi-Fi drops completely. Select contingency protocol',
    options: [
      {
        key: '1',
        label: 'Peer-to-Peer LoRa Mesh Beacon',
        flag: '--protocol=mesh-rf',
        desc: 'Bypasses cellular towers entirely. Hops packet across 868MHz nodes.',
        spec: 'Range: 8km Line-of-Sight | Power: 22mA',
      },
      {
        key: '2',
        label: 'Asymmetric Cryptographic Offline Tokens',
        flag: '--protocol=crypto-hash',
        desc: 'Locally signed ledger hashes with zero-knowledge verification on reconnect.',
        spec: 'Security: SHA-256 + Ed25519 | Zero Loss',
      },
      {
        key: '3',
        label: 'Hardware GPIO Fallback & Siren Relay',
        flag: '--protocol=analog-trip',
        desc: 'Hardware cutoffs and piezo alarms wired directly to MCU trigger pins.',
        spec: 'Trip Latency: 12ms | Contact: 10A 230V',
      },
    ],
  },
  {
    cmd: 'calibrate --sprint-constraint',
    prompt: 'STEP 03/03: Select your jury evaluation stress-test',
    options: [
      {
        key: '1',
        label: 'Strict Sub-₹1200 Hardware BOM',
        flag: '--target=low-cost',
        desc: 'Extreme cost democratization using commodity off-the-shelf electronics.',
        spec: 'BOM Target: ₹450 - ₹1180 | Score: 98%',
      },
      {
        key: '2',
        label: 'Zero-Battery Micro-Energy Harvesting',
        flag: '--target=micro-harvest',
        desc: 'Self-powers via ambient micro-solar/piezo with deep-sleep current <15µA.',
        spec: 'Run Duration: 6+ Mo Continuous | Zero Swaps',
      },
      {
        key: '3',
        label: 'Deterministic Sub-50ms Response Latency',
        flag: '--target=sub-50ms',
        desc: 'Deterministic hard-real-time responses for critical triage or blade safety.',
        spec: 'Edge Roundtrip: 38ms | Cloud: Disabled',
      },
    ],
  },
]

// ── Compiled Blueprint Database ─────────────────────────────────────────────

interface BlueprintSpec {
  readonly codename: string
  readonly track: string
  readonly title: string
  readonly mission: string
  readonly mvp: string
  readonly stack: readonly string[]
  readonly feasibility: number
  readonly bom: string
  readonly latency: string
  readonly pins: readonly { readonly pin: string; readonly role: string }[]
  readonly crisisPlan: {
    readonly alert: string
    readonly action: string
    readonly outcome: string
  }
}

const BLUEPRINTS: Record<string, BlueprintSpec> = {
  '1-1-1': {
    codename: 'OP: CRYOCACHE-868',
    track: 'CLEAN ENERGY // OFFLINE SENSORS',
    title: 'Solar Cold-Chain Guardian',
    mission: 'Preventing rural clinic vaccine spoilage with decentralized LoRa temperature telemetry.',
    mvp: 'Dual breadboard sensor nodes broadcasting live temperatures over LoRa to an offline dashboard, triggering alarm on thermal breach.',
    stack: ['ESP32-C3', 'DS18B20 Temp Probe', 'SX1262 LoRa 868MHz', 'SQLite Edge'],
    feasibility: 96,
    bom: '< ₹1200',
    latency: '14ms',
    pins: [
      { pin: 'GPIO 4', role: 'OneWire Bus (DS18B20 Temp Probe)' },
      { pin: 'GPIO 5/18/19', role: 'SPI LoRa SX1262 Transceiver' },
      { pin: 'ADC 2', role: 'Supercapacitor Voltage Monitor' },
    ],
    crisisPlan: {
      alert: '03:14 AM — PHC diesel generator dies; ambient room temperature surges to 37.8°C.',
      action: 'ESP32 wakes from deep sleep on threshold interrupt; transmits SOS beacon over 868MHz LoRa mesh.',
      outcome: 'District officer notified in 2.1s; auxiliary cold-box deployed. Zero vaccine loss.',
    },
  },
  '1-1-2': {
    codename: 'OP: DELUGE-NET',
    track: 'CIVIC RESILIENCE // FLOOD SENSORS',
    title: 'Autonomous River Flash-Flood Mesh',
    mission: 'Autonomous ultrasonic river-level nodes broadcasting flood waves downstream via 433MHz LoRa.',
    mvp: 'Ultrasonic sensor triggering a simulated village alarm when water level crosses threshold distance.',
    stack: ['JSN-SR04T Waterproof', 'ATmega328P / Nano', 'Ebyte LoRa 1W', 'Siren Relay'],
    feasibility: 95,
    bom: '< ₹1450',
    latency: '18ms',
    pins: [
      { pin: 'D2 / D3', role: 'Trigger & Echo (JSN-SR04T Waterproof)' },
      { pin: 'D10 / D11 / D12', role: 'SPI Bus (Ebyte 433MHz 1W)' },
      { pin: 'D7', role: 'Optocoupled 230V Siren Contactor' },
    ],
    crisisPlan: {
      alert: '02:58 AM — Cloudburst in upper catchment causes 1.4m water surge in 6 minutes.',
      action: 'JSN-SR04T registers delta >20cm/min; transmits emergency beacon packet at 1W RF.',
      outcome: 'Downstream siren node triggers 11.2km away in 340ms, providing 28-minute evacuation window.',
    },
  },
  '1-2-1': {
    codename: 'OP: SILOCURE-FFT',
    track: 'AGRITECH // BIO-ACOUSTICS',
    title: 'Sub-₹500 Grain Larvae Acoustic Sensor',
    mission: 'Piezo contact microphone detecting insect larvae chewing inside grain silos before spoilage begins.',
    mvp: 'Piezo sensor picking up mock grain scratching with live FFT spike detection displayed on an offline web UI.',
    stack: ['Piezo Disc 27mm', 'LM358 High-Gain OpAmp', 'ESP32 ADC', 'FFT Binning'],
    feasibility: 97,
    bom: '< ₹500',
    latency: '22ms',
    pins: [
      { pin: 'ADC 1 / GPIO 34', role: 'LM358 Pre-Amplified Acoustic Signal' },
      { pin: 'GPIO 25', role: 'Threshold Alarm Indicator LED' },
    ],
    crisisPlan: {
      alert: '03:22 AM — Heavy monsoon rain drums against silo exterior, producing 75dB rumble.',
      action: 'Analog bandpass filter (1.2kHz–3.5kHz) strips rain noise; 64-bin FFT isolates 2.2kHz larval feeding clicks.',
      outcome: 'Infestation localized to lower hopper 4 days prior to visual signs. Zero crop loss.',
    },
  },
  '2-3-3': {
    codename: 'OP: PULSENET-S3',
    track: 'HEALTHTECH // ON-DEVICE TINYML',
    title: 'Deterministic Cardiac Valve Classifier',
    mission: 'Sub-50ms acoustic murmur detection turning standard stethoscopes into triage tools.',
    mvp: 'On-device 1D-CNN running on ESP32-S3 lighting a triage indicator for normal vs abnormal valve audio.',
    stack: ['ESP32-S3', 'INMP441 MEMS Mic', 'TFLite Micro', 'Edge Impulse'],
    feasibility: 94,
    bom: '< ₹1200',
    latency: '38ms',
    pins: [
      { pin: 'GPIO 1/2/42', role: 'I2S Audio Bus (INMP441 MEMS)' },
      { pin: 'GPIO 38/39/40', role: 'Triage Indicator Tri-Color LED' },
    ],
    crisisPlan: {
      alert: '03:05 AM — Rural clinic power severed; cellular signal completely dead.',
      action: 'ESP32-S3 executes full quantized 1D-CNN in internal SRAM with zero cloud dependencies.',
      outcome: 'Aortic regurgitation classified with 94.2% confidence; triage alert confirmed locally.',
    },
  },
  '2-1-3': {
    codename: 'OP: SPECTER-GUARD',
    track: 'EDGE AI // MACHINE SAFETY',
    title: 'Optical Workshop Safety Interlock',
    mission: 'Computer vision sentinel that hardware-cuts machinery relays before human hands reach blades.',
    mvp: 'Webcam feed simulating machine emergency brake trip whenever hands cross a virtual danger perimeter.',
    stack: ['Grove Vision AI v2', 'YOLOv8-nano INT8', 'Opto-Relay 10A', 'WebRTC'],
    feasibility: 96,
    bom: '< ₹1100',
    latency: '32ms',
    pins: [
      { pin: 'CSI Ribbon', role: 'OmniVision OV5647 Camera Sensor' },
      { pin: 'GPIO 16', role: 'Opto-Isolated Triac Motor Contactor' },
    ],
    crisisPlan: {
      alert: '02:50 AM — Student maker loses grip on stock; hand drifts 15mm from high-speed blade.',
      action: 'YOLOv8-nano on-chip inference detects intrusion; asserts hardware interrupt pin within 32ms.',
      outcome: 'Optical relay de-energizes motor contactor in 41ms total elapsed time. Zero laceration.',
    },
  },
  '3-2-1': {
    codename: 'OP: VOUCHER-MESH',
    track: 'FINTECH // TRUSTLESS COMMERCE',
    title: 'Zero-Connectivity Voucher Exchange',
    mission: 'Cryptographic airplane-mode token transfers operating during floods and cellular blackouts.',
    mvp: 'Two phones in Airplane Mode trading digital vouchers over QR/NFC with local signature verification.',
    stack: ['Web NFC API', 'Ed25519 Cryptography', 'IndexedDB Storage', 'Next.js PWA'],
    feasibility: 98,
    bom: '₹0 (Pure Web)',
    latency: '08ms',
    pins: [
      { pin: 'NFC Antenna', role: '13.56 MHz Near-Field Token Exchange' },
      { pin: 'Audio DAC', role: 'Ultrasonic FSK Audio Chirp Backup Link' },
    ],
    crisisPlan: {
      alert: '03:12 AM — Cellular towers flooded; all UPI payment gateways unreachable.',
      action: 'Ed25519 local keypair signs token exchange; stores SHA-256 hash in offline IndexedDB vault.',
      outcome: 'Transaction confirmed in 80ms over Web NFC; settles instantly when cellular returns.',
    },
  },
}

function getBlueprint(choices: readonly string[]): BlueprintSpec {
  const key = choices.join('-')
  if (BLUEPRINTS[key]) return BLUEPRINTS[key]

  const p1 = choices[0] || '1'
  if (p1 === '2') return BLUEPRINTS['2-3-3']
  if (p1 === '3') return BLUEPRINTS['3-2-1']
  return BLUEPRINTS['1-1-1']
}

// ── Log Line Interface ──────────────────────────────────────────────────────

interface LogItem {
  readonly id: number
  readonly type: 'cmd' | 'resp' | 'info' | 'warn' | 'success' | 'ascii'
  readonly text: string
}

export const IdeaForge: React.FC = () => {
  const [stepIndex, setStepIndex] = useState<number>(0)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [isDone, setIsDone] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(sound.muted)

  // Interactive typing & command line
  const [inputVal, setInputVal] = useState<string>('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyPointer, setHistoryPointer] = useState<number>(-1)

  // 03:00 AM Crisis Minigame State
  const [isCrisisActive, setIsCrisisActive] = useState<boolean>(false)
  const [crisisStep, setCrisisStep] = useState<number>(0)
  const [crisisScore, setCrisisScore] = useState<number | null>(null)

  // Color phosphor theme: 'cyan' (default) | 'amber' | 'matrix'
  const [phosphor, setPhosphor] = useState<'cyan' | 'amber' | 'matrix'>('cyan')

  const [logs, setLogs] = useState<LogItem[]>([
    { id: 1, type: 'info', text: 'IEDC BOOTCAMP CEC // IDEA FORGE COMPILER v2.6.4' },
    { id: 2, type: 'info', text: 'Initializing 24-Hour Tactical Architecture Synthesizer...' },
    { id: 3, type: 'info', text: 'Commands: Type [1], [2], [3] to select · [roll] to auto-generate · [help] for CLI' },
  ])

  const terminalEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const activeQuestion = TERMINAL_STEPS[stepIndex]

  // Auto-scroll terminal log
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs, stepIndex, isDone, isCrisisActive])

  // Play boot sound on first mount
  useEffect(() => {
    sound.playBoot()
  }, [])

  const appendLog = (type: LogItem['type'], text: string) => {
    setLogs((prev) => [...prev, { id: Date.now() + Math.random(), type, text }])
  }

  // Handle Step Selection
  const handleSelectOption = (opt: StepOption) => {
    sound.playEnter()
    const nextKeys = [...selectedKeys, opt.key]
    setSelectedKeys(nextKeys)

    appendLog('cmd', `${activeQuestion.cmd}`)
    appendLog('success', `[✓] SELECTED: [${opt.key}] ${opt.label} (${opt.flag})`)

    if (stepIndex + 1 < TERMINAL_STEPS.length) {
      setStepIndex((prev) => prev + 1)
      appendLog('info', `--> Advancing to ${TERMINAL_STEPS[stepIndex + 1].prompt}`)
    } else {
      setIsDone(true)
      sound.playSuccess()
      appendLog('success', `================================================================`)
      appendLog('success', `[✓] ALL SPRINT PARAMETERS RESOLVED. SPECIFICATION COMPILED.`)
      appendLog('success', `================================================================`)
    }
  }

  // Handle Instant Roll
  const handleInstantRoll = () => {
    sound.playEnter()
    const rChoices = TERMINAL_STEPS.map((s) => String(Math.floor(Math.random() * s.options.length) + 1))
    setSelectedKeys(rChoices)
    appendLog('cmd', 'idea-forge --auto-roll --matrix-resolve')
    appendLog('warn', '[*] Overclocking synthesis pipeline... Resolving deterministic vector...')
    setTimeout(() => {
      setIsDone(true)
      sound.playSuccess()
      appendLog('success', `[✓] SPRINT BLUEPRINT COMPILED (VECTOR: ${rChoices.join('-')})`)
    }, 280)
  }

  // Reset Session
  const handleReset = () => {
    sound.playKeyClack()
    setStepIndex(0)
    setSelectedKeys([])
    setIsDone(false)
    setIsCrisisActive(false)
    setCrisisScore(null)
    setLogs([
      { id: Date.now(), type: 'info', text: 'IEDC BOOTCAMP CEC // IDEA FORGE COMPILER v2.6.4' },
      { id: Date.now() + 1, type: 'info', text: 'Terminal session cleared. Memory buffer reset to 0x0000.' },
      { id: Date.now() + 2, type: 'info', text: 'STEP 01/03: Select your squad’s primary technical engine.' },
    ])
  }

  // Trigger 03:00 AM Crisis Minigame
  const handleTriggerCrisisMinigame = () => {
    sound.playAlarm()
    setIsCrisisActive(true)
    setCrisisStep(1)
    setCrisisScore(null)

    appendLog('warn', '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    appendLog('warn', '[!] ALERT: SIMULATED 03:00 AM HACKATHON CRISIS INJECTED')
    appendLog('warn', '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    appendLog('warn', '[03:14:02 AM] Event: Campus Wi-Fi drops to 0 packets; Lab mains flicker.')
    appendLog('warn', '[03:14:03 AM] Jury stress-test initiated. Choose contingency action:')
    appendLog('info', '    [A] DEPLOY_MESH_BEACON    - Broadcast emergency packet via 868MHz LoRa')
    appendLog('info', '    [B] LOCAL_EEPROM_DUMP     - Commit uncommitted ledger hashes to flash ring')
    appendLog('info', '    [C] TRIP_ANALOG_FAILSAFE  - De-energize high-power contactors; assert siren')
  }

  const handleResolveCrisisChoice = (choice: 'A' | 'B' | 'C') => {
    sound.playEnter()
    setCrisisStep(2)
    appendLog('cmd', `contingency-exec --choice=${choice}`)
    appendLog('info', `[*] Engaging contingency protocol [${choice}]...`)

    setTimeout(() => {
      sound.playSuccess()
      const score = choice === 'A' ? 99 : choice === 'B' ? 97 : 95
      setCrisisScore(score)
      appendLog('success', `[+] Telemetry verified: RSSI -82dBm | Packets saved: 100% | CRC Check: PASS`)
      appendLog('success', `[✓] CRISIS SURVIVED: EVALUATION SCORE ${score}% [S-TIER SURVIVOR]`)
      appendLog('info', `--> Type [roll] to create a new blueprint or [copy] to copy spec.`)
    }, 700)
  }

  // Execute Command from CLI Input
  const handleExecuteCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase()
    if (!cmd) return

    sound.playEnter()
    appendLog('cmd', rawCmd)

    // Add to history
    setCmdHistory((prev) => [...prev, rawCmd])
    setHistoryPointer(-1)
    setInputVal('')

    // Process commands
    if (cmd === 'clear' || cmd === 'cls') {
      setLogs([])
      return
    }

    if (cmd === 'help' || cmd === '?') {
      appendLog('info', 'COMMAND DIRECTORY:')
      appendLog('info', '  1, 2, 3       Select corresponding option in active step')
      appendLog('info', '  a, b, c       Choose contingency during 03:00 AM crisis test')
      appendLog('info', '  roll, random  Instant auto-roll random blueprint vector')
      appendLog('info', '  crisis, test  Inject 03:00 AM hackathon stress minigame')
      appendLog('info', '  copy          Copy compiled specification to clipboard')
      appendLog('info', '  register      Navigate to squad registration')
      appendLog('info', '  reset, r      Reset terminal to step 1')
      appendLog('info', '  theme [name]  Switch theme: theme cyan | theme amber | theme matrix')
      appendLog('info', '  clear         Clear screen buffer')
      return
    }

    if (cmd === 'roll' || cmd === 'random') {
      handleInstantRoll()
      return
    }

    if (cmd === 'crisis' || cmd === 'test') {
      handleTriggerCrisisMinigame()
      return
    }

    if (cmd === 'reset' || cmd === 'r') {
      handleReset()
      return
    }

    if (cmd === 'copy') {
      handleCopy()
      return
    }

    if (cmd === 'register') {
      appendLog('success', '[✓] Redirecting to squad registration section...')
      const el = document.getElementById('register')
      el?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    if (cmd.startsWith('theme ')) {
      const t = cmd.split(' ')[1]
      if (t === 'cyan' || t === 'amber' || t === 'matrix') {
        setPhosphor(t)
        appendLog('success', `[✓] Phosphor color theme switched to [${t.toUpperCase()}].`)
      } else {
        appendLog('warn', 'Invalid theme. Choices: theme cyan | theme amber | theme matrix')
      }
      return
    }

    // Step selection numbers
    if (!isDone && activeQuestion && ['1', '2', '3'].includes(cmd)) {
      const match = activeQuestion.options.find((o) => o.key === cmd)
      if (match) {
        handleSelectOption(match)
        return
      }
    }

    // Crisis choices A, B, C
    if (isCrisisActive && ['a', 'b', 'c'].includes(cmd)) {
      handleResolveCrisisChoice(cmd.toUpperCase() as 'A' | 'B' | 'C')
      return
    }

    // Easter egg: matrix
    if (cmd === 'matrix') {
      setPhosphor('matrix')
      appendLog('success', '01001001 01000101 01000100 01000011 // WAKE UP, MAKER.')
      return
    }

    // Unknown command
    sound.playError()
    appendLog('warn', `bash: ${cmd}: command not found. Type [help] or enter [1, 2, 3].`)
  }

  // Handle Input KeyDown (Enter, Up/Down arrow history)
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sound.playKeyClack()

    if (e.key === 'Enter') {
      e.preventDefault()
      handleExecuteCommand(inputVal)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length === 0) return
      const nextPtr = historyPointer === -1 ? cmdHistory.length - 1 : Math.max(0, historyPointer - 1)
      setHistoryPointer(nextPtr)
      setInputVal(cmdHistory[nextPtr])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyPointer === -1) return
      const nextPtr = historyPointer + 1
      if (nextPtr >= cmdHistory.length) {
        setHistoryPointer(-1)
        setInputVal('')
      } else {
        setHistoryPointer(nextPtr)
        setInputVal(cmdHistory[nextPtr])
      }
    }
  }

  // Handle Global Key shortcuts when NOT typing in an input
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
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

      // Quick numbers 1, 2, 3
      if (!isDone && activeQuestion && ['1', '2', '3'].includes(e.key)) {
        const match = activeQuestion.options.find((o) => o.key === e.key)
        if (match) {
          handleSelectOption(match)
        }
      }

      // Crisis quick keys A, B, C
      if (isCrisisActive && ['a', 'b', 'c', 'A', 'B', 'C'].includes(e.key)) {
        handleResolveCrisisChoice(e.key.toUpperCase() as 'A' | 'B' | 'C')
      }
    }

    window.addEventListener('keydown', handleGlobalKey)
    return () => window.removeEventListener('keydown', handleGlobalKey)
  }, [stepIndex, isDone, activeQuestion, isCrisisActive])

  const result = getBlueprint(selectedKeys)

  // Copy Action
  const handleCopy = () => {
    sound.playEnter()
    const text = `╔═══════════════════════════════════════════════════════════════════════╗
║ IEDC BOOTCAMP CEC // IDEA SPRINT 2026 // ENGINEERING BLUEPRINT        ║
╠═══════════════════════════════════════════════════════════════════════╣
║ CODENAME:    ${result.codename.padEnd(56, ' ')}║
║ TRACK:       ${result.track.padEnd(56, ' ')}║
║ TITLE:       ${result.title.padEnd(56, ' ')}║
║ FEASIBILITY: ${`${result.feasibility}% (24H SPRINT READY)`.padEnd(56, ' ')}║
║ TARGET BOM:  ${`${result.bom} | LATENCY: ${result.latency}`.padEnd(56, ' ')}║
╠═══════════════════════════════════════════════════════════════════════╣
║ MISSION BRIEFING:                                                     ║
║ ${result.mission.padEnd(70, ' ')}║
║                                                                       ║
║ 24-HOUR MVP DELIVERABLE:                                              ║
║ ${result.mvp.padEnd(70, ' ')}║
║                                                                       ║
║ RECOMMENDED ARCHITECTURE & STACK:                                     ║
║ ${result.stack.join(' • ').padEnd(70, ' ')}║
║                                                                       ║
║ 03:00 AM CRISIS CONTINGENCY:                                          ║
║ Alert:  ${result.crisisPlan.alert.padEnd(62, ' ')}║
║ Action: ${result.crisisPlan.action.padEnd(62, ' ')}║
║ Result: ${result.crisisPlan.outcome.padEnd(62, ' ')}║
╚═══════════════════════════════════════════════════════════════════════╝
Generated at IEDC BOOTCAMP CEC // IDEA FORGE TERMINAL v2.6`

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        appendLog('success', '[✓] Specification sheet copied to system clipboard.')
        setTimeout(() => setCopied(false), 2400)
      })
      .catch(() => {})
  }

  // Phosphor Theme Color Mapping
  const phosphorClass =
    phosphor === 'amber'
      ? 'text-[#ffc928] border-[#ffc928]/30 selection:bg-[#ffc928]/30'
      : phosphor === 'matrix'
      ? 'text-emerald-400 border-emerald-500/30 selection:bg-emerald-500/30'
      : 'text-[#d4e4f5] border-[#59d6e8]/30 selection:bg-[#59d6e8]/30'

  const accentColor =
    phosphor === 'amber' ? '#ffc928' : phosphor === 'matrix' ? '#10b981' : '#59d6e8'

  return (
    <section
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
        {/* SECTION HEADING                                          */}
        {/* ======================================================== */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <SectionHeading
            tag="INTERACTIVE TERMINAL"
            title="The Idea Forge"
            subtitle="The 24-hour sprint compiler. Pass tactical parameters via interactive CLI or tap command lines directly to synthesize your squad's verified engineering blueprint."
            className="mb-0 max-w-2xl"
          />

          {/* Quick Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-auto font-mono text-xs">
            {/* Audio Mute/Unmute */}
            <button
              type="button"
              onClick={() => {
                const n = sound.toggleMute()
                setIsMuted(n)
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xs border border-[#59d6e8]/25 hover:border-[#ffc928] bg-[#0a1829] text-[#8aacc8] hover:text-white transition-colors cursor-pointer min-h-[40px]"
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

            {/* Phosphor Theme Switcher */}
            <div className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-xs border border-[#59d6e8]/20 bg-[#0a1829] text-[10px]">
              <span className="text-[#6e94b8] uppercase">CRT:</span>
              <button
                type="button"
                onClick={() => setPhosphor('cyan')}
                className={`px-1.5 py-0.5 rounded-xs font-bold cursor-pointer ${
                  phosphor === 'cyan' ? 'bg-[#59d6e8] text-[#071322]' : 'text-[#59d6e8]'
                }`}
              >
                CYAN
              </button>
              <button
                type="button"
                onClick={() => setPhosphor('amber')}
                className={`px-1.5 py-0.5 rounded-xs font-bold cursor-pointer ${
                  phosphor === 'amber' ? 'bg-[#ffc928] text-[#071322]' : 'text-[#ffc928]'
                }`}
              >
                AMBER
              </button>
              <button
                type="button"
                onClick={() => setPhosphor('matrix')}
                className={`px-1.5 py-0.5 rounded-xs font-bold cursor-pointer ${
                  phosphor === 'matrix' ? 'bg-emerald-400 text-[#071322]' : 'text-emerald-400'
                }`}
              >
                GREEN
              </button>
            </div>

            {/* Auto Roll */}
            <button
              type="button"
              onClick={handleInstantRoll}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xs border border-[#ffc928]/40 hover:border-[#ffc928] bg-[#ffc928]/10 hover:bg-[#ffc928]/20 text-[#ffc928] font-bold tracking-wider uppercase transition-colors cursor-pointer min-h-[40px]"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Auto Roll [🎲]</span>
            </button>

            {/* Reset */}
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xs border border-[#59d6e8]/25 hover:border-[#59d6e8]/60 text-[#8aacc8] hover:text-white transition-colors cursor-pointer min-h-[40px]"
              title="Reset terminal (Press 'r')"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset [R]</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* AUTHENTIC HACKER TERMINAL (NO BOX STUFF)                 */}
        {/* ======================================================== */}
        <div
          className={`relative z-10 border rounded-xs bg-[#040b14]/98 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm ${phosphorClass}`}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Subtle CRT Phosphor Scanline Overlay */}
          <div
            className="absolute inset-0 bg-[linear-gradient(rgba(18,30,49,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40 z-20"
            aria-hidden="true"
          />

          {/* Terminal Titlebar */}
          <div className="relative z-30 bg-[#081524] border-b border-[#59d6e8]/20 px-4 py-2.5 flex items-center justify-between select-none">
            <div className="flex items-center gap-2.5">
              <TerminalIcon className="w-3.5 h-3.5 text-[#ffc928]" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold text-[#8aacc8] tracking-wider uppercase">
                guest@iedc-bootcamp:~ / idea-forge-shell
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              {crisisScore !== null && (
                <span className="text-emerald-400 font-bold bg-emerald-950/70 border border-emerald-500/30 px-1.5 py-0.5 rounded-xs text-[10px]">
                  SURVIVAL SCORE: {crisisScore}%
                </span>
              )}
              <span className="text-[#6e94b8] hidden sm:inline">VT-100 // 80×25</span>
              <span
                className="px-1.5 py-0.5 rounded-xs font-bold text-[10px]"
                style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
              >
                ONLINE
              </span>
            </div>
          </div>

          {/* Terminal Screen Body */}
          <div className="relative z-10 p-4 sm:p-7 min-h-[460px] max-h-[720px] overflow-y-auto space-y-4">
            {/* Command History Stream */}
            <div className="space-y-1.5">
              {logs.map((log) => {
                if (log.type === 'cmd') {
                  return (
                    <div key={log.id} className="flex items-start gap-2 pt-1 font-bold">
                      <span className="text-[#ffc928] shrink-0">$</span>
                      <span className="text-white">{log.text}</span>
                    </div>
                  )
                }
                if (log.type === 'success') {
                  return (
                    <div key={log.id} className="text-emerald-400 pl-4 font-semibold leading-relaxed">
                      {log.text}
                    </div>
                  )
                }
                if (log.type === 'warn') {
                  return (
                    <div key={log.id} className="text-[#ffc928] pl-4 font-semibold leading-relaxed">
                      {log.text}
                    </div>
                  )
                }
                return (
                  <div key={log.id} className="text-[#6e94b8] pl-4 leading-relaxed">
                    {log.text}
                  </div>
                )
              })}
            </div>

            {/* Interactive Step Options (NO BOXES: CLI Command Selector Lines) */}
            <AnimatePresence mode="wait">
              {!isDone && activeQuestion && (
                <motion.div
                  key={stepIndex}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.16 }}
                  className="space-y-3 pt-3 border-t border-[#59d6e8]/15"
                >
                  {/* Active Question Prompt */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#ffc928] font-bold">
                      <span>$</span>
                      <span className="text-white">{activeQuestion.cmd}</span>
                      <span className="inline-block w-2 h-4 bg-[#ffc928] animate-pulse" />
                    </div>
                    <div className="text-[#8aacc8] text-xs pl-4 font-semibold">
                      {activeQuestion.prompt}
                    </div>
                  </div>

                  {/* CLI Interactive Selectable Lines (No Cards, Pure Terminal Rows) */}
                  <div className="space-y-2 pt-1 pl-4">
                    {activeQuestion.options.map((opt) => (
                      <div
                        key={opt.key}
                        onClick={() => handleSelectOption(opt)}
                        className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 py-2 px-3 rounded-xs border-l-2 border-transparent hover:border-[#ffc928] hover:bg-[#59d6e8]/10 transition-all cursor-pointer"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[#ffc928] font-bold">[{opt.key}]</span>
                            <span className="text-white font-bold group-hover:underline">
                              {opt.label}
                            </span>
                            <span className="text-[#59d6e8] text-[11px] font-mono">
                              ({opt.flag})
                            </span>
                          </div>
                          <p className="text-[11px] text-[#8aacc8] pl-6 leading-relaxed">
                            {opt.desc}
                          </p>
                        </div>
                        <div className="text-[10px] text-[#6e94b8] pl-6 sm:pl-0 shrink-0 font-mono">
                          {opt.spec}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-[11px] text-[#6e94b8] pl-4 pt-1 flex items-center gap-2 select-none">
                    <CornerDownLeft className="w-3.5 h-3.5 text-[#ffc928]" />
                    <span>Type [1], [2], or [3] on your keyboard — or click any row above to execute.</span>
                  </div>
                </motion.div>
              )}

              {/* 03:00 AM Crisis Minigame Interactive Prompt */}
              {isCrisisActive && crisisStep === 1 && (
                <motion.div
                  key="crisis-step"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2 pt-3 border-t border-rose-500/30 bg-rose-950/20 p-4 rounded-xs"
                >
                  <div className="text-rose-400 font-bold flex items-center gap-2">
                    <Flame className="w-4 h-4 animate-bounce" />
                    <span>03:00 AM CRISIS IN PROGRESS — SELECT CONTINGENCY PROTOCOL:</span>
                  </div>

                  <div className="space-y-1.5 pt-1 pl-2">
                    <button
                      type="button"
                      onClick={() => handleResolveCrisisChoice('A')}
                      className="w-full text-left py-1.5 px-3 rounded-xs hover:bg-rose-500/20 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-[#ffc928]">[A]</strong> DEPLOY_MESH_BEACON — Broadcast emergency packets via 868MHz LoRa
                      </span>
                      <span className="text-[10px] text-emerald-400">FAVORITE</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleResolveCrisisChoice('B')}
                      className="w-full text-left py-1.5 px-3 rounded-xs hover:bg-rose-500/20 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-[#ffc928]">[B]</strong> LOCAL_EEPROM_DUMP — Commit uncommitted ledger hashes to flash ring
                      </span>
                      <span className="text-[10px] text-emerald-400">SAFE</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleResolveCrisisChoice('C')}
                      className="w-full text-left py-1.5 px-3 rounded-xs hover:bg-rose-500/20 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-[#ffc928]">[C]</strong> TRIP_ANALOG_FAILSAFE — De-energize high-power contactors; assert siren
                      </span>
                      <span className="text-[10px] text-emerald-400">HARDWARE</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── COMPILED BLUEPRINT ASCII OUTPUT (NON-BOX, CRT ASCII DRAWING) ── */}
              {isDone && (
                <motion.div
                  key="blueprint-output"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5 pt-3"
                >
                  {/* Master ASCII Engineering Specification Sheet */}
                  <div className="p-4 sm:p-6 bg-[#030912] border border-[#59d6e8]/40 rounded-xs space-y-4">
                    {/* Top ASCII Titleblock */}
                    <div className="text-[11px] sm:text-xs text-[#59d6e8] select-none overflow-x-auto pb-2 border-b border-[#59d6e8]/20">
                      <pre className="font-mono leading-tight">
{`╔═══════════════════════════════════════════════════════════════════════════════╗
║ IEDC BOOTCAMP CEC // IDEA SPRINT 2026 // ENGINEERING SPECIFICATION           ║
║ STATUS: COMPILED & VERIFIED FOR 24H SPRINT PROTOTYPING                        ║
╚═══════════════════════════════════════════════════════════════════════════════╝`}
                      </pre>
                    </div>

                    {/* Codename & Mission Track */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ffc928] animate-pulse" />
                          <span className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                            {result.codename}
                          </span>
                        </div>
                        <div className="text-xs text-[#59d6e8] font-bold mt-0.5">
                          TRACK: {result.track}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-[#ffc928] font-bold bg-[#ffc928]/10 border border-[#ffc928]/30 px-2.5 py-1 rounded-xs">
                          TARGET BOM: {result.bom}
                        </span>
                        <span className="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-xs">
                          {result.feasibility}% FEASIBLE IN 24H
                        </span>
                      </div>
                    </div>

                    {/* Mission Elevator Pitch */}
                    <div className="space-y-1">
                      <div className="text-[#6e94b8] text-[10px] uppercase tracking-wider font-bold">
                        MISSION TITLE & CORE OBJECTIVE:
                      </div>
                      <div className="text-base sm:text-lg font-bold text-white">
                        {result.title}
                      </div>
                      <p className="text-xs sm:text-sm text-[#b8d4f0] italic leading-relaxed">
                        "{result.mission}"
                      </p>
                    </div>

                    {/* 24-Hour MVP Deliverable Target */}
                    <div className="p-3 bg-[#071729] border-l-2 border-emerald-400 space-y-1">
                      <div className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                        24-HOUR SPRINT MVP DELIVERABLE TARGET:
                      </div>
                      <p className="text-xs sm:text-sm text-[#e2edf8] leading-relaxed">
                        {result.mvp}
                      </p>
                    </div>

                    {/* Verified Stack Chips */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[#6e94b8] text-[10px] uppercase tracking-wider font-bold">
                        VERIFIED HARDWARE & PROTOCOL STACK:
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {result.stack.map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-0.5 bg-[#0f243c] border border-[#59d6e8]/30 text-[#59d6e8] rounded-xs font-bold text-xs"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pinout Architecture Guide */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[#6e94b8] text-[10px] uppercase tracking-wider font-bold">
                        HARDWARE PINOUT & INTERRUPT BUSES:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                        {result.pins.map((p, idx) => (
                          <div key={idx} className="p-2 bg-[#091726] rounded-xs border border-[#59d6e8]/15">
                            <span className="text-[#ffc928] font-bold block">{p.pin}</span>
                            <span className="text-[#8aacc8] text-[10px]">{p.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 03:00 AM Crisis Mitigation Scenario */}
                    <div className="p-3 bg-[#111a26] border border-rose-500/30 rounded-xs space-y-1 text-xs">
                      <div className="text-rose-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5" />
                        <span>03:00 AM CRISIS VERIFICATION PROTOCOL:</span>
                      </div>
                      <div className="text-[#8aacc8] text-[11px]">
                        <strong className="text-rose-300">ALERT:</strong> {result.crisisPlan.alert}
                      </div>
                      <div className="text-[#d4e4f5] text-[11px]">
                        <strong className="text-[#59d6e8]">ACTION:</strong> {result.crisisPlan.action}
                      </div>
                      <div className="text-emerald-400 font-bold text-[11px]">
                        <strong>RESULT:</strong> {result.crisisPlan.outcome}
                      </div>
                    </div>
                  </div>

                  {/* Terminal CLI Command Execution Links */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Copy Command */}
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0f243c] hover:bg-[#163860] border border-[#59d6e8]/30 rounded-xs text-xs font-mono uppercase tracking-wider text-white transition-colors cursor-pointer min-h-[42px]"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Copied to Clipboard</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#59d6e8]" />
                            <span>$ copy --stdout</span>
                          </>
                        )}
                      </button>

                      {/* Stress Test Command */}
                      <button
                        type="button"
                        onClick={handleTriggerCrisisMinigame}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/40 rounded-xs text-xs font-mono uppercase tracking-wider text-rose-300 hover:text-white transition-colors cursor-pointer min-h-[42px]"
                      >
                        <Flame className="w-3.5 h-3.5 text-rose-400" />
                        <span>$ test --crisis-0300</span>
                      </button>
                    </div>

                    {/* Squad Registration Link */}
                    <Button
                      variant="primary"
                      size="md"
                      href="#register"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      className="font-bold cursor-pointer justify-center min-h-[42px]"
                    >
                      $ sudo register --squad
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={terminalEndRef} />
          </div>

          {/* ======================================================== */}
          {/* TERMINAL INTERACTIVE COMMAND PROMPT INPUT BAR            */}
          {/* ======================================================== */}
          <div className="relative z-30 bg-[#081524] border-t border-[#59d6e8]/20 p-3 sm:px-5 flex items-center gap-2">
            <span className="text-[#ffc928] font-black text-sm shrink-0 select-none">
              guest@iedc-is26:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder={
                isDone
                  ? 'Type a command (e.g. roll, copy, crisis, register, help)...'
                  : 'Type 1, 2, 3 to select, or type help, roll, reset...'
              }
              className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs sm:text-sm placeholder:text-[#6e94b8]/60 focus:ring-0 selection:bg-[#ffc928]/30"
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="button"
              onClick={() => handleExecuteCommand(inputVal || '1')}
              className="px-2.5 py-1 rounded-xs border border-[#59d6e8]/30 hover:border-[#ffc928] bg-[#0c1f36] text-[11px] text-[#59d6e8] hover:text-white transition-colors cursor-pointer shrink-0 select-none"
            >
              EXEC ↵
            </button>
          </div>

          {/* Terminal Bottom Status Bar */}
          <div className="bg-[#040b14] border-t border-[#59d6e8]/10 px-4 py-2 text-[10px] sm:text-[11px] text-[#6e94b8] flex flex-wrap items-center justify-between gap-2 select-none">
            <div className="flex items-center gap-2">
              <span className="text-[#ffc928] font-bold">TTY_SESSION: #2026-CEC</span>
              <span>•</span>
              <span>BUFFER: UTF-8</span>
            </div>
            <div className="flex items-center gap-3">
              <span>SHORTCUTS: [1,2,3] SELECT · [ENTER] EXEC · [R] RESET</span>
              <span className="text-emerald-400 font-bold hidden sm:inline">24H PROTOTYPE COMPILER</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default IdeaForge
