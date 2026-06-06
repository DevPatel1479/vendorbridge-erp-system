import { NextResponse } from "next/server";
import { QuotationService } from "@/services/quotation.service";

// GET QUOTATIONS BY RFQ (FOR COMPARISON)
export async function GET(
  req: Request,
  { params }: { params: Promise<{ rfqId: string }> }
) {
  try {
    const { rfqId } = await params;

    if (!rfqId) {
      return NextResponse.json(
        { error: "rfqId is required" },
        { status: 400 }
      );
    }

    const quotations = await QuotationService.getQuotationsByRFQ(rfqId);

    return NextResponse.json(quotations);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
