'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

import {navLinks} from '@/app/data';
import clsx from 'clsx';

function Header() {
    const pathname = usePathname();

  return (
    <div className='border border-white border-b-0 border-l-0 border-r-0'>

    <div className='flex items-center justify-between mt-1 border border-white border-l-0 text-white'>
        <div>
            <Link href="/">
                  <h1 className='font-bowlby ml-10 text-4xl capitalize'>just<span className='font-playWright'>pay</span></h1>
             </Link>
        </div>

        <div>
           <div className='flex  items-center text-[18px] font-dmMono capitalize'>
             {navLinks.map((items,index)=>(
                <Link className={clsx(`py-5 px-10 border-l
                 first:border-white ${index === navLinks.length-1 ? 'border-r':''}`,{
                    'bg-brand-hue-color':pathname===items.href
                 })} href={items.href} key={index}>
                    {items.name}
                </Link>
             ))}

             <div className='flex space-x-3 ml-5'>
                <h1 className='lg:hidden'>connect</h1>
                <h1 className='pr-5'>login</h1>
             </div>
           </div>

        </div>

    </div>

    </div>
  )
}

export default Header