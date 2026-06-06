export type CreateVendorDTO = {
  companyName: string;
  gstNumber?: string;
  email: string;
  phone?: string;
  address?: string;
  category?: string;
};

export type UpdateVendorDTO = Partial<CreateVendorDTO> & {
  status?: "ACTIVE" | "INACTIVE";
};