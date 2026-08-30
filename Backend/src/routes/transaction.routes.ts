import { Router } from "express";
import * as ctrl from "../controllers/transaction.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

router.get("/", ctrl.listTransactions);
router.post("/", ctrl.createTransaction);
router.get("/:id", ctrl.getTransaction);
router.put("/:id", ctrl.updateTransaction);
router.delete("/:id", ctrl.deleteTransaction);

export default router;
