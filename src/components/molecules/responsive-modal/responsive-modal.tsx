import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'

import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog'
import { useIsMobile } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

interface ResponsiveModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  title: string
  description?: string
}

export function ResponsiveModal({
  open,
  onOpenChange,
  children,
  title,
  description,
}: ResponsiveModalProps) {
  const isMobile = useIsMobile()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open ? (
          <DialogPortal forceMount>
            <DialogOverlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </DialogOverlay>
            {isMobile ? (
              // Mobile: Bottom drawer
              <motion.div
                className={cn(
                  'bg-background fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-[10px] p-6 shadow-lg'
                )}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{
                  type: 'spring',
                  damping: 30,
                  stiffness: 300,
                }}
              >
                {/* Drag handle */}
                <div className="bg-muted mx-auto mb-4 h-1.5 w-12 rounded-full" />
                <DialogTitle className="text-lg font-semibold">
                  {title}
                </DialogTitle>
                {description ? (
                  <DialogDescription className="text-muted-foreground mt-1 text-sm">
                    {description}
                  </DialogDescription>
                ) : null}
                <div className="mt-4">{children}</div>
                <DialogClose className="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </motion.div>
            ) : (
              // Desktop: Centered modal (like dub.sh)
              <motion.div
                className={cn(
                  'bg-background fixed inset-0 z-50 m-auto h-fit w-full max-w-md overflow-hidden rounded-2xl border p-0 shadow-xl'
                )}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  type: 'spring',
                  damping: 25,
                  stiffness: 300,
                }}
              >
                <div className="p-6">
                  <DialogTitle className="text-lg font-semibold">
                    {title}
                  </DialogTitle>
                  {description ? (
                    <DialogDescription className="text-muted-foreground mt-1 text-sm">
                      {description}
                    </DialogDescription>
                  ) : null}
                  <div className="mt-6">{children}</div>
                </div>
                <DialogClose className="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </motion.div>
            )}
          </DialogPortal>
        ) : null}
      </AnimatePresence>
    </Dialog>
  )
}
