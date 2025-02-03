import React from 'react'
import { BsStarFill } from 'react-icons/bs';

type ItemProps={
    firstName:string;
    lastName:string;
    occupation:string;
    relationship:string;
}

function ContactData({ data }: { data: ItemProps }) {
  return (
    <div className="flex mb-3 items-center gap-5 text-zinc-800">
      {/* Profile Icon */}
      <div className="w-10 h-10 p-3 rounded-full font-dmMono bg-gradient-to-r text-nowrap from-pink-500 via-purple-500 to-indigo-500 flex justify-center items-center">
        <h1 className="text-[18px] text-white flex justify-center items-center text-nowrap">
          <span className=''>{data.firstName[0]}</span> <span className='text-nowrap'>{data.lastName[0]}</span>
        </h1>
      </div>

      {/* Name, Relationship, and Occupation */}
      <div className="flex flex-col">
        <div className="flex gap-3 items-center">
          {/* Name */}
          <div className="text-2xl font-semibold text-nowrap">
            <h1 className='text-nowrap text-[20px]'>{data.firstName} {data.lastName}</h1>
          </div>
          
          {/* Relationship Badge */}
          <div className="bg-brand-beige h-3 rounded-md flex justify-center px-2">
            <h1 className="text-[8px]">{data.relationship}</h1>
          </div>
        </div>

        {/* Occupation */}
        <div>
          <h3 className="text-sm text-zinc-600">{data.occupation}</h3>
        </div>
      </div>


    </div>
  );
}


export default ContactData