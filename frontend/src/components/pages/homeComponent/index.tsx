import Header from '@/components/layouts/Header'
import React from 'react'
import HeroSection from './HeroSection'
import HugeText from './HugeText'
import BaseDescription from './BaseDescription'
import Explore from './Explore'
import { Footer } from '@/components/layouts/Footer'
import ThreeSteps from './ThreeSteps'
import FrequentAskQuestion from './FrequentAskQuestion'
import RecommendationSection from './RecommendationSection'
import MeetTheTeam from './MeetTeam'

function HomePage() {
  return (
    <div className='bg-brand-base-color  h-auto'>
       <Header/>
       <HeroSection/>
       <BaseDescription/>
       <HugeText/>
       <Explore/>
       <ThreeSteps/>
       <FrequentAskQuestion/>
       <RecommendationSection/>
       <MeetTheTeam/>
       <Footer/>
    </div>
  )
}

export default HomePage