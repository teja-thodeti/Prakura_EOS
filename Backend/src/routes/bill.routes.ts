import { Router } from "express";
import * as ctrl from "../controllers/bill.controller";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

router.get("/", ctrl.listBills);
router.post("/", validate(ctrl.createBillSchema), ctrl.createBill);
router.get("/:id", ctrl.getBill);
router.put("/:id", validate(ctrl.updateBillSchema), ctrl.updateBill);
router.delete("/:id", ctrl.deleteBill);
router.post("/:id/pay", validate(ctrl.payBillSchema), ctrl.payBill);

export default router;
