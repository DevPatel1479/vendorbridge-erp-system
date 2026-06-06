"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  FileText,
  CheckSquare,
  ShoppingCart,
  Receipt,
  BarChart3,
  Activity,
  Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Vendors", href: "/vendors", icon: Users },
  { label: "RFQ's", href: "/rfqs", icon: ClipboardList },
  { label: "Quotations", href: "/quotations", icon: FileText },
  { label: "Approvals", href: "/approvals", icon: CheckSquare },
  { label: "Purchase Orders", href: "/purchase-orders", icon: ShoppingCart },
  { label: "Invoices", href: "/invoices", icon: Receipt },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Activity", href: "/activity", icon: Activity },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 shrink-0 flex flex-col h-screen bg-sidebar border-r border-sidebar-border sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
        <div className="p-2 rounded-xl bg-primary/20 backdrop-blur-sm">
          <Building2 className="w-5 h-5 text-primary" />
        </div>
        <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
          VendorBridge
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "w-4.5 h-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                  isActive ? "text-primary-foreground" : "text-sidebar-foreground/50"
                )}
              />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-sidebar-accent transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
            PO
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-sidebar-foreground truncate">Procurement Officer</p>
            <p className="text-xs text-sidebar-foreground/50 truncate">officer@company.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
