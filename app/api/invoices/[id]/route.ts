import { NextResponse } from "next/server";
import { InvoiceService } from "@/services/invoice.service";
import type { InvoiceStatus } from "@/types/invoice.types";

type Context = {
  params: Promise<{ id: string }>;
};

// GET
export async function GET(req: Request, { params }: Context) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Invoice ID is required" },
        { status: 400 }
      );
    }

    const data = await InvoiceService.getInvoiceById(id);

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch invoice" },
      { status: err.statusCode || 500 }
    );
  }
}

// PUT
export async function PUT(req: Request, { params }: Context) {
  try {
    const { id } = await params;

    console.log("Invoice ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "Invoice ID is required" },
        { status: 400 }
      );
    }

    const body: { status: InvoiceStatus } = await req.json();

    if (!body?.status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    const updated = await InvoiceService.updateInvoiceStatus(
      id,
      body.status
    );

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message || "Failed to update invoice",
      },
      { status: err.statusCode || 500 }
    );
  }
}