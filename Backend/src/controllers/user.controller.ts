import { Response } from "express";
import bcrypt from "bcryptjs";
import { User, UserProfile } from "../models";
import { asyncHandler } from "../utils/asyncHandler";
import { ok, fail } from "../utils/response";
import { AuthRequest } from "../types";
import { env } from "../config/env";

export const getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user!.id);
  const profile = await UserProfile.findOne({ user: req.user!.id });
  return ok(res, { user, profile });
});

export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { name, ...profileFields } = req.body;

  if (name) {
    await User.updateOne({ _id: req.user!.id }, { $set: { name } });
  }

  const allowed = [
    "phone",
    "dateOfBirth",
    "currency",
    "locale",
    "timezone",
    "avatarUrl",
    "address",
    "occupation",
    "monthlyIncome",
    "notificationPreferences",
  ];
  const update: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in profileFields) update[key] = profileFields[key];
  }

  const profile = await UserProfile.findOneAndUpdate(
    { user: req.user!.id },
    { $set: update },
    { new: true, upsert: true }
  );

  const user = await User.findById(req.user!.id);
  return ok(res, { user, profile }, "Profile updated");
});

export const changePassword = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return fail(res, "currentPassword and newPassword are required", 400);
  }

  const user = await User.findById(req.user!.id).select("+passwordHash");
  if (!user) return fail(res, "User not found", 404);

  const valid = await user.comparePassword(currentPassword);
  if (!valid) return fail(res, "Current password is incorrect", 401);

  user.passwordHash = await bcrypt.hash(newPassword, env.BCRYPT_SALT_ROUNDS);
  await user.save();

  return ok(res, null, "Password changed successfully");
});

export const updateOnboarding = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { completed, step, goals, plan } = req.body;
  const update: Record<string, unknown> = {};
  if (completed !== undefined) update["onboarding.completed"] = completed;
  if (step !== undefined) update["onboarding.step"] = step;
  if (goals !== undefined) update["onboarding.goals"] = goals;
  if (plan !== undefined) update["onboarding.plan"] = plan;

  const profile = await UserProfile.findOneAndUpdate(
    { user: req.user!.id },
    { $set: update },
    { new: true, upsert: true }
  );

  return ok(res, profile, "Onboarding updated");
});

export const deactivateAccount = asyncHandler(async (req: AuthRequest, res: Response) => {
  await User.updateOne({ _id: req.user!.id }, { $set: { isActive: false } });
  return ok(res, null, "Account deactivated");
});
