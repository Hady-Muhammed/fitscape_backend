import { Router } from "express";
const router = Router();
import {
  getExerById,
  deleteExerById,
  addExer,
  updateExerById,
} from "../controllers/exerciseController";

router.get("/:id?", getExerById);
router.delete("/:id", deleteExerById);
router.post("/", addExer);
router.put("/:id", updateExerById);

export default router;
