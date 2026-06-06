import { NextResponse } from "next/server";
import { POService } from "@/services/po.service";
import { getUser } from "@/lib/permissions";
import type { CreatePOInput } from "@/types/purchase-order.types";

export async function GET(req: Request) {
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
    
    // Try to get user, but don't fail PO creation if auth token is missing
    let userId: string | undefined;
    try {
      const user = getUser(req as any);
      userId = user.id;
    } catch {
      userId = undefined;
    }

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