import { Router } from "express";
import { outflowController } from "../controllers/outflowController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = Router();

router.use(authenticateUser);

router.get("/", outflowController.getAll);
router.get("/:id", outflowController.getById);
router.post("/", outflowController.create);
router.put("/:id", outflowController.update);
router.delete("/:id", outflowController.delete);

export default router;