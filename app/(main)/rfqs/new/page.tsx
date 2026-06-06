"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, X, UploadCloud, Calendar, FileText, CheckCircle2 } from "lucide-react"

export default function CreateRFQPage() {
  const [lineItems, setLineItems] = useState([
    { id: 1, item: "Ergonomic chair", qty: 25, unit: "NOS" },
    { id: 2, item: "Standing desks", qty: 10, unit: "NOS" }
  ])
  const [assignedVendors, setAssignedVendors] = useState([
    { id: 1, name: "Infra Supplies Pvt Ltd" },
    { id: 2, name: "TechCore LTD" }
  ])

  const addLineItem = () => {
    setLineItems([...lineItems, { id: Date.now(), item: "", qty: 0, unit: "NOS" }])
  }

  const removeLineItem = (id: number) => {
    setLineItems(lineItems.filter(item => item.id !== id))
  }

  const removeVendor = (id: number) => {
    setAssignedVendors(assignedVendors.filter(v => v.id !== id))
  }

  return (
    <div className="p-8 space-y-8 animate-fade-in min-h-full bg-[#0a0a1a]">
      {/* Header & Breadcrumb */}
      <div className="animate-slide-up" style={{ animationDelay: "0ms" }}>
        <Link href="/rfqs" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to RFQs
        </Link>
        <h1 className="text-3xl font-bold text-white tracking-tight">Create RFQ</h1>
        <p className="text-white/40 mt-1 text-sm">Draft a new request for quotation to send to vendors</p>
      </div>

      {/* Stepper */}
      <div className="max-w-3xl animate-slide-up" style={{ animationDelay: "100ms" }}>
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/10 z-0"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-0.5 bg-violet-600 z-0"></div>
          
          {[1, 2, 3].map((step) => (
            <div key={step} className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold transition-all duration-300 ${
              step === 1 
                ? "bg-violet-600 border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.4)] text-white" 
                : step < 1 
                  ? "bg-violet-900 border-violet-600 text-violet-300" 
                  : "bg-[#0d0d20] border-white/20 text-white/40"
            }`}>
              {step < 1 ? <CheckCircle2 className="w-5 h-5" /> : step}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-3 text-xs font-medium text-white/50 px-2">
          <span className="text-violet-400">Basic Details</span>
          <span>Terms & Vendors</span>
          <span>Review & Send</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Details */}
        <div className="lg:col-span-6 space-y-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="bg-[#0d0d20] border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-violet-400" /> RFQ Information
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">RFQ's Title *</label>
                <input 
                  type="text" 
                  defaultValue="Office Furniture procurement Q2"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Category</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all appearance-none">
                  <option className="bg-[#0d0d20]">Furniture</option>
                  <option className="bg-[#0d0d20]">IT Equipment</option>
                  <option className="bg-[#0d0d20]">Office Supplies</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Deadline *</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                  <input 
                    type="date" 
                    defaultValue="2025-06-15"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Description</label>
                <textarea 
                  rows={4}
                  defaultValue="Ergonomic chairs and standing desks for 3rd floor"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Line Items, Vendors, Attachments */}
        <div className="lg:col-span-6 flex flex-col gap-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
          
          {/* Line Items */}
          <div className="bg-[#0d0d20] border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Line Items</h2>
            </div>
            <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-xs text-left bg-white/[0.02]">
                    <th className="px-4 py-3 font-medium">Item Name</th>
                    <th className="px-4 py-3 font-medium w-24">Qty</th>
                    <th className="px-4 py-3 font-medium w-24">Unit</th>
                    <th className="px-3 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {lineItems.map((item) => (
                    <tr key={item.id} className="text-white/80">
                      <td className="px-4 py-3">
                        <input type="text" defaultValue={item.item} className="w-full bg-transparent outline-none focus:text-violet-400 transition-colors" placeholder="Item description" />
                      </td>
                      <td className="px-4 py-3">
                        <input type="number" defaultValue={item.qty || ""} className="w-full bg-transparent outline-none focus:text-violet-400 transition-colors" placeholder="0" />
                      </td>
                      <td className="px-4 py-3">
                        <input type="text" defaultValue={item.unit} className="w-full bg-transparent outline-none focus:text-violet-400 transition-colors" placeholder="Unit" />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <button onClick={() => removeLineItem(item.id)} className="text-white/20 hover:text-rose-400 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={addLineItem} className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-violet-400 bg-violet-500/10 hover:bg-violet-500/20 transition-colors border border-violet-500/20">
              <Plus className="w-3.5 h-3.5" /> Add Line Item
            </button>
          </div>

          {/* Assigned Vendors */}
          <div className="bg-[#0d0d20] border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">Assign Vendors</h2>
            <div className="space-y-2 mb-3">
              {assignedVendors.map((vendor) => (
                <div key={vendor.id} className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-colors">
                  <span className="text-sm font-medium text-white/80">{vendor.name}</span>
                  <button onClick={() => removeVendor(vendor.id)} className="text-white/30 hover:text-rose-400 transition-colors p-1">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white/60 bg-white/5 hover:bg-white/10 hover:text-white transition-colors border border-white/10 w-full justify-center border-dashed">
              <Plus className="w-3.5 h-3.5" /> Add Vendor
            </button>
          </div>

          {/* Attachments */}
          <div className="bg-[#0d0d20] border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">Attachments</h2>
            <div className="border-2 border-dashed border-white/15 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/[0.02] hover:border-violet-500/30 transition-all cursor-pointer group">
              <div className="p-3 bg-white/5 rounded-full mb-3 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all">
                <UploadCloud className="w-6 h-6 text-white/40 group-hover:text-violet-400" />
              </div>
              <p className="text-sm font-medium text-white/70 mb-1">Drag & drop files or click to upload</p>
              <p className="text-xs text-white/30">Supported formats: PDF, DOCX, JPG (Max 10MB)</p>
            </div>
          </div>

        </div>
      </div>

      {/* Action Buttons (Bottom Bar) */}
      <div className="flex items-center gap-4 pt-8 border-t border-white/10 animate-slide-up" style={{ animationDelay: "400ms" }}>
        <button className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-violet-500/20 transition-all duration-200 active:scale-[0.98]">
          Save & Send to Vendors
        </button>
        <button className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/70 hover:text-white rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98]">
          Save as Draft
        </button>
      </div>

    </div>
  )
}
