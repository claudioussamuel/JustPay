import Image from 'next/image'

import  { sociaLinks, footerLinks} from '@/app/data';
import Link from 'next/link';
import { LuSmile } from "react-icons/lu";




export function Footer() {
  return (
         <div className='h-auto border-t border-white text-white  font-dmMono'>

          <div className='flex flex-col md:flex-row border-b border-white'>

            <div className='md:p-3 md:py-2 border-r-0 border-b-0 border-white flex-[10%] grid place-content-center'>
            <Link href="/" className='flex justify-center border-b border-white  md:border-b-0 lg:border-b-0 '>
                <Image
                  src="/images/app-logo.png"
                  alt='company-logo'
                  className='invert'
                  width={150}
                  height={150}
                />
           </Link>
            </div>

            <div className='py-2  md:border-l md:border-r flex justify-center items-center border-white flex-[20%] '>
              <LuSmile className='border-b text-white w-full border-white text-2xl md:text-3xl md:border-b-0  h-28 py-3'/>
            </div>

            <div className='py-2  flex-[50%] border-b-0 border-r-0 md:border-r border-white '>

            <div className='grid grid-cols-2 text-[12px]  md:text-[18px] border-b-0 md:grid-cols-2 lg:grid-cols-4  gap-10 ml-10 md:ml-1 pt-10 md:p-5 uppercase font-nunito mb-5'>
                {footerLinks.map((nav)=>(
                  <Link href={nav.href} key={nav.href}>
                    {nav.name}
                  </Link>
                ))}
             </div>

             <p className='text-center text-[7px] font-nunito md:text-[10px] lg:text-[12px] uppercase mb-3'>payment made with ease as easy breezy.. .</p>
           </div>

             <div className='border-t  justify-center  border-white flex-[20%] font-nunito uppercase md:border-0 '>
              {sociaLinks.map(social=>(
                <Link href={social.href} key={social.name} className='flex justify-center items-center border-b py-3 text-[10px] md:text-[18px] border-white hover:text-red-500 last:border-b-0'>
                  <h1 className='mr-2 ml-5'>{social.name}</h1> 
                  {social.icon}
                </Link>
              ))}
          </div> 

          </div>

          

          <div className='uppercase font-nunito text-[13px]'>
            <p className='text-center'>&copy;2025 justpay global</p>
          </div>

        </div>
  )
}