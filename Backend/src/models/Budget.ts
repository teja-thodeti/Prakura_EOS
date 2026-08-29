import { Schema, model, Document, Types } from "mongoose";

export type BudgetPeriod = "weekly" | "monthly" | "yearly" | "custom";

export interface IBudget extends Document {
  user: Types.ObjectId;
  name: string;
  category?: Types.ObjectId;
  amount: number;
  currency: string;
  period: BudgetPeriod;
  startDate: Date;
  endDate?: Date;
  rollover: boolean;
  alertThresholdPercent: number;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BudgetSchema = new Schema<IBudget>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR" },
    period: { type: String, enum: ["weekly", "monthly", "yearly", "custom"], default: "monthly" },
    startDate: { type: Date, required: true, default: Date.now },
    endDate: { type: Date },
    rollover: { type: Boolean, default: false },
    alertThresholdPercent: { type: Number, default: 80, min: 0, max: 100 },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

BudgetSchema.index({ user: 1, isArchived: 1 });

export default model<IBudget>("Budget", BudgetSchema);
