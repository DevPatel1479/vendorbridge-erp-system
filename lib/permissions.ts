import { NextRequest } from "next/server";
import { verifyToken, AuthUser } from "./auth";

export function getUser(req: NextRequest): AuthUser {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

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