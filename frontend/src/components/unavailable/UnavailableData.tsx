import Image from 'next/image'
import React from 'react'
import { UnavailabeDataType } from '../../../types/global.types'


function UnavailableData({title,image,description}:UnavailabeDataType) {
  return (
    <div className='h-dvh'>
        <div className='grid place-content-center place-self-center py-5'>
            <h1 className='font-bowlby text-zinc-800 text-3xl mb-5 text-center'>{title}</h1>

            <div className='mb-5'>
                <Image src={image} width={450} height={450} alt={`${image}.txt`}/>
            </div>

            <div>
                <p className='font-dmMono text-zinc-800 '>{description}</p>
            </div>

        </div>
    </div>
  )
}

export default UnavailableData