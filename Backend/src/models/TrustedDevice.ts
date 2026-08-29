import { Schema, model, Document, Types } from "mongoose";

export interface ITrustedDevice extends Document {
  user: Types.ObjectId;
  deviceId: string;
  label?: string;
  userAgent?: string;
  lastIp?: string;
  lastSeenAt: Date;
  trusted: boolean;
  createdAt: Date;
}

const TrustedDeviceSchema = new Schema<ITrustedDevice>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    deviceId: { type: String, required: true },
    label: { type: String },
    userAgent: { type: String },
    lastIp: { type: String },
    lastSeenAt: { type: Date, default: Date.now },
    trusted: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

TrustedDeviceSchema.index({ user: 1, deviceId: 1 }, { unique: true });

export default model<ITrustedDevice>("TrustedDevice", TrustedDeviceSchema);
