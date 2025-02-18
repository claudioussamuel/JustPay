import Dashboard from '@/components/pages/dashboardComponent'
import ProtectedRoute from '@/hooks/ProtectedRoute'
import React from 'react'

function Page() {
  return(
    <ProtectedRoute>
        <Dashboard/>
    </ProtectedRoute>
  )
}

export default Page