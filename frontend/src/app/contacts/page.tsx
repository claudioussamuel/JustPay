import ContactComponent from '@/components/pages/contactComponent'
import ProtectedRoute from '@/hooks/ProtectedRoute'
import React from 'react'


function Page() {
  return (
    <ProtectedRoute>
      <ContactComponent/>
    </ProtectedRoute>

  )
}

export default Page