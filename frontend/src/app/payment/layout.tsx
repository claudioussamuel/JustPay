import React, { ReactNode } from 'react'
import Sidebar from '../../components/layouts/Sidebar'



function Layout({children}:{children:ReactNode}) {
  return (
    <div className='flex bg-wineTexture gap-20'>
        <div className=' fixed top-0 left-0 h-[100vh] w-[80px] lg:w-[200px]'>
          <Sidebar/>
        </div>

        <div className='ml-[4.8rem] md:ml-[80px] lg:ml-[200px] md:p-5 flex-[90%] md:flex-[80%]'>
            {children}
        </div>

    </div>
  )
}

export default Layout