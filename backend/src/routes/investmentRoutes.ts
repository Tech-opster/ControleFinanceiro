import { Router } from "express";
import { investmentController } from "../controllers/investmentController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = Router();

router.use(authenticateUser);

router.get("/", investmentController.getAll);
router.get("/:id", investmentController.getById);
router.post("/", investmentController.create);
router.put("/:id", investmentController.update);
router.delete("/:id", investmentController.delete);

export default router;