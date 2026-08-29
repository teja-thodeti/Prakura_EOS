import crypto from "crypto";
import bcrypt from "bcryptjs";
import { env } from "../config/env";

export function generateNumericOTP(length = 6): string {
  const digits = "0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += digits[crypto.randomInt(0, digits.length)];
  }
  return code;
}

export async function hashOTP(code: string): Promise<string> {
  return bcrypt.hash(code, env.BCRYPT_SALT_ROUNDS);
}

export async function compareOTP(candidate: string, hash: string): Promise<boolean> {
  return bcrypt.compare(candidate, hash);
}

export function otpExpiryDate(): Date {
  return new Date(Date.now() + env.OTP_EXPIRES_MIN * 60 * 1000);
}
