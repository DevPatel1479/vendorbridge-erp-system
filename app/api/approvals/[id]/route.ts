import { NextResponse } from "next/server";
import { ApprovalService } from "@/services/approval.service";

// GET BY ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Approval ID required" },
      { status: 400 }
    );
  }

  const data = await ApprovalService.getApprovalById(id);
  return NextResponse.json(data);
}

// UPDATE APPROVAL
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Approval ID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const result = await ApprovalService.updateApproval(
      id,
      body.status,
      body.remarks
    );

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: err.statusCode || 500 }
    );
  }
}