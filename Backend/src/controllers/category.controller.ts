import { Response } from "express";
import { Category, Subcategory } from "../models";
import { asyncHandler } from "../utils/asyncHandler";
import { ok, created, fail } from "../utils/response";
import { AuthRequest } from "../types";

export const listCategories = asyncHandler(async (req: AuthRequest, res: Response) => {
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
