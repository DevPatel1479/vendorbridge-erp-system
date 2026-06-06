"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, TrendingDown, Star, Clock, FileText, Loader2 } from "lucide-react"

export default function QuotationComparisonPage() {
  const [rfqs, setRfqs] = useState<any[]>([])
  const [selectedRfq, setSelectedRfq] = useState("")
  const [quotations, setQuotations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    const fetchRfqs = async () => {
      try {
        const res = await fetch("/api/rfqs", { credentials: "include" })
        if (res.ok) {
          const data = await res.json()
          setRfqs(data)
          if (data.length > 0) setSelectedRfq(data[0].id)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchRfqs()
  }, [])

  useEffect(() => {
    if (!selectedRfq) return
    const fetchQuotations = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/quotations/rfq/${selectedRfq}`, { credentials: "include" })
        if (res.ok) {
          setQuotations(await res.json())
          setErrorMsg(null)
        } else {
          setErrorMsg("Failed to load quotations. Database connection issue.")
        }
      } catch (err) {
        setErrorMsg("Failed to load quotations.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchQuotations()
  }, [selectedRfq])

  const handleApprove = async (qId: string) => {
    if (!confirm("Are you sure you want to approve this quotation?")) return
    try {
      const res = await fetch(`/api/quotations/${qId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "APPROVED" })
      })
      if (res.ok) {
        alert("Quotation approved successfully!")
        setQuotations(prev => prev.map(q => q.id === qId ? { ...q, status: "APPROVED" } : q))
      }
    } catch (err) {
      alert("Error approving quotation")
    }
  }

  const lowestAmount = quotations.length > 0 ? Math.min(...quotations.map(q => q.amount)) : 0

  return (
    <div className="p-8 space-y-8 animate-fade-in min-h-full bg-[#0a0a1a]">
      {/* Header */}
      <div className="animate-slide-up" style={{ animationDelay: "0ms" }}>
        <Link href="/quotations" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Quotations
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Quotation Comparison</h1>
            <p className="text-white/40 mt-1 text-sm">Compare submitted quotes and approve the best vendor</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-1.5 rounded-xl flex items-center">
            <span className="text-white/40 text-sm px-3">Filter by RFQ:</span>
            <select 
              value={selectedRfq} onChange={(e) => setSelectedRfq(e.target.value)}
              className="bg-[#0d0d20] border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-violet-500/50 transition-all appearance-none min-w-[200px]"
            >
              {rfqs.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
        </div>
      ) : errorMsg ? (
        <div className="bg-[#0d0d20] border border-rose-500/20 rounded-2xl p-12 text-center text-rose-400">
          <p>{errorMsg}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-rose-500/20 rounded-lg text-sm">Retry Connection</button>
        </div>
      ) : quotations.length === 0 ? (
        <div className="bg-[#0d0d20] border border-white/10 rounded-2xl p-12 text-center space-y-6">
          <div className="w-16 h-16 bg-violet-500/10 border border-violet-500/20 rounded-2xl flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8 text-violet-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white/90">No quotations submitted yet</h3>
            <p className="text-white/40 text-sm mt-2 max-w-md mx-auto">
              Vendors haven't submitted any quotes for this RFQ. Follow the steps below to get quotes in the comparison table.
            </p>
          </div>

          {/* Step guide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-left mt-4">
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <div className="w-7 h-7 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold mb-3">✓</div>
              <p className="text-xs font-semibold text-white/80 mb-1">Step 1 — Create RFQ</p>
              <p className="text-xs text-white/40">RFQ has been created and sent to vendors.</p>
            </div>
            <div className="bg-violet-500/[0.06] border border-violet-500/20 rounded-xl p-4">
              <div className="w-7 h-7 bg-violet-500/20 text-violet-400 rounded-full flex items-center justify-center text-xs font-bold mb-3">2</div>
              <p className="text-xs font-semibold text-violet-300 mb-1">Step 2 — Submit Quotation</p>
              <p className="text-xs text-white/40">Go to Quotations page, select this RFQ + a vendor, enter the price and submit.</p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <div className="w-7 h-7 bg-white/10 text-white/40 rounded-full flex items-center justify-center text-xs font-bold mb-3">3</div>
              <p className="text-xs font-semibold text-white/50 mb-1">Step 3 — Compare Here</p>
              <p className="text-xs text-white/30">Come back to this page and approve the best quote.</p>
            </div>
          </div>

          <Link
            href="/quotations"
            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-semibold shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
          >
            Go to Submit Quotation →
          </Link>
        </div>
      ) : (
        <div className="bg-[#0d0d20] border border-white/10 rounded-2xl shadow-xl overflow-hidden animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                <tr>
                  <th className="p-6 bg-white/[0.02] border-b border-r border-white/10 w-48 sticky left-0 z-10 backdrop-blur-xl">
                    <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Criteria</span>
                  </th>
                  {quotations.map(q => {
                    const isLowest = q.amount === lowestAmount
                    return (
                      <th key={q.id} className={`p-6 border-b border-r border-white/10 min-w-[250px] relative ${isLowest ? 'bg-emerald-500/5' : ''}`}>
                        {isLowest && (
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-emerald-500/20 flex items-center gap-1">
                            <TrendingDown className="w-3 h-3" /> LOWEST PRICE
                          </div>
                        )}
                        <h3 className="text-lg font-bold text-white mb-1">{q.vendor?.companyName || "Unknown Vendor"}</h3>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          q.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' : 
                          q.status === 'REJECTED' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {q.status}
                        </span>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {/* Total Amount */}
                <tr>
                  <td className="p-4 bg-white/[0.01] border-r border-white/10 font-medium text-white/60 sticky left-0 z-10 backdrop-blur-xl">Grand Total</td>
                  {quotations.map(q => (
                    <td key={q.id} className={`p-4 border-r border-white/10 text-xl font-bold ${q.amount === lowestAmount ? 'text-emerald-400 bg-emerald-500/[0.02]' : 'text-white'}`}>
                      ₹{q.amount.toLocaleString()}
                    </td>
                  ))}
                </tr>
                {/* Delivery Time */}
                <tr>
                  <td className="p-4 bg-white/[0.01] border-r border-white/10 font-medium text-white/60 sticky left-0 z-10 backdrop-blur-xl">Delivery (Days)</td>
                  {quotations.map(q => (
                    <td key={q.id} className={`p-4 border-r border-white/10 text-white/80 ${q.amount === lowestAmount ? 'bg-emerald-500/[0.02]' : ''}`}>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-violet-400" /> {q.deliveryDays} Days
                      </div>
                    </td>
                  ))}
                </tr>
                {/* Vendor Rating (Mock) */}
                <tr>
                  <td className="p-4 bg-white/[0.01] border-r border-white/10 font-medium text-white/60 sticky left-0 z-10 backdrop-blur-xl">Vendor Rating</td>
                  {quotations.map(q => (
                    <td key={q.id} className={`p-4 border-r border-white/10 text-white/80 ${q.amount === lowestAmount ? 'bg-emerald-500/[0.02]' : ''}`}>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-current" /> 4.5 / 5
                      </div>
                    </td>
                  ))}
                </tr>
                {/* Notes */}
                <tr>
                  <td className="p-4 bg-white/[0.01] border-r border-white/10 font-medium text-white/60 sticky left-0 z-10 backdrop-blur-xl">Terms / Notes</td>
                  {quotations.map(q => (
                    <td key={q.id} className={`p-4 border-r border-white/10 text-white/60 text-sm ${q.amount === lowestAmount ? 'bg-emerald-500/[0.02]' : ''}`}>
                      {q.notes || "Standard terms apply"}
                    </td>
                  ))}
                </tr>
                {/* Action Row */}
                <tr>
                  <td className="p-6 bg-white/[0.01] border-r border-white/10 sticky left-0 z-10 backdrop-blur-xl"></td>
                  {quotations.map(q => (
                    <td key={q.id} className={`p-6 border-r border-white/10 text-center ${q.amount === lowestAmount ? 'bg-emerald-500/[0.02]' : ''}`}>
                      <button 
                        onClick={() => handleApprove(q.id)}
                        disabled={q.status === 'APPROVED'}
                        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                          q.status === 'APPROVED' 
                            ? 'bg-emerald-500/20 text-emerald-500 cursor-not-allowed border border-emerald-500/20' 
                            : q.amount === lowestAmount 
                              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                              : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
                        }`}
                      >
                        {q.status === 'APPROVED' ? (
                          <><CheckCircle2 className="w-4 h-4" /> Approved</>
                        ) : (
                          "Select & Approve"
                        )}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
