import { Schema, model, Document, Types } from "mongoose";

export interface IRefreshToken extends Document {
  user: Types.ObjectId;
  tokenHash: string;
  session?: Types.ObjectId;
  revoked: boolean;
  replacedByTokenHash?: string;
  expiresAt: Date;
  createdAt: Date;
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    tokenHash: { type: String, required: true, unique: true, index: true },
    session: { type: Schema.Types.ObjectId, ref: "Session" },
    revoked: { type: Boolean, default: false },
    replacedByTokenHash: { type: String },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default model<IRefreshToken>("RefreshToken", RefreshTokenSchema);
