import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  RefreshCw,
  Cpu,
  Flame,
  Target,
  Copy,
  Check,
  Zap,
  Activity,
  Coins,
  Sprout,
  ShieldAlert,
  Shuffle,
  Bookmark,
  BookmarkCheck,
  Terminal,
  ArrowRight,
  Sliders,
  Layers,
} from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/ui/Card'
import {
  TRACK_DOMAINS,
  TARGET_AUDIENCES,
  ENGINEERING_CONSTRAINTS,
  synthesizeBlueprint,
  type BlueprintSynthesis,
} from './ideaForgeData'
import { ReactorCoreVisual } from './ReactorCoreVisual'

export const IdeaForge: React.FC = () => {
  const [selectedDomainId, setSelectedDomainId] = useState<string>('cleantech')
  const [selectedTargetId, setSelectedTargetId] = useState<string>('health-workers')
  const [selectedConstraintId, setSelectedConstraintId] = useState<string>('offline-mesh')
  const [sprintMode, setSprintMode] = useState<'hybrid' | 'software' | 'deep'>('hybrid')

  const [isFusing, setIsFusing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [savedRacks, setSavedRacks] = useState<BlueprintSynthesis[]>([])
  const [activeTabMobile, setActiveTabMobile] = useState<'injectors' | 'blueprint'>('blueprint')

  // Curated presets for instant inspiration
  const PRESET_COMBOS = [
    { label: 'Off-Grid MedTech', domain: 'healthcare', target: 'health-workers', constraint: 'offline-mesh' },
    { label: 'Disaster Rubble Mesh', domain: 'edge-ai', target: 'first-responders', constraint: 'offline-mesh' },
    { label: 'Bio-Acoustic AgriTech', domain: 'agritech', target: 'farmers', constraint: 'sub-15-bom' },
    { label: 'Lab Safety Interlock', domain: 'edge-ai', target: 'makerspaces', constraint: 'sub-50ms-edge' },
  ]

  const activeDomain = TRACK_DOMAINS.find((d) => d.id === selectedDomainId) || TRACK_DOMAINS[0]
  const activeTarget = TARGET_AUDIENCES.find((t) => t.id === selectedTargetId) || TARGET_AUDIENCES[0]
  const activeConstraint = ENGINEERING_CONSTRAINTS.find((c) => c.id === selectedConstraintId) || ENGINEERING_CONSTRAINTS[0]

  // Currently synthesized blueprint
  const [blueprint, setBlueprint] = useState<BlueprintSynthesis>(() =>
    synthesizeBlueprint('cleantech', 'health-workers', 'offline-mesh', 'hybrid')
  )

  const handleTriggerSynthesis = (
    nextDomain = selectedDomainId,
    nextTarget = selectedTargetId,
    nextConstraint = selectedConstraintId,
    nextMode = sprintMode
  ) => {
    setIsFusing(true)
    setTimeout(() => {
      const generated = synthesizeBlueprint(nextDomain, nextTarget, nextConstraint, nextMode)
      setBlueprint(generated)
      setIsFusing(false)
      // On mobile, automatically show the synthesized blueprint
      setActiveTabMobile('blueprint')
    }, 420)
  }

  const handleSelectDomain = (domainId: string) => {
    setSelectedDomainId(domainId)
    handleTriggerSynthesis(domainId, selectedTargetId, selectedConstraintId, sprintMode)
  }

  const handleSelectTarget = (targetId: string) => {
    setSelectedTargetId(targetId)
    handleTriggerSynthesis(selectedDomainId, targetId, selectedConstraintId, sprintMode)
  }

  const handleSelectConstraint = (constraintId: string) => {
    setSelectedConstraintId(constraintId)
    handleTriggerSynthesis(selectedDomainId, selectedTargetId, constraintId, sprintMode)
  }

  const handleModeChange = (mode: 'hybrid' | 'software' | 'deep') => {
    setSprintMode(mode)
    handleTriggerSynthesis(selectedDomainId, selectedTargetId, selectedConstraintId, mode)
  }

  const handleRandomize = () => {
    const randomDomain = TRACK_DOMAINS[Math.floor(Math.random() * TRACK_DOMAINS.length)].id
    const randomTarget = TARGET_AUDIENCES[Math.floor(Math.random() * TARGET_AUDIENCES.length)].id
    const randomConstraint = ENGINEERING_CONSTRAINTS[Math.floor(Math.random() * ENGINEERING_CONSTRAINTS.length)].id

    setSelectedDomainId(randomDomain)
    setSelectedTargetId(randomTarget)
    setSelectedConstraintId(randomConstraint)
    handleTriggerSynthesis(randomDomain, randomTarget, randomConstraint, sprintMode)
  }

  const handleLoadPreset = (domain: string, target: string, constraint: string) => {
    setSelectedDomainId(domain)
    setSelectedTargetId(target)
    setSelectedConstraintId(constraint)
    handleTriggerSynthesis(domain, target, constraint, sprintMode)
  }

  const handleCopy = () => {
    const textToCopy = `[IDEA SPRINT 2026 // VENTURE BLUEPRINT]
Codename: ${blueprint.codename}
Title: ${blueprint.title}
Track: ${activeDomain.name}
Target Persona: ${activeTarget.label}
Constraint: ${activeConstraint.label} (${activeConstraint.spec})

Elevator Hook:
${blueprint.hook}

Problem Statement:
${blueprint.problemStatement}

Proposed Solution Architecture:
${blueprint.solutionArchitecture}

Recommended Tech Stack:
${blueprint.recommendedStack.join(' • ')}

24-Hour Sprint MVP Scope:
${blueprint.sprintMvpScope}

Telemetry:
Viability: ${blueprint.metrics.feasibility}% | Impact: ${blueprint.metrics.impact}% | Novelty: ${blueprint.metrics.novelty}% | Mode: ${blueprint.metrics.hardwareIntensity}

Generated at IDEA FORGE // IEDC BOOTCAMP CEC`

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2200)
      })
      .catch(() => {})
  }

  const handleTogglePin = () => {
    setSavedRacks((prev) => {
      const exists = prev.some((b) => b.id === blueprint.id)
      if (exists) {
        return prev.filter((b) => b.id !== blueprint.id)
      }
      if (prev.length >= 4) {
        return [blueprint, ...prev.slice(0, 3)]
      }
      return [blueprint, ...prev]
    })
  }

  const isCurrentPinned = savedRacks.some((b) => b.id === blueprint.id)

  const renderDomainIcon = (iconName: string, color: string) => {
    const props = { className: 'w-4 h-4', style: { color } }
    switch (iconName) {
      case 'Zap':
        return <Zap {...props} />
      case 'Activity':
        return <Activity {...props} />
      case 'Cpu':
        return <Cpu {...props} />
      case 'Coins':
        return <Coins {...props} />
      case 'Sprout':
        return <Sprout {...props} />
      case 'ShieldAlert':
        return <ShieldAlert {...props} />
      default:
        return <Flame {...props} />
    }
  }

  return (
    <section
      id="idea-forge"
      aria-label="Idea Forge Kinetic Synthesis Deck"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden border-b border-[#59d6e8]/20 bg-[#0b1a30]"
    >
      {/* Background blueprint grid accents */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle 1px, rgba(89,214,232,0.8) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-[#ffc928]/[0.03] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#59d6e8]/[0.03] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default">
        {/* Section Heading */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12">
          <SectionHeading
            tag="TACTICAL IDEATION BENCH"
            title="IDEA FORGE: Kinetic Idea Reactor"
            subtitle="Fuse real-world engineering domains, user cohorts, and extreme operational constraints into defensible 24-hour sprint concepts."
            className="mb-0 max-w-2xl"
          />

          {/* Quick serendipity & randomize button */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRandomize}
              isLoading={isFusing}
              leftIcon={<Shuffle className="w-3.5 h-3.5 text-[#ffc928]" />}
              className="text-xs font-mono font-bold tracking-wider border-[#ffc928]/50 text-[#ffc928] hover:bg-[#ffc928]/10 min-h-[42px] cursor-pointer"
            >
              Overclock // Randomize
            </Button>
          </div>
        </div>

        {/* Preset Vectors Quick Chips */}
        <div className="relative z-10 flex items-center gap-2 overflow-x-auto scrollbar-none pb-4 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#59d6e8] font-bold shrink-0 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-[#ffc928]" /> Curated Vectors:
          </span>
          {PRESET_COMBOS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => handleLoadPreset(p.domain, p.target, p.constraint)}
              className="px-3 py-1.5 rounded-full text-xs font-mono bg-[#163866]/90 border border-[#59d6e8]/25 text-[#c4daf2] hover:text-[#ffc928] hover:border-[#ffc928]/60 transition-all shrink-0 cursor-pointer active:scale-95 whitespace-nowrap"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Mobile View Toggle: Switch between Injectors Config and Blueprint Output */}
        <div className="lg:hidden relative z-10 grid grid-cols-2 gap-2 p-1 bg-[#102b52] border border-[#59d6e8]/20 rounded-lg mb-6">
          <button
            type="button"
            onClick={() => setActiveTabMobile('injectors')}
            className={`py-2.5 px-3 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTabMobile === 'injectors'
                ? 'bg-[#ffc928] text-[#102b52] shadow-sm'
                : 'text-[#8aacc8] hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>1. Injectors</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTabMobile('blueprint')}
            className={`py-2.5 px-3 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTabMobile === 'blueprint'
                ? 'bg-[#ffc928] text-[#102b52] shadow-sm'
                : 'text-[#8aacc8] hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>2. Blueprint</span>
          </button>
        </div>

        {/* Main Workbench Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: THE 3 INJECTORS (CONFIG CHAMBERS)           */}
          {/* ========================================================= */}
          <div
            className={`lg:col-span-5 space-y-6 ${
              activeTabMobile === 'injectors' ? 'block' : 'hidden lg:block'
            }`}
          >
            {/* INJECTOR 1: DOMAIN TRACK */}
            <div className="bg-[#122f59]/90 border border-[#59d6e8]/25 p-4 sm:p-5 rounded-lg shadow-lg relative">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#59d6e8]/15">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#ffc928]/15 text-[#ffc928] border border-[#ffc928]/30">
                    INJECTOR α
                  </span>
                  <span className="font-display font-bold text-sm text-white">Sprint Track</span>
                </div>
                <span className="font-mono text-[10px] text-[#59d6e8] uppercase tracking-wider">
                  {activeDomain.tag}
                </span>
              </div>

              {/* Domains Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TRACK_DOMAINS.map((domain) => {
                  const isSelected = domain.id === selectedDomainId
                  return (
                    <button
                      key={domain.id}
                      type="button"
                      onClick={() => handleSelectDomain(domain.id)}
                      className={`p-2.5 rounded text-left transition-all relative border cursor-pointer min-h-[64px] flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#1e467e] border-[#ffc928] shadow-[0_0_12px_rgba(255,201,40,0.2)]'
                          : 'bg-[#102b52]/80 border-[#59d6e8]/20 hover:border-[#59d6e8]/50 hover:bg-[#163866]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        {renderDomainIcon(domain.iconName, domain.color)}
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ffc928] animate-pulse" />
                        )}
                      </div>
                      <span className="font-display text-xs font-bold text-[#f5f7fa] line-clamp-2 mt-1 leading-snug">
                        {domain.name}
                      </span>
                    </button>
                  )
                })}
              </div>
              <p className="font-mono text-[11px] text-[#8aacc8] mt-3 leading-relaxed">
                {activeDomain.description}
              </p>
            </div>

            {/* INJECTOR 2: TARGET PERSONA / COHORT */}
            <div className="bg-[#122f59]/90 border border-[#59d6e8]/25 p-4 sm:p-5 rounded-lg shadow-lg relative">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#59d6e8]/15">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#59d6e8]/15 text-[#59d6e8] border border-[#59d6e8]/30">
                    INJECTOR β
                  </span>
                  <span className="font-display font-bold text-sm text-white">Target Beneficiary</span>
                </div>
                <span className="font-mono text-[10px] text-[#8aacc8] uppercase tracking-wider">
                  {TARGET_AUDIENCES.length} Cohorts
                </span>
              </div>

              {/* Targets List */}
              <div className="space-y-1.5">
                {TARGET_AUDIENCES.map((target) => {
                  const isSelected = target.id === selectedTargetId
                  return (
                    <button
                      key={target.id}
                      type="button"
                      onClick={() => handleSelectTarget(target.id)}
                      className={`w-full p-2.5 rounded text-left transition-all border flex items-center justify-between cursor-pointer min-h-[44px] ${
                        isSelected
                          ? 'bg-[#1e467e] border-[#59d6e8] text-white shadow-sm'
                          : 'bg-[#102b52]/70 border-[#59d6e8]/15 text-[#c4daf2] hover:bg-[#163866] hover:text-white'
                      }`}
                    >
                      <span className="font-display text-xs font-semibold leading-tight pr-2">
                        {target.label}
                      </span>
                      {isSelected ? (
                        <span className="font-mono text-[10px] text-[#59d6e8] font-bold shrink-0">
                          [LOCKED]
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] text-[#6e94b8] shrink-0">
                          SELECT
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* INJECTOR 3: ENGINEERING CONSTRAINT */}
            <div className="bg-[#122f59]/90 border border-[#59d6e8]/25 p-4 sm:p-5 rounded-lg shadow-lg relative">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#59d6e8]/15">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-400/15 text-rose-300 border border-rose-400/30">
                    INJECTOR γ
                  </span>
                  <span className="font-display font-bold text-sm text-white">Extreme Constraint</span>
                </div>
                <span className="font-mono text-[10px] text-rose-300 uppercase tracking-wider">
                  REAL-WORLD LIMIT
                </span>
              </div>

              {/* Constraints Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ENGINEERING_CONSTRAINTS.map((constraint) => {
                  const isSelected = constraint.id === selectedConstraintId
                  return (
                    <button
                      key={constraint.id}
                      type="button"
                      onClick={() => handleSelectConstraint(constraint.id)}
                      className={`p-2.5 rounded text-left transition-all border cursor-pointer min-h-[52px] flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#1e467e] border-rose-400 text-white shadow-sm'
                          : 'bg-[#102b52]/70 border-[#59d6e8]/15 text-[#b0c8e8] hover:bg-[#163866] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#ffc928] font-bold">
                          {constraint.tag}
                        </span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />}
                      </div>
                      <span className="font-display text-xs font-bold mt-1 line-clamp-1">
                        {constraint.label}
                      </span>
                    </button>
                  )
                })}
              </div>
              <p className="font-mono text-[10px] text-[#6e94b8] mt-2.5 leading-tight">
                {activeConstraint.spec}
              </p>
            </div>

            {/* Prototype Mode Toggle */}
            <div className="bg-[#102b52] border border-[#59d6e8]/20 p-3 rounded-lg flex items-center justify-between">
              <span className="font-mono text-xs text-[#8aacc8] flex items-center gap-1.5 font-bold">
                <Layers className="w-3.5 h-3.5 text-[#59d6e8]" /> Sprint Intensity:
              </span>
              <div className="flex items-center gap-1">
                {(['software', 'hybrid', 'deep'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleModeChange(m)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase font-bold transition-all cursor-pointer ${
                      sprintMode === m
                        ? 'bg-[#ffc928] text-[#102b52]'
                        : 'text-[#6e94b8] hover:text-white hover:bg-[#163866]'
                    }`}
                  >
                    {m === 'software' ? 'Software' : m === 'hybrid' ? 'IoT Hybrid' : 'Hardware'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: KINETIC REACTOR + SYNTHESIZED BLUEPRINT CARD */}
          {/* ========================================================= */}
          <div
            className={`lg:col-span-7 space-y-5 ${
              activeTabMobile === 'blueprint' ? 'block' : 'hidden lg:block'
            }`}
          >
            {/* Interactive Reactor Visual Centerpiece */}
            <div className="bg-[#163866]/90 border border-[#59d6e8]/30 rounded-xl p-5 sm:p-6 relative overflow-hidden shadow-2xl backdrop-blur-xs">
              {/* Technical Blueprint Corner Crosshairs */}
              <span className="absolute top-2 left-2 font-mono text-[9px] text-[#59d6e8]/40 select-none">
                [SYS_REACTOR_26]
              </span>
              <span className="absolute top-2 right-2 font-mono text-[9px] text-[#ffc928]/50 select-none">
                SEC_CHAMBER_ONLINE
              </span>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* SVG Gyroscope Core */}
                <div className="md:col-span-6 flex justify-center py-2">
                  <ReactorCoreVisual
                    isFusing={isFusing}
                    domainColor={activeDomain.color}
                    onTriggerFuse={() => handleTriggerSynthesis()}
                    statusText={isFusing ? 'SYNTHESIZING VECTORS...' : 'CORE EQUILIBRATED'}
                    activeDomainTag={activeDomain.tag.split(' ')[0]}
                    activeConstraintTag={activeConstraint.tag}
                  />
                </div>

                {/* Telemetry Summary & Primary Fusion Action */}
                <div className="md:col-span-6 space-y-3.5 text-center md:text-left">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#ffc928] font-bold">
                      INJECTOR SYNC STATUS
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white leading-tight">
                      Synthesize Sprint Concept
                    </h3>
                    <p className="font-mono text-xs text-[#9bbad6] leading-relaxed">
                      Tap the reactor or hit fuse to bind these three engineering vectors into a viable 24H build plan.
                    </p>
                  </div>

                  {/* Injector Lock Badges */}
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="flex items-center gap-2 p-1.5 bg-[#102b52]/80 border border-[#59d6e8]/20 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffc928]" />
                      <span className="text-[#a0c0e0] text-[11px] truncate">
                        <strong>Track:</strong> {activeDomain.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 bg-[#102b52]/80 border border-[#59d6e8]/20 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#59d6e8]" />
                      <span className="text-[#a0c0e0] text-[11px] truncate">
                        <strong>Target:</strong> {activeTarget.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 bg-[#102b52]/80 border border-rose-400/20 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      <span className="text-[#a0c0e0] text-[11px] truncate">
                        <strong>Rule:</strong> {activeConstraint.label}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => handleTriggerSynthesis()}
                    isLoading={isFusing}
                    leftIcon={<RefreshCw className={`w-4 h-4 ${isFusing ? 'animate-spin' : ''}`} />}
                    className="w-full justify-center min-h-[46px] font-bold shadow-[0_0_20px_rgba(255,201,40,0.35)] cursor-pointer"
                  >
                    {isFusing ? 'Fusing Blueprint...' : 'Initiate Fusion'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Synthesized Venture Blueprint Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={blueprint.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="bg-[#122f59] border-[#59d6e8]/35 p-5 sm:p-7 relative overflow-hidden shadow-2xl" withCrosshairs>
                  {/* Blueprint Stamp Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-[#59d6e8]/20">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-[#59d6e8]/15 text-[#59d6e8] font-bold border border-[#59d6e8]/30">
                          {blueprint.id}
                        </span>
                        <span className="text-[#ffc928] font-bold tracking-wider uppercase">
                          {blueprint.codename}
                        </span>
                      </div>

                      <h4 className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-white mt-1.5 leading-tight">
                        {blueprint.title}
                      </h4>
                    </div>

                    {/* Action buttons: Bookmark + Copy */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleTogglePin}
                        title={isCurrentPinned ? 'Remove from Saved Racks' : 'Pin to Saved Racks'}
                        aria-label="Pin Blueprint"
                        className={`p-2.5 rounded border transition-all cursor-pointer min-h-[40px] flex items-center justify-center ${
                          isCurrentPinned
                            ? 'bg-[#ffc928]/20 border-[#ffc928] text-[#ffc928]'
                            : 'bg-[#102b52] border-[#59d6e8]/30 text-[#8aacc8] hover:text-white hover:border-[#ffc928]/60'
                        }`}
                      >
                        {isCurrentPinned ? (
                          <BookmarkCheck className="w-4 h-4 text-[#ffc928]" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#102b52] hover:bg-[#163866] active:scale-95 border border-[#59d6e8]/40 rounded text-xs font-mono text-zinc-100 hover:text-white transition-all min-h-[40px] cursor-pointer"
                        title="Copy blueprint brief"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-[#59d6e8]" />
                            <span className="font-bold">Copy Brief</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Elevator Pitch Callout */}
                  <div className="my-4 p-3.5 bg-[#102b52]/90 border-l-3 border-[#ffc928] rounded-r text-sm text-[#f5f7fa] font-display italic leading-relaxed">
                    "{blueprint.hook}"
                  </div>

                  {/* 3 Technical Dossier Sections */}
                  <div className="space-y-4 font-mono">
                    {/* [01] The Pain Vector */}
                    <div className="p-3.5 bg-[#102b52]/70 border border-[#59d6e8]/20 rounded">
                      <div className="text-[10px] font-bold text-[#ffc928] uppercase tracking-wider mb-1">
                        [01] The Core Problem Vector:
                      </div>
                      <p className="text-xs sm:text-sm text-[#c4daf2] leading-relaxed">
                        {blueprint.problemStatement}
                      </p>
                    </div>

                    {/* [02] Solution Architecture */}
                    <div className="p-3.5 bg-[#102b52]/70 border border-[#59d6e8]/20 rounded">
                      <div className="text-[10px] font-bold text-[#59d6e8] uppercase tracking-wider mb-1">
                        [02] Engineering Architecture & Feasibility:
                      </div>
                      <p className="text-xs sm:text-sm text-[#c4daf2] leading-relaxed mb-3">
                        {blueprint.solutionArchitecture}
                      </p>

                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] text-[#6e94b8] uppercase mr-1">Stack:</span>
                        {blueprint.recommendedStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[11px] bg-[#163866] border border-[#59d6e8]/25 rounded text-[#59d6e8] font-bold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* [03] 24-Hour MVP Deliverable */}
                    <div className="p-3.5 bg-[#102b52]/70 border border-[#59d6e8]/20 rounded">
                      <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                        [03] 24H Sprint MVP Deliverable:
                      </div>
                      <p className="text-xs sm:text-sm text-[#c4daf2] leading-relaxed">
                        {blueprint.sprintMvpScope}
                      </p>
                    </div>
                  </div>

                  {/* Telemetry Metrics Bar */}
                  <div className="mt-5 pt-4 border-t border-[#59d6e8]/20 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-2.5 bg-[#102b52] rounded border border-[#59d6e8]/15">
                      <div className="font-mono text-[9px] uppercase text-[#8aacc8]">Feasibility</div>
                      <div className="font-mono text-base font-extrabold text-white">
                        {blueprint.metrics.feasibility}%
                      </div>
                      <div className="w-full bg-[#163866] h-1 rounded-full mt-1 overflow-hidden">
                        <div
                          className="bg-[#59d6e8] h-full"
                          style={{ width: `${blueprint.metrics.feasibility}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-2.5 bg-[#102b52] rounded border border-[#59d6e8]/15">
                      <div className="font-mono text-[9px] uppercase text-[#8aacc8]">Impact</div>
                      <div className="font-mono text-base font-extrabold text-[#ffc928]">
                        {blueprint.metrics.impact}%
                      </div>
                      <div className="w-full bg-[#163866] h-1 rounded-full mt-1 overflow-hidden">
                        <div
                          className="bg-[#ffc928] h-full"
                          style={{ width: `${blueprint.metrics.impact}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-2.5 bg-[#102b52] rounded border border-[#59d6e8]/15">
                      <div className="font-mono text-[9px] uppercase text-[#8aacc8]">Novelty</div>
                      <div className="font-mono text-base font-extrabold text-emerald-400">
                        {blueprint.metrics.novelty}%
                      </div>
                      <div className="w-full bg-[#163866] h-1 rounded-full mt-1 overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full"
                          style={{ width: `${blueprint.metrics.novelty}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-2.5 bg-[#102b52] rounded border border-[#59d6e8]/15 flex flex-col justify-between">
                      <div className="font-mono text-[9px] uppercase text-[#8aacc8]">Intensity</div>
                      <div className="font-mono text-xs font-bold text-white truncate">
                        {blueprint.metrics.hardwareIntensity}
                      </div>
                      <span className="font-mono text-[8px] text-[#59d6e8]">24H VALIDATED</span>
                    </div>
                  </div>

                  {/* Register to Build CTA */}
                  <div className="mt-5 pt-4 border-t border-[#59d6e8]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="font-mono text-xs text-[#8aacc8]">
                      Ready to build this or your own custom vector?
                    </span>
                    <Button
                      variant="primary"
                      size="sm"
                      href="#register"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      className="font-bold cursor-pointer"
                    >
                      Register Your Team
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Saved Blueprints Rack (If any pinned) */}
            {savedRacks.length > 0 && (
              <div className="p-4 bg-[#122f59]/90 border border-[#ffc928]/30 rounded-lg">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#ffc928] font-bold flex items-center gap-1.5">
                    <BookmarkCheck className="w-3.5 h-3.5" /> Saved Concept Rack ({savedRacks.length}/4):
                  </span>
                  <button
                    type="button"
                    onClick={() => setSavedRacks([])}
                    className="font-mono text-[10px] text-[#8aacc8] hover:text-white cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {savedRacks.map((saved) => (
                    <button
                      key={saved.id}
                      type="button"
                      onClick={() => setBlueprint(saved)}
                      className={`p-2.5 rounded text-left border transition-all cursor-pointer flex items-center justify-between ${
                        saved.id === blueprint.id
                          ? 'bg-[#1e467e] border-[#ffc928] text-white'
                          : 'bg-[#102b52] border-[#59d6e8]/20 text-[#c4daf2] hover:bg-[#163866]'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <div className="font-mono text-[9px] text-[#ffc928] font-bold">
                          {saved.codename}
                        </div>
                        <div className="font-display text-xs font-bold truncate text-white">
                          {saved.title}
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-[#59d6e8] shrink-0 font-bold">
                        VIEW
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default IdeaForge
