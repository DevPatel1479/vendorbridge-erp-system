import { prisma } from "@/lib/prisma";

export const ReportsService = {
  // 📊 OVERALL DASHBOARD STATS
  async getOverview() {
    const [vendors, rfqs, quotations, po, invoices] = await Promise.all([
      prisma.vendor.count(),
      prisma.rfq.count(),
      prisma.quotation.count(),
      prisma.purchaseOrder.count(),
      prisma.invoice.count(),
    ]);

    const totalSpend = await prisma.invoice.aggregate({
      _sum: { totalAmount: true },
    });

    return {
      totalVendors: vendors,
      totalRFQs: rfqs,
      totalQuotations: quotations,
      totalPurchaseOrders: po,
      totalInvoices: invoices,
      totalSpend: totalSpend._sum.totalAmount || 0,
    };
  },

  // 📈 MONTHLY PROCUREMENT TREND
  async getMonthlyTrends() {
    const invoices = await prisma.invoice.findMany({
      select: {
        totalAmount: true,
        createdAt: true,
      },
    });

    const grouped: Record<string, number> = {};

    invoices.forEach((inv : any) => {
      const month = new Date(inv.createdAt).toISOString().slice(0, 7); // YYYY-MM
      grouped[month] = (grouped[month] || 0) + inv.totalAmount;
    });

    return Object.entries(grouped).map(([month, total]) => ({
      month,
      totalSpend: total,
    }));
  },

  // 🏆 VENDOR PERFORMANCE REPORT
  async getVendorPerformance() {
    const vendors = await prisma.vendor.findMany({
      include: {
        quotations: {
          include: {
            purchaseOrder: true,
          },
        },
      },
    });

    return vendors.map((vendor : any) => {
      const totalQuotes = vendor.quotations.length;

      const approvedPOs = vendor.quotations.filter(
        (q : any) => q.purchaseOrder !== null
      ).length;

      const conversionRate =
        totalQuotes === 0
          ? 0
          : (approvedPOs / totalQuotes) * 100;

      return {
        vendorId: vendor.id,
        companyName: vendor.companyName,
        totalQuotes,
        approvedPOs,
        conversionRate: Number(conversionRate.toFixed(2)),
      };
    });
  },

  // 💰 SPENDING SUMMARY
  async getSpendingSummary() {
    const invoices = await prisma.invoice.findMany({
      select: {
        totalAmount: true,
        status: true,
      },
    });

    const summary = {
      total: 0,
      paid: 0,
      pending: 0,
    };

    invoices.forEach((inv : any) => {
      summary.total += inv.totalAmount;

      if (inv.status === "PAID") {
        summary.paid += inv.totalAmount;
      } else {
        summary.pending += inv.totalAmount;
      }
    });

    return summary;
  },
};