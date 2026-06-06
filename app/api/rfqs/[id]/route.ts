import { NextResponse } from "next/server";
import { RFQService } from "@/services/rfq.service";
import { getUserIdFromRequest } from "@/lib/auth";

// GET BY ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const rfq = await RFQService.getRFQById(id);

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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
     const { id } = await params; 
    const body = await req.json();

    const updated = await RFQService.updateRFQ(id, body);

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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = getUserIdFromRequest(req);

    const { id } = await params; // ✅ FIX HERE

    if (!id) {
      return NextResponse.json(
        { error: "Missing RFQ id" },
        { status: 400 }
      );
    }

    await RFQService.deleteRFQ(id, userId);

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