
"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link';
import { FaMoneyBillWave, FaUser, FaCommentDots, FaDollarSign, } from "react-icons/fa";
import { useAppContext } from '@/app/context/AppContext';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { sepolia } from 'viem/chains';
import { createWalletClient, custom, getContract } from 'viem';
import { useToast } from '@/hooks/use-toast';
import { contractAbi, contractAddress,stableCoinAbi,stableCoinAddress } from '@/lib/integrations/viem/abi';



function PaymentCard() {
  const {user} = usePrivy();
  const {toast} =  useToast()
  const {wallets} = useWallets();
  const walletAddress = user?.wallet?.address

  const {
    amount,
    setAmount,
    description,
    receipientAddress,
    setDescription,
    setRecipientAddress,
  } = useAppContext();

  async function sendToPayment(){
    try {
      if(!wallets || wallets.length === 0){
        toast({
          variant:'destructive',
          description:'No wallet Connected'
        })
        return;
      }
      if(!receipientAddress || !amount || !description){
        toast({
          variant:'destructive',
          description:'Please fill all the fields'
        })
        return;
      }

      const wallet = wallets[0]

      if(!wallet){
        toast({
          variant:'destructive',
          description:'Wallet is undefined'
        })
        return;
      }

      const provider = await wallet.getEthereumProvider();
      if(!provider){
         toast({
          variant:"destructive",
          description:"Provider is undefined"
         })
        return
      }


      const client = createWalletClient({
        chain: sepolia,
        transport: custom(provider),
        account: walletAddress as `0x${string}`,
      });

      const contract = getContract({
        address: contractAddress,
        abi: contractAbi,
        client
      });

      await contract.write.transferERC20([
        "0x" as `0x${string}`,
        receipientAddress as `0x${string}`,
        BigInt(amount),
        description,
        "USDT"
      ])
    } catch (error) {
      toast({
        variant:'destructive',
        description:`Failed to update blockchain ${error}`,
      })
    }
  }

  async function approveUsToSpend() {
    try {
      if(!wallets || wallets.length === 0){
        toast({
          variant:'destructive',
          description:'No wallet Connected'
        })
        return;
      }
      if(!receipientAddress || !amount || !description){
        toast({
          variant:'destructive',
          description:'Please fill all the fields'
        })
        return;
      }

      const wallet = wallets[0]

      if(!wallet){
        toast({
          variant:'destructive',
          description:'Wallet is undefined'
        })
        return;
      }

      const provider = await wallet.getEthereumProvider();
      if(!provider){
         toast({
          variant:"destructive",
          description:"Provider is undefined"
         })
        return
      }
    const client = createWalletClient({
      chain: sepolia,
      transport: custom(provider),
      account: walletAddress as `0x${string}`,
    });

    const contract = getContract({
      address: stableCoinAddress,
      abi: stableCoinAbi,
      client
    });

    await contract.write.approve([
      "0x" as `0x${string}`,
      BigInt(1000000000000000000000000000000000000000000000000000000000000000),
    
    ])

  } catch (error){
    toast({
      variant:'destructive',
      description:`Failed to update blockchain ${error}`,
    })
  }
  }


  return (
    <div className='w-full flex justify-center font-dmMono'>
    <div className='leaderboard text-zinc-800 mt-20 border border-yellow-300 border-r-8'>
        <div className="leader">
        <div className='flex justify-center items-center'>
                <FaMoneyBillWave className='text-3xl text-white'/>
              </div>
           <h1> <Link href="/payment/requestTransaction"><span>Request Payment</span></Link> Send Payment</h1>
           <div>
            <h2>Send # <span>28</span></h2>
           </div>
        </div>

        <ul>
            <li className='pr-5'>
              <div className='flex justify-center items-center'>
                <FaUser className='text-3xl'/>
              </div>
              <h1 className='mr-2'>To</h1>
                <input 
                className='outline-none 
                w-[70%] p-[0.75rem]'
                type="text"
                 value={receipientAddress}
                onChange={(e)=>setRecipientAddress(e.target.value)}
                /> 
            </li>

            <li className='pr-5'>
              <div className='flex justify-center items-center'>
                <FaCommentDots className='text-3xl'/>
              </div>
              <h1 className='mr-2'>message</h1>
                <textarea 
                className='outline-none 
                w-[70%] 
                p-[0.75rem]'
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                placeholder='what is this for'
                 /> 
            </li>


            <li className='pr-5'>
            <div className='flex justify-center items-center'>
                <FaDollarSign className='text-3xl'/>
                </div>
              <h1 className='mr-2'>Amount</h1>
                <input 
                 className='outline-none 
                  w-[70%] 
                   p-[0.75rem]'
                   value={amount}
                  type="number" 
                  step="0.001"
                   onChange={(e)=>setAmount(e.target.value)}
                    /> 
            </li>

            <div  className='flex justify-center py-10 mx-5 '>
            <Button onClick={sendToPayment} className='w-full py-5 text-3xl'>send</Button>
            </div>
        </ul>
    </div>
    </div>
  )
}

export default PaymentCard

