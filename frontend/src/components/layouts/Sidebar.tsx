"use client";
import Image from 'next/image'
import { sidearContent } from "@/app/data";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Button } from '../ui/button';
import { useFundWallet, useWallets } from '@privy-io/react-auth';


function Sidebar() {
  const pathname = usePathname();
  const {wallets} = useWallets();
  const {fundWallet} = useFundWallet();

  return (
    <div className="bg-wineTexture border border-t-0 border-l-0 border-black h-[100vh] ">
      <div className="flex justify-center text-3xl">
      <Link href="/">
           <Image src="/images/app-logo.png" alt="app_logo" width={130} height={130}/>
        </Link>
      </div>

      <div className="grid place-content-center space-y-5 text-zinc-800">
        {sidearContent.map(({ name, href, icon }, index) => (
          <Link
            href={href}
            className={clsx(
              "flex items-center gap-3 font-dmMono capitalize text-[20px]",
              {
                "bg-softBlend px-5 py-2 ": pathname === href,
              }
            )}
            key={index}
          >
            {icon}
            {name}
          </Link>
        ))}

        <Button 
          onClick={()=>fundWallet(wallets[0].address)}
          className='font-dmMono bg-black text-white'>
          Fund Wallet</Button>
        
      </div>
    </div>
  );
}

export default Sidebar;
