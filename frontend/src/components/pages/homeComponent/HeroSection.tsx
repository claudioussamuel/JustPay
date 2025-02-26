import { Heading } from '@/components/shared/Heading'
import React from 'react'
import { PayText, JustText } from './AnimateText'
import BaseDescription from './BaseDescription'


function HeroSection() {
  return (
    <div 
    className='relative bg-softBlend   overflow-hidden text-white '>
        <div className='mx-5 md:mx-10 border-t-0 border-l border-r border-zinc-800'>
        <Heading className='font-bowlby pb-3 lg:pb-20 text-3xl max-w-5xl text-center md:place-self-center md:text-5xl lg:text-7xl py-10 ' as='h1'>
             Pay everythng with ease and breeze
        </Heading>

        <div className=' flex flex-col lg:flex-row p-5 pb-10'>
          <div className='hidden md:block lg:w-[50%] space-y-20 md:space-y-10'>
             <JustText/>
             <PayText/>
          </div>

          <div className='mt-0 md:mt-10 lg:w-[50%]'>
             <BaseDescription/>
          </div>

        </div>

        </div>
    </div>

  )
}

export default HeroSection