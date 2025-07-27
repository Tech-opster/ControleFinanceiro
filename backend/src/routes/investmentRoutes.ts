import { Router } from "express";
import { investmentController } from "../controllers/investmentController";

const router = Router();

router.get("/", investmentController.getAll);
router.get("/:id", investmentController.getById);
router.post("/", investmentController.create);
router.put("/:id", investmentController.update);
router.delete("/:id", investmentController.delete);

export default router;