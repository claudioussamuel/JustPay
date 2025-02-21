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

  return (
    <div className='grid place-content-center'>
        <div className='space-y-5 grid grid-cols-3 gap-10'>
            {requests.map((item, index) => (
                <GroupCard key={index} data={item} />
            ))}
        </div>
    </div>
  )
}

export default AcceptOrDecline