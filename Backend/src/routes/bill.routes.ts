import { Router } from "express";
import * as ctrl from "../controllers/bill.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

router.get("/", ctrl.listBills);
router.post("/", ctrl.createBill);
router.get("/:id", ctrl.getBill);
router.put("/:id", ctrl.updateBill);
router.delete("/:id", ctrl.deleteBill);
router.post("/:id/pay", ctrl.payBill);

export default router;
