"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CheckCircle2, ChevronRight, FileText, Send, Loader2, Building2 } from "lucide-react"

export default function SubmitQuotationsPage() {
  const [activeStep, setActiveStep] = useState(1)
  const [vendors, setVendors] = useState<any[]>([])
  const [rfqs, setRfqs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Form State
  const [selectedVendor, setSelectedVendor] = useState("")
  const [selectedRfq, setSelectedRfq] = useState("")
  const [amount, setAmount] = useState("")
  const [deliveryDays, setDeliveryDays] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vRes, rRes] = await Promise.all([
          fetch("/api/vendors", { credentials: "include" }),
          fetch("/api/rfqs", { credentials: "include" })
        ])
        if (vRes.ok) setVendors(await vRes.json())
        if (rRes.ok) setRfqs(await rRes.json())
      } catch (err) {
        console.error("Failed to load initial data", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async () => {
    if (!selectedVendor || !selectedRfq || !amount || !deliveryDays) return
    setIsSubmitting(true)
    
    try {
      const res = await fetch("/api/quotations", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vendorId: selectedVendor,
          rfqId: selectedRfq,
          amount: parseFloat(amount),
          deliveryDays: parseInt(deliveryDays),
          notes
        })
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          setActiveStep(1)
          setSelectedVendor("")
          setSelectedRfq("")
          setAmount("")
          setDeliveryDays("")
          setNotes("")
        }, 3000)
      } else {
        const err = await res.json()
        alert(err.error || "Failed to submit quotation")
      }
    } catch (err) {
      alert("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    { id: 1, title: "Select details" },
    { id: 2, title: "Quotation Values" },
    { id: 3, title: "Review & Submit" }
  ]

  if (isLoading) {
    return (
      <div className="p-8 h-full flex items-center justify-center bg-[#0a0a1a]">
        <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 animate-fade-in min-h-full bg-[#0a0a1a]">
      {/* Header */}
      <div className="flex items-start justify-between animate-slide-up" style={{ animationDelay: "0ms" }}>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Submit Quotations</h1>
          <p className="text-white/40 mt-1 text-sm">Create and submit vendor quotations for RFQs</p>
        </div>
        <Link 
          href="/quotations/comparison"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold active:scale-95 transition-all border border-white/10"
        >
          View Comparisons <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stepper */}
      <div className="max-w-3xl animate-slide-up" style={{ animationDelay: "100ms" }}>
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/10 z-0"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-violet-600 z-0 transition-all duration-500"
            style={{ width: `${((activeStep - 1) / 2) * 100}%` }}
          ></div>
          
          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold transition-all duration-300 ${
                activeStep === step.id 
                  ? "bg-violet-600 border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.4)] text-white" 
                  : activeStep > step.id 
                    ? "bg-violet-900 border-violet-600 text-violet-300" 
                    : "bg-[#0d0d20] border-white/20 text-white/40"
              }`}>
                {activeStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.id}
              </div>
              <span className={`text-xs font-semibold ${activeStep >= step.id ? "text-white/80" : "text-white/40"}`}>{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {success && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-400 animate-slide-up">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-semibold">Quotation submitted successfully!</span>
        </div>
      )}

      {/* Form Content */}
      <div className="bg-[#0d0d20] border border-white/10 rounded-2xl p-8 shadow-xl animate-slide-up" style={{ animationDelay: "200ms" }}>
        
        {activeStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-violet-400" /> Select RFQ & Vendor
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Request for Quotation (RFQ) *</label>
                <select 
                  value={selectedRfq} onChange={(e) => setSelectedRfq(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500/50 transition-all appearance-none"
                >
                  <option value="" className="bg-[#0d0d20]">Select RFQ</option>
                  {rfqs.map(r => <option key={r.id} value={r.id} className="bg-[#0d0d20]">{r.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Vendor *</label>
                <select 
                  value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500/50 transition-all appearance-none"
                >
                  <option value="" className="bg-[#0d0d20]">Select Vendor</option>
                  {vendors.map(v => <option key={v.id} value={v.id} className="bg-[#0d0d20]">{v.companyName}</option>)}
                </select>
              </div>
            </div>
            <div className="pt-6 border-t border-white/10 flex justify-end">
              <button 
                disabled={!selectedRfq || !selectedVendor}
                onClick={() => setActiveStep(2)}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:bg-white/10 disabled:text-white/40 text-white rounded-xl text-sm font-semibold transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-violet-400" /> Quotation Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Total Amount (₹) *</label>
                <input 
                  type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-violet-500/50 transition-all"
                  placeholder="e.g. 15000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Delivery Time (Days) *</label>
                <input 
                  type="number" value={deliveryDays} onChange={(e) => setDeliveryDays(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-violet-500/50 transition-all"
                  placeholder="e.g. 15"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/60 mb-2">Terms / Notes</label>
                <textarea 
                  value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-violet-500/50 transition-all resize-none"
                  placeholder="Payment terms: 30 days net..."
                />
              </div>
            </div>
            <div className="pt-6 border-t border-white/10 flex justify-between">
              <button 
                onClick={() => setActiveStep(1)}
                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold transition-all"
              >
                Back
              </button>
              <button 
                disabled={!amount || !deliveryDays}
                onClick={() => setActiveStep(3)}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:bg-white/10 disabled:text-white/40 text-white rounded-xl text-sm font-semibold transition-all"
              >
                Review Quotation
              </button>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Review & Submit
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Vendor</p>
                <p className="text-sm font-medium text-white/90">{vendors.find(v => v.id === selectedVendor)?.companyName}</p>
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">RFQ</p>
                <p className="text-sm font-medium text-white/90">{rfqs.find(r => r.id === selectedRfq)?.title}</p>
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Amount</p>
                <p className="text-xl font-bold text-emerald-400">₹{parseFloat(amount).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Delivery Time</p>
                <p className="text-sm font-medium text-white/90">{deliveryDays} Days</p>
              </div>
            </div>
            <div className="pt-6 border-t border-white/10 flex justify-between">
              <button 
                onClick={() => setActiveStep(2)}
                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold transition-all"
              >
                Back
              </button>
              <button 
                onClick={handleSubmit} disabled={isSubmitting}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Submit Quotation
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
