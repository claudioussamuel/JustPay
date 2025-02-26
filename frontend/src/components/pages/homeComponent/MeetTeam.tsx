import React from 'react'

import { Heading } from '../../shared/Heading'
import { teamMembers } from '@/app/data'
import TeamCard from '@/components/content/TeamCard'


function MeetTheTeam() {
  return (
    <div className=' bg-softBlend '>
      <div className='mx-10 border border-zinc-800 border-t-0 border-left border-r'>
      <Heading className='text-center ~mb-5/8 text-white pt-10 text-3xl md:text-5xl pb-10'>Meet the team</Heading>

        <div className=' flex flex-col md:flex-row justify-between gap-10 pb-10 space-y-5 md:space-y-0'>
            {teamMembers.map((data,index)=>(
              <TeamCard key={index} data={data}/>
            ))}
        </div>
        </div>
        
    </div>
  )
}

export default MeetTheTeam