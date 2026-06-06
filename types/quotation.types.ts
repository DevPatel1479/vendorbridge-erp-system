export interface CreateQuotationDTO {
  rfqId: string;
  vendorId: string;
  amount: number;
  deliveryDays: number;
  notes?: string;
}

export interface UpdateQuotationDTO {
  amount?: number;
  deliveryDays?: number;
  notes?: string;
  status?: "SUBMITTED" | "APPROVED" | "REJECTED";
}