import { prisma } from "@/lib/prisma";
import { CreateRFQDTO, UpdateRFQDTO } from "@/types/rfq.types";

export const RFQService = {
  // CREATE RFQ + ASSIGN VENDORS
  async createRFQ(data: CreateRFQDTO, userId: string) {
    return prisma.$transaction(async (tx : any) => {
      const rfq = await tx.rfq.create({
        data: {
          title: data.title,
          description: data.description,
          quantity: data.quantity,
          deadline: new Date(data.deadline),
          createdBy: userId,
          status: "OPEN",
        },
      });

      if (data.vendorIds?.length) {
        await tx.rfqVendor.createMany({
        data: data.vendorIds.map((vendorId) => ({
          rfqId: rfq.id,
          vendorId,
          status: "INVITED",
        })),
        skipDuplicates: true,
      });

       await tx.activityLog.create({
        data: {
          action: "RFQ_CREATED",
          entityType: "RFQ",
          entityId: rfq.id,
          userId,
        },
      });

      }

      return rfq;
    });
  },

  // GET ALL RFQs
  async getAllRFQs() {
    return prisma.rfq.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        rfqVendors: {
          include: {
            vendor: true,
          },
        },
        quotations: true,
      },
    });
  },

  // GET RFQ BY ID
  async getRFQById(id: string) {
    const rfq = await prisma.rfq.findUnique({
      where: { id },
      include: {
        rfqVendors: {
          include: {
            vendor: true,
          },
        },
        quotations: true,
      },
    });

    if (!rfq) throw new Error("RFQ not found");

    return rfq;
  },

  // UPDATE RFQ
    async updateRFQ(id: string, data: UpdateRFQDTO) {
    const existing = await prisma.rfq.findUnique({ where: { id } });
    if (!existing) throw new Error("RFQ not found");

    if (existing.status === "CLOSED") {
      throw new Error("Cannot update closed RFQ");
    }

    return prisma.rfq.update({
      where: { id },
      data: {
        ...data,
        deadline: data.deadline ? new Date(data.deadline) : undefined,
      },
    });
  },
  // DELETE RFQ (cleanup relations properly)
    async deleteRFQ(id: string, userId: string) {
    const existing = await prisma.rfq.findUnique({ where: { id } });
    if (!existing) throw new Error("RFQ not found");

    return prisma.$transaction(async (tx : any) => {

      await tx.rfqVendor.deleteMany({
        where: { rfqId: id },
      });

      await tx.rfq.delete({
        where: { id },
      });

      await tx.activityLog.create({
        data: {
          action: "RFQ_DELETED",
          entityType: "RFQ",
          entityId: id,
          userId,
        },
      });

      return true;
    });
  },

};