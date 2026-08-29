import { Router } from "express";
import * as ctrl from "../controllers/subscription.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

router.get("/plans", ctrl.listPlans);
router.get("/current", ctrl.getCurrentSubscription);
router.post("/subscribe", ctrl.subscribeToPlan);
router.post("/:id/cancel", ctrl.cancelSubscription);
router.get("/payments", ctrl.listPayments);
router.get("/invoices", ctrl.listInvoices);
router.get("/invoices/:id", ctrl.getInvoice);

export default router;
