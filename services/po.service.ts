import { prisma } from "@/lib/prisma";
import type {
  CreatePOInput,
  POPopulatedResponse,
  PurchaseOrderResponse,
  POStatus,
} from "@/types/purchase-order.types";

function generatePONumber() {
  return `PO-${Date.now()}`;
}

export const POService = {
  async createPOFromQuotation(
    data: CreatePOInput,
    userId?: string
  ): Promise<PurchaseOrderResponse> {
    const quotation = await prisma.quotation.findUnique({
      where: { id: data.quotationId },
      include: {
        rfq: true,
        vendor: true,
        approval: true,
      },
    });

    if (!quotation) throw new Error("Quotation not found");

    if (quotation.status !== "APPROVED") {
      throw new Error("Quotation is not approved");
    }

    const existingPO = await prisma.purchaseOrder.findUnique({
      where: { quotationId: data.quotationId },
    });

    if (existingPO) {
      throw new Error("PO already exists for this quotation");
    }

    const subtotal = quotation.amount;
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    const po = await prisma.purchaseOrder.create({
      data: {
        poNumber: generatePONumber(),
        quotationId: data.quotationId,
        subtotal,
        tax,
        total,
        createdBy: userId,
        status: "GENERATED",
      },
    });

    return po;
  },

  async getAllPO(): Promise<POPopulatedResponse[]> {
    return prisma.purchaseOrder.findMany({
      include: {
        quotation: {
          include: {
            rfq: true,
            vendor: true,
          },
        },
        invoice: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async getPOById(id: string): Promise<POPopulatedResponse | null> {
    return prisma.purchaseOrder.findUnique({
      where: { id },
      include: {
        quotation: {
          include: {
            rfq: true,
            vendor: true,
          },
        },
        invoice: true,
      },
    });
  },

async updatePOStatus(id: string, status: POStatus) {
  if (!id) {
    const err = new Error("Purchase Order ID missing");
    (err as any).statusCode = 400;
    throw err;
  }

  const po = await prisma.purchaseOrder.findUnique({
    where: { id },
  });

  if (!po) {
    const err = new Error("Purchase Order not found");
    (err as any).statusCode = 404;
    throw err;
  }

  return prisma.purchaseOrder.update({
    where: { id },
    data: { status },
  });
},
};