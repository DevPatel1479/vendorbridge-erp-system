import { NextRequest, NextResponse } from "next/server";
import { RFQService } from "@/services/rfq.service";
import { getUser } from "@/lib/permissions";

// CREATE RFQ
export async function POST(req: NextRequest) {
  try {
    const user = getUser(req);
    const body = await req.json();

    const rfq = await RFQService.createRFQ(body, user.id);

    return NextResponse.json(rfq, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

// GET ALL RFQs
export async function GET(req: NextRequest) {
  try {
    getUser(req); // ensure authenticated
    const rfqs = await RFQService.getAllRFQs();
    return NextResponse.json(rfqs);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 401 }
    );
  }
}