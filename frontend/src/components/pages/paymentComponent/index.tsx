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
         {allowanceAmount ? (
        <PaymentContent/>)  :<Button 
          className='px-10 mx-4 py-5 text-2xl bg-softBlend' 
          onClick={approveTokenTransfer}
          disabled={loading}
        >
          {loading ? 'Approving...' : 'Approve'}
        </Button> }
    </div>
  )
}

export default Payment


