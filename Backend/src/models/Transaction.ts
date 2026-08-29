import { Schema, model, Document, Types } from "mongoose";

export type TransactionType = "income" | "expense" | "transfer";
export type TransactionStatus = "cleared" | "pending" | "void";

export interface ITransaction extends Document {
  user: Types.ObjectId;
  account: Types.ObjectId;
  transferToAccount?: Types.ObjectId;
  category?: Types.ObjectId;
  subcategory?: Types.ObjectId;
  type: TransactionType;
  amount: number;
  currency: string;
  description?: string;
  merchant?: string;
  date: Date;
  status: TransactionStatus;
  tags: string[];
  attachmentUrl?: string;
  isRecurring: boolean;
  recurringRule?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    account: { type: Schema.Types.ObjectId, ref: "Account", required: true, index: true },
    transferToAccount: { type: Schema.Types.ObjectId, ref: "Account" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    subcategory: { type: Schema.Types.ObjectId, ref: "Subcategory" },
    type: { type: String, enum: ["income", "expense", "transfer"], required: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR" },
    description: { type: String, trim: true },
    merchant: { type: String, trim: true },
    date: { type: Date, required: true, default: Date.now, index: true },
    status: { type: String, enum: ["cleared", "pending", "void"], default: "cleared" },
    tags: { type: [String], default: [] },
    attachmentUrl: { type: String },
    isRecurring: { type: Boolean, default: false },
    recurringRule: { type: String },
  },
  { timestamps: true }
);

TransactionSchema.index({ user: 1, date: -1 });
TransactionSchema.index({ user: 1, category: 1 });
TransactionSchema.index({ user: 1, account: 1 });

export default model<ITransaction>("Transaction", TransactionSchema);
