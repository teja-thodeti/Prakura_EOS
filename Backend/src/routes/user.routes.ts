import { Router } from "express";
import * as ctrl from "../controllers/user.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

router.get("/me/profile", ctrl.getProfile);
router.put("/me/profile", ctrl.updateProfile);
router.post("/me/change-password", ctrl.changePassword);
router.put("/me/onboarding", ctrl.updateOnboarding);
router.post("/me/deactivate", ctrl.deactivateAccount);

export default router;
