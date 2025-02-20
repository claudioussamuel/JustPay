import Dashboard from '@/components/pages/dashboardComponent'
import ProtectedRoute from '@/hooks/ProtectedRoute'
import React from 'react'

function page() {
  return (
    <ProtectedRoute>
        <Dashboard/>
    </ProtectedRoute>
  ) 
}

export default page