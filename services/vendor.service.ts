import { prisma } from "@/lib/prisma";
import { CreateVendorDTO, UpdateVendorDTO } from "@/types/vendor.types";

export const VendorService = {
  async createVendor(data: CreateVendorDTO, userId?: string) {
    
    return prisma.vendor.create({

      data: {
        ...data,
         userId,
      },
    });
  },

  async getAllVendors() {
    return prisma.vendor.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        quotations: true,
        rfqVendors: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
      },
    });
  },

  async getVendorById(id: string) {
    const vendor = await prisma.vendor.findUnique({
      where: { id },
      include: {
        quotations: true,
        rfqVendors: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
      },
    });

    if (!vendor) {
      const error: any = new Error("Vendor not found");
      error.status = 404;
      throw error;
    }

    return vendor;
  },

  // 🔥 FIXED
  async updateVendor(id: string, data: UpdateVendorDTO) {
    const existing = await prisma.vendor.findUnique({
      where: { id },
    });

    if (!existing) {
      const error: any = new Error("Vendor not found");
      error.status = 404;
      throw error;
    }

    return prisma.vendor.update({
      where: { id },
      data,
    });
  },

  // 🔥 FIXED
  async deleteVendor(id: string) {
    const existing = await prisma.vendor.findUnique({
      where: { id },
    });

    if (!existing) {
      const error: any = new Error("Vendor not found");
      error.status = 404;
      throw error;
    }

    return prisma.vendor.delete({
      where: { id },
    });
  },
};