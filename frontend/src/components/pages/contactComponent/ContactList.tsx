import React from 'react'

import ContactData from './ContactData'
import ItemPageSelector from '@/components/content/ItemPageSelector'
import { Button } from '@/components/ui/button'
import UnavailableData from '@/components/unavailable/UnavailableData'
import { usePagination } from '@/hooks/usePagination'
import { Contact } from '../../../../types/Context.types'

export interface ContactListProps{
  searchQuery: string;
  setSearchQuery: (query:string)=>void;
  filteredContacts:Contact[]
}

function ContactList({searchQuery,filteredContacts}: ContactListProps) {


  const {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    paginatedItems,
    totalPages
  } = usePagination({itemsPerPage:5, totalItems:filteredContacts.length})



  const currentItems = paginatedItems(filteredContacts)

  if(filteredContacts.length === 0){
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
           <ItemPageSelector 
           className='text-zinc-800  place-self-center'
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
           />

          {currentItems.map((data,index)=>(
           <ContactData 
             data={data} 
           key={index}
           isHighlighted={searchQuery.length > 0}
           />

           ))}

    <div className="flex items-center text-[12px] justify-center gap-3 text-zinc-800">
        <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>


    </div>
  )
}

export default ContactList