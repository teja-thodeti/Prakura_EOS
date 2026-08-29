/* eslint-disable no-console */
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db";
import { env } from "../config/env";
import mongoose from "mongoose";
import {
  User,
  UserProfile,
  Account,
  Category,
  Subcategory,
  Transaction,
  Budget,
  Bill,
  SubscriptionPlan,
} from "../models";

async function seed() {
  await connectDB();
  console.log("[seed] Connected. Clearing existing demo data...");

  const demoEmail = "demo@prakura.app";
  await User.deleteOne({ email: demoEmail });
  await SubscriptionPlan.deleteMany({});

  // --- System categories (available to every user) ---
  const systemCategoryDefs: Array<{ name: string; kind: "income" | "expense"; icon: string; color: string }> = [
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
  ];

  const existingSystemCount = await Category.countDocuments({ isSystem: true });
  let systemCategories = await Category.find({ isSystem: true });
  if (existingSystemCount === 0) {
    systemCategories = await Category.insertMany(
      systemCategoryDefs.map((c) => ({ ...c, user: null, isSystem: true }))
    );
    console.log(`[seed] Inserted ${systemCategories.length} system categories`);
  }

  // --- Subscription plans ---
  const plans = await SubscriptionPlan.insertMany([
    {
      key: "free",
      name: "Free",
      description: "Get started with the basics",
      price: 0,
      currency: "INR",
      cadence: "monthly",
      features: ["Up to 2 accounts", "Manual transaction entry", "Basic reports"],
      isActive: true,
    },
    {
      key: "pro_monthly",
      name: "Pro",
      description: "For serious budgeters",
      price: 299,
      currency: "INR",
      cadence: "monthly",
      features: ["Unlimited accounts", "Budgets & bill reminders", "Advanced reports", "Priority support"],
      isActive: true,
      isHighlighted: true,
    },
    {
      key: "pro_yearly",
      name: "Pro (Yearly)",
      description: "Best value for committed savers",
      price: 2999,
      currency: "INR",
      cadence: "yearly",
      features: ["Everything in Pro", "2 months free", "Early access to new features"],
      isActive: true,
    },
  ]);
  console.log(`[seed] Inserted ${plans.length} subscription plans`);

  // --- Demo user ---
  const passwordHash = await bcrypt.hash("Demo@1234", env.BCRYPT_SALT_ROUNDS);
  const user = await User.create({
    name: "Prakura Demo",
    email: demoEmail,
    passwordHash,
    isEmailVerified: true,
  });

  await UserProfile.create({
    user: user._id,
    currency: "INR",
    onboarding: { completed: true, step: 4, goals: ["save_more", "track_spending"], plan: "free" },
  });

  const checking = await Account.create({
    user: user._id,
    name: "Primary Checking",
    type: "bank",
    institution: "HDFC Bank",
    accountNumberLast4: "4821",
    balance: 125000,
  });

  const creditCard = await Account.create({
    user: user._id,
    name: "Rewards Credit Card",
    type: "credit_card",
    institution: "ICICI Bank",
    accountNumberLast4: "9012",
    balance: -8500,
    creditLimit: 200000,
  });

  const wallet = await Account.create({
    user: user._id,
    name: "Cash Wallet",
    type: "cash",
    balance: 3200,
  });

  const findCat = (name: string) => systemCategories.find((c) => c.name === name)!._id;

  const groceriesSub = await Subcategory.create({ category: findCat("Groceries"), name: "Supermarket" });

  const now = new Date();
  const txDefs = [
    { type: "income", category: findCat("Salary"), amount: 85000, description: "Monthly salary", daysAgo: 2 },
    { type: "expense", category: findCat("Rent"), amount: 25000, description: "Apartment rent", daysAgo: 1 },
    { type: "expense", category: findCat("Groceries"), subcategory: groceriesSub._id, amount: 3200, description: "BigBasket order", daysAgo: 3 },
    { type: "expense", category: findCat("Utilities"), amount: 1800, description: "Electricity bill", daysAgo: 5 },
    { type: "expense", category: findCat("Dining Out"), amount: 950, description: "Dinner with friends", daysAgo: 6 },
    { type: "expense", category: findCat("Transportation"), amount: 600, description: "Fuel", daysAgo: 8 },
    { type: "expense", category: findCat("Entertainment"), amount: 499, description: "Streaming subscription", daysAgo: 10 },
    { type: "income", category: findCat("Freelance"), amount: 12000, description: "Freelance project payout", daysAgo: 12 },
  ];

  for (const tx of txDefs) {
    await Transaction.create({
      user: user._id,
      account: tx.type === "income" ? checking._id : creditCard._id,
      category: tx.category,
      subcategory: tx.subcategory,
      type: tx.type,
      amount: tx.amount,
      description: tx.description,
      date: new Date(now.getTime() - tx.daysAgo * 24 * 60 * 60 * 1000),
      status: "cleared",
    });
  }

  await Budget.create({
    user: user._id,
    name: "Monthly Groceries",
    category: findCat("Groceries"),
    amount: 10000,
    period: "monthly",
    startDate: new Date(now.getFullYear(), now.getMonth(), 1),
  });

  await Budget.create({
    user: user._id,
    name: "Dining & Entertainment",
    category: findCat("Dining Out"),
    amount: 5000,
    period: "monthly",
    startDate: new Date(now.getFullYear(), now.getMonth(), 1),
  });

  await Bill.create({
    user: user._id,
    name: "Internet Bill",
    account: checking._id,
    category: findCat("Utilities"),
    amount: 1200,
    dueDate: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000),
    frequency: "monthly",
    status: "upcoming",
  });

  await Bill.create({
    user: user._id,
    name: "Netflix Subscription",
    account: creditCard._id,
    category: findCat("Subscriptions"),
    amount: 649,
    dueDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
    frequency: "monthly",
    status: "due",
  });

  console.log("[seed] Demo user created:");
  console.log(`        email: ${demoEmail}`);
  console.log(`        password: Demo@1234`);
  console.log("[seed] Done.");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("[seed] Failed:", err);
  process.exit(1);
});
