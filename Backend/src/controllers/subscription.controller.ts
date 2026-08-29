import { Response } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { SubscriptionPlan, Subscription, Payment, Invoice } from "../models";
import { asyncHandler } from "../utils/asyncHandler";
import { ok, created, fail } from "../utils/response";
import { AuthRequest } from "../types";

// ========== Validation Schemas ==========
export const subscribeSchema = z.object({
  body: z.object({
    planId: z.string(),
    method: z.string().optional(),
  }),
});

export const cancelSubscriptionSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const getInvoiceSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const listPlans = asyncHandler(async (req: AuthRequest, res: Response) => {
  const plans = await SubscriptionPlan.find({ isActive: true }).sort({ price: 1 });
  return ok(res, plans);
});

export const getCurrentSubscription = asyncHandler(async (req: AuthRequest, res: Response) => {
  const subscription = await Subscription.findOne({ user: req.user!.id })
    .sort({ createdAt: -1 })
    .populate("plan");
  return ok(res, subscription);
});

function addCadence(date: Date, cadence: string): Date {
  const next = new Date(date);
  if (cadence === "yearly") next.setFullYear(next.getFullYear() + 1);
  else next.setMonth(next.getMonth() + 1);
  return next;
}

export const subscribeToPlan = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { planId, method } = req.body;

  const plan = await SubscriptionPlan.findById(planId);
  if (!plan || !plan.isActive) return fail(res, "Plan not found", 404);

  const session = await mongoose.startSession();
  try {
    let result;
    await session.withTransaction(async () => {
      const now = new Date();
      const periodEnd = addCadence(now, plan.cadence);

      // Cancel any prior active subscription
      await Subscription.updateMany(
        { user: req.user!.id, status: { $in: ["active", "trialing", "past_due"] } },
        { $set: { status: "cancelled", cancelAtPeriodEnd: true } },
        { session }
      );

      const [subscription] = await Subscription.create(
        [
          {
            user: req.user!.id,
            plan: plan._id,
            status: "active",
            currentPeriodStart: now,
            currentPeriodEnd: periodEnd,
          },
        ],
        { session }
      );

      const [payment] = await Payment.create(
        [
          {
            user: req.user!.id,
            subscription: subscription._id,
            amount: plan.price,
            currency: plan.currency,
            method: method || "card",
            status: "succeeded",
            paidAt: now,
          },
        ],
        { session }
      );

      const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      const [invoice] = await Invoice.create(
        [
          {
            user: req.user!.id,
            subscription: subscription._id,
            payment: payment._id,
            invoiceNumber,
            status: "paid",
            lineItems: [
              {
                description: `${plan.name} subscription (${plan.cadence})`,
                quantity: 1,
                unitAmount: plan.price,
                amount: plan.price,
              },
            ],
            subtotal: plan.price,
            tax: 0,
            total: plan.price,
            currency: plan.currency,
            issuedAt: now,
            paidAt: now,
          },
        ],
        { session }
      );

      result = { subscription, payment, invoice };
    });

    return created(res, result, "Subscribed successfully");
  } finally {
    session.endSession();
  }
});

export const cancelSubscription = asyncHandler(async (req: AuthRequest, res: Response) => {
  const subscription = await Subscription.findOneAndUpdate(
    { _id: req.params.id, user: req.user!.id },
    { $set: { cancelAtPeriodEnd: true } },
    { new: true }
  );
  if (!subscription) return fail(res, "Subscription not found", 404);
  return ok(res, subscription, "Subscription will be cancelled at period end");
});

export const listPayments = asyncHandler(async (req: AuthRequest, res: Response) => {
  const payments = await Payment.find({ user: req.user!.id }).sort({ createdAt: -1 });
  return ok(res, payments);
});

export const listInvoices = asyncHandler(async (req: AuthRequest, res: Response) => {
  const invoices = await Invoice.find({ user: req.user!.id }).sort({ createdAt: -1 });
  return ok(res, invoices);
});

export const getInvoice = asyncHandler(async (req: AuthRequest, res: Response) => {
  const invoice = await Invoice.findOne({ _id: req.params.id, user: req.user!.id });
  if (!invoice) return fail(res, "Invoice not found", 404);
  return ok(res, invoice);
});
