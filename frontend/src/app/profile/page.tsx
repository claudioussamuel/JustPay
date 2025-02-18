import ProfileComponent from '@/components/pages/profileComponent'
import ProtectedRoute from '@/hooks/ProtectedRoute'
import React from 'react'

function Page() {
  return (
    <ProtectedRoute>
      <ProfileComponent/>
    </ProtectedRoute>
  ) 
  
}

export default Page