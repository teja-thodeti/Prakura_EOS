import { Request, Response } from "express";
import crypto from "crypto";
import mongoose from "mongoose";
import { z } from "zod";
import { User, UserProfile, Session, RefreshToken, OTP, TrustedDevice } from "../models";
import { ensureSystemCategories } from "./category.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { ok, created, fail } from "../utils/response";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { generateNumericOTP, hashOTP, compareOTP, otpExpiryDate } from "../utils/otp";
import { env } from "../config/env";
import { AuthRequest } from "../types";
import bcrypt from "bcryptjs";

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

async function issueTokenPair(userId: string, role: "user" | "admin", req: Request) {
  const session = await Session.create({
    user: userId,
    userAgent: req.headers["user-agent"],
    ip: req.ip,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  const accessToken = signAccessToken({ sub: userId, role });

  // Create the refresh token DB record first to get its id (jti)
  const tempId = new mongoose.Types.ObjectId();
  const refreshTokenRaw = signRefreshToken({
    sub: userId,
    sessionId: session._id.toString(),
    jti: tempId.toString(),
  });

  await RefreshToken.create({
    _id: tempId,
    user: userId,
    session: session._id,
    tokenHash: hashToken(refreshTokenRaw),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  return { accessToken, refreshToken: refreshTokenRaw, sessionId: session._id.toString() };
}

// ---------------- Register ----------------
export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(120),
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return fail(res, "An account with this email already exists", 409);
  }

  const passwordHash = await bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS);
  const user = await User.create({ name, email, passwordHash });
  await UserProfile.create({ user: user._id });
  await ensureSystemCategories();

  const { accessToken, refreshToken } = await issueTokenPair(user._id.toString(), user.role, req);

  return created(res, {
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    accessToken,
    refreshToken,
  }, "Account created successfully");
});

// ---------------- Login ----------------
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() }).select("+passwordHash");
  if (!user || !user.isActive) {
    return fail(res, "Invalid email or password", 401);
  }

  const valid = await user.comparePassword(password);
  if (!valid) {
    return fail(res, "Invalid email or password", 401);
  }

  user.lastLoginAt = new Date();
  await user.save();

  const { accessToken, refreshToken } = await issueTokenPair(user._id.toString(), user.role, req);

  return ok(res, {
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    accessToken,
    refreshToken,
  }, "Login successful");
});

// ---------------- Refresh ----------------
export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(10),
  }),
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken: token } = req.body;

  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch {
    return fail(res, "Invalid or expired refresh token", 401);
  }

  const tokenHash = hashToken(token);
  const stored = await RefreshToken.findOne({ _id: payload.jti, tokenHash });

  if (!stored || stored.revoked || stored.expiresAt < new Date()) {
    return fail(res, "Refresh token is invalid or has been revoked", 401);
  }

  const user = await User.findById(payload.sub);
  if (!user || !user.isActive) {
    return fail(res, "User not found or inactive", 401);
  }

  // Rotate: revoke old, issue new
  stored.revoked = true;

  const tempId = new mongoose.Types.ObjectId();
  const newRefreshRaw = signRefreshToken({
    sub: user._id.toString(),
    sessionId: payload.sessionId,
    jti: tempId.toString(),
  });

  stored.replacedByTokenHash = hashToken(newRefreshRaw);
  await stored.save();

  await RefreshToken.create({
    _id: tempId,
    user: user._id,
    session: payload.sessionId,
    tokenHash: hashToken(newRefreshRaw),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  const accessToken = signAccessToken({ sub: user._id.toString(), role: user.role });

  return ok(res, { accessToken, refreshToken: newRefreshRaw }, "Token refreshed");
});

// ---------------- Logout ----------------
export const logout = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken: token } = req.body;
  if (token) {
    try {
      const payload = verifyRefreshToken(token);
      await RefreshToken.updateOne(
        { _id: payload.jti },
        { $set: { revoked: true } }
      );
      await Session.updateOne({ _id: payload.sessionId }, { $set: { isValid: false } });
    } catch {
      // token already invalid; nothing to do
    }
  }
  return ok(res, null, "Logged out successfully");
});

// ---------------- Forgot password (request OTP / reset link) ----------------
export const forgotPasswordSchema = z.object({
  body: z.object({ email: z.string().email() }),
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });

  // Always respond success to avoid leaking which emails are registered
  if (!user) {
    return ok(res, null, "If that email exists, a reset link has been sent");
  }

  const code = generateNumericOTP(6);
  const codeHash = await hashOTP(code);

  await OTP.create({
    user: user._id,
    codeHash,
    purpose: "password_reset",
    expiresAt: otpExpiryDate(),
  });

  // In production this would be emailed. For dev/testing, we return it directly.
  const devPayload = env.NODE_ENV !== "production" ? { devOtp: code } : {};

  return ok(res, devPayload, "If that email exists, a reset link has been sent");
});

// ---------------- Reset password (consume OTP) ----------------
export const resetPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
    otp: z.string().length(6),
    newPassword: z.string().min(8),
  }),
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return fail(res, "Invalid request", 400);
  }

  const otpRecord = await OTP.findOne({
    user: user._id,
    purpose: "password_reset",
    consumed: false,
  }).sort({ createdAt: -1 });

  if (!otpRecord || otpRecord.expiresAt < new Date()) {
    return fail(res, "OTP is invalid or has expired", 400);
  }

  if (otpRecord.attempts >= 5) {
    return fail(res, "Too many attempts. Please request a new OTP", 429);
  }

  const validOtp = await compareOTP(otp, otpRecord.codeHash);
  if (!validOtp) {
    otpRecord.attempts += 1;
    await otpRecord.save();
    return fail(res, "Incorrect OTP", 400);
  }

  otpRecord.consumed = true;
  await otpRecord.save();

  user.passwordHash = await bcrypt.hash(newPassword, env.BCRYPT_SALT_ROUNDS);
  await user.save();

  // Revoke all existing refresh tokens/sessions for safety
  await RefreshToken.updateMany({ user: user._id, revoked: false }, { $set: { revoked: true } });
  await Session.updateMany({ user: user._id, isValid: true }, { $set: { isValid: false } });

  return ok(res, null, "Password has been reset successfully");
});

// ---------------- Me ----------------
export const me = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user!.id);
  const profile = await UserProfile.findOne({ user: req.user!.id });
  if (!user) return fail(res, "User not found", 404);
  return ok(res, { user, profile });
});

// ---------------- Trusted devices ----------------
export const registerDevice = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { deviceId, label } = req.body;
  if (!deviceId) return fail(res, "deviceId is required", 400);

  const device = await TrustedDevice.findOneAndUpdate(
    { user: req.user!.id, deviceId },
    {
      $set: {
        label,
        userAgent: req.headers["user-agent"],
        lastIp: req.ip,
        lastSeenAt: new Date(),
        trusted: true,
      },
    },
    { upsert: true, new: true }
  );

  return ok(res, device, "Device registered");
});

export const listSessions = asyncHandler(async (req: AuthRequest, res: Response) => {
  const sessions = await Session.find({ user: req.user!.id, isValid: true }).sort({ createdAt: -1 });
  return ok(res, sessions);
});

export const revokeSession = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { sessionId } = req.params;
  await Session.updateOne({ _id: sessionId, user: req.user!.id }, { $set: { isValid: false } });
  await RefreshToken.updateMany({ session: sessionId, user: req.user!.id }, { $set: { revoked: true } });
  return ok(res, null, "Session revoked");
});
