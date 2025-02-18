import React from 'react'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaRegMessage } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { PiPathFill } from "react-icons/pi";


type GroupTypes={
  data:{
    firstName:string;
    lastName:string;
    gmail:string;
    number:string;
    date:string;
    pathner:string;
  }

}

function GroupCard({data}:GroupTypes) {
  return (
    <div className="w-80 border rounded-lg p-3 border-zinc-800 font-dmMono">

       <div className='flex justify-between '>

        <div className='flex justify-between gap-5'>
          <div>
          <Avatar>
            <AvatarImage src="https://pyxis.nymag.com/v1/imgs/b1c/bb1/f34eb12e99381d8dbef2aee125da6970d1-NICKELODEON-AVATAR-313-204644-1920x1080.rhorizontal.w700.jpg" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div>
            <h1>{data.firstName} {data.lastName}</h1>
            <p>{data.date}</p>
          </div>
        </div>

        <PiDotsThreeOutlineFill className="text-3xl text-zinc-800"/>
       </div>
       <div className='h-[2px] w-full bg-gray-400 mt-2'/>

       <div className='pt-3 space-y-3'>
          <div className='items-center flex gap-2'>
            <FaRegMessage/>
            <h3>{data.number}</h3>
          </div>

          <div className='items-center flex gap-2'>
            <MdAlternateEmail/>
            <h3>{data.gmail}</h3>
          </div>

          <div className='items-center flex gap-2'>
            <PiPathFill/>
            <h3>{data.pathner}</h3>
          </div>

       </div>

    </div>
  )
}

export default GroupCard