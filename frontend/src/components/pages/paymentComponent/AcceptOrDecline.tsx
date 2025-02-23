import { eventGroup } from '@/app/data'
import React from 'react'
import GroupCard from '../groupComponent/GroupCard'
import UnavailableData from '@/components/unavailable/UnavailableData'

function AcceptOrDecline() {
  if(eventGroup.length===0){
    return(
      <UnavailableData title="Nothings to accept or decline"
      description="For the mean time we have nothing to acess"
      image="/images/yes.png"
      />
    )
  }
  return (
    <div className='grid place-content-center'>
        <div className='space-y-5 grid grid-cols-3 gap-10'>
            {eventGroup.map((item, index)=>(
                <GroupCard key={index} data={item}/>
            ))}
        </div>
    </div>
  )
}

export default AcceptOrDecline