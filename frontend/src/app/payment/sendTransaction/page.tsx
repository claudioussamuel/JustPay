"use client";

import { contractAbi, contractAddress } from "@/lib/integrations/viem/abi";
import { useAppContext } from '@/app/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React from 'react';
import { AiFillDollarCircle } from 'react-icons/ai';
import { CiWallet } from 'react-icons/ci';
import { usePrivy } from '@privy-io/react-auth';
import {useWallets} from '@privy-io/react-auth';
import { sepolia } from 'viem/chains';
import { createWalletClient, custom, getContract } from 'viem';

function Page() {

  const { user} = usePrivy()
  const { wallets} = useWallets();
  const walletAddress = user?.wallet?.address;


  const {
    amount,
    setAmount,
    description,
    setDescription,
    isEditingAmount,
    setIsEditingAmount,
    isEditingDescription,
    setIsEditingDescription,
    receipientAddress
  } = useAppContext();

  async function sendWillinglyToARecepient(){
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

        console.log(`${receipientAddress} ${BigInt(amount)} ${description}`)
      await contract.write.transferERC20([
        "0x53844f9577c2334e541aec7df7174ece5df1fcf0" as `0x${string}`,
        receipientAddress as `0x${string}`,
       BigInt(amount),
       description,
       "USDT"
      ]
        
    )
    // address token,
    //     address to,
    //     uint256 amount,
    //     string memory message,
    //     string memory stableCoinName


    // Set loading and navugate to history page when event returns something
    
    } catch (error) {
          console.error("Failed to update blockchain:", error);
        }
  }

  return (
    <div className='text-3xl h-dvh text-zinc-800 grid font-dmMono'>
      <div className="place-content-center">
        <div className='place-self-center max-w-2xl h-auto p-5 border border-black rounded-2xl mb-3'>
          <div className='flex gap-5'>
            <CiWallet />
            <h1>{receipientAddress}</h1>
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

         
            <div className='place-self-center'>
              <Button onClick={sendWillinglyToARecepient} className='w-full px-5 py-3 bg-softBlend'>Send</Button>
            </div>
        
        </div>
      </div>
    </div>
  );
}

export default Page;