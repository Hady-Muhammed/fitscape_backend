// routes/userRoutes.js
import { Router } from "express";
const router = Router();
import {
  addWorkout,
  getWorkout,
  addRow,
  updateRow,
  reorderRow,
  deleteRow,
} from "../controllers/workoutController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
router.use(verifyToken);
router.post("/", addWorkout);
router.get("/", getWorkout);
router.post("/rows", addRow);
router.put("/rows", updateRow);
router.put("/:workoutId/reorder", reorderRow);
router.delete("/rows", deleteRow);

export default router;
