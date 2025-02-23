import { Heading } from '@/components/shared/Heading'
import React from 'react'
import { PayText, JustText } from './AnimateText'
import BaseDescription from './BaseDescription'


function HeroSection() {
  return (
    <div 
    className='relative bg-softBlend   overflow-hidden text-white '>
        <div className='mx-10 border-t-0 border-l border-r border-zinc-800'>
        <Heading className='font-bowlby lg:pb-20 max-w-5xl place-self-center text-7xl py-10 ' as='h1'>
             Pay everythng with ease and breeze
        </Heading>

        <div className=' flex flex-col lg:flex-row p-5 pb-10'>
          <div className='w-[50%] space-y-20'>
             <JustText/>
             <PayText/>
          </div>

          <div className='w-[50%]'>
             <BaseDescription/>
          </div>

        </div>

        </div>
    </div>

  )
}

export default HeroSection