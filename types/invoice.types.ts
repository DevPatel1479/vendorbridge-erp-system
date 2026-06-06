export enum InvoiceStatus {
  GENERATED = "GENERATED",
  SENT = "SENT",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
}

export interface CreateInvoiceInput {
  purchaseOrderId: string;
}

export interface InvoiceResponse {
  id: string;
  invoiceNumber: string;
  purchaseOrderId: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  status: InvoiceStatus;
  pdfUrl?: string | null;
  sentAt?: Date | null;
  createdAt: Date;
}