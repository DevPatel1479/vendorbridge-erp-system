export type POStatus =
  | "GENERATED"
  | "SENT"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELLED";

export interface CreatePOInput {
  quotationId: string;
}

export interface PurchaseOrderResponse {
  id: string;
  poNumber: string;
  quotationId: string;

  subtotal: number;
  tax: number;
  total: number;

  status: POStatus;

  createdBy?: string | null;
  approvedBy?: string | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface POPopulatedResponse {
  id: string;
  poNumber: string;

  subtotal: number;
  tax: number;
  total: number;

  status: POStatus;

  quotation: {
    id: string;
    amount: number;
    deliveryDays: number;
    status: string;

    rfq: {
      id: string;
      title: string;
      quantity: number;
      deadline: Date;
    };

    vendor: {
      id: string;
      companyName: string;
      email: string;
    };
  };

  invoice?: {
    id: string;
    invoiceNumber: string;
    totalAmount: number;
    status: string;
  } | null;

  createdAt: Date;
}