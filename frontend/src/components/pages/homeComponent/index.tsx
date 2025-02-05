import Header from '@/components/layouts/Header'
import React from 'react'
import HeroSection from './HeroSection'
import HugeText from './HugeText'
import Explore from './Explore'
import { Footer } from '@/components/layouts/Footer'
import ThreeSteps from './ThreeSteps'
import FrequentAskQuestion from './FrequentAskQuestion'
import RecommendationSection from './RecommendationSection'
import MeetTheTeam from './MeetTeam'
import MoveUp from '@/components/content/MoveUp'

function HomePage() {
  return (
    <div className='h-auto relative'>
       <Header/>
       <HeroSection/>
       <HugeText/>
       <Explore/>
       <ThreeSteps/>
       <FrequentAskQuestion/>
       <RecommendationSection/>
       <MeetTheTeam/>
       <MoveUp/>
       <Footer/>
    </div>
  )
}

export default HomePage