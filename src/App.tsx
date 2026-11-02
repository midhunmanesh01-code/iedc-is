import React from 'react'
import { PageLayout } from '@/components/layout/PageLayout'
import { Preloader } from '@/components/common/Preloader'
import { Hero } from '@/sections/Hero'
import { CountdownSection } from '@/sections/Countdown'
import { About } from '@/sections/About'
import { Schedule } from '@/sections/Schedule'
import { IdeaForge } from '@/sections/Interactive'
import { FAQ } from '@/sections/FAQ'
import { Registration } from '@/sections/Registration'

export const App: React.FC = () => {
  return (
    <>
      <Preloader />
      <PageLayout>
        <Hero />
        <CountdownSection />
        <About />
        <Schedule />
        <IdeaForge />
        <FAQ />
        <Registration />
      </PageLayout>
    </>
  )
}

export default App
