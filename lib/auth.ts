import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export type AuthUser = {
  id: string;
  email: string;
  role: string;
};

export function generateToken(payload: AuthUser) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): AuthUser {
  return jwt.verify(token, JWT_SECRET) as AuthUser;
}


export function getUserIdFromRequest(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) throw new Error("No token");

  const token = authHeader.split(" ")[1];

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

  return decoded.id;
}