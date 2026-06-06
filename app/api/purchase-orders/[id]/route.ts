import { NextResponse } from "next/server";
import { POService } from "@/services/po.service";
import type { POStatus } from "@/types/purchase-order.types";

type Context = {
  params: {
    id: string;
  };
};

// GET
export async function GET(req: Request, context: Context) {
  try {
    const id = context.params?.id;

    if (!id) {
      return NextResponse.json(
        { error: "Purchase Order ID is required" },
        { status: 400 }
      );
    }

    const po = await POService.getPOById(id);
    return NextResponse.json(po);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 404 }
    );
  }
}

// PUT
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
     const { id } = await params;

    console.log("Updating PO with ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "Purchase Order ID is required" },
        { status: 400 }
      );
    }

    const body: { status: POStatus } = await req.json();

    if (!body?.status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    const updated = await POService.updatePOStatus(id, body.status);

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message || "Something went wrong",
      },
      {
        status: err.statusCode || 500,
      }
    );
  }
}