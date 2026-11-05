import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  RotateCcw,
  ArrowRight,
  Copy,
  Check,
  Shuffle,
  Trophy,
} from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/common/Button'

// ── 3-Step Sprint Simulation Decision Tree ─────────────────

interface SimulationChoice {
  readonly id: string
  readonly title: string
  readonly tag: string
  readonly impact: string
  readonly trackId: string
  readonly statBoost: { readonly label: string; readonly value: string }
}

interface SimulationStep {
  readonly hour: string
  readonly phaseName: string
  readonly situation: string
  readonly choices: readonly SimulationChoice[]
}

const SIMULATION_STEPS: readonly SimulationStep[] = [
  {
    hour: '09:00 AM · HOUR 00',
    phaseName: 'PHASE 01: SQUAD ARCHITECTURE',
    situation: 'The 24-hour sprint clock starts ticking. How does your squad split initial responsibilities?',
    choices: [
      {
        id: 'hardware-iot',
        title: 'Deep Hardware & Sensor Wiring',
        tag: 'PHYSICAL EMBEDDED',
        impact: 'You breadboard microcontrollers and solder analog probes before writing a line of code.',
        trackId: 'cleantech',
        statBoost: { label: 'Hardware Rigor', value: '+40' },
      },
      {
        id: 'rapid-software',
        title: 'High-Velocity Offline PWA',
        tag: 'PURE SOFTWARE',
        impact: 'You build an offline-first web client with IndexedDB and mock JSON streams.',
        trackId: 'fintech',
        statBoost: { label: 'Build Velocity', value: '+50' },
      },
      {
        id: 'edge-ml',
        title: 'Quantized TinyML Pipeline',
        tag: 'INTELLIGENCE',
        impact: 'You train a 1D-CNN model on audio/optical sensor data for zero-cloud edge inference.',
        trackId: 'edge-ai',
        statBoost: { label: 'Tech Novelty', value: '+45' },
      },
    ],
  },
  {
    hour: '02:30 AM · HOUR 17',
    phaseName: 'PHASE 02: THE MIDNIGHT CRISIS',
    situation: 'The campus Wi-Fi router overheats and crashes. Your cloud API calls are dead. Squad response:',
    choices: [
      {
        id: 'mesh-pivot',
        title: 'Deploy Peer-to-Peer LoRa / ESP-NOW',
        tag: 'ZERO CONNECTIVITY',
        impact: 'You dump cloud dependencies and route packets directly between laptops over RF mesh.',
        trackId: 'civic',
        statBoost: { label: 'Fault Resilience', value: '+60' },
      },
      {
        id: 'caching-fallback',
        title: 'Switch to Cryptographic Offline Vouchers',
        tag: 'CRYPTOGRAPHIC AUDIT',
        impact: 'You implement signed local ledger hashes that verify transactions without a server.',
        trackId: 'fintech',
        statBoost: { label: 'Security Score', value: '+35' },
      },
      {
        id: 'acoustic-optics',
        title: 'Pivot to On-Device Sensor Triage',
        tag: 'AUTONOMOUS SENSORS',
        impact: 'You wire direct GPIO threshold interrupts and buzzer sirens directly on the breadboard.',
        trackId: 'healthcare',
        statBoost: { label: 'Demo Defensibility', value: '+40' },
      },
    ],
  },
  {
    hour: '08:15 AM · HOUR 23',
    phaseName: 'PHASE 03: THE 5-MINUTE DEMO',
    situation: 'The jury is walking over to your workstation. One jumper wire is loose. How do you pitch?',
    choices: [
      {
        id: 'live-hardware',
        title: 'Trigger Live Working Prototype',
        tag: 'MAXIMUM RESPECT',
        impact: 'You hold the hot soldering iron in hand and run real sensor readings live on stage.',
        trackId: 'agritech',
        statBoost: { label: 'Jury Conviction', value: '+55' },
      },
      {
        id: 'resilient-testbench',
        title: 'Interactive Simulated Stress-Test',
        tag: 'ROCK SOLID',
        impact: 'You demonstrate live simulated fault-injection to prove the system cannot crash.',
        trackId: 'civic',
        statBoost: { label: 'Architecture Viability', value: '+45' },
      },
      {
        id: 'business-focus',
        title: 'ROI & Defensible Market Unit Economics',
        tag: 'STARTUP FOCUS',
        impact: 'You demonstrate how a sub-₹1000 BOM creates an unassailable margin for rural deployment.',
        trackId: 'cleantech',
        statBoost: { label: 'Commercial Viability', value: '+50' },
      },
    ],
  },
]

// ── Squad Archetypes generated from Choices ────────────────

