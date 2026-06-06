export interface CreateRFQDTO {
  title: string;
  description?: string;
  quantity: number;
  deadline: string;
  vendorIds: string[];
}

export interface UpdateRFQDTO {
  title?: string;
  description?: string;
  quantity?: number;
  deadline?: string;
  status?: "DRAFT" | "OPEN" | "CLOSED" | "APPROVED";
}