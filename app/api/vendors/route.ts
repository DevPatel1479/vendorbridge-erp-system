import { NextRequest, NextResponse } from "next/server";
import { VendorService } from "@/services/vendor.service";
import { getUser, requireRole } from "@/lib/permissions";

export async function GET(req: NextRequest) {
  try {
    const user = getUser(req);

    requireRole(user, ["ADMIN", "PROCUREMENT_OFFICER"]);

    const vendors = await VendorService.getAllVendors();

    return NextResponse.json(vendors);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 401 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUser(req);

    requireRole(user, ["ADMIN", "PROCUREMENT_OFFICER"]);

    const body = await req.json();

    const vendor = await VendorService.createVendor(body);

    return NextResponse.json(vendor, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}