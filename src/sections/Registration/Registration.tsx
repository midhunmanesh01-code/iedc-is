import React from 'react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { RegistrationForm } from './RegistrationForm'

export const Registration: React.FC = () => {
  return (
    <section
      id="register"
      aria-label="Event Registration"
      className="py-12 sm:py-16 lg:py-20 relative border-b border-[#59d6e8]/15 bg-[#030914] overflow-hidden"
    >
      {/* Background blueprint subtle scanlines */}
      <div
        className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle ambient glow behind the section */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#59d6e8]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default">
        {/* Section Heading */}
        <SectionHeading
          tag="REGISTRATION"
          title="Claim Your Squad Ticket"
          subtitle="Join IDEA SPRINT 2026. 24 hours of rapid prototyping, dedicated hardware benches, and zero registration fee at College of Engineering Chengannur."
          align="center"
          className="mb-6 sm:mb-8"
        />

        {/* Interactive Form with Live Ticket Pass */}
        <RegistrationForm />
      </Container>
    </section>
  )
}

export default Registration
