import { NextResponse } from "next/server";
import { QuotationService } from "@/services/quotation.service";

// CREATE
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // TEMP: replace with auth later
    const vendorId = body.vendorId;

    const quotation = await QuotationService.createQuotation(body, vendorId);

    return NextResponse.json(quotation, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET ALL
export async function GET() {
  try {
    const data = await QuotationService.getAllQuotations();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}