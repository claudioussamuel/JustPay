import React from 'react'

import { Heading } from '../../shared/Heading'
import FrequentAskQuestionCard from '../../content/FrequentAskQuestionCard'
import { faqs } from '@/app/data'

function FrequentAskQuestion() {
  return (
    <div className='bg-softBlend '>
      <div className='mx-5 md:mx-10  border-zinc-800 border-l border-r border-t-0'>
        <Heading className='font-bowlby mb-10 pt-10 text-4xl text-center md:text-7xl items-center text-white'>
          <span className='font-dmMono italic '>(</span>faq&apos;s<span className='font-dmMono italic'>)</span>
        </Heading>

        <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20 lg:pb-20 mx-10'>
          {faqs.map(({question,hovered},index)=>(
            <FrequentAskQuestionCard 
             question={question} 
             hovered={hovered}
             key={index}
            
             />
          ))}
          </div>
        </div>
    </div>
  )
}

export default FrequentAskQuestion