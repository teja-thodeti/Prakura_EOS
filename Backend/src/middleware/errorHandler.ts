import { NextFunction, Request, Response } from "express";
import { fail } from "../utils/response";

export function notFoundHandler(req: Request, res: Response) {
  return fail(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error("[error]", err);

  if (err?.name === "ValidationError") {
    const errors = Object.values(err.errors || {}).map((e: any) => e.message);
    return fail(res, "Validation failed", 422, errors);
  }

  if (err?.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    return fail(res, `Duplicate value for field: ${field}`, 409);
  }

  if (err?.name === "CastError") {
    return fail(res, `Invalid identifier: ${err.value}`, 400);
  }

  if (err?.name === "ZodError") {
    return fail(res, "Validation failed", 422, err.errors);
  }

  const status = err?.status || err?.statusCode || 500;
  const message = err?.message || "Internal server error";
  return fail(res, message, status);
}
