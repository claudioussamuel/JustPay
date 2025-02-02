import React from 'react'

function BaseDescription() {
  return (
          <div className='border-t py-10 border-b overflow-hidden'>
          <div className='flex mx-10 relative w-full justify-between flex-col items-center ~gap-2/4 lg:flex-row'>
            <p className='font-dmMono max-w-[70ch] text-white text-[20px] ~text-lg/xl'> 
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non harum consequuntur repellendus consectetur temporibus fugit deserunt ad, aut porro ea veritatis quis aspernatur nulla voluptates optio distinctio esse necessitatibus corporis unde rem nesciunt facilis alias praesentium nam. Non cupiditate ratione fuga, nemo repudiandae esse tenetur aut debitis obcaecati praesentium accusamus!</p>

            <div className='mr-20'>
            <button  className='button-cutout bg-brand-light p-3  block font-dmMono'>
              <p className='text-white capitalize'>get started</p>
            </button>
            </div>
        </div>

      </div>
  )
}

export default BaseDescription