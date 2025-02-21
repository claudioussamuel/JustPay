import React from 'react'
import { ContactAddedType } from '../../../types/global.types'
import { Button } from '../ui/button'


function AddToContactList({data}:{data:ContactAddedType}) {
  return (
    <div className='border border-t border-b border-black flex p-5 rounded-md '>

     <div className='flex gap-5 items-center'>

      <div className="w-10 h-10 p-3 rounded-full place-self-start font-dmMono bg-gradient-to-r text-nowrap from-pink-500 via-purple-500 to-indigo-500 flex justify-center items-center">
        <h1 className="text-[18px] text-white flex justify-center items-center text-nowrap">
          <span>{data.firstName[0]}</span> <span className='text-nowrap'>{data.lastName[0]}</span>
        </h1>
      </div>

      <div className='text-[15px] flex flex-col font-bold'>
         <div>
             <p>{data.firstName} {data.lastName}</p>
         </div>

        <div className='text-[12px] font-light'>
        <p>{data.occupation}</p>
        </div>

      </div>

     </div>

    <div className='flex items-center space-x-5'>
    <Button className='border text-red-500 border-red-500'>Ignore</Button>
    <Button className='bg-blue-500 text-white'>Add</Button>
 </div>



 
    </div>
  )
}

export default AddToContactList