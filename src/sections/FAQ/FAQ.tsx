import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus, Sparkles } from 'lucide-react'
import { Container } from '@/components/common/Container'

export interface FAQItem {
  readonly id: string
  readonly question: string
  readonly answer: string
  readonly categoryLabel: string
  readonly highlight: string
}

const FAQS: readonly FAQItem[] = [
  {
    id: 'eligibility',
    question: 'Who is eligible to participate in IDEA SPRINT 2026?',
    categoryLabel: 'Participation',
    answer:
      'Any undergraduate or postgraduate student currently enrolled in an accredited college or university is eligible. Squads must consist of 2 to 4 members. Inter-disciplinary teams combining engineering, design, and business domains are strongly encouraged.',
    highlight: 'Enrolled college students · 2 to 4 members per team',
  },
  {
    id: 'cross-college',
    question: 'Can team members be from different colleges or branches?',
    categoryLabel: 'Participation',
    answer:
      'Yes, absolutely. There are no restrictions requiring all squad members to be from the same college, department, or academic year. You can freely collaborate with friends from other institutions and complementary branches.',
    highlight: 'Cross-college & cross-department teams welcome',
  },
  {
    id: 'fee',
    question: 'Is there any registration fee or hidden cost?',
    categoryLabel: 'Participation',
    answer:
      'Zero. IDEA SPRINT 2026 is completely free of charge. Selected teams receive complimentary access to dedicated hardware workstations, high-speed Wi-Fi, mentorship checkpoints, refreshments, and sprint passes provided by IEDC BOOTCAMP CEC.',
    highlight: '100% Free · Meals, benches & pass included',
  },
  {
    id: 'prototype',
    question: 'Do we need a working prototype or just an idea?',
    categoryLabel: 'Rules & Ideas',
    answer:
      'IDEA SPRINT focuses on rapid validation, problem-solution fit, and venture viability. While having a functional software prototype or breadboard hardware proof-of-concept gives your team a major edge, the evaluation rubric places immense value on problem identification, user validation, and defensible feasibility.',
    highlight: 'Scored on problem clarity, user validation & proof-of-concept',
  },
  {
    id: 'prior-work',
    question: 'Can we build upon an existing project or codebase?',
    categoryLabel: 'Rules & Ideas',
    answer:
      'You are welcome to bring domain insights, preliminary market research, paper sketches, or familiar open-source starter boilerplates. However, your sprint pitch deck, value proposition, and prototype features must be formulated or substantially built within the 24-hour sprint window.',
    highlight: 'Core build and pitch must be formulated during the sprint',
  },
  {
    id: 'what-to-bring',
    question: 'What should our squad bring to the campus venue?',
    categoryLabel: 'Logistics & Stay',
    answer:
      'Squads should bring their personal laptops, chargers, extension boards, and physical college ID cards (mandatory for security check-in). If you are building physical hardware, bring your specialized microcontrollers, sensors, or developer kits (e.g. ESP32, Arduino, Raspberry Pi).',
    highlight: 'Laptops, chargers, college ID & any specialized hardware',
  },
  {
    id: 'stay-food',
    question: 'Will food, Wi-Fi, and overnight stay facilities be provided?',
    categoryLabel: 'Logistics & Stay',
    answer:
      'Yes. High-speed campus Wi-Fi, designated workspace power hubs, meals, tea/coffee, and overnight rest zones are fully arranged inside the College of Engineering Chengannur campus. Campus security and female rest quarters are operational 24/7 throughout the sprint.',
    highlight: '24/7 meals, secure rest spaces & continuous campus Wi-Fi',
  },
  {
    id: 'mentorship',
    question: 'How does the on-site mentorship and review process work?',
    categoryLabel: 'Prizes & Mentors',
    answer:
      'Throughout the 24 hours, teams participate in structured 1-on-1 review checkpoints with startup founders, technical architects, and CEC alumni. Mentors stress-test your market assumptions, business models, and presentation flow before final judging.',
    highlight: 'Scheduled 1-on-1 checkpoints with experienced founders',
  },
  {
    id: 'rewards',
    question: 'What are the incentives, cash prizes, and incubation pathways?',
    categoryLabel: 'Prizes & Mentors',
    answer:
      'Top-performing teams receive cash prizes, prototype development grants, direct incubation support through IEDC BOOTCAMP CEC, maker lab access, and priority recommendations for Kerala Startup Mission (KSUM) grant schemes.',
    highlight: 'Cash awards, prototype grants & direct IEDC incubation',
  },
]

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id ?? null)

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="py-16 sm:py-24 lg:py-32 relative border-b border-[#59d6e8]/15 bg-[#07101f]"
    >
      {/* Background Subtle Ambient Glows */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[400px] bg-[#59d6e8]/5 rounded-full blur-3xl pointer-events-none transform-gpu"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[350px] bg-[#ffc928]/5 rounded-full blur-3xl pointer-events-none transform-gpu"
        aria-hidden="true"
      />

      <Container size="default">
        {/* 2-Column Split: Header on Left (Desktop), FAQ Cards on Right */}
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16 relative z-10">
          {/* ── Left Column: Section Heading (Pinned constant in viewport while questions scroll) ── */}
          <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 lg:sticky lg:top-28 xl:top-32 self-start space-y-4 text-left transform-gpu will-change-transform">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Everything You Need to Know.
            </h2>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Got questions about IDEA SPRINT 2026? Find quick answers regarding eligibility, evaluation criteria, hardware benches, and campus stay.
            </p>
          </div>

          {/* ── Right Column: FAQ Accordion Cards ── */}
          <div className="flex-1 min-w-0 w-full space-y-3.5">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
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
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Plus className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </button>

                  {/* Buttery Smooth Expandable Answer Disclosure */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 space-y-3.5 border-t border-white/5 text-left">
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                            {faq.answer}
                          </p>

                          {/* Highlight Takeaway Tag */}
                          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/20 text-[11px] text-amber-300 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                            <span>{faq.highlight}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default FAQ