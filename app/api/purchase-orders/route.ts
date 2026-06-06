import { NextResponse } from "next/server";
import { POService } from "@/services/po.service";
import { getUserIdFromRequest } from "@/lib/auth";
import type { CreatePOInput } from "@/types/purchase-order.types";

export async function GET() {
  try {
    const data = await POService.getAllPO();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body: CreatePOInput = await req.json();
    const userId = getUserIdFromRequest(req);

    const po = await POService.createPOFromQuotation(
      body,
      userId
    );

    return NextResponse.json(po, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}