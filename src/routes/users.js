import { Router } from "express";
const router = Router();
import {
  registerUser,
  getUser,
  isLiked,
  getAllLikes,
  getRecentEmails,
  getAllAccounts,
  getAllWorkouts,
  getAvatar,
  likeApp,
  deleteUser,
  updateUser,
  sendEmail,
  uploadImage,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
router.post("/", registerUser);
router.use(verifyToken);
router.get("/isLiked/:email", isLiked);
router.get("/alllikes", getAllLikes);
router.get("/emails/:num", getRecentEmails);
router.get("/accounts", getAllAccounts);
router.get("/getAllWorkouts/:email", getAllWorkouts);
router.get("/getAvatar/:email", getAvatar);
router.post("/like", likeApp);
router.put("/", updateUser);
router.post("/contact", sendEmail);
router.post("/uploadImg", uploadImage);
router.get("/:email?", getUser);
router.delete("/:id", deleteUser);

export default router;
