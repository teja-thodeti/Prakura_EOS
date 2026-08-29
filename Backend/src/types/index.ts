import { Request } from "express";
import { Types } from "mongoose";

export interface JwtAccessPayload {
  sub: string; // user id
  role: "user" | "admin";
}

export interface JwtRefreshPayload {
  sub: string;
  sessionId: string;
  jti: string; // token id, matches RefreshToken._id
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "user" | "admin";
  };
}

export type ObjectIdLike = Types.ObjectId | string;

export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: unknown[];
}
