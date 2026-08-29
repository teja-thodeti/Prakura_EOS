import { Schema, model, Document, Types } from "mongoose";

export interface IUserProfile extends Document {
  user: Types.ObjectId;
  phone?: string;
  dateOfBirth?: Date;
  currency: string;
  locale: string;
  timezone: string;
  avatarUrl?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  occupation?: string;
  monthlyIncome?: number;
  onboarding: {
    completed: boolean;
    step: number;
    goals: string[];
    plan?: string;
  };
  notificationPreferences: {
    email: boolean;
    push: boolean;
    billReminders: boolean;
    budgetAlerts: boolean;
    weeklySummary: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema = new Schema<IUserProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    phone: { type: String, trim: true },
    dateOfBirth: { type: Date },
    currency: { type: String, default: "INR" },
    locale: { type: String, default: "en-IN" },
    timezone: { type: String, default: "Asia/Kolkata" },
    avatarUrl: { type: String },
    address: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    occupation: { type: String },
    monthlyIncome: { type: Number, min: 0 },
    onboarding: {
      completed: { type: Boolean, default: false },
      step: { type: Number, default: 0 },
      goals: { type: [String], default: [] },
      plan: { type: String },
    },
    notificationPreferences: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      billReminders: { type: Boolean, default: true },
      budgetAlerts: { type: Boolean, default: true },
      weeklySummary: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export default model<IUserProfile>("UserProfile", UserProfileSchema);
