import { Response } from "express";
import { z } from "zod";
import { Account, Transaction } from "../models";
import { asyncHandler } from "../utils/asyncHandler";
import { ok, created, fail } from "../utils/response";
import { AuthRequest } from "../types";

// ========== Validation Schemas ==========
export const createAccountSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    type: z.enum(["checking", "savings", "credit_card", "cash", "investment"]),
    balance: z.number().optional(),
    currency: z.string().length(3).optional(),
    isArchived: z.boolean().optional(),
    description: z.string().max(500).optional(),
  }),
});

export const updateAccountSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    type: z.enum(["checking", "savings", "credit_card", "cash", "investment"]).optional(),
    balance: z.number().optional(),
    currency: z.string().length(3).optional(),
    description: z.string().max(500).optional(),
  }),
});

export const archiveAccountSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const listAccounts = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { includeArchived } = req.query;
  const filter: Record<string, unknown> = { user: req.user!.id };
  if (includeArchived !== "true") filter.isArchived = false;

  const accounts = await Account.find(filter).sort({ createdAt: -1 });
  return ok(res, accounts);
});

export const getAccount = asyncHandler(async (req: AuthRequest, res: Response) => {
  const account = await Account.findOne({ _id: req.params.id, user: req.user!.id });
  if (!account) return fail(res, "Account not found", 404);
  return ok(res, account);
});

export const createAccount = asyncHandler(async (req: AuthRequest, res: Response) => {
  const account = await Account.create({ ...req.body, user: req.user!.id });
  return created(res, account, "Account created");
});

export const updateAccount = asyncHandler(async (req: AuthRequest, res: Response) => {
  const account = await Account.findOneAndUpdate(
    { _id: req.params.id, user: req.user!.id },
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!account) return fail(res, "Account not found", 404);
  return ok(res, account, "Account updated");
});

export const archiveAccount = asyncHandler(async (req: AuthRequest, res: Response) => {
  const account = await Account.findOneAndUpdate(
    { _id: req.params.id, user: req.user!.id },
    { $set: { isArchived: true } },
    { new: true }
  );
  if (!account) return fail(res, "Account not found", 404);
  return ok(res, account, "Account archived");
});

export const deleteAccount = asyncHandler(async (req: AuthRequest, res: Response) => {
  const txCount = await Transaction.countDocuments({ account: req.params.id, user: req.user!.id });
  if (txCount > 0) {
    return fail(res, "Cannot delete an account with existing transactions. Archive it instead.", 409);
  }
  const account = await Account.findOneAndDelete({ _id: req.params.id, user: req.user!.id });
  if (!account) return fail(res, "Account not found", 404);
  return ok(res, null, "Account deleted");
});
