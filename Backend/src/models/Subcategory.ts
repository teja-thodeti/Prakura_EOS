import { Schema, model, Document, Types } from "mongoose";

export interface ISubcategory extends Document {
  user: Types.ObjectId | null;
  category: Types.ObjectId;
  name: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubcategorySchema = new Schema<ISubcategory>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", default: null, index: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true, index: true },
    name: { type: String, required: true, trim: true },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

SubcategorySchema.index({ category: 1, name: 1 }, { unique: true });

export default model<ISubcategory>("Subcategory", SubcategorySchema);
