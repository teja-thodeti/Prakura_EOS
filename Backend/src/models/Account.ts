import { Schema, model, Document, Types } from "mongoose";

export type AccountType = "bank" | "credit_card" | "cash" | "wallet" | "investment" | "loan" | "other";

export interface IAccount extends Document {
  user: Types.ObjectId;
  name: string;
  type: AccountType;
  institution?: string;
  accountNumberLast4?: string;
  currency: string;
  balance: number;
  creditLimit?: number;
  color?: string;
  icon?: string;
  isArchived: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema = new Schema<IAccount>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["bank", "credit_card", "cash", "wallet", "investment", "loan", "other"],
      required: true,
    },
    institution: { type: String },
    accountNumberLast4: { type: String, maxlength: 4 },
    currency: { type: String, default: "INR" },
    balance: { type: Number, required: true, default: 0 },
    creditLimit: { type: Number },
    color: { type: String },
    icon: { type: String },
    isArchived: { type: Boolean, default: false },
    notes: { type: String },
  },
  { timestamps: true }
);

AccountSchema.index({ user: 1, isArchived: 1 });

export default model<IAccount>("Account", AccountSchema);
