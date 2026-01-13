import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Search } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/molecules/table'
import { cn } from '@/lib/utils'
import type { Product } from '@/types/product'

interface ProductTableProps {
  products: Product[]
}

export function ProductTable({ products }: ProductTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="-ml-4"
          >
            Product
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div>
            <div className="font-medium">{row.getValue('name')}</div>
            <div className="text-muted-foreground text-sm">
              {row.original.sku}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => (
          <span className="bg-secondary rounded-full px-2.5 py-0.5 text-xs font-medium">
            {row.getValue('category')}
          </span>
        ),
      },
      {
        accessorKey: 'price',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="-ml-4"
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const price = parseFloat(row.getValue('price'))
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(price)
          return <span className="font-medium">{formatted}</span>
        },
      },
      {
        accessorKey: 'stock',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="-ml-4"
          >
            Stock
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const stock = row.getValue('stock') as number
          return (
            <span
              className={cn(
                'font-medium',
                stock < 50 && 'text-destructive',
                stock >= 50 && stock < 100 && 'text-amber-600',
                stock >= 100 && 'text-green-600'
              )}
            >
              {stock}
            </span>
          )
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string
          return (
            <span
              className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                status === 'Active' && 'bg-green-100 text-green-700',
                status === 'Draft' && 'bg-amber-100 text-amber-700',
                status === 'Archived' && 'bg-gray-100 text-gray-700'
              )}
            >
              <span
                className={cn(
                  'mr-1.5 h-1.5 w-1.5 rounded-full',
                  status === 'Active' && 'bg-green-500',
                  status === 'Draft' && 'bg-amber-500',
                  status === 'Archived' && 'bg-gray-500'
                )}
              />
              {status}
            </span>
          )
        },
      },
      {
        id: 'actions',
        cell: () => (
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        ),
      },
    ],
    []
  )

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: products,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-sm">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search products..."
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-9"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-x-auto rounded-lg border"
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {table.getRowModel().rows?.length > 0 ? (
                table.getRowModel().rows.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.03,
                    }}
                    className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>

      <div className="text-muted-foreground text-sm">
        Showing {table.getFilteredRowModel().rows.length} of {products.length}{' '}
        products
      </div>
    </div>
  )
}
