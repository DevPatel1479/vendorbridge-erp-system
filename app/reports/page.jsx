// app/reports/page.tsx
import { 
  TrendingUp, 
  Building2, 
  PackageCheck, 
  AlertCircle,
  Download,
  Calendar,
  Filter
} from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-indigo-600">VendorBridge</h1>
          </div>
          
          <nav className="space-y-2">
            {['Dashboard', 'Vendors', "RFQ's", 'Quotations', 'Approvals', 'Purchase orders', 'Invoices', 'Reports', 'Activity'].map((item) => (
              <a
                key={item}
                href="#"
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  item === 'Reports' 
                    ? 'bg-indigo-50 text-indigo-600 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Reports & analytics</h2>
              <p className="text-gray-500 mt-1">Procurement Insights - May 2025</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar size={18} />
                <span>Select Period</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Download size={18} />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-500 text-sm">Total Spend</div>
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <div className="text-3xl font-bold text-gray-800">₹12.4L</div>
              <div className="text-sm text-green-600 mt-2">↑ 12% from last month</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-500 text-sm">Active Vendors</div>
                <Building2 className="text-blue-500" size={20} />
              </div>
              <div className="text-3xl font-bold text-gray-800">28</div>
              <div className="text-sm text-gray-500 mt-2">+3 new this month</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-500 text-sm">PO Fulfillment</div>
                <PackageCheck className="text-purple-500" size={20} />
              </div>
              <div className="text-3xl font-bold text-gray-800">94%</div>
              <div className="text-sm text-green-600 mt-2">↑ 2% vs target</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-500 text-sm">Overdue Invoices</div>
                <AlertCircle className="text-red-500" size={20} />
              </div>
              <div className="text-3xl font-bold text-gray-800">3</div>
              <div className="text-sm text-red-600 mt-2">Requires attention</div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Spend by Category */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Spend by Category</h3>
                <button className="text-indigo-600 text-sm hover:text-indigo-700">View Details →</button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'IT Hardware', amount: '₹4.8L', percentage: 38, color: 'bg-blue-500' },
                  { name: 'Furniture', amount: '₹3.2L', percentage: 26, color: 'bg-green-500' },
                  { name: 'Logistics', amount: '₹2.3L', percentage: 19, color: 'bg-yellow-500' },
                  { name: 'Stationery', amount: '₹2.1L', percentage: 17, color: 'bg-purple-500' }
                ].map((category) => (
                  <div key={category.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{category.name}</span>
                      <span className="font-medium text-gray-800">{category.amount}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${category.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Vendors by Spend */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Top Vendors by Spend</h3>
                <button className="text-indigo-600 text-sm hover:text-indigo-700">View All →</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Vendor</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-500">Spend (₹)</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-500">POs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'TechCore Ltd', spend: '4,20,000', pos: 6 },
                      { name: 'Infra Supplies', spend: '3,10,000', pos: 4 },
                      { name: 'FastLog', spend: '1,90,000', pos: 3 }
                    ].map((vendor) => (
                      <tr key={vendor.name} className="border-b last:border-0">
                        <td className="py-3 text-gray-800 font-medium">{vendor.name}</td>
                        <td className="py-3 text-right text-gray-800">₹{vendor.spend}</td>
                        <td className="py-3 text-right text-gray-600">{vendor.pos}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Monthly Trend</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  This Year
                </button>
                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                  Last Year
                </button>
              </div>
            </div>
            
            {/* Chart Visualization */}
            <div className="relative h-64">
              <div className="flex items-end justify-between h-full gap-2">
                {[
                  { month: 'Dec', value: 65, color: 'bg-indigo-500' },
                  { month: 'Jan', value: 72, color: 'bg-indigo-500' },
                  { month: 'Feb', value: 68, color: 'bg-indigo-500' },
                  { month: 'Mar', value: 85, color: 'bg-indigo-500' },
                  { month: 'Apr', value: 78, color: 'bg-indigo-500' },
                  { month: 'May', value: 92, color: 'bg-indigo-500' }
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full ${item.color} rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer`}
                      style={{ height: `${item.value}%`, maxHeight: '200px' }}
                    />
                    <div className="text-sm text-gray-600 mt-2">{item.month}</div>
                    <div className="text-xs text-gray-400 mt-1">{item.value}k</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Trend Line */}
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Average monthly spend: <span className="font-semibold text-gray-800">₹76.7k</span>
                </div>
                <div className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp size={16} />
                  <span>↑ 8.3% growth trend</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}