import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React from 'react'
import { CiSearch } from 'react-icons/ci'

function RequestPayment() {
  return (
    <div className='h-[100vh]'>
        <h3 className="font-dmMono capitalize text-3xl text-zinc-800">Request payment from</h3>
        <p className='text-[18px] font-dmMono text-zinc-800'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, illum!</p>

        <div className='max-w-2xl flex items-center gap-5 mt-5 border p-2 bg-brand-gray rounded-full '>
          <CiSearch className='text-zinc-800 text-3xl'/>
          <Input type="text" 
          className='w-full
          placeholder:text-[20px]
          placeholder:text-zinc-800
          placeholder:font-dmMono
          text-zinc-800
          outline-none
          border-none
          shadow-none
          placeholder:items-center
          bg-transparent
          font-dmMono
          ' 
          placeholder='place in sender address' />
        </div>

      <div className='mt-5'>
      <Link href="/payment/requestPayment" className='font-dmMono capitalize '>
          <Button className='px-10 py-5 text-2xl bg-softBlend'>next</Button>
        </Link>
      </div>


    </div>
  )
}

export default RequestPayment