import { Schema, model, Document, Types } from "mongoose";

export type CategoryKind = "income" | "expense";

export interface ICategory extends Document {
  user: Types.ObjectId | null; // null = system default category
  name: string;
  kind: CategoryKind;
  icon?: string;
  color?: string;
  isSystem: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", default: null, index: true },
    name: { type: String, required: true, trim: true },
    kind: { type: String, enum: ["income", "expense"], required: true },
    icon: { type: String },
    color: { type: String },
    isSystem: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

CategorySchema.index({ user: 1, name: 1, kind: 1 }, { unique: true });

export default model<ICategory>("Category", CategorySchema);
