import { Router } from "express";
import * as ctrl from "../controllers/auth.controller";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/register", validate(ctrl.registerSchema), ctrl.register);
router.post("/login", validate(ctrl.loginSchema), ctrl.login);
router.post("/refresh", validate(ctrl.refreshSchema), ctrl.refresh);
router.post("/logout", ctrl.logout);
router.post("/forgot-password", validate(ctrl.forgotPasswordSchema), ctrl.forgotPassword);
router.post("/reset-password", validate(ctrl.resetPasswordSchema), ctrl.resetPassword);
router.get("/me", requireAuth, ctrl.me);
router.post("/devices", requireAuth, ctrl.registerDevice);
router.get("/sessions", requireAuth, ctrl.listSessions);
router.delete("/sessions/:sessionId", requireAuth, ctrl.revokeSession);

export default router;
