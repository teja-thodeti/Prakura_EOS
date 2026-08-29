import { Schema, model, Document, Types } from "mongoose";

export type PaymentStatus = "pending" | "succeeded" | "failed" | "refunded";
export type PaymentMethod = "card" | "upi" | "netbanking" | "wallet" | "other";

export interface IPayment extends Document {
  user: Types.ObjectId;
  subscription?: Types.ObjectId;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  providerReference?: string;
  failureReason?: string;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    subscription: { type: Schema.Types.ObjectId, ref: "Subscription" },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR" },
    method: { type: String, enum: ["card", "upi", "netbanking", "wallet", "other"], default: "card" },
    status: { type: String, enum: ["pending", "succeeded", "failed", "refunded"], default: "pending" },
    providerReference: { type: String },
    failureReason: { type: String },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

PaymentSchema.index({ user: 1, createdAt: -1 });

export default model<IPayment>("Payment", PaymentSchema);
