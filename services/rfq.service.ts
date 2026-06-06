import { prisma } from "@/lib/prisma";
import { CreateRFQDTO, UpdateRFQDTO } from "@/types/rfq.types";

export const RFQService = {
  async createRFQ(data: CreateRFQDTO, userId: string) {
    
    const rfq = await prisma.$transaction(async (tx : any) => {
  const createdRfq = await tx.rfq.create({
    data: {
      title: data.title,
      description: data.description,
      quantity: data.quantity,
      deadline: new Date(data.deadline),
    },
  });

  await tx.rfqVendor.createMany({
    data: data.vendorIds.map((vendorId) => ({
      rfqId: createdRfq.id,
      vendorId,
    })),
  });

  return createdRfq;
});

    return rfq;
  },

  async getAllRFQs() {
    return prisma.rfq.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        vendors: {
          include: {
            vendor: true,
          },
        },
        quotations: true,
      },
    });
  },

  async getRFQById(id: string) {
    const rfq = await prisma.rfq.findUnique({
      where: { id },
      include: {
        vendors: {
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

  async updateRFQ(id: string, data: UpdateRFQDTO) {
    const existing = await prisma.rfq.findUnique({ where: { id } });

    if (!existing) throw new Error("RFQ not found");

    return prisma.rfq.update({
      where: { id },
      data: {
        ...data,
        deadline: data.deadline ? new Date(data.deadline) : undefined,
      },
    });
  },

  async deleteRFQ(id: string) {
    const existing = await prisma.rfq.findUnique({ where: { id } });

    if (!existing) throw new Error("RFQ not found");

    await prisma.rfqVendor.deleteMany({
      where: { rfqId: id },
    });

    return prisma.rfq.delete({
      where: { id },
    });
  },
};