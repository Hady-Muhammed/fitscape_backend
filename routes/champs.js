import { Router } from "express";
const router = Router();
import {
  getChamp,
  deleteChamp,
  createChamp,
  updateChamp,
} from "../controllers/championController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
router.use(verifyToken);
router.get("/", getChamp);
router.delete("/", deleteChamp);
router.post("/", createChamp);
router.put("/:id", updateChamp);

export default router;
