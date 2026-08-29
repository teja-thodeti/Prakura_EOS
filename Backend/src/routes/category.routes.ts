import { Router } from "express";
import * as ctrl from "../controllers/category.controller";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

router.get("/", validate(ctrl.listCategoriesSchema), ctrl.listCategories);
router.post("/", validate(ctrl.createCategorySchema), ctrl.createCategory);
router.put("/:id", validate(ctrl.updateCategorySchema), ctrl.updateCategory);
router.delete("/:id", ctrl.deleteCategory);
router.get("/subcategories", validate(ctrl.listSubcategoriesSchema), ctrl.listSubcategories);
router.post("/subcategories", validate(ctrl.createSubcategorySchema), ctrl.createSubcategory);

export default router;
