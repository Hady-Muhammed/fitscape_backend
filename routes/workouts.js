// routes/userRoutes.js
import { Router } from "express";
const router = Router();
import {
  addWorkout,
  getWorkout,
  addRow,
  updateRow,
  deleteRow,
} from "../controllers/workoutController";

router.post("/", addWorkout);
router.get("/", getWorkout);
router.post("/rows", addRow);
router.put("/rows", updateRow);
router.delete("/rows", deleteRow);

export default router;
