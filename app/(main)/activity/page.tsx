"use client"

import { useState } from "react"
import { CheckCircle2, Clock, FileText, UserPlus, Activity as ActivityIcon } from "lucide-react"

type FilterType = "All" | "RFQ" | "Approvals" | "Invoices" | "Vendors"

export default function ActivityLogsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All")

  const filters: FilterType[] = ["All", "RFQ", "Approvals", "Invoices", "Vendors"]

  const logs = [
    {
      id: 1,
      type: "Quotations",
      text: "Quotation selected - Infra supplies pvt ltd selected for office furniture Q2",
      date: "23 May 2025, 9:15 PM",
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    },
    {
      id: 2,
      type: "Approvals",
      text: "Approval pending - PO-2024 awaiting L2 approval by priya shah",
      date: "22 May 2025, 09:15 AM",
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    },
    {
      id: 3,
      type: "RFQ",
      text: "RFQ published - office furniture Q2 sent to 3 vendors",
      date: "19 May 2025",
      icon: FileText,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20"
    },
    {
      id: 4,
      type: "Vendors",
      text: "Vendor added - FastLog transport registered and pending verifications",
      date: "18 May 2025, 3:20 PM",
      icon: UserPlus,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20"
    }
  ]

  const filteredLogs = logs.filter(log => activeFilter === "All" || log.type === activeFilter)

  return (
    <div className="p-8 space-y-8 animate-fade-in min-h-full bg-[#0a0a1a]">
      {/* Header */}
      <div className="animate-slide-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <ActivityIcon className="w-8 h-8 text-violet-500" />
          Activity & Logs
        </h1>
        <p className="text-white/40 mt-2 text-sm">Procurement audit trail - immutable record of system events</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 animate-slide-up" style={{ animationDelay: "100ms" }}>
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
              activeFilter === filter
                ? "bg-violet-600 border-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                : "bg-[#0d0d20] border-white/10 text-white/40 hover:text-white/80 hover:bg-white/5 hover:border-white/20"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Logs Timeline */}
      <div className="bg-[#0d0d20] border border-white/10 rounded-2xl p-8 shadow-xl relative animate-slide-up" style={{ animationDelay: "200ms" }}>
        {/* Vertical Line */}
        <div className="absolute left-12 top-10 bottom-10 w-0.5 bg-white/5" />

        <div className="space-y-8 relative">
          {filteredLogs.map((log, index) => (
            <div key={log.id} className="flex gap-6 relative group animate-fade-in" style={{ animationDelay: `${300 + index * 100}ms` }}>
              
              {/* Timeline Icon */}
              <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${log.bg} ${log.border} transition-transform group-hover:scale-110 duration-300`}>
                <log.icon className={`w-5 h-5 ${log.color}`} />
              </div>

              {/* Log Content */}
              <div className="flex-1 pt-2">
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:bg-white/[0.04] transition-colors">
                  <p className="text-white/80 text-sm leading-relaxed font-medium">
                    {log.text}
                  </p>
                  <p className="text-white/30 text-xs mt-2 flex items-center gap-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {log.date}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {filteredLogs.length === 0 && (
            <div className="text-center py-12 text-white/30">
              <ActivityIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No activity logs found for this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
