import { NextResponse } from "next/server";
import { ReportsService } from "@/services/reports.service";

export async function GET() {
  try {
    const data = await ReportsService.getOverview();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch overview" },
      { status: 500 }
    );
  }
}