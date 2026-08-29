import { Response } from "express";
import mongoose from "mongoose";
import { Transaction } from "../models";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/response";
import { AuthRequest } from "../types";

function resolveDateRange(query: Record<string, string>) {
  const now = new Date();
  const startDate = query.startDate
    ? new Date(query.startDate)
    : new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const endDate = query.endDate ? new Date(query.endDate) : now;
  return { startDate, endDate };
}

export const spendingByCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { startDate, endDate } = resolveDateRange(req.query as Record<string, string>);
  const userId = new mongoose.Types.ObjectId(req.user!.id);

  const results = await Transaction.aggregate([
    { $match: { user: userId, type: "expense", date: { $gte: startDate, $lte: endDate } } },
    { $group: { _id: "$category", total: { $sum: "$amount" }, count: { $sum: 1 } } },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 0,
        categoryId: "$_id",
        name: { $ifNull: ["$category.name", "Uncategorized"] },
        color: "$category.color",
        icon: "$category.icon",
        total: 1,
        count: 1,
      },
    },
    { $sort: { total: -1 } },
  ]);

  return ok(res, results);
});

export const incomeVsExpense = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { startDate, endDate } = resolveDateRange(req.query as Record<string, string>);
  const userId = new mongoose.Types.ObjectId(req.user!.id);

  const results = await Transaction.aggregate([
    { $match: { user: userId, type: { $in: ["income", "expense"] }, date: { $gte: startDate, $lte: endDate } } },
    {
      $group: {
        _id: { year: { $year: "$date" }, month: { $month: "$date" }, type: "$type" },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  const byMonth: Record<string, { month: string; income: number; expense: number }> = {};
  for (const row of results) {
    const key = `${row._id.year}-${String(row._id.month).padStart(2, "0")}`;
    if (!byMonth[key]) byMonth[key] = { month: key, income: 0, expense: 0 };
    if (row._id.type === "income") byMonth[key].income = row.total;
    else byMonth[key].expense = row.total;
  }

  return ok(res, Object.values(byMonth));
});

export const netWorthTrend = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { startDate, endDate } = resolveDateRange(req.query as Record<string, string>);
  const userId = new mongoose.Types.ObjectId(req.user!.id);

  const results = await Transaction.aggregate([
    { $match: { user: userId, date: { $gte: startDate, $lte: endDate } } },
    {
      $group: {
        _id: { year: { $year: "$date" }, month: { $month: "$date" } },
        income: { $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] } },
        expense: { $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] } },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  let cumulative = 0;
  const trend = results.map((row) => {
    cumulative += row.income - row.expense;
    return {
      month: `${row._id.year}-${String(row._id.month).padStart(2, "0")}`,
      netChange: row.income - row.expense,
      cumulative,
    };
  });

  return ok(res, trend);
});

export const summaryReport = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { startDate, endDate } = resolveDateRange(req.query as Record<string, string>);
  const userId = new mongoose.Types.ObjectId(req.user!.id);

  const [totals] = await Transaction.aggregate([
    { $match: { user: userId, date: { $gte: startDate, $lte: endDate } } },
    {
      $group: {
        _id: null,
        income: { $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] } },
        expense: { $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] } },
        transactionCount: { $sum: 1 },
      },
    },
  ]);

  const income = totals?.income || 0;
  const expense = totals?.expense || 0;

  return ok(res, {
    startDate,
    endDate,
    income,
    expense,
    net: income - expense,
    savingsRate: income > 0 ? ((income - expense) / income) * 100 : 0,
    transactionCount: totals?.transactionCount || 0,
  });
});
