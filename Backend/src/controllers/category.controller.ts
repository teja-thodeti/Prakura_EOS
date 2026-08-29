import { Response } from "express";
import { z } from "zod";
import { Category, Subcategory } from "../models";
import { asyncHandler } from "../utils/asyncHandler";
import { ok, created, fail } from "../utils/response";
import { AuthRequest } from "../types";

export const DEFAULT_SYSTEM_CATEGORY_DEFS = [
  { name: "Salary", kind: "income", icon: "briefcase", color: "#1fa971" },
  { name: "Freelance", kind: "income", icon: "laptop", color: "#2f6fed" },
  { name: "Investments", kind: "income", icon: "trending-up", color: "#6d5ff7" },
  { name: "Groceries", kind: "expense", icon: "shopping-cart", color: "#ef4444" },
  { name: "Rent", kind: "expense", icon: "home", color: "#f59e0b" },
  { name: "Utilities", kind: "expense", icon: "zap", color: "#0ea5e9" },
  { name: "Transportation", kind: "expense", icon: "car", color: "#8b5cf6" },
  { name: "Dining Out", kind: "expense", icon: "utensils", color: "#f97316" },
  { name: "Entertainment", kind: "expense", icon: "film", color: "#ec4899" },
  { name: "Healthcare", kind: "expense", icon: "heart", color: "#14b8a6" },
  { name: "Shopping", kind: "expense", icon: "shopping-bag", color: "#a855f7" },
  { name: "Subscriptions", kind: "expense", icon: "repeat", color: "#64748b" },
] as const;

export async function ensureSystemCategories() {
  const existingSystemCount = await Category.countDocuments({ isSystem: true });
  if (existingSystemCount === 0) {
    await Category.insertMany(
      DEFAULT_SYSTEM_CATEGORY_DEFS.map((category) => ({ ...category, user: null, isSystem: true }))
    );
  }
}

// ========== Validation Schemas ==========
export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    kind: z.enum(["income", "expense"]),
    icon: z.string().optional(),
    color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
    description: z.string().max(500).optional(),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    kind: z.enum(["income", "expense"]).optional(),
    icon: z.string().optional(),
    color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
    description: z.string().max(500).optional(),
  }),
});

export const createSubcategorySchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    category: z.string(),
    icon: z.string().optional(),
    color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
    description: z.string().max(500).optional(),
  }),
});

export const listCategoriesSchema = z.object({
  query: z.object({
    kind: z.enum(["income", "expense"]).optional(),
  }),
});

export const listSubcategoriesSchema = z.object({
  query: z.object({
    category: z.string().optional(),
  }),
});

export const listCategories = asyncHandler(async (req: AuthRequest, res: Response) => {
  await ensureSystemCategories();

  const { kind } = req.query;
  const filter: Record<string, unknown> = {
    $or: [{ user: req.user!.id }, { user: null, isSystem: true }],
    isArchived: false,
  };
  if (kind) filter.kind = kind;

  const categories = await Category.find(filter).sort({ name: 1 });
  return ok(res, categories);
});

export const createCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const category = await Category.create({ ...req.body, user: req.user!.id, isSystem: false });
  return created(res, category, "Category created");
});

export const updateCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const category = await Category.findOneAndUpdate(
    { _id: req.params.id, user: req.user!.id },
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!category) return fail(res, "Category not found or not editable", 404);
  return ok(res, category, "Category updated");
});

export const deleteCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const category = await Category.findOneAndUpdate(
    { _id: req.params.id, user: req.user!.id },
    { $set: { isArchived: true } },
    { new: true }
  );
  if (!category) return fail(res, "Category not found or not editable", 404);
  return ok(res, null, "Category archived");
});

export const listSubcategories = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { category } = req.query;
  const filter: Record<string, unknown> = {
    $or: [{ user: req.user!.id }, { user: null }],
    isArchived: false,
  };
  if (category) filter.category = category;
  const subcategories = await Subcategory.find(filter).sort({ name: 1 });
  return ok(res, subcategories);
});

export const createSubcategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const subcategory = await Subcategory.create({ ...req.body, user: req.user!.id });
  return created(res, subcategory, "Subcategory created");
});
