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
router.use(verifyToken);
router.post("/", registerUser);
router.get("/getUser/:email", getUser);
router.get("/isLiked/:email", isLiked);
router.get("/alllikes", getAllLikes);
router.get("/emails/:num", getRecentEmails);
router.get("/accounts", getAllAccounts);
router.get("/getAllWorkouts/:email", getAllWorkouts);
router.get("/getAvatar/:email", getAvatar);
router.post("/like", likeApp);
router.delete("/:id", deleteUser);
router.put("/", updateUser);
router.post("/contact", sendEmail);
router.post("/uploadImg", uploadImage);

export default router;
