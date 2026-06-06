import { NextResponse } from "next/server";
import { POService } from "@/services/po.service";
import type { POStatus } from "@/types/purchase-order.types";

type Context = {
  params: {
    id: string;
  };
};

// GET
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Purchase Order ID is required" },
      { status: 400 }
    );
  }

  const po = await POService.getPOById(id);
  return NextResponse.json(po);
}


export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  console.log("PO ID:", id);

  if (!id) {
    return NextResponse.json(
      { error: "Purchase Order ID is required" },
      { status: 400 }
    );
  }

  const body = await req.json();

  if (!body?.status) {
    return NextResponse.json(
      { error: "Status is required" },
      { status: 400 }
    );
  }

  const updated = await POService.updatePOStatus(id, body.status);

  return NextResponse.json({
    message: "Updated successfully",
    data: updated,
  });
}