import { NextResponse } from "next/server";
import { RFQService } from "@/services/rfq.service";

// CREATE RFQ
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const rfq = await RFQService.createRFQ(body, "dummy-user-id");

    return NextResponse.json(rfq, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

// GET ALL RFQs
export async function GET() {
  try {
    const rfqs = await RFQService.getAllRFQs();
    return NextResponse.json(rfqs);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}