import History from '@/components/pages/historyComponent'
import ProtectedRoute from '@/hooks/ProtectedRoute'


function Page() {
  return (
    <ProtectedRoute>
      <History/>
    </ProtectedRoute>
  )
}

export default Page