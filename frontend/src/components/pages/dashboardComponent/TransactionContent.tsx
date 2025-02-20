import React from 'react'
import { BsThreeDots } from 'react-icons/bs';
import { CgProfile } from "react-icons/cg";

type Props = {
    walletAddress:string;
    date:string;
    completed:string;
    ratings:string;
}

function TransactionContent({walletAddress,date,completed, ratings}: Props) {
  return (
    <div className='grid grid-cols-2 p-3 gap-20 font-dmMono text-[20px]'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-4 items-center'>
          <CgProfile className="text-4xl"/>

          <div>
            <h3>{walletAddress.slice(0,5)}</h3>
        </div>
        </div>

        <div className='text-[15px] text-nowrap flex'>
            {date}
        </div>

        </div>

     <div className='flex justify-between'>
        <div>
            {ratings}
        </div>

        <div className='text-[18px]'>
            {completed}
        </div>

        <div className=''>
            <BsThreeDots/>
          </div>

        </div>
    </div>
  )
}

export default TransactionContent