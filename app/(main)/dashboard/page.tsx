import type { Metadata } from "next"
import {
  FileText,
  Clock,
  ShoppingCart,
  AlertCircle,
  Plus,
  UserPlus,
  Eye,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dashboard – VendorBridge",
  description: "Your procurement activity overview",
}

// ─── Static mock data ──────────────────────────────────────────────
const stats = [
  {
    label: "Active RFQ's",
    value: "12",
    icon: FileText,
    trend: "+3 this week",
    up: true,
    color: "bg-violet-500/10 text-violet-600",
    border: "border-violet-200",
    glow: "shadow-violet-100",
  },
  {
    label: "Pending Approvals",
    value: "5",
    icon: Clock,
    trend: "2 urgent",
    up: false,
    color: "bg-amber-500/10 text-amber-600",
    border: "border-amber-200",
    glow: "shadow-amber-100",
  },
  {
    label: "PO's this month",
    value: "₹2.3L",
    icon: ShoppingCart,
    trend: "+12% vs last month",
    up: true,
    color: "bg-emerald-500/10 text-emerald-600",
    border: "border-emerald-200",
    glow: "shadow-emerald-100",
  },
  {
    label: "Overdue Invoices",
    value: "3",
    icon: AlertCircle,
    trend: "Action needed",
    up: false,
    color: "bg-rose-500/10 text-rose-600",
    border: "border-rose-200",
    glow: "shadow-rose-100",
  },
]

const recentPOs = [
  { po: "PO1", vendor: "Infra Supplies Pvt Ltd", amount: "₹87,000", status: "Approved" },
  { po: "PO2", vendor: "Tech Core LTD", amount: "₹1,40,000", status: "Pending" },
  { po: "PO3", vendor: "OfficeNeed Co.", amount: "₹39,400", status: "Draft" },
]

const statusStyle: Record<string, string> = {
  Approved:
    "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Pending:
    "bg-amber-100 text-amber-700 border border-amber-200",
  Draft:
    "bg-slate-100 text-slate-600 border border-slate-200",
}

// ─── Tiny inline SVG chart (decorative spending trend) ─────────────
function SpendingChart() {
  const points = [20, 45, 30, 60, 50, 80, 65, 90, 75, 100, 85, 110]
  const max = Math.max(...points)
  const h = 80
  const w = 200
  const step = w / (points.length - 1)
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (p / max) * h}`)
    .join(" ")
  const area = path + ` L ${(points.length - 1) * step} ${h} L 0 ${h} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(139,92,246)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="rgb(139,92,246)" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spendGrad)" />
      <path d={path} fill="none" stroke="rgb(139,92,246)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* data dots */}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={i * step}
          cy={h - (p / max) * h}
          r="3"
          fill="white"
          stroke="rgb(139,92,246)"
          strokeWidth="2"
        />
      ))}
    </svg>
  )
}

// ─── Bar chart (monthly) ───────────────────────────────────────────
function BarChart() {
  const bars = [60, 80, 50, 90, 70, 100, 85]
  const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const colors = [
    "bg-violet-300", "bg-violet-400", "bg-violet-300",
    "bg-violet-500", "bg-violet-400", "bg-violet-600", "bg-violet-500",
  ]
  return (
    <div className="flex items-end gap-2 h-full w-full">
      {bars.map((h, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className={`w-full rounded-t-md transition-all duration-700 ${colors[i]}`}
            style={{ height: `${h}%` }}
          />
          <span className="text-[10px] text-muted-foreground">{months[i]}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8 animate-fade-in min-h-full">
      {/* Header */}
      <div className="animate-slide-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Welcome back, <span className="font-semibold text-primary">Procurement Officer</span> · Today's Overview
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`animate-slide-up bg-card rounded-2xl border ${s.border} p-5 shadow-sm hover:shadow-md ${s.glow} transition-all duration-300 group cursor-default`}
            style={{ animationDelay: `${80 + i * 60}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              {s.up ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-rose-400" />
              )}
            </div>
            <p className="text-3xl font-bold text-foreground tracking-tight group-hover:scale-105 transition-transform origin-left">
              {s.value}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">{s.label}</p>
            <p className={`text-xs mt-2 font-medium ${s.up ? "text-emerald-600" : "text-amber-600"}`}>
              {s.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Lower section: Table + Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Recent Purchase Orders */}
        <div
          className="xl:col-span-3 bg-card rounded-2xl border border-border shadow-sm animate-slide-up"
          style={{ animationDelay: "320ms" }}
        >
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-base text-foreground">Recent Purchase Orders</h2>
            <Link
              href="/purchase-orders"
              className="text-xs text-primary hover:underline font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wide">
                  <th className="text-left px-6 py-3 font-medium">PO #</th>
                  <th className="text-left px-4 py-3 font-medium">Vendor</th>
                  <th className="text-left px-4 py-3 font-medium">Amount</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentPOs.map((row, i) => (
                  <tr
                    key={row.po}
                    className="hover:bg-muted/30 transition-colors duration-150 animate-fade-in"
                    style={{ animationDelay: `${400 + i * 60}ms` }}
                  >
                    <td className="px-6 py-3.5 font-semibold text-primary">{row.po}</td>
                    <td className="px-4 py-3.5 text-foreground">{row.vendor}</td>
                    <td className="px-4 py-3.5 font-medium text-foreground">{row.amount}</td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <button className="text-xs text-primary hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts column */}
        <div className="xl:col-span-2 flex flex-col gap-5">
          {/* Spending trend line */}
          <div
            className="bg-card rounded-2xl border border-border shadow-sm p-5 animate-slide-up"
            style={{ animationDelay: "360ms" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-sm text-foreground">Spending Trends</h2>
              <span className="text-xs text-muted-foreground">Last 6 months</span>
            </div>
            <div className="h-24">
              <SpendingChart />
            </div>
          </div>

          {/* Monthly bar chart */}
          <div
            className="bg-card rounded-2xl border border-border shadow-sm p-5 flex-1 animate-slide-up"
            style={{ animationDelay: "400ms" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-sm text-foreground">Monthly PO Volume</h2>
              <span className="text-xs text-muted-foreground">2024</span>
            </div>
            <div className="h-28">
              <BarChart />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        className="animate-slide-up pt-2"
        style={{ animationDelay: "440ms" }}
      >
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/rfqs/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200 shadow-sm shadow-primary/30"
          >
            <Plus className="w-4 h-4" /> New RFQ
          </Link>
          <Link
            href="/vendors/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-card border border-border text-foreground rounded-xl text-sm font-semibold hover:bg-accent hover:border-primary/30 active:scale-95 transition-all duration-200 shadow-sm"
          >
            <UserPlus className="w-4 h-4" /> Add Vendor
          </Link>
          <Link
            href="/invoices"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-card border border-border text-foreground rounded-xl text-sm font-semibold hover:bg-accent hover:border-primary/30 active:scale-95 transition-all duration-200 shadow-sm"
          >
            <Eye className="w-4 h-4" /> View Invoices
          </Link>
        </div>
      </div>
    </div>
  )
}
