import { addNewContacts } from '@/app/data'
import AddToContactList from '@/components/content/AddToContactList'
import React from 'react'


function ContainerAddContent() {
  return (
    <div className='space-y-10 mt-5'>
        {addNewContacts.map((data,index)=>(
            <AddToContactList key={index} data={data}/>
        ))}
    </div>
  )
}

export default ContainerAddContent