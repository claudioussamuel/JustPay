
import Payment from '@/components/pages/paymentComponent'
import ProtectedRoute from '@/hooks/ProtectedRoute'


function Page() {
  return (
    <ProtectedRoute>
      <Payment/>
    </ProtectedRoute>
  )
}

export default Page