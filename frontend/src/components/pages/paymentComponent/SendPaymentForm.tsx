"use client";

import { useAppContext } from '@/app/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React from 'react';
import { AiFillDollarCircle } from 'react-icons/ai';
import { CiWallet } from 'react-icons/ci';


function SendPaymentForm() {
  const {
    amount,
    setAmount,
    description,
    setDescription,
    isEditingAmount,
    setIsEditingAmount,
    isEditingDescription,
    setIsEditingDescription,
  } = useAppContext();

  return (
    <div className='text-3xl h-dvh text-zinc-800 grid place-content-center place-self-center font-dmMono max-w-[20%]'>
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
                <Input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onBlur={() => setIsEditingAmount(false)}
                  autoFocus
                  className='font-dmMono text-5xl bg-transparent outline-none border-b border-black'
                />
              ) : (
                <h1
                  className='font-dmMono text-5xl cursor-pointer'
                  onClick={() => setIsEditingAmount(true)}
                >
                  {amount}
                </h1>
              )}
            </div>
            <Button className='w-10 place-self-center'>USD</Button>
          </div>

          {isEditingDescription ? (
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => setIsEditingDescription(false)}
              autoFocus
              className='bg-transparent outline-none border border-black placeholder:text-[18px] placeholder:text-center placeholder:text-zinc-800 placeholder:place-content-center w-full'
              placeholder='What is this for?'
            />
          ) : (
            <p
              className='bg-transparent outline-none border border-black text-[18px] text-center text-zinc-800 w-full cursor-pointer'
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
            <div className='place-self-center max-w-[20%]'>
              <Button className='w-full px-5 py-3 bg-softBlend'>Next</Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SendPaymentForm;