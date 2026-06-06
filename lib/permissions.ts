import { NextRequest } from "next/server";
import { verifyToken, AuthUser } from "./auth";

export function getUser(req: NextRequest): AuthUser {
  let token = req.cookies.get("token")?.value;

  if (!token) {
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.replace("Bearer ", "");
    }
  }

  if (!token) {
    throw new Error("Unauthorized");
  }

  return verifyToken(token);
}

export function requireRole(user: AuthUser, roles: string[]) {
  if (!roles.includes(user.role)) {
    throw new Error("Forbidden");
  }
}