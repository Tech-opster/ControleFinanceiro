import { Router } from "express";
import { incomeController } from "../controllers/incomeController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = Router();

router.use(authenticateUser);

router.get("/", incomeController.getAll);
router.get("/:id", incomeController.getById);
router.post("/", incomeController.create);
router.put("/:id", incomeController.update);
router.delete("/:id", incomeController.delete);

export default router;