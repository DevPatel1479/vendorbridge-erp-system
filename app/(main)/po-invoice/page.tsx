"use client"

import { useState, useEffect } from "react"
import { Download, Printer, Send, FileText, CheckCircle2, Loader2, AlertCircle } from "lucide-react"

export default function PoInvoicePage() {
  const [purchaseOrders, setPurchaseOrders] = useState<any[]>([])
  const [selectedPo, setSelectedPo] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPOs = async () => {
      try {
        const res = await fetch("/api/purchase-orders", { credentials: "include" })
        if (res.ok) {
          const data = await res.json()
          setPurchaseOrders(data)
          if (data.length > 0) setSelectedPo(data[0].id)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPOs()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a1a]">
        <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
      </div>
    )
  }

  if (purchaseOrders.length === 0) {
    return (
      <div className="p-8 min-h-full bg-[#0a0a1a]">
        <div className="bg-[#0d0d20] border border-white/10 rounded-2xl p-16 text-center space-y-6">
          <div className="w-16 h-16 bg-violet-500/10 border border-violet-500/20 rounded-2xl flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-violet-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white/90">No Purchase Orders yet</h3>
            <p className="text-white/40 text-sm mt-2 max-w-md mx-auto">
              Purchase orders will appear here automatically after you approve a quotation from the Comparison page.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const currentPo = purchaseOrders.find(po => po.id === selectedPo)
  
  if (!currentPo) return null

  const vendor = currentPo.quotation?.vendor
  const rfq = currentPo.quotation?.rfq
  const quotationAmount = currentPo.quotation?.amount || 0
  const qty = rfq?.quantity || 1
  const price = quotationAmount / qty

  // Use DB values if present, otherwise calculate from quotation amount (fallback for old POs)
  const subtotal = currentPo.subtotal || quotationAmount
  const tax = currentPo.tax || (quotationAmount * 0.18)
  const total = currentPo.total || (quotationAmount * 1.18)

  return (
    <div className="p-8 space-y-8 animate-fade-in min-h-full bg-[#0a0a1a]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 animate-slide-up" style={{ animationDelay: "0ms" }}>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <FileText className="w-8 h-8 text-violet-500" />
            Purchase Order
          </h1>
          <p className="text-white/40 mt-2 text-sm flex items-center gap-2">
            {currentPo.poNumber}
            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] uppercase font-bold rounded-full border border-amber-500/20">
              {currentPo.status}
            </span>
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <select 
            className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-violet-500 transition-colors"
            value={selectedPo}
            onChange={(e) => setSelectedPo(e.target.value)}
          >
            {purchaseOrders.map(po => (
              <option key={po.id} value={po.id} className="bg-[#0d0d20]">
                {po.poNumber} - {po.quotation?.vendor?.companyName}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm font-semibold transition-all">
            <Download className="w-4 h-4" /> PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all">
            <Send className="w-4 h-4" /> Send to Vendor
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
        
        <div className="bg-[#0d0d20] border border-white/10 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Bill To</h3>
          <div className="space-y-1">
            <p className="text-white/90 font-medium">VendorBridge ERP Client</p>
            <p className="text-white/60 text-sm">Corporate Headquarters</p>
            <p className="text-white/60 text-sm font-mono mt-2">GSTIN: 24AAACG1234D1Z5</p>
          </div>
        </div>

        <div className="bg-[#0d0d20] border border-white/10 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Vendor</h3>
          <div className="space-y-1">
            <p className="text-white/90 font-medium">{vendor?.companyName || "Unknown Vendor"}</p>
            <p className="text-white/60 text-sm">{vendor?.email}</p>
            {vendor?.gstNumber && <p className="text-white/60 text-sm font-mono mt-2">GSTIN: {vendor.gstNumber}</p>}
          </div>
        </div>

      </div>

      {/* Dates & Numbers */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: "150ms" }}>
        <div>
          <p className="text-xs text-white/40 uppercase tracking-wider mb-1">PO Number</p>
          <p className="text-sm font-medium text-white/90 font-mono">{currentPo.poNumber}</p>
        </div>
        <div>
          <p className="text-xs text-white/40 uppercase tracking-wider mb-1">RFQ Ref</p>
          <p className="text-sm font-medium text-white/90">{rfq?.title || "N/A"}</p>
        </div>
        <div>
          <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Created At</p>
          <p className="text-sm font-medium text-white/90">{new Date(currentPo.createdAt).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Delivery Time</p>
          <p className="text-sm font-bold text-rose-400">{currentPo.quotation?.deliveryDays || 0} Days</p>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="bg-[#0d0d20] border border-white/10 rounded-2xl shadow-xl overflow-hidden animate-slide-up" style={{ animationDelay: "200ms" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr>
                <th className="p-4 bg-white/[0.02] border-b border-white/10 text-xs font-semibold text-white/40 uppercase tracking-wider">Item / RFQ Title</th>
                <th className="p-4 bg-white/[0.02] border-b border-white/10 text-xs font-semibold text-white/40 uppercase tracking-wider text-right">Qty</th>
                <th className="p-4 bg-white/[0.02] border-b border-white/10 text-xs font-semibold text-white/40 uppercase tracking-wider text-right">Unit Price</th>
                <th className="p-4 bg-white/[0.02] border-b border-white/10 text-xs font-semibold text-white/40 uppercase tracking-wider text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="p-4 text-white/80 font-medium text-sm">{rfq?.title || "Custom Order"}</td>
                <td className="p-4 text-white/60 text-sm text-right">{qty}</td>
                <td className="p-4 text-white/60 text-sm text-right">₹{price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="p-4 text-white/90 font-medium text-sm text-right">₹{quotationAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} className="p-4 border-t border-white/10"></td>
                <td className="p-4 border-t border-white/10 text-white/40 text-sm text-right">Subtotal</td>
                <td className="p-4 border-t border-white/10 text-white/90 font-medium text-sm text-right">₹{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
              <tr>
                <td colSpan={2} className="p-4 border-b border-white/10"></td>
                <td className="p-4 border-b border-white/10 text-white/40 text-sm text-right">Tax (18%)</td>
                <td className="p-4 border-b border-white/10 text-white/90 font-medium text-sm text-right">₹{tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
              <tr className="bg-white/[0.02]">
                <td colSpan={2} className="p-6"></td>
                <td className="p-6 text-white/60 font-semibold uppercase tracking-wider text-sm text-right">Grand Total</td>
                <td className="p-6 text-emerald-400 font-bold text-xl text-right">₹{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}