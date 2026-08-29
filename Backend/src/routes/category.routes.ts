import { Router } from "express";
import * as ctrl from "../controllers/category.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

router.get("/", ctrl.listCategories);
router.post("/", ctrl.createCategory);
router.put("/:id", ctrl.updateCategory);
router.delete("/:id", ctrl.deleteCategory);
router.get("/subcategories", ctrl.listSubcategories);
router.post("/subcategories", ctrl.createSubcategory);

export default router;
