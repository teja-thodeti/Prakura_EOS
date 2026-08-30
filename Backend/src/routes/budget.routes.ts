import { Router } from "express";
import * as ctrl from "../controllers/budget.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

router.get("/", ctrl.listBudgets);
router.post("/", ctrl.createBudget);
router.get("/:id", ctrl.getBudget);
router.put("/:id", ctrl.updateBudget);
router.delete("/:id", ctrl.deleteBudget);

export default router;
