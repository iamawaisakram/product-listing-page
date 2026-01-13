import { Sidebar } from '@/components/organisms/sidebar'
import { ProductsPage } from '@/components/templates/products-page'

function App() {
  return (
    <div className="bg-background min-h-screen">
      <Sidebar />
      <ProductsPage />
    </div>
  )
}

export default App
