import React from 'react'
import { PageLayout } from '@/components/layout/PageLayout'
import { Preloader } from '@/components/common/Preloader'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Schedule } from '@/sections/Schedule'
import { IdeaForge } from '@/sections/Interactive'
import { Registration } from '@/sections/Registration'

export const App: React.FC = () => {
  return (
    <>
      <Preloader />
      <PageLayout>
        <Hero />
        <About />
        <Schedule />
        <IdeaForge />
        <Registration />
      </PageLayout>
    </>
  )
}

export default App
