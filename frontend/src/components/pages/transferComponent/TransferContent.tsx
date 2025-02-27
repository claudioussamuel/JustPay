"use client"

import React, { useState } from 'react';

import { usePrivy, useWallets } from '@privy-io/react-auth'
import { sepolia } from 'viem/chains'
import { createWalletClient, custom, getContract } from 'viem'
import { contractAbi, contractAddress, stableCoinAddress } from '@/lib/integrations/viem/abi'



const TransferContent = () => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [purpose, setPurpose] = useState('');
  const [startDate, setStartDate] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { user,} = usePrivy()
    const walletAddress = user?.wallet?.address;
  const { wallets} = useWallets();

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const dateObject = new Date(startDate);
  
    // Get timestamp in milliseconds
    const timestampMs = dateObject.getTime();
    
  
    const timestampSeconds = Math.floor(timestampMs / 1000);

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

      await contract.write.scheduleTransaction([
         walletAddress,
        recipientAddress,
        purpose,
        BigInt(Number(amount) * 1e6),
        BigInt(timestampSeconds),
        stableCoinAddress
      ]);
    
      console.log("User data added to the blockchain");
  } catch (error) {
      console.error("Failed to update blockchain:", error);
      setLoading(false);
  }
    console.log({
      recipientAddress,
      purpose,
      startDate,
      timestampSeconds,
      //endDate,
     // duration,
    });

    setLoading(false);
    setRecipientAddress('');
    setPurpose('');
    setStartDate('');
    setAmount('');

   
  };

  return (
    <div className='grid place-content-center mt-20'>

      <div className='space-y-3 mb-3'>
        <h1 className='font-bowlby text-zinc-800 text-3xl'>Schedule   payment</h1>
        <p className='font-dmMono text-zinc-800 max-w-2xl'>At your own time schedule any payment with no restriction at the confort of your home </p>
      </div>
    <form onSubmit={handleSubmit} className="space-y-4 font-dmMono ">
      <div>
        <label htmlFor="recipientAddress" className="block text-[20px] font-medium text-gray-700 ">
          Recipient Address
        </label>
        <input
          type="text"
          id="recipientAddress"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          className="mt-1 block w-[500px] rounded-md p-3  border-gray-300 text-zinc-800 placeholder:text-zinc-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter recipient's wallet address"
          required
        />
      </div>

      <div>
        <label htmlFor="purpose" className="block  font-medium text-[18px] text-gray-700">
          Purpose
        </label>
        <textarea
          id="purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="mt-1 block w-[500px] p-5 rounded-md placeholder:text-zinc-500 text-zinc-500 placeholder:text-[18px] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Why are you sending this money?"
          rows={3}
          required
        />
      </div>

    

  <div>
    <label htmlFor="amount" className="block text-[18px] font-medium text-gray-700">
      Amount
    </label>
    <input
      type="number"
      id="amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      className="mt-1 block w-[500px] p-2 text-[18px] placeholder:text-zinc-800 rounded-md text-zinc-500"
      placeholder="Enter amount to send"
      required
    />
  </div>
  <div>
        <label htmlFor="startDate" className="block text-[18px] font-medium text-gray-700">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 block w-[500px] p-2 text-[18px] placeholder:text-zinc-800 rounded-md text-zinc-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {loading ? "Scheduling" : "Schedule Payment"}
      </button>
    </form>
    </div>
    
  );
};

export default TransferContent;