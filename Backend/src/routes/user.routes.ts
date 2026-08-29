import { Router } from "express";
import * as ctrl from "../controllers/user.controller";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

router.get("/me/profile", ctrl.getProfile);
router.put("/me/profile", validate(ctrl.updateProfileSchema), ctrl.updateProfile);
router.post("/me/change-password", validate(ctrl.changePasswordSchema), ctrl.changePassword);
router.put("/me/onboarding", validate(ctrl.updateOnboardingSchema), ctrl.updateOnboarding);
router.post("/me/deactivate", ctrl.deactivateAccount);

export default router;
