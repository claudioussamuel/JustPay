'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'


import { Button } from '@/components/ui/button'
import { CiSearch } from 'react-icons/ci'
import { usePrivy } from '@privy-io/react-auth'; 
import {useWallets} from '@privy-io/react-auth';
import { allowance } from '@/lib/integrations/viem/contract'
import { contractAddress, stableCoinAbi, stableCoinAddress } from '@/lib/integrations/viem/abi'
import { useAppContext } from '@/app/context/AppContext';
import { sepolia } from 'viem/chains'
import { createWalletClient, custom,getContract } from 'viem'


function SendPayment() {
  const { user,} = usePrivy()
  const walletAddress = user?.wallet?.address;
  const [amount, setAmount] = useState<bigint | null>(null);
  const { receipientAddress, setRecipientAddress } = useAppContext();
  const { wallets} = useWallets();
  const [loading, setLoading] = useState(false); 
  const [txs, setTxs] = useState(""); 
  const searchParams = useSearchParams();
  const walletFromUrl = searchParams.get('wallet') || "";


  useEffect(()=>{

    if(walletFromUrl){
      setRecipientAddress(walletFromUrl)
    }
  },[walletAddress])

  async function approveTokenTransfer() {
    setLoading(true);
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
        address: stableCoinAddress,
        abi: stableCoinAbi,
        client,
      });
  
      const tsxx =    await contract.write.approve([
        contractAddress,BigInt(1000000000000000000000000000000000000000000)
      ]);
  
      setTxs(tsxx)

      console.log("User data added to the blockchain");
    } catch (error) {
      console.error("Failed to update blockchain:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=> {
    const fetchUserData = async () => {
        if(walletAddress){
            const history = await allowance(`${walletAddress}` as `0x${string}`,contractAddress);
            if (history) {
                setAmount(history);     
            }
            console.log(`${history} Mr. Claudious is the goat `) 
        }
    };
 
    fetchUserData();
},[walletAddress,txs])
  return (
    <div className='h-[100vh]'>
        <h3 className="font-dmMono capitalize text-3xl text-zinc-800">Send payment To the address below</h3>
        {amount ?<p></p> : (
        <p className='text-[18px] font-dmMono text-zinc-800'>Click on approve first, before you proceed</p>
        ) 
        }
        <div className='max-w-2xl flex items-center gap-5 mt-5 border p-2 bg-brand-gray rounded-full '>
          <CiSearch className='text-zinc-800 text-3xl'/>
          <input 
            type="text" 
            className='w-full
            placeholder:text-[20px]
            placeholder:text-zinc-800
            placeholder:font-dmMono
            text-zinc-800
            outline-none
            border-none
            placeholder:items-center
            shadow-none
            bg-transparent 
            font-dmMono
            ' 
            placeholder='place in recepient address' 
            value={receipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </div>

      <div className='mt-5'>

  

  {amount ? 
          <Link href="/payment/sendPayment" className='font-dmMono '>
          <Button className='px-10 py-5 text-2xl bg-softBlend capitalize mt-3'>Next</Button>
        </Link>
  : null }


      </div>


    </div>
  )
}

export default SendPayment