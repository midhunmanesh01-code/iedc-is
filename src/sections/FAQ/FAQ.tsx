import React, { useState } from 'react'
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { EVENT_CONFIG } from '@/config/event'

interface FAQItem {
  readonly id: string
  readonly question: string
  readonly answer: string
  readonly category: string
}

const FAQS: readonly FAQItem[] = [
  {
    id: 'eligibility',
    question: 'Who is eligible to participate in IDEA SPRINT 2026?',
    category: 'ELIGIBILITY',
    answer:
      'Any undergraduate or postgraduate student currently enrolled in a recognized institution can participate. Squads consist of 2 to 4 members. Inter-disciplinary (e.g. CS + Mech + Design) and inter-collegiate teams are warmly encouraged.',
  },
  {
    id: 'fee',
    question: 'Is there any registration or entry fee?',
    category: 'LOGISTICS',
    answer:
      'No. Participation in IDEA SPRINT 2026 is completely free of charge. Workstations, mentor access, network connectivity, and event refreshments are fully provided by IEDC BOOTCAMP CEC.',
  },
  {
    id: 'prototype',
    question: 'Do we need a working prototype or just an idea?',
    category: 'EVALUATION',
    answer:
      'IDEA SPRINT is fundamentally an ideation, problem-validation, and venture-design sprint. While interactive software or hardware proof-of-concepts give you an edge, scoring strongly prioritizes defensible problem identification, user validation, and business feasibility.',
  },
  {
    id: 'prior-work',
    question: 'Can we build upon an existing idea or project?',
    category: 'RULES',
    answer:
      'You are welcome to bring domain insights, preliminary problem research, or concept sketches. However, all sprint pitch decks, value propositions, and prototype progress must be formulated or substantially accelerated during the 24-hour sprint window.',
  },
  {
    id: 'mentorship',
    question: 'What mentorship and support will be provided on-site?',
    category: 'RESOURCES',
    answer:
      'Teams will have scheduled review checkpoints with startup founders, technical architects, and domain experts. Mentors provide 1-on-1 critique to stress-test your market assumptions, business models, and pitch narrative.',
  },
  {
    id: 'rewards',
    question: 'What are the incentives, prizes, and post-sprint pathways?',
    category: 'INCENTIVES',
    answer:
      'Top-performing teams receive prototype grants, formal incubation pathways through IEDC BOOTCAMP CEC, access to maker facilities, and priority nominations for Kerala Startup Mission (KSUM) innovation pipelines.',
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
      className="py-16 sm:py-20 lg:py-28 relative border-b border-white/5 bg-[#0C0D0E]"
    >
      <Container size="default">
        <SectionHeading
          tag="04 // KNOWLEDGE PROTOCOL"
          title="Everything You Need to Know."
          subtitle="Answers to common questions regarding eligibility, evaluation rubrics, mentorship, and sprint logistics."
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id

            return (
              <div
                key={faq.id}
                className={`rounded-xs border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#131518] border-[#FF5500]/40 shadow-lg shadow-black/40'
                    : 'bg-[#131518]/60 border-white/10 hover:border-white/20 hover:bg-[#131518]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500]"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <span
                      className={`font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-xs border transition-colors ${
                        isOpen
                          ? 'bg-[#FF5500]/15 text-[#FF5500] border-[#FF5500]/30'
                          : 'bg-white/5 text-zinc-400 border-white/10'
                      }`}
                    >
                      {faq.category}
                    </span>
                    <h3 className="font-display font-semibold text-sm sm:text-base text-white">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`p-1.5 rounded-xs transition-transform duration-300 text-zinc-400 ${
                      isOpen ? 'rotate-180 text-[#FF5500]' : 'text-zinc-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <div
                  id={`faq-answer-${faq.id}`}
                  className={`grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-5 sm:px-5 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Support Help Strip */}
        <div className="mt-10 max-w-3xl mx-auto p-4 bg-[#131518]/70 border border-white/10 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-zinc-300">
            <HelpCircle className="w-4 h-4 text-[#FF5500] shrink-0" />
            <span>Have a specific question not covered here?</span>
          </div>
          <a
            href={`mailto:${EVENT_CONFIG.contact.email}`}
            className="font-mono text-xs text-[#FF5500] hover:text-[#FF6B1A] hover:underline flex items-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Ask Team IEDC CEC
          </a>
        </div>
      </Container>
    </section>
  )
}
