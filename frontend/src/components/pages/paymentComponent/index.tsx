"use client"

import { IoMdWallet } from "react-icons/io";
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useEffect, useState } from "react";
import { allowance, readERC20Balance } from "@/lib/integrations/viem/contract";
import { contractAddress, stableCoinAddress } from "@/lib/integrations/viem/abi";
import { PaymentContent } from "./PaymentContent";
import { Button } from "@/components/ui/button";
import {  stableCoinAbi } from '@/lib/integrations/viem/abi'
import { sepolia } from 'viem/chains'
import { createWalletClient, custom,getContract } from 'viem'

function Payment() {
  const [amount, setAmount] = useState<bigint>();
  const { wallets} = useWallets();
  const [allowanceAmount, setAllowsAmount] = useState<bigint | null>(null);
 const [loading, setLoading] = useState(false); 
  const { user} = usePrivy()
  const walletAddress = user?.wallet?.address;
  const [transaction, setTransaction] = useState<string>();
  

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
  

      setTransaction(tsxx);
    } catch (error) {
      console.error("Failed to update blockchain:", error);
    } finally {
      setLoading(false);
    }
  } 


  useEffect(()=> {
    const fetchUserData = async () => {
        if(walletAddress){
            const balance = await readERC20Balance(stableCoinAddress,`${walletAddress}` as `0x${string}`);
            if (balance) {
                setAmount(balance);
            }
            const history = await allowance(`${walletAddress}` as `0x${string}`,contractAddress);
            if (history) {
                setAllowsAmount(history);     
            }
        }
    };
    fetchUserData();
},[walletAddress,transaction])



  return (
    <div className="h-auto mx-5 mt-5  md:mx-0 lg:mx-0 lg:mt-0">
         <div className=' bg-softBlend w-52 md:w-full lg:w-full flex flex-col lg:flex-row justify-between items-center p-5 rounded-2xl mb-10'>
            <div className='flex flex-col font-dmMono text-[15px] lg:text-[20px]'>
             <h2>Total Balance</h2>
             <div className='flex flex-row gap-5 items-center'>
                <IoMdWallet/>
                <h2>{walletAddress ? `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}` : 'No Wallet Connected'}</h2>
             </div>
            </div>

            <div className='text-3xl md:text-7xl font-bowlby text-brand-gray'>
                <h2>$ {amount ? (Number(amount) / 1e6).toFixed(2) : 0}</h2>
            </div>
         </div>

         {allowanceAmount ? 
            <PaymentContent/>
              :

              <div className='space-y-5'>
              <div className=' text-[11px] w-52 flex flex-col lg:w-full border-t border-b border-l border-r border-zinc-800  md:text-[3rem] lg:text-[2.5rem] '>
                  <div className='grid grid-cols-3 border-b border-zinc-800 text-zinc-800 '>
                    <div className='uppercase font-bold pl-10 font-dmMono'>
                      <h1 className='lg:place-self-center '>get</h1>
                     </div> 
           
                     <div className='border-l pl-2 border-zinc-800 lg:pl-5'>
                      <h1 className='font-allura uppercase font-playWright'>approved</h1>
                     </div> 
           
                     <div className='border-l  border-zinc-800 '>
                      <h1 className='font-bold font-dmMono uppercase pl-10'>to</h1>
                     </div> 
                  </div>
           
                  <div className='flex flex-row text-zinc-800'>
                    <div className='flex-shrink-0 w-50 border-r border-zinc-800 '>
                     <h1 className=' text-center uppercase font-playWright px-10 '>start</h1>
                    </div>
           
                    <div className='lg:border-r border-black  flex-grow'>
                     <h1 className='lg:pl-10 font-dmMono uppercase font-bold place-self-center'>transaction</h1>
                    </div>
           
                    <div className='flex-grow hidden lg:block'>
                     <h1 className='  uppercase pl-10 font-playWright' >effortless</h1>
                    </div>
                  </div>
               </div> 
               <Button className='text-zinc-800 text-[15px] font-dmMono bg-softBlend lg:py-5 lg:text-[20px] ' onClick={approveTokenTransfer}>
                   {loading ? 'Approving...' : 'Approve to proceed'}
                </Button>
          </div>
       }
    </div>
  )
}

export default Payment


