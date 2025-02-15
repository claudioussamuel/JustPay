'use client'

import React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import Bounded from '@/components/shared/Bounded'
import { CiSearch } from 'react-icons/ci'
import { useAppContext } from '@/app/context/AppContext'
import { Input } from '@/components/ui/input'

function RequestPayment() {

  const {
    receipientAddress,
    setRecipientAddress,
  } = useAppContext();

  return (
    <Bounded className='-mt-14'>
        <h3 className="font-dmMono capitalize text-3xl">Request payment To</h3>
        <p className='text-[18px] font-dmMono'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, illum!</p>

        <div className='max-w-2xl flex items-center gap-5 mt-5 border p-5 bg-brand-gray rounded-full '>
          <CiSearch className=''/>

          <Input 
         type="text" 
        value={receipientAddress}
       onChange={(e) => setRecipientAddress(e.target.value)}
      className="
         w-full
        placeholder:text-[20px]
         placeholder:font-dmMono
      text-zinc-800
      bg-transparent
         font-dmMono
       border-0 outline-none
     focus:ring-0 focus:outline-none
  " 
  placeholder="Place in recipient address"
/>

        </div>

      <div className='mt-5'>
      <Link href="/payment/requestTransaction" className='font-dmMono capitalize '>
          <Button  className='px-10 py-5 text-2xl bg-softBlend'>next</Button>
        </Link>
      </div>


    </Bounded>
  )
}

export default RequestPayment