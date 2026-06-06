export interface CreateApprovalDTO {
  quotationId: string;
  approverId: string;
  remarks?: string;
}

export interface UpdateApprovalDTO {
  status: "APPROVED" | "REJECTED";
  remarks?: string;
}