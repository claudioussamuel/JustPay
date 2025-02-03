"use client"

import Image from 'next/image'
import React from 'react'

function MoveUp() {
    const scrollTop=()=>{
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        })
    }
  return (
    <div className='absolute left-[80%] cursor-pointer'>
        <div onClick={scrollTop}>
         <Image
         src="/images/scroll.png"
          width={50}
          height={50}
          alt='arrow'
         />
        </div>
    </div>
  )
}

export default MoveUp