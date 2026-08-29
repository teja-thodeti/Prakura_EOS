import { Schema, model, Document, Types } from "mongoose";

export type SubscriptionStatus = "trialing" | "active" | "past_due" | "cancelled" | "expired";

export interface ISubscription extends Document {
  user: Types.ObjectId;
  plan: Types.ObjectId;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  trialEndsAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    plan: { type: Schema.Types.ObjectId, ref: "SubscriptionPlan", required: true },
    status: {
      type: String,
      enum: ["trialing", "active", "past_due", "cancelled", "expired"],
      default: "trialing",
    },
    currentPeriodStart: { type: Date, required: true, default: Date.now },
    currentPeriodEnd: { type: Date, required: true },
    cancelAtPeriodEnd: { type: Boolean, default: false },
    trialEndsAt: { type: Date },
  },
  { timestamps: true }
);

SubscriptionSchema.index({ user: 1, status: 1 });

export default model<ISubscription>("Subscription", SubscriptionSchema);
