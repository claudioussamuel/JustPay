"use client"

import React, { useEffect, useState } from 'react'

import Bounded from '@/components/shared/Bounded'
import { IoMdWallet } from "react-icons/io";
import { usePrivy } from '@privy-io/react-auth';

import { readERC20Balance } from '@/lib/integrations/viem/contract';


function PaymentBanner() {
  const { user } = usePrivy()

  const walletAddress = user?.wallet?.address;

  // New state to hold the ERC20 balance
  const [erc20Balance, setErc20Balance] = useState<bigint | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (walletAddress) {
        const balance = await readERC20Balance('0x53844f9577c2334e541aec7df7174ece5df1fcf0', walletAddress as `0x${string}`); // Replace '0xYourTokenAddress' with the actual token address
        setErc20Balance(balance); // Set the balance in state
      }
    };

    fetchBalance(); // Call the function to fetch balance
  }, [walletAddress]); // Dependency array to re-run effect when walletAddress changes

  return (
    <Bounded className='bg-softBlend rounded-2xl h-[20vh] mb-20 w-full font-dmMono p-5'>
         <div className='flex justify-between items-center'>
            <div className='flex flex-col text-3xl'>
             <h2 className=''>Total Balance</h2>
             <div className='flex flex-row gap-5 items-center'>
                <IoMdWallet/>
                <h2>{walletAddress}</h2>
             </div>
            </div>

            <div className='text-7xl font-bowlby text-brand-gray'>
                <h2>{erc20Balance !== null ? `$${erc20Balance.toString()}` : 'Loading...'}</h2>
            </div>
         </div>

    </Bounded>
  )
}

export default PaymentBanner