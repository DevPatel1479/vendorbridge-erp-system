"use client"

import { useState } from "react"
import { CheckCircle2, Clock, CheckSquare, MessageSquare, ShieldCheck, XCircle, FileText } from "lucide-react"

export default function ApprovalPage() {
  const [remarks, setRemarks] = useState("")

  const steps = [
    { id: 1, title: "Submitted", status: "completed" },
    { id: 2, title: "L1 Review", status: "completed" },
    { id: 3, title: "L2 approval", status: "current" },
    { id: 4, title: "Generate PO", status: "pending" }
  ]

  const chain = [
    { id: 1, title: "Rahul Mehta (Procurement head)", subtitle: "Approved on may 20, 10:30 AM", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { id: 2, title: "Priya Shah (Finance manager)", subtitle: "Awaiting approval. Assigned may 21", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" }
  ]

  return (
    <div className="p-8 space-y-8 animate-fade-in min-h-full bg-[#0a0a1a]">
      {/* Header */}
      <div className="animate-slide-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <CheckSquare className="w-8 h-8 text-violet-500" />
          Approval Workflow
        </h1>
        <p className="text-white/40 mt-2 text-sm">RFQ: office furniture Q2 - Vendor: Infra Supplies - ₹185,400</p>
      </div>

      {/* Stepper */}
      <div className="bg-[#0d0d20] border border-white/10 rounded-2xl p-8 shadow-xl animate-slide-up" style={{ animationDelay: "100ms" }}>
        <div className="flex items-center justify-between relative max-w-4xl mx-auto">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/10 z-0"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-violet-600 z-0 w-[66%]"></div>
          
          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold transition-all duration-300 ${
                step.status === 'completed' 
                  ? "bg-violet-600 border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.4)] text-white" 
                  : step.status === 'current'
                    ? "bg-amber-500 border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                    : "bg-[#0d0d20] border-white/20 text-white/40"
              }`}>
                {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : step.id}
              </div>
              <span className={`text-xs font-semibold ${step.status !== 'pending' ? "text-white/80" : "text-white/40"}`}>{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
        
        {/* Left Column: Approval Chain */}
        <div className="bg-[#0d0d20] border border-white/10 rounded-2xl p-8 shadow-xl flex flex-col h-full">
          <h2 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-violet-400" /> Approval Chain
          </h2>
          
          <div className="space-y-6 flex-1 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/5 before:to-transparent">
            {chain.map((c, i) => (
              <div key={i} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border ${c.bg} border-white/10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm`}>
                  <c.icon className={`w-5 h-5 ${c.color}`} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-4 rounded-xl">
                  <h4 className="text-sm font-semibold text-white/90">{c.title}</h4>
                  <p className="text-xs text-white/40 mt-1">{c.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <label className="block text-sm font-medium text-white/60 mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Approval Remarks
            </label>
            <textarea 
              value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-violet-500/50 transition-all resize-none"
              placeholder="Add your remarks or conditions..."
            />
          </div>
        </div>

        {/* Right Column: Quotations Summary & Action */}
        <div className="flex flex-col gap-8">
          <div className="bg-[#0d0d20] border border-white/10 rounded-2xl p-8 shadow-xl">
            <h2 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-violet-400" /> Quotation Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-white/40 text-sm">Vendor</span>
                <span className="text-white/90 font-medium text-sm">Infra Supplies Pvt Ltd</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-white/40 text-sm">Total</span>
                <span className="text-emerald-400 font-bold text-lg">₹1,85,400</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-white/40 text-sm">Delivery</span>
                <span className="text-white/90 font-medium text-sm">10 Days</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-white/40 text-sm">Rating</span>
                <span className="text-amber-400 font-medium text-sm flex items-center gap-1">★ 4.5/5</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0d0d20] border border-white/10 rounded-2xl p-8 shadow-xl flex gap-4">
            <button className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Approve
            </button>
            <button className="flex-1 py-3 bg-rose-600/20 hover:bg-rose-600/30 text-rose-500 border border-rose-500/20 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2">
              <XCircle className="w-4 h-4" /> Reject
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}