import Bounded from '@/components/shared/Bounded'
import { Heading } from '@/components/shared/Heading'
import React from 'react'
import AnimationText from './AnimateText'

function HeroSection() {
  return (
    <Bounded 
    className='relative  h-dvh border mx-10 border-t-0 border-b-0 overflow-hidden text-white'>
        <div className='absolute inset-0 
        mx-auto mt-24 grid max-w-6xl grid-rows-[1fr,auto]
        place-items-end px-6 ~py-10/16
        '>
        <Heading className='font-bowlby place-self-start text-7xl ' as='h1'>
             Pay everythng with ease and breeze
        </Heading>

        <div className='place-self-center py-10 pb-10'>
            <AnimationText/>
        </div>



        </div>
    </Bounded>
  )
}

export default HeroSection