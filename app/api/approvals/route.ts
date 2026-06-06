import { NextResponse } from "next/server";
import { ApprovalService } from "@/services/approval.service";

// GET ALL
export async function GET() {
  try {
    const data = await ApprovalService.getAllApprovals();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// CREATE APPROVAL (trigger manually or workflow)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const approval = await ApprovalService.createApproval(body);

    return NextResponse.json(approval, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}