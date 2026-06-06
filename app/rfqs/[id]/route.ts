import { NextResponse } from "next/server";
import { RFQService } from "@/services/rfq.service";

// GET BY ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const rfq = await RFQService.getRFQById(params.id);
    return NextResponse.json(rfq);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 404 }
    );
  }
}

// UPDATE RFQ
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const updated = await RFQService.updateRFQ(params.id, body);

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

// DELETE RFQ
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await RFQService.deleteRFQ(params.id);

    return NextResponse.json({
      message: "RFQ deleted successfully",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}