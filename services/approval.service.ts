import { prisma } from "@/lib/prisma";

export const ApprovalService = {

  // CREATE APPROVAL REQUEST (auto triggered when PO workflow starts)
  async createApproval(data: { quotationId: string; approverId: string, remarks?: string }) {
     const existing = await prisma.approval.findUnique({
    where: { quotationId: data.quotationId },
  });

  if (existing) {
    throw new Error("Approval already exists for this quotation");
  }
    return prisma.approval.create({
      data: {
        quotationId: data.quotationId,
        approverId: data.approverId,
        remarks: data.remarks,
        status: "PENDING",
      },
    });
  },

  // GET ALL APPROVALS
  async getAllApprovals() {
  return prisma.approval.findMany({
    include: {
      quotation: {
        include: {
          rfq: true,
          vendor: true,
        },
      },
      approver: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
},
  // GET SINGLE APPROVAL
  async getApprovalById(id: string) {
  return prisma.approval.findUnique({
    where: { id },
    include: {
      quotation: true,
      approver: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
},

  // APPROVE / REJECT
  async updateApproval(id: string, status: "APPROVED" | "REJECTED", remarks?: string) {
    const approval = await prisma.approval.findUnique({ where: { id } });

    if (!approval) throw new Error("Approval not found");

if (approval.status !== "PENDING") {
  const error = new Error("Approval already processed");
  (error as any).statusCode = 409; // CONFLICT
  throw error;
}

    const updated = await prisma.approval.update({
      where: { id },
      data: {
        status,
        remarks,
      },
    });

    // 🔥 OPTIONAL: cascade update quotation status
    await prisma.quotation.update({
      where: { id: approval.quotationId },
      data: {
        status: status === "APPROVED" ? "APPROVED" : "REJECTED",
      },
    });

    return updated;
  },
};