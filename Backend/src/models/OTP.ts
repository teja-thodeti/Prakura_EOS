import { Schema, model, Document, Types } from "mongoose";

export type OTPPurpose = "password_reset" | "email_verification" | "login_2fa";

export interface IOTP extends Document {
  user: Types.ObjectId;
  codeHash: string;
  purpose: OTPPurpose;
  consumed: boolean;
  attempts: number;
  expiresAt: Date;
  createdAt: Date;
}

const OTPSchema = new Schema<IOTP>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    codeHash: { type: String, required: true },
    purpose: {
      type: String,
      enum: ["password_reset", "email_verification", "login_2fa"],
      required: true,
    },
    consumed: { type: Boolean, default: false },
    attempts: { type: Number, default: 0 },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

OTPSchema.index({ user: 1, purpose: 1 });

export default model<IOTP>("OTP", OTPSchema);
