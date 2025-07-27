import { Router } from "express";
import { expenseController } from "../controllers/expenseController";

const router = Router();

router.get("/", expenseController.getAll);
router.get("/:id", expenseController.getById);
router.post("/", expenseController.create);
router.put("/:id", expenseController.update);
router.delete("/:id", expenseController.delete);

export default router;