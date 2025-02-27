"use client"
import React, { useEffect, useRef, useState } from 'react'

import HistoryDetails from './HistoryDetails'
import { motion, useScroll } from 'framer-motion'
import { usePrivy } from '@privy-io/react-auth';
import { readHistoryData } from '@/lib/integrations/viem/contract';
import { SendReceive } from '../../../../types/transaction.types';
import UnavailableData from '@/components/unavailable/UnavailableData';



function History() {
    const [transactionHistory, setTransactionHistory] = useState<SendReceive[]>([]);
    const {user} = usePrivy()
    const walletAddress = user?.wallet?.address;
    

    const ref = useRef(null);
    const [isLoading, setLoading]=useState(false)

    const {scrollYProgress}= useScroll({
        target:ref,
        offset: ["start end", "center start"]
    });

    useEffect(() => {
      const fetchUserData = async () => {
          if (!walletAddress) return;
          
          setLoading(true);
          try {
              const history = await readHistoryData(walletAddress as `0x${string}`);
              setTransactionHistory(history || []);
          } catch (error) {
              console.error("Error fetching history:", error);
          } finally {
              setLoading(false);
          }
      };
      
      fetchUserData();
  }, [walletAddress]);


    return (
        <div>
          {isLoading ? (
            <p className="text-3xl text-zinc-800">Loading history...</p>
          ) : transactionHistory.length === 0 ? (
            <UnavailableData
             title='History Page has no transaction yet'
             image='/images/history.png'
             description='You will have to make transactions to see your data'
            />
          ) : (
            <div ref={ref} className="w-[75%] mx-auto relative mt-10">
              <motion.div
                style={{ scaleY: scrollYProgress }}
                className="absolute left-9 top-0 w-[4px] h-full bg-black origin-top"
              />
    
              <ul className="flex flex-col justify-between items-start w-full ml-4">
                {transactionHistory.map((transaction, index) => (
                  <HistoryDetails
                    key={index}
                    items={{
                      deliveryType: transaction.action.toLowerCase(),
                      time: new Date(Number(transaction.time) * 1000).toLocaleString(),
                      address: transaction.otherPartyName || transaction.otherPartyAddress,
                      amount: (Number(transaction.amount)/1e6).toString(),
                      work: transaction.message,
                      href: "#",
                      stats: true,
                      from:   transaction.action.toLowerCase() === 'send' ? `${walletAddress}` : transaction.otherPartyAddress,
                      to: transaction.action.toLowerCase() === 'send' ? transaction.otherPartyAddress : `${walletAddress}`  ,
                    }}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      );
}

export default History