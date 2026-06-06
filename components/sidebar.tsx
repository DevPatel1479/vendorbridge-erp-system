"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard, Users, ClipboardList, FileText,
  CheckSquare, ShoppingCart, Receipt, BarChart3, Activity, Building2, LogOut,
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
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/signin")
  }

  return (
    <aside className="w-60 shrink-0 flex flex-col h-screen bg-[#0d0d20] border-r border-white/8 sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/8">
        <div className="p-2 rounded-xl bg-violet-600/20 border border-violet-500/30">
          <Building2 className="w-5 h-5 text-violet-400" />
        </div>
        <span className="text-base font-bold tracking-tight text-white">VendorBridge</span>
      </div>

      {/* Nav */}
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
                  ? "bg-violet-600/20 text-violet-300 border border-violet-500/25 shadow-sm shadow-violet-500/10"
                  : "text-white/40 hover:bg-white/5 hover:text-white/80"
              )}
            >
              <item.icon className={cn("w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                isActive ? "text-violet-400" : "text-white/30"
              )} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/8 space-y-2">
        <div className="flex items-center gap-3 p-2.5 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-violet-600/30 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-300 shrink-0">
            PO
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white/70 truncate">Procurement Officer</p>
            <p className="text-xs text-white/30 truncate">officer@company.com</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-200 group"
        >
          <LogOut className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
