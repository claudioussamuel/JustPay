import { useSelectedContactContext } from '@/app/context/SelectContext'
import { eventsData } from '@/app/data'
import ContactDescriptionEvents from '@/components/content/ContactDescriptionEvents'
import React from 'react'


function EventContact() {
  return (
    <div className='space-y-5'>
            <ContactDescriptionEvents />
      
    </div>
  )
}

export default EventContact