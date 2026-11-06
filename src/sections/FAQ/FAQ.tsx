import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Search,
  X,
  Plus,
  Mail,
  MapPin,
  Check,
  Copy,
  MessageCircleQuestion,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'
import { Container } from '@/components/common/Container'
import { EVENT_CONFIG } from '@/config/event'
import { sound } from '@/sections/Interactive/soundEngine'

export type FAQCategory = 'all' | 'participation' | 'rules' | 'logistics' | 'prizes'

export interface FAQItem {
  readonly id: string
  readonly question: string
  readonly answer: string
  readonly category: Exclude<FAQCategory, 'all'>
  readonly categoryLabel: string
  readonly highlight: string
}

const CATEGORIES: readonly { readonly id: FAQCategory; readonly label: string }[] = [
  { id: 'all', label: 'All Questions' },
  { id: 'participation', label: 'Participation' },
  { id: 'rules', label: 'Rules & Ideas' },
  { id: 'logistics', label: 'Logistics & Stay' },
  { id: 'prizes', label: 'Prizes & Mentors' },
]

const FAQS: readonly FAQItem[] = [
  {
    id: 'eligibility',
    question: 'Who is eligible to participate in IDEA SPRINT 2026?',
    category: 'participation',
    categoryLabel: 'Participation',
    answer:
      'Any undergraduate or postgraduate student currently enrolled in an accredited college or university is eligible. Squads must consist of 2 to 4 members. Inter-disciplinary teams combining engineering, design, and business domains are strongly encouraged.',
    highlight: 'Enrolled college students · 2 to 4 members per team',
  },
  {
    id: 'cross-college',
    question: 'Can team members be from different colleges or branches?',
    category: 'participation',
    categoryLabel: 'Participation',
    answer:
      'Yes, absolutely. There are no restrictions requiring all squad members to be from the same college, department, or academic year. You can freely collaborate with friends from other institutions and complementary branches.',
    highlight: 'Cross-college & cross-department teams welcome',
  },
  {
    id: 'fee',
    question: 'Is there any registration fee or hidden cost?',
    category: 'participation',
    categoryLabel: 'Participation',
    answer:
      'Zero. IDEA SPRINT 2026 is completely free of charge. Selected teams receive complimentary access to dedicated hardware workstations, high-speed Wi-Fi, mentorship checkpoints, refreshments, and sprint passes provided by IEDC BOOTCAMP CEC.',
    highlight: '100% Free · Meals, benches & pass included',
  },
  {
    id: 'prototype',
    question: 'Do we need a working prototype or just an idea?',
    category: 'rules',
    categoryLabel: 'Rules & Ideas',
    answer:
      'IDEA SPRINT focuses on rapid validation, problem-solution fit, and venture viability. While having a functional software prototype or breadboard hardware proof-of-concept gives your team a major edge, the evaluation rubric places immense value on problem identification, user validation, and defensible feasibility.',
    highlight: 'Scored on problem clarity, user validation & proof-of-concept',
  },
  {
    id: 'prior-work',
    question: 'Can we build upon an existing project or codebase?',
    category: 'rules',
    categoryLabel: 'Rules & Ideas',
    answer:
      'You are welcome to bring domain insights, preliminary market research, paper sketches, or familiar open-source starter boilerplates. However, your sprint pitch deck, value proposition, and prototype features must be formulated or substantially built within the 24-hour sprint window.',
    highlight: 'Core build and pitch must be formulated during the sprint',
  },
  {
    id: 'what-to-bring',
    question: 'What should our squad bring to the campus venue?',
    category: 'logistics',
    categoryLabel: 'Logistics & Stay',
    answer:
      'Squads should bring their personal laptops, chargers, extension boards, and physical college ID cards (mandatory for security check-in). If you are building physical hardware, bring your specialized microcontrollers, sensors, or developer kits (e.g. ESP32, Arduino, Raspberry Pi).',
    highlight: 'Laptops, chargers, college ID & any specialized hardware',
  },
  {
    id: 'stay-food',
    question: 'Will food, Wi-Fi, and overnight stay facilities be provided?',
    category: 'logistics',
    categoryLabel: 'Logistics & Stay',
    answer:
      'Yes. High-speed campus Wi-Fi, designated workspace power hubs, meals, tea/coffee, and overnight rest zones are fully arranged inside the College of Engineering Chengannur campus. Campus security and female rest quarters are operational 24/7 throughout the sprint.',
    highlight: '24/7 meals, secure rest spaces & continuous campus Wi-Fi',
  },
  {
    id: 'mentorship',
    question: 'How does the on-site mentorship and review process work?',
    category: 'prizes',
    categoryLabel: 'Prizes & Mentors',
    answer:
      'Throughout the 24 hours, teams participate in structured 1-on-1 review checkpoints with startup founders, technical architects, and CEC alumni. Mentors stress-test your market assumptions, business models, and presentation flow before final judging.',
    highlight: 'Scheduled 1-on-1 checkpoints with experienced founders',
  },
  {
    id: 'rewards',
    question: 'What are the incentives, cash prizes, and incubation pathways?',
    category: 'prizes',
    categoryLabel: 'Prizes & Mentors',
    answer:
      'Top-performing teams receive cash prizes, prototype development grants, direct incubation support through IEDC BOOTCAMP CEC, maker lab access, and priority recommendations for Kerala Startup Mission (KSUM) grant schemes.',
    highlight: 'Cash awards, prototype grants & direct IEDC incubation',
  },
]

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id ?? null)
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedEmail, setCopiedEmail] = useState(false)

  const toggleItem = (id: string) => {
    sound.playKeyClack()
    setOpenId((prev) => (prev === id ? null : id))
  }

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText(EVENT_CONFIG.contact.email)
      .then(() => {
        setCopiedEmail(true)
        setTimeout(() => setCopiedEmail(false), 2000)
      })
      .catch(() => {})
  }

  // Filter FAQs based on active category and search query
  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory =
        activeCategory === 'all' || faq.category === activeCategory

      if (!matchesCategory) return false

      if (!searchQuery.trim()) return true

      const q = searchQuery.toLowerCase().trim()
      return (
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.categoryLabel.toLowerCase().includes(q) ||
        faq.highlight.toLowerCase().includes(q)
      )
    })
  }, [activeCategory, searchQuery])

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<FAQCategory, number> = {
      all: FAQS.length,
      participation: 0,
      rules: 0,
      logistics: 0,
      prizes: 0,
    }
    FAQS.forEach((faq) => {
      counts[faq.category] += 1
    })
    return counts
  }, [])

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="py-16 sm:py-24 lg:py-32 relative border-b border-[#59d6e8]/15 bg-[#07101f] overflow-hidden"
    >
      {/* Background Subtle Ambient Glows */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[400px] bg-[#59d6e8]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[350px] bg-[#ffc928]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default">
        {/* Main 2-Column Responsive Layout */}
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14 relative z-10">
          {/* ── Left Column: Section Header & Quick Support Card (Sticky on desktop) ── */}
          <div className="w-full lg:w-[380px] shrink-0 lg:sticky lg:top-28 space-y-6">
            {/* Header Content */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                Everything You Need to Know.
              </h2>

              <p className="text-sm text-slate-400 leading-relaxed">
                Got questions about IDEA SPRINT 2026? Find quick answers regarding eligibility, evaluation criteria, hardware benches, and campus stay.
              </p>
            </div>

            {/* Search Input Bar */}
            <div className="relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions or topics..."
                  className="w-full bg-[#0a162b] border border-slate-800 text-white text-sm pl-10 pr-9 py-2.5 rounded-xl placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 transition-all hover:border-slate-700"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Category Navigation */}
            <div className="hidden lg:flex flex-col gap-1.5 p-1.5 bg-[#0a1527] border border-slate-800/80 rounded-2xl">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id
                const count = categoryCounts[cat.id]

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      sound.playKeyClack()
                      setActiveCategory(cat.id)
                    }}
                    className={`relative w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                      isActive ? 'text-slate-950 font-semibold' : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFaqCategory"
                        className="absolute inset-0 bg-amber-400 rounded-xl"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                    <span
                      className={`relative z-10 text-[11px] px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-slate-950/15 text-slate-950 font-bold'
                          : 'bg-white/5 text-slate-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Support / Contact Card */}
            <div className="p-5 bg-gradient-to-br from-[#0c182d] to-[#071120] border border-slate-800/90 rounded-2xl space-y-3.5 shadow-xl shadow-black/20">
              <div className="flex items-center gap-2.5 text-white">
                <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400">
                  <MessageCircleQuestion className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Still have questions?</h4>
                  <p className="text-[11px] text-slate-400">We are here to help your team.</p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Reach out to the student organizing team at IEDC Bootcamp CEC for quick assistance.
              </p>

              <div className="pt-1 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 transition-colors cursor-pointer group"
                >
                  <span className="inline-flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{EVENT_CONFIG.contact.email}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 group-hover:text-white shrink-0 ml-2">
                    {copiedEmail ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Copied
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Copy className="w-3 h-3" /> Copy
                      </span>
                    )}
                  </span>
                </button>

                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-[#59d6e8] shrink-0" />
                  <span className="truncate">CE Chengannur, Kerala</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Categories Pills (Mobile) + Accordion Items ── */}
          <div className="flex-1 min-w-0 w-full space-y-4">
            {/* Mobile Category Horizontal Scroll Bar */}
            <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-2 -mx-1 px-1">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id
                const count = categoryCounts[cat.id]

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      sound.playKeyClack()
                      setActiveCategory(cat.id)
                    }}
                    className={`relative whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 font-semibold'
                        : 'bg-[#0a1527] border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-slate-950/15 text-slate-950 font-bold'
                          : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Search Match Counter if Query is Active */}
            {searchQuery && (
              <div className="flex items-center justify-between px-1 text-xs text-slate-400">
                <span>
                  Showing {filteredFaqs.length} of {FAQS.length} questions
                </span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-amber-400 hover:underline cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* Accordion Cards List */}
            <div className="space-y-3">
              <AnimatePresence mode="wait">
                {filteredFaqs.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-8 sm:p-12 text-center rounded-2xl bg-[#0a1527] border border-slate-800 space-y-3"
                  >
                    <div className="w-12 h-12 mx-auto rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400">
                      <Search className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-semibold text-white">No questions found</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      No questions matched &ldquo;{searchQuery}&rdquo;. Try another keyword or reach out directly to team IEDC.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Clear search
                    </button>
                  </motion.div>
                ) : (
                  filteredFaqs.map((faq, index) => {
                    const isOpen = openId === faq.id

                    return (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                          isOpen
                            ? 'bg-[#0e1d35] border-amber-400/40 shadow-xl shadow-black/30'
                            : 'bg-[#091426]/75 border-slate-800/90 hover:border-slate-700/80 hover:bg-[#0b172a]'
                        }`}
                      >
                        {/* Header Accordion Button */}
                        <button
                          type="button"
                          onClick={() => toggleItem(faq.id)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${faq.id}`}
                          className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07101f]"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pr-3 min-w-0">
                            <span className="self-start sm:self-auto text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400 shrink-0 font-medium">
                              {faq.categoryLabel}
                            </span>
                            <h3
                              className={`font-sans font-semibold text-sm sm:text-base tracking-tight transition-colors ${
                                isOpen ? 'text-white' : 'text-slate-200 group-hover:text-white'
                              }`}
                            >
                              {faq.question}
                            </h3>
                          </div>

                          {/* Plus/Minus Rotating Icon Pill */}
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                              isOpen
                                ? 'bg-amber-400 text-slate-950 shadow-[0_0_12px_rgba(255,201,40,0.3)]'
                                : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white'
                            }`}
                          >
                            <motion.div
                              animate={{ rotate: isOpen ? 45 : 0 }}
                              transition={{ duration: 0.2, ease: 'easeOut' }}
                            >
                              <Plus className="w-4 h-4" />
                            </motion.div>
                          </div>
                        </button>

                        {/* Expandable Answer Disclosure */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`faq-answer-${faq.id}`}
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 space-y-3.5 border-t border-white/5 text-left">
                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                                  {faq.answer}
                                </p>

                                {/* Highlight Tag */}
                                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/20 text-[11px] text-amber-300 font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                                  <span>{faq.highlight}</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Footer Tip Strip */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 px-1">
              <span>Have an urgent question regarding teams or equipment?</span>
              <a
                href={`mailto:${EVENT_CONFIG.contact.email}`}
                className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors"
              >
                <span>Write to {EVENT_CONFIG.contact.email}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default FAQ