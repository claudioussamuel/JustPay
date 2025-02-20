import DashboardBanner from './DashboardBanner'
import DashbaordInfo from './DashbaordInfo'

function DashbardContent() {
  return (
    <div className='bg-wineTexture h-[200vh]'>
         <DashboardBanner/>
         <DashbaordInfo/>
    </div>
  )
}

export default DashbardContent