interface SquadArchetype {
  readonly badge: string
  readonly title: string
  readonly tagline: string
  readonly matchedTrack: string
  readonly missionTitle: string
  readonly missionOneLiner: string
  readonly stack: readonly string[]
  readonly stats: { readonly title: string; readonly score: number }[]
}

const ARCHETYPES: Record<string, SquadArchetype> = {
  cleantech: {
    badge: 'ARCHETYPE // HARDWARE RIGOR',
    title: 'The Off-Grid Microgrid Pioneer',
    tagline: 'Your squad tackles real thermodynamic & physical challenges where cloud servers cannot reach.',
    matchedTrack: 'Clean Energy & Infrastructure',
    missionTitle: 'Solar Cold-Chain Telemetry Puck',
    missionOneLiner: 'Preventing rural vaccine spoilage through mesh-linked thermal loggers surviving 6+ months on coin cells.',
    stack: ['ESP32-C3', 'DS18B20 Temp Probe', 'SX1262 LoRa', 'SQLite Edge'],
    stats: [
      { title: 'Hardware Rigor', score: 96 },
      { title: 'Fault Resilience', score: 92 },
      { title: 'Sprint Readiness', score: 95 },
    ],
  },
  healthcare: {
    badge: 'ARCHETYPE // CLINICAL ACCURACY',
    title: 'The Edge MedTech Architect',
    tagline: 'Your squad transforms commodity hardware into life-saving diagnostic triage tools.',
    matchedTrack: 'HealthTech & Assistive Devices',
    missionTitle: 'Sub-50ms Cardiac Murmur Classifier',
    missionOneLiner: 'On-device acoustic phonocardiogram detecting valve anomalies in remote sub-centers without doctors.',
    stack: ['ESP32-S3', 'INMP441 MEMS', 'TensorFlow Lite Micro', 'Edge Impulse'],
    stats: [
      { title: 'Diagnostic Impact', score: 98 },
      { title: 'Edge Efficiency', score: 94 },
      { title: 'Sprint Readiness', score: 91 },
    ],
  },
  'edge-ai': {
    badge: 'ARCHETYPE // NEURAL ON-CHIP',
    title: 'The TinyML Systems Specialist',
    tagline: 'Zero cloud dependencies. Your models execute deterministically on bare silicon.',
    matchedTrack: 'Edge AI & Autonomous Systems',
    missionTitle: 'Sub-40ms Optical Safety Interlock',
    missionOneLiner: 'On-device vision sentinel that hardware-cuts machinery relays before human hands reach blades.',
    stack: ['Grove Vision AI v2', 'YOLOv8-nano', 'Opto-Isolated Relay', 'WebRTC'],
    stats: [
      { title: 'Inference Speed', score: 97 },
      { title: 'Safety Novelty', score: 94 },
      { title: 'Sprint Readiness', score: 93 },
    ],
  },
  fintech: {
    badge: 'ARCHETYPE // TRUSTLESS ARCHITECT',
    title: 'The Sovereign Ledger Builder',
    tagline: 'You build payment networks that survive when cell towers and bank servers collapse.',
    matchedTrack: 'Open Commerce & P2P Finance',
    missionTitle: 'Zero-Connectivity Voucher Exchange',
    missionOneLiner: 'Cryptographic airplane-mode token transfers verified locally via ultrasonic acoustic chimes.',
    stack: ['Web NFC API', 'Ed25519 Crypto', 'Web Audio API', 'Next.js PWA'],
    stats: [
      { title: 'Cryptographic Security', score: 95 },
      { title: 'Network Independence', score: 99 },
      { title: 'Sprint Readiness', score: 92 },
    ],
  },
  agritech: {
    badge: 'ARCHETYPE // FRONTLINE IMPACT',
    title: 'The Precision AgriTech Hacker',
    tagline: 'Turning ₹50 components into high-yield sensors for smallholder paddy and spice farmers.',
    matchedTrack: 'AgriTech & Food Preservation',
    missionTitle: 'Sub-₹500 Acoustic Silo Weevil Sensor',
    missionOneLiner: 'Contact microphone detecting larval micro-vibrations inside grain storage days before visible damage.',
    stack: ['Piezo Contact Disc', 'LM358 OpAmp', 'ESP32 ADC', 'FFT Binning'],
    stats: [
      { title: 'Cost Democratization', score: 99 },
      { title: 'Practical Feasibility', score: 95 },
      { title: 'Sprint Readiness', score: 96 },
    ],
  },
  civic: {
    badge: 'ARCHETYPE // DISASTER DEFENSE',
    title: 'The Resilient Mesh Guardian',
    tagline: 'When monsoon floods arrive, your squad’s decentralized nodes sound the alert before anyone else.',
    matchedTrack: 'Civic Resilience & Disaster Relief',
    missionTitle: 'Autonomous River Basin Telemetry Link',
    missionOneLiner: 'Bridge-mounted ultrasonic rangefinders communicating upstream-to-downstream to trigger sirens.',
    stack: ['JSN-SR04T Waterproof', 'ATmega328P', 'Ebyte LoRa 1W', 'Siren Relay'],
    stats: [
      { title: 'Disaster Resilience', score: 98 },
      { title: 'Civic Impact', score: 96 },
      { title: 'Sprint Readiness', score: 94 },
    ],
  },
}

