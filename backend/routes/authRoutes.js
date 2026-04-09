import express from "express"
import { login, logout, signup, updateProfile } from "../controllers/authController.js";
import authUser from "../middleware/authMiddleware.js";
const authRouter = express.Router();

authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.post("/logout", logout);
authRouter.put("/updateprofile", authUser, updateProfile);
authRouter.get("/check", authUser, (req, res) => {
    res.status(200).json({ success: true, user: req.user })
})

export default authRouter;