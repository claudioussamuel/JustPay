"use client"

import { IoSearchCircleOutline } from 'react-icons/io5'

import { Calendar } from 'lucide-react'
import EventContact from './EventContact'
import { Button } from '@/components/ui/button'
import { Sheet,  SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import ContainerAddContent from './ContainerAddContent'
import ContactList from './ContactList'
import ContactDynamism from './ContactDynamism';
import useContactSearch from '@/hooks/useContactSearch'
import { useSelectedContactContext } from '@/app/context/SelectContext'





function ContactContent() { 

  const {setSearchQuery,searchQuery,filteredContacts} = useContactSearch()
  const {selectedContact} = useSelectedContactContext()

  return (
    <div className='flex flex-col lg:flex-row w-full h-auto font-dmMono bg-wineTexture overflow-x-hidden '>

        <div className='flex-[20%] border-r border-black bg-wineTexture p-3'>
            <div className='text-zinc-800 mb-5'>
                <h1 className='text-center mb-3'>Displayed contacts- <span className="font-bowlby text-3xl"> {filteredContacts.length}</span></h1>
                <div className='mx-10 flex justify-center border gap-5 items-center p-2 border-zinc-800 rounded-md'>
                    <IoSearchCircleOutline className='text-2xl'/>
                    <input 
                    className='outline-none
                     bg-transparent
                      placeholder:text-zinc-800'
                       type="text" placeholder="Search"
                       value={searchQuery}
                       onChange={(e)=>setSearchQuery(e.target.value)}
                       />
                </div>
            </div>

            <div>
                <ContactList
                 searchQuery ={searchQuery}
                 setSearchQuery={setSearchQuery}
                 filteredContacts = {filteredContacts}
                />
            </div>
            
            <div className='place-self-center mt-20 mx-3 mb-5'>
                    <Sheet>
                    <SheetTrigger asChild>
                        <Button className='bg-softBlend'>Add new contact</Button>  
                    </SheetTrigger>
                    <SheetContent className='text-zinc-800'>
                      <SheetHeader>
                      <SheetTitle>Friend zone</SheetTitle>
                         <SheetDescription>Add new numbers to contact list </SheetDescription>
                        </SheetHeader>


                      <div>
                         <ContainerAddContent />
                         </div>
                        </SheetContent>
                     </Sheet>
                </div>

        </div>

        <div className='flex-[80%]'>
            <div className='flex flex-col md:flex-row gap-5'>

                <div className='flex-[50%]'>
                <ContactDynamism id={filteredContacts.indexOf(selectedContact!).toString()}/>
                </div>


            <div className='flex-[50%] border border-t-0 border-b-0 h-auto border-black'>
                <div className='m-3'>
                <div className='flex flex-row items-center justify-between text-zinc-800 mb-5'>
                    <h1 className='text-[18px]'>Individual History</h1>
                    <Calendar/>
                </div>
                <EventContact/>
            </div>

            </div>   

            </div>

        </div>


    </div>
  )
}

export default ContactContent