import { eventGroup } from '@/app/data'
import React, { useEffect, useState } from 'react'
import GroupCard from '../groupComponent/GroupCard'
import { readMyRequests } from '@/lib/integrations/viem/contract'
import { usePrivy } from '@privy-io/react-auth';

interface Request {
  requestor:string;
  amount:bigint;
  message:string;
  name:string;
  stableCoin:string;
  time:bigint;
}
import UnavailableData from '@/components/unavailable/UnavailableData'

function AcceptOrDecline() {
  const [requests, setRequests] = useState<Request[]>([]);


  const { user,} = usePrivy()
  const walletAddress = user?.wallet?.address;

  useEffect(() => {
    const fetchRequests = async () => {
     // Replace with actual user address
      const data = await readMyRequests(`${walletAddress}` as `0x${string}`);
      if (data) {
        setRequests(data);
      }
    };

    fetchRequests();
  }, []);

  if(requests.length===0){
    return(
      <UnavailableData title="Nothings to accept or decline"
      description="For the mean time we have nothing to acess"
      image="/images/yes.png"
      />
    )
  }
  return (
    <div className='grid place-content-center'>
        <div className='space-y-5 grid grid-cols-3 gap-10'>
            {requests.map((item, index) => (
                <GroupCard index={index} key={index} data={item} />
            ))}
        </div>
    </div>
  )
}

export default AcceptOrDecline