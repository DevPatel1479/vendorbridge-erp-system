import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore =
      await cookies();

    const token =
      cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          authenticated: false,
        },
        {
          status: 401,
        }
      );
    }

    const user = verifyToken(token);

    return NextResponse.json({
      authenticated: true,
      user,
    });
  } catch {
    return NextResponse.json(
      {
        authenticated: false,
      },
      {
        status: 401,
      }
    );
  }
}