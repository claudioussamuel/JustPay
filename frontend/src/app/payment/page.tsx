
import Payment from '@/components/pages/paymentComponent'
import ProtectedRoute from '@/hooks/ProtectedRoute'
import React from 'react'

function Page() {
  return (
    <ProtectedRoute>
      <Payment/>
    </ProtectedRoute>
  )
}

export default Page