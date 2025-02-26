"use client"

import { Badge } from '@/components/ui/badge';
import clsx from 'clsx';
import React from 'react'
import { Contact } from '../../../../types/Context.types';
import { useSelectedContactContext } from '@/app/context/SelectContext';



function ContactData({ data, className ,isHighlighted}: { data: Contact, className?: string,isHighlighted:boolean }) {
   const {setSelectedContact} = useSelectedContactContext()
  
  return (
    <div
     onClick={()=>setSelectedContact(data)} 
    className={
      clsx("flex mb-3 items-center cursor-pointer justify-between gap-5 text-zinc-800 group transition duration-300 hover:bg-zinc-100 hover:shadow-md p-3 rounded-lg", className,{"bg-yellow-100":isHighlighted})}>
      
      <div className="flex gap-5">

        <div className="w-10 h-10 p-3 rounded-full font-dmMono bg-gradient-to-r text-nowrap from-pink-500 via-purple-500 to-indigo-500 flex justify-center items-center 
        transition duration-300 group-hover:scale-110">

          <div>
            <h1 className=" text-[18px] text-white flex justify-center items-center text-nowrap">
              <span>{data.firstName[0]}</span> <span className="text-nowrap">{data.lastName[0]}</span>
            </h1>
          </div>

        </div>

        <div className="text-2xl font-semibold text-nowrap">
          <h1 className={clsx("text-nowrap text-[20px] transition duration-300 group-hover:text-purple-600", className)}>
            {data.firstName} {data.lastName}
          </h1>

          <div className="text-[13px] font-light transition duration-300 group-hover:text-zinc-500">
            <p>{data.phone}</p>
          </div>
        </div>

      </div>

      <div className="hidden md:block md:place-self-start">
        <Badge className="text-[12px] transition duration-300 group-hover:bg-purple-600 group-hover:text-white">
          {data.email}
        </Badge>
      </div>

    </div>
  );
}

export default ContactData;
