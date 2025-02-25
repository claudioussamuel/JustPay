"use client"

import { useSelectedContactContext } from '@/app/context/SelectContext';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { usePrivy } from "@privy-io/react-auth";
import { readHistoryBetweenFriendsData } from "@/lib/integrations/viem/contract";
import { SendReceive } from '../../../types/transaction.types';
import { getAddress } from 'viem'

 

function ContactDescriptionEvents() {
  const {user} = usePrivy();
  const walletAddress = user?.wallet?.address
  const {selectedContact} = useSelectedContactContext();

      const [transactionHistory, setTransactionHistory] = useState<SendReceive[]>([]);

      useEffect(()=>{
        const fetchUserData=async()=>{
            if(!walletAddress){
                return
            }

 

            try {
                const history = await readHistoryBetweenFriendsData(walletAddress as `0x${string}`, getAddress(selectedContact?.userAddress as `0x${string}`));
                setTransactionHistory(history || []);
            } catch (error) {
               
            }
            finally{
               
            }
        };

        fetchUserData();

    },[selectedContact?.userAddress]);



  // const displayedImages = images.slice(0, 3);
  // const extraImagesCount = images.length > 3 ? images.length - 3 : 0; 
  return (
    <div className="text-zinc-800">
      <h1 className="mb-1 text-[13px]">{selectedContact?.userAddress}</h1>
      <div className=" rounded-2xl p-5 bg-softBlend">
        {/* <h3 className="font-semibold">{title}</h3>
        <p className="text-sm ">{description}</p> */}

        {/* Image Display Section */}
        <div className='flex items-center justify-between'>

        <div className="flex items-center mt-3 -space-x-3">
           {transactionHistory.map((img, index) => (
            <div key={index} className="relative w-10 h-10">
              {/* <Image
                src={img}
                alt={`Event image ${index + 1}`}
                layout="fill"
                className="rounded-full object-cover border"
              /> */}
               (
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-sm font-semibold">
              {img.action}
            </div>
          )

          /// action
          /// amount
          /// message
          /// time
          /// otherPartyName
            </div>
          ))} 

         
          {/* {extraImagesCount > 0 && (
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-sm font-semibold">
              +{extraImagesCount}
            </div>
          )} */}
        </div>


        {/* {time && (
          <div className="mt-2  text-sm">
            <h1>{time}</h1>
          </div>
        )} */}

        </div>



      </div>
    </div>
  );
}

export default ContactDescriptionEvents;
