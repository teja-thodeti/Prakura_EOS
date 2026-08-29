import { Response } from "express";
import mongoose from "mongoose";
import { Account, Transaction, Budget, Bill, UserProfile } from "../models";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/response";
import { AuthRequest } from "../types";

export const getDashboardSummary = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = new mongoose.Types.ObjectId(req.user!.id);
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const upcomingWindow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const [accounts, monthTotals, recentTransactions, upcomingBills, activeBudgets, profile] =
    await Promise.all([
      Account.find({ user: userId, isArchived: false }),
      Transaction.aggregate([
        { $match: { user: userId, date: { $gte: startOfMonth, $lte: endOfMonth } } },
        {
          $group: {
            _id: "$type",
            total: { $sum: "$amount" },
          },
        },
      ]),
      Transaction.find({ user: userId })
        .sort({ date: -1 })
        .limit(8)
        .populate("account", "name type")
        .populate("category", "name icon color"),
      Bill.find({
        user: userId,
        status: { $in: ["upcoming", "due"] },
        dueDate: { $lte: upcomingWindow },
      })
        .sort({ dueDate: 1 })
        .limit(5),
      Budget.find({ user: userId, isArchived: false }).populate("category", "name icon color"),
      UserProfile.findOne({ user: userId }),
    ]);

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  const income = monthTotals.find((t) => t._id === "income")?.total || 0;
  const expense = monthTotals.find((t) => t._id === "expense")?.total || 0;

  return ok(res, {
    totalBalance,
    monthIncome: income,
    monthExpense: expense,
    monthNet: income - expense,
    accountsCount: accounts.length,
    accounts,
    recentTransactions,
    upcomingBills,
    budgets: activeBudgets,
    onboarding: profile?.onboarding,
  });
});
