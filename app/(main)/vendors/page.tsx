"use client"

import { useState } from "react"
import { Search, Plus, Eye, Building2, Truck, Monitor, ShieldCheck } from "lucide-react"

const ALL_VENDORS = [
  { id: 1, name: "Infra Supplies Pvt Ltd", category: "Constructions", gst: "27AABCS1429B0Z0", contact: "+91 98765 43210", status: "Active", icon: Building2 },
  { id: 2, name: "Tech Core LTD",          category: "IT",            gst: "27AABCS1429B0Z1", contact: "+91 91234 56789", status: "Active", icon: Monitor },
  { id: 3, name: "FastLog Transport",      category: "Logistics",     gst: "27AABCS1429B0Z2", contact: "+91 87654 32101", status: "Blocked", icon: Truck },
  { id: 4, name: "SafeGuard Security",     category: "Security",      gst: "27AABCS1429B0Z3", contact: "+91 99887 76655", status: "Pending", icon: ShieldCheck },
  { id: 5, name: "GreenOffice Supplies",   category: "Stationery",    gst: "27AABCS1429B0Z4", contact: "+91 80012 34567", status: "Active", icon: Building2 },
]

const statusStyle: Record<string, string> = {
  Active:  "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  Pending: "bg-amber-500/15  text-amber-400  border border-amber-500/25",
  Blocked: "bg-rose-500/15   text-rose-400   border border-rose-500/25",
}

const TAB_FILTERS = ["All", "Active", "Pending", "Blocked"] as const
type TabFilter = (typeof TAB_FILTERS)[number]

export default function VendorsPage() {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState<TabFilter>("All")

  const filtered = ALL_VENDORS.filter((v) => {
    const matchesTab = activeTab === "All" || v.status === activeTab
    const q = search.toLowerCase()
    return matchesTab && (
      v.name.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q) ||
      v.gst.toLowerCase().includes(q)
    )
  })

  const counts: Record<TabFilter, number> = {
    All:     ALL_VENDORS.length,
    Active:  ALL_VENDORS.filter((v) => v.status === "Active").length,
    Pending: ALL_VENDORS.filter((v) => v.status === "Pending").length,
    Blocked: ALL_VENDORS.filter((v) => v.status === "Blocked").length,
  }

  return (
    <div className="p-8 space-y-8 animate-fade-in min-h-full bg-[#0a0a1a]">
      {/* Header */}
      <div className="flex items-start justify-between animate-slide-up" style={{ animationDelay: "0ms" }}>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Vendors</h1>
          <p className="text-white/40 mt-1 text-sm">Manage supplier profiles and registrations</p>
        </div>
        <button
          onClick={() => alert("Add Vendor — connect to your backend!")}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-semibold active:scale-95 transition-all duration-200 shadow-lg shadow-violet-500/20"
        >
          <Plus className="w-4 h-4" /> Add Vendor
        </button>
      </div>

      {/* Search */}
      <div className="animate-slide-up" style={{ animationDelay: "80ms" }}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
          <input
            type="text" placeholder="Search by name, GST number, category…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#0d0d20] border border-white/10 rounded-xl text-white/80 placeholder:text-white/20 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15 transition-all"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 animate-slide-up" style={{ animationDelay: "140ms" }}>
        {TAB_FILTERS.map((tab) => (
          <button
            key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
              activeTab === tab
                ? "bg-violet-600/20 text-violet-300 border-violet-500/30 shadow-sm shadow-violet-500/10"
                : "bg-white/5 text-white/40 border-white/10 hover:border-white/20 hover:text-white/60"
            }`}
          >
            {tab}
            <span className={`ml-1.5 text-xs ${activeTab === tab ? "opacity-80" : "opacity-50"}`}>
              ({counts[tab]})
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#0d0d20] rounded-2xl border border-white/8 shadow-sm overflow-hidden animate-scale-in" style={{ animationDelay: "200ms" }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 text-white/30 text-xs uppercase tracking-wide bg-white/[0.02]">
              <th className="text-left px-6 py-3.5 font-medium">Vendor Name</th>
              <th className="text-left px-4 py-3.5 font-medium">Category</th>
              <th className="text-left px-4 py-3.5 font-medium">GST No.</th>
              <th className="text-left px-4 py-3.5 font-medium">Contact No.</th>
              <th className="text-left px-4 py-3.5 font-medium">Status</th>
              <th className="text-center px-4 py-3.5 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length > 0 ? (
              filtered.map((v, i) => (
                <tr
                  key={v.id}
                  className="hover:bg-white/[0.03] transition-colors duration-150 animate-fade-in"
                  style={{ animationDelay: `${280 + i * 50}ms` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 shrink-0">
                        <v.icon className="w-4 h-4 text-violet-400" />
                      </div>
                      <span className="font-semibold text-white/90">{v.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-white/50">{v.category}</td>
                  <td className="px-4 py-4 font-mono text-xs text-white/40 tracking-wider">{v.gst}</td>
                  <td className="px-4 py-4 text-white/50">{v.contact}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[v.status]}`}>{v.status}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => alert(`Viewing: ${v.name}`)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-white/10 text-xs font-semibold text-white/50 hover:bg-violet-600/20 hover:text-violet-300 hover:border-violet-500/30 active:scale-95 transition-all duration-200"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-white/20">
                    <Search className="w-8 h-8 opacity-40" />
                    <p className="text-sm font-medium">No vendors found</p>
                    <p className="text-xs opacity-60">Try adjusting your search or filter</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="px-6 py-3 border-t border-white/8 bg-white/[0.01] flex items-center justify-between">
          <span className="text-xs text-white/25">Showing {filtered.length} of {ALL_VENDORS.length} vendors</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 text-xs border border-white/10 rounded-lg text-white/30 hover:bg-white/5 transition-colors">← Prev</button>
            <button className="px-3 py-1 text-xs bg-violet-600/20 border border-violet-500/30 rounded-lg text-violet-300">1</button>
            <button className="px-3 py-1 text-xs border border-white/10 rounded-lg text-white/30 hover:bg-white/5 transition-colors">Next →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
