import React from 'react'
import PaymentContent from './PaymentContent'
import PaymentBanner from './PaymentBanner'


function Payment() {
  return (
    <div className='h-dvh'>
        <PaymentBanner/>
        <PaymentContent/>
    </div>
  )
}

export default Payment