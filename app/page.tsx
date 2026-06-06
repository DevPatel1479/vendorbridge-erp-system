import Link from "next/link"
import {
  Building2,
  ArrowRight,
  CheckCircle2,
  Users,
  ClipboardList,
  ShoppingCart,
  FileText,
  BarChart3,
  Shield,
  Zap,
  Globe,
} from "lucide-react"

const features = [
  { icon: Users, title: "Vendor Management", desc: "Register, track & manage supplier profiles with GST details, categories, and status tracking." },
  { icon: ClipboardList, title: "RFQ Creation", desc: "Initiate procurement with structured RFQs — assign vendors, set deadlines & attach specs." },
  { icon: ShoppingCart, title: "Purchase Orders", desc: "Auto-generate POs from approved quotations with tax calculations and status updates." },
  { icon: FileText, title: "Invoice Generation", desc: "Create, download, print, and email invoices directly from the platform." },
  { icon: BarChart3, title: "Reports & Analytics", desc: "Gain insights on vendor performance, spending trends and monthly procurement data." },
  { icon: Shield, title: "Approval Workflows", desc: "Multi-level approval chains with remarks, timelines, and state transitions." },
]

const stats = [
  { value: "500+", label: "Enterprises" },
  { value: "12K+", label: "POs Processed" },
  { value: "98%", label: "Uptime SLA" },
  { value: "4x", label: "Faster Procurement" },
]

const workflow = [
  { step: "01", title: "Create RFQ", desc: "Procurement officer raises a Request for Quotation" },
  { step: "02", title: "Vendor Quotes", desc: "Assigned vendors submit competitive quotations" },
  { step: "03", title: "Compare & Approve", desc: "Team compares quotes side-by-side and triggers approval" },
  { step: "04", title: "PO & Invoice", desc: "System generates Purchase Order and Invoice automatically" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-x-hidden">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#0a0a1a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-600/20 border border-violet-500/30">
              <Building2 className="w-5 h-5 text-violet-400" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">VendorBridge</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#workflow" className="hover:text-white transition-colors">How It Works</a>
            <a href="#stats" className="hover:text-white transition-colors">Impact</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-semibold bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-violet-500/25"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* bg glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold mb-8 animate-fade-in">
            <Zap className="w-3.5 h-3.5" />
            Procurement ERP — Built for the Modern Enterprise
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 animate-slide-up">
            Procurement,{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Reimagined
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: "80ms" }}>
            VendorBridge centralizes vendors, RFQs, quotations, approvals, purchase orders and invoices — eliminating manual inefficiencies with structured digital workflows.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "160ms" }}>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-2xl transition-all duration-200 active:scale-95 shadow-xl shadow-violet-500/30 text-sm"
            >
              Create Free Account <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl transition-all duration-200 active:scale-95 text-sm"
            >
              Sign In to Dashboard
            </Link>
          </div>

          {/* trust */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/30 animate-fade-in" style={{ animationDelay: "300ms" }}>
            {["No credit card required", "Role-based access control", "Enterprise-grade security"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section id="stats" className="py-16 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{s.value}</p>
              <p className="text-sm text-white/40 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3">Platform Features</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Everything procurement needs</h2>
            <p className="text-white/40 mt-3 max-w-xl mx-auto text-sm">
              End-to-end digital procurement workflows — from vendor onboarding to invoice dispatch.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group p-6 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-violet-500/30 transition-all duration-300"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 w-fit mb-4 group-hover:bg-violet-500/20 transition-colors">
                  <f.icon className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Workflow ── */}
      <section id="workflow" className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">From RFQ to Invoice in 4 steps</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* connector line */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-violet-500/0 via-violet-500/40 to-violet-500/0" />
            {workflow.map((w) => (
              <div key={w.step} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600/30 to-violet-800/30 border border-violet-500/30 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-violet-300">
                  {w.step}
                </div>
                <h3 className="font-semibold text-white mb-2">{w.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roles ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-fuchsia-400 uppercase tracking-widest mb-3">Role-Based Access</p>
            <h2 className="text-3xl font-bold text-white">Built for every team member</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { role: "Procurement Officer", color: "violet", items: ["Create & manage RFQs", "Compare quotations", "Generate purchase orders & invoices"] },
              { role: "Vendor", color: "cyan", items: ["Submit quotations", "Track RFQ status", "View issued purchase orders"] },
              { role: "Manager / Approver", color: "amber", items: ["Approve or reject procurement requests", "Monitor procurement workflows"] },
              { role: "Admin", color: "emerald", items: ["Manage users & vendors", "View all procurement analytics"] },
            ].map((r) => (
              <div key={r.role} className="p-6 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-white/15 transition-all duration-300">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                  r.color === "violet" ? "bg-violet-500/15 text-violet-300 border border-violet-500/25" :
                  r.color === "cyan" ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/25" :
                  r.color === "amber" ? "bg-amber-500/15 text-amber-300 border border-amber-500/25" :
                  "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25"
                }`}>{r.role}</div>
                <ul className="space-y-2">
                  {r.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/50">
                      <CheckCircle2 className="w-4 h-4 text-white/20 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-violet-600/10 rounded-3xl blur-3xl" />
          <div className="relative p-12 rounded-3xl border border-violet-500/20 bg-gradient-to-b from-violet-600/10 to-transparent">
            <Globe className="w-10 h-10 text-violet-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to transform your procurement?
            </h2>
            <p className="text-white/40 mb-8 text-sm">
              Join hundreds of enterprises already using VendorBridge to streamline vendor relationships and purchasing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-2xl transition-all duration-200 active:scale-95 shadow-xl shadow-violet-500/30 text-sm"
              >
                Create Account <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/signin"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/10 hover:border-white/25 text-white/70 hover:text-white font-semibold rounded-2xl transition-all duration-200 text-sm"
              >
                Sign In →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <Building2 className="w-4 h-4" />
            <span>VendorBridge ERP — Odoo Hackathon 2026</span>
          </div>
          <p className="text-xs text-white/20">Procurement & Vendor Management Platform</p>
        </div>
      </footer>
    </div>
  )
}
