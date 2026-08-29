import { Router } from "express";
import * as ctrl from "../controllers/account.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

router.get("/", ctrl.listAccounts);
router.post("/", ctrl.createAccount);
router.get("/:id", ctrl.getAccount);
router.put("/:id", ctrl.updateAccount);
router.patch("/:id/archive", ctrl.archiveAccount);
router.delete("/:id", ctrl.deleteAccount);

export default router;
