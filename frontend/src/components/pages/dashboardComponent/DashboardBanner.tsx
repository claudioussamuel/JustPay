import React from 'react'
import DashboardHeader from './DashboardHeader'
import SubHeaderDashboard from './SubHeaderDashboard'
import { ArrowLeftCircle } from 'lucide-react'
import Link from 'next/link'


function DashboardBanner() {
  return (
    <div className='text-3xl h-[40vh] bg-wineTexture border-b border-black'>
        <DashboardHeader/>
        <SubHeaderDashboard/>

        <Link href="/payment">
        <div className='flex items-center gap-5 text-[20px] font-dmMono p-3 text-zinc-800'>
          <ArrowLeftCircle/>
          <h1>Go to payment</h1>
        </div>
       </Link>
    </div>
  )
}

export default DashboardBanner