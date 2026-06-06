import type { Metadata } from "next"
import { FileText, Clock, ShoppingCart, AlertCircle, Plus, UserPlus, Eye, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dashboard – VendorBridge",
  description: "Your procurement activity overview",
}

const stats = [
  { label: "Active RFQ's", value: "12", icon: FileText, trend: "+3 this week", up: true, accent: "violet" },
  { label: "Pending Approvals", value: "5", icon: Clock, trend: "2 urgent", up: false, accent: "amber" },
  { label: "PO's this month", value: "₹2.3L", icon: ShoppingCart, trend: "+12% vs last month", up: true, accent: "emerald" },
  { label: "Overdue Invoices", value: "3", icon: AlertCircle, trend: "Action needed", up: false, accent: "rose" },
]

const accentMap: Record<string, { bg: string; border: string; icon: string; glow: string }> = {
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/20", icon: "text-violet-400", glow: "hover:shadow-violet-500/10" },
  amber:  { bg: "bg-amber-500/10",  border: "border-amber-500/20",  icon: "text-amber-400",  glow: "hover:shadow-amber-500/10"  },
  emerald:{ bg: "bg-emerald-500/10",border: "border-emerald-500/20",icon: "text-emerald-400",glow: "hover:shadow-emerald-500/10"},
  rose:   { bg: "bg-rose-500/10",   border: "border-rose-500/20",   icon: "text-rose-400",   glow: "hover:shadow-rose-500/10"   },
}

const recentPOs = [
  { po: "PO1", vendor: "Infra Supplies Pvt Ltd", amount: "₹87,000", status: "Approved" },
  { po: "PO2", vendor: "Tech Core LTD", amount: "₹1,40,000", status: "Pending" },
  { po: "PO3", vendor: "OfficeNeed Co.", amount: "₹39,400", status: "Draft" },
]

const statusStyle: Record<string, string> = {
  Approved: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  Pending:  "bg-amber-500/15  text-amber-400  border border-amber-500/25",
  Draft:    "bg-white/8       text-white/50   border border-white/10",
}

function SpendingChart() {
  const points = [20, 45, 30, 60, 50, 80, 65, 90, 75, 100, 85, 110]
  const max = Math.max(...points)
  const h = 80, w = 220
  const step = w / (points.length - 1)
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (p / max) * h}`).join(" ")
  const area = path + ` L ${(points.length - 1) * step} ${h} L 0 ${h} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(139,92,246)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(139,92,246)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sg2)" />
      <path d={path} fill="none" stroke="rgb(139,92,246)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={i * step} cy={h - (p / max) * h} r="3" fill="#0d0d20" stroke="rgb(139,92,246)" strokeWidth="2" />
      ))}
    </svg>
  )
}

function BarChart() {
  const bars  = [60, 80, 50, 90, 70, 100, 85]
  const months = ["Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  return (
    <div className="flex items-end gap-2 h-full w-full">
      {bars.map((h, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full rounded-t-md bg-violet-500/50 hover:bg-violet-500/70 transition-colors duration-300" style={{ height: `${h}%` }} />
          <span className="text-[10px] text-white/30">{months[i]}</span>
        </div>
      ))}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8 animate-fade-in min-h-full bg-[#0a0a1a]">
      {/* Header */}
      <div className="animate-slide-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-white/40 mt-1 text-sm">
          Welcome back, <span className="font-semibold text-violet-400">Procurement Officer</span> · Today's Overview
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s, i) => {
          const a = accentMap[s.accent]
          return (
            <div
              key={s.label}
              className={`animate-slide-up bg-[#0d0d20] rounded-2xl border ${a.border} p-5 shadow-sm hover:shadow-lg ${a.glow} transition-all duration-300 group cursor-default`}
              style={{ animationDelay: `${80 + i * 60}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${a.bg}`}>
                  <s.icon className={`w-5 h-5 ${a.icon}`} />
                </div>
                {s.up ? <TrendingUp className="w-4 h-4 text-emerald-400" /> : <TrendingDown className="w-4 h-4 text-rose-400" />}
              </div>
              <p className="text-3xl font-bold text-white tracking-tight group-hover:scale-105 transition-transform origin-left">{s.value}</p>
              <p className="text-sm text-white/40 mt-0.5">{s.label}</p>
              <p className={`text-xs mt-2 font-medium ${s.up ? "text-emerald-400" : "text-amber-400"}`}>{s.trend}</p>
            </div>
          )
        })}
      </div>

      {/* Table + Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Recent POs */}
        <div className="xl:col-span-3 bg-[#0d0d20] rounded-2xl border border-white/8 shadow-sm animate-slide-up" style={{ animationDelay: "320ms" }}>
          <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between">
            <h2 className="font-semibold text-base text-white">Recent Purchase Orders</h2>
            <Link href="/purchase-orders" className="text-xs text-violet-400 hover:text-violet-300 font-medium transition-colors">View all →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-white/30 text-xs uppercase tracking-wide">
                  <th className="text-left px-6 py-3 font-medium">PO #</th>
                  <th className="text-left px-4 py-3 font-medium">Vendor</th>
                  <th className="text-left px-4 py-3 font-medium">Amount</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentPOs.map((row, i) => (
                  <tr key={row.po} className="hover:bg-white/[0.03] transition-colors duration-150 animate-fade-in" style={{ animationDelay: `${400 + i * 60}ms` }}>
                    <td className="px-6 py-3.5 font-semibold text-violet-400">{row.po}</td>
                    <td className="px-4 py-3.5 text-white/70">{row.vendor}</td>
                    <td className="px-4 py-3.5 font-medium text-white/80">{row.amount}</td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[row.status]}`}>{row.status}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts */}
        <div className="xl:col-span-2 flex flex-col gap-5">
          <div className="bg-[#0d0d20] rounded-2xl border border-white/8 shadow-sm p-5 animate-slide-up" style={{ animationDelay: "360ms" }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-sm text-white">Spending Trends</h2>
              <span className="text-xs text-white/30">Last 6 months</span>
            </div>
            <div className="h-24"><SpendingChart /></div>
          </div>
          <div className="bg-[#0d0d20] rounded-2xl border border-white/8 shadow-sm p-5 flex-1 animate-slide-up" style={{ animationDelay: "400ms" }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-sm text-white">Monthly PO Volume</h2>
              <span className="text-xs text-white/30">2024</span>
            </div>
            <div className="h-28"><BarChart /></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="animate-slide-up pt-2" style={{ animationDelay: "440ms" }}>
        <h2 className="text-xs font-semibold text-white/30 mb-3 uppercase tracking-widest">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/rfqs/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-semibold active:scale-95 transition-all duration-200 shadow-lg shadow-violet-500/20">
            <Plus className="w-4 h-4" /> New RFQ
          </Link>
          <Link href="/vendors" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/70 hover:text-white rounded-xl text-sm font-semibold active:scale-95 transition-all duration-200">
            <UserPlus className="w-4 h-4" /> Add Vendor
          </Link>
          <Link href="/invoices" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/70 hover:text-white rounded-xl text-sm font-semibold active:scale-95 transition-all duration-200">
            <Eye className="w-4 h-4" /> View Invoices
          </Link>
        </div>
      </div>
    </div>
  )
}
