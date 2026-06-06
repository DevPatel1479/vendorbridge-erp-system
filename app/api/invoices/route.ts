import { NextResponse } from "next/server";
import { InvoiceService } from "@/services/invoice.service";

export async function GET() {
  try {
    const data = await InvoiceService.getAllInvoices();
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
    const body = await req.json();

    const invoice = await InvoiceService.createInvoice(body);

    return NextResponse.json(invoice, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message || "Failed to create invoice",
      },
      {
        status: err.statusCode || 500,
      }
    );
  }
}