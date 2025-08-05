import { Router } from "express";
import { cryptoController } from "../controllers/cryptoController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = Router();

router.use(authenticateUser);

router.get("/", cryptoController.getAll);
router.get("/:id", cryptoController.getById);
router.post("/", cryptoController.create);
router.put("/:id", cryptoController.update);
router.delete("/:id", cryptoController.delete);

export default router;