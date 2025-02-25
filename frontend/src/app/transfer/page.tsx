import Transfer from '@/components/pages/transferComponent'
import ProtectedRoute from '@/hooks/ProtectedRoute'
import React from 'react'

function Page() {
  return (
    <ProtectedRoute>
      <Transfer/>
    </ProtectedRoute>
  ) 
  
}

export default Page