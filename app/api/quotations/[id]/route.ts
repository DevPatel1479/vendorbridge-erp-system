import { NextResponse } from "next/server";
import { QuotationService } from "@/services/quotation.service";

// UPDATE
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await QuotationService.updateQuotation(id, body);

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await QuotationService.deleteQuotation(id);

    return NextResponse.json({ message: "Deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}