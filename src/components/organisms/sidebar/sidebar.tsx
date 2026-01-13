import {
  BarChart3,
  FileBarChart,
  FileText,
  Grid3X3,
  Home,
  Megaphone,
  Menu,
  Package,
  ShoppingCart,
  Stethoscope,
  Store,
  Truck,
  Users,
  X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { useIsMobile } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

interface NavItem {
  icon: React.ElementType
  label: string
  href: string
  isActive?: boolean
}

interface NavSection {
  title?: string
  items: NavItem[]
}

const navigation: NavSection[] = [
  {
    items: [
      { icon: Home, label: 'Home', href: '#', isActive: true },
      { icon: BarChart3, label: 'Analytics', href: '#' },
      { icon: ShoppingCart, label: 'Sales', href: '#' },
    ],
  },
  {
    title: 'Catalog',
    items: [
      { icon: Package, label: 'Products', href: '#' },
      { icon: Grid3X3, label: 'Categories', href: '#' },
      { icon: Truck, label: 'Suppliers', href: '#' },
    ],
  },
  {
    title: 'Marketing',
    items: [{ icon: Megaphone, label: 'Promotions', href: '#' }],
  },
  {
    title: 'People',
    items: [
      { icon: Users, label: 'Customers', href: '#' },
      { icon: Stethoscope, label: 'Prescribers', href: '#' },
    ],
  },
  {
    title: 'Insights',
    items: [{ icon: FileBarChart, label: 'Reports', href: '#' }],
  },
]

function IconSidebar({ onMenuClick }: { onMenuClick?: () => void }) {
  const isMobile = useIsMobile()

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-sidebar fixed top-0 left-0 z-50 flex h-screen w-16 flex-col items-center border-r py-4"
    >
      <div className="mb-6">
        <span className="text-lg font-bold tracking-tight">SLAP</span>
      </div>

      <div className="bg-muted text-muted-foreground mb-4 flex h-10 w-10 items-center justify-center rounded-lg text-xs font-medium">
        AP
      </div>

      <div className="flex flex-1 flex-col items-center gap-2">
        {isMobile && onMenuClick ? (
          <button
            onClick={onMenuClick}
            className="text-muted-foreground hover:bg-muted flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        ) : null}
        <button className="text-muted-foreground hover:bg-muted flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm transition-colors">
          <FileText className="h-5 w-5" />
        </button>
        <button className="text-muted-foreground hover:bg-muted flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
          <Store className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-auto flex flex-col items-center gap-3" />
    </motion.div>
  )
}

function MainSidebar({
  isOpen,
  onClose,
}: {
  isOpen?: boolean
  onClose?: () => void
}) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="bg-sidebar fixed top-0 left-16 z-50 flex h-screen w-52 flex-col border-r"
            >
              <div className="flex items-center justify-between border-b p-4">
                <span className="text-foreground text-sm font-semibold">
                  Organization
                </span>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-3 py-4">
                <nav className="space-y-1">
                  {navigation.map((section, sectionIndex) => (
                    <motion.div
                      key={
                        section.title ?? `section-${section.items[0]?.label}`
                      }
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + sectionIndex * 0.05 }}
                    >
                      {section.title ? (
                        <div className="text-muted-foreground mt-4 mb-2 px-3 text-xs font-medium tracking-wider uppercase">
                          {section.title}
                        </div>
                      ) : null}
                      {section.items.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className={cn(
                            'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                            item.isActive
                              ? 'bg-sidebar-accent/10 text-sidebar-accent'
                              : 'text-sidebar-foreground hover:bg-muted'
                          )}
                        >
                          <item.icon
                            className={cn(
                              'h-5 w-5 transition-colors',
                              item.isActive
                                ? 'text-sidebar-accent'
                                : 'text-muted-foreground group-hover:text-foreground'
                            )}
                          />
                          {item.label}
                        </a>
                      ))}
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    )
  }

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
      className="bg-sidebar fixed top-0 left-16 z-40 hidden h-screen w-52 flex-col border-r md:flex"
    >
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="text-foreground mb-4 px-3 text-sm font-semibold">
          Organization
        </div>

        <nav className="space-y-1">
          {navigation.map((section, sectionIndex) => (
            <motion.div
              key={section.title ?? `section-${section.items[0]?.label}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + sectionIndex * 0.05 }}
            >
              {section.title ? (
                <div className="text-muted-foreground mt-4 mb-2 px-3 text-xs font-medium tracking-wider uppercase">
                  {section.title}
                </div>
              ) : null}
              {section.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                    item.isActive
                      ? 'bg-sidebar-accent/10 text-sidebar-accent'
                      : 'text-sidebar-foreground hover:bg-muted'
                  )}
                >
                  <item.icon
                    className={cn(
                      'h-5 w-5 transition-colors',
                      item.isActive
                        ? 'text-sidebar-accent'
                        : 'text-muted-foreground group-hover:text-foreground'
                    )}
                  />
                  {item.label}
                </a>
              ))}
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.aside>
  )
}

export function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <IconSidebar onMenuClick={() => setIsMobileMenuOpen(true)} />
      <MainSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}
