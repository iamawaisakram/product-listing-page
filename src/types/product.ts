import { z } from 'zod'

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  category: z.enum(['Electronics', 'Clothing', 'Food', 'Books', 'Other']),
  stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
  sku: z.string().min(1, 'SKU is required'),
  status: z.enum(['Active', 'Draft', 'Archived']),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createProductSchema = productSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type Product = z.infer<typeof productSchema>
export type CreateProduct = z.infer<typeof createProductSchema>

export const categories = [
  'Electronics',
  'Clothing',
  'Food',
  'Books',
  'Other',
] as const
export const statuses = ['Active', 'Draft', 'Archived'] as const
