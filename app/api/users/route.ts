import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/users?role=MANAGER
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const role = searchParams.get("role");

    const users = await prisma.user.findMany({
      where: role
        ? {
            role: role as any, // ADMIN | MANAGER | PROCUREMENT_OFFICER | VENDOR
          }
        : undefined,

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch users" },
      { status: 500 }
    );
  }
}