import React from 'react'

import Bounded from '@/components/shared/Bounded'
import { IoMdWallet } from "react-icons/io";


function PaymentBanner() {
  return (
    <Bounded className='bg-softBlend rounded-2xl h-[20vh] mb-20 w-full font-dmMono p-5'>
         <div className='flex justify-between items-center'>
            <div className='flex flex-col text-3xl'>
             <h2 className=''>Total Balance</h2>
             <div className='flex flex-row gap-5 items-center'>
                <IoMdWallet/>
                <h2>0xFF805555621</h2>
             </div>
            </div>

            <div className='text-7xl font-bowlby text-brand-gray'>
                <h2>$48,654,00</h2>
            </div>
         </div>

    </Bounded>
  )
}

export default PaymentBanner