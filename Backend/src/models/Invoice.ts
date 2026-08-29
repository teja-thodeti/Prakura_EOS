import { Schema, model, Document, Types } from "mongoose";

export type InvoiceStatus = "draft" | "issued" | "paid" | "void";

export interface IInvoiceLineItem {
  description: string;
  quantity: number;
  unitAmount: number;
  amount: number;
}

export interface IInvoice extends Document {
  user: Types.ObjectId;
  subscription?: Types.ObjectId;
  payment?: Types.ObjectId;
  invoiceNumber: string;
  status: InvoiceStatus;
  lineItems: IInvoiceLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  issuedAt?: Date;
  dueAt?: Date;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const InvoiceLineItemSchema = new Schema<IInvoiceLineItem>(
  {
    description: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    unitAmount: { type: Number, required: true },
    amount: { type: Number, required: true },
  },
  { _id: false }
);

const InvoiceSchema = new Schema<IInvoice>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    subscription: { type: Schema.Types.ObjectId, ref: "Subscription" },
    payment: { type: Schema.Types.ObjectId, ref: "Payment" },
    invoiceNumber: { type: String, required: true, unique: true },
    status: { type: String, enum: ["draft", "issued", "paid", "void"], default: "issued" },
    lineItems: { type: [InvoiceLineItemSchema], default: [] },
    subtotal: { type: Number, required: true, default: 0 },
    tax: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 },
    currency: { type: String, default: "INR" },
    issuedAt: { type: Date, default: Date.now },
    dueAt: { type: Date },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

InvoiceSchema.index({ user: 1, createdAt: -1 });

export default model<IInvoice>("Invoice", InvoiceSchema);
