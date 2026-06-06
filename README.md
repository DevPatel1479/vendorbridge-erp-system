<div align="center">

<img src="https://img.shields.io/badge/Next.js-16.2.7-black?style=for-the-badge&logo=nextdotjs&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
<img src="https://img.shields.io/badge/PostgreSQL-Aiven_Cloud-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />

<br /><br />

```
██╗   ██╗███████╗███╗   ██╗██████╗  ██████╗ ██████╗ ██████╗ ██████╗ ██╗██████╗  ██████╗ ███████╗
██║   ██║██╔════╝████╗  ██║██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗██║██╔══██╗██╔════╝ ██╔════╝
██║   ██║█████╗  ██╔██╗ ██║██║  ██║██║   ██║██████╔╝██████╔╝██████╔╝██║██║  ██║██║  ███╗█████╗  
╚██╗ ██╔╝██╔══╝  ██║╚██╗██║██║  ██║██║   ██║██╔══██╗██╔══██╗██╔══██╗██║██║  ██║██║   ██║██╔══╝  
 ╚████╔╝ ███████╗██║ ╚████║██████╔╝╚██████╔╝██║  ██║██████╔╝██║  ██║██║██████╔╝╚██████╔╝███████╗
  ╚═══╝  ╚══════╝╚═╝  ╚═══╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝╚═════╝  ╚═════╝ ╚══════╝
```

### **Enterprise Procurement ERP System**
> _Streamline Vendor Selection · Automate Procurement · Accelerate Approvals_

