"use client"

import { contactDevice, contactPsync, contactShared } from '@/app/data'
import { IoSearchCircleOutline } from 'react-icons/io5'

import { Calendar } from 'lucide-react'
import EventContact from './EventContact'
import { Button } from '@/components/ui/button'
import { Sheet,  SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import ContainerAddContent from './ContainerAddContent'
import ContactList from './ContactList'
import ContactDynamism from './ContactDynamism';
import useContactSearch from '@/hooks/useContactSearch'




function ContactContent() { 

  const {setSearchQuery,searchQuery,filteredContacts} = useContactSearch()
  return (
    <div className='flex w-full h-auto font-dmMono bg-wineTexture  '>
        <div className='flex-[20%] border-r border-black bg-wineTexture p-3'>
            <div className='text-zinc-800 mb-5'>
                <h1>Displayed contacts-{filteredContacts.length}</h1>
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
        </div>

        <div className='flex-[60%]'>
            <div className='flex flex-row gap-5'>
                <ContactDynamism/>
            <div className='flex-[50%] border border-t-0 border-b-0 h-auto border-black'>
                <div className='m-3'>
                <div className='flex flex-row items-center justify-between text-zinc-800 mb-5'>
                    <h1 className='text-[18px]'>Schedule events</h1>
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