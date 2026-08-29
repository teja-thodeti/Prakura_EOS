import { Router } from "express";
import * as ctrl from "../controllers/transaction.controller";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

router.get("/", ctrl.listTransactions);
router.post("/", validate(ctrl.createTransactionSchema), ctrl.createTransaction);
router.get("/:id", ctrl.getTransaction);
router.put("/:id", validate(ctrl.updateTransactionSchema), ctrl.updateTransaction);
router.delete("/:id", ctrl.deleteTransaction);

export default router;
