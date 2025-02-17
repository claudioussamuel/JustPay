import { Button } from '@/components/ui/button'
import Link from 'next/link';
import { FaMoneyBillWave, FaUser, FaCommentDots, FaDollarSign, } from "react-icons/fa";


function RequestPaymentCard() {
  return (
    <div className='w-full flex justify-center font-dmMono'>
    <div className='leaderboard text-zinc-800 mt-20 border border-yellow-300 border-r-8'>
        <div className="leader">
        <div className='flex justify-center items-center'>
                <FaDollarSign className='text-5xl'/>
              </div>
           <h1> <Link href="/payment"><span>send Payment</span></Link> Request Payment</h1>
           <div>
            <h2>Request # <span>28</span></h2>
           </div>
        </div>

        <ul>
            <li className='pr-5'>
              <div className='flex justify-center items-center'>
                <FaUser className='text-5xl'/>
              </div>
              <h1 className='mr-2'>To</h1>
                <input className='outline-none w-[70%] p-[0.75rem]' type="text" /> 
            </li>

            <li className='pr-5'>
              <div className='flex justify-center items-center'>
                <FaCommentDots className='text-5xl'/>
              </div>
              <h1 className='mr-2'>message</h1>
                <textarea className='outline-none w-[70%] p-[0.75rem]' /> 
            </li>


            <li className='pr-5'>
            <div className='flex justify-center items-center'>
                <FaDollarSign className='text-5xl'/>
                </div>
              <h1 className='mr-2'>Amount</h1>
                <input className='outline-none w-[70%] p-[0.75rem]' /> 
            </li>

            <div  className='flex justify-center py-10 mx-5'>
            <Button className='w-full'>send</Button>
            </div>
        </ul>
    </div>
    </div>
  )
}

export default RequestPaymentCard