import { eventsData } from '@/app/data'
import ContactDescriptionEvents from '@/components/content/ContactDescriptionEvents'
import React from 'react'

function EventContact() {
  return (
    <div className='space-y-5'>
        {eventsData.map((event,index)=>( 
            <ContactDescriptionEvents key={index} {...event}/>
        ))}
    </div>
  )
}

export default EventContact