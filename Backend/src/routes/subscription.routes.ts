import { Router } from "express";
import * as ctrl from "../controllers/subscription.controller";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

router.get("/plans", ctrl.listPlans);
router.get("/current", ctrl.getCurrentSubscription);
router.post("/subscribe", validate(ctrl.subscribeSchema), ctrl.subscribeToPlan);
router.post("/:id/cancel", validate(ctrl.cancelSubscriptionSchema), ctrl.cancelSubscription);
router.get("/payments", ctrl.listPayments);
router.get("/invoices", ctrl.listInvoices);
router.get("/invoices/:id", validate(ctrl.getInvoiceSchema), ctrl.getInvoice);

export default router;