<br />

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Click_Here-8B5CF6?style=for-the-badge)](http://localhost:3000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## ✨ What is VendorBridge?

**VendorBridge** is a full-stack, enterprise-grade **Procurement ERP System** designed to digitize and automate the complete vendor management lifecycle — from onboarding vendors, issuing RFQs (Request for Quotations), comparing vendor bids, approving the best deal, and auto-generating Purchase Orders — all within a single, beautiful dark-themed dashboard.

> Built for **Procurement Officers** and **Administrators** who need a modern, reliable tool to manage procurement workflows without spreadsheets or manual paperwork.

---

## 🌟 Key Features

| Feature | Description |
|--------|-------------|
| 🏢 **Vendor Management** | Add, view and manage your vendor database with company, GST, and category details |
| 📋 **RFQ Creation** | Issue Requests for Quotation to multiple vendors simultaneously |
| 💬 **Quotation Submission** | Vendors submit competitive bids with pricing and delivery timelines |
| ⚖️ **Quotation Comparison** | Side-by-side comparison table with lowest-price highlights and vendor ratings |
| ✅ **One-Click Approval** | Approve the best quotation with a single click — only one approval per RFQ allowed |
| 📄 **Auto Purchase Order** | PO is automatically generated (with 18% GST) the moment a quotation is approved |
| 🧾 **PO & Invoice View** | Beautiful invoice-style PO viewer with vendor details, line items, and tax breakdown |
| 🔐 **Role-Based Access** | `PROCUREMENT_OFFICER` and `ADMIN` roles with middleware-enforced permissions |
| 🌙 **Premium Dark UI** | Glassmorphism design with violet/emerald accents, micro-animations, and glow effects |

---

## 🎯 System Flow

```mermaid
flowchart TD
    A[👤 Procurement Officer Logs In] --> B[📋 Create RFQ]
    B --> C[📨 RFQ Sent to Vendors]
    C --> D[💬 Vendors Submit Quotations]
    D --> E[⚖️ Quotation Comparison Screen]
    E --> F{Approve Best Quote}
    F -- ✅ Select & Approve --> G[📄 Auto-Generate Purchase Order]
    G --> H[🧾 PO & Invoice View]
    H --> I[📤 Send PO to Vendor]
```

---

## 🖥️ Screenshots

### Dashboard
> Real-time procurement overview with KPIs, recent activity, and navigation shortcuts.

### Vendor Management
> Full vendor directory with company name, GST, category, email, phone, and status.

### RFQ Creation
> Issue RFQs with title, description, quantity, deadline, and multi-vendor assignment.

### Quotation Comparison
> Live side-by-side comparison of submitted quotes — lowest price highlighted in **emerald**, hover-glow effects on all action buttons, and a one-click approval flow.

### Purchase Orders
> Auto-populated PO document with subtotal, 18% GST tax, grand total, vendor details, and RFQ reference.

---

## 🛠️ Tech Stack

### Frontend
```
Next.js 16 (App Router + Turbopack)
TypeScript
Tailwind CSS
Lucide React (Icons)
```

### Backend
```
Next.js API Routes (REST)
Prisma ORM
PostgreSQL (Aiven Cloud)
JWT Authentication (via cookies)
```

### Services
```
/services/rfq.service.ts        → RFQ CRUD + vendor assignment
/services/quotation.service.ts  → Quotation CRUD + comparison
/services/po.service.ts         → PO creation with tax calculation
/services/vendor.service.ts     → Vendor CRUD
```

### Auth & Permissions
```
lib/auth.ts          → JWT token generation & verification
lib/permissions.ts   → Role-based route guards (getUser, requireRole)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL database (or Aiven Cloud account)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/DevPatel1479/vendorbridge-erp-system.git
cd vendorbridge-erp-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
JWT_SECRET="your-super-secret-jwt-key"
```

### 4. Generate Prisma Client & Push Schema
```bash
# Stop dev server first, then:
cmd /c npx prisma generate
cmd /c npx prisma db push
```

### 5. Start the Development Server
```bash
npm run dev
```

Visit **http://localhost:3000** 🎉

---

## 📁 Project Structure

```
vendorbridge-erp-system/
├── app/
│   ├── (auth)/                  # Login & Signup pages
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (main)/                  # Protected main app layout
│   │   ├── dashboard/page.tsx
│   │   ├── vendors/page.tsx
│   │   ├── rfqs/
│   │   │   └── new/page.tsx
│   │   ├── quotations/
│   │   │   ├── page.tsx         # Submit Quotation
│   │   │   └── comparison/page.tsx  # Compare & Approve
│   │   └── po-invoice/page.tsx  # Purchase Order View
│   └── api/                     # REST API Routes
│       ├── auth/
│       ├── vendors/
│       ├── rfqs/
│       ├── quotations/
│       │   ├── route.ts
│       │   ├── [id]/route.ts
│       │   └── rfq/[rfqId]/route.ts
│       └── purchase-orders/
│           ├── route.ts
│           └── [id]/route.ts
├── components/
│   ├── sidebar.tsx
│   └── ui/
├── services/                    # Business logic layer
│   ├── rfq.service.ts
│   ├── quotation.service.ts
│   ├── po.service.ts
│   └── vendor.service.ts
├── lib/
│   ├── auth.ts                  # JWT helpers
│   ├── permissions.ts           # Role guards
│   └── prisma.ts               # Prisma singleton
├── prisma/
│   └── schema.prisma           # Database schema
└── types/                      # TypeScript interfaces
```

---

## 🔐 User Roles

| Role | Permissions |
|------|------------|
| `PROCUREMENT_OFFICER` | Create RFQs, Submit Quotations, Compare & Approve, View POs |
| `ADMIN` | All of the above + Delete vendors, quotations, manage users |
| `VENDOR` | Submit quotations against open RFQs _(future)_ |

---

## 📊 Database Schema

```
User ──────────── creates ──────────── RFQ
                                        │
                                   RfqVendor ─── Vendor
                                        │
                                   Quotation ────────── Vendor
                                        │
                                   Approval ──── User (approver)
                                        │
                                 PurchaseOrder
                                        │
                                    Invoice
```

---

## 🧪 API Reference

### Vendors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vendors` | Get all vendors |
| POST | `/api/vendors` | Create vendor |

### RFQs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rfqs` | Get all RFQs |
| POST | `/api/rfqs` | Create RFQ with vendor assignments |

### Quotations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/quotations` | Get all quotations |
| POST | `/api/quotations` | Submit a quotation |
| PUT | `/api/quotations/[id]` | Update quotation (approve/reject) |
| GET | `/api/quotations/rfq/[rfqId]` | Get all quotations for an RFQ |

### Purchase Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/purchase-orders` | Get all POs (populated) |
| POST | `/api/purchase-orders` | Create PO from approved quotation |
| GET | `/api/purchase-orders/[id]` | Get PO by ID |
| PUT | `/api/purchase-orders/[id]` | Update PO status |

---

## ⚡ Complete User Workflow

```
1. Register/Login as PROCUREMENT_OFFICER
2. Add Vendors (Vendor Management Page)
3. Create RFQ → select vendors → Save & Send
4. Submit Quotations (Quotations Page):
   - Select RFQ → Select Vendor → Enter Amount & Delivery → Submit
   - Repeat for multiple vendors to compare
5. Quotation Comparison Page:
   - Select RFQ from dropdown
   - View all submitted quotes side-by-side
   - Lowest price highlighted in green
   - Click "Select & Approve" on the best one
6. Purchase Orders Page:
   - PO is auto-generated with 18% GST
   - View vendor details, RFQ reference, totals
   - Download PDF or Send to Vendor
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#0a0a1a` |
| Card Background | `#0d0d20` |
| Primary Accent | `violet-500 / violet-600` |
| Success | `emerald-400 / emerald-500` |
| Danger | `rose-400 / rose-500` |
| Border | `white/10` |
| Text Primary | `white/90` |
| Text Muted | `white/40` |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Team

| Name | Role |
|------|------|
| **Dev Patel** | Full-Stack Developer (Backend & DB Schema) |
| **Saumil** | Full-Stack Developer (Frontend & API Integration) |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for modern procurement teams**

⭐ Star this repo if you found it helpful!

</div>
