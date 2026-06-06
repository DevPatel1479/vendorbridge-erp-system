import { prisma } from "@/lib/prisma";
import { CreateQuotationDTO, UpdateQuotationDTO } from "@/types/quotation.types";

export const QuotationService = {
  
  // CREATE QUOTATION (VENDOR SIDE)
  async createQuotation(data: CreateQuotationDTO, vendorId: string) {
    return prisma.quotation.create({
      data: {
        rfqId: data.rfqId,
        vendorId,
        amount: data.amount,
        deliveryDays: data.deliveryDays,
        notes: data.notes,
        status: "SUBMITTED",
      },
    });
  },

  // GET ALL QUOTATIONS
  async getAllQuotations() {
    return prisma.quotation.findMany({
      include: {
        rfq: true,
        vendor: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  // GET BY RFQ (IMPORTANT FOR COMPARISON SCREEN)
  async getQuotationsByRFQ(rfqId: string) {
    return prisma.quotation.findMany({
      where: { rfqId },
      include: {
        vendor: true,
      },
      orderBy: { amount: "asc" }, // 👈 for comparison
    });
  },

  // UPDATE QUOTATION (vendor edit allowed before approval)
  async updateQuotation(id: string, data: UpdateQuotationDTO) {
    const existing = await prisma.quotation.findUnique({ where: { id } });
    if (!existing) throw new Error("Quotation not found");

    if (existing.status === "APPROVED") {
      throw new Error("Cannot update approved quotation");
    }

    return prisma.quotation.update({
      where: { id },
      data,
    });
  },

  // DELETE QUOTATION
  async deleteQuotation(id: string) {
    return prisma.quotation.delete({
      where: { id },
    });
  },
};