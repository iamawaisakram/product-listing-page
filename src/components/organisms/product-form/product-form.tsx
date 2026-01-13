import { zodResolver } from '@hookform/resolvers/zod'
import { motion, type Variants } from 'motion/react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { Textarea } from '@/components/atoms/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/molecules/select'
import {
  categories,
  type CreateProduct,
  createProductSchema,
  statuses,
} from '@/types/product'

interface ProductFormProps {
  onSubmit: (data: CreateProduct) => void
  onCancel: () => void
  isLoading?: boolean
}

export function ProductForm({
  onSubmit,
  onCancel,
  isLoading,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateProduct>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(createProductSchema) as any,
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: 'Other',
      stock: 0,
      sku: '',
      status: 'Draft',
    },
  })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 24,
      },
    },
  }

  const onFormSubmit: SubmitHandler<CreateProduct> = (data) => {
    onSubmit(data)
  }

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-5"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          placeholder="Enter product name"
          {...register('name')}
        />
        {errors.name ? (
          <p className="text-destructive text-sm">{errors.name.message}</p>
        ) : null}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter product description"
          rows={3}
          {...register('description')}
        />
        {errors.description ? (
          <p className="text-destructive text-sm">
            {errors.description.message}
          </p>
        ) : null}
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register('price')}
          />
          {errors.price ? (
            <p className="text-destructive text-sm">{errors.price.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            placeholder="0"
            {...register('stock')}
          />
          {errors.stock ? (
            <p className="text-destructive text-sm">{errors.stock.message}</p>
          ) : null}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="sku">SKU</Label>
        <Input id="sku" placeholder="Enter SKU" {...register('sku')} />
        {errors.sku ? (
          <p className="text-destructive text-sm">{errors.sku.message}</p>
        ) : null}
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            // eslint-disable-next-line react-hooks/incompatible-library
            value={watch('category')}
            onValueChange={(value) =>
              setValue('category', value as CreateProduct['category'])
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category ? (
            <p className="text-destructive text-sm">
              {errors.category.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={watch('status')}
            onValueChange={(value) =>
              setValue('status', value as CreateProduct['status'])
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.status ? (
            <p className="text-destructive text-sm">{errors.status.message}</p>
          ) : null}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? 'Creating...' : 'Create Product'}
        </Button>
      </motion.div>
    </motion.form>
  )
}
