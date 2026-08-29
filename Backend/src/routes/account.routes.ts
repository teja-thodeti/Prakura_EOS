import { Router } from "express";
import * as ctrl from "../controllers/account.controller";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

router.get("/", ctrl.listAccounts);
router.post("/", validate(ctrl.createAccountSchema), ctrl.createAccount);
router.get("/:id", ctrl.getAccount);
router.put("/:id", validate(ctrl.updateAccountSchema), ctrl.updateAccount);
router.patch("/:id/archive", validate(ctrl.archiveAccountSchema), ctrl.archiveAccount);
router.delete("/:id", ctrl.deleteAccount);

export default router;
