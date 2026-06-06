"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Eye, Trash2, Building2, Truck, Monitor, ShieldCheck, Loader2 } from "lucide-react"

type Vendor = {
  id: string
  companyName: string
  category: string | null
  gstNumber: string | null
  contact: string | null
  phone: string | null
  status: string
}

const statusStyle: Record<string, string> = {
  ACTIVE:  "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  PENDING: "bg-amber-500/15  text-amber-400  border border-amber-500/25",
  INACTIVE: "bg-rose-500/15   text-rose-400   border border-rose-500/25",
}

const TAB_FILTERS = ["All", "ACTIVE", "PENDING", "INACTIVE"] as const
type TabFilter = (typeof TAB_FILTERS)[number]

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState<TabFilter>("All")

  useEffect(() => {
    fetchVendors()
  }, [])

  const fetchVendors = async () => {
    try {
      const res = await fetch("/api/vendors")
      if (res.ok) {
        const data = await res.json()
        setVendors(data)
        setErrorMsg(null)
      } else {
        const errData = await res.json()
        setErrorMsg(errData.error || errData.message || "Unknown API error")
      }
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to fetch")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vendor?")) return;
    
    try {
      const res = await fetch(`/api/vendors/${id}`, { method: "DELETE" })
      if (res.ok) {
        setVendors((prev) => prev.filter((v) => v.id !== id))
      } else {
        const errorData = await res.json()
        if (res.status === 403 || errorData.error === "Forbidden") {
          alert("Access Denied: You do not have permission to delete vendors. This action is restricted to Administrators only.");
        } else {
          alert(errorData.error || "Failed to delete vendor");
        }
      }
    } catch (error) {
      console.error("Failed to delete vendor", error)
    }
  }

  const filtered = vendors.filter((v) => {
    const matchesTab = activeTab === "All" || v.status === activeTab
    const q = search.toLowerCase()
    return matchesTab && (
      v.companyName.toLowerCase().includes(q) ||
      (v.category || "").toLowerCase().includes(q) ||
      (v.gstNumber || "").toLowerCase().includes(q)
    )
  })

  const counts: Record<TabFilter, number> = {
    All:     vendors.length,
    ACTIVE:  vendors.filter((v) => v.status === "ACTIVE").length,
    PENDING: vendors.filter((v) => v.status === "PENDING").length,
    INACTIVE: vendors.filter((v) => v.status === "INACTIVE").length,
  }

  // A helper function to assign a random icon based on category, since the DB doesn't store an icon.
  const getIcon = (category: string | null) => {
    const cat = (category || "").toLowerCase()
    if (cat.includes("it") || cat.includes("tech")) return Monitor
    if (cat.includes("logistics") || cat.includes("transport")) return Truck
    if (cat.includes("security")) return ShieldCheck
    return Building2
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
          onClick={() => alert("Redirecting to create vendor page... (Feature not implemented yet)")}
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
            {tab === "All" ? tab : tab.charAt(0) + tab.slice(1).toLowerCase()}
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
              <th className="text-center px-4 py-3.5 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-white/40">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <p className="text-sm font-medium">Loading vendors...</p>
                  </div>
                </td>
              </tr>
            ) : filtered.length > 0 ? (
              filtered.map((v, i) => {
                const Icon = getIcon(v.category)
                return (
                  <tr
                    key={v.id}
                    className="hover:bg-white/[0.03] transition-colors duration-150 animate-fade-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 shrink-0">
                          <Icon className="w-4 h-4 text-violet-400" />
                        </div>
                        <span className="font-semibold text-white/90">{v.companyName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-white/50">{v.category || "—"}</td>
                    <td className="px-4 py-4 font-mono text-xs text-white/40 tracking-wider">{v.gstNumber || "—"}</td>
                    <td className="px-4 py-4 text-white/50">{v.phone || "—"}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[v.status] || statusStyle["PENDING"]}`}>
                        {v.status.charAt(0) + v.status.slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => alert(`Viewing: ${v.companyName}`)}
                          className="inline-flex items-center justify-center p-2 rounded-lg border border-white/10 text-white/50 hover:bg-violet-600/20 hover:text-violet-300 hover:border-violet-500/30 active:scale-95 transition-all duration-200"
                          title="View Vendor"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(v.id)}
                          className="inline-flex items-center justify-center p-2 rounded-lg border border-white/10 text-white/50 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/30 active:scale-95 transition-all duration-200"
                          title="Delete Vendor"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-white/20">
                    {errorMsg ? (
                      <>
                        <ShieldCheck className="w-8 h-8 text-rose-500/50" />
                        <p className="text-sm font-medium text-rose-400">Error: {errorMsg}</p>
                        <p className="text-xs opacity-60">There is a problem fetching vendors.</p>
                      </>
                    ) : (
                      <>
                        <Search className="w-8 h-8 opacity-40" />
                        <p className="text-sm font-medium">No vendors found</p>
                        <p className="text-xs opacity-60">Try adjusting your search or add a new vendor.</p>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {!isLoading && (
          <div className="px-6 py-3 border-t border-white/8 bg-white/[0.01] flex items-center justify-between">
            <span className="text-xs text-white/25">Showing {filtered.length} of {vendors.length} vendors</span>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 text-xs border border-white/10 rounded-lg text-white/30 hover:bg-white/5 transition-colors" disabled>← Prev</button>
              <button className="px-3 py-1 text-xs bg-violet-600/20 border border-violet-500/30 rounded-lg text-violet-300">1</button>
              <button className="px-3 py-1 text-xs border border-white/10 rounded-lg text-white/30 hover:bg-white/5 transition-colors" disabled>Next →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
