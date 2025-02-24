import React from 'react'
import { ContactAddedType } from '../../../types/global.types'
import { Button } from '../ui/button'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { sepolia } from 'viem/chains'
import { createWalletClient, custom, getContract } from 'viem'
import { contractAbi, contractAddress } from '@/lib/integrations/viem/abi'


interface AddToContactListProps {
  data: ContactAddedType;
}

function AddToContactList({data}:AddToContactListProps) {

  const { user,} = usePrivy()
    const walletAddress = user?.wallet?.address;
  const { wallets} = useWallets();

  async function addUserDataToTheBlocChain(userData: ContactAddedType) {
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

            await contract.write.addFriends([
                userData.firstName,
                userData.lastName,
                userData.gender,
                userData.dateOfBirth,
                userData.imageUrl,
                userData.xHandle,
                userData.facebookHandle,
                userData.igHandle,
                userData.location,
                userData.email,
                userData.phone,
                userData.userAddress,
            ]);
          
            console.log("User data added to the blockchain");
        } catch (error) {
            console.error("Failed to update blockchain:", error);
        }
    }

    const handleSave = async ()  => {
      console.log("IMVU wae");
     await addUserDataToTheBlocChain(data);
  };
  return (
    <div className='border border-t border-b border-black flex p-5 rounded-md  justify-between '>

      <div className='flex gap-3'>
        <div className="w-10 h-10 p-3 rounded-full place-self-start font-dmMono bg-gradient-to-r text-nowrap from-pink-500 via-purple-500 to-indigo-500 flex justify-center items-center">
        <h1 className="text-[18px] text-white flex justify-center items-center text-nowrap">
          <span>{data.firstName[0]}</span> <span className='text-nowrap'>{data.lastName[0]}</span>
        </h1>
      </div>

      <div className='text-[15px] flex flex-col font-bold'>
         <div>
             <p>{data.firstName} {data.lastName}</p>
         </div>

        <div className='text-[12px] font-light'>
        <p>{data.email}</p>
        </div>

      </div>
      </div>

    <div className='flex items-center space-x-5'>
    {/* <Button className='border text-red-500 border-red-500'>Ignore</Button> */}
    <Button className='bg-blue-500 text-white' onClick={()=> {handleSave()}}>Add</Button>
     </div>
    </div>
  )
}

export default AddToContactList