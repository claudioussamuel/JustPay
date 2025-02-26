"use client";
import React, { useState } from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegMessage } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { PiPathFill } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import {  createWalletClient, custom, getContract } from 'viem';
import { sepolia } from 'viem/chains';
import { contractAbi, contractAddress } from '@/lib/integrations/viem/abi';
import { usePrivy, useWallets } from '@privy-io/react-auth'; 
import { useRouter } from 'next/navigation';

type GroupTypes = {
  data: {
    requestor:string;
    amount:bigint;
    message:string;
    name:string;
    stableCoin:string;
    time:bigint;
  };
};
 
function truncateAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`; 
}
function GroupCard({ data, index }: GroupTypes & { index: number }) {
  const router = useRouter();

  const { user,} = usePrivy()
  const walletAddress = user?.wallet?.address;
  const { wallets} = useWallets();


  async function payRequest() {
    
    try {
      if (!wallets || wallets.length === 0) {
        console.error("No wallet connected");
        return;
      }
  
      const wallet = wallets[0];
      if (!wallet) {
        console.error("Wallet is undefined");
        return;
      }
  

      const provider = await wallet.getEthereumProvider();
      if (!provider) {
        console.error("Provider is undefined");
        return;
      }
  
          const currentChainId = await provider.request({ method: "eth_chainId" });

          if (currentChainId !== `0x${sepolia.id.toString(16)}`) {
            await wallet.switchChain(sepolia.id);
          }


        

          const client = createWalletClient({
            chain: sepolia,
            transport: custom(provider),
            account: walletAddress as `0x${string}`,
          });


     
    
  
      const contract = getContract({
        address: contractAddress,
        abi: contractAbi,
        client,
      });
  
      await contract.write.payRequest([
       BigInt(index)
      ]);
  
      console.log("User data added to the blockchain");


      router.push('/history');

    } catch (error) {
      console.error("Failed to update blockchain:", error);
    } finally{

     
    }
  

  }

  async function rejectRequest() {
    
    try {
      if (!wallets || wallets.length === 0) {
        console.error("No wallet connected");
        return;
      }
  
      const wallet = wallets[0];
      if (!wallet) {
        console.error("Wallet is undefined");
        return;
      }
  

      const provider = await wallet.getEthereumProvider();
      if (!provider) {
        console.error("Provider is undefined");
        return;
      }
  
          const currentChainId = await provider.request({ method: "eth_chainId" });

          if (currentChainId !== `0x${sepolia.id.toString(16)}`) {
            await wallet.switchChain(sepolia.id);
          }


        

          const client = createWalletClient({
            chain: sepolia,
            transport: custom(provider),
            account: walletAddress as `0x${string}`,
          });


     
    
  
      const contract = getContract({
        address: contractAddress,
        abi: contractAbi,
        client,
      });
  
      await contract.write.rejectRequest([
        BigInt(index)
       ]);
       router.push('/history');
      console.log("User data added to the blockchain");
    } catch (error) {
      console.error("Failed to update blockchain:", error);
    }finally{
     
    }
  }
  const [showToggle, setShowToggle] = useState(false);

  const toggleAction = () => {
    setShowToggle((prevState) => !prevState);
  };

  const avatarFallback = `${data.name[0]}`;

  return (
    <div className="w-80 border rounded-lg p-3 border-zinc-800 font-dmMono bg-softBlend relative hover:shadow-lg transition-shadow duration-300">

      <div className="flex justify-between">
        <div className="flex gap-5 items-center">
          <Avatar>
            <AvatarImage src="https://pyxis.nymag.com/v1/imgs/b1c/bb1/f34eb12e99381d8dbef2aee125da6970d1-NICKELODEON-AVATAR-313-204644-1920x1080.rhorizontal.w700.jpg" />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-semibold">
              {truncateAddress(data.requestor)} 
            </h1>
            <p className="text-sm ">{(Number(data.amount)/1e6).toFixed(2)} USD</p>
          </div>
        </div>
        <PiDotsThreeOutlineFill
          onClick={toggleAction}
          className="text-3xl cursor-pointer hover:text-zinc-600 transition-colors duration-200"
        />
      </div>


      <div className="h-[2px] w-full bg-gray-400 mt-2" />

     
      <div className="pt-3 space-y-3">
        <div className="flex items-center gap-2">
          <FaRegMessage className="text-white" />
          <h3 className="text-sm">{data.message}</h3>
        </div>

        <div className="flex items-center gap-2">
          <MdAlternateEmail className="text-white" />
          <h3 className="text-sm">{data.name}</h3>
        </div>

        <div className="flex items-center gap-2">
          <PiPathFill className="text-white" />
          <h3 className="text-sm">{  new Date(Number(data.time) * 1000).toLocaleString()  }</h3>
        </div>
      </div>


      {showToggle && (
        <div className="absolute top-12 right-3 bg-white border border-gray-200 rounded-lg shadow-lg p-3 space-y-2 z-50 animate-fade-in">
          <Button 
          onClick={payRequest}
            className="w-full text-green-700 bg-gray-50 transition-colors duration-200"
          >
            Approved
          </Button>
          <Button
          onClick={rejectRequest}
            className="w-full text-red-700 bg-gray-50 transition-colors duration-200"
          >
            Decline
          </Button>
        </div>
      )}
    </div>
  );
}

export default GroupCard;