import { Router } from "express";
const router = Router();
import {
  getExerById,
  deleteExerById,
  addExer,
  updateExerById,
} from "../controllers/exerciseController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
router.use(verifyToken);
router.get("/:id?", getExerById);
router.delete("/:id", deleteExerById);
router.post("/", addExer);
router.put("/:id", updateExerById);

export default router;
