import type { Metadata } from "next"
import { Sidebar } from "@/components/sidebar"

export const metadata: Metadata = {
  title: "VendorBridge – Procurement ERP",
  description: "Centralized Procurement & Vendor Management ERP Platform",
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
