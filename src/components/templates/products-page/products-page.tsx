import { Plus } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'

import { Button } from '@/components/atoms/button'
import { ResponsiveModal } from '@/components/molecules/responsive-modal'
import { ProductForm } from '@/components/organisms/product-form'
import { ProductTable } from '@/components/organisms/product-table'
import { mockProducts } from '@/data/mock-products'
import type { CreateProduct, Product } from '@/types/product'

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateProduct = async (data: CreateProduct) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newProduct: Product = {
      ...data,
      id: String(products.length + 1),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setProducts((prev) => [newProduct, ...prev])
    setIsLoading(false)
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen pl-16 md:pl-[17rem]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="p-4 md:p-8"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Products
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Manage your product catalog
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full gap-2 md:w-auto"
            >
              <Plus className="h-4 w-4" />
              Create Product
            </Button>
          </motion.div>
        </motion.div>

        <ProductTable products={products} />

        <ResponsiveModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          title="Create Product"
          description="Add a new product to your catalog."
        >
          <ProductForm
            onSubmit={handleCreateProduct}
            onCancel={() => setIsModalOpen(false)}
            isLoading={isLoading}
          />
        </ResponsiveModal>
      </motion.div>
    </div>
  )
}
