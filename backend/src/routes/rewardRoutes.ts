import { Router } from "express";
import { rewardController } from "../controllers/rewardController";

const router = Router();

router.get("/", rewardController.getAll);
router.get("/:id", rewardController.getById);
router.post("/", rewardController.create);
router.put("/:id", rewardController.update);
router.delete("/:id", rewardController.delete);

export default router;