"use client";

import Header from '@/components/layouts/Header';
import HeroSection from './HeroSection';
import HugeText from './HugeText';
import Explore from './Explore';
import { Footer } from '@/components/layouts/Footer';
import ThreeSteps from './ThreeSteps';
import FrequentAskQuestion from './FrequentAskQuestion';
import RecommendationSection from './RecommendationSection';
import MeetTheTeam from './MeetTeam';
import MoveUp from '@/components/content/MoveUp';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function HomePage() {
  const pathname = usePathname(); 

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#three-steps') {
      setTimeout(() => {
        const element = document.getElementById('three-steps');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname]);

  return (
    <div className='h-auto relative'>
      <Header />
      <HeroSection />
      <HugeText />
      <Explore />
      <ThreeSteps />
      <FrequentAskQuestion />
      <RecommendationSection />
      <MeetTheTeam />
      <MoveUp />
      <Footer />
    </div>
  );
}

export default HomePage;
