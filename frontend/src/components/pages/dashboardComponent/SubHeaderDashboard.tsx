import { navLinks } from '@/app/data'
import Link from 'next/link'
import React from 'react'

function SubHeaderDashboard() {
  return (
    <div className='space-x-5 p-3 font-dmMono bg-softBlend  flex '>
        {navLinks.map(({name,href})=>(
            <Link href={href} key={href} className='text-[20px]'>
               <h1 className='capitalize  hover:text-zinc-800 hover:underline'>{name}</h1> 
            </Link>
        ))}
        </div>
  )
}

export default SubHeaderDashboard