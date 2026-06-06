"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, X, Calendar, FileText, CheckCircle2, Send, Save, Loader2, Building2 } from "lucide-react"

type Vendor = { id: string; companyName: string }

export default function CreateRFQPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDraft, setIsDraft] = useState(false)
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [success, setSuccess] = useState(false)

  // Form fields
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [selectedVendorIds, setSelectedVendorIds] = useState<string[]>([])
  const [lineItems, setLineItems] = useState([
    { id: 1, item: "", qty: 0, unit: "NOS" }
  ])

  useEffect(() => {
    fetch("/api/vendors", { credentials: "include" })
      .then(r => r.ok ? r.json() : [])
      .then(setVendors)
      .catch(console.error)
  }, [])

  const addLineItem = () => {
    setLineItems([...lineItems, { id: Date.now(), item: "", qty: 0, unit: "NOS" }])
  }

  const removeLineItem = (id: number) => {
    setLineItems(lineItems.filter(i => i.id !== id))
  }

  const updateLineItem = (id: number, field: string, value: string | number) => {
    setLineItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i))
  }

  const toggleVendor = (vendorId: string) => {
    setSelectedVendorIds(prev =>
      prev.includes(vendorId) ? prev.filter(id => id !== vendorId) : [...prev, vendorId]
    )
  }

  const handleSubmit = async (asDraft = false) => {
    if (!title || !deadline) {
      alert("Please fill in RFQ Title and Deadline")
      return
    }
    if (!asDraft && selectedVendorIds.length === 0) {
      alert("Please assign at least one vendor to send this RFQ")
      return
    }

    setIsSubmitting(true)
    setIsDraft(asDraft)

    try {
      const res = await fetch("/api/rfqs", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          deadline,
          quantity: lineItems.reduce((sum, i) => sum + Number(i.qty), 0),
          vendorIds: selectedVendorIds
        })
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => router.push("/quotations"), 2000)
      } else {
        const err = await res.json()
        alert(err.error || "Failed to create RFQ")
      }
    } catch (e) {
      alert("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8 space-y-8 animate-fade-in min-h-full bg-[#0a0a1a]">
      {/* Header */}
      <div className="animate-slide-up" style={{ animationDelay: "0ms" }}>
        <Link href="/rfqs" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to RFQs
        </Link>
        <h1 className="text-3xl font-bold text-white tracking-tight">Create RFQ</h1>
        <p className="text-white/40 mt-1 text-sm">Draft a new request for quotation and send to vendors</p>
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
                : "bg-[#0d0d20] border-white/20 text-white/40"
            }`}>
              {step}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-3 text-xs font-medium text-white/50 px-2">
          <span className="text-violet-400">Basic Details</span>
          <span>Terms & Vendors</span>
          <span>Review & Send</span>
        </div>
      </div>

      {success && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-400">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-semibold">RFQ created successfully! Redirecting to Quotations...</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Form Details */}
        <div className="lg:col-span-6 space-y-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="bg-[#0d0d20] border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-violet-400" /> RFQ Information
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">RFQ Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-violet-500/50 transition-all"
                  placeholder="e.g. Office Furniture procurement Q2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Deadline *</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                  <input
                    type="date"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500/50 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-violet-500/50 transition-all resize-none"
                  placeholder="Describe the requirement..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Line Items & Vendors */}
        <div className="lg:col-span-6 flex flex-col gap-6 animate-slide-up" style={{ animationDelay: "300ms" }}>

          {/* Line Items */}
          <div className="bg-[#0d0d20] border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">Line Items</h2>
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
                        <input type="text" value={item.item} onChange={e => updateLineItem(item.id, "item", e.target.value)} className="w-full bg-transparent outline-none focus:text-violet-400 transition-colors" placeholder="Item description" />
                      </td>
                      <td className="px-4 py-3">
                        <input type="number" value={item.qty || ""} onChange={e => updateLineItem(item.id, "qty", e.target.value)} className="w-full bg-transparent outline-none focus:text-violet-400 transition-colors" placeholder="0" />
                      </td>
                      <td className="px-4 py-3">
                        <input type="text" value={item.unit} onChange={e => updateLineItem(item.id, "unit", e.target.value)} className="w-full bg-transparent outline-none focus:text-violet-400 transition-colors" placeholder="NOS" />
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

          {/* Assign Vendors - REAL DATA */}
          <div className="bg-[#0d0d20] border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-1 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-violet-400" /> Assign Vendors
            </h2>
            <p className="text-xs text-white/30 mb-4">Select vendors to invite for this RFQ</p>
            {vendors.length === 0 ? (
              <p className="text-xs text-white/30 text-center py-4">No vendors found. Add vendors first.</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {vendors.map(vendor => {
                  const isSelected = selectedVendorIds.includes(vendor.id)
                  return (
                    <button
                      key={vendor.id}
                      onClick={() => toggleVendor(vendor.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                        isSelected
                          ? "bg-violet-600/20 border-violet-500/40 text-violet-300"
                          : "bg-white/[0.03] border-white/5 text-white/70 hover:bg-white/[0.06]"
                      }`}
                    >
                      <span>{vendor.companyName}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-violet-400" />}
                    </button>
                  )
                })}
              </div>
            )}
            {selectedVendorIds.length > 0 && (
              <p className="text-xs text-violet-400 mt-2">{selectedVendorIds.length} vendor(s) selected</p>
            )}
          </div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 pt-8 border-t border-white/10 animate-slide-up" style={{ animationDelay: "400ms" }}>
        <button
          onClick={() => handleSubmit(false)}
          disabled={isSubmitting}
          className="px-6 py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white rounded-xl text-sm font-semibold shadow-lg shadow-violet-500/20 transition-all active:scale-[0.98] flex items-center gap-2"
        >
          {isSubmitting && !isDraft ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Save & Send to Vendors
        </button>
        <button
          onClick={() => handleSubmit(true)}
          disabled={isSubmitting}
          className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 hover:text-white rounded-xl text-sm font-semibold transition-all active:scale-[0.98] flex items-center gap-2"
        >
          {isSubmitting && isDraft ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save as Draft
        </button>
      </div>

    </div>
  )
}
