import { Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { fail } from "../utils/response";
import { AuthRequest } from "../types";
import { User } from "../models";

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return fail(res, "Authentication required", 401);
    }
    const token = header.substring("Bearer ".length);
    const payload = verifyAccessToken(token);

    const user = await User.findById(payload.sub).select("_id role isActive");
    if (!user || !user.isActive) {
      return fail(res, "User not found or inactive", 401);
    }

    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch (err) {
    return fail(res, "Invalid or expired access token", 401);
  }
}

export function requireRole(...roles: Array<"user" | "admin">) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return fail(res, "Insufficient permissions", 403);
    }
    next();
  };
}
