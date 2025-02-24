import { eventGroup } from '@/app/data'
import React from 'react'
import GroupCard from './GroupCard'

function RecentlyAdded() {
    return (
        <div className='w-96 p-5 bg-softBlend'>
            <div>
                <h1 className='font-bowlby text-2xl mb-3'>Pay bills</h1>
            </div>
    
            <div className='space-y-5 grid place-content-center'>
                {eventGroup.map((item, index)=>(
                    <GroupCard key={index} data={item} index={index}/>
                ))}
            </div>
        </div>
      )
}

export default RecentlyAdded