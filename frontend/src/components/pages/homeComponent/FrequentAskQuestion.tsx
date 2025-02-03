import React from 'react'

import { Heading } from '../../shared/Heading'
import Bounded from '../../shared/Bounded'
import FrequentAskQuestionCard from '../../content/FrequentAskQuestionCard'
import { faqs } from '@/app/data'

function FrequentAskQuestion() {
  return (
    <div className='bg-softBlend'>
      <div className='mx-10  border-zinc-800 border-l border-r border-t-0'>
        <Heading className='font-bowlby mb-10 pt-10 text-center text-7xl items-center text-white'>
          <span className='font-dmMono italic '>(</span>faq&apos;s<span className='font-dmMono italic'>)</span>
        </Heading>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:pb-20 mx-20'>
          {faqs.map(({question,hovered,touched},index)=>(
            <FrequentAskQuestionCard  question={question} hovered={hovered} touched={touched} key={index}/>
          ))}
          </div>
        </div>
    </div>
  )
}

export default FrequentAskQuestion