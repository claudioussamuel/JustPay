'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation';

import {navLinks} from '@/app/data';
import clsx from 'clsx';
import { Button } from '../ui/button';
import { usePrivy } from '@privy-io/react-auth';

import { CgMenuOreos } from "react-icons/cg";
import { useState } from 'react';



function Header() {
    const pathname = usePathname();
    const {login, authenticated,user,logout,} = usePrivy()
    const walletAddress = user?.wallet?.address;
    const [showToggle, setShowToggle] = useState(false)

  function handleToggleShow(){
    setShowToggle((prev)=>!prev)
  }

    

  return (
    <div>

    <div className=' hidden lg:block bg-wineTexture  border border-zinc-800 border-b-0 border-l-0 border-r-0'>

    <div className='flex items-center justify-between mt-1 border border-zinc-800 border-l-0 text-zinc-800'>
        <div>
            <Link href="/">
                  <h1 className='font-bowlby ml-10 text-4xl capitalize'>just<span className='font-playWright'>pay</span></h1>
             </Link>
        </div>

        <div>
           <div className='flex  items-center text-[18px] font-dmMono capitalize'>
             {navLinks.map((items,index)=>(
                <Link className={clsx(`py-5 px-10 border-l border-zinc-800
                 first:border-zinc-800 ${index === navLinks.length-1 ? 'border-r':''}`,{
                    'bg-softBlend uppercase':pathname===items.href
                 })} href={items.href} key={index}>
                    {items.name}
                </Link>
             ))}

             <div className='flex space-x-3 ml-5 gap-5 items-center'>

               {authenticated &&(
                  <div className='border border-zinc-800 border-r border-l-0 border-t-0 border-b-0 py-5 '>
                        <h1>{walletAddress?.slice(0,10)}...</h1>
                        </div>
               )}


        <div className='px-3 pr-10'>
         {authenticated ? (
              <Button 
            onClick={logout} 
            className='button-cutout text-[18px] text-zinc-800 bg-brand-beige hover:bg-brand-beige'>
            logout
        </Button>
          ) : (
        <Button 
            onClick={login} 
            className='button-cutout text-[18px] text-zinc-800 bg-brand-beige hover:bg-brand-beige'>
            login
        </Button>
    )}
         </div>
            </div>
           </div>
        </div>
    </div>
    </div>

    <div className='relative lg:hidden'>
     <div className='text-zinc-800 flex items-center overflow-x-hidden justify-between'>
            <Link href="/">
                <Image
                  src="/images/app-logo.png"
                  alt='company-logo'
                  width={100}
                  height={100}
                  />
           </Link>
        <CgMenuOreos onClick={handleToggleShow} className='text-3xl mr-5 cursor-pointer'/>
     </div>

     {showToggle && (
          <div className='absolute h-[100vh] bg-softBlend  w-[50%] z-50 top-24 border border-t-0 border-l-0 border-zinc-800'>
            <div className='flex flex-col items-center text-[18px] font-dmMono capitalize'>
             {navLinks.map((items,index)=>(
                <Link className={clsx(`py-5 px-10  border-zinc-800
                 first:border-zinc-800  hover:text-zinc-800`,{
                    'bg-softBlend uppercase':pathname===items.href
                 })} href={items.href} key={index}>
                    {items.name}
                </Link>
             ))}

             <div className='flex flex-col space-x-3 ml-5 gap-5 items-center'>
               {authenticated &&(
                  <div className=' py-5 '>
                        <h1>{walletAddress?.slice(0,10)}...</h1>
                        </div>
               )}


        <div className='px-3 pr-10'>
         {authenticated ? (
              <Button 
            onClick={logout} 
            className='button-cutout text-[18px] text-zinc-800 bg-brand-beige hover:bg-brand-beige'>
            logout
        </Button>
          ) : (
        <Button 
            onClick={login} 
            className='button-cutout text-[18px] text-zinc-800 bg-brand-beige hover:bg-brand-beige'>
            login
        </Button>
    )}
         </div>
            </div>
           </div>
         </div>
     )}

    </div>

    </div>
  )
}

export default Header