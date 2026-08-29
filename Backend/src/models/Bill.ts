import { Schema, model, Document, Types } from "mongoose";

export type BillFrequency = "once" | "weekly" | "monthly" | "quarterly" | "yearly";
export type BillStatus = "upcoming" | "due" | "overdue" | "paid" | "cancelled";

export interface IBill extends Document {
  user: Types.ObjectId;
  name: string;
  account?: Types.ObjectId;
  category?: Types.ObjectId;
  amount: number;
  currency: string;
  dueDate: Date;
  frequency: BillFrequency;
  autopay: boolean;
  status: BillStatus;
  reminderDaysBefore: number;
  lastPaidAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BillSchema = new Schema<IBill>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true },
    account: { type: Schema.Types.ObjectId, ref: "Account" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR" },
    dueDate: { type: Date, required: true, index: true },
    frequency: {
      type: String,
      enum: ["once", "weekly", "monthly", "quarterly", "yearly"],
      default: "monthly",
    },
    autopay: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["upcoming", "due", "overdue", "paid", "cancelled"],
      default: "upcoming",
    },
    reminderDaysBefore: { type: Number, default: 3 },
    lastPaidAt: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

BillSchema.index({ user: 1, dueDate: 1 });
BillSchema.index({ user: 1, status: 1 });

export default model<IBill>("Bill", BillSchema);
