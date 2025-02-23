'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import Bounded from '@/components/shared/Bounded'
import { CiSearch } from 'react-icons/ci'
import { Input } from '@/components/ui/input'
import { useAppContext } from '@/app/context/AppContext';


function SendPayment() {
 
  
  const { receipientAddress, setRecipientAddress } = useAppContext();
  
 
  const [txs, setTxs] = useState(""); 


 
//   useEffect(()=> {
//     const fetchUserData = async () => {
//         if(walletAddress){
           

//         }
//     };
 
//     fetchUserData();
// },[walletAddress,txs])
  return (
    <div className='h-[100vh]'>
        <h3 className="font-dmMono capitalize text-3xl text-zinc-800">Send payment To</h3>
       
        <div className='max-w-2xl flex items-center gap-5 mt-5 border p-2 bg-brand-gray rounded-full '>
          <CiSearch className='text-zinc-800 text-3xl'/>
          <Input 
            type="text" 
            className='w-full
            placeholder:text-[20px]
            placeholder:text-zinc-800
            placeholder:font-dmMono
            text-zinc-800
            outline-none
            border-none
            placeholder:items-center
            shadow-none
            bg-transparent 
            font-dmMono
            ' 
            placeholder='place in recepient address' 
            value={receipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </div>

      <div className='mt-5'>      
      <Link href="/payment/sendPayment" className='font-dmMono capitalize '>
          <Button className='px-10 py-5 text-2xl bg-softBlend'>next</Button>
        </Link>
      </div>


    </div>
  )
}

export default SendPayment