"use client";

import { useAppContext } from '@/app/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { contractAbi, contractAddress, stableCoinAddress } from '@/lib/integrations/viem/abi';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiFillDollarCircle } from 'react-icons/ai';
import { CiWallet } from 'react-icons/ci';
import { createWalletClient, custom, getContract } from 'viem';
import { sepolia } from 'viem/chains';
import { usePrivy } from '@privy-io/react-auth';
import {useWallets} from '@privy-io/react-auth';

function truncateAddress(address: string): string {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function SendPaymentForm() {
  const [navigate, setNavigate] = useState(false);

  const { user,} = usePrivy()
  const walletAddress = user?.wallet?.address;
  const { wallets} = useWallets();


  const {
    amount,
    setAmount,
    description,
    setDescription,
    isEditingAmount,
    setIsEditingAmount,
    isEditingDescription,
    setIsEditingDescription,
    receipientAddress,
    setRecipientAddress
  } = useAppContext();

  async function sendTokenToAFriend() {
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
  
      await contract.write.sendToken([
        receipientAddress,
        stableCoinAddress, 
        BigInt(Number(amount)*1e18),
        description
      ]);
  
      console.log("User data added to the blockchain");

      // Set navigate state to true after successful transaction
      setNavigate(true);

      // Resetting the state after successful transaction
      setAmount('0'); // Reset amount to zero
      setDescription(''); // Reset description to empty string
      setIsEditingAmount(false); // Optionally reset editing state
      setIsEditingDescription(false); // Optionally reset editing state
      setRecipientAddress(""); // Reset recipient address to empty string

        

    } catch (error) {
      console.error("Failed to update blockchain:", error);
    }
  }


  return (
    <div className='text-3xl h-dvh text-zinc-800 grid place-content-center place-self-center font-dmMono max-w-[20%]'>
      <div className="place-content-center">
        <div className='place-self-center max-w-2xl h-auto p-5 border border-black rounded-2xl mb-3'>
          <div className='flex gap-5'>
            <CiWallet />
            <h1>{truncateAddress(receipientAddress)}</h1>
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

            <div className='place-self-center max-w-[20%]'>
              <Button className='w-full px-5 py-3 bg-softBlend' onClick={sendTokenToAFriend}>Send</Button>
            </div>
         
        </div>

        {navigate && (
          <Link className='text-blue-500 underline' href="/history">
            Go to History Page
          </Link>
        )}
      </div>
    </div>
  );
}

export default SendPaymentForm;