import { Schema, model, Document, Types } from "mongoose";

export type BillingCadence = "monthly" | "yearly";

export interface ISubscriptionPlan extends Document {
  _id: Types.ObjectId;
  key: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  cadence: BillingCadence;
  features: string[];
  isActive: boolean;
  isHighlighted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionPlanSchema = new Schema<ISubscriptionPlan>(
  {
    key: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR" },
    cadence: { type: String, enum: ["monthly", "yearly"], default: "monthly" },
    features: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    isHighlighted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<ISubscriptionPlan>("SubscriptionPlan", SubscriptionPlanSchema);
