"use client"

import { addNewContacts, contactDevice, contactPsync, contactShared } from '@/app/data'
import React, { useState } from 'react'
import { IoSearchCircleOutline } from 'react-icons/io5'

import { Calendar } from 'lucide-react'
import EventContact from './EventContact'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sheet,  SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import ContainerAddContent from './ContainerAddContent'
import ContactList from './ContactList'
import ContactDynamism from './ContactDynamism';
import useContactSearch from '@/hooks/useContactSearch'




function ContactContent() { 

  const {setSearchQuery,searchQuery,filteredContacts} = useContactSearch()
  return (
    <div className='flex w-full h-auto font-dmMono bg-wineTexture  '>
        <div className='flex-[20%] border-r border-black bg-wineTexture gap-5'>
            <div className='grid grid-cols-1 text-zinc-800'>
                <div>
                    <h1 className='text-center py-3 text-2xl capitalize underline'>On this device</h1>

                    <div className='mx-3 space-y-3'>
                        {contactDevice.map((item,key)=>(
                            <div key={key} className='flex justify-between'>
                                <div>
                                    <h1>{item.title}</h1>
                                </div>
                                <div className='bg-zinc-800 p-1 w-5 h-5 rounded-[50%]'>
                                    <h1 className='text-white place-self-center text-[10px]'>{item.number}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='border border-t border-zinc-800 border-r-0 border-l-0 border-b-0'>
                    <h1>Psync Access</h1>
                    <div className='mx-3 space-y-3'>
                        {contactShared.map((item,key)=>(
                            <div key={key} className='flex justify-between'>
                                <div>
                                    <h1>{item.title}</h1>
                                </div>
                                <div className='bg-zinc-800 p-1 w-5 h-5 rounded-[50%]'>
                                    <h1 className='text-white place-self-center text-[10px]'>{item.number}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='border border-t border-zinc-800 border-r-0 border-l-0'>
                    <h1>Chromium</h1>
                    <div className='mx-3 space-y-3'>
                        {contactPsync.map((item,key)=>(
                            <div key={key} className='flex justify-between'>
                                <div>
                                    <h1>{item.title}</h1>
                                </div>
                                <div className='bg-zinc-800 p-1 w-5 h-5 rounded-[50%]'>
                                    <h1 className='text-white place-self-center text-[10px]'>{item.number}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='place-content-end mt-20 mx-3 mb-5'>
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
        </div>

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