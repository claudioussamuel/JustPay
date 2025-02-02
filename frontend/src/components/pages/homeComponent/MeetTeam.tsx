import React from 'react'


import Bounded from '../../shared/Bounded'
import { Heading } from '../../shared/Heading'
import { teamMembers } from '@/app/data'
import TeamCard from '@/components/content/TeamCard'


function MeetTheTeam() {
  return (
    <Bounded className='border'>
      <Heading className='text-center ~mb-5/8 text-white pt-10 text-5xl pb-10'>Meet the team</Heading>

        <div className='flex flex-row justify-between gap-10 pb-10 '>
            {teamMembers.map((data,index)=>(
                <TeamCard key={index} data={data}/>
            ))}
        </div>
        
    </Bounded>
  )
}

export default MeetTheTeam