import { Router } from "express";
const router = Router();
import { login } from "../controllers/authController";

router.post("/", login);

export default router;
