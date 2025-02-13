"use client"

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiFillDollarCircle } from 'react-icons/ai';
import { CiWallet } from 'react-icons/ci';

function Page() {

  const [amount, setAmount] = useState('0.00');
  const [isEditingAmount, setIsEditingAmount] = useState(false);


  const [description, setDescription] = useState('');
  const [isEditingDescription, setIsEditingDescription] = useState(false);



  const handleAmountChange = (e:any) => {
    setAmount(e.target.value);
  };


  const handleDescriptionChange = (e:any) => {
    setDescription(e.target.value);
  };

  return (
    <div className='text-3xl h-dvh text-zinc-800 grid font-dmMono'>
      <div className="place-content-center">
        <div className='place-self-center max-w-2xl h-auto p-5 border border-black rounded-2xl mb-3'>
          <div className='flex gap-5'>
            <CiWallet />
            <h1>0XFF0832222222222</h1>
          </div>

          <div className='grid place-content-center space-y-3 mb-3'>
            <div className='flex gap-5 items-center'>
              <AiFillDollarCircle />
          
              {isEditingAmount ? (
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  onBlur={() => setIsEditingAmount(false)} 
                  autoFocus 
                  className='font-dmMono text-5xl bg-transparent outline-none border-b border-black'
                />
              ) : (
                <h1
                  className='font-dmMono text-5xl cursor-pointer'
                  onClick={() => setIsEditingAmount(true)} // Enable editing on click
                >
                  {amount}
                </h1>
              )}
            </div>
            <Button className='w-10 place-self-center'>USD</Button>
          </div>


          {isEditingDescription ? (
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              onBlur={() => setIsEditingDescription(false)} 
              autoFocus 
              className='bg-transparent outline-none border border-black placeholder:text-[18px] placeholder:text-center placeholder:text-zinc-800 placeholder:place-content-center w-full'
              placeholder='What is this for?'
            />
          ) : (
            <p
              className='bg-transparent outline-none border border-black placeholder:text-[18px] placeholder:text-center placeholder:text-zinc-800 placeholder:place-content-center w-full cursor-pointer'
              onClick={() => setIsEditingDescription(true)} 
            >
              {description || 'What is this for?'}
            </p>
          )}
        </div>

        <div className='text-[13px] place-self-center space-y-3'>
          <div className='flex gap-1 items-center'>
            <p>For all your information, read our</p>
            <Link href="#" className='text-blue-500 underline'>help guide</Link>
          </div>

          <Link href="/receipt/6000">
            <div className='place-self-center'>
              <Button className='w-full px-5 py-3 bg-softBlend'>Next</Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;