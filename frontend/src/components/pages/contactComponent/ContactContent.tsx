"use client"

import { contactDevice, contactNumbers, contactPsync, contactShared } from '@/app/data'
import React from 'react'
import { BiPlus } from 'react-icons/bi'
import { IoSearchCircleOutline } from 'react-icons/io5'
import ContactData from './ContactData'
import { IoSendOutline } from "react-icons/io5";
import { GiReceiveMoney } from 'react-icons/gi'
import ContactInscription from '@/components/content/ContactInscription'
import { Calendar } from 'lucide-react'
import EventContact from './EventContact'
import { Button } from '@/components/ui/button'
import { useWallets } from '@privy-io/react-auth'
import { base } from 'viem/chains'
import { parseEther } from 'viem'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import Link from 'next/link'


function ContactContent() {
    const {wallets} = useWallets();
    const {toast} = useToast()

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
                    <div className='flex gap-5 bg-softBlend py-3 rounded-2xl'>
                    <BiPlus className='text-3xl'/>
                    <button>Add new contact</button>
                    </div>

                </div>

            </div>
        </div>

        <div className='flex-[20%] border-r border-black bg-wineTexture p-3'>
            <div className='text-zinc-800 mb-5'>
                <h1>Displayed contacts-117</h1>
                <div className='mx-10 flex justify-center border gap-5 items-center p-2 border-zinc-800 rounded-md'>
                    <IoSearchCircleOutline className='text-2xl'/>
                    <input className='outline-none bg-transparent placeholder:text-zinc-800' type="text" placeholder="Search"/>
                </div>
            </div>


            <div>
                {contactNumbers.map((data,index)=>(
                <ContactData data={data} key={index}/>
                ))}
            </div>
        </div>

        <div className='flex-[60%]'>
            <div className='flex flex-row gap-5'>
            <div className='flex-[50%] bg-softBlend border h-auto'>

                <div className='p-5 border bg-brand-beige m-5 rounded-md'>
                   <div className='flex gap-5'>

                   <div className="w-20 h-20 p-3 rounded-full font-dmMono bg-gradient-to-r text-nowrap from-pink-500 via-purple-500 to-indigo-500 flex justify-center items-center">
                     <h1 className="text-2xl text-white flex justify-center items-center text-nowrap">
                     <span className=''>C</span> <span className='text-nowrap'>K</span>
                    </h1>
                    </div>
                    <div>
                        <h1 className='text-2xl'>Claud Mensah</h1>
                        <div>
                            <p>Developer</p>
                        </div>

                        <div className='bg-brand-light p-1 w-20 rounded-md'>
                            <p className='text-center text-white text-[10px]'>Colleauge</p>
                        </div>
                    </div>
                   </div>
                   
                   <div className='mt-5 flex flex-row gap-5 justify-around text-white'>

                     <Link href="/payment">
                      <Button
                       className='hover:bg-none flex items-center gap-3 bg-brand-hue-color w-full justify-center py-2'>
                        <IoSendOutline/>
                        send
                        </Button>
                        </Link>

                      <div className='flex items-center gap-3 bg-green-400 w-full justify-center py-2'>receive
                        <GiReceiveMoney/>
                      </div>
                   </div>

                </div>

                <div className='p-5 space-y-3'>
                   <ContactInscription title='phone number' description='+233-548672'/>
                   <ContactInscription title='gmail' description='claudious@gmail.com'/>
                   <ContactInscription title='work' description='Blockchain Developer'/>
                   <ContactInscription title='X ' description='@codeClaus'/>
                   <ContactInscription title='Birthday' description='2nd March'/>
                </div>

            </div>


            <div className='flex-[50%] border h-auto border-black'>
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