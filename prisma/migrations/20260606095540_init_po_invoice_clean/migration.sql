/*
  Warnings:

  - You are about to drop the `RFQ` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RFQVendor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subtotal` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RFQVendorStatus" AS ENUM ('INVITED', 'ACCEPTED', 'DECLINED', 'RESPONDED');

-- CreateEnum
CREATE TYPE "POStatus" AS ENUM ('GENERATED', 'SENT', 'ACCEPTED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('GENERATED', 'SENT', 'PAID', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "Quotation" DROP CONSTRAINT "Quotation_rfqId_fkey";

-- DropForeignKey
ALTER TABLE "RFQVendor" DROP CONSTRAINT "RFQVendor_rfqId_fkey";

-- DropForeignKey
ALTER TABLE "RFQVendor" DROP CONSTRAINT "RFQVendor_vendorId_fkey";

-- AlterTable
ALTER TABLE "ActivityLog" ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "pdfUrl" TEXT,
ADD COLUMN     "sentAt" TIMESTAMP(3),
ADD COLUMN     "status" "InvoiceStatus" NOT NULL DEFAULT 'GENERATED',
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PurchaseOrder" ADD COLUMN     "approvedBy" TEXT,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "status" "POStatus" NOT NULL DEFAULT 'GENERATED',
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "RFQ";

-- DropTable
DROP TABLE "RFQVendor";

-- CreateTable
CREATE TABLE "Rfq" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "quantity" INTEGER NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "status" "RFQStatus" NOT NULL DEFAULT 'OPEN',
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "closedAt" TIMESTAMP(3),

    CONSTRAINT "Rfq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RfqVendor" (
    "id" TEXT NOT NULL,
    "rfqId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "status" "RFQVendorStatus" NOT NULL DEFAULT 'INVITED',

    CONSTRAINT "RfqVendor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RfqVendor_rfqId_vendorId_key" ON "RfqVendor"("rfqId", "vendorId");

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_rfqId_fkey" FOREIGN KEY ("rfqId") REFERENCES "Rfq"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RfqVendor" ADD CONSTRAINT "RfqVendor_rfqId_fkey" FOREIGN KEY ("rfqId") REFERENCES "Rfq"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RfqVendor" ADD CONSTRAINT "RfqVendor_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
