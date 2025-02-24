import React from 'react'

import Extent from './Extent'
import NewLead from './NewLead'
import RecentlyAdded from './RecentlyAdded'

function Groups() {
  return (
    <div className='text-zinc-800 h-auto py-3'>
        <div className='pb-5'>
            <h1 className='font-bowlby text-3xl'>Group Contact</h1>
            <p className='font-dmMono'>List of People or organizations for communication</p>
        </div>

        <div className='grid grid-cols-3'>
           <Extent/>
           <NewLead/>
           <RecentlyAdded/>
        </div>
    </div>
  )
}

export default Groups