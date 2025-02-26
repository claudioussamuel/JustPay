"use client";
import Image from 'next/image'
import { sidearContent } from "@/app/data";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Button } from '../ui/button';
import { useFundWallet} from '@privy-io/react-auth';
import { usePrivy } from '@privy-io/react-auth';
import { WalletIcon } from 'lucide-react';


function Sidebar() {
  const pathname = usePathname();
  const {fundWallet} = useFundWallet();
  const {user} = usePrivy()
  const walletAddress = user?.wallet?.address;

  return (
    <div className="bg-wineTexture   border border-t-0 border-l-0 border-black h-[100vh] ">
      <div className=" mb-5 md:mb-0 md:flex md:justify-center text-3xl">
      <Link href="/">
           <Image src="/images/app-logo.png" alt="app_logo" className='object-cover w-20 h-20 ' width={130} height={130}/>
        </Link>
      </div>

      <div className=" lg:place-content-center space-y-5 text-zinc-800">
        {sidearContent.map(({ name, href, icon }, index) => (
          <Link
       href={href}
      className={clsx(
      "flex items-center place-self-center gap-3 font-dmMono capitalize md:text-[20px]",
    {
      "bg-softBlend   md:px-10 md:py-2 w-[35px] lg:w-full ": pathname.startsWith(href),
    }
  )}
      key={index}
        >
   <span className='text-3xl  '>{icon}</span>  
  <span className="hidden lg:block ">{name}</span> 
</Link>
        ))}

      <div className='grid place-content-center sm:hidden md:block lg:block w-full'>
      <Button 
          onClick={()=>fundWallet(`${walletAddress}`)}
          className=' font-dmMono w-full bg-black text-white text-[10px] md:text-[20px]'>
            <WalletIcon className='inline sm:hidden md:block lg:block'/>
          <span className='hidden lg:block'>Fund Wallet</span>
          </Button>
      </div>

      </div>
    </div>
  );
}

export default Sidebar;
