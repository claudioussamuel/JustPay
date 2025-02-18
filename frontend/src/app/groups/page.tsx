import Groups from '@/components/pages/groupComponent'
import ProtectedRoute from '@/hooks/ProtectedRoute'
import React from 'react'

function Page() {
  return (
    <ProtectedRoute>
        <Groups/>
    </ProtectedRoute>
  )
}

export default Page