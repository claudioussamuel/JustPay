import React from 'react'

function BaseDescription() {
  return (
          <div className='flex flex-col gap-5 h-auto'>
              <div>
                <p className='text-[20px] font-dmMono'>Experience fast, secure, and low-cost transactions with JustPay. Our platform lets you send and receive stablecoins effortlessly—just like traditional payment apps, but powered by blockchain technology.</p>
              </div>

              <div className='grid place-content-center'>
                <button className='button-cutout bg-brand-beige px-5 py-5 font-dmMono uppercase text-[18px]'>get started</button>
              </div>
      </div>
  )
}

export default BaseDescription