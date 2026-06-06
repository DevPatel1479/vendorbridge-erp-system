import { NextRequest, NextResponse } from "next/server";
import { VendorService } from "@/services/vendor.service";
import { getUser, requireRole } from "@/lib/permissions";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const vendor = await VendorService.getVendorById(id);

  return NextResponse.json(vendor);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = getUser(req);
    requireRole(user, ["ADMIN", "PROCUREMENT_OFFICER"]);

    const body = await req.json();

    const updated = await VendorService.updateVendor(id, body);

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = getUser(req);
    requireRole(user, ["ADMIN"]);

    await VendorService.deleteVendor(id);

    return NextResponse.json({
      message: "Vendor deleted successfully",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}