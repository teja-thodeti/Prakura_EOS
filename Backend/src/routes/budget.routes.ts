import { Router } from "express";
import * as ctrl from "../controllers/budget.controller";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

router.get("/", ctrl.listBudgets);
router.post("/", validate(ctrl.createBudgetSchema), ctrl.createBudget);
router.get("/:id", ctrl.getBudget);
router.put("/:id", validate(ctrl.updateBudgetSchema), ctrl.updateBudget);
router.delete("/:id", ctrl.deleteBudget);

export default router;