export const IdeaForge: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)
  const [selectedChoices, setSelectedChoices] = useState<SimulationChoice[]>([])
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)

  const activeStep = SIMULATION_STEPS[currentStepIndex] || SIMULATION_STEPS[0]

  // Determine final archetype based on player choices
  const resolveArchetype = (): SquadArchetype => {
    if (selectedChoices.length === 0) return ARCHETYPES.cleantech
    const lastChoice = selectedChoices[selectedChoices.length - 1]
    const matched = ARCHETYPES[lastChoice.trackId]
    return matched || ARCHETYPES.cleantech
  }

  const handleSelectChoice = (choice: SimulationChoice) => {
    const updated = [...selectedChoices, choice]
    setSelectedChoices(updated)

    if (currentStepIndex + 1 < SIMULATION_STEPS.length) {
      setCurrentStepIndex((prev) => prev + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handleReset = () => {
    setCurrentStepIndex(0)
    setSelectedChoices([])
    setIsCompleted(false)
  }

  const handleInstantRoll = () => {
    const randomChoices = SIMULATION_STEPS.map(
      (step) => step.choices[Math.floor(Math.random() * step.choices.length)]
    )
    setSelectedChoices(randomChoices)
    setCurrentStepIndex(SIMULATION_STEPS.length - 1)
    setIsCompleted(true)
  }

  const resultArchetype = resolveArchetype()

  const handleCopyResult = () => {
    const text = `[IDEA SPRINT 2026 // SQUAD SIMULATION RESULT]
Archetype: ${resultArchetype.title}
Track: ${resultArchetype.matchedTrack}

Assigned Mission:
${resultArchetype.missionTitle}
"${resultArchetype.missionOneLiner}"

Recommended 24H Stack:
${resultArchetype.stack.join(' • ')}

Simulated at IDEA FORGE // IEDC BOOTCAMP CEC`

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2200)
      })
      .catch(() => {})
  }

  return (
    <section
      id="idea-forge"
      aria-label="Idea Forge Sprint Simulator"
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden border-b border-[#59d6e8]/10 bg-[#091728]"
    >
      {/* Blueprint Grid Atmosphere */}
      <div
        className="absolute inset-0 bg-blueprint-grid opacity-35 pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default">
        {/* Section Heading matching other sections */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <SectionHeading
            tag="INTERACTIVE BENCH"
            title="The 24-Hour Sprint Simulator."
            subtitle="Simulate three critical squad decisions under sprint conditions to uncover your team's tactical archetype and matched build mission."
            className="mb-0 max-w-2xl"
          />

          {/* Quick Instant Random Roll */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={handleInstantRoll}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xs font-mono text-xs uppercase tracking-wider font-bold text-[#ffc928] border border-[#ffc928]/40 hover:border-[#ffc928] hover:bg-[#ffc928]/10 transition-colors cursor-pointer min-h-[44px]"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Instant Roll</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SIMULATOR APPARATUS (CLEAN DRAFTING PLANE - ZERO SLOP)   */}
        {/* ======================================================== */}
        <div className="relative z-10 border border-[#59d6e8]/25 bg-[#0b1d33]/95 backdrop-blur-xs shadow-2xl">
          {/* Corner Crosshairs */}
          <span className="absolute top-1 left-2 font-mono text-xs text-[#59d6e8]/40 select-none">
            +
          </span>
          <span className="absolute top-1 right-2 font-mono text-xs text-[#59d6e8]/40 select-none">
            +
          </span>
          <span className="absolute bottom-1 left-2 font-mono text-xs text-[#59d6e8]/40 select-none">
            +
          </span>
          <span className="absolute bottom-1 right-2 font-mono text-xs text-[#59d6e8]/40 select-none">
            +
          </span>

          {/* Progress Header Ribbon */}
          <div className="border-b border-[#59d6e8]/20 bg-[#081524] px-5 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#ffc928] animate-pulse" />
              <span className="text-[#ffc928] font-bold uppercase tracking-wider">
                {isCompleted ? 'SIMULATION COMPLETE' : activeStep.hour}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#6e94b8] uppercase">PROGRESS:</span>
              <div className="flex gap-1.5">
                {SIMULATION_STEPS.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-2 w-8 sm:w-12 rounded-xs transition-colors duration-200 ${
                      isCompleted || idx <= currentStepIndex
                        ? 'bg-[#ffc928]'
                        : 'bg-[#163866]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Simulator Body */}
          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {!isCompleted ? (
                /* ── ACTIVE GAME QUESTION SCREEN ── */
                <motion.div
                  key={currentStepIndex}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6 sm:space-y-8"
                >
                  {/* Phase & Prompt */}
                  <div className="space-y-2 border-l-2 border-[#59d6e8] pl-4 sm:pl-5">
                    <span className="font-mono text-xs text-[#59d6e8] font-bold tracking-widest uppercase">
                      {activeStep.phaseName}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                      {activeStep.situation}
                    </h3>
                  </div>

                  {/* 3 Clickable Choice Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {activeStep.choices.map((choice) => (
                      <motion.button
                        key={choice.id}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => handleSelectChoice(choice)}
                        className="p-5 sm:p-6 text-left border border-[#59d6e8]/20 bg-[#081524] hover:bg-[#102b52] hover:border-[#ffc928] transition-all duration-150 cursor-pointer flex flex-col justify-between group min-h-[160px] select-none"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-[#ffc928] font-bold tracking-wider uppercase">
                              {choice.tag}
                            </span>
                            <span className="font-mono text-[10px] text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded-xs border border-emerald-400/20">
                              {choice.statBoost.value} {choice.statBoost.label}
                            </span>
                          </div>

                          <h4 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-[#ffc928] transition-colors leading-snug">
                            {choice.title}
                          </h4>

                          <p className="text-xs text-[#8aacc8] leading-relaxed">
                            {choice.impact}
                          </p>
                        </div>

                        <div className="pt-4 flex items-center justify-between font-mono text-[11px] text-[#59d6e8] font-bold uppercase tracking-wider">
                          <span>SELECT TACTIC</span>
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* ── COMPLETED RESULT SCREEN ── */
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  {/* Result Header */}
                  <div className="border-b border-[#59d6e8]/20 pb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs text-[#ffc928] font-bold tracking-wider uppercase mb-1.5">
                        <Trophy className="w-4 h-4 text-[#ffc928]" />
                        {resultArchetype.badge}
                      </div>
                      <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
                        {resultArchetype.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#b8d4f0] font-display italic mt-1">
                        "{resultArchetype.tagline}"
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-3.5 py-2 font-mono text-xs text-[#59d6e8] hover:text-white border border-[#59d6e8]/30 hover:border-[#ffc928] transition-colors cursor-pointer rounded-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Re-simulate</span>
                    </button>
                  </div>

                  {/* 3 Calibrated Telemetry Scores */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#59d6e8]/15 border border-[#59d6e8]/20 bg-[#081524]">
                    {resultArchetype.stats.map((stat, i) => (
                      <div key={i} className="p-4 sm:p-5 flex items-center justify-between">
                        <span className="font-mono text-xs text-[#8aacc8] uppercase tracking-wider font-semibold">
                          {stat.title}
                        </span>
                        <span className="font-mono text-xl sm:text-2xl font-black text-[#ffc928]">
                          {stat.score}%
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Matched Build Mission */}
                  <div className="p-5 sm:p-7 border-l-3 border-[#ffc928] bg-[#081524] space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                      <span className="text-[#59d6e8] font-bold uppercase tracking-wider">
                        RECOMMENDED SPRINT TRACK: {resultArchetype.matchedTrack}
                      </span>
                      <span className="text-emerald-400 font-bold uppercase">
                        READY FOR VERIFICATION
                      </span>
                    </div>

                    <h4 className="font-heading text-2xl sm:text-3xl font-black text-white uppercase">
                      {resultArchetype.missionTitle}
                    </h4>

                    <p className="text-sm sm:text-base text-[#c4daf2] leading-relaxed">
                      {resultArchetype.missionOneLiner}
                    </p>

                    {/* Tech Chips */}
                    <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-xs">
                      <span className="text-[#6e94b8] uppercase mr-1">Stack:</span>
                      {resultArchetype.stack.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 bg-[#102b52] border border-[#59d6e8]/25 text-[#59d6e8] font-semibold rounded-xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-[#59d6e8]/20 pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleCopyResult}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#102b52] hover:bg-[#163866] border border-[#59d6e8]/30 rounded-xs font-mono text-xs uppercase tracking-wider text-[#f5f7fa] hover:text-white transition-colors cursor-pointer min-h-[46px]"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Mission Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#59d6e8]" />
                          <span>Copy Squad Mission</span>
                        </>
                      )}
                    </button>

                    <Button
                      variant="primary"
                      size="md"
                      href="#register"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      className="font-bold cursor-pointer justify-center min-h-[46px]"
                    >
                      Register Squad For This Mission
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default IdeaForge
