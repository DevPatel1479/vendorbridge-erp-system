import { prisma } from "@/lib/prisma";
import type {
  CreateInvoiceInput,
  InvoiceResponse,
  InvoiceStatus,
} from "@/types/invoice.types";

function generateInvoiceNumber() {
  return `INV-${Date.now()}`;
}

export const InvoiceService = {
  // CREATE INVOICE FROM PO
  async createInvoice(
    data: CreateInvoiceInput
  ): Promise<InvoiceResponse> {
    const po = await prisma.purchaseOrder.findUnique({
      where: { id: data.purchaseOrderId },
      include: { invoice: true },
    });

    if (!po) {
      const err = new Error("Purchase Order not found");
      (err as any).statusCode = 404;
      throw err;
    }

    if (po.invoice) {
      const err = new Error("Invoice already exists for this PO");
      (err as any).statusCode = 409;
      throw err;
    }

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber: generateInvoiceNumber(),
        purchaseOrderId: po.id,
        subtotal: po.subtotal,
        taxAmount: po.tax,
        totalAmount: po.total,
        status: "GENERATED",
      },
    });

    return invoice;
  },

  // GET ALL
  async getAllInvoices() {
    return prisma.invoice.findMany({
      include: {
        purchaseOrder: {
          include: {
            quotation: {
              include: {
                rfq: true,
                vendor: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  // GET BY ID
  async getInvoiceById(id: string) {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        purchaseOrder: {
          include: {
            quotation: {
              include: {
                rfq: true,
                vendor: true,
              },
            },
          },
        },
      },
    });

    if (!invoice) {
      const err = new Error("Invoice not found");
      (err as any).statusCode = 404;
      throw err;
    }

    return invoice;
  },

  // UPDATE STATUS
  async updateInvoiceStatus(
    id: string,
    status: InvoiceStatus
  ) {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
    });

    if (!invoice) {
      const err = new Error("Invoice not found");
      (err as any).statusCode = 404;
      throw err;
    }

    return prisma.invoice.update({
      where: { id },
      data: {
        status,
        sentAt: status === "SENT" ? new Date() : undefined,
      },
    });
  },
};