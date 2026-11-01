import React from 'react'
import { Users2, CheckSquare, HelpCircle, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { RegistrationForm } from './RegistrationForm'
import { Card } from '@/components/ui/Card'
import { EVENT_CONFIG } from '@/config/event'

export const Registration: React.FC = () => {
  return (
    <section
      id="register"
      aria-label="Event Registration"
      className="py-16 sm:py-20 lg:py-28 relative border-b border-white/5 bg-[#0C0D0E]"
    >
      <Container size="default">
        <SectionHeading
          tag="05 // APPLICATION TERMINAL"
          title="Secure Your Squad's Slot."
          subtitle="Registrations for IDEA SPRINT 2026 are evaluated on team composition and initial innovation intent. Complete the verified client application below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Component */}
          <div className="lg:col-span-8">
            <RegistrationForm />
          </div>

          {/* Guidelines & Registration Intel Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <Card withCrosshairs>
              <div className="flex items-center gap-2 mb-3">
                <Users2 className="w-4 h-4 text-sky-400" />
                <h4 className="font-display font-bold text-white text-base">
                  Squad Eligibility
                </h4>
              </div>
              <ul className="text-xs text-zinc-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF5500] font-bold">•</span>
                  <span>Teams of 2 to 4 registered undergraduate or postgraduate students.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF5500] font-bold">•</span>
                  <span>Inter-departmental and inter-collegiate teams are encouraged.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF5500] font-bold">•</span>
                  <span>Every team member must carry their valid student identity card to the arena.</span>
                </li>
              </ul>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-3">
                <CheckSquare className="w-4 h-4 text-amber-400" />
                <h4 className="font-display font-bold text-white text-base">
                  What Happens Next?
                </h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Upon submitting the preliminary application, shortlisted team leads will receive an official verification dispatch and workstation allocation number before the sprint date.
              </p>
            </Card>

            <div className="p-4 bg-[#131518] border border-white/10 rounded-xs flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-zinc-400">
                <span className="text-white font-medium block mb-0.5">Need Assistance?</span>
                Reach out to the IEDC CEC coordination team at{' '}
                <a
                  href={`mailto:${EVENT_CONFIG.contact.email}`}
                  className="text-[#FF5500] hover:underline"
                >
                  {EVENT_CONFIG.contact.email}
                </a>
              </div>
            </div>

            <div className="p-3 bg-white/[0.02] border border-dashed border-white/10 rounded-xs text-center font-mono text-[11px] text-zinc-500">
              <HelpCircle className="w-3.5 h-3.5 inline mr-1 text-zinc-400" />
              No registration fee required for the ideathon
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
