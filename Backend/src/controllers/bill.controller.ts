import { Response } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { Bill, Transaction, Account } from "../models";
import { asyncHandler } from "../utils/asyncHandler";
import { ok, created, fail } from "../utils/response";
import { AuthRequest } from "../types";

// ========== Validation Schemas ==========
export const createBillSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(200),
    amount: z.number().positive("Bill amount must be positive"),
    account: z.string().optional(),
    category: z.string(),
    dueDate: z.string().datetime(),
    frequency: z.enum(["once", "weekly", "monthly", "quarterly", "yearly"]),
    status: z.enum(["upcoming", "overdue", "paid"]).optional(),
    description: z.string().max(500).optional(),
  }),
});

export const updateBillSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(200).optional(),
    amount: z.number().positive("Bill amount must be positive").optional(),
    account: z.string().optional(),
    category: z.string().optional(),
    dueDate: z.string().datetime().optional(),
    frequency: z.enum(["once", "weekly", "monthly", "quarterly", "yearly"]).optional(),
    status: z.enum(["upcoming", "overdue", "paid"]).optional(),
    description: z.string().max(500).optional(),
  }),
});

export const payBillSchema = z.object({
  body: z.object({
    accountId: z.string().optional(),
  }),
});

function nextDueDate(current: Date, frequency: string): Date {
  const next = new Date(current);
  if (frequency === "weekly") next.setDate(next.getDate() + 7);
  else if (frequency === "monthly") next.setMonth(next.getMonth() + 1);
  else if (frequency === "quarterly") next.setMonth(next.getMonth() + 3);
  else if (frequency === "yearly") next.setFullYear(next.getFullYear() + 1);
  return next;
}

export const listBills = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { status } = req.query;
  const filter: Record<string, unknown> = { user: req.user!.id };
  if (status) filter.status = status;

  const bills = await Bill.find(filter)
    .populate("account", "name type")
    .populate("category", "name icon color")
    .sort({ dueDate: 1 });
  return ok(res, bills);
});

export const getBill = asyncHandler(async (req: AuthRequest, res: Response) => {
  const bill = await Bill.findOne({ _id: req.params.id, user: req.user!.id });
  if (!bill) return fail(res, "Bill not found", 404);
  return ok(res, bill);
});

export const createBill = asyncHandler(async (req: AuthRequest, res: Response) => {
  const bill = await Bill.create({ ...req.body, user: req.user!.id });
  return created(res, bill, "Bill created");
});

export const updateBill = asyncHandler(async (req: AuthRequest, res: Response) => {
  const bill = await Bill.findOneAndUpdate(
    { _id: req.params.id, user: req.user!.id },
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!bill) return fail(res, "Bill not found", 404);
  return ok(res, bill, "Bill updated");
});

export const deleteBill = asyncHandler(async (req: AuthRequest, res: Response) => {
  const bill = await Bill.findOneAndDelete({ _id: req.params.id, user: req.user!.id });
  if (!bill) return fail(res, "Bill not found", 404);
  return ok(res, null, "Bill deleted");
});

// Marks bill paid, optionally creating a linked expense transaction & updating account balance atomically.
export const payBill = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { accountId } = req.body;

  const session = await mongoose.startSession();
  try {
    let result;
    await session.withTransaction(async () => {
      const bill = await Bill.findOne({ _id: req.params.id, user: req.user!.id }).session(session);
      if (!bill) throw Object.assign(new Error("Bill not found"), { status: 404 });

      const targetAccountId = accountId || bill.account;
      if (targetAccountId) {
        const account = await Account.findOne({ _id: targetAccountId, user: req.user!.id }).session(
          session
        );
        if (account) {
          account.balance -= bill.amount;
          await account.save({ session });
        }

        await Transaction.create(
          [
            {
              user: req.user!.id,
              account: targetAccountId,
              category: bill.category,
              type: "expense",
              amount: bill.amount,
              description: `Bill payment: ${bill.name}`,
              date: new Date(),
              status: "cleared",
            },
          ],
          { session }
        );
      }

      bill.lastPaidAt = new Date();
      if (bill.frequency === "once") {
        bill.status = "paid";
      } else {
        bill.dueDate = nextDueDate(bill.dueDate, bill.frequency);
        bill.status = "upcoming";
      }
      await bill.save({ session });
      result = bill;
    });

    return ok(res, result, "Bill marked as paid");
  } finally {
    session.endSession();
  }
});
