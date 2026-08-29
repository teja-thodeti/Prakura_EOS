import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import accountRoutes from "./account.routes";
import transactionRoutes from "./transaction.routes";
import categoryRoutes from "./category.routes";
import budgetRoutes from "./budget.routes";
import billRoutes from "./bill.routes";
import reportRoutes from "./report.routes";
import subscriptionRoutes from "./subscription.routes";
import dashboardRoutes from "./dashboard.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/accounts", accountRoutes);
router.use("/transactions", transactionRoutes);
router.use("/categories", categoryRoutes);
router.use("/budgets", budgetRoutes);
router.use("/bills", billRoutes);
router.use("/reports", reportRoutes);
router.use("/subscriptions", subscriptionRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
