import { Router } from "express";
import * as ctrl from "../controllers/report.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

router.get("/summary", ctrl.summaryReport);
router.get("/spending-by-category", ctrl.spendingByCategory);
router.get("/income-vs-expense", ctrl.incomeVsExpense);
router.get("/net-worth-trend", ctrl.netWorthTrend);

export default router;
