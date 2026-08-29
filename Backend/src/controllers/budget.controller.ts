import { Response } from "express";
import { Budget, Transaction } from "../models";
import { asyncHandler } from "../utils/asyncHandler";
import { ok, created, fail } from "../utils/response";
import { AuthRequest } from "../types";

function periodRange(period: string, startDate: Date): { start: Date; end: Date } {
  const start = new Date(startDate);
  const end = new Date(startDate);
  if (period === "weekly") end.setDate(end.getDate() + 7);
  else if (period === "monthly") end.setMonth(end.getMonth() + 1);
  else if (period === "yearly") end.setFullYear(end.getFullYear() + 1);
  return { start, end };
}

export const listBudgets = asyncHandler(async (req: AuthRequest, res: Response) => {
  const budgets = await Budget.find({ user: req.user!.id, isArchived: false })
    .populate("category", "name icon color")
    .sort({ createdAt: -1 });

  const withSpend = await Promise.all(
    budgets.map(async (budget) => {
      const { start, end } = budget.endDate
        ? { start: budget.startDate, end: budget.endDate }
        : periodRange(budget.period, budget.startDate);

      const filter: Record<string, unknown> = {
        user: req.user!.id,
        type: "expense",
        date: { $gte: start, $lte: end },
      };
      if (budget.category) filter.category = budget.category;

      const agg = await Transaction.aggregate([
        { $match: filter },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);

      const spent = agg[0]?.total || 0;
      return {
        ...budget.toObject(),
        spent,
        remaining: Math.max(budget.amount - spent, 0),
        percentUsed: budget.amount > 0 ? Math.min((spent / budget.amount) * 100, 999) : 0,
        periodStart: start,
        periodEnd: end,
      };
    })
  );

  return ok(res, withSpend);
});

export const getBudget = asyncHandler(async (req: AuthRequest, res: Response) => {
  const budget = await Budget.findOne({ _id: req.params.id, user: req.user!.id }).populate(
    "category",
    "name icon color"
  );
  if (!budget) return fail(res, "Budget not found", 404);
  return ok(res, budget);
});

export const createBudget = asyncHandler(async (req: AuthRequest, res: Response) => {
  const budget = await Budget.create({ ...req.body, user: req.user!.id });
  return created(res, budget, "Budget created");
});

export const updateBudget = asyncHandler(async (req: AuthRequest, res: Response) => {
  const budget = await Budget.findOneAndUpdate(
    { _id: req.params.id, user: req.user!.id },
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!budget) return fail(res, "Budget not found", 404);
  return ok(res, budget, "Budget updated");
});

export const deleteBudget = asyncHandler(async (req: AuthRequest, res: Response) => {
  const budget = await Budget.findOneAndUpdate(
    { _id: req.params.id, user: req.user!.id },
    { $set: { isArchived: true } },
    { new: true }
  );
  if (!budget) return fail(res, "Budget not found", 404);
  return ok(res, null, "Budget deleted");
});
