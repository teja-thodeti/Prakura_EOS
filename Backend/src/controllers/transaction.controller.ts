import { Response } from "express";
import mongoose from "mongoose";
import { Transaction, Account } from "../models";
import { asyncHandler } from "../utils/asyncHandler";
import { ok, created, fail } from "../utils/response";
import { AuthRequest } from "../types";

function balanceDelta(type: string, amount: number): number {
  if (type === "income") return amount;
  if (type === "expense") return -amount;
  return 0;
}

export const listTransactions = asyncHandler(async (req: AuthRequest, res: Response) => {
  const {
    page = "1",
    limit = "20",
    account,
    category,
    type,
    status,
    search,
    startDate,
    endDate,
    sort = "-date",
  } = req.query as Record<string, string>;

  const filter: Record<string, unknown> = { user: req.user!.id };
  if (account) filter.account = account;
  if (category) filter.category = category;
  if (type) filter.type = type;
  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { description: { $regex: search, $options: "i" } },
      { merchant: { $regex: search, $options: "i" } },
    ];
  }
  if (startDate || endDate) {
    filter.date = {} as Record<string, Date>;
    if (startDate) (filter.date as Record<string, Date>)["$gte"] = new Date(startDate);
    if (endDate) (filter.date as Record<string, Date>)["$lte"] = new Date(endDate);
  }

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

  const [items, total] = await Promise.all([
    Transaction.find(filter)
      .populate("account", "name type")
      .populate("category", "name icon color")
      .populate("subcategory", "name")
      .sort(sort)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Transaction.countDocuments(filter),
  ]);

  return ok(res, {
    items,
    pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
  });
});

export const getTransaction = asyncHandler(async (req: AuthRequest, res: Response) => {
  const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user!.id })
    .populate("account", "name type")
    .populate("category", "name icon color")
    .populate("subcategory", "name");
  if (!transaction) return fail(res, "Transaction not found", 404);
  return ok(res, transaction);
});

export const createTransaction = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { account: accountId, transferToAccount, type, amount } = req.body;

  const session = await mongoose.startSession();
  try {
    let transaction;
    await session.withTransaction(async () => {
      const account = await Account.findOne({ _id: accountId, user: req.user!.id }).session(session);
      if (!account) throw Object.assign(new Error("Source account not found"), { status: 404 });

      if (type === "transfer") {
        if (!transferToAccount) {
          throw Object.assign(new Error("transferToAccount is required for transfers"), { status: 400 });
        }
        const destAccount = await Account.findOne({
          _id: transferToAccount,
          user: req.user!.id,
        }).session(session);
        if (!destAccount) throw Object.assign(new Error("Destination account not found"), { status: 404 });

        account.balance -= amount;
        destAccount.balance += amount;
        await account.save({ session });
        await destAccount.save({ session });
      } else {
        account.balance += balanceDelta(type, amount);
        await account.save({ session });
      }

      const [createdTx] = await Transaction.create([{ ...req.body, user: req.user!.id }], { session });
      transaction = createdTx;
    });

    return created(res, transaction, "Transaction created");
  } finally {
    session.endSession();
  }
});

export const updateTransaction = asyncHandler(async (req: AuthRequest, res: Response) => {
  const session = await mongoose.startSession();
  try {
    let updated;
    await session.withTransaction(async () => {
      const existing = await Transaction.findOne({ _id: req.params.id, user: req.user!.id }).session(
        session
      );
      if (!existing) throw Object.assign(new Error("Transaction not found"), { status: 404 });

      // Reverse old effect on balances
      const oldAccount = await Account.findById(existing.account).session(session);
      if (oldAccount) {
        if (existing.type === "transfer" && existing.transferToAccount) {
          const oldDest = await Account.findById(existing.transferToAccount).session(session);
          oldAccount.balance += existing.amount;
          if (oldDest) {
            oldDest.balance -= existing.amount;
            await oldDest.save({ session });
          }
        } else {
          oldAccount.balance -= balanceDelta(existing.type, existing.amount);
        }
        await oldAccount.save({ session });
      }

      Object.assign(existing, req.body);
      await existing.save({ session });

      // Apply new effect
      const newAccount = await Account.findById(existing.account).session(session);
      if (newAccount) {
        if (existing.type === "transfer" && existing.transferToAccount) {
          const newDest = await Account.findById(existing.transferToAccount).session(session);
          newAccount.balance -= existing.amount;
          if (newDest) {
            newDest.balance += existing.amount;
            await newDest.save({ session });
          }
        } else {
          newAccount.balance += balanceDelta(existing.type, existing.amount);
        }
        await newAccount.save({ session });
      }

      updated = existing;
    });

    return ok(res, updated, "Transaction updated");
  } finally {
    session.endSession();
  }
});

export const deleteTransaction = asyncHandler(async (req: AuthRequest, res: Response) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const existing = await Transaction.findOne({ _id: req.params.id, user: req.user!.id }).session(
        session
      );
      if (!existing) throw Object.assign(new Error("Transaction not found"), { status: 404 });

      const account = await Account.findById(existing.account).session(session);
      if (account) {
        if (existing.type === "transfer" && existing.transferToAccount) {
          const dest = await Account.findById(existing.transferToAccount).session(session);
          account.balance += existing.amount;
          if (dest) {
            dest.balance -= existing.amount;
            await dest.save({ session });
          }
        } else {
          account.balance -= balanceDelta(existing.type, existing.amount);
        }
        await account.save({ session });
      }

      await existing.deleteOne({ session });
    });

    return ok(res, null, "Transaction deleted");
  } finally {
    session.endSession();
  }
});
