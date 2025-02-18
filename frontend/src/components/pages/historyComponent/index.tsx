"use client"
import React, { useEffect, useRef, useState } from 'react'

import HistoryDetails from './HistoryDetails'
import { motion, useScroll } from 'framer-motion'
import { usePrivy } from '@privy-io/react-auth';
import {useFundWallet} from '@privy-io/react-auth';
import {useWallets} from '@privy-io/react-auth';
import { base, sepolia } from 'viem/chains';
import { createWalletClient, getContract } from 'viem';
import { custom } from 'viem';


import { contractAbi, contractAddress } from "@/lib/integrations/viem/abi";
import { readHistoryData } from '@/lib/integrations/viem/contract';
interface SendReceive {
    action: string;
    amount: bigint;
    message: string;
    otherPartyAddress: string;
    otherPartyName: string;
    stableCoinName: string;
    time:bigint;
}

function History() {
    const [transactionHistory, setTransactionHistory] = useState<SendReceive[]>([]);
    const {login, authenticated,ready, user,logout,} = usePrivy()
    const walletAddress = user?.wallet?.address;
    
    const { wallets} = useWallets();
    const {fundWallet} = useFundWallet();

    const ref = useRef(null);

    const {scrollYProgress}= useScroll({
        target:ref,
        offset: ["start end", "center start"]
    });

    useEffect(()=> {
        const fetchUserData = async () => {
            if(walletAddress){
                const history = await readHistoryData(`${walletAddress}` as `0x${string}`);
                if (history) {
                    setTransactionHistory(history);
                }
            }
        };
        fetchUserData();
    },[walletAddress])

  return (
    <div>
  
        <div ref={ref} className='w-[75%] mx-auto relative mt-10'>
            <motion.div
            style={{scaleY:scrollYProgress}}
             className='absolute left-9 top-0 w-[4px] h-full bg-black origin-top'/>

            <ul className='flex flex-col justify-between items-start w-full ml-4'>
                {transactionHistory.map((transaction, index) => (
                    <HistoryDetails 
                        key={index}
                        items={{
                            deliveryType: transaction.action.toLowerCase(),
                            time: new Date(Number(transaction.time) * 1000).toLocaleString(), // Convert timestamp to date
                            address: transaction.otherPartyName || transaction.otherPartyAddress,
                            amount: transaction.amount.toString(),
                            work: transaction.message,
                            href: '#',
                            stats: true,
                            from: walletAddress || '',
                            to: transaction.otherPartyAddress,
                        }}
                    />
                ))}
            </ul>

        </div>
    </div>
  )
}

export default History