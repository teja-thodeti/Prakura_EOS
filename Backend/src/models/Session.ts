import { Schema, model, Document, Types } from "mongoose";

export interface ISession extends Document {
  user: Types.ObjectId;
  device?: Types.ObjectId;
  userAgent?: string;
  ip?: string;
  isValid: boolean;
  expiresAt: Date;
  createdAt: Date;
}

const SessionSchema = new Schema<ISession>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    device: { type: Schema.Types.ObjectId, ref: "TrustedDevice" },
    userAgent: { type: String },
    ip: { type: String },
    isValid: { type: Boolean, default: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default model<ISession>("Session", SessionSchema);
