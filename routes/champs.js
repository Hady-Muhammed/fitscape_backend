import { Router } from "express";
const router = Router();
import {
  getChamp,
  deleteChamp,
  createChamp,
  updateChamp,
} from "../controllers/championController";

router.get("/", getChamp);
router.delete("/", deleteChamp);
router.post("/", createChamp);
router.put("/", updateChamp);

export default router;
