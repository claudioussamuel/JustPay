"use client"


import { IoMdWallet } from "react-icons/io";
import { usePrivy } from '@privy-io/react-auth';
import {useWallets} from '@privy-io/react-auth';
import { useEffect, useState } from "react";
import { readERC20Balance } from "@/lib/integrations/viem/contract";
import { stableCoinAddress } from "@/lib/integrations/viem/abi";
import { PaymentContent } from "./PaymentContent";



function Payment() {
  const [amount, setAmount] = useState<bigint>();

  const { user} = usePrivy()
  const walletAddress = user?.wallet?.address;
  useEffect(()=> {
    const fetchUserData = async () => {
        if(walletAddress){
            const balance = await readERC20Balance(stableCoinAddress,`${walletAddress}` as `0x${string}`);
            if (balance) {
                setAmount(balance);
            }
        }
    };
    fetchUserData();
},[walletAddress])



  return (
    <div className="h-auto">
         <div className=' bg-softBlend flex justify-between items-center p-5 rounded-2xl mb-10'>
            <div className='flex flex-col font-dmMono text-[20px]'>
             <h2>Total Balance</h2>
             <div className='flex flex-row gap-5 items-center'>
                <IoMdWallet/>
                <h2>{walletAddress ? `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}` : 'No Wallet Connected'}</h2>
             </div>
            </div>

            <div className='text-7xl font-bowlby text-brand-gray'>
                <h2>$ {amount ? (Number(amount) / 1e18).toFixed(2) : 0}</h2>
            </div>
         </div>
         <PaymentContent/>
    </div>
  )
}

export default Payment