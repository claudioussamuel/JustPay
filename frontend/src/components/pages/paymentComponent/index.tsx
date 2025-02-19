import PaymentContent from "./PaymentContent"
import { IoMdWallet } from "react-icons/io";



function Payment() {
  return (
    <div className="h-auto">
         <div className=' bg-softBlend flex justify-between items-center p-5 rounded-2xl mb-10'>
            <div className='flex flex-col font-dmMono text-[20px]'>
             <h2>Total Balance</h2>
             <div className='flex flex-row gap-5 items-center'>
                <IoMdWallet/>
                <h2>0xFF805555621</h2>
             </div>
            </div>

            <div className='text-7xl font-bowlby text-brand-gray'>
                <h2>$48,654,00</h2>
            </div>
         </div>
        <PaymentContent/>
    </div>
  )
}

export default Payment