import React from 'react'

import { contactNumbers } from '@/app/data'
import ContactData from './ContactData'
import ItemPageSelector from '@/components/content/ItemPageSelector'
import { Button } from '@/components/ui/button'
import { usePaginationContext } from '@/app/context/PaginationContext'
import UnavailableData from '@/components/unavailable/UnavailableData'

function ContactList() {

  const {setCurrentPage, setItemsPerPage,currentPage, itemsPerPage} = usePaginationContext()
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil( contactNumbers.length / itemsPerPage);
  const currentItems = contactNumbers.slice(startIndex, endIndex)

  if(contactNumbers.length === 0){
    return(
      <div>
        <UnavailableData 
        title="You dont have a contact" 
        description="Add contact to see your data please!!!"
         image="/images/contact-book.png"
         />
      </div>
    )
  }

  return (
    <div>
           <ItemPageSelector className='text-zinc-800  place-self-center'/>

          {currentItems.map((data,index)=>(
           <ContactData data={data} key={index}/>
           ))}

      <div className="flex items-center text-[12px] justify-center gap-3 text-zinc-800">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default ContactList