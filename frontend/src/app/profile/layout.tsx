import Sidebar from '@/components/layouts/Sidebar'
import React, { ReactNode } from 'react'

function Layout({children}:{children:ReactNode}) {
  return (
    <div>
        <div>
        <Sidebar/>
        </div>
        
        <div>
        {children}
        </div>
    </div>
  )
}

export default Layout