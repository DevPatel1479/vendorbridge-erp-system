"use client"

import { useState } from "react"
import { Search, Plus, Eye, Building2, Truck, Monitor, ShieldCheck } from "lucide-react"

// ─── Mock data ─────────────────────────────────────────────────────
const ALL_VENDORS = [
  {
    id: 1,
    name: "Infra Supplies Pvt Ltd",
    category: "Constructions",
    gst: "27AABCS1429B0Z0",
    contact: "+91 98765 43210",
    status: "Active",
    icon: Building2,
  },
  {
    id: 2,
    name: "Tech Core LTD",
    category: "IT",
    gst: "27AABCS1429B0Z1",
    contact: "+91 91234 56789",
    status: "Active",
    icon: Monitor,
  },
  {
    id: 3,
    name: "FastLog Transport",
    category: "Logistics",
    gst: "27AABCS1429B0Z2",
    contact: "+91 87654 32101",
    status: "Blocked",
    icon: Truck,
  },
  {
    id: 4,
    name: "SafeGuard Security",
    category: "Security",
    gst: "27AABCS1429B0Z3",
    contact: "+91 99887 76655",
    status: "Pending",
    icon: ShieldCheck,
  },
  {
    id: 5,
    name: "GreenOffice Supplies",
    category: "Stationery",
    gst: "27AABCS1429B0Z4",
    contact: "+91 80012 34567",
    status: "Active",
    icon: Building2,
  },
]

const statusStyle: Record<string, string> = {
  Active:
    "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Pending:
    "bg-amber-100 text-amber-700 border border-amberier-200",
  Blocked:
    "bg-rose-100 text-rose-700 border border-rose-200",
}

const TAB_FILTERS = ["All", "Active", "Pending", "Blocked"] as const
type TabFilter = (typeof TAB_FILTERS)[number]

export default function VendorsPage() {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState<TabFilter>("All")

  const filtered = ALL_VENDORS.filter((v) => {
    const matchesTab =
      activeTab === "All" || v.status === activeTab
    const q = search.toLowerCase()
    const matchesSearch =
      v.name.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q) ||
      v.gst.toLowerCase().includes(q)
    return matchesTab && matchesSearch
  })

  const counts: Record<TabFilter, number> = {
    All: ALL_VENDORS.length,
    Active: ALL_VENDORS.filter((v) => v.status === "Active").length,
    Pending: ALL_VENDORS.filter((v) => v.status === "Pending").length,
    Blocked: ALL_VENDORS.filter((v) => v.status === "Blocked").length,
  }

  return (
    <div className="p-8 space-y-8 animate-fade-in min-h-full">
      {/* Header */}
      <div
        className="flex items-start justify-between animate-slide-up"
        style={{ animationDelay: "0ms" }}
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Vendors</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage supplier profiles and registrations
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200 shadow-sm shadow-primary/30"
          onClick={() => alert("Add Vendor modal – connect to your backend!")}
        >
          <Plus className="w-4 h-4" /> Add Vendor
        </button>
      </div>

      {/* Search */}
      <div
        className="animate-slide-up"
        style={{ animationDelay: "80ms" }}
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, GST number, category…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all duration-200 shadow-sm"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div
        className="flex items-center gap-2 animate-slide-up"
        style={{ animationDelay: "140ms" }}
      >
        {TAB_FILTERS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200
              ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/25"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
              }
            `}
          >
            {tab}
            <span className={`ml-1.5 text-xs ${activeTab === tab ? "opacity-80" : "opacity-60"}`}>
              ({counts[tab]})
            </span>
          </button>
        ))}
      </div>

      {/* Vendor Table */}
      <div
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden animate-scale-in"
        style={{ animationDelay: "200ms" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b border-border text-muted-foreground text-xs uppercase tracking-wide">
              <th className="text-left px-6 py-3.5 font-medium">Vendor Name</th>
              <th className="text-left px-4 py-3.5 font-medium">Category</th>
              <th className="text-left px-4 py-3.5 font-medium">GST No.</th>
              <th className="text-left px-4 py-3.5 font-medium">Contact No.</th>
              <th className="text-left px-4 py-3.5 font-medium">Status</th>
              <th className="text-center px-4 py-3.5 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length > 0 ? (
              filtered.map((v, i) => (
                <tr
                  key={v.id}
                  className="hover:bg-muted/20 transition-colors duration-150 animate-fade-in"
                  style={{ animationDelay: `${280 + i * 50}ms` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/8 text-primary shrink-0">
                        <v.icon className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-foreground">{v.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">{v.category}</td>
                  <td className="px-4 py-4 font-mono text-xs text-muted-foreground tracking-wider">{v.gst}</td>
                  <td className="px-4 py-4 text-muted-foreground">{v.contact}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[v.status]}`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-border text-xs font-semibold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-95 transition-all duration-200"
                      onClick={() => alert(`Viewing vendor: ${v.name}`)}
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <Search className="w-8 h-8 opacity-30" />
                    <p className="text-sm font-medium">No vendors found</p>
                    <p className="text-xs opacity-60">Try adjusting your search or filter</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Table footer */}
        <div className="px-6 py-3 border-t border-border bg-muted/20 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Showing {filtered.length} of {ALL_VENDORS.length} vendors
          </span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 text-xs border border-border rounded-lg text-muted-foreground hover:bg-card transition-colors">
              ← Prev
            </button>
            <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-lg">1</button>
            <button className="px-3 py-1 text-xs border border-border rounded-lg text-muted-foreground hover:bg-card transition-colors">
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
