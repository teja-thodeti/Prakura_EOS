import { Router } from "express";
import * as ctrl from "../controllers/dashboard.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

router.get("/summary", ctrl.getDashboardSummary);

export default router;
