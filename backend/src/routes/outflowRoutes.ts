import { Router } from "express";
import { outflowController } from "../controllers/outflowController";

const router = Router();

router.get("/", outflowController.getAll);
router.get("/:id", outflowController.getById);
router.post("/", outflowController.create);
router.put("/:id", outflowController.update);
router.delete("/:id", outflowController.delete);

export default router;