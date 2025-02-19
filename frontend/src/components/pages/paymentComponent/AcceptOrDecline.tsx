import { eventGroup } from '@/app/data'
import React from 'react'
import GroupCard from '../groupComponent/GroupCard'

function AcceptOrDecline() {
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