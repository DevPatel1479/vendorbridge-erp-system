import {
  TrendingUp,
  Building2,
  PackageCheck,
  AlertCircle,
  Download,
  Calendar,
  Filter
} from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="p-8 space-y-8 animate-fade-in min-h-full bg-[#0a0a1a]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 animate-slide-up" style={{ animationDelay: "0ms" }}>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Reports & Analytics</h1>
          <p className="text-white/40 mt-2 text-sm">Procurement Insights - May 2026</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-white transition-colors text-sm font-medium">
            <Calendar size={18} />
            <span>Select Period</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600/20 text-violet-400 border border-violet-500/30 rounded-lg hover:bg-violet-600/30 hover:border-violet-500/50 transition-colors text-sm font-medium">
            <Download size={18} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
        <div className="bg-white/[0.02] rounded-xl p-6 shadow-sm border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div className="text-white/40 text-sm font-medium uppercase tracking-wider">Total Spend</div>
            <TrendingUp className="text-emerald-400" size={20} />
          </div>
          <div className="text-3xl font-bold text-white">₹12.4L</div>
          <div className="text-sm text-emerald-400/80 mt-2 font-medium">↑ 12% from last month</div>
        </div>

        <div className="bg-white/[0.02] rounded-xl p-6 shadow-sm border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div className="text-white/40 text-sm font-medium uppercase tracking-wider">Active Vendors</div>
            <Building2 className="text-blue-400" size={20} />
          </div>
          <div className="text-3xl font-bold text-white">28</div>
          <div className="text-sm text-white/60 mt-2 font-medium">+3 new this month</div>
        </div>

        <div className="bg-white/[0.02] rounded-xl p-6 shadow-sm border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div className="text-white/40 text-sm font-medium uppercase tracking-wider">PO Fulfillment</div>
            <PackageCheck className="text-violet-400" size={20} />
          </div>
          <div className="text-3xl font-bold text-white">94%</div>
          <div className="text-sm text-emerald-400/80 mt-2 font-medium">↑ 2% vs target</div>
        </div>

        <div className="bg-white/[0.02] rounded-xl p-6 shadow-sm border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div className="text-white/40 text-sm font-medium uppercase tracking-wider">Overdue Invoices</div>
            <AlertCircle className="text-rose-400" size={20} />
          </div>
          <div className="text-3xl font-bold text-white">3</div>
          <div className="text-sm text-rose-400/80 mt-2 font-medium">Requires attention</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
        {/* Spend by Category */}
        <div className="bg-white/[0.02] rounded-xl shadow-sm border border-white/10 p-6 backdrop-blur-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Spend by Category</h3>
            <button className="text-violet-400 text-sm hover:text-violet-300 font-medium">View Details →</button>
          </div>
          <div className="space-y-5">
            {[
              { name: "IT Hardware", amount: "₹4.8L", percentage: 38, color: "bg-blue-500" },
              { name: "Furniture", amount: "₹3.2L", percentage: 26, color: "bg-emerald-500" },
              { name: "Logistics", amount: "₹2.3L", percentage: 19, color: "bg-amber-500" },
              { name: "Stationery", amount: "₹2.1L", percentage: 17, color: "bg-violet-500" }
            ].map((category) => (
              <div key={category.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60 font-medium">{category.name}</span>
                  <span className="font-semibold text-white/90">{category.amount}</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div
                    className={`${category.color} h-full rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Vendors by Spend */}
        <div className="bg-white/[0.02] rounded-xl shadow-sm border border-white/10 p-6 backdrop-blur-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Top Vendors by Spend</h3>
            <button className="text-violet-400 text-sm hover:text-violet-300 font-medium">View All →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b border-white/10 text-xs font-semibold text-white/40 uppercase tracking-wider">Vendor</th>
                  <th className="py-3 px-4 border-b border-white/10 text-xs font-semibold text-white/40 uppercase tracking-wider text-right">Spend (₹)</th>
                  <th className="py-3 px-4 border-b border-white/10 text-xs font-semibold text-white/40 uppercase tracking-wider text-right">POs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { name: "TechCore Ltd", spend: "4,20,000", pos: 6 },
                  { name: "Infra Supplies", spend: "3,10,000", pos: 4 },
                  { name: "FastLog", spend: "1,90,000", pos: 3 }
                ].map((vendor) => (
                  <tr key={vendor.name} className="hover:bg-white/5 transition-colors group">
                    <td className="py-4 px-4 text-white/90 font-medium group-hover:text-white transition-colors">{vendor.name}</td>
                    <td className="py-4 px-4 text-right font-medium text-emerald-400">₹{vendor.spend}</td>
                    <td className="py-4 px-4 text-right text-white/60">{vendor.pos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white/[0.02] rounded-xl shadow-sm border border-white/10 p-6 backdrop-blur-md animate-slide-up" style={{ animationDelay: "300ms" }}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h3 className="text-lg font-semibold text-white">Monthly Trend</h3>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 text-sm font-medium bg-violet-500/20 text-violet-400 border border-violet-500/20 rounded-lg transition-colors">
              This Year
            </button>
            <button className="px-4 py-1.5 text-sm font-medium text-white/40 hover:text-white/90 hover:bg-white/5 border border-transparent rounded-lg transition-colors">
              Last Year
            </button>
          </div>
        </div>

        {/* Chart Visualization */}
        <div className="relative h-64 mt-4">
          <div className="flex items-end justify-between h-full gap-2 md:gap-4 px-2">
            {[
              { month: "Dec", value: 65, color: "bg-indigo-500/40" },
              { month: "Jan", value: 72, color: "bg-indigo-500/50" },
              { month: "Feb", value: 68, color: "bg-indigo-500/40" },
              { month: "Mar", value: 85, color: "bg-indigo-500/60" },
              { month: "Apr", value: 78, color: "bg-indigo-500/50" },
              { month: "May", value: 92, color: "bg-violet-500" }
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center group">
                <div
                  className={`w-full max-w-[40px] md:max-w-[60px] ${item.color} rounded-t-lg transition-all duration-500 group-hover:brightness-125 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] cursor-pointer relative`}
                  style={{ height: `${item.value}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/10 text-white text-xs py-1 px-2 rounded font-medium whitespace-nowrap shadow-xl">
                    ₹{item.value}k
                  </div>
                </div>
                <div className="text-sm text-white/40 mt-3 font-medium group-hover:text-white/80 transition-colors">{item.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trend Line */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-white/60">
              Average monthly spend: <span className="font-semibold text-white text-lg ml-2">₹76.7k</span>
            </div>
            <div className="text-sm font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full flex items-center gap-2 border border-emerald-500/20">
              <TrendingUp size={16} />
              <span>↑ 8.3% growth trend</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
